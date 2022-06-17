(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"LessonChapter1_11_atlas_1", frames: [[1872,0,163,120],[1872,122,163,120],[1755,620,134,50],[1192,1335,132,102],[1862,1282,134,130],[1585,0,285,308],[1872,244,77,245],[1546,1188,77,244],[287,1188,304,286],[1585,310,285,308],[1951,244,77,245],[1625,1188,77,244],[893,1188,297,265],[1282,329,285,308],[1916,491,77,245],[1704,1282,77,244],[593,1188,298,288],[0,1188,285,308],[1916,738,77,245],[1783,1282,77,244],[1282,639,193,36],[1282,677,193,36],[1282,0,301,327],[1862,1414,122,50],[1192,1188,175,145],[1781,990,202,144],[1755,672,115,48],[1369,1188,175,145],[1781,1136,199,144],[0,990,1779,196],[0,722,1914,266],[1662,620,91,87],[1569,620,91,88],[1326,1335,110,107],[0,0,1280,720]]}
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



(lib.CachedBmp_1891 = function() {
	this.initialize(ss["LessonChapter1_11_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1890 = function() {
	this.initialize(ss["LessonChapter1_11_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1889 = function() {
	this.initialize(ss["LessonChapter1_11_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1888 = function() {
	this.initialize(ss["LessonChapter1_11_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1887 = function() {
	this.initialize(ss["LessonChapter1_11_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1886 = function() {
	this.initialize(ss["LessonChapter1_11_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1885 = function() {
	this.initialize(ss["LessonChapter1_11_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1884 = function() {
	this.initialize(ss["LessonChapter1_11_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1883 = function() {
	this.initialize(ss["LessonChapter1_11_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1882 = function() {
	this.initialize(ss["LessonChapter1_11_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1881 = function() {
	this.initialize(ss["LessonChapter1_11_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1880 = function() {
	this.initialize(ss["LessonChapter1_11_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1879 = function() {
	this.initialize(ss["LessonChapter1_11_atlas_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1878 = function() {
	this.initialize(ss["LessonChapter1_11_atlas_1"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1877 = function() {
	this.initialize(ss["LessonChapter1_11_atlas_1"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1876 = function() {
	this.initialize(ss["LessonChapter1_11_atlas_1"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1875 = function() {
	this.initialize(ss["LessonChapter1_11_atlas_1"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1874 = function() {
	this.initialize(ss["LessonChapter1_11_atlas_1"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1873 = function() {
	this.initialize(ss["LessonChapter1_11_atlas_1"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1872 = function() {
	this.initialize(ss["LessonChapter1_11_atlas_1"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1871 = function() {
	this.initialize(ss["LessonChapter1_11_atlas_1"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1870 = function() {
	this.initialize(ss["LessonChapter1_11_atlas_1"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1869 = function() {
	this.initialize(ss["LessonChapter1_11_atlas_1"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1868 = function() {
	this.initialize(ss["LessonChapter1_11_atlas_1"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1867 = function() {
	this.initialize(ss["LessonChapter1_11_atlas_1"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1866 = function() {
	this.initialize(ss["LessonChapter1_11_atlas_1"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1865 = function() {
	this.initialize(ss["LessonChapter1_11_atlas_1"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1864 = function() {
	this.initialize(ss["LessonChapter1_11_atlas_1"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1863 = function() {
	this.initialize(ss["LessonChapter1_11_atlas_1"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1862 = function() {
	this.initialize(ss["LessonChapter1_11_atlas_1"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1861 = function() {
	this.initialize(ss["LessonChapter1_11_atlas_1"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.CompoundPath = function() {
	this.initialize(ss["LessonChapter1_11_atlas_1"]);
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.Group_1 = function() {
	this.initialize(ss["LessonChapter1_11_atlas_1"]);
	this.gotoAndStop(32);
}).prototype = p = new cjs.Sprite();



(lib.Path = function() {
	this.initialize(ss["LessonChapter1_11_atlas_1"]);
	this.gotoAndStop(33);
}).prototype = p = new cjs.Sprite();



(lib.Chap1Scene2 = function() {
	this.initialize(ss["LessonChapter1_11_atlas_1"]);
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
	this.instance = new lib.CachedBmp_1890();
	this.instance.setTransform(-40.65,-35.5,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_1891();
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
	this.instance = new lib.CachedBmp_1887();
	this.instance.setTransform(-33.05,-28.05,0.4875,0.4875);

	this.instance_1 = new lib.CachedBmp_1889();
	this.instance_1.setTransform(-33,10.75,0.4875,0.4875);

	this.instance_2 = new lib.CachedBmp_1888();
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
	this.instance = new lib.CachedBmp_1886();
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
	this.instance = new lib.CachedBmp_1885();
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
	this.instance = new lib.CachedBmp_1884();
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
	this.instance = new lib.CachedBmp_1883();
	this.instance.setTransform(-73.35,-69.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-73.3,-69.7,152,143);


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
	this.instance = new lib.CachedBmp_1882();
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
	this.instance = new lib.CachedBmp_1881();
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
	this.instance = new lib.CachedBmp_1880();
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
	this.instance = new lib.CachedBmp_1879();
	this.instance.setTransform(-69.8,-71.9,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-69.8,-71.9,148.5,132.5);


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
	this.instance_1 = new lib.CachedBmp_1878();
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
	this.instance_1 = new lib.CachedBmp_1877();
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
	this.instance_1 = new lib.CachedBmp_1876();
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
	this.instance_1 = new lib.CachedBmp_1875();
	this.instance_1.setTransform(-70.3,-70.05,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-70.3,-70,149,144);


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
	this.shape_2.graphics.f("#D3C2B2").s().p("Ai0P6QhBhBgGhvQgztggPrBQgDhwA9hZIADgGQAuhFBHglQBCgkBLAAQBMAABCAkQBHAlAuBFQAfAvAOA2QAPA3gDA5QgWGegiGRQgjGmgoFGQgNBwhFBAQg+A7hSAAQhSAAg7g7g");
	this.shape_2.setTransform(1.4118,4.5254,0.5593,0.5593);

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
	this.shape_2.graphics.f("#D3C2B2").s().p("Ai0P6QhBhBgGhvQgztggPrBQgDhwA9hZIADgGQAuhFBHglQBCgkBLAAQBMAABCAkQBHAlAuBFQAfAvAOA2QAPA3gDA5QgWGegiGRQgjGmgoFGQgNBwhFBAQg+A7hSAAQhSAAg7g7g");
	this.shape_2.setTransform(-2.1882,53.1254,0.5593,0.5593);

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
	this.instance_1 = new lib.CachedBmp_1874();
	this.instance_1.setTransform(-68.4,-83.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.4,-83.6,142.5,154);


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
	this.shape_1.graphics.f("#FBF6E0").s().p("AgyByQjCgPiugVQgfgEgSgWQgRgVgBgbQgBgbAPgUQARgXAfgEQC6gYCegPQC/gSBkAAQCMAAA/AbQBHAfAABLQAABMhDAZQg3AViYAAQhUAAiygOg");
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
	this.shape_1.graphics.f("#FBF6E0").s().p("AmeBlQhHgfAAhLQAAhMBDgZQA3gVCYAAQBUAACxAOQDDAPCuAVQAfAEASAXQARAUABAbQABAbgPAUQgRAXgfAEQi9AYicAPQi/AShjAAQiMAAg/gbg");
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
	this.instance_1 = new lib.CachedBmp_1873();
	this.instance_1.setTransform(-19.45,-61.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.4,-61.7,38.5,122.5);


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
	this.instance_1 = new lib.CachedBmp_1872();
	this.instance_1.setTransform(-19.4,-60.8,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.4,-60.8,38.5,122);


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
	this.shape_1.graphics.f("#FBF6E0").s().p("Aj6IgQlcgekVg8QAgk8gMl8QgHi/gNh/QGuAMGxATQNhAmASAkQAFAKAAArQAABtggE6QgWDdgaDUQj8BrmrAAQipAAjGgRg");
	this.shape_1.setTransform(0.409,19.4371,0.563,0.563);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#66FFCC").s().p("AkJKjQjcg/iKhzQh4hkgmkXQggjwAoiyQAxjcDvh2QDZhsEfAOQEhAODSCBQDnCOAlDlQAXCUgeCmQgfCjhKCNQhOCShtBXQh1BdiFAGQgoACgoAAQjcAAjKg7g");
	this.shape_2.setTransform(-0.05,-19.1,0.5738,0.5738,0,0,0,0,-33.3);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.9,-42.1,98.6,93.1);


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
	this.instance = new lib.CachedBmp_1871();
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
	this.instance = new lib.CachedBmp_1870();
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

	// Layer_1
	this.instance_1 = new lib.CachedBmp_1869();
	this.instance_1.setTransform(-71.45,-78.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-71.4,-78.7,150.5,163.5);


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
	this.instance = new lib.CachedBmp_1866();
	this.instance.setTransform(-43.65,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_1868();
	this.instance_1.setTransform(-3.8,-12.5,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_1867();
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
	this.instance = new lib.CachedBmp_1863();
	this.instance.setTransform(-55.95,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_1865();
	this.instance_1.setTransform(-55.95,-12,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_1864();
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
	this.instance.setTransform(-55.75,-21.25,0.9982,0.9982,-72.2104,0,0,37.6,-0.1);

	this.instance_1 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_1.setTransform(-65,143.9,0.9981,0.9981,-99.0165,0,0,6.2,-1.5);

	this.instance_2 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_2.setTransform(-65.15,134.8,0.9983,0.9983,-98.9152,0,0,5.4,-8.7);

	this.instance_3 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_3.setTransform(-79.45,54.95,0.9982,0.9982,-100.1735,0,0,40.6,0.2);

	this.instance_4 = new lib.ch1_headcopy2("synched",0);
	this.instance_4.setTransform(-5,-79.2,0.9989,0.9989,-0.5926,0,0,-0.2,52.9);

	this.instance_5 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_5.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_6 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_6.setTransform(12.1,180.3,0.9981,0.9981,-6.9917,0,0,2.9,-53.4);

	this.instance_7 = new lib.ch1_neckcopy2("synched",0);
	this.instance_7.setTransform(-5.75,-58,0.9989,0.9989,-0.105,0,0,-1.4,8.8);

	this.instance_8 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_8.setTransform(-5.55,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_9 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_9.setTransform(-18.2,181.75,0.9979,0.9979,17.7329,0,0,2.7,-53);

	this.instance_10 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_10.setTransform(17.3,92.8,0.9978,0.9978,19.0587,0,0,-1.7,2.1);

	this.instance_11 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_11.setTransform(133.55,114.05,0.9982,0.9982,20.673,0,0,-4.8,3.6);

	this.instance_12 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_12.setTransform(128.2,103.65,0.9983,0.9983,44.5219,0,0,-6.4,8.2);

	this.instance_13 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_13.setTransform(79.45,41.2,0.9983,0.9983,52.8514,0,0,-39.6,0.4);

	this.instance_14 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_14.setTransform(47.6,-26.75,0.9984,0.9984,65.2386,0,0,-31.4,-1.6);

	this.instance_15 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_15.setTransform(-26.65,89.6,0.9983,0.9983,-25.3709,0,0,2,-46);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{regX:2,rotation:-25.3709,x:-26.65,y:89.6,scaleX:0.9983,scaleY:0.9983,regY:-46}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9984,scaleY:0.9984,rotation:65.2386,x:47.6,y:-26.75,regY:-1.6}},{t:this.instance_13,p:{regX:-39.6,regY:0.4,scaleX:0.9983,scaleY:0.9983,rotation:52.8514,x:79.45,y:41.2}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:44.5219,x:128.2,y:103.65,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{rotation:20.673,x:133.55,y:114.05,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_10,p:{rotation:19.0587,y:92.8,scaleX:0.9978,scaleY:0.9978,x:17.3,regX:-1.7,regY:2.1}},{t:this.instance_9,p:{regX:2.7,scaleX:0.9979,scaleY:0.9979,rotation:17.7329,x:-18.2,y:181.75,regY:-53}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{rotation:-0.105,x:-5.75,y:-58}},{t:this.instance_6,p:{regY:-53.4,scaleX:0.9981,scaleY:0.9981,rotation:-6.9917,x:12.1,y:180.3,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,scaleX:0.9989,scaleY:0.9989,rotation:-0.5926,y:-79.2,x:-5}},{t:this.instance_3,p:{regX:40.6,regY:0.2,rotation:-100.1735,x:-79.45,y:54.95,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-98.9152,x:-65.15,y:134.8,regX:5.4}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-99.0165,x:-65,y:143.9,regY:-1.5}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-72.2104,y:-21.25,regX:37.6,x:-55.75}}]}).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-23.6012,x:-26.2,y:89.7,scaleX:0.9983,scaleY:0.9983,regY:-46}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9983,scaleY:0.9983,rotation:67.7361,x:47.75,y:-26.65,regY:-1.6}},{t:this.instance_13,p:{regX:-39.5,regY:0.2,scaleX:0.9982,scaleY:0.9982,rotation:54.9286,x:76.7,y:42.45}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:46.5998,x:122.95,y:106.6,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{rotation:22.751,x:127.85,y:117.35,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_10,p:{rotation:16.946,y:92.75,scaleX:0.9978,scaleY:0.9978,x:17.3,regX:-1.7,regY:2.1}},{t:this.instance_9,p:{regX:2.8,scaleX:0.9978,scaleY:0.9978,rotation:15.6218,x:-14.8,y:182.95,regY:-53}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{rotation:-0.1042,x:-5.7,y:-57.95}},{t:this.instance_6,p:{regY:-53.3,scaleX:0.998,scaleY:0.998,rotation:-5.2221,x:9.7,y:181.7,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,scaleX:0.9988,scaleY:0.9988,rotation:-0.3134,y:-79.3,x:-5}},{t:this.instance_3,p:{regX:40.5,regY:0.1,rotation:-102.6478,x:-77.05,y:55.9,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9982,scaleY:0.9982,rotation:-101.3905,x:-59.05,y:134.85,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-101.491,x:-58.7,y:143.9,regY:-1.5}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-74.0651,y:-21.2,regX:37.6,x:-55.75}}]},1).to({state:[{t:this.instance_15,p:{regX:2,rotation:-21.8326,x:-25.95,y:89.9,scaleX:0.9983,scaleY:0.9983,regY:-46}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9983,scaleY:0.9983,rotation:70.234,x:47.7,y:-26.75,regY:-1.6}},{t:this.instance_13,p:{regX:-39.5,regY:0.2,scaleX:0.9982,scaleY:0.9982,rotation:57.0069,x:73.7,y:43.65}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:48.6792,x:117.6,y:109.55,regY:8.3,regX:-6.4}},{t:this.instance_11,p:{rotation:24.8295,x:122.05,y:120.3,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_10,p:{rotation:14.8326,y:92.8,scaleX:0.9977,scaleY:0.9977,x:17.1,regX:-1.7,regY:2.1}},{t:this.instance_9,p:{regX:2.7,scaleX:0.9978,scaleY:0.9978,rotation:13.5079,x:-11.7,y:184.3,regY:-52.9}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{rotation:-0.1042,x:-5.7,y:-57.95}},{t:this.instance_6,p:{regY:-53.4,scaleX:0.998,scaleY:0.998,rotation:-3.4527,x:7.2,y:182.85,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,scaleX:0.9988,scaleY:0.9988,rotation:-0.0333,y:-79.3,x:-5}},{t:this.instance_3,p:{regX:40.5,regY:0.1,rotation:-105.1254,x:-74.5,y:56.5,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-103.8676,x:-53.3,y:134.55,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-103.9685,x:-52.35,y:143.6,regY:-1.5}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-75.9194,y:-21.05,regX:37.5,x:-55.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2,rotation:-20.0628,x:-25.5,y:90,scaleX:0.9983,scaleY:0.9983,regY:-46}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9983,scaleY:0.9983,rotation:72.7319,x:47.7,y:-26.75,regY:-1.6}},{t:this.instance_13,p:{regX:-39.5,regY:0.2,scaleX:0.9982,scaleY:0.9982,rotation:59.0863,x:70.6,y:44.65}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:50.756,x:112.1,y:112.15,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{rotation:26.9078,x:116.15,y:123.15,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_10,p:{rotation:12.7185,y:92.85,scaleX:0.9978,scaleY:0.9978,x:17.05,regX:-1.7,regY:2.1}},{t:this.instance_9,p:{regX:2.7,scaleX:0.9978,scaleY:0.9978,rotation:11.3946,x:-8.35,y:185.2,regY:-53}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{rotation:-0.1042,x:-5.7,y:-57.95}},{t:this.instance_6,p:{regY:-53.4,scaleX:0.998,scaleY:0.998,rotation:-1.683,x:4.65,y:183.9,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,scaleX:0.9988,scaleY:0.9988,rotation:0.2407,y:-79.3,x:-4.95}},{t:this.instance_3,p:{regX:40.5,regY:0.2,rotation:-107.6026,x:-71.85,y:57,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-106.3446,x:-47.35,y:134.25,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-106.445,x:-46.1,y:143.05,regY:-1.5}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-77.7753,y:-21.15,regX:37.5,x:-55.75}}]},1).to({state:[{t:this.instance_15,p:{regX:2,rotation:-18.2918,x:-25.2,y:90.2,scaleX:0.9983,scaleY:0.9983,regY:-46}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9983,scaleY:0.9983,rotation:75.2297,x:47.7,y:-26.75,regY:-1.6}},{t:this.instance_13,p:{regX:-39.5,regY:0.2,scaleX:0.9982,scaleY:0.9982,rotation:61.1638,x:67.45,y:45.6}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:52.8353,x:106.5,y:114.5,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{rotation:28.9861,x:110.15,y:125.6,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_10,p:{rotation:10.6052,y:92.85,scaleX:0.9977,scaleY:0.9977,x:16.9,regX:-1.7,regY:2.1}},{t:this.instance_9,p:{regX:2.6,scaleX:0.9978,scaleY:0.9978,rotation:9.2811,x:-5.2,y:186.05,regY:-53}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{rotation:-0.1042,x:-5.65,y:-57.95}},{t:this.instance_6,p:{regY:-53.4,scaleX:0.998,scaleY:0.998,rotation:0.0815,x:2.3,y:185,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,scaleX:0.9988,scaleY:0.9988,rotation:0.5208,y:-79.3,x:-5}},{t:this.instance_3,p:{regX:40.5,regY:0.1,rotation:-110.0787,x:-69.45,y:57.55,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-108.821,x:-41.5,y:133.6,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-108.9222,x:-39.85,y:142.4,regY:-1.5}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-79.6306,y:-21.1,regX:37.5,x:-55.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2,rotation:-16.5231,x:-24.85,y:90.35,scaleX:0.9982,scaleY:0.9982,regY:-46}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9983,scaleY:0.9983,rotation:77.7276,x:47.7,y:-26.75,regY:-1.6}},{t:this.instance_13,p:{regX:-39.5,regY:0.2,scaleX:0.9982,scaleY:0.9982,rotation:63.243,x:64.25,y:46.4}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:54.9138,x:100.85,y:116.65,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{rotation:31.0648,x:104.05,y:127.95,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_10,p:{rotation:8.4929,y:92.95,scaleX:0.9978,scaleY:0.9978,x:16.8,regX:-1.7,regY:2.1}},{t:this.instance_9,p:{regX:2.7,scaleX:0.9978,scaleY:0.9978,rotation:7.1676,x:-1.8,y:187.1,regY:-52.9}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{rotation:-0.1033,x:-5.65,y:-57.95}},{t:this.instance_6,p:{regY:-53.4,scaleX:0.998,scaleY:0.998,rotation:1.8513,x:-0.4,y:185.9,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,scaleX:0.9988,scaleY:0.9988,rotation:0.8001,y:-79.3,x:-5}},{t:this.instance_3,p:{regX:40.5,regY:0.1,rotation:-112.555,x:-66.85,y:57.9,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-111.2985,x:-35.7,y:132.75,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-111.3985,x:-33.65,y:141.4,regY:-1.5}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-81.4848,y:-21.15,regX:37.5,x:-55.75}}]},1).to({state:[{t:this.instance_15,p:{regX:2,rotation:-14.7525,x:-24.4,y:90.55,scaleX:0.9982,scaleY:0.9982,regY:-45.9}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9983,scaleY:0.9983,rotation:80.2251,x:47.65,y:-26.65,regY:-1.6}},{t:this.instance_13,p:{regX:-39.6,regY:0.2,scaleX:0.9982,scaleY:0.9982,rotation:65.3213,x:61,y:47}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:56.9913,x:95.05,y:118.7,regY:8.2,regX:-6.3}},{t:this.instance_11,p:{rotation:33.1425,x:97.9,y:129.95,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_10,p:{rotation:6.3801,y:93,scaleX:0.9977,scaleY:0.9977,x:16.55,regX:-1.8,regY:2.1}},{t:this.instance_9,p:{regX:2.7,scaleX:0.9978,scaleY:0.9978,rotation:5.0552,x:1.65,y:187.55,regY:-53}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{rotation:-0.1033,x:-5.65,y:-57.95}},{t:this.instance_6,p:{regY:-53.4,scaleX:0.998,scaleY:0.998,rotation:3.6213,x:-3,y:186.75,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,scaleX:0.9988,scaleY:0.9988,rotation:1.0802,y:-79.15,x:-4.9}},{t:this.instance_3,p:{regX:40.5,regY:0.1,rotation:-115.0325,x:-64.3,y:58.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-113.7736,x:-29.9,y:131.55,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-113.875,x:-27.45,y:140.2,regY:-1.5}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-83.3387,y:-21.2,regX:37.5,x:-55.75}}]},1).to({state:[{t:this.instance_15,p:{regX:2,rotation:-12.9839,x:-24.1,y:90.6,scaleX:0.9983,scaleY:0.9983,regY:-46}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9983,scaleY:0.9983,rotation:82.7231,x:47.8,y:-26.7,regY:-1.7}},{t:this.instance_13,p:{regX:-39.5,regY:0.2,scaleX:0.9982,scaleY:0.9982,rotation:67.3995,x:57.8,y:47.6}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:59.0711,x:89.25,y:120.25,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{rotation:35.2204,x:91.6,y:131.75,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_10,p:{rotation:4.2667,y:93.05,scaleX:0.9978,scaleY:0.9978,x:16.6,regX:-1.7,regY:2.1}},{t:this.instance_9,p:{regX:2.7,scaleX:0.9978,scaleY:0.9978,rotation:2.9418,x:5,y:188.25,regY:-52.9}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{rotation:-0.1033,x:-5.6,y:-57.95}},{t:this.instance_6,p:{regY:-53.4,scaleX:0.998,scaleY:0.998,rotation:5.392,x:-5.65,y:187.5,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,scaleX:0.9989,scaleY:0.9989,rotation:1.3594,y:-79.25,x:-4.9}},{t:this.instance_3,p:{regX:40.5,regY:0.1,rotation:-117.5087,x:-61.7,y:58.45,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-116.2513,x:-24.35,y:130.2,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-116.3512,x:-21.4,y:138.7,regY:-1.5}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-85.1945,y:-21.1,regX:37.5,x:-55.75}}]},1).to({state:[{t:this.instance_15,p:{regX:2,rotation:-11.2141,x:-23.8,y:90.7,scaleX:0.9983,scaleY:0.9983,regY:-46}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9983,scaleY:0.9983,rotation:85.2199,x:47.7,y:-26.75,regY:-1.6}},{t:this.instance_13,p:{regX:-39.5,regY:0.2,scaleX:0.9982,scaleY:0.9982,rotation:69.478,x:54.6,y:47.9}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:61.149,x:83.3,y:121.75,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{rotation:37.2989,x:85.35,y:133.25,regX:-4.7,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_10,p:{rotation:2.1543,y:93.1,scaleX:0.9978,scaleY:0.9978,x:16.45,regX:-1.7,regY:2.1}},{t:this.instance_9,p:{regX:2.7,scaleX:0.9978,scaleY:0.9978,rotation:0.8289,x:8.25,y:188.55,regY:-53}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{rotation:-0.1033,x:-5.6,y:-57.95}},{t:this.instance_6,p:{regY:-53.4,scaleX:0.998,scaleY:0.998,rotation:7.1608,x:-8.25,y:188.15,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,scaleX:0.9988,scaleY:0.9988,rotation:1.6379,y:-79.25,x:-4.9}},{t:this.instance_3,p:{regX:40.5,regY:0.1,rotation:-119.986,x:-59.1,y:58.6,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-118.7273,x:-18.6,y:128.7,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-118.8277,x:-15.4,y:137.05,regY:-1.5}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-87.0505,y:-21.2,regX:37.5,x:-55.75}}]},1).to({state:[{t:this.instance_15,p:{regX:2,rotation:-9.4442,x:-23.45,y:90.85,scaleX:0.9983,scaleY:0.9983,regY:-46}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9983,scaleY:0.9983,rotation:87.719,x:47.65,y:-26.6,regY:-1.6}},{t:this.instance_13,p:{regX:-39.5,regY:0.2,scaleX:0.9982,scaleY:0.9982,rotation:71.5559,x:51.35,y:48.15}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:63.2274,x:77.35,y:123,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{rotation:39.378,x:78.85,y:134.55,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_10,p:{rotation:0.0403,y:93.1,scaleX:0.9978,scaleY:0.9978,x:16.35,regX:-1.7,regY:2.1}},{t:this.instance_9,p:{regX:2.7,scaleX:0.9978,scaleY:0.9978,rotation:-1.2794,x:11.7,y:189,regY:-52.9}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{rotation:-0.1024,x:-5.6,y:-57.95}},{t:this.instance_6,p:{regY:-53.4,scaleX:0.998,scaleY:0.998,rotation:8.9313,x:-10.95,y:188.75,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,scaleX:0.9988,scaleY:0.9988,rotation:1.919,y:-79.25,x:-4.9}},{t:this.instance_3,p:{regX:40.5,regY:0.1,rotation:-122.4613,x:-56.55,y:58.65,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-121.2033,x:-13,y:126.95,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-121.3045,x:-9.45,y:135.15,regY:-1.5}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-88.9051,y:-21.1,regX:37.5,x:-55.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2,rotation:-7.6757,x:-22.95,y:91.1,scaleX:0.9983,scaleY:0.9983,regY:-45.9}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9983,scaleY:0.9983,rotation:90.2119,x:47.65,y:-26.7,regY:-1.6}},{t:this.instance_13,p:{regX:-39.6,regY:0.2,scaleX:0.9982,scaleY:0.9982,rotation:73.635,x:48,y:48.1}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:65.3055,x:71.3,y:124,regY:8.3,regX:-6.4}},{t:this.instance_11,p:{rotation:41.4558,x:72.45,y:135.6,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_10,p:{rotation:-2.0683,y:93.15,scaleX:0.9978,scaleY:0.9978,x:16.35,regX:-1.7,regY:2.1}},{t:this.instance_9,p:{regX:2.7,scaleX:0.9978,scaleY:0.9978,rotation:-3.3937,x:15.1,y:189,regY:-53}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{rotation:-0.1024,x:-5.6,y:-57.95}},{t:this.instance_6,p:{regY:-53.3,scaleX:0.998,scaleY:0.998,rotation:10.7005,x:-13.5,y:189.4,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,scaleX:0.9988,scaleY:0.9988,rotation:2.1993,y:-79.25,x:-4.9}},{t:this.instance_3,p:{regX:40.6,regY:0.1,rotation:-124.9386,x:-54,y:58.55,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-123.6791,x:-7.6,y:125,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-123.78,x:-3.7,y:133,regY:-1.5}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-90.7559,y:-21.25,regX:37.5,x:-55.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-5.9043,x:-22.5,y:91.1,scaleX:0.9983,scaleY:0.9983,regY:-46}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9983,scaleY:0.9983,rotation:92.7096,x:47.8,y:-26.55,regY:-1.7}},{t:this.instance_13,p:{regX:-39.5,regY:0.3,scaleX:0.9982,scaleY:0.9982,rotation:75.7129,x:44.7,y:48.25}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:67.3849,x:65.45,y:124.7,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{rotation:43.5345,x:66,y:136.3,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_10,p:{rotation:-4.1808,y:93.2,scaleX:0.9978,scaleY:0.9978,x:16.2,regX:-1.7,regY:2.1}},{t:this.instance_9,p:{regX:2.8,scaleX:0.9978,scaleY:0.9978,rotation:-5.5058,x:18.7,y:189.05,regY:-53}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{rotation:-0.1024,x:-5.55,y:-57.95}},{t:this.instance_6,p:{regY:-53.4,scaleX:0.998,scaleY:0.998,rotation:12.4704,x:-16.25,y:189.6,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,scaleX:0.9988,scaleY:0.9988,rotation:2.477,y:-79.2,x:-4.9}},{t:this.instance_3,p:{regX:40.5,regY:0.1,rotation:-127.4151,x:-51.35,y:58.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-126.1571,x:-2.15,y:122.8,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-126.2574,x:2.1,y:130.7,regY:-1.5}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-92.6102,y:-21.25,regX:37.5,x:-55.75}}]},1).to({state:[{t:this.instance_15,p:{regX:2,rotation:-4.1363,x:-22.3,y:91.25,scaleX:0.9983,scaleY:0.9983,regY:-46}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9983,scaleY:0.9983,rotation:95.2073,x:47.65,y:-26.6,regY:-1.6}},{t:this.instance_13,p:{regX:-39.5,regY:0.2,scaleX:0.9982,scaleY:0.9982,rotation:77.7915,x:41.55,y:48}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:69.4625,x:59.35,y:125.25,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{rotation:45.6132,x:59.6,y:136.8,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_10,p:{rotation:-6.2944,y:93.4,scaleX:0.9977,scaleY:0.9977,x:16.05,regX:-1.7,regY:2.2}},{t:this.instance_9,p:{regX:2.7,scaleX:0.9978,scaleY:0.9978,rotation:-7.6192,x:21.9,y:188.9,regY:-53}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{rotation:-0.1024,x:-5.55,y:-57.95}},{t:this.instance_6,p:{regY:-53.4,scaleX:0.998,scaleY:0.998,rotation:14.2406,x:-18.9,y:189.9,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,scaleX:0.9988,scaleY:0.9988,rotation:2.7565,y:-79.05,x:-4.9}},{t:this.instance_3,p:{regX:40.5,regY:0.1,rotation:-129.8916,x:-48.8,y:58.3,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-128.6341,x:3.15,y:120.4,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-128.7349,x:7.8,y:127.95,regY:-1.4}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-94.4655,y:-21.2,regX:37.5,x:-55.75}}]},1).to({state:[{t:this.instance_15,p:{regX:2,rotation:-2.3661,x:-21.95,y:91.35,scaleX:0.9983,scaleY:0.9983,regY:-46}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9983,scaleY:0.9983,rotation:97.7043,x:47.65,y:-26.65,regY:-1.6}},{t:this.instance_13,p:{regX:-39.5,regY:0.2,scaleX:0.9982,scaleY:0.9982,rotation:79.87,x:38.3,y:47.7}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:71.5412,x:53.4,y:125.5,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{rotation:47.6914,x:53.1,y:137.05,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_10,p:{rotation:-8.4069,y:93.3,scaleX:0.9978,scaleY:0.9978,x:15.8,regX:-1.8,regY:2.1}},{t:this.instance_9,p:{regX:2.6,scaleX:0.9978,scaleY:0.9978,rotation:-9.7331,x:25.2,y:188.75,regY:-53}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{rotation:-0.1024,x:-5.55,y:-57.95}},{t:this.instance_6,p:{regY:-53.4,scaleX:0.998,scaleY:0.998,rotation:16.0103,x:-21.5,y:190.25,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,scaleX:0.9988,scaleY:0.9988,rotation:3.0379,y:-79.2,x:-4.9}},{t:this.instance_3,p:{regX:40.5,regY:0.1,rotation:-132.37,x:-46.25,y:58.05,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-131.1091,x:8.35,y:117.85,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-131.2093,x:13.15,y:125.35,regY:-1.6}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-96.321,y:-21.25,regX:37.5,x:-55.75}}]},1).to({state:[{t:this.instance_15,p:{regX:2,rotation:-0.5964,x:-21.6,y:91.65,scaleX:0.9983,scaleY:0.9983,regY:-45.9}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9983,scaleY:0.9983,rotation:100.2026,x:47.55,y:-26.6,regY:-1.6}},{t:this.instance_13,p:{regX:-39.5,regY:0.2,scaleX:0.9982,scaleY:0.9982,rotation:81.9484,x:35.1,y:47.2}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:73.6202,x:47.3,y:125.5,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{rotation:49.7687,x:46.65,y:137,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_10,p:{rotation:-10.5205,y:93.35,scaleX:0.9978,scaleY:0.9978,x:15.85,regX:-1.7,regY:2.1}},{t:this.instance_9,p:{regX:2.7,scaleX:0.9978,scaleY:0.9978,rotation:-11.8456,x:28.8,y:188.3,regY:-53}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{rotation:-0.1015,x:-5.5,y:-57.95}},{t:this.instance_6,p:{regY:-53.4,scaleX:0.998,scaleY:0.998,rotation:17.7787,x:-24.3,y:190.2,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,scaleX:0.9988,scaleY:0.9988,rotation:3.3166,y:-79.15,x:-4.85}},{t:this.instance_3,p:{regX:40.5,regY:0.1,rotation:-134.8458,x:-43.7,y:57.7,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-133.586,x:13.4,y:115.1,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-133.686,x:18.65,y:122.3,regY:-1.5}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-98.1762,y:-21.2,regX:37.5,x:-55.75}}]},1).to({state:[{t:this.instance_15,p:{regX:2,rotation:1.1684,x:-21.2,y:91.6,scaleX:0.9983,scaleY:0.9983,regY:-46}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9983,scaleY:0.9983,rotation:102.7004,x:47.65,y:-26.7,regY:-1.6}},{t:this.instance_13,p:{regX:-39.5,regY:0.2,scaleX:0.9983,scaleY:0.9983,rotation:84.0267,x:31.9,y:46.55}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:75.6985,x:41.15,y:125.25,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{rotation:51.8475,x:40.1,y:136.8,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_10,p:{rotation:-12.6333,y:93.35,scaleX:0.9978,scaleY:0.9978,x:15.7,regX:-1.7,regY:2.1}},{t:this.instance_9,p:{regX:2.6,scaleX:0.9978,scaleY:0.9978,rotation:-13.958,x:32.05,y:187.9,regY:-53}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{rotation:-0.1015,x:-5.5,y:-57.95}},{t:this.instance_6,p:{regY:-53.4,scaleX:0.998,scaleY:0.998,rotation:19.5486,x:-26.95,y:190.25,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,scaleX:0.9988,scaleY:0.9988,rotation:3.5964,y:-79.05,x:-4.8}},{t:this.instance_3,p:{regX:40.5,regY:0.1,rotation:-137.3219,x:-41.1,y:57.25,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-136.0634,x:18.35,y:112.1,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-136.1646,x:23.95,y:119.05,regY:-1.5}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-100.0313,y:-21.25,regX:37.5,x:-55.7}}]},1).to({state:[{t:this.instance_15,p:{regX:2,rotation:2.9378,x:-20.8,y:91.75,scaleX:0.9983,scaleY:0.9983,regY:-46}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9983,scaleY:0.9983,rotation:105.1992,x:47.65,y:-26.7,regY:-1.6}},{t:this.instance_13,p:{regX:-39.6,regY:0.2,scaleX:0.9983,scaleY:0.9982,rotation:86.1048,x:28.7,y:45.65}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.7768,x:35.2,y:124.85,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{rotation:53.9259,x:33.75,y:136.3,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_10,p:{rotation:-14.7465,y:93.45,scaleX:0.9977,scaleY:0.9977,x:15.65,regX:-1.7,regY:2.1}},{t:this.instance_9,p:{regX:2.7,scaleX:0.9978,scaleY:0.9978,rotation:-16.071,x:35.5,y:187.2,regY:-53}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{rotation:-0.1015,x:-5.5,y:-57.95}},{t:this.instance_6,p:{regY:-53.4,scaleX:0.998,scaleY:0.998,rotation:21.3181,x:-29.6,y:190.15,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,scaleX:0.9988,scaleY:0.9988,rotation:3.8754,y:-79.15,x:-4.75}},{t:this.instance_3,p:{regX:40.5,regY:0.1,rotation:-139.7993,x:-38.65,y:56.65,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-138.5409,x:23.3,y:109,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-138.641,x:29.05,y:115.6,regY:-1.5}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-101.8861,y:-21.35,regX:37.6,x:-55.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2,rotation:4.7083,x:-20.5,y:91.85,scaleX:0.9983,scaleY:0.9983,regY:-46}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9983,scaleY:0.9983,rotation:107.6958,x:47.6,y:-26.5,regY:-1.6}},{t:this.instance_13,p:{regX:-39.5,regY:0.2,scaleX:0.9983,scaleY:0.9982,rotation:88.1833,x:25.6,y:44.9}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:79.8543,x:29.15,y:124.1,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{rotation:56.0031,x:27.25,y:135.5,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_10,p:{rotation:-16.8603,y:93.45,scaleX:0.9978,scaleY:0.9978,x:15.55,regX:-1.7,regY:2.1}},{t:this.instance_9,p:{regX:2.7,scaleX:0.9978,scaleY:0.9978,rotation:-18.1853,x:38.75,y:186.45,regY:-53}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{rotation:-0.1015,x:-5.5,y:-57.9}},{t:this.instance_6,p:{regY:-53.4,scaleX:0.998,scaleY:0.998,rotation:23.0883,x:-32.3,y:189.95,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,scaleX:0.9988,scaleY:0.9988,rotation:4.1543,y:-79.1,x:-4.8}},{t:this.instance_3,p:{regX:40.5,regY:0.1,rotation:-142.2764,x:-36.05,y:56,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-141.0164,x:27.95,y:105.6,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-141.1175,x:34.15,y:111.95,regY:-1.4}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-103.7412,y:-21.3,regX:37.5,x:-55.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2,rotation:3.0456,x:-20.8,y:91.7,scaleX:0.9983,scaleY:0.9983,regY:-46}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9983,scaleY:0.9983,rotation:105.3418,x:47.65,y:-26.7,regY:-1.6}},{t:this.instance_13,p:{regX:-39.5,regY:0.2,scaleX:0.9982,scaleY:0.9982,rotation:86.2128,x:28.55,y:45.75}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:77.8701,x:34.9,y:124.75,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{rotation:54.0071,x:33.4,y:136.15,regX:-4.8,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_10,p:{rotation:-14.8742,y:93.45,scaleX:0.9977,scaleY:0.9977,x:15.6,regX:-1.7,regY:2.1}},{t:this.instance_9,p:{regX:2.7,scaleX:0.9978,scaleY:0.9978,rotation:-16.188,x:35.65,y:187.15,regY:-53}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{rotation:-0.0963,x:-5.5,y:-57.95}},{t:this.instance_6,p:{regY:-53.4,scaleX:0.998,scaleY:0.998,rotation:21.4229,x:-29.75,y:190.1,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,scaleX:0.9988,scaleY:0.9988,rotation:3.892,y:-79.15,x:-4.85}},{t:this.instance_3,p:{regX:40.5,regY:0.1,rotation:-139.943,x:-38.5,y:56.65,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-138.688,x:23.55,y:108.8,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-138.7843,x:29.35,y:115.5,regY:-1.5}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-101.9881,y:-21.3,regX:37.5,x:-55.75}}]},1).to({state:[{t:this.instance_15,p:{regX:2,rotation:1.383,x:-21.15,y:91.6,scaleX:0.9983,scaleY:0.9983,regY:-46}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9983,scaleY:0.9983,rotation:102.9869,x:47.6,y:-26.65,regY:-1.6}},{t:this.instance_13,p:{regX:-39.5,regY:0.2,scaleX:0.9982,scaleY:0.9982,rotation:84.2423,x:31.5,y:46.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:75.8843,x:40.55,y:125.25,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{rotation:52.0092,x:39.45,y:136.7,regX:-4.8,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_10,p:{rotation:-12.8847,y:93.5,scaleX:0.9978,scaleY:0.9978,x:15.8,regX:-1.7,regY:2.2}},{t:this.instance_9,p:{regX:2.7,scaleX:0.9978,scaleY:0.9978,rotation:-14.1912,x:32.55,y:187.85,regY:-52.9}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{rotation:-0.0901,x:-5.55,y:-57.95}},{t:this.instance_6,p:{regY:-53.3,scaleX:0.998,scaleY:0.998,rotation:19.759,x:-27.35,y:190.3,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,scaleX:0.9988,scaleY:0.9988,rotation:3.6297,y:-79.05,x:-4.85}},{t:this.instance_3,p:{regX:40.5,regY:0.1,rotation:-137.6071,x:-40.85,y:57.15,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-136.3614,x:19,y:111.85,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-136.4497,x:24.45,y:118.75,regY:-1.6}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-100.2359,y:-21.4,regX:37.6,x:-55.75}}]},1).to({state:[{t:this.instance_15,p:{regX:2,rotation:-0.275,x:-21.45,y:91.65,scaleX:0.9983,scaleY:0.9983,regY:-45.9}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9983,scaleY:0.9983,rotation:100.632,x:47.65,y:-26.6,regY:-1.6}},{t:this.instance_13,p:{regX:-39.5,regY:0.2,scaleX:0.9983,scaleY:0.9983,rotation:82.2721,x:34.5,y:47.1}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:73.8979,x:46.35,y:125.45,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{rotation:50.0124,x:45.6,y:137.05,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_10,p:{rotation:-10.8977,y:93.35,scaleX:0.9978,scaleY:0.9978,x:15.85,regX:-1.7,regY:2.1}},{t:this.instance_9,p:{regX:2.7,scaleX:0.9978,scaleY:0.9978,rotation:-12.1932,x:29.4,y:188.25,regY:-53}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{rotation:-0.0849,x:-5.55,y:-57.95}},{t:this.instance_6,p:{regY:-53.4,scaleX:0.998,scaleY:0.998,rotation:18.0928,x:-24.75,y:190.2,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,scaleX:0.9988,scaleY:0.9988,rotation:3.3666,y:-79.15,x:-4.85}},{t:this.instance_3,p:{regX:40.5,regY:0.1,rotation:-135.2744,x:-43.2,y:57.6,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-134.0332,x:14.3,y:114.55,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-134.1179,x:19.6,y:121.7,regY:-1.5}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-98.4825,y:-21.25,regX:37.5,x:-55.75}}]},1).to({state:[{t:this.instance_15,p:{regX:2,rotation:-1.9367,x:-21.9,y:91.4,scaleX:0.9983,scaleY:0.9983,regY:-46}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9983,scaleY:0.9983,rotation:98.2774,x:47.65,y:-26.55,regY:-1.6}},{t:this.instance_13,p:{regX:-39.5,regY:0.2,scaleX:0.9982,scaleY:0.9982,rotation:80.3014,x:37.55,y:47.6}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:71.914,x:52,y:125.55,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{rotation:48.0151,x:51.8,y:137.15,regX:-4.7,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_10,p:{rotation:-8.9106,y:93.25,scaleX:0.9977,scaleY:0.9977,x:15.85,regX:-1.7,regY:2.1}},{t:this.instance_9,p:{regX:2.7,scaleX:0.9978,scaleY:0.9978,rotation:-10.1958,x:26.2,y:188.6,regY:-53}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{rotation:-0.0788,x:-5.6,y:-57.95}},{t:this.instance_6,p:{regY:-53.4,scaleX:0.998,scaleY:0.998,rotation:16.4286,x:-22.25,y:190.2,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,scaleX:0.9988,scaleY:0.9988,rotation:3.1036,y:-79.2,x:-4.85}},{t:this.instance_3,p:{regX:40.5,regY:0.1,rotation:-132.9408,x:-45.7,y:57.95,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-131.7054,x:9.5,y:117.3,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-131.7841,x:14.5,y:124.6,regY:-1.5}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-96.7292,y:-21.25,regX:37.5,x:-55.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2,rotation:-3.6,x:-22.2,y:91.25,scaleX:0.9983,scaleY:0.9983,regY:-46}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9983,scaleY:0.9983,rotation:95.9227,x:47.8,y:-26.65,regY:-1.7}},{t:this.instance_13,p:{regX:-39.5,regY:0.3,scaleX:0.9982,scaleY:0.9982,rotation:78.3297,x:40.5,y:47.95}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:69.9275,x:57.6,y:125.35,regY:8.3,regX:-6.4}},{t:this.instance_11,p:{rotation:46.0176,x:57.9,y:136.9,regX:-4.7,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_10,p:{rotation:-6.9233,y:93.25,scaleX:0.9978,scaleY:0.9978,x:15.9,regX:-1.8,regY:2.1}},{t:this.instance_9,p:{regX:2.6,scaleX:0.9978,scaleY:0.9978,rotation:-8.1986,x:22.85,y:188.9,regY:-53}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{rotation:-0.0735,x:-5.6,y:-57.95}},{t:this.instance_6,p:{regY:-53.4,scaleX:0.998,scaleY:0.998,rotation:14.7635,x:-19.7,y:190,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,scaleX:0.9988,scaleY:0.9988,rotation:2.8406,y:-79.2,x:-4.85}},{t:this.instance_3,p:{regX:40.5,regY:0.1,rotation:-130.6058,x:-48.05,y:58.25,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-129.3782,x:4.65,y:119.7,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-129.451,x:9.3,y:127.25,regY:-1.5}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-94.9752,y:-21.25,regX:37.5,x:-55.75}}]},1).to({state:[{t:this.instance_15,p:{regX:2,rotation:-5.2603,x:-22.5,y:91.1,scaleX:0.9983,scaleY:0.9983,regY:-46}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9983,scaleY:0.9983,rotation:93.5674,x:47.65,y:-26.65,regY:-1.6}},{t:this.instance_13,p:{regX:-39.5,regY:0.2,scaleX:0.9982,scaleY:0.9982,rotation:76.3593,x:43.7,y:48.15}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:67.9426,x:63.25,y:124.95,regY:8.3,regX:-6.4}},{t:this.instance_11,p:{rotation:44.0202,x:63.9,y:136.45,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_10,p:{rotation:-4.9358,y:93.2,scaleX:0.9978,scaleY:0.9978,x:16.15,regX:-1.7,regY:2.1}},{t:this.instance_9,p:{regX:2.8,scaleX:0.9978,scaleY:0.9978,rotation:-6.2016,x:19.9,y:189,regY:-53}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{rotation:-0.0674,x:-5.6,y:-57.95}},{t:this.instance_6,p:{regY:-53.4,scaleX:0.998,scaleY:0.998,rotation:13.0988,x:-17.2,y:189.75,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,scaleX:0.9988,scaleY:0.9988,rotation:2.5778,y:-79.1,x:-4.9}},{t:this.instance_3,p:{regX:40.6,regY:0.1,rotation:-128.2721,x:-50.6,y:58.4,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-127.0505,x:-0.35,y:122.1,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-127.1171,x:3.95,y:129.75,regY:-1.5}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-93.225,y:-21.2,regX:37.5,x:-55.75}}]},1).to({state:[{t:this.instance_15,p:{regX:2,rotation:-6.9242,x:-22.85,y:91,scaleX:0.9983,scaleY:0.9983,regY:-46}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9984,scaleY:0.9984,rotation:91.2138,x:47.65,y:-26.7,regY:-1.6}},{t:this.instance_13,p:{regX:-39.6,regY:0.2,scaleX:0.9982,scaleY:0.9982,rotation:74.3895,x:46.7,y:48.15}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:65.9573,x:69.05,y:124.25,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{rotation:42.0227,x:70.1,y:135.8,regX:-4.8,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_10,p:{rotation:-2.9489,y:93.2,scaleX:0.9978,scaleY:0.9978,x:16.25,regX:-1.7,regY:2.1}},{t:this.instance_9,p:{regX:2.8,scaleX:0.9978,scaleY:0.9978,rotation:-4.2034,x:16.6,y:189.05,regY:-53}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{rotation:-0.0621,x:-5.55,y:-58}},{t:this.instance_6,p:{regY:-53.4,scaleX:0.998,scaleY:0.998,rotation:11.4335,x:-14.7,y:189.4,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,scaleX:0.9988,scaleY:0.9988,rotation:2.314,y:-79.2,x:-4.85}},{t:this.instance_3,p:{regX:40.6,regY:0.1,rotation:-125.9377,x:-53.05,y:58.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9982,scaleY:0.9982,rotation:-124.7235,x:-5.3,y:124.05,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-124.7847,x:-1.45,y:132.05,regY:-1.5}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-91.4699,y:-21.2,regX:37.5,x:-55.75}}]},1).to({state:[{t:this.instance_15,p:{regX:2,rotation:-8.5868,x:-23.25,y:90.9,scaleX:0.9983,scaleY:0.9983,regY:-46}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9984,scaleY:0.9984,rotation:88.8632,x:47.7,y:-26.75,regY:-1.6}},{t:this.instance_13,p:{regX:-39.5,regY:0.2,scaleX:0.9982,scaleY:0.9982,rotation:72.4192,x:49.8,y:48.2}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:63.9719,x:74.75,y:123.45,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{rotation:40.026,x:76.2,y:134.95,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_10,p:{rotation:-0.9613,y:93.3,scaleX:0.9977,scaleY:0.9977,x:16.35,regX:-1.7,regY:2.2}},{t:this.instance_9,p:{regX:2.7,scaleX:0.9978,scaleY:0.9978,rotation:-2.2077,x:13.3,y:188.9,regY:-53}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{rotation:-0.056,x:-5.6,y:-58}},{t:this.instance_6,p:{regY:-53.3,scaleX:0.998,scaleY:0.998,rotation:9.7692,x:-12.25,y:189.2,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,scaleX:0.9988,scaleY:0.9988,rotation:2.053,y:-79.2,x:-4.85}},{t:this.instance_3,p:{regX:40.5,regY:0.1,rotation:-123.6058,x:-55.4,y:58.65,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-122.3955,x:-10.5,y:126.1,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-122.4518,x:-6.75,y:134.2,regY:-1.5}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-89.7223,y:-21.15,regX:37.5,x:-55.75}}]},1).to({state:[{t:this.instance_15,p:{regX:2,rotation:-10.2488,x:-23.55,y:90.8,scaleX:0.9983,scaleY:0.9983,regY:-46}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9983,scaleY:0.9983,rotation:86.5089,x:47.7,y:-26.75,regY:-1.6}},{t:this.instance_13,p:{regX:-39.5,regY:0.3,scaleX:0.9982,scaleY:0.9982,rotation:70.4472,x:52.75,y:48.1}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:61.9868,x:80.4,y:122.35,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{rotation:38.0277,x:82.25,y:133.9,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_10,p:{rotation:1.0217,y:93.05,scaleX:0.9978,scaleY:0.9978,x:16.4,regX:-1.7,regY:2.1}},{t:this.instance_9,p:{regX:2.7,scaleX:0.9978,scaleY:0.9978,rotation:-0.2103,x:10.1,y:188.7,regY:-53}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{rotation:-0.0508,x:-5.6,y:-58}},{t:this.instance_6,p:{regY:-53.4,scaleX:0.998,scaleY:0.998,rotation:8.1047,x:-9.8,y:188.5,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,scaleX:0.9988,scaleY:0.9988,rotation:1.7894,y:-79.25,x:-4.9}},{t:this.instance_3,p:{regX:40.5,regY:0.1,rotation:-121.2712,x:-57.85,y:58.6,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-120.0673,x:-15.7,y:127.85,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-120.1179,x:-12.35,y:136.1,regY:-1.5}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-87.9692,y:-21.2,regX:37.5,x:-55.75}}]},1).to({state:[{t:this.instance_15,p:{regX:2,rotation:-11.9106,x:-23.95,y:90.65,scaleX:0.9983,scaleY:0.9983,regY:-46}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9984,scaleY:0.9984,rotation:84.1532,x:47.65,y:-26.75,regY:-1.6}},{t:this.instance_13,p:{regX:-39.5,regY:0.2,scaleX:0.9982,scaleY:0.9982,rotation:68.4785,x:56,y:47.75}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:60.0015,x:86,y:121.1,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{rotation:36.0308,x:88.25,y:132.6,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_10,p:{rotation:3.0086,y:93.05,scaleX:0.9978,scaleY:0.9978,x:16.55,regX:-1.7,regY:2.1}},{t:this.instance_9,p:{regX:2.7,scaleX:0.9978,scaleY:0.9978,rotation:1.7825,x:6.9,y:188.45,regY:-53}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{rotation:-0.0446,x:-5.65,y:-58}},{t:this.instance_6,p:{regY:-53.4,scaleX:0.998,scaleY:0.998,rotation:6.4391,x:-7.15,y:187.95,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,scaleX:0.9988,scaleY:0.9988,rotation:1.5258,y:-79.3,x:-4.9}},{t:this.instance_3,p:{regX:40.5,regY:0.1,rotation:-118.9364,x:-60.3,y:58.5,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-117.7402,x:-21,y:129.4,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-117.7851,x:-17.95,y:137.85,regY:-1.5}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-86.216,y:-21.15,regX:37.5,x:-55.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-13.574,x:-24.15,y:90.5,scaleX:0.9983,scaleY:0.9983,regY:-46}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9983,scaleY:0.9983,rotation:81.8005,x:47.8,y:-26.7,regY:-1.7}},{t:this.instance_13,p:{regX:-39.5,regY:0.2,scaleX:0.9982,scaleY:0.9982,rotation:66.5072,x:59.05,y:47.4}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:58.0163,x:91.5,y:119.65,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{rotation:34.0341,x:94.15,y:130.95,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_10,p:{rotation:4.9956,y:93,scaleX:0.9978,scaleY:0.9978,x:16.65,regX:-1.7,regY:2.1}},{t:this.instance_9,p:{regX:2.8,scaleX:0.9978,scaleY:0.9978,rotation:3.78,x:4,y:188.1,regY:-52.9}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{rotation:-0.0385,x:-5.65,y:-58}},{t:this.instance_6,p:{regY:-53.4,scaleX:0.998,scaleY:0.998,rotation:4.7746,x:-4.65,y:187.3,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,scaleX:0.9988,scaleY:0.9988,rotation:1.2632,y:-79.3,x:-4.9}},{t:this.instance_3,p:{regX:40.5,regY:0.1,rotation:-116.603,x:-62.75,y:58.35,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-115.4122,x:-26.35,y:130.8,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-115.4512,x:-23.65,y:139.3,regY:-1.5}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-84.4636,y:-21.1,regX:37.5,x:-55.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2,rotation:-15.2354,x:-24.55,y:90.45,scaleX:0.9983,scaleY:0.9983,regY:-46}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9983,scaleY:0.9983,rotation:79.4456,x:47.65,y:-26.75,regY:-1.6}},{t:this.instance_13,p:{regX:-39.5,regY:0.2,scaleX:0.9982,scaleY:0.9982,rotation:64.5353,x:62.05,y:46.9}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:56.0294,x:96.95,y:118,regY:8.3,regX:-6.4}},{t:this.instance_11,p:{rotation:32.036,x:100.05,y:129.2,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_10,p:{rotation:6.9834,y:93.05,scaleX:0.9977,scaleY:0.9977,x:16.7,regX:-1.7,regY:2.2}},{t:this.instance_9,p:{regX:2.7,scaleX:0.9978,scaleY:0.9978,rotation:5.777,x:0.65,y:187.45,regY:-53}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{rotation:-0.0333,x:-5.65,y:-58}},{t:this.instance_6,p:{regY:-53.4,scaleX:0.998,scaleY:0.998,rotation:3.1104,x:-2.35,y:186.55,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,scaleX:0.9988,scaleY:0.9988,rotation:1.0014,y:-79.3,x:-4.9}},{t:this.instance_3,p:{regX:40.5,regY:0.1,rotation:-114.2686,x:-65.2,y:58.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-113.0855,x:-31.75,y:132,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-113.119,x:-29.55,y:140.65,regY:-1.6}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-82.7104,y:-21.15,regX:37.5,x:-55.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2,rotation:-16.8988,x:-24.95,y:90.3,scaleX:0.9983,scaleY:0.9983,regY:-46}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9984,scaleY:0.9984,rotation:77.0906,x:47.75,y:-26.75,regY:-1.6}},{t:this.instance_13,p:{regX:-39.5,regY:0.2,scaleX:0.9982,scaleY:0.9982,rotation:62.5654,x:65.05,y:46.25}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:54.0443,x:102.45,y:116.05,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{rotation:30.0389,x:105.9,y:127.3,regX:-4.7,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_10,p:{rotation:8.9698,y:92.9,scaleX:0.9978,scaleY:0.9978,x:16.75,regX:-1.8,regY:2.1}},{t:this.instance_9,p:{regX:2.7,scaleX:0.9978,scaleY:0.9978,rotation:7.7738,x:-2.5,y:186.75,regY:-53}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{rotation:-0.028,x:-5.65,y:-58}},{t:this.instance_6,p:{regY:-53.4,scaleX:0.998,scaleY:0.998,rotation:1.4447,x:0.15,y:185.7,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,scaleX:0.9988,scaleY:0.9988,rotation:0.7388,y:-79.3,x:-4.95}},{t:this.instance_3,p:{regX:40.5,regY:0.1,rotation:-111.9351,x:-67.6,y:57.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9982,scaleY:0.9982,rotation:-110.7579,x:-37.15,y:132.9,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-110.7858,x:-35.25,y:141.7,regY:-1.5}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-80.9574,y:-21.1,regX:37.5,x:-55.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2,rotation:-18.5601,x:-25.25,y:90.1,scaleX:0.9983,scaleY:0.9983,regY:-46}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9983,scaleY:0.9983,rotation:74.7354,x:47.7,y:-26.8,regY:-1.6}},{t:this.instance_13,p:{regX:-39.5,regY:0.2,scaleX:0.9982,scaleY:0.9982,rotation:60.5945,x:68.1,y:45.45}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:52.0591,x:107.75,y:113.95,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{rotation:28.0419,x:111.6,y:125,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_10,p:{rotation:10.9568,y:92.85,scaleX:0.9977,scaleY:0.9977,x:16.95,regX:-1.7,regY:2.1}},{t:this.instance_9,p:{regX:2.7,scaleX:0.9978,scaleY:0.9978,rotation:9.7723,x:-5.65,y:186,regY:-53}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{rotation:-0.0219,x:-5.65,y:-58}},{t:this.instance_6,p:{regY:-53.4,scaleX:0.998,scaleY:0.998,rotation:-0.2155,x:2.5,y:184.85,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,scaleX:0.9988,scaleY:0.9988,rotation:0.4753,y:-79.3,x:-4.95}},{t:this.instance_3,p:{regX:40.5,regY:0.2,rotation:-109.6017,x:-69.9,y:57.4,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-108.43,x:-42.75,y:133.7,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-108.4521,x:-41.1,y:142.5,regY:-1.4}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-79.2056,y:-21.05,regX:37.5,x:-55.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2,rotation:-20.2224,x:-25.6,y:89.95,scaleX:0.9983,scaleY:0.9983,regY:-46}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9983,scaleY:0.9983,rotation:72.3812,x:47.65,y:-26.8,regY:-1.6}},{t:this.instance_13,p:{regX:-39.5,regY:0.2,scaleX:0.9982,scaleY:0.9982,rotation:58.6241,x:71,y:44.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:50.073,x:113.05,y:111.75,regY:8.2,regX:-6.3}},{t:this.instance_11,p:{rotation:26.0445,x:117.25,y:122.55,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_10,p:{rotation:12.9451,y:92.8,scaleX:0.9978,scaleY:0.9978,x:17.05,regX:-1.7,regY:2.1}},{t:this.instance_9,p:{regX:2.8,scaleX:0.9978,scaleY:0.9978,rotation:11.7694,x:-8.65,y:185.15,regY:-53}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{rotation:-0.0158,x:-5.6,y:-58}},{t:this.instance_6,p:{regY:-53.4,scaleX:0.998,scaleY:0.998,rotation:-1.8803,x:4.85,y:183.85,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,scaleX:0.9988,scaleY:0.9988,rotation:0.2118,y:-79.35,x:-4.9}},{t:this.instance_3,p:{regX:40.5,regY:0.1,rotation:-107.2674,x:-72.4,y:56.95,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-106.102,x:-48.25,y:134.25,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-106.1193,x:-47.05,y:143.15,regY:-1.5}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-77.4516,y:-21.15,regX:37.5,x:-55.75}}]},1).to({state:[{t:this.instance_15,p:{regX:2,rotation:-21.8848,x:-25.95,y:89.9,scaleX:0.9982,scaleY:0.9982,regY:-46}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9983,scaleY:0.9983,rotation:70.0268,x:47.7,y:-26.75,regY:-1.6}},{t:this.instance_13,p:{regX:-39.5,regY:0.2,scaleX:0.9982,scaleY:0.9982,rotation:56.6532,x:73.95,y:43.55}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:48.0892,x:118.25,y:109.25,regY:8.3,regX:-6.4}},{t:this.instance_11,p:{rotation:24.0464,x:122.85,y:119.9,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_10,p:{rotation:14.9325,y:92.7,scaleX:0.9977,scaleY:0.9977,x:17.1,regX:-1.7,regY:2.1}},{t:this.instance_9,p:{regX:2.6,scaleX:0.9978,scaleY:0.9978,rotation:13.7666,x:-12,y:184.15,regY:-52.9}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{rotation:-0.0105,x:-5.65,y:-58}},{t:this.instance_6,p:{regY:-53.4,scaleX:0.998,scaleY:0.998,rotation:-3.5457,x:7.2,y:182.75,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,scaleX:0.9988,scaleY:0.9988,rotation:-0.0455,y:-79.3,x:-4.9}},{t:this.instance_3,p:{regX:40.5,regY:0.1,rotation:-104.9332,x:-74.8,y:56.4,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-103.775,x:-53.85,y:134.55,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-103.7851,x:-52.8,y:143.6,regY:-1.4}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-75.698,y:-21.05,regX:37.5,x:-55.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2,rotation:-23.547,x:-26.2,y:89.7,scaleX:0.9982,scaleY:0.9982,regY:-46}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9983,scaleY:0.9983,rotation:67.6717,x:47.7,y:-26.75,regY:-1.6}},{t:this.instance_13,p:{regX:-39.5,regY:0.2,scaleX:0.9982,scaleY:0.9982,rotation:54.6832,x:76.8,y:42.45}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:46.103,x:123.35,y:106.45,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{rotation:22.0499,x:128.25,y:117.1,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_10,p:{rotation:16.9196,y:92.75,scaleX:0.9978,scaleY:0.9978,x:17.25,regX:-1.7,regY:2.1}},{t:this.instance_9,p:{regX:2.7,scaleX:0.9978,scaleY:0.9978,rotation:15.764,x:-14.9,y:183,regY:-53}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{rotation:-0.0044,x:-5.7,y:-58}},{t:this.instance_6,p:{regY:-53.3,scaleX:0.998,scaleY:0.998,rotation:-5.2089,x:9.55,y:181.75,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,scaleX:0.9988,scaleY:0.9988,rotation:-0.309,y:-79.3,x:-4.9}},{t:this.instance_3,p:{regX:40.5,regY:0.1,rotation:-102.5992,x:-77.2,y:55.85,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9982,scaleY:0.9982,rotation:-101.4467,x:-59.3,y:134.8,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-101.4527,x:-58.85,y:143.85,regY:-1.5}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-73.9456,y:-21.1,regX:37.5,x:-55.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2,rotation:-25.2102,x:-26.6,y:89.55,scaleX:0.9983,scaleY:0.9983,regY:-46}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9983,scaleY:0.9983,rotation:65.3175,x:47.65,y:-26.75,regY:-1.6}},{t:this.instance_13,p:{regX:-39.5,regY:0.2,scaleX:0.9982,scaleY:0.9982,rotation:52.7125,x:79.6,y:41.05}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:44.1175,x:128.35,y:103.55,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{rotation:20.0532,x:133.65,y:114,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_10,p:{rotation:18.9079,y:92.7,scaleX:0.9977,scaleY:0.9977,x:17.3,regX:-1.7,regY:2.1}},{t:this.instance_9,p:{regX:2.6,scaleX:0.9978,scaleY:0.9978,rotation:17.7608,x:-18,y:181.8,regY:-53}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{rotation:-0.0009,x:-5.7,y:-58.05}},{t:this.instance_6,p:{regY:-53.4,scaleX:0.998,scaleY:0.998,rotation:-6.874,x:11.85,y:180.4,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,scaleX:0.9988,scaleY:0.9988,rotation:-0.5716,y:-79.3,x:-4.95}},{t:this.instance_3,p:{regX:40.6,regY:0.1,rotation:-100.2657,x:-79.5,y:55.05,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-99.1206,x:-64.9,y:134.85,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-99.12,x:-64.95,y:143.9,regY:-1.6}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-72.1933,y:-21.3,regX:37.6,x:-55.7}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-97.5,-206.4,259.1,511.20000000000005);


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
	this.instance.setTransform(-57.2,-22.85,0.9985,0.9985,-79.637,0,0,35.6,0.4);

	this.instance_1 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_1.setTransform(-23.85,126.65,0.9984,0.9984,-108.7116,0,0,6.4,-1.2);

	this.instance_2 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_2.setTransform(-21.6,117.75,0.9986,0.9986,-85.9218,0,0,5.7,-8.3);

	this.instance_3 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_3.setTransform(-71.1,53.7,0.9985,0.9985,-127.2457,0,0,40.6,0.1);

	this.instance_4 = new lib.ch1_headcopy("synched",0);
	this.instance_4.setTransform(-4.85,-79.15,0.9991,0.9991,-0.6012,0,0,0.2,53);

	this.instance_5 = new lib.ch1_uBodycopy("synched",0);
	this.instance_5.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_6 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_6.setTransform(-31.2,189.65,0.9986,0.9986,10.5316,0,0,3.3,-52.6);

	this.instance_7 = new lib.ch1_neckcopy("synched",0);
	this.instance_7.setTransform(-5.2,-58.05,0.9992,0.9992,-0.1129,0,0,-0.8,8.8);

	this.instance_8 = new lib.ch1_lBodycopy("synched",0);
	this.instance_8.setTransform(-5.55,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_9 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_9.setTransform(34.55,187.7,0.9981,0.9981,-9.1768,0,0,3.2,-53.4);

	this.instance_10 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_10.setTransform(15,93.6,0.9981,0.9981,-14.1263,0,0,-1.1,1.7);

	this.instance_11 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_11.setTransform(98.9,124.6,0.9985,0.9985,38.4197,0,0,-5,3);

	this.instance_12 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_12.setTransform(91.6,116.3,0.9986,0.9986,30.8325,0,0,-6,8);

	this.instance_13 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_13.setTransform(47.7,-26.1,0.9986,0.9986,89.1253,0,0,-31.4,-1.1);

	this.instance_14 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_14.setTransform(-22.1,91.75,0.9988,0.9988,3.3106,0,0,2.3,-45.6);

	this.instance_15 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_15.setTransform(50.15,48.35,0.9985,0.9985,59.2741,0,0,-39.8,-0.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{scaleX:0.9985,scaleY:0.9985,rotation:59.2741,x:50.15,y:48.35,regX:-39.8,regY:-0.4}},{t:this.instance_14,p:{regX:2.3,scaleX:0.9988,scaleY:0.9988,rotation:3.3106,x:-22.1,y:91.75}},{t:this.instance_13,p:{scaleX:0.9986,scaleY:0.9986,rotation:89.1253,x:47.7,y:-26.1,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9986,scaleY:0.9986,rotation:30.8325,x:91.6,y:116.3,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9985,scaleY:0.9985,rotation:38.4197,x:98.9,y:124.6,regY:3}},{t:this.instance_10,p:{rotation:-14.1263,x:15,y:93.6,regX:-1.1,regY:1.7}},{t:this.instance_9,p:{rotation:-9.1768,x:34.55,y:187.7,scaleX:0.9981,scaleY:0.9981,regX:3.2,regY:-53.4}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.8,scaleX:0.9992,scaleY:0.9992,rotation:-0.1129,x:-5.2,y:-58.05}},{t:this.instance_6,p:{regX:3.3,rotation:10.5316,x:-31.2,y:189.65,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5,p:{x:-7.35}},{t:this.instance_4,p:{rotation:-0.6012,x:-4.85,y:-79.15,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-127.2457,y:53.7,x:-71.1,regX:40.6,regY:0.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9986,scaleY:0.9986,rotation:-85.9218,x:-21.6,y:117.75,regY:-8.3}},{t:this.instance_1,p:{regX:6.4,regY:-1.2,rotation:-108.7116,x:-23.85,y:126.65,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-79.637,x:-57.2,y:-22.85,regX:35.6}}]}).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:56.828,x:53.15,y:48.15,regX:-39.8,regY:-0.4}},{t:this.instance_14,p:{regX:2.2,scaleX:0.9987,scaleY:0.9987,rotation:1.6827,x:-22.15,y:91.45}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:87.3329,x:48.35,y:-26.2,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:28.3875,x:97.45,y:114.3,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:35.9728,x:105.05,y:122.25,regY:3}},{t:this.instance_10,p:{rotation:-12.6828,x:16.2,y:93.4,regX:-1.1,regY:1.7}},{t:this.instance_9,p:{rotation:-6.4741,x:33.4,y:187.9,scaleX:0.9981,scaleY:0.9981,regX:3.2,regY:-53.4}},{t:this.instance_8,p:{x:-4.9}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.0945,x:-4.55,y:-58}},{t:this.instance_6,p:{regX:3.4,rotation:8.7055,x:-28.3,y:189.7,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5,p:{x:-6.65}},{t:this.instance_4,p:{rotation:-0.1759,x:-4.2,y:-79.15,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-125.3564,y:53.55,x:-71.1,regX:40.6,regY:0.1}},{t:this.instance_2,p:{regX:5.6,scaleX:0.9985,scaleY:0.9985,rotation:-84.0342,x:-23.8,y:119.35,regY:-8.3}},{t:this.instance_1,p:{regX:6.2,regY:-1.3,rotation:-106.8222,x:-26.25,y:128.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.1194,x:-56.55,y:-22.9,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:54.3829,x:56,y:47.8,regX:-39.9,regY:-0.4}},{t:this.instance_14,p:{regX:2.2,scaleX:0.9987,scaleY:0.9987,rotation:0.0543,x:-22.1,y:91.15}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:85.5397,x:49,y:-26.25,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:25.9428,x:103.2,y:112.15,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:33.5266,x:111.2,y:119.8,regY:3}},{t:this.instance_10,p:{rotation:-11.2404,x:17.3,y:93.05,regX:-1.2,regY:1.6}},{t:this.instance_9,p:{rotation:-3.7685,x:32.25,y:188,scaleX:0.9981,scaleY:0.9981,regX:3.2,regY:-53.4}},{t:this.instance_8,p:{x:-4.2}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.0761,x:-3.9,y:-58}},{t:this.instance_6,p:{regX:3.4,rotation:6.8798,x:-25.45,y:189.55,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5,p:{x:-5.95}},{t:this.instance_4,p:{rotation:0.2441,x:-3.45,y:-79.2,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-123.4678,y:53.45,x:-71.1,regX:40.6,regY:0.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9985,scaleY:0.9985,rotation:-82.1449,x:-25.95,y:120.6,regY:-8.3}},{t:this.instance_1,p:{regX:6.3,regY:-1.2,rotation:-104.9338,x:-28.65,y:129.25,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-78.5992,x:-55.85,y:-23,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:51.9351,x:59.1,y:47.6,regX:-39.8,regY:-0.4}},{t:this.instance_14,p:{regX:2.2,scaleX:0.9987,scaleY:0.9987,rotation:-1.5689,x:-22.1,y:90.9}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:83.7464,x:49.75,y:-26.2,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:23.4966,x:108.85,y:109.8,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:31.0803,x:117.1,y:117,regY:3}},{t:this.instance_10,p:{rotation:-9.798,x:18.6,y:92.8,regX:-1.1,regY:1.7}},{t:this.instance_9,p:{rotation:-1.0652,x:31.05,y:188.1,scaleX:0.9981,scaleY:0.9981,regX:3.2,regY:-53.4}},{t:this.instance_8,p:{x:-3.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.0578,x:-3.2,y:-58.05}},{t:this.instance_6,p:{regX:3.4,rotation:5.0529,x:-22.55,y:189.3,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5,p:{x:-5.3}},{t:this.instance_4,p:{rotation:0.6686,x:-2.8,y:-79.15,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-121.5783,y:53.25,x:-71.15,regX:40.6,regY:0.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9985,scaleY:0.9985,rotation:-80.2558,x:-28.25,y:121.9,regY:-8.3}},{t:this.instance_1,p:{regX:6.3,regY:-1.2,rotation:-103.0441,x:-31.2,y:130.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-78.0797,x:-55.2,y:-23,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:49.4905,x:62.1,y:47.3,regX:-39.8,regY:-0.4}},{t:this.instance_14,p:{regX:2.2,scaleX:0.9987,scaleY:0.9987,rotation:-3.1977,x:-22.05,y:90.65}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:81.9532,x:50.4,y:-26.3,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:21.0495,x:114.45,y:107.3,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:28.6344,x:122.95,y:114.3,regY:3.1}},{t:this.instance_10,p:{rotation:-8.3556,x:19.8,y:92.55,regX:-1.1,regY:1.7}},{t:this.instance_9,p:{rotation:1.6339,x:29.85,y:188.05,scaleX:0.9981,scaleY:0.9981,regX:3.2,regY:-53.4}},{t:this.instance_8,p:{x:-2.85}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.0394,x:-2.55,y:-58.05}},{t:this.instance_6,p:{regX:3.4,rotation:3.2271,x:-19.75,y:188.95,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5,p:{x:-4.6}},{t:this.instance_4,p:{rotation:1.0939,x:-2.1,y:-79.15,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-119.6878,y:53.2,x:-71.1,regX:40.5,regY:0.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9985,scaleY:0.9985,rotation:-78.3678,x:-30.55,y:123.15,regY:-8.3}},{t:this.instance_1,p:{regX:6.2,regY:-1.2,rotation:-101.155,x:-33.8,y:131.8,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-77.561,x:-54.45,y:-22.9,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:47.0437,x:65,y:46.85,regX:-39.8,regY:-0.4}},{t:this.instance_14,p:{regX:2.2,scaleX:0.9987,scaleY:0.9987,rotation:-4.8257,x:-22.05,y:90.25}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:80.161,x:51.15,y:-26.35,regY:-1.2}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:18.6036,x:119.9,y:104.5,regX:-6.1,regY:7.9}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:26.1871,x:128.8,y:111.15,regY:3}},{t:this.instance_10,p:{rotation:-6.9123,x:21,y:92.25,regX:-1.1,regY:1.7}},{t:this.instance_9,p:{rotation:4.3367,x:28.7,y:187.95,scaleX:0.9981,scaleY:0.9981,regX:3.2,regY:-53.4}},{t:this.instance_8,p:{x:-2.2}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.021,x:-1.85,y:-58.05}},{t:this.instance_6,p:{regX:3.4,rotation:1.4018,x:-16.95,y:188.65,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5,p:{x:-3.95}},{t:this.instance_4,p:{rotation:1.5194,x:-1.45,y:-79.15,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-117.7995,y:53,x:-71.25,regX:40.6,regY:0}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9985,scaleY:0.9985,rotation:-76.4781,x:-32.85,y:124.25,regY:-8.3}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-99.266,x:-36.5,y:132.7,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-77.0412,x:-53.85,y:-22.95,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:44.5975,x:68,y:46.35,regX:-39.8,regY:-0.4}},{t:this.instance_14,p:{regX:2.3,scaleX:0.9987,scaleY:0.9987,rotation:-6.4522,x:-21.85,y:90}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:78.366,x:51.75,y:-26.3,regY:-1.2}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:16.1583,x:125.3,y:101.65,regX:-6,regY:7.9}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:23.7412,x:134.45,y:107.9,regY:3}},{t:this.instance_10,p:{rotation:-5.4698,x:22.2,y:91.95,regX:-1.1,regY:1.7}},{t:this.instance_9,p:{rotation:7.0414,x:27.45,y:187.85,scaleX:0.998,scaleY:0.998,regX:3.2,regY:-53.4}},{t:this.instance_8,p:{x:-1.5}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.0026,x:-1.2,y:-58.05}},{t:this.instance_6,p:{regX:3.4,rotation:-0.4202,x:-14.1,y:188.15,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5,p:{x:-3.25}},{t:this.instance_4,p:{rotation:1.9422,x:-0.85,y:-79.2,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-115.9095,y:52.85,x:-71.1,regX:40.5,regY:0.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9985,scaleY:0.9985,rotation:-74.5898,x:-35.35,y:125.3,regY:-8.3}},{t:this.instance_1,p:{regX:6.4,regY:-1.3,rotation:-97.3771,x:-39.1,y:133.5,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-76.5221,x:-53.15,y:-22.95,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:42.1512,x:70.85,y:45.75,regX:-39.8,regY:-0.4}},{t:this.instance_14,p:{regX:2.2,scaleX:0.9987,scaleY:0.9987,rotation:-8.0813,x:-21.9,y:89.7}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:76.573,x:52.35,y:-26.35,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:13.7124,x:130.6,y:98.55,regX:-6,regY:7.9}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:21.2933,x:139.95,y:104.45,regY:3}},{t:this.instance_10,p:{rotation:-4.0257,x:23.4,y:91.7,regX:-1.1,regY:1.7}},{t:this.instance_9,p:{rotation:9.745,x:26.25,y:187.65,scaleX:0.998,scaleY:0.998,regX:3.2,regY:-53.4}},{t:this.instance_8,p:{x:-0.85}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:0.0105,x:-0.6,y:-58.05}},{t:this.instance_6,p:{regX:3.4,rotation:-2.2454,x:-11.2,y:187.5,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5,p:{x:-2.6}},{t:this.instance_4,p:{rotation:2.3687,x:-0.15,y:-79.15,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-114.0203,y:52.65,x:-71.15,regX:40.6,regY:0.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9985,scaleY:0.9985,rotation:-72.7009,x:-37.7,y:126.25,regY:-8.3}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-95.4886,x:-41.85,y:134.45,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-76.003,x:-52.45,y:-23,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:39.7046,x:73.8,y:45.1,regX:-39.8,regY:-0.4}},{t:this.instance_14,p:{regX:2.2,scaleX:0.9987,scaleY:0.9987,rotation:-9.7099,x:-21.9,y:89.35}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:74.7811,x:53.05,y:-26.35,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:11.2665,x:135.65,y:95.45,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:18.8478,x:145.3,y:100.8,regY:3}},{t:this.instance_10,p:{rotation:-2.5832,x:24.55,y:91.3,regX:-1.2,regY:1.7}},{t:this.instance_9,p:{rotation:12.449,x:24.95,y:187.35,scaleX:0.998,scaleY:0.998,regX:3.2,regY:-53.4}},{t:this.instance_8,p:{x:-0.15}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:0.0289,x:0.1,y:-58.05}},{t:this.instance_6,p:{regX:3.4,rotation:-4.072,x:-8.4,y:186.85,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5,p:{x:-1.9}},{t:this.instance_4,p:{rotation:2.7936,x:0.5,y:-79.1,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-112.131,y:52.45,x:-71.15,regX:40.6,regY:0.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9985,scaleY:0.9985,rotation:-70.8116,x:-40.25,y:127.2,regY:-8.3}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-93.5989,x:-44.55,y:135.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-75.4844,x:-51.85,y:-23,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:37.2576,x:76.65,y:44.45,regX:-39.8,regY:-0.4}},{t:this.instance_14,p:{regX:2.2,scaleX:0.9987,scaleY:0.9987,rotation:-11.3376,x:-21.85,y:89}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:72.9873,x:53.7,y:-26.35,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:8.82,x:140.75,y:92.05,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:16.4017,x:150.45,y:97,regY:3}},{t:this.instance_10,p:{rotation:-1.1397,x:25.8,y:91,regX:-1.1,regY:1.7}},{t:this.instance_9,p:{rotation:15.1534,x:23.85,y:187.05,scaleX:0.9981,scaleY:0.9981,regX:3.2,regY:-53.4}},{t:this.instance_8,p:{x:0.45}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:0.0481,x:0.75,y:-58.05}},{t:this.instance_6,p:{regX:3.4,rotation:-5.8976,x:-5.55,y:186.1,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5,p:{x:-1.25}},{t:this.instance_4,p:{rotation:3.2186,x:1.25,y:-79.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-110.2429,y:52.2,x:-71.2,regX:40.6,regY:0.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9985,scaleY:0.9985,rotation:-68.922,x:-42.7,y:127.9,regY:-8.3}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-91.7088,x:-47.3,y:135.8,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-74.9645,x:-51.15,y:-23.05,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:34.8122,x:79.65,y:43.55,regX:-39.8,regY:-0.5}},{t:this.instance_14,p:{regX:2.3,scaleX:0.9987,scaleY:0.9987,rotation:-12.9655,x:-21.7,y:88.65}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:71.1949,x:54.4,y:-26.45,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:6.3736,x:145.45,y:88.5,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:13.9536,x:155.55,y:93,regY:3}},{t:this.instance_10,p:{rotation:0.2978,x:27,y:90.7,regX:-1.1,regY:1.7}},{t:this.instance_9,p:{rotation:17.8563,x:22.55,y:186.6,scaleX:0.9981,scaleY:0.9981,regX:3.2,regY:-53.4}},{t:this.instance_8,p:{x:1.15}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:0.0665,x:1.45,y:-58}},{t:this.instance_6,p:{regX:3.4,rotation:-7.7235,x:-2.85,y:185.25,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5,p:{x:-0.55}},{t:this.instance_4,p:{rotation:3.6437,x:1.9,y:-79.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-108.3527,y:52.1,x:-71.15,regX:40.6,regY:0.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9985,scaleY:0.9985,rotation:-67.034,x:-45.25,y:128.6,regY:-8.3}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-89.8249,x:-50.1,y:136.35,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-74.4453,x:-50.45,y:-23,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:32.3656,x:82.4,y:42.85,regX:-39.8,regY:-0.4}},{t:this.instance_14,p:{regX:2.2,scaleX:0.9987,scaleY:0.9987,rotation:-14.5925,x:-21.7,y:88.35}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:69.4015,x:55.05,y:-26.45,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:3.9267,x:150.05,y:84.75,regX:-6.1,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:11.5088,x:160.35,y:88.95,regY:3}},{t:this.instance_10,p:{rotation:1.7408,x:28.2,y:90.3,regX:-1.1,regY:1.7}},{t:this.instance_9,p:{rotation:20.561,x:21.45,y:186.15,scaleX:0.998,scaleY:0.998,regX:3.2,regY:-53.4}},{t:this.instance_8,p:{x:1.8}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:0.0849,x:2.1,y:-58}},{t:this.instance_6,p:{regX:3.4,rotation:-9.5488,x:-0.05,y:184.3,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5,p:{x:0.05}},{t:this.instance_4,p:{rotation:4.0682,x:2.65,y:-79.15,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-106.4641,y:51.9,x:-71.1,regX:40.5,regY:0.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9985,scaleY:0.9985,rotation:-65.1452,x:-47.7,y:129.2,regY:-8.3}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-87.9355,x:-52.85,y:136.85,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-73.9255,x:-49.8,y:-23,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:29.9206,x:85.2,y:41.95,regX:-39.8,regY:-0.4}},{t:this.instance_14,p:{regX:2.3,scaleX:0.9987,scaleY:0.9987,rotation:-16.2215,x:-21.5,y:87.95}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:67.6081,x:55.65,y:-26.4,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:1.4817,x:154.7,y:81,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:9.0614,x:165.1,y:84.6,regY:3}},{t:this.instance_10,p:{rotation:3.1848,x:29.35,y:90,regX:-1.1,regY:1.7}},{t:this.instance_9,p:{rotation:23.2651,x:20.25,y:185.6,scaleX:0.998,scaleY:0.998,regX:3.2,regY:-53.4}},{t:this.instance_8,p:{x:2.5}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:0.1033,x:2.85,y:-58}},{t:this.instance_6,p:{regX:3.4,rotation:-11.3759,x:2.75,y:183.25,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5,p:{x:0.75}},{t:this.instance_4,p:{rotation:4.493,x:3.3,y:-79.05,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-104.5746,y:51.65,x:-71.15,regX:40.6,regY:0.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9985,scaleY:0.9985,rotation:-63.256,x:-50.25,y:129.7,regY:-8.3}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-86.0465,x:-55.65,y:137.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-73.4065,x:-49.15,y:-23.05,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:27.474,x:88,y:40.9,regX:-39.8,regY:-0.4}},{t:this.instance_14,p:{regX:2.2,scaleX:0.9987,scaleY:0.9987,rotation:-17.8506,x:-21.55,y:87.6}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:65.8153,x:56.4,y:-26.5,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-0.9597,x:159.15,y:77,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:6.6154,x:169.6,y:80.25,regY:3}},{t:this.instance_10,p:{rotation:4.6274,x:30.5,y:89.7,regX:-1.1,regY:1.7}},{t:this.instance_9,p:{rotation:25.9684,x:19,y:185,scaleX:0.998,scaleY:0.998,regX:3.2,regY:-53.4}},{t:this.instance_8,p:{x:3.15}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:0.1225,x:3.5,y:-58}},{t:this.instance_6,p:{regX:3.4,rotation:-13.2021,x:5.5,y:182.15,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_5,p:{x:1.4}},{t:this.instance_4,p:{rotation:4.918,x:4,y:-79.05,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-102.6851,y:51.5,x:-71.1,regX:40.6,regY:0.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9984,scaleY:0.9984,rotation:-61.3669,x:-52.85,y:130.2,regY:-8.3}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-84.1568,x:-58.5,y:137.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-72.8877,x:-48.45,y:-23.1,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:25.0278,x:90.75,y:39.9,regX:-39.8,regY:-0.4}},{t:this.instance_14,p:{regX:2.2,scaleX:0.9987,scaleY:0.9987,rotation:-19.4773,x:-21.55,y:87.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:64.0231,x:57.05,y:-26.55,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-3.4055,x:163.25,y:72.8,regX:-6.1,regY:7.9}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:4.1683,x:173.95,y:75.85,regY:3.1}},{t:this.instance_10,p:{rotation:6.0695,x:31.7,y:89.35,regX:-1.1,regY:1.7}},{t:this.instance_9,p:{rotation:28.672,x:17.75,y:184.35,scaleX:0.998,scaleY:0.998,regX:3.2,regY:-53.4}},{t:this.instance_8,p:{x:3.85}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:0.1409,x:4.15,y:-57.95}},{t:this.instance_6,p:{regX:3.4,rotation:-15.0275,x:8.35,y:180.9,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5,p:{x:2.1}},{t:this.instance_4,p:{rotation:5.3432,x:4.65,y:-79.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-100.7961,y:51.3,x:-71.1,regX:40.6,regY:0.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9985,scaleY:0.9985,rotation:-59.4776,x:-55.5,y:130.45,regY:-8.4}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-82.2677,x:-61.3,y:137.65,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-72.3681,x:-47.8,y:-23.05,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:22.5819,x:93.5,y:38.8,regX:-39.8,regY:-0.4}},{t:this.instance_14,p:{regX:2.2,scaleX:0.9987,scaleY:0.9987,rotation:-21.1045,x:-21.35,y:86.8}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:62.228,x:57.75,y:-26.5,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-5.8523,x:167.4,y:68.7,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:1.7218,x:178.2,y:71.05,regY:3}},{t:this.instance_10,p:{rotation:7.5126,x:32.85,y:89,regX:-1.1,regY:1.7}},{t:this.instance_9,p:{rotation:31.376,x:16.55,y:183.6,scaleX:0.998,scaleY:0.998,regX:3.2,regY:-53.4}},{t:this.instance_8,p:{x:4.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:0.1593,x:4.85,y:-57.9}},{t:this.instance_6,p:{regX:3.3,rotation:-16.8535,x:10.85,y:179.75,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5,p:{x:2.8}},{t:this.instance_4,p:{rotation:5.7688,x:5.35,y:-79.05,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-98.9063,y:51,x:-71.1,regX:40.6,regY:0.1}},{t:this.instance_2,p:{regX:5.6,scaleX:0.9985,scaleY:0.9985,rotation:-57.5882,x:-58.15,y:130.85,regY:-8.3}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-80.3789,x:-64.15,y:137.65,scaleX:0.9983,scaleY:0.9983}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-71.8494,x:-47.1,y:-23.05,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:24.7579,x:90.95,y:39.75,regX:-39.9,regY:-0.4}},{t:this.instance_14,p:{regX:2.2,scaleX:0.9987,scaleY:0.9987,rotation:-19.6608,x:-21.45,y:87.15}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:63.8261,x:57.15,y:-26.55,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-3.687,x:163.7,y:72.4,regX:-6.1,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:3.8795,x:174.5,y:75.2,regY:3}},{t:this.instance_10,p:{rotation:6.2281,x:31.75,y:89.3,regX:-1.2,regY:1.7}},{t:this.instance_9,p:{rotation:28.9911,x:17.65,y:184.3,scaleX:0.998,scaleY:0.998,regX:3.2,regY:-53.4}},{t:this.instance_8,p:{x:3.95}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:0.1496,x:4.25,y:-57.95}},{t:this.instance_6,p:{regX:3.4,rotation:-15.2216,x:8.6,y:180.85,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5,p:{x:2.2}},{t:this.instance_4,p:{rotation:5.395,x:4.75,y:-79.1,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-100.5715,y:51.25,x:-71.1,regX:40.6,regY:0.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9985,scaleY:0.9985,rotation:-59.2577,x:-55.8,y:130.55,regY:-8.3}},{t:this.instance_1,p:{regX:6.4,regY:-1.4,rotation:-82.0547,x:-61.75,y:137.45,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-72.3066,x:-47.7,y:-23.05,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:26.9355,x:88.65,y:40.75,regX:-39.8,regY:-0.4}},{t:this.instance_14,p:{regX:2.2,scaleX:0.9987,scaleY:0.9987,rotation:-18.2176,x:-21.5,y:87.5}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:65.423,x:56.55,y:-26.45,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-1.5229,x:160.05,y:76.15,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:6.0357,x:170.65,y:79.4,regY:3.1}},{t:this.instance_10,p:{rotation:4.943,x:30.8,y:89.55,regX:-1.1,regY:1.7}},{t:this.instance_9,p:{rotation:26.6054,x:18.7,y:184.9,scaleX:0.998,scaleY:0.998,regX:3.2,regY:-53.4}},{t:this.instance_8,p:{x:3.35}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:0.14,x:3.6,y:-57.95}},{t:this.instance_6,p:{regX:3.4,rotation:-13.5892,x:6.15,y:181.95,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5,p:{x:1.6}},{t:this.instance_4,p:{rotation:5.0216,x:4.15,y:-79.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-102.2348,y:51.5,x:-71.15,regX:40.6,regY:0.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9985,scaleY:0.9985,rotation:-60.9245,x:-53.5,y:130.3,regY:-8.3}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-83.7314,x:-59.15,y:137.45,scaleX:0.9983,scaleY:0.9983}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-72.7655,x:-48.25,y:-23.05,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:29.1121,x:86.25,y:41.45,regX:-39.8,regY:-0.5}},{t:this.instance_14,p:{regX:2.2,scaleX:0.9987,scaleY:0.9987,rotation:-16.7732,x:-21.6,y:87.8}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:67.0213,x:55.95,y:-26.45,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:0.6366,x:156.2,y:79.7,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:8.1916,x:166.6,y:83.2,regY:3}},{t:this.instance_10,p:{rotation:3.6587,x:29.75,y:89.9,regX:-1.1,regY:1.7}},{t:this.instance_9,p:{rotation:24.2213,x:19.75,y:185.35,scaleX:0.998,scaleY:0.998,regX:3.1,regY:-53.4}},{t:this.instance_8,p:{x:2.75}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:0.1304,x:3,y:-57.95}},{t:this.instance_6,p:{regX:3.3,rotation:-11.958,x:3.55,y:182.85,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5,p:{x:1}},{t:this.instance_4,p:{rotation:4.6483,x:3.55,y:-79.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-103.8988,y:51.65,x:-71.2,regX:40.6,regY:0.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9985,scaleY:0.9985,rotation:-62.5934,x:-51.2,y:129.95,regY:-8.3}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-85.4065,x:-56.65,y:137.3,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-73.2245,x:-48.85,y:-23.05,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:31.2884,x:83.7,y:42.35,regX:-39.8,regY:-0.4}},{t:this.instance_14,p:{regX:2.2,scaleX:0.9987,scaleY:0.9987,rotation:-15.3294,x:-21.7,y:88.15}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:68.6182,x:55.35,y:-26.45,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:2.8022,x:152.1,y:83.15,regX:-6.1,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:10.3496,x:162.5,y:87.05,regY:3}},{t:this.instance_10,p:{rotation:2.3727,x:28.75,y:90.2,regX:-1.1,regY:1.7}},{t:this.instance_9,p:{rotation:21.8351,x:20.85,y:185.95,scaleX:0.998,scaleY:0.998,regX:3.2,regY:-53.4}},{t:this.instance_8,p:{x:2.15}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:0.1216,x:2.45,y:-58}},{t:this.instance_6,p:{regX:3.4,rotation:-10.3257,x:1.25,y:183.85,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5,p:{x:0.4}},{t:this.instance_4,p:{rotation:4.2753,x:2.9,y:-79.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-105.5633,y:51.8,x:-71.1,regX:40.6,regY:0.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9985,scaleY:0.9985,rotation:-64.2608,x:-48.95,y:129.45,regY:-8.3}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-87.0818,x:-54.2,y:137.05,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-73.6831,x:-49.45,y:-23.05,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:33.4654,x:81.15,y:43.2,regX:-39.8,regY:-0.4}},{t:this.instance_14,p:{regX:2.2,scaleX:0.9987,scaleY:0.9987,rotation:-13.8853,x:-21.7,y:88.45}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:70.2151,x:54.8,y:-26.35,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:4.9666,x:148.1,y:86.5,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:12.5072,x:158.25,y:90.75,regY:3}},{t:this.instance_10,p:{rotation:1.0889,x:27.65,y:90.5,regX:-1.1,regY:1.7}},{t:this.instance_9,p:{rotation:19.4499,x:21.95,y:186.35,scaleX:0.9981,scaleY:0.9981,regX:3.2,regY:-53.4}},{t:this.instance_8,p:{x:1.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:0.1111,x:1.85,y:-58}},{t:this.instance_6,p:{regX:3.4,rotation:-8.694,x:-1.3,y:184.75,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5,p:{x:-0.15}},{t:this.instance_4,p:{rotation:3.9016,x:2.3,y:-79.05,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-107.2272,y:52.05,x:-71.1,regX:40.5,regY:0.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9985,scaleY:0.9985,rotation:-65.929,x:-46.65,y:129,regY:-8.3}},{t:this.instance_1,p:{regX:6.4,regY:-1.3,rotation:-88.7573,x:-51.7,y:136.55,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-74.1414,x:-50.1,y:-23.05,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:35.6428,x:78.65,y:44,regX:-39.8,regY:-0.4}},{t:this.instance_14,p:{regX:2.2,scaleX:0.9987,scaleY:0.9987,rotation:-12.4424,x:-21.75,y:88.8}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:71.8131,x:54.2,y:-26.45,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:7.1311,x:143.9,y:89.75,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:14.6619,x:153.8,y:94.45,regY:3}},{t:this.instance_10,p:{rotation:-0.1918,x:26.65,y:90.8,regX:-1.1,regY:1.7}},{t:this.instance_9,p:{rotation:17.0658,x:23.05,y:186.75,scaleX:0.998,scaleY:0.998,regX:3.2,regY:-53.4}},{t:this.instance_8,p:{x:0.95}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:0.1015,x:1.3,y:-58}},{t:this.instance_6,p:{regX:3.4,rotation:-7.0615,x:-3.7,y:185.45,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5,p:{x:-0.75}},{t:this.instance_4,p:{rotation:3.5289,x:1.75,y:-79.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-108.8916,y:52.15,x:-71.15,regX:40.6,regY:0.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9985,scaleY:0.9985,rotation:-67.5971,x:-44.5,y:128.45,regY:-8.3}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-90.4291,x:-49.25,y:136.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-74.5997,x:-50.65,y:-23,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:37.8197,x:76,y:44.65,regX:-39.8,regY:-0.4}},{t:this.instance_14,p:{regX:2.2,scaleX:0.9987,scaleY:0.9987,rotation:-10.9985,x:-21.85,y:89.1}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:73.4097,x:53.6,y:-26.4,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:9.2952,x:139.55,y:92.9,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:16.8204,x:149.3,y:97.85,regY:3}},{t:this.instance_10,p:{rotation:-1.4752,x:25.55,y:91.05,regX:-1.1,regY:1.7}},{t:this.instance_9,p:{rotation:14.6802,x:24.15,y:187.05,scaleX:0.9981,scaleY:0.9981,regX:3.2,regY:-53.4}},{t:this.instance_8,p:{x:0.35}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:0.0919,x:0.65,y:-58.05}},{t:this.instance_6,p:{regX:3.4,rotation:-5.4302,x:-6.2,y:186.25,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5,p:{x:-1.35}},{t:this.instance_4,p:{rotation:3.1554,x:1.15,y:-79.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-110.5549,y:52.4,x:-71.1,regX:40.5,regY:0.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9985,scaleY:0.9985,rotation:-69.2654,x:-42.25,y:127.75,regY:-8.3}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-92.1048,x:-46.8,y:135.7,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-75.0588,x:-51.3,y:-23,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:39.9968,x:73.5,y:45.25,regX:-39.8,regY:-0.4}},{t:this.instance_14,p:{regX:2.2,scaleX:0.9987,scaleY:0.9987,rotation:-9.5534,x:-21.95,y:89.4}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:75.0077,x:53,y:-26.35,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:11.4593,x:135.1,y:95.85,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:18.9774,x:144.7,y:101.3,regY:3}},{t:this.instance_10,p:{rotation:-2.7612,x:24.55,y:91.3,regX:-1.1,regY:1.7}},{t:this.instance_9,p:{rotation:12.2945,x:25.2,y:187.4,scaleX:0.9981,scaleY:0.9981,regX:3.2,regY:-53.4}},{t:this.instance_8,p:{x:-0.2}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:0.0823,x:0.05,y:-58.05}},{t:this.instance_6,p:{regX:3.4,rotation:-3.7973,x:-8.75,y:186.95,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5,p:{x:-1.95}},{t:this.instance_4,p:{rotation:2.783,x:0.55,y:-79.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-112.2187,y:52.5,x:-71.15,regX:40.6,regY:0.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9985,scaleY:0.9985,rotation:-70.9335,x:-40.1,y:127.1,regY:-8.3}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-93.7805,x:-44.4,y:135.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-75.5161,x:-51.8,y:-22.95,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:42.1741,x:70.85,y:45.75,regX:-39.9,regY:-0.4}},{t:this.instance_14,p:{regX:2.2,scaleX:0.9987,scaleY:0.9987,rotation:-8.1104,x:-21.9,y:89.65}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:76.6045,x:52.45,y:-26.3,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:13.624,x:130.55,y:98.7,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:21.1328,x:139.9,y:104.45,regY:3}},{t:this.instance_10,p:{rotation:-4.0459,x:23.45,y:91.65,regX:-1.1,regY:1.7}},{t:this.instance_9,p:{rotation:9.9095,x:26.35,y:187.65,scaleX:0.998,scaleY:0.998,regX:3.2,regY:-53.4}},{t:this.instance_8,p:{x:-0.8}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:0.0726,x:-0.5,y:-58.05}},{t:this.instance_6,p:{regX:3.4,rotation:-2.1657,x:-11.2,y:187.4,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5,p:{x:-2.55}},{t:this.instance_4,p:{rotation:2.4099,x:-0.15,y:-79.15,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-113.8842,y:52.7,x:-71.1,regX:40.5,regY:0.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9985,scaleY:0.9985,rotation:-72.6009,x:-37.9,y:126.3,regY:-8.3}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-95.4561,x:-42.05,y:134.45,scaleX:0.9983,scaleY:0.9983}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-75.975,x:-52.4,y:-23,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:44.3505,x:68.4,y:46.25,regX:-39.8,regY:-0.5}},{t:this.instance_14,p:{regX:2.2,scaleX:0.9987,scaleY:0.9987,rotation:-6.6664,x:-21.95,y:89.95}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:78.2032,x:51.9,y:-26.4,regY:-1.2}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:15.788,x:125.9,y:101.4,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:23.2902,x:135,y:107.6,regY:3.1}},{t:this.instance_10,p:{rotation:-5.3308,x:22.35,y:91.9,regX:-1.1,regY:1.7}},{t:this.instance_9,p:{rotation:7.5252,x:27.45,y:187.65,scaleX:0.9981,scaleY:0.9981,regX:3.2,regY:-53.5}},{t:this.instance_8,p:{x:-1.4}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:0.063,x:-1,y:-58.05}},{t:this.instance_6,p:{regX:3.4,rotation:-0.5341,x:-13.7,y:188.05,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5,p:{x:-3.15}},{t:this.instance_4,p:{rotation:2.035,x:-0.75,y:-79.2,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-115.5491,y:52.8,x:-71.15,regX:40.6,regY:0.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9985,scaleY:0.9985,rotation:-74.2693,x:-35.75,y:125.45,regY:-8.3}},{t:this.instance_1,p:{regX:6.3,regY:-1.4,rotation:-97.1319,x:-39.8,y:133.75,scaleX:0.9983,scaleY:0.9983}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-76.434,x:-53.05,y:-22.95,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:46.5271,x:65.7,y:46.75,regX:-39.8,regY:-0.4}},{t:this.instance_14,p:{regX:2.2,scaleX:0.9987,scaleY:0.9987,rotation:-5.222,x:-22.05,y:90.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:79.7991,x:51.3,y:-26.35,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:17.9526,x:121.1,y:103.95,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:25.4485,x:130.05,y:110.45,regY:3}},{t:this.instance_10,p:{rotation:-6.6142,x:21.35,y:92.2,regX:-1.1,regY:1.7}},{t:this.instance_9,p:{rotation:5.1392,x:28.5,y:187.95,scaleX:0.9981,scaleY:0.9981,regX:3.2,regY:-53.4}},{t:this.instance_8,p:{x:-2}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:0.0534,x:-1.65,y:-58.05}},{t:this.instance_6,p:{regX:3.4,rotation:1.0936,x:-16.2,y:188.5,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5,p:{x:-3.75}},{t:this.instance_4,p:{rotation:1.6638,x:-1.3,y:-79.15,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-117.2116,y:53,x:-71.1,regX:40.5,regY:0.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9985,scaleY:0.9985,rotation:-75.9381,x:-33.7,y:124.6,regY:-8.4}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-98.8074,x:-37.25,y:133,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-76.8919,x:-53.65,y:-22.95,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:48.7047,x:63.1,y:47.15,regX:-39.8,regY:-0.4}},{t:this.instance_14,p:{regX:2.2,scaleX:0.9987,scaleY:0.9987,rotation:-3.7791,x:-22.05,y:90.45}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:81.3968,x:50.65,y:-26.25,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:20.1171,x:116.25,y:106.45,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:27.6041,x:125,y:113.25,regY:3}},{t:this.instance_10,p:{rotation:-7.8998,x:20.3,y:92.45,regX:-1.1,regY:1.7}},{t:this.instance_9,p:{rotation:2.7551,x:29.6,y:188.05,scaleX:0.9981,scaleY:0.9981,regX:3.2,regY:-53.4}},{t:this.instance_8,p:{x:-2.6}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:0.0438,x:-2.25,y:-58.05}},{t:this.instance_6,p:{regX:3.4,rotation:2.7256,x:-18.8,y:188.8,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5,p:{x:-4.35}},{t:this.instance_4,p:{rotation:1.29,x:-1.8,y:-79.15,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-118.8758,y:53.15,x:-71.1,regX:40.5,regY:0.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9985,scaleY:0.9985,rotation:-77.6051,x:-31.55,y:123.6,regY:-8.3}},{t:this.instance_1,p:{regX:6.3,regY:-1.4,rotation:-100.483,x:-35.1,y:132.1,scaleX:0.9983,scaleY:0.9983}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-77.3509,x:-54.2,y:-22.95,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:50.8803,x:60.45,y:47.45,regX:-39.8,regY:-0.4}},{t:this.instance_14,p:{regX:2.2,scaleX:0.9987,scaleY:0.9987,rotation:-2.3336,x:-22.05,y:90.75}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:82.9937,x:50.15,y:-26.3,regY:-1.2}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:22.2817,x:111.3,y:108.75,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:29.7611,x:119.75,y:115.85,regY:3}},{t:this.instance_10,p:{rotation:-9.1844,x:19.05,y:92.7,regX:-1.2,regY:1.7}},{t:this.instance_9,p:{rotation:0.3705,x:30.7,y:187.95,scaleX:0.9981,scaleY:0.9981,regX:3.2,regY:-53.5}},{t:this.instance_8,p:{x:-3.2}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:0.0341,x:-2.8,y:-58.05}},{t:this.instance_6,p:{regX:3.4,rotation:4.3573,x:-21.3,y:189.2,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5,p:{x:-4.95}},{t:this.instance_4,p:{rotation:0.9171,x:-2.4,y:-79.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-120.54,y:53.2,x:-71.15,regX:40.6,regY:0.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9985,scaleY:0.9985,rotation:-79.2726,x:-29.5,y:122.6,regY:-8.3}},{t:this.instance_1,p:{regX:6.3,regY:-1.2,rotation:-102.1592,x:-32.55,y:131.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-77.8094,x:-54.75,y:-23.05,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:53.0574,x:57.7,y:47.75,regX:-39.8,regY:-0.4}},{t:this.instance_14,p:{regX:2.2,scaleX:0.9987,scaleY:0.9987,rotation:-0.8912,x:-22.1,y:90.95}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:84.5915,x:49.5,y:-26.2,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:24.4464,x:106.35,y:110.9,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:31.9179,x:114.45,y:118.35,regY:3}},{t:this.instance_10,p:{rotation:-10.4688,x:18.15,y:92.9,regX:-1.1,regY:1.7}},{t:this.instance_9,p:{rotation:-2.0108,x:31.75,y:188.05,scaleX:0.9981,scaleY:0.9981,regX:3.2,regY:-53.4}},{t:this.instance_8,p:{x:-3.8}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:0.0245,x:-3.4,y:-58.05}},{t:this.instance_6,p:{regX:3.4,rotation:5.9889,x:-23.75,y:189.4,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5,p:{x:-5.55}},{t:this.instance_4,p:{rotation:0.5434,x:-3.05,y:-79.15,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-122.2048,y:53.35,x:-71.1,regX:40.6,regY:0.1}},{t:this.instance_2,p:{regX:5.6,scaleX:0.9985,scaleY:0.9985,rotation:-80.942,x:-27.5,y:121.6,regY:-8.3}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-103.8345,x:-30.45,y:130.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-78.2676,x:-55.4,y:-22.9,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:55.2342,x:55.15,y:47.9,regX:-39.8,regY:-0.5}},{t:this.instance_14,p:{regX:2.2,scaleX:0.9987,scaleY:0.9987,rotation:0.5489,x:-22.1,y:91.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:86.1884,x:48.9,y:-26.25,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:26.6109,x:101.25,y:112.95,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:34.0753,x:109,y:120.75,regY:3.1}},{t:this.instance_10,p:{rotation:-11.7544,x:17.1,y:93.05,regX:-1.1,regY:1.6}},{t:this.instance_9,p:{rotation:-4.3955,x:32.8,y:187.95,scaleX:0.9981,scaleY:0.9981,regX:3.2,regY:-53.4}},{t:this.instance_8,p:{x:-4.4}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:0.0149,x:-4,y:-58.05}},{t:this.instance_6,p:{regX:3.3,rotation:7.6213,x:-26.4,y:189.6,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5,p:{x:-6.15}},{t:this.instance_4,p:{rotation:0.1706,x:-3.6,y:-79.2,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-123.8681,y:53.4,x:-71.1,regX:40.6,regY:0.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9985,scaleY:0.9985,rotation:-82.6105,x:-25.45,y:120.35,regY:-8.3}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-105.5102,x:-28.25,y:129.05,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-78.726,x:-56,y:-22.9,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:57.4119,x:52.45,y:48.15,regX:-39.8,regY:-0.4}},{t:this.instance_14,p:{regX:2.2,scaleX:0.9987,scaleY:0.9987,rotation:1.9937,x:-22.15,y:91.5}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:87.786,x:48.3,y:-26.25,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:28.775,x:96.1,y:114.75,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:36.2315,x:103.7,y:122.8,regY:3}},{t:this.instance_10,p:{rotation:-13.0394,x:16.05,y:93.35,regX:-1.1,regY:1.7}},{t:this.instance_9,p:{rotation:-6.781,x:33.65,y:187.8,scaleX:0.9981,scaleY:0.9981,regX:3.1,regY:-53.4}},{t:this.instance_8,p:{x:-5}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:0.0053,x:-4.65,y:-58.05}},{t:this.instance_6,p:{regX:3.4,rotation:9.2525,x:-28.85,y:189.65,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5,p:{x:-6.75}},{t:this.instance_4,p:{rotation:-0.1978,x:-4.2,y:-79.15,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-125.5328,y:53.55,x:-71.05,regX:40.6,regY:0.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9985,scaleY:0.9985,rotation:-84.2773,x:-23.65,y:119.05,regY:-8.3}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-107.1851,x:-26.05,y:127.9,scaleX:0.9983,scaleY:0.9983}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.1845,x:-56.6,y:-22.9,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:59.5877,x:49.8,y:48.35,regX:-39.8,regY:-0.4}},{t:this.instance_14,p:{regX:2.3,scaleX:0.9987,scaleY:0.9987,rotation:3.4353,x:-22.1,y:91.65}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:89.3827,x:47.75,y:-26.1,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:30.9391,x:90.85,y:116.45,regX:-6.1,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:38.3873,x:98.2,y:124.8,regY:3}},{t:this.instance_10,p:{rotation:-14.3218,x:15,y:93.55,regX:-1.1,regY:1.7}},{t:this.instance_9,p:{rotation:-9.1668,x:34.85,y:187.6,scaleX:0.9981,scaleY:0.9981,regX:3.2,regY:-53.4}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.0009,x:-5.2,y:-58.05}},{t:this.instance_6,p:{regX:3.4,rotation:10.8843,x:-31.35,y:189.65,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5,p:{x:-7.35}},{t:this.instance_4,p:{rotation:-0.5715,x:-4.75,y:-79.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-127.1962,y:53.7,x:-71.1,regX:40.6,regY:0.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9985,scaleY:0.9985,rotation:-85.9452,x:-21.6,y:117.75,regY:-8.3}},{t:this.instance_1,p:{regX:6.4,regY:-1.4,rotation:-108.8609,x:-23.95,y:126.65,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.6424,x:-57.15,y:-22.85,regX:35.6}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-78.9,-210.2,283.20000000000005,514.2);


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
	this.instance = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance.setTransform(42.1,106.55,0.9984,0.9984,-104.4423,0,0,6.8,-1.6);

	this.instance_1 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_1.setTransform(36.75,100.55,0.9985,0.9985,-139.0239,0,0,5.5,-9.1);

	this.instance_2 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_2.setTransform(-27.05,44.65,0.9985,0.9985,-138.7501,0,0,44.1,-0.1);

	this.instance_3 = new lib.ch1_uArm_rcopy_1("synched",0);
	this.instance_3.setTransform(-57.4,-23,0.9986,0.9986,-113.998,0,0,35.5,0.2);

	this.instance_4 = new lib.ch1_headcopy_1("synched",0);
	this.instance_4.setTransform(-5.35,-79.25,0.9991,0.9991,1.7268,0,0,0.1,52.9);

	this.instance_5 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_5.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_6 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_6.setTransform(-25.55,188.2,0.9984,0.9984,28.6187,0,0,1.8,-55.3);

	this.instance_7 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_7.setTransform(-5.45,-57.95,0.9991,0.9991,-1.6768,0,0,-1,9);

	this.instance_8 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_8.setTransform(-5.55,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_9 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_9.setTransform(40.25,185.55,0.9981,0.9981,-2.7753,0,0,3.1,-53.6);

	this.instance_10 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_10.setTransform(17.5,91.75,0.9981,0.9981,-16.3068,0,0,-1,1.1);

	this.instance_11 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_11.setTransform(15.6,130.75,0.9985,0.9985,78.6969,0,0,-5.2,3.1);

	this.instance_12 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_12.setTransform(17.3,120.35,0.9986,0.9986,81.8418,0,0,-6,8.6);

	this.instance_13 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_13.setTransform(31.25,41.9,0.9986,0.9986,99.8278,0,0,-39.5,-1);

	this.instance_14 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_14.setTransform(47.8,-26,0.9985,0.9985,103.86,0,0,-31.2,-1.2);

	this.instance_15 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_15.setTransform(-20.2,92.1,0.9985,0.9985,0.6707,0,0,2.1,-46.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{regY:-46.4,scaleX:0.9985,scaleY:0.9985,rotation:0.6707,x:-20.2,y:92.1,regX:2.1}},{t:this.instance_14,p:{rotation:103.86,x:47.8,y:-26,scaleY:0.9985,regX:-31.2}},{t:this.instance_13,p:{scaleX:0.9986,scaleY:0.9986,rotation:99.8278,x:31.25,y:41.9,regY:-1,regX:-39.5}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9986,scaleY:0.9986,rotation:81.8418,x:17.3,y:120.35}},{t:this.instance_11,p:{rotation:78.6969,x:15.6,y:130.75,scaleX:0.9985,scaleY:0.9985,regY:3.1,regX:-5.2}},{t:this.instance_10,p:{regY:1.1,scaleX:0.9981,scaleY:0.9981,rotation:-16.3068,x:17.5,y:91.75,regX:-1}},{t:this.instance_9,p:{regX:3.1,scaleX:0.9981,scaleY:0.9981,rotation:-2.7753,x:40.25,y:185.55,regY:-53.6}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regY:9,rotation:-1.6768,x:-5.45,y:-57.95}},{t:this.instance_6,p:{scaleX:0.9984,scaleY:0.9984,rotation:28.6187,x:-25.55,y:188.2,regY:-55.3,regX:1.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9991,scaleY:0.9991,rotation:1.7268,x:-5.35,y:-79.25,regY:52.9}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,rotation:-113.998,x:-57.4,regX:35.5,y:-23,regY:0.2}},{t:this.instance_2,p:{regX:44.1,scaleX:0.9985,scaleY:0.9985,rotation:-138.7501,x:-27.05,y:44.65}},{t:this.instance_1,p:{regY:-9.1,scaleX:0.9985,scaleY:0.9985,rotation:-139.0239,x:36.75,y:100.55}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-104.4423,x:42.1,y:106.55,regY:-1.6,regX:6.8}}]}).to({state:[{t:this.instance_15,p:{regY:-46.3,scaleX:0.9984,scaleY:0.9984,rotation:-0.6734,x:-20.3,y:92.2,regX:2.1}},{t:this.instance_14,p:{rotation:102.6241,x:47.75,y:-26.1,scaleY:0.9985,regX:-31.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:96.7022,x:32.75,y:42.2,regY:-1,regX:-39.5}},{t:this.instance_12,p:{regY:8.4,scaleX:0.9985,scaleY:0.9985,rotation:78.7174,x:23.3,y:121.3}},{t:this.instance_11,p:{rotation:75.5717,x:21.9,y:131.8,scaleX:0.9985,scaleY:0.9985,regY:3.1,regX:-5.2}},{t:this.instance_10,p:{regY:1.2,scaleX:0.998,scaleY:0.998,rotation:-14.2302,x:17.75,y:91.65,regX:-1}},{t:this.instance_9,p:{regX:3.2,scaleX:0.998,scaleY:0.998,rotation:-1.2432,x:37.05,y:186.2,regY:-53.6}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:9.1,rotation:-1.6567,x:-5.4,y:-57.8}},{t:this.instance_6,p:{scaleX:0.9983,scaleY:0.9983,rotation:25.2588,x:-23.45,y:188.15,regY:-55.3,regX:1.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:1.9536,x:-5.3,y:-79.3,regY:52.9}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-111.1323,x:-57.45,regX:35.5,y:-23,regY:0.2}},{t:this.instance_2,p:{regX:44,scaleX:0.9984,scaleY:0.9984,rotation:-136.659,x:-30.4,y:46.15}},{t:this.instance_1,p:{regY:-9.2,scaleX:0.9984,scaleY:0.9984,rotation:-136.931,x:31.3,y:104.3}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-102.35,x:36.45,y:110.4,regY:-1.6,regX:6.8}}]},1).to({state:[{t:this.instance_15,p:{regY:-46.4,scaleX:0.9984,scaleY:0.9984,rotation:-2.0232,x:-20.4,y:92.05,regX:2.1}},{t:this.instance_14,p:{rotation:101.3888,x:47.75,y:-26.1,scaleY:0.9984,regX:-31.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:93.5765,x:34.15,y:42.55,regY:-1,regX:-39.5}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9985,scaleY:0.9985,rotation:75.5902,x:29,y:122}},{t:this.instance_11,p:{rotation:72.4451,x:28.3,y:132.55,scaleX:0.9984,scaleY:0.9984,regY:3.1,regX:-5.2}},{t:this.instance_10,p:{regY:1.1,scaleX:0.998,scaleY:0.998,rotation:-12.1525,x:17.9,y:91.45,regX:-1}},{t:this.instance_9,p:{regX:3.2,scaleX:0.998,scaleY:0.998,rotation:0.2865,x:33.85,y:186.65,regY:-53.6}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:9.1,rotation:-1.6366,x:-5.4,y:-57.85}},{t:this.instance_6,p:{scaleX:0.9983,scaleY:0.9983,rotation:21.9001,x:-21.35,y:188.15,regY:-55.3,regX:1.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9991,scaleY:0.9991,rotation:2.1804,x:-5.3,y:-79.3,regY:52.9}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-108.2655,x:-57.4,regX:35.5,y:-23,regY:0.2}},{t:this.instance_2,p:{regX:44,scaleX:0.9984,scaleY:0.9984,rotation:-134.5666,x:-33.8,y:47.4}},{t:this.instance_1,p:{regY:-9.2,scaleX:0.9984,scaleY:0.9984,rotation:-134.8403,x:25.6,y:107.85}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-100.2576,x:30.7,y:114,regY:-1.5,regX:6.8}}]},1).to({state:[{t:this.instance_15,p:{regY:-46.4,scaleX:0.9984,scaleY:0.9984,rotation:-3.3732,x:-20.45,y:91.95,regX:2.2}},{t:this.instance_14,p:{rotation:100.1533,x:47.8,y:-26.1,scaleY:0.9985,regX:-31.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:90.4501,x:35.6,y:42.75,regY:-1,regX:-39.5}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9985,scaleY:0.9985,rotation:72.4641,x:34.8,y:122.5}},{t:this.instance_11,p:{rotation:69.3188,x:34.7,y:133.05,scaleX:0.9984,scaleY:0.9984,regY:3.1,regX:-5.2}},{t:this.instance_10,p:{regY:1.2,scaleX:0.998,scaleY:0.998,rotation:-10.0751,x:18.1,y:91.45,regX:-1}},{t:this.instance_9,p:{regX:3.2,scaleX:0.998,scaleY:0.998,rotation:1.8198,x:30.65,y:187.1,regY:-53.6}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:9.1,rotation:-1.6165,x:-5.4,y:-57.85}},{t:this.instance_6,p:{scaleX:0.9983,scaleY:0.9983,rotation:18.5407,x:-19.25,y:188.1,regY:-55.3,regX:1.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:2.4073,x:-5.25,y:-79.3,regY:52.9}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-105.4002,x:-57.4,regX:35.4,y:-22.95,regY:0.2}},{t:this.instance_2,p:{regX:44,scaleX:0.9984,scaleY:0.9984,rotation:-132.4748,x:-37.3,y:48.5}},{t:this.instance_1,p:{regY:-9.2,scaleX:0.9984,scaleY:0.9984,rotation:-132.7481,x:19.75,y:111}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-98.1655,x:24.5,y:117.5,regY:-1.6,regX:6.8}}]},1).to({state:[{t:this.instance_15,p:{regY:-46.3,scaleX:0.9984,scaleY:0.9984,rotation:-4.7216,x:-20.65,y:92,regX:2.1}},{t:this.instance_14,p:{rotation:98.9182,x:47.8,y:-26.1,scaleY:0.9985,regX:-31.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:87.3285,x:37.1,y:43,regY:-1,regX:-39.5}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9985,scaleY:0.9985,rotation:69.3384,x:40.6,y:122.7}},{t:this.instance_11,p:{rotation:66.1925,x:41.05,y:133.2,scaleX:0.9984,scaleY:0.9984,regY:3.2,regX:-5.2}},{t:this.instance_10,p:{regY:1.2,scaleX:0.998,scaleY:0.998,rotation:-7.9984,x:18.3,y:91.35,regX:-1}},{t:this.instance_9,p:{regX:3.2,scaleX:0.998,scaleY:0.998,rotation:3.3544,x:27.35,y:187.3,regY:-53.6}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:9.1,rotation:-1.5981,x:-5.35,y:-57.85}},{t:this.instance_6,p:{scaleX:0.9983,scaleY:0.9983,rotation:15.182,x:-17.05,y:187.95,regY:-55.3,regX:1.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:2.6351,x:-5.3,y:-79.3,regY:52.9}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-102.5332,x:-57.45,regX:35.5,y:-23.05,regY:0.2}},{t:this.instance_2,p:{regX:44,scaleX:0.9985,scaleY:0.9985,rotation:-130.3823,x:-40.95,y:49.4}},{t:this.instance_1,p:{regY:-9.2,scaleX:0.9984,scaleY:0.9984,rotation:-130.656,x:13.9,y:114}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-96.0731,x:18.35,y:120.5,regY:-1.6,regX:6.8}}]},1).to({state:[{t:this.instance_15,p:{regY:-46.3,scaleX:0.9984,scaleY:0.9984,rotation:-6.0709,x:-20.8,y:92,regX:2.1}},{t:this.instance_14,p:{rotation:97.6838,x:47.75,y:-26.1,scaleY:0.9985,regX:-31.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:84.2006,x:38.55,y:43.2,regY:-1,regX:-39.5}},{t:this.instance_12,p:{regY:8.4,scaleX:0.9985,scaleY:0.9985,rotation:66.2118,x:46.55,y:122.5}},{t:this.instance_11,p:{rotation:63.0649,x:47.5,y:133,scaleX:0.9984,scaleY:0.9984,regY:3.1,regX:-5.2}},{t:this.instance_10,p:{regY:1.2,scaleX:0.998,scaleY:0.998,rotation:-5.9218,x:18.5,y:91.2,regX:-1.1}},{t:this.instance_9,p:{regX:3.2,scaleX:0.998,scaleY:0.998,rotation:4.888,x:24.1,y:187.45,regY:-53.6}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:9.1,rotation:-1.5779,x:-5.35,y:-57.85}},{t:this.instance_6,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.8229,x:-14.95,y:187.8,regY:-55.3,regX:1.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:2.8611,x:-5.3,y:-79.3,regY:52.9}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-99.6669,x:-57.4,regX:35.5,y:-23.05,regY:0.2}},{t:this.instance_2,p:{regX:44,scaleX:0.9984,scaleY:0.9984,rotation:-128.2902,x:-44.55,y:50.1}},{t:this.instance_1,p:{regY:-9.2,scaleX:0.9984,scaleY:0.9984,rotation:-128.5644,x:7.95,y:116.65}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-93.9816,x:12.1,y:123.45,regY:-1.6,regX:6.8}}]},1).to({state:[{t:this.instance_15,p:{regY:-46.4,scaleX:0.9984,scaleY:0.9984,rotation:-7.4193,x:-20.85,y:91.7,regX:2.2}},{t:this.instance_14,p:{rotation:96.4485,x:47.8,y:-26.1,scaleY:0.9985,regX:-31.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:81.075,x:40.25,y:43.45,regY:-1.1,regX:-39.5}},{t:this.instance_12,p:{regY:8.4,scaleX:0.9985,scaleY:0.9985,rotation:63.0861,x:52.3,y:122.1}},{t:this.instance_11,p:{rotation:59.939,x:53.85,y:132.6,scaleX:0.9984,scaleY:0.9984,regY:3.1,regX:-5.2}},{t:this.instance_10,p:{regY:1.2,scaleX:0.998,scaleY:0.998,rotation:-3.845,x:18.85,y:91,regX:-1}},{t:this.instance_9,p:{regX:3.2,scaleX:0.998,scaleY:0.998,rotation:6.4208,x:20.8,y:187.4,regY:-53.6}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:9.1,rotation:-1.5578,x:-5.35,y:-57.85}},{t:this.instance_6,p:{scaleX:0.9984,scaleY:0.9984,rotation:8.4631,x:-12.85,y:187.7,regY:-55.2,regX:1.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9991,scaleY:0.9991,rotation:3.0889,x:-5.25,y:-79.3,regY:52.9}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-96.8002,x:-57.4,regX:35.5,y:-23,regY:0.2}},{t:this.instance_2,p:{regX:44,scaleX:0.9984,scaleY:0.9984,rotation:-126.1986,x:-48.25,y:50.65}},{t:this.instance_1,p:{regY:-9.2,scaleX:0.9984,scaleY:0.9984,rotation:-126.4722,x:1.75,y:119.05}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-91.8892,x:5.7,y:126,regY:-1.6,regX:6.8}}]},1).to({state:[{t:this.instance_15,p:{regY:-46.4,scaleX:0.9984,scaleY:0.9984,rotation:-8.7697,x:-21.1,y:91.75,regX:2.1}},{t:this.instance_14,p:{rotation:95.2119,x:47.8,y:-26.1,scaleY:0.9985,regX:-31.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:77.9498,x:41.55,y:43.55,regY:-1,regX:-39.5}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9985,scaleY:0.9985,rotation:59.9593,x:58,y:121.5}},{t:this.instance_11,p:{rotation:56.8139,x:60.2,y:131.9,scaleX:0.9984,scaleY:0.9984,regY:3.1,regX:-5.2}},{t:this.instance_10,p:{regY:1.2,scaleX:0.998,scaleY:0.998,rotation:-1.768,x:19,y:90.9,regX:-1}},{t:this.instance_9,p:{regX:3.2,scaleX:0.998,scaleY:0.998,rotation:7.9543,x:17.5,y:187.3,regY:-53.6}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:9.1,rotation:-1.5377,x:-5.35,y:-57.85}},{t:this.instance_6,p:{scaleX:0.9983,scaleY:0.9983,rotation:5.1035,x:-10.7,y:187.35,regY:-55.2,regX:1.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:3.315,x:-5.2,y:-79.3,regY:52.9}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-93.9345,x:-57.35,regX:35.4,y:-22.9,regY:0.2}},{t:this.instance_2,p:{regX:44.1,scaleX:0.9985,scaleY:0.9985,rotation:-124.1066,x:-52,y:50.95}},{t:this.instance_1,p:{regY:-9.2,scaleX:0.9984,scaleY:0.9984,rotation:-124.3791,x:-4.45,y:121.2}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-89.8021,x:-0.85,y:128.2,regY:-1.6,regX:6.8}}]},1).to({state:[{t:this.instance_15,p:{regY:-46.3,scaleX:0.9984,scaleY:0.9984,rotation:-10.1182,x:-21.2,y:91.75,regX:2.1}},{t:this.instance_14,p:{rotation:93.9767,x:47.75,y:-26.1,scaleY:0.9985,regX:-31.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:74.8224,x:43.05,y:43.7,regY:-1,regX:-39.5}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9985,scaleY:0.9985,rotation:56.833,x:63.55,y:120.7}},{t:this.instance_11,p:{rotation:53.6868,x:66.55,y:130.8,scaleX:0.9984,scaleY:0.9984,regY:3.1,regX:-5.2}},{t:this.instance_10,p:{regY:1.2,scaleX:0.998,scaleY:0.998,rotation:0.3048,x:19.25,y:90.75,regX:-1}},{t:this.instance_9,p:{regX:3.2,scaleX:0.998,scaleY:0.998,rotation:9.4877,x:14.2,y:187.1,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:9.1,rotation:-1.5175,x:-5.3,y:-57.85}},{t:this.instance_6,p:{scaleX:0.9983,scaleY:0.9983,rotation:1.7438,x:-8.55,y:187.05,regY:-55.2,regX:1.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:3.5439,x:-5.2,y:-79.25,regY:52.9}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-91.0683,x:-57.4,regX:35.5,y:-23.05,regY:0.2}},{t:this.instance_2,p:{regX:44,scaleX:0.9984,scaleY:0.9984,rotation:-122.0149,x:-55.6,y:51.2}},{t:this.instance_1,p:{regY:-9.2,scaleX:0.9984,scaleY:0.9984,rotation:-122.2876,x:-10.7,y:123.1}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-87.7103,x:-7.25,y:130.25,regY:-1.6,regX:6.8}}]},1).to({state:[{t:this.instance_15,p:{regY:-46.3,scaleX:0.9984,scaleY:0.9984,rotation:-11.4678,x:-21.35,y:91.75,regX:2.1}},{t:this.instance_14,p:{rotation:92.7408,x:47.75,y:-26.1,scaleY:0.9985,regX:-31.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9984,rotation:71.6971,x:44.5,y:43.7,regY:-1,regX:-39.5}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9985,scaleY:0.9985,rotation:53.7066,x:69.35,y:119.45}},{t:this.instance_11,p:{rotation:50.5608,x:72.8,y:129.5,scaleX:0.9984,scaleY:0.9984,regY:3.1,regX:-5.2}},{t:this.instance_10,p:{regY:1.2,scaleX:0.9981,scaleY:0.9981,rotation:2.3807,x:19.45,y:90.55,regX:-1}},{t:this.instance_9,p:{regX:3.2,scaleX:0.998,scaleY:0.998,rotation:11.0208,x:11.15,y:186.6,regY:-53.6}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:9.1,rotation:-1.4974,x:-5.3,y:-57.85}},{t:this.instance_6,p:{scaleX:0.9984,scaleY:0.9984,rotation:-1.6115,x:-6.5,y:186.7,regY:-55.2,regX:1.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:3.7701,x:-5.15,y:-79.2,regY:52.9}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-88.2065,x:-57.4,regX:35.5,y:-23.05,regY:0.2}},{t:this.instance_2,p:{regX:44,scaleX:0.9984,scaleY:0.9984,rotation:-119.9226,x:-59.3,y:51.2}},{t:this.instance_1,p:{regY:-9.2,scaleX:0.9984,scaleY:0.9984,rotation:-120.1953,x:-17,y:124.7}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-85.618,x:-13.9,y:131.95,regY:-1.6,regX:6.8}}]},1).to({state:[{t:this.instance_15,p:{regY:-46.3,scaleX:0.9984,scaleY:0.9984,rotation:-12.816,x:-21.5,y:91.7,regX:2.1}},{t:this.instance_14,p:{rotation:91.5062,x:47.75,y:-26.1,scaleY:0.9985,regX:-31.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:68.57,x:46.1,y:43.8,regY:-1,regX:-39.5}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9985,scaleY:0.9985,rotation:50.5803,x:74.95,y:118.05}},{t:this.instance_11,p:{rotation:47.4335,x:78.9,y:127.95,scaleX:0.9984,scaleY:0.9984,regY:3.1,regX:-5.2}},{t:this.instance_10,p:{regY:1.2,scaleX:0.998,scaleY:0.998,rotation:4.4589,x:19.7,y:90.45,regX:-1}},{t:this.instance_9,p:{regX:3.1,scaleX:0.998,scaleY:0.998,rotation:12.5547,x:7.7,y:186.1,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:9.1,rotation:-1.4773,x:-5.3,y:-57.85}},{t:this.instance_6,p:{scaleX:0.9984,scaleY:0.9984,rotation:-4.9698,x:-4.35,y:186.25,regY:-55.2,regX:1.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:3.9965,x:-5.25,y:-79.3,regY:52.9}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-85.3393,x:-57.35,regX:35.5,y:-23.05,regY:0.2}},{t:this.instance_2,p:{regX:44,scaleX:0.9985,scaleY:0.9985,rotation:-117.83,x:-62.95,y:51}},{t:this.instance_1,p:{regY:-9.2,scaleX:0.9984,scaleY:0.9984,rotation:-118.103,x:-23.4,y:126.05}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-83.5243,x:-20.6,y:133.35,regY:-1.6,regX:6.8}}]},1).to({state:[{t:this.instance_15,p:{regY:-46.3,scaleX:0.9984,scaleY:0.9984,rotation:-14.1649,x:-21.5,y:91.55,regX:2.2}},{t:this.instance_14,p:{rotation:90.2697,x:47.75,y:-26.15,scaleY:0.9985,regX:-31.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:65.443,x:47.55,y:43.8,regY:-1,regX:-39.5}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9985,scaleY:0.9985,rotation:47.4549,x:80.45,y:116.45}},{t:this.instance_11,p:{rotation:44.309,x:84.95,y:126,scaleX:0.9984,scaleY:0.9984,regY:3.1,regX:-5.2}},{t:this.instance_10,p:{regY:1.2,scaleX:0.998,scaleY:0.998,rotation:6.5361,x:19.75,y:90.3,regX:-1.1}},{t:this.instance_9,p:{regX:3.2,scaleX:0.998,scaleY:0.998,rotation:14.0879,x:4.6,y:185.4,regY:-53.6}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:9.1,rotation:-1.4563,x:-5.25,y:-57.8}},{t:this.instance_6,p:{scaleX:0.9983,scaleY:0.9983,rotation:-8.3295,x:-2.4,y:185.75,regY:-55.2,regX:1.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:4.2245,x:-5.15,y:-79.3,regY:52.9}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-82.4726,x:-57.35,regX:35.5,y:-23,regY:0.2}},{t:this.instance_2,p:{regX:44,scaleX:0.9984,scaleY:0.9984,rotation:-115.738,x:-66.75,y:50.65}},{t:this.instance_1,p:{regY:-9.1,scaleX:0.9984,scaleY:0.9984,rotation:-116.0109,x:-29.7,y:127}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-81.4335,x:-27.35,y:134.5,regY:-1.6,regX:6.8}}]},1).to({state:[{t:this.instance_15,p:{regY:-46.3,scaleX:0.9984,scaleY:0.9984,rotation:-15.5148,x:-21.8,y:91.5,regX:2.1}},{t:this.instance_14,p:{rotation:89.0385,x:47.8,y:-26.15,scaleY:0.9985,regX:-31.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:62.3169,x:49.1,y:43.75,regY:-1,regX:-39.5}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9985,scaleY:0.9985,rotation:44.3264,x:85.8,y:114.45}},{t:this.instance_11,p:{rotation:41.1824,x:90.85,y:123.9,scaleX:0.9984,scaleY:0.9984,regY:3.1,regX:-5.2}},{t:this.instance_10,p:{regY:1.2,scaleX:0.998,scaleY:0.998,rotation:8.6129,x:20.1,y:90.2,regX:-1}},{t:this.instance_9,p:{regX:3.2,scaleX:0.998,scaleY:0.998,rotation:15.6217,x:1.35,y:184.65,regY:-53.6}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:9.1,rotation:-1.437,x:-5.25,y:-57.8}},{t:this.instance_6,p:{scaleX:0.9984,scaleY:0.9984,rotation:-11.6886,x:-0.3,y:185.25,regY:-55.2,regX:1.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:4.4518,x:-5.2,y:-79.25,regY:52.9}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-79.6076,x:-57.35,regX:35.5,y:-23,regY:0.2}},{t:this.instance_2,p:{regX:44,scaleX:0.9984,scaleY:0.9984,rotation:-113.6461,x:-70.3,y:50.1}},{t:this.instance_1,p:{regY:-9.2,scaleX:0.9984,scaleY:0.9984,rotation:-113.9172,x:-36.3,y:127.7}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-79.3415,x:-34,y:135.3,regY:-1.6,regX:6.8}}]},1).to({state:[{t:this.instance_15,p:{regY:-46.3,scaleX:0.9984,scaleY:0.9984,rotation:-16.8644,x:-21.9,y:91.45,regX:2.1}},{t:this.instance_14,p:{rotation:87.8026,x:47.75,y:-26.15,scaleY:0.9985,regX:-31.2}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:59.1921,x:50.55,y:43.7,regY:-1,regX:-39.5}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9985,scaleY:0.9985,rotation:41.2014,x:91.15,y:112.35}},{t:this.instance_11,p:{rotation:38.0556,x:96.6,y:121.4,scaleX:0.9984,scaleY:0.9984,regY:3.2,regX:-5.2}},{t:this.instance_10,p:{regY:1.2,scaleX:0.998,scaleY:0.998,rotation:10.6887,x:20.35,y:89.95,regX:-1}},{t:this.instance_9,p:{regX:3.2,scaleX:0.998,scaleY:0.998,rotation:17.1558,x:-1.9,y:183.9,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:9,rotation:-1.4169,x:-5.25,y:-57.95}},{t:this.instance_6,p:{scaleX:0.9983,scaleY:0.9983,rotation:-15.0484,x:1.9,y:184.65,regY:-55.2,regX:1.9}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:4.6784,x:-5.1,y:-79.4,regY:52.8}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-76.7408,x:-57.35,regX:35.5,y:-23,regY:0.2}},{t:this.instance_2,p:{regX:44,scaleX:0.9984,scaleY:0.9984,rotation:-111.5541,x:-74,y:49.35}},{t:this.instance_1,p:{regY:-9.2,scaleX:0.9984,scaleY:0.9984,rotation:-111.8268,x:-42.75,y:128.15}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-77.2497,x:-40.85,y:135.85,regY:-1.6,regX:6.8}}]},1).to({state:[{t:this.instance_15,p:{regY:-46.2,scaleX:0.9984,scaleY:0.9984,rotation:-18.2134,x:-21.95,y:91.5,regX:2.1}},{t:this.instance_14,p:{rotation:86.5674,x:47.8,y:-26.1,scaleY:0.9985,regX:-31.2}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:56.0642,x:52.05,y:43.65,regY:-1,regX:-39.5}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9985,scaleY:0.9985,rotation:38.0744,x:96.25,y:109.95}},{t:this.instance_11,p:{rotation:34.9293,x:102.3,y:118.65,scaleX:0.9984,scaleY:0.9984,regY:3.1,regX:-5.2}},{t:this.instance_10,p:{regY:1.2,scaleX:0.998,scaleY:0.998,rotation:12.7671,x:20.6,y:89.85,regX:-1}},{t:this.instance_9,p:{regX:3.2,scaleX:0.998,scaleY:0.998,rotation:18.689,x:-5,y:182.65,regY:-53.6}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:9,rotation:-1.3967,x:-5.3,y:-57.95}},{t:this.instance_6,p:{scaleX:0.9983,scaleY:0.9983,rotation:-18.4067,x:3.8,y:183.95,regY:-55.2,regX:1.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:4.905,x:-5.15,y:-79.25,regY:52.9}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-73.8744,x:-57.35,regX:35.5,y:-23,regY:0.2}},{t:this.instance_2,p:{regX:44,scaleX:0.9985,scaleY:0.9985,rotation:-109.4612,x:-77.5,y:48.45}},{t:this.instance_1,p:{regY:-9.2,scaleX:0.9984,scaleY:0.9984,rotation:-109.7346,x:-49.25,y:128.35}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-75.1564,x:-47.6,y:136.05,regY:-1.6,regX:6.8}}]},1).to({state:[{t:this.instance_15,p:{regY:-46.3,scaleX:0.9984,scaleY:0.9984,rotation:-19.5629,x:-22.15,y:91.35,regX:2.1}},{t:this.instance_14,p:{rotation:85.3323,x:47.75,y:-26.2,scaleY:0.9985,regX:-31.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:52.9394,x:53.45,y:43.5,regY:-1,regX:-39.5}},{t:this.instance_12,p:{regY:8.4,scaleX:0.9985,scaleY:0.9985,rotation:34.9486,x:101.35,y:107.2}},{t:this.instance_11,p:{rotation:31.8022,x:107.85,y:115.65,scaleX:0.9984,scaleY:0.9984,regY:3.1,regX:-5.2}},{t:this.instance_10,p:{regY:1.2,scaleX:0.998,scaleY:0.998,rotation:14.8438,x:20.8,y:89.65,regX:-1}},{t:this.instance_9,p:{regX:3.2,scaleX:0.998,scaleY:0.998,rotation:20.2226,x:-8.1,y:181.55,regY:-53.6}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:9,rotation:-1.3766,x:-5.25,y:-57.95}},{t:this.instance_6,p:{scaleX:0.9983,scaleY:0.9983,rotation:-21.7661,x:5.85,y:183.3,regY:-55.2,regX:1.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:5.1325,x:-5.15,y:-79.25,regY:52.9}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-71.0082,x:-57.35,regX:35.4,y:-22.95,regY:0.2}},{t:this.instance_2,p:{regX:44,scaleX:0.9984,scaleY:0.9984,rotation:-107.3702,x:-81.05,y:47.3}},{t:this.instance_1,p:{regY:-9.1,scaleX:0.9984,scaleY:0.9984,rotation:-107.6416,x:-55.6,y:128.2}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-73.0651,x:-54.35,y:136,regY:-1.6,regX:6.8}}]},1).to({state:[{t:this.instance_15,p:{regY:-46.3,scaleX:0.9984,scaleY:0.9984,rotation:-18.3037,x:-22,y:91.4,regX:2.1}},{t:this.instance_14,p:{rotation:86.4805,x:47.75,y:-26.1,scaleY:0.9985,regX:-31.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:55.8616,x:52.1,y:43.6,regY:-1,regX:-39.5}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9985,scaleY:0.9985,rotation:37.8854,x:96.6,y:109.75}},{t:this.instance_11,p:{rotation:34.7563,x:102.7,y:118.45,scaleX:0.9984,scaleY:0.9984,regY:3.1,regX:-5.2}},{t:this.instance_10,p:{regY:1.2,scaleX:0.998,scaleY:0.998,rotation:12.9135,x:20.65,y:89.85,regX:-1}},{t:this.instance_9,p:{regX:3.2,scaleX:0.998,scaleY:0.998,rotation:18.8156,x:-5.25,y:182.6,regY:-53.6}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:9,rotation:-1.3976,x:-5.3,y:-57.95}},{t:this.instance_6,p:{scaleX:0.9983,scaleY:0.9983,rotation:-18.6166,x:3.95,y:183.95,regY:-55.2,regX:1.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9991,scaleY:0.9991,rotation:4.9181,x:-5.15,y:-79.25,regY:52.9}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-73.6959,x:-57.35,regX:35.5,y:-23,regY:0.2}},{t:this.instance_2,p:{regX:44,scaleX:0.9985,scaleY:0.9985,rotation:-109.3252,x:-77.75,y:48.35}},{t:this.instance_1,p:{regY:-9.2,scaleX:0.9984,scaleY:0.9984,rotation:-109.5803,x:-49.65,y:128.45}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-75.0162,x:-48.05,y:136.05,regY:-1.6,regX:6.8}}]},1).to({state:[{t:this.instance_15,p:{regY:-46.3,scaleX:0.9984,scaleY:0.9984,rotation:-17.0456,x:-21.9,y:91.45,regX:2.1}},{t:this.instance_14,p:{rotation:87.6291,x:47.75,y:-26.3,scaleY:0.9985,regX:-31.3}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:58.7832,x:50.7,y:43.7,regY:-1,regX:-39.5}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9985,scaleY:0.9985,rotation:40.8216,x:91.85,y:112.05}},{t:this.instance_11,p:{rotation:37.71,x:97.5,y:121.05,scaleX:0.9984,scaleY:0.9984,regY:3.1,regX:-5.1}},{t:this.instance_10,p:{regY:1.2,scaleX:0.998,scaleY:0.998,rotation:10.9813,x:20.3,y:90,regX:-1}},{t:this.instance_9,p:{regX:3.2,scaleX:0.998,scaleY:0.998,rotation:17.408,x:-2.3,y:183.6,regY:-53.6}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:9,rotation:-1.4195,x:-5.25,y:-57.95}},{t:this.instance_6,p:{scaleX:0.9983,scaleY:0.9983,rotation:-15.4643,x:2.15,y:184.55,regY:-55.2,regX:1.9}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:4.7056,x:-5.2,y:-79.3,regY:52.9}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-76.3842,x:-57.35,regX:35.5,y:-23,regY:0.2}},{t:this.instance_2,p:{regX:44,scaleX:0.9984,scaleY:0.9984,rotation:-111.2804,x:-74.4,y:49.25}},{t:this.instance_1,p:{regY:-9.2,scaleX:0.9984,scaleY:0.9984,rotation:-111.519,x:-43.6,y:128.2}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-76.9665,x:-41.6,y:135.9,regY:-1.5,regX:6.8}}]},1).to({state:[{t:this.instance_15,p:{regY:-46.4,scaleX:0.9984,scaleY:0.9984,rotation:-15.7859,x:-21.85,y:91.4,regX:2.1}},{t:this.instance_14,p:{rotation:88.7785,x:47.75,y:-26.25,scaleY:0.9985,regX:-31.3}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:61.707,x:49.35,y:43.7,regY:-1,regX:-39.5}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9985,scaleY:0.9985,rotation:43.758,x:86.9,y:114.1}},{t:this.instance_11,p:{rotation:40.6647,x:92.05,y:123.3,scaleX:0.9984,scaleY:0.9984,regY:3.1,regX:-5.2}},{t:this.instance_10,p:{regY:1.2,scaleX:0.998,scaleY:0.998,rotation:9.0506,x:20.05,y:90.2,regX:-1.1}},{t:this.instance_9,p:{regX:3.2,scaleX:0.998,scaleY:0.998,rotation:16.0003,x:0.65,y:184.6,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:9.1,rotation:-1.4405,x:-5.25,y:-57.8}},{t:this.instance_6,p:{scaleX:0.9983,scaleY:0.9983,rotation:-12.3138,x:0.1,y:184.95,regY:-55.3,regX:1.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:4.4923,x:-5.2,y:-79.25,regY:52.9}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-79.0728,x:-57.4,regX:35.5,y:-23,regY:0.2}},{t:this.instance_2,p:{regX:44,scaleX:0.9984,scaleY:0.9984,rotation:-113.2362,x:-71,y:50}},{t:this.instance_1,p:{regY:-9.2,scaleX:0.9984,scaleY:0.9984,rotation:-113.4569,x:-37.55,y:127.8}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-78.918,x:-35.3,y:135.45,regY:-1.6,regX:6.8}}]},1).to({state:[{t:this.instance_15,p:{regY:-46.3,scaleX:0.9984,scaleY:0.9984,rotation:-14.5283,x:-21.7,y:91.5,regX:2.1}},{t:this.instance_14,p:{rotation:89.9256,x:47.75,y:-26.15,scaleY:0.9985,regX:-31.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:64.6298,x:47.95,y:43.6,regY:-1,regX:-39.6}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9985,scaleY:0.9985,rotation:46.6954,x:81.9,y:115.9}},{t:this.instance_11,p:{rotation:43.6191,x:86.55,y:125.5,scaleX:0.9984,scaleY:0.9984,regY:3.1,regX:-5.1}},{t:this.instance_10,p:{regY:1.2,scaleX:0.998,scaleY:0.998,rotation:7.12,x:20,y:90.35,regX:-1}},{t:this.instance_9,p:{regX:3.2,scaleX:0.998,scaleY:0.998,rotation:14.5925,x:3.7,y:185.2,regY:-53.6}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:9.1,rotation:-1.4624,x:-5.25,y:-57.8}},{t:this.instance_6,p:{scaleX:0.9984,scaleY:0.9984,rotation:-9.1622,x:-1.85,y:185.6,regY:-55.2,regX:1.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:4.278,x:-5.2,y:-79.25,regY:52.9}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-81.7612,x:-57.35,regX:35.5,y:-23.05,regY:0.2}},{t:this.instance_2,p:{regX:44,scaleX:0.9984,scaleY:0.9984,rotation:-115.1908,x:-67.55,y:50.55}},{t:this.instance_1,p:{regY:-9.2,scaleX:0.9984,scaleY:0.9984,rotation:-115.3957,x:-31.45,y:127.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-80.8689,x:-29.05,y:134.75,regY:-1.6,regX:6.8}}]},1).to({state:[{t:this.instance_15,p:{regY:-46.3,scaleX:0.9984,scaleY:0.9984,rotation:-13.2691,x:-21.5,y:91.6,regX:2.1}},{t:this.instance_14,p:{rotation:91.0718,x:47.75,y:-26.25,scaleY:0.9985,regX:-31.3}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:67.5513,x:46.6,y:43.7,regY:-1,regX:-39.5}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9985,scaleY:0.9985,rotation:49.631,x:76.75,y:117.55}},{t:this.instance_11,p:{rotation:46.5735,x:80.95,y:127.35,scaleX:0.9984,scaleY:0.9984,regY:3.1,regX:-5.2}},{t:this.instance_10,p:{regY:1.2,scaleX:0.998,scaleY:0.998,rotation:5.1904,x:19.8,y:90.45,regX:-1}},{t:this.instance_9,p:{regX:3.2,scaleX:0.998,scaleY:0.998,rotation:13.1857,x:6.7,y:185.85,regY:-53.6}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:9.1,rotation:-1.4843,x:-5.3,y:-57.85}},{t:this.instance_6,p:{scaleX:0.9983,scaleY:0.9983,rotation:-6.0106,x:-3.75,y:186.1,regY:-55.2,regX:1.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:4.064,x:-5.2,y:-79.3,regY:52.9}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-84.4497,x:-57.35,regX:35.5,y:-23.05,regY:0.2}},{t:this.instance_2,p:{regX:44,scaleX:0.9985,scaleY:0.9985,rotation:-117.147,x:-64.15,y:50.9}},{t:this.instance_1,p:{regY:-9.1,scaleX:0.9984,scaleY:0.9984,rotation:-117.3338,x:-25.3,y:126.3}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-82.8196,x:-22.75,y:133.75,regY:-1.6,regX:6.8}}]},1).to({state:[{t:this.instance_15,p:{regY:-46.3,scaleX:0.9984,scaleY:0.9984,rotation:-12.0099,x:-21.4,y:91.65,regX:2.1}},{t:this.instance_14,p:{rotation:92.2202,x:47.75,y:-26.15,scaleY:0.9985,regX:-31.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:70.4738,x:45.15,y:43.7,regY:-1,regX:-39.5}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9985,scaleY:0.9985,rotation:52.5683,x:71.55,y:118.95}},{t:this.instance_11,p:{rotation:49.5278,x:75.1,y:129,scaleX:0.9984,scaleY:0.9984,regY:3.2,regX:-5.2}},{t:this.instance_10,p:{regY:1.2,scaleX:0.998,scaleY:0.998,rotation:3.2596,x:19.55,y:90.6,regX:-1}},{t:this.instance_9,p:{regX:3.2,scaleX:0.998,scaleY:0.998,rotation:11.7778,x:9.65,y:186.4,regY:-53.6}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:9.1,rotation:-1.5053,x:-5.25,y:-57.85}},{t:this.instance_6,p:{scaleX:0.9983,scaleY:0.9983,rotation:-2.8595,x:-5.65,y:186.5,regY:-55.2,regX:1.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:3.8517,x:-5.2,y:-79.25,regY:52.9}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-87.1391,x:-57.4,regX:35.5,y:-23.05,regY:0.2}},{t:this.instance_2,p:{regX:44,scaleX:0.9985,scaleY:0.9985,rotation:-119.1022,x:-60.65,y:51.15}},{t:this.instance_1,p:{regY:-9.2,scaleX:0.9984,scaleY:0.9984,rotation:-119.2717,x:-19.4,y:125.2}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-84.7701,x:-16.45,y:132.55,regY:-1.6,regX:6.8}}]},1).to({state:[{t:this.instance_15,p:{regY:-46.3,scaleX:0.9984,scaleY:0.9984,rotation:-10.7523,x:-21.25,y:91.7,regX:2.1}},{t:this.instance_14,p:{rotation:93.3687,x:47.85,y:-26.2,scaleY:0.9985,regX:-31.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:73.3959,x:43.85,y:43.7,regY:-1,regX:-39.5}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9985,scaleY:0.9985,rotation:55.5049,x:66.3,y:120.15}},{t:this.instance_11,p:{rotation:52.4823,x:69.4,y:130.3,scaleX:0.9984,scaleY:0.9984,regY:3.1,regX:-5.2}},{t:this.instance_10,p:{regY:1.2,scaleX:0.998,scaleY:0.998,rotation:1.329,x:19.25,y:90.65,regX:-1.1}},{t:this.instance_9,p:{regX:3.2,scaleX:0.998,scaleY:0.998,rotation:10.3701,x:12.75,y:186.85,regY:-53.6}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:9.1,rotation:-1.5263,x:-5.3,y:-57.85}},{t:this.instance_6,p:{scaleX:0.9984,scaleY:0.9984,rotation:0.2872,x:-7.5,y:186.9,regY:-55.2,regX:1.9}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:3.6377,x:-5.2,y:-79.25,regY:52.9}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-89.8266,x:-57.4,regX:35.5,y:-23.05,regY:0.2}},{t:this.instance_2,p:{regX:44,scaleX:0.9984,scaleY:0.9984,rotation:-121.0573,x:-57.25,y:51.2}},{t:this.instance_1,p:{regY:-9.2,scaleX:0.9984,scaleY:0.9984,rotation:-121.2102,x:-13.45,y:123.9}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-86.7221,x:-10.25,y:130.9,regY:-1.6,regX:6.9}}]},1).to({state:[{t:this.instance_15,p:{regY:-46.3,scaleX:0.9984,scaleY:0.9984,rotation:-9.4934,x:-21.15,y:91.8,regX:2.1}},{t:this.instance_14,p:{rotation:94.5176,x:47.75,y:-26.1,scaleY:0.9985,regX:-31.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:76.3186,x:42.35,y:43.6,regY:-1,regX:-39.5}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9985,scaleY:0.9985,rotation:58.4413,x:60.95,y:121.15}},{t:this.instance_11,p:{rotation:55.4368,x:63.6,y:131.3,scaleX:0.9984,scaleY:0.9984,regY:3.1,regX:-5.2}},{t:this.instance_10,p:{regY:1.2,scaleX:0.998,scaleY:0.998,rotation:-0.5966,x:19.1,y:90.8,regX:-1}},{t:this.instance_9,p:{regX:3.2,scaleX:0.998,scaleY:0.998,rotation:8.9633,x:15.7,y:187.1,regY:-53.6}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:9.1,rotation:-1.5482,x:-5.3,y:-57.85}},{t:this.instance_6,p:{scaleX:0.9983,scaleY:0.9983,rotation:3.4385,x:-9.6,y:187.25,regY:-55.2,regX:1.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:3.4256,x:-5.25,y:-79.25,regY:52.9}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-92.5102,x:-57.4,regX:35.5,y:-23,regY:0.2}},{t:this.instance_2,p:{regX:44.1,scaleX:0.9984,scaleY:0.9984,rotation:-123.0137,x:-53.8,y:51.1}},{t:this.instance_1,p:{regY:-9.2,scaleX:0.9984,scaleY:0.9984,rotation:-123.148,x:-7.65,y:122.2}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-88.6732,x:-4,y:129.25,regY:-1.6,regX:6.9}}]},1).to({state:[{t:this.instance_15,p:{regY:-46.3,scaleX:0.9984,scaleY:0.9984,rotation:-8.235,x:-21,y:91.85,regX:2.1}},{t:this.instance_14,p:{rotation:95.6657,x:47.8,y:-26.1,scaleY:0.9985,regX:-31.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:79.2413,x:41.15,y:43.45,regY:-1.1,regX:-39.5}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9985,scaleY:0.9985,rotation:61.3796,x:55.7,y:121.8}},{t:this.instance_11,p:{rotation:58.3905,x:57.7,y:132.25,scaleX:0.9984,scaleY:0.9984,regY:3.1,regX:-5.2}},{t:this.instance_10,p:{regY:1.2,scaleX:0.998,scaleY:0.998,rotation:-2.5281,x:18.9,y:90.95,regX:-1}},{t:this.instance_9,p:{regX:3.2,scaleX:0.998,scaleY:0.998,rotation:7.5556,x:18.75,y:187.3,regY:-53.6}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:9.1,rotation:-1.5692,x:-5.35,y:-57.85}},{t:this.instance_6,p:{scaleX:0.9983,scaleY:0.9983,rotation:6.5887,x:-11.45,y:187.5,regY:-55.2,regX:1.9}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:3.2108,x:-5.25,y:-79.25,regY:52.9}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-95.1994,x:-57.4,regX:35.5,y:-23,regY:0.2}},{t:this.instance_2,p:{regX:44.1,scaleX:0.9984,scaleY:0.9984,rotation:-124.9686,x:-50.35,y:50.8}},{t:this.instance_1,p:{regY:-9.2,scaleX:0.9984,scaleY:0.9984,rotation:-125.0879,x:-1.75,y:120.4}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-90.62,x:2,y:127.25,regY:-1.6,regX:6.9}}]},1).to({state:[{t:this.instance_15,p:{regY:-46.3,scaleX:0.9984,scaleY:0.9984,rotation:-6.9752,x:-20.75,y:91.9,regX:2.2}},{t:this.instance_14,p:{rotation:96.8143,x:47.8,y:-26.1,scaleY:0.9985,regX:-31.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:82.1644,x:39.6,y:43.35,regY:-1,regX:-39.5}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9985,scaleY:0.9985,rotation:64.3144,x:50.25,y:122.4}},{t:this.instance_11,p:{rotation:61.3441,x:51.75,y:132.85,scaleX:0.9984,scaleY:0.9984,regY:3.1,regX:-5.2}},{t:this.instance_10,p:{regY:1.2,scaleX:0.998,scaleY:0.998,rotation:-4.4589,x:18.75,y:91.05,regX:-1}},{t:this.instance_9,p:{regX:3.2,scaleX:0.998,scaleY:0.998,rotation:6.1484,x:21.8,y:187.45,regY:-53.6}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:9.1,rotation:-1.5902,x:-5.3,y:-57.85}},{t:this.instance_6,p:{scaleX:0.9983,scaleY:0.9983,rotation:9.7413,x:-13.6,y:187.7,regY:-55.2,regX:1.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9991,scaleY:0.9991,rotation:2.9977,x:-5.25,y:-79.25,regY:52.9}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-97.8878,x:-57.4,regX:35.5,y:-23.05,regY:0.2}},{t:this.instance_2,p:{regX:44,scaleX:0.9984,scaleY:0.9984,rotation:-126.9242,x:-46.85,y:50.5}},{t:this.instance_1,p:{regY:-9.2,scaleX:0.9984,scaleY:0.9984,rotation:-127.0265,x:4,y:118.3}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-92.5702,x:8,y:125,regY:-1.6,regX:6.9}}]},1).to({state:[{t:this.instance_15,p:{regY:-46.3,scaleX:0.9984,scaleY:0.9984,rotation:-5.7171,x:-20.8,y:91.95,regX:2.1}},{t:this.instance_14,p:{rotation:97.9622,x:47.75,y:-26.1,scaleY:0.9985,regX:-31.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:85.0871,x:38.25,y:43.2,regY:-1,regX:-39.5}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9985,scaleY:0.9985,rotation:67.2515,x:44.9,y:122.6}},{t:this.instance_11,p:{rotation:64.2985,x:45.8,y:133.15,scaleX:0.9984,scaleY:0.9984,regY:3.1,regX:-5.2}},{t:this.instance_10,p:{regY:1.2,scaleX:0.998,scaleY:0.998,rotation:-6.3897,x:18.55,y:91.2,regX:-1}},{t:this.instance_9,p:{regX:3.2,scaleX:0.998,scaleY:0.998,rotation:4.7412,x:24.8,y:187.4,regY:-53.6}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:9.1,rotation:-1.6121,x:-5.35,y:-57.85}},{t:this.instance_6,p:{scaleX:0.9983,scaleY:0.9983,rotation:12.8916,x:-15.5,y:187.95,regY:-55.2,regX:1.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:2.784,x:-5.25,y:-79.3,regY:52.9}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-100.576,x:-57.4,regX:35.5,y:-23.05,regY:0.2}},{t:this.instance_2,p:{regX:44.1,scaleX:0.9985,scaleY:0.9985,rotation:-128.8792,x:-43.5,y:49.85}},{t:this.instance_1,p:{regY:-9.2,scaleX:0.9984,scaleY:0.9984,rotation:-128.9642,x:9.7,y:115.95}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-94.5217,x:13.95,y:122.7,regY:-1.6,regX:6.8}}]},1).to({state:[{t:this.instance_15,p:{regY:-46.3,scaleX:0.9984,scaleY:0.9984,rotation:-4.4581,x:-20.65,y:92,regX:2.1}},{t:this.instance_14,p:{rotation:99.1114,x:47.8,y:-26.1,scaleY:0.9985,regX:-31.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:88.0085,x:36.95,y:42.95,regY:-1,regX:-39.5}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9985,scaleY:0.9985,rotation:70.1894,x:39.3,y:122.65}},{t:this.instance_11,p:{rotation:67.2527,x:39.8,y:133.2,scaleX:0.9984,scaleY:0.9984,regY:3.1,regX:-5.2}},{t:this.instance_10,p:{regY:1.2,scaleX:0.998,scaleY:0.998,rotation:-8.3196,x:18.2,y:91.3,regX:-1.1}},{t:this.instance_9,p:{regX:3.2,scaleX:0.998,scaleY:0.998,rotation:3.3343,x:27.85,y:187.35,regY:-53.6}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:9.1,rotation:-1.6322,x:-5.35,y:-57.85}},{t:this.instance_6,p:{scaleX:0.9984,scaleY:0.9984,rotation:16.0427,x:-17.4,y:188.15,regY:-55.2,regX:1.9}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:2.5711,x:-5.25,y:-79.3,regY:52.9}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-103.2645,x:-57.35,regX:35.5,y:-23.05,regY:0.3}},{t:this.instance_2,p:{regX:44.1,scaleX:0.9984,scaleY:0.9984,rotation:-130.8343,x:-40.1,y:49.1}},{t:this.instance_1,p:{regY:-9.2,scaleX:0.9984,scaleY:0.9984,rotation:-130.9025,x:15.3,y:113.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-96.473,x:19.8,y:119.8,regY:-1.6,regX:6.9}}]},1).to({state:[{t:this.instance_15,p:{regY:-46.3,scaleX:0.9984,scaleY:0.9984,rotation:-3.1996,x:-20.6,y:92.05,regX:2.1}},{t:this.instance_14,p:{rotation:100.2582,x:47.8,y:-26.1,scaleY:0.9985,regX:-31.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:90.9273,x:35.5,y:42.6,regY:-1,regX:-39.6}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9985,scaleY:0.9985,rotation:73.126,x:34,y:122.45}},{t:this.instance_11,p:{rotation:70.207,x:33.8,y:133,scaleX:0.9984,scaleY:0.9984,regY:3.1,regX:-5.2}},{t:this.instance_10,p:{regY:1.2,scaleX:0.998,scaleY:0.998,rotation:-10.2502,x:18,y:91.5,regX:-1.1}},{t:this.instance_9,p:{regX:3.2,scaleX:0.998,scaleY:0.998,rotation:1.9276,x:30.9,y:187.05,regY:-53.6}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:9.1,rotation:-1.6532,x:-5.4,y:-57.8}},{t:this.instance_6,p:{scaleX:0.9983,scaleY:0.9983,rotation:19.1952,x:-19.5,y:188.25,regY:-55.2,regX:1.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9991,scaleY:0.9991,rotation:2.3565,x:-5.25,y:-79.3,regY:52.9}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-105.9524,x:-57.45,regX:35.5,y:-23.05,regY:0.2}},{t:this.instance_2,p:{regX:44,scaleX:0.9984,scaleY:0.9984,rotation:-132.7909,x:-36.65,y:48.3}},{t:this.instance_1,p:{regY:-9.2,scaleX:0.9984,scaleY:0.9984,rotation:-132.841,x:20.8,y:110.45}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-98.4231,x:25.55,y:117,regY:-1.6,regX:6.8}}]},1).to({state:[{t:this.instance_15,p:{regY:-46.3,scaleX:0.9984,scaleY:0.9984,rotation:-1.9417,x:-20.4,y:92.1,regX:2.1}},{t:this.instance_14,p:{rotation:101.4083,x:47.75,y:-26.1,scaleY:0.9985,regX:-31.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:93.8485,x:34.15,y:42.55,regY:-1,regX:-39.5}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9985,scaleY:0.9985,rotation:76.0614,x:28.55,y:122.05}},{t:this.instance_11,p:{rotation:73.1619,x:27.9,y:132.6,scaleX:0.9985,scaleY:0.9985,regY:3.1,regX:-5.2}},{t:this.instance_10,p:{regY:1.1,scaleX:0.998,scaleY:0.998,rotation:-12.1813,x:17.85,y:91.45,regX:-1}},{t:this.instance_9,p:{regX:3.2,scaleX:0.998,scaleY:0.998,rotation:0.5195,x:33.85,y:186.7,regY:-53.6}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:9.1,rotation:-1.6751,x:-5.4,y:-57.8}},{t:this.instance_6,p:{scaleX:0.9983,scaleY:0.9983,rotation:22.3456,x:-21.55,y:188.35,regY:-55.2,regX:1.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:2.1437,x:-5.3,y:-79.3,regY:52.9}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-108.641,x:-57.3,regX:35.5,y:-23.1,regY:0.3}},{t:this.instance_2,p:{regX:44,scaleX:0.9984,scaleY:0.9984,rotation:-134.7455,x:-33.35,y:47.25}},{t:this.instance_1,p:{regY:-9.2,scaleX:0.9984,scaleY:0.9984,rotation:-134.7802,x:26.25,y:107.4}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-100.3744,x:31.35,y:113.7,regY:-1.5,regX:6.8}}]},1).to({state:[{t:this.instance_15,p:{regY:-46.3,scaleX:0.9984,scaleY:0.9984,rotation:-0.6821,x:-20.25,y:92.2,regX:2.1}},{t:this.instance_14,p:{rotation:102.5559,x:47.75,y:-26.05,scaleY:0.9985,regX:-31.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:96.771,x:32.8,y:42.2,regY:-1,regX:-39.5}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9986,scaleY:0.9986,rotation:78.9988,x:23.15,y:121.3}},{t:this.instance_11,p:{rotation:76.1152,x:21.8,y:131.85,scaleX:0.9984,scaleY:0.9984,regY:3.1,regX:-5.2}},{t:this.instance_10,p:{regY:1.2,scaleX:0.998,scaleY:0.998,rotation:-14.1119,x:17.7,y:91.7,regX:-1}},{t:this.instance_9,p:{regX:3.2,scaleX:0.998,scaleY:0.998,rotation:-0.8831,x:36.85,y:186.2,regY:-53.6}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:9.1,rotation:-1.6952,x:-5.45,y:-57.8}},{t:this.instance_6,p:{scaleX:0.9983,scaleY:0.9983,rotation:25.4958,x:-23.45,y:188.15,regY:-55.3,regX:1.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:1.93,x:-5.35,y:-79.3,regY:52.9}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-111.3302,x:-57.4,regX:35.5,y:-23,regY:0.2}},{t:this.instance_2,p:{regX:44,scaleX:0.9985,scaleY:0.9985,rotation:-136.7004,x:-30.15,y:46}},{t:this.instance_1,p:{regY:-9.2,scaleX:0.9984,scaleY:0.9984,rotation:-136.7173,x:31.5,y:104.2}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-102.326,x:36.7,y:110.25,regY:-1.6,regX:6.8}}]},1).to({state:[{t:this.instance_15,p:{regY:-46.3,scaleX:0.9984,scaleY:0.9984,rotation:0.5718,x:-20.2,y:92.2,regX:2.1}},{t:this.instance_14,p:{rotation:103.706,x:47.85,y:-26.1,scaleY:0.9985,regX:-31.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:99.6935,x:31.4,y:41.8,regY:-1,regX:-39.6}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9985,scaleY:0.9985,rotation:81.934,x:17.7,y:120.45}},{t:this.instance_11,p:{rotation:79.0689,x:15.75,y:130.85,scaleX:0.9984,scaleY:0.9984,regY:3.2,regX:-5.2}},{t:this.instance_10,p:{regY:1.2,scaleX:0.998,scaleY:0.998,rotation:-16.0427,x:17.5,y:91.85,regX:-1}},{t:this.instance_9,p:{regX:3.2,scaleX:0.998,scaleY:0.998,rotation:-2.2897,x:39.85,y:185.65,regY:-53.6}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:9.1,rotation:-1.7163,x:-5.45,y:-57.8}},{t:this.instance_6,p:{scaleX:0.9983,scaleY:0.9983,rotation:28.6471,x:-25.55,y:188.25,regY:-55.2,regX:1.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:1.7172,x:-5.35,y:-79.3,regY:52.9}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-114.017,x:-57.35,regX:35.5,y:-23.05,regY:0.3}},{t:this.instance_2,p:{regX:44,scaleX:0.9984,scaleY:0.9984,rotation:-138.6567,x:-27.05,y:44.75}},{t:this.instance_1,p:{regY:-9.1,scaleX:0.9984,scaleY:0.9984,rotation:-138.6557,x:36.65,y:100.6}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-104.2779,x:42.05,y:106.6,regY:-1.6,regX:6.8}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-99.4,-207.8,235.4,512.7);


(lib.CharacterGood_01 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-57.2,-22.75,0.9989,0.9989,-68.3611,0,0,35.7,0.6);

	this.instance_1 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_1.setTransform(-75.25,139.2,0.9987,0.9987,-91.2423,0,0,6.8,-1.4);

	this.instance_2 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_2.setTransform(-76,130.65,0.999,0.999,-104.2772,0,0,5.7,-8.6);

	this.instance_3 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_3.setTransform(-84.8,46.4,0.9989,0.9989,-95.7865,0,0,44.4,0.2);

	this.instance_4 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_4.setTransform(-5.4,-78.85,0.9993,0.9993,1.7412,0,0,0.5,53.3);

	this.instance_5 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_5.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_6 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_6.setTransform(31.3,171.15,0.9987,0.9987,-13.2774,0,0,3.1,-54.7);

	this.instance_7 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_7.setTransform(-4.6,-58.05,0.9993,0.9993,-1.6896,0,0,-0.2,8.9);

	this.instance_8 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_8.setTransform(-5.55,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_9 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_9.setTransform(-15.15,178.1,0.9983,0.9983,27.9892,0,0,2.8,-54.3);

	this.instance_10 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_10.setTransform(21.6,90.1,0.9983,0.9983,19.7511,0,0,-0.5,1.5);

	this.instance_11 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_11.setTransform(103.15,115.15,0.9989,0.9989,57.4434,0,0,-5.1,2.9);

	this.instance_12 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_12.setTransform(98.95,104.6,0.9989,0.9989,50.0521,0,0,-6.6,7.8);

	this.instance_13 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_13.setTransform(42.75,48.2,0.9989,0.9989,45.9036,0,0,-40.1,-0.1);

	this.instance_14 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_14.setTransform(47.65,-26.1,0.9989,0.9989,94.5849,0,0,-31.7,-1.1);

	this.instance_15 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_15.setTransform(-22.65,90.95,0.9987,0.9987,-36.0043,0,0,2.5,-46.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{regX:2.5,scaleX:0.9987,scaleY:0.9987,rotation:-36.0043,x:-22.65,y:90.95,regY:-46.2}},{t:this.instance_14,p:{rotation:94.5849,x:47.65,y:-26.1,regX:-31.7,scaleX:0.9989,scaleY:0.9989,regY:-1.1}},{t:this.instance_13,p:{rotation:45.9036,x:42.75,y:48.2,scaleX:0.9989,scaleY:0.9989,regX:-40.1,regY:-0.1}},{t:this.instance_12,p:{scaleX:0.9989,scaleY:0.9989,rotation:50.0521,x:98.95,y:104.6,regX:-6.6,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9989,scaleY:0.9989,rotation:57.4434,x:103.15,y:115.15,regY:2.9,regX:-5.1}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9983,scaleY:0.9983,rotation:19.7511,x:21.6,y:90.1,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:27.9892,x:-15.15,y:178.1,regY:-54.3,regX:2.8}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.2,rotation:-1.6896,x:-4.6,y:-58.05}},{t:this.instance_6,p:{regY:-54.7,scaleX:0.9987,scaleY:0.9987,rotation:-13.2774,x:31.3,y:171.15,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.3,rotation:1.7412,y:-78.85,x:-5.4}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9989,scaleY:0.9989,rotation:-95.7865,x:-84.8,y:46.4,regX:44.4}},{t:this.instance_2,p:{scaleX:0.999,scaleY:0.999,rotation:-104.2772,x:-76,y:130.65,regX:5.7,regY:-8.6}},{t:this.instance_1,p:{rotation:-91.2423,x:-75.25,y:139.2,regY:-1.4,scaleX:0.9987,scaleY:0.9987,regX:6.8}},{t:this.instance,p:{scaleX:0.9989,scaleY:0.9989,rotation:-68.3611,x:-57.2,y:-22.75,regX:35.7,regY:0.6}}]}).to({state:[{t:this.instance_15,p:{regX:2.4,scaleX:0.9986,scaleY:0.9986,rotation:-32.6991,x:-22.9,y:90.9,regY:-46.2}},{t:this.instance_14,p:{rotation:95.9634,x:47.65,y:-26.1,regX:-31.7,scaleX:0.9989,scaleY:0.9989,regY:-1.1}},{t:this.instance_13,p:{rotation:47.7521,x:40.9,y:48.05,scaleX:0.9989,scaleY:0.9989,regX:-40.1,regY:-0.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:51.9015,x:95.35,y:106.25,regX:-6.6,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:59.2919,x:99.15,y:116.95,regY:2.9,regX:-5.1}},{t:this.instance_10,p:{regY:1.6,scaleX:0.9982,scaleY:0.9982,rotation:16.8486,x:21.4,y:90.2,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:25.4702,x:-10.75,y:179.85,regY:-54.3,regX:2.8}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.3,rotation:-1.6713,x:-4.65,y:-58}},{t:this.instance_6,p:{regY:-54.6,scaleX:0.9986,scaleY:0.9986,rotation:-10.7469,x:26.5,y:174,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.2,rotation:2.0853,y:-78.95,x:-5.4}},{t:this.instance_3,p:{regY:0.3,scaleX:0.9988,scaleY:0.9988,rotation:-99.9592,x:-80.75,y:47.75,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9989,scaleY:0.9989,rotation:-108.4493,x:-65.9,y:131.2,regX:5.7,regY:-8.6}},{t:this.instance_1,p:{rotation:-95.4139,x:-64.6,y:139.7,regY:-1.4,scaleX:0.9987,scaleY:0.9987,regX:6.8}},{t:this.instance,p:{scaleX:0.9988,scaleY:0.9988,rotation:-71.6143,x:-57.25,y:-22.7,regX:35.7,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,scaleX:0.9986,scaleY:0.9986,rotation:-29.3919,x:-23,y:90.85,regY:-46.1}},{t:this.instance_14,p:{rotation:97.3436,x:47.6,y:-26.05,regX:-31.7,scaleX:0.9989,scaleY:0.9989,regY:-1.1}},{t:this.instance_13,p:{rotation:49.601,x:39.2,y:47.85,scaleX:0.9988,scaleY:0.9988,regX:-40.1,regY:-0.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:53.7507,x:91.6,y:107.8,regX:-6.6,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:61.1413,x:95.15,y:118.6,regY:2.9,regX:-5.1}},{t:this.instance_10,p:{regY:1.6,scaleX:0.9982,scaleY:0.9982,rotation:13.9466,x:21.2,y:90.3,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:22.9513,x:-6.35,y:181.5,regY:-54.3,regX:2.8}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.3,rotation:-1.6529,x:-4.7,y:-58}},{t:this.instance_6,p:{regY:-54.7,scaleX:0.9986,scaleY:0.9986,rotation:-8.2154,x:21.35,y:176.55,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.2,rotation:2.4276,y:-79,x:-5.4}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-104.1331,x:-76.9,y:49,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9989,scaleY:0.9989,rotation:-112.6245,x:-55.85,y:131.1,regX:5.7,regY:-8.6}},{t:this.instance_1,p:{rotation:-99.5887,x:-53.95,y:139.45,regY:-1.4,scaleX:0.9987,scaleY:0.9987,regX:6.8}},{t:this.instance,p:{scaleX:0.9988,scaleY:0.9988,rotation:-74.8691,x:-57.2,y:-22.65,regX:35.6,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,scaleX:0.9986,scaleY:0.9986,rotation:-26.0862,x:-23.2,y:90.8,regY:-46.1}},{t:this.instance_14,p:{rotation:98.7234,x:47.6,y:-26.1,regX:-31.7,scaleX:0.9989,scaleY:0.9989,regY:-1.1}},{t:this.instance_13,p:{rotation:51.4504,x:37.45,y:47.7,scaleX:0.9988,scaleY:0.9988,regX:-40.1,regY:-0.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:55.5998,x:87.85,y:109.25,regX:-6.6,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:62.9899,x:91.05,y:120.1,regY:2.9,regX:-5.1}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9982,scaleY:0.9982,rotation:11.0458,x:21,y:90.25,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:20.4314,x:-1.85,y:182.95,regY:-54.2,regX:2.8}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.3,rotation:-1.6363,x:-4.65,y:-58}},{t:this.instance_6,p:{regY:-54.7,scaleX:0.9987,scaleY:0.9987,rotation:-5.684,x:16.25,y:178.85,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.2,rotation:2.7718,y:-79,x:-5.3}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-108.3065,x:-72.75,y:50.05,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9989,scaleY:0.9989,rotation:-116.7964,x:-45.75,y:130.3,regX:5.7,regY:-8.6}},{t:this.instance_1,p:{rotation:-103.7628,x:-43.25,y:138.5,regY:-1.4,scaleX:0.9987,scaleY:0.9987,regX:6.8}},{t:this.instance,p:{scaleX:0.9988,scaleY:0.9988,rotation:-78.1236,x:-57.15,y:-22.8,regX:35.7,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,scaleX:0.9986,scaleY:0.9986,rotation:-22.7801,x:-23.45,y:90.6,regY:-46.2}},{t:this.instance_14,p:{rotation:100.1029,x:47.65,y:-26,regX:-31.6,scaleX:0.9989,scaleY:0.9989,regY:-1.1}},{t:this.instance_13,p:{rotation:53.2989,x:35.6,y:47.35,scaleX:0.9989,scaleY:0.9989,regX:-40.1,regY:-0.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:57.4488,x:84.1,y:110.5,regX:-6.6,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:64.8388,x:86.95,y:121.6,regY:2.9,regX:-5.1}},{t:this.instance_10,p:{regY:1.6,scaleX:0.9982,scaleY:0.9982,rotation:8.1446,x:20.9,y:90.45,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:17.9118,x:2.75,y:184,regY:-54.3,regX:2.8}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.3,rotation:-1.6179,x:-4.65,y:-58}},{t:this.instance_6,p:{regY:-54.7,scaleX:0.9987,scaleY:0.9987,rotation:-3.1541,x:10.9,y:180.9,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.2,rotation:3.1161,y:-78.95,x:-5.3}},{t:this.instance_3,p:{regY:0.3,scaleX:0.9988,scaleY:0.9988,rotation:-112.4807,x:-68.45,y:50.7,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9989,scaleY:0.9989,rotation:-120.9707,x:-35.8,y:128.85,regX:5.7,regY:-8.6}},{t:this.instance_1,p:{rotation:-107.9363,x:-32.85,y:136.95,regY:-1.5,scaleX:0.9987,scaleY:0.9987,regX:6.8}},{t:this.instance,p:{scaleX:0.9988,scaleY:0.9988,rotation:-81.3762,x:-57.15,y:-22.6,regX:35.6,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,scaleX:0.9986,scaleY:0.9986,rotation:-19.4737,x:-23.65,y:90.65,regY:-46.1}},{t:this.instance_14,p:{rotation:101.4835,x:47.6,y:-26.2,regX:-31.7,scaleX:0.9988,scaleY:0.9988,regY:-1.1}},{t:this.instance_13,p:{rotation:55.1468,x:33.85,y:47,scaleX:0.9988,scaleY:0.9988,regX:-40.1,regY:-0.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:59.2974,x:80.3,y:111.85,regX:-6.5,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:66.6876,x:82.85,y:122.8,regY:2.8,regX:-5.1}},{t:this.instance_10,p:{regY:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.2439,x:20.7,y:90.55,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:15.3931,x:7.35,y:184.85,regY:-54.3,regX:2.8}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.3,rotation:-1.5995,x:-4.6,y:-58}},{t:this.instance_6,p:{regY:-54.7,scaleX:0.9987,scaleY:0.9987,rotation:-0.6225,x:5.45,y:182.6,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.2,rotation:3.4588,y:-78.95,x:-5.3}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-116.6547,x:-64.35,y:51.2,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-125.1448,x:-25.95,y:126.9,regX:5.6,regY:-8.6}},{t:this.instance_1,p:{rotation:-112.1103,x:-22.35,y:134.55,regY:-1.4,scaleX:0.9986,scaleY:0.9986,regX:6.8}},{t:this.instance,p:{scaleX:0.9988,scaleY:0.9988,rotation:-84.63,x:-57.15,y:-22.65,regX:35.6,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,scaleX:0.9986,scaleY:0.9986,rotation:-16.1684,x:-23.8,y:90.6,regY:-46.1}},{t:this.instance_14,p:{rotation:102.8616,x:47.6,y:-26.05,regX:-31.6,scaleX:0.9989,scaleY:0.9989,regY:-1.1}},{t:this.instance_13,p:{rotation:56.9972,x:32.15,y:46.65,scaleX:0.9989,scaleY:0.9989,regX:-40.1,regY:-0.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:61.1468,x:76.35,y:112.85,regX:-6.6,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:68.5378,x:78.5,y:124,regY:2.9,regX:-5.1}},{t:this.instance_10,p:{regY:1.6,scaleX:0.9982,scaleY:0.9982,rotation:2.3426,x:20.55,y:90.65,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:12.8734,x:12,y:185.35,regY:-54.4,regX:2.8}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.3,rotation:-1.582,x:-4.65,y:-58}},{t:this.instance_6,p:{regY:-54.7,scaleX:0.9987,scaleY:0.9987,rotation:1.9045,x:0,y:184.05,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.3,rotation:3.8033,y:-78.85,x:-5.3}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-120.8285,x:-60.25,y:51.45,regX:44.5}},{t:this.instance_2,p:{scaleX:0.9989,scaleY:0.9989,rotation:-129.3172,x:-16.45,y:124.15,regX:5.7,regY:-8.7}},{t:this.instance_1,p:{rotation:-116.2839,x:-12.15,y:131.55,regY:-1.4,scaleX:0.9986,scaleY:0.9986,regX:6.8}},{t:this.instance,p:{scaleX:0.9988,scaleY:0.9988,rotation:-87.8848,x:-57.15,y:-22.8,regX:35.7,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,scaleX:0.9986,scaleY:0.9986,rotation:-12.8615,x:-23.8,y:90.35,regY:-46.2}},{t:this.instance_14,p:{rotation:104.2415,x:47.6,y:-26.2,regX:-31.7,scaleX:0.9989,scaleY:0.9989,regY:-1.1}},{t:this.instance_13,p:{rotation:58.8456,x:30.4,y:46.2,scaleX:0.9989,scaleY:0.9989,regX:-40.1,regY:-0.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:62.9954,x:72.4,y:113.95,regX:-6.5,regY:7.9}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:70.3867,x:74.2,y:125.05,regY:2.9,regX:-5.1}},{t:this.instance_10,p:{regY:1.6,scaleX:0.9982,scaleY:0.9982,rotation:-0.5544,x:20.4,y:90.65,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.3542,x:16.5,y:185.9,regY:-54.3,regX:2.8}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.3,rotation:-1.5636,x:-4.65,y:-58}},{t:this.instance_6,p:{regY:-54.6,scaleX:0.9986,scaleY:0.9986,rotation:4.4342,x:-5.6,y:185.3,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.2,rotation:4.1471,y:-78.95,x:-5.35}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-125.0009,x:-56,y:51.5,regX:44.5}},{t:this.instance_2,p:{scaleX:0.9989,scaleY:0.9989,rotation:-133.4909,x:-7.1,y:120.7,regX:5.7,regY:-8.6}},{t:this.instance_1,p:{rotation:-120.4566,x:-2.3,y:127.95,regY:-1.4,scaleX:0.9986,scaleY:0.9986,regX:6.7}},{t:this.instance,p:{scaleX:0.9988,scaleY:0.9988,rotation:-91.1345,x:-57.15,y:-22.7,regX:35.6,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,scaleX:0.9986,scaleY:0.9986,rotation:-9.5562,x:-24.15,y:90.4,regY:-46.1}},{t:this.instance_14,p:{rotation:105.6225,x:47.6,y:-26.15,regX:-31.7,scaleX:0.9988,scaleY:0.9988,regY:-1.1}},{t:this.instance_13,p:{rotation:60.6943,x:28.6,y:45.8,scaleX:0.9988,scaleY:0.9988,regX:-40.1,regY:-0.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:64.8439,x:68.5,y:114.7,regX:-6.6,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9989,scaleY:0.9989,rotation:72.2346,x:69.95,y:126,regY:2.9,regX:-5.1}},{t:this.instance_10,p:{regY:1.6,scaleX:0.9982,scaleY:0.9982,rotation:-3.4572,x:20.25,y:90.8,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:7.834,x:21.15,y:186.05,regY:-54.3,regX:2.8}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.3,rotation:-1.5452,x:-4.55,y:-58}},{t:this.instance_6,p:{regY:-54.7,scaleX:0.9986,scaleY:0.9986,rotation:6.9666,x:-11.3,y:186,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.2,rotation:4.4911,y:-78.85,x:-5.3}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-129.1756,x:-51.75,y:51.35,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-137.6648,x:2,y:116.8,regX:5.7,regY:-8.6}},{t:this.instance_1,p:{rotation:-124.6308,x:7.25,y:123.6,regY:-1.4,scaleX:0.9986,scaleY:0.9986,regX:6.8}},{t:this.instance,p:{scaleX:0.9988,scaleY:0.9988,rotation:-94.3887,x:-57.1,y:-22.7,regX:35.6,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,scaleX:0.9986,scaleY:0.9986,rotation:-6.2501,x:-24.2,y:90.3,regY:-46.1}},{t:this.instance_14,p:{rotation:107.0013,x:47.6,y:-26.25,regX:-31.7,scaleX:0.9989,scaleY:0.9989,regY:-1.1}},{t:this.instance_13,p:{rotation:62.5436,x:26.85,y:45.3,scaleX:0.9988,scaleY:0.9988,regX:-40.1,regY:-0.1}},{t:this.instance_12,p:{scaleX:0.9989,scaleY:0.9989,rotation:66.6938,x:64.65,y:115.65,regX:-6.5,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:74.0838,x:65.5,y:126.8,regY:2.9,regX:-5.1}},{t:this.instance_10,p:{regY:1.6,scaleX:0.9982,scaleY:0.9982,rotation:-6.3585,x:20.05,y:90.85,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.3142,x:25.85,y:185.95,regY:-54.3,regX:2.8}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.3,rotation:-1.5277,x:-4.6,y:-58}},{t:this.instance_6,p:{regY:-54.7,scaleX:0.9986,scaleY:0.9986,rotation:9.4957,x:-17,y:186.4,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.2,rotation:4.8352,y:-78.95,x:-5.3}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-133.349,x:-47.55,y:50.95,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-141.8384,x:10.8,y:112.2,regX:5.7,regY:-8.6}},{t:this.instance_1,p:{rotation:-128.8049,x:16.55,y:118.65,regY:-1.4,scaleX:0.9986,scaleY:0.9986,regX:6.8}},{t:this.instance,p:{scaleX:0.9988,scaleY:0.9988,rotation:-97.6431,x:-57.1,y:-22.75,regX:35.6,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,scaleX:0.9987,scaleY:0.9987,rotation:-2.9428,x:-24.5,y:90.2,regY:-46.1}},{t:this.instance_14,p:{rotation:108.3813,x:47.6,y:-26.25,regX:-31.7,scaleX:0.9988,scaleY:0.9988,regY:-1.1}},{t:this.instance_13,p:{rotation:64.392,x:25.15,y:44.85,scaleX:0.9989,scaleY:0.9989,regX:-40,regY:-0.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:68.5414,x:60.55,y:116.15,regX:-6.6,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:75.9342,x:61.15,y:127.45,regY:2.9,regX:-5.1}},{t:this.instance_10,p:{regY:1.6,scaleX:0.9982,scaleY:0.9982,rotation:-9.2593,x:19.9,y:90.95,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:2.795,x:30.55,y:185.6,regY:-54.3,regX:2.8}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.3,rotation:-1.5093,x:-4.55,y:-58}},{t:this.instance_6,p:{regY:-54.7,scaleX:0.9986,scaleY:0.9986,rotation:12.0278,x:-22.65,y:186.6,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.2,rotation:5.1777,y:-78.9,x:-5.25}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-137.5224,x:-43.35,y:50.25,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-146.0118,x:19.25,y:107.1,regX:5.7,regY:-8.6}},{t:this.instance_1,p:{rotation:-132.9803,x:25.5,y:113.15,regY:-1.4,scaleX:0.9986,scaleY:0.9986,regX:6.8}},{t:this.instance,p:{scaleX:0.9988,scaleY:0.9988,rotation:-100.8967,x:-57.05,y:-22.7,regX:35.6,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,scaleX:0.9987,scaleY:0.9987,rotation:0.3589,x:-24.7,y:90,regY:-46.2}},{t:this.instance_14,p:{rotation:109.7612,x:47.6,y:-26.25,regX:-31.7,scaleX:0.9988,scaleY:0.9988,regY:-1.1}},{t:this.instance_13,p:{rotation:66.2415,x:23.4,y:44.3,scaleX:0.9989,scaleY:0.9989,regX:-40,regY:-0.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:70.3906,x:56.45,y:116.7,regX:-6.6,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:77.7832,x:56.7,y:127.85,regY:2.9,regX:-5.2}},{t:this.instance_10,p:{regY:1.6,scaleX:0.9982,scaleY:0.9982,rotation:-12.1609,x:19.75,y:90.95,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:0.2768,x:35.15,y:185,regY:-54.3,regX:2.8}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.3,rotation:-1.491,x:-4.6,y:-58}},{t:this.instance_6,p:{regY:-54.7,scaleX:0.9987,scaleY:0.9987,rotation:14.5582,x:-28.4,y:186.5,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.2,rotation:5.5213,y:-78.9,x:-5.25}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-141.6962,x:-39.3,y:49.4,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9989,scaleY:0.9989,rotation:-150.1851,x:27.4,y:101.45,regX:5.7,regY:-8.6}},{t:this.instance_1,p:{rotation:-137.1517,x:33.9,y:107.05,regY:-1.4,scaleX:0.9986,scaleY:0.9986,regX:6.8}},{t:this.instance,p:{scaleX:0.9988,scaleY:0.9988,rotation:-104.1502,x:-57.05,y:-22.8,regX:35.7,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,scaleX:0.9986,scaleY:0.9986,rotation:3.6637,x:-24.85,y:90,regY:-46.1}},{t:this.instance_14,p:{rotation:111.1413,x:47.5,y:-26.25,regX:-31.7,scaleX:0.9988,scaleY:0.9988,regY:-1.1}},{t:this.instance_13,p:{rotation:68.0899,x:21.55,y:43.65,scaleX:0.9989,scaleY:0.9989,regX:-40.1,regY:0}},{t:this.instance_12,p:{scaleX:0.9989,scaleY:0.9989,rotation:72.2399,x:52.4,y:117.15,regX:-6.6,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9989,scaleY:0.9989,rotation:79.631,x:52.35,y:128.45,regY:2.9,regX:-5.1}},{t:this.instance_10,p:{regY:1.6,scaleX:0.9982,scaleY:0.9982,rotation:-15.0629,x:19.55,y:91.1,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:-2.2392,x:39.7,y:184.2,regY:-54.3,regX:2.8}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.3,rotation:-1.4734,x:-4.5,y:-58}},{t:this.instance_6,p:{regY:-54.7,scaleX:0.9986,scaleY:0.9986,rotation:17.091,x:-34.2,y:186,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.2,rotation:5.8659,y:-78.85,x:-5.3}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-145.8708,x:-35.35,y:48.25,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-154.3588,x:35,y:95.4,regX:5.7,regY:-8.6}},{t:this.instance_1,p:{rotation:-141.3265,x:42.1,y:100.45,regY:-1.4,scaleX:0.9986,scaleY:0.9986,regX:6.7}},{t:this.instance,p:{scaleX:0.9988,scaleY:0.9988,rotation:-107.4049,x:-57.1,y:-22.8,regX:35.6,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,scaleX:0.9986,scaleY:0.9986,rotation:6.971,x:-24.9,y:89.9,regY:-46.1}},{t:this.instance_14,p:{rotation:112.5205,x:47.55,y:-26.3,regX:-31.7,scaleX:0.9989,scaleY:0.9988,regY:-1.1}},{t:this.instance_13,p:{rotation:69.9393,x:20,y:43,scaleX:0.9989,scaleY:0.9989,regX:-40.1,regY:-0.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:74.0894,x:48.35,y:117.4,regX:-6.6,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9989,scaleY:0.9989,rotation:81.4801,x:47.9,y:128.6,regY:2.9,regX:-5.2}},{t:this.instance_10,p:{regY:1.6,scaleX:0.9982,scaleY:0.9982,rotation:-17.9638,x:19.45,y:91.1,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:-4.7586,x:44.25,y:183.1,regY:-54.3,regX:2.8}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.3,rotation:-1.4551,x:-4.55,y:-58}},{t:this.instance_6,p:{regY:-54.7,scaleX:0.9986,scaleY:0.9986,rotation:19.6205,x:-39.85,y:185.2,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.2,rotation:6.2099,y:-78.9,x:-5.25}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-150.0437,x:-31.25,y:46.9,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9989,scaleY:0.9989,rotation:-158.5315,x:42.2,y:88.75,regX:5.7,regY:-8.6}},{t:this.instance_1,p:{rotation:-145.5001,x:49.7,y:93.3,regY:-1.4,scaleX:0.9986,scaleY:0.9986,regX:6.7}},{t:this.instance,p:{scaleX:0.9988,scaleY:0.9988,rotation:-110.6585,x:-57.05,y:-22.65,regX:35.6,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,scaleX:0.9986,scaleY:0.9986,rotation:10.2761,x:-25.25,y:89.8,regY:-46.1}},{t:this.instance_14,p:{rotation:113.8996,x:47.55,y:-26.25,regX:-31.7,scaleX:0.9988,scaleY:0.9988,regY:-1.1}},{t:this.instance_13,p:{rotation:71.7893,x:18.4,y:42.2,scaleX:0.9988,scaleY:0.9988,regX:-40.1,regY:-0.1}},{t:this.instance_12,p:{scaleX:0.9989,scaleY:0.9989,rotation:75.9383,x:44.25,y:117.6,regX:-6.6,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9989,scaleY:0.9989,rotation:83.3302,x:43.45,y:129.05,regY:2.9,regX:-5}},{t:this.instance_10,p:{regY:1.6,scaleX:0.9982,scaleY:0.9982,rotation:-20.8641,x:19.25,y:91.25,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.2784,x:48.7,y:181.85,regY:-54.3,regX:2.8}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.3,rotation:-1.4367,x:-4.6,y:-58}},{t:this.instance_6,p:{regY:-54.7,scaleX:0.9986,scaleY:0.9986,rotation:22.1514,x:-45.45,y:184.05,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.2,rotation:6.5524,y:-78.9,x:-5.4}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-154.2175,x:-27.45,y:45.35,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9989,scaleY:0.9989,rotation:-162.706,x:49,y:81.7,regX:5.7,regY:-8.6}},{t:this.instance_1,p:{rotation:-149.6733,x:56.7,y:85.6,regY:-1.4,scaleX:0.9986,scaleY:0.9986,regX:6.8}},{t:this.instance,p:{scaleX:0.9988,scaleY:0.9988,rotation:-113.912,x:-57.05,y:-22.65,regX:35.6,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,scaleX:0.9986,scaleY:0.9986,rotation:7.1845,x:-25.05,y:89.95,regY:-46.1}},{t:this.instance_14,p:{rotation:112.6099,x:47.4,y:-26.25,regX:-31.7,scaleX:0.9988,scaleY:0.9988,regY:-1}},{t:this.instance_13,p:{rotation:70.0575,x:19.95,y:42.85,scaleX:0.9989,scaleY:0.9989,regX:-40.1,regY:-0.1}},{t:this.instance_12,p:{scaleX:0.9989,scaleY:0.9989,rotation:74.1988,x:48.05,y:117.3,regX:-6.7,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:81.5942,x:47.6,y:128.6,regY:2.9,regX:-5.2}},{t:this.instance_10,p:{regY:1.6,scaleX:0.9982,scaleY:0.9982,rotation:-18.1757,x:19.4,y:91.1,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:-4.9597,x:44.6,y:183,regY:-54.3,regX:2.8}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.3,rotation:-1.456,x:-4.55,y:-58}},{t:this.instance_6,p:{regY:-54.7,scaleX:0.9986,scaleY:0.9986,rotation:19.796,x:-40.25,y:185.15,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.2,rotation:6.2302,y:-78.9,x:-5.25}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-150.315,x:-31.15,y:46.85,regX:44.5}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-158.8102,x:42.7,y:88.3,regX:5.7,regY:-8.6}},{t:this.instance_1,p:{rotation:-145.769,x:50.05,y:92.85,regY:-1.4,scaleX:0.9986,scaleY:0.9986,regX:6.7}},{t:this.instance,p:{scaleX:0.9988,scaleY:0.9988,rotation:-110.8646,x:-57.15,y:-22.7,regX:35.6,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,scaleX:0.9986,scaleY:0.9986,rotation:4.0919,x:-24.8,y:90,regY:-46.1}},{t:this.instance_14,p:{rotation:111.3179,x:47.5,y:-26.25,regX:-31.7,scaleX:0.9988,scaleY:0.9988,regY:-1.1}},{t:this.instance_13,p:{rotation:68.3291,x:21.45,y:43.5,scaleX:0.9989,scaleY:0.9989,regX:-40.1,regY:-0.1}},{t:this.instance_12,p:{scaleX:0.9989,scaleY:0.9989,rotation:72.4591,x:51.8,y:117.15,regX:-6.6,regY:7.9}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:79.8586,x:51.8,y:128.45,regY:2.9,regX:-5.1}},{t:this.instance_10,p:{regY:1.6,scaleX:0.9982,scaleY:0.9982,rotation:-15.4843,x:19.55,y:91.1,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:-2.6389,x:40.4,y:184,regY:-54.3,regX:2.8}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.3,rotation:-1.4743,x:-4.5,y:-58}},{t:this.instance_6,p:{regY:-54.7,scaleX:0.9986,scaleY:0.9986,rotation:17.4405,x:-35.05,y:185.9,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.3,rotation:5.9082,y:-78.75,x:-5.3}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-146.4131,x:-34.85,y:48.1,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9989,scaleY:0.9989,rotation:-154.9151,x:36,y:94.6,regX:5.7,regY:-8.6}},{t:this.instance_1,p:{rotation:-141.8643,x:43.05,y:99.5,regY:-1.4,scaleX:0.9986,scaleY:0.9986,regX:6.8}},{t:this.instance,p:{scaleX:0.9988,scaleY:0.9988,rotation:-107.8146,x:-57.15,y:-22.7,regX:35.6,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,scaleX:0.9986,scaleY:0.9986,rotation:1.0007,x:-24.75,y:90.1,regY:-46.1}},{t:this.instance_14,p:{rotation:110.0275,x:47.55,y:-26.2,regX:-31.7,scaleX:0.9988,scaleY:0.9988,regY:-1.1}},{t:this.instance_13,p:{rotation:66.5974,x:23.15,y:44.25,scaleX:0.9988,scaleY:0.9988,regX:-40,regY:-0.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:70.7197,x:55.65,y:116.75,regX:-6.6,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9989,scaleY:0.9989,rotation:78.1224,x:55.85,y:128.1,regY:2.9,regX:-5.1}},{t:this.instance_10,p:{regY:1.6,scaleX:0.9982,scaleY:0.9982,rotation:-12.7952,x:19.7,y:91,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:-0.3214,x:36.1,y:184.85,regY:-54.3,regX:2.8}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.3,rotation:-1.4936,x:-4.55,y:-58}},{t:this.instance_6,p:{regY:-54.7,scaleX:0.9986,scaleY:0.9986,rotation:15.0854,x:-29.55,y:186.4,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.2,rotation:5.5864,y:-78.9,x:-5.25}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-142.5107,x:-38.55,y:49.2,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9989,scaleY:0.9989,rotation:-151.0206,x:28.85,y:100.3,regX:5.7,regY:-8.6}},{t:this.instance_1,p:{rotation:-137.9591,x:35.65,y:105.85,regY:-1.4,scaleX:0.9986,scaleY:0.9986,regX:6.7}},{t:this.instance,p:{scaleX:0.9988,scaleY:0.9988,rotation:-104.7649,x:-57.05,y:-22.75,regX:35.6,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,scaleX:0.9987,scaleY:0.9987,rotation:-2.0858,x:-24.6,y:90.15,regY:-46.1}},{t:this.instance_14,p:{rotation:108.7358,x:47.55,y:-26.25,regX:-31.7,scaleX:0.9988,scaleY:0.9988,regY:-1.1}},{t:this.instance_13,p:{rotation:64.8674,x:24.75,y:44.75,scaleX:0.9988,scaleY:0.9988,regX:-40,regY:-0.1}},{t:this.instance_12,p:{scaleX:0.9989,scaleY:0.9989,rotation:68.9804,x:59.5,y:116.3,regX:-6.6,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:76.3868,x:60.1,y:127.65,regY:2.9,regX:-5.1}},{t:this.instance_10,p:{regY:1.6,scaleX:0.9982,scaleY:0.9982,rotation:-10.1051,x:19.85,y:90.9,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:1.9946,x:31.9,y:185.5,regY:-54.3,regX:2.8}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.3,rotation:-1.512,x:-4.55,y:-58}},{t:this.instance_6,p:{regY:-54.8,scaleX:0.9987,scaleY:0.9987,rotation:12.7295,x:-24.15,y:186.5,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.2,rotation:5.2621,y:-78.9,x:-5.3}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-138.6084,x:-42.3,y:50.1,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9989,scaleY:0.9989,rotation:-147.1249,x:21.35,y:105.75,regX:5.7,regY:-8.6}},{t:this.instance_1,p:{rotation:-134.0534,x:27.75,y:111.5,regY:-1.4,scaleX:0.9986,scaleY:0.9986,regX:6.8}},{t:this.instance,p:{scaleX:0.9988,scaleY:0.9988,rotation:-101.7169,x:-57.05,y:-22.65,regX:35.6,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,scaleX:0.9986,scaleY:0.9986,rotation:-5.1775,x:-24.4,y:90.3,regY:-46.1}},{t:this.instance_14,p:{rotation:107.4457,x:47.6,y:-26.15,regX:-31.7,scaleX:0.9988,scaleY:0.9988,regY:-1.1}},{t:this.instance_13,p:{rotation:63.1378,x:26.3,y:45.1,scaleX:0.9988,scaleY:0.9988,regX:-40.1,regY:-0.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:67.2406,x:63.15,y:115.6,regX:-6.7,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9989,scaleY:0.9989,rotation:74.6519,x:64.15,y:127.05,regY:2.9,regX:-5.1}},{t:this.instance_10,p:{regY:1.6,scaleX:0.9982,scaleY:0.9982,rotation:-7.4154,x:20,y:90.85,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:4.3122,x:27.6,y:185.85,regY:-54.3,regX:2.9}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.3,rotation:-1.5304,x:-4.6,y:-58}},{t:this.instance_6,p:{regY:-54.7,scaleX:0.9987,scaleY:0.9987,rotation:10.3728,x:-18.8,y:186.5,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.2,rotation:4.9405,y:-78.9,x:-5.3}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-134.706,x:-46.25,y:50.8,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9989,scaleY:0.9989,rotation:-143.2294,x:13.55,y:110.65,regX:5.7,regY:-8.6}},{t:this.instance_1,p:{rotation:-130.1478,x:19.45,y:116.9,regY:-1.4,scaleX:0.9986,scaleY:0.9986,regX:6.8}},{t:this.instance,p:{scaleX:0.9988,scaleY:0.9988,rotation:-98.6671,x:-57.1,y:-22.75,regX:35.6,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,scaleX:0.9986,scaleY:0.9986,rotation:-8.2704,x:-24.25,y:90.35,regY:-46.1}},{t:this.instance_14,p:{rotation:106.1541,x:47.55,y:-26.15,regX:-31.7,scaleX:0.9988,scaleY:0.9988,regY:-1.1}},{t:this.instance_13,p:{rotation:61.4065,x:27.9,y:45.65,scaleX:0.9988,scaleY:0.9988,regX:-40.1,regY:-0.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:65.5018,x:66.85,y:115.05,regX:-6.6,regY:7.9}},{t:this.instance_11,p:{scaleX:0.9989,scaleY:0.9989,rotation:72.9164,x:68.3,y:126.45,regY:2.9,regX:-5}},{t:this.instance_10,p:{regY:1.6,scaleX:0.9982,scaleY:0.9982,rotation:-4.7252,x:20.2,y:90.8,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:6.6325,x:23.3,y:185.9,regY:-54.4,regX:2.8}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.3,rotation:-1.5496,x:-4.55,y:-58}},{t:this.instance_6,p:{regY:-54.8,scaleX:0.9986,scaleY:0.9986,rotation:8.0183,x:-13.6,y:186.05,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.3,rotation:4.6183,y:-78.8,x:-5.35}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-130.8022,x:-50.15,y:51.25,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-139.3346,x:5.45,y:115.1,regX:5.7,regY:-8.6}},{t:this.instance_1,p:{rotation:-126.2431,x:10.85,y:121.75,regY:-1.4,scaleX:0.9986,scaleY:0.9986,regX:6.8}},{t:this.instance,p:{scaleX:0.9988,scaleY:0.9988,rotation:-95.619,x:-57.15,y:-22.7,regX:35.6,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,scaleX:0.9986,scaleY:0.9986,rotation:-11.3618,x:-24.05,y:90.4,regY:-46.1}},{t:this.instance_14,p:{rotation:104.8631,x:47.4,y:-26.2,regX:-31.7,scaleX:0.9988,scaleY:0.9988,regY:-1}},{t:this.instance_13,p:{rotation:59.6772,x:29.6,y:46.05,scaleX:0.9989,scaleY:0.9989,regX:-40.1,regY:-0.1}},{t:this.instance_12,p:{scaleX:0.9989,scaleY:0.9989,rotation:63.7626,x:70.7,y:114.25,regX:-6.6,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:71.1809,x:72.25,y:125.5,regY:2.9,regX:-5.1}},{t:this.instance_10,p:{regY:1.6,scaleX:0.9982,scaleY:0.9982,rotation:-2.0358,x:20.3,y:90.7,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:8.9506,x:18.9,y:186,regY:-54.3,regX:2.8}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.3,rotation:-1.568,x:-4.65,y:-58}},{t:this.instance_6,p:{regY:-54.7,scaleX:0.9987,scaleY:0.9987,rotation:5.662,x:-8.1,y:185.55,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.2,rotation:4.2954,y:-78.95,x:-5.35}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-126.9002,x:-54.1,y:51.55,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-135.4394,x:-3.05,y:119,regX:5.7,regY:-8.6}},{t:this.instance_1,p:{rotation:-122.3387,x:1.95,y:125.95,regY:-1.4,scaleX:0.9986,scaleY:0.9986,regX:6.8}},{t:this.instance,p:{scaleX:0.9988,scaleY:0.9988,rotation:-92.5699,x:-57.15,y:-22.7,regX:35.6,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,scaleX:0.9986,scaleY:0.9986,rotation:-14.4526,x:-23.9,y:90.4,regY:-46.2}},{t:this.instance_14,p:{rotation:103.5726,x:47.5,y:-26.15,regX:-31.7,scaleX:0.9989,scaleY:0.9989,regY:-1}},{t:this.instance_13,p:{rotation:57.9468,x:31.2,y:46.45,scaleX:0.9988,scaleY:0.9988,regX:-40.1,regY:-0.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:62.0233,x:74.25,y:113.45,regX:-6.6,regY:7.9}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:69.4452,x:76.3,y:124.6,regY:2.9,regX:-5.1}},{t:this.instance_10,p:{regY:1.6,scaleX:0.9982,scaleY:0.9982,rotation:0.649,x:20.5,y:90.65,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.2699,x:14.6,y:185.75,regY:-54.3,regX:2.8}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.3,rotation:-1.5873,x:-4.6,y:-58}},{t:this.instance_6,p:{regY:-54.7,scaleX:0.9987,scaleY:0.9987,rotation:3.3067,x:-2.9,y:184.65,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.3,rotation:3.9735,y:-78.8,x:-5.35}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-122.9984,x:-58.05,y:51.6,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-131.5431,x:-11.7,y:122.45,regX:5.7,regY:-8.7}},{t:this.instance_1,p:{rotation:-118.4337,x:-7.1,y:129.7,regY:-1.4,scaleX:0.9987,scaleY:0.9987,regX:6.8}},{t:this.instance,p:{scaleX:0.9988,scaleY:0.9988,rotation:-89.5247,x:-57.15,y:-22.65,regX:35.6,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,scaleX:0.9986,scaleY:0.9986,rotation:-17.5451,x:-23.75,y:90.6,regY:-46.1}},{t:this.instance_14,p:{rotation:102.2814,x:47.5,y:-26.2,regX:-31.7,scaleX:0.9988,scaleY:0.9988,regY:-1}},{t:this.instance_13,p:{rotation:56.217,x:32.85,y:46.8,scaleX:0.9988,scaleY:0.9988,regX:-40.1,regY:-0.1}},{t:this.instance_12,p:{scaleX:0.9989,scaleY:0.9989,rotation:60.2839,x:78.05,y:112.4,regX:-6.6,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:67.7095,x:80.3,y:123.55,regY:2.9,regX:-5.1}},{t:this.instance_10,p:{regY:1.6,scaleX:0.9982,scaleY:0.9982,rotation:3.3405,x:20.65,y:90.55,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:13.5883,x:10.4,y:185.3,regY:-54.3,regX:2.8}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.3,rotation:-1.6056,x:-4.65,y:-58}},{t:this.instance_6,p:{regY:-54.7,scaleX:0.9987,scaleY:0.9987,rotation:0.9516,x:2.3,y:183.5,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.2,rotation:3.6517,y:-78.95,x:-5.35}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-119.0958,x:-62,y:51.45,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-127.6482,x:-20.45,y:125.3,regX:5.7,regY:-8.6}},{t:this.instance_1,p:{rotation:-114.5276,x:-16.35,y:132.85,regY:-1.4,scaleX:0.9986,scaleY:0.9986,regX:6.8}},{t:this.instance,p:{scaleX:0.9988,scaleY:0.9988,rotation:-86.4764,x:-57.2,y:-22.7,regX:35.6,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,scaleX:0.9986,scaleY:0.9986,rotation:-20.6367,x:-23.55,y:90.65,regY:-46.1}},{t:this.instance_14,p:{rotation:100.9908,x:47.65,y:-26.2,regX:-31.7,scaleX:0.9989,scaleY:0.9989,regY:-1.1}},{t:this.instance_13,p:{rotation:54.4865,x:34.5,y:47.2,scaleX:0.9989,scaleY:0.9989,regX:-40.1,regY:-0.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:58.5451,x:81.6,y:111.35,regX:-6.6,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:65.9747,x:84.3,y:122.4,regY:2.9,regX:-5.1}},{t:this.instance_10,p:{regY:1.6,scaleX:0.9982,scaleY:0.9982,rotation:6.0307,x:20.8,y:90.5,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:15.9069,x:6.15,y:184.55,regY:-54.4,regX:2.8}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.3,rotation:-1.6231,x:-4.65,y:-58}},{t:this.instance_6,p:{regY:-54.6,scaleX:0.9987,scaleY:0.9987,rotation:-1.3991,x:7.35,y:182.1,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.2,rotation:3.3291,y:-78.95,x:-5.35}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-115.1937,x:-65.9,y:51.05,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-123.7534,x:-29.5,y:127.55,regX:5.7,regY:-8.6}},{t:this.instance_1,p:{rotation:-110.6245,x:-26.05,y:135.45,regY:-1.4,scaleX:0.9986,scaleY:0.9986,regX:6.8}},{t:this.instance,p:{scaleX:0.9988,scaleY:0.9988,rotation:-83.427,x:-57.25,y:-22.7,regX:35.6,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,scaleX:0.9986,scaleY:0.9986,rotation:-23.7285,x:-23.35,y:90.75,regY:-46.1}},{t:this.instance_14,p:{rotation:99.6989,x:47.55,y:-26,regX:-31.6,scaleX:0.9988,scaleY:0.9988,regY:-1.1}},{t:this.instance_13,p:{rotation:52.7564,x:36.15,y:47.45,scaleX:0.9989,scaleY:0.9989,regX:-40.1,regY:-0.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:56.8044,x:85.2,y:110.15,regX:-6.6,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:64.2382,x:88.15,y:121.1,regY:2.9,regX:-5.1}},{t:this.instance_10,p:{regY:1.6,scaleX:0.9982,scaleY:0.9982,rotation:8.7201,x:20.9,y:90.35,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:18.2261,x:1.9,y:183.6,regY:-54.4,regX:2.8}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.3,rotation:-1.6424,x:-4.65,y:-58}},{t:this.instance_6,p:{regY:-54.7,scaleX:0.9987,scaleY:0.9987,rotation:-3.7549,x:12.4,y:180.35,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.2,rotation:3.0058,y:-78.95,x:-5.35}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-111.291,x:-69.8,y:50.55,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-119.8577,x:-38.75,y:129.4,regX:5.7,regY:-8.6}},{t:this.instance_1,p:{rotation:-106.7174,x:-35.8,y:137.45,regY:-1.4,scaleX:0.9987,scaleY:0.9987,regX:6.8}},{t:this.instance,p:{scaleX:0.9988,scaleY:0.9988,rotation:-80.3781,x:-57.15,y:-22.65,regX:35.6,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,scaleX:0.9986,scaleY:0.9986,rotation:-26.8203,x:-23.2,y:90.75,regY:-46.2}},{t:this.instance_14,p:{rotation:98.4084,x:47.6,y:-26.1,regX:-31.7,scaleX:0.9988,scaleY:0.9988,regY:-1.1}},{t:this.instance_13,p:{rotation:51.0263,x:37.75,y:47.65,scaleX:0.9988,scaleY:0.9988,regX:-40.1,regY:-0.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:55.0652,x:88.55,y:108.8,regX:-6.7,regY:7.9}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:62.5025,x:92,y:119.8,regY:2.9,regX:-5.1}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9982,scaleY:0.9982,rotation:11.4102,x:21.05,y:90.2,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:20.5436,x:-2.4,y:182.8,regY:-54.2,regX:2.8}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.3,rotation:-1.6608,x:-4.7,y:-58}},{t:this.instance_6,p:{regY:-54.6,scaleX:0.9986,scaleY:0.9986,rotation:-6.1109,x:17.4,y:178.45,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.2,rotation:2.6843,y:-78.95,x:-5.35}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-107.3886,x:-73.7,y:49.8,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-115.9622,x:-48,y:130.6,regX:5.6,regY:-8.6}},{t:this.instance_1,p:{rotation:-102.8136,x:-45.65,y:138.8,regY:-1.4,scaleX:0.9987,scaleY:0.9987,regX:6.8}},{t:this.instance,p:{scaleX:0.9988,scaleY:0.9988,rotation:-77.3292,x:-57.2,y:-22.75,regX:35.7,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,scaleX:0.9986,scaleY:0.9986,rotation:-29.9125,x:-23,y:90.9,regY:-46.1}},{t:this.instance_14,p:{rotation:97.1186,x:47.65,y:-26,regX:-31.6,scaleX:0.9988,scaleY:0.9988,regY:-1.1}},{t:this.instance_13,p:{rotation:49.2962,x:39.5,y:47.9,scaleX:0.9988,scaleY:0.9988,regX:-40.1,regY:-0.1}},{t:this.instance_12,p:{scaleX:0.9989,scaleY:0.9989,rotation:53.3258,x:92.2,y:107.55,regX:-6.6,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:60.7675,x:95.8,y:118.3,regY:2.9,regX:-5.1}},{t:this.instance_10,p:{regY:1.6,scaleX:0.9982,scaleY:0.9982,rotation:14.1,x:21.2,y:90.25,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:22.8646,x:-6.55,y:181.4,regY:-54.3,regX:2.8}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.3,rotation:-1.68,x:-4.65,y:-58}},{t:this.instance_6,p:{regY:-54.7,scaleX:0.9986,scaleY:0.9986,rotation:-8.4659,x:22.1,y:176.1,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.2,rotation:2.362,y:-79,x:-5.35}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-103.4866,x:-77.55,y:48.8,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9989,scaleY:0.9989,rotation:-112.0668,x:-57.5,y:131.15,regX:5.7,regY:-8.6}},{t:this.instance_1,p:{rotation:-98.9076,x:-55.65,y:139.5,regY:-1.4,scaleX:0.9986,scaleY:0.9986,regX:6.8}},{t:this.instance,p:{scaleX:0.9988,scaleY:0.9988,rotation:-74.2798,x:-57.2,y:-22.7,regX:35.7,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,scaleX:0.9986,scaleY:0.9986,rotation:-33.0043,x:-23,y:91,regY:-46.1}},{t:this.instance_14,p:{rotation:95.8263,x:47.65,y:-26.1,regX:-31.7,scaleX:0.9989,scaleY:0.9989,regY:-1.1}},{t:this.instance_13,p:{rotation:47.565,x:41.1,y:48.1,scaleX:0.9989,scaleY:0.9989,regX:-40.1,regY:-0.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:51.5868,x:95.65,y:106.1,regX:-6.6,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:59.0316,x:99.6,y:116.75,regY:2.9,regX:-5.1}},{t:this.instance_10,p:{regY:1.6,scaleX:0.9982,scaleY:0.9982,rotation:16.7901,x:21.4,y:90.2,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:25.1835,x:-10.6,y:179.95,regY:-54.3,regX:2.8}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.3,rotation:-1.6975,x:-4.7,y:-58}},{t:this.instance_6,p:{regY:-54.6,scaleX:0.9986,scaleY:0.9986,rotation:-10.8218,x:26.9,y:173.7,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.2,rotation:2.0398,y:-78.95,x:-5.4}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-99.5836,x:-81.35,y:47.5,regX:44.5}},{t:this.instance_2,p:{scaleX:0.9989,scaleY:0.9989,rotation:-108.1717,x:-66.85,y:131.3,regX:5.6,regY:-8.6}},{t:this.instance_1,p:{rotation:-95.0033,x:-65.65,y:139.7,regY:-1.4,scaleX:0.9987,scaleY:0.9987,regX:6.7}},{t:this.instance,p:{scaleX:0.9988,scaleY:0.9988,rotation:-71.2315,x:-57.25,y:-22.65,regX:35.6,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,scaleX:0.9986,scaleY:0.9986,rotation:-36.0956,x:-22.7,y:91.1,regY:-46.1}},{t:this.instance_14,p:{rotation:94.5369,x:47.6,y:-25.95,regX:-31.6,scaleX:0.9988,scaleY:0.9988,regY:-1.1}},{t:this.instance_13,p:{rotation:45.8362,x:42.75,y:48.2,scaleX:0.9988,scaleY:0.9988,regX:-40.1,regY:-0.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:49.8481,x:99.05,y:104.5,regX:-6.6,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:57.2956,x:103.3,y:115.05,regY:2.9,regX:-5.1}},{t:this.instance_10,p:{regY:1.6,scaleX:0.9982,scaleY:0.9982,rotation:19.4794,x:21.6,y:90.1,regX:-0.4}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:27.5024,x:-14.5,y:178.2,regY:-54.4,regX:2.9}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.3,rotation:-1.7159,x:-4.7,y:-58}},{t:this.instance_6,p:{regY:-54.7,scaleX:0.9986,scaleY:0.9986,rotation:-13.1776,x:31.4,y:171,regX:3.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.2,rotation:1.7168,y:-78.95,x:-5.45}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-95.6821,x:-85.05,y:46.2,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9989,scaleY:0.9989,rotation:-104.2768,x:-76.25,y:130.6,regX:5.7,regY:-8.6}},{t:this.instance_1,p:{rotation:-91.0996,x:-75.6,y:139.1,regY:-1.4,scaleX:0.9987,scaleY:0.9987,regX:6.8}},{t:this.instance,p:{scaleX:0.9988,scaleY:0.9988,rotation:-68.1828,x:-57.2,y:-22.7,regX:35.6,regY:0.6}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-109.7,-218,237.60000000000002,520.8);


(lib.Tween1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(-174.9,92.6,0.2582,0.2582);

	this.instance_1 = new lib.CharacterGood_01();
	this.instance_1.setTransform(-35.1,113.7,0.2582,0.2582,0,0,0,12.4,42);

	this.instance_2 = new lib.CharacterGood_04();
	this.instance_2.setTransform(-90.85,113.65,0.2582,0.2582,0,0,0,38,49.4);

	this.instance_3 = new lib.CharacterGood_04();
	this.instance_3.setTransform(-50,83.35,0.2582,0.2582,0,0,0,38,49.4);

	this.instance_4 = new lib.CharacterGood_02();
	this.instance_4.setTransform(-149.4,87.5,0.2582,0.2582,0,0,0,-39.9,46.3);

	this.instance_5 = new lib.CharacterGood_02();
	this.instance_5.setTransform(-36.8,55.25,0.2582,0.2582,0,0,0,-39.9,46.3);

	this.instance_6 = new lib.CharacterGood_02();
	this.instance_6.setTransform(-103.05,65.1,0.2582,0.2582,0,0,0,-39.9,46.3);

	this.instance_7 = new lib.CharacterGood_04();
	this.instance_7.setTransform(-197.05,57.25,0.2582,0.2582,0,0,0,38,49.4);

	this.instance_8 = new lib.CharacterGood_03();
	this.instance_8.setTransform(-160.4,38.4,0.2582,0.2582);

	this.instance_9 = new lib.CharacterGood_02();
	this.instance_9.setTransform(-135.1,28.45,0.2582,0.2582,0,0,0,-39.9,46.3);

	this.instance_10 = new lib.CharacterGood_03();
	this.instance_10.setTransform(-62.05,22.4,0.2582,0.2582);

	this.instance_11 = new lib.CharacterGood_02();
	this.instance_11.setTransform(-198.65,15.85,0.2582,0.2582,0,0,0,-39.9,46.3);

	this.instance_12 = new lib.CharacterGood_02();
	this.instance_12.setTransform(-51.1,3.2,0.2582,0.2582,0,0,0,-39.9,46.3);

	this.instance_13 = new lib.CharacterGood_02();
	this.instance_13.setTransform(-2.2,86.9,0.2582,0.2582,0,0,0,-39.9,46.3);

	this.instance_14 = new lib.CharacterGood_03();
	this.instance_14.setTransform(146.5,89.55,0.2582,0.2582);

	this.instance_15 = new lib.CharacterGood_04();
	this.instance_15.setTransform(76.2,96.7,0.2582,0.2582,0,0,0,38,49.4);

	this.instance_16 = new lib.CharacterGood_03();
	this.instance_16.setTransform(39.15,54,0.2582,0.2582);

	this.instance_17 = new lib.CharacterGood_01();
	this.instance_17.setTransform(178.95,75.1,0.2582,0.2582,0,0,0,12.4,42);

	this.instance_18 = new lib.CharacterGood_04();
	this.instance_18.setTransform(123.2,75.05,0.2582,0.2582,0,0,0,38,49.4);

	this.instance_19 = new lib.CharacterGood_04();
	this.instance_19.setTransform(164.05,44.75,0.2582,0.2582,0,0,0,38,49.4);

	this.instance_20 = new lib.CharacterGood_02();
	this.instance_20.setTransform(64.65,48.9,0.2582,0.2582,0,0,0,-39.9,46.3);

	this.instance_21 = new lib.CharacterGood_02();
	this.instance_21.setTransform(177.25,16.65,0.2582,0.2582,0,0,0,-39.9,46.3);

	this.instance_22 = new lib.CharacterGood_02();
	this.instance_22.setTransform(111,26.5,0.2582,0.2582,0,0,0,-39.9,46.3);

	this.instance_23 = new lib.CharacterGood_04();
	this.instance_23.setTransform(17,18.65,0.2582,0.2582,0,0,0,38,49.4);

	this.instance_24 = new lib.CharacterGood_03();
	this.instance_24.setTransform(53.65,-0.2,0.2582,0.2582);

	this.instance_25 = new lib.CharacterGood_01();
	this.instance_25.setTransform(-143.05,1.65,0.2582,0.2582,0,0,0,12.4,42);

	this.instance_26 = new lib.CharacterGood_02();
	this.instance_26.setTransform(-109.55,-0.4,0.2582,0.2582,0,0,0,-39.9,46.3);

	this.instance_27 = new lib.CharacterGood_03();
	this.instance_27.setTransform(-72.1,-41.2,0.2582,0.2582);

	this.instance_28 = new lib.CharacterGood_04();
	this.instance_28.setTransform(-105.8,-44.8,0.2582,0.2582,0,0,0,38,49.4);

	this.instance_29 = new lib.CharacterGood_04();
	this.instance_29.setTransform(-191.15,-33,0.2582,0.2582,0,0,0,38,49.4);

	this.instance_30 = new lib.CharacterGood_01();
	this.instance_30.setTransform(-86.6,-70.85,0.2582,0.2582,0,0,0,12.4,42);

	this.instance_31 = new lib.CharacterGood_04();
	this.instance_31.setTransform(-15.15,-39.75,0.2582,0.2582,0,0,0,38,49.4);

	this.instance_32 = new lib.CharacterGood_04();
	this.instance_32.setTransform(-37.2,-69.05,0.2582,0.2582,0,0,0,38,49.4);

	this.instance_33 = new lib.CharacterGood_02();
	this.instance_33.setTransform(-171.35,-40.15,0.2582,0.2582,0,0,0,-39.9,46.3);

	this.instance_34 = new lib.CharacterGood_03();
	this.instance_34.setTransform(-188.9,-84.35,0.2582,0.2582);

	this.instance_35 = new lib.CharacterGood_02();
	this.instance_35.setTransform(-149.4,-72,0.2582,0.2582,0,0,0,-39.9,46.3);

	this.instance_36 = new lib.CharacterGood_02();
	this.instance_36.setTransform(78.95,-10.15,0.2582,0.2582,0,0,0,-39.9,46.3);

	this.instance_37 = new lib.CharacterGood_03();
	this.instance_37.setTransform(152,-16.2,0.2582,0.2582);

	this.instance_38 = new lib.CharacterGood_02();
	this.instance_38.setTransform(15.4,-22.75,0.2582,0.2582,0,0,0,-39.9,46.3);

	this.instance_39 = new lib.CharacterGood_01();
	this.instance_39.setTransform(71,-36.95,0.2582,0.2582,0,0,0,12.4,42);

	this.instance_40 = new lib.CharacterGood_02();
	this.instance_40.setTransform(162.95,-35.4,0.2582,0.2582,0,0,0,-39.9,46.3);

	this.instance_41 = new lib.CharacterGood_02();
	this.instance_41.setTransform(104.5,-39,0.2582,0.2582,0,0,0,-39.9,46.3);

	this.instance_42 = new lib.CharacterGood_03();
	this.instance_42.setTransform(141.95,-79.8,0.2582,0.2582);

	this.instance_43 = new lib.CharacterGood_04();
	this.instance_43.setTransform(108.25,-83.4,0.2582,0.2582,0,0,0,38,49.4);

	this.instance_44 = new lib.CharacterGood_04();
	this.instance_44.setTransform(22.9,-71.6,0.2582,0.2582,0,0,0,38,49.4);

	this.instance_45 = new lib.CharacterGood_04();
	this.instance_45.setTransform(198.9,-78.35,0.2582,0.2582,0,0,0,38,49.4);

	this.instance_46 = new lib.CharacterGood_01();
	this.instance_46.setTransform(127.45,-109.45,0.2582,0.2582,0,0,0,12.4,42);

	this.instance_47 = new lib.CharacterGood_04();
	this.instance_47.setTransform(176.85,-107.65,0.2582,0.2582,0,0,0,38,49.4);

	this.instance_48 = new lib.CharacterGood_02();
	this.instance_48.setTransform(42.7,-78.75,0.2582,0.2582,0,0,0,-39.9,46.3);

	this.instance_49 = new lib.CharacterGood_03();
	this.instance_49.setTransform(25.15,-122.95,0.2582,0.2582);

	this.instance_50 = new lib.CharacterGood_02();
	this.instance_50.setTransform(64.65,-110.6,0.2582,0.2582,0,0,0,-39.9,46.3);

	this.instance_51 = new lib.CharacterGood_02();
	this.instance_51.setTransform(-171.35,-109.65,0.2582,0.2582,0,0,0,-39.9,46.3);

	this.instance_52 = new lib.CharacterGood_03();
	this.instance_52.setTransform(-19.75,-124.3,0.2582,0.2582);

	this.instance_53 = new lib.CharacterGood_04();
	this.instance_53.setTransform(-57.6,-113,0.2582,0.2582,0,0,0,38,49.4);

	this.instance_54 = new lib.CharacterGood_03();
	this.instance_54.setTransform(-113.1,-122.45,0.2582,0.2582);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_54},{t:this.instance_53},{t:this.instance_52},{t:this.instance_51},{t:this.instance_50},{t:this.instance_49},{t:this.instance_48},{t:this.instance_47},{t:this.instance_46},{t:this.instance_45},{t:this.instance_44},{t:this.instance_43},{t:this.instance_42},{t:this.instance_41},{t:this.instance_40},{t:this.instance_39},{t:this.instance_38},{t:this.instance_37},{t:this.instance_36},{t:this.instance_35},{t:this.instance_34},{t:this.instance_33},{t:this.instance_32},{t:this.instance_31},{t:this.instance_30},{t:this.instance_29},{t:this.instance_28},{t:this.instance_27},{t:this.instance_26},{t:this.instance_25},{t:this.instance_24},{t:this.instance_23},{t:this.instance_22},{t:this.instance_21},{t:this.instance_20},{t:this.instance_19},{t:this.instance_18},{t:this.instance_17},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-231.1,-178,462.2,355.4);


// stage content:
(lib.LessonChapter1_11 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,288];
	this.streamSoundSymbolsList[0] = [{id:"beforewar2edit_11wav",startFrame:0,endFrame:288,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("beforewar2edit_11wav",0);
		this.InsertIntoSoundStreamData(soundInstance,0,288,1);
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
			document.location.replace("/LessonChapter1_12.html");
			}, 500);
			
		}
		
		this.prevBtn.addEventListener("click", fl_ClickToGoToWebPage_2);
		
		function fl_ClickToGoToWebPage_2() {
			createjs.Sound.play("popsound");
			
			setTimeout(function(){
			document.location.replace("/LessonChapter1_10.html");
			}, 500);
			
		}
		
		this.replaybtn.addEventListener("click", fl_ClickToGoToAndPlayFromFrame.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame()
		{
			this.gotoAndPlay(1);
		}
	}
	this.frame_288 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(288).call(this.frame_288).wait(1));

	// Subtitle
	this.instance = new lib.CachedBmp_1862();
	this.instance.setTransform(195.55,582.4,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_1861();
	this.instance_1.setTransform(165.6,564.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(289));

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.homeBtn},{t:this.prevBtn},{t:this.nextBtn},{t:this.replaybtn}]}).wait(289));

	// Layer_2
	this.instance_2 = new lib.Tween1("synched",0);
	this.instance_2.setTransform(1073.35,338.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({x:1518.7},288).wait(1));

	// Background
	this.instance_3 = new lib.Chap1Scene2();

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("Ehj/A4QMAAAhwfMDH/AAAMAAABwfg");
	this.shape.setTransform(640,360);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance_3}]}).wait(289));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(515.3,267.8,1234.1000000000001,572.2);
// library properties:
lib.properties = {
	id: 'A6F1A483617F544186FFC32FE4892FD2',
	width: 1280,
	height: 720,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/LessonChapter1_11_atlas_1.png", id:"LessonChapter1_11_atlas_1"},
		{src:"sounds/beforewar2edit_11wav.mp3", id:"beforewar2edit_11wav"},
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