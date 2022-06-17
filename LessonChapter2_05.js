(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"LessonChapter2_05_atlas_1", frames: [[1044,1548,330,308],[1376,1548,327,292],[0,1548,357,308],[1705,1548,306,310],[359,1548,357,308],[718,1548,324,330],[0,1350,1779,196],[0,1082,1914,266],[0,0,1920,1080]]},
		{name:"LessonChapter2_05_atlas_2", frames: [[287,579,163,120],[0,594,163,120],[884,845,134,50],[0,716,132,102],[689,603,134,130],[332,0,285,308],[906,0,77,245],[165,594,77,244],[0,0,330,282],[619,0,285,308],[941,456,77,245],[531,603,77,244],[0,284,285,308],[452,579,77,245],[610,603,77,244],[287,310,298,267],[689,845,193,36],[412,849,193,36],[93,873,193,36],[607,883,193,36],[288,873,122,50],[587,456,175,145],[587,310,202,144],[906,247,115,48],[764,456,175,145],[791,310,199,144],[801,789,152,54],[244,701,166,84],[412,887,152,29],[825,703,166,84],[802,897,152,29],[244,787,166,84],[0,820,91,87],[825,603,91,88],[689,735,110,107]]}
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



(lib.CachedBmp_2164 = function() {
	this.initialize(ss["LessonChapter2_05_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2163 = function() {
	this.initialize(ss["LessonChapter2_05_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2162 = function() {
	this.initialize(ss["LessonChapter2_05_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2161 = function() {
	this.initialize(ss["LessonChapter2_05_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2160 = function() {
	this.initialize(ss["LessonChapter2_05_atlas_2"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2159 = function() {
	this.initialize(ss["LessonChapter2_05_atlas_2"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2158 = function() {
	this.initialize(ss["LessonChapter2_05_atlas_2"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2157 = function() {
	this.initialize(ss["LessonChapter2_05_atlas_2"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2156 = function() {
	this.initialize(ss["LessonChapter2_05_atlas_2"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2155 = function() {
	this.initialize(ss["LessonChapter2_05_atlas_2"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2154 = function() {
	this.initialize(ss["LessonChapter2_05_atlas_2"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2153 = function() {
	this.initialize(ss["LessonChapter2_05_atlas_2"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2152 = function() {
	this.initialize(ss["LessonChapter2_05_atlas_2"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2151 = function() {
	this.initialize(ss["LessonChapter2_05_atlas_2"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2150 = function() {
	this.initialize(ss["LessonChapter2_05_atlas_2"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2149 = function() {
	this.initialize(ss["LessonChapter2_05_atlas_2"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2148 = function() {
	this.initialize(ss["LessonChapter2_05_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2147 = function() {
	this.initialize(ss["LessonChapter2_05_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2146 = function() {
	this.initialize(ss["LessonChapter2_05_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2145 = function() {
	this.initialize(ss["LessonChapter2_05_atlas_2"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2144 = function() {
	this.initialize(ss["LessonChapter2_05_atlas_2"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2143 = function() {
	this.initialize(ss["LessonChapter2_05_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2142 = function() {
	this.initialize(ss["LessonChapter2_05_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2141 = function() {
	this.initialize(ss["LessonChapter2_05_atlas_2"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2140 = function() {
	this.initialize(ss["LessonChapter2_05_atlas_2"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2139 = function() {
	this.initialize(ss["LessonChapter2_05_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2138 = function() {
	this.initialize(ss["LessonChapter2_05_atlas_2"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2137 = function() {
	this.initialize(ss["LessonChapter2_05_atlas_2"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2136 = function() {
	this.initialize(ss["LessonChapter2_05_atlas_2"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2135 = function() {
	this.initialize(ss["LessonChapter2_05_atlas_2"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2134 = function() {
	this.initialize(ss["LessonChapter2_05_atlas_2"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2133 = function() {
	this.initialize(ss["LessonChapter2_05_atlas_2"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2132 = function() {
	this.initialize(ss["LessonChapter2_05_atlas_2"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2131 = function() {
	this.initialize(ss["LessonChapter2_05_atlas_2"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2130 = function() {
	this.initialize(ss["LessonChapter2_05_atlas_2"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2129 = function() {
	this.initialize(ss["LessonChapter2_05_atlas_2"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2128 = function() {
	this.initialize(ss["LessonChapter2_05_atlas_2"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2127 = function() {
	this.initialize(ss["LessonChapter2_05_atlas_2"]);
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2126 = function() {
	this.initialize(ss["LessonChapter2_05_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2125 = function() {
	this.initialize(ss["LessonChapter2_05_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CompoundPath = function() {
	this.initialize(ss["LessonChapter2_05_atlas_2"]);
	this.gotoAndStop(32);
}).prototype = p = new cjs.Sprite();



(lib.Group_1 = function() {
	this.initialize(ss["LessonChapter2_05_atlas_2"]);
	this.gotoAndStop(33);
}).prototype = p = new cjs.Sprite();



(lib.Path = function() {
	this.initialize(ss["LessonChapter2_05_atlas_2"]);
	this.gotoAndStop(34);
}).prototype = p = new cjs.Sprite();



(lib.Chap2Scene4 = function() {
	this.initialize(ss["LessonChapter2_05_atlas_1"]);
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
	this.instance = new lib.CachedBmp_2163();
	this.instance.setTransform(-40.65,-35.5,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2164();
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
	this.instance = new lib.CachedBmp_2160();
	this.instance.setTransform(-33.05,-28.05,0.4875,0.4875);

	this.instance_1 = new lib.CachedBmp_2162();
	this.instance_1.setTransform(-33,10.75,0.4875,0.4875);

	this.instance_2 = new lib.CachedBmp_2161();
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
	this.instance = new lib.CachedBmp_2159();
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
	this.instance = new lib.CachedBmp_2158();
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
	this.instance = new lib.CachedBmp_2157();
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
	this.instance = new lib.CachedBmp_2156();
	this.instance.setTransform(-75.5,-71.9,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-75.5,-71.9,165,141);


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
	this.shape.graphics.f("#D3C2B2").s().p("Ai0P6QhBhBgGhvQgztggPrBQgDhwA9hZIADgGQAuhFBHglQBCgkBLAAQBMAABCAkQBHAlAuBFQAfAvAOA2QAPA3gDA5QgWGegiGRQgjGmgoFGQgNBwhFBAQg+A7hSAAQhSAAg7g7g");
	this.shape.setTransform(1.3972,4.4729,0.5589,0.5588);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D3C2B2").s().p("Ag5IcQgUgUgCghQgGhWgPl2QgOlRgEiPQgBggAXgbIABgCQAjgqA9AAQA9AAAjAqQAYAcgCAjIgjHjIghHHQgDAigUATQgSARgYAAQgZAAgSgRg");
	this.shape_1.setTransform(0,-44.2,1,1,0,0,0,0,-44.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-55.7,35.599999999999994,120.4);


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
	this.shape.graphics.f("#D3C2B2").s().p("Ai0P6QhBhBgGhvQgztggPrBQgDhwA9hZIADgGQAuhFBHglQBCgkBLAAQBMAABCAkQBHAlAuBFQAfAvAOA2QAPA3gDA5QgWGegiGRQgjGmgoFGQgNBwhFBAQg+A7hSAAQhSAAg7g7g");
	this.shape.setTransform(-1.6528,53.0729,0.5589,0.5588);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D3C2B2").s().p("AgxIsQgYAAgSgSQgTgVgCghQgDhWgCl2QgClQABiQQABghAXgaIACgCQAkgpA8ADQA9ACAjArQAWAdgEAjIgzHhIgxHGQgDAhgUASQgSAQgXAAIgDAAg");
	this.shape_1.setTransform(-0.8,6,1,1,0,0,0,-0.1,-42.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.4,-7.1,35.599999999999994,120.39999999999999);


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
	this.instance = new lib.CachedBmp_2155();
	this.instance.setTransform(-68.4,-83.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.4,-83.6,142.5,154);


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
	this.shape.graphics.f("#BAA087").s().p("AgyByQjCgPiugVQgfgEgSgWQgRgVgBgbQgBgbAPgUQARgXAfgEQC6gYCegPQC/gSBkAAQCMAAA/AbQBHAfAABLQAABMhDAZQg3AViYAAQhUAAiygOg");
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
	this.shape.graphics.f("#BAA087").s().p("AmeBlQhHgfAAhLQAAhMBDgZQA3gVCYAAQBUAACxAOQDDAPCuAVQAfAEASAXQARAUABAbQABAbgPAUQgRAXgfAEQi9AYicAPQi/AShjAAQiMAAg/gbg");
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
	this.instance = new lib.CachedBmp_2154();
	this.instance.setTransform(-19.15,-61.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.1,-61.7,38.5,122.5);


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

	// Layer_1
	this.instance = new lib.CachedBmp_2153();
	this.instance.setTransform(-18.45,-60.8,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-18.4,-60.8,38.5,122);


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
	this.shape.graphics.f("#BAA087").s().p("AiNEyQjDgQicgiQASiygHjWQgEhrgHhIQDyAHD0ALQHnAVAJAUQADAGAAAYQAAA+gRCwQgNB8gOB4QiPA8jwAAQhfAAhwgKg");
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
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#BAA087").s().p("AAYBKQkfgCiagNQgfgDgSgRQgQgQAAgVQAAgUAQgQQASgRAegDQDYgUIzAAQA7AAAWAJQApAPAAAyQAAAzgpAPQgWAIg7AAIjSABIh/gBg");
	this.shape.setTransform(-0.0258,-0.03);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.3,-7.5,96.6,15);


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
	this.shape.graphics.f("#BAA087").s().p("Am5BCQgpgPAAgzQAAgyApgPQAWgIA7AAQC5gBCXAAQEgACCbAPQAeACASARQAQAQAAAVQAAAUgQAPQgSASgeADQjYAUozAAQg6AAgXgJg");
	this.shape.setTransform(0.05,0.0188);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.2,-7.4,96.6,14.9);


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
	this.shape_2.graphics.f("#FBF6E0").s().p("Ai0P6QhBhBgGhvQgztggPrBQgDhwA9hZIADgGQAuhFBHglQBCgkBLAAQBMAABCAkQBHAlAuBFQAfAvAOA2QAPA3gDA5QgWGegiGRQgjGmgoFGQgNBwhFBAQg+A7hSAAQhSAAg7g7g");
	this.shape_2.setTransform(2.3972,4.4729,0.5589,0.5588);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FBF6E0").s().p("Ag5IcQgUgUgCghQgGhWgPl2QgOlRgEiPQgBggAXgbIABgCQAjgqA9AAQA9AAAjAqQAYAcgCAjIgjHjIghHHQgDAigUATQgSARgYAAQgZAAgSgRg");
	this.shape_3.setTransform(0,-44.2,1,1,0,0,0,0,-44.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-15.4,-55.7,35.6,120.4);


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
	this.instance_1 = new lib.CachedBmp_2152();
	this.instance_1.setTransform(-68.4,-83.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.4,-83.6,142.5,154);


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
	this.shape_1.graphics.f("#D3C2B2").s().p("AgyByQjCgPiugVQgfgEgSgWQgRgVgBgbQgBgbAPgUQARgXAfgEQC6gYCegPQC/gSBkAAQCMAAA/AbQBHAfAABLQAABMhDAZQg3AViYAAQhUAAiygOg");
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
	this.shape_1.graphics.f("#D3C2B2").s().p("AmeBlQhHgfAAhLQAAhMBDgZQA3gVCYAAQBUAACxAOQDDAPCuAVQAfAEASAXQARAUABAbQABAbgPAUQgRAXgfAEQi9AYicAPQi/AShjAAQiMAAg/gbg");
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
	this.instance_1 = new lib.CachedBmp_2151();
	this.instance_1.setTransform(-19.1,-61.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.1,-61.7,38.5,122.5);


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

	// Layer_1
	this.instance_1 = new lib.CachedBmp_2150();
	this.instance_1.setTransform(-19.15,-60.8,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.1,-60.8,38.5,122);


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
	this.shape_1.graphics.f("#D3C2B2").s().p("AiNEyQjDgQicgiQASiygHjWQgEhrgHhIQDyAHD0ALQHnAVAJAUQADAGAAAYQAAA+gRCwQgNB8gOB4QiPA8jwAAQhfAAhwgKg");
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
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D3C2B2").s().p("AAYBKQkfgCiagNQgfgDgSgRQgQgQAAgVQAAgUAQgQQASgRAegDQDYgUIzAAQA7AAAWAJQApAPAAAyQAAAzgpAPQgWAIg7AAIjSABIh/gBg");
	this.shape_1.setTransform(-0.0258,-0.03);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.3,-7.5,96.6,15);


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
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D3C2B2").s().p("Am5BCQgpgPAAgzQAAgyApgPQAWgIA7AAQC5gBCXAAQEgACCbAPQAeACASARQAQAQAAAVQAAAUgQAPQgSASgeADQjYAUozAAQg6AAgXgJg");
	this.shape_1.setTransform(0.05,0.0188);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.2,-7.4,96.6,14.9);


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
	this.instance = new lib.CachedBmp_2149();
	this.instance.setTransform(-70.2,-72.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-70.2,-72.5,149,133.5);


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
	this.instance_1 = new lib.CachedBmp_2148();
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
	this.instance_1 = new lib.CachedBmp_2147();
	this.instance_1.setTransform(-78.4,-67.4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-78.4,-67.4,163.5,146);


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
	this.instance_2 = new lib.CachedBmp_2146();
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
	this.instance = new lib.CachedBmp_2145();
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
	this.instance = new lib.CachedBmp_2144();
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
	this.instance_2 = new lib.CachedBmp_2143();
	this.instance_2.setTransform(-73.85,-69.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-73.8,-69.6,153,155);


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
	this.shape_4.graphics.f("#00563E").s().p("AhlI5QgkgkgDg+QgdnjgImKQgCg/AigyIACgDQAagmAngVQAmgUApAAQAqAAAlAUQAoAUAaAnQARAaAIAfQAIAegBAgQgNDogTDgQgTDsgXC2QgHA+gmAlQgjAggtAAQgvAAghghg");
	this.shape_4.setTransform(1.4087,4.525);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#D3C2B2").s().p("Ag5IcQgUgUgCghQgGhWgPl2QgOlRgEiPQgBggAXgbIABgCQAjgqA9AAQA9AAAjAqQAYAcgCAjIgjHjIghHHQgDAigUATQgSARgYAAQgZAAgSgRg");
	this.shape_5.setTransform(0,-44.2,1,1,0,0,0,0,-44.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-55.7,35.599999999999994,120.5);


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
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#00563E").s().p("AhlI5QgkgkgDg+QgdnjgImKQgCg/AigyIACgDQAagmAngVQAmgUApAAQAqAAAlAUQAoAUAaAnQARAaAIAfQAIAegBAgQgNDogTDgQgTDsgXC2QgHA+gmAlQgjAggtAAQgvAAghghg");
	this.shape_4.setTransform(-2.1913,53.125);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20,-7.1,35.6,120.5);


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
	this.instance_2 = new lib.CachedBmp_2142();
	this.instance_2.setTransform(-86,-83.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-86,-83.6,178.5,154);


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
	this.shape_2.graphics.f("#013221").s().p("AgyByQjCgPiugVQgfgEgSgWQgRgVgBgbQgBgbAPgUQARgXAfgEQC6gYCegPQC/gSBkAAQCMAAA/AbQBHAfAABLQAABMhDAZQg3AViYAAQhUAAiygOg");
	this.shape_2.setTransform(33,0,1,1,0,0,0,33,0);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

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
	this.shape_2.graphics.f("#013221").s().p("AmeBlQhHgfAAhLQAAhMBDgZQA3gVCYAAQBUAACxAOQDDAPCuAVQAfAEASAXQARAUABAbQABAbgPAUQgRAXgfAEQi9AYicAPQi/AShjAAQiMAAg/gbg");
	this.shape_2.setTransform(-33.4,0,1,1,0,0,0,-33.4,0);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.6,-12.8,97.2,25.6);


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
	this.shape_2.setTransform(-5.45,8.55,0.5738,0.5738,0,0,0,-9.5,14.9);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-11.1,-13.6,22.299999999999997,27.2);


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
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#00563E").s().p("AhDF9QgUAAgYgRQgZgTgTgdQglg5AAhCQAAgTADgTQAWiOAah0QAhiTAcg0QARgeAhgWQAigXAlgCQBegGAiB3QAFARAACZQAACfAMA9QAGAjABAhQgBA/gZA2QgQAhgVAUQgWATgTAAg");
	this.shape.setTransform(-0.1786,-23.6143);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#1B1810").s().p("AATF2IgEgBQgTAAgJgMQgLgNAAgdQAAikgjjRQgsjhgRheIDCAAIgIKVQA+AdgIAeQgDAMgOAHQgOAIgTAAg");
	this.shape_1.setTransform(1.0158,23.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.4,-61.7,38.5,122.7);


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
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#00563E").s().p("AhCF9QgVAAgXgRQgZgTgUgdQgvhJANhYQAWiOAah0QAhiTAdg0QAQgeAhgWQAjgXAlgCQBdgGAiB3QAFARAACZQABCfALA9QAUBognBRQgPAhgWAUQgVATgUAAg");
	this.shape.setTransform(-0.174,-22.7143);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#1B1810").s().p("AAPFzQgTgBgJgLQgLgNAAgdQAAijgjjPQgsjggRhdIDCAAIgHKQQA9AdgHAdQgDAMgOAHQgOAIgTAAg");
	this.shape_1.setTransform(1.186,23.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.4,-60.8,38.5,121.8);


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
	this.shape_2.graphics.f("#013221").s().p("AiNEyQjDgQicgiQASiygHjWQgEhrgHhIQDyAHD0ALQHnAVAJAUQADAGAAAYQAAA+gRCwQgNB8gOB4QiPA8jwAAQhfAAhwgKg");
	this.shape_2.setTransform(0.4,19.425);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.9,-12.1,98.6,63.1);


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
	this.instance = new lib.CachedBmp_2141();
	this.instance.setTransform(-48.3,-8.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.3,-8.9,96.5,18);


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
	this.instance = new lib.CachedBmp_2140();
	this.instance.setTransform(-48.25,-8.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

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
	this.instance_1 = new lib.CachedBmp_2139();
	this.instance_1.setTransform(-76.25,-80.25,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-76.2,-80.2,162,165);


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
	this.instance = new lib.CachedBmp_2136();
	this.instance.setTransform(-43.65,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2138();
	this.instance_1.setTransform(-3.8,-12.5,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_2137();
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
	this.instance = new lib.CachedBmp_2133();
	this.instance.setTransform(-55.95,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2135();
	this.instance_1.setTransform(-55.95,-12,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_2134();
	this.instance_2.setTransform(-42.15,-36.05,0.5,0.5);

	this.instance_3 = new lib.Group_1();
	this.instance_3.setTransform(216.45,-207.05,4.7384,4.7384,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-214.7,-207,431.2,417);


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
	this.instance.setTransform(-55.75,-21.7,0.9982,0.9982,-98.6228,0,0,37.9,-0.1);

	this.instance_1 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_1.setTransform(-51.65,147.3,0.9981,0.9981,0,99.7345,-80.2655,6.3,-1.4);

	this.instance_2 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_2.setTransform(-51.75,138.35,0.9983,0.9983,0,99.6328,-80.3672,5.3,-8.3);

	this.instance_3 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_3.setTransform(-43.2,57.5,0.9983,0.9983,-83.3464,0,0,40.5,0.1);

	this.instance_4 = new lib.ch1_headcopy2("synched",0);
	this.instance_4.setTransform(0.25,-76.8,0.9989,0.9989,0,0.5873,-179.4127,0.4,52.9);

	this.instance_5 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_5.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_6 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_6.setTransform(-42.3,187.95,0.9981,0.9981,0,6.6609,-173.3391,2.9,-53.5);

	this.instance_7 = new lib.ch1_neckcopy2("synched",0);
	this.instance_7.setTransform(-5.8,-58,0.999,0.999,-0.1006,0,0,-1.4,8.8);

	this.instance_8 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_8.setTransform(-5.6,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_9 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_9.setTransform(24.55,192.2,0.9979,0.9979,0,-2.5039,177.4961,2.5,-53.2);

	this.instance_10 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_10.setTransform(8.2,96.05,0.9979,0.9979,-8.4151,0,0,-1.9,2.1);

	this.instance_11 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_11.setTransform(47.7,-26.55,0.9984,0.9984,92.9576,0,0,-31.4,-1.4);

	this.instance_12 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_12.setTransform(-20.6,92.25,0.9983,0.9983,12.4516,0,0,1.8,-45.8);

	this.instance_13 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_13.setTransform(-12.5,115.1,0.9982,0.9982,0,-56.0427,123.9573,-4.9,3.2);

	this.instance_14 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_14.setTransform(-14.25,103.85,0.9984,0.9984,0,-79.8966,100.1034,-6.2,8);

	this.instance_15 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_15.setTransform(44.75,48.2,0.9983,0.9983,134.1596,0,0,-39.6,-0.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:134.1596,x:44.75,y:48.2}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,skewX:-79.8966,skewY:100.1034,x:-14.25,y:103.85,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.9,regY:3.2,scaleX:0.9982,scaleY:0.9982,skewX:-56.0427,skewY:123.9573,x:-12.5,y:115.1}},{t:this.instance_12,p:{regX:1.8,regY:-45.8,rotation:12.4516,y:92.25,x:-20.6,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.4,rotation:92.9576,x:47.7,y:-26.55,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9979,scaleY:0.9979,rotation:-8.4151,x:8.2,y:96.05}},{t:this.instance_9,p:{regX:2.5,skewX:-2.5039,skewY:177.4961,x:24.55,y:192.2,scaleX:0.9979,scaleY:0.9979,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.4,scaleX:0.999,scaleY:0.999,rotation:-0.1006,x:-5.8,y:-58}},{t:this.instance_6,p:{regX:2.9,scaleX:0.9981,scaleY:0.9981,skewX:6.6609,skewY:-173.3391,x:-42.3,y:187.95,regY:-53.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.4,skewX:0.5873,skewY:-179.4127,x:0.25,y:-76.8,regY:52.9}},{t:this.instance_3,p:{regY:0.1,scaleX:0.9983,scaleY:0.9983,rotation:-83.3464,x:-43.2,y:57.5,regX:40.5}},{t:this.instance_2,p:{regX:5.3,skewX:99.6328,skewY:-80.3672,x:-51.75,y:138.35,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_1,p:{regX:6.3,scaleX:0.9981,scaleY:0.9981,skewX:99.7345,skewY:-80.2655,x:-51.65,y:147.3}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-98.6228,x:-55.75,y:-21.7,regY:-0.1}}]}).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:132.8325,x:45.8,y:48.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-81.2249,skewY:98.7751,x:-11.8,y:105.25,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9981,scaleY:0.9981,skewX:-57.3706,skewY:122.6294,x:-9.8,y:116.5}},{t:this.instance_12,p:{regX:1.7,regY:-45.7,rotation:11.1755,y:92.3,x:-20.6,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:92.0916,x:47.65,y:-26.5,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-2,regY:2.2,scaleX:0.9978,scaleY:0.9978,rotation:-7.0687,x:8.35,y:96.1}},{t:this.instance_9,p:{regX:2.4,skewX:-1.9945,skewY:178.0055,x:22.7,y:192.4,scaleX:0.9979,scaleY:0.9979,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,scaleX:0.9989,scaleY:0.9989,rotation:-0.1076,x:-5.9,y:-57.95}},{t:this.instance_6,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:5.3849,skewY:-174.6151,x:-40.3,y:188.4,regY:-53.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.5,skewX:0.3904,skewY:-179.6096,x:0.15,y:-76.7,regY:52.9}},{t:this.instance_3,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-81.5488,x:-43.75,y:57.5,regX:40.5}},{t:this.instance_2,p:{regX:5.2,skewX:101.4302,skewY:-78.5698,x:-54.75,y:138.1,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_1,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:101.5329,skewY:-78.4671,x:-54.95,y:147.1}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-98.2568,x:-55.7,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:131.5031,x:46.95,y:48.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-82.5527,skewY:97.4473,x:-9.4,y:106.6,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9981,scaleY:0.9981,skewX:-58.6993,skewY:121.3007,x:-7.05,y:117.7}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:9.9009,y:92.15,x:-20.55,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:91.2243,x:47.6,y:-26.5,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-2,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:-5.7224,x:8.7,y:95.9}},{t:this.instance_9,p:{regX:2.5,skewX:-1.4844,skewY:178.5156,x:20.65,y:192.6,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.1164,x:-5.9,y:-57.95}},{t:this.instance_6,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:4.1085,skewY:-175.8915,x:-38.1,y:188.9,regY:-53.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.5,skewX:0.1926,skewY:-179.8074,x:0.1,y:-76.8,regY:52.9}},{t:this.instance_3,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-79.751,x:-44.3,y:57.55,regX:40.5}},{t:this.instance_2,p:{regX:5.2,skewX:103.2286,skewY:-76.7714,x:-57.8,y:137.75,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_1,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:103.3307,skewY:-76.6693,x:-58.3,y:146.7}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-97.8914,x:-55.7,y:-21.65,regY:-0.1}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:130.1754,x:48.15,y:48.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-83.8818,skewY:96.1182,x:-6.85,y:107.85,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-60.0275,skewY:119.9725,x:-4.3,y:119}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:8.6248,y:92.15,x:-20.55,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:90.3582,x:47.65,y:-26.5,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:-4.3775,x:9.15,y:95.75}},{t:this.instance_9,p:{regX:2.4,skewX:-0.9735,skewY:179.0265,x:18.85,y:192.75,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.1252,x:-5.9,y:-57.95}},{t:this.instance_6,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:2.8333,skewY:-177.1667,x:-35.9,y:189.15,regY:-53.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.5,skewX:0,skewY:180,x:0.05,y:-76.75,regY:52.9}},{t:this.instance_3,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-77.9533,x:-44.8,y:57.7,regX:40.5}},{t:this.instance_2,p:{regX:5.2,skewX:105.0268,skewY:-74.9732,x:-60.8,y:137.4,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_1,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,skewX:105.129,skewY:-74.871,x:-61.65,y:146.35}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-97.5263,x:-55.7,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:128.8477,x:49.25,y:48.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-85.2102,skewY:94.7898,x:-4.35,y:109.1,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-61.3565,skewY:118.6435,x:-1.5,y:120.2}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:7.3487,y:92.15,x:-20.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:89.4956,x:47.7,y:-26.45,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:-3.0304,x:9.55,y:95.65}},{t:this.instance_9,p:{regX:2.5,skewX:-0.4635,skewY:179.5365,x:16.8,y:192.75,scaleX:0.9978,scaleY:0.9978,regY:-53.3}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.1339,x:-5.85,y:-57.95}},{t:this.instance_6,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:1.5586,skewY:-178.4414,x:-33.75,y:189.5,regY:-53.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.5,skewX:-0.1952,skewY:179.8048,x:0.05,y:-76.75,regY:52.9}},{t:this.instance_3,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-76.1532,x:-45.3,y:57.75,regX:40.5}},{t:this.instance_2,p:{regX:5.2,skewX:106.8262,skewY:-73.1738,x:-63.85,y:136.95,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_1,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:106.9275,skewY:-73.0725,x:-64.9,y:145.85}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-97.1609,x:-55.65,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:127.5193,x:50.35,y:48.15}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-86.5378,skewY:93.4622,x:-1.9,y:110.25,regY:7.9,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-62.684,skewY:117.316,x:1.3,y:121.35}},{t:this.instance_12,p:{regX:1.8,regY:-45.7,rotation:6.0735,y:92.3,x:-20.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.4,rotation:88.6285,x:47.65,y:-26.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:-1.6843,x:9.9,y:95.45}},{t:this.instance_9,p:{regX:2.4,skewX:0.0412,skewY:-179.9588,x:15,y:192.9,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.1435,x:-5.9,y:-57.95}},{t:this.instance_6,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:0.2821,skewY:-179.7179,x:-31.6,y:189.85,regY:-53.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.5,skewX:-0.3912,skewY:179.6088,x:0,y:-76.75,regY:52.9}},{t:this.instance_3,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-74.3561,x:-45.8,y:57.75,regX:40.5}},{t:this.instance_2,p:{regX:5.2,skewX:108.6244,skewY:-71.3756,x:-66.85,y:136.35,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_1,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,skewX:108.7255,skewY:-71.2745,x:-68.1,y:145.25}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-96.7946,x:-55.75,y:-21.75,regY:-0.1}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:126.1897,x:51.5,y:48.1}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-87.8671,skewY:92.1329,x:0.85,y:111.45,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-64.0127,skewY:115.9873,x:4.1,y:122.35}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:4.7978,y:92.2,x:-20.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.2,rotation:87.762,x:47.65,y:-26.35,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:-0.3391,x:10.15,y:95.35}},{t:this.instance_9,p:{regX:2.4,skewX:0.552,skewY:-179.448,x:13,y:192.9,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.6,scaleX:0.999,scaleY:0.999,rotation:-0.1523,x:-6,y:-57.95}},{t:this.instance_6,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-0.989,skewY:179.011,x:-29.4,y:190.05,regY:-53.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.5,skewX:-0.5882,skewY:179.4118,x:0.05,y:-76.75,regY:52.9}},{t:this.instance_3,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-72.5558,x:-46.35,y:57.85,regX:40.5}},{t:this.instance_2,p:{regX:5.2,skewX:110.4225,skewY:-69.5775,x:-69.75,y:135.7,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_1,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:110.5252,skewY:-69.4748,x:-71.35,y:144.6}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-96.4295,x:-55.75,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:124.861,x:52.65,y:48.05}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-89.196,skewY:90.804,x:3.4,y:112.45,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-65.3417,skewY:114.6583,x:6.9,y:123.35}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:3.5228,y:92.15,x:-20.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:86.8949,x:47.6,y:-26.5,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:1.0024,x:10.5,y:95.2}},{t:this.instance_9,p:{regX:2.4,skewX:1.062,skewY:-178.938,x:11.1,y:192.65,scaleX:0.9978,scaleY:0.9978,regY:-53.3}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.6,scaleX:0.999,scaleY:0.999,rotation:-0.161,x:-6,y:-57.95}},{t:this.instance_6,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-2.2642,skewY:177.7358,x:-27.2,y:190.15,regY:-53.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.5,skewX:-0.786,skewY:179.214,x:0.1,y:-76.75,regY:52.9}},{t:this.instance_3,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-70.7582,x:-46.85,y:57.9,regX:40.5}},{t:this.instance_2,p:{regX:5.2,skewX:112.2216,skewY:-67.7784,x:-72.75,y:135,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_1,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:112.3228,skewY:-67.6772,x:-74.55,y:143.85}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-96.0638,x:-55.7,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:123.5331,x:53.75,y:47.95}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,skewX:-90.5202,skewY:89.4798,x:6.1,y:113.6,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-66.6702,skewY:113.3298,x:9.75,y:124.35}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:2.2469,y:92.15,x:-20.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:86.0289,x:47.65,y:-26.45,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:2.348,x:10.85,y:95.1}},{t:this.instance_9,p:{regX:2.4,skewX:1.572,skewY:-178.428,x:9.2,y:192.7,scaleX:0.9979,scaleY:0.9979,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.1698,x:-5.85,y:-57.95}},{t:this.instance_6,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-3.5396,skewY:176.4604,x:-25,y:190.35,regY:-53.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.5,skewX:-0.9821,skewY:179.0179,x:0.1,y:-76.75,regY:52.9}},{t:this.instance_3,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-68.9606,x:-47.35,y:57.95,regX:40.5}},{t:this.instance_2,p:{regX:5.2,skewX:114.0188,skewY:-65.9812,x:-75.7,y:134.15,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_1,p:{regX:6.3,scaleX:0.998,scaleY:0.998,skewX:114.1217,skewY:-65.8783,x:-77.75,y:142.75}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-95.6984,x:-55.65,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:122.2042,x:54.85,y:47.85}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-91.849,skewY:88.151,x:8.65,y:114.5,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9981,scaleY:0.9981,skewX:-67.9989,skewY:112.0011,x:12.7,y:125.3}},{t:this.instance_12,p:{regX:1.7,regY:-45.7,rotation:0.9721,y:92.3,x:-20.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:85.1612,x:47.6,y:-26.55,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:3.694,x:11.15,y:95.05}},{t:this.instance_9,p:{regX:2.4,skewX:2.0813,skewY:-177.9187,x:7.2,y:192.45,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.1785,x:-5.8,y:-57.95}},{t:this.instance_6,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-4.8159,skewY:175.1841,x:-22.85,y:190.35,regY:-53.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.5,skewX:-1.179,skewY:178.821,x:0.15,y:-76.75,regY:52.9}},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-67.1615,x:-47.85,y:58,regX:40.5}},{t:this.instance_2,p:{regX:5.2,skewX:115.8177,skewY:-64.1823,x:-78.45,y:133.4,regY:-8.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_1,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:115.9198,skewY:-64.0802,x:-80.95,y:141.95}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-95.3323,x:-55.7,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:120.8748,x:56,y:47.75}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-93.1779,skewY:86.8221,x:11.2,y:115.4,regY:7.9,regX:-6.2}},{t:this.instance_13,p:{regX:-4.9,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-69.326,skewY:110.674,x:15.7,y:126}},{t:this.instance_12,p:{regX:1.7,regY:-45.7,rotation:-0.2995,y:92.3,x:-20.45,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:84.2949,x:47.65,y:-26.5,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.2,scaleX:0.9978,scaleY:0.9978,rotation:5.0412,x:11.5,y:95}},{t:this.instance_9,p:{regX:2.4,skewX:2.5917,skewY:-177.4083,x:5.25,y:192.2,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.1873,x:-5.85,y:-57.95}},{t:this.instance_6,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-6.0911,skewY:173.9089,x:-20.65,y:190.4,regY:-53.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.5,skewX:-1.3743,skewY:178.6257,x:0.1,y:-76.8,regY:52.9}},{t:this.instance_3,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-65.3637,x:-48.3,y:58.1,regX:40.5}},{t:this.instance_2,p:{regX:5.3,skewX:117.6159,skewY:-62.3841,x:-81.35,y:132.25,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_1,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:117.7181,skewY:-62.2819,x:-84.05,y:140.95}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-94.9683,x:-55.7,y:-21.75,regY:-0.1}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:119.5479,x:57.1,y:47.6}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-94.505,skewY:85.495,x:13.9,y:116.45,regY:7.9,regX:-6.1}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-70.6551,skewY:109.3449,x:18.6,y:126.9}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:-1.5748,y:92.2,x:-20.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:83.4272,x:47.65,y:-26.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-1.9,regY:2.2,scaleX:0.9978,scaleY:0.9978,rotation:6.3869,x:11.8,y:94.85}},{t:this.instance_9,p:{regX:2.4,skewX:3.1023,skewY:-176.8977,x:3.3,y:191.9,scaleX:0.9979,scaleY:0.9979,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.1969,x:-5.85,y:-57.95}},{t:this.instance_6,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-7.3666,skewY:172.6334,x:-18.35,y:190.55,regY:-53.4}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.5,skewX:-1.5713,skewY:178.4287,x:0.1,y:-76.85,regY:52.8}},{t:this.instance_3,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-63.5642,x:-48.85,y:58.1,regX:40.5}},{t:this.instance_2,p:{regX:5.2,skewX:119.4152,skewY:-60.5848,x:-84.25,y:131.35,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_1,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:119.517,skewY:-60.483,x:-87.2,y:139.8}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-94.6017,x:-55.75,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:118.2198,x:58.2,y:47.45}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-95.8347,skewY:84.1653,x:16.7,y:117.15,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.4,scaleX:0.9982,scaleY:0.9982,skewX:-71.983,skewY:108.017,x:21.75,y:127.6}},{t:this.instance_12,p:{regX:1.8,regY:-45.8,rotation:-2.8509,y:92.25,x:-20.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.4,rotation:82.5609,x:47.6,y:-26.65,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-2,regY:2.2,scaleX:0.9978,scaleY:0.9978,rotation:7.7316,x:12.1,y:94.7}},{t:this.instance_9,p:{regX:2.4,skewX:3.6113,skewY:-176.3887,x:1.35,y:191.5,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.2057,x:-5.85,y:-57.95}},{t:this.instance_6,p:{regX:2.9,scaleX:0.998,scaleY:0.998,skewX:-8.6423,skewY:171.3577,x:-16.05,y:190.35,regY:-53.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.5,skewX:-1.7674,skewY:178.2326,x:0.15,y:-76.9,regY:52.8}},{t:this.instance_3,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-61.7665,x:-49.35,y:58.15,regX:40.5}},{t:this.instance_2,p:{regX:5.3,skewX:121.2134,skewY:-58.7866,x:-86.95,y:130.2,regY:-8.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_1,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:121.3157,skewY:-58.6843,x:-90.25,y:138.65}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-94.2371,x:-55.7,y:-21.75,regY:-0.1}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:116.8898,x:59.35,y:47.35}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-97.1629,skewY:82.8371,x:19.5,y:117.9,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-73.3128,skewY:106.6872,x:24.6,y:128.25}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:-4.1267,y:92.25,x:-20.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.2,rotation:81.6947,x:47.7,y:-26.35,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:9.0779,x:12.5,y:94.4}},{t:this.instance_9,p:{regX:2.5,skewX:4.1224,skewY:-175.8776,x:-0.6,y:191.1,scaleX:0.9979,scaleY:0.9979,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.2144,x:-5.85,y:-57.95}},{t:this.instance_6,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-9.9176,skewY:170.0823,x:-14,y:190.2,regY:-53.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.5,skewX:-1.9653,skewY:178.0347,x:0.05,y:-76.8,regY:52.9}},{t:this.instance_3,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-59.9686,x:-49.85,y:58.15,regX:40.5}},{t:this.instance_2,p:{regX:5.2,skewX:123.0119,skewY:-56.9881,x:-89.75,y:129.05,regY:-8.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_1,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:123.1138,skewY:-56.8862,x:-93.25,y:137.3}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-93.8701,x:-55.7,y:-21.75,regY:-0.1}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:115.5627,x:60.4,y:47.1}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-98.4916,skewY:81.5084,x:22.3,y:118.7,regY:8,regX:-6.1}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-74.6398,skewY:105.3602,x:27.6,y:128.85}},{t:this.instance_12,p:{regX:1.7,regY:-45.7,rotation:-5.4018,y:92.3,x:-20.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:80.8271,x:47.6,y:-26.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:10.4239,x:12.9,y:94.25}},{t:this.instance_9,p:{regX:2.4,skewX:4.6321,skewY:-175.3679,x:-2.4,y:190.65,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.2232,x:-5.8,y:-57.95}},{t:this.instance_6,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-11.1929,skewY:168.8071,x:-11.95,y:190.05,regY:-53.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.5,skewX:-2.1615,skewY:177.8385,x:0.05,y:-76.75,regY:52.9}},{t:this.instance_3,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-58.1696,x:-50.4,y:58.2,regX:40.5}},{t:this.instance_2,p:{regX:5.2,skewX:124.8106,skewY:-55.1894,x:-92.45,y:127.85,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_1,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:124.9122,skewY:-55.0878,x:-96.15,y:136.05}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-93.5049,x:-55.65,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:114.2335,x:61.5,y:46.9}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-99.8195,skewY:80.1805,x:25.05,y:119.35,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-75.9689,skewY:104.0311,x:30.65,y:129.4}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:-6.6771,y:92.25,x:-20.35,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:79.9611,x:47.65,y:-26.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:11.7713,x:13.2,y:94.15}},{t:this.instance_9,p:{regX:2.4,skewX:5.1422,skewY:-174.8578,x:-4.35,y:190.2,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.2319,x:-5.85,y:-57.95}},{t:this.instance_6,p:{regX:2.9,scaleX:0.998,scaleY:0.998,skewX:-12.4695,skewY:167.5305,x:-9.65,y:189.8,regY:-53.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.5,skewX:-2.3586,skewY:177.6414,x:0,y:-76.75,regY:52.9}},{t:this.instance_3,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-56.3714,x:-50.9,y:58.25,regX:40.5}},{t:this.instance_2,p:{regX:5.3,skewX:126.6093,skewY:-53.3907,x:-95.1,y:126.4,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_1,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:126.7112,skewY:-53.2888,x:-99.15,y:134.6}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-93.1399,x:-55.7,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:112.9058,x:62.65,y:46.7}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-101.1485,skewY:78.8515,x:27.85,y:119.9,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-77.2967,skewY:102.7033,x:33.65,y:129.85}},{t:this.instance_12,p:{regX:1.8,regY:-45.8,rotation:-7.9521,y:92.2,x:-20.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:79.0935,x:47.6,y:-26.5,scaleX:0.9984,scaleY:0.9983}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:13.1154,x:13.45,y:94}},{t:this.instance_9,p:{regX:2.4,skewX:5.6525,skewY:-174.3475,x:-6.2,y:189.4,scaleX:0.9978,scaleY:0.9978,regY:-53.3}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.2415,x:-5.85,y:-57.95}},{t:this.instance_6,p:{regX:2.9,scaleX:0.998,scaleY:0.998,skewX:-13.7449,skewY:166.2551,x:-7.45,y:189.6,regY:-53.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.5,skewX:-2.554,skewY:177.446,x:0,y:-76.75,regY:52.9}},{t:this.instance_3,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-54.573,x:-51.4,y:58.25,regX:40.5}},{t:this.instance_2,p:{regX:5.2,skewX:128.4068,skewY:-51.5932,x:-97.75,y:125.15,regY:-8.4,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_1,p:{regX:6.3,scaleX:0.998,scaleY:0.998,skewX:128.5089,skewY:-51.4911,x:-101.95,y:132.9}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-92.7742,x:-55.65,y:-21.75,regY:-0.1}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:111.5773,x:63.75,y:46.45}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-102.4764,skewY:77.5236,x:30.65,y:120.35,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-78.625,skewY:101.375,x:36.7,y:130.3}},{t:this.instance_12,p:{regX:1.8,regY:-45.8,rotation:-9.2285,y:92.15,x:-20.35,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.4,rotation:78.2272,x:47.55,y:-26.65,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-2,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:14.4628,x:13.8,y:93.8}},{t:this.instance_9,p:{regX:2.4,skewX:6.1625,skewY:-173.8375,x:-8.15,y:188.95,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.2503,x:-5.85,y:-57.95}},{t:this.instance_6,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-15.0206,skewY:164.9794,x:-5.45,y:189.35,regY:-53.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.5,skewX:-2.7502,skewY:177.2498,x:0.05,y:-76.7,regY:52.9}},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-52.7743,x:-51.95,y:58.3,regX:40.5}},{t:this.instance_2,p:{regX:5.2,skewX:130.2049,skewY:-49.7951,x:-100.3,y:123.65,regY:-8.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_1,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:130.3076,skewY:-49.6924,x:-104.85,y:131.45}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-92.4077,x:-55.7,y:-21.8,regY:-0.1}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:110.2488,x:64.85,y:46.15}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-103.8054,skewY:76.1946,x:33.5,y:120.9,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-79.9539,skewY:100.0461,x:39.75,y:130.65}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:-10.5033,y:92.2,x:-20.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:77.36,x:47.55,y:-26.5,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:15.8089,x:14.2,y:93.75}},{t:this.instance_9,p:{regX:2.5,skewX:6.6723,skewY:-173.3277,x:-10.15,y:188.2,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.2591,x:-5.85,y:-57.95}},{t:this.instance_6,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-16.2953,skewY:163.7047,x:-3.25,y:188.95,regY:-53.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.5,skewX:-2.9473,skewY:177.0526,x:0.05,y:-76.85,regY:52.8}},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-50.9758,x:-52.45,y:58.3,regX:40.5}},{t:this.instance_2,p:{regX:5.2,skewX:132.0038,skewY:-47.9962,x:-102.95,y:122.15,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_1,p:{regX:6.3,scaleX:0.998,scaleY:0.998,skewX:132.1055,skewY:-47.8945,x:-107.55,y:129.75}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-92.0439,x:-55.7,y:-21.75,regY:-0.1}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:108.9194,x:65.9,y:45.9}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-105.1342,skewY:74.8658,x:36.35,y:121.35,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-81.2821,skewY:98.7179,x:42.8,y:130.9}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:-11.7799,y:92.2,x:-20.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.4,rotation:76.4931,x:47.6,y:-26.65,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-1.9,regY:2.2,scaleX:0.9978,scaleY:0.9978,rotation:17.1539,x:14.5,y:93.65}},{t:this.instance_9,p:{regX:2.4,skewX:7.1832,skewY:-172.8168,x:-11.9,y:187.5,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.2678,x:-5.8,y:-57.95}},{t:this.instance_6,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-17.5714,skewY:162.4286,x:-1.05,y:188.5,regY:-53.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.5,skewX:-3.1438,skewY:176.8562,x:0.05,y:-76.8,regY:52.8}},{t:this.instance_3,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-49.178,x:-52.95,y:58.3,regX:40.5}},{t:this.instance_2,p:{regX:5.3,skewX:133.8022,skewY:-46.1978,x:-105.25,y:120.45,regY:-8.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_1,p:{regX:6.3,scaleX:0.998,scaleY:0.998,skewX:133.9048,skewY:-46.0952,x:-110.3,y:127.9}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-91.6785,x:-55.7,y:-21.75,regY:-0.1}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:107.5904,x:67.05,y:45.6}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-106.4619,skewY:73.5381,x:39.2,y:121.75,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.2,scaleX:0.9982,scaleY:0.9982,skewX:-82.6116,skewY:97.3884,x:45.8,y:131.15}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:-13.0551,y:92.2,x:-20.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:75.6271,x:47.6,y:-26.5,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.2,scaleX:0.9978,scaleY:0.9978,rotation:18.5003,x:14.75,y:93.5}},{t:this.instance_9,p:{regX:2.4,skewX:7.6923,skewY:-172.3077,x:-13.75,y:186.75,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.2766,x:-5.85,y:-57.95}},{t:this.instance_6,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-18.8466,skewY:161.1534,x:1.1,y:187.95,regY:-53.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.5,skewX:-3.341,skewY:176.659,x:0.05,y:-76.75,regY:52.9}},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-47.3783,x:-53.45,y:58.3,regX:40.5}},{t:this.instance_2,p:{regX:5.2,skewX:135.6007,skewY:-44.3993,x:-107.8,y:118.8,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_1,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:135.7037,skewY:-44.2963,x:-113,y:126.2}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-91.3122,x:-55.6,y:-21.75,regY:-0.1}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:106.2636,x:68.05,y:45.35}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-107.7899,skewY:72.2101,x:41.95,y:122.05,regY:7.9,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-83.9399,skewY:96.0601,x:49,y:131.3}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:-14.3304,y:92.25,x:-20.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:74.76,x:47.6,y:-26.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-2,regY:2.1,scaleX:0.9977,scaleY:0.9977,rotation:19.846,x:15,y:93.2}},{t:this.instance_9,p:{regX:2.4,skewX:8.2026,skewY:-171.7974,x:-15.6,y:185.8,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.2862,x:-5.85,y:-57.95}},{t:this.instance_6,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-20.1237,skewY:159.8763,x:3.25,y:187.5,regY:-53.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.5,skewX:-3.5383,skewY:176.4617,x:0,y:-76.7,regY:52.9}},{t:this.instance_3,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-45.581,x:-53.9,y:58.35,regX:40.5}},{t:this.instance_2,p:{regX:5.2,skewX:137.3998,skewY:-42.6002,x:-110.25,y:117.15,regY:-8.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_1,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:137.5014,skewY:-42.4986,x:-115.65,y:124.3}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-90.9478,x:-55.65,y:-21.75,regY:-0.1}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:107.6536,x:66.95,y:45.7}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-106.386,skewY:73.614,x:38.95,y:121.7,regY:7.9,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.2,scaleX:0.9982,scaleY:0.9982,skewX:-82.5268,skewY:97.4732,x:45.65,y:131.1}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:-12.9839,y:92.15,x:-20.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.4,rotation:75.6634,x:47.55,y:-26.65,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.2,scaleX:0.9978,scaleY:0.9978,rotation:18.4244,x:14.75,y:93.5}},{t:this.instance_9,p:{regX:2.4,skewX:7.6534,skewY:-172.3466,x:-13.65,y:186.75,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.2713,x:-5.8,y:-57.95}},{t:this.instance_6,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-18.7782,skewY:161.2218,x:0.9,y:188.05,regY:-53.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.5,skewX:-3.327,skewY:176.673,x:-0.05,y:-76.75,regY:52.9}},{t:this.instance_3,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-47.4564,x:-53.4,y:58.3,regX:40.5}},{t:this.instance_2,p:{regX:5.2,skewX:135.519,skewY:-44.481,x:-107.6,y:119,regY:-8.4,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_1,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:135.6157,skewY:-44.3843,x:-112.85,y:126.25}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-91.328,x:-55.75,y:-21.75,regY:-0.2}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:109.0443,x:65.8,y:45.95}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-104.9844,skewY:75.0156,x:36.1,y:121.25,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.9,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-81.1121,skewY:98.8879,x:42.55,y:130.8}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:-11.6366,y:92.2,x:-20.35,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:76.5663,x:47.65,y:-26.55,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:17.0015,x:14.45,y:93.55}},{t:this.instance_9,p:{regX:2.5,skewX:7.1036,skewY:-172.8963,x:-11.8,y:187.55,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.2573,x:-5.85,y:-57.95}},{t:this.instance_6,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-17.4315,skewY:162.5685,x:-1.35,y:188.55,regY:-53.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.5,skewX:-3.1166,skewY:176.8834,x:-0.05,y:-76.85,regY:52.8}},{t:this.instance_3,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-49.3314,x:-52.9,y:58.3,regX:40.5}},{t:this.instance_2,p:{regX:5.2,skewX:133.6381,skewY:-46.3619,x:-105.1,y:120.65,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_1,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:133.7301,skewY:-46.2699,x:-110.1,y:128.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-91.7065,x:-55.8,y:-21.75,regY:-0.2}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:110.4336,x:64.7,y:46.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-103.5813,skewY:76.4187,x:33,y:120.95,regY:7.9,regX:-6.1}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-79.6986,skewY:100.3014,x:39.3,y:130.6}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:-10.2896,y:92.2,x:-20.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:77.4696,x:47.55,y:-26.55,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:15.5793,x:14.15,y:93.7}},{t:this.instance_9,p:{regX:2.5,skewX:6.5558,skewY:-173.4442,x:-9.8,y:188.35,scaleX:0.9979,scaleY:0.9979,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.2424,x:-5.85,y:-57.95}},{t:this.instance_6,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-16.0868,skewY:163.9132,x:-3.6,y:189,regY:-53.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.5,skewX:-2.9062,skewY:177.0938,x:0,y:-76.85,regY:52.8}},{t:this.instance_3,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-51.2042,x:-52.35,y:58.3,regX:40.5}},{t:this.instance_2,p:{regX:5.2,skewX:131.7575,skewY:-48.2425,x:-102.55,y:122.3,regY:-8.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_1,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:131.8443,skewY:-48.1557,x:-107.25,y:129.95}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-92.086,x:-55.8,y:-21.75,regY:-0.2}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:111.825,x:63.55,y:46.5}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-102.1778,skewY:77.8222,x:30.15,y:120.3,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.9,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-78.2861,skewY:101.7139,x:36.2,y:130.05}},{t:this.instance_12,p:{regX:1.7,regY:-45.7,rotation:-8.9421,y:92.35,x:-20.35,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:78.3732,x:47.6,y:-26.55,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:14.157,x:13.75,y:93.9}},{t:this.instance_9,p:{regX:2.5,skewX:6.0067,skewY:-173.9933,x:-7.8,y:189.05,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.2284,x:-5.8,y:-57.95}},{t:this.instance_6,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-14.7408,skewY:165.2592,x:-5.85,y:189.35,regY:-53.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.5,skewX:-2.6959,skewY:177.3041,x:0.05,y:-76.75,regY:52.9}},{t:this.instance_3,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-53.08,x:-51.85,y:58.3,regX:40.5}},{t:this.instance_2,p:{regX:5.2,skewX:129.8767,skewY:-50.1233,x:-99.9,y:123.85,regY:-8.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_1,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:129.9577,skewY:-50.0423,x:-104.4,y:131.7}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-92.4664,x:-55.65,y:-21.8,regY:-0.1}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:113.215,x:62.4,y:46.7}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-100.7739,skewY:79.2261,x:27.25,y:119.7,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-76.8726,skewY:103.1274,x:32.95,y:129.75}},{t:this.instance_12,p:{regX:1.7,regY:-45.7,rotation:-7.5959,y:92.4,x:-20.45,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:79.2754,x:47.6,y:-26.55,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:12.7345,x:13.45,y:94.1}},{t:this.instance_9,p:{regX:2.4,skewX:5.4572,skewY:-174.5428,x:-5.7,y:189.6,scaleX:0.9978,scaleY:0.9978,regY:-53.3}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.2135,x:-5.85,y:-57.95}},{t:this.instance_6,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-13.3942,skewY:166.6058,x:-8.15,y:189.65,regY:-53.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.5,skewX:-2.4865,skewY:177.5135,x:0.05,y:-76.75,regY:52.9}},{t:this.instance_3,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-54.9562,x:-51.35,y:58.25,regX:40.5}},{t:this.instance_2,p:{regX:5.2,skewX:127.9953,skewY:-52.0047,x:-97.2,y:125.4,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_1,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:128.0717,skewY:-51.9283,x:-101.45,y:133.35}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-92.8478,x:-55.7,y:-21.75,regY:-0.1}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:114.6055,x:61.25,y:46.95}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-99.3721,skewY:80.6279,x:24.35,y:119.1,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-75.4584,skewY:104.5416,x:29.8,y:129.25}},{t:this.instance_12,p:{regX:1.8,regY:-45.8,rotation:-6.2489,y:92.2,x:-20.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_11,p:{regX:-31.3,rotation:80.1779,x:47.6,y:-26.55,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:11.3127,x:13.1,y:94.2}},{t:this.instance_9,p:{regX:2.4,skewX:4.909,skewY:-175.091,x:-3.65,y:190.3,scaleX:0.9979,scaleY:0.9979,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.1995,x:-5.85,y:-57.95}},{t:this.instance_6,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-12.0499,skewY:167.9501,x:-10.5,y:190,regY:-53.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.5,skewX:-2.2771,skewY:177.7229,x:0.1,y:-76.7,regY:52.9}},{t:this.instance_3,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-56.8303,x:-50.75,y:58.2,regX:40.5}},{t:this.instance_2,p:{regX:5.3,skewX:126.1149,skewY:-53.8851,x:-94.45,y:126.8,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_1,p:{regX:6.3,scaleX:0.998,scaleY:0.998,skewX:126.1863,skewY:-53.8137,x:-98.3,y:134.8}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-93.2268,x:-55.7,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:115.9955,x:60.1,y:47.15}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-97.9696,skewY:82.0304,x:21.4,y:118.35,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.2,scaleX:0.9982,scaleY:0.9982,skewX:-74.0437,skewY:105.9563,x:26.45,y:128.7}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:-4.9015,y:92.2,x:-20.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.2,rotation:81.0825,x:47.65,y:-26.35,scaleX:0.9984,scaleY:0.9983}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:9.8897,x:12.75,y:94.25}},{t:this.instance_9,p:{regX:2.4,skewX:4.3596,skewY:-175.6403,x:-1.6,y:190.7,scaleX:0.9978,scaleY:0.9978,regY:-53.3}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.1847,x:-5.8,y:-57.95}},{t:this.instance_6,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-10.7037,skewY:169.2962,x:-12.75,y:190.15,regY:-53.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.5,skewX:-2.066,skewY:177.934,x:0.05,y:-76.75,regY:52.9}},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-58.7052,x:-50.25,y:58.2,regX:40.5}},{t:this.instance_2,p:{regX:5.2,skewX:124.2346,skewY:-55.7654,x:-91.7,y:128.15,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_1,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:124.3006,skewY:-55.6994,x:-95.3,y:136.45}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-93.6067,x:-55.75,y:-21.75,regY:-0.1}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:117.3872,x:58.95,y:47.35}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-96.5659,skewY:83.4341,x:18.55,y:117.65,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.4,scaleX:0.9982,scaleY:0.9982,skewX:-72.6304,skewY:107.3696,x:23.6,y:128.05}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:-3.5554,y:92.15,x:-20.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:81.9848,x:47.65,y:-26.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:8.4696,x:12.4,y:94.45}},{t:this.instance_9,p:{regX:2.4,skewX:3.8106,skewY:-176.1894,x:0.45,y:191.35,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.1707,x:-5.85,y:-57.95}},{t:this.instance_6,p:{regX:2.9,scaleX:0.998,scaleY:0.998,skewX:-9.3589,skewY:170.6411,x:-14.95,y:190.25,regY:-53.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.5,skewX:-1.8559,skewY:178.1441,x:0.05,y:-76.9,regY:52.8}},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-60.5802,x:-49.7,y:58.2,regX:40.5}},{t:this.instance_2,p:{regX:5.3,skewX:122.3543,skewY:-57.6457,x:-88.7,y:129.4,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_1,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:122.414,skewY:-57.586,x:-92.15,y:137.8}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-93.9868,x:-55.75,y:-21.75,regY:-0.1}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:118.7779,x:57.8,y:47.55}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-95.1634,skewY:84.8366,x:15.65,y:116.9,regY:8,regX:-6.1}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-71.2169,skewY:108.7831,x:20.35,y:127.25}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:-2.2075,y:92.2,x:-20.45,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.2,rotation:82.8885,x:47.65,y:-26.35,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:7.0468,x:12.05,y:94.7}},{t:this.instance_9,p:{regX:2.5,skewX:3.2619,skewY:-176.738,x:2.25,y:191.7,scaleX:0.9979,scaleY:0.9979,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.6,scaleX:0.999,scaleY:0.999,rotation:-0.1558,x:-6,y:-57.95}},{t:this.instance_6,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-8.0136,skewY:171.9864,x:-17.35,y:190.4,regY:-53.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.5,skewX:-1.6448,skewY:178.3552,x:0.05,y:-76.9,regY:52.8}},{t:this.instance_3,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-62.4553,x:-49.2,y:58.15,regX:40.5}},{t:this.instance_2,p:{regX:5.2,skewX:120.4734,skewY:-59.5266,x:-85.75,y:130.75,regY:-8.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_1,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:120.5281,skewY:-59.4719,x:-89.05,y:139.1}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-94.3663,x:-55.85,y:-21.75,regY:-0.2}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:120.1678,x:56.6,y:47.7}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-93.7596,skewY:86.2404,x:12.8,y:115.9,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-69.8046,skewY:110.1954,x:17.3,y:126.55}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:-0.8609,y:92.15,x:-20.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:83.7913,x:47.6,y:-26.5,scaleX:0.9984,scaleY:0.9983}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:5.6247,x:11.7,y:94.85}},{t:this.instance_9,p:{regX:2.4,skewX:2.7127,skewY:-177.2873,x:4.4,y:192.1,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.1418,x:-5.85,y:-57.95}},{t:this.instance_6,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-6.6675,skewY:173.3325,x:-19.65,y:190.45,regY:-53.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.5,skewX:-1.4347,skewY:178.5653,x:0.05,y:-76.9,regY:52.8}},{t:this.instance_3,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-64.3308,x:-48.6,y:58.05,regX:40.5}},{t:this.instance_2,p:{regX:5.2,skewX:118.5919,skewY:-61.4081,x:-82.95,y:131.8,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_1,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:118.643,skewY:-61.357,x:-85.8,y:140.25}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-94.7484,x:-55.7,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:121.558,x:55.45,y:47.85}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-92.3564,skewY:87.6436,x:10.05,y:114.95,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.2,scaleX:0.9982,scaleY:0.9982,skewX:-68.3899,skewY:111.6101,x:14.1,y:125.7}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:0.4817,y:92.25,x:-20.45,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:84.6943,x:47.6,y:-26.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:4.2017,x:11.35,y:94.95}},{t:this.instance_9,p:{regX:2.4,skewX:2.1637,skewY:-177.8363,x:6.5,y:192.4,scaleX:0.9979,scaleY:0.9979,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.1269,x:-5.9,y:-57.95}},{t:this.instance_6,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-5.3216,skewY:174.6784,x:-21.95,y:190.45,regY:-53.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.5,skewX:-1.2254,skewY:178.7746,x:0.1,y:-76.75,regY:52.9}},{t:this.instance_3,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-66.2058,x:-48.1,y:58.05,regX:40.5}},{t:this.instance_2,p:{regX:5.2,skewX:116.7108,skewY:-63.2892,x:-80.05,y:132.8,regY:-8.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_1,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:116.7562,skewY:-63.2438,x:-82.55,y:141.4}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-95.1274,x:-55.75,y:-21.75,regY:-0.1}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:122.9494,x:54.3,y:48}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-90.9537,skewY:89.0463,x:7.35,y:113.95,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-66.9774,skewY:113.0226,x:11.1,y:124.8}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:1.8281,y:92.15,x:-20.45,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:85.5979,x:47.65,y:-26.45,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:2.7804,x:11.05,y:95.1}},{t:this.instance_9,p:{regX:2.4,skewX:1.6159,skewY:-178.3841,x:8.55,y:192.65,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.1129,x:-5.9,y:-57.95}},{t:this.instance_6,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-3.9758,skewY:176.0242,x:-24.3,y:190.4,regY:-53.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.5,skewX:-1.0145,skewY:178.9855,x:0.15,y:-76.75,regY:52.9}},{t:this.instance_3,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-68.0816,x:-47.6,y:58,regX:40.5}},{t:this.instance_2,p:{regX:5.2,skewX:114.8301,skewY:-65.1699,x:-77.05,y:133.8,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_1,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:114.8713,skewY:-65.1287,x:-79.3,y:142.5}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-95.5074,x:-55.75,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:124.3396,x:53.15,y:48}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,skewX:-89.5551,skewY:90.4449,x:4.55,y:112.9,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-65.562,skewY:114.438,x:8.15,y:123.8}},{t:this.instance_12,p:{regX:1.8,regY:-45.8,rotation:3.1754,y:92.2,x:-20.35,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:86.5011,x:47.65,y:-26.55,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:1.3574,x:10.7,y:95.2}},{t:this.instance_9,p:{regX:2.4,skewX:1.0663,skewY:-178.9337,x:10.6,y:192.6,scaleX:0.9978,scaleY:0.9978,regY:-53.3}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.0989,x:-5.8,y:-57.95}},{t:this.instance_6,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-2.6316,skewY:177.3684,x:-26.6,y:190.2,regY:-53.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.5,skewX:-0.8053,skewY:179.1947,x:0.15,y:-76.75,regY:52.9}},{t:this.instance_3,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-69.9556,x:-47.1,y:57.9,regX:40.5}},{t:this.instance_2,p:{regX:5.3,skewX:112.95,skewY:-67.05,x:-74,y:134.6,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_1,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:112.9852,skewY:-67.0148,x:-76,y:143.45}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-95.8876,x:-55.7,y:-21.8,regY:-0.1}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:125.73,x:52,y:48.15}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-88.1519,skewY:91.8481,x:1.85,y:111.75,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-64.1494,skewY:115.8506,x:5.05,y:122.75}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:4.5228,y:92.15,x:-20.55,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.2,rotation:87.4035,x:47.65,y:-26.35,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:-0.0596,x:10.3,y:95.35}},{t:this.instance_9,p:{regX:2.4,skewX:0.5169,skewY:-179.4831,x:12.7,y:192.85,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.0858,x:-5.85,y:-57.95}},{t:this.instance_6,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-1.2861,skewY:178.7139,x:-28.85,y:190.05,regY:-53.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.5,skewX:-0.5943,skewY:179.4057,x:0.05,y:-76.75,regY:52.9}},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-71.8309,x:-46.55,y:57.85,regX:40.5}},{t:this.instance_2,p:{regX:5.2,skewX:111.0694,skewY:-68.9306,x:-70.9,y:135.45,regY:-8.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_1,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:111.0996,skewY:-68.9004,x:-72.65,y:144.3}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-96.2674,x:-55.75,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:127.1211,x:50.8,y:48.15}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-86.7492,skewY:93.2508,x:-0.95,y:110.6,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9981,scaleY:0.9981,skewX:-62.7361,skewY:117.2639,x:2.2,y:121.65}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:5.8693,y:92.15,x:-20.45,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:88.3079,x:47.65,y:-26.5,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:-1.4818,x:9.95,y:95.45}},{t:this.instance_9,p:{regX:2.5,skewX:-0.0272,skewY:179.9728,x:14.65,y:192.85,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.0709,x:-5.85,y:-57.95}},{t:this.instance_6,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:0.0552,skewY:-179.9448,x:-31.2,y:189.8,regY:-53.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.5,skewX:-0.3834,skewY:179.6166,x:0.1,y:-76.75,regY:52.9}},{t:this.instance_3,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-73.7057,x:-46,y:57.8,regX:40.5}},{t:this.instance_2,p:{regX:5.2,skewX:109.1877,skewY:-70.8123,x:-67.85,y:136.1,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_1,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:109.2128,skewY:-70.7872,x:-69.3,y:144.95}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-96.6482,x:-55.75,y:-21.65,regY:-0.1}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:128.5113,x:49.6,y:48.15}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-85.3455,skewY:94.6545,x:-3.6,y:109.55,regY:8,regX:-6.1}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9981,scaleY:0.9981,skewX:-61.3228,skewY:118.6772,x:-0.75,y:120.5}},{t:this.instance_12,p:{regX:1.8,regY:-45.8,rotation:7.2163,y:92.25,x:-20.45,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:89.2101,x:47.6,y:-26.45,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:-2.9041,x:9.6,y:95.6}},{t:this.instance_9,p:{regX:2.4,skewX:-0.5774,skewY:179.4226,x:16.75,y:192.7,scaleX:0.9979,scaleY:0.9979,regY:-53.3}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.056,x:-5.8,y:-58}},{t:this.instance_6,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:1.4009,skewY:-178.5991,x:-33.55,y:189.6,regY:-53.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.5,skewX:-0.1742,skewY:179.8258,x:0.05,y:-76.75,regY:52.9}},{t:this.instance_3,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-75.5803,x:-45.5,y:57.8,regX:40.5}},{t:this.instance_2,p:{regX:5.2,skewX:107.3074,skewY:-72.6926,x:-64.8,y:136.7,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_1,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:107.3271,skewY:-72.6729,x:-65.9,y:145.6}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-97.0276,x:-55.75,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:129.9012,x:48.45,y:48.3}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-83.9425,skewY:96.0575,x:-6.25,y:108.15,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-59.9086,skewY:120.0914,x:-3.65,y:119.25}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:8.5627,y:92.15,x:-20.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:90.1086,x:47.65,y:-26.5,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:-4.3264,x:9.2,y:95.75}},{t:this.instance_9,p:{regX:2.4,skewX:-1.1251,skewY:178.8749,x:18.8,y:192.75,scaleX:0.9979,scaleY:0.9979,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.042,x:-5.8,y:-58}},{t:this.instance_6,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:2.7456,skewY:-177.2544,x:-35.85,y:189.2,regY:-53.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.5,skewX:0.0315,skewY:-179.9685,x:0.05,y:-76.75,regY:52.9}},{t:this.instance_3,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-77.4558,x:-44.95,y:57.75,regX:40.5}},{t:this.instance_2,p:{regX:5.2,skewX:105.427,skewY:-74.573,x:-61.6,y:137.25,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_1,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:105.4416,skewY:-74.5584,x:-62.5,y:146.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-97.4081,x:-55.75,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:131.2915,x:47.3,y:48.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-82.5394,skewY:97.4606,x:-8.9,y:106.75,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.2,scaleX:0.9982,scaleY:0.9982,skewX:-58.4953,skewY:121.5047,x:-6.7,y:117.9}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:9.9107,y:92.15,x:-20.6,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.4,rotation:91.0124,x:47.65,y:-26.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-2,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:-5.7488,x:8.75,y:95.85}},{t:this.instance_9,p:{regX:2.4,skewX:-1.6737,skewY:178.3263,x:20.85,y:192.55,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,scaleX:0.9989,scaleY:0.9989,rotation:-0.028,x:-5.8,y:-58}},{t:this.instance_6,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:4.0919,skewY:-175.9081,x:-38.1,y:188.85,regY:-53.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.5,skewX:0.2424,skewY:-179.7576,x:0.15,y:-76.75,regY:52.9}},{t:this.instance_3,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-79.3308,x:-44.45,y:57.5,regX:40.6}},{t:this.instance_2,p:{regX:5.2,skewX:103.5462,skewY:-76.4538,x:-58.6,y:137.75,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_1,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:103.555,skewY:-76.445,x:-59.05,y:146.65}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-97.7878,x:-55.75,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:132.6825,x:46.05,y:48.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-81.1363,skewY:98.8637,x:-11.45,y:105.4,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-57.0817,skewY:122.9183,x:-9.45,y:116.65}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:11.2569,y:92.15,x:-20.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:91.9147,x:47.65,y:-26.5,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-2,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:-7.1712,x:8.45,y:95.95}},{t:this.instance_9,p:{regX:2.4,skewX:-2.2225,skewY:177.7775,x:22.9,y:192.35,scaleX:0.9979,scaleY:0.9979,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,scaleX:0.9989,scaleY:0.9989,rotation:-0.0131,x:-5.75,y:-58}},{t:this.instance_6,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:5.4368,skewY:-174.5632,x:-40.4,y:188.4,regY:-53.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.5,skewX:0.4534,skewY:-179.5466,x:0.1,y:-76.7,regY:52.9}},{t:this.instance_3,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-81.2052,x:-43.9,y:57.5,regX:40.5}},{t:this.instance_2,p:{regX:5.2,skewX:101.6651,skewY:-78.3349,x:-55.45,y:138.05,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_1,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:101.669,skewY:-78.331,x:-55.6,y:147.05}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-98.1683,x:-55.7,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:134.0728,x:44.9,y:48.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-79.7347,skewY:100.2653,x:-14.05,y:103.9,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-55.6688,skewY:124.3312,x:-12.3,y:115.25}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:12.6025,y:92.15,x:-20.65,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:92.8183,x:47.65,y:-26.5,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:-8.5918,x:8.2,y:96}},{t:this.instance_9,p:{regX:2.4,skewX:-2.7715,skewY:177.2285,x:24.9,y:192.15,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.0009,x:-5.8,y:-58.05}},{t:this.instance_6,p:{regX:2.9,scaleX:0.998,scaleY:0.998,skewX:6.7811,skewY:-173.2188,x:-42.6,y:187.85,regY:-53.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.5,skewX:0.6617,skewY:-179.3383,x:0.25,y:-76.75,regY:52.9}},{t:this.instance_3,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-83.0804,x:-43.4,y:57.5,regX:40.5}},{t:this.instance_2,p:{regX:5.2,skewX:99.7835,skewY:-80.2165,x:-52.15,y:138.3,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_1,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:99.7832,skewY:-80.2168,x:-52.05,y:147.3}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-98.5473,x:-55.7,y:-21.65,regY:-0.1}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-142.6,-205.8,220.2,513.2);


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
	this.instance = new lib.ch1_uArm_rcopy_1("synched",0);
	this.instance.setTransform(-57.45,-22.95,0.9984,0.9984,-96.0919,0,0,35.4,0.1);

	this.instance_1 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_1.setTransform(-116.4,114.45,0.9983,0.9983,0,124.6947,-55.3053,6.6,-1.5);

	this.instance_2 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_2.setTransform(-109.2,110.65,0.9984,0.9984,0,159.2764,-20.7236,5.5,-9.1);

	this.instance_3 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_3.setTransform(-49.2,50.55,0.9985,0.9985,-43.8427,0,0,44,0);

	this.instance_4 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_4.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_5 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_5.setTransform(-3.65,182.2,0.9983,0.9983,0,-22.7945,157.2055,1.8,-55.5);

	this.instance_6 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_6.setTransform(-5.6,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_7 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_7.setTransform(-23.15,181.55,0.9979,0.9979,0,10.6587,-169.3413,3.1,-53.4);

	this.instance_8 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_8.setTransform(15.9,92.55,0.998,0.998,22.6213,0,0,-1,1.4);

	this.instance_9 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_9.setTransform(84.45,133.25,0.9985,0.9985,0,-96.4018,83.5982,-4.9,3.2);

	this.instance_10 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_10.setTransform(79.35,123.45,0.9985,0.9985,0,-99.5494,80.4506,-6,8.4);

	this.instance_11 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_11.setTransform(70.5,40.05,0.9984,0.9984,81.8892,0,0,-39.7,-1);

	this.instance_12 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_12.setTransform(47.9,-26.2,0.9984,0.9984,71.1253,0,0,-31.2,-1.4);

	this.instance_13 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_13.setTransform(-26.65,89.85,0.9984,0.9984,-14.3425,0,0,1.8,-46);

	this.instance_14 = new lib.ch1_headcopy("synched",0);
	this.instance_14.setTransform(-0.7,-79.45,0.9991,0.9991,0,-1.7225,178.2775,-0.1,52.8);

	this.instance_15 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_15.setTransform(-5.6,-57.7,0.9991,0.9991,-1.6733,0,0,-1.1,9.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{regX:-1.1,rotation:-1.6733,x:-5.6,y:-57.7,regY:9.2}},{t:this.instance_14,p:{scaleX:0.9991,scaleY:0.9991,skewX:-1.7225,skewY:178.2775,x:-0.7,y:-79.45}},{t:this.instance_13,p:{regY:-46,scaleX:0.9984,scaleY:0.9984,rotation:-14.3425,x:-26.65,y:89.85,regX:1.8}},{t:this.instance_12,p:{rotation:71.1253,x:47.9,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_11,p:{regX:-39.7,regY:-1,rotation:81.8892,x:70.5,y:40.05}},{t:this.instance_10,p:{regY:8.4,scaleX:0.9985,scaleY:0.9985,skewX:-99.5494,skewY:80.4506,x:79.35,y:123.45,regX:-6}},{t:this.instance_9,p:{regY:3.2,scaleX:0.9985,scaleY:0.9985,skewX:-96.4018,skewY:83.5982,x:84.45,y:133.25,regX:-4.9}},{t:this.instance_8,p:{regY:1.4,scaleX:0.998,scaleY:0.998,rotation:22.6213,x:15.9,y:92.55,regX:-1}},{t:this.instance_7,p:{regY:-53.4,scaleX:0.9979,scaleY:0.9979,skewX:10.6587,skewY:-169.3413,x:-23.15,y:181.55,regX:3.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9983,scaleY:0.9983,skewX:-22.7945,skewY:157.2055,x:-3.65,y:182.2,regX:1.8,regY:-55.5}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-43.8427,x:-49.2,y:50.55,regX:44,regY:0}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,skewX:159.2764,skewY:-20.7236,x:-109.2,y:110.65,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,skewX:124.6947,skewY:-55.3053,x:-116.4,y:114.45,regX:6.6,regY:-1.5}},{t:this.instance,p:{rotation:-96.0919,x:-57.45,y:-22.95,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]}).to({state:[{t:this.instance_15,p:{regX:-1.2,rotation:-1.7128,x:-5.7,y:-57.65,regY:9.2}},{t:this.instance_14,p:{scaleX:0.999,scaleY:0.999,skewX:-1.9721,skewY:178.0279,x:-0.65,y:-79.45}},{t:this.instance_13,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-13.063,x:-26.9,y:89.75,regX:1.8}},{t:this.instance_12,p:{rotation:71.6102,x:47.95,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_11,p:{regX:-39.6,regY:-1.1,rotation:83.411,x:70,y:40.35}},{t:this.instance_10,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-98.0288,skewY:81.9712,x:76.6,y:123.75,regX:-6}},{t:this.instance_9,p:{regY:3.3,scaleX:0.9984,scaleY:0.9984,skewX:-94.8789,skewY:85.1211,x:81.45,y:133.75,regX:-4.9}},{t:this.instance_8,p:{regY:1.6,scaleX:0.9979,scaleY:0.9979,rotation:21.3034,x:15.8,y:92.75,regX:-1}},{t:this.instance_7,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:9.341,skewY:-170.659,x:-20.95,y:182.4,regX:3.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,skewX:-21.5147,skewY:158.4853,x:-6,y:182.5,regX:1.8,regY:-55.5}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-45.9858,x:-47.7,y:50.4,regX:44,regY:0}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:157.1349,skewY:-22.8651,x:-105.35,y:112.6,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:122.5522,skewY:-57.4478,x:-112.5,y:116.7,regX:6.6,regY:-1.5}},{t:this.instance,p:{rotation:-97.2386,x:-57.4,y:-22.9,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.2,rotation:-1.7548,x:-5.65,y:-57.65,regY:9.2}},{t:this.instance_14,p:{scaleX:0.999,scaleY:0.999,skewX:-2.2235,skewY:177.7765,x:-0.7,y:-79.45}},{t:this.instance_13,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-11.7833,x:-27.1,y:89.65,regX:1.8}},{t:this.instance_12,p:{rotation:72.0929,x:47.95,regX:-31.3,y:-26.3,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_11,p:{regX:-39.8,regY:-1.1,rotation:84.9338,x:69.45,y:40.35}},{t:this.instance_10,p:{regY:8.6,scaleX:0.9984,scaleY:0.9984,skewX:-96.5078,skewY:83.4922,x:74,y:124.15,regX:-6}},{t:this.instance_9,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-93.3583,skewY:86.6417,x:78.25,y:134.15,regX:-4.9}},{t:this.instance_8,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:19.9842,x:15.85,y:92.55,regX:-1}},{t:this.instance_7,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:8.0212,skewY:-171.9788,x:-18.9,y:183.2,regX:3.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,skewX:-20.235,skewY:159.765,x:-8.4,y:182.8,regX:1.8,regY:-55.5}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-48.1285,x:-46.2,y:50.2,regX:44,regY:0}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:154.9923,skewY:-25.0077,x:-101.5,y:114.6,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:120.4091,skewY:-59.5909,x:-108.4,y:118.8,regX:6.7,regY:-1.5}},{t:this.instance,p:{rotation:-98.3858,x:-57.45,y:-22.85,regX:35.3,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.2,rotation:-1.7969,x:-5.7,y:-57.65,regY:9.2}},{t:this.instance_14,p:{scaleX:0.999,scaleY:0.999,skewX:-2.4748,skewY:177.5252,x:-0.65,y:-79.4}},{t:this.instance_13,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-10.5033,x:-27.3,y:89.5,regX:1.8}},{t:this.instance_12,p:{rotation:72.5753,x:47.9,regX:-31.2,y:-26.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_11,p:{regX:-39.6,regY:-1.1,rotation:86.4539,x:68.9,y:40.75}},{t:this.instance_10,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-94.9861,skewY:85.0139,x:71.1,y:124.4,regX:-6}},{t:this.instance_9,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-91.8374,skewY:88.1626,x:75.2,y:134.6,regX:-4.9}},{t:this.instance_8,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:18.6657,x:15.85,y:92.6,regX:-1}},{t:this.instance_7,p:{regY:-53.2,scaleX:0.9978,scaleY:0.9978,skewX:6.7031,skewY:-173.2969,x:-16.75,y:184.05,regX:3.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,skewX:-18.9543,skewY:161.0457,x:-10.8,y:183.1,regX:1.9,regY:-55.5}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-50.2712,x:-44.65,y:49.9,regX:44.1,regY:0}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,skewX:152.8483,skewY:-27.1517,x:-97.6,y:116.35,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:118.2656,skewY:-61.7344,x:-104.5,y:120.85,regX:6.6,regY:-1.4}},{t:this.instance,p:{rotation:-99.5332,x:-57.45,y:-22.9,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.2,rotation:-1.8388,x:-5.7,y:-57.65,regY:9.2}},{t:this.instance_14,p:{scaleX:0.999,scaleY:0.999,skewX:-2.7254,skewY:177.2746,x:-0.75,y:-79.45}},{t:this.instance_13,p:{regY:-46,scaleX:0.9983,scaleY:0.9983,rotation:-9.2232,x:-27.6,y:89.3,regX:1.8}},{t:this.instance_12,p:{rotation:73.0586,x:47.9,regX:-31.2,y:-26.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_11,p:{regX:-39.7,regY:-1.1,rotation:87.975,x:68.3,y:40.8}},{t:this.instance_10,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-93.4652,skewY:86.5348,x:68.3,y:124.6,regX:-6}},{t:this.instance_9,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-90.3161,skewY:89.6839,x:72.15,y:134.9,regX:-4.9}},{t:this.instance_8,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:17.3463,x:15.95,y:92.6,regX:-1}},{t:this.instance_7,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:5.385,skewY:-174.615,x:-14.6,y:184.65,regX:3.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,skewX:-17.6763,skewY:162.3237,x:-13.05,y:183.3,regX:1.8,regY:-55.5}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-52.4139,x:-43.25,y:49.65,regX:44,regY:0}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:150.7062,skewY:-29.2938,x:-93.6,y:117.95,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:116.1228,skewY:-63.8772,x:-100.2,y:122.8,regX:6.6,regY:-1.5}},{t:this.instance,p:{rotation:-100.6817,x:-57.4,y:-22.95,regX:35.4,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.2,rotation:-1.8817,x:-5.7,y:-57.65,regY:9.2}},{t:this.instance_14,p:{scaleX:0.999,scaleY:0.999,skewX:-2.9769,skewY:177.0231,x:-0.7,y:-79.45}},{t:this.instance_13,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-7.9441,x:-27.8,y:89.25,regX:1.8}},{t:this.instance_12,p:{rotation:73.5412,x:47.95,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_11,p:{regX:-39.7,regY:-1.1,rotation:89.4956,x:67.75,y:40.9}},{t:this.instance_10,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-91.9434,skewY:88.0566,x:65.55,y:124.7,regX:-6}},{t:this.instance_9,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-88.7994,skewY:91.2006,x:69.1,y:135.1,regX:-4.9}},{t:this.instance_8,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:16.0275,x:16,y:92.5,regX:-1}},{t:this.instance_7,p:{regY:-53.2,scaleX:0.9979,scaleY:0.9979,skewX:4.0653,skewY:-175.9347,x:-12.6,y:185.45,regX:3.2}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,skewX:-16.3955,skewY:163.6043,x:-15.4,y:183.5,regX:1.8,regY:-55.5}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-54.5576,x:-41.95,y:49.35,regX:44,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:148.563,skewY:-31.437,x:-89.55,y:119.55,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:113.9795,skewY:-66.0205,x:-96.05,y:124.6,regX:6.6,regY:-1.5}},{t:this.instance,p:{rotation:-101.8279,x:-57.45,y:-22.95,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.2,rotation:-1.9238,x:-5.7,y:-57.75,regY:9.1}},{t:this.instance_14,p:{scaleX:0.999,scaleY:0.999,skewX:-3.2276,skewY:176.7724,x:-0.8,y:-79.45}},{t:this.instance_13,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-6.6648,x:-27.9,y:89.2,regX:1.9}},{t:this.instance_12,p:{rotation:74.0251,x:47.95,regX:-31.2,y:-26.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_11,p:{regX:-39.8,regY:-1.1,rotation:91.0132,x:67.1,y:40.95}},{t:this.instance_10,p:{regY:8.5,scaleX:0.9985,scaleY:0.9985,skewX:-90.4221,skewY:89.5779,x:62.7,y:124.8,regX:-6}},{t:this.instance_9,p:{regY:3.3,scaleX:0.9984,scaleY:0.9984,skewX:-87.2774,skewY:92.7226,x:66.15,y:135.3,regX:-4.9}},{t:this.instance_8,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:14.7082,x:16,y:92.55,regX:-1}},{t:this.instance_7,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:2.747,skewY:-177.253,x:-10.3,y:186,regX:3.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,skewX:-15.1161,skewY:164.8839,x:-17.7,y:183.55,regX:1.8,regY:-55.5}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-56.6997,x:-40.35,y:49.1,regX:44,regY:0}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:146.4197,skewY:-33.5803,x:-85.55,y:120.9,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:111.8352,skewY:-68.1648,x:-91.7,y:126.25,regX:6.6,regY:-1.5}},{t:this.instance,p:{rotation:-102.9757,x:-57.45,y:-22.95,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.2,rotation:-1.9658,x:-5.7,y:-57.75,regY:9.1}},{t:this.instance_14,p:{scaleX:0.999,scaleY:0.999,skewX:-3.48,skewY:176.52,x:-0.75,y:-79.45}},{t:this.instance_13,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-5.3843,x:-28.25,y:89.05,regX:1.8}},{t:this.instance_12,p:{rotation:74.5075,x:47.9,regX:-31.2,y:-26.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_11,p:{regX:-39.7,regY:-1.1,rotation:92.5333,x:66.6,y:41.3}},{t:this.instance_10,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-88.9063,skewY:91.0937,x:59.95,y:124.8,regX:-6}},{t:this.instance_9,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-85.757,skewY:94.243,x:62.95,y:135.4,regX:-4.9}},{t:this.instance_8,p:{regY:1.4,scaleX:0.9979,scaleY:0.9979,rotation:13.3896,x:16.05,y:92.4,regX:-1}},{t:this.instance_7,p:{regY:-53.3,scaleX:0.9979,scaleY:0.9979,skewX:1.4274,skewY:-178.5726,x:-8.2,y:186.55,regX:3.2}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,skewX:-13.8359,skewY:166.1641,x:-20,y:183.7,regX:1.8,regY:-55.5}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-58.8439,x:-38.9,y:48.7,regX:44,regY:0}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:144.2763,skewY:-35.7237,x:-81.35,y:122.25,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:109.693,skewY:-70.307,x:-87.5,y:127.75,regX:6.6,regY:-1.4}},{t:this.instance,p:{rotation:-104.1233,x:-57.45,y:-22.9,regX:35.3,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.2,rotation:-2.007,x:-5.7,y:-57.75,regY:9.1}},{t:this.instance_14,p:{scaleX:0.999,scaleY:0.999,skewX:-3.7308,skewY:176.2692,x:-0.7,y:-79.45}},{t:this.instance_13,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-4.1039,x:-28.5,y:88.9,regX:1.8}},{t:this.instance_12,p:{rotation:74.9914,x:47.95,regX:-31.2,y:-26.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_11,p:{regX:-39.8,regY:-1.1,rotation:94.0542,x:66.05,y:41.35}},{t:this.instance_10,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-87.3853,skewY:92.6147,x:57.15,y:124.75,regX:-6}},{t:this.instance_9,p:{regY:3.3,scaleX:0.9984,scaleY:0.9984,skewX:-84.2363,skewY:95.7637,x:60,y:135.6,regX:-4.8}},{t:this.instance_8,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:12.0703,x:16,y:92.5,regX:-1}},{t:this.instance_7,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:0.1086,skewY:-179.8914,x:-5.9,y:187.05,regX:3.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,skewX:-12.5557,skewY:167.4441,x:-22.4,y:183.75,regX:1.8,regY:-55.5}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-60.9858,x:-37.5,y:48.35,regX:44,regY:0}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:142.1326,skewY:-37.8674,x:-77.05,y:123.35,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:107.5503,skewY:-72.4497,x:-82.85,y:129.05,regX:6.7,regY:-1.6}},{t:this.instance,p:{rotation:-105.2714,x:-57.45,y:-23,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.2,rotation:-2.0499,x:-5.65,y:-57.75,regY:9.1}},{t:this.instance_14,p:{scaleX:0.999,scaleY:0.999,skewX:-3.9817,skewY:176.0183,x:-0.8,y:-79.45}},{t:this.instance_13,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-2.8246,x:-28.7,y:88.8,regX:1.8}},{t:this.instance_12,p:{rotation:75.4731,x:47.9,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_11,p:{regX:-39.7,regY:-1.1,rotation:95.5764,x:65.45,y:41.6}},{t:this.instance_10,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-85.8634,skewY:94.1366,x:54.35,y:124.65,regX:-6}},{t:this.instance_9,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-82.714,skewY:97.286,x:56.75,y:135.4,regX:-4.9}},{t:this.instance_8,p:{regY:1.4,scaleX:0.9979,scaleY:0.9979,rotation:10.7517,x:15.95,y:92.35,regX:-1.1}},{t:this.instance_7,p:{regY:-53.3,scaleX:0.9979,scaleY:0.9979,skewX:-1.2057,skewY:178.7943,x:-3.75,y:187.5,regX:3.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,skewX:-11.2775,skewY:168.7225,x:-24.75,y:183.65,regX:1.8,regY:-55.5}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-63.1303,x:-36.1,y:47.9,regX:44,regY:0}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:139.9898,skewY:-40.0102,x:-72.9,y:124.3,regY:-9}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:105.4075,skewY:-74.5925,x:-78.45,y:130.4,regX:6.6,regY:-1.5}},{t:this.instance,p:{rotation:-106.4183,x:-57.4,y:-23,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.2,rotation:-2.0919,x:-5.65,y:-57.75,regY:9.1}},{t:this.instance_14,p:{scaleX:0.999,scaleY:0.999,skewX:-4.2335,skewY:175.7665,x:-0.75,y:-79.45}},{t:this.instance_13,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-1.545,x:-28.95,y:88.65,regX:1.8}},{t:this.instance_12,p:{rotation:75.9576,x:47.9,regX:-31.2,y:-26.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_11,p:{regX:-39.7,regY:-1.1,rotation:97.0971,x:64.9,y:41.75}},{t:this.instance_10,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-84.3412,skewY:95.6588,x:51.6,y:124.5,regX:-6}},{t:this.instance_9,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-81.1929,skewY:98.8071,x:53.75,y:135.25,regX:-4.9}},{t:this.instance_8,p:{regY:1.6,scaleX:0.9979,scaleY:0.9979,rotation:9.4321,x:16.1,y:92.6,regX:-1}},{t:this.instance_7,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:-2.5233,skewY:177.4767,x:-1.5,y:187.9,regX:3.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,skewX:-9.997,skewY:170.003,x:-27.1,y:183.6,regX:1.8,regY:-55.5}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-65.2739,x:-34.7,y:47.45,regX:44,regY:0}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:137.8465,skewY:-42.1535,x:-68.6,y:125.15,regY:-9}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:103.2643,skewY:-76.7357,x:-73.95,y:131.45,regX:6.6,regY:-1.5}},{t:this.instance,p:{rotation:-107.5659,x:-57.4,y:-23,regX:35.4,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.2,rotation:-2.1339,x:-5.65,y:-57.75,regY:9.1}},{t:this.instance_14,p:{scaleX:0.999,scaleY:0.999,skewX:-4.4854,skewY:175.5146,x:-0.8,y:-79.45}},{t:this.instance_13,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-0.2653,x:-29.2,y:88.55,regX:1.8}},{t:this.instance_12,p:{rotation:76.4393,x:47.9,regX:-31.3,y:-26.35,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_11,p:{regX:-39.7,regY:-1.1,rotation:98.6184,x:64.3,y:41.85}},{t:this.instance_10,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-82.821,skewY:97.179,x:48.8,y:124.25,regX:-6}},{t:this.instance_9,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-79.6733,skewY:100.3267,x:50.65,y:135.2,regX:-4.8}},{t:this.instance_8,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:8.1137,x:16.15,y:92.45,regX:-1}},{t:this.instance_7,p:{regY:-53.3,scaleX:0.9979,scaleY:0.9979,skewX:-3.8431,skewY:176.1569,x:0.7,y:188.3,regX:3.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,skewX:-8.7169,skewY:171.2831,x:-29.55,y:183.5,regX:1.9,regY:-55.5}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-67.4158,x:-33.25,y:47.05,regX:44,regY:0}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,skewX:135.7035,skewY:-44.2965,x:-64.2,y:126,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,skewX:101.1215,skewY:-78.8785,x:-69.5,y:132.5,regX:6.5,regY:-1.4}},{t:this.instance,p:{rotation:-108.7133,x:-57.4,y:-22.95,regX:35.4,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.2,rotation:-2.176,x:-5.65,y:-57.75,regY:9.1}},{t:this.instance_14,p:{scaleX:0.999,scaleY:0.999,skewX:-4.7365,skewY:175.2635,x:-0.75,y:-79.5}},{t:this.instance_13,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:1.0107,x:-29.45,y:88.4,regX:1.8}},{t:this.instance_12,p:{rotation:76.9231,x:47.85,regX:-31.2,y:-26.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_11,p:{regX:-39.7,regY:-1.1,rotation:100.1407,x:63.7,y:42.05}},{t:this.instance_10,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-81.2986,skewY:98.7014,x:46.05,y:124.05,regX:-5.9}},{t:this.instance_9,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-78.1512,skewY:101.8488,x:47.65,y:134.75,regX:-4.9}},{t:this.instance_8,p:{regY:1.6,scaleX:0.9979,scaleY:0.9979,rotation:6.7954,x:16,y:92.45,regX:-1.1}},{t:this.instance_7,p:{regY:-53.2,scaleX:0.9978,scaleY:0.9978,skewX:-5.1615,skewY:174.8385,x:2.85,y:188.75,regX:3.2}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,skewX:-7.4377,skewY:172.5623,x:-31.8,y:183.3,regX:1.8,regY:-55.5}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-69.5593,x:-31.8,y:46.55,regX:44,regY:0}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:133.5614,skewY:-46.4386,x:-59.8,y:126.55,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:98.978,skewY:-81.022,x:-64.6,y:133.15,regX:6.6,regY:-1.6}},{t:this.instance,p:{rotation:-109.8618,x:-57.4,y:-23,regX:35.4,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.2,rotation:-2.218,x:-5.7,y:-57.7,regY:9.1}},{t:this.instance_14,p:{scaleX:0.999,scaleY:0.999,skewX:-4.9876,skewY:175.0124,x:-0.8,y:-79.4}},{t:this.instance_13,p:{regY:-46,scaleX:0.9983,scaleY:0.9983,rotation:2.2907,x:-29.6,y:88.1,regX:1.8}},{t:this.instance_12,p:{rotation:77.4073,x:47.85,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_11,p:{regX:-39.7,regY:-1.1,rotation:101.6611,x:63.1,y:42.15}},{t:this.instance_10,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-79.7787,skewY:100.2213,x:43.3,y:123.55,regX:-6}},{t:this.instance_9,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-76.6294,skewY:103.3706,x:44.6,y:134.5,regX:-4.9}},{t:this.instance_8,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:5.4762,x:16.15,y:92.4,regX:-1}},{t:this.instance_7,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:-6.4809,skewY:173.5191,x:5.25,y:188.8,regX:3.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,skewX:-6.1586,skewY:173.8414,x:-34.25,y:183.05,regX:1.8,regY:-55.5}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-71.7035,x:-30.45,y:46,regX:44,regY:0}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:131.4173,skewY:-48.5827,x:-55.45,y:127.15,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:96.8344,skewY:-83.1656,x:-59.95,y:133.8,regX:6.6,regY:-1.6}},{t:this.instance,p:{rotation:-111.0093,x:-57.4,y:-23,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.2,rotation:-2.2591,x:-5.7,y:-57.7,regY:9.1}},{t:this.instance_14,p:{scaleX:0.999,scaleY:0.999,skewX:-5.2389,skewY:174.761,x:-0.85,y:-79.4}},{t:this.instance_13,p:{regY:-46,scaleX:0.9983,scaleY:0.9983,rotation:3.5693,x:-29.85,y:88,regX:1.8}},{t:this.instance_12,p:{rotation:77.8904,x:47.9,regX:-31.2,y:-26.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_11,p:{regX:-39.7,regY:-1.1,rotation:103.1829,x:62.55,y:42.25}},{t:this.instance_10,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-78.2578,skewY:101.7422,x:40.5,y:123.25,regX:-5.9}},{t:this.instance_9,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-75.1085,skewY:104.8915,x:41.6,y:134,regX:-4.9}},{t:this.instance_8,p:{regY:1.6,scaleX:0.9979,scaleY:0.9979,rotation:4.1573,x:16.2,y:92.5,regX:-1}},{t:this.instance_7,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:-7.8,skewY:172.2,x:7.5,y:189.05,regX:3.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,skewX:-4.8782,skewY:175.1218,x:-36.5,y:182.8,regX:1.8,regY:-55.5}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-73.846,x:-29.1,y:45.4,regX:44,regY:0}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:129.275,skewY:-50.725,x:-50.95,y:127.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:94.6917,skewY:-85.3083,x:-55.4,y:134.3,regX:6.6,regY:-1.5}},{t:this.instance,p:{rotation:-112.1575,x:-57.4,y:-23,regX:35.4,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.2,rotation:-2.3012,x:-5.7,y:-57.7,regY:9.1}},{t:this.instance_14,p:{scaleX:0.999,scaleY:0.999,skewX:-5.4904,skewY:174.5096,x:-0.8,y:-79.4}},{t:this.instance_13,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:4.8487,x:-30.1,y:88,regX:1.8}},{t:this.instance_12,p:{rotation:78.3731,x:47.9,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_11,p:{regX:-39.7,regY:-1,rotation:104.7031,x:61.85,y:42.3}},{t:this.instance_10,p:{regY:8.4,scaleX:0.9984,scaleY:0.9984,skewX:-76.7358,skewY:103.2642,x:37.7,y:122.55,regX:-6}},{t:this.instance_9,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-73.5878,skewY:106.4122,x:38.55,y:133.6,regX:-4.9}},{t:this.instance_8,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:2.838,x:16.25,y:92.35,regX:-1}},{t:this.instance_7,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:-9.1182,skewY:170.8818,x:9.7,y:189.2,regX:3.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,skewX:-3.5977,skewY:176.4022,x:-38.9,y:182.45,regX:1.8,regY:-55.5}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-75.9884,x:-27.65,y:44.9,regX:44,regY:0}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:127.1316,skewY:-52.8684,x:-46.65,y:127.45,regY:-9}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:92.5486,skewY:-87.4514,x:-50.7,y:134.5,regX:6.7,regY:-1.5}},{t:this.instance,p:{rotation:-113.3041,x:-57.4,y:-22.95,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.2,rotation:-2.3432,x:-5.7,y:-57.7,regY:9.1}},{t:this.instance_14,p:{scaleX:0.999,scaleY:0.999,skewX:-5.7419,skewY:174.2581,x:-0.85,y:-79.4}},{t:this.instance_13,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:6.1297,x:-30.3,y:87.85,regX:1.8}},{t:this.instance_12,p:{rotation:78.8551,x:47.85,regX:-31.2,y:-26.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_11,p:{regX:-39.7,regY:-1,rotation:106.2249,x:61.25,y:42.5}},{t:this.instance_10,p:{regY:8.4,scaleX:0.9984,scaleY:0.9984,skewX:-75.2149,skewY:104.7851,x:35.05,y:122.05,regX:-6}},{t:this.instance_9,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-72.0671,skewY:107.9329,x:35.55,y:133.05,regX:-4.9}},{t:this.instance_8,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:1.5185,x:16.25,y:92.3,regX:-1}},{t:this.instance_7,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9979,skewX:-10.4365,skewY:169.5633,x:11.95,y:189.35,regX:3.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,skewX:-2.3181,skewY:177.6819,x:-41.25,y:182.1,regX:1.8,regY:-55.5}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-78.1314,x:-26.35,y:44.2,regX:44,regY:0}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:124.9881,skewY:-55.0119,x:-42.1,y:127.6,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,skewX:90.4055,skewY:-89.5945,x:-45.95,y:134.85,regX:6.6,regY:-1.5}},{t:this.instance,p:{rotation:-114.4517,x:-57.4,y:-22.95,regX:35.4,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.2,rotation:-2.3853,x:-5.65,y:-57.7,regY:9.1}},{t:this.instance_14,p:{scaleX:0.999,scaleY:0.999,skewX:-5.9927,skewY:174.0073,x:-0.85,y:-79.4}},{t:this.instance_13,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:7.4104,x:-30.55,y:87.65,regX:1.8}},{t:this.instance_12,p:{rotation:79.3385,x:47.85,regX:-31.2,y:-26.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_11,p:{regX:-39.8,regY:-1.1,rotation:107.7462,x:60.8,y:42.55}},{t:this.instance_10,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-73.6933,skewY:106.3067,x:32.5,y:121.5,regX:-6}},{t:this.instance_9,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-70.5454,skewY:109.4546,x:32.55,y:132.6,regX:-4.8}},{t:this.instance_8,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:0.1998,x:16.3,y:92.3,regX:-1}},{t:this.instance_7,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:-11.7565,skewY:168.2435,x:14.15,y:189.4,regX:3.2}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,skewX:-1.0379,skewY:178.9621,x:-43.55,y:181.7,regX:1.8,regY:-55.5}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-80.2755,x:-25,y:43.65,regX:44,regY:0}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:122.8441,skewY:-57.1559,x:-37.6,y:127.6,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:88.2665,skewY:-91.7335,x:-41.25,y:134.8,regX:6.6,regY:-1.5}},{t:this.instance,p:{rotation:-115.5996,x:-57.35,y:-22.95,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.2,rotation:-2.4273,x:-5.65,y:-57.7,regY:9.1}},{t:this.instance_14,p:{scaleX:0.999,scaleY:0.999,skewX:-6.2443,skewY:173.7557,x:-0.85,y:-79.4}},{t:this.instance_13,p:{regY:-46,scaleX:0.9983,scaleY:0.9983,rotation:8.6884,x:-30.7,y:87.4,regX:1.8}},{t:this.instance_12,p:{rotation:79.8227,x:47.9,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_11,p:{regX:-39.7,regY:-1.1,rotation:109.2671,x:60.3,y:42.7}},{t:this.instance_10,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-72.1734,skewY:107.8266,x:29.8,y:120.8,regX:-6}},{t:this.instance_9,p:{regY:3.3,scaleX:0.9984,scaleY:0.9984,skewX:-69.0244,skewY:110.9756,x:29.75,y:131.85,regX:-4.9}},{t:this.instance_8,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-1.1145,x:16.35,y:92.3,regX:-1}},{t:this.instance_7,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:-13.0744,skewY:166.9256,x:16.5,y:189.4,regX:3.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,skewX:0.2365,skewY:-179.7635,x:-45.85,y:181.25,regX:1.8,regY:-55.5}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-82.418,x:-23.65,y:42.95,regX:44,regY:0}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:120.7015,skewY:-59.2985,x:-33.15,y:127.3,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,skewX:86.1234,skewY:-93.8766,x:-36.5,y:134.8,regX:6.6,regY:-1.5}},{t:this.instance,p:{rotation:-116.7464,x:-57.4,y:-23,regX:35.4,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.2,rotation:-2.4693,x:-5.65,y:-57.7,regY:9.1}},{t:this.instance_14,p:{scaleX:0.999,scaleY:0.999,skewX:-6.4953,skewY:173.5047,x:-0.85,y:-79.45}},{t:this.instance_13,p:{regY:-46,scaleX:0.9983,scaleY:0.9983,rotation:9.9681,x:-31,y:87.25,regX:1.8}},{t:this.instance_12,p:{rotation:80.3048,x:47.95,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_11,p:{regX:-39.7,regY:-1.1,rotation:110.7875,x:59.65,y:42.85}},{t:this.instance_10,p:{regY:8.4,scaleX:0.9984,scaleY:0.9984,skewX:-70.6518,skewY:109.3482,x:27,y:120.05,regX:-6}},{t:this.instance_9,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-67.5021,skewY:112.4979,x:26.65,y:131.05,regX:-4.8}},{t:this.instance_8,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-2.4346,x:16.35,y:92.3,regX:-1}},{t:this.instance_7,p:{regY:-53.2,scaleX:0.9978,scaleY:0.9978,skewX:-14.393,skewY:165.607,x:18.8,y:189.45,regX:3.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,skewX:1.5163,skewY:-178.4837,x:-48.25,y:180.7,regX:1.8,regY:-55.5}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-84.5608,x:-22.35,y:42.25,regX:44,regY:0}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:118.5589,skewY:-61.4411,x:-28.7,y:126.9,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:83.9799,skewY:-96.0201,x:-31.7,y:134.5,regX:6.6,regY:-1.5}},{t:this.instance,p:{rotation:-117.8952,x:-57.4,y:-23,regX:35.4,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.2,rotation:-2.4352,x:-5.65,y:-57.7,regY:9.1}},{t:this.instance_14,p:{scaleX:0.999,scaleY:0.999,skewX:-6.2831,skewY:173.7169,x:-0.9,y:-79.45}},{t:this.instance_13,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:8.8648,x:-30.8,y:87.55,regX:1.8}},{t:this.instance_12,p:{rotation:79.8834,x:47.95,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_11,p:{regX:-39.7,regY:-1.1,rotation:109.4751,x:60.15,y:42.75}},{t:this.instance_10,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-71.9765,skewY:108.0235,x:29.35,y:120.75,regX:-6}},{t:this.instance_9,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-68.8395,skewY:111.1605,x:29.25,y:131.75,regX:-4.9}},{t:this.instance_8,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-1.3073,x:16.35,y:92.25,regX:-1}},{t:this.instance_7,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:-13.2742,skewY:166.7258,x:16.85,y:189.4,regX:3.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,skewX:0.402,skewY:-179.598,x:-46.2,y:181.15,regX:1.8,regY:-55.5}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-82.7228,x:-23.45,y:42.85,regX:44,regY:0}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,skewX:120.3882,skewY:-59.6118,x:-32.5,y:127.2,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:85.8187,skewY:-94.1813,x:-35.75,y:134.8,regX:6.5,regY:-1.5}},{t:this.instance,p:{rotation:-116.9113,x:-57.35,y:-22.85,regX:35.3,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.2,rotation:-2.401,x:-5.65,y:-57.7,regY:9.1}},{t:this.instance_14,p:{scaleX:0.999,scaleY:0.999,skewX:-6.07,skewY:173.93,x:-0.85,y:-79.45}},{t:this.instance_13,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:7.7604,x:-30.45,y:87.65,regX:1.9}},{t:this.instance_12,p:{rotation:79.4639,x:47.9,regX:-31.2,y:-26.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_11,p:{regX:-39.6,regY:-1.1,rotation:108.1639,x:60.65,y:42.75}},{t:this.instance_10,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-73.3007,skewY:106.6993,x:31.7,y:121.3,regX:-6}},{t:this.instance_9,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-70.1784,skewY:109.8216,x:31.8,y:132.3,regX:-4.9}},{t:this.instance_8,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-0.1805,x:16.35,y:92.3,regX:-1}},{t:this.instance_7,p:{regY:-53.3,scaleX:0.9979,scaleY:0.9979,skewX:-12.1547,skewY:167.8453,x:14.95,y:189.4,regX:3.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,skewX:-0.7086,skewY:179.2914,x:-44.2,y:181.55,regX:1.8,regY:-55.5}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-80.8853,x:-24.6,y:43.45,regX:44,regY:0}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,skewX:122.2168,skewY:-57.7832,x:-36.3,y:127.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,skewX:87.6574,skewY:-92.3426,x:-39.85,y:134.85,regX:6.6,regY:-1.5}},{t:this.instance,p:{rotation:-115.9267,x:-57.4,y:-23,regX:35.4,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.2,rotation:-2.3669,x:-5.65,y:-57.7,regY:9.1}},{t:this.instance_14,p:{scaleX:0.999,scaleY:0.999,skewX:-5.8563,skewY:174.1437,x:-0.85,y:-79.5}},{t:this.instance_13,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:6.6551,x:-30.4,y:87.75,regX:1.8}},{t:this.instance_12,p:{rotation:79.0433,x:47.85,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_11,p:{regX:-39.7,regY:-1.1,rotation:106.8527,x:61.15,y:42.5}},{t:this.instance_10,p:{regY:8.6,scaleX:0.9984,scaleY:0.9984,skewX:-74.6252,skewY:105.3748,x:34.1,y:121.85,regX:-6}},{t:this.instance_9,p:{regY:3.3,scaleX:0.9984,scaleY:0.9984,skewX:-71.516,skewY:108.484,x:34.45,y:132.9,regX:-4.9}},{t:this.instance_8,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:0.941,x:16.3,y:92.35,regX:-1}},{t:this.instance_7,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:-11.036,skewY:168.964,x:12.85,y:189.4,regX:3.2}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,skewX:-1.8238,skewY:178.1762,x:-42.15,y:181.95,regX:1.8,regY:-55.5}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.0461,x:-25.8,y:43.95,regX:44,regY:0}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:124.0466,skewY:-55.9534,x:-40.2,y:127.6,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,skewX:89.4955,skewY:-90.5045,x:-43.95,y:134.9,regX:6.6,regY:-1.5}},{t:this.instance,p:{rotation:-114.9435,x:-57.4,y:-23,regX:35.4,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.2,rotation:-2.3328,x:-5.7,y:-57.7,regY:9.1}},{t:this.instance_14,p:{scaleX:0.999,scaleY:0.999,skewX:-5.6425,skewY:174.3575,x:-0.8,y:-79.45}},{t:this.instance_13,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:5.5514,x:-30.1,y:87.95,regX:1.9}},{t:this.instance_12,p:{rotation:78.6221,x:47.9,regX:-31.3,y:-26.3,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_11,p:{regX:-39.7,regY:-1,rotation:105.5405,x:61.55,y:42.35}},{t:this.instance_10,p:{regY:8.6,scaleX:0.9984,scaleY:0.9984,skewX:-75.9497,skewY:104.0503,x:36.5,y:122.4,regX:-6}},{t:this.instance_9,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-72.8525,skewY:107.1475,x:36.95,y:133.35,regX:-4.9}},{t:this.instance_8,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:2.068,x:16.3,y:92.35,regX:-1}},{t:this.instance_7,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:-9.9176,skewY:170.0824,x:11.1,y:189.3,regX:3.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,skewX:-2.9398,skewY:177.0602,x:-40.2,y:182.25,regX:1.8,regY:-55.5}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-77.2082,x:-26.9,y:44.5,regX:44,regY:0}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:125.8763,skewY:-54.1237,x:-44.1,y:127.6,regY:-9}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,skewX:91.3296,skewY:-88.6704,x:-47.95,y:134.75,regX:6.6,regY:-1.5}},{t:this.instance,p:{rotation:-113.9602,x:-57.45,y:-23,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.2,rotation:-2.2985,x:-5.7,y:-57.7,regY:9.1}},{t:this.instance_14,p:{scaleX:0.999,scaleY:0.999,skewX:-5.4298,skewY:174.5702,x:-0.8,y:-79.45}},{t:this.instance_13,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:4.4463,x:-30,y:88.05,regX:1.8}},{t:this.instance_12,p:{rotation:78.2011,x:47.9,regX:-31.3,y:-26.25,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_11,p:{regX:-39.7,regY:-1.1,rotation:104.2293,x:62.2,y:42.35}},{t:this.instance_10,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-77.274,skewY:102.726,x:38.7,y:122.8,regX:-6}},{t:this.instance_9,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-74.1903,skewY:105.8097,x:39.5,y:133.8,regX:-4.8}},{t:this.instance_8,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:3.1942,x:16.2,y:92.35,regX:-1}},{t:this.instance_7,p:{regY:-53.2,scaleX:0.9978,scaleY:0.9978,skewX:-8.798,skewY:171.202,x:9.2,y:189.3,regX:3.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,skewX:-4.0542,skewY:175.9458,x:-38.1,y:182.8,regX:1.8,regY:-55.4}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-75.3693,x:-28.1,y:45,regX:44,regY:0}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,skewX:127.7045,skewY:-52.2955,x:-47.85,y:127.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,skewX:93.1686,skewY:-86.8314,x:-52.05,y:134.6,regX:6.6,regY:-1.5}},{t:this.instance,p:{rotation:-112.9766,x:-57.4,y:-23.05,regX:35.4,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.2,rotation:-2.2644,x:-5.7,y:-57.7,regY:9.1}},{t:this.instance_14,p:{scaleX:0.999,scaleY:0.999,skewX:-5.2179,skewY:174.7821,x:-0.85,y:-79.4}},{t:this.instance_13,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:3.3429,x:-29.8,y:88.15,regX:1.8}},{t:this.instance_12,p:{rotation:77.7802,x:47.85,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_11,p:{regX:-39.7,regY:-1,rotation:102.9186,x:62.5,y:42.15}},{t:this.instance_10,p:{regY:8.4,scaleX:0.9984,scaleY:0.9984,skewX:-78.5966,skewY:101.4034,x:40.9,y:123.3,regX:-5.9}},{t:this.instance_9,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-75.5277,skewY:104.4723,x:42.15,y:134.15,regX:-4.9}},{t:this.instance_8,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:4.3206,x:16.2,y:92.35,regX:-1}},{t:this.instance_7,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:-7.6789,skewY:172.3211,x:7.2,y:189.05,regX:3.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,skewX:-5.1684,skewY:174.8316,x:-36.2,y:182.85,regX:1.9,regY:-55.5}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-73.5304,x:-29.3,y:45.5,regX:44,regY:0}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:129.5339,skewY:-50.4661,x:-51.65,y:127.35,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:95.0073,skewY:-84.9927,x:-56,y:134.35,regX:6.5,regY:-1.6}},{t:this.instance,p:{rotation:-111.993,x:-57.4,y:-22.95,regX:35.4,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.2,rotation:-2.2294,x:-5.7,y:-57.7,regY:9.1}},{t:this.instance_14,p:{scaleX:0.999,scaleY:0.999,skewX:-5.0043,skewY:174.9957,x:-0.85,y:-79.4}},{t:this.instance_13,p:{regY:-46,scaleX:0.9983,scaleY:0.9983,rotation:2.2373,x:-29.6,y:88.15,regX:1.8}},{t:this.instance_12,p:{rotation:77.3599,x:47.95,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_11,p:{regX:-39.8,regY:-1.1,rotation:101.6057,x:63.2,y:42.05}},{t:this.instance_10,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-79.9237,skewY:100.0763,x:43.4,y:123.65,regX:-6}},{t:this.instance_9,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-76.863,skewY:103.137,x:44.75,y:134.65,regX:-4.8}},{t:this.instance_8,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:5.4481,x:16.15,y:92.4,regX:-1}},{t:this.instance_7,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:-6.5602,skewY:173.4398,x:5.25,y:188.8,regX:3.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,skewX:-6.2836,skewY:173.7163,x:-34.05,y:183.1,regX:1.8,regY:-55.5}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-71.6924,x:-30.4,y:46,regX:44,regY:0}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:131.3639,skewY:-48.6361,x:-55.45,y:127.15,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,skewX:96.845,skewY:-83.155,x:-59.95,y:133.85,regX:6.6,regY:-1.6}},{t:this.instance,p:{rotation:-111.0093,x:-57.4,y:-23,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.2,rotation:-2.1961,x:-5.7,y:-57.75,regY:9.1}},{t:this.instance_14,p:{scaleX:0.999,scaleY:0.999,skewX:-4.7909,skewY:175.209,x:-0.85,y:-79.5}},{t:this.instance_13,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:1.1333,x:-29.4,y:88.4,regX:1.8}},{t:this.instance_12,p:{rotation:76.9393,x:47.85,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_11,p:{regX:-39.7,regY:-1.1,rotation:100.2946,x:63.75,y:42}},{t:this.instance_10,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-81.2472,skewY:98.7528,x:45.75,y:124,regX:-5.9}},{t:this.instance_9,p:{regY:3.3,scaleX:0.9984,scaleY:0.9984,skewX:-78.2022,skewY:101.7978,x:47.5,y:134.75,regX:-4.9}},{t:this.instance_8,p:{regY:1.6,scaleX:0.9979,scaleY:0.9979,rotation:6.574,x:16.15,y:92.55,regX:-1}},{t:this.instance_7,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:-5.4413,skewY:174.5587,x:3.2,y:188.6,regX:3.2}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,skewX:-7.3997,skewY:172.6003,x:-32.15,y:183.35,regX:1.9,regY:-55.5}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-69.8543,x:-31.6,y:46.45,regX:44,regY:0}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:133.1928,skewY:-46.8072,x:-59.3,y:126.65,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:98.6845,skewY:-81.3155,x:-63.95,y:133.4,regX:6.5,regY:-1.6}},{t:this.instance,p:{rotation:-110.0258,x:-57.4,y:-23,regX:35.4,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.2,rotation:-2.1619,x:-5.65,y:-57.75,regY:9.1}},{t:this.instance_14,p:{scaleX:0.999,scaleY:0.999,skewX:-4.5766,skewY:175.4234,x:-0.75,y:-79.45}},{t:this.instance_13,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:0.028,x:-29.25,y:88.5,regX:1.8}},{t:this.instance_12,p:{rotation:76.5181,x:47.85,regX:-31.3,y:-26.3,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_11,p:{regX:-39.7,regY:-1.1,rotation:98.9835,x:64.25,y:41.9}},{t:this.instance_10,p:{regY:8.4,scaleX:0.9984,scaleY:0.9984,skewX:-82.5712,skewY:97.4288,x:48.05,y:124.15,regX:-6}},{t:this.instance_9,p:{regY:3.3,scaleX:0.9984,scaleY:0.9984,skewX:-79.5398,skewY:100.4602,x:50.15,y:135.05,regX:-4.9}},{t:this.instance_8,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:7.6998,x:16.15,y:92.45,regX:-1}},{t:this.instance_7,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:-4.3218,skewY:175.6782,x:1.4,y:188.4,regX:3.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,skewX:-8.5131,skewY:171.4869,x:-30.1,y:183.45,regX:1.9,regY:-55.5}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-68.0166,x:-32.8,y:46.85,regX:44,regY:0}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:135.0217,skewY:-44.9783,x:-63,y:126.2,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:100.5234,skewY:-79.4766,x:-68.2,y:132.5,regX:6.7,regY:-1.4}},{t:this.instance,p:{rotation:-109.042,x:-57.4,y:-23,regX:35.4,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.2,rotation:-2.1278,x:-5.65,y:-57.75,regY:9.1}},{t:this.instance_14,p:{scaleX:0.999,scaleY:0.999,skewX:-4.3651,skewY:175.6349,x:-0.75,y:-79.4}},{t:this.instance_13,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-1.0702,x:-29.05,y:88.6,regX:1.8}},{t:this.instance_12,p:{rotation:76.0973,x:47.9,regX:-31.3,y:-26.35,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_11,p:{regX:-39.7,regY:-1.1,rotation:97.6702,x:64.75,y:41.75}},{t:this.instance_10,p:{regY:8.6,scaleX:0.9984,scaleY:0.9984,skewX:-83.8958,skewY:96.1042,x:50.65,y:124.4,regX:-6}},{t:this.instance_9,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-80.8764,skewY:99.1236,x:52.7,y:135.1,regX:-4.9}},{t:this.instance_8,p:{regY:1.6,scaleX:0.9979,scaleY:0.9979,rotation:8.8268,x:15.95,y:92.55,regX:-1.1}},{t:this.instance_7,p:{regY:-53.2,scaleX:0.9979,scaleY:0.9979,skewX:-3.2031,skewY:176.7968,x:-0.5,y:188.2,regX:3.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,skewX:-9.6291,skewY:170.3709,x:-27.95,y:183.65,regX:1.8,regY:-55.5}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-66.1781,x:-34,y:47.3,regX:44,regY:0}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:136.8512,skewY:-43.1488,x:-66.75,y:125.6,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:102.3615,skewY:-77.6385,x:-72.05,y:131.7,regX:6.7,regY:-1.4}},{t:this.instance,p:{rotation:-108.0586,x:-57.4,y:-23,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.2,rotation:-2.0937,x:-5.65,y:-57.75,regY:9.1}},{t:this.instance_14,p:{scaleX:0.999,scaleY:0.999,skewX:-4.1519,skewY:175.8481,x:-0.8,y:-79.45}},{t:this.instance_13,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-2.1742,x:-28.85,y:88.75,regX:1.8}},{t:this.instance_12,p:{rotation:75.6768,x:47.95,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_11,p:{regX:-39.8,regY:-1.1,rotation:96.3582,x:65.25,y:41.5}},{t:this.instance_10,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-85.2213,skewY:94.7787,x:52.95,y:124.55,regX:-6}},{t:this.instance_9,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-82.2132,skewY:97.7868,x:55.3,y:135.35,regX:-4.9}},{t:this.instance_8,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:9.9528,x:16.05,y:92.45,regX:-1}},{t:this.instance_7,p:{regY:-53.3,scaleX:0.9979,scaleY:0.9979,skewX:-2.0831,skewY:177.9169,x:-2.55,y:187.75,regX:3.2}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,skewX:-10.7439,skewY:169.2561,x:-25.95,y:183.65,regX:1.8,regY:-55.5}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-64.3384,x:-35.3,y:47.65,regX:44,regY:0}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:138.6795,skewY:-41.3205,x:-70.5,y:124.8,regY:-9}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:104.2,skewY:-75.8,x:-75.8,y:130.9,regX:6.7,regY:-1.5}},{t:this.instance,p:{rotation:-107.0754,x:-57.45,y:-23,regX:35.4,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.2,rotation:-2.0595,x:-5.65,y:-57.75,regY:9.1}},{t:this.instance_14,p:{scaleX:0.999,scaleY:0.999,skewX:-3.9378,skewY:176.0622,x:-0.8,y:-79.5}},{t:this.instance_13,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-3.2798,x:-28.45,y:88.85,regX:1.9}},{t:this.instance_12,p:{rotation:75.255,x:47.85,regX:-31.2,y:-26.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_11,p:{regX:-39.7,regY:-1.1,rotation:95.0469,x:65.7,y:41.5}},{t:this.instance_10,p:{regY:8.4,scaleX:0.9984,scaleY:0.9984,skewX:-86.5453,skewY:93.4547,x:55.25,y:124.65,regX:-6}},{t:this.instance_9,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-83.5511,skewY:96.4489,x:57.95,y:135.4,regX:-4.9}},{t:this.instance_8,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:11.0809,x:15.9,y:92.45,regX:-1.1}},{t:this.instance_7,p:{regY:-53.4,scaleX:0.9978,scaleY:0.9978,skewX:-0.9647,skewY:179.0353,x:-4.15,y:187.3,regX:3.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,skewX:-11.8603,skewY:168.1395,x:-23.9,y:183.75,regX:1.8,regY:-55.5}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-62.5013,x:-36.45,y:48.05,regX:44,regY:0}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:140.509,skewY:-39.491,x:-74.1,y:124.05,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:106.0383,skewY:-73.9617,x:-79.7,y:129.85,regX:6.7,regY:-1.5}},{t:this.instance,p:{rotation:-106.0915,x:-57.45,y:-22.95,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.2,rotation:-2.0245,x:-5.7,y:-57.75,regY:9.1}},{t:this.instance_14,p:{scaleX:0.999,scaleY:0.999,skewX:-3.7255,skewY:176.2745,x:-0.75,y:-79.45}},{t:this.instance_13,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-4.3831,x:-28.45,y:88.9,regX:1.8}},{t:this.instance_12,p:{rotation:74.8344,x:47.9,regX:-31.2,y:-26.1,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_11,p:{regX:-39.7,regY:-1.1,rotation:93.7347,x:66.2,y:41.35}},{t:this.instance_10,p:{regY:8.5,scaleX:0.9985,scaleY:0.9985,skewX:-87.87,skewY:92.13,x:57.8,y:124.75,regX:-6}},{t:this.instance_9,p:{regY:3.3,scaleX:0.9984,scaleY:0.9984,skewX:-84.889,skewY:95.111,x:60.75,y:135.5,regX:-4.8}},{t:this.instance_8,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:12.2062,x:16,y:92.45,regX:-1}},{t:this.instance_7,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:0.1498,skewY:-179.8502,x:-6.1,y:187,regX:3.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,skewX:-12.9745,skewY:167.0255,x:-21.9,y:183.7,regX:1.8,regY:-55.5}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-60.6628,x:-37.7,y:48.4,regX:44,regY:0}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:142.3393,skewY:-37.6607,x:-77.75,y:123.2,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:107.8769,skewY:-72.1231,x:-83.6,y:128.9,regX:6.6,regY:-1.5}},{t:this.instance,p:{rotation:-105.108,x:-57.4,y:-22.95,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.2,rotation:-1.9894,x:-5.7,y:-57.75,regY:9.1}},{t:this.instance_14,p:{scaleX:0.999,scaleY:0.999,skewX:-3.5133,skewY:176.4867,x:-0.7,y:-79.45}},{t:this.instance_13,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-5.488,x:-28.2,y:89.1,regX:1.8}},{t:this.instance_12,p:{rotation:74.414,x:47.85,regX:-31.3,y:-26.3,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_11,p:{regX:-39.7,regY:-1.1,rotation:92.4228,x:66.7,y:41.25}},{t:this.instance_10,p:{regY:8.6,scaleX:0.9984,scaleY:0.9984,skewX:-89.1944,skewY:90.8056,x:60.35,y:124.75,regX:-6}},{t:this.instance_9,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-86.2249,skewY:93.7751,x:63.25,y:135.35,regX:-4.9}},{t:this.instance_8,p:{regY:1.4,scaleX:0.9979,scaleY:0.9979,rotation:13.3327,x:16.05,y:92.35,regX:-1}},{t:this.instance_7,p:{regY:-53.2,scaleX:0.9978,scaleY:0.9978,skewX:1.2679,skewY:-178.7321,x:-7.95,y:186.7,regX:3.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,skewX:-14.0896,skewY:165.9102,x:-19.85,y:183.65,regX:1.8,regY:-55.5}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-58.8245,x:-38.95,y:48.7,regX:44,regY:0}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,skewX:144.1682,skewY:-35.8318,x:-81.35,y:122.2,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:109.7152,skewY:-70.2848,x:-87.5,y:127.7,regX:6.6,regY:-1.4}},{t:this.instance,p:{rotation:-104.1233,x:-57.45,y:-22.9,regX:35.3,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.2,rotation:-1.9562,x:-5.7,y:-57.75,regY:9.1}},{t:this.instance_14,p:{scaleX:0.999,scaleY:0.999,skewX:-3.3003,skewY:176.6997,x:-0.7,y:-79.45}},{t:this.instance_13,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-6.5923,x:-28.05,y:89.2,regX:1.8}},{t:this.instance_12,p:{rotation:73.9933,x:47.9,regX:-31.2,y:-26.25,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_11,p:{regX:-39.8,regY:-1.1,rotation:91.1113,x:67.15,y:41}},{t:this.instance_10,p:{regY:8.5,scaleX:0.9985,scaleY:0.9985,skewX:-90.514,skewY:89.486,x:62.65,y:124.75,regX:-6}},{t:this.instance_9,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-87.5641,skewY:92.4359,x:65.95,y:135.3,regX:-4.9}},{t:this.instance_8,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:14.4593,x:16,y:92.55,regX:-1}},{t:this.instance_7,p:{regY:-53.4,scaleX:0.9979,scaleY:0.9979,skewX:2.3873,skewY:-177.6127,x:-10,y:185.95,regX:3.2}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,skewX:-15.204,skewY:164.796,x:-17.8,y:183.6,regX:1.8,regY:-55.5}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-56.9863,x:-40.15,y:49,regX:44,regY:0}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:145.9973,skewY:-34.0027,x:-84.9,y:121.2,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:111.5526,skewY:-68.4474,x:-91.15,y:126.4,regX:6.6,regY:-1.5}},{t:this.instance,p:{rotation:-103.1403,x:-57.4,y:-22.8,regX:35.3,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.2,rotation:-1.922,x:-5.7,y:-57.75,regY:9.1}},{t:this.instance_14,p:{scaleX:0.999,scaleY:0.999,skewX:-3.0864,skewY:176.9136,x:-0.7,y:-79.45}},{t:this.instance_13,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-7.6976,x:-27.85,y:89.25,regX:1.8}},{t:this.instance_12,p:{rotation:73.5714,x:47.95,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_11,p:{regX:-39.7,regY:-1.1,rotation:89.8047,x:67.65,y:40.95}},{t:this.instance_10,p:{regY:8.5,scaleX:0.9985,scaleY:0.9985,skewX:-91.8382,skewY:88.1618,x:65.05,y:124.75,regX:-6}},{t:this.instance_9,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-88.8992,skewY:91.1008,x:68.6,y:135.1,regX:-4.9}},{t:this.instance_8,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:15.5859,x:15.95,y:92.55,regX:-1}},{t:this.instance_7,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9979,skewX:3.5059,skewY:-176.4941,x:-11.75,y:185.5,regX:3.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,skewX:-16.319,skewY:163.681,x:-15.85,y:183.55,regX:1.8,regY:-55.5}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-55.1477,x:-41.35,y:49.3,regX:44,regY:0}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:147.8259,skewY:-32.1741,x:-88.45,y:120,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:113.392,skewY:-66.608,x:-94.9,y:125,regX:6.6,regY:-1.4}},{t:this.instance,p:{rotation:-102.1565,x:-57.45,y:-22.9,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.2,rotation:-1.8878,x:-5.7,y:-57.65,regY:9.2}},{t:this.instance_14,p:{scaleX:0.999,scaleY:0.999,skewX:-2.8735,skewY:177.1265,x:-0.75,y:-79.45}},{t:this.instance_13,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-8.8019,x:-27.5,y:89.35,regX:1.9}},{t:this.instance_12,p:{rotation:73.1517,x:47.9,regX:-31.2,y:-26.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_11,p:{regX:-39.7,regY:-1.1,rotation:88.4919,x:68.2,y:40.85}},{t:this.instance_10,p:{regY:8.4,scaleX:0.9985,scaleY:0.9985,skewX:-93.1626,skewY:86.8374,x:67.3,y:124.7,regX:-6}},{t:this.instance_9,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-90.2338,skewY:89.7662,x:71.25,y:134.9,regX:-4.9}},{t:this.instance_8,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:16.7125,x:15.9,y:92.55,regX:-1}},{t:this.instance_7,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:4.6259,skewY:-175.3741,x:-13.6,y:185.05,regX:3.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,skewX:-17.4337,skewY:162.5663,x:-13.8,y:183.4,regX:1.8,regY:-55.5}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-53.3096,x:-42.65,y:49.5,regX:44,regY:0}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:149.6553,skewY:-30.3447,x:-91.9,y:118.65,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:115.2309,skewY:-64.7691,x:-98.5,y:123.6,regX:6.6,regY:-1.5}},{t:this.instance,p:{rotation:-101.1739,x:-57.45,y:-22.8,regX:35.3,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.2,rotation:-1.8537,x:-5.7,y:-57.65,regY:9.2}},{t:this.instance_14,p:{scaleX:0.999,scaleY:0.999,skewX:-2.6614,skewY:177.3386,x:-0.75,y:-79.45}},{t:this.instance_13,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-9.9061,x:-27.5,y:89.45,regX:1.8}},{t:this.instance_12,p:{rotation:72.7312,x:47.95,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_11,p:{regX:-39.7,regY:-1.1,rotation:87.1818,x:68.65,y:40.65}},{t:this.instance_10,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-94.487,skewY:85.513,x:69.85,y:124.6,regX:-5.9}},{t:this.instance_9,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-91.5703,skewY:88.4297,x:73.85,y:134.65,regX:-4.9}},{t:this.instance_8,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:17.839,x:15.9,y:92.55,regX:-1}},{t:this.instance_7,p:{regY:-53.2,scaleX:0.9978,scaleY:0.9978,skewX:5.7459,skewY:-174.2541,x:-15.55,y:184.5,regX:3.2}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,skewX:-18.5491,skewY:161.4509,x:-11.75,y:183.2,regX:1.8,regY:-55.5}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-51.4701,x:-43.9,y:49.85,regX:44,regY:0}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:151.4854,skewY:-28.5146,x:-95.4,y:117.3,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:117.0699,skewY:-62.9301,x:-102,y:122.05,regX:6.6,regY:-1.6}},{t:this.instance,p:{rotation:-100.1891,x:-57.4,y:-22.95,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.2,rotation:-1.8196,x:-5.7,y:-57.65,regY:9.2}},{t:this.instance_14,p:{scaleX:0.999,scaleY:0.999,skewX:-2.4476,skewY:177.5524,x:-0.75,y:-79.45}},{t:this.instance_13,p:{regY:-46,scaleX:0.9983,scaleY:0.9983,rotation:-11.0113,x:-27.25,y:89.5,regX:1.8}},{t:this.instance_12,p:{rotation:72.3091,x:48,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_11,p:{regX:-39.8,regY:-1.1,rotation:85.8694,x:69.2,y:40.4}},{t:this.instance_10,p:{regY:8.5,scaleX:0.9985,scaleY:0.9985,skewX:-95.8111,skewY:84.1889,x:72.3,y:124.3,regX:-6}},{t:this.instance_9,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-92.9085,skewY:87.0915,x:76.55,y:134.4,regX:-4.9}},{t:this.instance_8,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:18.9655,x:15.9,y:92.6,regX:-1}},{t:this.instance_7,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:6.8645,skewY:-173.1355,x:-17.25,y:183.85,regX:3.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,skewX:-19.6643,skewY:160.3357,x:-9.9,y:183.05,regX:1.9,regY:-55.5}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-49.6329,x:-45.15,y:50.05,regX:44,regY:0}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:153.3143,skewY:-26.6857,x:-98.75,y:115.8,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:118.9079,skewY:-61.0921,x:-105.6,y:120.3,regX:6.6,regY:-1.5}},{t:this.instance,p:{rotation:-99.2056,x:-57.45,y:-22.95,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.2,rotation:-1.7854,x:-5.7,y:-57.65,regY:9.2}},{t:this.instance_14,p:{scaleX:0.999,scaleY:0.999,skewX:-2.2339,skewY:177.7661,x:-0.7,y:-79.45}},{t:this.instance_13,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-12.1145,x:-27.05,y:89.65,regX:1.8}},{t:this.instance_12,p:{rotation:71.8885,x:47.9,regX:-31.2,y:-26.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_11,p:{regX:-39.7,regY:-1.1,rotation:84.5574,x:69.7,y:40.4}},{t:this.instance_10,p:{regY:8.4,scaleX:0.9984,scaleY:0.9984,skewX:-97.1366,skewY:82.8634,x:74.55,y:124,regX:-6}},{t:this.instance_9,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-94.2447,skewY:85.7553,x:79.25,y:134.05,regX:-4.9}},{t:this.instance_8,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:20.0914,x:15.85,y:92.6,regX:-1}},{t:this.instance_7,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:7.9831,skewY:-172.0169,x:-19.05,y:183.15,regX:3.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,skewX:-20.7796,skewY:159.2204,x:-7.85,y:182.75,regX:1.9,regY:-55.5}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-47.7937,x:-46.4,y:50.2,regX:44,regY:0}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,skewX:155.1435,skewY:-24.8565,x:-102.1,y:114.25,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:120.7464,skewY:-59.2536,x:-109.1,y:118.55,regX:6.6,regY:-1.5}},{t:this.instance,p:{rotation:-98.223,x:-57.45,y:-23,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.2,rotation:-1.7504,x:-5.7,y:-57.65,regY:9.2}},{t:this.instance_14,p:{scaleX:0.999,scaleY:0.999,skewX:-2.0211,skewY:177.9789,x:-0.65,y:-79.5}},{t:this.instance_13,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-13.2193,x:-26.8,y:89.8,regX:1.8}},{t:this.instance_12,p:{rotation:71.4679,x:48,regX:-31.2,y:-26.25,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_11,p:{regX:-39.6,regY:-1.1,rotation:83.2452,x:70.15,y:40.3}},{t:this.instance_10,p:{regY:8.6,scaleX:0.9984,scaleY:0.9984,skewX:-98.4605,skewY:81.5395,x:77.15,y:123.7,regX:-6}},{t:this.instance_9,p:{regY:3.3,scaleX:0.9984,scaleY:0.9984,skewX:-95.5833,skewY:84.4167,x:82,y:133.75,regX:-4.8}},{t:this.instance_8,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:21.2188,x:15.8,y:92.6,regX:-1}},{t:this.instance_7,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:9.1032,skewY:-170.8968,x:-20.85,y:182.45,regX:3.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,skewX:-21.8948,skewY:158.1052,x:-5.75,y:182.45,regX:1.8,regY:-55.5}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-45.9555,x:-47.65,y:50.4,regX:44,regY:0}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,skewX:156.972,skewY:-23.028,x:-105.4,y:112.6,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:122.5853,skewY:-57.4147,x:-112.5,y:116.65,regX:6.6,regY:-1.5}},{t:this.instance,p:{rotation:-97.2386,x:-57.4,y:-22.9,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.2,rotation:-1.7163,x:-5.7,y:-57.65,regY:9.2}},{t:this.instance_14,p:{scaleX:0.999,scaleY:0.999,skewX:-1.8083,skewY:178.1917,x:-0.65,y:-79.45}},{t:this.instance_13,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-14.323,x:-26.6,y:89.9,regX:1.8}},{t:this.instance_12,p:{rotation:71.0486,x:47.9,regX:-31.2,y:-26.25,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-39.7,regY:-1.1,rotation:81.9339,x:70.7,y:40.05}},{t:this.instance_10,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-99.7846,skewY:80.2154,x:79.55,y:123.35,regX:-6}},{t:this.instance_9,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-96.9189,skewY:83.0811,x:84.45,y:133.1,regX:-4.9}},{t:this.instance_8,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:22.3445,x:15.85,y:92.65,regX:-1}},{t:this.instance_7,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:10.2212,skewY:-169.7788,x:-22.65,y:181.75,regX:3.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,skewX:-23.0093,skewY:156.9907,x:-3.7,y:182.2,regX:1.8,regY:-55.5}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-44.1164,x:-48.95,y:50.55,regX:44,regY:0}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,skewX:158.8022,skewY:-21.1978,x:-108.7,y:110.8,regY:-9}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:124.4237,skewY:-55.5763,x:-115.85,y:114.7,regX:6.6,regY:-1.5}},{t:this.instance,p:{rotation:-96.2554,x:-57.5,y:-22.95,regX:35.4,scaleX:0.9983,scaleY:0.9983}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-141.1,-211.7,235.39999999999998,516.3);


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
	this.instance_2 = new lib.ch1_headcopy("synched",0);
	this.instance_2.setTransform(7.3,57.5,0.9991,0.9991,0,-1.7225,178.2776,-0.1,52.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-75.3,-69.7,152.8,137.7);


(lib.CharacterGood_03 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-57.5,-22.8,0.9985,0.9985,-100.4068,0,0,35.4,0.1);

	this.instance_1 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_1.setTransform(-65.8,141.45,0.9983,0.9983,0,132.2744,-47.7256,6.4,-1.2);

	this.instance_2 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_2.setTransform(-65,132.8,0.9984,0.9984,0,106.2,-73.8,5.4,-8.3);

	this.instance_3 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_3.setTransform(-43.5,53.7,0.9984,0.9984,-74.3273,0,0,40.5,-0.2);

	this.instance_4 = new lib.ch1_headcopy_2("synched",0);
	this.instance_4.setTransform(-4.85,-79.15,0.9991,0.9991,-0.5951,0,0,0.1,53);

	this.instance_5 = new lib.ch1_uBodycopy("synched",0);
	this.instance_5.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_6 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_6.setTransform(-37.4,188.6,0.9985,0.9985,0,3.7661,-176.2339,3.8,-52.8);

	this.instance_7 = new lib.ch1_neckcopy("synched",0);
	this.instance_7.setTransform(-5.6,-58,0.9991,0.9991,-0.1068,0,0,-1.1,8.8);

	this.instance_8 = new lib.ch1_lBodycopy("synched",0);
	this.instance_8.setTransform(-5.6,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_9 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_9.setTransform(33.35,188.95,0.998,0.998,0,-14.8917,165.1083,3.1,-53.2);

	this.instance_10 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_10.setTransform(14.6,93.35,0.9979,0.9979,-11.7106,0,0,-1.4,1.6);

	this.instance_11 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_11.setTransform(47.8,-26.25,0.9985,0.9985,78.5651,0,0,-31.4,-1.2);

	this.instance_12 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_12.setTransform(-22.5,92,0.9986,0.9986,7.3306,0,0,2.1,-45.4);

	this.instance_13 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_13.setTransform(9.5,117.9,0.9984,0.9984,0,-63.003,116.997,-4.9,3.4);

	this.instance_14 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_14.setTransform(12.55,107.05,0.9985,0.9985,0,-55.4143,124.5857,-6.2,8.2);

	this.instance_15 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_15.setTransform(63.8,46.65,0.9985,0.9985,129.1351,0,0,-39.8,-0.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{scaleX:0.9985,scaleY:0.9985,rotation:129.1351,x:63.8,y:46.65,regY:-0.7,regX:-39.8}},{t:this.instance_14,p:{regX:-6.2,regY:8.2,scaleX:0.9985,scaleY:0.9985,skewX:-55.4143,skewY:124.5857,x:12.55,y:107.05}},{t:this.instance_13,p:{skewX:-63.003,skewY:116.997,x:9.5,y:117.9,regY:3.4,regX:-4.9,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9986,scaleY:0.9986,rotation:7.3306,x:-22.5,y:92,regX:2.1,regY:-45.4}},{t:this.instance_11,p:{rotation:78.5651,x:47.8,y:-26.25,regX:-31.4,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_10,p:{rotation:-11.7106,x:14.6,y:93.35,regY:1.6,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_9,p:{regX:3.1,regY:-53.2,scaleX:0.998,scaleY:0.998,skewX:-14.8917,skewY:165.1083,x:33.35,y:188.95}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.1,rotation:-0.1068,x:-5.6,y:-58}},{t:this.instance_6,p:{regX:3.8,scaleX:0.9985,scaleY:0.9985,skewX:3.7661,skewY:-176.2339,x:-37.4,y:188.6,regY:-52.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9991,scaleY:0.9991,rotation:-0.5951,x:-4.85,y:-79.15,regY:53}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-74.3273,x:-43.5,regY:-0.2,y:53.7,regX:40.5}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,skewX:106.2,skewY:-73.8,x:-65,y:132.8,regY:-8.3,regX:5.4}},{t:this.instance_1,p:{regY:-1.2,skewX:132.2744,skewY:-47.7256,x:-65.8,y:141.45,scaleX:0.9983,scaleY:0.9983,regX:6.4}},{t:this.instance,p:{regY:0.1,scaleX:0.9985,scaleY:0.9985,rotation:-100.4068,x:-57.5,y:-22.8}}]}).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:128.1115,x:64.4,y:46.35,regY:-0.7,regX:-39.8}},{t:this.instance_14,p:{regX:-6.1,regY:8.3,scaleX:0.9984,scaleY:0.9984,skewX:-56.4404,skewY:123.5596,x:14.35,y:107.9}},{t:this.instance_13,p:{skewX:-64.0208,skewY:115.9792,x:11.45,y:118.6,regY:3.4,regX:-4.9,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:6.0553,x:-22.4,y:91.9,regX:2.1,regY:-45.4}},{t:this.instance_11,p:{rotation:78.0554,x:47.7,y:-26.3,regX:-31.4,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_10,p:{rotation:-9.9761,x:14.75,y:93.2,regY:1.6,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_9,p:{regX:3.2,regY:-53.3,scaleX:0.9979,scaleY:0.9979,skewX:-13.1457,skewY:166.8543,x:30.5,y:189.25}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.2,rotation:-0.1321,x:-5.65,y:-57.95}},{t:this.instance_6,p:{regX:3.9,scaleX:0.9984,scaleY:0.9984,skewX:1.8865,skewY:-178.1135,x:-35.2,y:188.85,regY:-52.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-0.8962,x:-4.8,y:-79.1,regY:53}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-72.8884,x:-43.55,regY:-0.2,y:53.7,regX:40.5}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:107.6421,skewY:-72.3579,x:-67.1,y:132.2,regY:-8.3,regX:5.4}},{t:this.instance_1,p:{regY:-1.3,skewX:133.7341,skewY:-46.2659,x:-68.05,y:140.9,scaleX:0.9983,scaleY:0.9983,regX:6.4}},{t:this.instance,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:-100.3317,x:-57.55,y:-22.9}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:127.0869,x:65.05,y:46.15,regY:-0.7,regX:-39.8}},{t:this.instance_14,p:{regX:-6.2,regY:8.3,scaleX:0.9983,scaleY:0.9983,skewX:-57.4671,skewY:122.5329,x:16.15,y:108.5}},{t:this.instance_13,p:{skewX:-65.0381,skewY:114.9619,x:13.45,y:119.45,regY:3.5,regX:-4.9,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:4.7828,x:-22.4,y:91.95,regX:2.1,regY:-45.4}},{t:this.instance_11,p:{rotation:77.5457,x:47.75,y:-26.2,regX:-31.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_10,p:{rotation:-8.243,x:15,y:93.1,regY:1.6,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_9,p:{regX:3.2,regY:-53.3,scaleX:0.9979,scaleY:0.9979,skewX:-11.3981,skewY:168.6019,x:27.8,y:189.55}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.2,rotation:-0.1593,x:-5.7,y:-57.95}},{t:this.instance_6,p:{regX:3.9,scaleX:0.9984,scaleY:0.9984,skewX:0.0079,skewY:-179.9921,x:-33,y:189.2,regY:-52.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-1.1982,x:-4.85,y:-79.05,regY:53}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-71.4496,x:-43.7,regY:-0.2,y:53.7,regX:40.5}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:109.0832,skewY:-70.9168,x:-69.1,y:131.7,regY:-8.4,regX:5.4}},{t:this.instance_1,p:{regY:-1.3,skewX:135.192,skewY:-44.808,x:-70.35,y:140.25,scaleX:0.9983,scaleY:0.9983,regX:6.4}},{t:this.instance,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:-100.2561,x:-57.5,y:-22.9}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:126.0628,x:65.65,y:46,regY:-0.6,regX:-39.8}},{t:this.instance_14,p:{regX:-6.2,regY:8.3,scaleX:0.9984,scaleY:0.9984,skewX:-58.4924,skewY:121.5076,x:17.9,y:109.25}},{t:this.instance_13,p:{skewX:-66.0558,skewY:113.9442,x:15.35,y:120.15,regY:3.4,regX:-4.9,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:3.508,x:-22.6,y:91.9,regX:2,regY:-45.4}},{t:this.instance_11,p:{rotation:77.0367,x:47.8,y:-26.2,regX:-31.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_10,p:{rotation:-6.5088,x:15.2,y:93,regY:1.6,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_9,p:{regX:3.2,regY:-53.3,scaleX:0.9979,scaleY:0.9979,skewX:-9.6507,skewY:170.3493,x:25.1,y:189.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.2,rotation:-0.1873,x:-5.6,y:-57.95}},{t:this.instance_6,p:{regX:3.9,scaleX:0.9984,scaleY:0.9984,skewX:-1.8655,skewY:178.1345,x:-30.85,y:189.45,regY:-52.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-1.4993,x:-4.85,y:-79.05,regY:53}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-70.0079,x:-43.9,regY:-0.3,y:53.65,regX:40.5}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,skewX:110.5276,skewY:-69.4724,x:-71.25,y:131,regY:-8.3,regX:5.4}},{t:this.instance_1,p:{regY:-1.3,skewX:136.6518,skewY:-43.3482,x:-72.55,y:139.55,scaleX:0.9983,scaleY:0.9983,regX:6.4}},{t:this.instance,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:-100.1797,x:-57.45,y:-22.95}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:125.0391,x:66.3,y:45.85,regY:-0.7,regX:-39.8}},{t:this.instance_14,p:{regX:-6.2,regY:8.3,scaleX:0.9984,scaleY:0.9984,skewX:-59.5195,skewY:120.4805,x:19.7,y:109.85}},{t:this.instance_13,p:{skewX:-67.0752,skewY:112.9248,x:17.4,y:120.9,regY:3.5,regX:-4.9,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:2.2342,x:-22.55,y:92,regX:2,regY:-45.4}},{t:this.instance_11,p:{rotation:76.5276,x:47.75,y:-26.35,regX:-31.4,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_10,p:{rotation:-4.7761,x:15.4,y:92.85,regY:1.6,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_9,p:{regX:3.1,regY:-53.3,scaleX:0.9979,scaleY:0.9979,skewX:-7.9039,skewY:172.096,x:22.5,y:189.95}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.2,rotation:-0.2144,x:-5.65,y:-57.95}},{t:this.instance_6,p:{regX:4,scaleX:0.9984,scaleY:0.9984,skewX:-3.7443,skewY:176.2556,x:-28.85,y:189.6,regY:-52.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-1.8014,x:-4.9,y:-79.1,regY:53}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-68.5682,x:-44,regY:-0.3,y:53.7,regX:40.5}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,skewX:111.9707,skewY:-68.0293,x:-73.25,y:130.3,regY:-8.3,regX:5.4}},{t:this.instance_1,p:{regY:-1.3,skewX:138.1115,skewY:-41.8885,x:-74.9,y:138.9,scaleX:0.9983,scaleY:0.9983,regX:6.4}},{t:this.instance,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:-100.104,x:-57.5,y:-22.9}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:124.0145,x:67,y:45.7,regY:-0.7,regX:-39.8}},{t:this.instance_14,p:{regX:-6.2,regY:8.2,scaleX:0.9984,scaleY:0.9984,skewX:-60.5444,skewY:119.4556,x:21.4,y:110.55}},{t:this.instance_13,p:{skewX:-68.0937,skewY:111.9063,x:19.35,y:121.5,regY:3.4,regX:-4.9,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:0.9606,x:-22.55,y:91.95,regX:2,regY:-45.4}},{t:this.instance_11,p:{rotation:76.0173,x:47.8,y:-26.3,regX:-31.4,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_10,p:{rotation:-3.0408,x:15.65,y:92.8,regY:1.6,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_9,p:{regX:3.1,regY:-53.3,scaleX:0.9979,scaleY:0.9979,skewX:-6.157,skewY:173.843,x:19.8,y:190}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.2,rotation:-0.2415,x:-5.65,y:-57.95}},{t:this.instance_6,p:{regX:3.9,scaleX:0.9984,scaleY:0.9984,skewX:-5.6229,skewY:174.3771,x:-26.55,y:189.8,regY:-52.6}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-2.1035,x:-4.9,y:-79.1,regY:53}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-67.128,x:-44,regY:-0.2,y:53.7,regX:40.5}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:113.4132,skewY:-66.5868,x:-75.2,y:129.55,regY:-8.3,regX:5.4}},{t:this.instance_1,p:{regY:-1.3,skewX:139.5707,skewY:-40.4293,x:-77.05,y:138.05,scaleX:0.9983,scaleY:0.9983,regX:6.4}},{t:this.instance,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:-100.0282,x:-57.5,y:-22.85}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:122.9904,x:67.65,y:45.5,regY:-0.7,regX:-39.8}},{t:this.instance_14,p:{regX:-6.2,regY:8.3,scaleX:0.9984,scaleY:0.9984,skewX:-61.5701,skewY:118.4299,x:23.3,y:111.2}},{t:this.instance_13,p:{skewX:-69.1099,skewY:110.8901,x:21.3,y:122.25,regY:3.4,regX:-4.9,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-0.3091,x:-22.55,y:91.9,regX:2,regY:-45.4}},{t:this.instance_11,p:{rotation:75.5091,x:47.8,y:-26.2,regX:-31.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_10,p:{rotation:-1.3073,x:15.85,y:92.7,regY:1.6,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_9,p:{regX:3.2,regY:-53.3,scaleX:0.9979,scaleY:0.9979,skewX:-4.4095,skewY:175.5905,x:16.95,y:189.95}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.2,rotation:-0.2686,x:-5.6,y:-57.95}},{t:this.instance_6,p:{regX:3.9,scaleX:0.9984,scaleY:0.9984,skewX:-7.5005,skewY:172.4995,x:-24.35,y:189.8,regY:-52.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-2.4056,x:-4.95,y:-79.1,regY:53}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-65.6891,x:-44.1,regY:-0.3,y:53.75,regX:40.5}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,skewX:114.8565,skewY:-65.1435,x:-77.3,y:128.75,regY:-8.3,regX:5.4}},{t:this.instance_1,p:{regY:-1.3,skewX:141.0298,skewY:-38.9702,x:-79.3,y:137.2,scaleX:0.9983,scaleY:0.9983,regX:6.4}},{t:this.instance,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:-99.9528,x:-57.5,y:-22.9}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:121.9671,x:68.2,y:45.45,regY:-0.7,regX:-39.7}},{t:this.instance_14,p:{regX:-6.2,regY:8.3,scaleX:0.9984,scaleY:0.9984,skewX:-62.5976,skewY:117.4024,x:25.1,y:111.8}},{t:this.instance_13,p:{skewX:-70.1285,skewY:109.8715,x:23.3,y:122.85,regY:3.4,regX:-4.9,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-1.5833,x:-22.5,y:92,regX:2,regY:-45.4}},{t:this.instance_11,p:{rotation:74.9983,x:47.7,y:-26.2,regX:-31.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_10,p:{rotation:0.4214,x:16.05,y:92.55,regY:1.6,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_9,p:{regX:3.2,regY:-53.3,scaleX:0.9979,scaleY:0.9979,skewX:-2.6626,skewY:177.3374,x:14.2,y:189.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.2,rotation:-0.2966,x:-5.65,y:-57.95}},{t:this.instance_6,p:{regX:3.9,scaleX:0.9984,scaleY:0.9984,skewX:-9.379,skewY:170.621,x:-22.15,y:189.95,regY:-52.6}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-2.7087,x:-4.95,y:-79.1,regY:53}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-64.2485,x:-44.2,regY:-0.2,y:53.75,regX:40.5}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:116.2983,skewY:-63.7017,x:-79.2,y:127.85,regY:-8.3,regX:5.4}},{t:this.instance_1,p:{regY:-1.3,skewX:142.4892,skewY:-37.5108,x:-81.5,y:136.3,scaleX:0.9983,scaleY:0.9983,regX:6.4}},{t:this.instance,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:-99.8772,x:-57.5,y:-22.9}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:120.9424,x:68.9,y:45.15,regY:-0.7,regX:-39.8}},{t:this.instance_14,p:{regX:-6.2,regY:8.3,scaleX:0.9984,scaleY:0.9984,skewX:-63.6221,skewY:116.3779,x:26.9,y:112.4}},{t:this.instance_13,p:{skewX:-71.1461,skewY:108.8539,x:25.4,y:123.45,regY:3.4,regX:-4.9,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-2.8573,x:-22.5,y:91.9,regX:2,regY:-45.4}},{t:this.instance_11,p:{rotation:74.4883,x:47.8,y:-26.1,regX:-31.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_10,p:{rotation:2.1558,x:16.3,y:92.45,regY:1.6,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_9,p:{regX:3.2,regY:-53.3,scaleX:0.9979,scaleY:0.9979,skewX:-0.9156,skewY:179.0844,x:11.5,y:189.6}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.2,rotation:-0.3238,x:-5.65,y:-57.95}},{t:this.instance_6,p:{regX:3.9,scaleX:0.9984,scaleY:0.9984,skewX:-11.2589,skewY:168.7411,x:-19.9,y:189.75,regY:-52.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-3.0093,x:-4.9,y:-79.1,regY:53}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-62.8087,x:-44.25,regY:-0.2,y:53.8,regX:40.5}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:117.7408,skewY:-62.2592,x:-81.15,y:127.1,regY:-8.4,regX:5.4}},{t:this.instance_1,p:{regY:-1.3,skewX:143.9492,skewY:-36.0508,x:-83.6,y:135.4,scaleX:0.9982,scaleY:0.9982,regX:6.4}},{t:this.instance,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:-99.8018,x:-57.45,y:-22.9}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:119.918,x:69.5,y:44.95,regY:-0.7,regX:-39.8}},{t:this.instance_14,p:{regX:-6.2,regY:8.3,scaleX:0.9984,scaleY:0.9984,skewX:-64.6491,skewY:115.3509,x:28.75,y:112.9}},{t:this.instance_13,p:{skewX:-72.1632,skewY:107.8368,x:27.55,y:124.05,regY:3.5,regX:-4.9,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-4.132,x:-22.5,y:92,regX:2,regY:-45.4}},{t:this.instance_11,p:{rotation:73.9788,x:47.75,y:-26.35,regX:-31.4,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_10,p:{rotation:3.8887,x:16.5,y:92.3,regY:1.6,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_9,p:{regX:3.2,regY:-53.3,scaleX:0.9979,scaleY:0.9979,skewX:0.828,skewY:-179.172,x:8.8,y:189.3}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.2,rotation:-0.3509,x:-5.6,y:-57.95}},{t:this.instance_6,p:{regX:3.9,scaleX:0.9984,scaleY:0.9984,skewX:-13.1376,skewY:166.8624,x:-17.8,y:189.7,regY:-52.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-3.3125,x:-4.95,y:-79.05,regY:53}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-61.3685,x:-44.4,regY:-0.2,y:53.8,regX:40.5}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,skewX:119.1832,skewY:-60.8168,x:-83.05,y:126.1,regY:-8.3,regX:5.4}},{t:this.instance_1,p:{regY:-1.2,skewX:145.4075,skewY:-34.5925,x:-85.65,y:134.25,scaleX:0.9983,scaleY:0.9983,regX:6.5}},{t:this.instance,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:-99.7253,x:-57.45,y:-22.95}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:118.8942,x:70.1,y:44.75,regY:-0.7,regX:-39.8}},{t:this.instance_14,p:{regX:-6.2,regY:8.3,scaleX:0.9984,scaleY:0.9984,skewX:-65.6748,skewY:114.3252,x:30.6,y:113.45}},{t:this.instance_13,p:{skewX:-73.1817,skewY:106.8183,x:29.45,y:124.55,regY:3.4,regX:-4.9,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-5.4051,x:-22.4,y:91.9,regX:2.1,regY:-45.4}},{t:this.instance_11,p:{rotation:73.4696,x:47.75,y:-26.2,regX:-31.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_10,p:{rotation:5.6233,x:16.7,y:92.25,regY:1.6,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_9,p:{regX:3.2,regY:-53.3,scaleX:0.9979,scaleY:0.9979,skewX:2.5741,skewY:-177.4259,x:6.05,y:188.85}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.2,rotation:-0.3789,x:-5.65,y:-57.95}},{t:this.instance_6,p:{regX:3.9,scaleX:0.9984,scaleY:0.9984,skewX:-15.0156,skewY:164.9844,x:-15.7,y:189.6,regY:-52.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-3.6133,x:-4.9,y:-79.1,regY:53}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-59.9278,x:-44.4,regY:-0.2,y:53.8,regX:40.5}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,skewX:120.6269,skewY:-59.3731,x:-85,y:125.05,regY:-8.3,regX:5.4}},{t:this.instance_1,p:{regY:-1.3,skewX:146.8669,skewY:-33.1331,x:-87.85,y:133.35,scaleX:0.9983,scaleY:0.9983,regX:6.4}},{t:this.instance,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:-99.6508,x:-57.5,y:-22.95}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:117.8704,x:70.7,y:44.5,regY:-0.6,regX:-39.8}},{t:this.instance_14,p:{regX:-6.2,regY:8.3,scaleX:0.9984,scaleY:0.9984,skewX:-66.7005,skewY:113.2995,x:32.45,y:113.95}},{t:this.instance_13,p:{skewX:-74.2009,skewY:105.7991,x:31.55,y:125.1,regY:3.4,regX:-4.9,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-6.6783,x:-22.4,y:91.95,regX:2.1,regY:-45.4}},{t:this.instance_11,p:{rotation:72.9602,x:47.8,y:-26.25,regX:-31.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_10,p:{rotation:7.3569,x:16.85,y:92.05,regY:1.6,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_9,p:{regX:3.2,regY:-53.3,scaleX:0.9979,scaleY:0.9979,skewX:4.3199,skewY:-175.6801,x:3.3,y:188.35}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.2,rotation:-0.406,x:-5.6,y:-57.95}},{t:this.instance_6,p:{regX:4,scaleX:0.9984,scaleY:0.9984,skewX:-16.8935,skewY:163.1065,x:-13.7,y:189.4,regY:-52.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-3.915,x:-4.9,y:-79.1,regY:53}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-58.4868,x:-44.45,regY:-0.2,y:53.85,regX:40.5}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:122.0681,skewY:-57.9319,x:-86.9,y:124.1,regY:-8.3,regX:5.4}},{t:this.instance_1,p:{regY:-1.3,skewX:148.3271,skewY:-31.6729,x:-89.8,y:132.2,scaleX:0.9983,scaleY:0.9983,regX:6.5}},{t:this.instance,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:-99.5762,x:-57.5,y:-22.9}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:116.847,x:71.35,y:44.35,regY:-0.7,regX:-39.8}},{t:this.instance_14,p:{regX:-6.2,regY:8.3,scaleX:0.9984,scaleY:0.9984,skewX:-67.728,skewY:112.272,x:34.3,y:114.4}},{t:this.instance_13,p:{skewX:-75.2178,skewY:104.7822,x:33.6,y:125.55,regY:3.4,regX:-4.9,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-7.9522,x:-22.35,y:91.9,regX:2.1,regY:-45.4}},{t:this.instance_11,p:{rotation:72.4506,x:47.8,y:-26.2,regX:-31.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_10,p:{rotation:9.0904,x:17.15,y:92,regY:1.6,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_9,p:{regX:3.2,regY:-53.3,scaleX:0.9979,scaleY:0.9979,skewX:6.068,skewY:-173.932,x:0.7,y:187.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.2,rotation:-0.4332,x:-5.6,y:-57.95}},{t:this.instance_6,p:{regX:4,scaleX:0.9984,scaleY:0.9984,skewX:-18.7719,skewY:161.2281,x:-11.55,y:189.2,regY:-52.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-4.2176,x:-4.9,y:-79.05,regY:53}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-57.0483,x:-44.65,regY:-0.2,y:53.85,regX:40.5}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:123.5113,skewY:-56.4887,x:-88.65,y:122.95,regY:-8.3,regX:5.4}},{t:this.instance_1,p:{regY:-1.3,skewX:149.7861,skewY:-30.2139,x:-92,y:131.1,scaleX:0.9983,scaleY:0.9983,regX:6.4}},{t:this.instance,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:-99.4987,x:-57.5,y:-22.9}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:115.8229,x:72.05,y:44.15,regY:-0.7,regX:-39.8}},{t:this.instance_14,p:{regX:-6.2,regY:8.3,scaleX:0.9984,scaleY:0.9984,skewX:-68.7529,skewY:111.2471,x:36.15,y:114.85}},{t:this.instance_13,p:{skewX:-76.235,skewY:103.765,x:35.65,y:126.05,regY:3.4,regX:-4.9,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-9.2265,x:-22.5,y:91.95,regX:2,regY:-45.4}},{t:this.instance_11,p:{rotation:71.9405,x:47.75,y:-26.1,regX:-31.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_10,p:{rotation:10.825,x:17.4,y:91.8,regY:1.6,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_9,p:{regX:3.1,regY:-53.4,scaleX:0.9979,scaleY:0.9979,skewX:7.8148,skewY:-172.1852,x:-1.8,y:187.05}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.2,rotation:-0.4612,x:-5.7,y:-57.95}},{t:this.instance_6,p:{regX:3.9,scaleX:0.9984,scaleY:0.9984,skewX:-20.6511,skewY:159.3489,x:-9.35,y:188.75,regY:-52.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-4.5196,x:-5,y:-79.1,regY:53}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-55.6087,x:-44.75,regY:-0.2,y:53.85,regX:40.5}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:124.9541,skewY:-55.0459,x:-90.55,y:121.9,regY:-8.3,regX:5.4}},{t:this.instance_1,p:{regY:-1.3,skewX:151.2454,skewY:-28.7546,x:-94.05,y:129.95,scaleX:0.9983,scaleY:0.9983,regX:6.4}},{t:this.instance,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:-99.4235,x:-57.45,y:-22.9}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:114.7982,x:72.65,y:43.95,regY:-0.7,regX:-39.8}},{t:this.instance_14,p:{regX:-6.2,regY:8.3,scaleX:0.9984,scaleY:0.9984,skewX:-69.7776,skewY:110.2224,x:38.1,y:115.25}},{t:this.instance_13,p:{skewX:-77.2526,skewY:102.7474,x:37.7,y:126.55,regY:3.4,regX:-4.8,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-10.5001,x:-22.45,y:92.1,regX:2,regY:-45.3}},{t:this.instance_11,p:{rotation:71.4308,x:47.75,y:-26.4,regX:-31.4,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_10,p:{rotation:12.559,x:17.6,y:91.65,regY:1.6,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_9,p:{regX:3.2,regY:-53.3,scaleX:0.9979,scaleY:0.9979,skewX:9.5619,skewY:-170.4381,x:-4.6,y:186.3}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.2,rotation:-0.4883,x:-5.65,y:-57.95}},{t:this.instance_6,p:{regX:3.9,scaleX:0.9984,scaleY:0.9984,skewX:-22.5293,skewY:157.4704,x:-7.1,y:188.55,regY:-52.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-4.8208,x:-5,y:-79.05,regY:53}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-54.1678,x:-44.85,regY:-0.2,y:53.85,regX:40.5}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:126.3965,skewY:-53.6035,x:-92.35,y:120.65,regY:-8.3,regX:5.4}},{t:this.instance_1,p:{regY:-1.3,skewX:152.7041,skewY:-27.2959,x:-95.9,y:128.6,scaleX:0.9983,scaleY:0.9983,regX:6.5}},{t:this.instance,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:-99.3479,x:-57.5,y:-22.85}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:113.7745,x:73.25,y:43.75,regY:-0.7,regX:-39.8}},{t:this.instance_14,p:{regX:-6.2,regY:8.3,scaleX:0.9984,scaleY:0.9984,skewX:-70.8043,skewY:109.1957,x:40,y:115.6}},{t:this.instance_13,p:{skewX:-78.2719,skewY:101.7281,x:39.8,y:126.85,regY:3.4,regX:-4.9,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-11.7743,x:-22.45,y:92,regX:2,regY:-45.4}},{t:this.instance_11,p:{rotation:70.9213,x:47.8,y:-26.25,regX:-31.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_10,p:{rotation:14.2921,x:17.8,y:91.5,regY:1.6,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_9,p:{regX:3.2,regY:-53.3,scaleX:0.9979,scaleY:0.9979,skewX:11.3098,skewY:-168.6902,x:-7.25,y:185.45}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.2,rotation:-0.5154,x:-5.65,y:-57.95}},{t:this.instance_6,p:{regX:3.9,scaleX:0.9984,scaleY:0.9984,skewX:-24.4076,skewY:155.5924,x:-5,y:188.2,regY:-52.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-5.123,x:-4.95,y:-79,regY:53}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-52.7283,x:-44.95,regY:-0.2,y:53.95,regX:40.5}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:127.8392,skewY:-52.1608,x:-94.05,y:119.6,regY:-8.4,regX:5.4}},{t:this.instance_1,p:{regY:-1.2,skewX:154.1635,skewY:-25.8365,x:-98.05,y:127.3,scaleX:0.9982,scaleY:0.9982,regX:6.4}},{t:this.instance,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:-99.2716,x:-57.5,y:-22.95}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:112.7495,x:73.85,y:43.45,regY:-0.7,regX:-39.8}},{t:this.instance_14,p:{regX:-6.2,regY:8.2,scaleX:0.9984,scaleY:0.9984,skewX:-71.8314,skewY:108.1686,x:41.8,y:115.95}},{t:this.instance_13,p:{skewX:-79.2891,skewY:100.7109,x:41.95,y:127.15,regY:3.4,regX:-4.9,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-13.0485,x:-22.4,y:92.1,regX:2,regY:-45.3}},{t:this.instance_11,p:{rotation:70.4117,x:47.7,y:-26.25,regX:-31.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_10,p:{rotation:16.0252,x:18,y:91.4,regY:1.6,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_9,p:{regX:3.2,regY:-53.2,scaleX:0.9979,scaleY:0.9979,skewX:13.0558,skewY:-166.9442,x:-9.8,y:184.75}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.2,rotation:-0.5434,x:-5.65,y:-57.95}},{t:this.instance_6,p:{regX:3.9,scaleX:0.9984,scaleY:0.9984,skewX:-26.2858,skewY:153.7142,x:-2.85,y:187.8,regY:-52.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-5.4252,x:-5,y:-79.1,regY:53}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-51.2877,x:-45.05,regY:-0.2,y:53.85,regX:40.5}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:129.2837,skewY:-50.7163,x:-95.85,y:118.3,regY:-8.3,regX:5.4}},{t:this.instance_1,p:{regY:-1.3,skewX:155.6233,skewY:-24.3767,x:-99.9,y:126,scaleX:0.9983,scaleY:0.9983,regX:6.4}},{t:this.instance,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:-99.1953,x:-57.5,y:-22.9}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:111.7264,x:74.45,y:43.25,regY:-0.7,regX:-39.8}},{t:this.instance_14,p:{regX:-6.1,regY:8.3,scaleX:0.9984,scaleY:0.9984,skewX:-72.8578,skewY:107.1422,x:43.75,y:116.45}},{t:this.instance_13,p:{skewX:-80.3063,skewY:99.6937,x:44.1,y:127.5,regY:3.4,regX:-4.9,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-14.3221,x:-22.5,y:92.15,regX:2,regY:-45.3}},{t:this.instance_11,p:{rotation:69.9012,x:47.75,y:-26.25,regX:-31.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_10,p:{rotation:17.7603,x:18.25,y:91.25,regY:1.5,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_9,p:{regX:3.2,regY:-53.2,scaleX:0.9979,scaleY:0.9979,skewX:14.8042,skewY:-165.1958,x:-12.5,y:183.7}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.2,rotation:-0.5705,x:-5.6,y:-57.95}},{t:this.instance_6,p:{regX:4,scaleX:0.9984,scaleY:0.9984,skewX:-28.165,skewY:151.835,x:-0.75,y:187.35,regY:-52.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-5.727,x:-4.95,y:-78.9,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-49.8484,x:-45.2,regY:-0.2,y:53.9,regX:40.5}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:130.7258,skewY:-49.2742,x:-97.55,y:116.95,regY:-8.3,regX:5.4}},{t:this.instance_1,p:{regY:-1.3,skewX:157.083,skewY:-22.917,x:-101.75,y:124.65,scaleX:0.9983,scaleY:0.9983,regX:6.4}},{t:this.instance,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:-99.1198,x:-57.5,y:-22.95}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:112.5854,x:73.95,y:43.4,regY:-0.7,regX:-39.8}},{t:this.instance_14,p:{regX:-6.2,regY:8.3,scaleX:0.9984,scaleY:0.9984,skewX:-71.9979,skewY:108.0021,x:42.2,y:116}},{t:this.instance_13,p:{skewX:-79.448,skewY:100.552,x:42.3,y:127.2,regY:3.4,regX:-4.9,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-13.2337,x:-22.5,y:92,regX:2,regY:-45.4}},{t:this.instance_11,p:{rotation:70.3322,x:47.8,y:-26.25,regX:-31.3,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{rotation:16.298,x:17.95,y:91.4,regY:1.6,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_9,p:{regX:3.1,regY:-53.3,scaleX:0.9979,scaleY:0.9979,skewX:13.3437,skewY:-166.6563,x:-10.2,y:184.45}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.2,rotation:-0.5417,x:-5.65,y:-57.95}},{t:this.instance_6,p:{regX:4,scaleX:0.9984,scaleY:0.9984,skewX:-26.5607,skewY:153.4393,x:-2.65,y:187.8,regY:-52.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-5.4693,x:-5,y:-79.05,regY:53}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-51.0509,x:-45.1,regY:-0.2,y:53.85,regX:40.5}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:129.5213,skewY:-50.4787,x:-96.05,y:118.15,regY:-8.4,regX:5.4}},{t:this.instance_1,p:{regY:-1.4,skewX:155.8797,skewY:-24.1203,x:-100.2,y:125.9,scaleX:0.9983,scaleY:0.9983,regX:6.4}},{t:this.instance,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:-99.1776,x:-57.5,y:-22.95}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:113.4451,x:73.45,y:43.65,regY:-0.7,regX:-39.8}},{t:this.instance_14,p:{regX:-6.2,regY:8.3,scaleX:0.9984,scaleY:0.9984,skewX:-71.1386,skewY:108.8614,x:40.6,y:115.75}},{t:this.instance_13,p:{skewX:-78.5879,skewY:101.4121,x:40.5,y:126.95,regY:3.4,regX:-4.9,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-12.145,x:-22.5,y:92.05,regX:2,regY:-45.4}},{t:this.instance_11,p:{rotation:70.7615,x:47.8,y:-26.25,regX:-31.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_10,p:{rotation:14.8363,x:17.85,y:91.5,regY:1.6,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_9,p:{regX:3.2,regY:-53.3,scaleX:0.9979,scaleY:0.9979,skewX:11.8813,skewY:-168.1187,x:-8.05,y:185.25}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.2,rotation:-0.5128,x:-5.65,y:-57.95}},{t:this.instance_6,p:{regX:3.9,scaleX:0.9984,scaleY:0.9984,skewX:-24.9561,skewY:155.0439,x:-4.4,y:188.1,regY:-52.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-5.2118,x:-5,y:-78.95,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-52.2555,x:-45.1,regY:-0.3,y:53.85,regX:40.5}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:128.3195,skewY:-51.6805,x:-94.7,y:119.1,regY:-8.3,regX:5.4}},{t:this.instance_1,p:{regY:-1.2,skewX:154.677,skewY:-25.323,x:-98.65,y:126.85,scaleX:0.9983,scaleY:0.9983,regX:6.4}},{t:this.instance,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:-99.2353,x:-57.5,y:-22.9}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:114.3044,x:72.95,y:43.85,regY:-0.7,regX:-39.8}},{t:this.instance_14,p:{regX:-6.2,regY:8.2,scaleX:0.9984,scaleY:0.9984,skewX:-70.2792,skewY:109.7208,x:38.9,y:115.4}},{t:this.instance_13,p:{skewX:-77.7281,skewY:102.2719,x:38.75,y:126.55,regY:3.4,regX:-4.9,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-11.0563,x:-22.5,y:92,regX:2,regY:-45.4}},{t:this.instance_11,p:{rotation:71.1912,x:47.75,y:-26.35,regX:-31.4,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_10,p:{rotation:13.3756,x:17.7,y:91.6,regY:1.6,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_9,p:{regX:3.2,regY:-53.3,scaleX:0.9979,scaleY:0.9979,skewX:10.4193,skewY:-169.5807,x:-5.9,y:185.95}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.2,rotation:-0.4848,x:-5.65,y:-57.95}},{t:this.instance_6,p:{regX:3.9,scaleX:0.9984,scaleY:0.9984,skewX:-23.3514,skewY:156.6486,x:-6.15,y:188.4,regY:-52.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-4.9534,x:-5,y:-79.05,regY:53}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-53.4583,x:-44.95,regY:-0.2,y:53.9,regX:40.5}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:127.1153,skewY:-52.8847,x:-93.3,y:120.25,regY:-8.3,regX:5.3}},{t:this.instance_1,p:{regY:-1.3,skewX:153.4729,skewY:-26.5271,x:-97,y:128.05,scaleX:0.9983,scaleY:0.9983,regX:6.4}},{t:this.instance,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:-99.292,x:-57.5,y:-22.9}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:115.1645,x:72.4,y:44.05,regY:-0.7,regX:-39.8}},{t:this.instance_14,p:{regX:-6.2,regY:8.3,scaleX:0.9984,scaleY:0.9984,skewX:-69.4196,skewY:110.5804,x:37.4,y:115.05}},{t:this.instance_13,p:{skewX:-76.8692,skewY:103.1308,x:36.95,y:126.25,regY:3.4,regX:-4.9,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-9.967,x:-22.5,y:91.95,regX:2,regY:-45.4}},{t:this.instance_11,p:{rotation:71.6207,x:47.75,y:-26.25,regX:-31.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_10,p:{rotation:11.9155,x:17.55,y:91.6,regY:1.5,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_9,p:{regX:3.2,regY:-53.3,scaleX:0.9979,scaleY:0.9979,skewX:8.9598,skewY:-171.0402,x:-3.55,y:186.6}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.2,rotation:-0.4559,x:-5.7,y:-57.95}},{t:this.instance_6,p:{regX:3.9,scaleX:0.9984,scaleY:0.9984,skewX:-21.7473,skewY:158.2527,x:-7.9,y:188.75,regY:-52.6}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-4.6953,x:-4.95,y:-79.1,regY:53}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-54.6612,x:-44.85,regY:-0.2,y:53.8,regX:40.5}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:125.912,skewY:-54.088,x:-91.8,y:121.15,regY:-8.3,regX:5.4}},{t:this.instance_1,p:{regY:-1.3,skewX:152.2701,skewY:-27.7299,x:-95.35,y:129.1,scaleX:0.9983,scaleY:0.9983,regX:6.4}},{t:this.instance,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:-99.3505,x:-57.5,y:-22.85}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:116.0234,x:71.9,y:44.2,regY:-0.7,regX:-39.8}},{t:this.instance_14,p:{regX:-6.1,regY:8.3,scaleX:0.9984,scaleY:0.9984,skewX:-68.5599,skewY:111.4401,x:35.8,y:114.85}},{t:this.instance_13,p:{skewX:-76.009,skewY:103.991,x:35.3,y:125.9,regY:3.4,regX:-4.9,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-8.8789,x:-22.5,y:91.95,regX:2,regY:-45.4}},{t:this.instance_11,p:{rotation:72.0504,x:47.7,y:-26.25,regX:-31.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_10,p:{rotation:10.4551,x:17.3,y:91.85,regY:1.6,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_9,p:{regX:3.1,regY:-53.3,scaleX:0.9979,scaleY:0.9979,skewX:7.4973,skewY:-172.5027,x:-1.25,y:187.3}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.2,rotation:-0.427,x:-5.65,y:-57.95}},{t:this.instance_6,p:{regX:3.9,scaleX:0.9984,scaleY:0.9984,skewX:-20.1429,skewY:159.8571,x:-9.85,y:188.95,regY:-52.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-4.4388,x:-4.9,y:-79.05,regY:53}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-55.8645,x:-44.75,regY:-0.2,y:53.9,regX:40.5}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:124.7083,skewY:-55.2917,x:-90.3,y:122.05,regY:-8.3,regX:5.4}},{t:this.instance_1,p:{regY:-1.3,skewX:151.0663,skewY:-28.9337,x:-93.6,y:130.15,scaleX:0.9983,scaleY:0.9983,regX:6.4}},{t:this.instance,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:-99.4073,x:-57.5,y:-22.85}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:116.8827,x:71.3,y:44.35,regY:-0.7,regX:-39.8}},{t:this.instance_14,p:{regX:-6.2,regY:8.3,scaleX:0.9984,scaleY:0.9984,skewX:-67.7013,skewY:112.2987,x:34.2,y:114.35}},{t:this.instance_13,p:{skewX:-75.1496,skewY:104.8504,x:33.5,y:125.5,regY:3.4,regX:-4.9,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-7.7906,x:-22.45,y:92,regX:2,regY:-45.4}},{t:this.instance_11,p:{rotation:72.4797,x:47.8,y:-26.2,regX:-31.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_10,p:{rotation:8.9929,x:17.1,y:92,regY:1.6,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_9,p:{regX:3.2,regY:-53.3,scaleX:0.9979,scaleY:0.9979,skewX:6.0372,skewY:-173.9628,x:0.85,y:187.85}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.2,rotation:-0.3982,x:-5.6,y:-57.95}},{t:this.instance_6,p:{regX:4,scaleX:0.9984,scaleY:0.9984,skewX:-18.5374,skewY:161.4626,x:-11.8,y:189.15,regY:-52.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-4.18,x:-4.9,y:-79.05,regY:53}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-57.0676,x:-44.65,regY:-0.2,y:53.85,regX:40.5}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:123.505,skewY:-56.495,x:-88.75,y:123,regY:-8.3,regX:5.4}},{t:this.instance_1,p:{regY:-1.3,skewX:149.8622,skewY:-30.1378,x:-91.95,y:131.1,scaleX:0.9983,scaleY:0.9983,regX:6.5}},{t:this.instance,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:-99.4651,x:-57.5,y:-22.85}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:117.7415,x:70.75,y:44.6,regY:-0.6,regX:-39.7}},{t:this.instance_14,p:{regX:-6.2,regY:8.2,scaleX:0.9984,scaleY:0.9984,skewX:-66.8413,skewY:113.1587,x:32.55,y:113.95}},{t:this.instance_13,p:{skewX:-74.2899,skewY:105.7101,x:31.7,y:125.15,regY:3.4,regX:-4.9,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-6.7013,x:-22.5,y:91.95,regX:2,regY:-45.4}},{t:this.instance_11,p:{rotation:72.9106,x:47.75,y:-26.2,regX:-31.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_10,p:{rotation:7.5328,x:16.95,y:92.05,regY:1.6,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_9,p:{regX:3.2,regY:-53.3,scaleX:0.9979,scaleY:0.9979,skewX:4.5756,skewY:-175.4244,x:3.05,y:188.4}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.2,rotation:-0.3693,x:-5.65,y:-57.95}},{t:this.instance_6,p:{regX:3.9,scaleX:0.9984,scaleY:0.9984,skewX:-16.9348,skewY:163.0652,x:-13.55,y:189.35,regY:-52.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-3.922,x:-4.95,y:-79.1,regY:53}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-58.271,x:-44.6,regY:-0.2,y:53.85,regX:40.5}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,skewX:122.3014,skewY:-57.6986,x:-87.2,y:123.95,regY:-8.3,regX:5.4}},{t:this.instance_1,p:{regY:-1.3,skewX:148.6589,skewY:-31.3411,x:-90.35,y:132.1,scaleX:0.9982,scaleY:0.9982,regX:6.4}},{t:this.instance,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:-99.5228,x:-57.5,y:-22.85}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:118.6011,x:70.25,y:44.75,regY:-0.7,regX:-39.8}},{t:this.instance_14,p:{regX:-6.2,regY:8.3,scaleX:0.9984,scaleY:0.9984,skewX:-65.9821,skewY:114.0179,x:31.05,y:113.55}},{t:this.instance_13,p:{skewX:-73.4313,skewY:106.5687,x:30,y:124.7,regY:3.4,regX:-4.9,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-5.6128,x:-22.55,y:91.95,regX:2,regY:-45.4}},{t:this.instance_11,p:{rotation:73.3393,x:47.8,y:-26.25,regX:-31.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_10,p:{rotation:6.0707,x:16.75,y:92.2,regY:1.6,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_9,p:{regX:3.2,regY:-53.2,scaleX:0.9979,scaleY:0.9979,skewX:3.1144,skewY:-176.8856,x:5.35,y:188.95}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.2,rotation:-0.3413,x:-5.65,y:-57.95}},{t:this.instance_6,p:{regX:3.9,scaleX:0.9984,scaleY:0.9984,skewX:-15.3304,skewY:164.6696,x:-15.4,y:189.55,regY:-52.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-3.6642,x:-4.9,y:-79.1,regY:53}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-59.4741,x:-44.45,regY:-0.2,y:53.8,regX:40.5}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:121.0986,skewY:-58.9014,x:-85.65,y:124.8,regY:-8.3,regX:5.4}},{t:this.instance_1,p:{regY:-1.3,skewX:147.4567,skewY:-32.5433,x:-88.55,y:133.05,scaleX:0.9983,scaleY:0.9983,regX:6.4}},{t:this.instance,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:-99.5788,x:-57.5,y:-22.9}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:119.4611,x:69.65,y:44.85,regY:-0.6,regX:-39.8}},{t:this.instance_14,p:{regX:-6.1,regY:8.3,scaleX:0.9984,scaleY:0.9984,skewX:-65.1223,skewY:114.8777,x:29.45,y:113.3}},{t:this.instance_13,p:{skewX:-72.5712,skewY:107.4288,x:28.35,y:124.3,regY:3.4,regX:-4.9,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-4.5236,x:-22.4,y:91.95,regX:2.1,regY:-45.4}},{t:this.instance_11,p:{rotation:73.7691,x:47.75,y:-26.25,regX:-31.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_10,p:{rotation:4.6082,x:16.55,y:92.35,regY:1.6,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_9,p:{regX:3.2,regY:-53.3,scaleX:0.9979,scaleY:0.9979,skewX:1.6543,skewY:-178.3457,x:7.6,y:189.15}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.2,rotation:-0.3124,x:-5.6,y:-57.95}},{t:this.instance_6,p:{regX:4,scaleX:0.9984,scaleY:0.9984,skewX:-13.7266,skewY:166.2734,x:-17.3,y:189.7,regY:-52.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-3.4072,x:-4.9,y:-79.1,regY:53}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-60.677,x:-44.4,regY:-0.2,y:53.8,regX:40.5}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:119.8954,skewY:-60.1046,x:-84.05,y:125.65,regY:-8.3,regX:5.4}},{t:this.instance_1,p:{regY:-1.3,skewX:146.2526,skewY:-33.7474,x:-86.9,y:133.95,scaleX:0.9983,scaleY:0.9983,regX:6.4}},{t:this.instance,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:-99.6364,x:-57.5,y:-22.9}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:120.3213,x:69.2,y:45.05,regY:-0.7,regX:-39.8}},{t:this.instance_14,p:{regX:-6.2,regY:8.2,scaleX:0.9984,scaleY:0.9984,skewX:-64.2629,skewY:115.7371,x:27.9,y:112.65}},{t:this.instance_13,p:{skewX:-71.7124,skewY:108.2876,x:26.55,y:123.85,regY:3.4,regX:-4.9,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-3.4352,x:-22.5,y:91.95,regX:2,regY:-45.4}},{t:this.instance_11,p:{rotation:74.1998,x:47.8,y:-26.2,regX:-31.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_10,p:{rotation:3.1487,x:16.35,y:92.35,regY:1.6,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_9,p:{regX:3.2,regY:-53.3,scaleX:0.9979,scaleY:0.9979,skewX:0.1927,skewY:-179.8073,x:9.9,y:189.45}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.2,rotation:-0.2835,x:-5.65,y:-57.95}},{t:this.instance_6,p:{regX:3.9,scaleX:0.9984,scaleY:0.9984,skewX:-12.1209,skewY:167.8791,x:-18.95,y:189.75,regY:-52.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-3.1487,x:-4.95,y:-79.15,regY:53}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-61.8806,x:-44.4,regY:-0.2,y:53.8,regX:40.5}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:118.6929,skewY:-61.3071,x:-82.5,y:126.4,regY:-8.3,regX:5.4}},{t:this.instance_1,p:{regY:-1.3,skewX:145.0497,skewY:-34.9503,x:-85,y:134.75,scaleX:0.9983,scaleY:0.9983,regX:6.4}},{t:this.instance,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:-99.6941,x:-57.5,y:-22.9}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:121.1802,x:68.7,y:45.2,regY:-0.7,regX:-39.8}},{t:this.instance_14,p:{regX:-6.2,regY:8.3,scaleX:0.9984,scaleY:0.9984,skewX:-63.4032,skewY:116.5968,x:26.4,y:112.25}},{t:this.instance_13,p:{skewX:-70.8531,skewY:109.1469,x:24.85,y:123.35,regY:3.4,regX:-4.9,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-2.3472,x:-22.5,y:91.95,regX:2,regY:-45.4}},{t:this.instance_11,p:{rotation:74.6298,x:47.7,y:-26.2,regX:-31.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_10,p:{rotation:1.6868,x:16.2,y:92.45,regY:1.6,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_9,p:{regX:3.2,regY:-53.3,scaleX:0.9979,scaleY:0.9979,skewX:-1.2643,skewY:178.7357,x:12.2,y:189.7}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.2,rotation:-0.2546,x:-5.65,y:-57.95}},{t:this.instance_6,p:{regX:3.9,scaleX:0.9984,scaleY:0.9984,skewX:-10.517,skewY:169.483,x:-20.9,y:189.65,regY:-52.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-2.891,x:-4.9,y:-79.1,regY:53}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-63.0828,x:-44.35,regY:-0.2,y:53.75,regX:40.5}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,skewX:117.4882,skewY:-62.5118,x:-80.9,y:127.15,regY:-8.3,regX:5.4}},{t:this.instance_1,p:{regY:-1.3,skewX:143.8474,skewY:-36.1526,x:-83.35,y:135.6,scaleX:0.9983,scaleY:0.9983,regX:6.4}},{t:this.instance,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:-99.751,x:-57.5,y:-22.9}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:122.0403,x:68.2,y:45.35,regY:-0.7,regX:-39.8}},{t:this.instance_14,p:{regX:-6.2,regY:8.3,scaleX:0.9984,scaleY:0.9984,skewX:-62.544,skewY:117.456,x:24.9,y:111.75}},{t:this.instance_13,p:{skewX:-69.9933,skewY:110.0067,x:23.2,y:122.8,regY:3.4,regX:-4.9,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-1.2574,x:-22.5,y:92,regX:2,regY:-45.4}},{t:this.instance_11,p:{rotation:75.0591,x:47.75,y:-26.2,regX:-31.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_10,p:{rotation:0.226,x:16.05,y:92.6,regY:1.6,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_9,p:{regX:3.2,regY:-53.4,scaleX:0.9979,scaleY:0.9979,skewX:-2.7249,skewY:177.2751,x:14.45,y:189.75}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.2,rotation:-0.2266,x:-5.6,y:-57.95}},{t:this.instance_6,p:{regX:3.9,scaleX:0.9984,scaleY:0.9984,skewX:-8.9115,skewY:171.0885,x:-22.75,y:189.8,regY:-52.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-2.6342,x:-4.85,y:-79.1,regY:53}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-64.2865,x:-44.25,regY:-0.2,y:53.75,regX:40.5}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:116.2846,skewY:-63.7154,x:-79.25,y:127.9,regY:-8.3,regX:5.4}},{t:this.instance_1,p:{regY:-1.3,skewX:142.6442,skewY:-37.3558,x:-81.45,y:136.35,scaleX:0.9982,scaleY:0.9982,regX:6.5}},{t:this.instance,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:-99.8088,x:-57.45,y:-22.9}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:122.8993,x:67.65,y:45.55,regY:-0.7,regX:-39.8}},{t:this.instance_14,p:{regX:-6.1,regY:8.3,scaleX:0.9984,scaleY:0.9984,skewX:-61.6845,skewY:118.3155,x:23.35,y:111.35}},{t:this.instance_13,p:{skewX:-69.133,skewY:110.867,x:21.4,y:122.35,regY:3.4,regX:-4.8,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-0.169,x:-22.55,y:91.9,regX:2,regY:-45.4}},{t:this.instance_11,p:{rotation:75.4889,x:47.75,y:-26.2,regX:-31.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_10,p:{rotation:-1.2302,x:15.85,y:92.7,regY:1.6,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_9,p:{regX:3.2,regY:-53.3,scaleX:0.9979,scaleY:0.9979,skewX:-4.1872,skewY:175.8128,x:16.8,y:189.95}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.2,rotation:-0.1978,x:-5.65,y:-57.95}},{t:this.instance_6,p:{regX:3.9,scaleX:0.9984,scaleY:0.9984,skewX:-7.3087,skewY:172.6912,x:-24.6,y:189.8,regY:-52.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-2.375,x:-4.9,y:-79.1,regY:53}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-65.4912,x:-44.15,regY:-0.2,y:53.75,regX:40.5}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:115.0814,skewY:-64.9186,x:-77.65,y:128.6,regY:-8.3,regX:5.4}},{t:this.instance_1,p:{regY:-1.2,skewX:141.4398,skewY:-38.5602,x:-79.7,y:137.05,scaleX:0.9983,scaleY:0.9983,regX:6.4}},{t:this.instance,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:-99.865,x:-57.5,y:-22.85}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:123.759,x:67.15,y:45.65,regY:-0.7,regX:-39.8}},{t:this.instance_14,p:{regX:-6.2,regY:8.3,scaleX:0.9984,scaleY:0.9984,skewX:-60.825,skewY:119.175,x:21.9,y:110.7}},{t:this.instance_13,p:{skewX:-68.2737,skewY:111.7263,x:19.75,y:121.7,regY:3.4,regX:-4.9,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:0.915,x:-22.55,y:91.95,regX:2,regY:-45.4}},{t:this.instance_11,p:{rotation:75.9189,x:47.8,y:-26.2,regX:-31.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_10,p:{rotation:-2.6924,x:15.65,y:92.75,regY:1.6,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_9,p:{regX:3.2,regY:-53.4,scaleX:0.9979,scaleY:0.9979,skewX:-5.647,skewY:174.353,x:19.05,y:189.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.2,rotation:-0.1689,x:-5.65,y:-57.95}},{t:this.instance_6,p:{regX:3.9,scaleX:0.9984,scaleY:0.9984,skewX:-5.7029,skewY:174.2971,x:-26.45,y:189.7,regY:-52.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-2.1175,x:-4.9,y:-79.15,regY:53}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-66.6938,x:-44.1,regY:-0.2,y:53.7,regX:40.5}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,skewX:113.8794,skewY:-66.1206,x:-75.95,y:129.3,regY:-8.3,regX:5.4}},{t:this.instance_1,p:{regY:-1.3,skewX:140.237,skewY:-39.763,x:-77.85,y:137.85,scaleX:0.9983,scaleY:0.9983,regX:6.4}},{t:this.instance,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:-99.9226,x:-57.45,y:-22.85}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:124.6176,x:66.55,y:45.85,regY:-0.7,regX:-39.8}},{t:this.instance_14,p:{regX:-6.1,regY:8.2,scaleX:0.9984,scaleY:0.9984,skewX:-59.9647,skewY:120.0353,x:20.25,y:110.25}},{t:this.instance_13,p:{skewX:-67.4143,skewY:112.5857,x:18.15,y:121.2,regY:3.4,regX:-4.9,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:2.0038,x:-22.55,y:91.9,regX:2,regY:-45.4}},{t:this.instance_11,p:{rotation:76.3486,x:47.7,y:-26.2,regX:-31.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_10,p:{rotation:-4.1538,x:15.45,y:92.9,regY:1.6,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_9,p:{regX:3.2,regY:-53.3,scaleX:0.9979,scaleY:0.9979,skewX:-7.1086,skewY:172.8914,x:21.4,y:189.95}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.2,rotation:-0.14,x:-5.65,y:-57.95}},{t:this.instance_6,p:{regX:3.9,scaleX:0.9984,scaleY:0.9984,skewX:-4.0989,skewY:175.9011,x:-28.3,y:189.6,regY:-52.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-1.8592,x:-4.9,y:-79.1,regY:53}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-67.8961,x:-44.05,regY:-0.2,y:53.75,regX:40.5}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:112.6747,skewY:-67.3253,x:-74.3,y:130,regY:-8.3,regX:5.4}},{t:this.instance_1,p:{regY:-1.3,skewX:139.0342,skewY:-40.9658,x:-76.05,y:138.55,scaleX:0.9983,scaleY:0.9983,regX:6.4}},{t:this.instance,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:-99.9794,x:-57.45,y:-22.9}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:125.4776,x:66,y:46,regY:-0.7,regX:-39.8}},{t:this.instance_14,p:{regX:-6.2,regY:8.3,scaleX:0.9984,scaleY:0.9984,skewX:-59.107,skewY:120.893,x:18.9,y:109.65}},{t:this.instance_13,p:{skewX:-66.5542,skewY:113.4458,x:16.45,y:120.55,regY:3.4,regX:-4.9,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:3.0923,x:-22.55,y:91.95,regX:2,regY:-45.4}},{t:this.instance_11,p:{rotation:76.7769,x:47.8,y:-26.15,regX:-31.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_10,p:{rotation:-5.6145,x:15.25,y:92.95,regY:1.6,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_9,p:{regX:3.2,regY:-53.3,scaleX:0.9979,scaleY:0.9979,skewX:-8.5706,skewY:171.4294,x:23.65,y:189.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.2,rotation:-0.112,x:-5.65,y:-57.95}},{t:this.instance_6,p:{regX:3.9,scaleX:0.9984,scaleY:0.9984,skewX:-2.4946,skewY:177.5054,x:-30.15,y:189.45,regY:-52.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-1.6017,x:-4.85,y:-79,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-69.1009,x:-44,regY:-0.2,y:53.8,regX:40.5}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,skewX:111.4723,skewY:-68.5277,x:-72.7,y:130.6,regY:-8.3,regX:5.4}},{t:this.instance_1,p:{regY:-1.3,skewX:137.8306,skewY:-42.1694,x:-74.15,y:139.15,scaleX:0.9982,scaleY:0.9982,regX:6.4}},{t:this.instance,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:-100.0373,x:-57.45,y:-22.9}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:126.3368,x:65.45,y:46.1,regY:-0.7,regX:-39.7}},{t:this.instance_14,p:{regX:-6.2,regY:8.3,scaleX:0.9984,scaleY:0.9984,skewX:-58.2475,skewY:121.7525,x:17.4,y:109}},{t:this.instance_13,p:{skewX:-65.6952,skewY:114.3048,x:14.8,y:120,regY:3.4,regX:-4.9,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:4.1811,x:-22.55,y:92,regX:2,regY:-45.4}},{t:this.instance_11,p:{rotation:77.2075,x:47.75,y:-26.2,regX:-31.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_10,p:{rotation:-7.0761,x:15.1,y:93.1,regY:1.6,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_9,p:{regX:3.2,regY:-53.3,scaleX:0.9979,scaleY:0.9979,skewX:-10.0311,skewY:169.9689,x:25.95,y:189.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.2,rotation:-0.0849,x:-5.65,y:-57.95}},{t:this.instance_6,p:{regX:3.9,scaleX:0.9984,scaleY:0.9984,skewX:-0.8906,skewY:179.1094,x:-32,y:189.35,regY:-52.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-1.3444,x:-4.85,y:-79.1,regY:53}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-70.3043,x:-43.85,regY:-0.2,y:53.75,regX:40.5}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:110.2685,skewY:-69.7315,x:-71,y:131.25,regY:-8.3,regX:5.3}},{t:this.instance_1,p:{regY:-1.3,skewX:136.6271,skewY:-43.3729,x:-72.25,y:139.75,scaleX:0.9983,scaleY:0.9983,regX:6.4}},{t:this.instance,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:-100.095,x:-57.5,y:-22.9}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:127.1962,x:64.95,y:46.2,regY:-0.7,regX:-39.8}},{t:this.instance_14,p:{regX:-6.2,regY:8.3,scaleX:0.9983,scaleY:0.9983,skewX:-57.3872,skewY:122.6128,x:15.9,y:108.4}},{t:this.instance_13,p:{skewX:-64.8351,skewY:115.1649,x:13.2,y:119.3,regY:3.4,regX:-4.9,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.2697,x:-22.6,y:91.95,regX:2,regY:-45.4}},{t:this.instance_11,p:{rotation:77.6381,x:47.75,y:-26.2,regX:-31.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_10,p:{rotation:-8.5354,x:14.9,y:93.15,regY:1.6,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_9,p:{regX:3.2,regY:-53.2,scaleX:0.9979,scaleY:0.9979,skewX:-11.4929,skewY:168.5071,x:28.2,y:189.65}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.2,rotation:-0.056,x:-5.6,y:-58}},{t:this.instance_6,p:{regX:3.9,scaleX:0.9984,scaleY:0.9984,skewX:0.7093,skewY:-179.2907,x:-33.85,y:189.15,regY:-52.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-1.0861,x:-4.8,y:-79.05,regY:53}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-71.5074,x:-43.9,regY:-0.3,y:53.65,regX:40.5}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:109.0658,skewY:-70.9342,x:-69.25,y:131.65,regY:-8.3,regX:5.4}},{t:this.instance_1,p:{regY:-1.2,skewX:135.4248,skewY:-44.5752,x:-70.45,y:140.25,scaleX:0.9983,scaleY:0.9983,regX:6.4}},{t:this.instance,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:-100.152,x:-57.45,y:-22.95}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:128.056,x:64.4,y:46.35,regY:-0.7,regX:-39.8}},{t:this.instance_14,p:{regX:-6.2,regY:8.3,scaleX:0.9984,scaleY:0.9984,skewX:-56.5276,skewY:123.4724,x:14.45,y:107.85}},{t:this.instance_13,p:{skewX:-63.977,skewY:116.023,x:11.55,y:118.7,regY:3.4,regX:-4.9,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:6.3576,x:-22.6,y:92,regX:2,regY:-45.3}},{t:this.instance_11,p:{rotation:78.0672,x:47.7,y:-26.25,regX:-31.4,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_10,p:{rotation:-9.9983,x:14.7,y:93.2,regY:1.6,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_9,p:{regX:3.1,regY:-53.3,scaleX:0.9979,scaleY:0.9979,skewX:-12.9533,skewY:167.0467,x:30.65,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.2,rotation:-0.0271,x:-5.6,y:-58}},{t:this.instance_6,p:{regX:4,scaleX:0.9984,scaleY:0.9984,skewX:2.3132,skewY:-177.6868,x:-35.85,y:189.05,regY:-52.6}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-0.8288,x:-4.8,y:-79.1,regY:53}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-72.7111,x:-43.7,regY:-0.2,y:53.8,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,skewX:107.8631,skewY:-72.1369,x:-67.55,y:132.2,regY:-8.3,regX:5.4}},{t:this.instance_1,p:{regY:-1.3,skewX:134.2203,skewY:-45.7797,x:-68.35,y:140.75,scaleX:0.9982,scaleY:0.9982,regX:6.5}},{t:this.instance,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:-100.2098,x:-57.45,y:-22.95}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:128.9154,x:63.85,y:46.5,regY:-0.7,regX:-39.8}},{t:this.instance_14,p:{regX:-6.2,regY:8.3,scaleX:0.9984,scaleY:0.9984,skewX:-55.668,skewY:124.332,x:13,y:107.2}},{t:this.instance_13,p:{skewX:-63.1177,skewY:116.8823,x:9.9,y:118.05,regY:3.5,regX:-4.9,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:7.4458,x:-22.65,y:91.9,regX:2,regY:-45.4}},{t:this.instance_11,p:{rotation:78.4971,x:47.75,y:-26.2,regX:-31.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_10,p:{rotation:-11.4574,x:14.55,y:93.4,regY:1.6,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_9,p:{regX:3.2,regY:-53.3,scaleX:0.9979,scaleY:0.9979,skewX:-14.4141,skewY:165.5859,x:32.75,y:188.95}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.2,rotation:-0.0009,x:-5.6,y:-58.05}},{t:this.instance_6,p:{regX:3.9,scaleX:0.9984,scaleY:0.9984,skewX:3.9181,skewY:-176.0819,x:-37.6,y:188.55,regY:-52.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-0.5715,x:-4.75,y:-79.1,regY:53}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-73.9128,x:-43.65,regY:-0.2,y:53.7,regX:40.5}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,skewX:106.6596,skewY:-73.3404,x:-65.7,y:132.7,regY:-8.4,regX:5.4}},{t:this.instance_1,p:{regY:-1.3,skewX:133.0179,skewY:-46.9821,x:-66.6,y:141.4,scaleX:0.9983,scaleY:0.9983,regX:6.4}},{t:this.instance,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:-100.2669,x:-57.5,y:-22.95}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-130.4,-208.3,213.9,513.8);


(lib.Tween2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CharacterGood_03();
	this.instance.setTransform(115.05,-1.8,0.3804,0.3804,0,0,180,-39.7,46.4);

	this.instance_1 = new lib.CharacterGood_04();
	this.instance_1.setTransform(-123.8,0,0.3736,0.3736,0,0,180,37.8,49.4);

	this.instance_2 = new lib.CharacterGood_02();
	this.instance_2.setTransform(7.8,-2.7,0.3736,0.3736,0,0,180,-40.1,46.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-138.5,-97.1,274,193.3);


// stage content:
(lib.LessonChapter2_05 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,326];
	this.streamSoundSymbolsList[0] = [{id:"DuringWar205wav",startFrame:0,endFrame:327,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("DuringWar205wav",0);
		this.InsertIntoSoundStreamData(soundInstance,0,327,1);
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
			document.location.replace("/LessonChapter2_06.html");
			}, 500);
			
		}
		
		this.prevBtn.addEventListener("click", fl_ClickToGoToWebPage_2);
		
		function fl_ClickToGoToWebPage_2() {
			createjs.Sound.play("popsound");
			
			setTimeout(function(){
			document.location.replace("/LessonChapter2_04.html");
			}, 500);
			
		}
		
		
		this.replaybtn.addEventListener("click", fl_ClickToGoToAndPlayFromFrame.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame()
		{
			this.gotoAndPlay(1);
		}
	}
	this.frame_326 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(326).call(this.frame_326).wait(1));

	// Subtitle
	this.instance = new lib.CachedBmp_2126();
	this.instance.setTransform(195.55,581,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2125();
	this.instance_1.setTransform(165.6,564.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(327));

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.homeBtn},{t:this.prevBtn},{t:this.nextBtn},{t:this.replaybtn}]}).wait(327));

	// muslims
	this.instance_2 = new lib.Tween2("synched",0);
	this.instance_2.setTransform(166.95,449.8,1.3537,1.3537);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({scaleX:1.0829,scaleY:1.0828,x:387.45,y:372.9},326).wait(1));

	// Layer_1
	this.instance_3 = new lib.CachedBmp_2132();
	this.instance_3.setTransform(797.15,126.85,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_2131();
	this.instance_4.setTransform(793.3,119.4,0.5,0.5);

	this.instance_5 = new lib.ch1_uArm_rcopy_2("synched",0);
	this.instance_5.setTransform(852.85,242.6,0.3501,0.3501,0,90.7492,-89.2508,35.3,0.1);

	this.instance_6 = new lib.ch1_hand_rcopy_2("synched",0);
	this.instance_6.setTransform(829,290.85,0.35,0.35,0,148.1519,-31.8481,6.1,-1.8);

	this.instance_7 = new lib.ch1_thumb_rcopy_2("synched",0);
	this.instance_7.setTransform(830.25,288,0.35,0.35,0,124.8019,-55.1981,5.3,-8.7);

	this.instance_8 = new lib.ch1_lArm_rcopy_2("synched",0);
	this.instance_8.setTransform(852,270.35,0.35,0.35,0,141.5738,-38.4262,40.1,0.2);

	this.instance_9 = new lib.ch1_headcopy_1("synched",0);
	this.instance_9.setTransform(832.75,222.95,0.3503,0.3503,0,3.6363,-176.3637,0.1,52.9);

	this.instance_10 = new lib.ch1_uBodycopy_2("synched",0);
	this.instance_10.setTransform(835.45,243.5,0.3506,0.3506,0,0,180,-0.8,-23.7);

	this.instance_11 = new lib.ch1_lLeg_rcopy_2("synched",0);
	this.instance_11.setTransform(841.3,317,0.35,0.35,0,-16.7909,163.2091,2,-54.1);

	this.instance_12 = new lib.ch1_neckcopy_2("synched",0);
	this.instance_12.setTransform(834.55,230.3,0.3503,0.3503,0,-12.1,167.9,-1.4,9.1);

	this.instance_13 = new lib.ch1_lBodycopy_2("synched",0);
	this.instance_13.setTransform(834.85,267.5,0.3506,0.3506,0,0,180,-1,-22.9);

	this.instance_14 = new lib.ch1_lLeg_lcopy_2("synched",0);
	this.instance_14.setTransform(822.75,317.05,0.3499,0.3499,0,11.5858,-168.4142,2.2,-53.5);

	this.instance_15 = new lib.ch1_uLeg_lcopy_2("synched",0);
	this.instance_15.setTransform(829.5,284.1,0.3499,0.3499,0,14.7096,-165.2904,-1.2,2);

	this.instance_16 = new lib.ch1_hand_lcopy_2("synched",0);
	this.instance_16.setTransform(816.35,292.2,0.35,0.35,0,-58.7193,121.2807,-5,3.3);

	this.instance_17 = new lib.ch1_thumb_lcopy_2("synched",0);
	this.instance_17.setTransform(814.7,288.75,0.3501,0.3501,0,-96.3782,83.6218,-6,8);

	this.instance_18 = new lib.ch1_lArm_lcopy_2("synched",0);
	this.instance_18.setTransform(829.8,264.9,0.3501,0.3501,0,-58.0447,121.9553,-40.5,-0.4);

	this.instance_19 = new lib.ch1_uArm_lcopy_2("synched",0);
	this.instance_19.setTransform(817.1,241.45,0.35,0.35,0,-119.304,60.696,-33.4,-0.2);

	this.instance_20 = new lib.ch1_uLeg_rcopy_2("synched",0);
	this.instance_20.setTransform(838.85,283.2,0.3501,0.3501,0,-1.8359,178.1641,1.4,-45.8);

	this.instance_21 = new lib.CachedBmp_2130();
	this.instance_21.setTransform(901.3,133.05,0.5,0.5);

	this.instance_22 = new lib.CachedBmp_2129();
	this.instance_22.setTransform(897.55,119.45,0.5,0.5);

	this.instance_23 = new lib.ch1_uArm_rcopy2_2("synched",0);
	this.instance_23.setTransform(959.75,243.25,0.3501,0.3501,0,88.8935,-91.1065,35.4,-0.4);

	this.instance_24 = new lib.ch1_hand_rcopy2_2("synched",0);
	this.instance_24.setTransform(936.85,292.05,0.3499,0.3499,0,155.4746,-24.5254,6.1,-2.1);

	this.instance_25 = new lib.ch1_thumb_rcopy2_2("synched",0);
	this.instance_25.setTransform(938.1,289.25,0.35,0.35,0,122.9854,-57.0146,5,-9.2);

	this.instance_26 = new lib.ch1_lArm_rcopy2_2("synched",0);
	this.instance_26.setTransform(959.85,271.1,0.35,0.35,0,140.7679,-39.2321,40.3,0.3);

	this.instance_27 = new lib.ch1_headcopy2_2("synched",0);
	this.instance_27.setTransform(939.5,223.7,0.3502,0.3502,0,3.6319,-176.3681,0.4,52.8);

	this.instance_28 = new lib.ch1_uBodycopy2_2("synched",0);
	this.instance_28.setTransform(942.2,244.25,0.3506,0.3506,0,0,180,-0.8,-23.8);

	this.instance_29 = new lib.ch1_lLeg_rcopy2_2("synched",0);
	this.instance_29.setTransform(951.2,317.4,0.35,0.35,0,-12.7141,167.2859,2.4,-53.1);

	this.instance_30 = new lib.ch1_neckcopy2_2("synched",0);
	this.instance_30.setTransform(941.4,231.05,0.3502,0.3502,0,-12.0991,167.9009,-1.7,9.1);

	this.instance_31 = new lib.ch1_lBodycopy2_2("synched",0);
	this.instance_31.setTransform(941.6,268.3,0.3506,0.3506,0,0,180,-1,-22.4);

	this.instance_32 = new lib.ch1_lLeg_lcopy2_2("synched",0);
	this.instance_32.setTransform(927.2,317.05,0.3498,0.3498,0,6.8888,-173.1112,3.2,-53.3);

	this.instance_33 = new lib.ch1_uLeg_lcopy2_2("synched",0);
	this.instance_33.setTransform(934.65,284.35,0.3498,0.3498,0,15.3899,-164.6101,-1.2,2.2);

	this.instance_34 = new lib.ch1_hand_lcopy2_2("synched",0);
	this.instance_34.setTransform(932.75,300.25,0.35,0.35,0,-61.5991,118.4009,-4.5,3.6);

	this.instance_35 = new lib.ch1_thumb_lcopy2_2("synched",0);
	this.instance_35.setTransform(931.55,296.4,0.35,0.35,0,-87.9313,92.0687,-5.8,8.2);

	this.instance_36 = new lib.ch1_lArm_lcopy2_2("synched",0);
	this.instance_36.setTransform(928.1,268.65,0.35,0.35,0,-97.0838,82.9162,-39.1,-0.8);

	this.instance_37 = new lib.ch1_uArm_lcopy2_2("synched",0);
	this.instance_37.setTransform(923.85,242.25,0.35,0.35,0,-100.1181,79.8819,-32.9,-0.2);

	this.instance_38 = new lib.ch1_uLeg_rcopy2_2("synched",0);
	this.instance_38.setTransform(946.75,283.5,0.35,0.35,0,-5.2376,174.7624,1.7,-45.6);

	this.instance_39 = new lib.CachedBmp_2128();
	this.instance_39.setTransform(1002.15,132.8,0.5,0.5);

	this.instance_40 = new lib.CachedBmp_2127();
	this.instance_40.setTransform(998.4,119.2,0.5,0.5);

	this.instance_41 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_41.setTransform(1061.9,246.25,0.3501,0.3501,0,67.6815,-112.3185,35,0.5);

	this.instance_42 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_42.setTransform(1062.55,301.7,0.35,0.35,0,110.4914,-69.5086,5.9,-1.8);

	this.instance_43 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_43.setTransform(1063.8,298.8,0.35,0.35,0,120.7427,-59.2573,5.2,-9.2);

	this.instance_44 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_44.setTransform(1072.35,271.8,0.3501,0.3501,0,107.3989,-72.6011,39.7,-0.6);

	this.instance_45 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_45.setTransform(1042,226.5,0.3503,0.3503,0,2.022,-177.978,0.4,53.1);

	this.instance_46 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_46.setTransform(1044.3,247.2,0.3506,0.3506,0,0,180,-0.1,-23.1);

	this.instance_47 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_47.setTransform(1048.9,320.35,0.3499,0.3499,0,-9.0524,170.9476,2.4,-53.4);

	this.instance_48 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_48.setTransform(1043.5,233.95,0.3503,0.3503,0,-10.1914,169.8086,-0.9,9.5);

	this.instance_49 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_49.setTransform(1043.75,271.15,0.3506,0.3506,0,0,180,-0.5,-22.6);

	this.instance_50 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_50.setTransform(1035.45,320.6,0.3498,0.3498,0,-0.5249,179.4751,3.4,-52.5);

	this.instance_51 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_51.setTransform(1036.75,286.8,0.3498,0.3498,0,5.1428,-174.8572,-0.7,2.5);

	this.instance_52 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_52.setTransform(1006.85,297.05,0.35,0.35,0,-34.1043,145.8957,-5.2,3.7);

	this.instance_53 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_53.setTransform(1007.55,293,0.3501,0.3501,0,-58.3968,121.6032,-5.8,8.3);

	this.instance_54 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_54.setTransform(1026,271.8,0.35,0.35,0,-49.3025,130.6975,-39.9,-0.4);

	this.instance_55 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_55.setTransform(1025.85,245.2,0.3501,0.3501,0,-91.3287,88.6713,-32.7,0.2);

	this.instance_56 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_56.setTransform(1050.65,286.55,0.3499,0.3499,0,5.6604,-174.3396,1.9,-44.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_56},{t:this.instance_55},{t:this.instance_54},{t:this.instance_53},{t:this.instance_52},{t:this.instance_51},{t:this.instance_50},{t:this.instance_49},{t:this.instance_48},{t:this.instance_47},{t:this.instance_46},{t:this.instance_45},{t:this.instance_44},{t:this.instance_43},{t:this.instance_42},{t:this.instance_41},{t:this.instance_40},{t:this.instance_39},{t:this.instance_38},{t:this.instance_37},{t:this.instance_36},{t:this.instance_35},{t:this.instance_34},{t:this.instance_33},{t:this.instance_32},{t:this.instance_31},{t:this.instance_30},{t:this.instance_29},{t:this.instance_28},{t:this.instance_27},{t:this.instance_26},{t:this.instance_25},{t:this.instance_24},{t:this.instance_23},{t:this.instance_22},{t:this.instance_21},{t:this.instance_20},{t:this.instance_19},{t:this.instance_18},{t:this.instance_17},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3}]}).wait(327));

	// Background
	this.instance_57 = new lib.Chap2Scene4();
	this.instance_57.setTransform(-230,-129,0.7864,0.7864);

	this.timeline.addTween(cjs.Tween.get(this.instance_57).wait(327));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(410,231,996.5,609);
// library properties:
lib.properties = {
	id: 'A6F1A483617F544186FFC32FE4892FD2',
	width: 1280,
	height: 720,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/LessonChapter2_05_atlas_1.png", id:"LessonChapter2_05_atlas_1"},
		{src:"images/LessonChapter2_05_atlas_2.png", id:"LessonChapter2_05_atlas_2"},
		{src:"sounds/DuringWar205wav.mp3", id:"DuringWar205wav"},
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