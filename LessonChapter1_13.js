(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"LessonChapter1_13_atlas_1", frames: [[0,1548,471,238],[0,1788,471,238],[473,1548,471,238],[946,1548,330,317],[1781,1350,228,432],[1278,1548,330,317],[0,1350,1779,196],[0,1082,1914,266],[0,0,1920,1080]]},
		{name:"LessonChapter1_13_atlas_2", frames: [[1410,603,133,102],[237,608,133,102],[1113,310,358,147],[0,434,334,147],[1113,459,295,147],[852,0,285,308],[1868,538,77,245],[0,583,77,244],[1713,267,309,269],[1139,0,285,308],[1947,538,77,245],[79,583,77,244],[533,290,298,267],[1426,0,285,308],[731,559,77,245],[158,583,77,244],[810,664,193,36],[480,670,193,36],[230,0,301,313],[1713,0,317,265],[1473,310,175,145],[1473,457,175,144],[336,315,175,145],[336,462,175,144],[0,0,228,432],[533,0,317,288],[1650,310,38,177],[1775,649,38,177],[1815,649,38,177],[1005,664,38,176],[372,608,106,91],[833,310,278,241],[1545,649,135,67],[1650,538,216,109],[1217,608,153,67],[833,553,216,109],[1051,608,164,67],[513,559,216,109],[1682,649,91,87],[230,315,91,88]]}
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



(lib.CachedBmp_890 = function() {
	this.initialize(ss["LessonChapter1_13_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_889 = function() {
	this.initialize(ss["LessonChapter1_13_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_888 = function() {
	this.initialize(ss["LessonChapter1_13_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_887 = function() {
	this.initialize(ss["LessonChapter1_13_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_886 = function() {
	this.initialize(ss["LessonChapter1_13_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_885 = function() {
	this.initialize(ss["LessonChapter1_13_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_884 = function() {
	this.initialize(ss["LessonChapter1_13_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_883 = function() {
	this.initialize(ss["LessonChapter1_13_atlas_2"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_882 = function() {
	this.initialize(ss["LessonChapter1_13_atlas_2"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_881 = function() {
	this.initialize(ss["LessonChapter1_13_atlas_2"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_880 = function() {
	this.initialize(ss["LessonChapter1_13_atlas_2"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_879 = function() {
	this.initialize(ss["LessonChapter1_13_atlas_2"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_878 = function() {
	this.initialize(ss["LessonChapter1_13_atlas_2"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_877 = function() {
	this.initialize(ss["LessonChapter1_13_atlas_2"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_876 = function() {
	this.initialize(ss["LessonChapter1_13_atlas_2"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_875 = function() {
	this.initialize(ss["LessonChapter1_13_atlas_2"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_874 = function() {
	this.initialize(ss["LessonChapter1_13_atlas_2"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_873 = function() {
	this.initialize(ss["LessonChapter1_13_atlas_2"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_872 = function() {
	this.initialize(ss["LessonChapter1_13_atlas_2"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_871 = function() {
	this.initialize(ss["LessonChapter1_13_atlas_2"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_870 = function() {
	this.initialize(ss["LessonChapter1_13_atlas_2"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_869 = function() {
	this.initialize(ss["LessonChapter1_13_atlas_2"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_868 = function() {
	this.initialize(ss["LessonChapter1_13_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_867 = function() {
	this.initialize(ss["LessonChapter1_13_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_866 = function() {
	this.initialize(ss["LessonChapter1_13_atlas_2"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_865 = function() {
	this.initialize(ss["LessonChapter1_13_atlas_2"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_864 = function() {
	this.initialize(ss["LessonChapter1_13_atlas_2"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_863 = function() {
	this.initialize(ss["LessonChapter1_13_atlas_2"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_862 = function() {
	this.initialize(ss["LessonChapter1_13_atlas_2"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_861 = function() {
	this.initialize(ss["LessonChapter1_13_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_860 = function() {
	this.initialize(ss["LessonChapter1_13_atlas_2"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_859 = function() {
	this.initialize(ss["LessonChapter1_13_atlas_2"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_858 = function() {
	this.initialize(ss["LessonChapter1_13_atlas_2"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_857 = function() {
	this.initialize(ss["LessonChapter1_13_atlas_2"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_856 = function() {
	this.initialize(ss["LessonChapter1_13_atlas_2"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_855 = function() {
	this.initialize(ss["LessonChapter1_13_atlas_2"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_854 = function() {
	this.initialize(ss["LessonChapter1_13_atlas_2"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_853 = function() {
	this.initialize(ss["LessonChapter1_13_atlas_2"]);
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_852 = function() {
	this.initialize(ss["LessonChapter1_13_atlas_2"]);
	this.gotoAndStop(32);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_851 = function() {
	this.initialize(ss["LessonChapter1_13_atlas_2"]);
	this.gotoAndStop(33);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_850 = function() {
	this.initialize(ss["LessonChapter1_13_atlas_2"]);
	this.gotoAndStop(34);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_849 = function() {
	this.initialize(ss["LessonChapter1_13_atlas_2"]);
	this.gotoAndStop(35);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_848 = function() {
	this.initialize(ss["LessonChapter1_13_atlas_2"]);
	this.gotoAndStop(36);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_847 = function() {
	this.initialize(ss["LessonChapter1_13_atlas_2"]);
	this.gotoAndStop(37);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_846 = function() {
	this.initialize(ss["LessonChapter1_13_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_845 = function() {
	this.initialize(ss["LessonChapter1_13_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CompoundPath = function() {
	this.initialize(ss["LessonChapter1_13_atlas_2"]);
	this.gotoAndStop(38);
}).prototype = p = new cjs.Sprite();



(lib.Group_1 = function() {
	this.initialize(ss["LessonChapter1_13_atlas_2"]);
	this.gotoAndStop(39);
}).prototype = p = new cjs.Sprite();



(lib.Chap1Scene13 = function() {
	this.initialize(ss["LessonChapter1_13_atlas_1"]);
	this.gotoAndStop(8);
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
	this.instance = new lib.CachedBmp_889();
	this.instance.setTransform(-33.05,-28.05,0.4875,0.4875);

	this.instance_1 = new lib.CachedBmp_890();
	this.instance_1.setTransform(-33.05,-28.15,0.4875,0.4875);

	this.instance_2 = new lib.CompoundPath();
	this.instance_2.setTransform(-159.75,-154.3,3.5006,3.5006);

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
	this.instance = new lib.CachedBmp_882();
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
	this.instance = new lib.CachedBmp_881();
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
	this.instance = new lib.CachedBmp_880();
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
	this.instance = new lib.CachedBmp_879();
	this.instance.setTransform(-75.5,-71.9,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-75.5,-71.9,154.5,134.5);


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
	this.shape.graphics.f("#FBF6E0").s().p("Ai0P6QhBhBgGhvQgztggPrBQgDhwA9hZIADgGQAuhFBHglQBCgkBLAAQBMAABCAkQBHAlAuBFQAfAvAOA2QAPA3gDA5QgWGegiGRQgjGmgoFGQgNBwhFBAQg+A7hSAAQhSAAg7g7g");
	this.shape.setTransform(2.3972,4.4729,0.5589,0.5588);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FBF6E0").s().p("Ag5IcQgUgUgCghQgGhWgPl2QgOlRgEiPQgBggAXgbIABgCQAjgqA9AAQA9AAAjAqQAYAcgCAjIgjHjIghHHQgDAigUATQgSARgYAAQgZAAgSgRg");
	this.shape_1.setTransform(0,-44.2,1,1,0,0,0,0,-44.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-15.4,-55.7,35.6,120.4);


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
	this.shape.graphics.f("#FBF6E0").s().p("AgxIsQgYAAgSgSQgTgVgCghQgDhWgCl2QgClQABiQQABghAXgaIACgCQAkgpA8ADQA9ACAjArQAWAdgEAjIgzHhIgxHGQgDAhgUASQgSAQgXAAIgDAAg");
	this.shape.setTransform(-0.8,6,1,1,0,0,0,-0.1,-42.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FBF6E0").s().p("Ai0P6QhBhBgGhvQgztggPrBQgDhwA9hZIADgGQAuhFBHglQBCgkBLAAQBMAABCAkQBHAlAuBFQAfAvAOA2QAPA3gDA5QgWGegiGRQgjGmgoFGQgNBwhFBAQg+A7hSAAQhSAAg7g7g");
	this.shape_1.setTransform(-1.8528,53.0729,0.5589,0.5588);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.6,-7.1,35.6,120.39999999999999);


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
	this.instance = new lib.CachedBmp_878();
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
	this.shape.graphics.f("#D3C2B2").s().p("AgyByQjCgPiugVQgfgEgSgWQgRgVgBgbQgBgbAPgUQARgXAfgEQC6gYCegPQC/gSBkAAQCMAAA/AbQBHAfAABLQAABMhDAZQg3AViYAAQhUAAiygOg");
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
	this.shape.graphics.f("#D3C2B2").s().p("AmeBlQhHgfAAhLQAAhMBDgZQA3gVCYAAQBUAACxAOQDDAPCuAVQAfAEASAXQARAUABAbQABAbgPAUQgRAXgfAEQi9AYicAPQi/AShjAAQiMAAg/gbg");
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
	this.instance = new lib.CachedBmp_877();
	this.instance.setTransform(-19.1,-61.7,0.5,0.5);

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
	this.instance = new lib.CachedBmp_876();
	this.instance.setTransform(-19.15,-60.8,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.1,-60.8,38.5,122);


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
	this.shape.graphics.f("#D3C2B2").s().p("AiNEyQjDgQicgiQASiygHjWQgEhrgHhIQDyAHD0ALQHnAVAJAUQADAGAAAYQAAA+gRCwQgNB8gOB4QiPA8jwAAQhfAAhwgKg");
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
	this.shape.graphics.f("#D3C2B2").s().p("AAYBKQkfgCiagNQgfgDgSgRQgQgQAAgVQAAgUAQgQQASgRAegDQDYgUIzAAQA7AAAWAJQApAPAAAyQAAAzgpAPQgWAIg7AAIjSABIh/gBg");
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
	this.shape.graphics.f("#D3C2B2").s().p("Am5BCQgpgPAAgzQAAgyApgPQAWgIA7AAQC5gBCXAAQEgACCbAPQAeACASARQAQAQAAAVQAAAUgQAPQgSASgeADQjYAUozAAQg6AAgXgJg");
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
	this.instance = new lib.CachedBmp_875();
	this.instance.setTransform(-70.2,-72.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-70.2,-72.5,149,133.5);


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
	this.instance_1 = new lib.CachedBmp_874();
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
	this.instance_1 = new lib.CachedBmp_873();
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
	this.instance_1 = new lib.CachedBmp_872();
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
	this.instance = new lib.CachedBmp_871();
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
	this.instance = new lib.CachedBmp_870();
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
	this.instance_1 = new lib.CachedBmp_869();
	this.instance_1.setTransform(-71.35,-78.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-71.3,-78.6,150.5,156.5);


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
	this.shape_4.graphics.f("#D3C2B2").s().p("AmOToQijiqAKjqIA37rQAGjVCZiTQCaiTDTACIAKAAQDYACCXCcQCXCcgEDZQgHGBgBI3QAAHcAEFOQADDmiiCjQihCkjlAAQjrAAiiiqg");
	this.shape_4.setTransform(-3.6494,-3.9067,0.6048,0.6048);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-37,-90.1,66.8,172.39999999999998);


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
	this.shape_3.graphics.f("#D3C2B2").s().p("AjxL4QhihnAGiOIAhwvQAEiABchZQBdhZCAABIAGAAQCDACBbBeQBbBegCCDQgFDpAAFXQAAEgACDJQACCMhiBiQhiBjiKAAQiOAAhihmg");
	this.shape_3.setTransform(-10.939,45.1488);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-44.3,-41,66.8,172.4);


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
	this.instance_2 = new lib.CachedBmp_868();
	this.instance_2.setTransform(-86,-83.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-86,-83.6,165,158.5);


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

	// flash0_ai
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D3C2B2").s().p("AIGGQIx8hoQiGgMhbhkQhbhjAAiGQAAiJBghiQBhhiCJgCIR7gRQCsgCB6B4QB6B4AACrQAACtiAB2QhxBniTAAQgVAAgUgCg");
	this.shape_2.setTransform(-7.6085,10.9141,0.5768,0.5768);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-62.2,-12.2,109.30000000000001,46.3);


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
	this.shape_2.graphics.f("#D3C2B2").s().p("AIGGQIx8hoQiGgMhbhkQhbhjAAiGQAAiJBghiQBhhiCJgCIR7gRQCsgCB6B4QB6B4AACrQAACtiAB2QhxBniTAAQgVAAgUgCg");
	this.shape_2.setTransform(6.0585,15.6141,0.5768,0.5768,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.6,-7.5,109.30000000000001,46.3);


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
	this.shape_2.setTransform(-5.45,12.9,0.5738,0.5738,0,0,0,-9.5,14.9);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-11.1,-9.2,22.299999999999997,27.2);


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

	// flash0_ai
	this.instance = new lib.CachedBmp_867();
	this.instance.setTransform(-56.95,-12.25,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-56.9,-12.2,114,216);


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

	// flash0_ai
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D3C2B2").s().p("AHYFUIzyg0IAAopIT1hJQCYgFBZBpQBOBcAACBQAECKhgBtQhfBuiCAAIgFAAg");
	this.shape_1.setTransform(13.6664,8.2992,0.5854,0.5854);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#7C6253").s().p("AAYBKQkfgCiagNQgfgDgSgRQgQgQAAgVQAAgUAQgQQASgRAegDQDYgUIzAAQA7AAAWAJQApAPAAAyQAAAzgpAPQgWAIg7AAIjSABIh/gBg");
	this.shape_2.setTransform(-0.0258,-0.03);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.3,-11.5,108.5,39.7);


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
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D3C2B2").s().p("AmaCGQg4hAAChQQAAhLAug2QA0g+BZADILmArIAAFDIrkAfIgDAAQhMAAg4hBg");
	this.shape_1.setTransform(-13.6284,12.5688);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#7C6253").s().p("AAYBKQkfgCiagNQgfgDgSgRQgQgQAAgVQAAgUAQgQQASgRAegDQDYgUIzAAQA7AAAWAJQApAPAAAyQAAAzgpAPQgWAIg7AAIjSABIh/gBg");
	this.shape_2.setTransform(0.0758,4.22,1,1,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).wait(1));

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
	this.instance_2 = new lib.CachedBmp_866();
	this.instance_2.setTransform(-75.25,-66.75,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-75.2,-66.7,158.5,132.5);


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
	this.shape_2.graphics.f("#7C6253").s().p("AjBBrQgOgMgBgjQAAgiALgmQAMgoAUgaQAWgeAYgBIBFgDQAzgCAmACQBxAHAhAsQBABXhuAVQggAGg/ACQg9ADgNACQgUAEgaANIgsAXQgdAOgUAAQgOAAgKgHg");
	this.shape_2.setTransform(14.8,-0.3,1,1,0,0,0,14.8,-0.3);

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
	this.shape_2.setTransform(-12.5,7.9,0.5738,0.5738,0,0,0,-26.2,0.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-18.2,-3.8,41.599999999999994,22.8);


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
	this.instance = new lib.CachedBmp_864();
	this.instance.setTransform(-43.65,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_865();
	this.instance_1.setTransform(-43.45,-36.05,0.5,0.5);

	this.instance_2 = new lib.Group_1();
	this.instance_2.setTransform(-214.75,-207.05,4.7386,4.7386);

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
	this.instance = new lib.CachedBmp_862();
	this.instance.setTransform(-43.65,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_863();
	this.instance_1.setTransform(-42.15,-36.05,0.5,0.5);

	this.instance_2 = new lib.Group_1();
	this.instance_2.setTransform(216.45,-207.05,4.7386,4.7386,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_2},{t:this.instance_1}]},1).wait(1));

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
	this.shape_2.graphics.f("#D3C2B2").s().p("AmOToQijiqAKjqIA37rQAGjVCZiTQCaiTDTACIAKAAQDYACCXCcQCXCcgEDZQgHGBgBI3QAAHcAEFOQADDmiiCjQihCkjlAAQjrAAiiiqg");
	this.shape_2.setTransform(-3.6494,-3.9067,0.6048,0.6048);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

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
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D3C2B2").s().p("AjxL4QhihnAGiOIAhwvQAEiABchZQBdhZCAABIAGAAQCDACBbBeQBbBegCCDQgFDpAAFXQAAEgACDJQACCMhiBiQhiBjiKAAQiOAAhihmg");
	this.shape_2.setTransform(-10.939,45.1488);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

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
	this.instance_1 = new lib.CachedBmp_861();
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
	this.shape_1.graphics.f("#D3C2B2").s().p("AIGGQIx8hoQiGgMhbhkQhbhjAAiGQAAiJBghiQBhhiCJgCIR7gRQCsgCB6B4QB6B4AACrQAACtiAB2QhxBniTAAQgVAAgUgCg");
	this.shape_1.setTransform(-7.6085,10.9141,0.5768,0.5768);

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
	this.shape_1.graphics.f("#D3C2B2").s().p("AIGGQIx8hoQiGgMhbhkQhbhjAAiGQAAiJBghiQBhhiCJgCIR7gRQCsgCB6B4QB6B4AACrQAACtiAB2QhxBniTAAQgVAAgUgCg");
	this.shape_1.setTransform(6.0585,15.6141,0.5768,0.5768,0,0,180);

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
	this.instance = new lib.CachedBmp_860();
	this.instance.setTransform(-56.95,-12.25,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

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
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D3C2B2").s().p("AHYFUIzyg0IAAopIT1hJQCYgFBZBpQBOBcAACBQAECKhgBtQhfBuiCAAIgFAAg");
	this.shape_1.setTransform(13.6664,8.2992,0.5854,0.5854);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#7C6253").s().p("AAYBKQkfgCiagNQgfgDgSgRQgQgQAAgVQAAgUAQgQQASgRAegDQDYgUIzAAQA7AAAWAJQApAPAAAyQAAAzgpAPQgWAIg7AAIjSABIh/gBg");
	this.shape_2.setTransform(-0.0258,-0.03);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).wait(1));

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
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D3C2B2").s().p("AmaCGQg4hAAChQQAAhLAug2QA0g+BZADILmArIAAFDIrkAfIgDAAQhMAAg4hBg");
	this.shape_1.setTransform(-13.6284,12.5688);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#7C6253").s().p("AAYBKQkfgCiagNQgfgDgSgRQgQgQAAgVQAAgUAQgQQASgRAegDQDYgUIzAAQA7AAAWAJQApAPAAAyQAAAzgpAPQgWAIg7AAIjSABIh/gBg");
	this.shape_2.setTransform(0.0758,4.22,1,1,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).wait(1));

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
	this.instance_1 = new lib.CachedBmp_859();
	this.instance_1.setTransform(-75.25,-66.75,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-75.2,-66.7,158.5,144);


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
	this.instance = new lib.CachedBmp_858();
	this.instance.setTransform(-9.45,-43.95,0.4981,0.4981);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.4,-43.9,18.9,88.1);


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
	this.instance = new lib.CachedBmp_857();
	this.instance.setTransform(-9.45,-44,0.4982,0.4982);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.4,-44,18.9,88.2);


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
	this.instance = new lib.CachedBmp_856();
	this.instance.setTransform(-9.45,-43.95,0.4987,0.4987);

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
	this.instance = new lib.CachedBmp_855();
	this.instance.setTransform(-9.45,-43.95,0.4988,0.4988);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.4,-43.9,18.9,87.8);


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
	this.instance = new lib.CachedBmp_854();
	this.instance.setTransform(-26.5,-22.6,0.4982,0.4982);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-26.5,-22.6,52.8,45.400000000000006);


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
	this.instance = new lib.CachedBmp_853();
	this.instance.setTransform(-69.1,-73.05,0.4977,0.4977);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-69.1,-73,138.39999999999998,119.9);


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

	// Character
	this.instance = new lib.CachedBmp_888();
	this.instance.setTransform(-90.3,-346.15,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_887();
	this.instance_1.setTransform(-118.55,-369,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(42));

	// Armature_1
	this.instance_2 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_2.setTransform(-55.9,-21.6,0.9981,0.9981,-68.438,0,0,37.8,-0.2);

	this.instance_3 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_3.setTransform(-108.4,-34,0.9981,0.9981,0,-100.7595,79.2405,6.2,-1.4);

	this.instance_4 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_4.setTransform(-105.3,-25.6,0.9983,0.9983,0,-100.8615,79.1385,5.2,-8.4);

	this.instance_5 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_5.setTransform(-84.9,53,0.9982,0.9982,76.1613,0,0,40.5,0.1);

	this.instance_6 = new lib.ch1_headcopy2("synched",0);
	this.instance_6.setTransform(0.15,-76.9,0.9989,0.9989,0,0.5855,-179.4145,0.5,52.8);

	this.instance_7 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_7.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_8 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_8.setTransform(-42.25,187.95,0.998,0.998,0,6.6576,-173.3424,2.9,-53.5);

	this.instance_9 = new lib.ch1_neckcopy2("synched",0);
	this.instance_9.setTransform(-6,-58,0.999,0.999,-0.0989,0,0,-1.6,8.8);

	this.instance_10 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_10.setTransform(-5.6,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_11 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_11.setTransform(24.65,192.2,0.9978,0.9978,0,-2.5005,177.4995,2.4,-53.2);

	this.instance_12 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_12.setTransform(8.15,96.05,0.9978,0.9978,-8.4136,0,0,-1.9,2.1);

	this.instance_13 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_13.setTransform(47.7,-26.35,0.9984,0.9984,82.3499,0,0,-31.2,-1.4);

	this.instance_14 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_14.setTransform(-20.7,92.2,0.9983,0.9983,12.4494,0,0,1.7,-45.8);

	this.instance_15 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_15.setTransform(-8.2,104.95,0.9982,0.9982,0,-47.1948,132.8052,-4.8,3.4);

	this.instance_16 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_16.setTransform(-8.3,93.5,0.9983,0.9983,0,-71.0505,108.9495,-6.1,8);

	this.instance_17 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_17.setTransform(58.45,47.5,0.9982,0.9982,143.0075,0,0,-39.6,-0.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_17,p:{regX:-39.6,rotation:143.0075,x:58.45,y:47.5,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_16,p:{regX:-6.1,scaleX:0.9983,scaleY:0.9983,skewX:-71.0505,skewY:108.9495,x:-8.3,y:93.5,regY:8}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,skewX:-47.1948,skewY:132.8052,x:-8.2,y:104.95,regX:-4.8,regY:3.4}},{t:this.instance_14,p:{regX:1.7,regY:-45.8,scaleX:0.9983,scaleY:0.9983,rotation:12.4494,y:92.2,x:-20.7}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:82.3499,x:47.7,y:-26.35}},{t:this.instance_12,p:{rotation:-8.4136,x:8.15,y:96.05,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_11,p:{regX:2.4,regY:-53.2,skewX:-2.5005,skewY:177.4995,x:24.65,y:192.2}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:-0.0989,x:-6,y:-58,regY:8.8,regX:-1.6}},{t:this.instance_8,p:{skewX:6.6576,skewY:-173.3424,x:-42.25,regX:2.9,regY:-53.5,y:187.95}},{t:this.instance_7},{t:this.instance_6,p:{regX:0.5,skewX:0.5855,skewY:-179.4145,x:0.15,y:-76.9,scaleX:0.9989,scaleY:0.9989,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,rotation:76.1613,x:-84.9,y:53,regX:40.5}},{t:this.instance_4,p:{regX:5.2,scaleX:0.9983,scaleY:0.9983,skewX:-100.8615,skewY:79.1385,x:-105.3,y:-25.6,regY:-8.4}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,skewX:-100.7595,skewY:79.2405,x:-108.4,y:-34,regY:-1.4,regX:6.2}},{t:this.instance_2,p:{rotation:-68.438,x:-55.9,y:-21.6,scaleX:0.9981,scaleY:0.9981,regX:37.8}}]}).to({state:[{t:this.instance_17,p:{regX:-39.5,rotation:142.5636,x:58.85,y:47.35,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_16,p:{regX:-6,scaleX:0.9982,scaleY:0.9982,skewX:-71.4955,skewY:108.5045,x:-7.4,y:93.9,regY:8}},{t:this.instance_15,p:{scaleX:0.9981,scaleY:0.9981,skewX:-47.6389,skewY:132.3611,x:-7.15,y:105.3,regX:-4.8,regY:3.4}},{t:this.instance_14,p:{regX:1.6,regY:-45.7,scaleX:0.9982,scaleY:0.9982,rotation:12.4493,y:92.25,x:-20.7}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:81.9064,x:47.65,y:-26.45}},{t:this.instance_12,p:{rotation:-8.4124,x:8.05,y:96,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_11,p:{regX:2.3,regY:-53.1,skewX:-2.4997,skewY:177.5003,x:24.65,y:192.2}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9989,scaleY:0.9989,rotation:-0.3107,x:-5.9,y:-57.95,regY:8.8,regX:-1.6}},{t:this.instance_8,p:{skewX:6.5513,skewY:-173.4487,x:-42.4,regX:2.9,regY:-53.5,y:187.95}},{t:this.instance_7},{t:this.instance_6,p:{regX:0.6,skewX:0.3948,skewY:-179.6052,x:-0.05,y:-76.85,scaleX:0.9989,scaleY:0.9989,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9981,scaleY:0.9981,rotation:74.8278,x:-83.85,y:53.35,regX:40.5}},{t:this.instance_4,p:{regX:5.1,scaleX:0.9982,scaleY:0.9982,skewX:-102.194,skewY:77.806,x:-106.2,y:-24.85,regY:-8.4}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,skewX:-102.0913,skewY:77.9087,x:-109.5,y:-33.05,regY:-1.4,regX:6.2}},{t:this.instance_2,p:{rotation:-69.0923,x:-55.8,y:-21.6,scaleX:0.9981,scaleY:0.9981,regX:37.8}}]},1).to({state:[{t:this.instance_17,p:{regX:-39.5,rotation:142.1196,x:59.4,y:47.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_16,p:{regX:-6.1,scaleX:0.9982,scaleY:0.9982,skewX:-71.9403,skewY:108.0597,x:-6.4,y:94.3,regY:8}},{t:this.instance_15,p:{scaleX:0.9981,scaleY:0.9981,skewX:-48.0841,skewY:131.9159,x:-6.1,y:105.7,regX:-4.8,regY:3.4}},{t:this.instance_14,p:{regX:1.6,regY:-45.7,scaleX:0.9982,scaleY:0.9982,rotation:12.4503,y:92.2,x:-20.75}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:81.4623,x:47.65,y:-26.4}},{t:this.instance_12,p:{rotation:-8.4124,x:8.05,y:96,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_11,p:{regX:2.3,regY:-53.1,skewX:-2.4997,skewY:177.5003,x:24.65,y:192.2}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9989,scaleY:0.9989,rotation:-0.5251,x:-5.9,y:-58,regY:8.8,regX:-1.6}},{t:this.instance_8,p:{skewX:6.4429,skewY:-173.5571,x:-42.4,regX:3,regY:-53.5,y:187.95}},{t:this.instance_7},{t:this.instance_6,p:{regX:0.6,skewX:0.2039,skewY:-179.7961,x:-0.2,y:-76.9,scaleX:0.9989,scaleY:0.9989,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9981,scaleY:0.9981,rotation:73.4952,x:-83.05,y:53.7,regX:40.5}},{t:this.instance_4,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,skewX:-103.5262,skewY:76.4738,x:-107.15,y:-23.9,regY:-8.4}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,skewX:-103.4243,skewY:76.5757,x:-110.7,y:-32.2,regY:-1.4,regX:6.2}},{t:this.instance_2,p:{rotation:-69.7465,x:-55.85,y:-21.6,scaleX:0.9981,scaleY:0.9981,regX:37.8}}]},1).to({state:[{t:this.instance_17,p:{regX:-39.5,rotation:141.6741,x:60,y:47.2,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_16,p:{regX:-6.1,scaleX:0.9983,scaleY:0.9983,skewX:-72.3846,skewY:107.6154,x:-5.5,y:94.65,regY:8}},{t:this.instance_15,p:{scaleX:0.9981,scaleY:0.9981,skewX:-48.529,skewY:131.471,x:-5.1,y:106.1,regX:-4.8,regY:3.4}},{t:this.instance_14,p:{regX:1.6,regY:-45.7,scaleX:0.9982,scaleY:0.9982,rotation:12.451,y:92.2,x:-20.75}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:81.0164,x:47.65,y:-26.4}},{t:this.instance_12,p:{rotation:-8.4124,x:8.05,y:96,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_11,p:{regX:2.3,regY:-53.1,skewX:-2.4997,skewY:177.5003,x:24.65,y:192.2}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9989,scaleY:0.9989,rotation:-0.7396,x:-5.9,y:-57.95,regY:8.8,regX:-1.6}},{t:this.instance_8,p:{skewX:6.3354,skewY:-173.6646,x:-42.45,regX:3,regY:-53.4,y:188.05}},{t:this.instance_7},{t:this.instance_6,p:{regX:0.6,skewX:0.0123,skewY:-179.9877,x:-0.2,y:-76.9,scaleX:0.9988,scaleY:0.9989,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9981,scaleY:0.9981,rotation:72.162,x:-82.2,y:54,regX:40.5}},{t:this.instance_4,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,skewX:-104.859,skewY:75.141,x:-108.1,y:-23,regY:-8.4}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,skewX:-104.7574,skewY:75.2426,x:-111.75,y:-31.15,regY:-1.4,regX:6.2}},{t:this.instance_2,p:{rotation:-70.4007,x:-55.8,y:-21.55,scaleX:0.9981,scaleY:0.9981,regX:37.8}}]},1).to({state:[{t:this.instance_17,p:{regX:-39.5,rotation:141.2291,x:60.55,y:47.05,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_16,p:{regX:-6.1,scaleX:0.9982,scaleY:0.9982,skewX:-72.8295,skewY:107.1705,x:-4.5,y:95.05,regY:8}},{t:this.instance_15,p:{scaleX:0.9981,scaleY:0.9981,skewX:-48.9728,skewY:131.0272,x:-4.1,y:106.55,regX:-4.8,regY:3.4}},{t:this.instance_14,p:{regX:1.6,regY:-45.7,scaleX:0.9982,scaleY:0.9982,rotation:12.4521,y:92.2,x:-20.75}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:80.573,x:47.65,y:-26.45}},{t:this.instance_12,p:{rotation:-8.4124,x:8.05,y:96,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_11,p:{regX:2.3,regY:-53.1,skewX:-2.4997,skewY:177.5003,x:24.65,y:192.2}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9989,scaleY:0.9989,rotation:-0.9532,x:-5.9,y:-57.85,regY:8.9,regX:-1.6}},{t:this.instance_8,p:{skewX:6.2278,skewY:-173.7722,x:-42.45,regX:3,regY:-53.5,y:188}},{t:this.instance_7},{t:this.instance_6,p:{regX:0.6,skewX:-0.1733,skewY:179.8267,x:-0.35,y:-76.9,scaleX:0.9988,scaleY:0.9988,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9981,scaleY:0.9981,rotation:70.8282,x:-81.35,y:54.3,regX:40.5}},{t:this.instance_4,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,skewX:-106.1915,skewY:73.8085,x:-109,y:-22.1,regY:-8.4}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,skewX:-106.0904,skewY:73.9096,x:-112.9,y:-30.15,regY:-1.4,regX:6.2}},{t:this.instance_2,p:{rotation:-71.0529,x:-55.85,y:-21.6,scaleX:0.9981,scaleY:0.9981,regX:37.8}}]},1).to({state:[{t:this.instance_17,p:{regX:-39.5,rotation:140.7851,x:61.15,y:47,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_16,p:{regX:-6.1,scaleX:0.9983,scaleY:0.9983,skewX:-73.2738,skewY:106.7262,x:-3.55,y:95.5,regY:8}},{t:this.instance_15,p:{scaleX:0.9981,scaleY:0.9981,skewX:-49.4181,skewY:130.5819,x:-3.05,y:106.95,regX:-4.8,regY:3.4}},{t:this.instance_14,p:{regX:1.6,regY:-45.7,scaleX:0.9982,scaleY:0.9982,rotation:12.4521,y:92.2,x:-20.75}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:80.1269,x:47.65,y:-26.45}},{t:this.instance_12,p:{rotation:-8.4124,x:8.05,y:96,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_11,p:{regX:2.3,regY:-53.1,skewX:-2.4997,skewY:177.5003,x:24.65,y:192.2}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9989,scaleY:0.9989,rotation:-1.1676,x:-5.9,y:-57.85,regY:8.9,regX:-1.6}},{t:this.instance_8,p:{skewX:6.1193,skewY:-173.8807,x:-42.45,regX:3,regY:-53.5,y:188}},{t:this.instance_7},{t:this.instance_6,p:{regX:0.6,skewX:-0.3641,skewY:179.6359,x:-0.3,y:-76.95,scaleX:0.9989,scaleY:0.9989,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9981,scaleY:0.9981,rotation:69.4965,x:-80.5,y:54.55,regX:40.5}},{t:this.instance_4,p:{regX:5.1,scaleX:0.9982,scaleY:0.9982,skewX:-107.5248,skewY:72.4752,x:-109.9,y:-21.3,regY:-8.4}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,skewX:-107.4229,skewY:72.5771,x:-114.1,y:-29.05,regY:-1.5,regX:6.2}},{t:this.instance_2,p:{rotation:-71.7072,x:-55.85,y:-21.6,scaleX:0.9981,scaleY:0.9981,regX:37.8}}]},1).to({state:[{t:this.instance_17,p:{regX:-39.5,rotation:140.3402,x:61.7,y:46.95,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_16,p:{regX:-6.1,scaleX:0.9982,scaleY:0.9982,skewX:-73.7194,skewY:106.2806,x:-2.7,y:95.9,regY:8}},{t:this.instance_15,p:{scaleX:0.9981,scaleY:0.9981,skewX:-49.863,skewY:130.137,x:-2.1,y:107.4,regX:-4.7,regY:3.4}},{t:this.instance_14,p:{regX:1.6,regY:-45.7,scaleX:0.9982,scaleY:0.9982,rotation:12.4529,y:92.2,x:-20.75}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:79.6839,x:47.65,y:-26.45}},{t:this.instance_12,p:{rotation:-8.4124,x:8.05,y:96,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_11,p:{regX:2.3,regY:-53.1,skewX:-2.4988,skewY:177.5012,x:24.65,y:192.2}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9989,scaleY:0.9989,rotation:-1.3812,x:-5.9,y:-57.9,regY:8.8,regX:-1.6}},{t:this.instance_8,p:{skewX:6.0111,skewY:-173.9889,x:-42.45,regX:3,regY:-53.5,y:187.95}},{t:this.instance_7},{t:this.instance_6,p:{regX:0.6,skewX:-0.5549,skewY:179.4451,x:-0.35,y:-77,scaleX:0.9989,scaleY:0.9989,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9981,scaleY:0.9981,rotation:68.1635,x:-79.6,y:54.8,regX:40.5}},{t:this.instance_4,p:{regX:5.1,scaleX:0.9982,scaleY:0.9982,skewX:-108.8576,skewY:71.1424,x:-110.8,y:-20.25,regY:-8.4}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,skewX:-108.7563,skewY:71.2437,x:-115.05,y:-28.05,regY:-1.4,regX:6.2}},{t:this.instance_2,p:{rotation:-72.362,x:-55.85,y:-21.55,scaleX:0.9981,scaleY:0.9981,regX:37.8}}]},1).to({state:[{t:this.instance_17,p:{regX:-39.5,rotation:139.8962,x:62.3,y:46.75,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_16,p:{regX:-6,scaleX:0.9983,scaleY:0.9983,skewX:-74.1643,skewY:105.8357,x:-1.7,y:96.4,regY:8}},{t:this.instance_15,p:{scaleX:0.9981,scaleY:0.9981,skewX:-50.307,skewY:129.693,x:-1,y:107.65,regX:-4.8,regY:3.4}},{t:this.instance_14,p:{regX:1.6,regY:-45.7,scaleX:0.9982,scaleY:0.9982,rotation:12.4538,y:92.2,x:-20.75}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:79.2385,x:47.6,y:-26.4}},{t:this.instance_12,p:{rotation:-8.4117,x:8,y:96,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regX:2.3,regY:-53.1,skewX:-2.4988,skewY:177.5012,x:24.65,y:192.2}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9989,scaleY:0.9989,rotation:-1.5966,x:-5.9,y:-57.95,regY:8.8,regX:-1.6}},{t:this.instance_8,p:{skewX:5.9018,skewY:-174.0982,x:-42.45,regX:3,regY:-53.5,y:188}},{t:this.instance_7},{t:this.instance_6,p:{regX:0.6,skewX:-0.7466,skewY:179.2534,x:-0.45,y:-77,scaleX:0.9989,scaleY:0.9989,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9981,scaleY:0.9981,rotation:66.8309,x:-78.7,y:55.1,regX:40.5}},{t:this.instance_4,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,skewX:-110.1914,skewY:69.8086,x:-111.6,y:-19.15,regY:-8.4}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,skewX:-110.0893,skewY:69.9107,x:-116.1,y:-26.9,regY:-1.4,regX:6.2}},{t:this.instance_2,p:{rotation:-73.0156,x:-55.8,y:-21.6,scaleX:0.9981,scaleY:0.9981,regX:37.8}}]},1).to({state:[{t:this.instance_17,p:{regX:-39.5,rotation:139.4513,x:62.85,y:46.6,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_16,p:{regX:-6.1,scaleX:0.9983,scaleY:0.9983,skewX:-74.6088,skewY:105.3912,x:-0.75,y:96.65,regY:8}},{t:this.instance_15,p:{scaleX:0.9981,scaleY:0.9981,skewX:-50.7518,skewY:129.2482,x:0.2,y:108.15,regX:-4.8,regY:3.5}},{t:this.instance_14,p:{regX:1.6,regY:-45.7,scaleX:0.9982,scaleY:0.9982,rotation:12.4546,y:92.2,x:-20.75}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:78.7936,x:47.6,y:-26.4}},{t:this.instance_12,p:{rotation:-8.4117,x:8,y:96,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regX:2.3,regY:-53.1,skewX:-2.4988,skewY:177.5012,x:24.65,y:192.2}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9989,scaleY:0.9989,rotation:-1.8093,x:-5.9,y:-57.9,regY:8.8,regX:-1.6}},{t:this.instance_8,p:{skewX:5.7935,skewY:-174.2065,x:-42.5,regX:3,regY:-53.5,y:187.95}},{t:this.instance_7},{t:this.instance_6,p:{regX:0.6,skewX:-0.9366,skewY:179.0634,x:-0.5,y:-77,scaleX:0.9988,scaleY:0.9988,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9981,scaleY:0.9981,rotation:65.4967,x:-77.85,y:55.35,regX:40.5}},{t:this.instance_4,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,skewX:-111.5235,skewY:68.4765,x:-112.5,y:-18.05,regY:-8.4}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,skewX:-111.4227,skewY:68.5773,x:-117.1,y:-25.75,regY:-1.4,regX:6.2}},{t:this.instance_2,p:{rotation:-73.668,x:-55.85,y:-21.65,scaleX:0.9981,scaleY:0.9981,regX:37.8}}]},1).to({state:[{t:this.instance_17,p:{regX:-39.5,rotation:139.0073,x:63.35,y:46.55,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_16,p:{regX:-6.1,scaleX:0.9982,scaleY:0.9982,skewX:-75.0535,skewY:104.9465,x:0.2,y:97,regY:8}},{t:this.instance_15,p:{scaleX:0.9981,scaleY:0.9981,skewX:-51.1966,skewY:128.8034,x:1.15,y:108.5,regX:-4.8,regY:3.4}},{t:this.instance_14,p:{regX:1.6,regY:-45.7,scaleX:0.9982,scaleY:0.9982,rotation:12.4557,y:92.2,x:-20.8}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:78.3485,x:47.6,y:-26.45}},{t:this.instance_12,p:{rotation:-8.4117,x:8,y:96,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regX:2.3,regY:-53.1,skewX:-2.4988,skewY:177.5012,x:24.65,y:192.2}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9989,scaleY:0.9989,rotation:-2.0239,x:-5.9,y:-57.95,regY:8.8,regX:-1.6}},{t:this.instance_8,p:{skewX:5.6861,skewY:-174.3139,x:-42.45,regX:3,regY:-53.5,y:187.95}},{t:this.instance_7},{t:this.instance_6,p:{regX:0.6,skewX:-1.1274,skewY:178.8726,x:-0.55,y:-77.05,scaleX:0.9989,scaleY:0.9989,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9981,scaleY:0.9981,rotation:64.1636,x:-76.9,y:55.6,regX:40.5}},{t:this.instance_4,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,skewX:-112.8575,skewY:67.1425,x:-113.4,y:-17,regY:-8.4}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,skewX:-112.7549,skewY:67.2451,x:-118.1,y:-24.55,regY:-1.4,regX:6.2}},{t:this.instance_2,p:{rotation:-74.3232,x:-55.8,y:-21.55,scaleX:0.998,scaleY:0.998,regX:37.8}}]},1).to({state:[{t:this.instance_17,p:{regX:-39.5,rotation:138.5629,x:63.9,y:46.4,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_16,p:{regX:-6.1,scaleX:0.9983,scaleY:0.9983,skewX:-75.4981,skewY:104.5019,x:1.2,y:97.35,regY:8}},{t:this.instance_15,p:{scaleX:0.9981,scaleY:0.9981,skewX:-51.641,skewY:128.359,x:2.15,y:108.85,regX:-4.8,regY:3.4}},{t:this.instance_14,p:{regX:1.6,regY:-45.7,scaleX:0.9982,scaleY:0.9982,rotation:12.4565,y:92.2,x:-20.8}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:77.9055,x:47.6,y:-26.4}},{t:this.instance_12,p:{rotation:-8.4117,x:8,y:96,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regX:2.3,regY:-53.1,skewX:-2.4988,skewY:177.5012,x:24.65,y:192.2}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9989,scaleY:0.9989,rotation:-2.2376,x:-5.9,y:-57.9,regY:8.8,regX:-1.6}},{t:this.instance_8,p:{skewX:5.5777,skewY:-174.4223,x:-42.45,regX:3,regY:-53.5,y:187.95}},{t:this.instance_7},{t:this.instance_6,p:{regX:0.6,skewX:-1.3174,skewY:178.6826,x:-0.7,y:-77.1,scaleX:0.9989,scaleY:0.9989,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9981,scaleY:0.9981,rotation:62.8313,x:-76,y:55.8,regX:40.5}},{t:this.instance_4,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,skewX:-114.1908,skewY:65.8092,x:-114.05,y:-15.9,regY:-8.4}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,skewX:-114.0875,skewY:65.9125,x:-119.05,y:-23.35,regY:-1.4,regX:6.2}},{t:this.instance_2,p:{rotation:-74.9756,x:-55.8,y:-21.65,scaleX:0.9981,scaleY:0.9981,regX:37.8}}]},1).to({state:[{t:this.instance_17,p:{regX:-39.5,rotation:138.1181,x:64.55,y:46.25,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_16,p:{regX:-6.1,scaleX:0.9982,scaleY:0.9982,skewX:-75.9429,skewY:104.0571,x:2.35,y:97.75,regY:8.1}},{t:this.instance_15,p:{scaleX:0.9981,scaleY:0.9981,skewX:-52.0858,skewY:127.9142,x:3.25,y:109.1,regX:-4.8,regY:3.4}},{t:this.instance_14,p:{regX:1.6,regY:-45.7,scaleX:0.9982,scaleY:0.9982,rotation:12.4576,y:92.2,x:-20.8}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:77.4601,x:47.65,y:-26.4}},{t:this.instance_12,p:{rotation:-8.4117,x:8,y:96,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regX:2.3,regY:-53.1,skewX:-2.4988,skewY:177.5012,x:24.65,y:192.2}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9989,scaleY:0.9989,rotation:-2.4531,x:-5.95,y:-57.95,regY:8.8,regX:-1.6}},{t:this.instance_8,p:{skewX:5.4686,skewY:-174.5314,x:-42.45,regX:3,regY:-53.5,y:187.95}},{t:this.instance_7},{t:this.instance_6,p:{regX:0.6,skewX:-1.5091,skewY:178.4909,x:-0.7,y:-77.25,scaleX:0.9989,scaleY:0.9989,regY:52.7}},{t:this.instance_5,p:{scaleX:0.9981,scaleY:0.9981,rotation:61.4979,x:-75.1,y:56,regX:40.5}},{t:this.instance_4,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,skewX:-115.5227,skewY:64.4773,x:-114.85,y:-14.75,regY:-8.4}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,skewX:-115.4214,skewY:64.5786,x:-120,y:-22.05,regY:-1.4,regX:6.2}},{t:this.instance_2,p:{rotation:-75.6302,x:-55.85,y:-21.65,scaleX:0.9981,scaleY:0.9981,regX:37.8}}]},1).to({state:[{t:this.instance_17,p:{regX:-39.5,rotation:137.6728,x:65.1,y:46.1,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_16,p:{regX:-6,scaleX:0.9983,scaleY:0.9983,skewX:-76.3875,skewY:103.6125,x:3.15,y:98.2,regY:8}},{t:this.instance_15,p:{scaleX:0.9981,scaleY:0.9981,skewX:-52.5297,skewY:127.4703,x:4.3,y:109.45,regX:-4.8,regY:3.4}},{t:this.instance_14,p:{regX:1.6,regY:-45.7,scaleX:0.9982,scaleY:0.9982,rotation:12.4576,y:92.2,x:-20.8}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:77.0161,x:47.65,y:-26.4}},{t:this.instance_12,p:{rotation:-8.4117,x:8,y:96,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regX:2.3,regY:-53.1,skewX:-2.498,skewY:177.502,x:24.65,y:192.2}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9989,scaleY:0.9989,rotation:-2.666,x:-5.95,y:-57.9,regY:8.8,regX:-1.6}},{t:this.instance_8,p:{skewX:5.3613,skewY:-174.6387,x:-42.45,regX:3,regY:-53.5,y:187.95}},{t:this.instance_7},{t:this.instance_6,p:{regX:0.6,skewX:-1.6991,skewY:178.3009,x:-0.9,y:-77.25,scaleX:0.9989,scaleY:0.9989,regY:52.7}},{t:this.instance_5,p:{scaleX:0.9981,scaleY:0.9981,rotation:60.1646,x:-74.25,y:56.25,regX:40.5}},{t:this.instance_4,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,skewX:-116.8557,skewY:63.1443,x:-115.6,y:-13.55,regY:-8.4}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,skewX:-116.7543,skewY:63.2457,x:-120.9,y:-20.8,regY:-1.4,regX:6.2}},{t:this.instance_2,p:{rotation:-76.2848,x:-55.75,y:-21.6,scaleX:0.9981,scaleY:0.9981,regX:37.8}}]},1).to({state:[{t:this.instance_17,p:{regX:-39.5,rotation:137.2283,x:65.6,y:45.95,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_16,p:{regX:-6.2,scaleX:0.9982,scaleY:0.9982,skewX:-76.8321,skewY:103.1679,x:4.2,y:98.3,regY:8.1}},{t:this.instance_15,p:{scaleX:0.9981,scaleY:0.9981,skewX:-52.9747,skewY:127.0253,x:5.35,y:109.85,regX:-4.8,regY:3.4}},{t:this.instance_14,p:{regX:1.6,regY:-45.7,scaleX:0.9982,scaleY:0.9982,rotation:12.4576,y:92.2,x:-20.8}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:76.5717,x:47.6,y:-26.45}},{t:this.instance_12,p:{rotation:-8.4117,x:8,y:96,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regX:2.3,regY:-53.1,skewX:-2.498,skewY:177.502,x:24.65,y:192.2}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9989,scaleY:0.9989,rotation:-2.8798,x:-5.95,y:-57.8,regY:8.9,regX:-1.6}},{t:this.instance_8,p:{skewX:5.254,skewY:-174.746,x:-42.45,regX:3,regY:-53.4,y:188.1}},{t:this.instance_7},{t:this.instance_6,p:{regX:0.6,skewX:-1.8909,skewY:178.109,x:-0.95,y:-77.25,scaleX:0.9988,scaleY:0.9989,regY:52.7}},{t:this.instance_5,p:{scaleX:0.9981,scaleY:0.9981,rotation:58.8334,x:-73.4,y:56.45,regX:40.5}},{t:this.instance_4,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,skewX:-118.1896,skewY:61.8104,x:-116.4,y:-12.45,regY:-8.4}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,skewX:-118.0873,skewY:61.9127,x:-121.8,y:-19.5,regY:-1.4,regX:6.2}},{t:this.instance_2,p:{rotation:-76.9379,x:-55.75,y:-21.65,scaleX:0.9981,scaleY:0.9981,regX:37.8}}]},1).to({state:[{t:this.instance_17,p:{regX:-39.5,rotation:136.7834,x:66.2,y:45.85,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_16,p:{regX:-6.1,scaleX:0.9983,scaleY:0.9983,skewX:-77.277,skewY:102.723,x:5.1,y:98.75,regY:8}},{t:this.instance_15,p:{scaleX:0.9981,scaleY:0.9981,skewX:-53.4199,skewY:126.5801,x:6.4,y:110.2,regX:-4.8,regY:3.5}},{t:this.instance_14,p:{regX:1.6,regY:-45.7,scaleX:0.9982,scaleY:0.9982,rotation:12.4591,y:92.2,x:-20.8}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:76.1258,x:47.65,y:-26.45}},{t:this.instance_12,p:{rotation:-8.4108,x:7.95,y:96,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regX:2.3,regY:-53.1,skewX:-2.498,skewY:177.502,x:24.65,y:192.2}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9989,scaleY:0.9989,rotation:-3.0945,x:-5.95,y:-57.75,regY:8.9,regX:-1.6}},{t:this.instance_8,p:{skewX:5.1441,skewY:-174.8559,x:-42.45,regX:3,regY:-53.5,y:187.95}},{t:this.instance_7},{t:this.instance_6,p:{regX:0.6,skewX:-2.0819,skewY:177.9181,x:-1,y:-77.2,scaleX:0.9989,scaleY:0.9989,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9981,scaleY:0.9981,rotation:57.4987,x:-72.45,y:56.65,regX:40.5}},{t:this.instance_4,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,skewX:-119.522,skewY:60.478,x:-117.1,y:-11.2,regY:-8.4}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,skewX:-119.4203,skewY:60.5797,x:-122.6,y:-18.1,regY:-1.4,regX:6.2}},{t:this.instance_2,p:{rotation:-77.5914,x:-55.85,y:-21.65,scaleX:0.9981,scaleY:0.9981,regX:37.8}}]},1).to({state:[{t:this.instance_17,p:{regX:-39.5,rotation:136.3385,x:66.7,y:45.7,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_16,p:{regX:-6.1,scaleX:0.9982,scaleY:0.9982,skewX:-77.722,skewY:102.278,x:6.05,y:99.1,regY:8}},{t:this.instance_15,p:{scaleX:0.9981,scaleY:0.9981,skewX:-53.8645,skewY:126.1355,x:7.4,y:110.45,regX:-4.8,regY:3.4}},{t:this.instance_14,p:{regX:1.6,regY:-45.7,scaleX:0.9982,scaleY:0.9982,rotation:12.4601,y:92.2,x:-20.75}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:75.6817,x:47.65,y:-26.45}},{t:this.instance_12,p:{rotation:-8.4108,x:7.95,y:96,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regX:2.3,regY:-53.1,skewX:-2.498,skewY:177.502,x:24.65,y:192.2}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9989,scaleY:0.9989,rotation:-3.3093,x:-5.95,y:-57.75,regY:8.9,regX:-1.6}},{t:this.instance_8,p:{skewX:5.0368,skewY:-174.9632,x:-42.45,regX:3,regY:-53.5,y:187.95}},{t:this.instance_7},{t:this.instance_6,p:{regX:0.6,skewX:-2.2728,skewY:177.7272,x:-1.1,y:-77.2,scaleX:0.9989,scaleY:0.9989,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9981,scaleY:0.9981,rotation:56.1661,x:-71.55,y:56.85,regX:40.5}},{t:this.instance_4,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,skewX:-120.8556,skewY:59.1444,x:-117.7,y:-9.95,regY:-8.4}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,skewX:-120.753,skewY:59.247,x:-123.5,y:-16.75,regY:-1.4,regX:6.2}},{t:this.instance_2,p:{rotation:-78.2463,x:-55.75,y:-21.8,scaleX:0.9981,scaleY:0.9981,regX:37.9}}]},1).to({state:[{t:this.instance_17,p:{regX:-39.5,rotation:135.8944,x:67.3,y:45.55,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_16,p:{regX:-6.1,scaleX:0.9982,scaleY:0.9982,skewX:-78.166,skewY:101.834,x:7.1,y:99.45,regY:8}},{t:this.instance_15,p:{scaleX:0.9981,scaleY:0.9981,skewX:-54.3094,skewY:125.6906,x:8.4,y:110.9,regX:-4.7,regY:3.4}},{t:this.instance_14,p:{regX:1.6,regY:-45.7,scaleX:0.9982,scaleY:0.9982,rotation:12.461,y:92.2,x:-20.75}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:75.2365,x:47.55,y:-26.4}},{t:this.instance_12,p:{rotation:-8.4108,x:7.95,y:96,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regX:2.3,regY:-53.1,skewX:-2.498,skewY:177.502,x:24.65,y:192.2}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9989,scaleY:0.9989,rotation:-3.5215,x:-5.95,y:-57.95,regY:8.8,regX:-1.6}},{t:this.instance_8,p:{skewX:4.9285,skewY:-175.0715,x:-42.45,regX:3,regY:-53.5,y:187.95}},{t:this.instance_7},{t:this.instance_6,p:{regX:0.6,skewX:-2.462,skewY:177.538,x:-1.15,y:-77.15,scaleX:0.9989,scaleY:0.9989,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9981,scaleY:0.9981,rotation:54.8327,x:-70.6,y:57,regX:40.5}},{t:this.instance_4,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,skewX:-122.1865,skewY:57.8135,x:-118.4,y:-8.7,regY:-8.4}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,skewX:-122.0863,skewY:57.9137,x:-124.3,y:-15.25,regY:-1.5,regX:6.2}},{t:this.instance_2,p:{rotation:-78.8979,x:-55.8,y:-21.65,scaleX:0.9981,scaleY:0.9981,regX:37.8}}]},1).to({state:[{t:this.instance_17,p:{regX:-39.5,rotation:135.449,x:67.8,y:45.35,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_16,p:{regX:-6,scaleX:0.9982,scaleY:0.9982,skewX:-78.6105,skewY:101.3895,x:8.2,y:99.85,regY:8.1}},{t:this.instance_15,p:{scaleX:0.9981,scaleY:0.9981,skewX:-54.754,skewY:125.246,x:9.5,y:111.1,regX:-4.8,regY:3.4}},{t:this.instance_14,p:{regX:1.6,regY:-45.7,scaleX:0.9982,scaleY:0.9982,rotation:12.462,y:92.2,x:-20.75}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:74.7929,x:47.6,y:-26.4}},{t:this.instance_12,p:{rotation:-8.4108,x:7.95,y:96,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regX:2.3,regY:-53.1,skewX:-2.4971,skewY:177.5029,x:24.65,y:192.2}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9989,scaleY:0.9989,rotation:-3.7364,x:-6,y:-57.9,regY:8.8,regX:-1.6}},{t:this.instance_8,p:{skewX:4.8212,skewY:-175.1788,x:-42.45,regX:3,regY:-53.5,y:187.95}},{t:this.instance_7},{t:this.instance_6,p:{regX:0.6,skewX:-2.6531,skewY:177.3469,x:-1.2,y:-77.2,scaleX:0.9988,scaleY:0.9988,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9981,scaleY:0.9981,rotation:53.5012,x:-69.85,y:57.05,regX:40.4}},{t:this.instance_4,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,skewX:-123.52,skewY:56.48,x:-119,y:-7.35,regY:-8.4}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,skewX:-123.4179,skewY:56.5821,x:-125,y:-13.9,regY:-1.4,regX:6.2}},{t:this.instance_2,p:{rotation:-79.5533,x:-55.75,y:-21.6,scaleX:0.9981,scaleY:0.9981,regX:37.8}}]},1).to({state:[{t:this.instance_17,p:{regX:-39.6,rotation:135.0043,x:68.45,y:45.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_16,p:{regX:-6.2,scaleX:0.9983,scaleY:0.9983,skewX:-79.0561,skewY:100.9439,x:9,y:99.85,regY:8}},{t:this.instance_15,p:{scaleX:0.9981,scaleY:0.9981,skewX:-55.1979,skewY:124.8021,x:10.6,y:111.35,regX:-4.8,regY:3.4}},{t:this.instance_14,p:{regX:1.6,regY:-45.7,scaleX:0.9982,scaleY:0.9982,rotation:12.462,y:92.15,x:-20.75}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:74.3488,x:47.65,y:-26.45}},{t:this.instance_12,p:{rotation:-8.4108,x:7.95,y:96,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regX:2.3,regY:-53.1,skewX:-2.4971,skewY:177.5029,x:24.65,y:192.2}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9989,scaleY:0.9989,rotation:-3.9512,x:-5.95,y:-57.95,regY:8.8,regX:-1.6}},{t:this.instance_8,p:{skewX:4.7123,skewY:-175.2877,x:-42.45,regX:3,regY:-53.5,y:187.9}},{t:this.instance_7},{t:this.instance_6,p:{regX:0.6,skewX:-2.844,skewY:177.156,x:-1.35,y:-77.25,scaleX:0.9989,scaleY:0.9989,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9981,scaleY:0.9981,rotation:52.1674,x:-68.85,y:57.3,regX:40.5}},{t:this.instance_4,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,skewX:-124.8535,skewY:55.1465,x:-119.6,y:-6.05,regY:-8.4}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,skewX:-124.7522,skewY:55.2478,x:-125.75,y:-12.4,regY:-1.4,regX:6.2}},{t:this.instance_2,p:{rotation:-80.2063,x:-55.75,y:-21.75,scaleX:0.998,scaleY:0.998,regX:37.9}}]},1).to({state:[{t:this.instance_17,p:{regX:-39.5,rotation:134.5596,x:68.95,y:45.05,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_16,p:{regX:-6.1,scaleX:0.9982,scaleY:0.9982,skewX:-79.4999,skewY:100.5001,x:9.9,y:100.3,regY:8}},{t:this.instance_15,p:{scaleX:0.9981,scaleY:0.9981,skewX:-55.6426,skewY:124.3574,x:11.65,y:111.6,regX:-4.8,regY:3.4}},{t:this.instance_14,p:{regX:1.6,regY:-45.7,scaleX:0.9982,scaleY:0.9982,rotation:12.4627,y:92.15,x:-20.75}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:73.9039,x:47.55,y:-26.45}},{t:this.instance_12,p:{rotation:-8.4108,x:7.95,y:96,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regX:2.3,regY:-53.1,skewX:-2.4971,skewY:177.5029,x:24.65,y:192.2}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9989,scaleY:0.9989,rotation:-4.1645,x:-5.95,y:-57.95,regY:8.8,regX:-1.6}},{t:this.instance_8,p:{skewX:4.6041,skewY:-175.3959,x:-42.45,regX:3,regY:-53.5,y:187.95}},{t:this.instance_7},{t:this.instance_6,p:{regX:0.6,skewX:-3.0351,skewY:176.9649,x:-1.35,y:-77.25,scaleX:0.9989,scaleY:0.9989,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9981,scaleY:0.9981,rotation:50.8347,x:-67.9,y:57.45,regX:40.5}},{t:this.instance_4,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,skewX:-126.1867,skewY:53.8133,x:-120.05,y:-4.8,regY:-8.3}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,skewX:-126.0848,skewY:53.9152,x:-126.5,y:-10.95,regY:-1.4,regX:6.2}},{t:this.instance_2,p:{rotation:-80.8608,x:-55.8,y:-21.7,scaleX:0.9981,scaleY:0.9981,regX:37.8}}]},1).to({state:[{t:this.instance_17,p:{regX:-39.5,rotation:134.1155,x:69.45,y:44.9,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_16,p:{regX:-6.1,scaleX:0.9983,scaleY:0.9983,skewX:-79.9461,skewY:100.0539,x:10.95,y:100.55,regY:8}},{t:this.instance_15,p:{scaleX:0.9981,scaleY:0.9981,skewX:-56.0872,skewY:123.9128,x:12.7,y:111.85,regX:-4.8,regY:3.4}},{t:this.instance_14,p:{regX:1.6,regY:-45.7,scaleX:0.9982,scaleY:0.9982,rotation:12.4637,y:92.15,x:-20.75}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:73.4585,x:47.65,y:-26.5}},{t:this.instance_12,p:{rotation:-8.4108,x:7.95,y:95.95,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regX:2.3,regY:-53.1,skewX:-2.4971,skewY:177.5029,x:24.65,y:192.2}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9989,scaleY:0.9989,rotation:-4.3778,x:-6.1,y:-57.85,regY:8.8,regX:-1.7}},{t:this.instance_8,p:{skewX:4.4961,skewY:-175.5039,x:-42.45,regX:3,regY:-53.5,y:187.85}},{t:this.instance_7},{t:this.instance_6,p:{regX:0.6,skewX:-3.2253,skewY:176.7746,x:-1.5,y:-77.25,scaleX:0.9989,scaleY:0.9989,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9981,scaleY:0.9981,rotation:49.5013,x:-67.05,y:57.5,regX:40.4}},{t:this.instance_4,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,skewX:-127.5198,skewY:52.4802,x:-120.65,y:-3.4,regY:-8.4}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,skewX:-127.4181,skewY:52.5819,x:-127.1,y:-9.4,regY:-1.4,regX:6.2}},{t:this.instance_2,p:{rotation:-81.5151,x:-55.75,y:-21.7,scaleX:0.9981,scaleY:0.9981,regX:37.8}}]},1).to({state:[{t:this.instance_17,p:{regX:-39.5,rotation:134.5504,x:68.95,y:45.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_16,p:{regX:-6.1,scaleX:0.9982,scaleY:0.9982,skewX:-79.4999,skewY:100.5001,x:9.95,y:100.3,regY:8}},{t:this.instance_15,p:{scaleX:0.9981,scaleY:0.9981,skewX:-55.6307,skewY:124.3693,x:11.7,y:111.6,regX:-4.8,regY:3.4}},{t:this.instance_14,p:{regX:1.6,regY:-45.7,scaleX:0.9982,scaleY:0.9982,rotation:12.4699,y:92.15,x:-20.75}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:73.8892,x:47.55,y:-26.4}},{t:this.instance_12,p:{rotation:-8.4177,x:8,y:96,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_11,p:{regX:2.3,regY:-53.1,skewX:-2.5094,skewY:177.4906,x:24.7,y:192.2}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9989,scaleY:0.9989,rotation:-4.1697,x:-5.95,y:-57.95,regY:8.8,regX:-1.6}},{t:this.instance_8,p:{skewX:4.605,skewY:-175.395,x:-42.45,regX:3,regY:-53.5,y:187.95}},{t:this.instance_7},{t:this.instance_6,p:{regX:0.6,skewX:-3.0404,skewY:176.9596,x:-1.4,y:-77.25,scaleX:0.9989,scaleY:0.9989,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9981,scaleY:0.9981,rotation:50.773,x:-67.9,y:57.45,regX:40.5}},{t:this.instance_4,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,skewX:-126.2536,skewY:53.7464,x:-120.2,y:-4.65,regY:-8.4}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,skewX:-126.157,skewY:53.843,x:-126.5,y:-10.8,regY:-1.4,regX:6.3}},{t:this.instance_2,p:{rotation:-80.8796,x:-55.75,y:-21.65,scaleX:0.9981,scaleY:0.9981,regX:37.8}}]},1).to({state:[{t:this.instance_17,p:{regX:-39.5,rotation:134.9858,x:68.4,y:45.25,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_16,p:{regX:-6.2,scaleX:0.9983,scaleY:0.9983,skewX:-79.0526,skewY:100.9474,x:9.05,y:99.85,regY:8}},{t:this.instance_15,p:{scaleX:0.9981,scaleY:0.9981,skewX:-55.1746,skewY:124.8254,x:10.65,y:111.35,regX:-4.8,regY:3.4}},{t:this.instance_14,p:{regX:1.6,regY:-45.7,scaleX:0.9982,scaleY:0.9982,rotation:12.4771,y:92.15,x:-20.8}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:74.3214,x:47.65,y:-26.45}},{t:this.instance_12,p:{rotation:-8.4266,x:8,y:96,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_11,p:{regX:2.3,regY:-53.1,skewX:-2.5226,skewY:177.4774,x:24.7,y:192.2}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9989,scaleY:0.9989,rotation:-3.9618,x:-5.95,y:-57.9,regY:8.8,regX:-1.6}},{t:this.instance_8,p:{skewX:4.714,skewY:-175.286,x:-42.45,regX:3,regY:-53.5,y:187.9}},{t:this.instance_7},{t:this.instance_6,p:{regX:0.6,skewX:-2.8546,skewY:177.1454,x:-1.25,y:-77.25,scaleX:0.9989,scaleY:0.9989,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9981,scaleY:0.9981,rotation:52.0446,x:-68.8,y:57.3,regX:40.5}},{t:this.instance_4,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,skewX:-124.9869,skewY:55.0131,x:-119.5,y:-6.05,regY:-8.3}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,skewX:-124.8953,skewY:55.1047,x:-125.95,y:-12.25,regY:-1.5,regX:6.2}},{t:this.instance_2,p:{rotation:-80.2436,x:-55.8,y:-21.8,scaleX:0.998,scaleY:0.998,regX:37.9}}]},1).to({state:[{t:this.instance_17,p:{regX:-39.5,rotation:135.4193,x:67.95,y:45.35,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_16,p:{regX:-6,scaleX:0.9982,scaleY:0.9982,skewX:-78.6052,skewY:101.3948,x:8.3,y:99.9,regY:8.1}},{t:this.instance_15,p:{scaleX:0.9981,scaleY:0.9981,skewX:-54.7192,skewY:125.2808,x:9.55,y:111.1,regX:-4.8,regY:3.4}},{t:this.instance_14,p:{regX:1.6,regY:-45.7,scaleX:0.9982,scaleY:0.9982,rotation:12.4833,y:92.15,x:-20.75}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:74.7521,x:47.55,y:-26.4}},{t:this.instance_12,p:{rotation:-8.4354,x:7.95,y:96,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_11,p:{regX:2.3,regY:-53.1,skewX:-2.5357,skewY:177.4643,x:24.75,y:192.25}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9989,scaleY:0.9989,rotation:-3.7521,x:-5.9,y:-57.9,regY:8.8,regX:-1.6}},{t:this.instance_8,p:{skewX:4.8221,skewY:-175.1779,x:-42.5,regX:3,regY:-53.5,y:187.95}},{t:this.instance_7},{t:this.instance_6,p:{regX:0.6,skewX:-2.6688,skewY:177.3312,x:-1.25,y:-77.2,scaleX:0.9988,scaleY:0.9988,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9981,scaleY:0.9981,rotation:53.3165,x:-69.65,y:57.15,regX:40.5}},{t:this.instance_4,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,skewX:-123.7212,skewY:56.2788,x:-119.05,y:-7.25,regY:-8.4}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,skewX:-123.6342,skewY:56.3658,x:-125.15,y:-13.7,regY:-1.4,regX:6.2}},{t:this.instance_2,p:{rotation:-79.6094,x:-55.8,y:-21.6,scaleX:0.9981,scaleY:0.9981,regX:37.8}}]},1).to({state:[{t:this.instance_17,p:{regX:-39.5,rotation:135.8523,x:67.4,y:45.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_16,p:{regX:-6.1,scaleX:0.9982,scaleY:0.9982,skewX:-78.1581,skewY:101.8419,x:7.15,y:99.45,regY:8}},{t:this.instance_15,p:{scaleX:0.9981,scaleY:0.9981,skewX:-54.2622,skewY:125.7378,x:8.5,y:110.9,regX:-4.7,regY:3.4}},{t:this.instance_14,p:{regX:1.6,regY:-45.7,scaleX:0.9982,scaleY:0.9982,rotation:12.4899,y:92.2,x:-20.75}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:75.1821,x:47.6,y:-26.4}},{t:this.instance_12,p:{rotation:-8.4444,x:8,y:96,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_11,p:{regX:2.3,regY:-53.1,skewX:-2.5489,skewY:177.4511,x:24.8,y:192.25}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9989,scaleY:0.9989,rotation:-3.5434,x:-5.95,y:-57.95,regY:8.8,regX:-1.6}},{t:this.instance_8,p:{skewX:4.9312,skewY:-175.0688,x:-42.5,regX:3,regY:-53.5,y:187.95}},{t:this.instance_7},{t:this.instance_6,p:{regX:0.6,skewX:-2.4831,skewY:177.5169,x:-1.15,y:-77.15,scaleX:0.9988,scaleY:0.9988,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9981,scaleY:0.9981,rotation:54.5887,x:-70.55,y:57,regX:40.5}},{t:this.instance_4,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,skewX:-122.4545,skewY:57.5455,x:-118.55,y:-8.45,regY:-8.4}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,skewX:-122.3733,skewY:57.6267,x:-124.5,y:-15.05,regY:-1.4,regX:6.2}},{t:this.instance_2,p:{rotation:-78.9749,x:-55.75,y:-21.8,scaleX:0.9981,scaleY:0.9981,regX:37.9}}]},1).to({state:[{t:this.instance_17,p:{regX:-39.5,rotation:136.2883,x:66.8,y:45.7,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_16,p:{regX:-6.1,scaleX:0.9982,scaleY:0.9982,skewX:-77.7122,skewY:102.2878,x:6.2,y:99.1,regY:8}},{t:this.instance_15,p:{scaleX:0.9981,scaleY:0.9981,skewX:-53.8042,skewY:126.1958,x:7.55,y:110.45,regX:-4.8,regY:3.4}},{t:this.instance_14,p:{regX:1.6,regY:-45.7,scaleX:0.9982,scaleY:0.9982,rotation:12.4969,y:92.25,x:-20.8}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:75.6139,x:47.6,y:-26.45}},{t:this.instance_12,p:{rotation:-8.4542,x:8,y:96,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regX:2.3,regY:-53.1,skewX:-2.562,skewY:177.438,x:24.8,y:192.25}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9989,scaleY:0.9989,rotation:-3.3356,x:-6,y:-57.75,regY:8.9,regX:-1.6}},{t:this.instance_8,p:{skewX:5.041,skewY:-174.959,x:-42.5,regX:3,regY:-53.5,y:187.95}},{t:this.instance_7},{t:this.instance_6,p:{regX:0.6,skewX:-2.2999,skewY:177.7,x:-1.1,y:-77.2,scaleX:0.9989,scaleY:0.9989,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9981,scaleY:0.9981,rotation:55.8595,x:-71.5,y:56.75,regX:40.4}},{t:this.instance_4,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,skewX:-121.1892,skewY:58.8108,x:-117.95,y:-9.65,regY:-8.4}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,skewX:-121.1105,skewY:58.8895,x:-123.85,y:-16.45,regY:-1.5,regX:6.2}},{t:this.instance_2,p:{rotation:-78.3403,x:-55.8,y:-21.6,scaleX:0.9981,scaleY:0.9981,regX:37.8}}]},1).to({state:[{t:this.instance_17,p:{regX:-39.5,rotation:136.7226,x:66.25,y:45.75,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_16,p:{regX:-6.1,scaleX:0.9983,scaleY:0.9983,skewX:-77.2653,skewY:102.7347,x:5.3,y:98.8,regY:8}},{t:this.instance_15,p:{scaleX:0.9981,scaleY:0.9981,skewX:-53.3477,skewY:126.6523,x:6.45,y:110.15,regX:-4.8,regY:3.4}},{t:this.instance_14,p:{regX:1.6,regY:-45.7,scaleX:0.9982,scaleY:0.9982,rotation:12.5031,y:92.25,x:-20.7}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:76.0438,x:47.65,y:-26.45}},{t:this.instance_12,p:{rotation:-8.4621,x:8,y:96,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regX:2.3,regY:-53.2,skewX:-2.5751,skewY:177.4249,x:24.75,y:192.15}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9989,scaleY:0.9989,rotation:-3.127,x:-5.95,y:-57.8,regY:8.9,regX:-1.6}},{t:this.instance_8,p:{skewX:5.1493,skewY:-174.8507,x:-42.5,regX:3,regY:-53.5,y:187.95}},{t:this.instance_7},{t:this.instance_6,p:{regX:0.6,skewX:-2.1142,skewY:177.8857,x:-1.05,y:-77.2,scaleX:0.9989,scaleY:0.9989,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9981,scaleY:0.9981,rotation:57.1318,x:-72.3,y:56.55,regX:40.4}},{t:this.instance_4,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,skewX:-119.9222,skewY:60.0778,x:-117.3,y:-10.9,regY:-8.4}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,skewX:-119.8488,skewY:60.1512,x:-122.95,y:-17.75,regY:-1.4,regX:6.2}},{t:this.instance_2,p:{rotation:-77.7053,x:-55.8,y:-21.6,scaleX:0.998,scaleY:0.998,regX:37.8}}]},1).to({state:[{t:this.instance_17,p:{regX:-39.5,rotation:137.1564,x:65.75,y:45.95,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_16,p:{regX:-6.2,scaleX:0.9982,scaleY:0.9982,skewX:-76.8188,skewY:103.1812,x:4.45,y:98.35,regY:8.1}},{t:this.instance_15,p:{scaleX:0.9981,scaleY:0.9981,skewX:-52.8917,skewY:127.1083,x:5.55,y:109.9,regX:-4.8,regY:3.4}},{t:this.instance_14,p:{regX:1.6,regY:-45.7,scaleX:0.9982,scaleY:0.9982,rotation:12.5103,y:92.25,x:-20.7}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:76.4748,x:47.6,y:-26.45}},{t:this.instance_12,p:{rotation:-8.4701,x:8,y:96,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regX:2.3,regY:-53.2,skewX:-2.5874,skewY:177.4126,x:24.75,y:192.1}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9989,scaleY:0.9989,rotation:-2.9184,x:-5.95,y:-57.75,regY:8.9,regX:-1.6}},{t:this.instance_8,p:{skewX:5.2591,skewY:-174.7409,x:-42.55,regX:3,regY:-53.4,y:188.1}},{t:this.instance_7},{t:this.instance_6,p:{regX:0.6,skewX:-1.9286,skewY:178.0714,x:-0.95,y:-77.3,scaleX:0.9989,scaleY:0.9989,regY:52.7}},{t:this.instance_5,p:{scaleX:0.9981,scaleY:0.9981,rotation:58.4026,x:-73.15,y:56.55,regX:40.5}},{t:this.instance_4,p:{regX:5.1,scaleX:0.9982,scaleY:0.9982,skewX:-118.6555,skewY:61.3445,x:-116.75,y:-12.15,regY:-8.4}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,skewX:-118.5882,skewY:61.4118,x:-122.15,y:-19,regY:-1.4,regX:6.3}},{t:this.instance_2,p:{rotation:-77.0707,x:-55.75,y:-21.65,scaleX:0.9981,scaleY:0.9981,regX:37.8}}]},1).to({state:[{t:this.instance_17,p:{regX:-39.5,rotation:137.5922,x:65.15,y:46.05,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_16,p:{regX:-6,scaleX:0.9983,scaleY:0.9983,skewX:-76.3722,skewY:103.6278,x:3.3,y:98.25,regY:8}},{t:this.instance_15,p:{scaleX:0.9981,scaleY:0.9981,skewX:-52.4355,skewY:127.5645,x:4.5,y:109.5,regX:-4.8,regY:3.4}},{t:this.instance_14,p:{regX:1.6,regY:-45.7,scaleX:0.9982,scaleY:0.9982,rotation:12.5166,y:92.25,x:-20.75}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:76.9065,x:47.65,y:-26.45}},{t:this.instance_12,p:{rotation:-8.4788,x:8.1,y:96,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_11,p:{regX:2.3,regY:-53.2,skewX:-2.6005,skewY:177.3994,x:24.8,y:192.1}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9989,scaleY:0.9989,rotation:-2.709,x:-6,y:-57.75,regY:8.9,regX:-1.6}},{t:this.instance_8,p:{skewX:5.3674,skewY:-174.6325,x:-42.6,regX:3,regY:-53.5,y:187.9}},{t:this.instance_7},{t:this.instance_6,p:{regX:0.6,skewX:-1.7429,skewY:178.2571,x:-0.9,y:-77.25,scaleX:0.9988,scaleY:0.9988,regY:52.7}},{t:this.instance_5,p:{scaleX:0.9981,scaleY:0.9981,rotation:59.6744,x:-74.1,y:56.3,regX:40.5}},{t:this.instance_4,p:{regX:5.1,scaleX:0.9982,scaleY:0.9982,skewX:-117.3915,skewY:62.6085,x:-116.05,y:-13.35,regY:-8.4}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,skewX:-117.3267,skewY:62.6733,x:-121.4,y:-20.3,regY:-1.4,regX:6.2}},{t:this.instance_2,p:{rotation:-76.4354,x:-55.75,y:-21.65,scaleX:0.9981,scaleY:0.9981,regX:37.8}}]},1).to({state:[{t:this.instance_17,p:{regX:-39.5,rotation:138.025,x:64.65,y:46.2,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_16,p:{regX:-6.1,scaleX:0.9982,scaleY:0.9982,skewX:-75.9249,skewY:104.0751,x:2.5,y:97.8,regY:8.1}},{t:this.instance_15,p:{scaleX:0.9981,scaleY:0.9981,skewX:-51.979,skewY:128.021,x:3.45,y:109.2,regX:-4.8,regY:3.4}},{t:this.instance_14,p:{regX:1.6,regY:-45.7,scaleX:0.9982,scaleY:0.9982,rotation:12.5237,y:92.25,x:-20.75}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:77.3369,x:47.6,y:-26.45}},{t:this.instance_12,p:{rotation:-8.4879,x:8.1,y:96,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regX:2.3,regY:-53.2,skewX:-2.6137,skewY:177.3863,x:24.8,y:192.1}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9989,scaleY:0.9989,rotation:-2.5022,x:-5.9,y:-57.95,regY:8.8,regX:-1.6}},{t:this.instance_8,p:{skewX:5.4765,skewY:-174.5234,x:-42.55,regX:3,regY:-53.5,y:187.9}},{t:this.instance_7},{t:this.instance_6,p:{regX:0.6,skewX:-1.5573,skewY:178.4427,x:-0.75,y:-77.2,scaleX:0.9989,scaleY:0.9989,regY:52.7}},{t:this.instance_5,p:{scaleX:0.9981,scaleY:0.9981,rotation:60.9467,x:-74.85,y:56.1,regX:40.5}},{t:this.instance_4,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,skewX:-116.1248,skewY:63.8752,x:-115.3,y:-14.3,regY:-8.4}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,skewX:-116.0647,skewY:63.9353,x:-120.55,y:-21.6,regY:-1.4,regX:6.2}},{t:this.instance_2,p:{rotation:-75.801,x:-55.8,y:-21.65,scaleX:0.9981,scaleY:0.9981,regX:37.8}}]},1).to({state:[{t:this.instance_17,p:{regX:-39.5,rotation:138.4611,x:64.15,y:46.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_16,p:{regX:-6.1,scaleX:0.9983,scaleY:0.9983,skewX:-75.4784,skewY:104.5216,x:1.65,y:97.45,regY:8.1}},{t:this.instance_15,p:{scaleX:0.9981,scaleY:0.9981,skewX:-51.5231,skewY:128.4769,x:2.45,y:108.85,regX:-4.8,regY:3.4}},{t:this.instance_14,p:{regX:1.6,regY:-45.7,scaleX:0.9982,scaleY:0.9982,rotation:12.53,y:92.2,x:-20.75}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:77.7674,x:47.65,y:-26.45}},{t:this.instance_12,p:{rotation:-8.4965,x:8.05,y:96,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_11,p:{regX:2.4,regY:-53.2,skewX:-2.627,skewY:177.373,x:24.7,y:192.15}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9989,scaleY:0.9989,rotation:-2.2928,x:-5.95,y:-57.9,regY:8.8,regX:-1.6}},{t:this.instance_8,p:{skewX:5.5849,skewY:-174.4151,x:-42.55,regX:3,regY:-53.5,y:187.85}},{t:this.instance_7},{t:this.instance_6,p:{regX:0.6,skewX:-1.3717,skewY:178.6283,x:-0.7,y:-77.2,scaleX:0.9989,scaleY:0.9989,regY:52.7}},{t:this.instance_5,p:{scaleX:0.9981,scaleY:0.9981,rotation:62.217,x:-75.8,y:55.75,regX:40.4}},{t:this.instance_4,p:{regX:5.1,scaleX:0.9982,scaleY:0.9982,skewX:-114.8578,skewY:65.1422,x:-114.6,y:-15.55,regY:-8.4}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,skewX:-114.8053,skewY:65.1947,x:-119.6,y:-22.8,regY:-1.4,regX:6.2}},{t:this.instance_2,p:{rotation:-75.166,x:-55.8,y:-21.6,scaleX:0.9981,scaleY:0.9981,regX:37.8}}]},1).to({state:[{t:this.instance_17,p:{regX:-39.5,rotation:138.8949,x:63.55,y:46.5,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_16,p:{regX:-6.1,scaleX:0.9982,scaleY:0.9982,skewX:-75.0319,skewY:104.9681,x:0.55,y:97.05,regY:8}},{t:this.instance_15,p:{scaleX:0.9981,scaleY:0.9981,skewX:-51.0658,skewY:128.9342,x:1.45,y:108.55,regX:-4.8,regY:3.5}},{t:this.instance_14,p:{regX:1.6,regY:-45.7,scaleX:0.9982,scaleY:0.9982,rotation:12.5364,y:92.2,x:-20.8}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:78.199,x:47.65,y:-26.45}},{t:this.instance_12,p:{rotation:-8.5056,x:8.1,y:96,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regX:2.3,regY:-53.2,skewX:-2.64,skewY:177.36,x:24.8,y:192.1}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9989,scaleY:0.9989,rotation:-2.0835,x:-6,y:-57.95,regY:8.8,regX:-1.6}},{t:this.instance_8,p:{skewX:5.6949,skewY:-174.3051,x:-42.6,regX:3,regY:-53.5,y:187.9}},{t:this.instance_7},{t:this.instance_6,p:{regX:0.6,skewX:-1.1861,skewY:178.8139,x:-0.65,y:-77.05,scaleX:0.9989,scaleY:0.9989,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9981,scaleY:0.9981,rotation:63.4886,x:-76.6,y:55.65,regX:40.5}},{t:this.instance_4,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,skewX:-113.5917,skewY:66.4083,x:-113.9,y:-16.5,regY:-8.4}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,skewX:-113.5418,skewY:66.4582,x:-118.8,y:-24,regY:-1.4,regX:6.2}},{t:this.instance_2,p:{rotation:-74.5315,x:-55.85,y:-21.6,scaleX:0.9981,scaleY:0.9981,regX:37.8}}]},1).to({state:[{t:this.instance_17,p:{regX:-39.5,rotation:139.3295,x:63.05,y:46.6,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_16,p:{regX:-6.1,scaleX:0.9982,scaleY:0.9982,skewX:-74.585,skewY:105.415,x:-0.45,y:96.75,regY:8}},{t:this.instance_15,p:{scaleX:0.9981,scaleY:0.9981,skewX:-50.6094,skewY:129.3906,x:0.3,y:108.2,regX:-4.7,regY:3.4}},{t:this.instance_14,p:{regX:1.6,regY:-45.7,scaleX:0.9982,scaleY:0.9982,rotation:12.5436,y:92.2,x:-20.75}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:78.63,x:47.6,y:-26.45}},{t:this.instance_12,p:{rotation:-8.5143,x:8.1,y:96,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_11,p:{regX:2.3,regY:-53.2,skewX:-2.6541,skewY:177.3459,x:24.9,y:192.15}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9989,scaleY:0.9989,rotation:-1.8751,x:-5.95,y:-57.9,regY:8.8,regX:-1.6}},{t:this.instance_8,p:{skewX:5.8031,skewY:-174.1969,x:-42.6,regX:3,regY:-53.5,y:187.9}},{t:this.instance_7},{t:this.instance_6,p:{regX:0.6,skewX:-1.0014,skewY:178.9986,x:-0.55,y:-77.05,scaleX:0.9988,scaleY:0.9988,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9981,scaleY:0.9981,rotation:64.7611,x:-77.5,y:55.4,regX:40.5}},{t:this.instance_4,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,skewX:-112.3264,skewY:67.6736,x:-113.15,y:-17.55,regY:-8.4}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,skewX:-112.2825,skewY:67.7175,x:-117.8,y:-25.1,regY:-1.4,regX:6.2}},{t:this.instance_2,p:{rotation:-73.897,x:-55.8,y:-21.6,scaleX:0.9981,scaleY:0.9981,regX:37.8}}]},1).to({state:[{t:this.instance_17,p:{regX:-39.5,rotation:139.7638,x:62.5,y:46.75,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_16,p:{regX:-6.1,scaleX:0.9982,scaleY:0.9982,skewX:-74.1386,skewY:105.8614,x:-1.35,y:96.4,regY:8}},{t:this.instance_15,p:{scaleX:0.9981,scaleY:0.9981,skewX:-50.1521,skewY:129.8479,x:-0.7,y:107.75,regX:-4.8,regY:3.4}},{t:this.instance_14,p:{regX:1.6,regY:-45.7,scaleX:0.9982,scaleY:0.9982,rotation:12.5498,y:92.2,x:-20.75}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:79.0609,x:47.6,y:-26.5}},{t:this.instance_12,p:{rotation:-8.5223,x:8.1,y:96,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regX:2.3,regY:-53.1,skewX:-2.6673,skewY:177.3327,x:24.9,y:192.2}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9989,scaleY:0.9989,rotation:-1.6675,x:-5.95,y:-57.95,regY:8.8,regX:-1.6}},{t:this.instance_8,p:{skewX:5.9124,skewY:-174.0876,x:-42.6,regX:3,regY:-53.5,y:187.95}},{t:this.instance_7},{t:this.instance_6,p:{regX:0.6,skewX:-0.8158,skewY:179.1842,x:-0.5,y:-77,scaleX:0.9989,scaleY:0.9989,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9981,scaleY:0.9981,rotation:66.0318,x:-78.4,y:55.2,regX:40.5}},{t:this.instance_4,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,skewX:-111.0601,skewY:68.9399,x:-112.3,y:-18.55,regY:-8.3}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,skewX:-111.021,skewY:68.979,x:-116.9,y:-26.25,regY:-1.4,regX:6.2}},{t:this.instance_2,p:{rotation:-73.2617,x:-55.85,y:-21.65,scaleX:0.9981,scaleY:0.9981,regX:37.8}}]},1).to({state:[{t:this.instance_17,p:{regX:-39.5,rotation:140.1991,x:62,y:46.8,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_16,p:{regX:-6.1,scaleX:0.9983,scaleY:0.9983,skewX:-73.6923,skewY:106.3077,x:-2.3,y:96,regY:8}},{t:this.instance_15,p:{scaleX:0.9981,scaleY:0.9981,skewX:-49.6958,skewY:130.3042,x:-1.65,y:107.45,regX:-4.8,regY:3.4}},{t:this.instance_14,p:{regX:1.6,regY:-45.7,scaleX:0.9982,scaleY:0.9982,rotation:12.557,y:92.2,x:-20.8}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:79.4906,x:47.55,y:-26.4}},{t:this.instance_12,p:{rotation:-8.531,x:8.05,y:96,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_11,p:{regX:2.4,regY:-53.1,skewX:-2.6804,skewY:177.3196,x:24.75,y:192.2}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9989,scaleY:0.9989,rotation:-1.4583,x:-6.1,y:-57.95,regY:8.8,regX:-1.7}},{t:this.instance_8,p:{skewX:6.0215,skewY:-173.9785,x:-42.6,regX:3,regY:-53.5,y:187.95}},{t:this.instance_7},{t:this.instance_6,p:{regX:0.6,skewX:-0.6302,skewY:179.3698,x:-0.4,y:-77,scaleX:0.9989,scaleY:0.9989,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9981,scaleY:0.9981,rotation:67.3046,x:-79.25,y:54.95,regX:40.5}},{t:this.instance_4,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,skewX:-109.7939,skewY:70.2061,x:-111.6,y:-19.5,regY:-8.4}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,skewX:-109.7587,skewY:70.2413,x:-115.9,y:-27.4,regY:-1.4,regX:6.2}},{t:this.instance_2,p:{rotation:-72.6263,x:-55.85,y:-21.6,scaleX:0.998,scaleY:0.998,regX:37.8}}]},1).to({state:[{t:this.instance_17,p:{regX:-39.5,rotation:140.6333,x:61.45,y:47,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_16,p:{regX:-6.1,scaleX:0.9982,scaleY:0.9982,skewX:-73.2453,skewY:106.7547,x:-3.15,y:95.6,regY:8}},{t:this.instance_15,p:{scaleX:0.9981,scaleY:0.9981,skewX:-49.2398,skewY:130.7602,x:-2.7,y:107,regX:-4.8,regY:3.4}},{t:this.instance_14,p:{regX:1.6,regY:-45.7,scaleX:0.9982,scaleY:0.9982,rotation:12.5634,y:92.2,x:-20.8}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:79.9215,x:47.7,y:-26.4}},{t:this.instance_12,p:{rotation:-8.5402,x:8.15,y:96,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regX:2.3,regY:-53.1,skewX:-2.6936,skewY:177.3064,x:24.85,y:192.2}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9989,scaleY:0.9989,rotation:-1.249,x:-5.9,y:-57.8,regY:8.9,regX:-1.6}},{t:this.instance_8,p:{skewX:6.1308,skewY:-173.8692,x:-42.65,regX:3,regY:-53.5,y:187.9}},{t:this.instance_7},{t:this.instance_6,p:{regX:0.6,skewX:-0.4446,skewY:179.5554,x:-0.3,y:-76.95,scaleX:0.9989,scaleY:0.9989,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9981,scaleY:0.9981,rotation:68.575,x:-80.1,y:54.7,regX:40.5}},{t:this.instance_4,p:{regX:5.1,scaleX:0.9982,scaleY:0.9982,skewX:-108.5269,skewY:71.4731,x:-110.65,y:-20.6,regY:-8.3}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,skewX:-108.4984,skewY:71.5016,x:-114.9,y:-28.4,regY:-1.4,regX:6.2}},{t:this.instance_2,p:{rotation:-71.993,x:-55.85,y:-21.65,scaleX:0.9981,scaleY:0.9981,regX:37.8}}]},1).to({state:[{t:this.instance_17,p:{regX:-39.5,rotation:141.0672,x:60.85,y:47,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_16,p:{regX:-6.1,scaleX:0.9982,scaleY:0.9982,skewX:-72.7993,skewY:107.2007,x:-4.1,y:95.2,regY:8}},{t:this.instance_15,p:{scaleX:0.9981,scaleY:0.9981,skewX:-48.7828,skewY:131.2172,x:-3.75,y:106.7,regX:-4.7,regY:3.4}},{t:this.instance_14,p:{regX:1.6,regY:-45.7,scaleX:0.9982,scaleY:0.9982,rotation:12.5696,y:92.2,x:-20.7}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:80.3525,x:47.65,y:-26.45}},{t:this.instance_12,p:{rotation:-8.5488,x:8.15,y:96,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_11,p:{regX:2.3,regY:-53.1,skewX:-2.7068,skewY:177.2932,x:24.9,y:192.2}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9989,scaleY:0.9989,rotation:-1.0398,x:-5.9,y:-57.85,regY:8.9,regX:-1.6}},{t:this.instance_8,p:{skewX:6.2384,skewY:-173.7616,x:-42.65,regX:3,regY:-53.5,y:187.95}},{t:this.instance_7},{t:this.instance_6,p:{regX:0.6,skewX:-0.2591,skewY:179.7409,x:-0.35,y:-76.9,scaleX:0.9989,scaleY:0.9989,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9981,scaleY:0.9981,rotation:69.8472,x:-80.9,y:54.4,regX:40.5}},{t:this.instance_4,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,skewX:-107.2603,skewY:72.7397,x:-109.75,y:-21.55,regY:-8.3}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,skewX:-107.2373,skewY:72.7627,x:-113.95,y:-29.45,regY:-1.4,regX:6.2}},{t:this.instance_2,p:{rotation:-71.357,x:-55.85,y:-21.55,scaleX:0.9981,scaleY:0.9981,regX:37.8}}]},1).to({state:[{t:this.instance_17,p:{regX:-39.5,rotation:141.5027,x:60.35,y:47.15,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_16,p:{regX:-6.1,scaleX:0.9983,scaleY:0.9983,skewX:-72.3525,skewY:107.6475,x:-5.05,y:94.8,regY:8}},{t:this.instance_15,p:{scaleX:0.9981,scaleY:0.9981,skewX:-48.3267,skewY:131.6733,x:-4.65,y:106.25,regX:-4.8,regY:3.4}},{t:this.instance_14,p:{regX:1.6,regY:-45.7,scaleX:0.9983,scaleY:0.9983,rotation:12.5766,y:92.25,x:-20.75}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:80.784,x:47.7,y:-26.4}},{t:this.instance_12,p:{rotation:-8.5578,x:8.1,y:96,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regX:2.3,regY:-53.1,skewX:-2.7199,skewY:177.2801,x:24.9,y:192.2}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9989,scaleY:0.9989,rotation:-0.8332,x:-5.95,y:-57.95,regY:8.8,regX:-1.6}},{t:this.instance_8,p:{skewX:6.3476,skewY:-173.6524,x:-42.65,regX:3,regY:-53.5,y:187.95}},{t:this.instance_7},{t:this.instance_6,p:{regX:0.6,skewX:-0.0744,skewY:179.9256,x:-0.25,y:-76.85,scaleX:0.9988,scaleY:0.9989,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9981,scaleY:0.9981,rotation:71.1185,x:-81.7,y:54.15,regX:40.5}},{t:this.instance_4,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,skewX:-105.9945,skewY:74.0055,x:-109,y:-22.35,regY:-8.4}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,skewX:-105.975,skewY:74.025,x:-113,y:-30.45,regY:-1.5,regX:6.2}},{t:this.instance_2,p:{rotation:-70.7215,x:-55.8,y:-21.55,scaleX:0.9981,scaleY:0.9981,regX:37.8}}]},1).to({state:[{t:this.instance_17,p:{regX:-39.5,rotation:141.9362,x:59.8,y:47.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_16,p:{regX:-6.1,scaleX:0.9982,scaleY:0.9982,skewX:-71.9052,skewY:108.0948,x:-5.95,y:94.4,regY:8}},{t:this.instance_15,p:{scaleX:0.9981,scaleY:0.9981,skewX:-47.8701,skewY:132.1299,x:-5.65,y:106,regX:-4.7,regY:3.5}},{t:this.instance_14,p:{regX:1.6,regY:-45.7,scaleX:0.9983,scaleY:0.9983,rotation:12.583,y:92.25,x:-20.75}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:81.2141,x:47.65,y:-26.45}},{t:this.instance_12,p:{rotation:-8.5676,x:8.1,y:96,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regX:2.4,regY:-53.1,skewX:-2.733,skewY:177.267,x:24.8,y:192.2}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9989,scaleY:0.9989,rotation:-0.6232,x:-5.95,y:-58,regY:8.8,regX:-1.6}},{t:this.instance_8,p:{skewX:6.4569,skewY:-173.543,x:-42.65,regX:3,regY:-53.5,y:187.85}},{t:this.instance_7},{t:this.instance_6,p:{regX:0.6,skewX:0.1059,skewY:-179.8941,x:-0.15,y:-76.9,scaleX:0.9988,scaleY:0.9989,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9981,scaleY:0.9981,rotation:72.3905,x:-82.55,y:53.85,regX:40.5}},{t:this.instance_4,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,skewX:-104.7283,skewY:75.2717,x:-108.25,y:-23.3,regY:-8.4}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,skewX:-104.7136,skewY:75.2864,x:-111.85,y:-31.4,regY:-1.4,regX:6.2}},{t:this.instance_2,p:{rotation:-70.0879,x:-55.8,y:-21.6,scaleX:0.9981,scaleY:0.9981,regX:37.8}}]},1).to({state:[{t:this.instance_17,p:{regX:-39.5,rotation:142.3712,x:59.25,y:47.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_16,p:{regX:-6,scaleX:0.9983,scaleY:0.9983,skewX:-71.4587,skewY:108.5413,x:-6.95,y:94.1,regY:8}},{t:this.instance_15,p:{scaleX:0.9981,scaleY:0.9981,skewX:-47.4132,skewY:132.5868,x:-6.65,y:105.45,regX:-4.8,regY:3.4}},{t:this.instance_14,p:{regX:1.6,regY:-45.7,scaleX:0.9983,scaleY:0.9983,rotation:12.5902,y:92.25,x:-20.7}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:81.6455,x:47.65,y:-26.4}},{t:this.instance_12,p:{rotation:-8.5745,x:8.15,y:96,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_11,p:{regX:2.3,regY:-53.1,skewX:-2.7454,skewY:177.2546,x:24.95,y:192.2}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9989,scaleY:0.9989,rotation:-0.4149,x:-5.95,y:-58,regY:8.8,regX:-1.6}},{t:this.instance_8,p:{skewX:6.5662,skewY:-173.4338,x:-42.6,regX:3,regY:-53.5,y:187.9}},{t:this.instance_7},{t:this.instance_6,p:{regX:0.6,skewX:0.2923,skewY:-179.7077,x:-0.1,y:-76.9,scaleX:0.9989,scaleY:0.9989,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9981,scaleY:0.9981,rotation:73.6615,x:-83.5,y:53.55,regX:40.5}},{t:this.instance_4,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,skewX:-103.4625,skewY:76.5375,x:-107.35,y:-24.15,regY:-8.4}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,skewX:-103.453,skewY:76.547,x:-110.75,y:-32.35,regY:-1.4,regX:6.2}},{t:this.instance_2,p:{rotation:-69.4527,x:-55.8,y:-21.65,scaleX:0.998,scaleY:0.998,regX:37.8}}]},1).to({state:[{t:this.instance_17,p:{regX:-39.5,rotation:142.8055,x:58.65,y:47.35,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_16,p:{regX:-6.1,scaleX:0.9982,scaleY:0.9982,skewX:-71.0136,skewY:108.9864,x:-7.8,y:93.55,regY:8}},{t:this.instance_15,p:{scaleX:0.9981,scaleY:0.9981,skewX:-46.957,skewY:133.043,x:-7.65,y:105,regX:-4.8,regY:3.4}},{t:this.instance_14,p:{regX:1.6,regY:-45.7,scaleX:0.9982,scaleY:0.9982,rotation:12.5957,y:92.25,x:-20.7}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:82.0764,x:47.65,y:-26.4}},{t:this.instance_12,p:{rotation:-8.5835,x:8.15,y:96,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regX:2.3,regY:-53.1,skewX:-2.7585,skewY:177.2415,x:25,y:192.2}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9989,scaleY:0.9989,rotation:-0.2057,x:-5.95,y:-57.95,regY:8.8,regX:-1.6}},{t:this.instance_8,p:{skewX:6.6748,skewY:-173.3252,x:-42.65,regX:3,regY:-53.5,y:187.9}},{t:this.instance_7},{t:this.instance_6,p:{regX:0.6,skewX:0.4779,skewY:-179.5221,x:0,y:-76.85,scaleX:0.9989,scaleY:0.9989,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9981,scaleY:0.9981,rotation:74.9338,x:-84.25,y:53.25,regX:40.5}},{t:this.instance_4,p:{regX:5.1,scaleX:0.9982,scaleY:0.9982,skewX:-102.1976,skewY:77.8024,x:-106.4,y:-25.05,regY:-8.4}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,skewX:-102.1908,skewY:77.8092,x:-109.7,y:-33.25,regY:-1.4,regX:6.2}},{t:this.instance_2,p:{rotation:-68.818,x:-55.85,y:-21.6,scaleX:0.9981,scaleY:0.9981,regX:37.8}}]},1).to({state:[{t:this.instance_17,p:{regX:-39.5,rotation:143.2389,x:58.2,y:47.55,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_16,p:{regX:-6.2,scaleX:0.9982,scaleY:0.9982,skewX:-70.5657,skewY:109.4343,x:-8.65,y:93.1,regY:8.1}},{t:this.instance_15,p:{scaleX:0.9981,scaleY:0.9981,skewX:-46.5009,skewY:133.4991,x:-8.65,y:104.7,regX:-4.8,regY:3.4}},{t:this.instance_14,p:{regX:1.6,regY:-45.7,scaleX:0.9982,scaleY:0.9982,rotation:12.6027,y:92.25,x:-20.8}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:82.5066,x:47.7,y:-26.4}},{t:this.instance_12,p:{rotation:-8.5922,x:8.1,y:96,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_11,p:{regX:2.3,regY:-53.1,skewX:-2.7716,skewY:177.2284,x:25.05,y:192.15}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9989,scaleY:0.9989,rotation:-0.0009,x:-5.9,y:-58,regY:8.8,regX:-1.6}},{t:this.instance_8,p:{skewX:6.7824,skewY:-173.2176,x:-42.6,regX:2.9,regY:-53.5,y:187.85}},{t:this.instance_7},{t:this.instance_6,p:{regX:0.6,skewX:0.6617,skewY:-179.3383,x:0.15,y:-76.85,scaleX:0.9989,scaleY:0.9989,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9981,scaleY:0.9981,rotation:76.2045,x:-85.15,y:52.8,regX:40.4}},{t:this.instance_4,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,skewX:-100.9298,skewY:79.0702,x:-105.5,y:-25.75,regY:-8.4}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,skewX:-100.9299,skewY:79.0701,x:-108.6,y:-34.1,regY:-1.4,regX:6.2}},{t:this.instance_2,p:{rotation:-68.1828,x:-55.85,y:-21.65,scaleX:0.9981,scaleY:0.9981,regX:37.8}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-146.5,-369,263.5,676);


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

	// Character
	this.instance = new lib.CachedBmp_886();
	this.instance.setTransform(-86.65,-342.4,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_885();
	this.instance_1.setTransform(-120.9,-365.25,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(42));

	// Armature_1
	this.instance_2 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_2.setTransform(-57.3,-23.1,0.9982,0.9982,-52.5305,0,0,35.5,0.1);

	this.instance_3 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_3.setTransform(-189.95,65.9,0.9982,0.9982,0,149.3464,-30.6536,6.5,-1.4);

	this.instance_4 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_4.setTransform(-181.55,65.5,0.9983,0.9983,0,-176.0779,3.9221,5.5,-9.1);

	this.instance_5 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_5.setTransform(-102.05,36,0.9983,0.9983,-19.1943,0,0,44,0);

	this.instance_6 = new lib.ch1_uBodycopy("synched",0);
	this.instance_6.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_7 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_7.setTransform(-48.25,180.7,0.9982,0.9982,0,1.5137,-178.4863,1.8,-55.5);

	this.instance_8 = new lib.ch1_lBodycopy("synched",0);
	this.instance_8.setTransform(-5.6,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_9 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_9.setTransform(18.7,189.5,0.9978,0.9978,0,-14.3909,165.6091,3.2,-53.2);

	this.instance_10 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_10.setTransform(16.25,92.35,0.9978,0.9978,-2.433,0,0,-1.1,1.6);

	this.instance_11 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_11.setTransform(3.9,111.15,0.9983,0.9983,0,-45.8719,134.1281,-4.9,3.4);

	this.instance_12 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_12.setTransform(8,101,0.9984,0.9984,0,-49.0214,130.9786,-5.9,8.4);

	this.instance_13 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_13.setTransform(66.9,41.25,0.9983,0.9983,132.418,0,0,-39.7,-1.1);

	this.instance_14 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_14.setTransform(48.15,-26.2,0.9983,0.9983,74.2057,0,0,-31.1,-1.6);

	this.instance_15 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_15.setTransform(-31.1,87.35,0.9983,0.9983,9.9668,0,0,1.7,-45.9);

	this.instance_16 = new lib.ch1_headcopy("synched",0);
	this.instance_16.setTransform(-0.85,-79.45,0.999,0.999,0,-6.4938,173.5062,-0.1,52.8);

	this.instance_17 = new lib.ch1_neckcopy("synched",0);
	this.instance_17.setTransform(-5.65,-57.65,0.9991,0.9991,-2.4677,0,0,-1.2,9.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_17,p:{scaleX:0.9991,scaleY:0.9991,rotation:-2.4677,x:-5.65,y:-57.65,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-6.4938,skewY:173.5062,x:-0.85,y:-79.45}},{t:this.instance_15,p:{regX:1.7,regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:9.9668,y:87.35,x:-31.1}},{t:this.instance_14,p:{rotation:74.2057,x:48.15,y:-26.2,regY:-1.6,scaleX:0.9983,scaleY:0.9983,regX:-31.1}},{t:this.instance_13,p:{regX:-39.7,scaleX:0.9983,scaleY:0.9983,rotation:132.418,x:66.9,y:41.25,regY:-1.1}},{t:this.instance_12,p:{regY:8.4,scaleX:0.9984,scaleY:0.9984,skewX:-49.0214,skewY:130.9786,x:8,y:101,regX:-5.9}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,skewX:-45.8719,skewY:134.1281,x:3.9,y:111.15,regX:-4.9,regY:3.4}},{t:this.instance_10,p:{regX:-1.1,rotation:-2.433,x:16.25,y:92.35}},{t:this.instance_9,p:{regX:3.2,scaleX:0.9978,scaleY:0.9978,x:18.7,y:189.5,skewX:-14.3909,skewY:165.6091}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:1.5137,skewY:-178.4863,x:-48.25,y:180.7,regX:1.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9983,scaleY:0.9983,rotation:-19.1943,x:-102.05,y:36,regY:0}},{t:this.instance_4,p:{regY:-9.1,scaleY:0.9983,skewX:-176.0779,skewY:3.9221,x:-181.55,y:65.5,scaleX:0.9983}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:149.3464,skewY:-30.6536,x:-189.95,y:65.9,regX:6.5}},{t:this.instance_2,p:{rotation:-52.5305,x:-57.3,scaleX:0.9982,scaleY:0.9982,y:-23.1,regX:35.5}}]}).to({state:[{t:this.instance_17,p:{scaleX:0.999,scaleY:0.999,rotation:-2.7175,x:-5.6,y:-57.6,regY:9.1}},{t:this.instance_16,p:{scaleX:0.9989,scaleY:0.9989,skewX:-6.591,skewY:173.409,x:-0.9,y:-79.4}},{t:this.instance_15,p:{regX:1.6,regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:9.9666,y:87.4,x:-31.1}},{t:this.instance_14,p:{rotation:74.1172,x:48.1,y:-26.25,regY:-1.6,scaleX:0.9983,scaleY:0.9983,regX:-31.1}},{t:this.instance_13,p:{regX:-39.6,scaleX:0.9982,scaleY:0.9982,rotation:131.5595,x:66.85,y:41.2,regY:-1.1}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9983,scaleY:0.9983,skewX:-49.882,skewY:130.118,x:9.25,y:101.95,regX:-5.9}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,skewX:-46.7318,skewY:133.2682,x:5.05,y:112.1,regX:-4.9,regY:3.4}},{t:this.instance_10,p:{regX:-1.2,rotation:-2.4314,x:16.1,y:92.3}},{t:this.instance_9,p:{regX:3.3,scaleX:0.9977,scaleY:0.9977,x:18.55,y:189.4,skewX:-14.3909,skewY:165.6091}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,skewX:1.5129,skewY:-178.4871,x:-48.2,y:180.65,regX:1.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,rotation:-17.8425,x:-100.5,y:37.15,regY:0}},{t:this.instance_4,p:{regY:-9.2,scaleY:0.9982,skewX:-174.729,skewY:5.2709,x:-180.8,y:64.75,scaleX:0.9983}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,skewX:150.6968,skewY:-29.3032,x:-189.05,y:64.9,regX:6.5}},{t:this.instance_2,p:{rotation:-54.0239,x:-57.35,scaleX:0.9982,scaleY:0.9982,y:-23.1,regX:35.5}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.999,scaleY:0.999,rotation:-2.969,x:-5.65,y:-57.65,regY:9.1}},{t:this.instance_16,p:{scaleX:0.9989,scaleY:0.9989,skewX:-6.6888,skewY:173.3112,x:-1,y:-79.45}},{t:this.instance_15,p:{regX:1.6,regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:9.9666,y:87.4,x:-31.1}},{t:this.instance_14,p:{rotation:74.0287,x:48.05,y:-26.25,regY:-1.6,scaleX:0.9983,scaleY:0.9983,regX:-31.1}},{t:this.instance_13,p:{regX:-39.6,scaleX:0.9982,scaleY:0.9982,rotation:130.6991,x:67.05,y:41.15,regY:-1.1}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9983,scaleY:0.9983,skewX:-50.7415,skewY:129.2585,x:10.3,y:102.8,regX:-5.9}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,skewX:-47.5908,skewY:132.4092,x:6.15,y:112.95,regX:-4.8,regY:3.4}},{t:this.instance_10,p:{regX:-1.2,rotation:-2.4314,x:16.1,y:92.3}},{t:this.instance_9,p:{regX:3.3,scaleX:0.9977,scaleY:0.9977,x:18.55,y:189.4,skewX:-14.3909,skewY:165.6091}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,skewX:1.5129,skewY:-178.4871,x:-48.2,y:180.65,regX:1.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,rotation:-16.4915,x:-98.95,y:38.25,regY:0}},{t:this.instance_4,p:{regY:-9.2,scaleY:0.9983,skewX:-173.3773,skewY:6.6227,x:-179.8,y:63.95,scaleX:0.9983}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,skewX:152.0477,skewY:-27.9523,x:-188.1,y:63.95,regX:6.5}},{t:this.instance_2,p:{rotation:-55.5185,x:-57.35,scaleX:0.9981,scaleY:0.9981,y:-23.05,regX:35.5}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.999,scaleY:0.999,rotation:-3.2206,x:-5.65,y:-57.6,regY:9.1}},{t:this.instance_16,p:{scaleX:0.9989,scaleY:0.9989,skewX:-6.7875,skewY:173.2125,x:-1.05,y:-79.5}},{t:this.instance_15,p:{regX:1.6,regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:9.9666,y:87.4,x:-31.15}},{t:this.instance_14,p:{rotation:73.9395,x:48.05,y:-26.25,regY:-1.6,scaleX:0.9983,scaleY:0.9983,regX:-31.1}},{t:this.instance_13,p:{regX:-39.6,scaleX:0.9982,scaleY:0.9982,rotation:129.839,x:67.05,y:41.15,regY:-1.1}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9983,scaleY:0.9983,skewX:-51.6012,skewY:128.3988,x:11.2,y:103.6,regX:-5.9}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,skewX:-48.4503,skewY:131.5497,x:7.45,y:113.75,regX:-4.9,regY:3.4}},{t:this.instance_10,p:{regX:-1.2,rotation:-2.4314,x:16.1,y:92.3}},{t:this.instance_9,p:{regX:3.3,scaleX:0.9977,scaleY:0.9977,x:18.55,y:189.4,skewX:-14.3909,skewY:165.6091}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,skewX:1.5129,skewY:-178.4871,x:-48.2,y:180.65,regX:1.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,rotation:-15.1415,x:-97.25,y:39.3,regY:0}},{t:this.instance_4,p:{regY:-9.2,scaleY:0.9982,skewX:-172.0273,skewY:7.9727,x:-178.75,y:63.1,scaleX:0.9982}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,skewX:153.3985,skewY:-26.6015,x:-186.9,y:62.85,regX:6.6}},{t:this.instance_2,p:{rotation:-57.0125,x:-57.3,scaleX:0.9982,scaleY:0.9982,y:-23.05,regX:35.5}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.999,scaleY:0.999,rotation:-3.473,x:-5.65,y:-57.7,regY:9.1}},{t:this.instance_16,p:{scaleX:0.9989,scaleY:0.9989,skewX:-6.8861,skewY:173.1138,x:-1.2,y:-79.45}},{t:this.instance_15,p:{regX:1.6,regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:9.9666,y:87.4,x:-31.15}},{t:this.instance_14,p:{rotation:73.8511,x:48.05,y:-26.25,regY:-1.6,scaleX:0.9983,scaleY:0.9983,regX:-31.1}},{t:this.instance_13,p:{regX:-39.6,scaleX:0.9982,scaleY:0.9982,rotation:128.9785,x:67.15,y:41.1,regY:-1.1}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9983,scaleY:0.9983,skewX:-52.4605,skewY:127.5395,x:12.25,y:104.45,regX:-5.9}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,skewX:-49.3106,skewY:130.6894,x:8.5,y:114.7,regX:-4.8,regY:3.4}},{t:this.instance_10,p:{regX:-1.2,rotation:-2.4314,x:16.1,y:92.3}},{t:this.instance_9,p:{regX:3.3,scaleX:0.9977,scaleY:0.9977,x:18.55,y:189.4,skewX:-14.3909,skewY:165.6091}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,skewX:1.5129,skewY:-178.4871,x:-48.2,y:180.65,regX:1.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9983,scaleY:0.9983,rotation:-13.7909,x:-95.7,y:40.3,regY:0}},{t:this.instance_4,p:{regY:-9.2,scaleY:0.9982,skewX:-170.6769,skewY:9.3231,x:-177.7,y:62.2,scaleX:0.9982}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,skewX:154.7494,skewY:-25.2506,x:-186,y:61.8,regX:6.5}},{t:this.instance_2,p:{rotation:-58.506,x:-57.35,scaleX:0.9982,scaleY:0.9982,y:-23.05,regX:35.4}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.999,scaleY:0.999,rotation:-3.7229,x:-5.65,y:-57.55,regY:9.1}},{t:this.instance_16,p:{scaleX:0.9989,scaleY:0.9989,skewX:-6.985,skewY:173.015,x:-1.25,y:-79.45}},{t:this.instance_15,p:{regX:1.6,regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:9.9666,y:87.4,x:-31.15}},{t:this.instance_14,p:{rotation:73.7626,x:48.05,y:-26.25,regY:-1.6,scaleX:0.9983,scaleY:0.9983,regX:-31.1}},{t:this.instance_13,p:{regX:-39.6,scaleX:0.9982,scaleY:0.9982,rotation:128.119,x:67.25,y:41.1,regY:-1.1}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9983,scaleY:0.9983,skewX:-53.3212,skewY:126.6788,x:13.3,y:105.2,regX:-5.9}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,skewX:-50.1707,skewY:129.8293,x:9.75,y:115.5,regX:-4.8,regY:3.4}},{t:this.instance_10,p:{regX:-1.2,rotation:-2.4305,x:16.1,y:92.3}},{t:this.instance_9,p:{regX:3.3,scaleX:0.9977,scaleY:0.9977,x:18.5,y:189.45,skewX:-14.3909,skewY:165.6091}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,skewX:1.5129,skewY:-178.4871,x:-48.2,y:180.65,regX:1.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,rotation:-12.4402,x:-93.95,y:41.25,regY:0}},{t:this.instance_4,p:{regY:-9.2,scaleY:0.9982,skewX:-169.3253,skewY:10.6746,x:-176.5,y:61.2,scaleX:0.9982}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,skewX:156.1009,skewY:-23.8991,x:-184.8,y:60.6,regX:6.5}},{t:this.instance_2,p:{rotation:-59.9993,x:-57.35,scaleX:0.9982,scaleY:0.9982,y:-23.05,regX:35.5}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.999,scaleY:0.999,rotation:-3.9747,x:-5.65,y:-57.55,regY:9.1}},{t:this.instance_16,p:{scaleX:0.9989,scaleY:0.9989,skewX:-7.083,skewY:172.917,x:-1.35,y:-79.5}},{t:this.instance_15,p:{regX:1.6,regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:9.9666,y:87.4,x:-31.15}},{t:this.instance_14,p:{rotation:73.6745,x:48,y:-26.25,regY:-1.6,scaleX:0.9983,scaleY:0.9983,regX:-31.1}},{t:this.instance_13,p:{regX:-39.6,scaleX:0.9982,scaleY:0.9982,rotation:127.2584,x:67.4,y:41.05,regY:-1.1}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9983,scaleY:0.9983,skewX:-54.1797,skewY:125.8203,x:14.35,y:105.85,regX:-5.9}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,skewX:-51.0312,skewY:128.9688,x:11.15,y:116.3,regX:-4.9,regY:3.4}},{t:this.instance_10,p:{regX:-1.2,rotation:-2.4305,x:16.1,y:92.3}},{t:this.instance_9,p:{regX:3.3,scaleX:0.9977,scaleY:0.9977,x:18.5,y:189.45,skewX:-14.3895,skewY:165.6105}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,skewX:1.512,skewY:-178.488,x:-48.2,y:180.65,regX:1.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9983,scaleY:0.9983,rotation:-11.0875,x:-92.25,y:42.2,regY:0}},{t:this.instance_4,p:{regY:-9.2,scaleY:0.9982,skewX:-167.9753,skewY:12.0247,x:-175.25,y:60.3,scaleX:0.9982}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,skewX:157.4505,skewY:-22.5495,x:-183.55,y:59.4,regX:6.5}},{t:this.instance_2,p:{rotation:-61.4941,x:-57.35,scaleX:0.9982,scaleY:0.9982,y:-23.1,regX:35.5}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.999,scaleY:0.999,rotation:-4.2265,x:-5.65,y:-57.55,regY:9.1}},{t:this.instance_16,p:{scaleX:0.9989,scaleY:0.9989,skewX:-7.1817,skewY:172.8183,x:-1.4,y:-79.5}},{t:this.instance_15,p:{regX:1.6,regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:9.9666,y:87.4,x:-31.15}},{t:this.instance_14,p:{rotation:73.5864,x:48.15,y:-26.35,regY:-1.7,scaleX:0.9983,scaleY:0.9983,regX:-31.1}},{t:this.instance_13,p:{regX:-39.6,scaleX:0.9982,scaleY:0.9982,rotation:126.3994,x:67.55,y:41.1,regY:-1.2}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9983,scaleY:0.9983,skewX:-55.0402,skewY:124.9598,x:15.45,y:106.65,regX:-5.9}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,skewX:-51.8907,skewY:128.1093,x:12.25,y:117.05,regX:-4.9,regY:3.4}},{t:this.instance_10,p:{regX:-1.2,rotation:-2.4305,x:16.1,y:92.3}},{t:this.instance_9,p:{regX:3.3,scaleX:0.9977,scaleY:0.9977,x:18.5,y:189.45,skewX:-14.3895,skewY:165.6105}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,skewX:1.512,skewY:-178.488,x:-48.2,y:180.65,regX:1.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.7385,x:-90.55,y:43.05,regY:0}},{t:this.instance_4,p:{regY:-9.2,scaleY:0.9982,skewX:-166.6227,skewY:13.3773,x:-173.9,y:59.2,scaleX:0.9982}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,skewX:158.8017,skewY:-21.1983,x:-182.15,y:58.05,regX:6.5}},{t:this.instance_2,p:{rotation:-62.988,x:-57.3,scaleX:0.9982,scaleY:0.9982,y:-23.1,regX:35.5}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.999,scaleY:0.999,rotation:-4.4775,x:-5.6,y:-57.55,regY:9.1}},{t:this.instance_16,p:{scaleX:0.9989,scaleY:0.9989,skewX:-7.2796,skewY:172.7204,x:-1.5,y:-79.5}},{t:this.instance_15,p:{regX:1.6,regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:9.9666,y:87.4,x:-31.15}},{t:this.instance_14,p:{rotation:73.4969,x:48.15,y:-26.3,regY:-1.7,scaleX:0.9982,scaleY:0.9982,regX:-31.1}},{t:this.instance_13,p:{regX:-39.6,scaleX:0.9982,scaleY:0.9982,rotation:125.5397,x:67.6,y:41.05,regY:-1.1}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9983,scaleY:0.9983,skewX:-55.8999,skewY:124.1001,x:16.6,y:107.4,regX:-5.9}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,skewX:-52.7498,skewY:127.2502,x:13.6,y:117.85,regX:-4.9,regY:3.4}},{t:this.instance_10,p:{regX:-1.2,rotation:-2.4305,x:16.1,y:92.3}},{t:this.instance_9,p:{regX:3.3,scaleX:0.9977,scaleY:0.9977,x:18.5,y:189.45,skewX:-14.3895,skewY:165.6105}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,skewX:1.512,skewY:-178.488,x:-48.2,y:180.65,regX:1.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9983,scaleY:0.9983,rotation:-8.3869,x:-88.85,y:43.9,regY:0}},{t:this.instance_4,p:{regY:-9.2,scaleY:0.9982,skewX:-165.2734,skewY:14.7266,x:-172.6,y:58.1,scaleX:0.9982}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,skewX:160.1541,skewY:-19.8459,x:-180.85,y:56.75,regX:6.5}},{t:this.instance_2,p:{rotation:-64.4816,x:-57.3,scaleX:0.9982,scaleY:0.9982,y:-23.15,regX:35.5}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.999,scaleY:0.999,rotation:-4.7287,x:-5.6,y:-57.6,regY:9.1}},{t:this.instance_16,p:{scaleX:0.9989,scaleY:0.9989,skewX:-7.3784,skewY:172.6216,x:-1.6,y:-79.55}},{t:this.instance_15,p:{regX:1.6,regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:9.9666,y:87.4,x:-31.15}},{t:this.instance_14,p:{rotation:73.4074,x:48.15,y:-26.3,regY:-1.7,scaleX:0.9982,scaleY:0.9982,regX:-31.1}},{t:this.instance_13,p:{regX:-39.6,scaleX:0.9982,scaleY:0.9982,rotation:124.6805,x:67.7,y:40.95,regY:-1.1}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9983,scaleY:0.9983,skewX:-56.7605,skewY:123.2395,x:17.75,y:108.15,regX:-5.9}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,skewX:-53.6095,skewY:126.3905,x:14.85,y:118.6,regX:-4.9,regY:3.4}},{t:this.instance_10,p:{regX:-1.2,rotation:-2.4305,x:16.1,y:92.3}},{t:this.instance_9,p:{regX:3.3,scaleX:0.9977,scaleY:0.9977,x:18.5,y:189.45,skewX:-14.3895,skewY:165.6105}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,skewX:1.512,skewY:-178.488,x:-48.2,y:180.65,regX:1.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.0355,x:-87.05,y:44.65,regY:0}},{t:this.instance_4,p:{regY:-9.2,scaleY:0.9983,skewX:-163.9229,skewY:16.0771,x:-171.1,y:56.8,scaleX:0.9983}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,skewX:161.5036,skewY:-18.4964,x:-179.35,y:55.4,regX:6.5}},{t:this.instance_2,p:{rotation:-65.9763,x:-57.3,scaleX:0.9982,scaleY:0.9982,y:-23.05,regX:35.5}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.999,scaleY:0.999,rotation:-4.9807,x:-5.6,y:-57.55,regY:9.1}},{t:this.instance_16,p:{scaleX:0.9989,scaleY:0.9989,skewX:-7.4764,skewY:172.5236,x:-1.7,y:-79.55}},{t:this.instance_15,p:{regX:1.6,regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:9.9666,y:87.4,x:-31.15}},{t:this.instance_14,p:{rotation:73.3195,x:48.2,y:-26.3,regY:-1.7,scaleX:0.9982,scaleY:0.9982,regX:-31.1}},{t:this.instance_13,p:{regX:-39.7,scaleX:0.9982,scaleY:0.9982,rotation:123.8198,x:67.8,y:40.9,regY:-1.1}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9983,scaleY:0.9983,skewX:-57.6205,skewY:122.3795,x:18.9,y:108.85,regX:-5.9}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,skewX:-54.4693,skewY:125.5307,x:16.1,y:119.25,regX:-4.9,regY:3.3}},{t:this.instance_10,p:{regX:-1.2,rotation:-2.4296,x:16.1,y:92.3}},{t:this.instance_9,p:{regX:3.3,scaleX:0.9977,scaleY:0.9977,x:18.5,y:189.45,skewX:-14.3895,skewY:165.6105}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,skewX:1.512,skewY:-178.488,x:-48.15,y:180.65,regX:1.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9983,scaleY:0.9983,rotation:-5.6863,x:-85.35,y:45.4,regY:0}},{t:this.instance_4,p:{regY:-9.2,scaleY:0.9982,skewX:-162.571,skewY:17.429,x:-169.6,y:55.65,scaleX:0.9982}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,skewX:162.856,skewY:-17.144,x:-177.75,y:53.95,regX:6.5}},{t:this.instance_2,p:{rotation:-67.4704,x:-57.25,scaleX:0.9982,scaleY:0.9982,y:-23.15,regX:35.5}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.999,scaleY:0.999,rotation:-5.2319,x:-5.65,y:-57.55,regY:9.1}},{t:this.instance_16,p:{scaleX:0.9989,scaleY:0.9989,skewX:-7.5743,skewY:172.4255,x:-1.8,y:-79.55}},{t:this.instance_15,p:{regX:1.6,regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:9.9666,y:87.4,x:-31.15}},{t:this.instance_14,p:{rotation:73.2309,x:48.15,y:-26.35,regY:-1.7,scaleX:0.9983,scaleY:0.9983,regX:-31.1}},{t:this.instance_13,p:{regX:-39.6,scaleX:0.9982,scaleY:0.9982,rotation:122.9598,x:67.85,y:40.95,regY:-1.1}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9983,scaleY:0.9983,skewX:-58.4798,skewY:121.5202,x:20.05,y:109.55,regX:-5.9}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,skewX:-55.3298,skewY:124.6702,x:17.45,y:120.15,regX:-4.9,regY:3.4}},{t:this.instance_10,p:{regX:-1.2,rotation:-2.4296,x:16.1,y:92.3}},{t:this.instance_9,p:{regX:3.3,scaleX:0.9977,scaleY:0.9977,x:18.5,y:189.45,skewX:-14.3895,skewY:165.6105}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,skewX:1.5111,skewY:-178.4889,x:-48.15,y:180.65,regX:1.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,rotation:-4.3341,x:-83.5,y:46.15,regY:0}},{t:this.instance_4,p:{regY:-9.2,scaleY:0.9982,skewX:-161.2208,skewY:18.7792,x:-168,y:54.35,scaleX:0.9982}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,skewX:164.2061,skewY:-15.7939,x:-176.05,y:52.4,regX:6.6}},{t:this.instance_2,p:{rotation:-68.9645,x:-57.35,scaleX:0.9982,scaleY:0.9982,y:-23.1,regX:35.5}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.999,scaleY:0.999,rotation:-5.4826,x:-5.65,y:-57.55,regY:9.1}},{t:this.instance_16,p:{scaleX:0.9989,scaleY:0.9989,skewX:-7.6725,skewY:172.3275,x:-1.85,y:-79.6}},{t:this.instance_15,p:{regX:1.6,regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:9.9666,y:87.4,x:-31.15}},{t:this.instance_14,p:{rotation:73.1414,x:48.1,y:-26.25,regY:-1.6,scaleX:0.9983,scaleY:0.9983,regX:-31.1}},{t:this.instance_13,p:{regX:-39.7,scaleX:0.9982,scaleY:0.9982,rotation:122.1012,x:68.05,y:40.9,regY:-1.2}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9983,scaleY:0.9983,skewX:-59.3398,skewY:120.6602,x:21.15,y:110.3,regX:-5.9}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,skewX:-56.1885,skewY:123.8115,x:18.7,y:120.85,regX:-4.9,regY:3.4}},{t:this.instance_10,p:{regX:-1.2,rotation:-2.4296,x:16.1,y:92.3}},{t:this.instance_9,p:{regX:3.3,scaleX:0.9977,scaleY:0.9977,x:18.45,y:189.45,skewX:-14.3895,skewY:165.6105}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,skewX:1.5111,skewY:-178.4889,x:-48.15,y:180.65,regX:1.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9983,scaleY:0.9983,rotation:-2.9843,x:-81.7,y:46.75,regY:0}},{t:this.instance_4,p:{regY:-9.2,scaleY:0.9983,skewX:-159.8704,skewY:20.1296,x:-166.35,y:52.95,scaleX:0.9983}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,skewX:165.558,skewY:-14.442,x:-174.35,y:50.9,regX:6.6}},{t:this.instance_2,p:{rotation:-70.4576,x:-57.3,scaleX:0.9982,scaleY:0.9982,y:-23.05,regX:35.5}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.999,scaleY:0.999,rotation:-5.7358,x:-5.6,y:-57.55,regY:9.1}},{t:this.instance_16,p:{scaleX:0.9989,scaleY:0.9989,skewX:-7.7705,skewY:172.2295,x:-1.95,y:-79.65}},{t:this.instance_15,p:{regX:1.6,regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:9.9664,y:87.4,x:-31.15}},{t:this.instance_14,p:{rotation:73.0555,x:48.1,y:-26.25,regY:-1.6,scaleX:0.9983,scaleY:0.9983,regX:-31.1}},{t:this.instance_13,p:{regX:-39.7,scaleX:0.9982,scaleY:0.9982,rotation:121.24,x:68.1,y:40.75,regY:-1.1}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9983,scaleY:0.9983,skewX:-60.2005,skewY:119.7995,x:22.35,y:110.9,regX:-5.9}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,skewX:-57.0496,skewY:122.9504,x:20.1,y:121.5,regX:-4.9,regY:3.4}},{t:this.instance_10,p:{regX:-1.2,rotation:-2.4296,x:16.1,y:92.3}},{t:this.instance_9,p:{regX:3.3,scaleX:0.9977,scaleY:0.9977,x:18.45,y:189.45,skewX:-14.3895,skewY:165.6105}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,skewX:1.5111,skewY:-178.4889,x:-48.15,y:180.65,regX:1.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.6327,x:-79.85,y:47.35,regY:0}},{t:this.instance_4,p:{regY:-9.2,scaleY:0.9982,skewX:-158.5201,skewY:21.4799,x:-164.65,y:51.6,scaleX:0.9982}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,skewX:166.9092,skewY:-13.0908,x:-172.75,y:49.35,regX:6.5}},{t:this.instance_2,p:{rotation:-71.9517,x:-57.25,scaleX:0.9982,scaleY:0.9982,y:-23.05,regX:35.5}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.999,scaleY:0.999,rotation:-5.9865,x:-5.6,y:-57.5,regY:9.1}},{t:this.instance_16,p:{scaleX:0.9989,scaleY:0.9989,skewX:-7.8686,skewY:172.1314,x:-2.05,y:-79.6}},{t:this.instance_15,p:{regX:1.6,regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:9.9664,y:87.4,x:-31.15}},{t:this.instance_14,p:{rotation:72.9663,x:48.1,y:-26.25,regY:-1.6,scaleX:0.9983,scaleY:0.9983,regX:-31.1}},{t:this.instance_13,p:{regX:-39.6,scaleX:0.9982,scaleY:0.9982,rotation:120.3806,x:68.15,y:40.85,regY:-1.1}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9983,scaleY:0.9983,skewX:-61.0592,skewY:118.9408,x:23.45,y:111.55,regX:-5.9}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,skewX:-57.9092,skewY:122.0908,x:21.45,y:122.15,regX:-4.9,regY:3.4}},{t:this.instance_10,p:{regX:-1.2,rotation:-2.4296,x:16.1,y:92.3}},{t:this.instance_9,p:{regX:3.3,scaleX:0.9977,scaleY:0.9977,x:18.45,y:189.45,skewX:-14.3886,skewY:165.6114}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,skewX:1.5111,skewY:-178.4889,x:-48.15,y:180.65,regX:1.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9983,scaleY:0.9983,rotation:-0.2811,x:-78,y:47.95,regY:0}},{t:this.instance_4,p:{regY:-9.2,scaleY:0.9982,skewX:-157.1687,skewY:22.8313,x:-162.9,y:50.2,scaleX:0.9982}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,skewX:168.2599,skewY:-11.7401,x:-170.85,y:47.7,regX:6.5}},{t:this.instance_2,p:{rotation:-73.4463,x:-57.3,scaleX:0.9982,scaleY:0.9982,y:-23.05,regX:35.5}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.999,scaleY:0.999,rotation:-6.2383,x:-5.6,y:-57.5,regY:9.1}},{t:this.instance_16,p:{scaleX:0.9989,scaleY:0.9989,skewX:-7.9675,skewY:172.0325,x:-2.1,y:-79.65}},{t:this.instance_15,p:{regX:1.6,regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:9.9664,y:87.4,x:-31.15}},{t:this.instance_14,p:{rotation:72.8765,x:48.1,y:-26.25,regY:-1.6,scaleX:0.9982,scaleY:0.9982,regX:-31.1}},{t:this.instance_13,p:{regX:-39.6,scaleX:0.9982,scaleY:0.9982,rotation:119.5205,x:68.25,y:40.85,regY:-1.1}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9983,scaleY:0.9983,skewX:-61.9198,skewY:118.0802,x:24.65,y:112.2,regX:-5.9}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,skewX:-58.7689,skewY:121.2311,x:22.8,y:122.8,regX:-4.9,regY:3.4}},{t:this.instance_10,p:{regX:-1.2,rotation:-2.4287,x:16.1,y:92.3}},{t:this.instance_9,p:{regX:3.3,scaleX:0.9977,scaleY:0.9977,x:18.45,y:189.45,skewX:-14.3886,skewY:165.6114}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,skewX:1.5103,skewY:-178.4897,x:-48.15,y:180.65,regX:1.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9983,scaleY:0.9983,rotation:1.0642,x:-76.15,y:48.4,regY:0}},{t:this.instance_4,p:{regY:-9.2,scaleY:0.9982,skewX:-155.8163,skewY:24.1837,x:-161.05,y:48.75,scaleX:0.9982}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,skewX:169.6094,skewY:-10.3906,x:-168.85,y:45.95,regX:6.6}},{t:this.instance_2,p:{rotation:-74.9406,x:-57.35,scaleX:0.9982,scaleY:0.9982,y:-23.05,regX:35.5}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.999,scaleY:0.999,rotation:-6.4893,x:-5.6,y:-57.4,regY:9.2}},{t:this.instance_16,p:{scaleX:0.9989,scaleY:0.9989,skewX:-8.0666,skewY:171.9334,x:-2.2,y:-79.7}},{t:this.instance_15,p:{regX:1.6,regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:9.9664,y:87.4,x:-31.15}},{t:this.instance_14,p:{rotation:72.7885,x:48,y:-26.25,regY:-1.6,scaleX:0.9982,scaleY:0.9982,regX:-31.1}},{t:this.instance_13,p:{regX:-39.6,scaleX:0.9982,scaleY:0.9982,rotation:118.6603,x:68.35,y:40.8,regY:-1.1}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9983,scaleY:0.9983,skewX:-62.7789,skewY:117.2211,x:25.85,y:112.75,regX:-5.9}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,skewX:-59.629,skewY:120.371,x:24.1,y:123.45,regX:-4.9,regY:3.4}},{t:this.instance_10,p:{regX:-1.2,rotation:-2.4287,x:16.1,y:92.3}},{t:this.instance_9,p:{regX:3.3,scaleX:0.9977,scaleY:0.9977,x:18.45,y:189.45,skewX:-14.3886,skewY:165.6114}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,skewX:1.5103,skewY:-178.4897,x:-48.15,y:180.65,regX:1.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9983,scaleY:0.9983,rotation:2.4153,x:-74.25,y:48.85,regY:0}},{t:this.instance_4,p:{regY:-9.2,scaleY:0.9982,skewX:-154.4671,skewY:25.5329,x:-159.2,y:47.15,scaleX:0.9982}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,skewX:170.9612,skewY:-9.0388,x:-167.05,y:44.3,regX:6.5}},{t:this.instance_2,p:{rotation:-76.4351,x:-57.3,scaleX:0.9982,scaleY:0.9982,y:-23.1,regX:35.5}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.999,scaleY:0.999,rotation:-6.7403,x:-5.6,y:-57.4,regY:9.2}},{t:this.instance_16,p:{scaleX:0.9989,scaleY:0.9989,skewX:-8.1646,skewY:171.8354,x:-2.25,y:-79.65}},{t:this.instance_15,p:{regX:1.6,regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:9.9664,y:87.35,x:-31.15}},{t:this.instance_14,p:{rotation:72.6995,x:47.95,y:-26.25,regY:-1.6,scaleX:0.9982,scaleY:0.9982,regX:-31.1}},{t:this.instance_13,p:{regX:-39.6,scaleX:0.9982,scaleY:0.9982,rotation:117.8005,x:68.45,y:40.8,regY:-1.1}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9983,scaleY:0.9983,skewX:-63.639,skewY:116.361,x:27,y:113.35,regX:-5.9}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,skewX:-60.4891,skewY:119.5109,x:25.45,y:124.05,regX:-4.9,regY:3.4}},{t:this.instance_10,p:{regX:-1.2,rotation:-2.4287,x:16.1,y:92.3}},{t:this.instance_9,p:{regX:3.3,scaleX:0.9977,scaleY:0.9977,x:18.45,y:189.45,skewX:-14.3886,skewY:165.6114}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,skewX:1.5103,skewY:-178.4897,x:-48.15,y:180.65,regX:1.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9983,scaleY:0.9983,rotation:3.7668,x:-72.4,y:49.3,regY:0}},{t:this.instance_4,p:{regY:-9.2,scaleY:0.9982,skewX:-153.1161,skewY:26.8839,x:-157.25,y:45.55,scaleX:0.9982}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,skewX:172.3133,skewY:-7.6867,x:-164.9,y:42.45,regX:6.6}},{t:this.instance_2,p:{rotation:-77.9281,x:-57.35,scaleX:0.9982,scaleY:0.9982,y:-23.1,regX:35.5}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.999,scaleY:0.999,rotation:-6.9933,x:-5.65,y:-57.6,regY:9.1}},{t:this.instance_16,p:{scaleX:0.9989,scaleY:0.9989,skewX:-8.2637,skewY:171.7363,x:-2.4,y:-79.7}},{t:this.instance_15,p:{regX:1.6,regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:9.9656,y:87.35,x:-31.15}},{t:this.instance_14,p:{rotation:72.6117,x:47.95,y:-26.4,regY:-1.6,scaleX:0.9983,scaleY:0.9983,regX:-31.2}},{t:this.instance_13,p:{regX:-39.7,scaleX:0.9982,scaleY:0.9982,rotation:116.9411,x:68.65,y:40.7,regY:-1.2}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9983,scaleY:0.9983,skewX:-64.4984,skewY:115.5016,x:28.25,y:114,regX:-5.9}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,skewX:-61.3484,skewY:118.6516,x:26.8,y:124.7,regX:-4.9,regY:3.4}},{t:this.instance_10,p:{regX:-1.2,rotation:-2.4287,x:16.05,y:92.3}},{t:this.instance_9,p:{regX:3.3,scaleX:0.9977,scaleY:0.9977,x:18.4,y:189.45,skewX:-14.3886,skewY:165.6114}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,skewX:1.5103,skewY:-178.4897,x:-48.15,y:180.6,regX:1.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9983,scaleY:0.9983,rotation:5.1171,x:-70.45,y:49.65,regY:0}},{t:this.instance_4,p:{regY:-9.2,scaleY:0.9982,skewX:-151.7654,skewY:28.2346,x:-155.25,y:43.95,scaleX:0.9982}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,skewX:173.6627,skewY:-6.3373,x:-162.9,y:40.75,regX:6.5}},{t:this.instance_2,p:{rotation:-79.4235,x:-57.25,scaleX:0.9982,scaleY:0.9982,y:-23.15,regX:35.5}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.999,scaleY:0.999,rotation:-6.787,x:-5.6,y:-57.4,regY:9.2}},{t:this.instance_16,p:{scaleX:0.9989,scaleY:0.9989,skewX:-8.1806,skewY:171.8194,x:-2.35,y:-79.65}},{t:this.instance_15,p:{regX:1.6,regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:9.9549,y:87.45,x:-31.2}},{t:this.instance_14,p:{rotation:72.6932,x:47.95,y:-26.4,regY:-1.6,scaleX:0.9982,scaleY:0.9982,regX:-31.2}},{t:this.instance_13,p:{regX:-39.6,scaleX:0.9982,scaleY:0.9982,rotation:117.6368,x:68.45,y:40.8,regY:-1.1}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9983,scaleY:0.9983,skewX:-63.8172,skewY:116.1828,x:27.25,y:113.45,regX:-5.9}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,skewX:-60.6777,skewY:119.3223,x:25.7,y:124.25,regX:-4.8,regY:3.4}},{t:this.instance_10,p:{regX:-1.2,rotation:-2.4226,x:16.1,y:92.3}},{t:this.instance_9,p:{regX:3.3,scaleX:0.9977,scaleY:0.9977,x:18.4,y:189.45,skewX:-14.3895,skewY:165.6105}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,skewX:1.4901,skewY:-178.5098,x:-48.15,y:180.7,regX:1.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9983,scaleY:0.9983,rotation:4.0478,x:-72,y:49.35,regY:0}},{t:this.instance_4,p:{regY:-9.2,scaleY:0.9982,skewX:-152.8447,skewY:27.1553,x:-156.8,y:45.25,scaleX:0.9982}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,skewX:172.5934,skewY:-7.4066,x:-164.4,y:42.1,regX:6.6}},{t:this.instance_2,p:{rotation:-78.2613,x:-57.3,scaleX:0.9982,scaleY:0.9982,y:-23.1,regX:35.5}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.999,scaleY:0.999,rotation:-6.5826,x:-5.6,y:-57.4,regY:9.2}},{t:this.instance_16,p:{scaleX:0.9989,scaleY:0.9989,skewX:-8.1001,skewY:171.8999,x:-2.2,y:-79.65}},{t:this.instance_15,p:{regX:1.6,regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:9.9453,y:87.45,x:-31.15}},{t:this.instance_14,p:{rotation:72.7743,x:48.05,y:-26.25,regY:-1.6,scaleX:0.9983,scaleY:0.9983,regX:-31.1}},{t:this.instance_13,p:{regX:-39.7,scaleX:0.9982,scaleY:0.9982,rotation:118.3315,x:68.4,y:40.65,regY:-1.1}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9983,scaleY:0.9983,skewX:-63.1345,skewY:116.8655,x:26.25,y:113.05,regX:-5.9}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,skewX:-60.0073,skewY:119.9927,x:24.5,y:123.65,regX:-4.9,regY:3.3}},{t:this.instance_10,p:{regX:-1.2,rotation:-2.4164,x:16.1,y:92.3}},{t:this.instance_9,p:{regX:3.3,scaleX:0.9977,scaleY:0.9977,x:18.4,y:189.45,skewX:-14.3909,skewY:165.6091}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,skewX:1.4708,skewY:-178.5292,x:-48.2,y:180.65,regX:1.9}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9983,scaleY:0.9983,rotation:2.979,x:-73.45,y:49.1,regY:0}},{t:this.instance_4,p:{regY:-9.1,scaleY:0.9982,skewX:-153.9222,skewY:26.0778,x:-158.25,y:46.4,scaleX:0.9982}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,skewX:171.523,skewY:-8.477,x:-166.15,y:43.55,regX:6.5}},{t:this.instance_2,p:{rotation:-77.0993,x:-57.35,scaleX:0.9982,scaleY:0.9982,y:-23.1,regX:35.5}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.999,scaleY:0.999,rotation:-6.3782,x:-5.6,y:-57.4,regY:9.2}},{t:this.instance_16,p:{scaleX:0.9989,scaleY:0.9989,skewX:-8.018,skewY:171.982,x:-2.2,y:-79.7}},{t:this.instance_15,p:{regX:1.6,regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:9.9355,y:87.45,x:-31.15}},{t:this.instance_14,p:{rotation:72.8563,x:48.1,y:-26.25,regY:-1.6,scaleX:0.9983,scaleY:0.9983,regX:-31.1}},{t:this.instance_13,p:{regX:-39.6,scaleX:0.9982,scaleY:0.9982,rotation:119.0253,x:68.3,y:40.85,regY:-1.1}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9983,scaleY:0.9983,skewX:-62.4507,skewY:117.5493,x:25.2,y:112.5,regX:-5.9}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,skewX:-59.3377,skewY:120.6623,x:23.5,y:123.3,regX:-4.9,regY:3.4}},{t:this.instance_10,p:{regX:-1.2,rotation:-2.4103,x:16.1,y:92.3}},{t:this.instance_9,p:{regX:3.3,scaleX:0.9977,scaleY:0.9977,x:18.45,y:189.45,skewX:-14.3914,skewY:165.6086}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,skewX:1.4516,skewY:-178.5484,x:-48.05,y:180.65,regX:1.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9983,scaleY:0.9983,rotation:1.9087,x:-74.85,y:48.7,regY:0}},{t:this.instance_4,p:{regY:-9.2,scaleY:0.9982,skewX:-154.9999,skewY:25.0001,x:-159.8,y:47.7,scaleX:0.9982}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,skewX:170.4543,skewY:-9.5457,x:-167.7,y:45,regX:6.5}},{t:this.instance_2,p:{rotation:-75.9389,x:-57.35,scaleX:0.9981,scaleY:0.9981,y:-23.1,regX:35.5}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.999,scaleY:0.999,rotation:-6.174,x:-5.65,y:-57.5,regY:9.1}},{t:this.instance_16,p:{scaleX:0.9989,scaleY:0.9989,skewX:-7.9366,skewY:172.0634,x:-2.1,y:-79.6}},{t:this.instance_15,p:{regX:1.6,regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:9.9265,y:87.45,x:-31.15}},{t:this.instance_14,p:{rotation:72.938,x:48.15,y:-26.35,regY:-1.7,scaleX:0.9983,scaleY:0.9983,regX:-31.1}},{t:this.instance_13,p:{regX:-39.6,scaleX:0.9982,scaleY:0.9982,rotation:119.721,x:68.2,y:40.85,regY:-1.1}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9983,scaleY:0.9983,skewX:-61.7678,skewY:118.2322,x:24.35,y:112.05,regX:-5.9}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,skewX:-58.667,skewY:121.333,x:22.4,y:122.65,regX:-4.9,regY:3.4}},{t:this.instance_10,p:{regX:-1.2,rotation:-2.4041,x:16.1,y:92.3}},{t:this.instance_9,p:{regX:3.3,scaleX:0.9977,scaleY:0.9977,x:18.45,y:189.45,skewX:-14.3931,skewY:165.6069}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,skewX:1.4314,skewY:-178.5686,x:-48.05,y:180.7,regX:1.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,rotation:0.8382,x:-76.35,y:48.35,regY:0}},{t:this.instance_4,p:{regY:-9.2,scaleY:0.9982,skewX:-156.0782,skewY:23.9218,x:-161.25,y:49.05,scaleX:0.9982}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,skewX:169.3851,skewY:-10.6149,x:-169.2,y:46.3,regX:6.5}},{t:this.instance_2,p:{rotation:-74.7771,x:-57.3,scaleX:0.9982,scaleY:0.9982,y:-23.05,regX:35.5}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.999,scaleY:0.999,rotation:-5.9706,x:-5.65,y:-57.55,regY:9.1}},{t:this.instance_16,p:{scaleX:0.9989,scaleY:0.9989,skewX:-7.8553,skewY:172.1447,x:-2.05,y:-79.6}},{t:this.instance_15,p:{regX:1.6,regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:9.9169,y:87.45,x:-31.15}},{t:this.instance_14,p:{rotation:73.0195,x:48.15,y:-26.3,regY:-1.7,scaleX:0.9983,scaleY:0.9983,regX:-31.1}},{t:this.instance_13,p:{regX:-39.7,scaleX:0.9982,scaleY:0.9982,rotation:120.4167,x:68.15,y:40.8,regY:-1.1}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9983,scaleY:0.9983,skewX:-61.0843,skewY:118.9157,x:23.35,y:111.5,regX:-5.9}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,skewX:-57.9967,skewY:122.0033,x:21.3,y:122.15,regX:-4.9,regY:3.4}},{t:this.instance_10,p:{regX:-1.2,rotation:-2.3989,x:16.05,y:92.3}},{t:this.instance_9,p:{regX:3.3,scaleX:0.9977,scaleY:0.9977,x:18.45,y:189.45,skewX:-14.3937,skewY:165.6063}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,skewX:1.4113,skewY:-178.5887,x:-48.05,y:180.65,regX:1.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9983,scaleY:0.9983,rotation:-0.2268,x:-77.8,y:48,regY:0}},{t:this.instance_4,p:{regY:-9.2,scaleY:0.9982,skewX:-157.1557,skewY:22.8443,x:-162.7,y:50.2,scaleX:0.9982}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,skewX:168.3137,skewY:-11.6863,x:-170.65,y:47.7,regX:6.5}},{t:this.instance_2,p:{rotation:-73.6154,x:-57.3,scaleX:0.9982,scaleY:0.9982,y:-23.05,regX:35.5}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.999,scaleY:0.999,rotation:-5.7656,x:-5.6,y:-57.6,regY:9.1}},{t:this.instance_16,p:{scaleX:0.9989,scaleY:0.9989,skewX:-7.774,skewY:172.226,x:-1.9,y:-79.65}},{t:this.instance_15,p:{regX:1.6,regY:-45.9,scaleX:0.9982,scaleY:0.9982,rotation:9.9071,y:87.25,x:-31.1}},{t:this.instance_14,p:{rotation:73.1001,x:48.15,y:-26.3,regY:-1.7,scaleX:0.9983,scaleY:0.9983,regX:-31.1}},{t:this.instance_13,p:{regX:-39.7,scaleX:0.9982,scaleY:0.9982,rotation:121.1114,x:68.1,y:40.75,regY:-1.1}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9983,scaleY:0.9983,skewX:-60.4021,skewY:119.5979,x:22.4,y:111.05,regX:-5.9}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,skewX:-57.3263,skewY:122.6737,x:20.1,y:121.6,regX:-4.9,regY:3.3}},{t:this.instance_10,p:{regX:-1.2,rotation:-2.3928,x:16.05,y:92.3}},{t:this.instance_9,p:{regX:3.3,scaleX:0.9977,scaleY:0.9977,x:18.45,y:189.45,skewX:-14.395,skewY:165.605}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,skewX:1.392,skewY:-178.608,x:-48,y:180.65,regX:1.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9983,scaleY:0.9983,rotation:-1.2963,x:-79.25,y:47.55,regY:0}},{t:this.instance_4,p:{regY:-9.2,scaleY:0.9982,skewX:-158.2347,skewY:21.7653,x:-164.05,y:51.35,scaleX:0.9982}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,skewX:167.2452,skewY:-12.7548,x:-172.05,y:48.95,regX:6.5}},{t:this.instance_2,p:{rotation:-72.4542,x:-57.3,scaleX:0.9982,scaleY:0.9982,y:-23.05,regX:35.5}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.999,scaleY:0.999,rotation:-5.5616,x:-5.6,y:-57.55,regY:9.1}},{t:this.instance_16,p:{scaleX:0.9989,scaleY:0.9989,skewX:-7.6928,skewY:172.3072,x:-1.9,y:-79.65}},{t:this.instance_15,p:{regX:1.6,regY:-45.9,scaleX:0.9982,scaleY:0.9982,rotation:9.8965,y:87.25,x:-31.15}},{t:this.instance_14,p:{rotation:73.181,x:48.05,y:-26.25,regY:-1.6,scaleX:0.9983,scaleY:0.9983,regX:-31.1}},{t:this.instance_13,p:{regX:-39.6,scaleX:0.9982,scaleY:0.9982,rotation:121.8061,x:67.95,y:40.95,regY:-1.1}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9983,scaleY:0.9983,skewX:-59.719,skewY:120.281,x:21.35,y:110.45,regX:-5.9}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,skewX:-56.6549,skewY:123.3451,x:19.15,y:121.05,regX:-4.9,regY:3.4}},{t:this.instance_10,p:{regX:-1.2,rotation:-2.3884,x:16.05,y:92.3}},{t:this.instance_9,p:{regX:3.3,scaleX:0.9977,scaleY:0.9977,x:18.45,y:189.45,skewX:-14.3958,skewY:165.6042}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,skewX:1.3727,skewY:-178.6273,x:-48,y:180.7,regX:1.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9983,scaleY:0.9983,rotation:-2.3662,x:-80.7,y:47.1,regY:0}},{t:this.instance_4,p:{regY:-9.2,scaleY:0.9982,skewX:-159.3125,skewY:20.6875,x:-165.4,y:52.45,scaleX:0.9982}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,skewX:166.1749,skewY:-13.8251,x:-173.5,y:50.25,regX:6.5}},{t:this.instance_2,p:{rotation:-71.2931,x:-57.3,scaleX:0.9982,scaleY:0.9982,y:-23.05,regX:35.5}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.999,scaleY:0.999,rotation:-5.3576,x:-5.65,y:-57.55,regY:9.1}},{t:this.instance_16,p:{scaleX:0.9989,scaleY:0.9989,skewX:-7.6106,skewY:172.3894,x:-1.8,y:-79.55}},{t:this.instance_15,p:{regX:1.6,regY:-45.9,scaleX:0.9982,scaleY:0.9982,rotation:9.8867,y:87.25,x:-31.15}},{t:this.instance_14,p:{rotation:73.263,x:48.05,y:-26.3,regY:-1.6,scaleX:0.9983,scaleY:0.9983,regX:-31.1}},{t:this.instance_13,p:{regX:-39.6,scaleX:0.9982,scaleY:0.9982,rotation:122.5016,x:67.85,y:40.95,regY:-1.1}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9983,scaleY:0.9983,skewX:-59.0358,skewY:120.9642,x:20.55,y:109.95,regX:-5.9}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,skewX:-55.9847,skewY:124.0153,x:18,y:120.45,regX:-4.9,regY:3.3}},{t:this.instance_10,p:{regX:-1.2,rotation:-2.3813,x:16.05,y:92.3}},{t:this.instance_9,p:{regX:3.3,scaleX:0.9977,scaleY:0.9977,x:18.4,y:189.45,skewX:-14.3973,skewY:165.6027}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,skewX:1.3526,skewY:-178.6474,x:-48,y:180.65,regX:1.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9983,scaleY:0.9983,rotation:-3.436,x:-82.05,y:46.6,regY:0}},{t:this.instance_4,p:{regY:-9.2,scaleY:0.9982,skewX:-160.3907,skewY:19.6093,x:-166.7,y:53.5,scaleX:0.9982}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,skewX:165.1063,skewY:-14.8937,x:-174.85,y:51.5,regX:6.5}},{t:this.instance_2,p:{rotation:-70.1315,x:-57.25,scaleX:0.9982,scaleY:0.9982,y:-23.1,regX:35.5}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.999,scaleY:0.999,rotation:-5.152,x:-5.6,y:-57.55,regY:9.1}},{t:this.instance_16,p:{scaleX:0.9989,scaleY:0.9989,skewX:-7.5294,skewY:172.4706,x:-1.75,y:-79.55}},{t:this.instance_15,p:{regX:1.6,regY:-45.9,scaleX:0.9982,scaleY:0.9982,rotation:9.8777,y:87.3,x:-31.15}},{t:this.instance_14,p:{rotation:73.3445,x:48.1,y:-26.25,regY:-1.6,scaleX:0.9983,scaleY:0.9983,regX:-31.1}},{t:this.instance_13,p:{regX:-39.6,scaleX:0.9982,scaleY:0.9982,rotation:123.1967,x:67.7,y:40.95,regY:-1.1}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9983,scaleY:0.9983,skewX:-58.3536,skewY:121.6464,x:19.55,y:109.45,regX:-5.9}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,skewX:-55.3149,skewY:124.6851,x:17,y:119.95,regX:-4.9,regY:3.4}},{t:this.instance_10,p:{regX:-1.2,rotation:-2.3752,x:16.1,y:92.3}},{t:this.instance_9,p:{regX:3.3,scaleX:0.9977,scaleY:0.9977,x:18.4,y:189.45,skewX:-14.3984,skewY:165.6016}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,skewX:1.3324,skewY:-178.6676,x:-48,y:180.65,regX:1.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,rotation:-4.5054,x:-83.45,y:46.15,regY:0}},{t:this.instance_4,p:{regY:-9.2,scaleY:0.9982,skewX:-161.4695,skewY:18.5305,x:-168,y:54.6,scaleX:0.9982}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,skewX:164.0358,skewY:-15.9642,x:-176,y:52.75,regX:6.6}},{t:this.instance_2,p:{rotation:-68.97,x:-57.35,scaleX:0.9982,scaleY:0.9982,y:-23.1,regX:35.5}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.999,scaleY:0.999,rotation:-4.9473,x:-5.6,y:-57.55,regY:9.1}},{t:this.instance_16,p:{scaleX:0.9989,scaleY:0.9989,skewX:-7.4499,skewY:172.5501,x:-1.6,y:-79.6}},{t:this.instance_15,p:{regX:1.6,regY:-45.9,scaleX:0.9982,scaleY:0.9982,rotation:9.8679,y:87.3,x:-31.1}},{t:this.instance_14,p:{rotation:73.4259,x:48.05,y:-26.25,regY:-1.6,scaleX:0.9982,scaleY:0.9982,regX:-31.1}},{t:this.instance_13,p:{regX:-39.6,scaleX:0.9982,scaleY:0.9982,rotation:123.8912,x:67.65,y:41,regY:-1.1}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9983,scaleY:0.9983,skewX:-57.6705,skewY:122.3295,x:18.6,y:108.75,regX:-6}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,skewX:-54.6451,skewY:125.3549,x:15.95,y:119.3,regX:-4.9,regY:3.4}},{t:this.instance_10,p:{regX:-1.2,rotation:-2.3691,x:16.05,y:92.3}},{t:this.instance_9,p:{regX:3.3,scaleX:0.9977,scaleY:0.9977,x:18.4,y:189.45,skewX:-14.3995,skewY:165.6005}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,skewX:1.3114,skewY:-178.6886,x:-48,y:180.7,regX:1.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,rotation:-5.5754,x:-84.9,y:45.6,regY:0}},{t:this.instance_4,p:{regY:-9.2,scaleY:0.9982,skewX:-162.548,skewY:17.452,x:-169.2,y:55.65,scaleX:0.9982}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,skewX:162.9668,skewY:-17.0332,x:-177.4,y:53.95,regX:6.5}},{t:this.instance_2,p:{rotation:-67.8086,x:-57.25,scaleX:0.9982,scaleY:0.9982,y:-23.05,regX:35.5}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.999,scaleY:0.999,rotation:-4.7426,x:-5.6,y:-57.6,regY:9.1}},{t:this.instance_16,p:{scaleX:0.9989,scaleY:0.9989,skewX:-7.3688,skewY:172.6312,x:-1.6,y:-79.55}},{t:this.instance_15,p:{regX:1.6,regY:-45.9,scaleX:0.9982,scaleY:0.9982,rotation:9.858,y:87.3,x:-31.05}},{t:this.instance_14,p:{rotation:73.508,x:48.05,y:-26.25,regY:-1.6,scaleX:0.9983,scaleY:0.9983,regX:-31.1}},{t:this.instance_13,p:{regX:-39.6,scaleX:0.9982,scaleY:0.9982,rotation:124.5865,x:67.55,y:41,regY:-1.1}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9983,scaleY:0.9983,skewX:-56.9871,skewY:123.0129,x:17.7,y:108.3,regX:-5.9}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,skewX:-53.9737,skewY:126.0263,x:14.9,y:118.75,regX:-4.9,regY:3.4}},{t:this.instance_10,p:{regX:-1.2,rotation:-2.3629,x:16.05,y:92.3}},{t:this.instance_9,p:{regX:3.3,scaleX:0.9977,scaleY:0.9977,x:18.4,y:189.45,skewX:-14.4001,skewY:165.5999}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,skewX:1.2921,skewY:-178.7079,x:-47.95,y:180.65,regX:1.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9983,scaleY:0.9983,rotation:-6.6448,x:-86.25,y:45.05,regY:0}},{t:this.instance_4,p:{regY:-9.2,scaleY:0.9982,skewX:-163.6263,skewY:16.3737,x:-170.45,y:56.6,scaleX:0.9982}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,skewX:161.8963,skewY:-18.1037,x:-178.6,y:55.1,regX:6.5}},{t:this.instance_2,p:{rotation:-66.6486,x:-57.25,scaleX:0.9982,scaleY:0.9982,y:-23.1,regX:35.5}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.999,scaleY:0.999,rotation:-4.538,x:-5.7,y:-57.55,regY:9.1}},{t:this.instance_16,p:{scaleX:0.9989,scaleY:0.9989,skewX:-7.2875,skewY:172.7125,x:-1.5,y:-79.5}},{t:this.instance_15,p:{regX:1.6,regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:9.8473,y:87.4,x:-31.15}},{t:this.instance_14,p:{rotation:73.5892,x:48.15,y:-26.35,regY:-1.7,scaleX:0.9982,scaleY:0.9982,regX:-31.1}},{t:this.instance_13,p:{regX:-39.6,scaleX:0.9982,scaleY:0.9982,rotation:125.2828,x:67.5,y:41.1,regY:-1.1}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9983,scaleY:0.9983,skewX:-56.3048,skewY:123.6952,x:16.8,y:107.7,regX:-5.9}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,skewX:-53.3028,skewY:126.6972,x:13.8,y:118.15,regX:-4.9,regY:3.4}},{t:this.instance_10,p:{regX:-1.2,rotation:-2.3568,x:16.1,y:92.35}},{t:this.instance_9,p:{regX:3.3,scaleX:0.9977,scaleY:0.9977,x:18.4,y:189.45,skewX:-14.4009,skewY:165.5991}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,skewX:1.272,skewY:-178.728,x:-47.95,y:180.7,regX:1.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9983,scaleY:0.9983,rotation:-7.7136,x:-87.6,y:44.4,regY:0}},{t:this.instance_4,p:{regY:-9.2,scaleY:0.9982,skewX:-164.704,skewY:15.296,x:-171.5,y:57.6,scaleX:0.9982}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,skewX:160.8268,skewY:-19.1732,x:-179.7,y:56.15,regX:6.5}},{t:this.instance_2,p:{rotation:-65.4871,x:-57.3,scaleX:0.9982,scaleY:0.9982,y:-23.05,regX:35.5}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.999,scaleY:0.999,rotation:-4.3353,x:-5.6,y:-57.6,regY:9.1}},{t:this.instance_16,p:{scaleX:0.9989,scaleY:0.9989,skewX:-7.2055,skewY:172.7945,x:-1.5,y:-79.5}},{t:this.instance_15,p:{regX:1.6,regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:9.8376,y:87.35,x:-31.15}},{t:this.instance_14,p:{rotation:73.6698,x:48,y:-26.25,regY:-1.6,scaleX:0.9983,scaleY:0.9983,regX:-31.1}},{t:this.instance_13,p:{regX:-39.6,scaleX:0.9982,scaleY:0.9982,rotation:125.9777,x:67.35,y:41.05,regY:-1.1}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9983,scaleY:0.9983,skewX:-55.6223,skewY:124.3777,x:15.95,y:107.15,regX:-5.9}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,skewX:-52.6323,skewY:127.3677,x:12.8,y:117.5,regX:-4.9,regY:3.4}},{t:this.instance_10,p:{regX:-1.2,rotation:-2.3507,x:16.1,y:92.35}},{t:this.instance_9,p:{regX:3.3,scaleX:0.9977,scaleY:0.9977,x:18.4,y:189.45,skewX:-14.4022,skewY:165.5978}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,skewX:1.2518,skewY:-178.7482,x:-47.95,y:180.75,regX:1.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9983,scaleY:0.9983,rotation:-8.7844,x:-89,y:43.8,regY:0}},{t:this.instance_4,p:{regY:-9.2,scaleY:0.9982,skewX:-165.783,skewY:14.217,x:-172.65,y:58.55,scaleX:0.9982}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,skewX:159.7565,skewY:-20.2435,x:-180.75,y:57.3,regX:6.6}},{t:this.instance_2,p:{rotation:-64.3253,x:-57.3,scaleX:0.9982,scaleY:0.9982,y:-23.1,regX:35.5}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.999,scaleY:0.999,rotation:-4.1299,x:-5.6,y:-57.55,regY:9.1}},{t:this.instance_16,p:{scaleX:0.9989,scaleY:0.9989,skewX:-7.1235,skewY:172.8765,x:-1.35,y:-79.5}},{t:this.instance_15,p:{regX:1.6,regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:9.8286,y:87.35,x:-31.15}},{t:this.instance_14,p:{rotation:73.7527,x:48.05,y:-26.25,regY:-1.6,scaleX:0.9983,scaleY:0.9983,regX:-31.1}},{t:this.instance_13,p:{regX:-39.7,scaleX:0.9982,scaleY:0.9982,rotation:126.6718,x:67.35,y:41,regY:-1.1}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9983,scaleY:0.9983,skewX:-54.9389,skewY:125.0611,x:15.05,y:106.55,regX:-5.9}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,skewX:-51.9619,skewY:128.0381,x:11.75,y:116.9,regX:-4.9,regY:3.4}},{t:this.instance_10,p:{regX:-1.2,rotation:-2.3445,x:16.15,y:92.35}},{t:this.instance_9,p:{regX:3.3,scaleX:0.9977,scaleY:0.9977,x:18.4,y:189.45,skewX:-14.4037,skewY:165.5963}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,skewX:1.2317,skewY:-178.7683,x:-47.9,y:180.7,regX:1.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.854,x:-90.35,y:43.15,regY:0}},{t:this.instance_4,p:{regY:-9.2,scaleY:0.9982,skewX:-166.8608,skewY:13.1392,x:-173.75,y:59.5,scaleX:0.9982}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,skewX:158.6877,skewY:-21.3123,x:-182,y:58.4,regX:6.5}},{t:this.instance_2,p:{rotation:-63.1635,x:-57.3,scaleX:0.9982,scaleY:0.9982,y:-23.1,regX:35.5}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.999,scaleY:0.999,rotation:-3.9246,x:-5.65,y:-57.65,regY:9.1}},{t:this.instance_16,p:{scaleX:0.9989,scaleY:0.9989,skewX:-7.0423,skewY:172.9577,x:-1.35,y:-79.5}},{t:this.instance_15,p:{regX:1.6,regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:9.8187,y:87.35,x:-31.1}},{t:this.instance_14,p:{rotation:73.8339,x:48.05,y:-26.25,regY:-1.6,scaleX:0.9983,scaleY:0.9983,regX:-31.1}},{t:this.instance_13,p:{regX:-39.6,scaleX:0.9982,scaleY:0.9982,rotation:127.3667,x:67.2,y:41.1,regY:-1.1}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9983,scaleY:0.9983,skewX:-54.2556,skewY:125.7444,x:14.1,y:105.85,regX:-5.9}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,skewX:-51.2916,skewY:128.7084,x:10.75,y:116.2,regX:-4.9,regY:3.4}},{t:this.instance_10,p:{regX:-1.2,rotation:-2.3383,x:16.1,y:92.35}},{t:this.instance_9,p:{regX:3.3,scaleX:0.9977,scaleY:0.9977,x:18.4,y:189.45,skewX:-14.4046,skewY:165.5954}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,skewX:1.2124,skewY:-178.7876,x:-48.05,y:180.7,regX:1.9}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9983,scaleY:0.9983,rotation:-10.9223,x:-91.7,y:42.6,regY:0.1}},{t:this.instance_4,p:{regY:-9.2,scaleY:0.9983,skewX:-167.9379,skewY:12.0621,x:-174.7,y:60.3,scaleX:0.9983}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,skewX:157.6174,skewY:-22.3826,x:-183,y:59.5,regX:6.5}},{t:this.instance_2,p:{rotation:-62.0024,x:-57.25,scaleX:0.9982,scaleY:0.9982,y:-23.1,regX:35.5}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.999,scaleY:0.999,rotation:-3.7203,x:-5.65,y:-57.6,regY:9.1}},{t:this.instance_16,p:{scaleX:0.9989,scaleY:0.9989,skewX:-6.9612,skewY:173.0388,x:-1.25,y:-79.45}},{t:this.instance_15,p:{regX:1.6,regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:9.8083,y:87.4,x:-31.1}},{t:this.instance_14,p:{rotation:73.9159,x:48.1,y:-26.3,regY:-1.6,scaleX:0.9983,scaleY:0.9983,regX:-31.1}},{t:this.instance_13,p:{regX:-39.6,scaleX:0.9982,scaleY:0.9982,rotation:128.0622,x:67.05,y:41.2,regY:-1.1}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9983,scaleY:0.9983,skewX:-53.5729,skewY:126.4271,x:13.15,y:105.2,regX:-5.9}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,skewX:-50.621,skewY:129.379,x:9.8,y:115.55,regX:-4.9,regY:3.4}},{t:this.instance_10,p:{regX:-1.2,rotation:-2.3332,x:16.1,y:92.35}},{t:this.instance_9,p:{regX:3.3,scaleX:0.9977,scaleY:0.9977,x:18.4,y:189.45,skewX:-14.4058,skewY:165.5942}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,skewX:1.1922,skewY:-178.8078,x:-47.95,y:180.75,regX:1.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9983,scaleY:0.9983,rotation:-11.9913,x:-93,y:41.75,regY:-0.1}},{t:this.instance_4,p:{regY:-9.2,scaleY:0.9983,skewX:-169.0178,skewY:10.9822,x:-175.7,y:61.15,scaleX:0.9983}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,skewX:156.5485,skewY:-23.4515,x:-184,y:60.45,regX:6.5}},{t:this.instance_2,p:{rotation:-60.8418,x:-57.3,scaleX:0.9982,scaleY:0.9982,y:-23.05,regX:35.5}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.999,scaleY:0.999,rotation:-3.5168,x:-5.65,y:-57.65,regY:9.1}},{t:this.instance_16,p:{scaleX:0.9989,scaleY:0.9989,skewX:-6.88,skewY:173.1199,x:-1.2,y:-79.45}},{t:this.instance_15,p:{regX:1.6,regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:9.7985,y:87.4,x:-31.1}},{t:this.instance_14,p:{rotation:73.9971,x:48.2,y:-26.25,regY:-1.7,scaleX:0.9983,scaleY:0.9983,regX:-31.1}},{t:this.instance_13,p:{regX:-39.6,scaleX:0.9982,scaleY:0.9982,rotation:128.7561,x:67.1,y:41.2,regY:-1.2}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9983,scaleY:0.9983,skewX:-52.8901,skewY:127.1099,x:12.3,y:104.65,regX:-5.9}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,skewX:-49.9506,skewY:130.0494,x:8.75,y:114.9,regX:-4.9,regY:3.4}},{t:this.instance_10,p:{regX:-1.2,rotation:-2.327,x:16.1,y:92.35}},{t:this.instance_9,p:{regX:3.3,scaleX:0.9977,scaleY:0.9977,x:18.4,y:189.4,skewX:-14.4067,skewY:165.5933}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,skewX:1.1721,skewY:-178.8279,x:-47.85,y:180.7,regX:1.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,rotation:-13.061,x:-94.35,y:41,regY:0}},{t:this.instance_4,p:{regY:-9.2,scaleY:0.9982,skewX:-170.0952,skewY:9.9048,x:-176.7,y:62,scaleX:0.9982}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,skewX:155.478,skewY:-24.522,x:-184.95,y:61.35,regX:6.5}},{t:this.instance_2,p:{rotation:-59.6798,x:-57.3,scaleX:0.9982,scaleY:0.9982,y:-23.1,regX:35.5}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.999,scaleY:0.999,rotation:-3.3117,x:-5.6,y:-57.6,regY:9.1}},{t:this.instance_16,p:{scaleX:0.9989,scaleY:0.9989,skewX:-6.7981,skewY:173.2019,x:-1.1,y:-79.5}},{t:this.instance_15,p:{regX:1.6,regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:9.7879,y:87.4,x:-31.15}},{t:this.instance_14,p:{rotation:74.0781,x:48.2,y:-26.25,regY:-1.7,scaleX:0.9983,scaleY:0.9983,regX:-31.1}},{t:this.instance_13,p:{regX:-39.6,scaleX:0.9982,scaleY:0.9982,rotation:129.4521,x:66.9,y:41.2,regY:-1.1}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9983,scaleY:0.9983,skewX:-52.2063,skewY:127.7937,x:11.5,y:104,regX:-5.9}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,skewX:-49.2802,skewY:130.7198,x:7.75,y:114.25,regX:-4.9,regY:3.4}},{t:this.instance_10,p:{regX:-1.2,rotation:-2.3208,x:16.1,y:92.35}},{t:this.instance_9,p:{regX:3.3,scaleX:0.9977,scaleY:0.9977,x:18.35,y:189.4,skewX:-14.4082,skewY:165.5918}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,skewX:1.1519,skewY:-178.8481,x:-47.9,y:180.7,regX:1.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9983,scaleY:0.9983,rotation:-14.1301,x:-95.6,y:40.3,regY:0}},{t:this.instance_4,p:{regY:-9.2,scaleY:0.9982,skewX:-171.1738,skewY:8.8262,x:-177.5,y:62.8,scaleX:0.9982}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,skewX:154.4089,skewY:-25.5911,x:-185.85,y:62.35,regX:6.5}},{t:this.instance_2,p:{rotation:-58.5182,x:-57.25,scaleX:0.9982,scaleY:0.9982,y:-23.05,regX:35.5}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.999,scaleY:0.999,rotation:-3.1083,x:-5.6,y:-57.6,regY:9.1}},{t:this.instance_16,p:{scaleX:0.9989,scaleY:0.9989,skewX:-6.7162,skewY:173.2838,x:-1.05,y:-79.45}},{t:this.instance_15,p:{regX:1.6,regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:9.7781,y:87.4,x:-31.15}},{t:this.instance_14,p:{rotation:74.1609,x:48.2,y:-26.2,regY:-1.7,scaleX:0.9983,scaleY:0.9983,regX:-31.1}},{t:this.instance_13,p:{regX:-39.6,scaleX:0.9982,scaleY:0.9982,rotation:130.1467,x:66.85,y:41.2,regY:-1.1}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9983,scaleY:0.9983,skewX:-51.5244,skewY:128.4756,x:10.55,y:103.4,regX:-5.9}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,skewX:-48.6097,skewY:131.3903,x:6.7,y:113.55,regX:-4.9,regY:3.3}},{t:this.instance_10,p:{regX:-1.2,rotation:-2.3147,x:16.15,y:92.35}},{t:this.instance_9,p:{regX:3.3,scaleX:0.9977,scaleY:0.9977,x:18.35,y:189.4,skewX:-14.4094,skewY:165.5906}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,skewX:1.1326,skewY:-178.8674,x:-47.85,y:180.75,regX:1.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,rotation:-15.2014,x:-96.95,y:39.5,regY:0}},{t:this.instance_4,p:{regY:-9.2,scaleY:0.9983,skewX:-172.2509,skewY:7.7491,x:-178.4,y:63.5,scaleX:0.9983}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,skewX:153.3386,skewY:-26.6614,x:-186.5,y:63.25,regX:6.6}},{t:this.instance_2,p:{rotation:-57.357,x:-57.3,scaleX:0.9982,scaleY:0.9982,y:-23.1,regX:35.5}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.999,scaleY:0.999,rotation:-2.9024,x:-5.7,y:-57.65,regY:9.1}},{t:this.instance_16,p:{scaleX:0.9989,scaleY:0.9989,skewX:-6.6368,skewY:173.3632,x:-0.95,y:-79.4}},{t:this.instance_15,p:{regX:1.6,regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:9.7692,y:87.35,x:-31.1}},{t:this.instance_14,p:{rotation:74.2402,x:48.05,y:-26.35,regY:-1.6,scaleX:0.9983,scaleY:0.9983,regX:-31.2}},{t:this.instance_13,p:{regX:-39.7,scaleX:0.9982,scaleY:0.9982,rotation:130.8419,x:66.75,y:41.1,regY:-1.1}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9983,scaleY:0.9983,skewX:-50.8411,skewY:129.1589,x:9.8,y:102.7,regX:-5.9}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,skewX:-47.9398,skewY:132.0602,x:5.85,y:112.75,regX:-4.9,regY:3.4}},{t:this.instance_10,p:{regX:-1.2,rotation:-2.3086,x:16.15,y:92.35}},{t:this.instance_9,p:{regX:3.3,scaleX:0.9977,scaleY:0.9977,x:18.35,y:189.4,skewX:-14.4103,skewY:165.5897}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,skewX:1.1125,skewY:-178.8875,x:-47.95,y:180.75,regX:1.9}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,rotation:-16.2706,x:-98.15,y:38.7,regY:0}},{t:this.instance_4,p:{regY:-9.2,scaleY:0.9982,skewX:-173.3305,skewY:6.6695,x:-179.2,y:64.15,scaleX:0.9982}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,skewX:152.269,skewY:-27.731,x:-187.45,y:64.1,regX:6.5}},{t:this.instance_2,p:{rotation:-56.1958,x:-57.35,scaleX:0.9981,scaleY:0.9981,y:-23.1,regX:35.5}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.999,scaleY:0.999,rotation:-2.6982,x:-5.65,y:-57.6,regY:9.1}},{t:this.instance_16,p:{scaleX:0.9989,scaleY:0.9989,skewX:-6.5557,skewY:173.4443,x:-0.85,y:-79.4}},{t:this.instance_15,p:{regX:1.6,regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:9.7594,y:87.35,x:-31.1}},{t:this.instance_14,p:{rotation:74.3212,x:48.05,y:-26.35,regY:-1.6,scaleX:0.9983,scaleY:0.9983,regX:-31.2}},{t:this.instance_13,p:{regX:-39.6,scaleX:0.9982,scaleY:0.9982,rotation:131.5372,x:66.65,y:41.25,regY:-1.1}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9983,scaleY:0.9983,skewX:-50.158,skewY:129.842,x:8.95,y:102.05,regX:-5.9}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,skewX:-47.2678,skewY:132.7322,x:4.95,y:112.15,regX:-4.9,regY:3.4}},{t:this.instance_10,p:{regX:-1.2,rotation:-2.3024,x:16.1,y:92.35}},{t:this.instance_9,p:{regX:3.3,scaleX:0.9977,scaleY:0.9977,x:18.35,y:189.4,skewX:-14.4109,skewY:165.5891}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,skewX:1.0924,skewY:-178.9076,x:-47.9,y:180.7,regX:1.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,rotation:-17.3406,x:-99.45,y:37.85,regY:0}},{t:this.instance_4,p:{regY:-9.2,scaleY:0.9982,skewX:-174.407,skewY:5.593,x:-179.9,y:64.85,scaleX:0.9982}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,skewX:151.1999,skewY:-28.8001,x:-188.25,y:64.9,regX:6.5}},{t:this.instance_2,p:{rotation:-55.0342,x:-57.3,scaleX:0.9982,scaleY:0.9982,y:-23.1,regX:35.5}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.999,scaleY:0.999,rotation:-2.4942,x:-5.65,y:-57.6,regY:9.1}},{t:this.instance_16,p:{scaleX:0.9989,scaleY:0.9989,skewX:-6.4739,skewY:173.5261,x:-0.8,y:-79.4}},{t:this.instance_15,p:{regX:1.6,regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:9.7497,y:87.35,x:-31.05}},{t:this.instance_14,p:{rotation:74.4038,x:48.05,y:-26.2,regY:-1.6,scaleX:0.9983,scaleY:0.9983,regX:-31.1}},{t:this.instance_13,p:{regX:-39.6,scaleX:0.9982,scaleY:0.9982,rotation:132.2318,x:66.55,y:41.3,regY:-1.1}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9983,scaleY:0.9983,skewX:-49.4756,skewY:130.5244,x:8.25,y:101.3,regX:-6}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,skewX:-46.598,skewY:133.402,x:3.95,y:111.45,regX:-4.9,regY:3.4}},{t:this.instance_10,p:{regX:-1.2,rotation:-2.2963,x:16.1,y:92.35}},{t:this.instance_9,p:{regX:3.3,scaleX:0.9977,scaleY:0.9977,x:18.35,y:189.4,skewX:-14.4118,skewY:165.5882}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,skewX:1.0731,skewY:-178.9269,x:-47.8,y:180.7,regX:1.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9982,scaleY:0.9982,rotation:-18.4103,x:-100.65,y:37.05,regY:0}},{t:this.instance_4,p:{regY:-9.2,scaleY:0.9982,skewX:-175.4858,skewY:4.5142,x:-180.65,y:65.5,scaleX:0.9982}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,skewX:150.1296,skewY:-29.8704,x:-188.9,y:65.75,regX:6.5}},{t:this.instance_2,p:{rotation:-53.8727,x:-57.3,scaleX:0.9982,scaleY:0.9982,y:-23.1,regX:35.5}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.999,scaleY:0.999,rotation:-2.2909,x:-5.6,y:-57.6,regY:9.1}},{t:this.instance_16,p:{scaleX:0.9989,scaleY:0.9989,skewX:-6.3928,skewY:173.6072,x:-0.7,y:-79.45}},{t:this.instance_15,p:{regX:1.6,regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:9.7391,y:87.4,x:-31.1}},{t:this.instance_14,p:{rotation:74.4856,x:48.15,y:-26.2,regY:-1.6,scaleX:0.9983,scaleY:0.9983,regX:-31.1}},{t:this.instance_13,p:{regX:-39.6,scaleX:0.9982,scaleY:0.9982,rotation:132.9261,x:66.4,y:41.35,regY:-1.1}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9983,scaleY:0.9983,skewX:-48.7921,skewY:131.2079,x:7.4,y:100.6,regX:-6}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,skewX:-45.9271,skewY:134.0729,x:3.1,y:110.7,regX:-4.9,regY:3.4}},{t:this.instance_10,p:{regX:-1.2,rotation:-2.2902,x:16.15,y:92.35}},{t:this.instance_9,p:{regX:3.3,scaleX:0.9977,scaleY:0.9977,x:18.35,y:189.4,skewX:-14.4122,skewY:165.5878}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,skewX:1.0529,skewY:-178.9471,x:-47.85,y:180.75,regX:1.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9983,scaleY:0.9983,rotation:-19.4786,x:-101.85,y:36.15,regY:0}},{t:this.instance_4,p:{regY:-9.2,scaleY:0.9983,skewX:-176.5639,skewY:3.4361,x:-181.25,y:66.15,scaleX:0.9983}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,skewX:149.0619,skewY:-30.9381,x:-189.6,y:66.55,regX:6.5}},{t:this.instance_2,p:{rotation:-52.7118,x:-57.35,scaleX:0.9981,scaleY:0.9981,y:-23.1,regX:35.5}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-218.4,-365.2,333,669.2);


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

	// Layer_2
	this.instance = new lib.CachedBmp_883();
	this.instance.setTransform(-83.05,-348,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(50));

	// flash0_ai
	this.instance_1 = new lib.CachedBmp_884();
	this.instance_1.setTransform(-127.05,-370.85,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(50));

	// Armature_1
	this.instance_2 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_2.setTransform(-57.35,-23,0.9989,0.9989,-91.137,0,0,35.9,0.5);

	this.instance_3 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_3.setTransform(-105.5,131,0.9987,0.9987,0,118.7502,-61.2498,6.8,-1);

	this.instance_4 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_4.setTransform(-104.55,122.3,0.9989,0.9989,0,106.5215,-73.4785,5.8,-8.3);

	this.instance_5 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_5.setTransform(-55.9,51.7,0.9988,0.9988,-55.0902,0,0,44.2,0.1);

	this.instance_6 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_6.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_7 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_7.setTransform(-46.05,184.45,0.9986,0.9986,0,12.4082,-167.5918,3.5,-54.8);

	this.instance_8 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_8.setTransform(-5.6,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_9 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_9.setTransform(27.75,188.9,0.9981,0.9981,0,-11.5989,168.4011,2.5,-54.3);

	this.instance_10 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_10.setTransform(17.05,92.15,0.9982,0.9982,-6.9854,0,0,-0.5,1.4);

	this.instance_11 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_11.setTransform(23.05,130.75,0.9988,0.9988,0,-62.8219,117.1781,-5.2,3.4);

	this.instance_12 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_12.setTransform(26.1,119.8,0.9989,0.9989,0,-55.4304,124.5696,-6.5,8);

	this.instance_13 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_13.setTransform(61.5,47.15,0.9989,0.9989,116.1184,0,0,-40.1,-0.1);

	this.instance_14 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_14.setTransform(47.55,-26.2,0.9989,0.9989,80.0669,0,0,-31.9,-1);

	this.instance_15 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_15.setTransform(-23.2,91.3,0.9986,0.9986,11.8963,0,0,1.9,-45.7);

	this.instance_16 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_16.setTransform(4.25,-78.6,0.9993,0.9993,0,-1.7387,178.2613,0.4,53.6);

	this.instance_17 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_17.setTransform(-4.85,-57.9,0.9993,0.9993,-1.687,0,0,-0.4,9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_17,p:{rotation:-1.687,x:-4.85,y:-57.9}},{t:this.instance_16,p:{skewX:-1.7387,skewY:178.2613,x:4.25,regY:53.6,y:-78.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,rotation:11.8963,x:-23.2,y:91.3,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9989,scaleY:0.9989,rotation:80.0669,x:47.55,y:-26.2,regY:-1}},{t:this.instance_13,p:{scaleX:0.9989,scaleY:0.9989,rotation:116.1184,x:61.5,y:47.15,regY:-0.1}},{t:this.instance_12,p:{regY:8,scaleX:0.9989,scaleY:0.9989,skewX:-55.4304,skewY:124.5696,x:26.1,y:119.8,regX:-6.5}},{t:this.instance_11,p:{regY:3.4,skewX:-62.8219,skewY:117.1781,x:23.05,y:130.75,scaleX:0.9988,scaleY:0.9988,regX:-5.2}},{t:this.instance_10,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.9854,y:92.15,x:17.05,regX:-0.5}},{t:this.instance_9,p:{regY:-54.3,skewX:-11.5989,skewY:168.4011,x:27.75,y:188.9,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9986,scaleY:0.9986,skewX:12.4082,skewY:-167.5918,x:-46.05,y:184.45,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.2,scaleX:0.9988,scaleY:0.9988,rotation:-55.0902,x:-55.9,y:51.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,skewX:106.5215,skewY:-73.4785,x:-104.55,y:122.3,regX:5.8,regY:-8.3}},{t:this.instance_3,p:{scaleX:0.9987,scaleY:0.9987,skewX:118.7502,skewY:-61.2498,x:-105.5,y:131,regX:6.8,regY:-1}},{t:this.instance_2,p:{regX:35.9,scaleX:0.9989,scaleY:0.9989,rotation:-91.137,y:-23,regY:0.5,x:-57.35}}]}).to({state:[{t:this.instance_17,p:{rotation:-1.7124,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-1.9707,skewY:178.0293,x:4.2,regY:53.6,y:-78.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.6,rotation:11.8961,x:-23.1,y:91.35,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:79.7052,x:47.45,y:-26.3,regY:-1}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:115.7207,x:61.85,y:46.95,regY:-0.1}},{t:this.instance_12,p:{regY:7.9,scaleX:0.9988,scaleY:0.9988,skewX:-55.8295,skewY:124.1705,x:26.95,y:119.85,regX:-6.5}},{t:this.instance_11,p:{regY:3.5,skewX:-63.2204,skewY:116.7796,x:24.15,y:130.85,scaleX:0.9988,scaleY:0.9988,regX:-5.2}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.986,y:92.1,x:17.05,regX:-0.5}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.5987,skewY:168.4013,x:27.7,y:188.95,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.4071,skewY:-167.5929,x:-46,y:184.4,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.1,scaleX:0.9987,scaleY:0.9987,rotation:-54.186,x:-55.35,y:51.75}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:107.4254,skewY:-72.5746,x:-105.1,y:121.45,regX:5.8,regY:-8.3}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:119.653,skewY:-60.347,x:-106.2,y:130.05,regX:6.8,regY:-1}},{t:this.instance_2,p:{regX:35.8,scaleX:0.9988,scaleY:0.9988,rotation:-91.6055,y:-22.95,regY:0.5,x:-57.35}}]},1).to({state:[{t:this.instance_17,p:{rotation:-1.7404,x:-4.85,y:-57.85}},{t:this.instance_16,p:{skewX:-2.2045,skewY:177.7955,x:4.15,regY:53.5,y:-78.75,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.6,rotation:11.8961,x:-23.1,y:91.35,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:79.3438,x:47.45,y:-26.3,regY:-1}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:115.3221,x:62.3,y:46.9,regY:-0.1}},{t:this.instance_12,p:{regY:8,scaleX:0.9988,scaleY:0.9988,skewX:-56.2271,skewY:123.7729,x:27.95,y:120,regX:-6.5}},{t:this.instance_11,p:{regY:3.5,skewX:-63.6189,skewY:116.3811,x:25.2,y:131.05,scaleX:0.9988,scaleY:0.9988,regX:-5.2}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.986,y:92.1,x:17.05,regX:-0.5}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.5987,skewY:168.4013,x:27.7,y:188.95,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.4071,skewY:-167.5929,x:-46,y:184.4,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.1,scaleX:0.9987,scaleY:0.9987,rotation:-53.2819,x:-54.7,y:51.7}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:108.3287,skewY:-71.6713,x:-105.55,y:120.6,regX:5.8,regY:-8.3}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:120.5557,skewY:-59.4443,x:-106.75,y:129.25,regX:6.8,regY:-1}},{t:this.instance_2,p:{regX:35.8,scaleX:0.9988,scaleY:0.9988,rotation:-92.0759,y:-23,regY:0.5,x:-57.35}}]},1).to({state:[{t:this.instance_17,p:{rotation:-1.7676,x:-4.75,y:-57.85}},{t:this.instance_16,p:{skewX:-2.4366,skewY:177.5634,x:4.15,regY:53.5,y:-78.75,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.6,rotation:11.8961,x:-23.1,y:91.3,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:78.981,x:47.45,y:-26.25,regY:-1}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:114.9247,x:62.75,y:46.85,regY:-0.1}},{t:this.instance_12,p:{regY:8,scaleX:0.9988,scaleY:0.9988,skewX:-56.6238,skewY:123.3762,x:28.85,y:120.15,regX:-6.5}},{t:this.instance_11,p:{regY:3.5,skewX:-64.0163,skewY:115.9837,x:26.25,y:131.2,scaleX:0.9988,scaleY:0.9988,regX:-5.2}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.9851,y:92.1,x:17,regX:-0.5}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.5987,skewY:168.4013,x:27.7,y:188.95,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.4071,skewY:-167.5929,x:-46,y:184.4,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.1,scaleX:0.9987,scaleY:0.9987,rotation:-52.379,x:-54.1,y:51.7}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:109.2316,skewY:-70.7684,x:-106,y:119.85,regX:5.7,regY:-8.3}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:121.4597,skewY:-58.5403,x:-107.35,y:128.25,regX:6.9,regY:-1}},{t:this.instance_2,p:{regX:35.8,scaleX:0.9988,scaleY:0.9988,rotation:-92.5445,y:-22.95,regY:0.5,x:-57.35}}]},1).to({state:[{t:this.instance_17,p:{rotation:-1.7947,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-2.6704,skewY:177.3296,x:4.15,regY:53.6,y:-78.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.6,rotation:11.8953,x:-23.1,y:91.3,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:78.6195,x:47.45,y:-26.3,regY:-1}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:114.5268,x:63.25,y:46.65,regY:-0.1}},{t:this.instance_12,p:{regY:8,scaleX:0.9988,scaleY:0.9988,skewX:-57.0232,skewY:122.9768,x:29.9,y:120.3,regX:-6.5}},{t:this.instance_11,p:{regY:3.4,skewX:-64.4152,skewY:115.5848,x:27.2,y:131.25,scaleX:0.9988,scaleY:0.9988,regX:-5.2}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.9851,y:92.1,x:17,regX:-0.5}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.5987,skewY:168.4013,x:27.7,y:188.95,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.4071,skewY:-167.5929,x:-46,y:184.4,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.1,scaleX:0.9987,scaleY:0.9987,rotation:-51.4761,x:-53.45,y:51.6}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:110.135,skewY:-69.865,x:-106.35,y:118.9,regX:5.8,regY:-8.4}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:122.3622,skewY:-57.6378,x:-108,y:127.5,regX:6.8,regY:-1}},{t:this.instance_2,p:{regX:35.8,scaleX:0.9988,scaleY:0.9988,rotation:-93.0142,y:-22.95,regY:0.5,x:-57.35}}]},1).to({state:[{t:this.instance_17,p:{rotation:-1.8227,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-2.9026,skewY:177.0974,x:4.15,regY:53.6,y:-78.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.6,rotation:11.8953,x:-23.1,y:91.3,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:78.2566,x:47.45,y:-26.25,regY:-1}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:114.1291,x:63.7,y:46.6,regY:-0.1}},{t:this.instance_12,p:{regY:8,scaleX:0.9988,scaleY:0.9988,skewX:-57.4205,skewY:122.5795,x:30.85,y:120.45,regX:-6.5}},{t:this.instance_11,p:{regY:3.5,skewX:-64.8122,skewY:115.1878,x:28.3,y:131.45,scaleX:0.9988,scaleY:0.9988,regX:-5.2}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.9851,y:92.1,x:17,regX:-0.5}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.5987,skewY:168.4013,x:27.7,y:188.95,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.4071,skewY:-167.5929,x:-46,y:184.4,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.1,scaleX:0.9987,scaleY:0.9987,rotation:-50.5729,x:-52.9,y:51.6}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:111.0389,skewY:-68.9611,x:-106.9,y:118.05,regX:5.8,regY:-8.3}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:123.2654,skewY:-56.7346,x:-108.55,y:126.55,regX:6.8,regY:-1}},{t:this.instance_2,p:{regX:35.9,scaleX:0.9988,scaleY:0.9988,rotation:-93.4833,y:-23.1,regY:0.6,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{rotation:-1.8499,x:-4.75,y:-57.85}},{t:this.instance_16,p:{skewX:-3.1374,skewY:176.8626,x:4.15,regY:53.6,y:-78.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.6,rotation:11.8953,x:-23.1,y:91.3,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:77.8945,x:47.45,y:-26.3,regY:-1}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:113.731,x:64.1,y:46.45,regY:-0.1}},{t:this.instance_12,p:{regY:8,scaleX:0.9988,scaleY:0.9988,skewX:-57.819,skewY:122.181,x:31.8,y:120.55,regX:-6.5}},{t:this.instance_11,p:{regY:3.5,skewX:-65.2113,skewY:114.7887,x:29.4,y:131.65,scaleX:0.9988,scaleY:0.9988,regX:-5.2}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.9851,y:92.1,x:17,regX:-0.5}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.5987,skewY:168.4013,x:27.7,y:188.95,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.4064,skewY:-167.5936,x:-46,y:184.4,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.1,scaleX:0.9987,scaleY:0.9987,rotation:-49.6699,x:-52.25,y:51.5}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:111.9414,skewY:-68.0586,x:-107.3,y:117.1,regX:5.8,regY:-8.3}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:124.1682,skewY:-55.8318,x:-109.1,y:125.65,regX:6.8,regY:-1}},{t:this.instance_2,p:{regX:35.8,scaleX:0.9988,scaleY:0.9988,rotation:-93.9517,y:-22.95,regY:0.5,x:-57.3}}]},1).to({state:[{t:this.instance_17,p:{rotation:-1.877,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-3.3695,skewY:176.6304,x:4.15,regY:53.5,y:-78.8,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.6,rotation:11.8953,x:-23.1,y:91.3,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:77.5326,x:47.45,y:-26.3,regY:-1}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:113.3319,x:64.55,y:46.35,regY:-0.1}},{t:this.instance_12,p:{regY:8,scaleX:0.9988,scaleY:0.9988,skewX:-58.2173,skewY:121.7827,x:32.75,y:120.65,regX:-6.5}},{t:this.instance_11,p:{regY:3.4,skewX:-65.6089,skewY:114.3911,x:30.4,y:131.7,scaleX:0.9987,scaleY:0.9987,regX:-5.2}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.9851,y:92.1,x:17,regX:-0.5}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.5987,skewY:168.4013,x:27.7,y:188.95,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.4064,skewY:-167.5936,x:-46,y:184.4,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.1,scaleX:0.9987,scaleY:0.9987,rotation:-48.7656,x:-51.65,y:51.5}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:112.8452,skewY:-67.1548,x:-107.65,y:116.2,regX:5.8,regY:-8.4}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:125.0726,skewY:-54.9274,x:-109.75,y:124.65,regX:6.8,regY:-1}},{t:this.instance_2,p:{regX:35.8,scaleX:0.9988,scaleY:0.9988,rotation:-94.4222,y:-22.95,regY:0.5,x:-57.3}}]},1).to({state:[{t:this.instance_17,p:{rotation:-1.905,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-3.6036,skewY:176.3964,x:4.1,regY:53.5,y:-78.7,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.6,rotation:11.8953,x:-23.1,y:91.3,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:77.1701,x:47.5,y:-26.25,regY:-1}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:112.9339,x:65,y:46.2,regY:-0.1}},{t:this.instance_12,p:{regY:8,scaleX:0.9988,scaleY:0.9988,skewX:-58.6143,skewY:121.3857,x:33.75,y:120.75,regX:-6.5}},{t:this.instance_11,p:{regY:3.5,skewX:-66.0074,skewY:113.9926,x:31.5,y:131.9,scaleX:0.9988,scaleY:0.9988,regX:-5.2}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.9851,y:92.1,x:17,regX:-0.5}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.5987,skewY:168.4013,x:27.7,y:188.95,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.4064,skewY:-167.5936,x:-46,y:184.4,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.1,scaleX:0.9987,scaleY:0.9987,rotation:-47.8629,x:-51.05,y:51.45}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:113.7482,skewY:-66.2518,x:-108.15,y:115.25,regX:5.8,regY:-8.3}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:125.9756,skewY:-54.0244,x:-110.25,y:123.75,regX:6.8,regY:-1}},{t:this.instance_2,p:{regX:35.9,scaleX:0.9988,scaleY:0.9988,rotation:-94.8911,y:-23.05,regY:0.5,x:-57.3}}]},1).to({state:[{t:this.instance_17,p:{rotation:-1.933,x:-4.75,y:-57.85}},{t:this.instance_16,p:{skewX:-3.8351,skewY:176.1649,x:4.15,regY:53.6,y:-78.6,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.6,rotation:11.8953,x:-23.1,y:91.3,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:76.8081,x:47.45,y:-26.35,regY:-1}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:112.5361,x:65.5,y:46.1,regY:-0.1}},{t:this.instance_12,p:{regY:8,scaleX:0.9988,scaleY:0.9988,skewX:-59.0133,skewY:120.9867,x:34.75,y:120.95,regX:-6.4}},{t:this.instance_11,p:{regY:3.5,skewX:-66.4044,skewY:113.5956,x:32.55,y:132.15,scaleX:0.9988,scaleY:0.9988,regX:-5.1}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.9851,y:92.1,x:17,regX:-0.5}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.5987,skewY:168.4013,x:27.7,y:188.95,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.4064,skewY:-167.5936,x:-46,y:184.4,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.1,scaleX:0.9987,scaleY:0.9987,rotation:-46.9595,x:-50.5,y:51.35}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:114.6516,skewY:-65.3484,x:-108.45,y:114.4,regX:5.7,regY:-8.4}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:126.8792,skewY:-53.1208,x:-110.65,y:122.65,regX:6.9,regY:-1}},{t:this.instance_2,p:{regX:35.8,scaleX:0.9988,scaleY:0.9988,rotation:-95.3595,y:-22.95,regY:0.5,x:-57.3}}]},1).to({state:[{t:this.instance_17,p:{rotation:-1.9602,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-4.0693,skewY:175.9307,x:4.1,regY:53.5,y:-78.75,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.6,rotation:11.8953,x:-23.1,y:91.3,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:76.4457,x:47.45,y:-26.25,regY:-1}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:112.1388,x:66,y:46.05,regY:-0.1}},{t:this.instance_12,p:{regY:8,scaleX:0.9988,scaleY:0.9988,skewX:-59.4105,skewY:120.5895,x:35.7,y:120.95,regX:-6.5}},{t:this.instance_11,p:{regY:3.5,skewX:-66.8031,skewY:113.1969,x:33.55,y:132.15,scaleX:0.9988,scaleY:0.9988,regX:-5.2}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.9851,y:92.1,x:17,regX:-0.5}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.5987,skewY:168.4013,x:27.7,y:188.95,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.4064,skewY:-167.5936,x:-46,y:184.4,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.1,scaleX:0.9987,scaleY:0.9987,rotation:-46.0567,x:-49.9,y:51.3}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:115.5551,skewY:-64.4449,x:-108.85,y:113.3,regX:5.8,regY:-8.3}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:127.7829,skewY:-52.2171,x:-111.3,y:121.65,regX:6.8,regY:-1}},{t:this.instance_2,p:{regX:35.8,scaleX:0.9988,scaleY:0.9988,rotation:-95.8292,y:-22.95,regY:0.5,x:-57.35}}]},1).to({state:[{t:this.instance_17,p:{rotation:-1.9882,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-4.3025,skewY:175.6975,x:4.05,regY:53.6,y:-78.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.6,rotation:11.8953,x:-23.1,y:91.3,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:76.0841,x:47.45,y:-26.35,regY:-1}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:111.7387,x:66.45,y:45.95,regY:-0.1}},{t:this.instance_12,p:{regY:8,scaleX:0.9988,scaleY:0.9988,skewX:-59.8095,skewY:120.1905,x:36.65,y:121.05,regX:-6.5}},{t:this.instance_11,p:{regY:3.5,skewX:-67.2016,skewY:112.7984,x:34.65,y:132.2,scaleX:0.9988,scaleY:0.9988,regX:-5.2}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.9851,y:92.1,x:17,regX:-0.5}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.5987,skewY:168.4013,x:27.7,y:188.95,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.4064,skewY:-167.5936,x:-46,y:184.4,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.1,scaleX:0.9987,scaleY:0.9987,rotation:-45.1535,x:-49.3,y:51.2}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:116.4582,skewY:-63.5418,x:-109.25,y:112.3,regX:5.8,regY:-8.3}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:128.6844,skewY:-51.3156,x:-111.65,y:120.5,regX:6.9,regY:-1}},{t:this.instance_2,p:{regX:35.8,scaleX:0.9988,scaleY:0.9988,rotation:-96.2983,y:-23,regY:0.6,x:-57.15}}]},1).to({state:[{t:this.instance_17,p:{rotation:-2.0153,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-4.5351,skewY:175.4649,x:4.1,regY:53.6,y:-78.6,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.6,rotation:11.8953,x:-23.1,y:91.3,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:75.7215,x:47.5,y:-26.35,regY:-1}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:111.3422,x:66.9,y:45.8,regY:-0.1}},{t:this.instance_12,p:{regY:8,scaleX:0.9988,scaleY:0.9988,skewX:-60.2068,skewY:119.7932,x:37.7,y:121.1,regX:-6.5}},{t:this.instance_11,p:{regY:3.5,skewX:-67.5996,skewY:112.4004,x:35.75,y:132.35,scaleX:0.9988,scaleY:0.9988,regX:-5.2}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.9851,y:92.1,x:17,regX:-0.5}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.5987,skewY:168.4013,x:27.7,y:188.95,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.4064,skewY:-167.5936,x:-46,y:184.4,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.1,scaleX:0.9987,scaleY:0.9987,rotation:-44.2504,x:-48.65,y:51.15}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:117.3601,skewY:-62.6399,x:-109.65,y:111.2,regX:5.8,regY:-8.3}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:129.5881,skewY:-50.4119,x:-112.2,y:119.55,regX:6.8,regY:-1}},{t:this.instance_2,p:{regX:35.8,scaleX:0.9988,scaleY:0.9988,rotation:-96.768,y:-22.95,regY:0.5,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{rotation:-2.0433,x:-4.85,y:-57.85}},{t:this.instance_16,p:{skewX:-4.7695,skewY:175.2305,x:4.1,regY:53.6,y:-78.65,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.6,rotation:11.8953,x:-23.1,y:91.3,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:75.3595,x:47.4,y:-26.3,regY:-1}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:110.9438,x:67.35,y:45.7,regY:-0.1}},{t:this.instance_12,p:{regY:8,scaleX:0.9988,scaleY:0.9988,skewX:-60.6051,skewY:119.3949,x:38.55,y:121.3,regX:-6.4}},{t:this.instance_11,p:{regY:3.5,skewX:-67.9969,skewY:112.0031,x:36.75,y:132.45,scaleX:0.9988,scaleY:0.9988,regX:-5.2}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.9851,y:92.1,x:17,regX:-0.5}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.5987,skewY:168.4013,x:27.7,y:188.95,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.4055,skewY:-167.5945,x:-46,y:184.4,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.1,scaleX:0.9987,scaleY:0.9987,rotation:-43.3471,x:-48.05,y:51.05}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:118.2642,skewY:-61.7358,x:-109.9,y:110.25,regX:5.8,regY:-8.3}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:130.4916,skewY:-49.5084,x:-112.75,y:118.45,regX:6.8,regY:-1}},{t:this.instance_2,p:{regX:35.8,scaleX:0.9988,scaleY:0.9988,rotation:-97.2372,y:-22.95,regY:0.5,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{rotation:-2.0705,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-5.0022,skewY:174.9978,x:4.15,regY:53.6,y:-78.65,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.6,rotation:11.8953,x:-23.1,y:91.3,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:74.9975,x:47.4,y:-26.35,regY:-1}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:110.5457,x:67.8,y:45.55,regY:-0.1}},{t:this.instance_12,p:{regY:8,scaleX:0.9988,scaleY:0.9988,skewX:-61.0032,skewY:118.9968,x:39.6,y:121.25,regX:-6.5}},{t:this.instance_11,p:{regY:3.5,skewX:-68.3948,skewY:111.6052,x:37.85,y:132.45,scaleX:0.9988,scaleY:0.9988,regX:-5.2}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.9851,y:92.1,x:17,regX:-0.5}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.5987,skewY:168.4013,x:27.7,y:188.95,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.4055,skewY:-167.5945,x:-46,y:184.4,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.1,scaleX:0.9987,scaleY:0.9987,rotation:-42.4433,x:-47.45,y:51}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:119.1672,skewY:-60.8328,x:-110.25,y:109.15,regX:5.8,regY:-8.3}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:131.3952,skewY:-48.6048,x:-113.15,y:117.3,regX:6.8,regY:-1}},{t:this.instance_2,p:{regX:35.8,scaleX:0.9988,scaleY:0.9988,rotation:-97.7061,y:-22.9,regY:0.5,x:-57.35}}]},1).to({state:[{t:this.instance_17,p:{rotation:-2.0976,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-5.2359,skewY:174.7641,x:4.15,regY:53.6,y:-78.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.6,rotation:11.8953,x:-23.1,y:91.3,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:74.6357,x:47.3,y:-26.3,regY:-0.9}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:110.1475,x:68.3,y:45.4,regY:-0.2}},{t:this.instance_12,p:{regY:8,scaleX:0.9988,scaleY:0.9988,skewX:-61.4016,skewY:118.5984,x:40.55,y:121.35,regX:-6.5}},{t:this.instance_11,p:{regY:3.5,skewX:-68.7937,skewY:111.2063,x:38.9,y:132.55,scaleX:0.9988,scaleY:0.9988,regX:-5.2}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.9851,y:92.1,x:17,regX:-0.5}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.5987,skewY:168.4013,x:27.7,y:188.95,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.4055,skewY:-167.5945,x:-46,y:184.4,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.1,scaleX:0.9987,scaleY:0.9987,rotation:-41.539,x:-46.85,y:50.9}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:120.0708,skewY:-59.9292,x:-110.55,y:108.15,regX:5.7,regY:-8.4}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:132.2986,skewY:-47.7014,x:-113.65,y:116.25,regX:6.8,regY:-1}},{t:this.instance_2,p:{regX:35.8,scaleX:0.9988,scaleY:0.9988,rotation:-98.1762,y:-22.9,regY:0.5,x:-57.3}}]},1).to({state:[{t:this.instance_17,p:{rotation:-2.1256,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-5.4688,skewY:174.5312,x:4.15,regY:53.6,y:-78.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.6,rotation:11.8953,x:-23.1,y:91.3,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:74.2732,x:47.3,y:-26.3,regY:-0.9}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:109.7504,x:68.65,y:45.25,regY:-0.1}},{t:this.instance_12,p:{regY:8,scaleX:0.9988,scaleY:0.9988,skewX:-61.7992,skewY:118.2008,x:41.55,y:121.5,regX:-6.5}},{t:this.instance_11,p:{regY:3.5,skewX:-69.1913,skewY:110.8087,x:39.95,y:132.65,scaleX:0.9988,scaleY:0.9988,regX:-5.2}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.9851,y:92.1,x:17,regX:-0.5}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.5987,skewY:168.4013,x:27.7,y:188.95,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.4055,skewY:-167.5945,x:-46,y:184.4,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.1,scaleX:0.9987,scaleY:0.9987,rotation:-40.6368,x:-46.2,y:50.85}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:120.9737,skewY:-59.0263,x:-110.85,y:106.95,regX:5.7,regY:-8.3}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:133.2025,skewY:-46.7975,x:-113.95,y:115.15,regX:6.8,regY:-1.1}},{t:this.instance_2,p:{regX:35.8,scaleX:0.9988,scaleY:0.9988,rotation:-98.6451,y:-22.95,regY:0.6,x:-57.15}}]},1).to({state:[{t:this.instance_17,p:{rotation:-2.1528,x:-4.75,y:-57.85}},{t:this.instance_16,p:{skewX:-5.7018,skewY:174.2982,x:4.15,regY:53.6,y:-78.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.6,rotation:11.8953,x:-23.1,y:91.3,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:73.9116,x:47.3,y:-26.3,regY:-0.9}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:109.3509,x:69.1,y:45.15,regY:-0.1}},{t:this.instance_12,p:{regY:7.9,scaleX:0.9988,scaleY:0.9988,skewX:-62.1978,skewY:117.8022,x:42.45,y:121.45,regX:-6.5}},{t:this.instance_11,p:{regY:3.5,skewX:-69.5896,skewY:110.4104,x:41,y:132.7,scaleX:0.9988,scaleY:0.9988,regX:-5.2}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.9851,y:92.1,x:17,regX:-0.5}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.5987,skewY:168.4013,x:27.7,y:188.95,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.4055,skewY:-167.5945,x:-46,y:184.4,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.1,scaleX:0.9987,scaleY:0.9987,rotation:-39.7336,x:-45.65,y:50.75}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:121.8768,skewY:-58.1232,x:-111.1,y:105.8,regX:5.8,regY:-8.3}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:134.1048,skewY:-45.8952,x:-114.45,y:113.85,regX:6.8,regY:-1}},{t:this.instance_2,p:{regX:35.8,scaleX:0.9988,scaleY:0.9988,rotation:-99.1139,y:-22.95,regY:0.5,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{rotation:-2.1799,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-5.9349,skewY:174.0651,x:4.15,regY:53.6,y:-78.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.6,rotation:11.8944,x:-23.1,y:91.3,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:73.549,x:47.45,y:-26.35,regY:-1}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:108.9537,x:69.6,y:44.95,regY:-0.1}},{t:this.instance_12,p:{regY:8,scaleX:0.9988,scaleY:0.9988,skewX:-62.596,skewY:117.404,x:43.5,y:121.6,regX:-6.5}},{t:this.instance_11,p:{regY:3.5,skewX:-69.9887,skewY:110.0113,x:42.1,y:132.7,scaleX:0.9988,scaleY:0.9988,regX:-5.2}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.9851,y:92.1,x:17,regX:-0.5}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.5987,skewY:168.4013,x:27.7,y:188.95,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.4055,skewY:-167.5945,x:-46,y:184.4,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.1,scaleX:0.9987,scaleY:0.9987,rotation:-38.8303,x:-45,y:50.65}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:122.7799,skewY:-57.2201,x:-111.4,y:104.7,regX:5.8,regY:-8.3}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:135.0074,skewY:-44.9926,x:-114.85,y:112.65,regX:6.8,regY:-1}},{t:this.instance_2,p:{regX:35.8,scaleX:0.9988,scaleY:0.9988,rotation:-99.582,y:-22.95,regY:0.5,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{rotation:-2.2079,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-6.168,skewY:173.832,x:4.1,regY:53.6,y:-78.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.6,rotation:11.8944,x:-23.1,y:91.3,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:73.186,x:47.45,y:-26.4,regY:-1}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:108.5545,x:70.1,y:44.9,regY:-0.2}},{t:this.instance_12,p:{regY:8,scaleX:0.9988,scaleY:0.9988,skewX:-62.9942,skewY:117.0058,x:44.45,y:121.6,regX:-6.5}},{t:this.instance_11,p:{regY:3.5,skewX:-70.3849,skewY:109.6151,x:43.15,y:132.75,scaleX:0.9988,scaleY:0.9988,regX:-5.2}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.9851,y:92.1,x:17,regX:-0.5}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.598,skewY:168.402,x:27.7,y:188.95,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.4047,skewY:-167.5953,x:-46,y:184.4,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.1,scaleX:0.9987,scaleY:0.9987,rotation:-37.9267,x:-44.4,y:50.55}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:123.684,skewY:-56.316,x:-111.6,y:103.55,regX:5.8,regY:-8.3}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:135.9119,skewY:-44.0881,x:-115.2,y:111.5,regX:6.8,regY:-1}},{t:this.instance_2,p:{regX:35.8,scaleX:0.9988,scaleY:0.9988,rotation:-100.0522,y:-22.95,regY:0.5,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{rotation:-2.235,x:-4.75,y:-57.8}},{t:this.instance_16,p:{skewX:-6.4013,skewY:173.5987,x:4.1,regY:53.6,y:-78.7,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.6,rotation:11.8944,x:-23.1,y:91.3,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:72.8254,x:47.45,y:-26.4,regY:-1}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:108.1576,x:70.45,y:44.7,regY:-0.1}},{t:this.instance_12,p:{regY:8,scaleX:0.9988,scaleY:0.9988,skewX:-63.3923,skewY:116.6077,x:45.5,y:121.65,regX:-6.5}},{t:this.instance_11,p:{regY:3.5,skewX:-70.7841,skewY:109.2159,x:44.2,y:132.85,scaleX:0.9988,scaleY:0.9988,regX:-5.2}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.9851,y:92.1,x:17,regX:-0.5}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.598,skewY:168.402,x:27.7,y:188.95,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.4047,skewY:-167.5953,x:-46,y:184.4,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.1,scaleX:0.9987,scaleY:0.9987,rotation:-37.0233,x:-43.85,y:50.45}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:124.5866,skewY:-55.4134,x:-111.85,y:102.35,regX:5.8,regY:-8.3}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:136.8148,skewY:-43.1852,x:-115.5,y:110.3,regX:6.8,regY:-1}},{t:this.instance_2,p:{regX:35.8,scaleX:0.9988,scaleY:0.9988,rotation:-100.5218,y:-22.95,regY:0.5,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{rotation:-2.2622,x:-4.8,y:-57.8}},{t:this.instance_16,p:{skewX:-6.6347,skewY:173.3653,x:4.1,regY:53.6,y:-78.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.6,rotation:11.8944,x:-23.1,y:91.3,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:72.4625,x:47.4,y:-26.4,regY:-1}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:107.7593,x:70.95,y:44.6,regY:-0.1}},{t:this.instance_12,p:{regY:7.9,scaleX:0.9988,scaleY:0.9988,skewX:-63.79,skewY:116.21,x:46.35,y:121.65,regX:-6.5}},{t:this.instance_11,p:{regY:3.5,skewX:-71.1822,skewY:108.8178,x:45.3,y:132.85,scaleX:0.9988,scaleY:0.9988,regX:-5.2}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.9851,y:92.1,x:17,regX:-0.5}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.598,skewY:168.402,x:27.7,y:188.95,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.4047,skewY:-167.5953,x:-46,y:184.4,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.1,scaleX:0.9987,scaleY:0.9987,rotation:-36.1197,x:-43.2,y:50.3}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:125.491,skewY:-54.509,x:-112.05,y:101.15,regX:5.8,regY:-8.3}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:137.7175,skewY:-42.2825,x:-115.9,y:109,regX:6.8,regY:-1}},{t:this.instance_2,p:{regX:35.8,scaleX:0.9988,scaleY:0.9988,rotation:-100.9915,y:-22.95,regY:0.6,x:-57.1}}]},1).to({state:[{t:this.instance_17,p:{rotation:-2.2902,x:-4.8,y:-57.8}},{t:this.instance_16,p:{skewX:-6.8681,skewY:173.1319,x:4.1,regY:53.6,y:-78.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.6,rotation:11.8944,x:-23.1,y:91.25,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:72.1004,x:47.4,y:-26.35,regY:-1}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:107.3607,x:71.35,y:44.4,regY:-0.1}},{t:this.instance_12,p:{regY:8,scaleX:0.9988,scaleY:0.9988,skewX:-64.1878,skewY:115.8122,x:47.45,y:121.7,regX:-6.5}},{t:this.instance_11,p:{regY:3.5,skewX:-71.5792,skewY:108.4208,x:46.3,y:132.85,scaleX:0.9988,scaleY:0.9988,regX:-5.2}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.9851,y:92.1,x:17,regX:-0.5}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.598,skewY:168.402,x:27.65,y:188.95,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.4047,skewY:-167.5953,x:-46,y:184.4,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.1,scaleX:0.9987,scaleY:0.9987,rotation:-35.2162,x:-42.6,y:50.15}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:126.3941,skewY:-53.6059,x:-112.3,y:100,regX:5.7,regY:-8.3}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:138.6215,skewY:-41.3785,x:-116.15,y:107.65,regX:6.8,regY:-1}},{t:this.instance_2,p:{regX:35.8,scaleX:0.9988,scaleY:0.9988,rotation:-101.46,y:-23,regY:0.5,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{rotation:-2.2692,x:-4.8,y:-57.8}},{t:this.instance_16,p:{skewX:-6.6795,skewY:173.3205,x:4.15,regY:53.6,y:-78.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.6,rotation:11.8998,x:-23.2,y:91.3,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:72.3999,x:47.4,y:-26.3,regY:-1}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:107.6923,x:70.95,y:44.5,regY:-0.1}},{t:this.instance_12,p:{regY:8,scaleX:0.9988,scaleY:0.9988,skewX:-63.8519,skewY:116.1481,x:46.55,y:121.6,regX:-6.5}},{t:this.instance_11,p:{regY:3.5,skewX:-71.2459,skewY:108.7541,x:45.4,y:132.9,scaleX:0.9988,scaleY:0.9988,regX:-5.2}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.9816,y:92.1,x:17,regX:-0.5}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.5961,skewY:168.4039,x:27.7,y:188.95,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.4143,skewY:-167.5857,x:-46,y:184.4,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.1,scaleX:0.9987,scaleY:0.9987,rotation:-35.9498,x:-43.15,y:50.3}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:125.6622,skewY:-54.3378,x:-112.05,y:100.95,regX:5.8,regY:-8.3}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:137.8836,skewY:-42.1164,x:-115.95,y:108.8,regX:6.8,regY:-1}},{t:this.instance_2,p:{regX:35.8,scaleX:0.9988,scaleY:0.9988,rotation:-101.0761,y:-22.95,regY:0.6,x:-57.1}}]},1).to({state:[{t:this.instance_17,p:{rotation:-2.2473,x:-4.8,y:-57.8}},{t:this.instance_16,p:{skewX:-6.4929,skewY:173.5071,x:4.1,regY:53.6,y:-78.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.6,rotation:11.9042,x:-23.2,y:91.3,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:72.7011,x:47.5,y:-26.35,regY:-1}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:108.0233,x:70.75,y:44.65,regY:-0.2}},{t:this.instance_12,p:{regY:8,scaleX:0.9988,scaleY:0.9988,skewX:-63.5148,skewY:116.4852,x:45.75,y:121.7,regX:-6.4}},{t:this.instance_11,p:{regY:3.5,skewX:-70.9109,skewY:109.0891,x:44.45,y:133,scaleX:0.9988,scaleY:0.9988,regX:-5.1}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.9772,y:92.1,x:17,regX:-0.5}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.5942,skewY:168.4058,x:27.7,y:188.95,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.4253,skewY:-167.5747,x:-46,y:184.35,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.1,scaleX:0.9987,scaleY:0.9987,rotation:-36.6824,x:-43.65,y:50.4}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:124.9319,skewY:-55.0681,x:-111.8,y:101.95,regX:5.8,regY:-8.4}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:137.1444,skewY:-42.8556,x:-115.55,y:109.85,regX:6.8,regY:-1.1}},{t:this.instance_2,p:{regX:35.8,scaleX:0.9988,scaleY:0.9988,rotation:-100.6921,y:-22.95,regY:0.5,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{rotation:-2.2263,x:-4.8,y:-57.8}},{t:this.instance_16,p:{skewX:-6.3052,skewY:173.6948,x:4.1,regY:53.6,y:-78.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.6,rotation:11.9087,x:-23.2,y:91.3,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:73.0024,x:47.45,y:-26.3,regY:-1}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:108.3558,x:70.25,y:44.8,regY:-0.1}},{t:this.instance_12,p:{regY:8,scaleX:0.9988,scaleY:0.9988,skewX:-63.1778,skewY:116.8222,x:45,y:121.6,regX:-6.5}},{t:this.instance_11,p:{regY:3.5,skewX:-70.5754,skewY:109.4246,x:43.7,y:132.8,scaleX:0.9988,scaleY:0.9988,regX:-5.2}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.9728,y:92.1,x:17,regX:-0.5}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.5927,skewY:168.4073,x:27.7,y:188.95,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.4359,skewY:-167.5641,x:-46,y:184.4,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.1,scaleX:0.9987,scaleY:0.9987,rotation:-37.4156,x:-44.1,y:50.5}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:124.2006,skewY:-55.7994,x:-111.7,y:102.9,regX:5.8,regY:-8.4}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:136.4073,skewY:-43.5927,x:-115.45,y:110.75,regX:6.8,regY:-1}},{t:this.instance_2,p:{regX:35.9,scaleX:0.9988,scaleY:0.9988,rotation:-100.3089,y:-23.1,regY:0.5,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{rotation:-2.2053,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-6.1179,skewY:173.8821,x:4.15,regY:53.6,y:-78.6,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.6,rotation:11.9142,x:-23.15,y:91.3,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:73.3025,x:47.4,y:-26.35,regY:-1}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:108.6874,x:69.85,y:44.85,regY:-0.1}},{t:this.instance_12,p:{regY:8,scaleX:0.9988,scaleY:0.9988,skewX:-62.8411,skewY:117.1589,x:44.15,y:121.55,regX:-6.5}},{t:this.instance_11,p:{regY:3.5,skewX:-70.2412,skewY:109.7588,x:42.8,y:132.75,scaleX:0.9988,scaleY:0.9988,regX:-5.2}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.9692,y:92.1,x:17,regX:-0.5}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.5908,skewY:168.4092,x:27.7,y:188.95,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.4466,skewY:-167.5534,x:-45.9,y:184.4,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.2,scaleX:0.9987,scaleY:0.9987,rotation:-38.1488,x:-44.55,y:50.5}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:123.4696,skewY:-56.5304,x:-111.6,y:103.75,regX:5.8,regY:-8.3}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:135.6692,skewY:-44.3308,x:-115.15,y:111.75,regX:6.8,regY:-1}},{t:this.instance_2,p:{regX:35.8,scaleX:0.9988,scaleY:0.9988,rotation:-99.9251,y:-22.95,regY:0.5,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{rotation:-2.1843,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-5.9304,skewY:174.0696,x:4.15,regY:53.6,y:-78.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.6,rotation:11.9195,x:-23.2,y:91.3,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:73.6038,x:47.3,y:-26.25,regY:-0.9}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:109.0193,x:69.6,y:45.05,regY:-0.2}},{t:this.instance_12,p:{regY:8,scaleX:0.9988,scaleY:0.9988,skewX:-62.5048,skewY:117.4952,x:43.35,y:121.55,regX:-6.5}},{t:this.instance_11,p:{regY:3.5,skewX:-69.9073,skewY:110.0927,x:41.95,y:132.75,scaleX:0.9988,scaleY:0.9988,regX:-5.2}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.964,y:92.15,x:17,regX:-0.5}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.5891,skewY:168.4109,x:27.7,y:188.95,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.4576,skewY:-167.5424,x:-46,y:184.35,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.1,scaleX:0.9987,scaleY:0.9987,rotation:-38.8813,x:-45.1,y:50.65}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:122.7393,skewY:-57.2607,x:-111.35,y:104.8,regX:5.8,regY:-8.3}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:134.9307,skewY:-45.0693,x:-114.85,y:112.75,regX:6.8,regY:-1}},{t:this.instance_2,p:{regX:35.8,scaleX:0.9988,scaleY:0.9988,rotation:-99.5412,y:-22.95,regY:0.5,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{rotation:-2.1624,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-5.744,skewY:174.256,x:4.1,regY:53.6,y:-78.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.6,rotation:11.924,x:-23.2,y:91.35,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:73.9044,x:47.3,y:-26.35,regY:-0.9}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:109.3501,x:69.1,y:45.15,regY:-0.1}},{t:this.instance_12,p:{regY:7.9,scaleX:0.9988,scaleY:0.9988,skewX:-62.1681,skewY:117.8319,x:42.5,y:121.45,regX:-6.5}},{t:this.instance_11,p:{regY:3.5,skewX:-69.5716,skewY:110.4284,x:41.05,y:132.7,scaleX:0.9988,scaleY:0.9988,regX:-5.2}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.9604,y:92.15,x:17,regX:-0.5}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.5872,skewY:168.4128,x:27.7,y:188.95,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.4682,skewY:-167.5318,x:-46.05,y:184.35,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.1,scaleX:0.9987,scaleY:0.9987,rotation:-39.6136,x:-45.55,y:50.7}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:122.0082,skewY:-57.9918,x:-111.2,y:105.7,regX:5.8,regY:-8.3}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:134.1927,skewY:-45.8073,x:-114.5,y:113.75,regX:6.8,regY:-1}},{t:this.instance_2,p:{regX:35.8,scaleX:0.9988,scaleY:0.9988,rotation:-99.1565,y:-23,regY:0.5,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{rotation:-2.1414,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-5.5568,skewY:174.4432,x:4.15,regY:53.6,y:-78.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.6,rotation:11.9293,x:-23.3,y:91.3,regX:1.8}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:74.2039,x:47.45,y:-26.3,regY:-1}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:109.6814,x:68.75,y:45.3,regY:-0.1}},{t:this.instance_12,p:{regY:8,scaleX:0.9988,scaleY:0.9988,skewX:-61.8309,skewY:118.1691,x:41.7,y:121.45,regX:-6.5}},{t:this.instance_11,p:{regY:3.4,skewX:-69.237,skewY:110.763,x:40.05,y:132.6,scaleX:0.9988,scaleY:0.9988,regX:-5.2}},{t:this.instance_10,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.9559,y:92.15,x:17,regX:-0.5}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.5853,skewY:168.4147,x:27.7,y:188.95,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.479,skewY:-167.521,x:-46.05,y:184.4,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.1,scaleX:0.9987,scaleY:0.9987,rotation:-40.3469,x:-46.1,y:50.85}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:121.2777,skewY:-58.7223,x:-110.9,y:106.65,regX:5.8,regY:-8.4}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:133.4546,skewY:-46.5454,x:-114.2,y:114.65,regX:6.8,regY:-1}},{t:this.instance_2,p:{regX:35.9,scaleX:0.9988,scaleY:0.9988,rotation:-98.7744,y:-23.1,regY:0.5,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{rotation:-2.1204,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-5.3686,skewY:174.6314,x:4.15,regY:53.6,y:-78.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.6,rotation:11.9344,x:-23.15,y:91.35,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:74.5049,x:47.45,y:-26.35,regY:-1}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:110.0137,x:68.35,y:45.35,regY:-0.1}},{t:this.instance_12,p:{regY:8,scaleX:0.9988,scaleY:0.9988,skewX:-61.4945,skewY:118.5055,x:40.95,y:121.4,regX:-6.5}},{t:this.instance_11,p:{regY:3.5,skewX:-68.9031,skewY:111.0969,x:39.25,y:132.6,scaleX:0.9988,scaleY:0.9988,regX:-5.2}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.9517,y:92.15,x:16.95,regX:-0.5}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.5836,skewY:168.4164,x:27.7,y:188.95,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.4888,skewY:-167.5112,x:-46.05,y:184.4,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.1,scaleX:0.9987,scaleY:0.9987,rotation:-41.0799,x:-46.5,y:50.9}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:120.5466,skewY:-59.4534,x:-110.75,y:107.4,regX:5.8,regY:-8.3}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:132.7163,skewY:-47.2837,x:-113.8,y:115.65,regX:6.8,regY:-1}},{t:this.instance_2,p:{regX:35.8,scaleX:0.9988,scaleY:0.9988,rotation:-98.3894,y:-22.9,regY:0.5,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{rotation:-2.0994,x:-4.75,y:-57.85}},{t:this.instance_16,p:{skewX:-5.1814,skewY:174.8186,x:4.2,regY:53.6,y:-78.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.6,rotation:11.9401,x:-23.2,y:91.35,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:74.8051,x:47.4,y:-26.3,regY:-1}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:110.3441,x:67.95,y:45.5,regY:-0.1}},{t:this.instance_12,p:{regY:8,scaleX:0.9988,scaleY:0.9988,skewX:-61.1572,skewY:118.8428,x:40.15,y:121.3,regX:-6.5}},{t:this.instance_11,p:{regY:3.5,skewX:-68.5686,skewY:111.4314,x:38.4,y:132.5,scaleX:0.9987,scaleY:0.9987,regX:-5.2}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.948,y:92.15,x:16.95,regX:-0.5}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.5819,skewY:168.4181,x:27.65,y:188.95,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.5005,skewY:-167.4995,x:-45.95,y:184.35,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.1,scaleX:0.9987,scaleY:0.9987,rotation:-41.813,x:-47,y:50.95}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:119.8155,skewY:-60.1845,x:-110.45,y:108.35,regX:5.8,regY:-8.3}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:131.9788,skewY:-48.0212,x:-113.45,y:116.5,regX:6.9,regY:-1}},{t:this.instance_2,p:{regX:35.8,scaleX:0.9988,scaleY:0.9988,rotation:-98.0064,y:-22.95,regY:0.5,x:-57.3}}]},1).to({state:[{t:this.instance_17,p:{rotation:-2.0775,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-4.9935,skewY:175.0065,x:4.15,regY:53.6,y:-78.65,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.6,rotation:11.9446,x:-23.2,y:91.35,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:75.1062,x:47.4,y:-26.35,regY:-1}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:110.6759,x:67.65,y:45.6,regY:-0.1}},{t:this.instance_12,p:{regY:8,scaleX:0.9988,scaleY:0.9988,skewX:-60.821,skewY:119.179,x:39.3,y:121.3,regX:-6.5}},{t:this.instance_11,p:{regY:3.5,skewX:-68.2337,skewY:111.7663,x:37.5,y:132.5,scaleX:0.9988,scaleY:0.9988,regX:-5.2}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.9446,y:92.15,x:16.85,regX:-0.6}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.5802,skewY:168.4198,x:27.65,y:188.95,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.5113,skewY:-167.4887,x:-46.05,y:184.35,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.1,scaleX:0.9987,scaleY:0.9987,rotation:-42.5449,x:-47.55,y:51}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:119.0856,skewY:-60.9144,x:-110.3,y:109.3,regX:5.8,regY:-8.3}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:131.2395,skewY:-48.7605,x:-113.15,y:117.45,regX:6.8,regY:-1}},{t:this.instance_2,p:{regX:35.8,scaleX:0.9988,scaleY:0.9988,rotation:-97.6222,y:-22.9,regY:0.5,x:-57.3}}]},1).to({state:[{t:this.instance_17,p:{rotation:-2.0565,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-4.8064,skewY:175.1936,x:4.1,regY:53.6,y:-78.65,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.6,rotation:11.9499,x:-23.15,y:91.35,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:75.4069,x:47.3,y:-26.3,regY:-0.9}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:111.0067,x:67.25,y:45.7,regY:-0.1}},{t:this.instance_12,p:{regY:7.9,scaleX:0.9988,scaleY:0.9988,skewX:-60.484,skewY:119.516,x:38.35,y:121.2,regX:-6.5}},{t:this.instance_11,p:{regY:3.5,skewX:-67.8979,skewY:112.1021,x:36.65,y:132.4,scaleX:0.9988,scaleY:0.9988,regX:-5.2}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.9392,y:92.15,x:16.85,regX:-0.6}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.5783,skewY:168.4217,x:27.65,y:188.95,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.5211,skewY:-167.4789,x:-46.1,y:184.35,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.1,scaleX:0.9987,scaleY:0.9987,rotation:-43.2796,x:-48.05,y:51.05}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:118.3535,skewY:-61.6465,x:-109.9,y:110.2,regX:5.8,regY:-8.4}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:130.5016,skewY:-49.4984,x:-112.8,y:118.45,regX:6.8,regY:-1}},{t:this.instance_2,p:{regX:35.8,scaleX:0.9988,scaleY:0.9988,rotation:-97.2389,y:-22.9,regY:0.5,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{rotation:-2.0354,x:-4.85,y:-57.85}},{t:this.instance_16,p:{skewX:-4.6194,skewY:175.3806,x:4.1,regY:53.6,y:-78.6,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.6,rotation:11.9544,x:-23.1,y:91.35,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:75.7069,x:47.5,y:-26.3,regY:-1}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:111.3383,x:66.9,y:45.8,regY:-0.1}},{t:this.instance_12,p:{regY:8,scaleX:0.9988,scaleY:0.9988,skewX:-60.1476,skewY:119.8524,x:37.7,y:121.15,regX:-6.5}},{t:this.instance_11,p:{regY:3.5,skewX:-67.565,skewY:112.435,x:35.75,y:132.35,scaleX:0.9988,scaleY:0.9988,regX:-5.2}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.9366,y:92.1,x:16.85,regX:-0.6}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.5764,skewY:168.4236,x:27.65,y:189,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.5328,skewY:-167.4672,x:-46.1,y:184.35,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.1,scaleX:0.9987,scaleY:0.9987,rotation:-44.0108,x:-48.55,y:51.15}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:117.6228,skewY:-62.3772,x:-109.75,y:111,regX:5.8,regY:-8.3}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:129.7634,skewY:-50.2366,x:-112.4,y:119.3,regX:6.8,regY:-1}},{t:this.instance_2,p:{regX:35.8,scaleX:0.9988,scaleY:0.9988,rotation:-96.8543,y:-22.95,regY:0.5,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{rotation:-2.0145,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-4.4325,skewY:175.5675,x:4.1,regY:53.6,y:-78.6,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.6,rotation:11.9597,x:-23.1,y:91.35,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:76.0083,x:47.4,y:-26.3,regY:-1}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:111.6712,x:66.55,y:45.95,regY:-0.1}},{t:this.instance_12,p:{regY:8,scaleX:0.9988,scaleY:0.9988,skewX:-59.8095,skewY:120.1905,x:36.85,y:121.05,regX:-6.5}},{t:this.instance_11,p:{regY:3.5,skewX:-67.2286,skewY:112.7714,x:34.85,y:132.25,scaleX:0.9988,scaleY:0.9988,regX:-5.2}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.9322,y:92.1,x:16.85,regX:-0.6}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.5738,skewY:168.4262,x:27.65,y:189,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.5434,skewY:-167.4564,x:-46.1,y:184.4,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.1,scaleX:0.9987,scaleY:0.9987,rotation:-44.7431,x:-49.05,y:51.2}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:116.8919,skewY:-63.1081,x:-109.5,y:111.8,regX:5.8,regY:-8.3}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:129.0257,skewY:-50.9743,x:-111.9,y:120.15,regX:6.9,regY:-1.1}},{t:this.instance_2,p:{regX:35.8,scaleX:0.9988,scaleY:0.9988,rotation:-96.4711,y:-22.95,regY:0.5,x:-57.35}}]},1).to({state:[{t:this.instance_17,p:{rotation:-1.9925,x:-4.85,y:-57.85}},{t:this.instance_16,p:{skewX:-4.2446,skewY:175.7554,x:4.05,regY:53.6,y:-78.65,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.6,rotation:11.9652,x:-23.15,y:91.35,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:76.3077,x:47.3,y:-26.3,regY:-0.9}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:112.0015,x:66.1,y:45.95,regY:-0.1}},{t:this.instance_12,p:{regY:8,scaleX:0.9988,scaleY:0.9988,skewX:-59.4737,skewY:120.5263,x:36.05,y:121,regX:-6.5}},{t:this.instance_11,p:{regY:3.4,skewX:-66.8953,skewY:113.1047,x:33.9,y:132.05,scaleX:0.9988,scaleY:0.9988,regX:-5.2}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.9277,y:92.1,x:16.85,regX:-0.6}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.5729,skewY:168.4271,x:27.65,y:189,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.5543,skewY:-167.4457,x:-46,y:184.35,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.1,scaleX:0.9987,scaleY:0.9987,rotation:-45.4773,x:-49.55,y:51.25}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:116.1611,skewY:-63.8389,x:-109.05,y:112.7,regX:5.8,regY:-8.4}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:128.2882,skewY:-51.7118,x:-111.55,y:120.9,regX:6.9,regY:-1}},{t:this.instance_2,p:{regX:35.8,scaleX:0.9988,scaleY:0.9988,rotation:-96.087,y:-22.95,regY:0.5,x:-57.3}}]},1).to({state:[{t:this.instance_17,p:{rotation:-1.9715,x:-4.75,y:-57.85}},{t:this.instance_16,p:{skewX:-4.057,skewY:175.943,x:4.15,regY:53.5,y:-78.75,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.6,rotation:11.9696,x:-23.15,y:91.3,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:76.6094,x:47.3,y:-26.25,regY:-0.9}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:112.3332,x:65.7,y:46.1,regY:-0.1}},{t:this.instance_12,p:{regY:7.9,scaleX:0.9988,scaleY:0.9988,skewX:-59.1362,skewY:120.8638,x:35.15,y:120.9,regX:-6.5}},{t:this.instance_11,p:{regY:3.5,skewX:-66.56,skewY:113.44,x:33.1,y:132.1,scaleX:0.9988,scaleY:0.9988,regX:-5.2}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.9243,y:92.1,x:16.9,regX:-0.6}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.5712,skewY:168.4288,x:27.65,y:189,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.5651,skewY:-167.4349,x:-46.15,y:184.35,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.1,scaleX:0.9987,scaleY:0.9987,rotation:-46.2108,x:-50,y:51.35}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:115.4309,skewY:-64.5691,x:-108.9,y:113.45,regX:5.8,regY:-8.3}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:127.5502,skewY:-52.4498,x:-111.2,y:121.8,regX:6.9,regY:-1}},{t:this.instance_2,p:{regX:35.8,scaleX:0.9988,scaleY:0.9988,rotation:-95.7034,y:-22.95,regY:0.5,x:-57.3}}]},1).to({state:[{t:this.instance_17,p:{rotation:-1.9505,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-3.8692,skewY:176.1308,x:4.1,regY:53.6,y:-78.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.6,rotation:11.9758,x:-23.15,y:91.3,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:76.9096,x:47.45,y:-26.35,regY:-1}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:112.6647,x:65.4,y:46.2,regY:-0.1}},{t:this.instance_12,p:{regY:8,scaleX:0.9988,scaleY:0.9988,skewX:-58.7992,skewY:121.2008,x:34.45,y:120.9,regX:-6.5}},{t:this.instance_11,p:{regY:3.5,skewX:-66.2265,skewY:113.7735,x:32.2,y:132.05,scaleX:0.9988,scaleY:0.9988,regX:-5.1}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.9198,y:92.1,x:16.85,regX:-0.6}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.5685,skewY:168.4315,x:27.65,y:189,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.5759,skewY:-167.4241,x:-46.15,y:184.35,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.1,scaleX:0.9987,scaleY:0.9987,rotation:-46.9434,x:-50.55,y:51.35}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:114.6998,skewY:-65.3002,x:-108.55,y:114.3,regX:5.8,regY:-8.4}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:126.8121,skewY:-53.1879,x:-110.8,y:122.7,regX:6.8,regY:-1}},{t:this.instance_2,p:{regX:35.8,scaleX:0.9988,scaleY:0.9988,rotation:-95.32,y:-23,regY:0.5,x:-57.3}}]},1).to({state:[{t:this.instance_17,p:{rotation:-1.9296,x:-4.75,y:-57.85}},{t:this.instance_16,p:{skewX:-3.6817,skewY:176.3183,x:4.1,regY:53.6,y:-78.6,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.6,rotation:11.9803,x:-23.15,y:91.3,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:77.2096,x:47.4,y:-26.3,regY:-1}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:112.995,x:65.15,y:46.3,regY:-0.2}},{t:this.instance_12,p:{regY:7.9,scaleX:0.9988,scaleY:0.9988,skewX:-58.4626,skewY:121.5374,x:33.5,y:120.7,regX:-6.5}},{t:this.instance_11,p:{regY:3.5,skewX:-65.891,skewY:114.109,x:31.3,y:131.9,scaleX:0.9988,scaleY:0.9988,regX:-5.2}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.9154,y:92.1,x:16.85,regX:-0.6}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.5666,skewY:168.4334,x:27.65,y:189,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.5865,skewY:-167.4135,x:-46.15,y:184.35,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.1,scaleX:0.9987,scaleY:0.9987,rotation:-47.6744,x:-51.05,y:51.4}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:113.9684,skewY:-66.0316,x:-108.25,y:115,regX:5.8,regY:-8.3}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:126.074,skewY:-53.926,x:-110.4,y:123.55,regX:6.8,regY:-1}},{t:this.instance_2,p:{regX:35.8,scaleX:0.9988,scaleY:0.9988,rotation:-94.9359,y:-22.9,regY:0.5,x:-57.3}}]},1).to({state:[{t:this.instance_17,p:{rotation:-1.9067,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-3.4949,skewY:176.5051,x:4.1,regY:53.5,y:-78.75,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.6,rotation:11.9847,x:-23.2,y:91.3,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:77.511,x:47.45,y:-26.3,regY:-1}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:113.328,x:64.6,y:46.35,regY:-0.1}},{t:this.instance_12,p:{regY:8,scaleX:0.9988,scaleY:0.9988,skewX:-58.1265,skewY:121.8735,x:32.85,y:120.65,regX:-6.5}},{t:this.instance_11,p:{regY:3.5,skewX:-65.556,skewY:114.444,x:30.5,y:131.7,scaleX:0.9988,scaleY:0.9988,regX:-5.2}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.9119,y:92.1,x:16.85,regX:-0.6}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.5657,skewY:168.4343,x:27.6,y:189,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.5976,skewY:-167.4024,x:-46.15,y:184.4,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.1,scaleX:0.9987,scaleY:0.9987,rotation:-48.409,x:-51.5,y:51.45}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:113.2374,skewY:-66.7626,x:-107.95,y:115.85,regX:5.8,regY:-8.3}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:125.3364,skewY:-54.6636,x:-110,y:124.35,regX:6.8,regY:-1}},{t:this.instance_2,p:{regX:35.8,scaleX:0.9988,scaleY:0.9988,rotation:-94.5521,y:-23,regY:0.5,x:-57.3}}]},1).to({state:[{t:this.instance_17,p:{rotation:-1.8857,x:-4.75,y:-57.85}},{t:this.instance_16,p:{skewX:-3.3082,skewY:176.6918,x:4.15,regY:53.5,y:-78.8,scaleX:0.9992,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.6,rotation:11.9903,x:-23.3,y:91.25,regX:1.8}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:77.8121,x:47.45,y:-26.3,regY:-1}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:113.6589,x:64.2,y:46.4,regY:-0.1}},{t:this.instance_12,p:{regY:8,scaleX:0.9988,scaleY:0.9988,skewX:-57.7896,skewY:122.2104,x:32,y:120.55,regX:-6.5}},{t:this.instance_11,p:{regY:3.5,skewX:-65.2223,skewY:114.7777,x:29.55,y:131.65,scaleX:0.9988,scaleY:0.9988,regX:-5.2}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.9075,y:92.1,x:16.85,regX:-0.6}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.5638,skewY:168.4362,x:27.6,y:189,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.6082,skewY:-167.3918,x:-46.05,y:184.35,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.1,scaleX:0.9987,scaleY:0.9987,rotation:-49.141,x:-52,y:51.5}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:112.507,skewY:-67.493,x:-107.7,y:116.55,regX:5.8,regY:-8.3}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:124.5983,skewY:-55.4017,x:-109.6,y:125.1,regX:6.8,regY:-1}},{t:this.instance_2,p:{regX:35.8,scaleX:0.9988,scaleY:0.9988,rotation:-94.1684,y:-22.95,regY:0.5,x:-57.3}}]},1).to({state:[{t:this.instance_17,p:{rotation:-1.8647,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-3.1207,skewY:176.8793,x:4.1,regY:53.6,y:-78.65,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.6,rotation:11.9956,x:-23.25,y:91.25,regX:1.8}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:78.1119,x:47.5,y:-26.35,regY:-1}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:113.9892,x:63.9,y:46.55,regY:-0.1}},{t:this.instance_12,p:{regY:7.9,scaleX:0.9988,scaleY:0.9988,skewX:-57.4523,skewY:122.5477,x:31.15,y:120.45,regX:-6.5}},{t:this.instance_11,p:{regY:3.5,skewX:-64.8871,skewY:115.1129,x:28.7,y:131.55,scaleX:0.9987,scaleY:0.9987,regX:-5.2}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.9031,y:92.1,x:16.85,regX:-0.6}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.5614,skewY:168.4386,x:27.6,y:189,scaleX:0.998,scaleY:0.998}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.6188,skewY:-167.3812,x:-46.15,y:184.35,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.1,scaleX:0.9987,scaleY:0.9987,rotation:-49.8738,x:-52.4,y:51.5}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:111.7756,skewY:-68.2244,x:-107.35,y:117.35,regX:5.8,regY:-8.3}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:123.8596,skewY:-56.1404,x:-109,y:125.75,regX:6.9,regY:-1}},{t:this.instance_2,p:{regX:35.9,scaleX:0.9988,scaleY:0.9988,rotation:-93.7841,y:-23.05,regY:0.5,x:-57.3}}]},1).to({state:[{t:this.instance_17,p:{rotation:-1.8437,x:-4.75,y:-57.85}},{t:this.instance_16,p:{skewX:-2.9323,skewY:177.0677,x:4.15,regY:53.6,y:-78.65,scaleX:0.9992,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.6,rotation:12,x:-23.15,y:91.3,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:78.4132,x:47.45,y:-26.3,regY:-1}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:114.3211,x:63.55,y:46.65,regY:-0.2}},{t:this.instance_12,p:{regY:8,scaleX:0.9988,scaleY:0.9988,skewX:-57.1165,skewY:122.8835,x:30.35,y:120.35,regX:-6.5}},{t:this.instance_11,p:{regY:3.5,skewX:-64.5523,skewY:115.4477,x:27.85,y:131.35,scaleX:0.9988,scaleY:0.9988,regX:-5.2}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.8996,y:92.1,x:16.85,regX:-0.6}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.5604,skewY:168.4396,x:27.6,y:189,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.6299,skewY:-167.3701,x:-46.2,y:184.35,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.1,scaleX:0.9987,scaleY:0.9987,rotation:-50.6071,x:-53,y:51.55}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:111.0452,skewY:-68.9548,x:-106.9,y:118.05,regX:5.8,regY:-8.3}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:123.1207,skewY:-56.8793,x:-108.65,y:126.6,regX:6.8,regY:-1}},{t:this.instance_2,p:{regX:35.9,scaleX:0.9988,scaleY:0.9988,rotation:-93.4009,y:-23.1,regY:0.5,x:-57.35}}]},1).to({state:[{t:this.instance_17,p:{rotation:-1.8227,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-2.7448,skewY:177.2552,x:4.15,regY:53.6,y:-78.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.6,rotation:12.0054,x:-23.2,y:91.3,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:78.7134,x:47.45,y:-26.3,regY:-1}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:114.6529,x:63.15,y:46.7,regY:-0.1}},{t:this.instance_12,p:{regY:8,scaleX:0.9988,scaleY:0.9988,skewX:-56.7792,skewY:123.2208,x:29.6,y:120.25,regX:-6.5}},{t:this.instance_11,p:{regY:3.5,skewX:-64.2179,skewY:115.7821,x:26.95,y:131.25,scaleX:0.9987,scaleY:0.9987,regX:-5.2}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.8952,y:92.1,x:16.85,regX:-0.6}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.5587,skewY:168.4413,x:27.6,y:189,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.6403,skewY:-167.3597,x:-46.2,y:184.35,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.1,scaleX:0.9987,scaleY:0.9987,rotation:-51.3391,x:-53.5,y:51.6}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:110.3145,skewY:-69.6855,x:-106.6,y:118.8,regX:5.8,regY:-8.3}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:122.3831,skewY:-57.6169,x:-108.15,y:127.4,regX:6.8,regY:-1}},{t:this.instance_2,p:{regX:35.8,scaleX:0.9988,scaleY:0.9988,rotation:-93.0168,y:-22.95,regY:0.5,x:-57.35}}]},1).to({state:[{t:this.instance_17,p:{rotation:-1.8008,x:-4.75,y:-57.85}},{t:this.instance_16,p:{skewX:-2.5574,skewY:177.4426,x:4.15,regY:53.6,y:-78.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.6,rotation:12.0107,x:-23.15,y:91.3,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:79.014,x:47.5,y:-26.35,regY:-1}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:114.9838,x:62.7,y:46.8,regY:-0.1}},{t:this.instance_12,p:{regY:8,scaleX:0.9988,scaleY:0.9988,skewX:-56.4425,skewY:123.5575,x:28.75,y:120.15,regX:-6.4}},{t:this.instance_11,p:{regY:3.5,skewX:-63.8816,skewY:116.1184,x:26.15,y:131.15,scaleX:0.9988,scaleY:0.9988,regX:-5.2}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.8915,y:92.1,x:16.9,regX:-0.6}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.5568,skewY:168.4432,x:27.6,y:189,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.6511,skewY:-167.3489,x:-46.2,y:184.4,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.1,scaleX:0.9987,scaleY:0.9987,rotation:-52.0727,x:-54,y:51.65}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:109.5835,skewY:-70.4165,x:-106.3,y:119.6,regX:5.7,regY:-8.3}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:121.6444,skewY:-58.3556,x:-107.6,y:127.95,regX:6.9,regY:-1}},{t:this.instance_2,p:{regX:35.8,scaleX:0.9988,scaleY:0.9988,rotation:-92.6338,y:-22.95,regY:0.5,x:-57.35}}]},1).to({state:[{t:this.instance_17,p:{rotation:-1.7799,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-2.37,skewY:177.63,x:4.15,regY:53.5,y:-78.75,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.6,rotation:12.0162,x:-23.15,y:91.3,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:79.3151,x:47.5,y:-26.3,regY:-1}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:115.3159,x:62.4,y:46.9,regY:-0.1}},{t:this.instance_12,p:{regY:8,scaleX:0.9988,scaleY:0.9988,skewX:-56.106,skewY:123.894,x:28,y:120,regX:-6.5}},{t:this.instance_11,p:{regY:3.5,skewX:-63.5489,skewY:116.4511,x:25.2,y:131.05,scaleX:0.9988,scaleY:0.9988,regX:-5.2}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.8872,y:92.1,x:16.85,regX:-0.6}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.5549,skewY:168.4451,x:27.6,y:189,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.6621,skewY:-167.3379,x:-46.1,y:184.35,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.1,scaleX:0.9987,scaleY:0.9987,rotation:-52.806,x:-54.45,y:51.65}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:108.8529,skewY:-71.1471,x:-105.9,y:120.15,regX:5.8,regY:-8.3}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:120.907,skewY:-59.093,x:-107.15,y:128.7,regX:6.9,regY:-1}},{t:this.instance_2,p:{regX:35.8,scaleX:0.9988,scaleY:0.9988,rotation:-92.2493,y:-22.95,regY:0.5,x:-57.3}}]},1).to({state:[{t:this.instance_17,p:{rotation:-1.7588,x:-4.75,y:-57.85}},{t:this.instance_16,p:{skewX:-2.1835,skewY:177.8165,x:4.2,regY:53.5,y:-78.75,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.6,rotation:12.0206,x:-23.1,y:91.3,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:79.6154,x:47.45,y:-26.3,regY:-1}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:115.6479,x:61.95,y:46.95,regY:-0.1}},{t:this.instance_12,p:{regY:7.9,scaleX:0.9988,scaleY:0.9988,skewX:-55.7693,skewY:124.2307,x:27.1,y:119.85,regX:-6.5}},{t:this.instance_11,p:{regY:3.5,skewX:-63.2138,skewY:116.7862,x:24.35,y:130.9,scaleX:0.9988,scaleY:0.9988,regX:-5.2}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.8827,y:92.1,x:16.85,regX:-0.6}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.5534,skewY:168.4466,x:27.6,y:189,scaleX:0.998,scaleY:0.998}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.6728,skewY:-167.3272,x:-46.2,y:184.35,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.1,scaleX:0.9987,scaleY:0.9987,rotation:-53.5379,x:-54.95,y:51.75}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:108.1213,skewY:-71.8787,x:-105.45,y:120.9,regX:5.8,regY:-8.4}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:120.1688,skewY:-59.8312,x:-106.7,y:129.45,regX:6.8,regY:-1}},{t:this.instance_2,p:{regX:35.8,scaleX:0.9988,scaleY:0.9988,rotation:-91.8665,y:-22.95,regY:0.5,x:-57.3}}]},1).to({state:[{t:this.instance_17,p:{rotation:-1.7378,x:-4.85,y:-57.85}},{t:this.instance_16,p:{skewX:-1.9961,skewY:178.0039,x:4.2,regY:53.6,y:-78.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.6,rotation:12.0258,x:-23.15,y:91.3,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:79.916,x:47.45,y:-26.2,regY:-1}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:115.9794,x:61.55,y:47,regY:-0.1}},{t:this.instance_12,p:{regY:8,scaleX:0.9988,scaleY:0.9988,skewX:-55.4325,skewY:124.5675,x:26.45,y:119.75,regX:-6.5}},{t:this.instance_11,p:{regY:3.4,skewX:-62.8791,skewY:117.1209,x:23.35,y:130.75,scaleX:0.9988,scaleY:0.9988,regX:-5.2}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.8793,y:92.1,x:16.85,regX:-0.6}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.5515,skewY:168.4485,x:27.55,y:189,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.6834,skewY:-167.3166,x:-46.25,y:184.35,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.1,scaleX:0.9987,scaleY:0.9987,rotation:-54.2715,x:-55.45,y:51.7}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:107.3903,skewY:-72.6097,x:-105.1,y:121.45,regX:5.8,regY:-8.3}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:119.4303,skewY:-60.5697,x:-106.25,y:130.15,regX:6.8,regY:-1}},{t:this.instance_2,p:{regX:35.8,scaleX:0.9988,scaleY:0.9988,rotation:-91.4829,y:-23,regY:0.5,x:-57.35}}]},1).to({state:[{t:this.instance_17,p:{rotation:-1.7159,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-1.8079,skewY:178.1921,x:4.2,regY:53.6,y:-78.55,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.6,rotation:12.0302,x:-23.15,y:91.3,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:80.2155,x:47.55,y:-26.2,regY:-1}},{t:this.instance_13,p:{scaleX:0.9988,scaleY:0.9988,rotation:116.3086,x:61.35,y:47.15,regY:-0.2}},{t:this.instance_12,p:{regY:8,scaleX:0.9988,scaleY:0.9988,skewX:-55.0967,skewY:124.9033,x:25.6,y:119.65,regX:-6.5}},{t:this.instance_11,p:{regY:3.5,skewX:-62.5459,skewY:117.4541,x:22.6,y:130.75,scaleX:0.9988,scaleY:0.9988,regX:-5.1}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.8748,y:92.1,x:16.85,regX:-0.6}},{t:this.instance_9,p:{regY:-54.2,skewX:-11.5498,skewY:168.4502,x:27.55,y:189,scaleX:0.998,scaleY:0.998}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9985,scaleY:0.9985,skewX:12.6936,skewY:-167.3064,x:-46.25,y:184.35,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{regX:44.1,scaleX:0.9987,scaleY:0.9987,rotation:-55.0041,x:-56,y:51.7}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,skewX:106.6604,skewY:-73.3396,x:-104.7,y:122.2,regX:5.8,regY:-8.3}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,skewX:118.6935,skewY:-61.3065,x:-105.6,y:130.95,regX:6.8,regY:-1.1}},{t:this.instance_2,p:{regX:35.8,scaleX:0.9988,scaleY:0.9988,rotation:-91.0986,y:-22.95,regY:0.5,x:-57.35}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-143.5,-370.8,252,676);


(lib.CharacterCivilian_07_2 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-59.55,-12.4,0.9971,0.9971,-71.549,0,0,33.2,9.7);

	this.instance_1 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_1.setTransform(-89.9,141.3,0.9967,0.9967,-117.1684,0,0,14.2,0.2);

	this.instance_2 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_2.setTransform(-90.85,141.25,0.997,0.997,-97.7721,0,0,4.5,-9.2);

	this.instance_3 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_3.setTransform(-85.1,55.55,0.9969,0.9969,-91.5455,0,0,43.6,7.6);

	this.instance_4 = new lib.ch1_headcopy_1("synched",0);
	this.instance_4.setTransform(-6.3,-81.4,0.9978,0.9978,-3.8906,0,0,1.2,51);

	this.instance_5 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_5.setTransform(-7.35,-36,1,1,0,0,0,-0.1,-39.6);

	this.instance_6 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_6.setTransform(24.8,88.25,0.9943,0.9943,-8.9633,0,0,0.7,4.8);

	this.instance_7 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_7.setTransform(-30.15,90.95,0.9952,0.9952,3.9256,0,0,1.4,-41.6);

	this.instance_8 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_8.setTransform(-41.8,185.95,0.9946,0.9946,10.844,0,0,1.1,-51.1);

	this.instance_9 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_9.setTransform(-4.25,-59.9,0.9979,0.9979,-6.7831,0,0,-1.4,6.8);

	this.instance_10 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_10.setTransform(34.7,185.2,0.9945,0.9945,-7.6092,0,0,4.5,-50.9);

	this.instance_11 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_11.setTransform(92.25,131.7,0.9968,0.9968,55.3952,0,0,-9.9,11);

	this.instance_12 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_12.setTransform(91.55,128.2,0.9968,0.9968,53.9997,0,0,-7.2,13.1);

	this.instance_13 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_13.setTransform(56,49.35,0.9971,0.9971,71.2778,0,0,-45.4,12.2);

	this.instance_14 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_14.setTransform(48.6,-20.55,0.9973,0.9973,84.5009,0,0,-31.8,13.1);

	this.instance_15 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_15.setTransform(-10.8,49.35,0.9993,0.9993,1.7755,0,0,-5.5,-21.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{regY:-21.6,scaleX:0.9993,scaleY:0.9993,rotation:1.7755,x:-10.8,y:49.35}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9973,scaleY:0.9973,rotation:84.5009,x:48.6,y:-20.55,regY:13.1}},{t:this.instance_13,p:{regX:-45.4,scaleX:0.9971,scaleY:0.9971,rotation:71.2778,x:56,regY:12.2,y:49.35}},{t:this.instance_12,p:{scaleX:0.9968,scaleY:0.9968,rotation:53.9997,x:91.55,y:128.2,regY:13.1}},{t:this.instance_11,p:{regY:11,scaleX:0.9968,scaleY:0.9968,rotation:55.3952,x:92.25,y:131.7,regX:-9.9}},{t:this.instance_10,p:{regY:-50.9,scaleX:0.9945,scaleY:0.9945,rotation:-7.6092,x:34.7,y:185.2,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-6.7831,y:-59.9,x:-4.25,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9946,scaleY:0.9946,rotation:10.844,y:185.95,x:-41.8,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9952,scaleY:0.9952,rotation:3.9256,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.7,regY:4.8,scaleX:0.9943,scaleY:0.9943,rotation:-8.9633,y:88.25,x:24.8}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-3.8906,x:-6.3,y:-81.4,regX:1.2}},{t:this.instance_3,p:{regY:7.6,scaleX:0.9969,scaleY:0.9969,rotation:-91.5455,x:-85.1,y:55.55,regX:43.6}},{t:this.instance_2,p:{regX:4.5,scaleX:0.997,scaleY:0.997,rotation:-97.7721,x:-90.85,y:141.25}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9967,scaleY:0.9967,rotation:-117.1684,x:-89.9,y:141.3}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-71.549,y:-12.4,regY:9.7,x:-59.55,regX:33.2}}]}).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7747,x:-10.7,y:49.35}},{t:this.instance_14,p:{regX:-31.7,scaleX:0.9972,scaleY:0.9972,rotation:84.527,x:48.65,y:-20.45,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:71.62,x:55.95,regY:12.2,y:49.35}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:56.3284,x:90.95,y:128.55,regY:13.1}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:56.5085,x:91.65,y:131.8,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-7.3905,x:34.6,y:185.25,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.7863,y:-59.85,x:-4.25,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:10.9029,y:185.9,x:-41.8,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9249,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-8.963,y:88.3,x:24.8}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.9,scaleX:0.9977,scaleY:0.9977,rotation:-3.7758,x:-6.2,y:-81.5,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-91.4596,x:-85.2,y:55.45,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.9969,scaleY:0.9969,rotation:-97.6877,x:-91,y:141.3}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-117.0825,x:-90.05,y:141.35}},{t:this.instance,p:{scaleX:0.997,scaleY:0.997,rotation:-71.5271,y:-12.45,regY:9.7,x:-59.55,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7747,x:-10.7,y:49.35}},{t:this.instance_14,p:{regX:-31.7,scaleX:0.9972,scaleY:0.9972,rotation:84.5508,x:48.65,y:-20.45,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:71.9635,x:55.85,regY:12.2,y:49.35}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:58.6576,x:90.5,y:128.65,regY:13}},{t:this.instance_11,p:{regY:10.8,scaleX:0.9967,scaleY:0.9967,rotation:57.6231,x:91.05,y:131.95,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-7.1718,x:34.6,y:185.3,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.7897,y:-59.85,x:-4.25,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9946,scaleY:0.9946,rotation:10.9646,y:185.85,x:-41.8,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9249,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-8.963,y:88.3,x:24.8}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9977,scaleY:0.9977,rotation:-3.6599,x:-6.25,y:-81.3,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-91.3745,x:-85.2,y:55.45,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.997,scaleY:0.997,rotation:-97.6018,x:-91.15,y:141.3}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-116.9978,x:-90.25,y:141.35}},{t:this.instance,p:{scaleX:0.997,scaleY:0.997,rotation:-71.504,y:-12.45,regY:9.6,x:-59.6,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7747,x:-10.65,y:49.35}},{t:this.instance_14,p:{regX:-31.7,scaleX:0.9972,scaleY:0.9972,rotation:84.5755,x:48.6,y:-20.45,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:72.3074,x:55.85,regY:12.2,y:49.35}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:60.9855,x:89.85,y:128.9,regY:13.1}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:58.736,x:90.35,y:132.25,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-6.9548,x:34.75,y:185.2,regX:4.6}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.7934,y:-59.85,x:-4.25,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:11.0237,y:185.85,x:-41.8,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9249,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-8.963,y:88.3,x:24.8}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-3.5465,x:-6.25,y:-81.3,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-91.2894,x:-85.25,y:55.45,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.997,scaleY:0.997,rotation:-97.5177,x:-91.2,y:141.25}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-116.9127,x:-90.35,y:141.3}},{t:this.instance,p:{scaleX:0.997,scaleY:0.997,rotation:-71.4827,y:-12.45,regY:9.7,x:-59.55,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7747,x:-10.65,y:49.35}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:84.6009,x:48.6,y:-20.55,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.9969,scaleY:0.9969,rotation:72.6508,x:56,regY:12.1,y:49.3}},{t:this.instance_12,p:{scaleX:0.9966,scaleY:0.9966,rotation:63.3145,x:89.45,y:129.05,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:59.8498,x:89.65,y:132.45,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-6.736,x:34.65,y:185.3,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.7967,y:-59.85,x:-4.25,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:11.0839,y:185.85,x:-41.8,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9249,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-8.963,y:88.3,x:24.75}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-3.4324,x:-6.2,y:-81.25,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-91.2034,x:-85.25,y:55.45,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.9969,scaleY:0.9969,rotation:-97.432,x:-91.4,y:141.25}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-116.8271,x:-90.5,y:141.25}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-71.4613,y:-12.45,regY:9.7,x:-59.55,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7747,x:-10.6,y:49.35}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:84.6256,x:48.65,y:-20.65,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:72.9944,x:55.8,regY:12.2,y:49.35}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:65.6433,x:89,y:129.25,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:60.964,x:88.95,y:132.65,regX:-10}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-6.5174,x:34.55,y:185.2,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8005,y:-59.85,x:-4.25,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:11.1441,y:185.85,x:-41.8,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9249,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-8.963,y:88.3,x:24.75}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-3.3166,x:-6.2,y:-81.25,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-91.1183,x:-85.3,y:55.4,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.9969,scaleY:0.9969,rotation:-97.3471,x:-91.55,y:141.2}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-116.7424,x:-90.65,y:141.25}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-71.4383,y:-12.5,regY:9.6,x:-59.6,regX:33.3}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7747,x:-10.6,y:49.35}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:84.6503,x:48.65,y:-20.6,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:73.3381,x:55.8,regY:12.2,y:49.35}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:67.971,x:88.45,y:129.5,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:62.0783,x:88.45,y:133,regX:-9.8}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-6.2997,x:34.55,y:185.3,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8039,y:-59.85,x:-4.2,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:11.2049,y:185.8,x:-41.8,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9249,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-8.963,y:88.3,x:24.75}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-3.2017,x:-6.2,y:-81.3,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-91.0341,x:-85.35,y:55.4,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.9969,scaleY:0.9969,rotation:-97.2622,x:-91.7,y:141.2}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-116.6569,x:-90.8,y:141.25}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-71.4164,y:-12.5,regY:9.6,x:-59.6,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7747,x:-10.6,y:49.35}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:84.675,x:48.65,y:-20.65,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:73.6817,x:55.75,regY:12.2,y:49.35}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:70.3,x:88,y:129.65,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:63.1917,x:87.7,y:133.15,regX:-9.9}},{t:this.instance_10,p:{regY:-50.9,scaleX:0.9944,scaleY:0.9944,rotation:-6.0813,x:34.5,y:185.15,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8076,y:-59.85,x:-4.15,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:11.2639,y:185.8,x:-41.75,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9249,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-8.963,y:88.3,x:24.75}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-3.0876,x:-6.15,y:-81.25,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-90.9481,x:-85.35,y:55.5,regX:43.5}},{t:this.instance_2,p:{regX:4.4,scaleX:0.9969,scaleY:0.9969,rotation:-97.1765,x:-91.8,y:141.15}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-116.5717,x:-91,y:141.25}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-71.3934,y:-12.4,regY:9.7,x:-59.5,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7747,x:-10.55,y:49.35}},{t:this.instance_14,p:{regX:-31.7,scaleX:0.9972,scaleY:0.9972,rotation:84.6995,x:48.75,y:-20.45,regY:13}},{t:this.instance_13,p:{regX:-45.2,scaleX:0.997,scaleY:0.997,rotation:74.025,x:55.75,regY:12.2,y:49.5}},{t:this.instance_12,p:{scaleX:0.9966,scaleY:0.9966,rotation:72.6289,x:87.45,y:129.85,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:64.3059,x:87,y:133.2,regX:-10}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-5.8611,x:34.5,y:185.3,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.811,y:-59.85,x:-4.15,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:11.3249,y:185.75,x:-41.75,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9249,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-8.963,y:88.3,x:24.75}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-2.9726,x:-6.15,y:-81.3,regX:1.2}},{t:this.instance_3,p:{regY:7.6,scaleX:0.9968,scaleY:0.9968,rotation:-90.863,x:-85.25,y:55.35,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.9969,scaleY:0.9969,rotation:-97.0916,x:-92,y:141.15}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-116.4862,x:-91.1,y:141.15}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-71.3707,y:-12.4,regY:9.7,x:-59.5,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7747,x:-10.55,y:49.35}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:84.7252,x:48.65,y:-20.6,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:74.3686,x:55.8,regY:12.1,y:49.3}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:74.9576,x:86.95,y:130.05,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:65.4191,x:86.4,y:133.45,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-5.6447,x:34.5,y:185.3,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8145,y:-59.85,x:-4.15,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:11.3849,y:185.8,x:-41.8,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9249,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-8.963,y:88.3,x:24.7}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-2.8586,x:-6.2,y:-81.3,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-90.778,x:-85.35,y:55.35,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.9969,scaleY:0.9969,rotation:-97.0058,x:-92.15,y:141.1}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-116.4014,x:-91.3,y:141.15}},{t:this.instance,p:{scaleX:0.997,scaleY:0.997,rotation:-71.3485,y:-12.4,regY:9.7,x:-59.45,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7747,x:-10.55,y:49.3}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:84.7506,x:48.65,y:-20.6,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:74.7124,x:55.65,regY:12.2,y:49.35}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:77.2872,x:86.25,y:130.25,regY:13.1}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:66.5324,x:85.75,y:133.65,regX:-9.9}},{t:this.instance_10,p:{regY:-50.9,scaleX:0.9944,scaleY:0.9944,rotation:-5.4265,x:34.45,y:185.2,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.818,y:-59.85,x:-4.15,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:11.4449,y:185.75,x:-41.8,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9249,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-8.963,y:88.3,x:24.7}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9977,scaleY:0.9977,rotation:-2.7437,x:-6.2,y:-81.2,regX:1.2}},{t:this.instance_3,p:{regY:7.6,scaleX:0.9968,scaleY:0.9968,rotation:-90.6929,x:-85.25,y:55.35,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.997,scaleY:0.997,rotation:-96.9217,x:-92.3,y:141.1}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-116.3159,x:-91.45,y:141.15}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-71.3263,y:-12.4,regY:9.7,x:-59.5,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7747,x:-10.5,y:49.3}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:84.7752,x:48.55,y:-20.6,regY:13.1}},{t:this.instance_13,p:{regX:-45.4,scaleX:0.997,scaleY:0.997,rotation:75.0549,x:55.55,regY:12.2,y:49.3}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:79.6146,x:85.85,y:130.5,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:67.6475,x:85.1,y:133.8,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-5.2084,x:34.45,y:185.3,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8216,y:-59.85,x:-4.15,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:11.5053,y:185.75,x:-41.8,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9249,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-8.963,y:88.3,x:24.7}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9977,scaleY:0.9977,rotation:-2.6297,x:-6.15,y:-81.25,regX:1.2}},{t:this.instance_3,p:{regY:7.6,scaleX:0.9968,scaleY:0.9969,rotation:-90.6078,x:-85.25,y:55.3,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.9969,scaleY:0.9969,rotation:-96.8363,x:-92.35,y:141.1}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-116.23,x:-91.55,y:141.15}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-71.3041,y:-12.4,regY:9.7,x:-59.5,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7747,x:-10.5,y:49.3}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:84.7999,x:48.75,y:-20.65,regY:13}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:75.3986,x:55.5,regY:12.2,y:49.35}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:81.9437,x:85.3,y:130.6,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:68.762,x:84.4,y:133.95,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-4.9895,x:34.45,y:185.3,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8251,y:-59.85,x:-4.1,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:11.5654,y:185.7,x:-41.8,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9249,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-8.963,y:88.3,x:24.7}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-2.513,x:-6.1,y:-81.25,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-90.5227,x:-85.35,y:55.45,regX:43.5}},{t:this.instance_2,p:{regX:4.4,scaleX:0.997,scaleY:0.997,rotation:-96.7506,x:-92.55,y:141.1}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-116.1453,x:-91.75,y:141.1}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-71.2814,y:-12.45,regY:9.7,x:-59.5,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7747,x:-10.45,y:49.3}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:84.8246,x:48.65,y:-20.6,regY:13.1}},{t:this.instance_13,p:{regX:-45.2,scaleX:0.997,scaleY:0.997,rotation:75.7426,x:55.5,regY:12.2,y:49.5}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:84.273,x:84.85,y:130.75,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:69.8744,x:83.75,y:134.1,regX:-9.9}},{t:this.instance_10,p:{regY:-50.9,scaleX:0.9944,scaleY:0.9944,rotation:-4.7716,x:34.45,y:185.2,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8285,y:-59.85,x:-4.15,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:11.6254,y:185.7,x:-41.8,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9249,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-8.963,y:88.3,x:24.65}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-2.3981,x:-6.05,y:-81.2,regX:1.3}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-90.4368,x:-85.4,y:55.3,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.997,scaleY:0.997,rotation:-96.6668,x:-92.7,y:141}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-116.0597,x:-91.85,y:141.1}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-71.2589,y:-12.45,regY:9.7,x:-59.5,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7747,x:-10.45,y:49.3}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:84.8502,x:48.6,y:-20.7,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:76.0863,x:55.5,regY:12.2,y:49.35}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:86.6007,x:84.15,y:131,regY:13.1}},{t:this.instance_11,p:{regY:10.8,scaleX:0.9967,scaleY:0.9967,rotation:70.9883,x:83.2,y:134.1,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-4.5536,x:34.45,y:185.3,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.832,y:-59.85,x:-4.15,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:11.6865,y:185.7,x:-41.8,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9249,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-8.963,y:88.3,x:24.65}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-2.2849,x:-6,y:-81.2,regX:1.3}},{t:this.instance_3,p:{regY:7.6,scaleX:0.9968,scaleY:0.9968,rotation:-90.3517,x:-85.25,y:55.3,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.9969,scaleY:0.9969,rotation:-96.5811,x:-92.85,y:141.05}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-115.9746,x:-92.05,y:141.05}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-71.2367,y:-12.45,regY:9.7,x:-59.5,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7747,x:-10.45,y:49.3}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:84.8756,x:48.6,y:-20.65,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:76.4295,x:55.4,regY:12.2,y:49.4}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:88.9298,x:83.8,y:131.15,regY:13}},{t:this.instance_11,p:{regY:11,scaleX:0.9967,scaleY:0.9967,rotation:72.1021,x:82.25,y:134.35,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-4.335,x:34.5,y:185.3,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8348,y:-59.85,x:-4.15,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9946,scaleY:0.9946,rotation:11.7456,y:185.7,x:-41.8,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9249,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-8.963,y:88.3,x:24.65}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-2.1692,x:-6.1,y:-81.25,regX:1.2}},{t:this.instance_3,p:{regY:7.6,scaleX:0.9968,scaleY:0.9968,rotation:-90.2675,x:-85.3,y:55.25,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.997,scaleY:0.997,rotation:-96.4953,x:-92.95,y:141}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-115.8891,x:-92.2,y:141.05}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-71.2146,y:-12.45,regY:9.7,x:-59.45,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7747,x:-10.4,y:49.3}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:84.9003,x:48.7,y:-20.7,regY:13}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:76.7739,x:55.4,regY:12.2,y:49.35}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:91.2545,x:83.2,y:131.35,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:73.2166,x:81.75,y:134.45,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-4.1164,x:34.45,y:185.25,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8383,y:-59.85,x:-4.15,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9946,scaleY:0.9946,rotation:11.8075,y:185.65,x:-41.75,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9249,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-8.963,y:88.3,x:24.65}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-2.0543,x:-6.2,y:-81.3,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-90.1816,x:-85.5,y:55.4,regX:43.5}},{t:this.instance_2,p:{regX:4.4,scaleX:0.997,scaleY:0.997,rotation:-96.4115,x:-93.15,y:140.95}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-115.8043,x:-92.35,y:141}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-71.1924,y:-12.45,regY:9.7,x:-59.45,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7747,x:-10.4,y:49.3}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:84.9258,x:48.6,y:-20.65,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:77.1166,x:55.45,regY:12.1,y:49.4}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:93.583,x:82.75,y:131.55,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:74.3292,x:81.15,y:134.55,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-3.8987,x:34.45,y:185.3,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8428,y:-59.85,x:-4.15,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:11.8668,y:185.65,x:-41.75,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9249,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-8.963,y:88.3,x:24.65}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-1.9412,x:-6.2,y:-81.25,regX:1.2}},{t:this.instance_3,p:{regY:7.6,scaleX:0.9968,scaleY:0.9968,rotation:-90.0965,x:-85.4,y:55.2,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.997,scaleY:0.997,rotation:-96.326,x:-93.3,y:141}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-115.7188,x:-92.5,y:141}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-71.171,y:-12.45,regY:9.7,x:-59.4,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7738,x:-10.4,y:49.3}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:84.9487,x:48.6,y:-20.65,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:77.4602,x:55.4,regY:12.1,y:49.3}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:95.9104,x:82.2,y:131.65,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:75.4434,x:80.5,y:134.65,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-3.6802,x:34.4,y:185.25,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8463,y:-59.85,x:-4.15,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:11.9273,y:185.8,x:-41.75,regY:-51,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9241,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-8.963,y:88.3,x:24.6}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-1.8255,x:-6.1,y:-81.3,regX:1.2}},{t:this.instance_3,p:{regY:7.6,scaleX:0.9968,scaleY:0.9968,rotation:-90.0114,x:-85.4,y:55.25,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.9969,scaleY:0.9969,rotation:-96.2404,x:-93.45,y:140.95}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-115.6336,x:-92.65,y:141}},{t:this.instance,p:{scaleX:0.997,scaleY:0.997,rotation:-71.1477,y:-12.5,regY:9.7,x:-59.45,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7738,x:-10.4,y:49.25}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:84.9742,x:48.65,y:-20.65,regY:13}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:77.8031,x:55.25,regY:12.2,y:49.3}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:98.2405,x:81.75,y:131.85,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:76.5569,x:79.85,y:134.75,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-3.4626,x:34.4,y:185.25,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8498,y:-59.8,x:-4.05,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:11.9866,y:185.8,x:-41.75,regY:-51,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9241,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-8.963,y:88.3,x:24.6}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.9,scaleX:0.9977,scaleY:0.9977,rotation:-1.7107,x:-6.15,y:-81.4,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-89.9307,x:-85.55,y:55.2,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.9969,scaleY:0.9969,rotation:-96.1549,x:-93.5,y:140.95}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-115.5485,x:-92.8,y:140.9}},{t:this.instance,p:{scaleX:0.997,scaleY:0.997,rotation:-71.1255,y:-12.4,regY:9.7,x:-59.5,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7738,x:-10.4,y:49.25}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:84.9998,x:48.6,y:-20.65,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:78.1473,x:55.2,regY:12.2,y:49.4}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:100.5686,x:81,y:131.9,regY:13.1}},{t:this.instance_11,p:{regY:10.8,scaleX:0.9967,scaleY:0.9967,rotation:77.6711,x:79.2,y:134.7,regX:-10}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-3.2442,x:34.35,y:185.25,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8533,y:-59.8,x:-4.05,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:12.0468,y:185.8,x:-41.75,regY:-51,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9241,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-8.963,y:88.3,x:24.6}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.9,scaleX:0.9978,scaleY:0.9978,rotation:-1.5958,x:-6.15,y:-81.4,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-89.8456,x:-85.55,y:55.2,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.9969,scaleY:0.9969,rotation:-96.0702,x:-93.65,y:140.9}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-115.4629,x:-92.95,y:140.9}},{t:this.instance,p:{scaleX:0.997,scaleY:0.997,rotation:-71.1034,y:-12.4,regY:9.7,x:-59.5,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7738,x:-10.35,y:49.25}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.0244,x:48.6,y:-20.65,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:78.4904,x:55.35,regY:12.1,y:49.3}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:102.8971,x:80.55,y:132.15,regY:13}},{t:this.instance_11,p:{regY:10.8,scaleX:0.9967,scaleY:0.9967,rotation:78.785,x:78.6,y:134.75,regX:-10}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-3.0258,x:34.35,y:185.25,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8568,y:-59.8,x:-4.05,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:12.107,y:185.65,x:-41.75,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9241,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-8.963,y:88.3,x:24.6}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.9,scaleX:0.9978,scaleY:0.9978,rotation:-1.4827,x:-6.1,y:-81.35,regX:1.2}},{t:this.instance_3,p:{regY:7.6,scaleX:0.9968,scaleY:0.9968,rotation:-89.7597,x:-85.4,y:55.3,regX:43.5}},{t:this.instance_2,p:{regX:4.4,scaleX:0.9969,scaleY:0.9969,rotation:-95.9856,x:-93.85,y:140.85}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-115.3774,x:-93.1,y:140.9}},{t:this.instance,p:{scaleX:0.997,scaleY:0.997,rotation:-71.0812,y:-12.4,regY:9.7,x:-59.45,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7738,x:-10.35,y:49.25}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.0499,x:48.5,y:-20.65,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:78.8356,x:55.15,regY:12.2,y:49.35}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:105.2258,x:80.05,y:132.25,regY:13}},{t:this.instance_11,p:{regY:11,scaleX:0.9967,scaleY:0.9967,rotation:79.8988,x:77.75,y:134.95,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-2.8075,x:34.35,y:185.3,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8604,y:-59.8,x:-4.05,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:12.1671,y:185.65,x:-41.75,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9241,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-8.963,y:88.3,x:24.55}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.9,scaleX:0.9978,scaleY:0.9978,rotation:-1.3662,x:-6.1,y:-81.35,regX:1.2}},{t:this.instance_3,p:{regY:7.6,scaleX:0.9968,scaleY:0.9968,rotation:-89.6755,x:-85.5,y:55.2,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.9969,scaleY:0.9969,rotation:-95.9,x:-94,y:140.85}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-115.2926,x:-93.25,y:140.85}},{t:this.instance,p:{scaleX:0.997,scaleY:0.997,rotation:-71.0587,y:-12.4,regY:9.7,x:-59.45,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7738,x:-10.3,y:49.25}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.0736,x:48.7,y:-20.75,regY:13}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:79.1778,x:55.1,regY:12.2,y:49.4}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:107.5539,x:79.5,y:132.45,regY:13}},{t:this.instance_11,p:{regY:11,scaleX:0.9967,scaleY:0.9967,rotation:81.0126,x:77.1,y:135,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-2.5892,x:34.35,y:185.3,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8638,y:-59.8,x:-4.05,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:12.2282,y:185.8,x:-41.75,regY:-51,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9241,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-8.963,y:88.3,x:24.55}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.9,scaleX:0.9978,scaleY:0.9978,rotation:-1.2513,x:-6.1,y:-81.4,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-89.5895,x:-85.65,y:55.15,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.997,scaleY:0.997,rotation:-95.8153,x:-94.15,y:140.85}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-115.2075,x:-93.45,y:140.85}},{t:this.instance,p:{scaleX:0.997,scaleY:0.997,rotation:-71.0365,y:-12.4,regY:9.7,x:-59.4,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7738,x:-10.3,y:49.25}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.0993,x:48.55,y:-20.7,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:79.5211,x:55.1,regY:12.2,y:49.3}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:109.8837,x:79,y:132.6,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:82.1262,x:76.65,y:135.15,regX:-9.8}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-2.371,x:34.35,y:185.3,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8674,y:-59.8,x:-4.05,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:12.2883,y:185.75,x:-41.8,regY:-51,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9241,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-8.9621,y:88.3,x:24.55}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-1.1374,x:-6.05,y:-81.2,regX:1.2}},{t:this.instance_3,p:{regY:7.6,scaleX:0.9968,scaleY:0.9968,rotation:-89.5045,x:-85.5,y:55.15,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.997,scaleY:0.997,rotation:-95.7299,x:-94.3,y:140.8}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-115.1231,x:-93.55,y:140.85}},{t:this.instance,p:{scaleX:0.997,scaleY:0.997,rotation:-71.0135,y:-12.45,regY:9.7,x:-59.4,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7738,x:-10.3,y:49.25}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.1239,x:48.55,y:-20.7,regY:13.1}},{t:this.instance_13,p:{regX:-45.2,scaleX:0.997,scaleY:0.997,rotation:79.8646,x:55.05,regY:12.2,y:49.5}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:112.2119,x:78.5,y:132.75,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:83.2407,x:75.95,y:135.15,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-2.1528,x:34.3,y:185.25,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8708,y:-59.8,x:-4.05,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:12.3489,y:185.6,x:-41.8,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9241,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-8.9621,y:88.3,x:24.55}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-1.0226,x:-6.05,y:-81.2,regX:1.2}},{t:this.instance_3,p:{regY:7.6,scaleX:0.9968,scaleY:0.9969,rotation:-89.4203,x:-85.55,y:55.25,regX:43.5}},{t:this.instance_2,p:{regX:4.4,scaleX:0.997,scaleY:0.997,rotation:-95.6444,x:-94.45,y:140.8}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-115.0363,x:-93.7,y:140.8}},{t:this.instance,p:{scaleX:0.997,scaleY:0.997,rotation:-70.9913,y:-12.45,regY:9.7,x:-59.35,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7738,x:-10.25,y:49.25}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.1494,x:48.55,y:-20.7,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:80.208,x:54.95,regY:12.2,y:49.35}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:114.5408,x:77.9,y:132.85,regY:13}},{t:this.instance_11,p:{regY:10.8,scaleX:0.9967,scaleY:0.9967,rotation:84.3533,x:75.5,y:135.15,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-1.9345,x:34.3,y:185.25,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8745,y:-59.8,x:-4.05,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:12.4084,y:185.6,x:-41.8,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9241,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-8.9621,y:88.3,x:24.5}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-0.9087,x:-6.1,y:-81.15,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-89.3343,x:-85.7,y:55.15,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.9969,scaleY:0.9969,rotation:-95.559,x:-94.6,y:140.75}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-114.9516,x:-93.9,y:140.75}},{t:this.instance,p:{scaleX:0.997,scaleY:0.997,rotation:-70.9689,y:-12.45,regY:9.7,x:-59.45,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7738,x:-10.25,y:49.25}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.1748,x:48.65,y:-20.7,regY:13}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:80.5514,x:55,regY:12.2,y:49.35}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:116.8695,x:77.4,y:133,regY:13}},{t:this.instance_11,p:{regY:11,scaleX:0.9967,scaleY:0.9967,rotation:85.4673,x:74.55,y:135.05,regX:-10}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-1.7164,x:34.3,y:185.25,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8779,y:-59.8,x:-4.05,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:12.4696,y:185.75,x:-41.8,regY:-51,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9241,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-8.9621,y:88.3,x:24.5}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-0.7948,x:-6.1,y:-81.15,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-89.2492,x:-85.65,y:55.05,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.9969,scaleY:0.9969,rotation:-95.4753,x:-94.75,y:140.7}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-114.8664,x:-94,y:140.75}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-70.9467,y:-12.45,regY:9.7,x:-59.45,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7738,x:-10.2,y:49.2}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.1995,x:48.55,y:-20.7,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:80.8953,x:54.95,regY:12.2,y:49.35}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:119.1983,x:76.8,y:133.2,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:86.5823,x:74.05,y:135.2,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-1.4983,x:34.3,y:185.3,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8816,y:-59.75,x:-4.15,regX:-1.5}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:12.5279,y:185.7,x:-41.7,regY:-51,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9241,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-8.9621,y:88.3,x:24.5}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-0.6791,x:-6.05,y:-81.15,regX:1.2}},{t:this.instance_3,p:{regY:7.6,scaleX:0.9968,scaleY:0.9968,rotation:-89.1633,x:-85.6,y:55.05,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.9969,scaleY:0.9969,rotation:-95.3907,x:-94.9,y:140.7}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-114.7805,x:-94.2,y:140.7}},{t:this.instance,p:{scaleX:0.997,scaleY:0.997,rotation:-70.9242,y:-12.45,regY:9.7,x:-59.45,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7738,x:-10.2,y:49.2}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.2242,x:48.55,y:-20.7,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:81.2388,x:54.9,regY:12.2,y:49.35}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:121.5267,x:76.3,y:133.3,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:87.6951,x:73.45,y:135.25,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-1.2784,x:34.3,y:185.25,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8851,y:-59.75,x:-4.15,regX:-1.5}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:12.5882,y:185.55,x:-41.65,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9241,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-8.9621,y:88.35,x:24.5}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-0.5643,x:-6.05,y:-81.2,regX:1.2}},{t:this.instance_3,p:{regY:7.6,scaleX:0.9968,scaleY:0.9968,rotation:-89.0791,x:-85.7,y:55.05,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.9969,scaleY:0.9969,rotation:-95.3043,x:-95,y:140.7}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-114.6949,x:-94.3,y:140.7}},{t:this.instance,p:{scaleX:0.997,scaleY:0.997,rotation:-70.902,y:-12.5,regY:9.7,x:-59.4,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7738,x:-10.2,y:49.2}},{t:this.instance_14,p:{regX:-31.7,scaleX:0.9972,scaleY:0.9972,rotation:85.2479,x:48.65,y:-20.7,regY:13}},{t:this.instance_13,p:{regX:-45.4,scaleX:0.997,scaleY:0.997,rotation:81.5821,x:54.8,regY:12.2,y:49.25}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:123.8543,x:75.75,y:133.4,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:88.8087,x:72.8,y:135.35,regX:-9.8}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-1.0621,x:34.3,y:185.25,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8886,y:-59.75,x:-4.15,regX:-1.5}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:12.6488,y:185.55,x:-41.65,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9241,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-8.9621,y:88.35,x:24.5}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-0.4495,x:-6.05,y:-81.2,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-88.994,x:-85.8,y:55.05,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.9969,scaleY:0.9969,rotation:-95.2198,x:-95.15,y:140.7}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9966,scaleY:0.9966,rotation:-114.6109,x:-94.55,y:140.6}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-70.8802,y:-12.5,regY:9.7,x:-59.4,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7738,x:-10.15,y:49.2}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.2735,x:48.65,y:-20.75,regY:13}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:81.9258,x:54.8,regY:12.2,y:49.35}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:126.1829,x:75.25,y:133.45,regY:13}},{t:this.instance_11,p:{regY:10.8,scaleX:0.9967,scaleY:0.9967,rotation:89.9228,x:72.35,y:135.2,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-0.8432,x:34.25,y:185.25,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8921,y:-59.75,x:-4.05,regX:-1.5}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:12.7093,y:185.6,x:-41.65,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9232,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-8.9621,y:88.35,x:24.45}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-0.3347,x:-6,y:-81.2,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-88.908,x:-85.8,y:55.05,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.9969,scaleY:0.997,rotation:-95.1344,x:-95.35,y:140.6}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9966,scaleY:0.9966,rotation:-114.5249,x:-94.65,y:140.55}},{t:this.instance,p:{scaleX:0.997,scaleY:0.997,rotation:-70.8574,y:-12.45,regY:9.7,x:-59.4,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7738,x:-10.15,y:49.2}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.299,x:48.5,y:-20.8,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:82.2685,x:54.8,regY:12.2,y:49.4}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:128.5124,x:74.65,y:133.65,regY:13}},{t:this.instance_11,p:{regY:10.8,scaleX:0.9967,scaleY:0.9967,rotation:91.0325,x:71.75,y:135.25,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-0.626,x:34.25,y:185.3,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8957,y:-59.75,x:-4.05,regX:-1.5}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:12.7697,y:185.65,x:-41.7,regY:-51,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9232,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-8.9621,y:88.35,x:24.45}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-0.2199,x:-6,y:-81.2,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-88.8238,x:-85.85,y:55,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.997,scaleY:0.997,rotation:-95.0491,x:-95.5,y:140.6}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-114.4393,x:-94.75,y:140.6}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-70.8352,y:-12.45,regY:9.7,x:-59.4,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7738,x:-10.1,y:49.2}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.3235,x:48.45,y:-20.7,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:82.6125,x:54.75,regY:12.2,y:49.3}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:130.8412,x:74.15,y:133.7,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:92.1469,x:71,y:135.2,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-0.4071,x:34.25,y:185.25,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8992,y:-59.75,x:-4.05,regX:-1.5}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:12.8309,y:185.5,x:-41.65,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9232,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-8.9621,y:88.35,x:24.45}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-0.1051,x:-6.05,y:-81.15,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9969,rotation:-88.7378,x:-85.8,y:55,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.997,scaleY:0.997,rotation:-94.9636,x:-95.65,y:140.6}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-114.3553,x:-94.95,y:140.65}},{t:this.instance,p:{scaleX:0.997,scaleY:0.997,rotation:-70.8127,y:-12.4,regY:9.7,x:-59.35,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7721,x:-10.1,y:49.2}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.3411,x:48.55,y:-20.75,regY:13}},{t:this.instance_13,p:{regX:-45.2,scaleX:0.997,scaleY:0.997,rotation:82.7574,x:54.75,regY:12.2,y:49.5}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:131.2925,x:73.9,y:133.75,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:93.1304,x:70.8,y:135.3,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-0.4115,x:34.25,y:185.25,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8983,y:-59.75,x:-4.05,regX:-1.5}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:13.0687,y:185.5,x:-41.7,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9249,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-8.9683,y:88.35,x:24.5}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-0.2164,x:-6.05,y:-81.2,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-88.5931,x:-85.65,y:55.05,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.997,scaleY:0.997,rotation:-94.821,x:-95.6,y:140.65}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-114.2136,x:-94.95,y:140.65}},{t:this.instance,p:{scaleX:0.997,scaleY:0.997,rotation:-70.9827,y:-12.45,regY:9.7,x:-59.35,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7703,x:-10.1,y:49.2}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.3588,x:48.65,y:-20.7,regY:13}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:82.9008,x:54.7,regY:12.2,y:49.4}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:131.7462,x:73.65,y:133.8,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:94.1166,x:70.5,y:135.15,regX:-10}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-0.4167,x:34.25,y:185.25,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8974,y:-59.75,x:-4.05,regX:-1.5}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:13.3073,y:185.5,x:-41.7,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9276,x:-30.15,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-8.9737,y:88.35,x:24.5}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-0.3286,x:-6,y:-81.15,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-88.4474,x:-85.45,y:55.15,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.997,scaleY:0.997,rotation:-94.6776,x:-95.65,y:140.7}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9966,scaleY:0.9966,rotation:-114.0734,x:-95,y:140.6}},{t:this.instance,p:{scaleX:0.997,scaleY:0.997,rotation:-71.1544,y:-12.5,regY:9.7,x:-59.45,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7686,x:-10.1,y:49.2}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.3763,x:48.55,y:-20.7,regY:13.1}},{t:this.instance_13,p:{regX:-45.4,scaleX:0.997,scaleY:0.997,rotation:83.0456,x:54.85,regY:12.1,y:49.25}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:132.199,x:73.4,y:133.9,regY:13}},{t:this.instance_11,p:{regY:10.8,scaleX:0.9967,scaleY:0.9967,rotation:95.1022,x:70.45,y:135.25,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-0.4211,x:34.25,y:185.25,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8966,y:-59.75,x:-4.05,regX:-1.5}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:13.5461,y:185.5,x:-41.7,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9303,x:-30.15,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-8.9799,y:88.35,x:24.5}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-0.439,x:-6,y:-81.15,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-88.3027,x:-85.25,y:55.2,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.9969,scaleY:0.9969,rotation:-94.5342,x:-95.7,y:140.8}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-113.9324,x:-95,y:140.75}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-71.3235,y:-12.45,regY:9.7,x:-59.5,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7668,x:-10.1,y:49.2}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.3939,x:48.55,y:-20.7,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:83.1888,x:54.7,regY:12.2,y:49.35}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:132.6516,x:73.05,y:133.85,regY:13.1}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:96.0868,x:70,y:135.3,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-0.4255,x:34.35,y:185.25,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8966,y:-59.75,x:-4.1,regX:-1.5}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:13.7866,y:185.5,x:-41.7,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9329,x:-30.15,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-8.9852,y:88.35,x:24.5}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-0.552,x:-6,y:-81.15,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-88.157,x:-85,y:55.3,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.9969,scaleY:0.9969,rotation:-94.3908,x:-95.7,y:140.8}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-113.7922,x:-95,y:140.8}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-71.4938,y:-12.45,regY:9.6,x:-59.55,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7651,x:-10.1,y:49.2}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.4115,x:48.5,y:-20.7,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:83.3344,x:54.6,regY:12.2,y:49.35}},{t:this.instance_12,p:{scaleX:0.9966,scaleY:0.9966,rotation:133.1035,x:72.95,y:133.95,regY:13}},{t:this.instance_11,p:{regY:11,scaleX:0.9967,scaleY:0.9967,rotation:97.0712,x:69.65,y:135.3,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-0.4308,x:34.25,y:185.25,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8957,y:-59.75,x:-4.1,regX:-1.5}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:14.0249,y:185.5,x:-41.7,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9346,x:-30.15,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-8.9906,y:88.35,x:24.5}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-0.6633,x:-6,y:-81.15,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-88.0122,x:-84.85,y:55.35,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.9969,scaleY:0.9969,rotation:-94.2484,x:-95.7,y:140.85}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-113.6515,x:-95.05,y:140.85}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-71.664,y:-12.35,regY:9.7,x:-59.45,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7642,x:-10.1,y:49.2}},{t:this.instance_14,p:{regX:-31.7,scaleX:0.9972,scaleY:0.9972,rotation:85.4308,x:48.65,y:-20.65,regY:13}},{t:this.instance_13,p:{regX:-45.2,scaleX:0.997,scaleY:0.997,rotation:83.4782,x:54.65,regY:12.2,y:49.45}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:133.5571,x:72.75,y:134,regY:13}},{t:this.instance_11,p:{regY:10.8,scaleX:0.9967,scaleY:0.9967,rotation:98.057,x:69.65,y:135.55,regX:-9.8}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-0.4352,x:34.25,y:185.25,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8948,y:-59.75,x:-4.1,regX:-1.5}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:14.2639,y:185.5,x:-41.75,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9373,x:-30.15,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-8.9968,y:88.35,x:24.45}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-0.7755,x:-6.05,y:-81.1,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-87.8665,x:-84.65,y:55.45,regX:43.6}},{t:this.instance_2,p:{regX:4.5,scaleX:0.9969,scaleY:0.9969,rotation:-94.1042,x:-95.7,y:140.8}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-113.5113,x:-95.05,y:140.85}},{t:this.instance,p:{scaleX:0.997,scaleY:0.997,rotation:-71.834,y:-12.4,regY:9.7,x:-59.45,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7624,x:-10.1,y:49.2}},{t:this.instance_14,p:{regX:-31.7,scaleX:0.9972,scaleY:0.9972,rotation:85.4485,x:48.65,y:-20.6,regY:13}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:83.6231,x:54.6,regY:12.2,y:49.3}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:134.0081,x:72.55,y:134.1,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:99.0417,x:69.25,y:135.35,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-0.4405,x:34.25,y:185.25,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8939,y:-59.75,x:-4.1,regX:-1.5}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:14.5034,y:185.5,x:-41.7,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.94,x:-30.15,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.0022,y:88.35,x:24.5}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9977,scaleY:0.9977,rotation:-0.8868,x:-6.05,y:-81.1,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9969,scaleY:0.9969,rotation:-87.7217,x:-84.4,y:55.5,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.997,scaleY:0.997,rotation:-93.9617,x:-95.75,y:140.9}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-113.3699,x:-95.05,y:140.95}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-72.0057,y:-12.5,regY:9.7,x:-59.45,regX:33.3}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7607,x:-10.1,y:49.2}},{t:this.instance_14,p:{regX:-31.7,scaleX:0.9972,scaleY:0.9972,rotation:85.4661,x:48.55,y:-20.6,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:83.7668,x:54.65,regY:12.2,y:49.3}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:134.4604,x:72.3,y:134.1,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:100.0263,x:69.05,y:135.4,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-0.4449,x:34.3,y:185.25,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8929,y:-59.7,x:-4.1,regX:-1.5}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:14.7415,y:185.65,x:-41.75,regY:-51,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9426,x:-30.15,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.0075,y:88.35,x:24.5}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-0.9981,x:-6,y:-81.1,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-87.576,x:-84.15,y:55.6,regX:43.6}},{t:this.instance_2,p:{regX:4.5,scaleX:0.997,scaleY:0.997,rotation:-93.8184,x:-95.75,y:140.85}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-113.2307,x:-95.1,y:141}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-72.1751,y:-12.4,regY:9.7,x:-59.45,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7589,x:-10.1,y:49.2}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.4828,x:48.55,y:-20.65,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:83.9107,x:54.55,regY:12.2,y:49.35}},{t:this.instance_12,p:{scaleX:0.9966,scaleY:0.9966,rotation:134.9132,x:71.95,y:134.1,regY:13.1}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:101.0123,x:68.8,y:135.3,regX:-10}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-0.4493,x:34.35,y:185.25,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8921,y:-59.7,x:-4.1,regX:-1.5}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:14.9816,y:185.55,x:-41.75,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9452,x:-30.15,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.0137,y:88.35,x:24.5}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-1.1094,x:-6,y:-81.15,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-87.4311,x:-84,y:55.8,regX:43.5}},{t:this.instance_2,p:{regX:4.4,scaleX:0.997,scaleY:0.997,rotation:-93.676,x:-95.8,y:141}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9966,scaleY:0.9966,rotation:-113.0893,x:-95.15,y:140.95}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-72.3462,y:-12.45,regY:9.6,x:-59.55,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7572,x:-10.1,y:49.2}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.5012,x:48.55,y:-20.7,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:84.0552,x:54.55,regY:12.2,y:49.4}},{t:this.instance_12,p:{scaleX:0.9966,scaleY:0.9966,rotation:135.366,x:71.75,y:134.2,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:101.996,x:68.55,y:135.45,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-0.4545,x:34.3,y:185.25,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8921,y:-59.7,x:-4.1,regX:-1.5}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:15.2205,y:185.5,x:-41.7,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.947,x:-30.15,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.0199,y:88.35,x:24.5}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.9,scaleX:0.9978,scaleY:0.9978,rotation:-1.2198,x:-6,y:-81.35,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-87.2854,x:-83.8,y:55.75,regX:43.6}},{t:this.instance_2,p:{regX:4.5,scaleX:0.9969,scaleY:0.9969,rotation:-93.532,x:-95.8,y:140.85}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9966,scaleY:0.9966,rotation:-112.9493,x:-95.15,y:140.95}},{t:this.instance,p:{scaleX:0.997,scaleY:0.997,rotation:-72.5165,y:-12.35,regY:9.7,x:-59.45,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7554,x:-10.1,y:49.2}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.5189,x:48.65,y:-20.75,regY:13}},{t:this.instance_13,p:{regX:-45.4,scaleX:0.997,scaleY:0.997,rotation:84.2006,x:54.55,regY:12.2,y:49.3}},{t:this.instance_12,p:{scaleX:0.9966,scaleY:0.9966,rotation:135.8188,x:71.55,y:134.2,regY:13}},{t:this.instance_11,p:{regY:11,scaleX:0.9967,scaleY:0.9967,rotation:102.9825,x:68.2,y:135.5,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-0.4589,x:34.35,y:185.2,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8912,y:-59.7,x:-4.1,regX:-1.5}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:15.46,y:185.5,x:-41.7,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9496,x:-30.2,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.0262,y:88.35,x:24.5}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.9,scaleX:0.9978,scaleY:0.9978,rotation:-1.332,x:-6,y:-81.35,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9969,rotation:-87.1406,x:-83.6,y:55.9,regX:43.5}},{t:this.instance_2,p:{regX:4.4,scaleX:0.997,scaleY:0.997,rotation:-93.3888,x:-95.75,y:141.1}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-112.8082,x:-95.15,y:141.1}},{t:this.instance,p:{scaleX:0.997,scaleY:0.997,rotation:-72.6873,y:-12.35,regY:9.7,x:-59.45,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7545,x:-10.1,y:49.2}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.5365,x:48.65,y:-20.7,regY:13}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:84.3452,x:54.55,regY:12.2,y:49.35}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:136.2704,x:71.35,y:134.3,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:103.9667,x:68.1,y:135.45,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-0.4633,x:34.35,y:185.2,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8904,y:-59.7,x:-4.2,regX:-1.5}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:15.6985,y:185.55,x:-41.75,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9523,x:-30.2,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.0308,y:88.35,x:24.45}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.9,scaleX:0.9978,scaleY:0.9978,rotation:-1.4442,x:-6.05,y:-81.3,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-86.9947,x:-83.4,y:55.9,regX:43.6}},{t:this.instance_2,p:{regX:4.5,scaleX:0.997,scaleY:0.997,rotation:-93.2456,x:-95.75,y:141}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-112.6678,x:-95.15,y:141.15}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-72.8573,y:-12.4,regY:9.7,x:-59.45,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7528,x:-10.1,y:49.25}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.554,x:48.65,y:-20.7,regY:13}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:84.4879,x:54.5,regY:12.2,y:49.35}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:136.724,x:70.95,y:134.25,regY:13.1}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:104.9522,x:67.85,y:135.45,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-0.4686,x:34.35,y:185.2,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8895,y:-59.7,x:-4.2,regX:-1.5}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:15.9384,y:185.6,x:-41.8,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9549,x:-30.2,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.037,y:88.35,x:24.5}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.9,scaleX:0.9978,scaleY:0.9978,rotation:-1.5564,x:-6.05,y:-81.3,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-86.8498,x:-83.2,y:55.95,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.997,scaleY:0.997,rotation:-93.1033,x:-95.85,y:141.15}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9966,scaleY:0.9966,rotation:-112.5278,x:-95.2,y:141.1}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-73.0279,y:-12.4,regY:9.7,x:-59.45,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.751,x:-10.1,y:49.25}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.5725,x:48.55,y:-20.7,regY:13.1}},{t:this.instance_13,p:{regX:-45.2,scaleX:0.997,scaleY:0.997,rotation:84.6333,x:54.6,regY:12.1,y:49.5}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:137.1764,x:70.85,y:134.35,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:105.9368,x:67.55,y:135.5,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-0.4721,x:34.4,y:185.2,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8886,y:-59.7,x:-4.2,regX:-1.5}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:16.1782,y:185.55,x:-41.75,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9575,x:-30.2,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.0423,y:88.35,x:24.5}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.9,scaleX:0.9978,scaleY:0.9978,rotation:-1.6659,x:-5.95,y:-81.35,regX:1.3}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-86.7039,x:-82.95,y:56.05,regX:43.6}},{t:this.instance_2,p:{regX:4.5,scaleX:0.997,scaleY:0.997,rotation:-92.9592,x:-95.85,y:141.05}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-112.3858,x:-95.2,y:141.2}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-73.1985,y:-12.4,regY:9.7,x:-59.45,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7493,x:-10.1,y:49.2}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.5901,x:48.5,y:-20.7,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:84.7776,x:54.5,regY:12.2,y:49.4}},{t:this.instance_12,p:{scaleX:0.9966,scaleY:0.9966,rotation:137.6284,x:70.55,y:134.45,regY:13}},{t:this.instance_11,p:{regY:11,scaleX:0.9967,scaleY:0.9967,rotation:106.9219,x:67.25,y:135.45,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-0.4774,x:34.4,y:185.2,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8878,y:-59.7,x:-4.2,regX:-1.5}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:16.4157,y:185.55,x:-41.75,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9593,x:-30.2,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.0486,y:88.3,x:24.5}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9977,scaleY:0.9977,rotation:-1.7782,x:-5.9,y:-81.25,regX:1.3}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-86.5607,x:-82.8,y:56.05,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.997,scaleY:0.997,rotation:-92.8161,x:-95.85,y:141.25}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-112.2461,x:-95.2,y:141.25}},{t:this.instance,p:{scaleX:0.997,scaleY:0.997,rotation:-73.3685,y:-12.4,regY:9.7,x:-59.45,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7476,x:-10.1,y:49.2}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.6077,x:48.5,y:-20.75,regY:13.1}},{t:this.instance_13,p:{regX:-45.4,scaleX:0.997,scaleY:0.997,rotation:84.9221,x:54.5,regY:12.2,y:49.3}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:138.0811,x:70.35,y:134.45,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:107.9073,x:67.1,y:135.5,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-0.4818,x:34.4,y:185.2,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8878,y:-59.7,x:-4.2,regX:-1.5}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:16.6547,y:185.5,x:-41.75,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9619,x:-30.2,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.0549,y:88.35,x:24.5}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-1.8913,x:-5.9,y:-81.2,regX:1.3}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-86.414,x:-82.6,y:56.1,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.9969,scaleY:0.9969,rotation:-92.673,x:-95.85,y:141.3}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-112.1054,x:-95.25,y:141.3}},{t:this.instance,p:{scaleX:0.997,scaleY:0.997,rotation:-73.5386,y:-12.4,regY:9.7,x:-59.4,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7458,x:-10.1,y:49.2}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.6252,x:48.6,y:-20.7,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:85.0665,x:54.4,regY:12.2,y:49.4}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:138.5334,x:70.15,y:134.45,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:108.8921,x:66.85,y:135.55,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-0.4862,x:34.4,y:185.2,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8868,y:-59.7,x:-4.2,regX:-1.5}},{t:this.instance_8,p:{scaleX:0.9946,scaleY:0.9946,rotation:16.8933,y:185.55,x:-41.75,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9646,x:-30.2,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.0611,y:88.35,x:24.5}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-2.0017,x:-5.9,y:-81.2,regX:1.3}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-86.269,x:-82.4,y:56.35,regX:43.5}},{t:this.instance_2,p:{regX:4.4,scaleX:0.997,scaleY:0.997,rotation:-92.5299,x:-95.9,y:141.3}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-111.9651,x:-95.25,y:141.35}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-73.7095,y:-12.4,regY:9.7,x:-59.35,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7449,x:-10.1,y:49.2}},{t:this.instance_14,p:{regX:-31.7,scaleX:0.9972,scaleY:0.9972,rotation:85.6428,x:48.55,y:-20.6,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:85.2109,x:54.55,regY:12.1,y:49.4}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:138.9865,x:69.9,y:134.55,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:109.8775,x:66.7,y:135.45,regX:-10}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-0.4915,x:34.35,y:185.2,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8858,y:-59.7,x:-4.2,regX:-1.5}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:17.1344,y:185.55,x:-41.75,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9681,x:-30.2,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.0674,y:88.35,x:24.5}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-2.1131,x:-6,y:-81.2,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-86.123,x:-82.15,y:56.3,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.997,scaleY:0.997,rotation:-92.386,x:-95.85,y:141.35}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-111.8242,x:-95.25,y:141.4}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-73.8791,y:-12.35,regY:9.7,x:-59.4,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7432,x:-10.1,y:49.25}},{t:this.instance_14,p:{regX:-31.7,scaleX:0.9972,scaleY:0.9972,rotation:85.6604,x:48.5,y:-20.55,regY:13.1}},{t:this.instance_13,p:{regX:-45.2,scaleX:0.997,scaleY:0.997,rotation:85.3551,x:54.55,regY:12.1,y:49.45}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:139.4393,x:69.65,y:134.6,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:110.8631,x:66.35,y:135.7,regX:-9.8}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-0.4959,x:34.4,y:185.2,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8851,y:-59.7,x:-4.2,regX:-1.5}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:17.3727,y:185.65,x:-41.75,regY:-51,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9699,x:-30.2,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.0718,y:88.3,x:24.5}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-2.2244,x:-6.05,y:-81.2,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-85.9781,x:-81.95,y:56.4,regX:43.5}},{t:this.instance_2,p:{regX:4.4,scaleX:0.997,scaleY:0.997,rotation:-92.2438,x:-95.9,y:141.35}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-111.683,x:-95.25,y:141.45}},{t:this.instance,p:{scaleX:0.997,scaleY:0.997,rotation:-74.0498,y:-12.4,regY:9.7,x:-59.45,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7414,x:-10.1,y:49.25}},{t:this.instance_14,p:{regX:-31.7,scaleX:0.9972,scaleY:0.9972,rotation:85.678,x:48.5,y:-20.55,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:85.4985,x:54.35,regY:12.2,y:49.35}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:139.8912,x:69.4,y:134.65,regY:13}},{t:this.instance_11,p:{regY:11,scaleX:0.9967,scaleY:0.9967,rotation:111.8464,x:65.95,y:135.55,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-0.4994,x:34.4,y:185.2,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8842,y:-59.7,x:-4.2,regX:-1.5}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:17.6118,y:185.55,x:-41.75,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9725,x:-30.2,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.0781,y:88.3,x:24.5}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-2.3367,x:-6.1,y:-81.15,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-85.8329,x:-81.75,y:56.4,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.997,scaleY:0.997,rotation:-92.1007,x:-95.9,y:141.4}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-111.5435,x:-95.25,y:141.45}},{t:this.instance,p:{scaleX:0.997,scaleY:0.997,rotation:-74.2205,y:-12.4,regY:9.6,x:-59.55,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7397,x:-10.1,y:49.25}},{t:this.instance_14,p:{regX:-31.7,scaleX:0.9972,scaleY:0.9972,rotation:85.6956,x:48.55,y:-20.6,regY:13.1}},{t:this.instance_13,p:{regX:-45.4,scaleX:0.997,scaleY:0.997,rotation:85.6436,x:54.3,regY:12.2,y:49.2}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:140.3432,x:69,y:134.55,regY:13.1}},{t:this.instance_11,p:{regY:10.8,scaleX:0.9967,scaleY:0.9967,rotation:112.8314,x:66.05,y:135.65,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-0.5047,x:34.4,y:185.15,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8842,y:-59.7,x:-4.25,regX:-1.5}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:17.8506,y:185.6,x:-41.75,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9751,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.0834,y:88.3,x:24.5}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-2.4472,x:-6.1,y:-81.15,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-85.6879,x:-81.5,y:56.45,regX:43.6}},{t:this.instance_2,p:{regX:4.5,scaleX:0.997,scaleY:0.997,rotation:-91.9577,x:-95.95,y:141.3}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-111.4021,x:-95.3,y:141.5}},{t:this.instance,p:{scaleX:0.997,scaleY:0.997,rotation:-74.3898,y:-12.4,regY:9.6,x:-59.55,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7379,x:-10.05,y:49.25}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.7131,x:48.55,y:-20.65,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:85.7879,x:54.35,regY:12.2,y:49.4}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:140.7969,x:68.8,y:134.6,regY:13.1}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:113.8172,x:65.65,y:135.55,regX:-10}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-0.5099,x:34.5,y:185.15,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8833,y:-59.7,x:-4.25,regX:-1.5}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:18.0891,y:185.55,x:-41.75,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9778,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.0896,y:88.3,x:24.5}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-2.5585,x:-6.05,y:-81.2,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-85.5426,x:-81.3,y:56.55,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.9969,scaleY:0.9969,rotation:-91.8138,x:-95.95,y:141.45}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-111.2622,x:-95.3,y:141.5}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-74.5619,y:-12.4,regY:9.6,x:-59.45,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7362,x:-10.05,y:49.25}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.7325,x:48.55,y:-20.7,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:85.9321,x:54.3,regY:12.2,y:49.4}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:141.2479,x:68.7,y:134.75,regY:13}},{t:this.instance_11,p:{regY:10.8,scaleX:0.9967,scaleY:0.9967,rotation:114.8022,x:65.55,y:135.7,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-0.5143,x:34.45,y:185.15,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8824,y:-59.7,x:-4.25,regX:-1.5}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:18.3288,y:185.5,x:-41.75,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9796,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.0958,y:88.3,x:24.45}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-2.6717,x:-6.05,y:-81.15,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-85.3975,x:-81.05,y:56.65,regX:43.6}},{t:this.instance_2,p:{regX:4.5,scaleX:0.9969,scaleY:0.9969,rotation:-91.6708,x:-95.95,y:141.35}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-111.1208,x:-95.35,y:141.55}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-74.7319,y:-12.4,regY:9.7,x:-59.4,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7353,x:-10.05,y:49.25}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.7501,x:48.55,y:-20.7,regY:13.1}},{t:this.instance_13,p:{regX:-45.2,scaleX:0.997,scaleY:0.997,rotation:86.0771,x:54.25,regY:12.2,y:49.5}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:141.7017,x:68.45,y:134.8,regY:13}},{t:this.instance_11,p:{regY:11,scaleX:0.9967,scaleY:0.9967,rotation:115.7879,x:65.15,y:135.6,regX:-10}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-0.5196,x:34.45,y:185.15,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8816,y:-59.7,x:-4.25,regX:-1.5}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:18.5678,y:185.6,x:-41.75,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9813,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.1012,y:88.3,x:24.45}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-2.7823,x:-6.05,y:-81.2,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-85.2514,x:-80.9,y:56.65,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.9969,scaleY:0.997,rotation:-91.5269,x:-95.95,y:141.5}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-110.9808,x:-95.35,y:141.6}},{t:this.instance,p:{scaleX:0.997,scaleY:0.997,rotation:-74.9025,y:-12.4,regY:9.7,x:-59.45,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7336,x:-10.05,y:49.2}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.7677,x:48.55,y:-20.7,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:86.2204,x:54.25,regY:12.2,y:49.4}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:142.1534,x:68.15,y:134.8,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:116.7722,x:64.95,y:135.7,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-0.524,x:34.45,y:185.15,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8807,y:-59.7,x:-4.25,regX:-1.5}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:18.8075,y:185.55,x:-41.75,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.984,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.1074,y:88.3,x:24.5}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-2.8945,x:-6.1,y:-81.25,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-85.1071,x:-80.65,y:56.75,regX:43.6}},{t:this.instance_2,p:{regX:4.5,scaleX:0.997,scaleY:0.997,rotation:-91.3848,x:-95.95,y:141.4}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-110.8406,x:-95.35,y:141.6}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-75.0726,y:-12.4,regY:9.7,x:-59.4,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7309,x:-10.05,y:49.2}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.7853,x:48.5,y:-20.75,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:86.3654,x:54.25,regY:12.2,y:49.4}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:142.6057,x:67.95,y:134.85,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:117.7581,x:64.7,y:135.65,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-0.5293,x:34.5,y:185.15,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8798,y:-59.7,x:-4.25,regX:-1.5}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:19.0468,y:185.55,x:-41.75,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9866,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.1136,y:88.3,x:24.5}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-3.0051,x:-6.1,y:-81.2,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-84.9618,x:-80.5,y:56.75,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.997,scaleY:0.997,rotation:-91.241,x:-95.95,y:141.55}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-110.699,x:-95.35,y:141.6}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-75.2441,y:-12.4,regY:9.7,x:-59.4,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.73,x:-10.05,y:49.2}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.8029,x:48.55,y:-20.75,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:86.5095,x:54.2,regY:12.2,y:49.35}},{t:this.instance_12,p:{scaleX:0.9966,scaleY:0.9966,rotation:143.0578,x:67.75,y:134.9,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:118.7428,x:64.35,y:135.8,regX:-9.8}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-0.5337,x:34.55,y:185.15,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8798,y:-59.7,x:-4.25,regX:-1.5}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:19.2854,y:185.6,x:-41.75,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9892,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.1197,y:88.3,x:24.5}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-3.1183,x:-6.1,y:-81.15,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-84.8164,x:-80.25,y:56.85,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.997,scaleY:0.997,rotation:-91.098,x:-96,y:141.6}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-110.5585,x:-95.4,y:141.65}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-75.4134,y:-12.5,regY:9.7,x:-59.35,regX:33.3}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7283,x:-10.05,y:49.2}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.8204,x:48.55,y:-20.7,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:86.6544,x:54.2,regY:12.2,y:49.3}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:143.511,x:67.5,y:134.95,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:119.7277,x:64.2,y:135.65,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-0.5381,x:34.5,y:185.15,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8788,y:-59.75,x:-4.15,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:19.5247,y:185.55,x:-41.8,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9919,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.1259,y:88.3,x:24.5}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-3.228,x:-6.05,y:-81.2,regX:1.2}},{t:this.instance_3,p:{regY:7.6,scaleX:0.9968,scaleY:0.9968,rotation:-84.6712,x:-79.95,y:56.95,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.9969,scaleY:0.9969,rotation:-90.955,x:-96,y:141.6}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-110.4189,x:-95.4,y:141.7}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-75.5846,y:-12.4,regY:9.7,x:-59.45,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7265,x:-10.05,y:49.2}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.8381,x:48.55,y:-20.7,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:86.7976,x:54.2,regY:12.2,y:49.4}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:143.9635,x:67.3,y:134.95,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:120.7128,x:63.95,y:135.65,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-0.5433,x:34.45,y:185.15,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8779,y:-59.75,x:-4.2,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:19.7627,y:185.55,x:-41.75,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9937,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.1304,y:88.3,x:24.45}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-3.3403,x:-6.05,y:-81.15,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-84.5258,x:-79.85,y:56.95,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.9969,scaleY:0.9969,rotation:-90.813,x:-95.95,y:141.6}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-110.2776,x:-95.4,y:141.65}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-75.7547,y:-12.5,regY:9.7,x:-59.45,regX:33.3}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7248,x:-10.05,y:49.2}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.8556,x:48.5,y:-20.7,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:86.9425,x:54.2,regY:12.2,y:49.4}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:144.4151,x:66.95,y:134.9,regY:13.1}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:121.6991,x:63.7,y:135.75,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-0.5477,x:34.5,y:185.15,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8771,y:-59.75,x:-4.2,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:20.0022,y:185.55,x:-41.75,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9963,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.1366,y:88.3,x:24.5}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-3.4518,x:-6.05,y:-81.2,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-84.3804,x:-79.65,y:57.05,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.9969,scaleY:0.9969,rotation:-90.6682,x:-96.05,y:141.6}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-110.1374,x:-95.4,y:141.7}},{t:this.instance,p:{scaleX:0.997,scaleY:0.997,rotation:-75.9248,y:-12.35,regY:9.7,x:-59.35,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7239,x:-10.05,y:49.2}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.8741,x:48.55,y:-20.75,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:87.0865,x:54.15,regY:12.2,y:49.4}},{t:this.instance_12,p:{scaleX:0.9966,scaleY:0.9966,rotation:144.8671,x:66.75,y:134.9,regY:13.1}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:122.6823,x:63.5,y:135.75,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-0.5521,x:34.5,y:185.15,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8762,y:-59.75,x:-4.2,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:20.2416,y:185.6,x:-41.75,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9989,x:-30.15,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.1418,y:88.3,x:24.5}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-3.5633,x:-6.05,y:-81.2,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-84.235,x:-79.45,y:57.05,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.997,scaleY:0.997,rotation:-90.5253,x:-96.05,y:141.65}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-109.9964,x:-95.4,y:141.7}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-76.0956,y:-12.5,regY:9.7,x:-59.35,regX:33.3}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7222,x:-10.05,y:49.2}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.8908,x:48.6,y:-20.7,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:87.2314,x:54.1,regY:12.2,y:49.4}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:145.3199,x:66.55,y:135.05,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:123.6672,x:63.15,y:135.7,regX:-9.8}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-0.5574,x:34.55,y:185.2,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8754,y:-59.75,x:-4.2,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:20.4811,y:185.7,x:-41.9,regY:-51,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:4.0016,x:-30.15,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.1482,y:88.3,x:24.5}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9977,scaleY:0.9977,rotation:-3.674,x:-6.1,y:-81.2,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-84.0904,x:-79.2,y:57.1,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.997,scaleY:0.997,rotation:-90.3824,x:-96.05,y:141.65}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-109.8563,x:-95.4,y:141.75}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-76.2653,y:-12.35,regY:9.7,x:-59.4,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7196,x:-10.05,y:49.2}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.9092,x:48.55,y:-20.7,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:87.3754,x:54.1,regY:12.2,y:49.4}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:145.7735,x:66.35,y:135.1,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:124.6523,x:62.95,y:135.7,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-0.5618,x:34.5,y:185.2,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8754,y:-59.75,x:-4.2,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:20.7212,y:185.6,x:-41.8,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:4.0042,x:-30.15,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.1535,y:88.3,x:24.5}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.9,scaleX:0.9978,scaleY:0.9978,rotation:-3.7872,x:-6.15,y:-81.4,regX:1.2}},{t:this.instance_3,p:{regY:7.6,scaleX:0.9968,scaleY:0.9968,rotation:-83.9449,x:-78.9,y:57.25,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.997,scaleY:0.997,rotation:-90.2394,x:-96.05,y:141.7}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-109.7156,x:-95.45,y:141.75}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-76.4367,y:-12.4,regY:9.6,x:-59.5,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.7178,x:-10.05,y:49.2}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.9268,x:48.55,y:-20.7,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:87.5202,x:54.1,regY:12.2,y:49.45}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:146.2258,x:66.05,y:135.15,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:125.6377,x:62.7,y:135.65,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-0.5662,x:34.55,y:185.2,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8745,y:-59.75,x:-4.2,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:20.9594,y:185.7,x:-41.9,regY:-51,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:4.006,x:-30.15,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.1597,y:88.3,x:24.55}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.9,scaleX:0.9978,scaleY:0.9978,rotation:-3.897,x:-6.15,y:-81.3,regX:1.2}},{t:this.instance_3,p:{regY:7.6,scaleX:0.9968,scaleY:0.9968,rotation:-83.7985,x:-78.7,y:57.25,regX:43.6}},{t:this.instance_2,p:{regX:4.5,scaleX:0.9969,scaleY:0.997,rotation:-90.0956,x:-96.05,y:141.6}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-109.5749,x:-95.45,y:141.75}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-76.6064,y:-12.35,regY:9.7,x:-59.45,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.716,x:-10.05,y:49.2}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.9452,x:48.55,y:-20.75,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:87.6641,x:54.1,regY:12.2,y:49.4}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:146.6778,x:65.85,y:135.15,regY:13}},{t:this.instance_11,p:{regY:10.8,scaleX:0.9967,scaleY:0.9967,rotation:126.6227,x:62.55,y:135.75,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-0.5715,x:34.55,y:185.2,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8736,y:-59.75,x:-4.2,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:21.1976,y:185.6,x:-41.85,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:4.0086,x:-30.15,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.1661,y:88.25,x:24.5}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-4.0086,x:-6.15,y:-81.25,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-83.6539,x:-78.55,y:57.35,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.9969,scaleY:0.9969,rotation:-89.957,x:-96.1,y:141.7}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-109.4348,x:-95.5,y:141.8}},{t:this.instance,p:{scaleX:0.997,scaleY:0.997,rotation:-76.7777,y:-12.35,regY:9.7,x:-59.45,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.716,x:-10.05,y:49.2}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.8864,x:48.6,y:-20.7,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:87.1102,x:54.1,regY:12.2,y:49.4}},{t:this.instance_12,p:{scaleX:0.9966,scaleY:0.9966,rotation:143.585,x:66.6,y:134.95,regY:13.1}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:124.2362,x:63.35,y:135.8,regX:-9.8}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-0.8194,x:34.6,y:185.2,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8736,y:-59.75,x:-4.2,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:20.8539,y:185.6,x:-41.9,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:4.0086,x:-30.15,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.1661,y:88.25,x:24.5}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-4.0086,x:-6.15,y:-81.25,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-83.9211,x:-78.75,y:57.3,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.997,scaleY:0.997,rotation:-90.2201,x:-95.9,y:141.75}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-109.7026,x:-95.3,y:141.8}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-76.6056,y:-12.35,regY:9.7,x:-59.45,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.716,x:-10.1,y:49.2}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.8301,x:48.55,y:-20.75,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:86.556,x:54.2,regY:12.2,y:49.35}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:140.4904,x:67.65,y:134.9,regY:13}},{t:this.instance_11,p:{regY:11,scaleX:0.9967,scaleY:0.9967,rotation:121.8476,x:64.3,y:135.75,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-1.0683,x:34.55,y:185.2,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8736,y:-59.75,x:-4.2,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:20.5101,y:185.65,x:-41.9,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:4.0086,x:-30.15,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.1661,y:88.25,x:24.55}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-4.0086,x:-6.15,y:-81.25,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-84.1883,x:-79,y:57.2,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.997,scaleY:0.997,rotation:-90.4876,x:-95.75,y:141.8}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-109.9692,x:-95.1,y:141.85}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-76.4333,y:-12.5,regY:9.7,x:-59.4,regX:33.3}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.716,x:-10.1,y:49.2}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.7738,x:48.55,y:-20.65,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:86.0024,x:54.3,regY:12.2,y:49.35}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:137.3962,x:68.6,y:134.75,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:119.4613,x:65.35,y:135.85,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-1.3162,x:34.6,y:185.2,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8736,y:-59.75,x:-4.2,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:20.1679,y:185.65,x:-41.75,regY:-51.1,regX:1.2}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:4.0086,x:-30.15,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.1661,y:88.25,x:24.55}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-4.0086,x:-6.2,y:-81.25,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-84.4562,x:-79.25,y:57.25,regX:43.5}},{t:this.instance_2,p:{regX:4.5,scaleX:0.997,scaleY:0.997,rotation:-90.7551,x:-95.55,y:141.65}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-110.2365,x:-94.9,y:141.85}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-76.2609,y:-12.3,regY:9.7,x:-59.45,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.716,x:-10.15,y:49.2}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.7149,x:48.6,y:-20.65,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:85.4484,x:54.35,regY:12.2,y:49.35}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:134.3028,x:69.45,y:134.6,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:117.0735,x:66.4,y:135.85,regX:-10}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-1.5651,x:34.65,y:185.2,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8736,y:-59.75,x:-4.2,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:19.8234,y:185.6,x:-41.8,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:4.0086,x:-30.15,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.1661,y:88.25,x:24.55}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-4.0086,x:-6.2,y:-81.3,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-84.7231,x:-79.5,y:57.1,regX:43.6}},{t:this.instance_2,p:{regX:4.5,scaleX:0.9969,scaleY:0.9969,rotation:-91.0235,x:-95.4,y:141.7}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-110.5036,x:-94.7,y:141.9}},{t:this.instance,p:{scaleX:0.997,scaleY:0.997,rotation:-76.0892,y:-12.45,regY:9.7,x:-59.35,regX:33.3}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.716,x:-10.15,y:49.2}},{t:this.instance_14,p:{regX:-31.7,scaleX:0.9972,scaleY:0.9972,rotation:85.6578,x:48.55,y:-20.55,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:84.8948,x:54.6,regY:12.1,y:49.35}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:131.2087,x:70.4,y:134.45,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:114.6853,x:67.25,y:135.95,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-1.8123,x:34.6,y:185.2,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8736,y:-59.75,x:-4.2,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:19.4788,y:185.7,x:-41.7,regY:-51.1,regX:1.2}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:4.0086,x:-30.15,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.1661,y:88.25,x:24.6}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-4.0086,x:-6.2,y:-81.3,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-84.9908,x:-79.7,y:57,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.997,scaleY:0.997,rotation:-91.2901,x:-95.2,y:141.8}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-110.7712,x:-94.55,y:141.85}},{t:this.instance,p:{scaleX:0.997,scaleY:0.997,rotation:-75.9176,y:-12.35,regY:9.7,x:-59.4,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.716,x:-10.2,y:49.25}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.6015,x:48.55,y:-20.65,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:84.3407,x:54.55,regY:12.2,y:49.35}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:128.1128,x:71.25,y:134.3,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:112.2989,x:68.25,y:135.9,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-2.0604,x:34.7,y:185.2,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8736,y:-59.75,x:-4.2,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:19.1355,y:185.65,x:-41.8,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:4.0086,x:-30.15,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.1661,y:88.25,x:24.6}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-4.0086,x:-6.2,y:-81.3,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-85.2584,x:-79.9,y:57,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.997,scaleY:0.997,rotation:-91.5567,x:-95,y:141.8}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-111.0388,x:-94.35,y:141.9}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-75.7456,y:-12.4,regY:9.7,x:-59.4,regX:33.3}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.716,x:-10.2,y:49.25}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.5435,x:48.75,y:-20.65,regY:13}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:83.7862,x:54.55,regY:12.2,y:49.4}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:125.0198,x:72,y:134.05,regY:13.1}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:109.9106,x:69.25,y:135.95,regX:-9.9}},{t:this.instance_10,p:{regY:-50.9,scaleX:0.9944,scaleY:0.9944,rotation:-2.3093,x:34.65,y:185.05,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8736,y:-59.75,x:-4.25,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:18.7913,y:185.65,x:-41.85,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:4.0086,x:-30.15,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.1661,y:88.25,x:24.6}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-4.0086,x:-6.2,y:-81.3,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-85.5251,x:-80.1,y:56.9,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.9969,scaleY:0.9969,rotation:-91.8244,x:-94.85,y:141.85}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-111.3068,x:-94.15,y:141.9}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-75.5746,y:-12.35,regY:9.7,x:-59.45,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.716,x:-10.25,y:49.25}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.4871,x:48.6,y:-20.6,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:83.2329,x:54.65,regY:12.2,y:49.4}},{t:this.instance_12,p:{scaleX:0.9966,scaleY:0.9966,rotation:121.925,x:73.05,y:133.95,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:107.5234,x:70.25,y:136,regX:-9.8}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-2.5575,x:34.65,y:185.2,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8736,y:-59.75,x:-4.25,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:18.4475,y:185.7,x:-41.85,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:4.0086,x:-30.15,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.1661,y:88.25,x:24.6}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-4.0086,x:-6.2,y:-81.3,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-85.7933,x:-80.35,y:56.9,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.997,scaleY:0.997,rotation:-92.092,x:-94.6,y:141.85}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-111.5746,x:-93.9,y:141.95}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-75.4019,y:-12.4,regY:9.7,x:-59.4,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.716,x:-10.25,y:49.25}},{t:this.instance_14,p:{regX:-31.7,scaleX:0.9972,scaleY:0.9972,rotation:85.43,x:48.75,y:-20.6,regY:13}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:82.6788,x:54.75,regY:12.2,y:49.4}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:118.8304,x:73.95,y:133.8,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:105.1358,x:71.25,y:135.85,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-2.8057,x:34.75,y:185.2,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8736,y:-59.8,x:-4.25,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:18.1039,y:185.7,x:-41.75,regY:-51.1,regX:1.2}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:4.0086,x:-30.15,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.1661,y:88.25,x:24.65}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-4.0086,x:-6.2,y:-81.3,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-86.0606,x:-80.6,y:56.85,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.997,scaleY:0.997,rotation:-92.3587,x:-94.5,y:141.85}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-111.8412,x:-93.75,y:141.9}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-75.2307,y:-12.35,regY:9.7,x:-59.45,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.716,x:-10.3,y:49.25}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.3711,x:48.75,y:-20.65,regY:13}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:82.125,x:54.85,regY:12.2,y:49.35}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:115.7365,x:74.85,y:133.55,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:102.7477,x:72.25,y:135.9,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-3.054,x:34.7,y:185.2,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8736,y:-59.8,x:-4.25,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:17.7608,y:185.7,x:-41.75,regY:-51.1,regX:1.2}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:4.0086,x:-30.15,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.1661,y:88.25,x:24.65}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-4.0086,x:-6.25,y:-81.3,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-86.3287,x:-80.8,y:56.9,regX:43.5}},{t:this.instance_2,p:{regX:4.5,scaleX:0.9969,scaleY:0.9969,rotation:-92.6265,x:-94.3,y:141.7}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-112.1085,x:-93.6,y:141.9}},{t:this.instance,p:{scaleX:0.997,scaleY:0.997,rotation:-75.058,y:-12.4,regY:9.7,x:-59.45,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.716,x:-10.3,y:49.25}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.3147,x:48.6,y:-20.65,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:81.5714,x:54.9,regY:12.2,y:49.45}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:112.6426,x:75.7,y:133.45,regY:13}},{t:this.instance_11,p:{regY:11,scaleX:0.9967,scaleY:0.9967,rotation:100.3613,x:73.15,y:135.75,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-3.3032,x:34.7,y:185.15,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8736,y:-59.8,x:-4.25,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:17.4161,y:185.7,x:-41.85,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:4.0086,x:-30.15,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.1661,y:88.25,x:24.65}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-4.0086,x:-6.25,y:-81.3,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-86.5968,x:-81,y:56.7,regX:43.6}},{t:this.instance_2,p:{regX:4.5,scaleX:0.997,scaleY:0.997,rotation:-92.8942,x:-94.15,y:141.7}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-112.376,x:-93.35,y:141.9}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-74.8872,y:-12.4,regY:9.7,x:-59.45,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.716,x:-10.35,y:49.25}},{t:this.instance_14,p:{regX:-31.7,scaleX:0.9972,scaleY:0.9972,rotation:85.2567,x:48.75,y:-20.55,regY:13}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:81.0178,x:54.95,regY:12.2,y:49.35}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:109.5479,x:76.6,y:133.2,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:97.9737,x:74.25,y:135.8,regX:-9.8}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-3.5506,x:34.75,y:185.2,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8736,y:-59.8,x:-4.25,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:17.0721,y:185.7,x:-41.9,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:4.0086,x:-30.15,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.1661,y:88.25,x:24.65}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-4.0086,x:-6.25,y:-81.3,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-86.8629,x:-81.2,y:56.65,regX:43.6}},{t:this.instance_2,p:{regX:4.5,scaleX:0.997,scaleY:0.997,rotation:-93.1621,x:-93.85,y:141.75}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-112.6442,x:-93.15,y:141.9}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-74.7138,y:-12.4,regY:9.7,x:-59.4,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.716,x:-10.35,y:49.25}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.1996,x:48.65,y:-20.6,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:80.4626,x:55,regY:12.2,y:49.35}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:106.4551,x:77.5,y:133,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:95.5867,x:75.3,y:135.7,regX:-9.8}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-3.7992,x:34.75,y:185.2,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8736,y:-59.8,x:-4.25,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:16.7284,y:185.75,x:-41.8,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:4.0086,x:-30.15,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.1661,y:88.25,x:24.7}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-4.0086,x:-6.25,y:-81.3,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-87.1308,x:-81.5,y:56.7,regX:43.5}},{t:this.instance_2,p:{regX:4.4,scaleX:0.997,scaleY:0.997,rotation:-93.4291,x:-93.7,y:141.85}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-112.9112,x:-92.95,y:141.85}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-74.5428,y:-12.35,regY:9.7,x:-59.5,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.716,x:-10.35,y:49.3}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.1432,x:48.6,y:-20.65,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:79.9088,x:55.2,regY:12.2,y:49.4}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:103.361,x:78.45,y:132.7,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:93.199,x:76.35,y:135.55,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-4.0477,x:34.75,y:185.2,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8736,y:-59.8,x:-4.25,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:16.3852,y:185.75,x:-41.9,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:4.0086,x:-30.15,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.1661,y:88.25,x:24.7}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-4.0086,x:-6.25,y:-81.3,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-87.3978,x:-81.7,y:56.7,regX:43.5}},{t:this.instance_2,p:{regX:4.4,scaleX:0.9969,scaleY:0.9969,rotation:-93.6963,x:-93.55,y:141.8}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-113.1781,x:-92.8,y:141.9}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-74.3698,y:-12.4,regY:9.7,x:-59.5,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.716,x:-10.4,y:49.3}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.0851,x:48.75,y:-20.65,regY:13}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:79.3555,x:55.15,regY:12.2,y:49.3}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:100.2662,x:79.3,y:132.5,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:90.8105,x:77.4,y:135.35,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-4.2953,x:34.75,y:185.2,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8736,y:-59.8,x:-4.25,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:16.0419,y:185.75,x:-41.85,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:4.0086,x:-30.15,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.1661,y:88.2,x:24.7}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-4.0086,x:-6.25,y:-81.3,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-87.6655,x:-81.9,y:56.45,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.997,scaleY:0.997,rotation:-93.9635,x:-93.35,y:141.8}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-113.4453,x:-92.6,y:141.85}},{t:this.instance,p:{scaleX:0.997,scaleY:0.997,rotation:-74.1985,y:-12.35,regY:9.7,x:-59.5,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.716,x:-10.4,y:49.3}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:85.028,x:48.65,y:-20.65,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:78.8015,x:55.25,regY:12.2,y:49.35}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:97.1721,x:80.15,y:132.35,regY:13}},{t:this.instance_11,p:{regY:10.8,scaleX:0.9967,scaleY:0.9967,rotation:88.4279,x:78.55,y:135.3,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-4.5439,x:34.8,y:185.2,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8736,y:-59.8,x:-4.25,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:15.6974,y:185.8,x:-41.85,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:4.0086,x:-30.15,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.1661,y:88.2,x:24.7}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-4.0086,x:-6.25,y:-81.3,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-87.9323,x:-82.15,y:56.4,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.997,scaleY:0.997,rotation:-94.2307,x:-93.15,y:141.85}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-113.7128,x:-92.4,y:141.85}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-74.0273,y:-12.35,regY:9.7,x:-59.5,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.716,x:-10.45,y:49.3}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:84.9699,x:48.65,y:-20.6,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:78.2479,x:55.35,regY:12.2,y:49.35}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:94.078,x:81.05,y:132.05,regY:13}},{t:this.instance_11,p:{regY:11,scaleX:0.9967,scaleY:0.9967,rotation:86.0408,x:79.3,y:135.1,regX:-9.9}},{t:this.instance_10,p:{regY:-50.9,scaleX:0.9944,scaleY:0.9944,rotation:-4.791,x:34.8,y:185.1,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8736,y:-59.8,x:-4.25,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:15.3536,y:185.8,x:-41.9,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:4.0086,x:-30.15,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.1661,y:88.2,x:24.75}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-4.0086,x:-6.3,y:-81.3,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-88.2,x:-82.35,y:56.35,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.9969,scaleY:0.9969,rotation:-94.4982,x:-93,y:141.8}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-113.9803,x:-92.2,y:141.8}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-73.8547,y:-12.35,regY:9.7,x:-59.45,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.716,x:-10.45,y:49.3}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:84.9144,x:48.65,y:-20.65,regY:13.1}},{t:this.instance_13,p:{regX:-45.2,scaleX:0.9969,scaleY:0.9969,rotation:77.6942,x:55.45,regY:12.2,y:49.45}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:90.9834,x:81.85,y:131.85,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:83.653,x:80.45,y:134.9,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-5.0407,x:34.8,y:185.2,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8736,y:-59.8,x:-4.25,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:15.0098,y:185.8,x:-41.85,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:4.0086,x:-30.15,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.1661,y:88.2,x:24.75}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-4.0086,x:-6.3,y:-81.3,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9969,rotation:-88.4676,x:-82.5,y:56.3,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.997,scaleY:0.997,rotation:-94.7656,x:-92.8,y:141.8}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-114.2473,x:-92,y:141.85}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-73.6832,y:-12.35,regY:9.7,x:-59.45,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.716,x:-10.5,y:49.3}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:84.8562,x:48.65,y:-20.7,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:77.1391,x:55.5,regY:12.2,y:49.35}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:87.8943,x:82.75,y:131.5,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:81.2654,x:81.5,y:134.7,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-5.2888,x:34.9,y:185.2,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8736,y:-59.8,x:-4.25,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:14.6663,y:185.9,x:-41.9,regY:-51,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:4.0086,x:-30.15,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.1661,y:88.2,x:24.75}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-4.0086,x:-6.3,y:-81.3,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-88.7343,x:-82.75,y:56.25,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.997,scaleY:0.997,rotation:-95.0331,x:-92.65,y:141.75}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9966,scaleY:0.9966,rotation:-114.5151,x:-91.85,y:141.7}},{t:this.instance,p:{scaleX:0.997,scaleY:0.997,rotation:-73.5111,y:-12.3,regY:9.7,x:-59.55,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.716,x:-10.5,y:49.3}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:84.7983,x:48.8,y:-20.6,regY:13}},{t:this.instance_13,p:{regX:-45.4,scaleX:0.997,scaleY:0.997,rotation:76.5852,x:55.5,regY:12.2,y:49.25}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:84.8,x:83.7,y:131.2,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:78.8788,x:82.6,y:134.45,regX:-9.9}},{t:this.instance_10,p:{regY:-50.9,scaleX:0.9944,scaleY:0.9944,rotation:-5.5369,x:34.8,y:185.05,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8736,y:-59.85,x:-4.25,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:14.3222,y:185.75,x:-41.9,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:4.0086,x:-30.15,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.1661,y:88.2,x:24.75}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-4.0086,x:-6.3,y:-81.35,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-89.0019,x:-83,y:56.2,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.9969,scaleY:0.9969,rotation:-95.3,x:-92.4,y:141.75}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-114.7824,x:-91.6,y:141.8}},{t:this.instance,p:{scaleX:0.997,scaleY:0.997,rotation:-73.3391,y:-12.4,regY:9.7,x:-59.5,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.716,x:-10.55,y:49.3}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:84.7419,x:48.65,y:-20.6,regY:13.1}},{t:this.instance_13,p:{regX:-45.4,scaleX:0.997,scaleY:0.997,rotation:76.032,x:55.6,regY:12.2,y:49.25}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:81.7054,x:84.55,y:130.95,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:76.4903,x:83.65,y:134.25,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-5.7852,x:34.85,y:185.15,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8736,y:-59.85,x:-4.25,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:13.9787,y:185.8,x:-41.9,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:4.0086,x:-30.15,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.1661,y:88.2,x:24.8}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-4.0086,x:-6.3,y:-81.35,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-89.2694,x:-83.15,y:56.15,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.9969,scaleY:0.9969,rotation:-95.5678,x:-92.25,y:141.75}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-115.0505,x:-91.4,y:141.75}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-73.1671,y:-12.4,regY:9.7,x:-59.5,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.716,x:-10.55,y:49.35}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:84.6838,x:48.65,y:-20.55,regY:13.1}},{t:this.instance_13,p:{regX:-45.2,scaleX:0.997,scaleY:0.997,rotation:75.4786,x:55.8,regY:12.2,y:49.5}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:78.6121,x:85.4,y:130.6,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:74.1034,x:84.65,y:134.05,regX:-9.9}},{t:this.instance_10,p:{regY:-50.9,scaleX:0.9944,scaleY:0.9944,rotation:-6.0327,x:34.9,y:185.1,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8736,y:-59.85,x:-4.25,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9946,scaleY:0.9946,rotation:13.6343,y:185.8,x:-41.9,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:4.0086,x:-30.15,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.1661,y:88.2,x:24.8}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-4.0086,x:-6.3,y:-81.35,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-89.5369,x:-83.35,y:56.05,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.997,scaleY:0.997,rotation:-95.8347,x:-92,y:141.7}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-115.317,x:-91.2,y:141.75}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-72.9957,y:-12.35,regY:9.7,x:-59.5,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.716,x:-10.6,y:49.35}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:84.6264,x:48.65,y:-20.65,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:74.9252,x:55.8,regY:12.2,y:49.3}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:75.5176,x:86.2,y:130.4,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:71.7162,x:85.7,y:133.75,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-6.282,x:34.85,y:185.2,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8736,y:-59.85,x:-4.25,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:13.2919,y:185.85,x:-41.9,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:4.0086,x:-30.15,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.1661,y:88.2,x:24.8}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-4.0086,x:-6.3,y:-81.35,regX:1.2}},{t:this.instance_3,p:{regY:7.6,scaleX:0.9968,scaleY:0.9968,rotation:-89.8044,x:-83.5,y:56.1,regX:43.5}},{t:this.instance_2,p:{regX:4.4,scaleX:0.9969,scaleY:0.9969,rotation:-96.1037,x:-91.85,y:141.7}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-115.5842,x:-91,y:141.7}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-72.8232,y:-12.4,regY:9.7,x:-59.5,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.716,x:-10.6,y:49.35}},{t:this.instance_14,p:{regX:-31.7,scaleX:0.9972,scaleY:0.9972,rotation:84.5693,x:48.6,y:-20.45,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:74.3695,x:56,regY:12.1,y:49.3}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:72.4228,x:87.15,y:130.05,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:69.3285,x:86.7,y:133.5,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-6.5298,x:34.9,y:185.15,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8736,y:-59.85,x:-4.25,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:12.9469,y:185.8,x:-41.9,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:4.0086,x:-30.15,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.1661,y:88.2,x:24.8}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-4.0086,x:-6.35,y:-81.35,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-90.0667,x:-83.8,y:55.9,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.997,scaleY:0.997,rotation:-96.37,x:-91.7,y:141.6}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-115.8518,x:-90.85,y:141.65}},{t:this.instance,p:{scaleX:0.997,scaleY:0.997,rotation:-72.6515,y:-12.45,regY:9.7,x:-59.5,regX:33.3}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.716,x:-10.65,y:49.35}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:84.5129,x:48.6,y:-20.55,regY:13.1}},{t:this.instance_13,p:{regX:-45.2,scaleX:0.997,scaleY:0.997,rotation:73.816,x:56,regY:12.2,y:49.4}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:69.3293,x:88,y:129.7,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:66.941,x:87.8,y:133.15,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-6.7777,x:34.95,y:185.15,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8736,y:-59.85,x:-4.25,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:12.6027,y:185.85,x:-41.95,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:4.0086,x:-30.15,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.1661,y:88.2,x:24.85}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-4.0086,x:-6.35,y:-81.35,regX:1.2}},{t:this.instance_3,p:{regY:7.6,scaleX:0.9968,scaleY:0.9968,rotation:-90.3342,x:-83.9,y:55.85,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.997,scaleY:0.997,rotation:-96.6375,x:-91.45,y:141.55}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-116.1194,x:-90.65,y:141.65}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-72.4796,y:-12.35,regY:9.7,x:-59.6,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.716,x:-10.65,y:49.35}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:84.4557,x:48.65,y:-20.65,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:73.2627,x:56,regY:12.2,y:49.3}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:66.2351,x:88.8,y:129.4,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:64.5546,x:88.85,y:132.8,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-7.0265,x:34.9,y:185.15,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8736,y:-59.85,x:-4.25,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:12.2597,y:186,x:-42,regY:-51,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:4.0086,x:-30.15,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.1661,y:88.2,x:24.85}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-4.0086,x:-6.35,y:-81.35,regX:1.2}},{t:this.instance_3,p:{regY:7.6,scaleX:0.9968,scaleY:0.9969,rotation:-90.6017,x:-84.1,y:55.8,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.9969,scaleY:0.9969,rotation:-96.9052,x:-91.35,y:141.55}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-116.3873,x:-90.45,y:141.55}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-72.3076,y:-12.45,regY:9.7,x:-59.5,regX:33.3}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.716,x:-10.7,y:49.35}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:84.3992,x:48.6,y:-20.65,regY:13.1}},{t:this.instance_13,p:{regX:-45.2,scaleX:0.997,scaleY:0.997,rotation:72.7098,x:56.25,regY:12.1,y:49.4}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:63.1403,x:89.65,y:129.05,regY:13}},{t:this.instance_11,p:{regY:10.8,scaleX:0.9967,scaleY:0.9967,rotation:62.1666,x:89.95,y:132.45,regX:-10}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-7.2755,x:34.95,y:185.2,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8736,y:-59.85,x:-4.25,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:11.9156,y:185.9,x:-41.9,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:4.0086,x:-30.15,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.1661,y:88.2,x:24.85}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-4.0086,x:-6.35,y:-81.35,regX:1.2}},{t:this.instance_3,p:{regY:7.6,scaleX:0.9968,scaleY:0.9968,rotation:-90.8701,x:-84.4,y:55.75,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.9969,scaleY:0.9969,rotation:-97.172,x:-91.1,y:141.5}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-116.6541,x:-90.2,y:141.55}},{t:this.instance,p:{scaleX:0.9971,scaleY:0.9971,rotation:-72.1357,y:-12.4,regY:9.6,x:-59.65,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.716,x:-10.7,y:49.35}},{t:this.instance_14,p:{regX:-31.7,scaleX:0.9972,scaleY:0.9972,rotation:84.3403,x:48.65,y:-20.5,regY:13.1}},{t:this.instance_13,p:{regX:-45.4,scaleX:0.997,scaleY:0.997,rotation:72.1549,x:56.1,regY:12.2,y:49.2}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:60.0463,x:90.35,y:128.75,regY:13.1}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:59.7787,x:90.85,y:132.1,regX:-10}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-7.5237,x:35.1,y:185.15,regX:4.6}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8736,y:-59.85,x:-4.3,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:11.5723,y:185.9,x:-41.9,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:4.0086,x:-30.15,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.1661,y:88.2,x:24.85}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-4.0086,x:-6.35,y:-81.35,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-91.1367,x:-84.65,y:55.65,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.997,scaleY:0.997,rotation:-97.4407,x:-90.85,y:141.45}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-116.9217,x:-90,y:141.5}},{t:this.instance,p:{scaleX:0.997,scaleY:0.997,rotation:-71.9638,y:-12.35,regY:9.7,x:-59.55,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.716,x:-10.7,y:49.35}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:84.2847,x:48.6,y:-20.6,regY:13.1}},{t:this.instance_13,p:{regX:-45.3,scaleX:0.997,scaleY:0.997,rotation:71.6005,x:56.2,regY:12.2,y:49.35}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:56.9515,x:91.35,y:128.4,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:57.3912,x:91.95,y:131.85,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-7.7704,x:35.05,y:185.15,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8736,y:-59.85,x:-4.3,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9945,scaleY:0.9945,rotation:11.2274,y:185.85,x:-41.9,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:4.0086,x:-30.15,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.1661,y:88.2,x:24.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-4.0086,x:-6.35,y:-81.35,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-91.4034,x:-84.85,y:55.55,regX:43.6}},{t:this.instance_2,p:{regX:4.4,scaleX:0.997,scaleY:0.997,rotation:-97.7071,x:-90.75,y:141.4}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-117.1885,x:-89.75,y:141.45}},{t:this.instance,p:{scaleX:0.997,scaleY:0.997,rotation:-71.7924,y:-12.4,regY:9.7,x:-59.55,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-21.5,scaleX:0.9992,scaleY:0.9992,rotation:1.716,x:-10.7,y:49.35}},{t:this.instance_14,p:{regX:-31.8,scaleX:0.9972,scaleY:0.9972,rotation:84.2266,x:48.6,y:-20.65,regY:13.1}},{t:this.instance_13,p:{regX:-45.2,scaleX:0.997,scaleY:0.997,rotation:71.0479,x:56.3,regY:12.2,y:49.4}},{t:this.instance_12,p:{scaleX:0.9967,scaleY:0.9967,rotation:53.8603,x:92.2,y:128,regY:13}},{t:this.instance_11,p:{regY:10.9,scaleX:0.9967,scaleY:0.9967,rotation:55.0046,x:93,y:131.4,regX:-9.9}},{t:this.instance_10,p:{regY:-50.8,scaleX:0.9944,scaleY:0.9944,rotation:-8.0196,x:35.05,y:185.2,regX:4.5}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.8736,y:-59.85,x:-4.3,regX:-1.4}},{t:this.instance_8,p:{scaleX:0.9946,scaleY:0.9946,rotation:10.885,y:185.9,x:-41.9,regY:-51.1,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:4.0086,x:-30.15,y:90.9}},{t:this.instance_6,p:{regX:0.8,regY:4.9,scaleX:0.9942,scaleY:0.9942,rotation:-9.1661,y:88.2,x:24.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:51,scaleX:0.9978,scaleY:0.9978,rotation:-4.0086,x:-6.35,y:-81.35,regX:1.2}},{t:this.instance_3,p:{regY:7.5,scaleX:0.9968,scaleY:0.9968,rotation:-91.671,x:-85.05,y:55.6,regX:43.6}},{t:this.instance_2,p:{regX:4.5,scaleX:0.9969,scaleY:0.9969,rotation:-97.9736,x:-90.45,y:141.25}},{t:this.instance_1,p:{regX:14.1,scaleX:0.9966,scaleY:0.9966,rotation:-117.4549,x:-89.6,y:141.5}},{t:this.instance,p:{scaleX:0.997,scaleY:0.997,rotation:-71.6213,y:-12.35,regY:9.7,x:-59.5,regX:33.2}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-106.5,-204.2,229.1,501.09999999999997);


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
	this.instance = new lib.ch1_uArm_rcopy2_2("synched",0);
	this.instance.setTransform(-59.4,-12.45,0.9974,0.9974,-76.5654,0,0,33.4,9.9);

	this.instance_1 = new lib.ch1_hand_rcopy2_2("synched",0);
	this.instance_1.setTransform(-96.15,141.65,0.9969,0.9969,-109.0268,0,0,14.3,0.2);

	this.instance_2 = new lib.ch1_thumb_rcopy2_2("synched",0);
	this.instance_2.setTransform(-96.6,141.55,0.9972,0.9972,-89.6344,0,0,4.5,-9);

	this.instance_3 = new lib.ch1_lArm_rcopy2_2("synched",0);
	this.instance_3.setTransform(-78.85,57.25,0.9971,0.9971,-83.4059,0,0,43.9,7.9);

	this.instance_4 = new lib.ch1_headcopy2_2("synched",0);
	this.instance_4.setTransform(-6.05,-81.2,0.9981,0.9981,-3.8906,0,0,1.5,51.1);

	this.instance_5 = new lib.ch1_uBodycopy2_2("synched",0);
	this.instance_5.setTransform(-7.35,-36,1,1,0,0,0,-0.1,-39.6);

	this.instance_6 = new lib.ch1_uLeg_lcopy2_2("synched",0);
	this.instance_6.setTransform(24.3,88.3,0.9945,0.9945,-8.9634,0,0,0.2,4.8);

	this.instance_7 = new lib.ch1_uLeg_rcopy2_2("synched",0);
	this.instance_7.setTransform(-30.2,91.05,0.9955,0.9955,3.9263,0,0,1.4,-41.6);

	this.instance_8 = new lib.ch1_lLeg_rcopy2_2("synched",0);
	this.instance_8.setTransform(-41.75,185.65,0.9949,0.9949,20.9078,0,0,1.1,-51.4);

	this.instance_9 = new lib.ch1_neckcopy2_2("synched",0);
	this.instance_9.setTransform(-4.25,-59.75,0.9981,0.9981,-6.7843,0,0,-1.4,7);

	this.instance_10 = new lib.ch1_lLeg_lcopy2_2("synched",0);
	this.instance_10.setTransform(34.4,185.15,0.9948,0.9948,-0.4113,0,0,4.1,-50.9);

	this.instance_11 = new lib.ch1_hand_lcopy2_2("synched",0);
	this.instance_11.setTransform(62.85,135.65,0.997,0.997,127.076,0,0,-10.1,11);

	this.instance_12 = new lib.ch1_thumb_lcopy2_2("synched",0);
	this.instance_12.setTransform(66.3,135.05,0.997,0.997,146.8778,0,0,-7.3,13.2);

	this.instance_13 = new lib.ch1_lArm_lcopy2_2("synched",0);
	this.instance_13.setTransform(54.4,49.25,0.9973,0.9973,87.6218,0,0,-45.6,12.2);

	this.instance_14 = new lib.ch1_uArm_lcopy2_2("synched",0);
	this.instance_14.setTransform(48.55,-20.65,0.9975,0.9975,85.6856,0,0,-31.9,13.1);

	this.instance_15 = new lib.ch1_lBodycopy2_2("synched",0);
	this.instance_15.setTransform(-10,49,0.9995,0.9995,1.7768,0,0,-4.7,-21.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{regX:-4.7,regY:-21.9,rotation:1.7768,x:-10,y:49}},{t:this.instance_14,p:{rotation:85.6856,x:48.55,y:-20.65,scaleX:0.9975,scaleY:0.9975,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:87.6218,x:54.4,regY:12.2,regX:-45.6,y:49.25}},{t:this.instance_12,p:{scaleX:0.997,scaleY:0.997,rotation:146.8778,x:66.3,y:135.05,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:127.076,x:62.85,y:135.65,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-50.9,rotation:-0.4113,x:34.4,y:185.15,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.7843,x:-4.25,y:-59.75}},{t:this.instance_8,p:{rotation:20.9078,x:-41.75,y:185.65,scaleX:0.9949,scaleY:0.9949,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9263,x:-30.2,y:91.05}},{t:this.instance_6,p:{regX:0.2,regY:4.8,rotation:-8.9634,x:24.3,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.5,scaleX:0.9981,scaleY:0.9981,rotation:-3.8906,x:-6.05,y:-81.2}},{t:this.instance_3,p:{regX:43.9,regY:7.9,rotation:-83.4059,x:-78.85,y:57.25,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-89.6344,x:-96.6,y:141.55,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9969,scaleY:0.9969,rotation:-109.0268,x:-96.15,y:141.65}},{t:this.instance,p:{regY:9.9,scaleX:0.9974,scaleY:0.9974,rotation:-76.5654,y:-12.45,regX:33.4,x:-59.4}}]}).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7751,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.6756,x:48.5,y:-20.7,scaleX:0.9975,scaleY:0.9975,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:87.4707,x:54.45,regY:12.2,regX:-45.6,y:49.25}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:146.3919,x:66.45,y:134.95,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:126.0178,x:63.15,y:135.6,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4104,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7758,x:-4.2,y:-59.7}},{t:this.instance_8,p:{rotation:20.9071,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9256,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-3.6503,x:-6,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:8,rotation:-83.5672,x:-78.8,y:57.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-89.7957,x:-96.65,y:141.5,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-109.1871,x:-95.95,y:141.75}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-76.3922,y:-12.5,regX:33.4,x:-59.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7751,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.665,x:48.5,y:-20.7,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:87.3189,x:54.55,regY:12.1,regX:-45.6,y:49.25}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:145.9057,x:66.8,y:134.9,regX:-7.4,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:124.9595,x:63.4,y:135.6,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4104,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.767,x:-4.2,y:-59.7}},{t:this.instance_8,p:{rotation:20.9071,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9256,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-3.4107,x:-6,y:-81.25}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-83.7286,x:-79.15,y:57.25,scaleX:0.997,scaleY:0.997}},{t:this.instance_2,p:{rotation:-89.957,x:-96.6,y:141.5,scaleX:0.9971,scaleY:0.9971,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-109.3489,x:-95.95,y:141.75}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-76.218,y:-12.45,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7751,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.6536,x:48.55,y:-20.65,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:87.1679,x:54.45,regY:12.2,regX:-45.6,y:49.25}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:145.4207,x:67,y:134.9,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:123.9005,x:63.6,y:135.65,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4104,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7591,x:-4.25,y:-59.7}},{t:this.instance_8,p:{rotation:20.9071,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9256,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-3.1711,x:-6.05,y:-81.3}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-83.8916,x:-79.35,y:57.2,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-90.1149,x:-96.45,y:141.45,scaleX:0.9972,scaleY:0.9972,regY:-8.9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-109.5098,x:-95.95,y:141.65}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-76.0429,y:-12.6,regX:33.4,x:-59.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7751,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.643,x:48.55,y:-20.65,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:87.0152,x:54.5,regY:12.2,regX:-45.5,y:49.4}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:144.9336,x:67.2,y:134.9,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:122.8419,x:63.85,y:135.6,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4096,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7504,x:-4.25,y:-59.7}},{t:this.instance_8,p:{rotation:20.9071,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9256,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-2.9316,x:-6,y:-81.2}},{t:this.instance_3,p:{regX:43.9,regY:8,rotation:-84.0514,x:-79.45,y:57.05,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-90.2762,x:-96.45,y:141.45,scaleX:0.9972,scaleY:0.9972,regY:-8.9,regX:4.5}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-109.6718,x:-95.85,y:141.7}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-75.8685,y:-12.45,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7751,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.6307,x:48.5,y:-20.7,scaleX:0.9974,scaleY:0.9974,regY:13.2,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:86.8633,x:54.45,regY:12.2,regX:-45.6,y:49.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:144.4487,x:67.45,y:134.8,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:121.7841,x:64.15,y:135.6,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4096,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7416,x:-4.25,y:-59.7}},{t:this.instance_8,p:{rotation:20.9071,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9247,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-2.6914,x:-6,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-84.2143,x:-79.8,y:57.05,scaleX:0.997,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-90.4384,x:-96.5,y:141.5,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-109.8326,x:-95.9,y:141.65}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-75.6939,y:-12.5,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7751,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.6202,x:48.45,y:-20.7,scaleX:0.9974,scaleY:0.9974,regY:13.2,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:86.7122,x:54.5,regY:12.2,regX:-45.6,y:49.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:143.9617,x:67.75,y:134.75,regX:-7.4,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:120.7255,x:64.25,y:135.65,regX:-10,regY:11.1}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4096,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7345,x:-4.15,y:-59.7}},{t:this.instance_8,p:{rotation:20.9071,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9247,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-2.4537,x:-5.95,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:8,rotation:-84.3747,x:-79.85,y:57.05,scaleX:0.997,scaleY:0.997}},{t:this.instance_2,p:{rotation:-90.5988,x:-96.45,y:141.5,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-109.9949,x:-95.8,y:141.7}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-75.52,y:-12.5,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7751,x:-10.05,y:49.05}},{t:this.instance_14,p:{rotation:85.6088,x:48.45,y:-20.65,scaleX:0.9974,scaleY:0.9974,regY:13.2,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:86.5594,x:54.45,regY:12.2,regX:-45.6,y:49.25}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:143.4762,x:67.9,y:134.8,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:119.6672,x:64.55,y:135.5,regX:-10.1,regY:11.1}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4096,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7257,x:-4.15,y:-59.7}},{t:this.instance_8,p:{rotation:20.9071,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9247,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-2.2134,x:-6,y:-81.25}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-84.5368,x:-80.25,y:56.9,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-90.761,x:-96.35,y:141.4,scaleX:0.9972,scaleY:0.9972,regY:-8.9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-110.1559,x:-95.8,y:141.55}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-75.3461,y:-12.5,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7751,x:-10.05,y:49.05}},{t:this.instance_14,p:{rotation:85.5982,x:48.45,y:-20.65,scaleX:0.9974,scaleY:0.9974,regY:13.2,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:86.4084,x:54.5,regY:12.2,regX:-45.6,y:49.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:142.9898,x:68.2,y:134.7,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:118.6091,x:64.85,y:135.55,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4096,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7177,x:-4.2,y:-59.75}},{t:this.instance_8,p:{rotation:20.9071,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9247,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-1.9732,x:-6,y:-81.25}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-84.6988,x:-80.4,y:56.8,scaleX:0.997,scaleY:0.997}},{t:this.instance_2,p:{rotation:-90.9224,x:-96.3,y:141.4,scaleX:0.9971,scaleY:0.9971,regY:-8.9,regX:4.5}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-110.3174,x:-95.75,y:141.7}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-75.1713,y:-12.45,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7751,x:-10.05,y:49.05}},{t:this.instance_14,p:{rotation:85.5868,x:48.55,y:-20.7,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:86.2564,x:54.55,regY:12.2,regX:-45.6,y:49.25}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:142.5036,x:68.4,y:134.65,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:117.5506,x:65.15,y:135.55,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4096,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7088,x:-4.2,y:-59.75}},{t:this.instance_8,p:{rotation:20.9071,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9247,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-1.7348,x:-5.95,y:-81.25}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-84.8608,x:-80.65,y:56.75,scaleX:0.997,scaleY:0.997}},{t:this.instance_2,p:{rotation:-91.0846,x:-96.4,y:141.35,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-110.4795,x:-95.75,y:141.55}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-74.9978,y:-12.5,regX:33.3,x:-59.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7751,x:-10.05,y:49.05}},{t:this.instance_14,p:{rotation:85.5771,x:48.55,y:-20.7,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:86.1044,x:54.5,regY:12.2,regX:-45.6,y:49.25}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:142.0173,x:68.7,y:134.55,regX:-7.4,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:116.4913,x:65.35,y:135.55,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4096,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7008,x:-4.2,y:-59.75}},{t:this.instance_8,p:{rotation:20.9071,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9247,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-1.4938,x:-6,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-85.021,x:-80.85,y:56.7,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-91.2469,x:-96.4,y:141.4,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-110.6404,x:-95.7,y:141.5}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-74.8228,y:-12.55,regX:33.4,x:-59.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7751,x:-10.05,y:49.05}},{t:this.instance_14,p:{rotation:85.5657,x:48.5,y:-20.65,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:85.9524,x:54.55,regY:12.2,regX:-45.6,y:49.25}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:141.5321,x:68.85,y:134.6,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:115.4335,x:65.55,y:135.55,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4096,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6921,x:-4.15,y:-59.75}},{t:this.instance_8,p:{rotation:20.9071,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9247,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-1.2546,x:-6.05,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-85.1821,x:-81.1,y:56.6,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-91.4073,x:-96.2,y:141.3,scaleX:0.9972,scaleY:0.9972,regY:-8.9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-110.8017,x:-95.7,y:141.45}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-74.6492,y:-12.35,regX:33.2,x:-59.5}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7751,x:-10.05,y:49.05}},{t:this.instance_14,p:{rotation:85.5551,x:48.5,y:-20.65,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:85.8019,x:54.55,regY:12.2,regX:-45.6,y:49.25}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:141.0461,x:69.15,y:134.55,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:114.3754,x:65.8,y:135.55,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4096,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6842,x:-4.15,y:-59.75}},{t:this.instance_8,p:{rotation:20.9071,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9247,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-1.0154,x:-6,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-85.3441,x:-81.25,y:56.55,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-91.5687,x:-96.15,y:141.3,scaleX:0.9972,scaleY:0.9972,regY:-8.9,regX:4.5}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-110.9641,x:-95.6,y:141.6}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-74.4746,y:-12.5,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7751,x:-10.05,y:49.05}},{t:this.instance_14,p:{rotation:85.5437,x:48.4,y:-20.7,scaleX:0.9974,scaleY:0.9974,regY:13.2,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:85.649,x:54.55,regY:12.2,regX:-45.6,y:49.15}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:140.5599,x:69.3,y:134.6,regX:-7.2,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:113.3165,x:66.15,y:135.5,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4087,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6745,x:-4.15,y:-59.75}},{t:this.instance_8,p:{rotation:20.9071,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9247,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-0.7762,x:-6,y:-81.2}},{t:this.instance_3,p:{regX:43.9,regY:7.9,rotation:-85.5051,x:-81.45,y:56.35,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-91.731,x:-96.25,y:141.3,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-111.1257,x:-95.6,y:141.4}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-74.3006,y:-12.4,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7751,x:-10.05,y:49.05}},{t:this.instance_14,p:{rotation:85.5331,x:48.35,y:-20.65,scaleX:0.9974,scaleY:0.9974,regY:13.2,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:85.4977,x:54.55,regY:12.2,regX:-45.6,y:49.15}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:140.0742,x:69.65,y:134.55,regX:-7.3,regY:13.1}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:112.2575,x:66.35,y:135.55,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4087,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6666,x:-4.15,y:-59.75}},{t:this.instance_8,p:{rotation:20.9071,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9247,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.5,scaleX:0.998,scaleY:0.998,rotation:-0.5353,x:-5.9,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-85.6677,x:-81.7,y:56.4,scaleX:0.997,scaleY:0.997}},{t:this.instance_2,p:{rotation:-91.8924,x:-96.2,y:141.25,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-111.2867,x:-95.55,y:141.4}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-74.1258,y:-12.5,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7751,x:-10.05,y:49.05}},{t:this.instance_14,p:{rotation:85.5217,x:48.35,y:-20.65,scaleX:0.9974,scaleY:0.9974,regY:13.2,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:85.3456,x:54.55,regY:12.2,regX:-45.5,y:49.35}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:139.5887,x:69.85,y:134.5,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:111.1992,x:66.65,y:135.5,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4087,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6577,x:-4.15,y:-59.75}},{t:this.instance_8,p:{rotation:20.9071,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9247,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-0.2961,x:-6,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-85.8286,x:-81.9,y:56.4,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-92.0538,x:-96.05,y:141.2,scaleX:0.9972,scaleY:0.9972,regY:-8.9,regX:4.5}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-111.4475,x:-95.55,y:141.5}},{t:this.instance,p:{regY:9.9,scaleX:0.9973,scaleY:0.9973,rotation:-73.9515,y:-12.45,regX:33.3,x:-59.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7751,x:-10.05,y:49.05}},{t:this.instance_14,p:{rotation:85.5112,x:48.35,y:-20.65,scaleX:0.9974,scaleY:0.9974,regY:13.2,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:85.1943,x:54.75,regY:12.1,regX:-45.6,y:49.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:139.1024,x:70.05,y:134.4,regX:-7.2,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:110.141,x:66.75,y:135.45,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4087,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6498,x:-4.1,y:-59.75}},{t:this.instance_8,p:{rotation:20.9071,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9247,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-0.0561,x:-5.95,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-85.9904,x:-82.1,y:56.35,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-92.2153,x:-96,y:141.2,scaleX:0.9972,scaleY:0.9972,regY:-8.9,regX:4.5}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-111.6089,x:-95.5,y:141.45}},{t:this.instance,p:{regY:9.9,scaleX:0.9973,scaleY:0.9973,rotation:-73.7754,y:-12.5,regX:33.3,x:-59.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7751,x:-10.05,y:49.05}},{t:this.instance_14,p:{rotation:85.4997,x:48.35,y:-20.7,scaleX:0.9974,scaleY:0.9974,regY:13.2,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:85.0421,x:54.6,regY:12.2,regX:-45.6,y:49.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:138.617,x:70.35,y:134.4,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:109.0817,x:67.1,y:135.45,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4087,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6417,x:-4.1,y:-59.75}},{t:this.instance_8,p:{rotation:20.9071,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9247,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:0.1778,x:-5.95,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-86.1522,x:-82.35,y:56.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-92.3767,x:-96.15,y:141.15,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-111.77,x:-95.5,y:141.3}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-73.6028,y:-12.45,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7742,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.4892,x:48.45,y:-20.7,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:84.8907,x:54.7,regY:12.2,regX:-45.6,y:49.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:138.1306,x:70.45,y:134.35,regX:-7.2,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:108.0251,x:67.25,y:135.45,regX:-10.1,regY:11.1}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4087,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6339,x:-4.1,y:-59.75}},{t:this.instance_8,p:{rotation:20.9071,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9247,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:0.4179,x:-5.95,y:-81.2}},{t:this.instance_3,p:{regX:43.9,regY:7.9,rotation:-86.3147,x:-82.55,y:56.05,scaleX:0.997,scaleY:0.997}},{t:this.instance_2,p:{rotation:-92.5391,x:-96.05,y:141.1,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-111.932,x:-95.45,y:141.35}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-73.4283,y:-12.45,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7742,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.4769,x:48.45,y:-20.65,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:84.7383,x:54.75,regY:12.1,regX:-45.6,y:49.15}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:137.6444,x:70.85,y:134.3,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:106.965,x:67.45,y:135.35,regX:-10.1,regY:11.1}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4087,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6251,x:-4.1,y:-59.75}},{t:this.instance_8,p:{rotation:20.9071,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9239,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:0.6579,x:-5.95,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-86.4745,x:-82.75,y:56.1,scaleX:0.997,scaleY:0.997}},{t:this.instance_2,p:{rotation:-92.6997,x:-95.95,y:141.05,scaleX:0.9971,scaleY:0.9971,regY:-8.9,regX:4.5}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-112.0946,x:-95.35,y:141.35}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-73.2544,y:-12.4,regX:33.2,x:-59.5}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7742,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.4663,x:48.5,y:-20.65,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:84.586,x:54.65,regY:12.2,regX:-45.5,y:49.3}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:137.1585,x:71.1,y:134.3,regX:-7.3,regY:13.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:105.907,x:67.75,y:135.4,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4087,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6163,x:-4.1,y:-59.75}},{t:this.instance_8,p:{rotation:20.9074,x:-41.7,y:185.6,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9239,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:0.8971,x:-5.9,y:-81.25}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-86.638,x:-82.95,y:56.05,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-92.862,x:-95.9,y:141.05,scaleX:0.9972,scaleY:0.9972,regY:-8.9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-112.2547,x:-95.4,y:141.15}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-73.0794,y:-12.45,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7742,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.4549,x:48.45,y:-20.7,scaleX:0.9974,scaleY:0.9974,regY:13.2,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:84.4345,x:54.65,regY:12.2,regX:-45.5,y:49.3}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:136.6727,x:71.25,y:134.2,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:104.8481,x:68.05,y:135.4,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4078,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6084,x:-4.05,y:-59.75}},{t:this.instance_8,p:{rotation:20.9074,x:-41.7,y:185.6,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9239,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:1.1363,x:-5.9,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-86.7978,x:-83.15,y:55.95,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-93.0227,x:-96.05,y:141,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-112.4167,x:-95.35,y:141.05}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-72.9053,y:-12.5,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7742,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.4443,x:48.4,y:-20.7,scaleX:0.9974,scaleY:0.9974,regY:13.2,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:84.2821,x:54.65,regY:12.2,regX:-45.6,y:49.15}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:136.187,x:71.5,y:134.1,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:103.7904,x:68.3,y:135.4,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4078,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5994,x:-4.05,y:-59.75}},{t:this.instance_8,p:{rotation:20.9074,x:-41.7,y:185.6,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9239,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.5,scaleX:0.998,scaleY:0.998,rotation:1.3764,x:-5.8,y:-81.15}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-86.9611,x:-83.4,y:55.85,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-93.1851,x:-95.95,y:140.95,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-112.5775,x:-95.3,y:141.1}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-72.7309,y:-12.45,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7742,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.4329,x:48.5,y:-20.65,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:84.1314,x:54.7,regY:12.2,regX:-45.6,y:49.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:135.6995,x:71.8,y:134.1,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:102.7306,x:68.55,y:135.5,regX:-10,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4078,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5916,x:-4.05,y:-59.75}},{t:this.instance_8,p:{rotation:20.9074,x:-41.7,y:185.6,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9239,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:1.6148,x:-5.9,y:-81.15}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-87.121,x:-83.6,y:55.85,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-93.3459,x:-95.95,y:140.9,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-112.7399,x:-95.25,y:141.05}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-72.5564,y:-12.5,regX:33.3,x:-59.5}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7742,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.4241,x:48.5,y:-20.65,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:83.979,x:54.7,regY:12.2,regX:-45.6,y:49.25}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:135.2139,x:72,y:134,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:101.6726,x:68.7,y:135.45,regX:-10,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4078,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5827,x:-4.05,y:-59.75}},{t:this.instance_8,p:{rotation:20.9074,x:-41.7,y:185.6,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9239,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:1.8549,x:-5.9,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-87.2842,x:-83.8,y:55.75,scaleX:0.997,scaleY:0.997}},{t:this.instance_2,p:{rotation:-93.5093,x:-95.75,y:140.9,scaleX:0.9971,scaleY:0.9971,regY:-8.9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-112.9,x:-95.25,y:141}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-72.3818,y:-12.45,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7742,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.4127,x:48.5,y:-20.75,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:83.8274,x:54.7,regY:12.2,regX:-45.6,y:49.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:134.7278,x:72.2,y:133.95,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:100.6146,x:69,y:135.35,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4078,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5739,x:-4.05,y:-59.75}},{t:this.instance_8,p:{rotation:20.9074,x:-41.7,y:185.6,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9239,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:2.0951,x:-5.85,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-87.4449,x:-84,y:55.65,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-93.67,x:-95.85,y:140.85,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-113.0626,x:-95.25,y:141}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-72.2077,y:-12.4,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7742,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.4021,x:48.5,y:-20.75,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:83.6756,x:54.7,regY:12.2,regX:-45.6,y:49.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:134.2428,x:72.45,y:133.95,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:99.5565,x:69.3,y:135.25,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4078,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5651,x:-4,y:-59.75}},{t:this.instance_8,p:{rotation:20.9074,x:-41.7,y:185.6,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9239,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:2.3344,x:-5.95,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-87.6055,x:-84.25,y:55.55,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-93.8308,x:-95.8,y:140.8,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-113.2237,x:-95.15,y:140.95}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-72.0327,y:-12.55,regX:33.3,x:-59.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7742,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.3907,x:48.5,y:-20.7,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:83.5239,x:54.75,regY:12.2,regX:-45.6,y:49.15}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:133.7566,x:72.75,y:133.95,regX:-7.3,regY:13.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:98.4988,x:69.5,y:135.4,regX:-10,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4078,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5572,x:-4,y:-59.75}},{t:this.instance_8,p:{rotation:20.9074,x:-41.7,y:185.6,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9239,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:2.5738,x:-5.95,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-87.767,x:-84.4,y:55.5,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-93.9934,x:-95.75,y:140.75,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-113.3852,x:-95.15,y:140.85}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-71.8592,y:-12.5,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7742,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.3801,x:48.5,y:-20.7,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:83.3729,x:54.7,regY:12.2,regX:-45.6,y:49.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:133.2696,x:72.95,y:133.85,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:97.4389,x:69.75,y:135.3,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4078,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5484,x:-4,y:-59.75}},{t:this.instance_8,p:{rotation:20.9074,x:-41.7,y:185.6,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9239,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:2.8124,x:-5.9,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-87.9284,x:-84.6,y:55.45,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-94.1543,x:-95.8,y:140.7,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-113.547,x:-95.1,y:140.85}},{t:this.instance,p:{regY:9.9,scaleX:0.9973,scaleY:0.9973,rotation:-71.684,y:-12.45,regX:33.3,x:-59.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7742,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.3687,x:48.55,y:-20.75,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:83.2202,x:54.75,regY:12.2,regX:-45.6,y:49.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:132.785,x:73.25,y:133.75,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:96.3807,x:69.95,y:135.4,regX:-10,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4069,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5413,x:-4,y:-59.75}},{t:this.instance_8,p:{rotation:20.9074,x:-41.7,y:185.6,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9239,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:3.0527,x:-5.9,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-88.0907,x:-84.85,y:55.35,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-94.3169,x:-95.7,y:140.8,scaleX:0.9971,scaleY:0.9971,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-113.7076,x:-95.1,y:140.8}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-71.5102,y:-12.45,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7742,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.3581,x:48.55,y:-20.75,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:83.0683,x:54.75,regY:12.2,regX:-45.6,y:49.15}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:132.2985,x:73.4,y:133.7,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:95.321,x:70.3,y:135.15,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4069,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5325,x:-4,y:-59.75}},{t:this.instance_8,p:{rotation:20.9074,x:-41.7,y:185.6,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9239,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:3.2931,x:-5.95,y:-81.15}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-88.2513,x:-85,y:55.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-94.477,x:-95.65,y:140.75,scaleX:0.9971,scaleY:0.9971,regY:-9,regX:4.4}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-113.8702,x:-95,y:140.75}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-71.3361,y:-12.45,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7742,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.3467,x:48.5,y:-20.7,scaleX:0.9975,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:82.9164,x:54.9,regY:12.1,regX:-45.6,y:49.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:131.8128,x:73.65,y:133.75,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:94.2632,x:70.5,y:135.15,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4069,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5236,x:-3.95,y:-59.75}},{t:this.instance_8,p:{rotation:20.9074,x:-41.7,y:185.6,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.923,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:3.5318,x:-5.9,y:-81.15}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-88.4136,x:-85.25,y:55.2,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-94.6404,x:-95.6,y:140.65,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-114.0308,x:-95,y:140.65}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-71.1614,y:-12.6,regX:33.4,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7742,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.3362,x:48.5,y:-20.7,scaleX:0.9975,scaleY:0.9975,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:82.7645,x:54.9,regY:12.1,regX:-45.5,y:49.25}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:131.3252,x:73.9,y:133.65,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:93.206,x:70.7,y:135.2,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4069,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5157,x:-3.95,y:-59.75}},{t:this.instance_8,p:{rotation:20.9074,x:-41.7,y:185.6,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.923,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:3.7715,x:-5.9,y:-81.15}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-88.575,x:-85.45,y:55.1,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-94.8016,x:-95.55,y:140.65,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.4}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-114.1933,x:-94.9,y:140.65}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-70.9873,y:-12.45,regX:33.3,x:-59.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7742,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.3238,x:48.5,y:-20.75,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:82.6142,x:54.85,regY:12.2,regX:-45.6,y:49.15}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:130.8416,x:74.15,y:133.65,regX:-7.3,regY:13.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:92.1464,x:71,y:135.15,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4069,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.507,x:-3.95,y:-59.75}},{t:this.instance_8,p:{rotation:20.9074,x:-41.7,y:185.6,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.923,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.3,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:4.0103,x:-5.8,y:-81.25}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-88.7364,x:-85.65,y:55.05,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-94.9625,x:-95.55,y:140.55,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-114.3539,x:-94.95,y:140.6}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-70.8126,y:-12.35,regX:33.2,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7725,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.3432,x:48.5,y:-20.7,scaleX:0.9975,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:82.7573,x:54.8,regY:12.2,regX:-45.5,y:49.3}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:131.2929,x:73.85,y:133.65,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:93.1314,x:70.75,y:135.2,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4104,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5175,x:-3.95,y:-59.75}},{t:this.instance_8,p:{rotation:20.9146,x:-41.7,y:185.6,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9256,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9685,x:24.4,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:3.7812,x:-5.85,y:-81.15}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-88.5908,x:-85.5,y:55.15,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-94.82,x:-95.55,y:140.55,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-114.2133,x:-94.95,y:140.6}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-70.9818,y:-12.5,regX:33.3,x:-59.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7707,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.3608,x:48.55,y:-20.75,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:82.9005,x:54.9,regY:12.1,regX:-45.5,y:49.25}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:131.7458,x:73.65,y:133.65,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:94.1164,x:70.4,y:135.15,regX:-10.1,regY:11.1}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4157,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5282,x:-4,y:-59.75}},{t:this.instance_8,p:{rotation:20.9232,x:-41.7,y:185.6,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9275,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9729,x:24.4,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:3.5529,x:-5.9,y:-81.15}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-88.446,x:-85.25,y:55.2,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-94.6775,x:-95.55,y:140.7,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.4}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-114.0724,x:-94.95,y:140.7}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-71.1542,y:-12.6,regX:33.4,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.769,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.3784,x:48.5,y:-20.7,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:83.0454,x:54.7,regY:12.2,regX:-45.6,y:49.1}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:132.1979,x:73.4,y:133.7,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:95.1026,x:70.25,y:135.2,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4201,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5395,x:-4,y:-59.75}},{t:this.instance_8,p:{rotation:20.9316,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9301,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9792,x:24.4,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:3.3238,x:-5.85,y:-81.15}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-88.3004,x:-85.05,y:55.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-94.5323,x:-95.6,y:140.65,scaleX:0.9971,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-113.9327,x:-95,y:140.75}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-71.3239,y:-12.45,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7672,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.396,x:48.5,y:-20.75,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:83.1903,x:54.65,regY:12.2,regX:-45.6,y:49.15}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:132.6504,x:73.25,y:133.8,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:96.0869,x:70.05,y:135.35,regX:-10,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.4254,x:34.4,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5484,x:-4,y:-59.75}},{t:this.instance_8,p:{rotation:20.9399,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9327,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9845,x:24.4,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:3.0939,x:-5.9,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-88.1557,x:-84.85,y:55.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-94.3899,x:-95.6,y:140.85,scaleX:0.9971,scaleY:0.9971,regY:-9,regX:4.4}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-113.7909,x:-95,y:140.8}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-71.4946,y:-12.5,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7655,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.4135,x:48.5,y:-20.75,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:83.3341,x:54.65,regY:12.2,regX:-45.6,y:49.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:133.1021,x:72.95,y:133.85,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:97.0712,x:69.8,y:135.25,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.4307,x:34.35,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5589,x:-4,y:-59.75}},{t:this.instance_8,p:{rotation:20.9485,x:-41.7,y:185.55,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9345,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9899,x:24.4,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:2.865,x:-5.85,y:-81.15}},{t:this.instance_3,p:{regX:43.9,regY:7.9,rotation:-88.0101,x:-84.65,y:55.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-94.2474,x:-95.65,y:140.75,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-113.6511,x:-95,y:140.85}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-71.6646,y:-12.4,regX:33.2,x:-59.5}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7646,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.4311,x:48.5,y:-20.7,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:83.4789,x:54.65,regY:12.2,regX:-45.6,y:49.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:133.5562,x:72.75,y:133.9,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:98.0567,x:69.55,y:135.3,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.4351,x:34.35,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5696,x:-4,y:-59.75}},{t:this.instance_8,p:{rotation:20.9561,x:-41.7,y:185.55,scaleX:0.9949,scaleY:0.9949,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9371,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9961,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:2.6361,x:-5.9,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-87.8653,x:-84.45,y:55.5,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-94.1024,x:-95.6,y:140.75,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-113.5105,x:-95.05,y:140.9}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-71.8353,y:-12.45,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7629,x:-10.1,y:48.95}},{t:this.instance_14,p:{rotation:85.4479,x:48.35,y:-20.7,scaleX:0.9974,scaleY:0.9974,regY:13.2,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:83.6236,x:54.65,regY:12.2,regX:-45.6,y:49.15}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:134.0078,x:72.5,y:133.9,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:99.0428,x:69.1,y:135.4,regX:-10,regY:11.1}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.4403,x:34.4,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5801,x:-4.05,y:-59.75}},{t:this.instance_8,p:{rotation:20.965,x:-41.7,y:185.55,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9398,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0023,x:24.4,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:2.4063,x:-5.95,y:-81.2}},{t:this.instance_3,p:{regX:43.9,regY:7.9,rotation:-87.7197,x:-84.25,y:55.45,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-93.9609,x:-95.65,y:140.8,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-113.3698,x:-95.05,y:140.95}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-72.0061,y:-12.55,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7611,x:-10.1,y:49.1}},{t:this.instance_14,p:{rotation:85.4654,x:48.45,y:-20.65,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:83.7683,x:54.6,regY:12.2,regX:-45.6,y:49.15}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:134.4605,x:72.25,y:133.95,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:100.0265,x:69.1,y:135.3,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.4447,x:34.4,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5916,x:-4.05,y:-59.75}},{t:this.instance_8,p:{rotation:20.973,x:-41.7,y:185.55,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9424,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0085,x:24.4,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:2.1766,x:-5.9,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-87.5748,x:-84.05,y:55.6,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-93.8168,x:-95.7,y:140.85,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-113.2296,x:-95.05,y:140.95}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-72.1763,y:-12.45,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7593,x:-10.1,y:49}},{t:this.instance_14,p:{rotation:85.4839,x:48.45,y:-20.7,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:83.913,x:54.65,regY:12.2,regX:-45.5,y:49.35}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:134.9126,x:72.05,y:134,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:101.0127,x:68.85,y:135.35,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.4491,x:34.45,y:185,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.6021,x:-4.05,y:-59.75}},{t:this.instance_8,p:{rotation:20.9814,x:-41.75,y:185.55,scaleX:0.9949,scaleY:0.9949,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9451,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0139,x:24.4,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:1.9469,x:-5.95,y:-81.2}},{t:this.instance_3,p:{regX:43.9,regY:7.9,rotation:-87.43,x:-83.85,y:55.6,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-93.6744,x:-95.7,y:140.95,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-113.0881,x:-95.1,y:141}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-72.3468,y:-12.35,regX:33.2,x:-59.5}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7576,x:-10.1,y:49}},{t:this.instance_14,p:{rotation:85.5023,x:48.45,y:-20.75,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:84.0565,x:54.6,regY:12.2,regX:-45.6,y:49.15}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:135.3652,x:71.85,y:134,regX:-7.4,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:101.998,x:68.6,y:135.35,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.4544,x:34.4,y:185,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6136,x:-4.05,y:-59.75}},{t:this.instance_8,p:{rotation:20.9895,x:-41.75,y:185.55,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9468,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0201,x:24.4,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:1.719,x:-5.9,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-87.2852,x:-83.65,y:55.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-93.5312,x:-95.6,y:140.95,scaleX:0.9972,scaleY:0.9972,regY:-8.9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-112.9482,x:-95.1,y:141}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-72.5182,y:-12.55,regX:33.4,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7558,x:-10.1,y:49}},{t:this.instance_14,p:{rotation:85.52,x:48.35,y:-20.65,scaleX:0.9974,scaleY:0.9974,regY:13.2,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:84.2019,x:54.55,regY:12.2,regX:-45.6,y:49.15}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:135.8186,x:71.5,y:134.2,regX:-7.2,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:102.9825,x:68.3,y:135.5,regX:-10,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4588,x:34.55,y:185,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6233,x:-4.1,y:-59.75}},{t:this.instance_8,p:{rotation:20.9978,x:-41.75,y:185.55,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9494,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0264,x:24.4,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.5,scaleX:0.998,scaleY:0.998,rotation:1.4886,x:-5.8,y:-81.15}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-87.1385,x:-83.45,y:55.9,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-93.3872,x:-95.7,y:141,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-112.8071,x:-95.15,y:141.05}},{t:this.instance,p:{regY:9.9,scaleX:0.9973,scaleY:0.9973,rotation:-72.6879,y:-12.5,regX:33.4,x:-59.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.755,x:-10.1,y:49}},{t:this.instance_14,p:{rotation:85.5376,x:48.35,y:-20.75,scaleX:0.9974,scaleY:0.9974,regY:13.2,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:84.3455,x:54.55,regY:12.2,regX:-45.6,y:49.15}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:136.2701,x:71.3,y:134.15,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:103.9665,x:68.1,y:135.55,regX:-10,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4632,x:34.55,y:185,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6339,x:-4.1,y:-59.75}},{t:this.instance_8,p:{rotation:21.0062,x:-41.7,y:185.55,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9521,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0318,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.5,scaleX:0.998,scaleY:0.998,rotation:1.2598,x:-5.85,y:-81.15}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-86.9936,x:-83.2,y:55.9,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-93.2449,x:-95.75,y:141,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-112.6668,x:-95.15,y:141.1}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-72.8584,y:-12.5,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7532,x:-10.1,y:49}},{t:this.instance_14,p:{rotation:85.5551,x:48.5,y:-20.7,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:84.4901,x:54.55,regY:12.2,regX:-45.6,y:49.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:136.7242,x:71.1,y:134.2,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:104.9517,x:67.85,y:135.4,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4685,x:34.55,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6437,x:-4.05,y:-59.75}},{t:this.instance_8,p:{rotation:21.0148,x:-41.75,y:185.55,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9548,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0371,x:24.4,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:1.0294,x:-5.9,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-86.8478,x:-83,y:56.05,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-93.1009,x:-95.75,y:141.1,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-112.526,x:-95.05,y:141.15}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-73.0273,y:-12.5,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7515,x:-10.1,y:49}},{t:this.instance_14,p:{rotation:85.5736,x:48.5,y:-20.7,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:84.6336,x:54.55,regY:12.2,regX:-45.5,y:49.3}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:137.1752,x:70.9,y:134.3,regX:-7.3,regY:13.1}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:105.9372,x:67.55,y:135.45,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4728,x:34.65,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6533,x:-4.1,y:-59.75}},{t:this.instance_8,p:{rotation:21.0228,x:-41.75,y:185.55,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9574,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0425,x:24.4,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:0.8016,x:-5.95,y:-81.25}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-86.7029,x:-82.85,y:56.1,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-92.9586,x:-95.8,y:141.1,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-112.3856,x:-95.15,y:141.15}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-73.1995,y:-12.5,regX:33.3,x:-59.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7497,x:-10.1,y:49}},{t:this.instance_14,p:{rotation:85.5903,x:48.5,y:-20.7,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:84.7779,x:54.5,regY:12.2,regX:-45.6,y:49.15}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:137.6277,x:70.65,y:134.3,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:106.922,x:67.3,y:135.45,regX:-10.1,regY:11.1}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4781,x:34.6,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6638,x:-4.15,y:-59.75}},{t:this.instance_8,p:{rotation:21.0318,x:-41.75,y:185.55,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9591,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0487,x:24.4,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:0.5712,x:-5.9,y:-81.2}},{t:this.instance_3,p:{regX:43.9,regY:7.9,rotation:-86.5581,x:-82.6,y:56,scaleX:0.997,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-92.8156,x:-95.7,y:141.15,scaleX:0.9972,scaleY:0.9972,regY:-8.9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-112.2468,x:-95.15,y:141.2}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-73.3681,y:-12.5,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.748,x:-10.1,y:49}},{t:this.instance_14,p:{rotation:85.6079,x:48.4,y:-20.65,scaleX:0.9974,scaleY:0.9974,regY:13.2,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:84.9215,x:54.65,regY:12.1,regX:-45.6,y:49.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:138.0809,x:70.35,y:134.35,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:107.9072,x:67.15,y:135.5,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.4825,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6745,x:-4.15,y:-59.75}},{t:this.instance_8,p:{rotation:21.0393,x:-41.75,y:185.6,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9617,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0559,x:24.4,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:0.3425,x:-5.95,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-86.4131,x:-82.4,y:56.2,scaleX:0.997,scaleY:0.997}},{t:this.instance_2,p:{rotation:-92.6716,x:-95.8,y:141.15,scaleX:0.9971,scaleY:0.9971,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-112.106,x:-95.15,y:141.25}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-73.5398,y:-12.45,regX:33.3,x:-59.5}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7462,x:-10.1,y:49}},{t:this.instance_14,p:{rotation:85.6254,x:48.4,y:-20.7,scaleX:0.9974,scaleY:0.9974,regY:13.2,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:85.0667,x:54.6,regY:12.1,regX:-45.6,y:49.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:138.5325,x:70.1,y:134.45,regX:-7.2,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:108.8934,x:66.85,y:135.45,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.4869,x:34.5,y:184.95,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6858,x:-4.1,y:-59.75}},{t:this.instance_8,p:{rotation:21.0476,x:-41.75,y:185.6,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9643,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0612,x:24.4,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:0.113,x:-6,y:-81.2}},{t:this.instance_3,p:{regX:43.9,regY:7.9,rotation:-86.2672,x:-82.2,y:56.1,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-92.5285,x:-95.85,y:141.25,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-111.9651,x:-95.15,y:141.45}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-73.7098,y:-12.5,regX:33.4,x:-59.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7453,x:-10.1,y:49}},{t:this.instance_14,p:{rotation:85.6439,x:48.55,y:-20.7,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:85.2111,x:54.45,regY:12.2,regX:-45.6,y:49.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:138.9862,x:69.95,y:134.35,regX:-7.4,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:109.8777,x:66.65,y:135.5,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.4922,x:34.5,y:184.95,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6966,x:-4.1,y:-59.75}},{t:this.instance_8,p:{rotation:21.0563,x:-41.85,y:185.65,scaleX:0.9948,scaleY:0.9948,regY:-51.3,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.967,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0675,x:24.4,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-0.1113,x:-5.95,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-86.1222,x:-82,y:56.4,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-92.3846,x:-95.85,y:141.25,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-111.8234,x:-95.2,y:141.4}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-73.8802,y:-12.4,regX:33.2,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7436,x:-10.1,y:49}},{t:this.instance_14,p:{rotation:85.6624,x:48.55,y:-20.7,scaleX:0.9975,scaleY:0.9975,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:85.3553,x:54.45,regY:12.2,regX:-45.5,y:49.4}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:139.4382,x:69.8,y:134.4,regX:-7.4,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:110.863,x:66.45,y:135.55,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.4966,x:34.55,y:184.95,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7071,x:-4.15,y:-59.75}},{t:this.instance_8,p:{rotation:21.0646,x:-41.8,y:185.7,scaleX:0.9948,scaleY:0.9948,regY:-51.3,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9688,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0728,x:24.4,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-0.3408,x:-6,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-85.9772,x:-81.8,y:56.45,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-92.2425,x:-95.8,y:141.3,scaleX:0.9972,scaleY:0.9972,regY:-8.9,regX:4.5}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-111.6825,x:-95.2,y:141.55}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-74.0509,y:-12.55,regX:33.4,x:-59.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7419,x:-10.1,y:49}},{t:this.instance_14,p:{rotation:85.6799,x:48.5,y:-20.7,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:85.4995,x:54.4,regY:12.2,regX:-45.6,y:49.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:139.8899,x:69.4,y:134.5,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:111.8477,x:66.1,y:135.45,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.5001,x:34.5,y:184.95,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7177,x:-4.15,y:-59.75}},{t:this.instance_8,p:{rotation:21.0729,x:-41.8,y:185.7,scaleX:0.9948,scaleY:0.9948,regY:-51.3,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9714,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0782,x:24.4,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-0.5694,x:-5.95,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-85.8313,x:-81.6,y:56.45,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-92.0994,x:-95.75,y:141.3,scaleX:0.9972,scaleY:0.9972,regY:-8.9,regX:4.5}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-111.5428,x:-95.2,y:141.6}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-74.2207,y:-12.5,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7401,x:-10.1,y:49}},{t:this.instance_14,p:{rotation:85.6967,x:48.4,y:-20.65,scaleX:0.9975,scaleY:0.9975,regY:13.2,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:85.6437,x:54.4,regY:12.2,regX:-45.6,y:49.15}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:140.3425,x:69.2,y:134.45,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:112.832,x:65.95,y:135.55,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.5054,x:34.55,y:184.95,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7283,x:-4.15,y:-59.7}},{t:this.instance_8,p:{rotation:21.0816,x:-41.85,y:185.7,scaleX:0.9948,scaleY:0.9948,regY:-51.3,regX:1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.974,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0835,x:24.4,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-0.7998,x:-6.05,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-85.6862,x:-81.4,y:56.55,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-91.9555,x:-95.9,y:141.35,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-111.4022,x:-95.2,y:141.6}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-74.3917,y:-12.45,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7384,x:-10.1,y:49}},{t:this.instance_14,p:{rotation:85.7142,x:48.4,y:-20.65,scaleX:0.9975,scaleY:0.9975,regY:13.2,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:85.7888,x:54.35,regY:12.2,regX:-45.6,y:49.25}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:140.7954,x:69,y:134.6,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:113.8175,x:65.65,y:135.55,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.5098,x:34.6,y:184.95,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7388,x:-4.15,y:-59.7}},{t:this.instance_8,p:{rotation:21.0899,x:-41.85,y:185.7,scaleX:0.9948,scaleY:0.9948,regY:-51.3,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9767,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0896,x:24.4,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-1.0294,x:-6,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-85.5411,x:-81.15,y:56.55,scaleX:0.997,scaleY:0.997}},{t:this.instance_2,p:{rotation:-91.8134,x:-95.9,y:141.4,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-111.2615,x:-95.25,y:141.5}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-74.5629,y:-12.45,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7366,x:-10.1,y:49}},{t:this.instance_14,p:{rotation:85.7327,x:48.55,y:-20.75,scaleX:0.9975,scaleY:0.9975,regY:13.1,regX:-32}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:85.9321,x:54.3,regY:12.2,regX:-45.6,y:49.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:141.2482,x:68.85,y:134.7,regX:-7.3,regY:13.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:114.8035,x:65.4,y:135.55,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.5142,x:34.65,y:184.95,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7486,x:-4.2,y:-59.7}},{t:this.instance_8,p:{rotation:21.0985,x:-41.85,y:185.7,scaleX:0.9948,scaleY:0.9948,regY:-51.3,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9794,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0967,x:24.4,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-1.2581,x:-6,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-85.3969,x:-80.95,y:56.7,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-91.6687,x:-95.95,y:141.4,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-111.1201,x:-95.3,y:141.6}},{t:this.instance,p:{regY:9.9,scaleX:0.9973,scaleY:0.9973,rotation:-74.7328,y:-12.5,regX:33.3,x:-59.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7366,x:-10.1,y:49}},{t:this.instance_14,p:{rotation:85.7494,x:48.55,y:-20.75,scaleX:0.9975,scaleY:0.9975,regY:13.1,regX:-32}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:86.0771,x:54.3,regY:12.2,regX:-45.5,y:49.4}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:141.7012,x:68.5,y:134.6,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:115.7881,x:65.15,y:135.65,regX:-10,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.5194,x:34.7,y:184.95,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7591,x:-4.2,y:-59.7}},{t:this.instance_8,p:{rotation:21.1069,x:-41.8,y:185.65,scaleX:0.9948,scaleY:0.9948,regY:-51.3,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9812,x:-30.2,y:91}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.102,x:24.45,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-1.4868,x:-6.05,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-85.2507,x:-80.75,y:56.75,scaleX:0.997,scaleY:0.997}},{t:this.instance_2,p:{rotation:-91.5266,x:-95.8,y:141.5,scaleX:0.9972,scaleY:0.9972,regY:-8.9,regX:4.5}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-110.9794,x:-95.25,y:141.7}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-74.9036,y:-12.45,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7349,x:-10.05,y:49}},{t:this.instance_14,p:{rotation:85.767,x:48.55,y:-20.8,scaleX:0.9975,scaleY:0.9975,regY:13.1,regX:-32}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:86.2203,x:54.3,regY:12.2,regX:-45.6,y:49.25}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:142.1528,x:68.25,y:134.7,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:116.7725,x:64.85,y:135.5,regX:-10.1,regY:11.1}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.5238,x:34.7,y:184.95,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7698,x:-4.15,y:-59.7}},{t:this.instance_8,p:{rotation:21.1144,x:-41.8,y:185.65,scaleX:0.9948,scaleY:0.9948,regY:-51.3,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9838,x:-30.1,y:91}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.1082,x:24.45,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.5,scaleX:0.998,scaleY:0.998,rotation:-1.7173,x:-5.85,y:-81.25}},{t:this.instance_3,p:{regX:43.8,regY:8,rotation:-85.1064,x:-80.45,y:56.85,scaleX:0.997,scaleY:0.997}},{t:this.instance_2,p:{rotation:-91.3837,x:-95.8,y:141.5,scaleX:0.9972,scaleY:0.9972,regY:-8.9,regX:4.5}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-110.8392,x:-95.3,y:141.7}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-75.0733,y:-12.55,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7331,x:-10.05,y:49}},{t:this.instance_14,p:{rotation:85.7837,x:48.55,y:-20.75,scaleX:0.9975,scaleY:0.9975,regY:13.1,regX:-32}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:86.3653,x:54.25,regY:12.2,regX:-45.6,y:49.25}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:142.6055,x:68.05,y:134.8,regX:-7.3,regY:13.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:117.7578,x:64.7,y:135.7,regX:-10,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.5291,x:34.7,y:184.95,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7804,x:-4.15,y:-59.7}},{t:this.instance_8,p:{rotation:21.1233,x:-41.85,y:185.65,scaleX:0.9948,scaleY:0.9948,regY:-51.3,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9863,x:-30.1,y:91}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.1136,x:24.45,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-1.9452,x:-6.05,y:-81.25}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-84.9603,x:-80.35,y:56.85,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-91.2407,x:-95.95,y:141.5,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-110.6984,x:-95.35,y:141.6}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-75.2447,y:-12.4,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7313,x:-10.05,y:49}},{t:this.instance_14,p:{rotation:85.803,x:48.45,y:-20.8,scaleX:0.9975,scaleY:0.9975,regY:13.2,regX:-32}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:86.5094,x:54.3,regY:12.2,regX:-45.6,y:49.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:143.0582,x:67.7,y:134.85,regX:-7.2,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:118.7422,x:64.45,y:135.6,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.5335,x:34.8,y:184.95,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7908,x:-4.15,y:-59.7}},{t:this.instance_8,p:{rotation:21.1313,x:-41.9,y:185.6,scaleX:0.9948,scaleY:0.9948,regY:-51.3,regX:1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9889,x:-30.1,y:91}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.1198,x:24.45,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-2.1758,x:-6,y:-81.25}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-84.8159,x:-80.15,y:56.95,scaleX:0.997,scaleY:0.997}},{t:this.instance_2,p:{rotation:-91.0969,x:-95.95,y:141.5,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-110.5583,x:-95.3,y:141.7}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-75.4141,y:-12.55,regX:33.4,x:-59.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7296,x:-10.05,y:49}},{t:this.instance_14,p:{rotation:85.8206,x:48.55,y:-20.7,scaleX:0.9975,scaleY:0.9975,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:86.6543,x:54.25,regY:12.2,regX:-45.6,y:49.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:143.5105,x:67.5,y:134.75,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:119.7277,x:64.25,y:135.6,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.5379,x:34.6,y:184.95,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.8007,x:-4.2,y:-59.7}},{t:this.instance_8,p:{rotation:21.14,x:-41.9,y:185.6,scaleX:0.9948,scaleY:0.9948,regY:-51.3,regX:1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9917,x:-30.1,y:91}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.126,x:24.45,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-2.4037,x:-6.05,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-84.6689,x:-79.9,y:56.95,scaleX:0.997,scaleY:0.997}},{t:this.instance_2,p:{rotation:-90.9531,x:-95.9,y:141.55,scaleX:0.9971,scaleY:0.9972,regY:-8.9,regX:4.5}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-110.4176,x:-95.25,y:141.8}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-75.5853,y:-12.35,regX:33.2,x:-59.5}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7278,x:-10.05,y:49}},{t:this.instance_14,p:{rotation:85.8382,x:48.55,y:-20.6,scaleX:0.9975,scaleY:0.9975,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:86.7983,x:54.2,regY:12.2,regX:-45.6,y:49.3}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:143.9624,x:67.35,y:134.75,regX:-7.4,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:120.7124,x:63.85,y:135.65,regX:-10,regY:11.1}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.5432,x:34.6,y:184.95,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.8111,x:-4.15,y:-59.7}},{t:this.instance_8,p:{rotation:21.1491,x:-41.8,y:185.55,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9935,x:-30.2,y:91}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.1303,x:24.4,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-2.6334,x:-6.05,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-84.5244,x:-79.7,y:57.1,scaleX:0.997,scaleY:0.997}},{t:this.instance_2,p:{rotation:-90.811,x:-95.85,y:141.6,scaleX:0.9972,scaleY:0.9972,regY:-8.9,regX:4.5}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-110.2771,x:-95.3,y:141.8}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-75.7554,y:-12.45,regX:33.3,x:-59.5}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7261,x:-10.05,y:49}},{t:this.instance_14,p:{rotation:85.8557,x:48.6,y:-20.65,scaleX:0.9975,scaleY:0.9975,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:86.9432,x:54.3,regY:12.2,regX:-45.6,y:49.25}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:144.4151,x:67,y:134.9,regX:-7.2,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:121.6989,x:63.65,y:135.7,regX:-10,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.5476,x:34.6,y:184.95,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.8219,x:-4.15,y:-59.7}},{t:this.instance_8,p:{rotation:21.1566,x:-41.8,y:185.55,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9961,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.1367,x:24.45,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-2.8632,x:-6,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:8,rotation:-84.379,x:-79.4,y:57.1,scaleX:0.997,scaleY:0.997}},{t:this.instance_2,p:{rotation:-90.6664,x:-95.85,y:141.6,scaleX:0.9972,scaleY:0.9972,regY:-8.9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-110.1362,x:-95.35,y:141.75}},{t:this.instance,p:{regY:9.9,scaleX:0.9973,scaleY:0.9973,rotation:-75.9265,y:-12.45,regX:33.3,x:-59.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7252,x:-10.05,y:49}},{t:this.instance_14,p:{rotation:85.8742,x:48.6,y:-20.6,scaleX:0.9975,scaleY:0.9975,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:87.0872,x:54.2,regY:12.2,regX:-45.6,y:49.3}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:144.8669,x:66.85,y:134.9,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:122.6833,x:63.5,y:135.7,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.552,x:34.65,y:184.95,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.8324,x:-4.2,y:-59.7}},{t:this.instance_8,p:{rotation:21.1653,x:-41.85,y:185.55,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9988,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.1412,x:24.45,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-3.0922,x:-6.1,y:-81.3}},{t:this.instance_3,p:{regX:43.8,regY:8,rotation:-84.2345,x:-79.2,y:57.2,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-90.5243,x:-96,y:141.6,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-109.9961,x:-95.35,y:141.85}},{t:this.instance,p:{regY:9.9,scaleX:0.9973,scaleY:0.9973,rotation:-76.0962,y:-12.55,regX:33.4,x:-59.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7234,x:-10.05,y:49}},{t:this.instance_14,p:{rotation:85.8918,x:48.5,y:-20.65,scaleX:0.9975,scaleY:0.9975,regY:13.2,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:87.2311,x:54.15,regY:12.2,regX:-45.5,y:49.4}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:145.3209,x:66.65,y:134.9,regX:-7.4,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:123.6689,x:63.2,y:135.55,regX:-10.1,regY:11.1}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.5572,x:34.65,y:184.95,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.842,x:-4.2,y:-59.7}},{t:this.instance_8,p:{rotation:21.1736,x:-41.85,y:185.6,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0013,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.1483,x:24.45,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-3.3221,x:-6.05,y:-81.25}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-84.0892,x:-79.1,y:57.25,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-90.3814,x:-96,y:141.6,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-109.8551,x:-95.4,y:141.8}},{t:this.instance,p:{regY:9.9,scaleX:0.9973,scaleY:0.9973,rotation:-76.2665,y:-12.45,regX:33.3,x:-59.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7217,x:-10.05,y:49}},{t:this.instance_14,p:{rotation:85.9093,x:48.65,y:-20.65,scaleX:0.9975,scaleY:0.9975,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:87.3759,x:54.2,regY:12.2,regX:-45.6,y:49.25}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:145.7739,x:66.35,y:134.95,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:124.6533,x:63.05,y:135.6,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.5616,x:34.65,y:184.95,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.8519,x:-4.15,y:-59.7}},{t:this.instance_8,p:{rotation:21.1826,x:-41.85,y:185.5,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0041,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.1536,x:24.5,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-3.5511,x:-6.1,y:-81.25}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-83.9437,x:-78.95,y:57.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-90.2385,x:-95.95,y:141.7,scaleX:0.9972,scaleY:0.9972,regY:-8.9,regX:4.5}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-109.7153,x:-95.35,y:141.85}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-76.4373,y:-12.45,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7199,x:-10.05,y:49}},{t:this.instance_14,p:{rotation:85.9261,x:48.65,y:-20.6,scaleX:0.9975,scaleY:0.9975,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:87.5199,x:54.15,regY:12.2,regX:-45.6,y:49.3}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:146.2255,x:66.15,y:135,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:125.6382,x:62.75,y:135.65,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.566,x:34.7,y:184.95,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.8623,x:-4.15,y:-59.7}},{t:this.instance_8,p:{rotation:21.1889,x:-41.85,y:185.5,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0058,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.16,x:24.5,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-3.7811,x:-6.05,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-83.7983,x:-78.75,y:57.4,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-90.0947,x:-95.9,y:141.65,scaleX:0.9971,scaleY:0.9971,regY:-8.9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-109.5738,x:-95.45,y:141.8}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-76.6067,y:-12.3,regX:33.2,x:-59.55}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7182,x:-10.05,y:49}},{t:this.instance_14,p:{rotation:85.9445,x:48.55,y:-20.8,scaleX:0.9975,scaleY:0.9975,regY:13.1,regX:-32}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:87.6638,x:54.1,regY:12.2,regX:-45.6,y:49.25}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:146.6784,x:65.9,y:135.05,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:126.6244,x:62.55,y:135.65,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.5713,x:34.85,y:184.95,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.8729,x:-4.25,y:-59.7}},{t:this.instance_8,p:{rotation:21.1981,x:-41.9,y:185.55,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0085,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.1662,x:24.45,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-4.0086,x:-6.15,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:8,rotation:-83.6519,x:-78.4,y:57.4,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-89.9562,x:-96.05,y:141.65,scaleX:0.9971,scaleY:0.9971,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-109.4351,x:-95.4,y:141.8}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-76.777,y:-12.45,regX:33.3,x:-59.5}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-106.6,-204.2,191.2,500.7);


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
	this.instance_1.setTransform(-13.95,65.7,0.9991,0.9991,7.1213,0,0,3.9,-38.8);

	this.instance_2 = new lib.camel_leg_b_l_ucopy("synched",0);
	this.instance_2.setTransform(53.6,-21.25,0.9985,0.9985,-11.9453,0,0,1.9,-28.2);

	this.instance_3 = new lib.camel_leg_f_l_ucopy("synched",0);
	this.instance_3.setTransform(0.6,3.75,0.9992,0.9992,6.6762,0,0,-0.8,-25.1);

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_11,p:{scaleX:0.9976,scaleY:0.9976,rotation:-38.5177,x:32.4,y:-29.5,regX:0.4}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-14.7197,x:68.4,y:28.05,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9993,scaleY:0.9993,rotation:-1.9365,x:55.85,y:-37.25,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-24.7536,x:-35.3,y:-9.45}},{t:this.instance_7,p:{regX:3.6,regY:-38.1,scaleX:0.9993,scaleY:0.9993,rotation:-24.9747,x:-12.15,y:54.2}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.999,scaleY:0.999,rotation:19.9889,x:-57.75,y:-33.7}},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-11.7605,x:-63.7,regX:12.6,y:-67.4,regY:11.5}},{t:this.instance_3,p:{rotation:6.6762,x:0.6,y:3.75,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:1.9,regY:-28.2,scaleX:0.9985,scaleY:0.9985,rotation:-11.9453,x:53.6,y:-21.25}},{t:this.instance_1,p:{scaleX:0.9991,scaleY:0.9991,rotation:7.1213,x:-13.95,y:65.7,regX:3.9}},{t:this.instance,p:{scaleX:0.9978,scaleY:0.9978,rotation:4.4785,x:58.25,y:46}}]}).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.5179,x:32.35,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.7187,x:68.35,y:28,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-2.6065,x:55.8,y:-37.2,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.7531,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.9742,x:-12.3,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9884,x:-57.7,y:-33.65}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-12.4667,x:-63.65,regX:12.6,y:-67.4,regY:11.5}},{t:this.instance_3,p:{rotation:6.6748,x:0.65,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9452,x:53.7,y:-21.25}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.12,x:-13.85,y:65.65,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.4779,x:58.15,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.5179,x:32.35,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.7187,x:68.35,y:28,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.2784,x:55.8,y:-37.15,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.7531,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.9742,x:-12.3,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9895,x:-57.7,y:-33.65}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-13.1733,x:-63.8,regX:12.5,y:-67.35,regY:11.5}},{t:this.instance_3,p:{rotation:6.6748,x:0.65,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9452,x:53.7,y:-21.25}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.12,x:-13.85,y:65.65,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.4779,x:58.15,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.5179,x:32.35,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.7187,x:68.35,y:28,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.95,x:55.85,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.7531,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.9738,x:-12.3,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9901,x:-57.7,y:-33.65}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-13.8806,x:-63.85,regX:12.5,y:-67.35,regY:11.5}},{t:this.instance_3,p:{rotation:6.6748,x:0.65,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9452,x:53.7,y:-21.25}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.12,x:-13.85,y:65.65,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.4779,x:58.15,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.5179,x:32.35,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.7181,x:68.35,y:28,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9993,scaleY:0.9993,rotation:-4.6229,x:55.85,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.7531,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.9738,x:-12.3,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9912,x:-57.7,y:-33.65}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-14.5877,x:-63.7,regX:12.6,y:-67.35,regY:11.5}},{t:this.instance_3,p:{rotation:6.674,x:0.65,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9452,x:53.7,y:-21.25}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.12,x:-13.85,y:65.65,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.4779,x:58.15,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.5179,x:32.35,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.7181,x:68.35,y:28,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-5.2948,x:55.9,y:-37.15,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.7531,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.9738,x:-12.35,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9923,x:-57.7,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-15.2951,x:-63.65,regX:12.6,y:-67.2,regY:11.6}},{t:this.instance_3,p:{rotation:6.674,x:0.7,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9452,x:53.7,y:-21.3}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.12,x:-13.85,y:65.65,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.4779,x:58.15,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.5179,x:32.35,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.7181,x:68.35,y:28,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9992,scaleY:0.9992,rotation:-5.9666,x:55.75,y:-37.25,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.7531,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.9738,x:-12.35,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9923,x:-57.7,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-16.0025,x:-63.7,regX:12.6,y:-67.3,regY:11.5}},{t:this.instance_3,p:{rotation:6.674,x:0.7,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9452,x:53.7,y:-21.3}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.12,x:-13.85,y:65.65,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.477,x:58.15,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.5179,x:32.35,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.7181,x:68.35,y:28,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9992,scaleY:0.9992,rotation:-6.6383,x:55.8,y:-37.25,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.7531,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.9738,x:-12.35,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9931,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-16.7101,x:-63.65,regX:12.6,y:-67.4,regY:11.5}},{t:this.instance_3,p:{rotation:6.674,x:0.7,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9452,x:53.7,y:-21.3}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.1192,x:-13.85,y:65.65,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.477,x:58.15,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.5179,x:32.35,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.7181,x:68.35,y:27.95,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9992,scaleY:0.9992,rotation:-7.3099,x:55.7,y:-37.25,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.7531,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.9738,x:-12.35,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9939,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-17.4178,x:-63.65,regX:12.6,y:-67.4,regY:11.5}},{t:this.instance_3,p:{rotation:6.674,x:0.7,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9452,x:53.7,y:-21.3}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.1192,x:-13.85,y:65.65,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.477,x:58.1,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.5179,x:32.35,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.7181,x:68.35,y:27.95,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-7.9826,x:55.75,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.7531,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.9738,x:-12.35,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9948,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-18.1255,x:-63.8,regX:12.5,y:-67.35,regY:11.5}},{t:this.instance_3,p:{rotation:6.6731,x:0.7,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9436,x:53.7,y:-21.25}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.1192,x:-13.85,y:65.65,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.477,x:58.1,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.5179,x:32.35,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.7181,x:68.35,y:27.95,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-8.6538,x:55.7,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.7531,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.9738,x:-12.35,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9959,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-18.8332,x:-63.65,regX:12.6,y:-67.35,regY:11.5}},{t:this.instance_3,p:{rotation:6.6731,x:0.75,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9436,x:53.7,y:-21.3}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.1192,x:-13.85,y:65.65,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.477,x:58.1,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.5179,x:32.35,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.7181,x:68.35,y:27.95,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-9.3261,x:55.7,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.7531,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.9738,x:-12.4,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9967,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-19.5404,x:-63.65,regX:12.6,y:-67.3,regY:11.5}},{t:this.instance_3,p:{rotation:6.6731,x:0.75,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9436,x:53.7,y:-21.3}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.1192,x:-13.85,y:65.65,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.477,x:58.1,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.5179,x:32.35,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.7181,x:68.35,y:27.95,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9992,scaleY:0.9992,rotation:-9.9989,x:55.7,y:-37.15,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.7515,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.9738,x:-12.4,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9967,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-20.2478,x:-63.6,regX:12.6,y:-67.3,regY:11.5}},{t:this.instance_3,p:{rotation:6.6731,x:0.75,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9436,x:53.7,y:-21.3}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.1183,x:-13.85,y:65.65,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.477,x:58.1,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.5179,x:32.35,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.7181,x:68.35,y:27.95,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-10.6706,x:55.75,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.7515,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.9738,x:-12.4,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9975,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-20.9554,x:-63.65,regX:12.6,y:-67.3,regY:11.5}},{t:this.instance_3,p:{rotation:6.6722,x:0.75,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9436,x:53.7,y:-21.3}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.1183,x:-13.85,y:65.65,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.4761,x:58.1,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.5179,x:32.35,y:-29.4,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.7181,x:68.35,y:27.95,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-11.3417,x:55.7,y:-37,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-24.7519,x:-35.2,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.9738,x:-12.4,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9987,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-21.6633,x:-63.6,regX:12.6,y:-67.3,regY:11.5}},{t:this.instance_3,p:{rotation:6.6722,x:0.75,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9436,x:53.7,y:-21.3}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.1183,x:-13.85,y:65.65,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.4761,x:58.05,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.5099,x:32.3,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.6909,x:68.4,y:28,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-10.7016,x:55.7,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-24.7433,x:-35.3,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.9496,x:-12.4,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9987,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-20.9862,x:-63.65,regX:12.6,y:-67.35,regY:11.5}},{t:this.instance_3,p:{rotation:6.6855,x:0.7,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9488,x:53.7,y:-21.35}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.1395,x:-14,y:65.55,regX:3.8}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.4822,x:58.15,y:46}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.5012,x:32.3,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.6645,x:68.35,y:28,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-10.0584,x:55.7,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.7359,x:-35.3,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.9284,x:-12.4,y:54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9987,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-20.3085,x:-63.6,regX:12.6,y:-67.35,regY:11.5}},{t:this.instance_3,p:{rotation:6.6987,x:0.7,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9543,x:53.7,y:-21.3}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.1615,x:-13.9,y:65.6,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.4902,x:58.2,y:46}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.4923,x:32.3,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.6384,x:68.35,y:28,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9992,scaleY:0.9992,rotation:-9.4166,x:55.65,y:-37.2,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.728,x:-35.3,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.1,scaleX:0.9992,scaleY:0.9992,rotation:-24.9057,x:-12.4,y:54.15}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9987,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-19.6323,x:-63.65,regX:12.6,y:-67.35,regY:11.5}},{t:this.instance_3,p:{rotation:6.7118,x:0.75,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9598,x:53.7,y:-21.3}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.1836,x:-13.9,y:65.6,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.4972,x:58.2,y:46}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.4824,x:32.35,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.612,x:68.35,y:28.05,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-8.7759,x:55.75,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.7214,x:-35.3,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.8838,x:-12.4,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9987,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-18.9553,x:-63.65,regX:12.6,y:-67.35,regY:11.5}},{t:this.instance_3,p:{rotation:6.7251,x:0.7,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9668,x:53.7,y:-21.3}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.2047,x:-13.95,y:65.6,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.5042,x:58.2,y:46}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.4743,x:32.4,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.5867,x:68.3,y:28.05,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-8.1337,x:55.75,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.7136,x:-35.3,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.8607,x:-12.4,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9987,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-18.2786,x:-63.65,regX:12.6,y:-67.4,regY:11.5}},{t:this.instance_3,p:{rotation:6.7384,x:0.7,y:3.65,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9721,x:53.7,y:-21.3}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.2268,x:-13.9,y:65.6,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.5113,x:58.15,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.4663,x:32.35,y:-29.4,regX:0.3}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.5602,x:68.3,y:28.05,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-7.4916,x:55.75,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-24.7049,x:-35.3,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.8384,x:-12.5,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9987,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-17.6013,x:-63.65,regX:12.6,y:-67.35,regY:11.5}},{t:this.instance_3,p:{rotation:6.7524,x:0.7,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9783,x:53.75,y:-21.25}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.2489,x:-13.95,y:65.6,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.5191,x:58.2,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.4575,x:32.35,y:-29.35,regX:0.3}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.5332,x:68.3,y:28.1,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-6.8497,x:55.7,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-24.6971,x:-35.3,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.8165,x:-12.4,y:54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9987,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-16.9253,x:-63.65,regX:12.6,y:-67.3,regY:11.5}},{t:this.instance_3,p:{rotation:6.7657,x:0.65,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:1.9,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9836,x:53.6,y:-21.25}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.2718,x:-14,y:65.6,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.5262,x:58.2,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.4494,x:32.35,y:-29.35,regX:0.3}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.5079,x:68.3,y:28.05,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-6.2076,x:55.8,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.6893,x:-35.3,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.7941,x:-12.4,y:54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9987,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-16.2482,x:-63.6,regX:12.6,y:-67.25,regY:11.6}},{t:this.instance_3,p:{rotation:6.7788,x:0.65,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:1.9,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9893,x:53.6,y:-21.25}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.2929,x:-14.15,y:65.6,regX:3.8}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.5333,x:58.2,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.4407,x:32.35,y:-29.35,regX:0.3}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.4809,x:68.25,y:28.1,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-5.5673,x:55.75,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.6818,x:-35.3,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.1,scaleX:0.9992,scaleY:0.9992,rotation:-24.771,x:-12.3,y:54.2}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9987,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-15.5718,x:-63.65,regX:12.6,y:-67.4,regY:11.5}},{t:this.instance_3,p:{rotation:6.792,x:0.65,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9945,x:53.7,y:-21.3}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.315,x:-14,y:65.55,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.5402,x:58.2,y:46}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.4325,x:32.35,y:-29.35,regX:0.3}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.4546,x:68.35,y:28.1,regX:4.6}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9992,scaleY:0.9992,rotation:-4.9241,x:55.75,y:-37.3,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-24.6748,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.1,scaleX:0.9992,scaleY:0.9992,rotation:-24.7487,x:-12.35,y:54.2}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9987,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-14.8945,x:-63.7,regX:12.6,y:-67.35,regY:11.5}},{t:this.instance_3,p:{rotation:6.8062,x:0.6,y:3.65,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-12.0008,x:53.7,y:-21.25}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.337,x:-14,y:65.55,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.5474,x:58.15,y:46}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.4226,x:32.35,y:-29.35,regX:0.3}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.4285,x:68.25,y:28.15,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-4.2834,x:55.8,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.6674,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.1,scaleX:0.9992,scaleY:0.9992,rotation:-24.7264,x:-12.25,y:54.2}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9987,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-14.2177,x:-63.7,regX:12.6,y:-67.35,regY:11.5}},{t:this.instance_3,p:{rotation:6.8194,x:0.65,y:3.65,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-12.0072,x:53.7,y:-21.25}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.3592,x:-14.15,y:65.5,regX:3.8}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.5544,x:58.2,y:46}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.4151,x:32.35,y:-29.45,regX:0.3}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.4021,x:68.2,y:28.15,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.6413,x:55.75,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.6591,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.6,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.7037,x:-12.3,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9987,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-13.5402,x:-63.65,regX:12.6,y:-67.4,regY:11.5}},{t:this.instance_3,p:{rotation:6.8325,x:0.65,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-12.0134,x:53.7,y:-21.25}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.3812,x:-14.05,y:65.55,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.5613,x:58.25,y:46}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.4058,x:32.35,y:-29.45,regX:0.3}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.376,x:68.25,y:28.15,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-2.9998,x:55.8,y:-37.15,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-24.6517,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.6818,x:-12.4,y:54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9987,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-12.864,x:-63.8,regX:12.5,y:-67.35,regY:11.5}},{t:this.instance_3,p:{rotation:6.8458,x:0.65,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-12.0187,x:53.7,y:-21.25}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.4024,x:-14.1,y:65.55,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.5685,x:58.3,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.397,x:32.4,y:-29.5,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.3498,x:68.2,y:28.2,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9993,scaleY:0.9993,rotation:-2.3586,x:55.75,y:-37.2,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.6443,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.6591,x:-12.35,y:54.15}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9987,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-12.1872,x:-63.7,regX:12.6,y:-67.4,regY:11.5}},{t:this.instance_3,p:{rotation:6.8599,x:0.65,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-12.0249,x:53.7,y:-21.25}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.4235,x:-14.05,y:65.55,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.5754,x:58.3,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.3888,x:32.35,y:-29.45,regX:0.3}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.3226,x:68.2,y:28.2,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-1.7169,x:55.9,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-24.6372,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.6,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.6372,x:-12.25,y:54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:20.0518,x:-57.7,y:-33.65}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-11.4574,x:-63.6,regX:12.6,y:-67.5,regY:11.5}},{t:this.instance_3,p:{rotation:6.8731,x:0.65,y:3.65,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9985,scaleY:0.9985,rotation:-12.0291,x:53.7,y:-21.25}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.4465,x:-14.2,y:65.55,regX:3.8}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.5824,x:58.25,y:45.95}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-112.4,-108.8,206.4,257.4);


// stage content:
(lib.LessonChapter1_13 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,290];
	this.streamSoundSymbolsList[0] = [{id:"beforewar2edit_13wav",startFrame:0,endFrame:291,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("beforewar2edit_13wav",0);
		this.InsertIntoSoundStreamData(soundInstance,0,291,1);
	}
	this.frame_290 = function() {
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
			document.location.replace("https://ninzato.github.io/history-of-badr-war/LessonChapter1_14.html");
			}, 500);
			
		}
		
		this.prevBtn.addEventListener("click", fl_ClickToGoToWebPage_2);
		
		function fl_ClickToGoToWebPage_2() {
			createjs.Sound.play("popsound");
			
			setTimeout(function(){
			document.location.replace("https://ninzato.github.io/history-of-badr-war/LessonChapter1_12.html");
			}, 500);
			
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(290).call(this.frame_290).wait(1));

	// Subtitle
	this.instance = new lib.CachedBmp_846();
	this.instance.setTransform(195.55,582.4,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_845();
	this.instance_1.setTransform(165.6,564.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(291));

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.homeBtn},{t:this.prevBtn},{t:this.nextBtn}]}).wait(291));

	// Interaction
	this.instance_2 = new lib.ch1_uArm_rcopy_1("synched",0);
	this.instance_2.setTransform(843.35,196.6,0.3694,0.3694,0,71.5583,-108.4417,32.8,9.7);

	this.instance_3 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_3.setTransform(854.6,253.6,0.3692,0.3692,0,117.1633,-62.8367,14,0);

	this.instance_4 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_4.setTransform(855,253.6,0.3694,0.3694,0,97.7636,-82.2364,4.3,-9.4);

	this.instance_5 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_5.setTransform(852.85,221.85,0.3694,0.3694,0,91.534,-88.466,43.1,7.4);

	this.instance_6 = new lib.ch1_headcopy_1("synched",0);
	this.instance_6.setTransform(823.6,171,0.3697,0.3697,0,3.8816,-176.1184,1.2,51.3);

	this.instance_7 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_7.setTransform(824,187.85,0.3705,0.3705,0,0,180,-0.1,-39.4);

	this.instance_8 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_8.setTransform(812.1,233.9,0.3683,0.3683,0,8.9562,-171.0438,0.6,5);

	this.instance_9 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_9.setTransform(832.5,234.95,0.3687,0.3687,0,-3.918,176.082,1.4,-41.3);

	this.instance_10 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_10.setTransform(836.8,270.2,0.3685,0.3685,0,-10.8339,169.1661,1.1,-50.6);

	this.instance_11 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_11.setTransform(822.95,179.05,0.3697,0.3697,0,6.7745,-173.2255,-1.8,6.9);

	this.instance_12 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_12.setTransform(808.45,269.9,0.3684,0.3684,0,7.6012,-172.3988,4.3,-50.6);

	this.instance_13 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_13.setTransform(787.1,250,0.3692,0.3692,0,-55.3984,124.6016,-9.7,11.1);

	this.instance_14 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_14.setTransform(787.4,248.7,0.3692,0.3692,0,-54.0043,125.9957,-7.1,13.2);

	this.instance_15 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_15.setTransform(800.55,219.5,0.3694,0.3694,0,-71.2851,108.7149,-45.1,12.5);

	this.instance_16 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_16.setTransform(803.3,193.65,0.3695,0.3695,0,-84.5112,95.4888,-31.4,13.2);

	this.instance_17 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_17.setTransform(825.3,219.5,0.3702,0.3702,0,-1.7643,178.2357,-5.7,-21.1);

	this.instance_18 = new lib.ch1_uArm_rcopy2_2("synched",0);
	this.instance_18.setTransform(747.15,258.65,0.3993,0.3993,0,76.5708,-103.4292,33,9.8);

	this.instance_19 = new lib.ch1_hand_rcopy2_2("synched",0);
	this.instance_19.setTransform(761.8,320.25,0.3991,0.3991,0,109.0197,-70.9803,14.2,0.1);

	this.instance_20 = new lib.ch1_thumb_rcopy2_2("synched",0);
	this.instance_20.setTransform(761.95,320.25,0.3992,0.3992,0,89.643,-90.357,4.4,-8.9);

	this.instance_21 = new lib.ch1_lArm_rcopy2_2("synched",0);
	this.instance_21.setTransform(754.9,286.5,0.3992,0.3992,0,83.4126,-96.5874,43.8,7.8);

	this.instance_22 = new lib.ch1_headcopy2_2("synched",0);
	this.instance_22.setTransform(725.8,230.95,0.3996,0.3996,0,3.8825,-176.1175,1.3,51.1);

	this.instance_23 = new lib.ch1_uBodycopy2_2("synched",0);
	this.instance_23.setTransform(726.25,249.1,0.4003,0.4003,0,0,180,-0.1,-39.6);

	this.instance_24 = new lib.ch1_uLeg_lcopy2_2("synched",0);
	this.instance_24.setTransform(713.55,298.95,0.3982,0.3982,0,8.9558,-171.0442,0.1,4.9);

	this.instance_25 = new lib.ch1_uLeg_rcopy2_2("synched",0);
	this.instance_25.setTransform(735.4,300,0.3985,0.3985,0,-3.9191,176.0809,1.4,-41.5);

	this.instance_26 = new lib.ch1_lLeg_rcopy2_2("synched",0);
	this.instance_26.setTransform(740.05,337.9,0.3983,0.3983,0,-20.8985,159.1015,1.1,-51.1);

	this.instance_27 = new lib.ch1_neckcopy2_2("synched",0);
	this.instance_27.setTransform(725.05,239.6,0.3996,0.3996,0,6.7768,-173.2232,-1.6,7.1);

	this.instance_28 = new lib.ch1_lLeg_lcopy2_2("synched",0);
	this.instance_28.setTransform(709.55,337.7,0.3983,0.3983,0,0.4017,-179.5983,4,-50.8);

	this.instance_29 = new lib.ch1_hand_lcopy2_2("synched",0);
	this.instance_29.setTransform(698.2,317.8,0.3991,0.3991,0,-127.0754,52.9246,-10,11.2);

	this.instance_30 = new lib.ch1_thumb_lcopy2_2("synched",0);
	this.instance_30.setTransform(696.75,317.6,0.3991,0.3991,0,-146.8804,33.1196,-7.2,13.3);

	this.instance_31 = new lib.ch1_lArm_lcopy2_2("synched",0);
	this.instance_31.setTransform(701.5,283.3,0.3992,0.3992,0,-87.6299,92.3701,-45.4,12.2);

	this.instance_32 = new lib.ch1_uArm_lcopy2_2("synched",0);
	this.instance_32.setTransform(703.9,255.25,0.3993,0.3993,0,-85.6918,94.3082,-31.9,13.3);

	this.instance_33 = new lib.ch1_lBodycopy2_2("synched",0);
	this.instance_33.setTransform(727.35,283.2,0.4001,0.4001,0,-1.7679,178.2321,-4.9,-21.5);

	this.instance_34 = new lib.CachedBmp_852();
	this.instance_34.setTransform(597.2,228.05,0.5,0.5);

	this.instance_35 = new lib.CachedBmp_851();
	this.instance_35.setTransform(577.05,217.6,0.5,0.5);

	this.instance_36 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_36.setTransform(653,377.1,0.4576,0.4576,0,91.1291,-88.8709,35.6,0.4);

	this.instance_37 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_37.setTransform(675.1,447.65,0.4575,0.4575,-118.7491,0,0,6.5,-1);

	this.instance_38 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_38.setTransform(674.65,443.65,0.4576,0.4576,-106.5146,0,0,5.7,-8.3);

	this.instance_39 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_39.setTransform(652.4,411.35,0.4576,0.4576,0,55.0894,-124.9106,44,0.1);

	this.instance_40 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_40.setTransform(630.15,378.2,0.4581,0.4581,0,0,180,-0.2,-24);

	this.instance_41 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_41.setTransform(647.85,472.15,0.4575,0.4575,-12.404,0,0,3.5,-54.6);

	this.instance_42 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_42.setTransform(629.3,409.5,0.4581,0.4581,0,0,180,-0.1,-23.2);

	this.instance_43 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_43.setTransform(614.05,474.1,0.4573,0.4573,11.5941,0,0,2.6,-54.2);

	this.instance_44 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_44.setTransform(618.95,429.9,0.4573,0.4573,0,6.9782,-173.0218,-0.5,1.6);

	this.instance_45 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_45.setTransform(616.2,447.5,0.4576,0.4576,62.8266,0,0,-5,3.3);

	this.instance_46 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_46.setTransform(614.85,442.45,0.4576,0.4576,55.4323,0,0,-6.2,8.1);

	this.instance_47 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_47.setTransform(598.6,409.3,0.4576,0.4576,0,-116.1165,63.8835,-39.7,-0.2);

	this.instance_48 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_48.setTransform(605,375.6,0.4576,0.4576,0,-80.0731,99.9269,-31.8,-0.9);

	this.instance_49 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_49.setTransform(637.4,429.4,0.4575,0.4575,0,-11.8912,168.1088,1.8,-45.6);

	this.instance_50 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_50.setTransform(624.8,351.55,0.4578,0.4578,1.7304,0,0,0.4,53.8);

	this.instance_51 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_51.setTransform(629,361.05,0.4578,0.4578,0,1.6808,-178.3192,-0.4,9.2);

	this.instance_52 = new lib.CachedBmp_850();
	this.instance_52.setTransform(396.85,231.05,0.5,0.5);

	this.instance_53 = new lib.CachedBmp_849();
	this.instance_53.setTransform(381.1,220.65,0.5,0.5);

	this.instance_54 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_54.setTransform(460.05,377.5,0.4573,0.4573,0,52.5325,-127.4675,35.4,0);

	this.instance_55 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_55.setTransform(520.75,418.35,0.4573,0.4573,-149.3504,0,0,6.4,-1.8);

	this.instance_56 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_56.setTransform(516.95,418.1,0.4573,0.4573,176.0857,0,0,5.5,-9.4);

	this.instance_57 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_57.setTransform(480.55,404.65,0.4573,0.4573,0,19.1882,-160.8118,43.8,0.3);

	this.instance_58 = new lib.ch1_uBodycopy("synched",0);
	this.instance_58.setTransform(437.15,378.65,0.4581,0.4581,0,0,180,-0.2,-24);

	this.instance_59 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_59.setTransform(455.85,470.95,0.4573,0.4573,-1.5067,0,0,1.8,-55.2);

	this.instance_60 = new lib.ch1_lBodycopy("synched",0);
	this.instance_60.setTransform(436.35,410.05,0.4581,0.4581,0,0,180,-0.2,-23.2);

	this.instance_61 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_61.setTransform(425.2,474.9,0.4571,0.4571,14.3823,0,0,3.3,-53.1);

	this.instance_62 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_62.setTransform(426.3,430.35,0.4571,0.4571,0,2.4258,-177.5742,-1.2,1.8);

	this.instance_63 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_63.setTransform(432,438.95,0.4573,0.4573,45.8705,0,0,-4.8,3.3);

	this.instance_64 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_64.setTransform(430.1,434.3,0.4574,0.4574,49.0232,0,0,-5.9,8.4);

	this.instance_65 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_65.setTransform(403.15,406.95,0.4573,0.4573,0,-132.4171,47.5829,-39.5,-1.1);

	this.instance_66 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_66.setTransform(411.75,376.2,0.4573,0.4573,0,-74.2119,105.7881,-30.9,-1.4);

	this.instance_67 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_67.setTransform(448.05,428.2,0.4573,0.4573,0,-9.9605,170.0395,1.7,-45.6);

	this.instance_68 = new lib.ch1_headcopy("synched",0);
	this.instance_68.setTransform(434.15,351.65,0.4577,0.4577,6.4879,0,0,0.1,52.9);

	this.instance_69 = new lib.ch1_neckcopy("synched",0);
	this.instance_69.setTransform(436.3,361.6,0.4577,0.4577,0,2.4611,-177.5389,-1.2,9.2);

	this.instance_70 = new lib.camel_leg_b_l_bcopy("synched",0);
	this.instance_70.setTransform(764.85,238.45,0.9978,0.9978,4.4785,0,0,4.7,-38.1);

	this.instance_71 = new lib.camel_leg_f_l_bcopy("synched",0);
	this.instance_71.setTransform(692.65,258.15,0.9991,0.9991,7.1213,0,0,3.9,-38.8);

	this.instance_72 = new lib.camel_leg_b_l_ucopy("synched",0);
	this.instance_72.setTransform(760.35,171.3,0.9985,0.9985,-11.9453,0,0,2,-28.1);

	this.instance_73 = new lib.camel_leg_f_l_ucopy("synched",0);
	this.instance_73.setTransform(707.2,196.2,0.9992,0.9992,6.6762,0,0,-0.8,-25.1);

	this.instance_74 = new lib.camel_headcopy("synched",0);
	this.instance_74.setTransform(642.9,125.05,0.999,0.999,-11.7605,0,0,12.6,11.5);

	this.instance_75 = new lib.camel_neckcopy("synched",0);
	this.instance_75.setTransform(648.85,158.75,0.999,0.999,19.9889,0,0,9.7,12.8);

	this.instance_76 = new lib.camel_bodycopy("synched",0);
	this.instance_76.setTransform(702.45,156.7);

	this.instance_77 = new lib.camel_leg_f_r_bcopy("synched",0);
	this.instance_77.setTransform(694.3,246.55,0.9993,0.9993,-24.9747,0,0,3.5,-38.2);

	this.instance_78 = new lib.camel_leg_f_r_ucopy("synched",0);
	this.instance_78.setTransform(671.3,183,0.9995,0.9995,-24.7536,0,0,-1,-28.1);

	this.instance_79 = new lib.camel_tailcopy("synched",0);
	this.instance_79.setTransform(762.45,155.3,0.9993,0.9993,-1.9365,0,0,-8.4,-36);

	this.instance_80 = new lib.camel_leg_b_r_bcopy("synched",0);
	this.instance_80.setTransform(775,220.5,0.9981,0.9981,-14.7197,0,0,4.5,-37.6);

	this.instance_81 = new lib.camel_leg_b_r_ucopy("synched",0);
	this.instance_81.setTransform(739,162.95,0.9976,0.9976,-38.5177,0,0,0.4,-29.2);

	this.instance_82 = new lib.CachedBmp_848();
	this.instance_82.setTransform(450.4,126.45,0.5,0.5);

	this.instance_83 = new lib.CachedBmp_847();
	this.instance_83.setTransform(437.4,116,0.5,0.5);

	this.instance_84 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_84.setTransform(516.8,275.15,0.4572,0.4572,0,68.4436,-111.5564,37.5,-0.2);

	this.instance_85 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_85.setTransform(540.85,269.55,0.4572,0.4572,100.7534,0,0,6.6,-1.6);

	this.instance_86 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_86.setTransform(539.45,273.4,0.4574,0.4574,100.8537,0,0,5.6,-8.7);

	this.instance_87 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_87.setTransform(530.15,309.4,0.4573,0.4573,0,-76.1682,103.8318,40.8,0.4);

	this.instance_88 = new lib.ch1_headcopy2("synched",0);
	this.instance_88.setTransform(491.1,249.95,0.4576,0.4576,-0.577,0,0,0.7,53.4);

	this.instance_89 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_89.setTransform(494.5,275.75,0.4581,0.4581,0,0,180,-0.1,-23.7);

	this.instance_90 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_90.setTransform(510.55,371.3,0.4572,0.4572,-6.6519,0,0,3,-53);

	this.instance_91 = new lib.ch1_neckcopy2("synched",0);
	this.instance_91.setTransform(493.95,258.6,0.4577,0.4577,0,0.0917,-179.9083,-1.7,9.4);

	this.instance_92 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_92.setTransform(493.7,307.1,0.4581,0.4581,0,0,180,-0.1,-22.9);

	this.instance_93 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_93.setTransform(479.85,373.2,0.4571,0.4571,2.4947,0,0,2.5,-52.8);

	this.instance_94 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_94.setTransform(487.45,329.2,0.4571,0.4571,0,8.4092,-171.5908,-2.1,2.6);

	this.instance_95 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_95.setTransform(469.35,273.05,0.4574,0.4574,0,-82.3565,97.6435,-30.9,-1.2);

	this.instance_96 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_96.setTransform(500.75,327.35,0.4574,0.4574,0,-12.4444,167.5556,1.6,-45.4);

	this.instance_97 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_97.setTransform(495,333.2,0.4573,0.4573,47.1948,0,0,-4.5,3.5);

	this.instance_98 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_98.setTransform(495,327.95,0.4573,0.4573,71.0567,0,0,-5.8,8);

	this.instance_99 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_99.setTransform(464.4,306.9,0.4573,0.4573,0,-143.0085,36.9915,-39.2,-0.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_99},{t:this.instance_98},{t:this.instance_97},{t:this.instance_96},{t:this.instance_95},{t:this.instance_94},{t:this.instance_93},{t:this.instance_92},{t:this.instance_91},{t:this.instance_90},{t:this.instance_89},{t:this.instance_88},{t:this.instance_87},{t:this.instance_86},{t:this.instance_85},{t:this.instance_84},{t:this.instance_83},{t:this.instance_82},{t:this.instance_81},{t:this.instance_80},{t:this.instance_79},{t:this.instance_78},{t:this.instance_77},{t:this.instance_76},{t:this.instance_75},{t:this.instance_74},{t:this.instance_73},{t:this.instance_72},{t:this.instance_71},{t:this.instance_70},{t:this.instance_69},{t:this.instance_68},{t:this.instance_67},{t:this.instance_66},{t:this.instance_65},{t:this.instance_64},{t:this.instance_63},{t:this.instance_62},{t:this.instance_61},{t:this.instance_60},{t:this.instance_59},{t:this.instance_58},{t:this.instance_57},{t:this.instance_56},{t:this.instance_55},{t:this.instance_54},{t:this.instance_53},{t:this.instance_52},{t:this.instance_51},{t:this.instance_50},{t:this.instance_49},{t:this.instance_48},{t:this.instance_47},{t:this.instance_46},{t:this.instance_45},{t:this.instance_44},{t:this.instance_43},{t:this.instance_42},{t:this.instance_41},{t:this.instance_40},{t:this.instance_39},{t:this.instance_38},{t:this.instance_37},{t:this.instance_36},{t:this.instance_35},{t:this.instance_34},{t:this.instance_33},{t:this.instance_32},{t:this.instance_31},{t:this.instance_30},{t:this.instance_29},{t:this.instance_28},{t:this.instance_27},{t:this.instance_26},{t:this.instance_25},{t:this.instance_24},{t:this.instance_23},{t:this.instance_22},{t:this.instance_21},{t:this.instance_20},{t:this.instance_19},{t:this.instance_18},{t:this.instance_17},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2}]},290).wait(1));

	// zubair
	this.instance_100 = new lib.CharacterGood_02();
	this.instance_100.setTransform(452.05,409,0.4577,0.4577,0,0,180,-40.2,46.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_100).to({_off:true},290).wait(1));

	// ali
	this.instance_101 = new lib.CharacterGood_01();
	this.instance_101.setTransform(626.7,387.35,0.4577,0.4577,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_101).to({_off:true},290).wait(1));

	// saad
	this.instance_102 = new lib.CharacterGood_04();
	this.instance_102.setTransform(473.85,307.5,0.4577,0.4577,0,0,180,37.7,49.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_102).to({_off:true},290).wait(1));

	// slave1
	this.instance_103 = new lib.CharacterCivilian_07_2();
	this.instance_103.setTransform(826.6,218.8,0.3704,0.3704,0,0,180,-14.3,47.8);

	this.instance_104 = new lib.CharacterCivilian_07();
	this.instance_104.setTransform(725.1,280.6,0.4007,0.4007,0,0,180,-4.6,42.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_104},{t:this.instance_103}]}).to({state:[]},290).wait(1));

	// camel
	this.instance_105 = new lib.camel_01_interact();
	this.instance_105.setTransform(698.7,212.85,1.0046,1.0046,0,0,0,-7.4,19.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_105).to({_off:true},290).wait(1));

	// Background
	this.instance_106 = new lib.Chap1Scene13();
	this.instance_106.setTransform(0,0,0.6667,0.6667);

	this.timeline.addTween(cjs.Tween.get(this.instance_106).wait(291));

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
		{src:"images/LessonChapter1_13_atlas_1.png?1655324812325", id:"LessonChapter1_13_atlas_1"},
		{src:"images/LessonChapter1_13_atlas_2.png?1655324812326", id:"LessonChapter1_13_atlas_2"},
		{src:"sounds/beforewar2edit_13wav.mp3?1655324812910", id:"beforewar2edit_13wav"},
		{src:"sounds/popsound.mp3?1655324812910", id:"popsound"}
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