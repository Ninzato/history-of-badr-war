(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"LessonChapter1_03_atlas_1", frames: [[177,1418,163,120],[342,1418,163,120],[1477,658,134,50],[1916,620,132,102],[507,1418,134,130],[1282,0,330,308],[1781,990,211,264],[0,1124,327,292],[1614,0,330,308],[1282,620,193,36],[1477,620,193,36],[646,1124,331,270],[1302,1390,227,185],[1515,1124,219,202],[1613,658,122,50],[1076,1396,175,145],[1531,1328,202,144],[1737,658,115,48],[0,1418,175,145],[875,1396,199,144],[1282,310,330,308],[1302,1124,211,264],[329,1124,315,292],[1614,310,330,308],[1672,620,193,36],[1282,658,193,36],[979,1124,321,270],[646,1396,227,185],[1736,1256,219,202],[0,990,1779,132],[0,722,1914,266],[1946,90,91,87],[1946,0,91,88],[1916,724,110,107],[0,0,1280,720]]}
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



(lib.CachedBmp_1641 = function() {
	this.initialize(ss["LessonChapter1_03_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1640 = function() {
	this.initialize(ss["LessonChapter1_03_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1639 = function() {
	this.initialize(ss["LessonChapter1_03_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1638 = function() {
	this.initialize(ss["LessonChapter1_03_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1637 = function() {
	this.initialize(ss["LessonChapter1_03_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1636 = function() {
	this.initialize(ss["LessonChapter1_03_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1635 = function() {
	this.initialize(ss["LessonChapter1_03_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1634 = function() {
	this.initialize(ss["LessonChapter1_03_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1633 = function() {
	this.initialize(ss["LessonChapter1_03_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1632 = function() {
	this.initialize(ss["LessonChapter1_03_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1631 = function() {
	this.initialize(ss["LessonChapter1_03_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1630 = function() {
	this.initialize(ss["LessonChapter1_03_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1629 = function() {
	this.initialize(ss["LessonChapter1_03_atlas_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1628 = function() {
	this.initialize(ss["LessonChapter1_03_atlas_1"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1627 = function() {
	this.initialize(ss["LessonChapter1_03_atlas_1"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1626 = function() {
	this.initialize(ss["LessonChapter1_03_atlas_1"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1625 = function() {
	this.initialize(ss["LessonChapter1_03_atlas_1"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1624 = function() {
	this.initialize(ss["LessonChapter1_03_atlas_1"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1623 = function() {
	this.initialize(ss["LessonChapter1_03_atlas_1"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1622 = function() {
	this.initialize(ss["LessonChapter1_03_atlas_1"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1621 = function() {
	this.initialize(ss["LessonChapter1_03_atlas_1"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1620 = function() {
	this.initialize(ss["LessonChapter1_03_atlas_1"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1619 = function() {
	this.initialize(ss["LessonChapter1_03_atlas_1"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1618 = function() {
	this.initialize(ss["LessonChapter1_03_atlas_1"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1617 = function() {
	this.initialize(ss["LessonChapter1_03_atlas_1"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1616 = function() {
	this.initialize(ss["LessonChapter1_03_atlas_1"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1615 = function() {
	this.initialize(ss["LessonChapter1_03_atlas_1"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1614 = function() {
	this.initialize(ss["LessonChapter1_03_atlas_1"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1613 = function() {
	this.initialize(ss["LessonChapter1_03_atlas_1"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1612 = function() {
	this.initialize(ss["LessonChapter1_03_atlas_1"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1611 = function() {
	this.initialize(ss["LessonChapter1_03_atlas_1"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.CompoundPath = function() {
	this.initialize(ss["LessonChapter1_03_atlas_1"]);
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.Group_1 = function() {
	this.initialize(ss["LessonChapter1_03_atlas_1"]);
	this.gotoAndStop(32);
}).prototype = p = new cjs.Sprite();



(lib.Path = function() {
	this.initialize(ss["LessonChapter1_03_atlas_1"]);
	this.gotoAndStop(33);
}).prototype = p = new cjs.Sprite();



(lib.Chap1Scene3 = function() {
	this.initialize(ss["LessonChapter1_03_atlas_1"]);
	this.gotoAndStop(34);
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
	this.instance = new lib.CachedBmp_1640();
	this.instance.setTransform(-40.65,-35.5,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_1641();
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
	this.instance = new lib.CachedBmp_1637();
	this.instance.setTransform(-33.05,-28.05,0.4875,0.4875);

	this.instance_1 = new lib.CachedBmp_1639();
	this.instance_1.setTransform(-33,10.75,0.4875,0.4875);

	this.instance_2 = new lib.CachedBmp_1638();
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
	this.instance = new lib.CachedBmp_1636();
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
	this.instance = new lib.CachedBmp_1635();
	this.instance.setTransform(-57.2,-38.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-57.2,-38.9,105.5,132);


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
	this.instance = new lib.CachedBmp_1634();
	this.instance.setTransform(-78.4,-67.4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-78.4,-67.4,163.5,146);


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
	this.instance = new lib.CachedBmp_1633();
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
	this.instance = new lib.CachedBmp_1632();
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
	this.instance = new lib.CachedBmp_1631();
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
	this.instance = new lib.CachedBmp_1630();
	this.instance.setTransform(-78.05,-69.4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-78,-69.4,165.5,135);


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

	// flash0_ai
	this.instance = new lib.CachedBmp_1629();
	this.instance.setTransform(-92.85,-71.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-92.8,-71.7,113.5,92.5);


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
	this.instance = new lib.CachedBmp_1628();
	this.instance.setTransform(-20.85,-20.6,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20.8,-20.6,109.5,101);


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
	this.instance = new lib.CachedBmp_1625();
	this.instance.setTransform(-43.65,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_1627();
	this.instance_1.setTransform(-3.8,-12.5,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_1626();
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
	this.instance = new lib.CachedBmp_1622();
	this.instance.setTransform(-55.95,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_1624();
	this.instance_1.setTransform(-55.95,-12,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_1623();
	this.instance_2.setTransform(-42.15,-36.05,0.5,0.5);

	this.instance_3 = new lib.Group_1();
	this.instance_3.setTransform(216.45,-207.05,4.7384,4.7384,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-214.7,-207,431.2,417);


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
	this.shape_2.graphics.f("#5C4734").s().p("AhlI5QgkgkgDg+QgdnjgImKQgCg/AigyIACgDQAagmAngVQAmgUApAAQAqAAAlAUQAoAUAaAnQARAaAIAfQAIAegBAgQgNDogTDgQgTDsgXC2QgHA+gmAlQgjAggtAAQgvAAghghg");
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
	this.shape_1.graphics.f("#5C4734").s().p("AhlI5QgkgkgDg+QgdnjgImKQgCg/AigyIACgDQAagmAngVQAmgUApAAQAqAAAlAUQAoAUAaAnQARAaAIAfQAIAegBAgQgNDogTDgQgTDsgXC2QgHA+gmAlQgjAggtAAQgvAAghghg");
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
	this.instance_1 = new lib.CachedBmp_1621();
	this.instance_1.setTransform(-86,-83.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-86,-83.6,165,154);


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
	this.shape_1.graphics.f("#453526").s().p("AgyByQjCgPiugVQgfgEgSgWQgRgVgBgbQgBgbAPgUQARgXAfgEQC6gYCegPQC/gSBkAAQCMAAA/AbQBHAfAABLQAABMhDAZQg3AViYAAQhUAAiygOg");
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
	this.shape_1.graphics.f("#453526").s().p("AmeBlQhHgfAAhLQAAhMBDgZQA3gVCYAAQBUAACxAOQDDAPCuAVQAfAEASAXQARAUABAbQABAbgPAUQgRAXgfAEQi9AYicAPQi/AShjAAQiMAAg/gbg");
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
	this.shape_2.graphics.f("#5C4734").s().p("AhDF9QgUAAgYgRQgZgTgTgdQglg5AAhCQAAgTADgTQAWiOAah0QAhiTAcg0QARgeAhgWQAigXAlgCQBegGAiB3QAFARAACZQAACfAMA9QAGAjABAhQgBA/gZA2QgQAhgVAUQgWATgTAAg");
	this.shape_2.setTransform(-0.1786,-23.6143);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2D2318").s().p("AATF2IgEgBQgTAAgJgMQgLgNAAgdQAAikgjjRQgsjhgRheIDCAAIgIKVQA+AdgIAeQgDAMgOAHQgOAIgTAAg");
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
	this.shape_2.graphics.f("#5C4734").s().p("AhCF9QgVAAgXgRQgZgTgUgdQgvhJANhYQAWiOAah0QAhiTAdg0QAQgeAhgWQAjgXAlgCQBdgGAiB3QAFARAACZQABCfALA9QAUBognBRQgPAhgWAUQgVATgUAAg");
	this.shape_2.setTransform(-0.174,-22.7143);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2D2318").s().p("AAPFzQgTgBgJgLQgLgNAAgdQAAijgjjPQgsjggRhdIDCAAIgHKQQA9AdgHAdQgDAMgOAHQgOAIgTAAg");
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
	this.shape_1.graphics.f("#453526").s().p("AiNEyQjDgQicgiQASiygHjWQgEhrgHhIQDyAHD0ALQHnAVAJAUQADAGAAAYQAAA+gRCwQgNB8gOB4QiPA8jwAAQhfAAhwgKg");
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
	this.instance_1 = new lib.CachedBmp_1620();
	this.instance_1.setTransform(-57.15,-38.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-57.1,-38.9,105.5,132);


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
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#453526").s().p("Am5BCQgpgPAAgzQAAgyApgPQAWgIA7AAQC5gBCXAAQEgACCbAPQAeACASARQAQAQAAAVQAAAUgQAPQgSASgeADQjYAUozAAQg6AAgXgJg");
	this.shape.setTransform(0.05,0.0188);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

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
	this.instance_1 = new lib.CachedBmp_1619();
	this.instance_1.setTransform(-78.4,-67.4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-78.4,-67.4,157.5,146);


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
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#7C6253").s().p("AlRC5QgZgUAAg+QgBg6AUhDQAVhGAiguQAmgzAqgCIB5gGQBZgDBDAEQDFAMA4BNQBwCYi/AkQg5ALhsAEQhsAEgWAEQgjAHguAWQgbANgyAcQgyAZgiAAQgaAAgRgOg");
	this.shape.setTransform(14.8,-0.3,0.5738,0.5738,0,0,0,25.8,-0.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

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
	this.shape_2.graphics.f("#28251E").s().p("AhlI5QgkgkgDg+QgdnjgImKQgCg/AigyIACgDQAagmAngVQAmgUApAAQAqAAAlAUQAoAUAaAnQARAaAIAfQAIAegBAgQgNDogTDgQgTDsgXC2QgHA+gmAlQgjAggtAAQgvAAghghg");
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
	this.shape_1.graphics.f("#28251E").s().p("AhlI5QgkgkgDg+QgdnjgImKQgCg/AigyIACgDQAagmAngVQAmgUApAAQAqAAAlAUQAoAUAaAnQARAaAIAfQAIAegBAgQgNDogTDgQgTDsgXC2QgHA+gmAlQgjAggtAAQgvAAghghg");
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
	this.instance_1 = new lib.CachedBmp_1618();
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
	this.shape_1.graphics.f("#2D2318").s().p("AgyByQjCgPiugVQgfgEgSgWQgRgVgBgbQgBgbAPgUQARgXAfgEQC6gYCegPQC/gSBkAAQCMAAA/AbQBHAfAABLQAABMhDAZQg3AViYAAQhUAAiygOg");
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
	this.shape_1.graphics.f("#2D2318").s().p("AmeBlQhHgfAAhLQAAhMBDgZQA3gVCYAAQBUAACxAOQDDAPCuAVQAfAEASAXQARAUABAbQABAbgPAUQgRAXgfAEQi9AYicAPQi/AShjAAQiMAAg/gbg");
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
	this.shape_2.graphics.f("#28251E").s().p("AhDF9QgUAAgYgRQgZgTgTgdQglg5AAhCQAAgTADgTQAWiOAah0QAhiTAcg0QARgeAhgWQAigXAlgCQBegGAiB3QAFARAACZQAACfAMA9QAGAjABAhQgBA/gZA2QgQAhgVAUQgWATgTAAg");
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
	this.shape_2.graphics.f("#28251E").s().p("AhCF9QgVAAgXgRQgZgTgUgdQgvhJANhYQAWiOAah0QAhiTAdg0QAQgeAhgWQAjgXAlgCQBdgGAiB3QAFARAACZQABCfALA9QAUBognBRQgPAhgWAUQgVATgUAAg");
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
	this.shape_1.graphics.f("#2D2318").s().p("AiNEyQjDgQicgiQASiygHjWQgEhrgHhIQDyAHD0ALQHnAVAJAUQADAGAAAYQAAA+gRCwQgNB8gOB4QiPA8jwAAQhfAAhwgKg");
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
	this.instance_1 = new lib.CachedBmp_1617();
	this.instance_1.setTransform(-48.3,-8.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

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
	this.instance = new lib.CachedBmp_1616();
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
	this.instance_1 = new lib.CachedBmp_1615();
	this.instance_1.setTransform(-78.05,-69.4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-78,-69.4,160.5,135);


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

	// flash0_ai
	this.instance = new lib.CachedBmp_1614();
	this.instance.setTransform(-92.8,-71.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-92.8,-71.6,113.5,92.5);


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
	this.instance = new lib.CachedBmp_1613();
	this.instance.setTransform(-20.85,-20.6,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20.8,-20.6,109.5,101);


(lib.CharacterBad_04_interact = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-56.75,-22.45,0.9981,0.9981,-61.4328,0,0,35.8,0.5);

	this.instance_1 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_1.setTransform(-43.5,115.25,0.998,0.998,-174.0646,0,0,6.7,-1.3);

	this.instance_2 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_2.setTransform(-52.6,114.6,0.9981,0.9981,176.0806,0,0,6,-8.8);

	this.instance_3 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_3.setTransform(-94.3,46.15,0.9981,0.9981,-121.3578,0,0,39.6,0.2);

	this.instance_4 = new lib.ch1_headcopy_1("synched",0);
	this.instance_4.setTransform(-0.6,-79.5,0.9989,0.9989,-1.8068,0,0,0.4,52.4);

	this.instance_5 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_5.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_6 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_6.setTransform(-25.35,187.55,0.9978,0.9978,15.2726,0,0,3.3,-54.5);

	this.instance_7 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_7.setTransform(-5.4,-58.55,0.9988,0.9988,10.3232,0,0,-1.4,8.4);

	this.instance_8 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_8.setTransform(-5.6,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_9 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_9.setTransform(31.85,187.9,0.9975,0.9975,-11.9576,0,0,3.8,-52.9);

	this.instance_10 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_10.setTransform(16.35,92.5,0.9975,0.9975,-11.8514,0,0,-1,1.8);

	this.instance_11 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_11.setTransform(53.75,134.65,0.998,0.998,48.064,0,0,-4.9,2.8);

	this.instance_12 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_12.setTransform(48,124.6,0.9982,0.9982,42.8418,0,0,-6.2,8.6);

	this.instance_13 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_13.setTransform(26.5,47.25,0.9981,0.9981,74.3337,0,0,-40.2,-0.8);

	this.instance_14 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_14.setTransform(45.6,-26.35,0.9983,0.9983,105.2481,0,0,-33.2,-0.2);

	this.instance_15 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_15.setTransform(-22.45,90.8,0.998,0.998,-1.0758,0,0,3.4,-46.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{regY:-46.1,scaleX:0.998,scaleY:0.998,rotation:-1.0758,x:-22.45,y:90.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.2,scaleX:0.9983,scaleY:0.9983,rotation:105.2481,x:45.6,y:-26.35,regY:-0.2}},{t:this.instance_13,p:{rotation:74.3337,x:26.5,y:47.25,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6.2,regY:8.6,scaleX:0.9982,scaleY:0.9982,rotation:42.8418,x:48,y:124.6}},{t:this.instance_11,p:{regY:2.8,scaleX:0.998,scaleY:0.998,rotation:48.064,x:53.75,y:134.65,regX:-4.9}},{t:this.instance_10,p:{regY:1.8,scaleX:0.9975,scaleY:0.9975,rotation:-11.8514,y:92.5,x:16.35}},{t:this.instance_9,p:{regY:-52.9,scaleX:0.9975,scaleY:0.9975,rotation:-11.9576,x:31.85,y:187.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3232,y:-58.55,x:-5.4,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9978,scaleY:0.9978,rotation:15.2726,x:-25.35,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-1.8068,x:-0.6,y:-79.5}},{t:this.instance_3,p:{rotation:-121.3578,x:-94.3,y:46.15,regY:0.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:176.0806,x:-52.6,y:114.6,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.7,scaleX:0.998,scaleY:0.998,rotation:-174.0646,x:-43.5,y:115.25,regY:-1.3}},{t:this.instance,p:{regX:35.8,scaleX:0.9981,scaleY:0.9981,rotation:-61.4328,y:-22.45,x:-56.75,regY:0.5}}]}).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.075,x:-22.4,y:90.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:100.9813,x:45.55,y:-26.3,regY:-0.2}},{t:this.instance_13,p:{rotation:66.1997,x:32.1,y:48.4,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.5,scaleX:0.9981,scaleY:0.9981,rotation:34.7085,x:64.4,y:121.9}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:39.9321,x:71.25,y:131.2,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.8497,y:92.55,x:16.35}},{t:this.instance_9,p:{regY:-52.8,scaleX:0.9974,scaleY:0.9974,rotation:-11.9575,x:31.8,y:187.95,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3219,y:-58.5,x:-5.4,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.2735,x:-25.3,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.8061,x:-0.55,y:-79.45}},{t:this.instance_3,p:{rotation:-121.0115,x:-94.4,y:46.05,regY:0.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:176.4298,x:-53.15,y:114.8,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-173.717,x:-44.1,y:115.45,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-61.3563,y:-22.45,x:-56.75,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.075,x:-22.4,y:90.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:96.7148,x:45.55,y:-26.3,regY:-0.2}},{t:this.instance_13,p:{rotation:58.0669,x:37.65,y:49.2,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9981,scaleY:0.9981,rotation:26.576,x:80.05,y:117.5}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:31.7998,x:88.2,y:125.65,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.8497,y:92.55,x:16.35}},{t:this.instance_9,p:{regY:-52.8,scaleX:0.9974,scaleY:0.9974,rotation:-11.9575,x:31.8,y:187.95,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3219,y:-58.5,x:-5.4,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.2735,x:-25.3,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.8052,x:-0.55,y:-79.45}},{t:this.instance_3,p:{rotation:-120.6626,x:-94.55,y:45.95,regY:0.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:176.7781,x:-53.65,y:115,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-173.3687,x:-44.65,y:115.7,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-61.2798,y:-22.45,x:-56.75,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.075,x:-22.4,y:90.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:92.4479,x:45.55,y:-26.3,regY:-0.2}},{t:this.instance_13,p:{rotation:49.9333,x:43.2,y:49.6,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9981,scaleY:0.9981,rotation:18.4419,x:94.9,y:111.2}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:23.6661,x:104.1,y:118.1,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.8497,y:92.55,x:16.35}},{t:this.instance_9,p:{regY:-52.8,scaleX:0.9974,scaleY:0.9974,rotation:-11.9575,x:31.8,y:187.95,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3219,y:-58.5,x:-5.4,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.2735,x:-25.3,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.8052,x:-0.55,y:-79.45}},{t:this.instance_3,p:{rotation:-120.3132,x:-94.65,y:45.95,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:177.1264,x:-54.15,y:115.2,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-173.022,x:-45.15,y:116.15,regY:-1.4}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-61.2029,y:-22.4,x:-56.75,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.075,x:-22.4,y:90.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:88.1849,x:45.55,y:-26.3,regY:-0.2}},{t:this.instance_13,p:{rotation:41.7998,x:48.9,y:49.5,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6.1,regY:8.6,scaleX:0.9981,scaleY:0.9981,rotation:10.3098,x:108.6,y:103.2}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:15.5325,x:118.9,y:108.8,regX:-4.8}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.8497,y:92.55,x:16.35}},{t:this.instance_9,p:{regY:-52.8,scaleX:0.9974,scaleY:0.9974,rotation:-11.9575,x:31.8,y:187.95,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3219,y:-58.5,x:-5.4,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.2735,x:-25.3,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.8052,x:-0.55,y:-79.45}},{t:this.instance_3,p:{rotation:-119.9658,x:-94.8,y:45.95,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:177.4746,x:-54.65,y:115.35,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-172.6742,x:-45.65,y:116.25,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-61.1261,y:-22.45,x:-56.75,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.075,x:-22.4,y:90.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:83.9197,x:45.55,y:-26.3,regY:-0.2}},{t:this.instance_13,p:{rotation:33.6675,x:54.45,y:49.05,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9982,scaleY:0.9982,rotation:2.1754,x:121.3,y:93.8}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:7.399,x:132.1,y:97.75,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.8497,y:92.55,x:16.35}},{t:this.instance_9,p:{regY:-52.8,scaleX:0.9974,scaleY:0.9974,rotation:-11.9575,x:31.8,y:187.95,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3219,y:-58.5,x:-5.4,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.2735,x:-25.3,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.8052,x:-0.55,y:-79.45}},{t:this.instance_3,p:{rotation:-119.6178,x:-94.85,y:45.9,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:177.8227,x:-55.15,y:115.75,regY:-8.9,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-172.3259,x:-46.1,y:116.45,regY:-1.3}},{t:this.instance,p:{regX:35.8,scaleX:0.998,scaleY:0.998,rotation:-61.0496,y:-22.5,x:-56.7,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.075,x:-22.4,y:90.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:79.6524,x:45.5,y:-26.4,regY:-0.2}},{t:this.instance_13,p:{rotation:25.5335,x:60.05,y:48.2,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9981,scaleY:0.9981,rotation:-5.9519,x:132.6,y:83}},{t:this.instance_11,p:{regY:2.9,scaleX:0.998,scaleY:0.998,rotation:-0.7298,x:143.8,y:85.45,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.8497,y:92.55,x:16.35}},{t:this.instance_9,p:{regY:-52.8,scaleX:0.9974,scaleY:0.9974,rotation:-11.9575,x:31.8,y:187.95,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3211,y:-58.5,x:-5.35,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.2735,x:-25.3,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.8052,x:-0.55,y:-79.45}},{t:this.instance_3,p:{rotation:-119.2695,x:-94.9,y:45.7,regY:0.2,scaleX:0.998,scaleY:0.998}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:178.1715,x:-55.65,y:115.85,regY:-8.9,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-171.9766,x:-46.7,y:116.7,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-60.9728,y:-22.45,x:-56.7,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.075,x:-22.4,y:90.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:75.3849,x:45.5,y:-26.35,regY:-0.2}},{t:this.instance_13,p:{rotation:17.3997,x:65.55,y:46.9,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9981,scaleY:0.9981,rotation:-14.0857,x:142.3,y:71.1}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:-8.8627,x:153.7,y:71.9,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.8497,y:92.55,x:16.35}},{t:this.instance_9,p:{regY:-52.8,scaleX:0.9974,scaleY:0.9974,rotation:-11.9575,x:31.8,y:187.95,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3211,y:-58.5,x:-5.35,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.2735,x:-25.3,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.8043,x:-0.5,y:-79.45}},{t:this.instance_3,p:{rotation:-118.9213,x:-95,y:45.75,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:178.5194,x:-56.15,y:115.9,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-171.6297,x:-47.2,y:116.9,regY:-1.3}},{t:this.instance,p:{regX:35.8,scaleX:0.998,scaleY:0.998,rotation:-60.8955,y:-22.55,x:-56.65,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.075,x:-22.4,y:90.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:71.118,x:45.55,y:-26.35,regY:-0.2}},{t:this.instance_13,p:{rotation:9.2666,x:70.95,y:45.2,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9981,scaleY:0.9981,rotation:-22.2199,x:150.25,y:58.25}},{t:this.instance_11,p:{regY:2.8,scaleX:0.9979,scaleY:0.9979,rotation:-16.9955,x:161.7,y:57.4,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.8497,y:92.55,x:16.35}},{t:this.instance_9,p:{regY:-52.8,scaleX:0.9974,scaleY:0.9974,rotation:-11.9575,x:31.8,y:187.95,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3211,y:-58.5,x:-5.35,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.2735,x:-25.3,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.8043,x:-0.5,y:-79.45}},{t:this.instance_3,p:{rotation:-118.5735,x:-95.1,y:45.75,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:178.8681,x:-56.7,y:116.1,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-171.2806,x:-47.75,y:117.25,regY:-1.4}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-60.8183,y:-22.45,x:-56.75,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.075,x:-22.4,y:90.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.2,scaleX:0.9982,scaleY:0.9982,rotation:66.8518,x:45.45,y:-26.5,regY:-0.2}},{t:this.instance_13,p:{rotation:1.1335,x:76.25,y:43.05,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9981,scaleY:0.9981,rotation:-30.3525,x:156.6,y:44.9}},{t:this.instance_11,p:{regY:2.8,scaleX:0.9979,scaleY:0.9979,rotation:-25.1286,x:167.85,y:42.4,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.8497,y:92.55,x:16.35}},{t:this.instance_9,p:{regY:-52.8,scaleX:0.9974,scaleY:0.9974,rotation:-11.9575,x:31.8,y:187.95,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3211,y:-58.5,x:-5.35,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.2735,x:-25.3,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.8043,x:-0.5,y:-79.45}},{t:this.instance_3,p:{rotation:-118.2247,x:-95.25,y:45.65,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:179.216,x:-57.2,y:116.45,regY:-8.9,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-170.9336,x:-48.25,y:117.5,regY:-1.4}},{t:this.instance,p:{regX:35.8,scaleX:0.998,scaleY:0.998,rotation:-60.7422,y:-22.55,x:-56.7,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.075,x:-22.4,y:90.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:62.5845,x:45.55,y:-26.4,regY:-0.2}},{t:this.instance_13,p:{rotation:-6.995,x:81.35,y:40.55,regX:-40.1,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6.1,regY:8.6,scaleX:0.9981,scaleY:0.9981,rotation:-38.4865,x:161.05,y:31}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:-33.2617,x:171.9,y:27,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.8497,y:92.55,x:16.35}},{t:this.instance_9,p:{regY:-52.8,scaleX:0.9974,scaleY:0.9974,rotation:-11.9575,x:31.75,y:187.95,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3211,y:-58.5,x:-5.35,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.2735,x:-25.3,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.8043,x:-0.5,y:-79.4}},{t:this.instance_3,p:{rotation:-117.8763,x:-95.35,y:45.6,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:179.5638,x:-57.7,y:116.45,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-170.5856,x:-48.75,y:117.7,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-60.6665,y:-22.45,x:-56.75,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.075,x:-22.4,y:90.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:58.3184,x:45.45,y:-26.25,regY:-0.1}},{t:this.instance_13,p:{rotation:-15.1285,x:86.15,y:37.75,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9981,scaleY:0.9981,rotation:-46.6192,x:163.85,y:16.95}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:-41.3946,x:173.95,y:11.4,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.8497,y:92.55,x:16.35}},{t:this.instance_9,p:{regY:-52.8,scaleX:0.9974,scaleY:0.9974,rotation:-11.9575,x:31.75,y:187.95,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3211,y:-58.5,x:-5.35,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.2735,x:-25.3,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.8043,x:-0.5,y:-79.4}},{t:this.instance_3,p:{rotation:-117.5288,x:-95.35,y:45.5,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:179.9133,x:-58.2,y:116.6,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-170.2356,x:-49.3,y:117.85,regY:-1.3}},{t:this.instance,p:{regX:35.8,scaleX:0.998,scaleY:0.998,rotation:-60.5885,y:-22.55,x:-56.65,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.075,x:-22.4,y:90.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9981,scaleY:0.9981,rotation:54.0516,x:45.5,y:-26.35,regY:-0.2}},{t:this.instance_13,p:{rotation:-23.2597,x:90.8,y:34.5,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6.1,regY:8.6,scaleX:0.9981,scaleY:0.9981,rotation:-54.7523,x:164.75,y:3.05}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:-49.527,x:174.05,y:-3.85,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.8497,y:92.55,x:16.35}},{t:this.instance_9,p:{regY:-52.8,scaleX:0.9974,scaleY:0.9974,rotation:-11.9575,x:31.75,y:187.95,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3211,y:-58.5,x:-5.35,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.2735,x:-25.3,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.8035,x:-0.5,y:-79.4}},{t:this.instance_3,p:{rotation:-117.1793,x:-95.45,y:45.5,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:-179.7433,x:-58.75,y:116.75,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-169.8879,x:-49.95,y:118.05,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-60.512,y:-22.45,x:-56.7,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.075,x:-22.4,y:90.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9981,scaleY:0.9981,rotation:49.785,x:45.5,y:-26.35,regY:-0.2}},{t:this.instance_13,p:{rotation:-31.3943,x:95.2,y:30.95,regX:-40.2,scaleX:0.998,scaleY:0.998,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9981,scaleY:0.9981,rotation:-62.885,x:163.9,y:-10.65}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:-57.6598,x:172.2,y:-18.75,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.8497,y:92.55,x:16.35}},{t:this.instance_9,p:{regY:-52.8,scaleX:0.9974,scaleY:0.9974,rotation:-11.9575,x:31.75,y:187.95,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3203,y:-58.5,x:-5.35,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.2735,x:-25.3,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.8035,x:-0.45,y:-79.4}},{t:this.instance_3,p:{rotation:-116.8314,x:-95.55,y:45.5,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:-179.3956,x:-59.25,y:117.05,regY:-8.9,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-169.5399,x:-50.35,y:118.35,regY:-1.4}},{t:this.instance,p:{regX:35.8,scaleX:0.998,scaleY:0.998,rotation:-60.4347,y:-22.6,x:-56.65,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.075,x:-22.4,y:90.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9981,scaleY:0.9981,rotation:45.5172,x:45.45,y:-26.3,regY:-0.2}},{t:this.instance_13,p:{rotation:-39.5274,x:99.3,y:27.15,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9981,scaleY:0.9981,rotation:-71.018,x:161.5,y:-23.85}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:-65.7939,x:168.5,y:-33,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.8497,y:92.55,x:16.35}},{t:this.instance_9,p:{regY:-52.8,scaleX:0.9974,scaleY:0.9974,rotation:-11.9575,x:31.75,y:187.95,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3203,y:-58.5,x:-5.35,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.2724,x:-25.25,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.8035,x:-0.45,y:-79.4}},{t:this.instance_3,p:{rotation:-116.484,x:-95.65,y:45.35,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:-179.0469,x:-59.75,y:117.1,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-169.193,x:-50.9,y:118.5,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-60.3574,y:-22.5,x:-56.7,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.0741,x:-22.45,y:90.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:41.2516,x:45.5,y:-26.35,regY:-0.2}},{t:this.instance_13,p:{rotation:-47.6607,x:103.15,y:23,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9981,scaleY:0.9981,rotation:-79.1513,x:157.45,y:-36.3}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:-73.9267,x:163.1,y:-46.4,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.8497,y:92.55,x:16.35}},{t:this.instance_9,p:{regY:-52.8,scaleX:0.9974,scaleY:0.9974,rotation:-11.9575,x:31.75,y:187.95,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3203,y:-58.5,x:-5.35,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.2724,x:-25.25,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.8035,x:-0.45,y:-79.4}},{t:this.instance_3,p:{rotation:-116.1349,x:-95.75,y:45.3,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-178.6982,x:-60.3,y:117.3,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-168.844,x:-51.45,y:118.7,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-60.2813,y:-22.5,x:-56.75,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.0741,x:-22.45,y:90.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9981,scaleY:0.9981,rotation:36.9843,x:45.35,y:-26.3,regY:-0.1}},{t:this.instance_13,p:{rotation:-55.7934,x:106.6,y:18.65,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.5,scaleX:0.9981,scaleY:0.9981,rotation:-87.2846,x:151.9,y:-47.75}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:-82.0601,x:156.1,y:-58.6,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.8497,y:92.55,x:16.35}},{t:this.instance_9,p:{regY:-52.8,scaleX:0.9974,scaleY:0.9974,rotation:-11.9575,x:31.75,y:187.95,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3203,y:-58.5,x:-5.35,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.2724,x:-25.25,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.8035,x:-0.45,y:-79.4}},{t:this.instance_3,p:{rotation:-115.787,x:-95.85,y:45.25,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:-178.3503,x:-60.8,y:117.6,regY:-8.9,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-168.4966,x:-51.95,y:118.8,regY:-1.2}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-60.2044,y:-22.5,x:-56.7,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.0741,x:-22.45,y:90.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9981,scaleY:0.9981,rotation:32.7181,x:45.45,y:-26.3,regY:-0.2}},{t:this.instance_13,p:{rotation:-63.9274,x:109.8,y:13.9,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9981,scaleY:0.9981,rotation:-95.4132,x:145.35,y:-58.25}},{t:this.instance_11,p:{regY:2.9,scaleX:0.998,scaleY:0.998,rotation:-90.1884,x:147.95,y:-69.45,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.8497,y:92.55,x:16.35}},{t:this.instance_9,p:{regY:-52.8,scaleX:0.9974,scaleY:0.9974,rotation:-11.9575,x:31.75,y:187.95,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3203,y:-58.5,x:-5.35,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.2724,x:-25.25,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.8026,x:-0.5,y:-79.4}},{t:this.instance_3,p:{rotation:-115.4391,x:-95.9,y:45.2,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:-178.0023,x:-61.3,y:117.75,regY:-8.9,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-168.1474,x:-52.5,y:119,regY:-1.2}},{t:this.instance,p:{regX:35.8,scaleX:0.998,scaleY:0.998,rotation:-60.1286,y:-22.6,x:-56.65,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.0741,x:-22.45,y:90.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:28.4514,x:45.45,y:-26.3,regY:-0.2}},{t:this.instance_13,p:{rotation:-72.0603,x:112.65,y:9,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9982,scaleY:0.9982,rotation:-103.5472,x:137.6,y:-67.45}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:-98.3214,x:138.5,y:-78.9,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.8497,y:92.55,x:16.35}},{t:this.instance_9,p:{regY:-52.8,scaleX:0.9974,scaleY:0.9974,rotation:-11.9575,x:31.75,y:187.95,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3203,y:-58.5,x:-5.35,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.2724,x:-25.25,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.8026,x:-0.5,y:-79.4}},{t:this.instance_3,p:{rotation:-115.0911,x:-95.95,y:45.2,regY:0.1,scaleX:0.998,scaleY:0.998}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:-177.6543,x:-61.85,y:117.8,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-167.8,x:-53.05,y:119.35,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-60.051,y:-22.5,x:-56.65,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.0741,x:-22.45,y:90.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:24.1848,x:45.45,y:-26.35,regY:-0.2}},{t:this.instance_13,p:{rotation:-80.1941,x:114.9,y:3.9,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.9}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9981,scaleY:0.9981,rotation:-111.6791,x:128.95,y:-75.3}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:-106.454,x:128.35,y:-86.8,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.8497,y:92.55,x:16.35}},{t:this.instance_9,p:{regY:-52.8,scaleX:0.9974,scaleY:0.9974,rotation:-11.9575,x:31.75,y:187.95,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3203,y:-58.5,x:-5.3,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.2724,x:-25.3,y:187.6,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.8026,x:-0.5,y:-79.4}},{t:this.instance_3,p:{rotation:-114.742,x:-96.1,y:45.1,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:-177.3062,x:-62.35,y:117.9,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-167.4529,x:-53.6,y:119.6,regY:-1.3}},{t:this.instance,p:{regX:35.8,scaleX:0.998,scaleY:0.998,rotation:-59.974,y:-22.65,x:-56.6,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.0741,x:-22.45,y:90.75,regX:3.4}},{t:this.instance_14,p:{regX:-33.2,scaleX:0.9982,scaleY:0.9982,rotation:19.0559,x:45.3,y:-26.3,regY:-0.2}},{t:this.instance_13,p:{rotation:-79.1944,x:117.45,y:-2.4,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6.1,regY:8.6,scaleX:0.9982,scaleY:0.9982,rotation:-108.5322,x:132.8,y:-81.3}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.998,rotation:-106.1707,x:132.3,y:-92.95,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.8497,y:92.55,x:16.35}},{t:this.instance_9,p:{regY:-52.8,scaleX:0.9974,scaleY:0.9974,rotation:-11.9575,x:31.7,y:187.95,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3195,y:-58.5,x:-5.3,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.2724,x:-25.3,y:187.6,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.8026,x:-0.45,y:-79.4}},{t:this.instance_3,p:{rotation:-114.5781,x:-96.8,y:44.7,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:-177.1439,x:-63.35,y:117.5,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-168.2584,x:-54.55,y:119.15,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-59.3349,y:-22.55,x:-56.7,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.0741,x:-22.45,y:90.75,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:13.9292,x:45.45,y:-26.35,regY:-0.2}},{t:this.instance_13,p:{rotation:-78.1965,x:119.25,y:-8.95,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9982,scaleY:0.9982,rotation:-105.3845,x:136,y:-87.7}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:-105.8873,x:135.7,y:-99.4,regX:-4.8}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.8497,y:92.55,x:16.35}},{t:this.instance_9,p:{regY:-52.8,scaleX:0.9974,scaleY:0.9974,rotation:-11.9575,x:31.7,y:187.95,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3195,y:-58.5,x:-5.3,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.2724,x:-25.3,y:187.6,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.8026,x:-0.45,y:-79.4}},{t:this.instance_3,p:{rotation:-114.4143,x:-97.55,y:44.25,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:-176.9817,x:-64.25,y:117.2,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-169.0645,x:-55.5,y:118.8,regY:-1.2}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-58.6952,y:-22.55,x:-56.7,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.0741,x:-22.45,y:90.75,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:8.801,x:45.4,y:-26.35,regY:-0.2}},{t:this.instance_13,p:{rotation:-77.1979,x:120.4,y:-15.6,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.9}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9981,scaleY:0.9981,rotation:-102.2372,x:138.55,y:-94}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:-105.6054,x:138.6,y:-105.65,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.8497,y:92.55,x:16.35}},{t:this.instance_9,p:{regY:-52.8,scaleX:0.9974,scaleY:0.9974,rotation:-11.9575,x:31.7,y:187.95,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3195,y:-58.5,x:-5.3,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.2724,x:-25.3,y:187.6,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.8017,x:-0.45,y:-79.4}},{t:this.instance_3,p:{rotation:-114.2504,x:-98.25,y:43.7,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:-176.8193,x:-65.2,y:116.75,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-169.8702,x:-56.45,y:118.6,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-58.0568,y:-22.55,x:-56.75,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.0741,x:-22.45,y:90.75,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:3.6715,x:45.35,y:-26.3,regY:-0.2}},{t:this.instance_13,p:{rotation:-76.1996,x:121.1,y:-22.35,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9982,scaleY:0.9982,rotation:-99.0895,x:140.6,y:-100.4}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:-105.3225,x:140.8,y:-112.15,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.8489,y:92.55,x:16.35}},{t:this.instance_9,p:{regY:-52.8,scaleX:0.9974,scaleY:0.9974,rotation:-11.9575,x:31.7,y:187.95,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3195,y:-58.5,x:-5.3,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.2724,x:-25.3,y:187.6,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.8017,x:-0.45,y:-79.4}},{t:this.instance_3,p:{rotation:-114.085,x:-99,y:43.25,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:-176.6579,x:-66.15,y:116.4,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-170.6765,x:-57.35,y:118.2,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-57.4176,y:-22.55,x:-56.7,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.0741,x:-22.45,y:90.75,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:-1.4523,x:45.35,y:-26.3,regY:-0.2}},{t:this.instance_13,p:{rotation:-75.2008,x:121.2,y:-29.1,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9981,scaleY:0.9981,rotation:-95.9414,x:141.95,y:-106.9}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:-105.0384,x:142.4,y:-118.65,regX:-4.8}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.8489,y:92.55,x:16.35}},{t:this.instance_9,p:{regY:-52.8,scaleX:0.9974,scaleY:0.9974,rotation:-11.9575,x:31.7,y:187.95,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3195,y:-58.5,x:-5.3,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.2724,x:-25.3,y:187.6,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.8017,x:-0.45,y:-79.4}},{t:this.instance_3,p:{rotation:-113.921,x:-99.7,y:42.8,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:-176.4965,x:-67.05,y:116.1,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-171.4834,x:-58.3,y:117.8,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-56.7781,y:-22.55,x:-56.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.0741,x:-22.45,y:90.75,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:-6.58,x:45.35,y:-26.25,regY:-0.2}},{t:this.instance_13,p:{rotation:-74.2016,x:120.65,y:-35.95,regX:-40.1,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6.1,regY:8.6,scaleX:0.9981,scaleY:0.9982,rotation:-92.7943,x:142.75,y:-113.15}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:-104.7547,x:143.5,y:-125,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.8489,y:92.55,x:16.35}},{t:this.instance_9,p:{regY:-52.8,scaleX:0.9974,scaleY:0.9974,rotation:-11.9575,x:31.65,y:187.95,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3195,y:-58.5,x:-5.3,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.2724,x:-25.3,y:187.6,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.8017,x:-0.45,y:-79.4}},{t:this.instance_3,p:{rotation:-113.7575,x:-100.35,y:42.4,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:-176.3349,x:-67.95,y:115.65,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.7,scaleX:0.9979,scaleY:0.9979,rotation:-172.2905,x:-59.15,y:117.5,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-56.1384,y:-22.65,x:-56.75,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.0741,x:-22.45,y:90.75,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:-11.7093,x:45.3,y:-26.3,regY:-0.2}},{t:this.instance_13,p:{rotation:-73.2026,x:119.45,y:-42.6,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9982,scaleY:0.9982,rotation:-89.6505,x:142.95,y:-119.55}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:-104.472,x:143.8,y:-131.25,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.8489,y:92.55,x:16.35}},{t:this.instance_9,p:{regY:-52.8,scaleX:0.9974,scaleY:0.9974,rotation:-11.9575,x:31.65,y:187.95,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3195,y:-58.5,x:-5.3,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.2718,x:-25.3,y:187.6,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.8017,x:-0.45,y:-79.4}},{t:this.instance_3,p:{rotation:-113.5928,x:-101.1,y:41.85,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-176.1726,x:-68.85,y:115.3,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-173.096,x:-60.2,y:117.15,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-55.4989,y:-22.55,x:-56.7,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.0741,x:-22.45,y:90.75,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:-16.8363,x:45.3,y:-26.3,regY:-0.2}},{t:this.instance_13,p:{rotation:-72.2049,x:117.65,y:-49.15,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9981,scaleY:0.9981,rotation:-86.5039,x:142.5,y:-125.65}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:-104.1882,x:143.65,y:-137.4,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.8489,y:92.55,x:16.35}},{t:this.instance_9,p:{regY:-52.8,scaleX:0.9974,scaleY:0.9974,rotation:-11.9575,x:31.65,y:187.95,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3195,y:-58.5,x:-5.3,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.2718,x:-25.3,y:187.6,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.8008,x:-0.4,y:-79.4}},{t:this.instance_3,p:{rotation:-113.4287,x:-101.8,y:41.35,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-176.011,x:-69.65,y:114.85,regY:-8.8,regX:5.9}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-173.9029,x:-61.15,y:116.8,regY:-1.4}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-54.8596,y:-22.65,x:-56.8,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.0733,x:-22.45,y:90.75,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:-21.9655,x:45.3,y:-26.3,regY:-0.2}},{t:this.instance_13,p:{rotation:-71.2058,x:115.25,y:-55.4,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9982,scaleY:0.9982,rotation:-83.3555,x:141.5,y:-131.55}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:-103.9058,x:142.95,y:-143.35,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.8489,y:92.55,x:16.35}},{t:this.instance_9,p:{regY:-52.8,scaleX:0.9974,scaleY:0.9974,rotation:-11.9575,x:31.65,y:187.95,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3186,y:-58.5,x:-5.3,scaleX:0.9987,scaleY:0.9987}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.2718,x:-25.3,y:187.6,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.8008,x:-0.4,y:-79.4}},{t:this.instance_3,p:{rotation:-113.2644,x:-102.5,y:40.85,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:-175.8493,x:-70.65,y:114.45,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.7,scaleX:0.9979,scaleY:0.9979,rotation:-174.7086,x:-62,y:116.4,regY:-1.4}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-54.2215,y:-22.55,x:-56.7,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.0733,x:-22.45,y:90.75,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:-27.0938,x:45.25,y:-26.25,regY:-0.2}},{t:this.instance_13,p:{rotation:-70.2074,x:112.4,y:-61.6,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.5,scaleX:0.9981,scaleY:0.9981,rotation:-80.2088,x:139.85,y:-137.25}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.998,rotation:-103.6213,x:141.55,y:-148.95,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.8489,y:92.55,x:16.35}},{t:this.instance_9,p:{regY:-52.8,scaleX:0.9974,scaleY:0.9974,rotation:-11.9575,x:31.65,y:187.95,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3186,y:-58.5,x:-5.3,scaleX:0.9987,scaleY:0.9987}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.2718,x:-25.3,y:187.6,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.8008,x:-0.4,y:-79.4}},{t:this.instance_3,p:{rotation:-113.0999,x:-103.25,y:40.35,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:-175.6878,x:-71.45,y:114,regY:-8.8,regX:5.9}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-175.5149,x:-62.95,y:115.9,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-53.5827,y:-22.55,x:-56.7,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.0733,x:-22.45,y:90.75,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:-32.2214,x:45.2,y:-26.25,regY:-0.2}},{t:this.instance_13,p:{rotation:-69.2088,x:108.95,y:-67.45,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9981,scaleY:0.9981,rotation:-77.0611,x:137.75,y:-142.6}},{t:this.instance_11,p:{regY:2.8,scaleX:0.9979,scaleY:0.9979,rotation:-103.3386,x:139.6,y:-154.35,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.8489,y:92.55,x:16.35}},{t:this.instance_9,p:{regY:-52.8,scaleX:0.9974,scaleY:0.9974,rotation:-11.9575,x:31.6,y:187.95,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3186,y:-58.5,x:-5.3,scaleX:0.9987,scaleY:0.9987}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.2718,x:-25.3,y:187.6,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.8008,x:-0.4,y:-79.4}},{t:this.instance_3,p:{rotation:-112.9362,x:-103.95,y:39.85,regY:0.1,scaleX:0.998,scaleY:0.998}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:-175.5252,x:-72.5,y:113.65,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-176.3204,x:-63.9,y:115.5,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-52.9428,y:-22.65,x:-56.8,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.0733,x:-22.45,y:90.75,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9981,scaleY:0.9981,rotation:-37.3501,x:45.2,y:-26.2,regY:-0.2}},{t:this.instance_13,p:{rotation:-68.2095,x:105,y:-73,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9981,scaleY:0.9981,rotation:-73.912,x:135.15,y:-147.55}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:-103.0569,x:137.25,y:-159.35,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.8489,y:92.55,x:16.35}},{t:this.instance_9,p:{regY:-52.8,scaleX:0.9974,scaleY:0.9974,rotation:-11.9575,x:31.6,y:187.95,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3186,y:-58.5,x:-5.3,scaleX:0.9987,scaleY:0.9987}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.2718,x:-25.3,y:187.6,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.8008,x:-0.4,y:-79.4}},{t:this.instance_3,p:{rotation:-112.7706,x:-104.65,y:39.3,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:-175.3645,x:-73.25,y:113.1,regY:-8.8,regX:5.9}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-177.1278,x:-64.8,y:115.05,regY:-1.3}},{t:this.instance,p:{regX:35.8,scaleX:0.998,scaleY:0.998,rotation:-52.3035,y:-22.65,x:-56.65,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.0733,x:-22.45,y:90.75,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9981,scaleY:0.9981,rotation:-42.4791,x:45.2,y:-26.2,regY:-0.2}},{t:this.instance_13,p:{rotation:-67.2109,x:100.45,y:-78.1,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.9}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9982,scaleY:0.9982,rotation:-70.7651,x:132.1,y:-152.2}},{t:this.instance_11,p:{regY:2.8,scaleX:0.9979,scaleY:0.9979,rotation:-102.7729,x:134.3,y:-163.95,regX:-4.8}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.8489,y:92.55,x:16.35}},{t:this.instance_9,p:{regY:-52.8,scaleX:0.9974,scaleY:0.9974,rotation:-11.9575,x:31.6,y:187.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3186,y:-58.5,x:-5.3,scaleX:0.9987,scaleY:0.9987}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.2718,x:-25.3,y:187.6,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.8,x:-0.4,y:-79.4}},{t:this.instance_3,p:{rotation:-112.6065,x:-105.35,y:38.75,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:-175.2018,x:-74.25,y:112.75,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-177.9345,x:-65.75,y:114.7,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-51.6639,y:-22.6,x:-56.7,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.0733,x:-22.45,y:90.75,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9981,scaleY:0.9981,rotation:-47.6059,x:45.2,y:-26.2,regY:-0.2}},{t:this.instance_13,p:{rotation:-66.2123,x:95.6,y:-82.85,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.9}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9981,scaleY:0.9981,rotation:-67.6179,x:128.5,y:-156.4}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:-102.4892,x:131.1,y:-168.15,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.8489,y:92.55,x:16.35}},{t:this.instance_9,p:{regY:-52.8,scaleX:0.9974,scaleY:0.9974,rotation:-11.9575,x:31.6,y:187.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3186,y:-58.5,x:-5.3,scaleX:0.9987,scaleY:0.9987}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.2718,x:-25.3,y:187.6,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.8,x:-0.4,y:-79.4}},{t:this.instance_3,p:{rotation:-112.4431,x:-105.95,y:38.15,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:-175.0409,x:-75.05,y:112.25,regY:-8.8,regX:5.9}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-178.7409,x:-66.65,y:114.25,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-51.0244,y:-22.65,x:-56.7,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.0733,x:-22.45,y:90.7,regX:3.4}},{t:this.instance_14,p:{regX:-33.2,scaleX:0.9981,scaleY:0.9981,rotation:-52.7368,x:45.05,y:-26.1,regY:-0.2}},{t:this.instance_13,p:{rotation:-65.2149,x:90.5,y:-87.15,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9981,scaleY:0.9981,rotation:-64.4691,x:124.45,y:-160.1}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:-102.2065,x:127.45,y:-171.65,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.8489,y:92.55,x:16.3}},{t:this.instance_9,p:{regY:-52.8,scaleX:0.9974,scaleY:0.9974,rotation:-11.9566,x:31.55,y:187.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3186,y:-58.5,x:-5.25,scaleX:0.9987,scaleY:0.9987}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.2718,x:-25.3,y:187.6,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.8,x:-0.4,y:-79.4}},{t:this.instance_3,p:{rotation:-112.2782,x:-106.65,y:37.65,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:-174.8791,x:-76.05,y:111.8,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-179.5479,x:-67.5,y:113.75,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-50.3851,y:-22.65,x:-56.7,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.0777,x:-22.4,y:90.7,regX:3.4}},{t:this.instance_14,p:{regX:-33.2,scaleX:0.9982,scaleY:0.9982,rotation:-52.7342,x:45.1,y:-26.1,regY:-0.2}},{t:this.instance_13,p:{rotation:-65.2216,x:90.4,y:-87.1,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9982,scaleY:0.9982,rotation:-64.4899,x:124.4,y:-160.1}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:-102.2318,x:127.4,y:-171.7,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.8614,y:92.55,x:16.3}},{t:this.instance_9,p:{regY:-52.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.9611,x:31.6,y:187.8,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3176,y:-58.5,x:-5.25,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.2837,x:-25.3,y:187.6,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.7938,x:-0.35,y:-79.4}},{t:this.instance_3,p:{rotation:-112.2801,x:-106.65,y:37.65,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:-174.8703,x:-76.05,y:111.75,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-179.5321,x:-67.5,y:113.85,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-50.3881,y:-22.65,x:-56.7,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.0829,x:-22.3,y:90.75,regX:3.5}},{t:this.instance_14,p:{regX:-33.2,scaleX:0.9982,scaleY:0.9982,rotation:-52.733,x:45.1,y:-26.1,regY:-0.2}},{t:this.instance_13,p:{rotation:-65.229,x:90.45,y:-87.1,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9982,scaleY:0.9982,rotation:-64.5091,x:124.45,y:-160.1}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:-102.256,x:127.4,y:-171.75,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.8748,y:92.55,x:16.3}},{t:this.instance_9,p:{regY:-52.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.9656,x:31.55,y:187.85,regX:3.7}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3175,y:-58.5,x:-5.3,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.2988,x:-25.3,y:187.6,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.7877,x:-0.35,y:-79.4}},{t:this.instance_3,p:{rotation:-112.2809,x:-106.65,y:37.65,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:-174.8615,x:-76.05,y:111.75,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-179.5164,x:-67.5,y:113.85,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-50.3907,y:-22.65,x:-56.7,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.998,scaleY:0.998,rotation:-1.0881,x:-22.3,y:90.8,regX:3.5}},{t:this.instance_14,p:{regX:-33.2,scaleX:0.9982,scaleY:0.9982,rotation:-52.7311,x:45.1,y:-26.15,regY:-0.2}},{t:this.instance_13,p:{rotation:-65.2361,x:90.4,y:-87.1,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9981,scaleY:0.9981,rotation:-64.5295,x:124.4,y:-160.1}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:-102.2811,x:127.45,y:-171.75,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.8874,y:92.55,x:16.3}},{t:this.instance_9,p:{regY:-52.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.9711,x:31.65,y:187.8,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3166,y:-58.5,x:-5.3,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9977,scaleY:0.9977,rotation:15.3126,x:-25.2,y:187.55,regX:3.4}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.7824,x:-0.3,y:-79.4}},{t:this.instance_3,p:{rotation:-112.2829,x:-106.65,y:37.65,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:-174.8519,x:-76,y:111.75,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-179.5015,x:-67.5,y:113.85,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-50.3932,y:-22.65,x:-56.7,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.998,scaleY:0.998,rotation:-1.0925,x:-22.45,y:90.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.2,scaleX:0.9982,scaleY:0.9982,rotation:-52.7298,x:45.1,y:-26.15,regY:-0.2}},{t:this.instance_13,p:{rotation:-65.2447,x:90.4,y:-87.1,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9982,scaleY:0.9982,rotation:-64.5483,x:124.45,y:-160.1}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:-102.3062,x:127.35,y:-171.75,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.8999,y:92.55,x:16.3}},{t:this.instance_9,p:{regY:-52.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.9764,x:31.7,y:187.8,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3166,y:-58.5,x:-5.3,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9977,scaleY:0.9977,rotation:15.3264,x:-25.25,y:187.45,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.7763,x:-0.4,y:-79.4}},{t:this.instance_3,p:{rotation:-112.284,x:-106.65,y:37.65,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:-174.843,x:-76,y:111.75,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-179.4866,x:-67.5,y:113.8,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-50.3958,y:-22.65,x:-56.7,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.0978,x:-22.4,y:90.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.2,scaleX:0.9981,scaleY:0.9981,rotation:-52.7268,x:45.1,y:-26.15,regY:-0.2}},{t:this.instance_13,p:{rotation:-65.2521,x:90.4,y:-87.1,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9981,scaleY:0.9981,rotation:-64.5682,x:124.45,y:-160.1}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:-102.3313,x:127.35,y:-171.75,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.9142,y:92.55,x:16.25}},{t:this.instance_9,p:{regY:-52.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.9817,x:31.7,y:187.8,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3157,y:-58.5,x:-5.3,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9977,scaleY:0.9977,rotation:15.3409,x:-25.2,y:187.45,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.7702,x:-0.4,y:-79.4}},{t:this.instance_3,p:{rotation:-112.2852,x:-106.6,y:37.65,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:-174.8343,x:-76,y:111.8,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-179.4717,x:-67.5,y:113.8,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-50.3975,y:-22.65,x:-56.7,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.1031,x:-22.4,y:90.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.2,scaleX:0.9981,scaleY:0.9981,rotation:-52.7261,x:45.1,y:-26.15,regY:-0.2}},{t:this.instance_13,p:{rotation:-65.2584,x:90.35,y:-87.1,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9982,scaleY:0.9982,rotation:-64.5878,x:124.4,y:-160.1}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:-102.3572,x:127.4,y:-171.75,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.9269,y:92.55,x:16.3}},{t:this.instance_9,p:{regY:-52.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.9881,x:31.75,y:187.8,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3157,y:-58.5,x:-5.3,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.3543,x:-25.35,y:187.55,regX:3.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.7641,x:-0.4,y:-79.4}},{t:this.instance_3,p:{rotation:-112.2876,x:-106.6,y:37.65,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-174.8256,x:-76,y:111.75,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-179.4568,x:-67.5,y:113.8,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-50.4,y:-22.65,x:-56.7,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.1083,x:-22.4,y:90.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.2,scaleX:0.9982,scaleY:0.9982,rotation:-52.7242,x:45.1,y:-26.15,regY:-0.2}},{t:this.instance_13,p:{rotation:-65.267,x:90.4,y:-87.1,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9981,scaleY:0.9981,rotation:-64.6078,x:124.4,y:-160.05}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:-102.3823,x:127.35,y:-171.7,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.9404,y:92.55,x:16.3}},{t:this.instance_9,p:{regY:-52.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.9934,x:31.7,y:187.8,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.315,y:-58.5,x:-5.3,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9977,scaleY:0.9977,rotation:15.3692,x:-25.3,y:187.45,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.7588,x:-0.4,y:-79.4}},{t:this.instance_3,p:{rotation:-112.2876,x:-106.6,y:37.65,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:-174.8166,x:-76,y:111.75,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-179.4419,x:-67.45,y:113.8,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-50.4038,y:-22.65,x:-56.7,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.1136,x:-22.45,y:90.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.2,scaleX:0.9982,scaleY:0.9982,rotation:-52.723,x:45.15,y:-26.1,regY:-0.1}},{t:this.instance_13,p:{rotation:-65.2745,x:90.4,y:-87.1,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.5,scaleX:0.9981,scaleY:0.9981,rotation:-64.627,x:124.35,y:-160.15}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:-102.4074,x:127.3,y:-171.7,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.9531,y:92.55,x:16.3}},{t:this.instance_9,p:{regY:-52.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.9988,x:31.8,y:187.8,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3142,y:-58.5,x:-5.3,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9977,scaleY:0.9977,rotation:15.3836,x:-25.3,y:187.5,regX:3.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.7535,x:-0.4,y:-79.4}},{t:this.instance_3,p:{rotation:-112.2907,x:-106.6,y:37.7,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:-174.8078,x:-76,y:111.75,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-179.427,x:-67.45,y:113.8,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-50.4056,y:-22.65,x:-56.7,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.1188,x:-22.4,y:90.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.2,scaleX:0.9982,scaleY:0.9982,rotation:-52.7211,x:45.15,y:-26.1,regY:-0.1}},{t:this.instance_13,p:{rotation:-65.2823,x:90.4,y:-87.1,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.5,scaleX:0.9981,scaleY:0.9981,rotation:-64.6466,x:124.3,y:-160.15}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:-102.4318,x:127.35,y:-171.75,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.9655,y:92.55,x:16.3}},{t:this.instance_9,p:{regY:-52.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0032,x:31.75,y:187.8,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3142,y:-58.5,x:-5.3,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9977,scaleY:0.9977,rotation:15.3972,x:-25.25,y:187.45,regX:3.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.7465,x:-0.4,y:-79.4}},{t:this.instance_3,p:{rotation:-112.2915,x:-106.6,y:37.7,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:-174.7991,x:-76,y:111.75,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-179.4112,x:-67.45,y:113.85,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-50.4082,y:-22.65,x:-56.7,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.1241,x:-22.4,y:90.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.2,scaleX:0.9982,scaleY:0.9982,rotation:-52.7191,x:45.15,y:-26.1,regY:-0.1}},{t:this.instance_13,p:{rotation:-65.2898,x:90.4,y:-87.1,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.5,scaleX:0.9981,scaleY:0.9981,rotation:-64.667,x:124.25,y:-160.1}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:-102.4569,x:127.3,y:-171.8,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.9797,y:92.55,x:16.3}},{t:this.instance_9,p:{regY:-52.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0087,x:31.8,y:187.85,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3131,y:-58.5,x:-5.3,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.4117,x:-25.3,y:187.6,regX:3.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.7404,x:-0.3,y:-79.4}},{t:this.instance_3,p:{rotation:-112.2931,x:-106.6,y:37.7,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:-174.7902,x:-76,y:111.8,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-179.3963,x:-67.45,y:113.85,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-50.41,y:-22.65,x:-56.7,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.1293,x:-22.4,y:90.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.2,scaleX:0.9982,scaleY:0.9982,rotation:-52.7179,x:45.15,y:-26.1,regY:-0.1}},{t:this.instance_13,p:{rotation:-65.2972,x:90.45,y:-87.1,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.5,scaleX:0.9981,scaleY:0.9981,rotation:-64.6862,x:124.3,y:-160.15}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:-102.482,x:127.25,y:-171.85,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.9923,y:92.55,x:16.3}},{t:this.instance_9,p:{regY:-52.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0141,x:31.75,y:187.8,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3131,y:-58.5,x:-5.3,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.4264,x:-25.2,y:187.65,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.736,x:-0.35,y:-79.4}},{t:this.instance_3,p:{rotation:-112.2954,x:-106.6,y:37.7,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:-174.7815,x:-76,y:111.8,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-179.3815,x:-67.45,y:113.95,regY:-1.4}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-50.4131,y:-22.65,x:-56.7,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.998,scaleY:0.998,rotation:-1.1337,x:-22.45,y:90.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.2,scaleX:0.9981,scaleY:0.9981,rotation:-52.7162,x:45.15,y:-26.1,regY:-0.1}},{t:this.instance_13,p:{rotation:-65.3038,x:90.45,y:-87.15,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.5,scaleX:0.9982,scaleY:0.9982,rotation:-64.7062,x:124.25,y:-160.2}},{t:this.instance_11,p:{regY:2.9,scaleX:0.998,scaleY:0.998,rotation:-102.5069,x:127.25,y:-171.85,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0048,y:92.5,x:16.3}},{t:this.instance_9,p:{regY:-52.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0203,x:31.75,y:187.8,regX:3.7}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3123,y:-58.5,x:-5.3,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.44,x:-25.25,y:187.65,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.7299,x:-0.35,y:-79.4}},{t:this.instance_3,p:{rotation:-112.2962,x:-106.65,y:37.7,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:-174.7736,x:-75.95,y:111.8,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-179.3666,x:-67.45,y:113.95,regY:-1.4}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-50.4156,y:-22.65,x:-56.7,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.998,scaleY:0.998,rotation:-1.139,x:-22.35,y:90.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.2,scaleX:0.9982,scaleY:0.9982,rotation:-52.7142,x:45.15,y:-26.1,regY:-0.1}},{t:this.instance_13,p:{rotation:-65.3113,x:90.45,y:-87.15,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.5,scaleX:0.9981,scaleY:0.9981,rotation:-64.7258,x:124.3,y:-160.15}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:-102.533,x:127.25,y:-171.85,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0191,y:92.5,x:16.3}},{t:this.instance_9,p:{regY:-52.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0258,x:31.85,y:187.75,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3121,y:-58.5,x:-5.3,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.4544,x:-25.3,y:187.5,regX:3.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.7238,x:-0.4,y:-79.4}},{t:this.instance_3,p:{rotation:-112.2979,x:-106.65,y:37.7,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:-174.763,x:-75.95,y:111.8,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-179.3517,x:-67.45,y:113.8,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-50.4181,y:-22.65,x:-56.7,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.1442,x:-22.35,y:90.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.2,scaleX:0.9981,scaleY:0.9981,rotation:-52.7118,x:45.1,y:-26.1,regY:-0.1}},{t:this.instance_13,p:{rotation:-65.3183,x:90.4,y:-87.15,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.5,scaleX:0.9981,scaleY:0.9981,rotation:-64.7457,x:124.25,y:-160.2}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:-102.5574,x:127.2,y:-171.8,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0308,y:92.5,x:16.3}},{t:this.instance_9,p:{regY:-52.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0311,x:31.9,y:187.75,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3113,y:-58.5,x:-5.3,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.4686,x:-25.25,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.7176,x:-0.35,y:-79.4}},{t:this.instance_3,p:{rotation:-112.299,x:-106.65,y:37.7,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:-174.7542,x:-75.95,y:111.8,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-179.3368,x:-67.45,y:113.8,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-50.4205,y:-22.7,x:-56.7,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.1442,x:-22.35,y:90.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9981,scaleY:0.9981,rotation:-47.2587,x:45.15,y:-26.3,regY:-0.2}},{t:this.instance_13,p:{rotation:-60.498,x:96.05,y:-82.55,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6.1,regY:8.6,scaleX:0.9981,scaleY:0.9981,rotation:-61.0311,x:135.95,y:-152.35}},{t:this.instance_11,p:{regY:2.8,scaleX:0.9979,scaleY:0.9979,rotation:-97.3618,x:139.65,y:-163.8,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0308,y:92.5,x:16.3}},{t:this.instance_9,p:{regY:-52.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0311,x:31.9,y:187.75,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3113,y:-58.5,x:-5.3,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.4686,x:-25.25,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.7176,x:-0.35,y:-79.4}},{t:this.instance_3,p:{rotation:-112.6143,x:-106.2,y:37.95,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-175.07,x:-75.05,y:111.95,regY:-8.8,regX:5.9}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-179.1589,x:-66.6,y:113.9,regY:-1.3}},{t:this.instance,p:{regX:35.6,scaleX:0.998,scaleY:0.998,rotation:-50.7972,y:-22.55,x:-56.75,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.1442,x:-22.35,y:90.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:-41.8057,x:45.1,y:-26.3,regY:-0.2}},{t:this.instance_13,p:{rotation:-55.6768,x:101.2,y:-77.4,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9981,scaleY:0.9981,rotation:-57.3157,x:146.75,y:-143.75}},{t:this.instance_11,p:{regY:2.9,scaleX:0.998,scaleY:0.998,rotation:-92.1662,x:151.6,y:-154.75,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0308,y:92.5,x:16.3}},{t:this.instance_9,p:{regY:-52.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0311,x:31.9,y:187.75,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3113,y:-58.5,x:-5.3,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.4686,x:-25.25,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.7176,x:-0.35,y:-79.4}},{t:this.instance_3,p:{rotation:-112.932,x:-105.85,y:38.35,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:-175.3872,x:-74.25,y:112.15,regY:-8.8,regX:5.9}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-178.981,x:-65.8,y:114.1,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-51.1715,y:-22.6,x:-56.75,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.1442,x:-22.35,y:90.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:-36.3523,x:45.25,y:-26.15,regY:-0.2}},{t:this.instance_13,p:{rotation:-50.8573,x:105.7,y:-71.9,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.9}},{t:this.instance_12,p:{regX:-6,regY:8.5,scaleX:0.9981,scaleY:0.9981,rotation:-53.6022,x:156.85,y:-134.2}},{t:this.instance_11,p:{regY:2.9,scaleX:0.998,scaleY:0.998,rotation:-86.9735,x:162.5,y:-144.7,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0308,y:92.5,x:16.35}},{t:this.instance_9,p:{regY:-52.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0311,x:31.9,y:187.75,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3113,y:-58.5,x:-5.3,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.4686,x:-25.25,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.7176,x:-0.4,y:-79.4}},{t:this.instance_3,p:{rotation:-113.2475,x:-105.4,y:38.7,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:-175.7027,x:-73.45,y:112.3,regY:-8.8,regX:5.9}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-178.8031,x:-65.05,y:114.15,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-51.5472,y:-22.6,x:-56.7,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.1442,x:-22.35,y:90.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:-30.8978,x:45.25,y:-26.25,regY:-0.2}},{t:this.instance_13,p:{rotation:-46.0344,x:109.9,y:-65.9,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9981,scaleY:0.9981,rotation:-49.8871,x:166,y:-123.6}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:-81.7769,x:172.45,y:-133.7,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0308,y:92.5,x:16.35}},{t:this.instance_9,p:{regY:-52.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0311,x:31.95,y:187.75,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3113,y:-58.5,x:-5.3,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.4686,x:-25.25,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.7176,x:-0.4,y:-79.4}},{t:this.instance_3,p:{rotation:-113.563,x:-105.05,y:38.9,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-176.0189,x:-72.65,y:112.4,regY:-8.8,regX:5.9}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-178.6261,x:-64.2,y:114.25,regY:-1.3}},{t:this.instance,p:{regX:35.6,scaleX:0.998,scaleY:0.998,rotation:-51.9222,y:-22.5,x:-56.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.1442,x:-22.35,y:90.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:-25.4463,x:45.2,y:-26.25,regY:-0.2}},{t:this.instance_13,p:{rotation:-41.2128,x:113.35,y:-59.55,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.5,scaleX:0.9981,scaleY:0.9981,rotation:-46.1738,x:174.05,y:-112.5}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:-76.5804,x:181.35,y:-121.9,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0308,y:92.5,x:16.35}},{t:this.instance_9,p:{regY:-52.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0311,x:31.95,y:187.75,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3113,y:-58.5,x:-5.3,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.4686,x:-25.25,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.7176,x:-0.4,y:-79.4}},{t:this.instance_3,p:{rotation:-113.8802,x:-104.6,y:39.25,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:-176.3358,x:-72,y:112.5,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-178.4482,x:-63.4,y:114.35,regY:-1.3}},{t:this.instance,p:{regX:35.8,scaleX:0.998,scaleY:0.998,rotation:-52.2972,y:-22.65,x:-56.65,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.1442,x:-22.35,y:90.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:-19.9931,x:45.25,y:-26.25,regY:-0.2}},{t:this.instance_13,p:{rotation:-36.3921,x:116.3,y:-52.95,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9981,scaleY:0.9981,rotation:-42.4592,x:181.25,y:-100.5}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:-71.3841,x:189.25,y:-109.4,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0308,y:92.5,x:16.35}},{t:this.instance_9,p:{regY:-52.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0311,x:31.95,y:187.8,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3113,y:-58.5,x:-5.3,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.4686,x:-25.25,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.7176,x:-0.4,y:-79.4}},{t:this.instance_3,p:{rotation:-114.1959,x:-104.2,y:39.6,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:-176.6517,x:-71.2,y:112.65,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-178.2712,x:-62.55,y:114.4,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-52.6734,y:-22.65,x:-56.85,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.1442,x:-22.35,y:90.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:-14.5399,x:45.25,y:-26.3,regY:-0.2}},{t:this.instance_13,p:{rotation:-31.5711,x:118.5,y:-46.1,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9981,scaleY:0.9981,rotation:-38.745,x:187.25,y:-87.95}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:-66.188,x:195.95,y:-96.25,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0308,y:92.5,x:16.35}},{t:this.instance_9,p:{regY:-52.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0311,x:31.95,y:187.8,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3113,y:-58.5,x:-5.3,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.4686,x:-25.25,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.7176,x:-0.4,y:-79.4}},{t:this.instance_3,p:{rotation:-114.5119,x:-103.85,y:39.95,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-176.9677,x:-70.4,y:112.85,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-178.0915,x:-61.75,y:114.6,regY:-1.4}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-53.0492,y:-22.55,x:-56.75,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.1442,x:-22.35,y:90.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:-9.0848,x:45.25,y:-26.25,regY:-0.2}},{t:this.instance_13,p:{rotation:-26.7503,x:120.05,y:-39,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9981,scaleY:0.9981,rotation:-35.0302,x:192.1,y:-75.05}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:-60.9909,x:201.4,y:-82.5,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0308,y:92.5,x:16.35}},{t:this.instance_9,p:{regY:-52.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0311,x:31.95,y:187.8,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3113,y:-58.5,x:-5.3,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.4686,x:-25.25,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.7176,x:-0.4,y:-79.4}},{t:this.instance_3,p:{rotation:-114.8282,x:-103.45,y:40.25,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:-177.2834,x:-69.6,y:112.85,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-177.9144,x:-60.9,y:114.6,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-53.4241,y:-22.55,x:-56.7,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.1442,x:-22.35,y:90.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:-3.632,x:45.35,y:-26.3,regY:-0.2}},{t:this.instance_13,p:{rotation:-21.9301,x:121.05,y:-31.9,regX:-40.1,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9981,scaleY:0.9981,rotation:-31.3142,x:195.75,y:-61.65}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:-55.7941,x:205.6,y:-68.35,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0308,y:92.5,x:16.35}},{t:this.instance_9,p:{regY:-52.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0311,x:31.95,y:187.8,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3113,y:-58.5,x:-5.3,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.4686,x:-25.25,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.7176,x:-0.45,y:-79.4}},{t:this.instance_3,p:{rotation:-115.1436,x:-103.05,y:40.5,regY:0.1,scaleX:0.998,scaleY:0.998}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:-177.5999,x:-68.8,y:113.05,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-177.7373,x:-60.1,y:114.75,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-53.7999,y:-22.55,x:-56.7,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.1442,x:-22.35,y:90.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:1.8159,x:45.35,y:-26.25,regY:-0.2}},{t:this.instance_13,p:{rotation:-17.1088,x:121.15,y:-24.75,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9981,scaleY:0.9981,rotation:-27.6,x:198.25,y:-48.1}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:-50.5979,x:208.55,y:-53.85,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0308,y:92.5,x:16.35}},{t:this.instance_9,p:{regY:-52.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0311,x:32,y:187.8,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3113,y:-58.5,x:-5.3,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.4686,x:-25.25,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.7176,x:-0.45,y:-79.4}},{t:this.instance_3,p:{rotation:-115.4599,x:-102.6,y:40.8,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-177.9156,x:-68,y:113.3,regY:-8.9,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-177.5584,x:-59.3,y:114.75,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-54.1751,y:-22.6,x:-56.85,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.1442,x:-22.35,y:90.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:7.2698,x:45.4,y:-26.3,regY:-0.2}},{t:this.instance_13,p:{rotation:-12.288,x:120.8,y:-17.55,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9981,scaleY:0.9981,rotation:-23.8867,x:199.35,y:-34.4}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:-45.4014,x:210.15,y:-39.25,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0308,y:92.5,x:16.35}},{t:this.instance_9,p:{regY:-52.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0311,x:32,y:187.8,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3113,y:-58.5,x:-5.3,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.4686,x:-25.25,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.7176,x:-0.45,y:-79.4}},{t:this.instance_3,p:{rotation:-115.7768,x:-102.2,y:41.1,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:-178.232,x:-67.2,y:113.25,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-177.3813,x:-58.45,y:114.8,regY:-1.3}},{t:this.instance,p:{regX:35.6,scaleX:0.998,scaleY:0.998,rotation:-54.5504,y:-22.45,x:-56.85,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.1442,x:-22.35,y:90.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:12.7229,x:45.35,y:-26.3,regY:-0.2}},{t:this.instance_13,p:{rotation:-7.4674,x:119.55,y:-10.4,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9982,scaleY:0.9982,rotation:-20.1705,x:199.4,y:-20.6}},{t:this.instance_11,p:{regY:2.8,scaleX:0.9979,scaleY:0.9979,rotation:-40.2057,x:210.55,y:-24.7,regX:-4.8}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0308,y:92.5,x:16.35}},{t:this.instance_9,p:{regY:-52.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0311,x:32,y:187.8,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3113,y:-58.5,x:-5.3,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.4686,x:-25.25,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.7176,x:-0.45,y:-79.4}},{t:this.instance_3,p:{rotation:-116.0922,x:-101.8,y:41.45,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:-178.5483,x:-66.35,y:113.45,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-177.2023,x:-57.65,y:114.85,regY:-1.3}},{t:this.instance,p:{regX:35.6,scaleX:0.998,scaleY:0.998,rotation:-54.9249,y:-22.5,x:-56.9,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.1442,x:-22.35,y:90.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:18.1754,x:45.35,y:-26.25,regY:-0.2}},{t:this.instance_13,p:{rotation:-2.6471,x:117.7,y:-3.45,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6.1,regY:8.6,scaleX:0.9981,scaleY:0.9981,rotation:-16.456,x:198.05,y:-6.8}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:-35.0096,x:209.55,y:-9.95,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0308,y:92.5,x:16.35}},{t:this.instance_9,p:{regY:-52.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0311,x:32,y:187.8,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3113,y:-58.5,x:-5.3,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.4686,x:-25.25,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.7176,x:-0.45,y:-79.4}},{t:this.instance_3,p:{rotation:-116.4099,x:-101.45,y:41.75,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-178.8638,x:-65.6,y:113.6,regY:-8.9,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-177.0251,x:-56.8,y:114.9,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-55.3011,y:-22.55,x:-56.75,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.1442,x:-22.35,y:90.85,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:23.6292,x:45.4,y:-26.3,regY:-0.2}},{t:this.instance_13,p:{rotation:2.1711,x:115.25,y:3.3,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9982,scaleY:0.9982,rotation:-12.7422,x:195.65,y:6.65}},{t:this.instance_11,p:{regY:2.8,scaleX:0.9979,scaleY:0.9979,rotation:-29.8132,x:207.2,y:4.5,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0308,y:92.5,x:16.35}},{t:this.instance_9,p:{regY:-52.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0311,x:32,y:187.8,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3113,y:-58.5,x:-5.3,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.4686,x:-25.2,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.7176,x:-0.45,y:-79.45}},{t:this.instance_3,p:{rotation:-116.7249,x:-100.85,y:42,regY:0.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:-179.18,x:-64.8,y:113.55,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-176.847,x:-56,y:115.1,regY:-1.4}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-55.6768,y:-22.55,x:-56.75,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.1442,x:-22.35,y:90.85,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:29.0825,x:45.45,y:-26.2,regY:-0.2}},{t:this.instance_13,p:{rotation:6.9924,x:112.15,y:9.6,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.9}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9982,scaleY:0.9982,rotation:-9.0275,x:192,y:19.85}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:-24.6175,x:203.65,y:18.75,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0308,y:92.5,x:16.35}},{t:this.instance_9,p:{regY:-52.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0311,x:32,y:187.8,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3113,y:-58.5,x:-5.35,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.4686,x:-25.2,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.7176,x:-0.45,y:-79.45}},{t:this.instance_3,p:{rotation:-117.0414,x:-100.55,y:42.3,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:-179.4972,x:-64,y:113.65,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-176.6698,x:-55.15,y:115,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-56.0526,y:-22.5,x:-56.75,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.1442,x:-22.35,y:90.85,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:34.5352,x:45.45,y:-26.25,regY:-0.2}},{t:this.instance_13,p:{rotation:11.8133,x:108.4,y:15.95,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9981,scaleY:0.9981,rotation:-5.3138,x:187.15,y:32.7}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:-19.4213,x:198.9,y:32.6,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0308,y:92.5,x:16.35}},{t:this.instance_9,p:{regY:-52.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0311,x:32.05,y:187.8,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3113,y:-58.5,x:-5.35,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.4686,x:-25.2,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.7176,x:-0.45,y:-79.45}},{t:this.instance_3,p:{rotation:-117.3568,x:-100.1,y:42.55,regY:0.1,scaleX:0.998,scaleY:0.998}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:-179.8125,x:-63.2,y:113.85,regY:-8.9,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-176.4916,x:-54.3,y:115.05,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-56.4278,y:-22.6,x:-56.8,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.1442,x:-22.35,y:90.85,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9981,scaleY:0.9981,rotation:39.9893,x:45.45,y:-26.25,regY:-0.2}},{t:this.instance_13,p:{rotation:16.6336,x:104.15,y:21.75,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9982,scaleY:0.9982,rotation:-1.5978,x:181.15,y:45.05}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:-14.2234,x:192.85,y:45.85,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0308,y:92.5,x:16.35}},{t:this.instance_9,p:{regY:-52.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0311,x:32.05,y:187.8,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3113,y:-58.5,x:-5.35,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.4686,x:-25.2,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.7176,x:-0.45,y:-79.45}},{t:this.instance_3,p:{rotation:-117.6734,x:-99.7,y:42.85,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:179.8756,x:-62.4,y:113.8,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-176.3134,x:-53.5,y:115.05,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-56.8027,y:-22.5,x:-56.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.1442,x:-22.35,y:90.85,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9981,scaleY:0.9981,rotation:45.441,x:45.4,y:-26.25,regY:-0.2}},{t:this.instance_13,p:{rotation:21.454,x:99.35,y:27,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.9}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9982,scaleY:0.9982,rotation:2.1114,x:174.15,y:56.85}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:-9.0269,x:185.65,y:58.55,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0308,y:92.5,x:16.35}},{t:this.instance_9,p:{regY:-52.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0311,x:32.05,y:187.8,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3113,y:-58.5,x:-5.35,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.4686,x:-25.2,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.7176,x:-0.45,y:-79.45}},{t:this.instance_3,p:{rotation:-117.9892,x:-99.3,y:43.15,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:179.5594,x:-61.55,y:113.9,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-176.1369,x:-52.65,y:115.1,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-57.1768,y:-22.55,x:-56.75,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.1442,x:-22.35,y:90.85,regX:3.4}},{t:this.instance_14,p:{regX:-33.2,scaleX:0.9981,scaleY:0.9981,rotation:50.8953,x:45.35,y:-26.35,regY:-0.2}},{t:this.instance_13,p:{rotation:26.2748,x:93.95,y:32.05,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9982,scaleY:0.9982,rotation:5.8268,x:166.1,y:67.9}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:-3.8305,x:177.35,y:70.6,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0308,y:92.5,x:16.35}},{t:this.instance_9,p:{regY:-52.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0311,x:32.05,y:187.8,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3113,y:-58.5,x:-5.35,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.4686,x:-25.2,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.7176,x:-0.45,y:-79.45}},{t:this.instance_3,p:{rotation:-118.3059,x:-98.85,y:43.4,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:179.2431,x:-60.75,y:114.1,regY:-8.9,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-175.9586,x:-51.85,y:115.2,regY:-1.4}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-57.5545,y:-22.5,x:-56.75,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.1442,x:-22.35,y:90.85,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:56.349,x:45.35,y:-26.3,regY:-0.1}},{t:this.instance_13,p:{rotation:31.096,x:88.25,y:36.35,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9982,scaleY:0.9982,rotation:9.5404,x:157.1,y:78.05}},{t:this.instance_11,p:{regY:2.9,scaleX:0.998,scaleY:0.998,rotation:1.3607,x:168.1,y:81.85,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0308,y:92.5,x:16.4}},{t:this.instance_9,p:{regY:-52.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0311,x:32.05,y:187.8,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3113,y:-58.5,x:-5.35,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.4686,x:-25.2,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.7176,x:-0.45,y:-79.45}},{t:this.instance_3,p:{rotation:-118.6217,x:-98.45,y:43.7,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:178.9277,x:-59.95,y:114.05,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-175.7794,x:-51.05,y:115.15,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-57.929,y:-22.5,x:-56.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.1442,x:-22.35,y:90.85,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:61.8013,x:45.5,y:-26.35,regY:-0.2}},{t:this.instance_13,p:{rotation:35.9177,x:82.1,y:40.15,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9981,scaleY:0.9981,rotation:13.2547,x:147.15,y:87.5}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:6.5579,x:157.95,y:92.1,regX:-4.8}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0308,y:92.5,x:16.4}},{t:this.instance_9,p:{regY:-52.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0311,x:32.05,y:187.8,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3113,y:-58.5,x:-5.35,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.4686,x:-25.2,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.7176,x:-0.5,y:-79.45}},{t:this.instance_3,p:{rotation:-118.9377,x:-97.95,y:43.95,regY:0.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:178.6114,x:-59.15,y:114.25,regY:-8.9,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-175.6028,x:-50.2,y:115.2,regY:-1.3}},{t:this.instance,p:{regX:35.6,scaleX:0.998,scaleY:0.998,rotation:-58.3043,y:-22.45,x:-56.85,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.1442,x:-22.35,y:90.85,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:67.2554,x:45.55,y:-26.3,regY:-0.2}},{t:this.instance_13,p:{rotation:40.739,x:75.6,y:43.3,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6.1,regY:8.6,scaleX:0.9981,scaleY:0.9981,rotation:16.9706,x:136.4,y:95.9}},{t:this.instance_11,p:{regY:2.9,scaleX:0.998,scaleY:0.998,rotation:11.7542,x:146.75,y:101.45,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0308,y:92.5,x:16.4}},{t:this.instance_9,p:{regY:-52.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0311,x:32.1,y:187.8,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3113,y:-58.5,x:-5.35,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.4686,x:-25.2,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.7176,x:-0.5,y:-79.45}},{t:this.instance_3,p:{rotation:-119.2534,x:-97.5,y:44.2,regY:0.2,scaleX:0.998,scaleY:0.998}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:178.295,x:-58.3,y:114.3,regY:-8.9,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-175.4244,x:-49.35,y:115.15,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-58.6799,y:-22.5,x:-56.75,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.1442,x:-22.35,y:90.85,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:72.7085,x:45.5,y:-26.35,regY:-0.2}},{t:this.instance_13,p:{rotation:45.5599,x:68.85,y:45.85,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9981,scaleY:0.9981,rotation:20.6849,x:125.1,y:103.45}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:16.9507,x:134.8,y:109.7,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0308,y:92.5,x:16.4}},{t:this.instance_9,p:{regY:-52.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0311,x:32.1,y:187.8,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3113,y:-58.5,x:-5.35,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.4686,x:-25.2,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.7176,x:-0.5,y:-79.45}},{t:this.instance_3,p:{rotation:-119.5707,x:-97.15,y:44.55,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:177.9787,x:-57.5,y:114.2,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-175.2468,x:-48.5,y:115.2,regY:-1.3}},{t:this.instance,p:{regX:35.6,scaleX:0.998,scaleY:0.998,rotation:-59.0552,y:-22.35,x:-56.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.1442,x:-22.35,y:90.85,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:78.1619,x:45.5,y:-26.3,regY:-0.2}},{t:this.instance_13,p:{rotation:50.3805,x:61.95,y:47.8,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6.1,regY:8.6,scaleX:0.9981,scaleY:0.9981,rotation:24.3995,x:113,y:109.8}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:22.1466,x:122.25,y:116.9,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0308,y:92.5,x:16.4}},{t:this.instance_9,p:{regY:-52.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0311,x:32.1,y:187.8,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3113,y:-58.5,x:-5.35,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.4686,x:-25.2,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.7176,x:-0.5,y:-79.45}},{t:this.instance_3,p:{rotation:-119.8861,x:-96.7,y:44.8,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:177.6631,x:-56.7,y:114.35,regY:-8.9,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-175.0684,x:-47.7,y:115.15,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-59.4303,y:-22.55,x:-56.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.1442,x:-22.35,y:90.85,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:83.6141,x:45.55,y:-26.3,regY:-0.2}},{t:this.instance_13,p:{rotation:55.202,x:54.85,y:49,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9981,scaleY:0.9981,rotation:28.1137,x:100.6,y:115.15}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:27.3432,x:109.25,y:123,regX:-4.8}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0308,y:92.5,x:16.4}},{t:this.instance_9,p:{regY:-52.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0311,x:32.1,y:187.8,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3113,y:-58.5,x:-5.35,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.4686,x:-25.2,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.7176,x:-0.5,y:-79.45}},{t:this.instance_3,p:{rotation:-120.2025,x:-96.25,y:45,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:177.3465,x:-55.9,y:114.3,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.7,scaleX:0.9979,scaleY:0.9979,rotation:-174.8924,x:-46.75,y:115.25,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-59.8049,y:-22.45,x:-56.75,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.1442,x:-22.35,y:90.85,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:89.0672,x:45.5,y:-26.3,regY:-0.2}},{t:this.instance_13,p:{rotation:60.0225,x:47.7,y:49.65,regX:-40.1,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9981,scaleY:0.9981,rotation:31.8277,x:87.7,y:119.3}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:32.5407,x:95.65,y:127.75,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0308,y:92.5,x:16.4}},{t:this.instance_9,p:{regY:-52.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0311,x:32.1,y:187.8,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3113,y:-58.5,x:-5.35,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.4686,x:-25.2,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.7176,x:-0.5,y:-79.45}},{t:this.instance_3,p:{rotation:-120.5185,x:-95.8,y:45.25,regY:0.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:177.0308,x:-55.05,y:114.3,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.7,scaleX:0.9979,scaleY:0.9979,rotation:-174.7139,x:-46,y:115.35,regY:-1.4}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-60.182,y:-22.45,x:-56.75,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.1442,x:-22.35,y:90.85,regX:3.4}},{t:this.instance_14,p:{regX:-33.2,scaleX:0.9982,scaleY:0.9982,rotation:94.5171,x:45.5,y:-26.45,regY:-0.2}},{t:this.instance_13,p:{rotation:64.8426,x:40.45,y:49.45,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9981,scaleY:0.9981,rotation:35.543,x:74.55,y:122.25}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:37.7355,x:81.65,y:131.35,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0308,y:92.5,x:16.4}},{t:this.instance_9,p:{regY:-52.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0311,x:32.1,y:187.8,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3113,y:-58.5,x:-5.35,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.4686,x:-25.2,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.7176,x:-0.55,y:-79.45}},{t:this.instance_3,p:{rotation:-120.8347,x:-95.3,y:45.5,regY:0.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:176.715,x:-54.25,y:114.4,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.7,scaleX:0.9979,scaleY:0.9979,rotation:-174.5352,x:-45.1,y:115.15,regY:-1.3}},{t:this.instance,p:{regX:35.8,scaleX:0.998,scaleY:0.998,rotation:-60.5571,y:-22.55,x:-56.8,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.1442,x:-22.35,y:90.85,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:99.9703,x:45.55,y:-26.25,regY:-0.2}},{t:this.instance_13,p:{rotation:69.6653,x:33.3,y:48.6,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9981,scaleY:0.9981,rotation:39.2571,x:61.05,y:124.1}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:42.9323,x:67.45,y:133.65,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0308,y:92.5,x:16.4}},{t:this.instance_9,p:{regY:-52.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0311,x:32.1,y:187.8,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3113,y:-58.5,x:-5.35,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.4686,x:-25.2,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.7176,x:-0.55,y:-79.45}},{t:this.instance_3,p:{rotation:-121.1509,x:-94.95,y:45.85,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.998,scaleY:0.998,rotation:176.3981,x:-53.45,y:114.4,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-174.3583,x:-44.4,y:115.15,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-60.9324,y:-22.5,x:-56.75,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.1442,x:-22.35,y:90.9,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:105.4229,x:45.65,y:-26.25,regY:-0.2}},{t:this.instance_13,p:{rotation:74.4854,x:26.25,y:47.2,regX:-40.2,scaleX:0.9981,scaleY:0.9981,regY:-0.8}},{t:this.instance_12,p:{regX:-6,regY:8.6,scaleX:0.9981,scaleY:0.9981,rotation:42.9711,x:47.7,y:124.7}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9979,scaleY:0.9979,rotation:48.1282,x:53.2,y:134.8,regX:-4.9}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0308,y:92.5,x:16.4}},{t:this.instance_9,p:{regY:-52.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0311,x:32.1,y:187.8,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3113,y:-58.5,x:-5.4,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.4686,x:-25.2,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.7176,x:-0.55,y:-79.45}},{t:this.instance_3,p:{rotation:-121.4658,x:-94.5,y:46.1,regY:0.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:176.0821,x:-52.55,y:114.45,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,scaleX:0.9979,scaleY:0.9979,rotation:-174.1796,x:-43.6,y:115.1,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-61.308,y:-22.4,x:-56.75,regY:0.5}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-146,-201.5,376.3,501.7);


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
	this.instance = new lib.ch1_uArm_rcopy_1("synched",0);
	this.instance.setTransform(-37.85,-22.7,0.6439,0.6439,-61.4331,0,0,35.8,0.4);

	this.instance_1 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_1.setTransform(-29.3,66.2,0.6438,0.6438,-174.0659,0,0,6.8,-1.4);

	this.instance_2 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_2.setTransform(-35.1,65.7,0.6439,0.6439,176.0811,0,0,6,-8.8);

	this.instance_3 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_3.setTransform(-62.05,21.55,0.6439,0.6439,-121.3577,0,0,39.6,0.1);

	this.instance_4 = new lib.ch1_headcopy_1("synched",0);
	this.instance_4.setTransform(-1.6,-59.45,0.6444,0.6444,-1.8062,0,0,0.4,52.4);

	this.instance_5 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_5.setTransform(-5.9,-21.45,0.6451,0.6451,0,0,0,-0.1,-24.2);

	this.instance_6 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_6.setTransform(-17.6,112.8,0.6436,0.6436,15.2724,0,0,3.2,-54.4);

	this.instance_7 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_7.setTransform(-4.65,-46,0.6443,0.6443,10.3229,0,0,-1.4,8.3);

	this.instance_8 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_8.setTransform(-4.75,22.65,0.6451,0.6451,0,0,0,-0.1,-23.4);

	this.instance_9 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_9.setTransform(19.35,113.05,0.6435,0.6435,-11.9558,0,0,3.7,-52.8);

	this.instance_10 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_10.setTransform(9.4,51.55,0.6435,0.6435,-11.8506,0,0,-1,1.9);

	this.instance_11 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_11.setTransform(33.45,78.7,0.6439,0.6439,48.0652,0,0,-4.9,2.9);

	this.instance_12 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_12.setTransform(29.85,72.2,0.6439,0.6439,42.8423,0,0,-6,8.6);

	this.instance_13 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_13.setTransform(15.95,22.25,0.6439,0.6439,74.3342,0,0,-40.2,-0.8);

	this.instance_14 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_14.setTransform(28.15,-25.2,0.644,0.644,105.2483,0,0,-33.2,-0.1);

	this.instance_15 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_15.setTransform(-15.65,50.45,0.6438,0.6438,-1.0755,0,0,3.4,-45.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).to({state:[]},1).wait(1));

	// Layer_1
	this.instance_16 = new lib.CharacterBad_04_interact();
	this.instance_16.setTransform(-16.35,24.15,0.6451,0.6451,0,0,0,-23.5,50.1);
	this.instance_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(1).to({_off:false},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-86.4,-138.2,137.7,324.9);


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
	this.instance.setTransform(-56.75,-22.45,0.9981,0.9981,-61.4328,0,0,35.8,0.5);

	this.instance_1 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_1.setTransform(-43.5,115.25,0.998,0.998,-174.0646,0,0,6.7,-1.3);

	this.instance_2 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_2.setTransform(-52.6,114.6,0.9981,0.9981,176.0806,0,0,6,-8.8);

	this.instance_3 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_3.setTransform(-94.3,46.15,0.9981,0.9981,-121.3578,0,0,39.6,0.2);

	this.instance_4 = new lib.ch1_headcopy2("synched",0);
	this.instance_4.setTransform(-0.6,-79.5,0.9989,0.9989,-1.8068,0,0,0.4,52.4);

	this.instance_5 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_5.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_6 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_6.setTransform(-25.35,187.55,0.9978,0.9978,15.2726,0,0,3.3,-54.5);

	this.instance_7 = new lib.ch1_neckcopy2("synched",0);
	this.instance_7.setTransform(-5.4,-58.55,0.9988,0.9988,10.3232,0,0,-1.4,8.4);

	this.instance_8 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_8.setTransform(-5.6,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_9 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_9.setTransform(31.85,187.9,0.9975,0.9975,-11.9576,0,0,3.8,-52.9);

	this.instance_10 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_10.setTransform(16.35,92.5,0.9975,0.9975,-11.8514,0,0,-1,1.8);

	this.instance_11 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_11.setTransform(53.7,134.65,0.9981,0.9981,48.0642,0,0,-5,2.8);

	this.instance_12 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_12.setTransform(48,124.6,0.9982,0.9982,42.8418,0,0,-6.2,8.6);

	this.instance_13 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_13.setTransform(26.5,47.25,0.9981,0.9981,74.3337,0,0,-40.2,-0.8);

	this.instance_14 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_14.setTransform(45.6,-26.35,0.9983,0.9983,105.2481,0,0,-33.2,-0.2);

	this.instance_15 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_15.setTransform(-22.45,90.8,0.998,0.998,-1.0758,0,0,3.4,-46.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{regY:-46.1,scaleX:0.998,scaleY:0.998,rotation:-1.0758,x:-22.45,y:90.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.2,scaleX:0.9983,scaleY:0.9983,rotation:105.2481,x:45.6,y:-26.35}},{t:this.instance_13,p:{rotation:74.3337,x:26.5,y:47.25,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6.2,scaleX:0.9982,scaleY:0.9982,rotation:42.8418,x:48,y:124.6,regY:8.6}},{t:this.instance_11,p:{regX:-5,regY:2.8,scaleX:0.9981,scaleY:0.9981,rotation:48.0642,x:53.7,y:134.65}},{t:this.instance_10,p:{regX:-1,regY:1.8,scaleX:0.9975,scaleY:0.9975,rotation:-11.8514,x:16.35,y:92.5}},{t:this.instance_9,p:{scaleX:0.9975,scaleY:0.9975,rotation:-11.9576,x:31.85,y:187.9,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3232,x:-5.4,y:-58.55,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9978,scaleY:0.9978,rotation:15.2726,x:-25.35,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-1.8068,x:-0.6,regY:52.4,y:-79.5,regX:0.4}},{t:this.instance_3,p:{regY:0.2,rotation:-121.3578,x:-94.3,y:46.15,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:176.0806,x:-52.6,y:114.6,scaleX:0.9981,scaleY:0.9981,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.7,regY:-1.3,scaleX:0.998,scaleY:0.998,rotation:-174.0646,x:-43.5,y:115.25}},{t:this.instance,p:{regX:35.8,scaleX:0.9981,scaleY:0.9981,rotation:-61.4328,x:-56.75,y:-22.45,regY:0.5}}]}).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.5999,x:-22.25,y:90.9,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:104.719,x:45.5,y:-26.3}},{t:this.instance_13,p:{rotation:73.8928,x:27.15,y:47.35,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:42.4003,x:49.3,y:124.65,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:47.6247,x:54.95,y:134.75}},{t:this.instance_10,p:{regX:-1.1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.6904,x:16.3,y:92.6}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-10.797,x:31.45,y:187.9,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3229,x:-5.35,y:-58.5,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:14.2316,x:-24.2,y:187.65,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.6029,x:-0.6,regY:52.4,y:-79.5,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-120.742,x:-94.8,y:45.95,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:176.6984,x:-53.75,y:114.8,scaleX:0.9981,scaleY:0.9981,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.4,scaleX:0.9979,scaleY:0.9979,rotation:-173.4489,x:-44.75,y:115.65}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-61.1171,x:-56.75,y:-22.45,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-2.1259,x:-22.05,y:91,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:104.1883,x:45.5,y:-26.3}},{t:this.instance_13,p:{rotation:73.4512,x:27.8,y:47.5,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:41.9588,x:50.6,y:124.65,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:47.1827,x:56.4,y:134.65}},{t:this.instance_10,p:{regX:-1.1,regY:1.9,scaleX:0.9973,scaleY:0.9973,rotation:-11.5293,x:16.25,y:92.6}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-9.6354,x:31.2,y:187.95,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3229,x:-5.35,y:-58.5,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:13.1899,x:-23.15,y:187.75,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.4007,x:-0.55,regY:52.4,y:-79.5,regX:0.4}},{t:this.instance_3,p:{regY:0.2,rotation:-120.1256,x:-95.1,y:45.65,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:177.3149,x:-54.9,y:115.05,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-172.8313,x:-45.85,y:115.85}},{t:this.instance,p:{regX:35.8,scaleX:0.998,scaleY:0.998,rotation:-60.8002,x:-56.65,y:-22.55,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-2.6502,x:-21.75,y:91.05,regX:3.5}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:103.6583,x:45.55,y:-26.3}},{t:this.instance_13,p:{rotation:73.0097,x:28.5,y:47.65,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:41.5171,x:51.9,y:124.7,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:46.7414,x:57.7,y:134.6}},{t:this.instance_10,p:{regX:-1.1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.3674,x:16.15,y:92.6}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-8.4737,x:30.9,y:188,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3229,x:-5.35,y:-58.5,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:12.1486,x:-22.3,y:187.8,regX:3.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.1967,x:-0.5,regY:52.4,y:-79.5,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-119.5088,x:-95.45,y:45.55,scaleX:0.998,scaleY:0.998}},{t:this.instance_2,p:{rotation:177.9313,x:-56,y:115.3,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.4,scaleX:0.9979,scaleY:0.9979,rotation:-172.2155,x:-47,y:116.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-60.4849,x:-56.75,y:-22.45,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46.1,scaleX:0.998,scaleY:0.998,rotation:-3.1756,x:-21.8,y:91,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:103.1281,x:45.55,y:-26.35}},{t:this.instance_13,p:{rotation:72.569,x:29.2,y:47.8,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:41.0752,x:53.15,y:124.55,regY:8.6}},{t:this.instance_11,p:{regX:-5,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:46.2996,x:58.95,y:134.5}},{t:this.instance_10,p:{regX:-1.1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.2073,x:16.1,y:92.65}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-7.3108,x:30.6,y:188.05,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3229,x:-5.35,y:-58.5,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:11.1065,x:-21.05,y:187.9,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-0.9935,x:-0.55,regY:52.5,y:-79.35,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-118.8923,x:-95.9,y:45.3,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:178.5492,x:-57.15,y:115.5,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-171.5968,x:-48.1,y:116.5}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-60.1691,x:-56.75,y:-22.45,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-3.7006,x:-21.5,y:91.1,regX:3.5}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:102.5971,x:45.55,y:-26.3}},{t:this.instance_13,p:{rotation:72.1265,x:29.85,y:47.95,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:40.6355,x:54.45,y:124.55,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:45.8585,x:60.4,y:134.45}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.0466,x:16.15,y:92.65}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.1494,x:30.25,y:188.15,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3229,x:-5.35,y:-58.5,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:10.0651,x:-19.9,y:187.9,regX:3.4}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-0.7904,x:-0.55,regY:52.4,y:-79.45,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-118.2745,x:-96.2,y:45.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:179.1652,x:-58.2,y:115.8,scaleX:0.998,scaleY:0.998,regY:-8.9,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-170.9826,x:-49.25,y:116.85}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-59.8516,x:-56.75,y:-22.45,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-4.2257,x:-21.4,y:91.2,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:102.0673,x:45.55,y:-26.3}},{t:this.instance_13,p:{rotation:71.6853,x:30.55,y:48.1,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:40.1925,x:55.75,y:124.5,regY:8.5}},{t:this.instance_11,p:{regX:-5,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:45.4169,x:61.7,y:134.3}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-10.8867,x:16.15,y:92.7}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-4.9876,x:30,y:188.15,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.324,x:-5.35,y:-58.5,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:9.0229,x:-19,y:187.95,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-0.5874,x:-0.5,regY:52.4,y:-79.45,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-117.6577,x:-96.65,y:44.9,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:179.7819,x:-59.35,y:115.8,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-170.3645,x:-50.4,y:117.05}},{t:this.instance,p:{regX:35.6,scaleX:0.998,scaleY:0.998,rotation:-59.5364,x:-56.8,y:-22.4,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-4.7503,x:-21.25,y:91.25,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:101.5367,x:45.55,y:-26.3}},{t:this.instance_13,p:{rotation:71.2446,x:31.25,y:48.25,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:39.7516,x:57,y:124.45,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:44.9752,x:63.15,y:134.25}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9973,scaleY:0.9973,rotation:-10.7256,x:16.1,y:92.7}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-3.8254,x:29.7,y:188.15,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.324,x:-5.35,y:-58.5,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:7.9835,x:-17.95,y:187.95,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-0.3834,x:-0.55,regY:52.4,y:-79.45,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-117.0422,x:-97,y:44.65,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-179.6058,x:-60.5,y:116,scaleX:0.9981,scaleY:0.9981,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.4,scaleX:0.9979,scaleY:0.9979,rotation:-169.7491,x:-51.6,y:117.45}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-59.2194,x:-56.7,y:-22.45,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-5.2753,x:-21,y:91.35,regX:3.5}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:101.0052,x:45.55,y:-26.35}},{t:this.instance_13,p:{rotation:70.803,x:31.9,y:48.35,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:39.31,x:58.4,y:124.3,regY:8.5}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:44.5342,x:64.4,y:134.05}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9973,scaleY:0.9973,rotation:-10.5657,x:16.1,y:92.7}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-2.6638,x:29.4,y:188.35,regY:-52.8,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3247,x:-5.35,y:-58.5,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:6.9406,x:-17,y:188,regX:3.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-0.1812,x:-0.55,regY:52.4,y:-79.45,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-116.4256,x:-97.35,y:44.4,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-178.989,x:-61.65,y:116.2,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-169.1323,x:-52.7,y:117.5}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-58.9034,x:-56.75,y:-22.45,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-5.8008,x:-20.9,y:91.35,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:100.4751,x:45.55,y:-26.3}},{t:this.instance_13,p:{rotation:70.3611,x:32.6,y:48.5,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:38.8684,x:59.55,y:124.35,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:44.0925,x:65.85,y:134}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-10.4043,x:16.05,y:92.75}},{t:this.instance_9,p:{scaleX:0.9975,scaleY:0.9975,rotation:-1.5016,x:29,y:188.3,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3247,x:-5.35,y:-58.5,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:5.8975,x:-15.85,y:188.05,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:0.0175,x:-0.5,regY:52.4,y:-79.45,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-115.8086,x:-97.7,y:44.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-178.3713,x:-62.8,y:116.45,scaleX:0.998,scaleY:0.998,regY:-8.9,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.2,scaleX:0.9979,scaleY:0.9979,rotation:-168.5152,x:-53.85,y:117.75}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-58.5882,x:-56.7,y:-22.45,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-6.326,x:-20.75,y:91.5,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:99.9444,x:45.55,y:-26.3}},{t:this.instance_13,p:{rotation:69.9195,x:33.3,y:48.6,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:38.4266,x:60.85,y:124.15,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:43.6508,x:67.15,y:133.8}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-10.2438,x:16.05,y:92.75}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-0.3401,x:28.8,y:188.45,regY:-52.8,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3255,x:-5.35,y:-58.5,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:4.857,x:-14.75,y:188,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:0.2206,x:-0.5,regY:52.4,y:-79.45,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-115.1911,x:-98.1,y:43.95,scaleX:0.998,scaleY:0.998}},{t:this.instance_2,p:{rotation:-177.7542,x:-63.95,y:116.5,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-167.8978,x:-55.1,y:118.05}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-58.2705,x:-56.75,y:-22.45,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-6.8516,x:-20.65,y:91.5,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:99.4148,x:45.55,y:-26.3}},{t:this.instance_13,p:{rotation:69.4774,x:34.15,y:48.65,regY:-0.9,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:37.985,x:62.15,y:124.1,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.8,scaleX:0.998,scaleY:0.998,rotation:43.2096,x:68.6,y:133.6}},{t:this.instance_10,p:{regX:-1.1,regY:1.8,scaleX:0.9974,scaleY:0.9974,rotation:-10.0819,x:15.85,y:92.65}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:0.8169,x:28.4,y:188.4,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3255,x:-5.35,y:-58.5,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:3.8147,x:-13.75,y:188.05,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:0.4245,x:-0.5,regY:52.4,y:-79.4,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-114.5746,x:-98.45,y:43.75,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-177.1378,x:-65.1,y:116.55,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.2,scaleX:0.9979,scaleY:0.9979,rotation:-167.2813,x:-56.15,y:118.2}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-57.9554,x:-56.75,y:-22.45,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-7.3759,x:-20.45,y:91.6,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:98.8835,x:45.55,y:-26.3}},{t:this.instance_13,p:{rotation:69.0366,x:34.7,y:48.8,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6.1,scaleX:0.9981,scaleY:0.9981,rotation:37.5437,x:63.3,y:123.9,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:42.7689,x:69.85,y:133.45}},{t:this.instance_10,p:{regX:-1.1,regY:1.8,scaleX:0.9974,scaleY:0.9974,rotation:-9.9216,x:15.8,y:92.7}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:1.9787,x:28.15,y:188.4,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3255,x:-5.35,y:-58.5,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:2.7728,x:-12.55,y:188,regX:3.4}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:0.6276,x:-0.45,regY:52.4,y:-79.4,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-113.9587,x:-98.8,y:43.55,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-176.5211,x:-66.25,y:116.7,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-166.6654,x:-57.4,y:118.5}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-57.6385,x:-56.8,y:-22.5,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-7.901,x:-20.3,y:91.6,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:98.3538,x:45.55,y:-26.3}},{t:this.instance_13,p:{rotation:68.5948,x:35.4,y:48.9,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:37.1024,x:64.65,y:123.85,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.8,scaleX:0.998,scaleY:0.998,rotation:42.3268,x:71.25,y:133.2}},{t:this.instance_10,p:{regX:-1,regY:1.8,scaleX:0.9974,scaleY:0.9974,rotation:-9.7613,x:15.9,y:92.65}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:3.1404,x:27.85,y:188.45,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3264,x:-5.35,y:-58.5,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:1.7309,x:-11.6,y:188.05,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:0.8298,x:-0.5,regY:52.4,y:-79.4,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-113.3409,x:-99.15,y:43.25,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-175.9048,x:-67.35,y:116.75,scaleX:0.9981,scaleY:0.9981,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-166.0485,x:-58.55,y:118.7}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-57.3221,x:-56.7,y:-22.5,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.998,scaleY:0.998,rotation:-8.4267,x:-20.15,y:91.7,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:97.8229,x:45.55,y:-26.35}},{t:this.instance_13,p:{rotation:68.1548,x:36.1,y:48.95,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:36.6607,x:65.9,y:123.65,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:41.8866,x:72.5,y:133.1}},{t:this.instance_10,p:{regX:-1,regY:1.8,scaleX:0.9974,scaleY:0.9974,rotation:-9.6002,x:15.85,y:92.7}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:4.3026,x:27.55,y:188.65,regY:-52.8,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3265,x:-5.35,y:-58.5,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:0.6897,x:-10.6,y:188,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:1.0338,x:-0.55,regY:52.4,y:-79.4,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-112.7242,x:-99.55,y:43,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-175.288,x:-68.45,y:116.95,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-165.4304,x:-59.75,y:118.9}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-57.0065,x:-56.75,y:-22.5,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46.1,scaleX:0.9979,scaleY:0.9979,rotation:-8.9514,x:-20,y:91.6,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:97.2929,x:45.55,y:-26.3}},{t:this.instance_13,p:{rotation:67.7127,x:36.9,y:49,regY:-0.9,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:36.2191,x:67.25,y:123.55,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:41.4429,x:73.9,y:132.9}},{t:this.instance_10,p:{regX:-1,regY:1.8,scaleX:0.9974,scaleY:0.9974,rotation:-9.4396,x:15.85,y:92.7}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:5.4657,x:27.1,y:188.55,regY:-52.9,regX:3.7}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3274,x:-5.35,y:-58.5,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:-0.347,x:-9.55,y:187.95,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:1.2369,x:-0.55,regY:52.4,y:-79.4,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-112.1072,x:-99.85,y:42.75,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-174.6707,x:-69.55,y:117,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:5.9}},{t:this.instance_1,p:{regX:6.8,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-164.8147,x:-60.95,y:119.1}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-56.6902,x:-56.75,y:-22.5,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-9.4769,x:-19.75,y:91.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:96.7625,x:45.55,y:-26.35}},{t:this.instance_13,p:{rotation:67.2714,x:37.55,y:49.15,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6.1,scaleX:0.9981,scaleY:0.9981,rotation:35.7778,x:68.5,y:123.25,regY:8.5}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.9981,scaleY:0.9981,rotation:41.0028,x:75.2,y:132.7}},{t:this.instance_10,p:{regX:-1,regY:1.8,scaleX:0.9974,scaleY:0.9974,rotation:-9.2779,x:15.8,y:92.7}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:6.6273,x:26.95,y:188.65,regY:-52.8,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3274,x:-5.35,y:-58.5,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:-1.3891,x:-8.45,y:187.9,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:1.4409,x:-0.55,regY:52.4,y:-79.4,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-111.4904,x:-100.3,y:42.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-174.0545,x:-70.8,y:117.2,scaleX:0.9981,scaleY:0.9981,regY:-8.9,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-164.1975,x:-62.15,y:119.25}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-56.3748,x:-56.7,y:-22.45,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-10.0013,x:-19.45,y:91.85,regX:3.5}},{t:this.instance_14,p:{regX:-33.2,scaleX:0.9982,scaleY:0.9982,rotation:96.2318,x:45.55,y:-26.45}},{t:this.instance_13,p:{rotation:66.8302,x:38.15,y:49.2,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6.1,scaleX:0.9981,scaleY:0.9981,rotation:35.3362,x:69.7,y:123.2,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.8,scaleX:0.998,scaleY:0.998,rotation:40.5611,x:76.7,y:132.35}},{t:this.instance_10,p:{regX:-1,regY:1.8,scaleX:0.9974,scaleY:0.9974,rotation:-9.1189,x:15.8,y:92.75}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:7.7892,x:26.6,y:188.55,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3274,x:-5.35,y:-58.5,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:-2.4307,x:-7.4,y:187.8,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:1.6432,x:-0.6,regY:52.4,y:-79.45,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-110.8736,x:-100.65,y:42.3,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-173.4376,x:-71.95,y:117.15,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.7,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-163.581,x:-63.15,y:119.45}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-56.0575,x:-56.7,y:-22.45,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-10.5266,x:-19.45,y:91.85,regX:3.4}},{t:this.instance_14,p:{regX:-33.2,scaleX:0.9982,scaleY:0.9982,rotation:95.7026,x:45.55,y:-26.5}},{t:this.instance_13,p:{rotation:66.3895,x:38.95,y:49.25,regY:-0.9,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:34.8949,x:71.05,y:123,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:40.1198,x:77.9,y:132.25}},{t:this.instance_10,p:{regX:-1,regY:1.8,scaleX:0.9974,scaleY:0.9974,rotation:-8.9565,x:15.75,y:92.75}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:8.9516,x:26.3,y:188.75,regY:-52.8,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3284,x:-5.35,y:-58.5,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9977,scaleY:0.9977,rotation:-3.4722,x:-6.4,y:187.7,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:1.8464,x:-0.55,regY:52.4,y:-79.4,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-110.2571,x:-101,y:42.05,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-172.8198,x:-73.15,y:117.2,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.4,scaleX:0.9979,scaleY:0.9979,rotation:-162.9646,x:-64.5,y:119.65}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-55.7416,x:-56.75,y:-22.55,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-11.0519,x:-19.25,y:91.95,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:95.1719,x:45.55,y:-26.35}},{t:this.instance_13,p:{rotation:65.9471,x:39.65,y:49.3,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:34.4536,x:72.25,y:122.85,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:39.6771,x:79.25,y:132.05}},{t:this.instance_10,p:{regX:-1,regY:1.8,scaleX:0.9974,scaleY:0.9974,rotation:-8.7968,x:15.65,y:92.8}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:10.1125,x:26,y:188.6,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3284,x:-5.35,y:-58.45,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:-4.515,x:-5.2,y:187.75,regX:3.4}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:2.0505,x:-0.55,regY:52.4,y:-79.4,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-109.6406,x:-101.35,y:41.8,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-172.204,x:-74.3,y:117.3,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-162.3467,x:-65.65,y:119.75}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-55.4251,x:-56.8,y:-22.5,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{regY:-46.1,scaleX:0.9979,scaleY:0.9979,rotation:-11.5092,x:-18.8,y:92,regX:3.4}},{t:this.instance_14,p:{regX:-33.2,scaleX:0.9982,scaleY:0.9982,rotation:94.6445,x:45.55,y:-26.5}},{t:this.instance_13,p:{rotation:65.1718,x:40.25,y:49.35,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6.1,scaleX:0.9981,scaleY:0.9981,rotation:33.6782,x:73.95,y:122.35,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:38.9021,x:81.05,y:131.5}},{t:this.instance_10,p:{regX:-1.1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-8.4087,x:15.55,y:92.85}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:11.0612,x:25.15,y:188.7,regY:-52.9,regX:3.7}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3319,x:-5.35,y:-58.45,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:-5.3638,x:-3.85,y:187.75,regX:3.4}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:2.0014,x:-0.6,regY:52.4,y:-79.4,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-109.0147,x:-101.5,y:41.6,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-171.5784,x:-75.3,y:117.5,scaleX:0.998,scaleY:0.998,regY:-8.9,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.4,scaleX:0.9979,scaleY:0.9979,rotation:-161.723,x:-66.8,y:120}},{t:this.instance,p:{regX:35.6,scaleX:0.998,scaleY:0.998,rotation:-55.2326,x:-56.85,y:-22.4,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-11.9666,x:-18.05,y:92.3,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:94.1183,x:45.5,y:-26.35}},{t:this.instance_13,p:{rotation:64.3959,x:40.95,y:49.4,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:32.9015,x:75.7,y:121.95,regY:8.5}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:38.1265,x:82.9,y:131}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-8.0188,x:15.55,y:93}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:12.0087,x:24.55,y:188.9,regY:-52.8,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3353,x:-5.35,y:-58.45,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:-6.2112,x:-2.6,y:187.85,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:1.9524,x:-0.55,regY:52.4,y:-79.4,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-108.3895,x:-101.75,y:41.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-170.9537,x:-76.45,y:117.55,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.7,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-161.0965,x:-67.7,y:120.2}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-55.0408,x:-56.8,y:-22.5,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{regY:-46.1,scaleX:0.9979,scaleY:0.9979,rotation:-12.4235,x:-17.5,y:92.3,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:93.5925,x:45.5,y:-26.35}},{t:this.instance_13,p:{rotation:63.6218,x:41.65,y:49.45,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9982,scaleY:0.9982,rotation:32.1266,x:77.4,y:121.55,regY:8.6}},{t:this.instance_11,p:{regX:-5,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:37.3517,x:84.6,y:130.4}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-7.6295,x:15.5,y:93}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:12.9547,x:23.75,y:189,regY:-52.8,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3382,x:-5.35,y:-58.45,scaleX:0.9987,scaleY:0.9987,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:-7.0598,x:-1.35,y:187.9,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:1.9033,x:-0.55,regY:52.4,y:-79.4,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-107.764,x:-101.9,y:41.3,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-170.3276,x:-77.45,y:117.65,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-160.4709,x:-68.9,y:120.35}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-54.8484,x:-56.8,y:-22.55,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-12.8809,x:-16.85,y:92.65,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:93.066,x:45.5,y:-26.4}},{t:this.instance_13,p:{rotation:62.8454,x:42.4,y:49.5,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:31.3503,x:79.05,y:121.2,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:36.5754,x:86.45,y:129.9}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-7.2405,x:15.45,y:93.1}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:13.9038,x:23.15,y:189,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3416,x:-5.35,y:-58.45,scaleX:0.9987,scaleY:0.9987,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:-7.9082,x:0.05,y:187.9,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:1.8542,x:-0.55,regY:52.4,y:-79.4,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-107.1387,x:-102.15,y:41.15,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-169.7032,x:-78.5,y:117.9,scaleX:0.998,scaleY:0.998,regY:-8.9,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-159.8451,x:-69.95,y:120.5}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-54.6559,x:-56.75,y:-22.45,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-13.3376,x:-16.2,y:92.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:92.539,x:45.5,y:-26.35}},{t:this.instance_13,p:{rotation:62.0712,x:43.05,y:49.5,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:30.5751,x:80.65,y:120.6,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:35.8006,x:88.2,y:129.35}},{t:this.instance_10,p:{regX:-1.1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-6.8509,x:15.2,y:93.15}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:14.8511,x:22.25,y:189.05,regY:-52.9,regX:3.7}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3461,x:-5.35,y:-58.45,scaleX:0.9987,scaleY:0.9987,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:-8.7567,x:1.45,y:187.95,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:1.8052,x:-0.55,regY:52.4,y:-79.4,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-106.5136,x:-102.45,y:40.95,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-169.0768,x:-79.5,y:117.8,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-159.2202,x:-71.05,y:120.75}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-54.4624,x:-56.85,y:-22.55,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-13.7946,x:-15.65,y:92.85,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:92.0131,x:45.5,y:-26.4}},{t:this.instance_13,p:{rotation:61.2947,x:43.75,y:49.5,regY:-0.8,scaleX:0.998,scaleY:0.998,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:29.8,x:82.35,y:120.15,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:35.0255,x:90.05,y:128.7}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-6.4634,x:15.25,y:93.1}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:15.7983,x:21.6,y:189.2,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3496,x:-5.35,y:-58.45,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:-9.6045,x:2.8,y:187.95,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:1.757,x:-0.55,regY:52.4,y:-79.45,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-105.8879,x:-102.6,y:40.85,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-168.4514,x:-80.45,y:117.9,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:5.9}},{t:this.instance_1,p:{regX:6.7,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-158.5951,x:-72,y:120.95}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-54.2704,x:-56.75,y:-22.45,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-14.2517,x:-14.95,y:93,regX:3.4}},{t:this.instance_14,p:{regX:-33.2,scaleX:0.9982,scaleY:0.9982,rotation:91.4865,x:45.5,y:-26.5}},{t:this.instance_13,p:{rotation:60.5199,x:44.45,y:49.5,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6.1,scaleX:0.9981,scaleY:0.9981,rotation:29.0242,x:83.95,y:119.55,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:34.2503,x:91.7,y:128.1}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-6.0739,x:15.2,y:93.15}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:16.7469,x:20.95,y:189.25,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3533,x:-5.35,y:-58.45,scaleX:0.9987,scaleY:0.9987,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:-10.4535,x:4.25,y:187.95,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:1.708,x:-0.5,regY:52.4,y:-79.45,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-105.2622,x:-102.8,y:40.65,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-167.8259,x:-81.6,y:118.1,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-157.9695,x:-73.25,y:121.1}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-54.0778,x:-56.7,y:-22.5,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-14.7096,x:-14.3,y:93.2,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:90.96,x:45.45,y:-26.4}},{t:this.instance_13,p:{rotation:59.7446,x:45.3,y:49.5,regY:-0.9,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9982,scaleY:0.9982,rotation:28.2488,x:85.6,y:119.05,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:33.4731,x:93.5,y:127.4}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-5.6843,x:15.15,y:93.2}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:17.6934,x:20.15,y:189.4,regY:-52.8,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3559,x:-5.35,y:-58.45,scaleX:0.9987,scaleY:0.9987,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:-11.3013,x:5.65,y:187.85,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:1.659,x:-0.5,regY:52.4,y:-79.45,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-104.6369,x:-103,y:40.55,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-167.2006,x:-82.7,y:118.05,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-157.3444,x:-74.3,y:121.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-53.8857,x:-56.8,y:-22.55,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-15.1654,x:-13.7,y:93.3,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:90.4344,x:45.5,y:-26.4}},{t:this.instance_13,p:{rotation:58.9677,x:45.9,y:49.5,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:27.4735,x:87.3,y:118.45,regY:8.5}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:32.6983,x:95.25,y:126.75}},{t:this.instance_10,p:{regX:-1.1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-5.2959,x:14.9,y:93.25}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:18.6409,x:19.5,y:189.35,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3593,x:-5.35,y:-58.45,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:-12.1495,x:7.05,y:187.85,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:1.6099,x:-0.5,regY:52.4,y:-79.4,regX:0.4}},{t:this.instance_3,p:{regY:0.2,rotation:-104.012,x:-103.1,y:40.35,scaleX:0.998,scaleY:0.998}},{t:this.instance_2,p:{rotation:-166.5752,x:-83.7,y:118.2,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-156.7182,x:-75.4,y:121.4}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-53.6941,x:-56.7,y:-22.5,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-15.6235,x:-13.1,y:93.45,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:89.9124,x:45.5,y:-26.45}},{t:this.instance_13,p:{rotation:58.1929,x:46.55,y:49.55,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:26.6978,x:88.85,y:117.9,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.8,scaleX:0.998,scaleY:0.998,rotation:31.923,x:97.05,y:126}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-4.907,x:14.95,y:93.3}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:19.5893,x:18.75,y:189.4,regY:-52.9,regX:3.7}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3631,x:-5.35,y:-58.45,scaleX:0.9987,scaleY:0.9987,regY:8.4}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9977,scaleY:0.9977,rotation:-12.9982,x:8.3,y:187.65,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:1.5609,x:-0.5,regY:52.4,y:-79.4,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-103.3859,x:-103.5,y:40.25,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-165.9504,x:-84.8,y:118.15,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-156.094,x:-76.55,y:121.55}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-53.5005,x:-56.65,y:-22.5,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-16.0808,x:-12.45,y:93.45,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:89.386,x:45.5,y:-26.4}},{t:this.instance_13,p:{rotation:57.4166,x:47.2,y:49.5,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6.1,scaleX:0.9981,scaleY:0.9981,rotation:25.9226,x:90.35,y:117.3,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:31.1479,x:98.7,y:125.4}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9973,scaleY:0.9973,rotation:-4.5182,x:14.9,y:93.3}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:20.5379,x:18.1,y:189.5,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3665,x:-5.3,y:-58.45,scaleX:0.9987,scaleY:0.9987,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:-13.8469,x:9.75,y:187.7,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:1.5119,x:-0.5,regY:52.4,y:-79.4,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-102.76,x:-103.7,y:40.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-165.3249,x:-85.9,y:118.25,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.4,scaleX:0.9979,scaleY:0.9979,rotation:-155.4685,x:-77.65,y:121.75}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-53.3083,x:-56.65,y:-22.5,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-16.5382,x:-11.8,y:93.6,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:88.8587,x:45.5,y:-26.4}},{t:this.instance_13,p:{rotation:56.6425,x:47.95,y:49.55,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.1}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:25.1465,x:92.1,y:116.7,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:30.3721,x:100.45,y:124.7}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-4.1288,x:14.85,y:93.3}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:21.486,x:17.35,y:189.45,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.37,x:-5.3,y:-58.45,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:-14.6951,x:11.3,y:187.6,regX:3.4}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:1.4637,x:-0.5,regY:52.4,y:-79.4,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-102.1342,x:-103.9,y:39.95,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-164.7008,x:-86.9,y:118.25,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-154.8429,x:-78.75,y:121.75}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-53.1161,x:-56.65,y:-22.5,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-16.995,x:-11.2,y:93.6,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:88.3321,x:45.55,y:-26.4}},{t:this.instance_13,p:{rotation:55.8666,x:48.6,y:49.45,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:24.3717,x:93.7,y:116.05,regY:8.5}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.9981,scaleY:0.9981,rotation:29.5962,x:102.1,y:123.95}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-3.7403,x:14.7,y:93.35}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:22.4325,x:16.55,y:189.6,regY:-52.8,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3734,x:-5.3,y:-58.45,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9977,scaleY:0.9977,rotation:-15.5435,x:12.55,y:187.4,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:1.4155,x:-0.5,regY:52.4,y:-79.4,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-101.5094,x:-104.15,y:39.75,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-164.0751,x:-87.85,y:118.35,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:5.9}},{t:this.instance_1,p:{regX:6.8,regY:-1.2,scaleX:0.9979,scaleY:0.9979,rotation:-154.2163,x:-79.75,y:121.85}},{t:this.instance,p:{regX:35.8,scaleX:0.998,scaleY:0.998,rotation:-52.9241,x:-56.6,y:-22.6,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-17.4522,x:-10.45,y:93.6,regX:3.5}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:87.8063,x:45.55,y:-26.35}},{t:this.instance_13,p:{rotation:55.0905,x:49.3,y:49.45,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:23.5957,x:95.25,y:115.45,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:28.8217,x:103.85,y:123.2}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-3.3513,x:14.65,y:93.4}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:23.38,x:15.95,y:189.55,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3773,x:-5.3,y:-58.45,scaleX:0.9987,scaleY:0.9987,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:-16.3928,x:13.95,y:187.4,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:1.3665,x:-0.45,regY:52.4,y:-79.4,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-100.8835,x:-104.3,y:39.6,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-163.4494,x:-89.05,y:118.35,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-153.5925,x:-81,y:122}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-52.7308,x:-56.7,y:-22.5,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-17.9094,x:-9.9,y:93.75,regX:3.5}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:87.2785,x:45.55,y:-26.4}},{t:this.instance_13,p:{rotation:54.3152,x:50.05,y:49.4,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:22.8203,x:96.9,y:114.7,regY:8.5}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:28.0456,x:105.5,y:122.35}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-2.9623,x:14.6,y:93.45}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:24.3281,x:15.1,y:189.55,regY:-52.9,regX:3.7}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3808,x:-5.3,y:-58.45,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9977,scaleY:0.9977,rotation:-17.2419,x:15.35,y:187.1,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:1.3175,x:-0.45,regY:52.4,y:-79.4,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-100.2587,x:-104.5,y:39.4,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-162.8256,x:-90.05,y:118.3,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:5.9}},{t:this.instance_1,p:{regX:6.8,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-152.9667,x:-82.05,y:122.05}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-52.5384,x:-56.8,y:-22.6,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-18.3668,x:-9.35,y:93.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:86.7523,x:45.55,y:-26.4}},{t:this.instance_13,p:{rotation:53.5402,x:50.75,y:49.4,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.1}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:22.0451,x:98.45,y:114.1,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:27.2698,x:107.15,y:121.55}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-2.5736,x:14.55,y:93.4}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:25.2772,x:14.5,y:189.65,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3842,x:-5.3,y:-58.45,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:-18.0886,x:16.7,y:187.1,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:1.2684,x:-0.45,regY:52.4,y:-79.4,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-99.6328,x:-104.75,y:39.3,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-162.1994,x:-91.2,y:118.25,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.2,scaleX:0.9979,scaleY:0.9979,rotation:-152.3413,x:-83.05,y:122.1}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-52.3466,x:-56.75,y:-22.55,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-18.8234,x:-8.75,y:93.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:86.2267,x:45.55,y:-26.35}},{t:this.instance_13,p:{rotation:52.765,x:51.4,y:49.25,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6.1,scaleX:0.9981,scaleY:0.9981,rotation:21.2691,x:99.9,y:113.35,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:26.4941,x:108.8,y:120.7}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-2.1841,x:14.4,y:93.5}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:26.224,x:13.65,y:189.55,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.387,x:-5.3,y:-58.45,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:-18.9371,x:18.05,y:186.95,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:1.2194,x:-0.45,regY:52.4,y:-79.4,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-99.0068,x:-104.9,y:39.05,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-161.5734,x:-92.25,y:118.3,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-151.715,x:-84.25,y:122.25}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-52.1531,x:-56.65,y:-22.55,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-19.2802,x:-8.1,y:93.9,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:85.699,x:45.5,y:-26.45}},{t:this.instance_13,p:{rotation:51.9893,x:52.15,y:49.2,regY:-0.8,scaleX:0.998,scaleY:0.998,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:20.4939,x:101.55,y:112.7,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:25.7188,x:110.5,y:119.95}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-1.7955,x:14.35,y:93.55}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:27.1711,x:12.9,y:189.7,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3897,x:-5.3,y:-58.45,scaleX:0.9987,scaleY:0.9987,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:-19.7855,x:19.45,y:186.8,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:1.1704,x:-0.45,regY:52.4,y:-79.45,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-98.3829,x:-105.1,y:38.95,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-160.9478,x:-93.3,y:118.25,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.4,scaleX:0.9979,scaleY:0.9979,rotation:-151.0904,x:-85.45,y:122.35}},{t:this.instance,p:{regX:35.6,scaleX:0.998,scaleY:0.998,rotation:-51.9609,x:-56.7,y:-22.45,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-19.7377,x:-7.45,y:93.9,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:85.1736,x:45.5,y:-26.35}},{t:this.instance_13,p:{rotation:51.2142,x:52.8,y:49.15,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6.1,scaleX:0.9981,scaleY:0.9981,rotation:19.7192,x:103,y:111.9,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:24.943,x:112.15,y:119.05}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-1.4053,x:14.3,y:93.55}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:28.1187,x:12.25,y:189.7,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.394,x:-5.3,y:-58.5,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9976,scaleY:0.9976,rotation:-20.6344,x:20.8,y:186.6,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:1.1214,x:-0.35,regY:52.4,y:-79.4,regX:0.5}},{t:this.instance_3,p:{regY:0.1,rotation:-97.7566,x:-105.3,y:38.75,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-160.3239,x:-94.4,y:118.25,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.4,scaleX:0.9979,scaleY:0.9979,rotation:-150.4644,x:-86.5,y:122.4}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-51.7687,x:-56.7,y:-22.55,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-20.195,x:-6.85,y:93.95,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:84.6459,x:45.5,y:-26.4}},{t:this.instance_13,p:{rotation:50.4384,x:53.5,y:49.05,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:18.9427,x:104.65,y:111.15,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:24.1684,x:113.8,y:118.15}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-1.0178,x:14.25,y:93.6}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:29.0672,x:11.5,y:189.75,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3978,x:-5.3,y:-58.45,scaleX:0.9987,scaleY:0.9987,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:-21.4821,x:22.05,y:186.4,regX:3.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:1.0732,x:-0.45,regY:52.4,y:-79.4,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-97.1313,x:-105.55,y:38.6,scaleX:0.998,scaleY:0.998}},{t:this.instance_2,p:{rotation:-159.6981,x:-95.3,y:118.2,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:5.9}},{t:this.instance_1,p:{regX:6.8,regY:-1.2,scaleX:0.9979,scaleY:0.9979,rotation:-149.8385,x:-87.5,y:122.3}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-51.5765,x:-56.65,y:-22.5,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-19.7294,x:-7.45,y:93.9,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:85.1692,x:45.5,y:-26.35}},{t:this.instance_13,p:{rotation:51.2109,x:52.75,y:49.15,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6.1,scaleX:0.9981,scaleY:0.9981,rotation:19.7153,x:103,y:111.95,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:24.9359,x:112.2,y:119}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-1.3956,x:14.3,y:93.55}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:28.1282,x:12.2,y:189.7,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3683,x:-5.3,y:-58.45,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:-20.6369,x:20.85,y:186.6,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:0.7659,x:-0.35,regY:52.4,y:-79.4,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-97.7752,x:-105.25,y:38.8,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-160.3361,x:-94.3,y:118.2,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.4,scaleX:0.9979,scaleY:0.9979,rotation:-150.4832,x:-86.5,y:122.4}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-51.7762,x:-56.7,y:-22.55,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-19.2636,x:-8.1,y:93.9,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:85.6937,x:45.5,y:-26.45}},{t:this.instance_13,p:{rotation:51.9843,x:52.15,y:49.2,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:20.4859,x:101.55,y:112.65,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:25.7051,x:110.55,y:119.9}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-1.7744,x:14.3,y:93.55}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:27.1915,x:12.9,y:189.7,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3382,x:-5.35,y:-58.45,scaleX:0.9987,scaleY:0.9987,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9976,scaleY:0.9976,rotation:-19.7921,x:19.35,y:186.8,regX:3.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:0.4604,x:-0.35,regY:52.4,y:-79.4,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-98.4185,x:-105.05,y:39,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-160.9747,x:-93.2,y:118.25,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.4,scaleX:0.9979,scaleY:0.9979,rotation:-151.1277,x:-85.3,y:122.35}},{t:this.instance,p:{regX:35.6,scaleX:0.998,scaleY:0.998,rotation:-51.9764,x:-56.7,y:-22.45,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-18.7979,x:-8.8,y:93.9,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:86.217,x:45.5,y:-26.35}},{t:this.instance_13,p:{rotation:52.7568,x:51.4,y:49.25,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6.1,scaleX:0.9982,scaleY:0.9982,rotation:21.2577,x:99.95,y:113.35,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:26.473,x:108.9,y:120.7}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-2.1534,x:14.4,y:93.5}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:26.2526,x:13.5,y:189.65,regY:-52.9,regX:3.7}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3106,x:-5.4,y:-58.5,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:-18.9462,x:18.1,y:186.95,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:0.1532,x:-0.4,regY:52.4,y:-79.45,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-99.0627,x:-104.85,y:39.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-161.6121,x:-92.2,y:118.35,scaleX:0.998,scaleY:0.998,regY:-8.9,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-151.7707,x:-84.15,y:122.25}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-52.1761,x:-56.65,y:-22.55,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-18.3316,x:-9.4,y:93.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:86.7409,x:45.5,y:-26.4}},{t:this.instance_13,p:{rotation:53.529,x:50.8,y:49.4,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.1}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:22.0301,x:98.5,y:114.1,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:27.2408,x:107.3,y:121.55}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-2.5324,x:14.55,y:93.45}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:25.316,x:14.4,y:189.6,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.2812,x:-5.4,y:-58.5,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:-18.1024,x:16.7,y:187.1,regX:3.4}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-0.1479,x:-0.4,regY:52.4,y:-79.45,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-99.7064,x:-104.65,y:39.3,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-162.2507,x:-91.05,y:118.25,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.7,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-152.4158,x:-82.95,y:122.2}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-52.3755,x:-56.65,y:-22.55,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-17.8659,x:-10.05,y:93.75,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:87.2646,x:45.5,y:-26.45}},{t:this.instance_13,p:{rotation:54.3013,x:50.15,y:49.25,regY:-0.9,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:22.8011,x:96.95,y:114.75,regY:8.5}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:28.01,x:105.6,y:122.3}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-2.9115,x:14.6,y:93.45}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:24.3771,x:15.1,y:189.6,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.251,x:-5.4,y:-58.5,scaleX:0.9987,scaleY:0.9987,regY:8.4}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9977,scaleY:0.9977,rotation:-17.2583,x:15.2,y:187.15,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-0.4534,x:-0.45,regY:52.4,y:-79.4,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-100.3494,x:-104.5,y:39.45,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-162.8888,x:-89.95,y:118.35,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-153.0592,x:-81.95,y:122.1}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-52.5765,x:-56.65,y:-22.5,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-17.401,x:-10.55,y:93.75,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:87.787,x:45.5,y:-26.35}},{t:this.instance_13,p:{rotation:55.0737,x:49.45,y:49.35,regY:-0.9,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:23.573,x:95.25,y:115.45,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:28.7778,x:103.9,y:123.15}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-3.2899,x:14.65,y:93.4}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:23.4393,x:15.85,y:189.6,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.2216,x:-5.4,y:-58.5,scaleX:0.9987,scaleY:0.9987,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:-16.4124,x:13.8,y:187.4,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-0.7607,x:-0.45,regY:52.4,y:-79.4,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-100.994,x:-104.3,y:39.6,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-163.527,x:-88.85,y:118.3,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.2,scaleX:0.9979,scaleY:0.9979,rotation:-153.703,x:-80.7,y:121.9}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-52.7765,x:-56.7,y:-22.5,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-16.9362,x:-11.15,y:93.65,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:88.3102,x:45.55,y:-26.4}},{t:this.instance_13,p:{rotation:55.8464,x:48.7,y:49.4,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:24.3443,x:93.7,y:116.1,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:29.5457,x:102.15,y:123.85}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-3.6692,x:14.7,y:93.35}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:22.5025,x:16.45,y:189.65,regY:-52.8,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.1923,x:-5.45,y:-58.5,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9977,scaleY:0.9977,rotation:-15.5673,x:12.45,y:187.35,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.0671,x:-0.4,regY:52.5,y:-79.35,regX:0.4}},{t:this.instance_3,p:{regY:0.2,rotation:-101.6382,x:-103.95,y:39.8,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-164.1649,x:-87.65,y:118.3,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:5.9}},{t:this.instance_1,p:{regX:6.7,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-154.3487,x:-79.5,y:121.95}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-52.9772,x:-56.65,y:-22.5,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-16.4703,x:-11.8,y:93.6,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:88.8333,x:45.55,y:-26.4}},{t:this.instance_13,p:{rotation:56.6194,x:48,y:49.45,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:25.116,x:92.15,y:116.7,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:30.3156,x:100.5,y:124.7}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-4.0478,x:14.85,y:93.3}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:21.5638,x:17.15,y:189.55,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.1638,x:-5.4,y:-58.5,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:-14.7221,x:11.05,y:187.65,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.3735,x:-0.5,regY:52.4,y:-79.5,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-102.2813,x:-103.8,y:40.05,scaleX:0.998,scaleY:0.998}},{t:this.instance_2,p:{rotation:-164.8049,x:-86.65,y:118.35,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-154.9926,x:-78.45,y:121.85}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-53.1762,x:-56.65,y:-22.5,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46.1,scaleX:0.9979,scaleY:0.9979,rotation:-16.0048,x:-12.55,y:93.45,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:89.358,x:45.55,y:-26.4}},{t:this.instance_13,p:{rotation:57.3918,x:47.25,y:49.5,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6.1,scaleX:0.9981,scaleY:0.9981,rotation:25.8885,x:90.45,y:117.25,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:31.0824,x:98.75,y:125.45}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-4.4276,x:14.9,y:93.3}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:20.6261,x:17.8,y:189.4,regY:-52.9,regX:3.7}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.1344,x:-5.4,y:-58.5,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:-13.8764,x:9.7,y:187.75,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.68,x:-0.5,regY:52.4,y:-79.45,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-102.9253,x:-103.6,y:40.15,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-165.4417,x:-85.55,y:118.25,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-155.6367,x:-77.35,y:121.7}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-53.3778,x:-56.8,y:-22.55,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-15.54,x:-13.1,y:93.4,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:89.8809,x:45.55,y:-26.4}},{t:this.instance_13,p:{rotation:58.1656,x:46.6,y:49.5,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:26.6598,x:88.95,y:117.95,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.8,scaleX:0.998,scaleY:0.998,rotation:31.8518,x:97.2,y:125.9}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-4.8058,x:14.95,y:93.3}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:19.6885,x:18.55,y:189.35,regY:-52.9,regX:3.7}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.105,x:-5.35,y:-58.5,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9977,scaleY:0.9977,rotation:-13.0313,x:8.2,y:187.75,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.9856,x:-0.55,regY:52.4,y:-79.45,regX:0.4}},{t:this.instance_3,p:{regY:0.2,rotation:-103.5691,x:-103.3,y:40.25,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-166.0802,x:-84.35,y:118.2,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:5.9}},{t:this.instance_1,p:{regX:6.7,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-156.2799,x:-76.05,y:121.6}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-53.5769,x:-56.7,y:-22.5,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-15.0739,x:-13.75,y:93.3,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:90.3994,x:45.55,y:-26.4}},{t:this.instance_13,p:{rotation:58.9375,x:45.9,y:49.55,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6.1,scaleX:0.9981,scaleY:0.9981,rotation:27.4312,x:87.25,y:118.4,regY:8.5}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:32.6203,x:95.4,y:126.75}},{t:this.instance_10,p:{regX:-1.1,regY:1.9,scaleX:0.9973,scaleY:0.9973,rotation:-5.1843,x:14.95,y:93.25}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:18.7518,x:19.35,y:189.35,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.0748,x:-5.35,y:-58.5,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:-12.1864,x:6.8,y:187.9,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-2.2905,x:-0.55,regY:52.4,y:-79.45,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-104.2126,x:-103.15,y:40.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-166.7176,x:-83.4,y:118.25,scaleX:0.998,scaleY:0.998,regY:-8.9,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-156.9231,x:-75.05,y:121.4}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-53.7773,x:-56.8,y:-22.55,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-14.6091,x:-14.35,y:93.15,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:90.9232,x:45.55,y:-26.45}},{t:this.instance_13,p:{rotation:59.7105,x:45.2,y:49.55,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9982,scaleY:0.9982,rotation:28.2034,x:85.7,y:119.05,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.8,scaleX:0.998,scaleY:0.998,rotation:33.3878,x:93.6,y:127.35}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-5.5636,x:15.15,y:93.2}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:17.814,x:20,y:189.3,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.0455,x:-5.35,y:-58.5,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:-11.3407,x:5.55,y:187.9,regX:3.4}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-2.598,x:-0.55,regY:52.5,y:-79.3,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-104.8568,x:-102.95,y:40.65,scaleX:0.998,scaleY:0.998}},{t:this.instance_2,p:{rotation:-167.357,x:-82.25,y:118.1,scaleX:0.9981,scaleY:0.9981,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.4,scaleX:0.9979,scaleY:0.9979,rotation:-157.5683,x:-73.95,y:121.35}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-53.9769,x:-56.7,y:-22.45,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-14.1429,x:-14.85,y:93.05,regX:3.5}},{t:this.instance_14,p:{regX:-33.2,scaleX:0.9982,scaleY:0.9982,rotation:91.4462,x:45.55,y:-26.5}},{t:this.instance_13,p:{rotation:60.4819,x:44.55,y:49.6,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.1}},{t:this.instance_12,p:{regX:-6.1,scaleX:0.9981,scaleY:0.9981,rotation:28.976,x:83.95,y:119.5,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:34.1563,x:91.9,y:128.1}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-5.9425,x:15.2,y:93.15}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:16.8745,x:20.7,y:189.25,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.0162,x:-5.35,y:-58.5,scaleX:0.9987,scaleY:0.9987,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:-10.4962,x:4,y:188,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-2.9047,x:-0.6,regY:52.4,y:-79.45,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-105.5008,x:-102.65,y:40.8,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-167.9953,x:-81.2,y:118,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-158.2132,x:-72.8,y:121.1}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-54.1775,x:-56.8,y:-22.6,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-13.6765,x:-15.6,y:92.95,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:91.9702,x:45.55,y:-26.35}},{t:this.instance_13,p:{rotation:61.2548,x:43.8,y:49.5,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6.1,scaleX:0.9981,scaleY:0.9981,rotation:29.7466,x:82.35,y:120.05,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:34.9254,x:90.1,y:128.7}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-6.3199,x:15.2,y:93.1}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:15.9376,x:21.45,y:189.15,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:9.9869,x:-5.35,y:-58.6,scaleX:0.9987,scaleY:0.9987,regY:8.3}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:-9.6515,x:2.6,y:188,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-3.2106,x:-0.6,regY:52.4,y:-79.4,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-106.1438,x:-102.45,y:40.9,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-168.633,x:-80.1,y:117.95,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.2,scaleX:0.9979,scaleY:0.9979,rotation:-158.8564,x:-71.65,y:120.85}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-54.3771,x:-56.75,y:-22.45,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46.1,scaleX:0.9979,scaleY:0.9979,rotation:-13.2126,x:-16.2,y:92.6,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:92.4935,x:45.55,y:-26.35}},{t:this.instance_13,p:{rotation:62.0281,x:43.3,y:49.45,regY:-0.9,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:30.5187,x:80.75,y:120.65,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:35.6927,x:88.4,y:129.25}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-6.7,x:15.35,y:93.1}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:15.0008,x:22.1,y:189.1,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:9.9575,x:-5.4,y:-58.6,scaleX:0.9987,scaleY:0.9987,regY:8.3}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:-8.8065,x:1.2,y:187.95,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-3.5167,x:-0.65,regY:52.5,y:-79.3,regX:0.4}},{t:this.instance_3,p:{regY:0.2,rotation:-106.7877,x:-102.1,y:41.05,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-169.2711,x:-79.05,y:117.95,scaleX:0.998,scaleY:0.998,regY:-8.9,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-159.5006,x:-70.55,y:120.65}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-54.5774,x:-56.8,y:-22.55,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-12.7468,x:-16.85,y:92.65,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:93.017,x:45.55,y:-26.4}},{t:this.instance_13,p:{rotation:62.7999,x:42.4,y:49.5,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:31.2897,x:79.1,y:121.15,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.9981,scaleY:0.9981,rotation:36.4615,x:86.55,y:129.9}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-7.0788,x:15.45,y:93.05}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:14.0613,x:22.85,y:189,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:9.9263,x:-5.4,y:-58.6,scaleX:0.9988,scaleY:0.9988,regY:8.3}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:-7.9606,x:-0.2,y:187.9,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-3.8228,x:-0.65,regY:52.4,y:-79.5,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-107.4316,x:-102.05,y:41.3,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-169.9096,x:-77.95,y:117.7,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-160.1436,x:-69.5,y:120.5}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-54.7786,x:-56.75,y:-22.45,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-12.2811,x:-17.45,y:92.45,regX:3.4}},{t:this.instance_14,p:{regX:-33.2,scaleX:0.9982,scaleY:0.9982,rotation:93.5399,x:45.55,y:-26.5}},{t:this.instance_13,p:{rotation:63.574,x:41.7,y:49.45,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:32.0617,x:77.45,y:121.55,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:37.2285,x:84.8,y:130.4}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-7.4579,x:15.5,y:93.05}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:13.1242,x:23.55,y:188.9,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:9.8976,x:-5.35,y:-58.6,scaleX:0.9988,scaleY:0.9988,regY:8.3}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:-7.1153,x:-1.55,y:187.95,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-4.129,x:-0.7,regY:52.4,y:-79.45,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-108.076,x:-101.75,y:41.4,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-170.547,x:-76.9,y:117.6,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.4,scaleX:0.9979,scaleY:0.9979,rotation:-160.7898,x:-68.35,y:120.4}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-54.9772,x:-56.8,y:-22.55,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{regY:-46.1,scaleX:0.9979,scaleY:0.9979,rotation:-11.8154,x:-18.15,y:92.2,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:94.0621,x:45.55,y:-26.35}},{t:this.instance_13,p:{rotation:64.3465,x:41.05,y:49.5,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.1}},{t:this.instance_12,p:{regX:-6,scaleX:0.9982,scaleY:0.9982,rotation:32.834,x:75.75,y:121.95,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:37.9974,x:83,y:131}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-7.8365,x:15.55,y:93}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:12.1853,x:24.2,y:188.9,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:9.8684,x:-5.35,y:-58.6,scaleX:0.9988,scaleY:0.9988,regY:8.3}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:-6.271,x:-3,y:187.9,regX:3.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-4.4362,x:-0.65,regY:52.4,y:-79.4,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-108.7194,x:-101.65,y:41.55,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-171.1869,x:-75.65,y:117.6,scaleX:0.998,scaleY:0.998,regY:-8.9,regX:5.9}},{t:this.instance_1,p:{regX:6.8,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-161.4332,x:-67.2,y:120.1}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-55.1772,x:-56.75,y:-22.45,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-11.3503,x:-18.65,y:92.15,regX:3.4}},{t:this.instance_14,p:{regX:-33.2,scaleX:0.9982,scaleY:0.9982,rotation:94.5857,x:45.5,y:-26.5}},{t:this.instance_13,p:{rotation:65.1185,x:40.35,y:49.35,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:33.6058,x:74.1,y:122.4,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.9981,scaleY:0.9981,rotation:38.7664,x:81.25,y:131.45}},{t:this.instance_10,p:{regX:-1.1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-8.2137,x:15.5,y:92.95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:11.2489,x:24.9,y:188.8,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:9.8392,x:-5.35,y:-58.6,scaleX:0.9987,scaleY:0.9987,regY:8.3}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:-5.4261,x:-4.25,y:187.8,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-4.7418,x:-0.55,regY:52.4,y:-79.45,regX:0.5}},{t:this.instance_3,p:{regY:0.1,rotation:-109.3635,x:-101.4,y:41.7,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-171.8238,x:-74.75,y:117.4,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.4,scaleX:0.9979,scaleY:0.9979,rotation:-162.0762,x:-66.15,y:119.95}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-55.3786,x:-56.7,y:-22.45,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-10.8852,x:-19.15,y:91.9,regX:3.5}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:95.1095,x:45.55,y:-26.35}},{t:this.instance_13,p:{rotation:65.8911,x:39.65,y:49.35,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:34.3773,x:72.4,y:122.85,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:39.5347,x:79.4,y:132}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-8.5929,x:15.75,y:92.9}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:10.3101,x:25.7,y:188.7,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:9.8099,x:-5.35,y:-58.6,scaleX:0.9987,scaleY:0.9987,regY:8.3}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:-4.5818,x:-5.65,y:187.8,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-5.0493,x:-0.7,regY:52.4,y:-79.4,regX:0.4}},{t:this.instance_3,p:{regY:0.2,rotation:-110.0074,x:-101,y:41.85,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-172.4622,x:-73.7,y:117.2,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-162.7216,x:-65.05,y:119.6}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-55.5772,x:-56.7,y:-22.45,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-10.3974,x:-19.45,y:91.85,regX:3.4}},{t:this.instance_14,p:{regX:-33.2,scaleX:0.9982,scaleY:0.9982,rotation:95.625,x:45.55,y:-26.5}},{t:this.instance_13,p:{rotation:66.3205,x:39.05,y:49.25,regY:-0.9,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:34.8069,x:71.25,y:122.9,regY:8.5}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:39.9645,x:78.1,y:132.15}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-8.7658,x:15.75,y:92.85}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:9.1931,x:26.05,y:188.65,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:9.8349,x:-5.35,y:-58.6,scaleX:0.9987,scaleY:0.9987,regY:8.3}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:-3.5776,x:-6.6,y:187.85,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-4.8823,x:-0.7,regY:52.4,y:-79.5,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-110.5797,x:-100.85,y:42.15,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-173.0354,x:-72.55,y:117.1,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-163.2939,x:-63.9,y:119.45}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-55.8646,x:-56.7,y:-22.5,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-9.9116,x:-19.55,y:91.85,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:96.1419,x:45.55,y:-26.35}},{t:this.instance_13,p:{rotation:66.7509,x:38.3,y:49.25,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:35.2351,x:70,y:123.1,regY:8.5}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:40.3945,x:76.8,y:132.5}},{t:this.instance_10,p:{regX:-1,regY:1.8,scaleX:0.9974,scaleY:0.9974,rotation:-8.9378,x:15.8,y:92.75}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:8.0751,x:26.3,y:188.6,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:9.8598,x:-5.35,y:-58.6,scaleX:0.9987,scaleY:0.9987,regY:8.3}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:-2.5754,x:-7.6,y:187.9,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-4.7146,x:-0.7,regY:52.4,y:-79.45,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-111.1537,x:-100.45,y:42.35,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-173.6085,x:-71.5,y:117.2,scaleX:0.998,scaleY:0.998,regY:-8.9,regX:6}},{t:this.instance_1,p:{regX:6.7,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-163.8675,x:-62.7,y:119.35}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-56.151,x:-56.7,y:-22.45,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-9.4244,x:-19.75,y:91.8,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:96.6566,x:45.55,y:-26.35}},{t:this.instance_13,p:{rotation:67.1806,x:37.75,y:49.1,regY:-0.9,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:35.6653,x:68.75,y:123.3,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:40.8227,x:75.5,y:132.65}},{t:this.instance_10,p:{regX:-1,regY:1.8,scaleX:0.9974,scaleY:0.9974,rotation:-9.11,x:15.8,y:92.75}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:6.9583,x:26.65,y:188.6,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:9.8856,x:-5.35,y:-58.6,scaleX:0.9987,scaleY:0.9987,regY:8.3}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:-1.5722,x:-8.55,y:187.85,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-4.5486,x:-0.7,regY:52.4,y:-79.5,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-111.7259,x:-100.15,y:42.6,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-174.1813,x:-70.45,y:117,scaleX:0.9981,scaleY:0.9981,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-164.4396,x:-61.75,y:119.15}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-56.4372,x:-56.7,y:-22.5,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46.1,scaleX:0.9979,scaleY:0.9979,rotation:-8.9372,x:-19.9,y:91.65,regX:3.4}},{t:this.instance_14,p:{regX:-33.2,scaleX:0.9982,scaleY:0.9982,rotation:97.1718,x:45.55,y:-26.5}},{t:this.instance_13,p:{rotation:67.6102,x:36.95,y:49.1,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6.1,scaleX:0.9981,scaleY:0.9981,rotation:36.0963,x:67.5,y:123.45,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:41.2536,x:74.25,y:132.95}},{t:this.instance_10,p:{regX:-1,regY:1.8,scaleX:0.9974,scaleY:0.9974,rotation:-9.2815,x:15.85,y:92.7}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:5.8417,x:26.85,y:188.6,regY:-52.9,regX:3.7}},{t:this.instance_8},{t:this.instance_7,p:{rotation:9.9105,x:-5.4,y:-58.6,scaleX:0.9987,scaleY:0.9987,regY:8.3}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:-0.5705,x:-9.55,y:187.95,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-4.3818,x:-0.7,regY:52.4,y:-79.4,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-112.299,x:-99.9,y:42.85,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-174.7542,x:-69.35,y:116.95,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-165.0128,x:-60.65,y:118.95}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-56.7237,x:-56.8,y:-22.5,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.998,scaleY:0.998,rotation:-8.4498,x:-20.05,y:91.7,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:97.6885,x:45.5,y:-26.3}},{t:this.instance_13,p:{rotation:68.0393,x:36.35,y:49.1,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.1}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:36.526,x:66.3,y:123.7,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:41.683,x:72.9,y:133.1}},{t:this.instance_10,p:{regX:-1,regY:1.8,scaleX:0.9974,scaleY:0.9974,rotation:-9.454,x:15.8,y:92.7}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:4.7237,x:27.3,y:188.45,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:9.9351,x:-5.4,y:-58.6,scaleX:0.9988,scaleY:0.9988,regY:8.3}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:0.4276,x:-10.5,y:187.95,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-4.2159,x:-0.7,regY:52.4,y:-79.5,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-112.8726,x:-99.5,y:43.05,scaleX:0.998,scaleY:0.998}},{t:this.instance_2,p:{rotation:-175.3284,x:-68.15,y:116.85,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:5.9}},{t:this.instance_1,p:{regX:6.7,regY:-1.2,scaleX:0.9979,scaleY:0.9979,rotation:-165.5859,x:-59.45,y:118.75}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-57.0104,x:-56.75,y:-22.5,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-7.963,x:-20.25,y:91.7,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:98.204,x:45.5,y:-26.3}},{t:this.instance_13,p:{rotation:68.4694,x:35.65,y:49,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.1}},{t:this.instance_12,p:{regX:-6.1,scaleX:0.9981,scaleY:0.9981,rotation:36.9554,x:64.95,y:123.75,regY:8.6}},{t:this.instance_11,p:{regX:-5,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:42.1123,x:71.5,y:133.2}},{t:this.instance_10,p:{regX:-1,regY:1.8,scaleX:0.9974,scaleY:0.9974,rotation:-9.6253,x:15.9,y:92.65}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:3.6076,x:27.6,y:188.5,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:9.9601,x:-5.4,y:-58.6,scaleX:0.9988,scaleY:0.9988,regY:8.3}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:1.4311,x:-11.5,y:188.05,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-4.0491,x:-0.7,regY:52.4,y:-79.45,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-113.4453,x:-99.25,y:43.25,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-175.9012,x:-67.25,y:116.7,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-166.1586,x:-58.45,y:118.65}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-57.2961,x:-56.75,y:-22.5,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.998,scaleY:0.998,rotation:-7.4757,x:-20.35,y:91.6,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:98.7196,x:45.5,y:-26.3}},{t:this.instance_13,p:{rotation:68.8993,x:34.9,y:48.8,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:37.3849,x:63.85,y:123.85,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:42.5426,x:70.35,y:133.5}},{t:this.instance_10,p:{regX:-1,regY:1.8,scaleX:0.9973,scaleY:0.9973,rotation:-9.798,x:15.9,y:92.65}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:2.4884,x:27.95,y:188.45,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:9.986,x:-5.35,y:-58.5,scaleX:0.9987,scaleY:0.9987,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:2.4342,x:-12.45,y:188.1,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-3.8824,x:-0.7,regY:52.4,y:-79.5,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-114.0179,x:-98.9,y:43.4,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-176.4745,x:-66.2,y:116.65,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-166.7311,x:-57.35,y:118.4}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-57.5829,x:-56.75,y:-22.5,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-6.9884,x:-20.55,y:91.5,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:99.2357,x:45.55,y:-26.3}},{t:this.instance_13,p:{rotation:69.3293,x:34.25,y:48.7,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:37.8158,x:62.55,y:124.1,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:42.9722,x:68.95,y:133.6}},{t:this.instance_10,p:{regX:-1.1,regY:1.8,scaleX:0.9974,scaleY:0.9974,rotation:-9.9686,x:15.85,y:92.7}},{t:this.instance_9,p:{scaleX:0.9975,scaleY:0.9975,rotation:1.3728,x:28.2,y:188.4,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.0108,x:-5.35,y:-58.5,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:3.4371,x:-13.45,y:188,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-3.7166,x:-0.65,regY:52.4,y:-79.4,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-114.5903,x:-98.6,y:43.6,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-177.0466,x:-65.15,y:116.5,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.2,scaleX:0.9979,scaleY:0.9979,rotation:-167.3047,x:-56.25,y:118.1}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-57.8696,x:-56.75,y:-22.45,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-6.5014,x:-20.7,y:91.45,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:99.7515,x:45.55,y:-26.3}},{t:this.instance_13,p:{rotation:69.759,x:33.55,y:48.6,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6.1,scaleX:0.9981,scaleY:0.9981,rotation:38.244,x:61.25,y:124.15,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:43.4023,x:67.65,y:133.8}},{t:this.instance_10,p:{regX:-1.1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-10.1405,x:15.9,y:92.75}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:0.2551,x:28.6,y:188.35,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.0347,x:-5.35,y:-58.5,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:4.4393,x:-14.4,y:188.1,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-3.55,x:-0.65,regY:52.5,y:-79.35,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-115.1641,x:-98.2,y:43.9,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-177.6192,x:-64.1,y:116.4,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-167.8782,x:-55.2,y:118}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-58.1553,x:-56.75,y:-22.45,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-6.0141,x:-20.85,y:91.4,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:100.2665,x:45.5,y:-26.3}},{t:this.instance_13,p:{rotation:70.1877,x:32.9,y:48.55,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:38.6747,x:60.05,y:124.25,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:43.8323,x:66.35,y:133.95}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-10.3117,x:16.05,y:92.75}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-0.8582,x:28.9,y:188.35,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.0616,x:-5.35,y:-58.5,scaleX:0.9987,scaleY:0.9987,regY:8.4}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9977,scaleY:0.9977,rotation:5.4412,x:-15.35,y:187.9,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-3.3834,x:-0.65,regY:52.5,y:-79.3,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-115.7365,x:-97.85,y:44.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-178.1916,x:-63.05,y:116.3,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-168.4516,x:-54.15,y:117.8}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-58.4424,x:-56.7,y:-22.45,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46.1,scaleX:0.9979,scaleY:0.9979,rotation:-5.5279,x:-20.95,y:91.25,regX:3.5}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:100.7822,x:45.55,y:-26.3}},{t:this.instance_13,p:{rotation:70.6171,x:32.3,y:48.4,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6.1,scaleX:0.9981,scaleY:0.9981,rotation:39.1038,x:58.8,y:124.25,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:44.2616,x:65.05,y:134.05}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-10.4854,x:16.05,y:92.75}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-1.9752,x:29.25,y:188.25,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.0855,x:-5.35,y:-58.5,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9977,scaleY:0.9977,rotation:6.4456,x:-16.4,y:187.95,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-3.2168,x:-0.65,regY:52.4,y:-79.4,regX:0.4}},{t:this.instance_3,p:{regY:0.2,rotation:-116.3104,x:-97.4,y:44.2,scaleX:0.998,scaleY:0.998}},{t:this.instance_2,p:{rotation:-178.7656,x:-62,y:116.1,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.2,scaleX:0.9979,scaleY:0.9979,rotation:-169.0243,x:-53.05,y:117.45}},{t:this.instance,p:{regX:35.7,scaleX:0.9981,scaleY:0.9981,rotation:-58.7295,x:-56.7,y:-22.45,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-5.0405,x:-21.15,y:91.25,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:101.2991,x:45.5,y:-26.3}},{t:this.instance_13,p:{rotation:71.0465,x:31.55,y:48.3,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:39.5345,x:57.65,y:124.45,regY:8.6}},{t:this.instance_11,p:{regX:-5,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:44.6915,x:63.6,y:134.1}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9973,scaleY:0.9973,rotation:-10.6566,x:16.1,y:92.7}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-3.093,x:29.55,y:188.2,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.1112,x:-5.35,y:-58.5,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:7.4475,x:-17.35,y:188.05,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-3.0493,x:-0.65,regY:52.4,y:-79.45,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-116.8831,x:-97.25,y:44.45,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-179.3386,x:-60.95,y:116.1,scaleX:0.998,scaleY:0.998,regY:-8.9,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.4,scaleX:0.9979,scaleY:0.9979,rotation:-169.5968,x:-52,y:117.35}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-59.0151,x:-56.7,y:-22.45,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-4.5526,x:-21.35,y:91.3,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:101.8139,x:45.55,y:-26.3}},{t:this.instance_13,p:{rotation:71.4778,x:30.85,y:48.15,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6.1,scaleX:0.9981,scaleY:0.9981,rotation:39.9638,x:56.3,y:124.45,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:45.1214,x:62.4,y:134.3}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-10.8289,x:16.1,y:92.7}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-4.2102,x:29.85,y:188.3,regY:-52.8,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.1361,x:-5.4,y:-58.5,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:8.4501,x:-18.3,y:188,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-2.8837,x:-0.65,regY:52.4,y:-79.45,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-117.4559,x:-96.9,y:44.7,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:-179.9115,x:-59.9,y:115.9,scaleX:0.998,scaleY:0.998,regY:-8.9,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-170.1698,x:-50.95,y:117.1}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-59.3019,x:-56.7,y:-22.45,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-4.0667,x:-21.45,y:91.2,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:102.3289,x:45.55,y:-26.35}},{t:this.instance_13,p:{rotation:71.9071,x:30.25,y:48,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:40.3938,x:55.15,y:124.5,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:45.5507,x:61.1,y:134.4}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-10.9993,x:16.15,y:92.65}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-5.3274,x:30,y:188.1,regY:-52.9,regX:3.7}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.1619,x:-5.4,y:-58.5,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:9.4532,x:-19.3,y:187.9,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-2.7163,x:-0.6,regY:52.5,y:-79.3,regX:0.4}},{t:this.instance_3,p:{regY:0.2,rotation:-118.0287,x:-96.45,y:44.85,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:179.5208,x:-58.9,y:115.65,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-170.7421,x:-49.9,y:116.8}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-59.589,x:-56.7,y:-22.45,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-3.5793,x:-21.5,y:91.2,regX:3.5}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:102.8451,x:45.5,y:-26.3}},{t:this.instance_13,p:{rotation:72.3376,x:29.55,y:47.85,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:40.8225,x:53.85,y:124.6,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:45.9812,x:59.75,y:134.45}},{t:this.instance_10,p:{regX:-1.1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.1727,x:16.1,y:92.65}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.4446,x:30.5,y:188.05,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.1861,x:-5.4,y:-58.5,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:10.457,x:-20.25,y:187.9,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-2.5498,x:-0.65,regY:52.5,y:-79.3,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-118.6017,x:-96.25,y:45.15,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:178.947,x:-57.85,y:115.45,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.4,scaleX:0.9979,scaleY:0.9979,rotation:-171.3159,x:-48.85,y:116.65}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-59.8747,x:-56.75,y:-22.45,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46.1,scaleX:0.9979,scaleY:0.9979,rotation:-3.0924,x:-21.85,y:90.9,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:103.362,x:45.55,y:-26.3}},{t:this.instance_13,p:{rotation:72.7673,x:28.85,y:47.75,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6.1,scaleX:0.9981,scaleY:0.9981,rotation:41.2527,x:52.55,y:124.6,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.8,scaleX:0.998,scaleY:0.998,rotation:46.4106,x:58.6,y:134.5}},{t:this.instance_10,p:{regX:-1.1,regY:1.9,scaleX:0.9973,scaleY:0.9973,rotation:-11.3443,x:16.1,y:92.65}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-7.562,x:30.8,y:188.05,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.2108,x:-5.4,y:-58.5,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:11.4586,x:-21.15,y:187.85,regX:3.4}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-2.3824,x:-0.6,regY:52.5,y:-79.35,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-119.1758,x:-95.85,y:45.35,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:178.374,x:-56.8,y:115.25,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-171.889,x:-47.8,y:116.25}},{t:this.instance,p:{regX:35.8,scaleX:0.998,scaleY:0.998,rotation:-60.162,x:-56.65,y:-22.55,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-2.6046,x:-21.95,y:91.05,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:103.8765,x:45.55,y:-26.35}},{t:this.instance_13,p:{rotation:73.196,x:28.25,y:47.6,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:41.6827,x:51.4,y:124.6,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:46.84,x:57.15,y:134.65}},{t:this.instance_10,p:{regX:-1.1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.5159,x:16.25,y:92.6}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-8.6784,x:31.1,y:188,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.2367,x:-5.45,y:-58.5,scaleX:0.9987,scaleY:0.9987,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:12.4609,x:-22.35,y:187.75,regX:3.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-2.2178,x:-0.6,regY:52.4,y:-79.45,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-119.748,x:-95.55,y:45.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:177.8007,x:-55.75,y:115.2,scaleX:0.998,scaleY:0.998,regY:-8.9,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-172.4612,x:-46.75,y:115.95}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-60.4477,x:-56.85,y:-22.5,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.998,scaleY:0.998,rotation:-2.1188,x:-22.15,y:91,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:104.3923,x:45.55,y:-26.25}},{t:this.instance_13,p:{rotation:73.6255,x:27.6,y:47.4,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:42.112,x:50.15,y:124.6,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:47.2702,x:55.8,y:134.7}},{t:this.instance_10,p:{regX:-1.1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.6876,x:16.25,y:92.6}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-9.7974,x:31.45,y:187.9,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.2616,x:-5.4,y:-58.5,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9977,scaleY:0.9977,rotation:13.4643,x:-23.2,y:187.6,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-2.0505,x:-0.65,regY:52.4,y:-79.45,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-120.3206,x:-95.15,y:45.7,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:177.2281,x:-54.7,y:114.85,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.4,scaleX:0.9979,scaleY:0.9979,rotation:-173.0352,x:-45.65,y:115.8}},{t:this.instance,p:{regX:35.8,scaleX:0.998,scaleY:0.998,rotation:-60.7343,x:-56.8,y:-22.55,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.6315,x:-22.2,y:90.9,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:104.9077,x:45.55,y:-26.35}},{t:this.instance_13,p:{rotation:74.056,x:26.9,y:47.25,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:42.5417,x:48.85,y:124.6,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.9,scaleX:0.998,scaleY:0.998,rotation:47.6998,x:54.55,y:134.75}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-11.8589,x:16.4,y:92.55}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-10.9139,x:31.65,y:187.9,regY:-52.9,regX:3.7}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.2874,x:-5.4,y:-58.5,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:14.4668,x:-24.2,y:187.65,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.8832,x:-0.65,regY:52.4,y:-79.45,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-120.8933,x:-94.8,y:45.9,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:176.6553,x:-53.7,y:114.65,scaleX:0.998,scaleY:0.998,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-173.6078,x:-44.6,y:115.35}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-61.021,x:-56.8,y:-22.4,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-1.1442,x:-22.35,y:90.9,regX:3.4}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9982,scaleY:0.9982,rotation:105.4229,x:45.65,y:-26.25}},{t:this.instance_13,p:{rotation:74.4854,x:26.25,y:47.2,regY:-0.8,scaleX:0.9981,scaleY:0.9981,regX:-40.2}},{t:this.instance_12,p:{regX:-6,scaleX:0.9981,scaleY:0.9981,rotation:42.9711,x:47.7,y:124.7,regY:8.6}},{t:this.instance_11,p:{regX:-4.9,regY:2.8,scaleX:0.998,scaleY:0.998,rotation:48.1278,x:53.3,y:134.75}},{t:this.instance_10,p:{regX:-1,regY:1.9,scaleX:0.9974,scaleY:0.9974,rotation:-12.0308,x:16.4,y:92.5}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-12.0311,x:32.1,y:187.8,regY:-52.9,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{rotation:10.3113,x:-5.4,y:-58.5,scaleX:0.9988,scaleY:0.9988,regY:8.4}},{t:this.instance_6,p:{regY:-54.4,scaleX:0.9977,scaleY:0.9977,rotation:15.4686,x:-25.25,y:187.55,regX:3.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.7176,x:-0.55,regY:52.4,y:-79.45,regX:0.4}},{t:this.instance_3,p:{regY:0.1,rotation:-121.4658,x:-94.5,y:46.15,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{rotation:176.0821,x:-52.55,y:114.45,scaleX:0.9981,scaleY:0.9981,regY:-8.8,regX:6}},{t:this.instance_1,p:{regX:6.8,regY:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:-174.1796,x:-43.6,y:115.1}},{t:this.instance,p:{regX:35.7,scaleX:0.998,scaleY:0.998,rotation:-61.308,x:-56.75,y:-22.4,regY:0.5}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-145.2,-206,286.9,509.3);


(lib.CharacterBad_03_interact = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-57.25,-23,0.9984,0.9984,-93.503,0,0,35.6,0.2);

	this.instance_1 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_1.setTransform(17.35,107.65,0.9982,0.9982,-132.7599,0,0,6.1,-1.4);

	this.instance_2 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_2.setTransform(16.1,98.7,0.9984,0.9984,-109.1267,0,0,5.2,-8.7);

	this.instance_3 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_3.setTransform(-52.25,55.25,0.9984,0.9984,-147.3198,0,0,40.2,-0.1);

	this.instance_4 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_4.setTransform(0.65,-78.95,0.999,0.999,-3.6465,0,0,1.1,52.8);

	this.instance_5 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_5.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_6 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_6.setTransform(-22.65,188.2,0.9982,0.9982,19.236,0,0,3.1,-54.6);

	this.instance_7 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_7.setTransform(-4.65,-58.25,0.999,0.999,12.1097,0,0,-0.6,8.7);

	this.instance_8 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_8.setTransform(-5.6,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_9 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_9.setTransform(50.8,182.1,0.9978,0.9978,-7.1011,0,0,3.9,-53.9);

	this.instance_10 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_10.setTransform(14.9,93.2,0.9978,0.9978,-24.5215,0,0,-0.7,1.6);

	this.instance_11 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_11.setTransform(45.1,-25.85,0.9984,0.9984,142.5459,0,0,-33.6,-0.1);

	this.instance_12 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_12.setTransform(-21.05,91.8,0.9984,0.9984,-1.3785,0,0,2.6,-45.8);

	this.instance_13 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_13.setTransform(45.45,89.8,0.9983,0.9983,68.5746,0,0,-4.8,2.8);

	this.instance_14 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_14.setTransform(40.85,79.5,0.9984,0.9984,48.9765,0,0,-6.4,8);

	this.instance_15 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_15.setTransform(-14.15,20.95,0.9984,0.9984,46.7575,0,0,-40.4,-1.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:46.7575,x:-14.15,y:20.95,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:48.9765,x:40.85,y:79.5,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:68.5746,x:45.45,y:89.8,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-1.3785,x:-21.05,y:91.8}},{t:this.instance_11,p:{regX:-33.6,regY:-0.1,rotation:142.5459,x:45.1,y:-25.85,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9978,scaleY:0.9978,rotation:-24.5215,x:14.9,y:93.2}},{t:this.instance_9,p:{rotation:-7.1011,x:50.8,y:182.1,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.1097,x:-4.65,y:-58.25}},{t:this.instance_6,p:{regY:-54.6,scaleX:0.9982,scaleY:0.9982,rotation:19.236,y:188.2,x:-22.65}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,rotation:-3.6465,x:0.65,y:-78.95,scaleX:0.999,scaleY:0.999,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-147.3198,x:-52.25,y:55.25,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-109.1267,x:16.1,y:98.7,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9982,scaleY:0.9982,rotation:-132.7599,x:17.35,y:107.65,regY:-1.4}},{t:this.instance,p:{regY:0.2,rotation:-93.503,x:-57.25,y:-23,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]}).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:44.7672,x:-13.1,y:22.45,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:51.5254,x:44,y:79,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:68.4864,x:48.15,y:89.55,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.3777,x:-21,y:91.7}},{t:this.instance_11,p:{regX:-33.7,regY:-0.2,rotation:141.0672,x:45.15,y:-25.8,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.5209,x:14.85,y:93.15}},{t:this.instance_9,p:{rotation:-7.1006,x:50.75,y:182.05,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.1096,x:-4.6,y:-58.2}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.2355,y:188.25,x:-22.65}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-3.6441,x:0.75,y:-78.8,scaleX:0.999,scaleY:0.999,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-150.638,x:-53.6,y:55.3,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-109.399,x:17,y:94.75,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-131.8742,x:18.4,y:103.8,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-92.464,x:-57.35,y:-23.05,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:42.7751,x:-11.8,y:23.95,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:54.0738,x:47.25,y:78.55,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:68.3996,x:50.85,y:89.2,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.3777,x:-21,y:91.7}},{t:this.instance_11,p:{regX:-33.7,regY:-0.2,rotation:139.589,x:45.15,y:-25.75,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.5209,x:14.85,y:93.15}},{t:this.instance_9,p:{rotation:-7.1006,x:50.75,y:182.05,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.1096,x:-4.6,y:-58.2}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.2355,y:188.25,x:-22.65}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-3.6441,x:0.75,y:-78.8,scaleX:0.999,scaleY:0.999,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-153.9586,x:-54.9,y:55.4,regX:40.1,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-109.6744,x:17.7,y:90.6,regY:-8.8,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-130.9878,x:19.25,y:99.65,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-91.4257,x:-57.35,y:-23.1,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:40.7834,x:-10.55,y:25.35,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:56.6233,x:50.4,y:77.8,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:68.3111,x:53.55,y:88.7,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.3777,x:-21,y:91.7}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:138.1131,x:45.1,y:-25.75,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.5209,x:14.85,y:93.15}},{t:this.instance_9,p:{rotation:-7.1007,x:50.75,y:182.05,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.1096,x:-4.6,y:-58.2}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.2355,y:188.25,x:-22.65}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-3.6441,x:0.75,y:-78.8,scaleX:0.999,scaleY:0.999,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-157.279,x:-56.35,y:55.45,regX:40.1,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-109.9486,x:18.3,y:86.35,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-130.1026,x:19.8,y:95.35,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-90.3871,x:-57.35,y:-23.1,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:38.7917,x:-9.15,y:26.8,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:59.1716,x:53.55,y:77.05,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:68.2227,x:56.2,y:88.1,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.3768,x:-21.05,y:91.7}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:136.635,x:45.15,y:-25.75,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.5209,x:14.85,y:93.15}},{t:this.instance_9,p:{rotation:-7.1007,x:50.75,y:182.05,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.1096,x:-4.6,y:-58.2}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.2355,y:188.25,x:-22.65}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-3.6441,x:0.75,y:-78.8,scaleX:0.999,scaleY:0.999,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-160.5974,x:-57.8,y:55.35,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-110.2232,x:18.4,y:82.05,regY:-8.8,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-129.2148,x:20,y:90.95,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-89.352,x:-57.35,y:-23.1,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:36.8011,x:-7.8,y:28.15,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:61.7209,x:56.6,y:76.3,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:68.1339,x:58.75,y:87.4,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.3768,x:-21.05,y:91.7}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:135.1567,x:45.15,y:-25.7,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.5209,x:14.85,y:93.15}},{t:this.instance_9,p:{rotation:-7.1007,x:50.75,y:182.05,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.1096,x:-4.6,y:-58.2}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.2355,y:188.25,x:-22.65}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-3.6441,x:0.75,y:-78.8,scaleX:0.999,scaleY:0.999,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-163.9168,x:-59.2,y:55.4,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-110.4978,x:18.5,y:77.45,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-128.3293,x:20.1,y:86.4,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-88.3141,x:-57.3,y:-23.25,regX:35.7,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:34.8091,x:-6.3,y:29.6,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:64.2703,x:59.65,y:75.35,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:68.0459,x:61.35,y:86.6,regX:-4.7,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.3768,x:-21.05,y:91.7}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:133.6791,x:45.1,y:-25.7,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.5209,x:14.85,y:93.15}},{t:this.instance_9,p:{rotation:-7.1007,x:50.75,y:182.05,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.1096,x:-4.6,y:-58.2}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.2355,y:188.25,x:-22.65}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-3.6441,x:0.75,y:-78.8,scaleX:0.999,scaleY:0.999,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-167.2356,x:-60.65,y:55.45,regX:40.2,regY:-0.2}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-110.7724,x:18.35,y:73,regY:-8.7,regX:5.1}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-127.443,x:19.95,y:81.75,regY:-1.3}},{t:this.instance,p:{regY:0.1,rotation:-87.2748,x:-57.3,y:-23.1,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:32.818,x:-4.95,y:30.85,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:66.8183,x:62.6,y:74.3,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:67.9574,x:63.75,y:85.6,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.3768,x:-21.05,y:91.7}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:132.2,x:45.15,y:-25.7,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.5209,x:14.85,y:93.15}},{t:this.instance_9,p:{rotation:-7.1007,x:50.75,y:182.05,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.1096,x:-4.6,y:-58.2}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.2355,y:188.25,x:-22.6}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-3.6432,x:0.75,y:-78.8,scaleX:0.999,scaleY:0.999,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-170.5565,x:-62.05,y:55.2,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-111.0458,x:17.8,y:68.15,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-126.5573,x:19.45,y:77.15,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-86.2371,x:-57.3,y:-23.05,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:30.8262,x:-3.5,y:32.1,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:69.3674,x:65.65,y:73.15,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:67.8714,x:66.2,y:84.5,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.3768,x:-21.05,y:91.7}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:130.724,x:45.15,y:-25.65,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.5209,x:14.85,y:93.15}},{t:this.instance_9,p:{rotation:-7.1007,x:50.75,y:182.05,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.1096,x:-4.6,y:-58.2}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.2355,y:188.25,x:-22.6}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-3.6432,x:0.75,y:-78.8,scaleX:0.999,scaleY:0.999,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-173.8759,x:-63.45,y:55.1,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-111.32,x:16.95,y:63.4,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-125.6708,x:18.65,y:72.4,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-85.1991,x:-57.35,y:-23.15,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:28.8348,x:-1.95,y:33.4,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:71.9162,x:68.4,y:72.05,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:67.7814,x:68.6,y:83.3,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.3768,x:-21.05,y:91.7}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:129.2453,x:45.1,y:-25.75,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.5209,x:14.85,y:93.15}},{t:this.instance_9,p:{rotation:-7.0998,x:50.75,y:182.05,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.1096,x:-4.6,y:-58.2}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.2355,y:188.25,x:-22.6}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-3.6432,x:0.75,y:-78.8,scaleX:0.999,scaleY:0.999,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-177.194,x:-64.9,y:55,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-111.5949,x:15.9,y:58.55,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-124.7856,x:17.65,y:67.6,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-84.1604,x:-57.35,y:-23.1,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:26.8431,x:-0.45,y:34.5,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:74.4649,x:71.3,y:70.8,regX:-6.3,regY:8}},{t:this.instance_13,p:{rotation:67.6927,x:70.95,y:82,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.3768,x:-21.05,y:91.7}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:127.7675,x:45.1,y:-25.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.5209,x:14.85,y:93.15}},{t:this.instance_9,p:{rotation:-7.0998,x:50.75,y:182.05,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.1096,x:-4.6,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.2355,y:188.25,x:-22.6}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-3.6432,x:0.8,y:-78.8,scaleX:0.999,scaleY:0.999,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:179.4895,x:-66.3,y:54.85,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-111.8692,x:14.6,y:53.85,regY:-8.7,regX:5.1}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-123.8983,x:16.35,y:62.75,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-83.1215,x:-57.3,y:-23.3,regX:35.7,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:24.8517,x:1.1,y:35.65,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:77.0141,x:74.05,y:69.3,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:67.6055,x:73.2,y:80.6,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.3759,x:-21.05,y:91.7}},{t:this.instance_11,p:{regX:-33.7,regY:-0.2,rotation:126.2905,x:45.15,y:-25.9,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.5209,x:14.85,y:93.15}},{t:this.instance_9,p:{rotation:-7.0998,x:50.75,y:182.05,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.1096,x:-4.6,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.2347,y:188.25,x:-22.6}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-3.6432,x:0.8,y:-78.8,scaleX:0.999,scaleY:0.999,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:176.1712,x:-67.65,y:54.7,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-112.1431,x:12.95,y:48.85,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-123.0124,x:14.8,y:57.85,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-82.0839,x:-57.3,y:-23.15,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:22.8606,x:2.8,y:36.8,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:79.5632,x:76.8,y:67.85,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:67.5167,x:75.45,y:79.15,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.3759,x:-21.05,y:91.7}},{t:this.instance_11,p:{regX:-33.7,regY:-0.2,rotation:124.8122,x:45.15,y:-25.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.5209,x:14.85,y:93.15}},{t:this.instance_9,p:{rotation:-7.0998,x:50.75,y:182.05,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.1096,x:-4.6,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.2347,y:188.25,x:-22.6}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-3.6424,x:0.8,y:-78.8,scaleX:0.9989,scaleY:0.9989,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:172.8514,x:-69,y:54.45,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-112.4176,x:11.05,y:44,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-122.126,x:12.9,y:53,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-81.0456,x:-57.3,y:-23.2,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:20.8686,x:4.35,y:37.85,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:82.1119,x:79.55,y:66.35,regX:-6.4,regY:7.9}},{t:this.instance_13,p:{rotation:67.4284,x:77.6,y:77.55,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.3759,x:-21.05,y:91.7}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:123.3345,x:45.05,y:-25.75,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.5205,x:14.85,y:93.15}},{t:this.instance_9,p:{rotation:-7.0998,x:50.75,y:182.05,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.1081,x:-4.65,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.2347,y:188.25,x:-22.6}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-3.6424,x:0.8,y:-78.8,scaleX:0.9989,scaleY:0.9989,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:169.5323,x:-70.4,y:54.2,regX:40.1,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-112.6917,x:8.95,y:39.1,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-121.2403,x:10.8,y:48.05,regY:-1.4}},{t:this.instance,p:{regY:0.2,rotation:-80.0052,x:-57.2,y:-23.15,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:18.8778,x:6.05,y:38.9,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:84.66,x:82.05,y:64.8,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:67.3401,x:79.65,y:75.95,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.3759,x:-21.05,y:91.7}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:121.8556,x:45.1,y:-25.75,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.5205,x:14.85,y:93.15}},{t:this.instance_9,p:{rotation:-7.0998,x:50.75,y:182.05,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.1081,x:-4.65,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.2352,y:188.25,x:-22.6}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-3.6424,x:0.8,y:-78.8,scaleX:0.9989,scaleY:0.9989,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:166.2123,x:-71.85,y:53.95,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-112.9672,x:6.5,y:34.35,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-120.3541,x:8.4,y:43.25,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-78.9683,x:-57.3,y:-23.25,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:16.8853,x:7.7,y:39.9,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:87.2098,x:84.55,y:63.1,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:67.2525,x:81.7,y:74.1,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.3759,x:-21.05,y:91.75}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:120.378,x:45,y:-25.8,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.5205,x:14.85,y:93.15}},{t:this.instance_9,p:{rotation:-7.0998,x:50.75,y:182.05,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.1081,x:-4.65,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.2352,y:188.25,x:-22.6}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-3.6424,x:0.8,y:-78.8,scaleX:0.9989,scaleY:0.9989,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:162.8933,x:-73.2,y:53.7,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-113.2415,x:3.85,y:29.65,regY:-8.8,regX:5.1}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-119.4676,x:5.85,y:38.35,regY:-1.3}},{t:this.instance,p:{regY:0.1,rotation:-77.9298,x:-57.25,y:-23.25,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:14.8948,x:9.35,y:40.95,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:89.7583,x:87,y:61.3,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:67.1642,x:83.65,y:72.2,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.3759,x:-21.05,y:91.75}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:118.901,x:45.05,y:-25.75,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.5205,x:14.85,y:93.15}},{t:this.instance_9,p:{rotation:-7.0989,x:50.75,y:182.05,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.1081,x:-4.65,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.2352,y:188.25,x:-22.6}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-3.6424,x:0.8,y:-78.8,scaleX:0.9989,scaleY:0.9989,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:159.5749,x:-74.55,y:53.4,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-113.5149,x:1,y:24.8,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-118.5826,x:2.9,y:33.65,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-76.8915,x:-57.3,y:-23.25,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:12.9026,x:11.25,y:41.75,regY:-1.1,regX:-40.3}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:92.302,x:89.4,y:59.55,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:67.0759,x:85.65,y:70.3,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.3759,x:-21.05,y:91.75}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:117.4227,x:45.1,y:-25.75,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.5205,x:14.85,y:93.15}},{t:this.instance_9,p:{rotation:-7.0989,x:50.75,y:182.05,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.1081,x:-4.65,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.2352,y:188.25,x:-22.6}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-3.6415,x:0.8,y:-78.8,scaleX:0.9989,scaleY:0.9989,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:156.2538,x:-75.95,y:53,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-113.7894,x:-2.2,y:20.1,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-117.6965,x:-0.25,y:29,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-75.8527,x:-57.25,y:-23.25,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:10.9111,x:12.85,y:42.55,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:94.8521,x:91.85,y:57.8,regX:-6.3,regY:7.9}},{t:this.instance_13,p:{rotation:66.9876,x:87.5,y:68.15,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.375,x:-21.05,y:91.75}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:115.9455,x:45.15,y:-25.75,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.5205,x:14.85,y:93.15}},{t:this.instance_9,p:{rotation:-7.0989,x:50.75,y:182.05,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.1081,x:-4.65,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.2352,y:188.25,x:-22.6}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-3.6415,x:0.8,y:-78.8,scaleX:0.9989,scaleY:0.9989,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:152.9356,x:-77.35,y:52.65,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-114.0635,x:-5.6,y:15.5,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-116.8095,x:-3.45,y:24.4,regY:-1.3}},{t:this.instance,p:{regY:0.1,rotation:-74.814,x:-57.3,y:-23.2,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:8.9185,x:14.6,y:43.35,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:97.4004,x:93.95,y:55.6,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:66.8989,x:89.3,y:66.1,regX:-4.7,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.375,x:-21.05,y:91.75}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:114.4674,x:45.1,y:-25.75,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.5205,x:14.8,y:93.1}},{t:this.instance_9,p:{rotation:-7.0989,x:50.75,y:182.05,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.1081,x:-4.6,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.2352,y:188.25,x:-22.6}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-3.6415,x:0.8,y:-78.8,scaleX:0.9989,scaleY:0.9989,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:149.6164,x:-78.6,y:52.3,regX:40.1,regY:-0.2}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-114.3383,x:-9.25,y:11.1,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-115.923,x:-7.05,y:19.9,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-73.7759,x:-57.25,y:-23.3,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:8.9691,x:14.5,y:43.35,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:97.4004,x:93.9,y:55.65,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:66.9264,x:89.25,y:66.15,regX:-4.7,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-1.3295,x:-21.05,y:91.75}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:114.4921,x:45.1,y:-25.75,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.5425,x:14.8,y:93.1}},{t:this.instance_9,p:{rotation:-7.1678,x:50.85,y:182,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0937,x:-4.6,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.2837,y:188.2,x:-22.65}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-3.6003,x:0.8,y:-78.8,scaleX:0.9989,scaleY:0.9989,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:151.465,x:-73.15,y:53.7,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-112.4475,x:-2.4,y:14.75,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-114.0594,x:-0.6,y:23.65,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-77.9755,x:-57.25,y:-23.25,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:9.0179,x:14.5,y:43.35,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:97.4004,x:93.85,y:55.7,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:66.9542,x:89.15,y:66.1,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.2839,x:-21.05,y:91.75}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:114.5168,x:45.1,y:-25.7,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.5656,x:14.8,y:93.1}},{t:this.instance_9,p:{rotation:-7.2367,x:50.9,y:182,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0775,x:-4.55,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.3319,y:188.2,x:-22.7}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-3.56,x:0.9,y:-78.8,scaleX:0.9989,scaleY:0.9989,regX:1.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:153.3132,x:-67.4,y:54.7,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-110.556,x:4.55,y:18.05,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-112.1944,x:6,y:27,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-82.1759,x:-57.25,y:-23.2,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:9.0665,x:14.5,y:43.3,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:97.4004,x:93.8,y:55.8,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:66.9817,x:89.15,y:66.15,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.2367,x:-21.1,y:91.7}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:114.5411,x:45.1,y:-25.75,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.5888,x:14.85,y:93.15}},{t:this.instance_9,p:{rotation:-7.3064,x:50.85,y:181.9,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0633,x:-4.6,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.3812,y:188.25,x:-22.85}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,rotation:-3.5179,x:0.85,y:-78.95,scaleX:0.9989,scaleY:0.9989,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:155.1627,x:-61.65,y:55.25,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-108.6656,x:11.35,y:21,regY:-8.8,regX:5.1}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-110.3303,x:12.55,y:30,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-86.3748,x:-57.2,y:-23.15,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:9.1164,x:14.5,y:43.25,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:97.4004,x:93.75,y:55.85,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:67.01,x:89,y:66.2,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.1902,x:-21,y:91.7}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:114.5654,x:45.05,y:-25.8,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.6119,x:14.8,y:93.15}},{t:this.instance_9,p:{rotation:-7.3763,x:50.9,y:181.95,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0461,x:-4.6,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.4294,y:188.25,x:-22.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,rotation:-3.4766,x:0.85,y:-78.95,scaleX:0.9989,scaleY:0.9989,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:157.0121,x:-55.95,y:55.4,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-106.775,x:18.2,y:23.45,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-108.4654,x:19.05,y:32.5,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-90.5701,x:-57.2,y:-23.1,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:9.166,x:14.45,y:43.25,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:97.4004,x:93.7,y:55.9,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:67.0375,x:88.95,y:66.25,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.1438,x:-21.05,y:91.65}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:114.5909,x:45.05,y:-25.8,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.6374,x:14.75,y:93.1}},{t:this.instance_9,p:{rotation:-7.4461,x:51,y:181.95,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0319,x:-4.55,y:-58.1}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.479,y:188.2,x:-23}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,rotation:-3.4363,x:0.85,y:-78.9,scaleX:0.999,scaleY:0.999,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:158.8616,x:-50.15,y:55.05,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-104.8834,x:24.95,y:25.65,regY:-8.7,regX:5.1}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-106.6014,x:25.55,y:34.6,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-94.7684,x:-57.25,y:-23.05,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:3.5297,x:23.9,y:46.7,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:94.1589,x:104,y:51.6,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:63.7871,x:99.95,y:62.15,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-1.1595,x:-21.1,y:91.7}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:106.9062,x:45.05,y:-25.85,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.6295,x:14.75,y:93.1}},{t:this.instance_9,p:{rotation:-7.4231,x:50.95,y:181.95,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.037,x:-4.55,y:-58.1}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.4632,y:188.25,x:-22.95}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,rotation:-3.4503,x:0.85,y:-78.95,scaleX:0.999,scaleY:0.999,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:158.0758,x:-39.85,y:53.5,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-105.6813,x:34.85,y:22.9,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-107.3911,x:35.55,y:32.05,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-102.3992,x:-57.2,y:-23,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:-2.1014,x:33.85,y:48.95,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:90.9169,x:114,y:45.8,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:60.5358,x:110.45,y:56.6,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-1.1744,x:-21.1,y:91.7}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:99.2215,x:45.1,y:-25.8,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.6201,x:14.8,y:93.1}},{t:this.instance_9,p:{rotation:-7.3992,x:50.9,y:181.95,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0418,x:-4.6,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.4463,y:188.25,x:-22.95}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,rotation:-3.4635,x:0.9,y:-78.95,scaleX:0.9989,scaleY:0.9989,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:157.2926,x:-29.8,y:50.55,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-106.4807,x:44.45,y:18.8,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6.1,scaleX:0.998,scaleY:0.998,rotation:-108.1804,x:45.25,y:27.9,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-110.0296,x:-57.2,y:-23.05,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:-7.7353,x:43.95,y:49.75,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:87.6796,x:123.35,y:38.75,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:57.2855,x:120.45,y:49.75,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.1902,x:-21,y:91.7}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:91.5361,x:45.05,y:-25.85,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.6119,x:14.75,y:93.1}},{t:this.instance_9,p:{rotation:-7.3763,x:50.85,y:181.95,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0461,x:-4.6,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.4294,y:188.25,x:-22.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,rotation:-3.4766,x:0.85,y:-78.95,scaleX:0.9989,scaleY:0.9989,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:156.5072,x:-20.3,y:46.2,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-107.2797,x:53.4,y:13.6,regY:-8.8,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-108.9704,x:54.6,y:22.7,regY:-1.3}},{t:this.instance,p:{regY:0.1,rotation:-117.6617,x:-57.15,y:-23.1,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:-13.3712,x:54.05,y:49.2,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:84.4384,x:132.1,y:30.5,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:54.0343,x:129.8,y:41.7,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.2051,x:-21.05,y:91.7}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:83.8566,x:45.05,y:-25.85,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.6044,x:14.75,y:93.1}},{t:this.instance_9,p:{rotation:-7.3525,x:50.85,y:181.9,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0516,x:-4.6,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.4136,y:188.25,x:-22.85}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,rotation:-3.4898,x:0.9,y:-78.95,scaleX:0.9989,scaleY:0.9989,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:155.7227,x:-11.45,y:40.7,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-108.0777,x:62,y:7.1,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-109.7605,x:63.15,y:16.15,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-125.2925,x:-57.15,y:-23,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:-19.0071,x:64.05,y:47.3,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:81.1968,x:139.75,y:21.1,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:50.7839,x:138.15,y:32.3,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.22,x:-21.05,y:91.7}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:76.171,x:45.1,y:-25.8,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.5962,x:14.75,y:93.1}},{t:this.instance_9,p:{rotation:-7.3294,x:50.85,y:181.95,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0569,x:-4.6,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.397,y:188.25,x:-22.85}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,rotation:-3.5038,x:0.85,y:-78.95,scaleX:0.9989,scaleY:0.9989,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:154.939,x:-3.3,y:34.05,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-108.8764,x:69.55,y:-0.55,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-110.5501,x:70.95,y:8.55,regY:-1.3}},{t:this.instance,p:{regY:0.1,rotation:-132.9239,x:-57.1,y:-22.95,regX:35.6,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:-24.6433,x:73.6,y:44.15,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:77.9543,x:146.55,y:10.6,regX:-6.4,regY:7.9}},{t:this.instance_13,p:{rotation:47.5336,x:145.45,y:21.9,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.2358,x:-21.1,y:91.7}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:68.4872,x:45.05,y:-25.85,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.5888,x:14.8,y:93.1}},{t:this.instance_9,p:{rotation:-7.3056,x:50.8,y:181.9,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0633,x:-4.6,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.3795,y:188.25,x:-22.75}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,rotation:-3.517,x:0.85,y:-78.95,scaleX:0.9989,scaleY:0.9989,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:154.1528,x:3.75,y:26.4,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-109.6744,x:76.15,y:-9.1,regY:-8.8,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.9981,rotation:-111.3394,x:77.6,y:-0.2,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-140.555,x:-57.05,y:-22.95,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:-30.2769,x:82.7,y:39.7,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:74.7122,x:151.95,y:-0.8,regX:-6.3,regY:8}},{t:this.instance_13,p:{rotation:44.2835,x:151.45,y:10.5,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.2507,x:-21.05,y:91.7}},{t:this.instance_11,p:{regX:-33.7,regY:-0.2,rotation:60.8031,x:45,y:-25.95,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.5817,x:14.75,y:93.1}},{t:this.instance_9,p:{rotation:-7.2827,x:50.8,y:182,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0677,x:-4.55,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.3646,y:188.25,x:-22.75}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,rotation:-3.5319,x:0.9,y:-78.9,scaleX:0.9989,scaleY:0.9989,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:153.3692,x:9.8,y:18.05,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-110.4734,x:81.75,y:-18.55,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-112.1307,x:83.35,y:-9.55,regY:-1.3}},{t:this.instance,p:{regY:0.1,rotation:-148.1853,x:-57,y:-22.9,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:-35.9133,x:91.2,y:34.15,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:71.4714,x:156,y:-13,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:41.0323,x:156.3,y:-1.6,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.2664,x:-21.05,y:91.7}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:53.1164,x:45,y:-25.85,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.5738,x:14.75,y:93.1}},{t:this.instance_9,p:{rotation:-7.2588,x:50.8,y:181.95,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0731,x:-4.55,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.3477,y:188.3,x:-22.8}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,rotation:-3.5459,x:0.85,y:-78.9,scaleX:0.9989,scaleY:0.9989,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:152.5843,x:14.65,y:8.75,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-111.2729,x:86.1,y:-28.9,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-112.9193,x:87.7,y:-19.75,regY:-1.4}},{t:this.instance,p:{regY:0.2,rotation:-155.8171,x:-56.9,y:-23,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:-41.5487,x:98.65,y:27.4,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:68.2295,x:158.65,y:-25.85,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:37.782,x:159.55,y:-14.55,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.2822,x:-21.05,y:91.75}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:45.4328,x:45.05,y:-25.75,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.5656,x:14.75,y:93.05}},{t:this.instance_9,p:{rotation:-7.2359,x:50.85,y:182,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0775,x:-4.55,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.3311,y:188.2,x:-22.7}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,rotation:-3.5591,x:0.85,y:-78.9,scaleX:0.9989,scaleY:0.9989,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:151.8008,x:18.3,y:-1.1,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-112.072,x:89.15,y:-39.6,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9981,scaleY:0.9981,rotation:-113.7085,x:90.85,y:-30.65,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-163.447,x:-56.95,y:-22.9,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:-47.1828,x:105.4,y:19.85,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:64.9868,x:159.7,y:-39.1,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:34.5313,x:161.35,y:-27.95,regX:-4.8,regY:2.7,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.298,x:-21.05,y:91.75}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:37.7483,x:45,y:-25.75,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.5582,x:14.8,y:93.05}},{t:this.instance_9,p:{rotation:-7.2136,x:50.8,y:182,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0828,x:-4.6,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.3144,y:188.2,x:-22.7}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-3.5731,x:0.9,y:-78.8,scaleX:0.9989,scaleY:0.9989,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:151.0156,x:20.55,y:-11.3,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-112.8696,x:90.9,y:-50.8,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-114.4989,x:92.75,y:-41.75,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-171.0767,x:-56.95,y:-22.9,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:-52.8194,x:110.95,y:11.4,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:61.7456,x:159.2,y:-52.7,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:31.281,x:161.45,y:-41.5,regX:-4.8,regY:2.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.3129,x:-21.05,y:91.75}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:30.0649,x:45,y:-25.75,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.5503,x:14.75,y:93.05}},{t:this.instance_9,p:{rotation:-7.1899,x:50.75,y:182,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0875,x:-4.6,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.2975,y:188.2,x:-22.65}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-3.5854,x:0.85,y:-78.8,scaleX:0.9989,scaleY:0.9989,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:150.2313,x:21.4,y:-21.65,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-113.6679,x:91.2,y:-62.05,regY:-8.7,regX:5.1}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-115.2886,x:93.2,y:-53.15,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-178.7083,x:-56.95,y:-22.95,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:-58.4539,x:115.35,y:2.25,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:58.5041,x:157.1,y:-66.25,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:28.0308,x:159.95,y:-55.3,regX:-4.8,regY:2.7,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-1.3286,x:-21.05,y:91.75}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:22.3795,x:45.1,y:-25.75,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.5425,x:14.75,y:93.05}},{t:this.instance_9,p:{rotation:-7.167,x:50.8,y:182,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0937,x:-4.6,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.2809,y:188.25,x:-22.65}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-3.5994,x:0.9,y:-78.8,scaleX:0.9989,scaleY:0.9989,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:149.4465,x:20.95,y:-32.05,regX:40.2,regY:-0.2}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-114.4664,x:90.1,y:-73.55,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-116.0789,x:92.2,y:-64.6,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:173.6663,x:-56.85,y:-22.9,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:-64.0898,x:118.35,y:-7.4,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:55.2616,x:153.25,y:-79.7,regX:-6.4,regY:7.9}},{t:this.instance_13,p:{rotation:24.7788,x:156.65,y:-68.8,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.3427,x:-21.05,y:91.75}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:14.6947,x:45,y:-25.7,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.5354,x:14.75,y:93.05}},{t:this.instance_9,p:{rotation:-7.1429,x:50.75,y:182,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.099,x:-4.6,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.2643,y:188.25,x:-22.6}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-3.6125,x:0.95,y:-78.8,scaleX:0.9989,scaleY:0.9989,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:148.6621,x:19,y:-42.4,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-115.265,x:87.65,y:-84.8,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9981,scaleY:0.9981,rotation:-116.8671,x:89.9,y:-75.9,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:166.0358,x:-57,y:-22.9,regX:35.7,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:-69.7245,x:120.1,y:-17.4,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:52.021,x:147.7,y:-92.8,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:21.5277,x:151.75,y:-82.05,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.3584,x:-21.05,y:91.75}},{t:this.instance_11,p:{regX:-33.7,regY:-0.2,rotation:7.0109,x:44.85,y:-25.75,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.5272,x:14.8,y:93.05}},{t:this.instance_9,p:{rotation:-7.1201,x:50.7,y:182.05,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.1041,x:-4.6,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.2477,y:188.25,x:-22.5}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-3.6266,x:0.9,y:-78.8,scaleX:0.9989,scaleY:0.9989,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:147.8779,x:15.8,y:-52.25,regX:40.2,regY:-0.2}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-116.0641,x:83.75,y:-95.6,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-117.6577,x:86.15,y:-86.7,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:158.4038,x:-56.85,y:-22.9,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:-75.3599,x:120.6,y:-27.55,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:48.7795,x:140.7,y:-105.15,regX:-6.3,regY:8}},{t:this.instance_13,p:{rotation:18.2779,x:145.25,y:-94.8,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.3733,x:-21.05,y:91.7}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:-0.6699,x:44.95,y:-25.7,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.5205,x:14.75,y:93.05}},{t:this.instance_9,p:{rotation:-7.0972,x:50.7,y:182.05,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.1081,x:-4.55,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.2327,y:188.25,x:-22.55}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-3.6398,x:0.9,y:-78.8,scaleX:0.9989,scaleY:0.9989,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:147.0932,x:11.25,y:-61.75,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-116.8627,x:78.65,y:-105.95,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-118.4466,x:81.1,y:-97.1,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:150.7741,x:-56.8,y:-23,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:-75.3438,x:120.6,y:-27.55,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:48.8074,x:140.7,y:-105.15,regX:-6.3,regY:8}},{t:this.instance_13,p:{rotation:18.3128,x:145.25,y:-94.75,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.361,x:-21.05,y:91.75}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:-0.6638,x:44.95,y:-25.7,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.5264,x:14.75,y:93}},{t:this.instance_9,p:{rotation:-7.1158,x:50.75,y:182.05,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.1053,x:-4.6,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.2457,y:188.25,x:-22.55}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-3.6284,x:0.9,y:-78.8,scaleX:0.9989,scaleY:0.9989,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:147.1015,x:11.3,y:-61.65,regX:40.2,regY:-0.2}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-116.842,x:78.65,y:-106,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-118.4344,x:81.1,y:-97.05,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:150.7698,x:-56.85,y:-23,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:-75.3266,x:120.6,y:-27.5,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:48.8353,x:140.8,y:-105.15,regX:-6.3,regY:7.9}},{t:this.instance_13,p:{rotation:18.348,x:145.3,y:-94.75,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.3479,x:-21.1,y:91.75}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:-0.6594,x:44.95,y:-25.7,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.5327,x:14.7,y:93}},{t:this.instance_9,p:{rotation:-7.1351,x:50.7,y:182.05,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.1007,x:-4.6,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.2596,y:188.25,x:-22.55}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-3.6169,x:0.95,y:-78.8,scaleX:0.999,scaleY:0.999,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:147.1105,x:11.3,y:-61.65,regX:40.2,regY:-0.2}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-116.8216,x:78.65,y:-105.95,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-118.4215,x:81.1,y:-97.05,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:150.7647,x:-56.85,y:-23,regX:35.6,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:-75.31,x:120.7,y:-27.45,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:48.862,x:140.75,y:-105.2,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:18.3829,x:145.35,y:-94.8,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-1.3365,x:-21,y:91.75}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:-0.6533,x:44.95,y:-25.7,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.539,x:14.7,y:93}},{t:this.instance_9,p:{rotation:-7.1546,x:50.75,y:182,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0964,x:-4.6,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.2734,y:188.25,x:-22.65}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-3.6055,x:0.85,y:-78.8,scaleX:0.9989,scaleY:0.9989,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:147.1192,x:11.3,y:-61.65,regX:40.2,regY:-0.2}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-116.8008,x:78.65,y:-105.95,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-118.4081,x:81.1,y:-97.05,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:150.76,x:-56.85,y:-22.95,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:-75.2919,x:120.6,y:-27.5,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:48.8899,x:140.8,y:-105.15,regX:-6.4,regY:7.9}},{t:this.instance_13,p:{rotation:18.4178,x:145.3,y:-94.7,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-1.3233,x:-21.05,y:91.75}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:-0.648,x:44.95,y:-25.7,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.546,x:14.7,y:93}},{t:this.instance_9,p:{rotation:-7.174,x:50.75,y:182,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0919,x:-4.6,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.2876,y:188.2,x:-22.65}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-3.5942,x:0.9,y:-78.8,scaleX:0.9989,scaleY:0.9989,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:147.128,x:11.25,y:-61.7,regX:40.2,regY:-0.2}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-116.7801,x:78.65,y:-106,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-118.3944,x:81.1,y:-97.05,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:150.7553,x:-56.85,y:-22.95,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:-75.2758,x:120.6,y:-27.5,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:48.916,x:140.75,y:-105.15,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:18.4521,x:145.35,y:-94.7,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.3103,x:-21.1,y:91.75}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:-0.6419,x:44.95,y:-25.7,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.5519,x:14.7,y:93}},{t:this.instance_9,p:{rotation:-7.1935,x:50.7,y:181.95,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0866,x:-4.6,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.3003,y:188.2,x:-22.65}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-3.5828,x:0.85,y:-78.8,scaleX:0.9989,scaleY:0.9989,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:147.137,x:11.3,y:-61.7,regX:40.2,regY:-0.2}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-116.7593,x:78.65,y:-106,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-118.3823,x:81.1,y:-97.05,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:150.7498,x:-56.85,y:-22.95,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:-75.2594,x:120.6,y:-27.5,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:48.9439,x:140.8,y:-105.05,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:18.4873,x:145.4,y:-94.7,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.298,x:-21.05,y:91.75}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:-0.6375,x:44.95,y:-25.75,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.5582,x:14.75,y:93}},{t:this.instance_9,p:{rotation:-7.2136,x:50.8,y:182,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0828,x:-4.6,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.3144,y:188.2,x:-22.7}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-3.5731,x:0.95,y:-78.8,scaleX:0.9989,scaleY:0.9989,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:147.1464,x:11.3,y:-61.8,regX:40.1,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-116.739,x:78.65,y:-105.9,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-118.3693,x:81.1,y:-97.05,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:150.7459,x:-56.85,y:-22.95,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:-75.2431,x:120.8,y:-27.4,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:48.9718,x:140.85,y:-105.1,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:18.5225,x:145.4,y:-94.7,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.2848,x:-21.05,y:91.75}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:-0.6314,x:44.95,y:-25.75,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.5652,x:14.7,y:93.05}},{t:this.instance_9,p:{rotation:-7.2323,x:50.75,y:182,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0786,x:-4.55,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.3283,y:188.2,x:-22.7}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-3.5616,x:1,y:-78.8,scaleX:0.9989,scaleY:0.9989,regX:1.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:147.1547,x:11.35,y:-61.75,regX:40.1,regY:-0.2}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-116.719,x:78.65,y:-105.9,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-118.3564,x:81.1,y:-97.05,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:150.7412,x:-56.9,y:-22.95,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:-75.2261,x:120.7,y:-27.35,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:48.9984,x:140.8,y:-105.05,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:18.5574,x:145.4,y:-94.65,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.2717,x:-21.05,y:91.7}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:-0.6261,x:44.95,y:-25.75,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.5712,x:14.7,y:93.05}},{t:this.instance_9,p:{rotation:-7.2517,x:50.8,y:181.95,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0741,x:-4.55,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.3413,y:188.2,x:-22.75}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,rotation:-3.5503,x:0.9,y:-78.95,scaleX:0.9989,scaleY:0.9989,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:147.1634,x:11.35,y:-61.75,regX:40.1,regY:-0.2}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-116.6982,x:78.65,y:-105.95,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-118.3435,x:81.1,y:-97,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:150.7364,x:-56.9,y:-22.95,regX:35.6,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:-75.2097,x:120.6,y:-27.45,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:49.0252,x:140.8,y:-105.05,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:18.5925,x:145.4,y:-94.65,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.2585,x:-21.05,y:91.7}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:-0.62,x:44.95,y:-25.75,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.5778,x:14.7,y:93.05}},{t:this.instance_9,p:{rotation:-7.2711,x:50.8,y:182,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0703,x:-4.55,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.3552,y:188.25,x:-22.7}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,rotation:-3.5389,x:0.85,y:-78.9,scaleX:0.9989,scaleY:0.9989,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:147.1717,x:11.35,y:-61.8,regX:40.1,regY:-0.2}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-116.6778,x:78.65,y:-105.9,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-118.3298,x:81.1,y:-97,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:150.7317,x:-56.9,y:-22.9,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:-75.1925,x:120.6,y:-27.45,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:49.0531,x:140.85,y:-105.05,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:18.6277,x:145.45,y:-94.65,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.2463,x:-21.1,y:91.7}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:-0.6139,x:44.95,y:-25.75,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.5844,x:14.7,y:93.05}},{t:this.instance_9,p:{rotation:-7.2907,x:50.8,y:182,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0667,x:-4.55,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.3698,y:188.25,x:-22.75}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,rotation:-3.5275,x:0.9,y:-78.9,scaleX:0.9989,scaleY:0.9989,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:147.1807,x:11.2,y:-61.8,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-116.6583,x:78.65,y:-105.9,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-118.3168,x:81.1,y:-97.05,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:150.7271,x:-56.9,y:-22.9,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:-75.1762,x:120.7,y:-27.4,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:49.0817,x:140.9,y:-105.1,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:18.6609,x:145.5,y:-94.7,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.2332,x:-21.05,y:91.7}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:-0.6095,x:44.95,y:-25.75,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.5907,x:14.75,y:93.05}},{t:this.instance_9,p:{rotation:-7.3101,x:50.85,y:181.9,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0622,x:-4.6,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.3823,y:188.25,x:-22.8}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,rotation:-3.5152,x:0.9,y:-78.95,scaleX:0.9989,scaleY:0.9989,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:147.1894,x:11.15,y:-61.8,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-116.6367,x:78.65,y:-105.95,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-118.3035,x:81.1,y:-97,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:150.7208,x:-56.85,y:-22.9,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:-75.1587,x:120.7,y:-27.35,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:49.1084,x:140.85,y:-105,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:18.6969,x:145.45,y:-94.6,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.22,x:-21.05,y:91.7}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:-0.6042,x:44.95,y:-25.75,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.5962,x:14.7,y:93.05}},{t:this.instance_9,p:{rotation:-7.3294,x:50.8,y:181.95,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0569,x:-4.6,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.397,y:188.25,x:-22.85}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,rotation:-3.5038,x:0.9,y:-78.95,scaleX:0.9989,scaleY:0.9989,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:147.1984,x:11.25,y:-61.7,regX:40.2,regY:-0.2}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-116.6164,x:78.65,y:-105.9,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-118.2906,x:81.1,y:-97.05,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:150.7169,x:-56.85,y:-22.9,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:-75.1415,x:120.6,y:-27.4,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:49.1364,x:140.9,y:-105.05,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:18.731,x:145.5,y:-94.6,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.2077,x:-21.05,y:91.7}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:-0.5981,x:44.95,y:-25.7,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.6033,x:14.7,y:93.05}},{t:this.instance_9,p:{rotation:-7.3497,x:50.85,y:181.95,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0525,x:-4.6,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.4108,y:188.25,x:-22.8}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,rotation:-3.4924,x:0.9,y:-78.95,scaleX:0.999,scaleY:0.999,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:147.2072,x:11.25,y:-61.7,regX:40.2,regY:-0.2}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-116.5956,x:78.7,y:-105.85,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-118.2776,x:81.1,y:-97.05,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:150.7129,x:-56.85,y:-22.9,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:-75.1254,x:120.6,y:-27.4,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:49.1637,x:140.9,y:-105.05,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:18.7662,x:145.55,y:-94.6,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.1946,x:-21.05,y:91.7}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:-0.5929,x:45,y:-25.7,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.61,x:14.7,y:93.05}},{t:this.instance_9,p:{rotation:-7.3684,x:50.8,y:181.9,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.048,x:-4.6,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.4247,y:188.25,x:-22.85}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,rotation:-3.481,x:0.9,y:-78.95,scaleX:0.9989,scaleY:0.9989,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:147.2162,x:11.25,y:-61.75,regX:40.2,regY:-0.2}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-116.5752,x:78.7,y:-105.85,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-118.2639,x:81.1,y:-97.05,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:150.7078,x:-56.85,y:-22.9,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:-75.109,x:120.6,y:-27.4,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:49.1915,x:141,y:-105.05,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:18.8013,x:145.55,y:-94.6,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-1.1823,x:-21.1,y:91.7}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:-0.5876,x:45,y:-25.65,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.6158,x:14.7,y:93.05}},{t:this.instance_9,p:{rotation:-7.3878,x:50.85,y:181.95,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0444,x:-4.6,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.4388,y:188.25,x:-22.85}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,rotation:-3.4705,x:0.95,y:-78.95,scaleX:0.9989,scaleY:0.9989,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:147.2249,x:11.25,y:-61.75,regX:40.2,regY:-0.2}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-116.5537,x:78.8,y:-105.9,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-118.251,x:81.1,y:-97,regY:-1.4}},{t:this.instance,p:{regY:0.2,rotation:150.7027,x:-56.9,y:-23,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:-75.0927,x:120.75,y:-27.35,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:49.2183,x:141.05,y:-105,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:18.836,x:145.55,y:-94.55,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-1.1692,x:-21.1,y:91.7}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:-0.5806,x:45,y:-25.7,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.6225,x:14.75,y:93.05}},{t:this.instance_9,p:{rotation:-7.4073,x:50.9,y:181.9,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0399,x:-4.6,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.4518,y:188.25,x:-22.85}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,rotation:-3.4591,x:0.9,y:-78.95,scaleX:0.9989,scaleY:0.9989,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:147.2332,x:11.2,y:-61.85,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-116.5333,x:78.8,y:-105.8,regY:-8.7,regX:5.1}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-118.2373,x:81.1,y:-97,regY:-1.4}},{t:this.instance,p:{regY:0.2,rotation:150.6984,x:-56.9,y:-23,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:-75.0763,x:120.7,y:-27.3,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:49.2469,x:141.05,y:-105,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:18.8709,x:145.6,y:-94.5,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-1.1569,x:-21.05,y:91.7}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:-0.5753,x:45,y:-25.7,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.6292,x:14.7,y:93.05}},{t:this.instance_9,p:{rotation:-7.4266,x:50.85,y:181.95,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0361,x:-4.55,y:-58.1}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.4657,y:188.25,x:-22.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,rotation:-3.4477,x:0.95,y:-78.95,scaleX:0.9989,scaleY:0.9989,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:147.2434,x:11.15,y:-61.8,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-116.5126,x:78.8,y:-105.75,regY:-8.7,regX:5.1}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-118.2251,x:81.1,y:-97,regY:-1.4}},{t:this.instance,p:{regY:0.2,rotation:150.693,x:-56.9,y:-23,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:-75.0591,x:120.6,y:-27.4,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:49.2729,x:141.05,y:-104.95,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:18.906,x:145.6,y:-94.5,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.1438,x:-21.05,y:91.65}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:-0.571,x:45,y:-25.7,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.6374,x:14.7,y:93.05}},{t:this.instance_9,p:{rotation:-7.4461,x:50.95,y:181.95,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0319,x:-4.55,y:-58.1}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.479,y:188.15,x:-22.95}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,rotation:-3.4363,x:0.9,y:-78.9,scaleX:0.999,scaleY:0.999,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:147.2504,x:11.2,y:-61.8,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-116.4918,x:78.75,y:-105.9,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-118.2114,x:81.15,y:-97,regY:-1.4}},{t:this.instance,p:{regY:0.2,rotation:150.6878,x:-56.9,y:-23,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:-69.5103,x:120.3,y:-18.8,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:49.2729,x:148.2,y:-94.05,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:21.1725,x:152.75,y:-83.6,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.1438,x:-21.05,y:91.65}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:5.9356,x:45,y:-25.7,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.6374,x:14.75,y:93.1}},{t:this.instance_9,p:{rotation:-7.4461,x:50.95,y:181.95,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0319,x:-4.55,y:-58.1}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.479,y:188.15,x:-22.95}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,rotation:-3.4363,x:0.9,y:-78.9,scaleX:0.999,scaleY:0.999,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:150.2282,x:14.45,y:-55.35,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-116.1452,x:84.2,y:-95.7,regY:-8.7,regX:5.1}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-118.8542,x:86.6,y:-87,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:155.9578,x:-56.85,y:-22.95,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:-63.9629,x:119.05,y:-10.3,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:49.2729,x:154.05,y:-82.5,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:23.438,x:158.7,y:-72.15,regX:-4.8,regY:2.7,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.1438,x:-21.05,y:91.65}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:12.4476,x:45,y:-25.7,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.6374,x:14.75,y:93.1}},{t:this.instance_9,p:{rotation:-7.4461,x:50.95,y:181.95,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0319,x:-4.55,y:-58.1}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.479,y:188.15,x:-22.95}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,rotation:-3.4363,x:0.85,y:-78.9,scaleX:0.999,scaleY:0.999,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:153.2058,x:17.2,y:-48.5,regX:40.2,regY:-0.2}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-115.7985,x:88.9,y:-85.45,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-119.4966,x:91.3,y:-76.65,regY:-1.3}},{t:this.instance,p:{regY:0.1,rotation:161.2283,x:-56.9,y:-22.9,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:-58.4162,x:116.85,y:-2,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:49.2729,x:158.7,y:-70.45,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:25.7033,x:163.2,y:-60.1,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.1438,x:-21.05,y:91.65}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:18.9575,x:44.95,y:-25.75,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.6374,x:14.75,y:93.1}},{t:this.instance_9,p:{rotation:-7.4461,x:50.95,y:181.95,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0319,x:-4.55,y:-58.1}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.479,y:188.15,x:-22.95}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,rotation:-3.4363,x:0.85,y:-78.9,scaleX:0.999,scaleY:0.999,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:156.1829,x:19.1,y:-41.7,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-115.4515,x:92.7,y:-74.75,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-120.139,x:95.05,y:-65.85,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:166.4973,x:-56.85,y:-22.9,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:-52.8688,x:113.75,y:5.9,regY:-1.1,regX:-40.3}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:49.2729,x:161.95,y:-58.1,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:27.9697,x:166.45,y:-47.7,regX:-4.8,regY:2.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.1438,x:-21.05,y:91.65}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:25.4692,x:45,y:-25.8,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.6374,x:14.75,y:93.1}},{t:this.instance_9,p:{rotation:-7.4461,x:50.95,y:181.95,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0319,x:-4.55,y:-58.1}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.479,y:188.15,x:-22.95}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,rotation:-3.4363,x:0.85,y:-78.9,scaleX:0.999,scaleY:0.999,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:159.1607,x:20.5,y:-34.5,regX:40.2,regY:-0.2}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-115.1048,x:95.75,y:-63.8,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-120.7821,x:98,y:-54.95,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:171.7666,x:-56.9,y:-22.85,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:-47.3204,x:109.7,y:13.45,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:49.2729,x:163.9,y:-45.55,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:30.2362,x:168.45,y:-35.2,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.1438,x:-21.05,y:91.65}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:31.9807,x:45,y:-25.75,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.6374,x:14.75,y:93.1}},{t:this.instance_9,p:{rotation:-7.4461,x:50.95,y:181.95,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0319,x:-4.55,y:-58.1}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.479,y:188.15,x:-22.95}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,rotation:-3.4363,x:0.85,y:-78.9,scaleX:0.999,scaleY:0.999,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:162.1375,x:21.25,y:-27.45,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-114.758,x:97.9,y:-52.6,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-121.4259,x:100.1,y:-43.7,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:177.0354,x:-56.95,y:-22.85,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:-41.7738,x:104.8,y:20.6,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:49.2729,x:164.55,y:-32.95,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:32.5003,x:169.1,y:-22.55,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.1438,x:-21.05,y:91.65}},{t:this.instance_11,p:{regX:-33.6,regY:-0.1,rotation:38.4923,x:44.95,y:-25.75,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.6374,x:14.75,y:93.1}},{t:this.instance_9,p:{rotation:-7.4461,x:50.95,y:181.95,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0319,x:-4.55,y:-58.1}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.479,y:188.15,x:-22.95}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,rotation:-3.4363,x:0.85,y:-78.9,scaleX:0.999,scaleY:0.999,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:165.115,x:21.3,y:-20.3,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-114.4104,x:99.2,y:-41.4,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-122.0682,x:101.3,y:-32.45,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-177.7016,x:-57,y:-22.85,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:-36.2262,x:99.2,y:26.95,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:49.2729,x:163.8,y:-20.45,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:34.7667,x:168.35,y:-10.05,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.1438,x:-21.05,y:91.65}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:45.0031,x:45.05,y:-25.75,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.6374,x:14.75,y:93.1}},{t:this.instance_9,p:{rotation:-7.4461,x:50.95,y:181.95,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0319,x:-4.55,y:-58.1}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.479,y:188.15,x:-22.95}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,rotation:-3.4363,x:0.8,y:-78.9,scaleX:0.999,scaleY:0.999,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:168.0924,x:20.85,y:-12.95,regX:40.1,regY:-0.2}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-114.0635,x:99.6,y:-30.15,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-122.7112,x:101.7,y:-21.2,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-172.4304,x:-57.15,y:-22.9,regX:35.7,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:-30.6785,x:92.85,y:32.75,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:49.2729,x:161.8,y:-8.2,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:37.0333,x:166.3,y:2.1,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.1438,x:-21.05,y:91.65}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:51.5151,x:45.1,y:-25.8,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.6374,x:14.8,y:93.1}},{t:this.instance_9,p:{rotation:-7.4461,x:50.95,y:181.95,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0319,x:-4.55,y:-58.1}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.479,y:188.15,x:-23}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,rotation:-3.4363,x:0.8,y:-78.9,scaleX:0.999,scaleY:0.999,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:171.0711,x:19.35,y:-5.9,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-113.7169,x:99.1,y:-18.9,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-123.3531,x:101.2,y:-9.95,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-167.1611,x:-57.05,y:-22.85,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:-25.1314,x:86,y:37.85,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:49.2729,x:158.5,y:3.6,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:39.2994,x:163.05,y:14,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.1438,x:-21.05,y:91.65}},{t:this.instance_11,p:{regX:-33.6,regY:-0.1,rotation:58.0249,x:45,y:-25.75,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.6374,x:14.8,y:93.15}},{t:this.instance_9,p:{rotation:-7.4461,x:51,y:181.95,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0319,x:-4.6,y:-58.1}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.479,y:188.15,x:-23}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,rotation:-3.4363,x:0.8,y:-78.9,scaleX:0.999,scaleY:0.999,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:174.0477,x:17.5,y:1.05,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-113.3698,x:97.9,y:-7.65,regY:-8.7,regX:5.1}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-123.9967,x:99.85,y:1.15,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-161.8921,x:-57.05,y:-22.85,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:-19.5832,x:78.45,y:42,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:49.2729,x:154,y:15,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:41.5653,x:158.55,y:25.4,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.1438,x:-21.05,y:91.65}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:64.537,x:45.1,y:-25.9,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.6374,x:14.8,y:93.15}},{t:this.instance_9,p:{rotation:-7.4461,x:51,y:181.95,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0319,x:-4.6,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.479,y:188.15,x:-23}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,rotation:-3.4363,x:0.8,y:-78.9,scaleX:0.999,scaleY:0.999,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:177.0248,x:14.95,y:7.75,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-113.0241,x:95.6,y:3.05,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-124.6391,x:97.55,y:12.05,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-156.6228,x:-57.1,y:-22.85,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:-14.0365,x:70.55,y:45.35,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:49.2729,x:148.4,y:25.8,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:43.8314,x:152.9,y:36.2,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.1438,x:-21.05,y:91.65}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:71.0475,x:45.1,y:-25.85,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.6374,x:14.8,y:93.15}},{t:this.instance_9,p:{rotation:-7.4461,x:51,y:181.95,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0319,x:-4.6,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.479,y:188.15,x:-23}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,rotation:-3.4363,x:0.8,y:-78.9,scaleX:0.999,scaleY:0.999,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:180,x:11.75,y:14.25,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-112.6756,x:92.65,y:13.8,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-125.2826,x:94.5,y:22.8,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-151.3542,x:-57.2,y:-22.9,regX:35.7,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:-8.488,x:62.3,y:47.75,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:49.2729,x:141.7,y:35.85,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:46.0974,x:146.25,y:46.25,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.1438,x:-21.05,y:91.65}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:77.5594,x:45.1,y:-25.8,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.6374,x:14.8,y:93.15}},{t:this.instance_9,p:{rotation:-7.4461,x:51,y:181.95,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0319,x:-4.6,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.479,y:188.15,x:-23}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,rotation:-3.4363,x:0.8,y:-78.95,scaleX:0.999,scaleY:0.999,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-177.0248,x:8.05,y:20.4,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-112.3293,x:88.8,y:24.2,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-125.9241,x:90.7,y:33.2,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-146.0836,x:-57.1,y:-22.9,regX:35.6,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:-2.9403,x:53.85,y:49.25,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:49.2729,x:134.05,y:45.05,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:48.3628,x:138.5,y:55.4,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.1438,x:-21.05,y:91.65}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:84.0706,x:45.1,y:-25.8,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.6374,x:14.8,y:93.15}},{t:this.instance_9,p:{rotation:-7.4461,x:51,y:181.95,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0319,x:-4.6,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.479,y:188.15,x:-23}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,rotation:-3.4363,x:0.75,y:-78.95,scaleX:0.999,scaleY:0.999,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-174.0467,x:3.95,y:26.25,regX:40.1,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-111.9836,x:84.3,y:34.35,regY:-8.7,regX:5.1}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-126.5666,x:86.05,y:43.25,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-140.8152,x:-57.2,y:-22.85,regX:35.6,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:2.6027,x:45.3,y:49.8,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:49.2729,x:125.5,y:53.35,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:50.6289,x:130.1,y:63.75,regX:-4.7,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.1438,x:-21.05,y:91.65}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:90.5771,x:45.1,y:-25.85,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.6374,x:14.85,y:93.15}},{t:this.instance_9,p:{rotation:-7.4461,x:51,y:181.95,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0319,x:-4.6,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.479,y:188.15,x:-23}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,rotation:-3.4363,x:0.75,y:-78.95,scaleX:0.999,scaleY:0.999,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-171.0693,x:-1.05,y:31.65,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-111.6354,x:78.95,y:43.8,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-127.211,x:80.7,y:52.8,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-135.5455,x:-57.2,y:-22.95,regX:35.6,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:8.1509,x:36.85,y:49.35,regY:-1.1,regX:-40.3}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:49.2729,x:116.25,y:60.65,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:52.8959,x:120.7,y:71.05,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.1438,x:-21.05,y:91.65}},{t:this.instance_11,p:{regX:-33.7,regY:-0.2,rotation:97.0894,x:45.1,y:-25.95,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.6374,x:14.85,y:93.15}},{t:this.instance_9,p:{rotation:-7.4461,x:51,y:181.95,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0319,x:-4.6,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.479,y:188.15,x:-23}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,rotation:-3.4363,x:0.75,y:-78.95,scaleX:0.999,scaleY:0.999,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-168.0926,x:-6.3,y:36.55,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-111.289,x:72.9,y:52.85,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-127.8539,x:74.65,y:61.85,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-130.2756,x:-57.25,y:-22.9,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:13.6981,x:28.25,y:47.9,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:49.2729,x:106.3,y:66.85,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:55.1609,x:110.95,y:77.1,regX:-4.8,regY:2.7,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.1438,x:-21.05,y:91.65}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:103.5989,x:45.1,y:-25.8,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.6374,x:14.85,y:93.15}},{t:this.instance_9,p:{rotation:-7.4461,x:51,y:181.95,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0319,x:-4.6,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.479,y:188.15,x:-23}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,rotation:-3.4363,x:0.75,y:-78.95,scaleX:0.999,scaleY:0.999,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-165.1144,x:-12.05,y:41.05,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-110.9432,x:66.25,y:61.45,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-128.4965,x:67.85,y:70.4,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-125.0061,x:-57.3,y:-22.95,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:19.2453,x:20,y:45.55,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:49.2729,x:95.9,y:71.95,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:57.4268,x:100.35,y:82.25,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.1438,x:-21.05,y:91.65}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:110.1111,x:45.15,y:-25.85,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.6374,x:14.85,y:93.15}},{t:this.instance_9,p:{rotation:-7.4461,x:51,y:181.95,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0319,x:-4.6,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.479,y:188.15,x:-23.05}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,rotation:-3.4363,x:0.75,y:-78.95,scaleX:0.999,scaleY:0.999,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-162.1366,x:-18.1,y:44.9,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-110.5959,x:58.95,y:69.35,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-129.1388,x:60.55,y:78.4,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-119.7361,x:-57.3,y:-22.95,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:24.7926,x:12.1,y:42.2,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:49.2729,x:85.05,y:75.85,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:59.6931,x:89.6,y:86.15,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.1438,x:-21,y:91.65}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:116.6226,x:45.15,y:-25.85,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.6374,x:14.85,y:93.15}},{t:this.instance_9,p:{rotation:-7.4461,x:51,y:181.95,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0319,x:-4.6,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.479,y:188.15,x:-23.05}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,rotation:-3.4363,x:0.7,y:-78.95,scaleX:0.999,scaleY:0.999,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-159.1604,x:-24.55,y:48.2,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-110.2481,x:51.1,y:76.75,regY:-8.8,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-129.7817,x:52.75,y:85.7,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-114.4671,x:-57.3,y:-22.95,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:30.3398,x:4.7,y:38.1,regY:-1.1,regX:-40.3}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:49.2729,x:74,y:78.6,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:61.9586,x:78.55,y:88.85,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.1438,x:-21,y:91.65}},{t:this.instance_11,p:{regX:-33.6,regY:-0.1,rotation:123.1334,x:45.05,y:-25.85,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.6374,x:14.85,y:93.15}},{t:this.instance_9,p:{rotation:-7.4461,x:51.05,y:181.95,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0319,x:-4.6,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.479,y:188.15,x:-23.05}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,rotation:-3.4363,x:0.7,y:-78.95,scaleX:0.999,scaleY:0.999,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-156.1829,x:-31.15,y:51,regX:40.1,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-109.9015,x:42.95,y:83.25,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6.1,scaleX:0.998,scaleY:0.998,rotation:-130.4238,x:44.35,y:92.25,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-109.1982,x:-57.35,y:-23,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:35.8883,x:-2.35,y:33.1,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:49.2729,x:62.8,y:80.05,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:64.2242,x:67.3,y:90.5,regX:-4.7,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.1438,x:-21,y:91.65}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:129.6447,x:45.05,y:-25.75,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.6374,x:14.85,y:93.15}},{t:this.instance_9,p:{rotation:-7.4461,x:51.05,y:181.95,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0319,x:-4.65,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.479,y:188.15,x:-23.05}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,rotation:-3.4363,x:0.7,y:-78.95,scaleX:0.999,scaleY:0.999,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-153.2047,x:-38,y:53.05,regX:40.1,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-109.555,x:34.2,y:89.15,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-131.0667,x:35.7,y:98.25,regY:-1.4}},{t:this.instance,p:{regY:0.2,rotation:-103.9296,x:-57.25,y:-23,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:41.4345,x:-8.7,y:27.25,regY:-1.1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:49.2729,x:51.55,y:80.4,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:66.4909,x:56.15,y:90.7,regX:-4.8,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.1438,x:-21,y:91.65}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:136.1562,x:45.15,y:-25.75,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.6374,x:14.9,y:93.15}},{t:this.instance_9,p:{rotation:-7.4461,x:51.05,y:181.95,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0319,x:-4.65,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.479,y:188.15,x:-23.05}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,rotation:-3.4363,x:0.7,y:-78.95,scaleX:0.999,scaleY:0.999,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-150.227,x:-45.2,y:54.45,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-109.2079,x:25.15,y:94.4,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-131.7104,x:26.55,y:103.45,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-98.6601,x:-57.4,y:-23,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:46.9826,x:-14.4,y:20.9,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:49.2729,x:40.5,y:79.55,regX:-6.4,regY:8}},{t:this.instance_13,p:{rotation:68.7554,x:45.1,y:90.05,regX:-4.7,regY:2.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.1438,x:-21,y:91.65}},{t:this.instance_11,p:{regX:-33.6,regY:-0.2,rotation:142.6665,x:45.15,y:-25.75,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.6374,x:14.9,y:93.15}},{t:this.instance_9,p:{rotation:-7.4461,x:51.05,y:181.95,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{rotation:12.0319,x:-4.65,y:-58.15}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.479,y:188.15,x:-23.05}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,rotation:-3.4363,x:0.7,y:-78.95,scaleX:0.999,scaleY:0.999,regX:1.1}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-147.2509,x:-52.35,y:55.25,regX:40.2,regY:-0.2}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-108.8617,x:15.8,y:98.75,regY:-8.7,regX:5.2}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-132.3535,x:17.15,y:107.75,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-93.3909,x:-57.35,y:-23.1,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-93.2,-205.9,354,505.1);


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
	this.instance.setTransform(-57.25,-23,0.9984,0.9984,-93.503,0,0,35.6,0.2);

	this.instance_1 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_1.setTransform(17.35,107.65,0.9982,0.9982,-132.7599,0,0,6.1,-1.4);

	this.instance_2 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_2.setTransform(16.1,98.7,0.9984,0.9984,-109.1267,0,0,5.2,-8.7);

	this.instance_3 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_3.setTransform(-52.25,55.25,0.9984,0.9984,-147.3198,0,0,40.2,-0.1);

	this.instance_4 = new lib.ch1_headcopy("synched",0);
	this.instance_4.setTransform(0.65,-78.95,0.999,0.999,-3.6465,0,0,1.1,52.8);

	this.instance_5 = new lib.ch1_uBodycopy("synched",0);
	this.instance_5.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_6 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_6.setTransform(-22.65,188.2,0.9982,0.9982,19.236,0,0,3.1,-54.6);

	this.instance_7 = new lib.ch1_neckcopy("synched",0);
	this.instance_7.setTransform(-4.65,-58.25,0.999,0.999,12.1097,0,0,-0.6,8.7);

	this.instance_8 = new lib.ch1_lBodycopy("synched",0);
	this.instance_8.setTransform(-5.6,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_9 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_9.setTransform(50.8,182.1,0.9978,0.9978,-7.1011,0,0,3.9,-53.9);

	this.instance_10 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_10.setTransform(14.9,93.2,0.9978,0.9978,-24.5215,0,0,-0.7,1.6);

	this.instance_11 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_11.setTransform(45.1,-25.85,0.9984,0.9984,142.5459,0,0,-33.6,-0.1);

	this.instance_12 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_12.setTransform(-21.05,91.8,0.9984,0.9984,-1.3785,0,0,2.6,-45.8);

	this.instance_13 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_13.setTransform(45.45,89.8,0.9983,0.9983,68.5746,0,0,-4.8,2.8);

	this.instance_14 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_14.setTransform(40.85,79.5,0.9984,0.9984,48.9765,0,0,-6.4,8);

	this.instance_15 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_15.setTransform(-14.15,20.95,0.9984,0.9984,46.7575,0,0,-40.4,-1.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9984,scaleY:0.9984,rotation:46.7575,x:-14.15,y:20.95,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9984,scaleY:0.9984,rotation:48.9765,x:40.85,y:79.5}},{t:this.instance_13,p:{rotation:68.5746,x:45.45,y:89.8,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-1.3785,x:-21.05,y:91.8,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.1,rotation:142.5459,x:45.1,y:-25.85,regX:-33.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9978,scaleY:0.9978,rotation:-24.5215,x:14.9,y:93.2,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:-7.1011,x:50.8,y:182.1,regX:3.9,regY:-53.9,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.1097,x:-4.65,y:-58.25,regY:8.7}},{t:this.instance_6,p:{regY:-54.6,scaleX:0.9982,scaleY:0.9982,rotation:19.236,x:-22.65,y:188.2,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-3.6465,x:0.65,regY:52.8,scaleX:0.999,scaleY:0.999,y:-78.95,regX:1.1}},{t:this.instance_3,p:{rotation:-147.3198,x:-52.25,scaleX:0.9984,scaleY:0.9984,y:55.25,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-109.1267,x:16.1,y:98.7,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9982,scaleY:0.9982,rotation:-132.7599,x:17.35,y:107.65,regY:-1.4}},{t:this.instance,p:{regY:0.2,rotation:-93.503,x:-57.25,y:-23,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]}).to({state:[{t:this.instance_15,p:{regY:-1,scaleX:0.9983,scaleY:0.9983,rotation:47.5732,x:-12.5,y:23.2,regX:-40.4}},{t:this.instance_14,p:{regX:-6.3,regY:7.9,scaleX:0.9983,scaleY:0.9983,rotation:48.2589,x:41.9,y:82.35}},{t:this.instance_13,p:{rotation:66.9637,x:46.5,y:92.7,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-2.3871,x:-20.65,y:91.85,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:140.4293,x:45.15,y:-25.7,regX:-33.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-23.7466,x:14.8,y:93.25,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:-6.0908,x:49.4,y:182.6,regX:3.9,regY:-53.9,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:12.1179,x:-4.6,y:-58.2,regY:8.7}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:17.2679,x:-20.6,y:188.35,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-3.2487,x:0.8,regY:52.8,scaleX:0.999,scaleY:0.999,y:-78.95,regX:1.1}},{t:this.instance_3,p:{rotation:-146.2079,x:-53,scaleX:0.9984,scaleY:0.9984,y:55.25,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-107.7066,x:14.4,y:100.05,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-132.2494,x:15.6,y:109.05,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-92.9269,x:-57.35,y:-23.05,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:48.3893,x:-10.65,y:25.2,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:47.5403,x:42.85,y:85.2}},{t:this.instance_13,p:{rotation:65.3529,x:47.65,y:95.4,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-3.3964,x:-20.35,y:91.95,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:138.3121,x:45.15,y:-25.8,regX:-33.7,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-22.971,x:14.6,y:93.3,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:-5.08,x:48.25,y:183.15,regX:4,regY:-53.9,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.1276,x:-4.65,y:-58.1,regY:8.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:15.3006,x:-18.55,y:188.5,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-2.8499,x:0.75,regY:52.9,scaleX:0.9989,scaleY:0.9989,y:-78.8,regX:1.1}},{t:this.instance_3,p:{rotation:-145.0959,x:-53.75,scaleX:0.9983,scaleY:0.9983,y:55.3,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-106.2873,x:12.7,y:101.35,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-131.737,x:13.7,y:110.45,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-92.3527,x:-57.35,y:-23.05,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:49.2054,x:-8.65,y:27.2,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:46.8227,x:43.85,y:88}},{t:this.instance_13,p:{rotation:63.7428,x:48.8,y:98.15,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-4.4076,x:-20,y:92.05,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:136.1952,x:45.1,y:-25.7,regX:-33.6,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-22.1955,x:14.5,y:93.4,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:-4.0691,x:46.9,y:183.55,regX:4,regY:-53.9,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:12.1376,x:-4.65,y:-58.1,regY:8.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:13.3331,x:-16.55,y:188.45,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-2.4522,x:0.75,regY:52.8,scaleX:0.9989,scaleY:0.9989,y:-78.9,regX:1.1}},{t:this.instance_3,p:{rotation:-143.984,x:-54.55,scaleX:0.9983,scaleY:0.9983,y:55.3,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-104.8681,x:11.05,y:102.75,regX:5.1,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-131.2251,x:11.8,y:111.75,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-91.7779,x:-57.3,y:-23.1,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1,scaleX:0.9983,scaleY:0.9983,rotation:50.0212,x:-6.75,y:29.25,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:46.1041,x:44.9,y:90.7}},{t:this.instance_13,p:{rotation:62.131,x:50.05,y:100.75,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-5.4167,x:-19.75,y:92.15,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:134.0792,x:45.15,y:-25.7,regX:-33.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-21.4202,x:14.4,y:93.55,regY:1.7,regX:-0.7}},{t:this.instance_9,p:{rotation:-3.0594,x:45.6,y:184.1,regX:4,regY:-53.9,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.1472,x:-4.65,y:-58.1,regY:8.8}},{t:this.instance_6,p:{regY:-54.6,scaleX:0.9981,scaleY:0.9981,rotation:11.3659,x:-14.5,y:188.45,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-2.0537,x:0.8,regY:52.8,scaleX:0.9989,scaleY:0.9989,y:-78.9,regX:1.1}},{t:this.instance_3,p:{rotation:-142.8714,x:-55.4,scaleX:0.9984,scaleY:0.9984,y:55.3,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-103.4491,x:9.3,y:103.95,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-130.7134,x:9.9,y:113.05,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-91.2033,x:-57.35,y:-23.1,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:50.8378,x:-4.6,y:31.05,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:45.3864,x:46.05,y:93.25}},{t:this.instance_13,p:{rotation:60.5209,x:51.4,y:103.35,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-6.4267,x:-19.45,y:92.25,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:131.9632,x:45.15,y:-25.65,regX:-33.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-20.6449,x:14.3,y:93.45,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:-2.0482,x:44.3,y:184.45,regX:4,regY:-53.9,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.1563,x:-4.6,y:-58.1,regY:8.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:9.3987,x:-12.45,y:188.6,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-1.6569,x:0.95,regY:52.8,scaleX:0.999,scaleY:0.999,y:-78.95,regX:1.2}},{t:this.instance_3,p:{rotation:-141.759,x:-56.15,scaleX:0.9983,scaleY:0.9983,y:55.35,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-102.0294,x:7.5,y:105.15,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-130.2014,x:7.9,y:114.35,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-90.6296,x:-57.35,y:-23.05,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:51.6539,x:-2.45,y:32.8,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:44.6681,x:47.35,y:95.8}},{t:this.instance_13,p:{rotation:58.9108,x:52.75,y:105.75,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-7.4376,x:-19.15,y:92.35,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:129.8467,x:45.1,y:-25.7,regX:-33.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-19.8694,x:14.2,y:93.5,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:-1.0384,x:42.9,y:185.1,regX:4,regY:-53.8,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.1669,x:-4.65,y:-58.1,regY:8.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:7.4292,x:-10.55,y:188.5,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-1.2586,x:0.75,regY:52.9,scaleX:0.999,scaleY:0.999,y:-78.75,regX:1.1}},{t:this.instance_3,p:{rotation:-140.6472,x:-56.9,scaleX:0.9983,scaleY:0.9983,y:55.35,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-100.6093,x:5.75,y:106.4,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-129.6885,x:5.9,y:115.6,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-90.056,x:-57.3,y:-23.05,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:52.4708,x:-0.35,y:34.6,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:7.9,scaleX:0.9983,scaleY:0.9983,rotation:43.9497,x:48.75,y:98.2}},{t:this.instance_13,p:{rotation:57.2988,x:54.2,y:108.15,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-8.4474,x:-18.85,y:92.4,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:127.7294,x:45.15,y:-25.85,regX:-33.6,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-19.0934,x:14.05,y:93.5,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:-0.028,x:41.4,y:185.3,regX:3.9,regY:-53.9,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.1769,x:-4.65,y:-58.1,regY:8.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:5.4626,x:-8.35,y:188.4,regX:3.2}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.8612,x:0.8,regY:52.9,scaleX:0.9989,scaleY:0.9989,y:-78.75,regX:1.1}},{t:this.instance_3,p:{rotation:-139.5343,x:-57.7,scaleX:0.9984,scaleY:0.9984,y:55.35,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-99.1903,x:4,y:107.7,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-129.1761,x:3.85,y:116.8,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-89.4851,x:-57.35,y:-23.1,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:53.286,x:2,y:36.25,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:43.2324,x:50.05,y:100.5}},{t:this.instance_13,p:{rotation:55.6893,x:55.65,y:110.45,regX:-4.7,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-9.4573,x:-18.5,y:92.5,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:125.613,x:45.1,y:-25.8,regX:-33.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-18.318,x:13.95,y:93.55,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:0.9788,x:40.1,y:185.8,regX:3.9,regY:-53.9,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.1867,x:-4.65,y:-58.1,regY:8.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:3.4944,x:-6.5,y:188.3,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.463,x:0.85,regY:52.8,scaleX:0.999,scaleY:0.999,y:-78.9,regX:1.1}},{t:this.instance_3,p:{rotation:-138.4226,x:-58.5,scaleX:0.9984,scaleY:0.9984,y:55.3,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-97.7735,x:2.15,y:108.75,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-128.6654,x:1.8,y:117.9,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-88.9115,x:-57.35,y:-23.1,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:54.1022,x:4.3,y:37.75,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:7.9,scaleX:0.9983,scaleY:0.9983,rotation:42.5142,x:51.45,y:102.7}},{t:this.instance_13,p:{rotation:54.0774,x:57.2,y:112.55,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-10.4676,x:-18.2,y:92.65,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:123.4965,x:45.1,y:-25.8,regX:-33.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-17.5421,x:14,y:93.6,regY:1.6,regX:-0.6}},{t:this.instance_9,p:{rotation:1.9894,x:38.7,y:186.1,regX:3.9,regY:-53.9,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:12.1949,x:-4.65,y:-58.1,regY:8.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:1.5269,x:-4.45,y:188.15,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.0648,x:0.8,regY:52.8,scaleX:0.9989,scaleY:0.9989,y:-78.85,regX:1.1}},{t:this.instance_3,p:{rotation:-137.3097,x:-59.25,scaleX:0.9983,scaleY:0.9983,y:55.3,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-96.3529,x:0.35,y:109.95,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-128.1535,x:-0.25,y:119.05,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-88.336,x:-57.25,y:-23.2,regX:35.7,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:54.919,x:6.65,y:39.2,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:41.7962,x:52.85,y:104.9}},{t:this.instance_13,p:{rotation:52.4666,x:58.75,y:114.6,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-11.4772,x:-17.95,y:92.75,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:121.3795,x:45.05,y:-25.8,regX:-33.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-16.7676,x:13.8,y:93.75,regY:1.7,regX:-0.7}},{t:this.instance_9,p:{rotation:2.9998,x:37.35,y:186.55,regX:3.9,regY:-53.9,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.2054,x:-4.6,y:-58.1,regY:8.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:-0.4371,x:-2.45,y:188.05,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:0.3282,x:0.8,regY:52.8,scaleX:0.999,scaleY:0.999,y:-78.85,regX:1.1}},{t:this.instance_3,p:{rotation:-136.197,x:-60,scaleX:0.9984,scaleY:0.9984,y:55.25,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-94.9332,x:-1.55,y:111.1,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9981,scaleY:0.9981,rotation:-127.6417,x:-2.35,y:120.05,regY:-1.3}},{t:this.instance,p:{regY:0.1,rotation:-87.7629,x:-57.3,y:-23.05,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:55.7355,x:9.1,y:40.65,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:41.0784,x:54.3,y:106.9}},{t:this.instance_13,p:{rotation:50.8555,x:60.4,y:116.55,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-12.487,x:-17.6,y:92.8,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.1,rotation:119.2624,x:45.05,y:-25.8,regX:-33.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-15.9923,x:13.65,y:93.8,regY:1.7,regX:-0.7}},{t:this.instance_9,p:{rotation:4.0094,x:35.95,y:186.8,regX:3.9,regY:-53.9,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:12.2155,x:-4.65,y:-58.1,regY:8.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:-2.4042,x:-0.45,y:187.8,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:0.7264,x:0.7,regY:52.8,scaleX:0.999,scaleY:0.999,y:-78.9,regX:1.1}},{t:this.instance_3,p:{rotation:-135.0848,x:-60.8,scaleX:0.9983,scaleY:0.9983,y:55.2,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-93.5131,x:-3.4,y:112.2,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-127.129,x:-4.45,y:121.3,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-87.1888,x:-57.3,y:-23.1,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:56.5504,x:11.5,y:41.95,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:40.3594,x:55.9,y:108.85}},{t:this.instance_13,p:{rotation:49.2447,x:61.95,y:118.4,regX:-4.8,scaleX:0.9982,scaleY:0.9982,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-13.4974,x:-17.3,y:92.9,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:117.1462,x:45.1,y:-25.75,regX:-33.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-15.2169,x:13.5,y:93.7,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:5.0211,x:34.65,y:187.35,regX:3.9,regY:-53.8,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:12.2245,x:-4.6,y:-58.1,regY:8.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:-4.3706,x:1.45,y:187.55,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:1.1238,x:0.75,regY:52.8,scaleX:0.999,scaleY:0.999,y:-78.85,regX:1.1}},{t:this.instance_3,p:{rotation:-133.9727,x:-61.55,scaleX:0.9984,scaleY:0.9984,y:55.15,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-92.0953,x:-5.45,y:113.2,regX:5.2,regY:-8.8}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-126.6174,x:-6.45,y:122.3,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-86.6135,x:-57.3,y:-23.25,regX:35.7,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:57.3668,x:14.1,y:43.2,regX:-40.3}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:39.6409,x:57.4,y:110.7}},{t:this.instance_13,p:{rotation:47.6335,x:63.6,y:120.15,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-14.5076,x:-17,y:93,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:115.0297,x:45.15,y:-25.75,regX:-33.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-14.4422,x:13.4,y:93.7,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:6.0309,x:33.2,y:187.45,regX:3.9,regY:-53.9,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.2341,x:-4.6,y:-58.15,regY:8.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:-6.3387,x:3.4,y:187.35,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:1.5221,x:0.75,regY:52.9,scaleX:0.9989,scaleY:0.9989,y:-78.8,regX:1.1}},{t:this.instance_3,p:{rotation:-132.8613,x:-62.35,scaleX:0.9983,scaleY:0.9983,y:55.15,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-90.6744,x:-7.25,y:114.25,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-126.1055,x:-8.7,y:123.25,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-86.0397,x:-57.3,y:-23.1,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:58.183,x:16.65,y:44.15,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:38.9227,x:59.05,y:112.45}},{t:this.instance_13,p:{rotation:46.0237,x:65.3,y:121.8,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-15.5183,x:-16.7,y:93.05,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:112.9123,x:45.05,y:-25.75,regX:-33.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-13.6658,x:13.3,y:93.8,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:7.0423,x:31.8,y:187.95,regX:3.9,regY:-53.8,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:12.2451,x:-4.55,y:-58.15,regY:8.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:-8.3064,x:5.35,y:187,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:1.9188,x:0.8,regY:52.8,scaleX:0.9989,scaleY:0.9989,y:-78.85,regX:1.1}},{t:this.instance_3,p:{rotation:-131.7486,x:-63.1,scaleX:0.9983,scaleY:0.9983,y:55.05,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-89.2608,x:-9.2,y:115.25,regX:5.2,regY:-8.8}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-125.5935,x:-10.8,y:124.25,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-85.4645,x:-57.3,y:-23.25,regX:35.7,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:59.0002,x:19.25,y:45.2,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:38.2048,x:60.6,y:114.05}},{t:this.instance_13,p:{rotation:44.4123,x:67.15,y:123.3,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-16.5287,x:-16.35,y:93.1,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:110.7961,x:45.15,y:-25.85,regX:-33.7,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-12.8908,x:13.15,y:93.85,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:8.0518,x:30.5,y:188.05,regX:3.9,regY:-53.9,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:12.254,x:-4.6,y:-58.1,regY:8.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:-10.2744,x:7.35,y:186.75,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:2.3173,x:0.7,regY:52.8,scaleX:0.999,scaleY:0.999,y:-78.85,regX:1.1}},{t:this.instance_3,p:{rotation:-130.6359,x:-63.95,scaleX:0.9983,scaleY:0.9983,y:55,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-87.8408,x:-11.05,y:116.25,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-125.0809,x:-12.9,y:125.1,regY:-1.3}},{t:this.instance,p:{regY:0.1,rotation:-84.8915,x:-57.3,y:-23.1,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:59.8153,x:21.85,y:46.1,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:37.4864,x:62.25,y:115.5}},{t:this.instance_13,p:{rotation:42.8011,x:68.85,y:124.75,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-17.5373,x:-16.05,y:93.3,regY:-45.7,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:108.6803,x:45.15,y:-25.85,regX:-33.7,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-12.1153,x:13.05,y:93.9,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:9.062,x:29.05,y:188.35,regX:3.9,regY:-53.9,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.2636,x:-4.6,y:-58.1,regY:8.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:-12.2429,x:9.35,y:186.35,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:2.7141,x:0.75,regY:52.8,scaleX:0.9989,scaleY:0.9989,y:-78.85,regX:1.1}},{t:this.instance_3,p:{rotation:-129.5239,x:-64.75,scaleX:0.9983,scaleY:0.9983,y:54.9,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-86.422,x:-13.1,y:117.2,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-124.5698,x:-15.2,y:126.05,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-84.3171,x:-57.35,y:-23.1,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:59.427,x:22.1,y:46.2,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:37.0978,x:62.9,y:115.25}},{t:this.instance_13,p:{rotation:42.4131,x:69.55,y:124.45,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-17.6218,x:-16.4,y:93.1,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:108.5186,x:45.1,y:-25.75,regX:-33.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-11.0195,x:12.85,y:93.9,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:10.7145,x:27,y:188.7,regX:3.9,regY:-53.9,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.2636,x:-4.6,y:-58.1,regY:8.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:-13.0868,x:9.2,y:186.2,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:2.7132,x:0.75,regY:52.8,scaleX:0.9989,scaleY:0.9989,y:-78.85,regX:1.1}},{t:this.instance_3,p:{rotation:-129.0685,x:-66.7,scaleX:0.9983,scaleY:0.9983,y:54.75,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-86.3719,x:-15.45,y:117.4,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-123.1823,x:-17.65,y:126.25,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-82.8656,x:-57.3,y:-23.1,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:59.0386,x:22.2,y:46.2,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:36.7098,x:63.6,y:115.05}},{t:this.instance_13,p:{rotation:42.025,x:70.4,y:124.3,regX:-4.7,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-17.7069,x:-16.65,y:93.15,regY:-45.7,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:108.358,x:45.15,y:-25.9,regX:-33.7,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-9.9243,x:12.7,y:93.9,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:12.3631,x:25.05,y:189,regX:3.9,regY:-53.9,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.2636,x:-4.6,y:-58.1,regY:8.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:-13.9336,x:9.1,y:186.05,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:2.7132,x:0.75,regY:52.8,scaleX:0.9989,scaleY:0.9989,y:-78.8,regX:1.1}},{t:this.instance_3,p:{rotation:-128.6137,x:-68.7,scaleX:0.9983,scaleY:0.9983,y:54.45,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-86.3246,x:-17.95,y:117.45,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6.1,scaleX:0.998,scaleY:0.998,rotation:-121.794,x:-20.2,y:126.3,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-81.4169,x:-57.3,y:-23.25,regX:35.7,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:58.6496,x:22.4,y:46.3,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:36.3199,x:64.2,y:114.85}},{t:this.instance_13,p:{rotation:41.636,x:71,y:123.95,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-17.7899,x:-16.95,y:92.95,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:108.1965,x:45.15,y:-25.75,regX:-33.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-8.8293,x:12.45,y:94.1,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:14.0146,x:23.05,y:189.25,regX:3.9,regY:-53.9,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.2636,x:-4.6,y:-58.1,regY:8.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:-14.7781,x:8.9,y:186,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:2.7132,x:0.75,regY:52.8,scaleX:0.9989,scaleY:0.9989,y:-78.8,regX:1.1}},{t:this.instance_3,p:{rotation:-128.158,x:-70.6,scaleX:0.9983,scaleY:0.9983,y:54.15,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-86.2762,x:-20.4,y:117.55,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-120.4067,x:-22.6,y:126.45,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-79.966,x:-57.3,y:-23.15,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:58.2612,x:22.7,y:46.35,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:35.932,x:64.9,y:114.6}},{t:this.instance_13,p:{rotation:41.2471,x:71.8,y:123.6,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.7}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-17.8736,x:-17.25,y:92.95,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:108.0359,x:45.1,y:-25.75,regX:-33.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-7.7339,x:12.3,y:94.25,regY:1.7,regX:-0.7}},{t:this.instance_9,p:{rotation:15.6652,x:21,y:189.5,regX:3.9,regY:-53.9,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.2636,x:-4.6,y:-58.1,regY:8.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:-15.6232,x:8.95,y:185.9,regX:3.2}},{t:this.instance_5},{t:this.instance_4,p:{rotation:2.7132,x:0.75,regY:52.8,scaleX:0.9989,scaleY:0.9989,y:-78.8,regX:1.1}},{t:this.instance_3,p:{rotation:-127.7031,x:-72.6,scaleX:0.9983,scaleY:0.9983,y:53.75,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-86.2279,x:-22.95,y:117.65,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9981,scaleY:0.9981,rotation:-119.0185,x:-25.05,y:126.45,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-78.5166,x:-57.3,y:-23.2,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:57.8726,x:22.9,y:46.5,regX:-40.3}},{t:this.instance_14,p:{regX:-6.4,regY:7.9,scaleX:0.9983,scaleY:0.9983,rotation:35.5434,x:65.65,y:114.35}},{t:this.instance_13,p:{rotation:40.859,x:72.45,y:123.35,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-17.9575,x:-17.6,y:92.9,regY:-45.8,regX:2.5}},{t:this.instance_11,p:{regY:-0.2,rotation:107.8764,x:45.1,y:-25.8,regX:-33.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-6.6395,x:12.15,y:94.25,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:17.3157,x:19.05,y:189.75,regX:3.9,regY:-53.9,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.2636,x:-4.6,y:-58.1,regY:8.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:-16.4701,x:8.65,y:185.8,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:2.7124,x:0.75,regY:52.8,scaleX:0.9989,scaleY:0.9989,y:-78.8,regX:1.1}},{t:this.instance_3,p:{rotation:-127.2479,x:-74.5,scaleX:0.9983,scaleY:0.9983,y:53.35,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-86.1797,x:-25.3,y:117.6,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6.1,scaleX:0.998,scaleY:0.998,rotation:-117.6315,x:-27.55,y:126.35,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-77.0668,x:-57.3,y:-23.2,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:57.4849,x:23.15,y:46.55,regX:-40.3}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:35.1553,x:66.25,y:114.15}},{t:this.instance_13,p:{rotation:40.4696,x:73.25,y:123.15,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-18.0425,x:-17.8,y:92.8,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:107.7146,x:45.1,y:-25.8,regX:-33.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-5.5433,x:11.85,y:94.3,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:18.9648,x:17.1,y:189.95,regX:3.9,regY:-53.9,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.2636,x:-4.6,y:-58.1,regY:8.8}},{t:this.instance_6,p:{regY:-54.6,scaleX:0.9981,scaleY:0.9981,rotation:-17.3147,x:8.5,y:185.6,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:2.7124,x:0.75,regY:52.8,scaleX:0.9989,scaleY:0.9989,y:-78.8,regX:1.1}},{t:this.instance_3,p:{rotation:-126.7925,x:-76.45,scaleX:0.9983,scaleY:0.9983,y:52.85,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-86.1314,x:-27.75,y:117.5,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-116.2438,x:-29.95,y:126.4,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-75.6148,x:-57.3,y:-23.2,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:57.0957,x:23.3,y:46.55,regX:-40.3}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:34.7668,x:66.85,y:113.9}},{t:this.instance_13,p:{rotation:40.0819,x:73.9,y:122.8,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-18.1262,x:-18.05,y:92.7,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:107.5537,x:45.1,y:-25.85,regX:-33.7,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-4.448,x:11.65,y:94.4,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:20.6156,x:15.05,y:190.1,regX:3.9,regY:-53.9,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.2636,x:-4.6,y:-58.1,regY:8.8}},{t:this.instance_6,p:{regY:-54.6,scaleX:0.9981,scaleY:0.9981,rotation:-18.1602,x:8.45,y:185.4,regX:3.2}},{t:this.instance_5},{t:this.instance_4,p:{rotation:2.7124,x:0.75,regY:52.8,scaleX:0.9989,scaleY:0.9989,y:-78.8,regX:1.1}},{t:this.instance_3,p:{rotation:-126.3364,x:-78.35,scaleX:0.9984,scaleY:0.9984,y:52.35,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-86.0822,x:-30.2,y:117.35,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9981,scaleY:0.9981,rotation:-114.8552,x:-32.4,y:126.15,regY:-1.3}},{t:this.instance,p:{regY:0.1,rotation:-74.1654,x:-57.3,y:-23.15,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:56.7071,x:23.4,y:46.6,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:34.3782,x:67.55,y:113.75}},{t:this.instance_13,p:{rotation:39.6933,x:74.7,y:122.45,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.7}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-18.2115,x:-18.35,y:92.6,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:107.3939,x:45.05,y:-25.8,regX:-33.6,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-3.3528,x:11.5,y:94.45,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:22.2653,x:13.1,y:190.2,regX:3.9,regY:-53.9,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.2636,x:-4.6,y:-58.1,regY:8.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:-19.005,x:8.25,y:185.4,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:2.7124,x:0.75,regY:52.8,scaleX:0.9989,scaleY:0.9989,y:-78.8,regX:1.1}},{t:this.instance_3,p:{rotation:-125.8819,x:-80.15,scaleX:0.9983,scaleY:0.9983,y:51.85,regX:40.1,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-86.034,x:-32.6,y:117.25,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-113.4672,x:-34.85,y:126,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-72.7155,x:-57.3,y:-23.15,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1,scaleX:0.9983,scaleY:0.9983,rotation:56.3192,x:23.6,y:46.7,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:33.9898,x:68.15,y:113.4}},{t:this.instance_13,p:{rotation:39.3057,x:75.35,y:122.2,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-18.2945,x:-18.75,y:92.55,regY:-45.8,regX:2.5}},{t:this.instance_11,p:{regY:-0.2,rotation:107.2322,x:45.1,y:-25.8,regX:-33.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-2.257,x:11.25,y:94.65,regY:1.7,regX:-0.7}},{t:this.instance_9,p:{rotation:23.9167,x:11.05,y:190.45,regX:4,regY:-53.8,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:12.2621,x:-4.6,y:-58.1,regY:8.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:-19.8505,x:8.05,y:185.35,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:2.7115,x:0.75,regY:52.8,scaleX:0.9989,scaleY:0.9989,y:-78.8,regX:1.1}},{t:this.instance_3,p:{rotation:-125.4257,x:-82.1,scaleX:0.9984,scaleY:0.9984,y:51.25,regX:40.1,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-85.9858,x:-35.05,y:117,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-112.0801,x:-37.25,y:125.85,regY:-1.4}},{t:this.instance,p:{regY:0.2,rotation:-71.266,x:-57.25,y:-23.15,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:55.9303,x:23.75,y:46.7,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:33.6004,x:68.85,y:113.2}},{t:this.instance_13,p:{rotation:38.9172,x:76.1,y:121.95,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-18.3779,x:-18.9,y:92.45,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:107.0712,x:45.1,y:-25.75,regX:-33.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-1.162,x:11.1,y:94.6,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:25.5665,x:8.9,y:190.45,regX:3.9,regY:-53.8,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:12.2621,x:-4.6,y:-58.1,regY:8.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:-20.6961,x:8.1,y:185.15,regX:3.2}},{t:this.instance_5},{t:this.instance_4,p:{rotation:2.7115,x:0.75,regY:52.8,scaleX:0.9989,scaleY:0.9989,y:-78.8,regX:1.1}},{t:this.instance_3,p:{rotation:-124.9714,x:-84.05,scaleX:0.9983,scaleY:0.9983,y:50.55,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-85.9375,x:-37.45,y:116.7,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-110.6915,x:-39.65,y:125.55,regY:-1.4}},{t:this.instance,p:{regY:0.2,rotation:-69.8155,x:-57.2,y:-23.15,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:55.5421,x:24,y:46.75,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:33.2128,x:69.5,y:112.95}},{t:this.instance_13,p:{rotation:38.5285,x:76.75,y:121.65,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-18.4618,x:-19.1,y:92.5,regY:-45.7,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:106.9117,x:45.05,y:-25.85,regX:-33.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.0666,x:10.85,y:94.65,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:27.2167,x:6.9,y:190.4,regX:3.9,regY:-53.9,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:12.2621,x:-4.6,y:-58.1,regY:8.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:-21.5413,x:7.9,y:185.05,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:2.7115,x:0.75,regY:52.8,scaleX:0.9989,scaleY:0.9989,y:-78.8,regX:1.1}},{t:this.instance_3,p:{rotation:-124.5159,x:-85.8,scaleX:0.9983,scaleY:0.9983,y:49.9,regX:40.1,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-85.89,x:-39.9,y:116.35,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-109.3034,x:-42.05,y:125.2,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-68.3645,x:-57.3,y:-23.2,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:55.1537,x:24.25,y:46.85,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:32.8244,x:70.1,y:112.7}},{t:this.instance_13,p:{rotation:38.1395,x:77.5,y:121.35,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-18.5468,x:-19.5,y:92.3,regY:-45.8,regX:2.5}},{t:this.instance_11,p:{regY:-0.2,rotation:106.7499,x:45.05,y:-25.8,regX:-33.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:1.0244,x:10.65,y:94.75,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:28.8675,x:4.9,y:190.35,regX:3.9,regY:-53.9,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:12.2621,x:-4.6,y:-58.1,regY:8.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:-22.3868,x:7.65,y:184.85,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:2.7115,x:0.75,regY:52.8,scaleX:0.9989,scaleY:0.9989,y:-78.8,regX:1.1}},{t:this.instance_3,p:{rotation:-124.0607,x:-87.7,scaleX:0.9983,scaleY:0.9983,y:49.1,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-85.8408,x:-42.15,y:116,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-107.9161,x:-44.45,y:124.85,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-66.9147,x:-57.3,y:-23.2,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:54.7645,x:24.45,y:46.85,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:32.4355,x:70.7,y:112.4}},{t:this.instance_13,p:{rotation:37.7506,x:78.2,y:121,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-18.631,x:-19.7,y:92.15,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:106.5898,x:45.1,y:-25.85,regX:-33.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:2.1193,x:10.5,y:94.85,regY:1.7,regX:-0.7}},{t:this.instance_9,p:{rotation:30.5182,x:2.85,y:190.25,regX:3.9,regY:-53.9,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:12.2621,x:-4.6,y:-58.1,regY:8.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:-23.2319,x:7.7,y:184.7,regX:3.2}},{t:this.instance_5},{t:this.instance_4,p:{rotation:2.7106,x:0.75,regY:52.8,scaleX:0.9989,scaleY:0.9989,y:-78.8,regX:1.1}},{t:this.instance_3,p:{rotation:-123.6051,x:-89.5,scaleX:0.9984,scaleY:0.9984,y:48.25,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-85.7925,x:-44.5,y:115.55,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-106.5283,x:-46.8,y:124.4,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-65.4652,x:-57.25,y:-23.25,regX:35.7,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:54.3764,x:24.65,y:46.9,regX:-40.4}},{t:this.instance_14,p:{regX:-6.3,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:32.0472,x:71.5,y:112.15}},{t:this.instance_13,p:{rotation:37.3628,x:79,y:120.75,regX:-4.7,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-18.7149,x:-19.95,y:92.05,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:106.428,x:45.1,y:-25.85,regX:-33.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:3.215,x:10.25,y:94.85,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:32.1688,x:0.85,y:190.2,regX:3.9,regY:-53.9,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:12.2621,x:-4.6,y:-58.1,regY:8.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:-24.0784,x:7.4,y:184.7,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:2.7106,x:0.75,regY:52.8,scaleX:0.9989,scaleY:0.9989,y:-78.8,regX:1.1}},{t:this.instance_3,p:{rotation:-123.1506,x:-91.35,scaleX:0.9984,scaleY:0.9984,y:47.5,regX:40.2,regY:-0.2}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-85.7451,x:-46.85,y:115.05,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9981,scaleY:0.9981,rotation:-105.1406,x:-49.15,y:123.75,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-64.0149,x:-57.3,y:-23.3,regX:35.7,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:53.9887,x:24.85,y:47,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:7.9,scaleX:0.9983,scaleY:0.9983,rotation:31.6584,x:72.1,y:111.85}},{t:this.instance_13,p:{rotation:36.9746,x:79.6,y:120.4,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-18.7991,x:-20.25,y:91.95,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:106.2684,x:45,y:-25.85,regX:-33.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.3092,x:10.1,y:94.9,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:33.8194,x:-1.15,y:190,regX:3.9,regY:-53.9,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:12.2621,x:-4.55,y:-58.15,regY:8.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:-24.9235,x:7.25,y:184.55,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:2.7106,x:0.75,regY:52.8,scaleX:0.9989,scaleY:0.9989,y:-78.8,regX:1.1}},{t:this.instance_3,p:{rotation:-122.6944,x:-93.2,scaleX:0.9983,scaleY:0.9983,y:46.55,regX:40.2,regY:-0.2}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-85.6968,x:-49.25,y:114.55,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-103.7522,x:-51.4,y:123.4,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-62.5639,x:-57.3,y:-23.35,regX:35.7,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:53.7882,x:23.45,y:46.65,regX:-40.4}},{t:this.instance_14,p:{regX:-6.3,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:32.1626,x:71.05,y:111.35}},{t:this.instance_13,p:{rotation:37.8824,x:78.5,y:119.9,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-18.2945,x:-20.4,y:92,regY:-45.8,regX:2.5}},{t:this.instance_11,p:{regY:-0.2,rotation:107.3075,x:45.1,y:-25.8,regX:-33.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:3.4836,x:10.2,y:94.9,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:32.6399,x:0.4,y:190.2,regX:4,regY:-53.9,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.2566,x:-4.6,y:-58.15,regY:8.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:-23.6537,x:6.55,y:184.65,regX:3.2}},{t:this.instance_5},{t:this.instance_4,p:{rotation:2.5363,x:0.7,regY:52.8,scaleX:0.9989,scaleY:0.9989,y:-78.8,regX:1.1}},{t:this.instance_3,p:{rotation:-123.3959,x:-92.1,scaleX:0.9984,scaleY:0.9984,y:47.15,regX:40.2,regY:-0.2}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-86.357,x:-47.25,y:114.55,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-104.5697,x:-49.45,y:123.4,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-63.4451,x:-57.25,y:-23.3,regX:35.7,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:53.5871,x:22.25,y:46.25,regX:-40.3}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:32.6653,x:69.85,y:110.8}},{t:this.instance_13,p:{rotation:38.7896,x:77.35,y:119.5,regX:-4.7,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-17.7899,x:-20.3,y:91.95,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:108.348,x:45.05,y:-25.95,regX:-33.7,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:2.6561,x:10.35,y:94.85,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:31.4603,x:1.8,y:190.25,regX:3.9,regY:-53.9,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:12.2495,x:-4.55,y:-58.15,regY:8.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:-22.3871,x:5.55,y:184.95,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:2.3602,x:0.75,regY:52.8,scaleX:0.999,scaleY:0.999,y:-78.8,regX:1.1}},{t:this.instance_3,p:{rotation:-124.0986,x:-90.9,scaleX:0.9984,scaleY:0.9984,y:47.6,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-87.0193,x:-45.4,y:114.55,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-105.3867,x:-47.45,y:123.4,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-64.3271,x:-57.25,y:-23.25,regX:35.7,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:53.3867,x:20.95,y:45.8,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:33.1681,x:68.8,y:110.2}},{t:this.instance_13,p:{rotation:39.6977,x:76.2,y:118.8,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.7}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-17.285,x:-20.25,y:92.1,regY:-45.7,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:109.387,x:45.1,y:-25.95,regX:-33.7,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:1.8291,x:10.5,y:94.95,regY:1.7,regX:-0.7}},{t:this.instance_9,p:{rotation:30.2806,x:3.35,y:190.3,regX:3.9,regY:-53.9,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.2421,x:-4.55,y:-58.15,regY:8.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:-21.1169,x:4.75,y:185.25,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:2.1841,x:0.75,regY:52.8,scaleX:0.999,scaleY:0.999,y:-78.8,regX:1.1}},{t:this.instance_3,p:{rotation:-124.7996,x:-89.8,scaleX:0.9983,scaleY:0.9983,y:48.25,regX:40.1,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-87.6812,x:-43.6,y:114.5,regX:5.2,regY:-8.8}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-106.2034,x:-45.4,y:123.4,regY:-1.4}},{t:this.instance,p:{regY:0.2,rotation:-65.2069,x:-57.2,y:-23.15,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:53.186,x:19.6,y:45.3,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:33.6719,x:67.7,y:109.6}},{t:this.instance_13,p:{rotation:40.6063,x:75.05,y:118.35,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-16.7811,x:-20.35,y:92,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:110.4283,x:45.1,y:-26,regX:-33.7,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:1.0016,x:10.6,y:94.7,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:29.1017,x:4.85,y:190.4,regX:3.9,regY:-53.9,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:12.2353,x:-4.6,y:-58.1,regY:8.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:-19.8489,x:3.85,y:185.45,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:2.0072,x:0.7,regY:52.8,scaleX:0.999,scaleY:0.999,y:-78.8,regX:1.1}},{t:this.instance_3,p:{rotation:-125.501,x:-88.7,scaleX:0.9984,scaleY:0.9984,y:48.7,regX:40.1,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-88.3437,x:-41.6,y:114.4,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-107.0215,x:-43.4,y:123.3,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-66.0872,x:-57.25,y:-23.3,regX:35.7,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:52.9875,x:18.35,y:44.85,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9984,scaleY:0.9984,rotation:34.1749,x:66.65,y:108.95}},{t:this.instance_13,p:{rotation:41.5144,x:73.9,y:117.75,regX:-4.8,scaleX:0.9982,scaleY:0.9982,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-16.276,x:-20.35,y:91.9,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:111.4672,x:45.1,y:-25.85,regX:-33.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.1744,x:10.75,y:94.7,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:27.923,x:6.45,y:190.4,regX:3.9,regY:-53.9,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.2287,x:-4.6,y:-58.15,regY:8.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:-18.5793,x:3.05,y:185.6,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:1.8321,x:0.75,regY:52.8,scaleX:0.9989,scaleY:0.9989,y:-78.8,regX:1.1}},{t:this.instance_3,p:{rotation:-126.2022,x:-87.6,scaleX:0.9983,scaleY:0.9983,y:49.1,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-89.006,x:-39.65,y:114.25,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-107.8388,x:-41.45,y:123.25,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-66.9696,x:-57.3,y:-23.15,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:52.7868,x:17.05,y:44.4,regX:-40.4}},{t:this.instance_14,p:{regX:-6.3,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:34.6786,x:65.7,y:108.25}},{t:this.instance_13,p:{rotation:42.4224,x:72.7,y:117.2,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-15.7718,x:-20.4,y:91.95,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:112.5083,x:45.05,y:-25.85,regX:-33.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.6485,x:10.9,y:94.65,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:26.7434,x:7.9,y:190.4,regX:3.9,regY:-53.9,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:12.2234,x:-4.6,y:-58.15,regY:8.8}},{t:this.instance_6,p:{regY:-54.6,scaleX:0.9981,scaleY:0.9981,rotation:-17.3109,x:2.2,y:185.75,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:1.6561,x:0.9,regY:52.8,scaleX:0.999,scaleY:0.999,y:-78.8,regX:1.2}},{t:this.instance_3,p:{rotation:-126.9046,x:-86.5,scaleX:0.9983,scaleY:0.9983,y:49.55,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-89.6681,x:-37.75,y:114.15,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-108.6549,x:-39.35,y:123.15,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-67.8495,x:-57.3,y:-23.15,regX:35.6,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:52.587,x:15.75,y:43.8,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:35.1818,x:64.6,y:107.55}},{t:this.instance_13,p:{rotation:43.3314,x:71.65,y:116.55,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-15.2679,x:-20.55,y:92,regY:-45.8,regX:2.5}},{t:this.instance_11,p:{regY:-0.2,rotation:113.547,x:45.1,y:-25.8,regX:-33.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-1.4758,x:11.05,y:94.6,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:25.5654,x:9.35,y:190.5,regX:3.9,regY:-53.8,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:12.2164,x:-4.6,y:-58.1,regY:8.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:-16.0421,x:1.3,y:186,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:1.481,x:0.75,regY:52.9,scaleX:0.999,scaleY:0.999,y:-78.65,regX:1.1}},{t:this.instance_3,p:{rotation:-127.6059,x:-85.4,scaleX:0.9984,scaleY:0.9984,y:50,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-90.3249,x:-36,y:113.95,regX:5.2,regY:-8.8}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-109.4735,x:-37.25,y:122.9,regY:-1.3}},{t:this.instance,p:{regY:0.1,rotation:-68.7313,x:-57.3,y:-23.15,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:52.3866,x:14.55,y:43.3,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:35.6853,x:63.6,y:106.85}},{t:this.instance_13,p:{rotation:44.2389,x:70.45,y:115.85,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-14.7635,x:-20.5,y:91.95,regY:-45.8,regX:2.5}},{t:this.instance_11,p:{regY:-0.2,rotation:114.5874,x:45.05,y:-25.8,regX:-33.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-2.3035,x:11.15,y:94.65,regY:1.7,regX:-0.7}},{t:this.instance_9,p:{rotation:24.3857,x:10.95,y:190.35,regX:3.9,regY:-53.9,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:12.21,x:-4.6,y:-58.1,regY:8.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:-14.7745,x:0.6,y:186.15,regX:3.2}},{t:this.instance_5},{t:this.instance_4,p:{rotation:1.305,x:0.75,regY:52.9,scaleX:0.999,scaleY:0.999,y:-78.65,regX:1.1}},{t:this.instance_3,p:{rotation:-128.3071,x:-84.35,scaleX:0.9984,scaleY:0.9984,y:50.45,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-90.9879,x:-34.1,y:113.8,regX:5.2,regY:-8.8}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-110.2893,x:-35.35,y:122.85,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-69.6118,x:-57.3,y:-23.15,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:52.1855,x:13.25,y:42.75,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:36.1884,x:62.55,y:106.15}},{t:this.instance_13,p:{rotation:45.1455,x:69.4,y:115.15,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-14.2586,x:-20.45,y:91.95,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:115.6282,x:45.1,y:-25.85,regX:-33.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-3.1299,x:11.35,y:94.55,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:23.2068,x:12.5,y:190.35,regX:3.9,regY:-53.9,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:12.203,x:-4.55,y:-58.1,regY:8.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:-13.5045,x:-0.4,y:186.35,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:1.1291,x:0.75,regY:52.8,scaleX:0.999,scaleY:0.999,y:-78.9,regX:1.1}},{t:this.instance_3,p:{rotation:-129.008,x:-83.1,scaleX:0.9983,scaleY:0.9983,y:50.85,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-91.6502,x:-32.1,y:113.6,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-111.1068,x:-33.25,y:122.55,regY:-1.3}},{t:this.instance,p:{regY:0.1,rotation:-70.4922,x:-57.35,y:-23.15,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:51.9863,x:12.05,y:42.1,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:36.6918,x:61.55,y:105.4}},{t:this.instance_13,p:{rotation:46.0534,x:68.3,y:114.5,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-13.754,x:-20.45,y:91.95,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:116.6673,x:45.1,y:-25.85,regX:-33.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-3.9569,x:11.45,y:94.5,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:22.0276,x:13.95,y:190.25,regX:3.9,regY:-53.9,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.1956,x:-4.55,y:-58.1,regY:8.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:-12.2357,x:-1.35,y:186.5,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:0.9523,x:0.7,regY:52.8,scaleX:0.9989,scaleY:0.9989,y:-78.85,regX:1.1}},{t:this.instance_3,p:{rotation:-129.7105,x:-82,scaleX:0.9983,scaleY:0.9983,y:51.3,regX:40.1,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-92.3118,x:-30.15,y:113.4,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-111.9244,x:-31.35,y:122.4,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-71.3734,x:-57.35,y:-23.2,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:51.7855,x:10.85,y:41.55,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:7.9,scaleX:0.9983,scaleY:0.9983,rotation:37.1951,x:60.6,y:104.5}},{t:this.instance_13,p:{rotation:46.9629,x:67.2,y:113.75,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-13.2501,x:-20.5,y:91.9,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:117.7079,x:45.1,y:-25.85,regX:-33.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-4.7839,x:11.6,y:94.45,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:20.8488,x:15.5,y:190.3,regX:3.9,regY:-53.8,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.1903,x:-4.6,y:-58.1,regY:8.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:-10.9669,x:-2.1,y:186.7,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:0.7781,x:0.75,regY:52.8,scaleX:0.9989,scaleY:0.9989,y:-78.85,regX:1.1}},{t:this.instance_3,p:{rotation:-130.4122,x:-80.8,scaleX:0.9983,scaleY:0.9983,y:51.65,regX:40.1,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-92.9746,x:-28.2,y:113.05,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-112.7415,x:-29.35,y:122.2,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-72.2546,x:-57.3,y:-23.15,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1,scaleX:0.9983,scaleY:0.9983,rotation:51.5867,x:9.6,y:40.95,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:37.6975,x:59.5,y:103.75}},{t:this.instance_13,p:{rotation:47.8709,x:66.15,y:113.05,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-12.7456,x:-20.45,y:91.9,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:118.7473,x:45.05,y:-25.85,regX:-33.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-5.6109,x:11.7,y:94.35,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:19.6684,x:17,y:190.05,regX:3.9,regY:-53.9,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.1833,x:-4.6,y:-58.1,regY:8.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:-9.6981,x:-3,y:186.85,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:0.6012,x:0.75,regY:52.8,scaleX:0.999,scaleY:0.999,y:-78.85,regX:1.1}},{t:this.instance_3,p:{rotation:-131.1133,x:-79.75,scaleX:0.9983,scaleY:0.9983,y:51.95,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-93.6351,x:-26.35,y:112.75,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-113.5586,x:-27.35,y:121.85,regY:-1.4}},{t:this.instance,p:{regY:0.2,rotation:-73.1351,x:-57.25,y:-23.1,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1,scaleX:0.9983,scaleY:0.9983,rotation:51.3853,x:8.4,y:40.4,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:38.2016,x:58.55,y:102.95}},{t:this.instance_13,p:{rotation:48.779,x:65.1,y:112.3,regX:-4.7,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-12.2414,x:-20.55,y:91.9,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:119.7867,x:45.05,y:-25.85,regX:-33.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-6.4385,x:11.9,y:94.4,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:18.4898,x:18.65,y:189.95,regX:4,regY:-53.9,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.1769,x:-4.6,y:-58.1,regY:8.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:-8.4296,x:-3.85,y:187,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:0.4262,x:0.75,regY:52.8,scaleX:0.999,scaleY:0.999,y:-78.85,regX:1.1}},{t:this.instance_3,p:{rotation:-131.8156,x:-78.55,scaleX:0.9983,scaleY:0.9983,y:52.3,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-94.2971,x:-24.45,y:112.45,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-114.3758,x:-25.3,y:121.6,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-74.016,x:-57.3,y:-23.1,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:51.1852,x:7.2,y:39.5,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:38.7052,x:57.55,y:102.15}},{t:this.instance_13,p:{rotation:49.6876,x:64,y:111.55,regX:-4.7,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-11.7372,x:-20.5,y:92,regY:-45.7,regX:2.6}},{t:this.instance_11,p:{regY:-0.1,rotation:120.8283,x:45,y:-25.9,regX:-33.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-7.2663,x:12,y:94.4,regY:1.7,regX:-0.7}},{t:this.instance_9,p:{rotation:17.3113,x:19.95,y:189.75,regX:3.9,regY:-53.9,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:12.1699,x:-4.6,y:-58.1,regY:8.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:-7.161,x:-4.7,y:187.1,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:0.2503,x:0.75,regY:52.8,scaleX:0.999,scaleY:0.999,y:-78.85,regX:1.1}},{t:this.instance_3,p:{rotation:-132.5167,x:-77.35,scaleX:0.9983,scaleY:0.9983,y:52.6,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-94.9587,x:-22.5,y:112.15,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-115.1938,x:-23.15,y:121.2,regY:-1.3}},{t:this.instance,p:{regY:0.1,rotation:-74.896,x:-57.35,y:-23.1,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:50.9854,x:6,y:38.85,regX:-40.4}},{t:this.instance_14,p:{regX:-6.3,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:39.2084,x:56.75,y:101.25}},{t:this.instance_13,p:{rotation:50.5953,x:63,y:110.65,regX:-4.7,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-11.2314,x:-20.55,y:91.9,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:121.8674,x:45.05,y:-25.8,regX:-33.6,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-8.093,x:12.1,y:94.3,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:16.132,x:21.6,y:189.6,regX:4,regY:-53.9,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.1625,x:-4.6,y:-58.1,regY:8.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:-5.8922,x:-5.45,y:187.3,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:0.0744,x:0.8,regY:52.8,scaleX:0.9989,scaleY:0.9989,y:-78.85,regX:1.1}},{t:this.instance_3,p:{rotation:-133.2182,x:-76.25,scaleX:0.9983,scaleY:0.9984,y:52.9,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-95.6219,x:-20.6,y:111.75,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-116.0107,x:-21.35,y:120.8,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-75.7783,x:-57.3,y:-23.15,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:50.7856,x:4.9,y:38.2,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:39.711,x:55.7,y:100.3}},{t:this.instance_13,p:{rotation:51.5027,x:61.9,y:109.8,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-10.7277,x:-20.6,y:92,regY:-45.7,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:122.9082,x:45.05,y:-25.85,regX:-33.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-8.9206,x:12.25,y:94.2,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:14.9531,x:23,y:189.35,regX:3.9,regY:-53.9,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.1563,x:-4.6,y:-58.1,regY:8.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:-4.6238,x:-6.35,y:187.4,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.0971,x:0.85,regY:52.8,scaleX:0.9989,scaleY:0.9989,y:-78.85,regX:1.1}},{t:this.instance_3,p:{rotation:-133.9206,x:-75,scaleX:0.9983,scaleY:0.9983,y:53.2,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-96.2849,x:-18.7,y:111.4,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9981,scaleY:0.9981,rotation:-116.8271,x:-19.4,y:120.4,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-76.6585,x:-57.35,y:-23.2,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1,scaleX:0.9983,scaleY:0.9983,rotation:50.5846,x:3.65,y:37.45,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:40.2158,x:54.7,y:99.4}},{t:this.instance_13,p:{rotation:52.4111,x:60.95,y:108.95,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-10.2225,x:-20.6,y:91.9,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:123.9473,x:45.1,y:-25.9,regX:-33.6,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-9.7474,x:12.4,y:94.1,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:13.7734,x:24.65,y:189.15,regX:4,regY:-53.9,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:12.1493,x:-4.65,y:-58.1,regY:8.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:-3.3531,x:-7.2,y:187.45,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.2731,x:0.75,regY:52.8,scaleX:0.999,scaleY:0.999,y:-78.85,regX:1.1}},{t:this.instance_3,p:{rotation:-134.6223,x:-73.85,scaleX:0.9983,scaleY:0.9983,y:53.5,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-96.9452,x:-16.8,y:110.95,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-117.6452,x:-17.4,y:120.05,regY:-1.4}},{t:this.instance,p:{regY:0.2,rotation:-77.5399,x:-57.25,y:-23.1,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:50.3855,x:2.65,y:36.65,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:40.7183,x:53.8,y:98.5}},{t:this.instance_13,p:{rotation:53.3194,x:59.9,y:108.1,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-9.7183,x:-20.65,y:91.85,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:124.9876,x:45.1,y:-25.85,regX:-33.6,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-10.5754,x:12.55,y:94.05,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:12.5937,x:26.05,y:188.9,regX:3.9,regY:-53.9,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.1438,x:-4.65,y:-58.1,regY:8.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:-2.0851,x:-8.15,y:187.6,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.4481,x:0.75,regY:52.8,scaleX:0.999,scaleY:0.999,y:-78.85,regX:1.1}},{t:this.instance_3,p:{rotation:-135.3239,x:-72.7,scaleX:0.9983,scaleY:0.9983,y:53.75,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-97.6074,x:-14.95,y:110.5,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-118.4615,x:-15.35,y:119.6,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-78.4201,x:-57.3,y:-23.15,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:50.1846,x:1.5,y:35.9,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:7.9,scaleX:0.9983,scaleY:0.9983,rotation:41.2212,x:52.95,y:97.45}},{t:this.instance_13,p:{rotation:54.2273,x:58.9,y:107.15,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-9.215,x:-20.65,y:91.85,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:126.0274,x:45.1,y:-25.9,regX:-33.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-11.401,x:12.7,y:94.05,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:11.4148,x:27.5,y:188.7,regX:3.9,regY:-53.9,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:12.1368,x:-4.65,y:-58.1,regY:8.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:-0.8173,x:-8.95,y:187.65,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.624,x:0.75,regY:52.8,scaleX:0.999,scaleY:0.999,y:-78.85,regX:1.1}},{t:this.instance_3,p:{rotation:-136.0261,x:-71.5,scaleX:0.9983,scaleY:0.9983,y:54,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-98.2697,x:-13.05,y:109.95,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-119.2793,x:-13.4,y:119.15,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-79.3009,x:-57.35,y:-23.05,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:49.9851,x:0.35,y:35.05,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:41.7243,x:52.1,y:96.55}},{t:this.instance_13,p:{rotation:55.1359,x:58.05,y:106.15,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.7}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-8.7096,x:-20.65,y:91.85,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:127.0678,x:45.05,y:-25.85,regX:-33.6,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-12.2284,x:12.8,y:94.05,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:10.2353,x:29.15,y:188.65,regX:4,regY:-53.8,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.1302,x:-4.65,y:-58.1,regY:8.8}},{t:this.instance_6,p:{regY:-54.6,scaleX:0.9981,scaleY:0.9981,rotation:0.4485,x:-9.75,y:187.7,regX:3.2}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.7999,x:0.75,regY:52.9,scaleX:0.999,scaleY:0.999,y:-78.75,regX:1.1}},{t:this.instance_3,p:{rotation:-136.7273,x:-70.3,scaleX:0.9984,scaleY:0.9984,y:54.2,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-98.9313,x:-11.2,y:109.5,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-120.0962,x:-11.4,y:118.6,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-80.1828,x:-57.35,y:-23.1,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:49.7844,x:-0.7,y:34.25,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:42.2279,x:51.1,y:95.5}},{t:this.instance_13,p:{rotation:56.0435,x:56.95,y:105.3,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-8.2059,x:-20.75,y:91.8,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:128.1075,x:45.15,y:-25.95,regX:-33.7,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-13.0564,x:12.95,y:94,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:9.0567,x:30.5,y:188.2,regX:3.9,regY:-53.9,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.1232,x:-4.65,y:-58.1,regY:8.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:1.717,x:-10.55,y:187.9,regX:3.2}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.975,x:0.75,regY:52.9,scaleX:0.9989,scaleY:0.9989,y:-78.75,regX:1.1}},{t:this.instance_3,p:{rotation:-137.4281,x:-69.1,scaleX:0.9984,scaleY:0.9984,y:54.35,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-99.5933,x:-9.4,y:109,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-120.9125,x:-9.45,y:118.05,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-81.0642,x:-57.35,y:-23.1,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:49.5849,x:-1.8,y:33.45,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:42.7324,x:50.25,y:94.5}},{t:this.instance_13,p:{rotation:56.9517,x:56.05,y:104.3,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-7.701,x:-20.75,y:91.85,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:129.147,x:45.1,y:-25.8,regX:-33.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-13.8834,x:13.1,y:93.95,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:7.8776,x:31.95,y:188.05,regX:3.9,regY:-53.8,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:12.1162,x:-4.6,y:-58.2,regY:8.7}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:2.9856,x:-11.45,y:187.95,regX:3.2}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-1.151,x:0.75,regY:52.9,scaleX:0.9989,scaleY:0.9989,y:-78.75,regX:1.1}},{t:this.instance_3,p:{rotation:-138.1299,x:-67.9,scaleX:0.9983,scaleY:0.9983,y:54.55,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-100.2549,x:-7.55,y:108.4,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9981,scaleY:0.9981,rotation:-121.7298,x:-7.55,y:117.4,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-81.9435,x:-57.3,y:-23.25,regX:35.7,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:49.3843,x:-2.85,y:32.55,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:43.2355,x:49.45,y:93.4}},{t:this.instance_13,p:{rotation:57.8591,x:55.2,y:103.4,regX:-4.7,scaleX:0.9983,scaleY:0.9983,regY:2.7}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-7.1975,x:-20.7,y:91.9,regY:-45.7,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:130.1868,x:45.1,y:-25.75,regX:-33.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-14.71,x:13.2,y:93.9,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:6.6983,x:33.45,y:187.55,regX:3.9,regY:-53.9,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.1106,x:-4.6,y:-58.2,regY:8.7}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:4.2547,x:-12.35,y:188,regX:3.2}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-1.3269,x:0.75,regY:52.8,scaleX:0.999,scaleY:0.999,y:-78.85,regX:1.1}},{t:this.instance_3,p:{rotation:-138.8315,x:-66.7,scaleX:0.9983,scaleY:0.9983,y:54.75,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-100.9178,x:-5.8,y:107.85,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9981,scaleY:0.9981,rotation:-122.5469,x:-5.65,y:116.85,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-82.8251,x:-57.35,y:-23.1,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:49.1837,x:-3.9,y:31.7,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:43.7379,x:48.65,y:92.45}},{t:this.instance_13,p:{rotation:58.7678,x:54.15,y:102.3,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-6.692,x:-20.75,y:91.85,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:131.2275,x:45.1,y:-25.75,regX:-33.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-15.5377,x:13.45,y:93.8,regY:1.6,regX:-0.6}},{t:this.instance_9,p:{rotation:5.5192,x:34.95,y:187.1,regX:3.9,regY:-53.9,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.1053,x:-4.65,y:-58.2,regY:8.7}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:5.5224,x:-13.15,y:188.05,regX:3.2}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-1.5029,x:0.8,regY:52.8,scaleX:0.999,scaleY:0.999,y:-78.85,regX:1.1}},{t:this.instance_3,p:{rotation:-139.5331,x:-65.55,scaleX:0.9983,scaleY:0.9983,y:54.9,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-101.5803,x:-3.85,y:107.15,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-123.3638,x:-3.6,y:116.3,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-83.7052,x:-57.35,y:-23.2,regX:35.7,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:48.9831,x:-4.9,y:30.8,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:44.242,x:47.75,y:91.35}},{t:this.instance_13,p:{rotation:59.6758,x:53.3,y:101.25,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-6.1879,x:-20.75,y:91.85,regY:-45.7,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:132.267,x:45.1,y:-25.65,regX:-33.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-16.3648,x:13.55,y:93.95,regY:1.7,regX:-0.7}},{t:this.instance_9,p:{rotation:4.3406,x:36.45,y:186.95,regX:3.9,regY:-53.8,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.0981,x:-4.65,y:-58.2,regY:8.7}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:6.7911,x:-14.25,y:188.15,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-1.6797,x:0.8,regY:52.8,scaleX:0.999,scaleY:0.999,y:-78.9,regX:1.1}},{t:this.instance_3,p:{rotation:-140.2354,x:-64.3,scaleX:0.9984,scaleY:0.9984,y:55.05,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-102.2409,x:-2.15,y:106.6,regX:5.1,regY:-8.8}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-124.1811,x:-1.7,y:115.7,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-84.5872,x:-57.35,y:-23.25,regX:35.7,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:48.7852,x:-5.9,y:29.9,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:44.7455,x:46.95,y:90.25}},{t:this.instance_13,p:{rotation:60.5845,x:52.3,y:100.2,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-5.6842,x:-20.8,y:91.75,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:133.3074,x:45.1,y:-25.7,regX:-33.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-17.192,x:13.65,y:93.7,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:3.1613,x:37.95,y:186.45,regX:3.9,regY:-53.9,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.0909,x:-4.65,y:-58.2,regY:8.7}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:8.0612,x:-15.1,y:188.25,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-1.854,x:0.75,regY:52.8,scaleX:0.9989,scaleY:0.9989,y:-78.9,regX:1.1}},{t:this.instance_3,p:{rotation:-140.9366,x:-63.1,scaleX:0.9983,scaleY:0.9983,y:55.1,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-102.904,x:-0.2,y:105.95,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-124.9992,x:0.3,y:114.95,regY:-1.3}},{t:this.instance,p:{regY:0.1,rotation:-85.4671,x:-57.35,y:-23.2,regX:35.7,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:48.5835,x:-7,y:28.9,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:45.2483,x:46.15,y:89.1}},{t:this.instance_13,p:{rotation:61.4919,x:51.5,y:99.15,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-5.1802,x:-20.85,y:91.75,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:134.3473,x:45.1,y:-25.75,regX:-33.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-18.0185,x:13.9,y:93.6,regY:1.6,regX:-0.6}},{t:this.instance_9,p:{rotation:1.9824,x:39.4,y:186,regX:3.9,regY:-53.9,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.0837,x:-4.65,y:-58.2,regY:8.7}},{t:this.instance_6,p:{regY:-54.6,scaleX:0.9981,scaleY:0.9981,rotation:9.3294,x:-15.9,y:188.1,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-2.03,x:0.75,regY:52.8,scaleX:0.9989,scaleY:0.9989,y:-78.9,regX:1.1}},{t:this.instance_3,p:{rotation:-141.6381,x:-61.9,scaleX:0.9983,scaleY:0.9983,y:55.2,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-103.5662,x:1.65,y:105.2,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-125.815,x:2.1,y:114.25,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-86.3477,x:-57.35,y:-23.1,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:48.383,x:-8,y:27.95,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:45.7512,x:45.45,y:87.9}},{t:this.instance_13,p:{rotation:62.4001,x:50.6,y:98.05,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-4.6756,x:-20.8,y:91.95,regY:-45.7,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:135.387,x:45.15,y:-25.7,regX:-33.6,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-18.847,x:13.9,y:93.65,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:0.8026,x:40.85,y:185.6,regX:3.9,regY:-53.9,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.0775,x:-4.6,y:-58.2,regY:8.7}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:10.5968,x:-16.85,y:188.25,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-2.206,x:0.8,regY:52.8,scaleX:0.999,scaleY:0.999,y:-78.9,regX:1.1}},{t:this.instance_3,p:{rotation:-142.3398,x:-60.7,scaleX:0.9983,scaleY:0.9983,y:55.3,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-104.2274,x:3.45,y:104.45,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-126.633,x:4.15,y:113.6,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-87.2292,x:-57.35,y:-23.1,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:48.1827,x:-8.85,y:27.05,regX:-40.3}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:46.2547,x:44.65,y:86.8}},{t:this.instance_13,p:{rotation:63.3073,x:49.75,y:96.9,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-4.1704,x:-20.9,y:91.8,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:136.4274,x:45.1,y:-25.7,regX:-33.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-19.6737,x:14.15,y:93.55,regY:1.6,regX:-0.6}},{t:this.instance_9,p:{rotation:-0.3724,x:42.35,y:185.05,regX:3.9,regY:-53.9,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.072,x:-4.6,y:-58.2,regY:8.7}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:11.8665,x:-17.6,y:188.25,regX:3.2}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-2.383,x:0.8,regY:52.8,scaleX:0.999,scaleY:0.999,y:-78.9,regX:1.1}},{t:this.instance_3,p:{rotation:-143.0415,x:-59.5,scaleX:0.9984,scaleY:0.9984,y:55.3,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-104.8889,x:5.25,y:103.85,regX:5.1,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-127.4493,x:6.05,y:112.75,regY:-1.3}},{t:this.instance,p:{regY:0.1,rotation:-88.1108,x:-57.35,y:-23.05,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:47.9825,x:-9.85,y:26.05,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:46.7576,x:43.9,y:85.65}},{t:this.instance_13,p:{rotation:64.2163,x:48.95,y:95.9,regX:-4.7,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-3.6658,x:-20.85,y:91.75,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:137.4677,x:45.1,y:-25.8,regX:-33.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-20.5004,x:14.25,y:93.65,regY:1.7,regX:-0.7}},{t:this.instance_9,p:{rotation:-1.552,x:43.8,y:184.7,regX:3.9,regY:-53.9,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.065,x:-4.65,y:-58.2,regY:8.7}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:13.1354,x:-18.6,y:188.3,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-2.5573,x:0.7,regY:52.8,scaleX:0.999,scaleY:0.999,y:-78.9,regX:1.1}},{t:this.instance_3,p:{rotation:-143.7426,x:-58.35,scaleX:0.9984,scaleY:0.9984,y:55.35,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-105.5515,x:7.05,y:103,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-128.267,x:7.85,y:112.05,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-88.9912,x:-57.35,y:-23.05,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:47.7834,x:-10.8,y:25.05,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:47.262,x:43.2,y:84.4}},{t:this.instance_13,p:{rotation:65.1236,x:48.15,y:94.65,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-3.1613,x:-20.85,y:91.75,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:138.5076,x:45.15,y:-25.7,regX:-33.6,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-21.3272,x:14.35,y:93.6,regY:1.7,regX:-0.7}},{t:this.instance_9,p:{rotation:-2.7305,x:45.3,y:184.15,regX:3.9,regY:-53.9,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.0588,x:-4.65,y:-58.2,regY:8.7}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:14.4048,x:-19.4,y:188.3,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-2.7325,x:0.7,regY:52.8,scaleX:0.9989,scaleY:0.9989,y:-78.9,regX:1.1}},{t:this.instance_3,p:{rotation:-144.445,x:-57.1,scaleX:0.9983,scaleY:0.9983,y:55.35,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-106.2133,x:8.8,y:102.1,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-129.0853,x:9.7,y:111.25,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-89.8721,x:-57.35,y:-23.1,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:47.5832,x:-11.7,y:24,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:47.766,x:42.55,y:83.2}},{t:this.instance_13,p:{rotation:66.0322,x:47.3,y:93.45,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-2.6562,x:-20.9,y:91.9,regY:-45.7,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:139.5479,x:45.15,y:-25.75,regX:-33.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-22.1558,x:14.45,y:93.45,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:-3.9101,x:46.8,y:183.7,regX:4,regY:-53.9,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.0506,x:-4.7,y:-58.2,regY:8.7}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:15.6734,x:-20.25,y:188.35,regX:3.2}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-2.9086,x:0.75,regY:52.9,scaleX:0.9989,scaleY:0.9989,y:-78.8,regX:1.1}},{t:this.instance_3,p:{rotation:-145.1469,x:-55.95,scaleX:0.9983,scaleY:0.9983,y:55.35,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-106.8767,x:10.6,y:101.3,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-129.901,x:11.65,y:110.35,regY:-1.3}},{t:this.instance,p:{regY:0.1,rotation:-90.7487,x:-57.35,y:-23.1,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:47.3823,x:-12.6,y:22.9,regX:-40.4}},{t:this.instance_14,p:{regX:-6.3,regY:7.9,scaleX:0.9983,scaleY:0.9983,rotation:48.2676,x:41.95,y:82.05}},{t:this.instance_13,p:{rotation:66.9397,x:46.6,y:92.4,regX:-4.7,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-2.1531,x:-20.9,y:91.75,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:140.588,x:45.2,y:-25.75,regX:-33.7,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-22.9824,x:14.55,y:93.35,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:-5.0888,x:48.25,y:183.15,regX:4,regY:-53.9,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.0444,x:-4.7,y:-58.2,regY:8.7}},{t:this.instance_6,p:{regY:-54.6,scaleX:0.9981,scaleY:0.9981,rotation:16.9418,x:-21.2,y:188.2,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-3.0848,x:0.7,regY:52.8,scaleX:0.999,scaleY:0.999,y:-78.95,regX:1.1}},{t:this.instance_3,p:{rotation:-145.8472,x:-54.7,scaleX:0.9983,scaleY:0.9983,y:55.3,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-107.5376,x:12.35,y:100.5,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-130.7196,x:13.5,y:109.55,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-91.6299,x:-57.35,y:-23.1,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1,scaleX:0.9983,scaleY:0.9983,rotation:47.1822,x:-13.5,y:21.9,regX:-40.4}},{t:this.instance_14,p:{regX:-6.3,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:48.7721,x:41.2,y:80.85}},{t:this.instance_13,p:{rotation:67.8486,x:45.75,y:91.1,regX:-4.8,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.6475,x:-20.95,y:91.85,regY:-45.7,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:141.6279,x:45.1,y:-25.7,regX:-33.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-23.8098,x:14.75,y:93.35,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:-6.2679,x:49.55,y:182.7,regX:3.9,regY:-53.8,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:12.0374,x:-4.7,y:-58.15,regY:8.7}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:18.2111,x:-22,y:188.35,regX:3.2}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-3.2618,x:0.7,regY:52.8,scaleX:0.999,scaleY:0.999,y:-78.95,regX:1.1}},{t:this.instance_3,p:{rotation:-146.5497,x:-53.55,scaleX:0.9984,scaleY:0.9984,y:55.3,regX:40.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-108.1993,x:14.15,y:99.6,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.9981,scaleY:0.9981,rotation:-131.5366,x:15.3,y:108.65,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-92.5105,x:-57.35,y:-23.05,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-1,scaleX:0.9983,scaleY:0.9983,rotation:46.9826,x:-14.35,y:20.9,regX:-40.4}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:49.2729,x:40.5,y:79.55}},{t:this.instance_13,p:{rotation:68.7554,x:45.1,y:90.05,regX:-4.7,scaleX:0.9983,scaleY:0.9983,regY:2.8}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.1438,x:-21,y:91.65,regY:-45.8,regX:2.6}},{t:this.instance_11,p:{regY:-0.2,rotation:142.6665,x:45.15,y:-25.75,regX:-33.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-24.6374,x:14.85,y:93.25,regY:1.6,regX:-0.7}},{t:this.instance_9,p:{rotation:-7.4461,x:51.05,y:181.95,regX:3.9,regY:-53.9,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.0319,x:-4.65,y:-58.15,regY:8.7}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:19.479,x:-23.05,y:188.15,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-3.4363,x:0.7,regY:52.8,scaleX:0.999,scaleY:0.999,y:-78.95,regX:1.1}},{t:this.instance_3,p:{rotation:-147.2509,x:-52.35,scaleX:0.9984,scaleY:0.9984,y:55.25,regX:40.2,regY:-0.2}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-108.8617,x:15.8,y:98.75,regX:5.2,regY:-8.7}},{t:this.instance_1,p:{regX:6,scaleX:0.998,scaleY:0.998,rotation:-132.3535,x:17.15,y:107.75,regY:-1.4}},{t:this.instance,p:{regY:0.1,rotation:-93.3909,x:-57.35,y:-23.1,regX:35.6,scaleX:0.9984,scaleY:0.9984}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-123,-206.2,291.2,509.8);


(lib.CharacterBad_03_button = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-39.3,-19.3,0.6437,0.6438,-93.4975,0,0,35.5,0.3);

	this.instance_1 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_1.setTransform(8.9,64.95,0.6436,0.6436,-132.7555,0,0,5.6,-1.4);

	this.instance_2 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_2.setTransform(8,59.25,0.6436,0.6438,-109.1174,0,0,4.9,-8.5);

	this.instance_3 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_3.setTransform(-36.15,31.2,0.6437,0.6437,-147.3154,0,0,40.1,-0.3);

	this.instance_4 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_4.setTransform(-2,-55.3,0.6442,0.6441,-3.6416,0,0,1.2,52.5);

	this.instance_5 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_5.setTransform(-7.1,-17.65,0.6449,0.6447,0,0,0,0,-24.4);

	this.instance_6 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_6.setTransform(-17,117.05,0.6436,0.6436,19.2357,0,0,3.2,-54.4);

	this.instance_7 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_7.setTransform(-5.35,-41.95,0.6442,0.6441,12.1064,0,0,-0.6,8.3);

	this.instance_8 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_8.setTransform(-6,26.5,0.6449,0.6447,0,0,0,0,-23.2);

	this.instance_9 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_9.setTransform(30.45,113,0.6434,0.6433,-7.0986,0,0,4.2,-53.5);

	this.instance_10 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_10.setTransform(7.25,55.6,0.6434,0.6433,-24.5218,0,0,-0.6,2);

	this.instance_11 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_11.setTransform(26.75,-21.1,0.6438,0.6437,142.542,0,0,-34.1,0);

	this.instance_12 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_12.setTransform(-16,54.8,0.6438,0.6437,-1.3733,0,0,2.6,-45.4);

	this.instance_13 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_13.setTransform(26.95,53.45,0.6436,0.6437,68.5827,0,0,-4.5,2.6);

	this.instance_14 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_14.setTransform(23.95,46.8,0.6437,0.6437,48.9839,0,0,-6.2,7.9);

	this.instance_15 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_15.setTransform(-11.55,9.1,0.6437,0.6437,46.7635,0,0,-40.1,-1.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).to({state:[]},1).wait(1));

	// Layer_1
	this.instance_16 = new lib.CharacterBad_03_interact();
	this.instance_16.setTransform(2.05,26.85,0.6449,0.6449,0,0,0,7,48.6);
	this.instance_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(1).to({_off:false},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-62.5,-137.3,125.4,326.6);


// stage content:
(lib.LessonChapter1_03 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,242];
	this.streamSoundSymbolsList[0] = [{id:"beforewar2edit_03wav",startFrame:0,endFrame:243,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("beforewar2edit_03wav",0);
		this.InsertIntoSoundStreamData(soundInstance,0,243,1);
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
			document.location.replace("https://ninzato.github.io/history-of-badr-war/LessonChapter1_04.html");
			}, 500);
			
		}
		
		this.prevBtn.addEventListener("click", fl_ClickToGoToWebPage_2);
		
		function fl_ClickToGoToWebPage_2() {
			createjs.Sound.play("popsound");
			
			setTimeout(function(){
			document.location.replace("https://ninzato.github.io/history-of-badr-war/LessonChapter1_02.html");
			}, 500);
			
		}
		
		this.replaybtn.addEventListener("click", fl_ClickToGoToAndPlayFromFrame.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame()
		{
			this.gotoAndPlay(1);
		}
	}
	this.frame_242 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(242).call(this.frame_242).wait(1));

	// Subtitle
	this.instance = new lib.CachedBmp_1612();
	this.instance.setTransform(195.55,597,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_1611();
	this.instance_1.setTransform(165.6,564.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(243));

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.homeBtn},{t:this.prevBtn},{t:this.nextBtn},{t:this.replaybtn}]}).wait(243));

	// Interaction
	this.instance_2 = new lib.CharacterBad_04_button();
	this.instance_2.setTransform(719.8,240.15,0.7775,0.7774,0,0,180);
	new cjs.ButtonHelper(this.instance_2, 0, 1, 1);

	this.instance_3 = new lib.CharacterBad_03_button();
	this.instance_3.setTransform(299.25,471.95,0.6409,0.6408,0,0,0,0,0.1);
	new cjs.ButtonHelper(this.instance_3, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_3},{t:this.instance_2}]},242).wait(1));

	// People2
	this.instance_4 = new lib.CharacterBad_03();
	this.instance_4.setTransform(43.3,489,0.4128,0.4128,0,0,0,-3.4,48.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({x:296.25},241).to({_off:true},1).wait(1));

	// People
	this.instance_5 = new lib.CharacterBad_04();
	this.instance_5.setTransform(1010.2,254.05,0.5014,0.5014,0,0,180,-40.4,49);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({x:741,y:258.35},241).to({_off:true},1).wait(1));

	// Background
	this.instance_6 = new lib.Chap1Scene3();
	this.instance_6.setTransform(-425,-239,1.3322,1.3322);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(243));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(215,121,1191.5,719);
// library properties:
lib.properties = {
	id: 'A6F1A483617F544186FFC32FE4892FD2',
	width: 1280,
	height: 720,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/LessonChapter1_03_atlas_1.png", id:"LessonChapter1_03_atlas_1"},
		{src:"sounds/beforewar2edit_03wav.mp3", id:"beforewar2edit_03wav"},
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