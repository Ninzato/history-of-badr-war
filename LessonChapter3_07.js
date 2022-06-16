(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"LessonChapter3_07_atlas_1", frames: [[1357,1204,312,399],[1079,1204,276,635],[584,1699,330,317],[1357,1605,228,432],[1671,1204,330,317],[1587,1605,228,432],[0,1006,1829,196],[0,738,1914,266],[1282,0,737,736],[0,1204,582,582],[584,1204,493,493],[0,0,1280,720]]},
		{name:"LessonChapter3_07_atlas_2", frames: [[306,1722,249,249],[586,912,249,249],[734,1901,132,102],[764,761,132,102],[303,0,285,308],[648,267,77,245],[691,1163,77,244],[0,1553,304,286],[577,1179,112,623],[0,623,285,308],[727,267,77,245],[691,1409,77,244],[306,1451,269,269],[287,912,297,265],[0,933,285,308],[764,514,77,245],[734,1655,77,244],[333,310,313,269],[287,623,298,287],[0,1243,285,308],[806,267,77,245],[770,1163,77,244],[333,581,193,36],[177,1973,193,36],[0,0,301,327],[0,329,331,292],[590,0,317,265],[0,1841,175,145],[587,581,175,144],[557,1804,175,145],[587,727,175,144],[177,1841,91,87],[557,1951,91,88],[287,1179,270,270]]}
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



(lib.CachedBmp_104 = function() {
	this.initialize(ss["LessonChapter3_07_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_103 = function() {
	this.initialize(ss["LessonChapter3_07_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_102 = function() {
	this.initialize(ss["LessonChapter3_07_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_101 = function() {
	this.initialize(ss["LessonChapter3_07_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_100 = function() {
	this.initialize(ss["LessonChapter3_07_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_99 = function() {
	this.initialize(ss["LessonChapter3_07_atlas_2"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_98 = function() {
	this.initialize(ss["LessonChapter3_07_atlas_2"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_97 = function() {
	this.initialize(ss["LessonChapter3_07_atlas_2"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_96 = function() {
	this.initialize(ss["LessonChapter3_07_atlas_2"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_95 = function() {
	this.initialize(ss["LessonChapter3_07_atlas_2"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_94 = function() {
	this.initialize(ss["LessonChapter3_07_atlas_2"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_93 = function() {
	this.initialize(ss["LessonChapter3_07_atlas_2"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_92 = function() {
	this.initialize(ss["LessonChapter3_07_atlas_2"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_91 = function() {
	this.initialize(ss["LessonChapter3_07_atlas_2"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_90 = function() {
	this.initialize(ss["LessonChapter3_07_atlas_2"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_89 = function() {
	this.initialize(ss["LessonChapter3_07_atlas_2"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_88 = function() {
	this.initialize(ss["LessonChapter3_07_atlas_2"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_87 = function() {
	this.initialize(ss["LessonChapter3_07_atlas_2"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_86 = function() {
	this.initialize(ss["LessonChapter3_07_atlas_2"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_85 = function() {
	this.initialize(ss["LessonChapter3_07_atlas_2"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_84 = function() {
	this.initialize(ss["LessonChapter3_07_atlas_2"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_83 = function() {
	this.initialize(ss["LessonChapter3_07_atlas_2"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_82 = function() {
	this.initialize(ss["LessonChapter3_07_atlas_2"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_81 = function() {
	this.initialize(ss["LessonChapter3_07_atlas_2"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_80 = function() {
	this.initialize(ss["LessonChapter3_07_atlas_2"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_79 = function() {
	this.initialize(ss["LessonChapter3_07_atlas_2"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_78 = function() {
	this.initialize(ss["LessonChapter3_07_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_77 = function() {
	this.initialize(ss["LessonChapter3_07_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_76 = function() {
	this.initialize(ss["LessonChapter3_07_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_75 = function() {
	this.initialize(ss["LessonChapter3_07_atlas_2"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_74 = function() {
	this.initialize(ss["LessonChapter3_07_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_73 = function() {
	this.initialize(ss["LessonChapter3_07_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_72 = function() {
	this.initialize(ss["LessonChapter3_07_atlas_2"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_71 = function() {
	this.initialize(ss["LessonChapter3_07_atlas_2"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_70 = function() {
	this.initialize(ss["LessonChapter3_07_atlas_2"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_69 = function() {
	this.initialize(ss["LessonChapter3_07_atlas_2"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_68 = function() {
	this.initialize(ss["LessonChapter3_07_atlas_2"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_67 = function() {
	this.initialize(ss["LessonChapter3_07_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_66 = function() {
	this.initialize(ss["LessonChapter3_07_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CompoundPath = function() {
	this.initialize(ss["LessonChapter3_07_atlas_2"]);
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.Group_1 = function() {
	this.initialize(ss["LessonChapter3_07_atlas_2"]);
	this.gotoAndStop(32);
}).prototype = p = new cjs.Sprite();



(lib.Path = function() {
	this.initialize(ss["LessonChapter3_07_atlas_2"]);
	this.gotoAndStop(33);
}).prototype = p = new cjs.Sprite();



(lib.Path_1_0 = function() {
	this.initialize(ss["LessonChapter3_07_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.Path_2_0 = function() {
	this.initialize(ss["LessonChapter3_07_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.Path_3_0 = function() {
	this.initialize(ss["LessonChapter3_07_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.Chap3GeneralScene = function() {
	this.initialize(ss["LessonChapter3_07_atlas_1"]);
	this.gotoAndStop(11);
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


(lib.Symbol4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.rf(["#FF8500","rgba(255,142,1,0.918)","rgba(255,181,3,0.588)","rgba(255,211,5,0.333)","rgba(255,233,6,0.145)","rgba(255,246,7,0.035)","rgba(255,250,7,0)"],[0,0.043,0.243,0.443,0.639,0.827,1],0,0,0,0,0,194.3).s().p("Ar0b+QlciTkNkNQkNkNiUldQiYloAAmMQAAmKCYlqQCUlcENkNQENkNFciUQFqiYGKAAQGMAAFoCYQFdCUENENQENENCTFcQCZFqAAGKQAAGMiZFoQiTFdkNENQkNENldCTQloCZmMAAQmKAAlqiZg");
	this.shape.setTransform(194.3,194.3);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol4, new cjs.Rectangle(0,0,388.6,388.6), null);


(lib.Symbol3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.rf(["#FF8500","rgba(255,142,1,0.918)","rgba(255,181,3,0.588)","rgba(255,211,5,0.333)","rgba(255,233,6,0.145)","rgba(255,246,7,0.035)","rgba(255,250,7,0)"],[0,0.043,0.243,0.443,0.639,0.827,1],0,0,0,0,0,82.7).s().p("AlBL6QiUg/hzhyQhyhzg/iUQhBiaAAioQAAinBBiaQA/iUByhzQBzhyCUg/QCahBCnAAQCoAACaBBQCUA/ByByQBzBzA/CUQBBCaAACnQAACohBCaQg/CUhzBzQhyByiUA/QiaBBioAAQinAAiahBg");
	this.shape.setTransform(82.675,82.675);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol3, new cjs.Rectangle(0,0,165.4,165.4), null);


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
	this.instance = new lib.CachedBmp_100();
	this.instance.setTransform(-33.05,-28.05,0.4875,0.4875);

	this.instance_1 = new lib.CachedBmp_101();
	this.instance_1.setTransform(-33.05,-28.15,0.4875,0.4875);

	this.instance_2 = new lib.CompoundPath();
	this.instance_2.setTransform(-159.75,-154.3,3.5004,3.5004);

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
	this.instance = new lib.CachedBmp_99();
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
	this.instance = new lib.CachedBmp_98();
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
	this.instance = new lib.CachedBmp_97();
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
	this.instance = new lib.CachedBmp_96();
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
	this.instance = new lib.CachedBmp_95();
	this.instance.setTransform(-35,-43.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-35,-43.9,56,311.5);


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
	this.instance = new lib.CachedBmp_94();
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
	this.instance = new lib.CachedBmp_93();
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
	this.instance = new lib.CachedBmp_92();
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
	this.instance = new lib.CachedBmp_91();
	this.instance.setTransform(-78.45,-78,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-78.4,-78,134.5,134.5);


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
	this.instance = new lib.CachedBmp_90();
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
	this.instance_1 = new lib.CachedBmp_89();
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
	this.instance_1 = new lib.CachedBmp_88();
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
	this.instance_1 = new lib.CachedBmp_87();
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
	this.instance = new lib.CachedBmp_86();
	this.instance.setTransform(-108.1,-44.45,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-108.1,-44.4,156.5,134.5);


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
	this.shape.graphics.f("#D3C2B2").s().p("Am5BCQgpgPAAgzQAAgyApgPQAWgIA7AAQC5gBCXAAQEgACCbAPQAeACASARQAQAQAAAVQAAAUgQAPQgSASgeADQjYAUozAAQg6AAgXgJg");
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
	this.instance_1 = new lib.CachedBmp_85();
	this.instance_1.setTransform(-70.3,-70.05,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-70.3,-70,149,143.5);


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
	this.instance_1 = new lib.CachedBmp_84();
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
	this.instance_1 = new lib.CachedBmp_83();
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
	this.instance_1 = new lib.CachedBmp_82();
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
	this.instance = new lib.CachedBmp_81();
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
	this.instance = new lib.CachedBmp_80();
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
	this.instance_1 = new lib.CachedBmp_79();
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
	this.instance_1 = new lib.CachedBmp_78();
	this.instance_1.setTransform(-29.3,-47.15,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-29.3,-47.1,138,317.5);


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
	this.shape_4.graphics.f("#2B241C").s().p("AjxL4QhihnAGiOIAhwvQAEiABchZQBdhZCAABIAGAAQCDACBbBeQBbBegCCDQgFDpAAFXQAAEgACDJQACCMhiBiQhiBjiKAAQiOAAhihmg");
	this.shape_4.setTransform(-3.639,-3.9012);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

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
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2B241C").s().p("AjxL4QhihnAGiOIAhwvQAEiABchZQBdhZCAABIAGAAQCDACBbBeQBbBegCCDQgFDpAAFXQAAEgACDJQACCMhiBiQhiBjiKAAQiOAAhihmg");
	this.shape_4.setTransform(-10.939,45.1488);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

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
	this.instance_2 = new lib.CachedBmp_77();
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
	this.shape_2.graphics.f("#2B241C").s().p("AEqDnIqVg8QhOgIg0g5Qg1g5AAhNQAAhPA4g4QA4g5BPgBIKVgKQBjgBBHBFQBHBFAABiQgBBkhJBEQhCA8hVAAIgYgBg");
	this.shape_2.setTransform(-7.6,10.9264);

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
	this.shape_2.graphics.f("#2B241C").s().p("AnYCsQhJhEgBhkQAAhiBHhFQBHhFBjABIKVAKQBPABA4A5QA3A4AABPQAABNg0A5Qg1A5hNAIIqVA8IgYABQhVAAhCg8g");
	this.shape_2.setTransform(6.05,15.6264);

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
	this.shape.graphics.f("#2B241C").s().p("AAlRQQkJAAlCglQAUjggFoKQgKphgDkCQgCjmChikQChijDlAAIAVAAQDpAACaCpQCYCogKDtIgxZaQkjAHiaAAIgUAAg");
	this.shape.setTransform(-1.3874,-21.3426,0.5879,0.5879);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#1B1810").s().p("AAQF8QgTgBgKgLQgMgOAAgdQAAiogkjTIg9lFIDFAAIgHKfQA+AegHAfQgDAMgPAHQgOAIgTAAg");
	this.shape_1.setTransform(-0.0598,23.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

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
	this.instance = new lib.CachedBmp_76();
	this.instance.setTransform(-56.95,-12.25,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

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
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2B241C").s().p("AEUDHIrkgfIAAlDILmgrQBZgDA0A+QAuA2AABLQACBQg4BAQg4BBhMAAIgDAAg");
	this.shape_1.setTransform(13.6784,8.3188);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#7C6253").s().p("AAYBKQkfgCiagNQgfgDgSgRQgQgQAAgVQAAgUAQgQQASgRAegDQDYgUIzAAQA7AAAWAJQApAPAAAyQAAAzgpAPQgWAIg7AAIjSABIh/gBg");
	this.shape_2.setTransform(-0.0258,-0.03);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).wait(1));

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
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2B241C").s().p("AmaCGQg4hAAChQQAAhLAug2QA0g+BZADILmArIAAFDIrkAfIgDAAQhMAAg4hBg");
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
	this.instance_2 = new lib.CachedBmp_75();
	this.instance_2.setTransform(-78.3,-67.4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-78.3,-67.4,165.5,146);


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
	this.instance_2 = new lib.CachedBmp_74();
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
	this.instance = new lib.CachedBmp_73();
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
	this.instance_3 = new lib.CachedBmp_72();
	this.instance_3.setTransform(-75.25,-66.75,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

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
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#7C6253").s().p("AjBBrQgOgMgBgjQAAgiALgmQAMgoAUgaQAWgeAYgBIBFgDQAzgCAmACQBxAHAhAsQBABXhuAVQggAGg/ACQg9ADgNACQgUAEgaANIgsAXQgdAOgUAAQgOAAgKgHg");
	this.shape.setTransform(14.8,-0.3,1,1,0,0,0,14.8,-0.3);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

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
	this.instance = new lib.CachedBmp_70();
	this.instance.setTransform(-43.65,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_71();
	this.instance_1.setTransform(-43.45,-36.05,0.5,0.5);

	this.instance_2 = new lib.Group_1();
	this.instance_2.setTransform(-214.75,-207.05,4.7385,4.7385);

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
	this.instance = new lib.CachedBmp_68();
	this.instance.setTransform(-43.65,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_69();
	this.instance_1.setTransform(-42.15,-36.05,0.5,0.5);

	this.instance_2 = new lib.Group_1();
	this.instance_2.setTransform(216.45,-207.05,4.7384,4.7384,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_2},{t:this.instance_1}]},1).wait(1));

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


(lib.ClipGroup = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AnmEmIg1pLIQ3AhIghIqg");
	mask.setTransform(54,29.425);

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup, new cjs.Rectangle(0,0,0,0), null);


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


(lib.Symbol1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.ClipGroup();
	this.instance.setTransform(98.25,45.4,1.283,1.283,0,0,0,54.1,29.4);

	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["#FF8500","rgba(255,142,1,0.918)","rgba(255,181,3,0.588)","rgba(255,211,5,0.333)","rgba(255,233,6,0.145)","rgba(255,246,7,0.035)","rgba(255,250,7,0)"],[0,0.043,0.243,0.443,0.639,0.827,1],0,32.6,0,-32.5).s().p("AnpFGIkYqLIYDAAIkKKLg");
	this.shape.setTransform(98.7558,41.7729,1.283,1.283);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol1, new cjs.Rectangle(0,0,197.5,83.6), null);


(lib.warSpoils = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// light
	this.instance = new lib.Symbol1();
	this.instance.setTransform(-0.2,-10.75,1,0.2094,0,0,0,98.5,38.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:98.8,regY:41.8,scaleY:0.2489,x:0.1,y:-11.7},0).wait(1).to({scaleY:0.2883,y:-13.25},0).wait(1).to({scaleY:0.3277,y:-14.8},0).wait(1).to({scaleY:0.3671,y:-16.4},0).wait(1).to({scaleY:0.4065,y:-17.95},0).wait(1).to({scaleY:0.446,y:-19.5},0).wait(1).to({scaleY:0.4854,y:-21.1},0).wait(1).to({scaleY:0.5248,y:-22.65},0).wait(1).to({scaleY:0.5642,y:-24.2},0).wait(1).to({scaleY:0.6036,y:-25.8},0).wait(1).to({scaleY:0.643,y:-27.35},0).wait(1).to({scaleY:0.6825,y:-28.9},0).wait(1).to({scaleY:0.7219,y:-30.55},0).wait(1).to({scaleY:0.7613,y:-32.1},0).wait(1).to({scaleY:0.8007,y:-33.65},0).wait(1).to({scaleY:0.8401,y:-35.25},0).wait(1).to({scaleY:0.8796,y:-36.8},0).wait(1).to({scaleY:0.919,y:-38.35},0).wait(1).to({scaleY:0.9584,y:-39.95},0).wait(1).to({scaleY:0.9978,y:-41.5},0).wait(1).to({scaleY:1.0372,y:-43.05},0).wait(1).to({scaleY:1.0766,y:-44.65},0).wait(1).to({scaleY:1.1161,y:-46.2},0).wait(23).to({scaleY:1.0848,y:-44.95},0).wait(1).to({scaleY:1.0535,y:-43.7},0).wait(1).to({scaleY:1.0223,y:-42.45},0).wait(1).to({scaleY:0.991,y:-41.25},0).wait(1).to({scaleY:0.9597,y:-40},0).wait(1).to({scaleY:0.9285,y:-38.75},0).wait(1).to({scaleY:0.8972,y:-37.5},0).wait(1).to({scaleY:0.866,y:-36.25},0).wait(1).to({scaleY:0.8347,y:-35},0).wait(1).to({scaleY:0.8034,y:-33.75},0).wait(1).to({scaleY:0.7722,y:-32.5},0).wait(1).to({scaleY:0.7409,y:-31.3},0).wait(1).to({scaleY:0.7097,y:-30.05},0).wait(1).to({scaleY:0.6784,y:-28.8},0).wait(1).to({scaleY:0.6471,y:-27.55},0).wait(1).to({scaleY:0.6159,y:-26.3},0).wait(1).to({scaleY:0.5846,y:-25.05},0).wait(1).to({scaleY:0.5533,y:-23.8},0).wait(1).to({scaleY:0.5221,y:-22.6},0).wait(1).to({scaleY:0.4908,y:-21.35},0).wait(1).to({scaleY:0.4596,y:-20.1},0).wait(1).to({scaleY:0.4283,y:-18.85},0).wait(1).to({scaleY:0.397,y:-17.6},0).wait(1).to({scaleY:0.3658,y:-16.35},0).wait(1).to({scaleY:0.3345,y:-15.1},0).wait(1).to({scaleY:0.3032,y:-13.85},0).wait(1).to({scaleY:0.272,y:-12.65},0).wait(1).to({scaleY:0.2407,y:-11.4},0).wait(1).to({scaleY:0.2095,y:-10.15},0).wait(1));

	// flash0_ai
	this.instance_1 = new lib.CachedBmp_104();
	this.instance_1.setTransform(-78.15,-99.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(75));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-98.7,-99.6,197.5,199.5);


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
	this.instance = new lib.CachedBmp_102();
	this.instance.setTransform(-62.35,-62.45,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(59));

	// small_star
	this.instance_1 = new lib.Path_2();
	this.instance_1.setTransform(0.8,-1.05,0.4441,0.4441,0,0,0,286.9,290.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({regX:291,regY:291,scaleX:0.4447,scaleY:0.4447,rotation:2.5439,x:2.65,y:-0.9},0).wait(1).to({scaleX:0.4454,scaleY:0.4454,rotation:5.0879,y:-0.8},0).wait(1).to({scaleX:0.446,scaleY:0.446,rotation:7.6318,y:-0.75},0).wait(1).to({scaleX:0.4467,scaleY:0.4467,rotation:10.1758,y:-0.65},0).wait(1).to({scaleX:0.4473,scaleY:0.4473,rotation:12.7197,x:2.6,y:-0.6},0).wait(1).to({scaleX:0.4479,scaleY:0.4479,rotation:15.2637,y:-0.55},0).wait(1).to({scaleX:0.4486,scaleY:0.4486,rotation:17.8076,y:-0.45},0).wait(1).to({scaleX:0.4492,scaleY:0.4492,rotation:20.3516,x:2.55,y:-0.4},0).wait(1).to({scaleX:0.4499,scaleY:0.4499,rotation:22.8955,x:2.5,y:-0.25},0).wait(1).to({scaleX:0.4505,scaleY:0.4505,rotation:25.4395,y:-0.2},0).wait(1).to({scaleX:0.4512,scaleY:0.4512,rotation:27.9834,x:2.45,y:-0.1},0).wait(1).to({scaleX:0.4518,scaleY:0.4518,rotation:30.5274,x:2.4,y:-0.05},0).wait(1).to({scaleX:0.4524,scaleY:0.4524,rotation:33.0713,y:0.05},0).wait(1).to({scaleX:0.4531,scaleY:0.4531,rotation:35.6153,x:2.3,y:0.1},0).wait(1).to({scaleX:0.4537,scaleY:0.4537,rotation:38.1592,x:2.25,y:0.15},0).wait(1).to({scaleX:0.4544,scaleY:0.4544,rotation:40.7032,x:2.2,y:0.25},0).wait(1).to({scaleX:0.455,scaleY:0.455,rotation:43.2471},0).wait(1).to({scaleX:0.4557,scaleY:0.4557,rotation:45.7911,x:2.05,y:0.35},0).wait(1).to({scaleX:0.4563,scaleY:0.4563,rotation:48.335,x:2},0).wait(1).to({scaleX:0.457,scaleY:0.457,rotation:50.879,x:1.95,y:0.45},0).wait(1).to({scaleX:0.4576,scaleY:0.4576,rotation:53.4229,x:1.85,y:0.5},0).wait(1).to({scaleX:0.4582,scaleY:0.4582,rotation:55.9669,y:0.55},0).wait(1).to({scaleX:0.4589,scaleY:0.4589,rotation:58.5108,x:1.75},0).wait(1).to({scaleX:0.4595,scaleY:0.4595,rotation:61.0548,x:1.65,y:0.6},0).wait(1).to({scaleX:0.4602,scaleY:0.4602,rotation:63.5987,x:1.6,y:0.7},0).wait(1).to({scaleX:0.4608,scaleY:0.4608,rotation:66.1427,x:1.55,y:0.75},0).wait(1).to({scaleX:0.4615,scaleY:0.4615,rotation:68.6866,x:1.45},0).wait(1).to({scaleX:0.4621,scaleY:0.4621,rotation:71.2306,x:1.35},0).wait(1).to({scaleX:0.4628,scaleY:0.4628,rotation:73.7745,x:1.25,y:0.8},0).wait(1).to({scaleX:0.4634,scaleY:0.4634,rotation:76.3184},0).wait(1).to({scaleX:0.461,scaleY:0.461,rotation:78.8624,x:1.1,y:0.85},0).wait(1).to({scaleX:0.4587,scaleY:0.4587,rotation:81.4063,x:1.05,y:0.8},0).wait(1).to({scaleX:0.4563,scaleY:0.4563,rotation:83.9503,x:0.95,y:0.85},0).wait(1).to({scaleX:0.454,scaleY:0.454,rotation:86.4942,x:0.9},0).wait(1).to({scaleX:0.4516,scaleY:0.4516,rotation:89.0382,x:0.8},0).wait(1).to({scaleX:0.4493,scaleY:0.4493,rotation:91.5821,x:0.7},0).wait(1).to({scaleX:0.4469,scaleY:0.4469,rotation:94.1261,x:0.65,y:0.8},0).wait(1).to({scaleX:0.4445,scaleY:0.4445,rotation:96.67,x:0.55,y:0.85},0).wait(1).to({scaleX:0.4422,scaleY:0.4422,rotation:99.214,x:0.5,y:0.75},0).wait(1).to({scaleX:0.4398,scaleY:0.4398,rotation:101.7579,x:0.35,y:0.7},0).wait(1).to({scaleX:0.4375,scaleY:0.4375,rotation:104.3019,x:0.3},0).wait(1).to({scaleX:0.4351,scaleY:0.4351,rotation:106.8458,x:0.2},0).wait(1).to({scaleX:0.4328,scaleY:0.4328,rotation:109.3898,x:0.15,y:0.65},0).wait(1).to({scaleX:0.4304,scaleY:0.4304,rotation:111.9337,x:0.05,y:0.6},0).wait(1).to({scaleX:0.428,scaleY:0.428,rotation:114.4777,y:0.55},0).wait(1).to({scaleX:0.4257,scaleY:0.4257,rotation:117.0216,x:-0.05,y:0.5},0).wait(1).to({scaleX:0.4233,scaleY:0.4233,rotation:119.5656,x:-0.1,y:0.45},0).wait(1).to({scaleX:0.421,scaleY:0.421,rotation:122.1095,x:-0.15},0).wait(1).to({scaleX:0.4186,scaleY:0.4186,rotation:124.6535,x:-0.2,y:0.4},0).wait(1).to({scaleX:0.4162,scaleY:0.4162,rotation:127.1974,x:-0.3,y:0.3},0).wait(1).to({scaleX:0.4139,scaleY:0.4139,rotation:129.7414,y:0.25},0).wait(1).to({scaleX:0.4115,scaleY:0.4115,rotation:132.2853,x:-0.35},0).wait(1).to({scaleX:0.4092,scaleY:0.4092,rotation:134.8293,x:-0.45,y:0.15},0).wait(1).to({scaleX:0.4068,scaleY:0.4068,rotation:137.3732,y:0.05},0).wait(1).to({scaleX:0.4045,scaleY:0.4045,rotation:139.9172,x:-0.5,y:0},0).wait(1).to({scaleX:0.4021,scaleY:0.4021,rotation:142.4611,x:-0.55,y:-0.1},0).wait(1).to({scaleX:0.3997,scaleY:0.3997,rotation:145.0051,y:-0.15},0).wait(1).to({scaleX:0.3974,scaleY:0.3974,rotation:147.549,x:-0.6,y:-0.25},0).wait(1));

	// bigStar
	this.instance_2 = new lib.Path_1();
	this.instance_2.setTransform(0.8,-1.05,0.3313,0.3313,0,0,0,364,366.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1).to({regX:368.5,regY:368,scaleX:0.3333,scaleY:0.3333,rotation:-3.0648,x:2.3,y:-0.7},0).wait(1).to({scaleX:0.3354,scaleY:0.3354,rotation:-6.1296,y:-0.85},0).wait(1).to({scaleX:0.3374,scaleY:0.3374,rotation:-9.1943,x:2.35,y:-0.9},0).wait(1).to({scaleX:0.3394,scaleY:0.3394,rotation:-12.2591,y:-1},0).wait(1).to({scaleX:0.3414,scaleY:0.3414,rotation:-15.3239,x:2.4,y:-1.05},0).wait(1).to({scaleX:0.3435,scaleY:0.3435,rotation:-18.3887,y:-1.1},0).wait(1).to({scaleX:0.3455,scaleY:0.3455,rotation:-21.4534,y:-1.25},0).wait(1).to({scaleX:0.3475,scaleY:0.3475,rotation:-24.5182,x:2.35,y:-1.35},0).wait(1).to({scaleX:0.3495,scaleY:0.3495,rotation:-27.583,y:-1.45},0).wait(1).to({scaleX:0.3516,scaleY:0.3516,rotation:-30.6478,y:-1.5},0).wait(1).to({scaleX:0.3536,scaleY:0.3536,rotation:-33.7125,y:-1.55},0).wait(1).to({scaleX:0.3556,scaleY:0.3556,rotation:-36.7773,y:-1.7},0).wait(1).to({scaleX:0.3576,scaleY:0.3576,rotation:-39.8421,x:2.3,y:-1.75},0).wait(1).to({scaleX:0.3597,scaleY:0.3597,rotation:-42.9069,x:2.25,y:-1.8},0).wait(1).to({scaleX:0.3617,scaleY:0.3617,rotation:-45.9716,y:-1.95},0).wait(1).to({scaleX:0.3637,scaleY:0.3637,rotation:-49.0364,x:2.15,y:-2.05},0).wait(1).to({scaleX:0.3657,scaleY:0.3657,rotation:-52.1012,y:-2.15},0).wait(1).to({scaleX:0.3678,scaleY:0.3678,rotation:-55.166,x:2.1,y:-2.2},0).wait(1).to({scaleX:0.3698,scaleY:0.3698,rotation:-58.2307,x:2.05,y:-2.25},0).wait(1).to({scaleX:0.3718,scaleY:0.3718,rotation:-61.2955,x:1.95,y:-2.35},0).wait(1).to({scaleX:0.3738,scaleY:0.3738,rotation:-64.3603,x:1.9,y:-2.45},0).wait(1).to({scaleX:0.3759,scaleY:0.3759,rotation:-67.4251,x:1.8,y:-2.5},0).wait(1).to({scaleX:0.3779,scaleY:0.3779,rotation:-70.4898,x:1.75,y:-2.55},0).wait(1).to({scaleX:0.3799,scaleY:0.3799,rotation:-73.5546},0).wait(1).to({scaleX:0.3819,scaleY:0.3819,rotation:-76.6194,x:1.6,y:-2.65},0).wait(1).to({scaleX:0.384,scaleY:0.384,rotation:-79.6842,x:1.55,y:-2.7},0).wait(1).to({scaleX:0.386,scaleY:0.386,rotation:-82.7489,x:1.45,y:-2.8},0).wait(1).to({scaleX:0.388,scaleY:0.388,rotation:-85.8137,x:1.4},0).wait(1).to({scaleX:0.39,scaleY:0.39,rotation:-88.8785,x:1.25,y:-2.85},0).wait(1).to({scaleX:0.392,scaleY:0.392,rotation:-91.9433,x:1.2},0).wait(1).to({scaleX:0.3898,scaleY:0.3898,rotation:-95.0081,x:1.1},0).wait(1).to({scaleX:0.3875,scaleY:0.3875,rotation:-98.0728,x:1},0).wait(1).to({scaleX:0.3853,scaleY:0.3853,rotation:-101.1376,x:0.9},0).wait(1).to({scaleX:0.3831,scaleY:0.3831,rotation:-104.2024,x:0.8},0).wait(1).to({scaleX:0.3808,scaleY:0.3808,rotation:-107.2672,x:0.7},0).wait(1).to({scaleX:0.3786,scaleY:0.3786,rotation:-110.3319,x:0.6,y:-2.8},0).wait(1).to({scaleX:0.3763,scaleY:0.3763,rotation:-113.3967,x:0.55},0).wait(1).to({scaleX:0.3741,scaleY:0.3741,rotation:-116.4615,x:0.5},0).wait(1).to({scaleX:0.3718,scaleY:0.3718,rotation:-119.5263,x:0.35,y:-2.75},0).wait(1).to({scaleX:0.3696,scaleY:0.3696,rotation:-122.591,x:0.3,y:-2.7},0).wait(1).to({scaleX:0.3673,scaleY:0.3673,rotation:-125.6558,x:0.2},0).wait(1).to({scaleX:0.3651,scaleY:0.3651,rotation:-128.7206,x:0.1,y:-2.6},0).wait(1).to({scaleX:0.3628,scaleY:0.3628,rotation:-131.7854,x:0,y:-2.55},0).wait(1).to({scaleX:0.3606,scaleY:0.3606,rotation:-134.8501,x:-0.05,y:-2.5},0).wait(1).to({scaleX:0.3583,scaleY:0.3583,rotation:-137.9149,x:-0.2,y:-2.45},0).wait(1).to({scaleX:0.3561,scaleY:0.3561,rotation:-140.9797,x:-0.25,y:-2.4},0).wait(1).to({scaleX:0.3538,scaleY:0.3538,rotation:-144.0445,x:-0.3,y:-2.3},0).wait(1).to({scaleX:0.3516,scaleY:0.3516,rotation:-147.1092,x:-0.35,y:-2.25},0).wait(1).to({scaleX:0.3493,scaleY:0.3493,rotation:-150.174,y:-2.15},0).wait(1).to({scaleX:0.3471,scaleY:0.3471,rotation:-153.2388,x:-0.45},0).wait(1).to({scaleX:0.3448,scaleY:0.3448,rotation:-156.3036,x:-0.5,y:-2.05},0).wait(1).to({scaleX:0.3426,scaleY:0.3426,rotation:-159.3683,x:-0.55,y:-2},0).wait(1).to({scaleX:0.3403,scaleY:0.3403,rotation:-162.4331,y:-1.9},0).wait(1).to({scaleX:0.3381,scaleY:0.3381,rotation:-165.4979,x:-0.6,y:-1.8},0).wait(1).to({scaleX:0.3358,scaleY:0.3358,rotation:-168.5627,x:-0.65,y:-1.75},0).wait(1).to({scaleX:0.3336,scaleY:0.3336,rotation:-171.6274,x:-0.7,y:-1.65},0).wait(1).to({scaleX:0.3313,scaleY:0.3313,rotation:-174.6922,x:-0.65,y:-1.6},0).wait(1).to({scaleX:0.3291,scaleY:0.3291,rotation:-177.757,y:-1.5},0).wait(1));

	// circles
	this.instance_3 = new lib.Symbol2();
	this.instance_3.setTransform(0.9,-1.1,1,1,0,0,0,109.5,204.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1).to({scaleX:1.0017,scaleY:1.0017,x:0.95,y:-1.05},0).wait(1).to({scaleX:1.0034,scaleY:1.0034,x:0.9},0).wait(1).to({scaleX:1.0051,scaleY:1.0051},0).wait(1).to({scaleX:1.0067,scaleY:1.0067,x:0.95},0).wait(1).to({scaleX:1.0084,scaleY:1.0084,x:0.9,y:-1.1},0).wait(1).to({scaleX:1.0101,scaleY:1.0101},0).wait(1).to({scaleX:1.0118,scaleY:1.0118,x:0.95},0).wait(1).to({scaleX:1.0135,scaleY:1.0135,x:0.9},0).wait(1).to({scaleX:1.0152,scaleY:1.0152},0).wait(1).to({scaleX:1.0168,scaleY:1.0168,x:0.95,y:-1.05},0).wait(1).to({scaleX:1.0185,scaleY:1.0185},0).wait(1).to({scaleX:1.0202,scaleY:1.0202,x:0.9},0).wait(1).to({scaleX:1.0219,scaleY:1.0219,x:0.95},0).wait(1).to({scaleX:1.0236,scaleY:1.0236,y:-1.1},0).wait(1).to({scaleX:1.0253,scaleY:1.0253,x:0.9},0).wait(1).to({scaleX:1.0269,scaleY:1.0269,x:0.95},0).wait(1).to({scaleX:1.0286,scaleY:1.0286},0).wait(1).to({scaleX:1.0303,scaleY:1.0303,x:0.9},0).wait(1).to({scaleX:1.032,scaleY:1.032,y:-1.05},0).wait(1).to({scaleX:1.0337,scaleY:1.0337,x:0.95},0).wait(1).to({scaleX:1.0354,scaleY:1.0354,x:0.9},0).wait(1).to({scaleX:1.037,scaleY:1.037},0).wait(1).to({scaleX:1.0387,scaleY:1.0387,x:0.95,y:-1.1},0).wait(1).to({scaleX:1.0404,scaleY:1.0404,x:0.9},0).wait(1).to({scaleX:1.0421,scaleY:1.0421},0).wait(1).to({scaleX:1.0438,scaleY:1.0438,x:0.95},0).wait(1).to({scaleX:1.0455,scaleY:1.0455},0).wait(1).to({scaleX:1.0471,scaleY:1.0471,x:0.9,y:-1.05},0).wait(1).to({scaleX:1.0488,scaleY:1.0488,x:0.95},0).wait(1).to({scaleX:1.0505,scaleY:1.0505},0).wait(1).to({scaleX:1.0487,scaleY:1.0487,y:-1.1},0).wait(1).to({scaleX:1.0469,scaleY:1.0469,y:-1.05},0).wait(1).to({scaleX:1.0451,scaleY:1.0451},0).wait(1).to({scaleX:1.0433,scaleY:1.0433,y:-1.1},0).wait(1).to({scaleX:1.0415,scaleY:1.0415,y:-1.05},0).wait(1).to({scaleX:1.0397,scaleY:1.0397,y:-1.1},0).wait(1).to({scaleX:1.0379,scaleY:1.0379},0).wait(1).to({scaleX:1.0361,scaleY:1.0361,y:-1.05},0).wait(1).to({scaleX:1.0343,scaleY:1.0343,x:0.9,y:-1.1},0).wait(1).to({scaleX:1.0325,scaleY:1.0325,y:-1.05},0).wait(1).to({scaleX:1.0307,scaleY:1.0307,y:-1.1},0).wait(1).to({scaleX:1.0289,scaleY:1.0289},0).wait(1).to({scaleX:1.0271,scaleY:1.0271,y:-1.05},0).wait(1).to({scaleX:1.0253,scaleY:1.0253,y:-1.1},0).wait(1).to({scaleX:1.0235,scaleY:1.0235,y:-1.05},0).wait(1).to({scaleX:1.0216,scaleY:1.0216},0).wait(1).to({scaleX:1.0198,scaleY:1.0198,y:-1.1},0).wait(1).to({scaleX:1.018,scaleY:1.018,y:-1.05},0).wait(1).to({scaleX:1.0162,scaleY:1.0162,x:0.95,y:-1.1},0).wait(1).to({scaleX:1.0144,scaleY:1.0144},0).wait(1).to({scaleX:1.0126,scaleY:1.0126,y:-1.05},0).wait(1).to({scaleX:1.0108,scaleY:1.0108,y:-1.1},0).wait(1).to({scaleX:1.009,scaleY:1.009,y:-1.05},0).wait(1).to({scaleX:1.0072,scaleY:1.0072,y:-1.1},0).wait(1).to({scaleX:1.0054,scaleY:1.0054},0).wait(1).to({scaleX:1.0036,scaleY:1.0036,y:-1.05},0).wait(1).to({scaleX:1.0018,scaleY:1.0018,y:-1.1},0).wait(1).to({scaleX:1,scaleY:1,x:0.9},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-188.9,-216,380,429.9);


(lib.ransom = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// lightUp
	this.instance = new lib.Symbol3();
	this.instance.setTransform(0.5,19.6,1,1,0,0,0,82.7,82.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({scaleX:0.993,scaleY:0.993,y:20.25},0).wait(1).to({scaleX:0.986,scaleY:0.986,x:0.55,y:20.95},0).wait(1).to({scaleX:0.979,scaleY:0.979,x:0.5,y:21.6},0).wait(1).to({scaleX:0.972,scaleY:0.972,x:0.55,y:22.3},0).wait(1).to({scaleX:0.965,scaleY:0.965,x:0.5,y:22.95},0).wait(1).to({scaleX:0.958,scaleY:0.958,x:0.55,y:23.65},0).wait(1).to({scaleX:0.9511,scaleY:0.9511,x:0.5,y:24.3},0).wait(1).to({scaleX:0.9441,scaleY:0.9441,y:24.95},0).wait(1).to({scaleX:0.9371,scaleY:0.9371,x:0.55,y:25.65},0).wait(1).to({scaleX:0.9301,scaleY:0.9301,x:0.5,y:26.3},0).wait(1).to({scaleX:0.9231,scaleY:0.9231,x:0.55,y:26.95},0).wait(1).to({scaleX:0.9161,scaleY:0.9161,x:0.5,y:27.6},0).wait(1).to({scaleX:0.9091,scaleY:0.9091,x:0.55,y:28.3},0).wait(1).to({scaleX:0.9021,scaleY:0.9021,x:0.5,y:28.95},0).wait(1).to({scaleX:0.8951,scaleY:0.8951,x:0.55,y:29.65},0).wait(1).to({scaleX:0.8881,scaleY:0.8881,x:0.5,y:30.3},0).wait(1).to({scaleX:0.8811,scaleY:0.8811,y:30.95},0).wait(1).to({scaleX:0.8741,scaleY:0.8741,x:0.55,y:31.65},0).wait(1).to({scaleX:0.8671,scaleY:0.8671,x:0.5,y:32.3},0).wait(1).to({scaleX:0.8601,scaleY:0.8601,x:0.55,y:33},0).wait(1).to({scaleX:0.8532,scaleY:0.8532,x:0.5,y:33.65},0).wait(1).to({scaleX:0.8462,scaleY:0.8462,x:0.55,y:34.3},0).wait(1).to({scaleX:0.8392,scaleY:0.8392,x:0.5,y:34.95},0).wait(25).to({scaleX:0.8459,scaleY:0.8459,y:34.3},0).wait(1).to({scaleX:0.8526,scaleY:0.8526,y:33.7},0).wait(1).to({scaleX:0.8593,scaleY:0.8593,y:33.05},0).wait(1).to({scaleX:0.866,scaleY:0.866,y:32.4},0).wait(1).to({scaleX:0.8727,scaleY:0.8727,y:31.75},0).wait(1).to({scaleX:0.8794,scaleY:0.8794,y:31.1},0).wait(1).to({scaleX:0.8861,scaleY:0.8861,x:0.55,y:30.5},0).wait(1).to({scaleX:0.8928,scaleY:0.8928,y:29.85},0).wait(1).to({scaleX:0.8995,scaleY:0.8995,y:29.25},0).wait(1).to({scaleX:0.9062,scaleY:0.9062,y:28.6},0).wait(1).to({scaleX:0.9129,scaleY:0.9129,y:27.95},0).wait(1).to({scaleX:0.9196,scaleY:0.9196,x:0.5,y:27.3},0).wait(1).to({scaleX:0.9263,scaleY:0.9263,y:26.65},0).wait(1).to({scaleX:0.933,scaleY:0.933,y:26},0).wait(1).to({scaleX:0.9397,scaleY:0.9397,y:25.35},0).wait(1).to({scaleX:0.9464,scaleY:0.9464,y:24.7},0).wait(1).to({scaleX:0.9531,scaleY:0.9531,y:24.1},0).wait(1).to({scaleX:0.9598,scaleY:0.9598,y:23.45},0).wait(1).to({scaleX:0.9665,scaleY:0.9665,x:0.55,y:22.85},0).wait(1).to({scaleX:0.9732,scaleY:0.9732,y:22.2},0).wait(1).to({scaleX:0.9799,scaleY:0.9799,y:21.55},0).wait(1).to({scaleX:0.9866,scaleY:0.9866,y:20.9},0).wait(1).to({scaleX:0.9933,scaleY:0.9933,y:20.25},0).wait(1).to({scaleX:1,scaleY:1,x:0.5,y:19.6},0).wait(1));

	// bag
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#DD5F27").s().p("AkCM8QhWgRhdgwQhQgoiBhWQjJiHATjHQAHhHAlhiQAuhtASgxQATgzAQhrQARhxAUg7QBHjZEPiwQBJgvCZgcQCTgbBKAQQCIAfBMAwQCPBaA+C8QAbBUA+CAQBTCsAQAmQBtD/gfDbQgXCZg1BNQgwBEhUAaQg2AQiBAKQiUAKhRARQikAhhkAHQglADghAAQhGAAg6gMg");
	this.shape.setTransform(3.9919,11.926);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#B84626").s().p("AhcBVQgIgKgDhHIgGhpQgEgggpggIgpgaQgigDgHgJQgHgIAPgKQAngXA1AOQAZAHBwgMQBegKAWAbQAWAbBCAFIAgADQAHACgPAHQgcAOgbAXIg4AyQgdAZgpCXQgUBLgPBHIg2ADQgniHgMgSg");
	this.shape_1.setTransform(1.7267,-84.5986);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(72));

	// lightBelow
	this.instance_1 = new lib.Symbol4();
	this.instance_1.setTransform(0.45,0.5,1,1,0,0,0,194.3,194.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({scaleX:0.993,scaleY:0.993,x:0.5,y:0.55},0).wait(1).to({scaleX:0.986,scaleY:0.986},0).wait(1).to({scaleX:0.979,scaleY:0.979,x:0.45,y:0.5},0).wait(1).to({scaleX:0.972,scaleY:0.972},0).wait(1).to({scaleX:0.965,scaleY:0.965},0).wait(1).to({scaleX:0.958,scaleY:0.958,x:0.5,y:0.55},0).wait(1).to({scaleX:0.9511,scaleY:0.9511},0).wait(1).to({scaleX:0.9441,scaleY:0.9441},0).wait(1).to({scaleX:0.9371,scaleY:0.9371,x:0.45,y:0.5},0).wait(1).to({scaleX:0.9301,scaleY:0.9301},0).wait(1).to({scaleX:0.9231,scaleY:0.9231},0).wait(1).to({scaleX:0.9161,scaleY:0.9161,x:0.5,y:0.55},0).wait(1).to({scaleX:0.9091,scaleY:0.9091},0).wait(1).to({scaleX:0.9021,scaleY:0.9021},0).wait(1).to({scaleX:0.8951,scaleY:0.8951,x:0.45,y:0.5},0).wait(1).to({scaleX:0.8881,scaleY:0.8881},0).wait(1).to({scaleX:0.8811,scaleY:0.8811},0).wait(1).to({scaleX:0.8741,scaleY:0.8741,x:0.5,y:0.55},0).wait(1).to({scaleX:0.8671,scaleY:0.8671},0).wait(1).to({scaleX:0.8601,scaleY:0.8601,x:0.45,y:0.5},0).wait(1).to({scaleX:0.8532,scaleY:0.8532},0).wait(1).to({scaleX:0.8462,scaleY:0.8462},0).wait(1).to({scaleX:0.8392,scaleY:0.8392},0).wait(25).to({scaleX:0.8459,scaleY:0.8459},0).wait(1).to({scaleX:0.8526,scaleY:0.8526},0).wait(1).to({scaleX:0.8593,scaleY:0.8593},0).wait(1).to({scaleX:0.866,scaleY:0.866},0).wait(1).to({scaleX:0.8727,scaleY:0.8727},0).wait(1).to({scaleX:0.8794,scaleY:0.8794},0).wait(1).to({scaleX:0.8861,scaleY:0.8861},0).wait(1).to({scaleX:0.8928,scaleY:0.8928},0).wait(1).to({scaleX:0.8995,scaleY:0.8995},0).wait(1).to({scaleX:0.9062,scaleY:0.9062},0).wait(1).to({scaleX:0.9129,scaleY:0.9129},0).wait(1).to({scaleX:0.9196,scaleY:0.9196},0).wait(1).to({scaleX:0.9263,scaleY:0.9263,x:0.5,y:0.55},0).wait(1).to({scaleX:0.933,scaleY:0.933},0).wait(1).to({scaleX:0.9397,scaleY:0.9397},0).wait(1).to({scaleX:0.9464,scaleY:0.9464},0).wait(1).to({scaleX:0.9531,scaleY:0.9531},0).wait(1).to({scaleX:0.9598,scaleY:0.9598},0).wait(1).to({scaleX:0.9665,scaleY:0.9665},0).wait(1).to({scaleX:0.9732,scaleY:0.9732},0).wait(1).to({scaleX:0.9799,scaleY:0.9799},0).wait(1).to({scaleX:0.9866,scaleY:0.9866},0).wait(1).to({scaleX:0.9933,scaleY:0.9933},0).wait(1).to({scaleX:1,scaleY:1,x:0.45,y:0.5},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-193.8,-193.8,388.6,388.6);


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
	this.instance.setTransform(-55.75,-21.05,0.9983,0.9983,-80.9918,0,0,37.6,-0.1);

	this.instance_1 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_1.setTransform(-1.5,118.5,0.9982,0.9982,-137.1452,0,0,6.4,-1.4);

	this.instance_2 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_2.setTransform(-7.05,111.6,0.9984,0.9984,-137.045,0,0,5.5,-8.7);

	this.instance_3 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_3.setTransform(-67.6,57.75,0.9983,0.9983,-138.3036,0,0,40.6,0.2);

	this.instance_4 = new lib.ch1_headcopy2("synched",0);
	this.instance_4.setTransform(-5,-79.15,0.999,0.999,-0.5925,0,0,-0.1,53);

	this.instance_5 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_5.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_6 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_6.setTransform(-32.3,190,0.9983,0.9983,23.0896,0,0,3,-53.5);

	this.instance_7 = new lib.ch1_neckcopy2("synched",0);
	this.instance_7.setTransform(-5.6,-58,0.999,0.999,-0.105,0,0,-1.2,8.8);

	this.instance_8 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_8.setTransform(-5.6,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_9 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_9.setTransform(38.9,186.55,0.998,0.998,-18.1867,0,0,2.7,-53);

	this.instance_10 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_10.setTransform(15.5,93.6,0.998,0.998,-16.8615,0,0,-1.6,2.1);

	this.instance_11 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_11.setTransform(98.85,-184.1,0.9984,0.9984,-107.1527,0,0,-4.9,3.6);

	this.instance_12 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_12.setTransform(93.85,-173.55,0.9985,0.9985,-83.3074,0,0,-6.4,8.2);

	this.instance_13 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_13.setTransform(74.25,-96.7,0.9984,0.9984,-74.9778,0,0,-39.6,0.2);

	this.instance_14 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_14.setTransform(47.55,-26.65,0.9985,0.9985,-68.6737,0,0,-31.4,-1.5);

	this.instance_15 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_15.setTransform(-20.55,91.9,0.9985,0.9985,4.7106,0,0,2,-46.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{regX:2,regY:-46.2,rotation:4.7106,x:-20.55,y:91.9,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9985,scaleY:0.9985,rotation:-68.6737,regY:-1.5,x:47.55,y:-26.65}},{t:this.instance_13,p:{regY:0.2,scaleX:0.9984,scaleY:0.9984,rotation:-74.9778,x:74.25,y:-96.7,regX:-39.6}},{t:this.instance_12,p:{regX:-6.4,scaleX:0.9985,scaleY:0.9985,rotation:-83.3074,x:93.85,y:-173.55}},{t:this.instance_11,p:{regX:-4.9,scaleX:0.9984,scaleY:0.9984,rotation:-107.1527,x:98.85,y:-184.1}},{t:this.instance_10,p:{regX:-1.6,scaleX:0.998,scaleY:0.998,rotation:-16.8615,x:15.5,y:93.6}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-18.1867,x:38.9,y:186.55,regX:2.7,regY:-53}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.2,rotation:-0.105,y:-58,x:-5.6}},{t:this.instance_6,p:{scaleX:0.9983,scaleY:0.9983,rotation:23.0896,x:-32.3,y:190}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-0.5925,x:-5,y:-79.15}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-138.3036,x:-67.6,y:57.75,regX:40.6,regY:0.2}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9984,scaleY:0.9984,rotation:-137.045,x:-7.05,y:111.6,regX:5.5}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-137.1452,x:-1.5,y:118.5,regX:6.4}},{t:this.instance,p:{rotation:-80.9918,x:-55.75,y:-21.05,scaleX:0.9983,scaleY:0.9983}}]}).to({state:[{t:this.instance_15,p:{regX:2.1,regY:-46.1,rotation:4.71,x:-20.4,y:92,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9984,scaleY:0.9984,rotation:-67.0111,regY:-1.5,x:47.55,y:-26.65}},{t:this.instance_13,p:{regY:0.4,scaleX:0.9983,scaleY:0.9983,rotation:-74.2587,x:76.35,y:-95.85,regX:-39.6}},{t:this.instance_12,p:{regX:-6.3,scaleX:0.9984,scaleY:0.9984,rotation:-82.5892,x:96.75,y:-172.5}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9983,scaleY:0.9983,rotation:-106.4337,x:101.85,y:-182.9}},{t:this.instance_10,p:{regX:-1.7,scaleX:0.9979,scaleY:0.9979,rotation:-16.8606,x:15.4,y:93.6}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-18.1862,x:38.85,y:186.5,regX:2.7,regY:-53}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.3,rotation:-0.1041,y:-57.95,x:-5.6}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:23.0893,x:-32.25,y:190}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-0.2538,x:-4.9,y:-79.15}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,rotation:-141.2885,x:-66.25,y:57.95,regX:40.6,regY:0.2}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-140.0298,x:-3,y:108.5,regX:5.5}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-140.1304,x:2.9,y:115.15,regX:6.4}},{t:this.instance,p:{rotation:-81.9256,x:-55.85,y:-21.15,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,regY:-46.1,rotation:4.71,x:-20.4,y:92,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9984,scaleY:0.9984,rotation:-65.3487,regY:-1.4,x:47.7,y:-26.55}},{t:this.instance_13,p:{regY:0.3,scaleX:0.9983,scaleY:0.9983,rotation:-73.5397,x:78.25,y:-94.9,regX:-39.6}},{t:this.instance_12,p:{regX:-6.3,scaleX:0.9984,scaleY:0.9984,rotation:-81.8689,x:99.7,y:-171.4}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9983,scaleY:0.9983,rotation:-105.7142,x:104.9,y:-181.75}},{t:this.instance_10,p:{regX:-1.7,scaleX:0.9979,scaleY:0.9979,rotation:-16.8606,x:15.4,y:93.6}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-18.1862,x:38.85,y:186.5,regX:2.7,regY:-53}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.3,rotation:-0.1041,y:-57.95,x:-5.6}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:23.0893,x:-32.25,y:190}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:0.0814,x:-4.9,y:-79.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,rotation:-144.2735,x:-64.95,y:58.1,regX:40.6,regY:0.2}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-143.0163,x:0.8,y:105.4,regX:5.5}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-143.1168,x:7.15,y:111.55,regX:6.4}},{t:this.instance,p:{rotation:-82.8611,x:-55.75,y:-21.2,scaleX:0.9982,scaleY:0.9982}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,regY:-46.1,rotation:4.71,x:-20.4,y:92,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9984,scaleY:0.9984,rotation:-63.686,regY:-1.5,x:47.5,y:-26.5}},{t:this.instance_13,p:{regY:0.3,scaleX:0.9983,scaleY:0.9983,rotation:-72.8205,x:80.2,y:-94.05,regX:-39.6}},{t:this.instance_12,p:{regX:-6.2,scaleX:0.9984,scaleY:0.9984,rotation:-81.1491,x:102.6,y:-170.35}},{t:this.instance_11,p:{regX:-4.9,scaleX:0.9983,scaleY:0.9983,rotation:-104.9963,x:107.95,y:-180.45}},{t:this.instance_10,p:{regX:-1.7,scaleX:0.9979,scaleY:0.9979,rotation:-16.8606,x:15.4,y:93.6}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-18.1862,x:38.85,y:186.5,regX:2.7,regY:-53}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.3,rotation:-0.1041,y:-57.95,x:-5.6}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:23.0893,x:-32.25,y:190}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:0.421,x:-4.9,y:-79.15}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,rotation:-147.2612,x:-63.65,y:58.25,regX:40.6,regY:0.2}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-146.0022,x:4.45,y:102.05,regX:5.5}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-146.1022,x:11.05,y:107.95,regX:6.4}},{t:this.instance,p:{rotation:-83.7959,x:-55.75,y:-21.2,scaleX:0.9982,scaleY:0.9982}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,regY:-46.1,rotation:4.71,x:-20.4,y:92,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9984,scaleY:0.9984,rotation:-62.0219,regY:-1.5,x:47.55,y:-26.5}},{t:this.instance_13,p:{regY:0.3,scaleX:0.9983,scaleY:0.9983,rotation:-72.1007,x:82.15,y:-93,regX:-39.6}},{t:this.instance_12,p:{regX:-6.3,scaleX:0.9983,scaleY:0.9983,rotation:-80.4304,x:105.45,y:-168.95}},{t:this.instance_11,p:{regX:-4.9,scaleX:0.9983,scaleY:0.9983,rotation:-104.2777,x:111,y:-179.05}},{t:this.instance_10,p:{regX:-1.7,scaleX:0.9979,scaleY:0.9979,rotation:-16.8606,x:15.4,y:93.6}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-18.1862,x:38.8,y:186.5,regX:2.7,regY:-53}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.3,rotation:-0.1033,y:-57.95,x:-5.6}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:23.0893,x:-32.25,y:190}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:0.7615,x:-4.9,y:-79.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,rotation:-150.2455,x:-62.35,y:58.35,regX:40.6,regY:0.2}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-148.9873,x:7.95,y:98.45,regX:5.5}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-149.0878,x:14.85,y:104,regX:6.4}},{t:this.instance,p:{rotation:-84.7298,x:-55.8,y:-21.15,scaleX:0.9982,scaleY:0.9982}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,regY:-46.1,rotation:4.7092,x:-20.4,y:92,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9984,scaleY:0.9984,rotation:-60.3597,regY:-1.5,x:47.6,y:-26.5}},{t:this.instance_13,p:{regY:0.3,scaleX:0.9983,scaleY:0.9983,rotation:-71.3812,x:84.05,y:-91.95,regX:-39.6}},{t:this.instance_12,p:{regX:-6.3,scaleX:0.9984,scaleY:0.9984,rotation:-79.7111,x:108.35,y:-167.6}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9983,scaleY:0.9983,rotation:-103.5566,x:113.95,y:-177.7}},{t:this.instance_10,p:{regX:-1.7,scaleX:0.9979,scaleY:0.9979,rotation:-16.8606,x:15.4,y:93.6}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-18.1862,x:38.8,y:186.5,regX:2.7,regY:-53}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.3,rotation:-0.1033,y:-57.95,x:-5.6}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:23.0893,x:-32.25,y:190}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:1.1002,x:-4.85,y:-79.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,rotation:-153.2321,x:-61.05,y:58.35,regX:40.7,regY:0.2}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-151.9728,x:11.2,y:94.8,regX:5.5}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-152.0739,x:18.45,y:100.1,regX:6.4}},{t:this.instance,p:{rotation:-85.6641,x:-55.75,y:-21.2,scaleX:0.9982,scaleY:0.9982}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,regY:-46.1,rotation:4.7092,x:-20.4,y:92,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9984,scaleY:0.9984,rotation:-58.6958,regY:-1.5,x:47.55,y:-26.55}},{t:this.instance_13,p:{regY:0.4,scaleX:0.9983,scaleY:0.9983,rotation:-70.6625,x:86.05,y:-90.85,regX:-39.6}},{t:this.instance_12,p:{regX:-6.2,scaleX:0.9984,scaleY:0.9984,rotation:-78.9911,x:111.2,y:-166.3}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9983,scaleY:0.9983,rotation:-102.839,x:116.9,y:-176.25}},{t:this.instance_10,p:{regX:-1.7,scaleX:0.9979,scaleY:0.9979,rotation:-16.8606,x:15.4,y:93.6}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-18.1862,x:38.8,y:186.5,regX:2.7,regY:-53}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.3,rotation:-0.1033,y:-57.95,x:-5.6}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:23.0893,x:-32.25,y:190}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:1.439,x:-4.9,y:-79.15}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-156.2177,x:-59.7,y:58.45,regX:40.6,regY:0.2}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-154.959,x:14.35,y:91.1,regX:5.5}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-155.06,x:21.8,y:95.9,regX:6.4}},{t:this.instance,p:{rotation:-86.5999,x:-55.7,y:-21.2,scaleX:0.9982,scaleY:0.9982}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,regY:-46.1,rotation:4.7092,x:-20.4,y:91.95,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9984,scaleY:0.9984,rotation:-57.0334,regY:-1.5,x:47.55,y:-26.5}},{t:this.instance_13,p:{regY:0.3,scaleX:0.9983,scaleY:0.9983,rotation:-69.9425,x:87.8,y:-89.75,regX:-39.6}},{t:this.instance_12,p:{regX:-6.3,scaleX:0.9984,scaleY:0.9984,rotation:-78.2722,x:113.9,y:-164.75}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9983,scaleY:0.9983,rotation:-102.1187,x:119.85,y:-174.7}},{t:this.instance_10,p:{regX:-1.7,scaleX:0.9979,scaleY:0.9979,rotation:-16.8606,x:15.4,y:93.55}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-18.1862,x:38.8,y:186.5,regX:2.7,regY:-53}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.3,rotation:-0.1033,y:-57.95,x:-5.6}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:23.0893,x:-32.2,y:190}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:1.7779,x:-4.9,y:-79.15}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-159.2042,x:-58.55,y:58.5,regX:40.7,regY:0.2}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-157.9439,x:17.25,y:87.3,regX:5.5}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-158.0459,x:25,y:91.65,regX:6.4}},{t:this.instance,p:{rotation:-87.533,x:-55.8,y:-21.2,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,regY:-46.1,rotation:4.7092,x:-20.4,y:91.95,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9984,scaleY:0.9984,rotation:-55.3698,regY:-1.6,x:47.5,y:-26.55}},{t:this.instance_13,p:{regY:0.3,scaleX:0.9983,scaleY:0.9983,rotation:-69.2229,x:89.55,y:-88.75,regX:-39.5}},{t:this.instance_12,p:{regX:-6.3,scaleX:0.9983,scaleY:0.9983,rotation:-77.5539,x:116.7,y:-163.25}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9983,scaleY:0.9983,rotation:-101.4013,x:122.7,y:-173.1}},{t:this.instance_10,p:{regX:-1.7,scaleX:0.9979,scaleY:0.9979,rotation:-16.8606,x:15.4,y:93.55}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-18.1862,x:38.8,y:186.5,regX:2.7,regY:-53}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.3,rotation:-0.1024,y:-57.95,x:-5.55}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:23.0893,x:-32.2,y:190}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:2.1185,x:-4.85,y:-79.15}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-162.1899,x:-57.15,y:58.5,regX:40.7,regY:0.2}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-160.9309,x:20,y:83.2,regX:5.5}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-161.0313,x:27.85,y:87.2,regX:6.4}},{t:this.instance,p:{rotation:-88.4689,x:-55.75,y:-21.2,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,regY:-46.1,rotation:4.7092,x:-20.4,y:91.95,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9984,scaleY:0.9984,rotation:-53.707,regY:-1.5,x:47.5,y:-26.55}},{t:this.instance_13,p:{regY:0.4,scaleX:0.9983,scaleY:0.9983,rotation:-68.504,x:91.4,y:-87.25,regX:-39.6}},{t:this.instance_12,p:{regX:-6.2,scaleX:0.9983,scaleY:0.9983,rotation:-76.8335,x:119.4,y:-161.65}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9983,scaleY:0.9983,rotation:-100.6811,x:125.6,y:-171.4}},{t:this.instance_10,p:{regX:-1.7,scaleX:0.9979,scaleY:0.9979,rotation:-16.8606,x:15.4,y:93.55}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-18.1862,x:38.75,y:186.5,regX:2.7,regY:-53}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.3,rotation:-0.1024,y:-57.95,x:-5.55}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:23.0893,x:-32.2,y:189.95}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:2.4583,x:-4.85,y:-79.05}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,rotation:-165.175,x:-55.85,y:58.5,regX:40.7,regY:0.2}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-163.916,x:22.5,y:79.25,regX:5.5}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-164.0183,x:30.55,y:82.85,regX:6.4}},{t:this.instance,p:{rotation:-89.4027,x:-55.7,y:-21.25,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,regY:-46.1,rotation:4.7083,x:-20.4,y:91.95,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9984,scaleY:0.9984,rotation:-52.0437,regY:-1.5,x:47.45,y:-26.5}},{t:this.instance_13,p:{regY:0.3,scaleX:0.9983,scaleY:0.9983,rotation:-67.7854,x:93.1,y:-86.05,regX:-39.6}},{t:this.instance_12,p:{regX:-6.3,scaleX:0.9984,scaleY:0.9984,rotation:-76.1143,x:122.05,y:-159.95}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9983,scaleY:0.9983,rotation:-99.9611,x:128.35,y:-169.65}},{t:this.instance_10,p:{regX:-1.7,scaleX:0.9979,scaleY:0.9979,rotation:-16.8606,x:15.4,y:93.55}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-18.1862,x:38.75,y:186.5,regX:2.7,regY:-53}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.3,rotation:-0.1024,y:-57.95,x:-5.55}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:23.0893,x:-32.2,y:189.95}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:2.7966,x:-4.9,y:-79.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-168.1619,x:-54.4,y:58.6,regX:40.6,regY:0.2}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-166.9024,x:24.75,y:75.05,regX:5.5}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-167.0031,x:33.1,y:78.25,regX:6.4}},{t:this.instance,p:{rotation:-90.3328,x:-55.75,y:-21.25,scaleX:0.9982,scaleY:0.9982}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,regY:-46.1,rotation:4.7083,x:-20.4,y:91.95,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9984,scaleY:0.9984,rotation:-50.3807,regY:-1.5,x:47.55,y:-26.55}},{t:this.instance_13,p:{regY:0.3,scaleX:0.9983,scaleY:0.9983,rotation:-67.066,x:94.85,y:-84.8,regX:-39.5}},{t:this.instance_12,p:{regX:-6.3,scaleX:0.9984,scaleY:0.9984,rotation:-75.3939,x:124.65,y:-158.25}},{t:this.instance_11,p:{regX:-4.9,scaleX:0.9983,scaleY:0.9983,rotation:-99.2416,x:131.1,y:-167.75}},{t:this.instance_10,p:{regX:-1.7,scaleX:0.9979,scaleY:0.9979,rotation:-16.8606,x:15.4,y:93.55}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-18.1862,x:38.75,y:186.5,regX:2.7,regY:-53}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.3,rotation:-0.1015,y:-57.95,x:-5.55}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:23.0893,x:-32.2,y:189.95}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:3.1366,x:-4.85,y:-79.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-171.1474,x:-53.1,y:58.45,regX:40.6,regY:0.2}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-169.8879,x:26.9,y:70.95,regX:5.5}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-169.988,x:35.25,y:73.65,regX:6.4}},{t:this.instance,p:{rotation:-91.2683,x:-55.8,y:-21.2,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,regY:-46.1,rotation:4.7083,x:-20.4,y:91.95,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9984,scaleY:0.9984,rotation:-48.7165,regY:-1.6,x:47.4,y:-26.55}},{t:this.instance_13,p:{regY:0.2,scaleX:0.9983,scaleY:0.9983,rotation:-66.3458,x:96.3,y:-83.3,regX:-39.6}},{t:this.instance_12,p:{regX:-6.2,scaleX:0.9984,scaleY:0.9984,rotation:-74.6759,x:127.25,y:-156.6}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9983,scaleY:0.9983,rotation:-98.5227,x:133.75,y:-165.95}},{t:this.instance_10,p:{regX:-1.7,scaleX:0.9979,scaleY:0.9979,rotation:-16.8606,x:15.35,y:93.5}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-18.1862,x:38.75,y:186.5,regX:2.7,regY:-53}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.3,rotation:-0.1015,y:-57.95,x:-5.55}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:23.0897,x:-32.15,y:189.95}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:3.475,x:-4.9,y:-79.05}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-174.1333,x:-51.8,y:58.4,regX:40.6,regY:0.2}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-172.8741,x:28.7,y:66.65,regX:5.5}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-172.9741,x:37.2,y:68.95,regX:6.4}},{t:this.instance,p:{rotation:-92.2023,x:-55.8,y:-21.2,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,regY:-46.1,rotation:4.7083,x:-20.4,y:91.95,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9984,scaleY:0.9984,rotation:-47.0549,regY:-1.5,x:47.45,y:-26.45}},{t:this.instance_13,p:{regY:0.2,scaleX:0.9983,scaleY:0.9983,rotation:-65.6264,x:97.9,y:-81.8,regX:-39.6}},{t:this.instance_12,p:{regX:-6.3,scaleX:0.9984,scaleY:0.9984,rotation:-73.9558,x:129.75,y:-154.6}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9983,scaleY:0.9983,rotation:-97.8035,x:136.4,y:-164.05}},{t:this.instance_10,p:{regX:-1.7,scaleX:0.9979,scaleY:0.9979,rotation:-16.8606,x:15.35,y:93.5}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-18.1862,x:38.7,y:186.5,regX:2.7,regY:-53}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.3,rotation:-0.1015,y:-57.95,x:-5.55}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:23.0897,x:-32.15,y:189.95}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:3.8162,x:-4.85,y:-79.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-177.1201,x:-50.65,y:58.3,regX:40.7,regY:0.2}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-175.8594,x:30.25,y:62.35,regX:5.5}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-175.9604,x:39,y:64.2,regX:6.4}},{t:this.instance,p:{rotation:-93.1361,x:-55.75,y:-21.3,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,regY:-46.1,rotation:4.7083,x:-20.4,y:91.95,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9984,scaleY:0.9984,rotation:-45.3913,regY:-1.5,x:47.5,y:-26.5}},{t:this.instance_13,p:{regY:0.3,scaleX:0.9983,scaleY:0.9983,rotation:-64.9061,x:99.55,y:-80.3,regX:-39.6}},{t:this.instance_12,p:{regX:-6.2,scaleX:0.9983,scaleY:0.9983,rotation:-73.2371,x:132.25,y:-152.75}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9983,scaleY:0.9983,rotation:-97.0845,x:139,y:-162.05}},{t:this.instance_10,p:{regX:-1.7,scaleX:0.9979,scaleY:0.9979,rotation:-16.8603,x:15.35,y:93.5}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-18.1862,x:38.7,y:186.5,regX:2.7,regY:-53}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.3,rotation:-0.1015,y:-57.95,x:-5.5}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:23.0897,x:-32.15,y:189.95}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:4.1548,x:-4.85,y:-79.05}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:179.8993,x:-49.25,y:58.2,regX:40.6,regY:0.2}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-178.8466,x:31.75,y:58.15,regX:5.5}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-178.9462,x:40.45,y:59.4,regX:6.4}},{t:this.instance,p:{rotation:-94.0715,x:-55.75,y:-21.25,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,regY:-46.1,rotation:4.6995,x:-20.4,y:91.95,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9984,scaleY:0.9984,rotation:-46.949,regY:-1.5,x:47.45,y:-26.45}},{t:this.instance_13,p:{regY:0.3,scaleX:0.9983,scaleY:0.9983,rotation:-65.5837,x:98.05,y:-81.75,regX:-39.6}},{t:this.instance_12,p:{regX:-6.3,scaleX:0.9984,scaleY:0.9984,rotation:-73.9314,x:129.85,y:-154.45}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9983,scaleY:0.9983,rotation:-97.7936,x:136.6,y:-163.9}},{t:this.instance_10,p:{regX:-1.7,scaleX:0.9979,scaleY:0.9979,rotation:-16.8445,x:15.4,y:93.5}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-18.1585,x:38.7,y:186.5,regX:2.7,regY:-53}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.3,rotation:-0.0954,y:-57.95,x:-5.55}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:23.0783,x:-32.15,y:189.9}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:3.8399,x:-4.9,y:-79.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-177.3051,x:-50.45,y:58.35,regX:40.6,regY:0.2}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-176.0526,x:30.4,y:62.15,regX:5.5}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-176.1457,x:39.1,y:63.85,regX:6.4}},{t:this.instance,p:{rotation:-93.1852,x:-55.8,y:-21.25,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regX:2,regY:-46.1,rotation:4.6917,x:-20.55,y:92,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9984,scaleY:0.9984,rotation:-48.508,regY:-1.5,x:47.55,y:-26.5}},{t:this.instance_13,p:{regY:0.2,scaleX:0.9983,scaleY:0.9983,rotation:-66.2607,x:96.55,y:-83.1,regX:-39.6}},{t:this.instance_12,p:{regX:-6.2,scaleX:0.9984,scaleY:0.9984,rotation:-74.6251,x:127.55,y:-156.4}},{t:this.instance_11,p:{regX:-4.9,scaleX:0.9983,scaleY:0.9983,rotation:-98.5024,x:134.15,y:-165.65}},{t:this.instance_10,p:{regX:-1.7,scaleX:0.9979,scaleY:0.9979,rotation:-16.8279,x:15.35,y:93.55}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-18.1299,x:38.7,y:186.5,regX:2.7,regY:-53}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.3,rotation:-0.0884,y:-57.95,x:-5.6}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:23.0666,x:-32.2,y:190}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:3.5233,x:-4.9,y:-79.05}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-174.503,x:-51.85,y:58.4,regX:40.7,regY:0.2}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-173.257,x:28.85,y:66.2,regX:5.5}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-173.3447,x:37.45,y:68.35,regX:6.4}},{t:this.instance,p:{rotation:-92.2996,x:-55.75,y:-21.25,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regX:2,regY:-46.1,rotation:4.6829,x:-20.5,y:91.95,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9984,scaleY:0.9984,rotation:-50.0654,regY:-1.5,x:47.5,y:-26.45}},{t:this.instance_13,p:{regY:0.4,scaleX:0.9983,scaleY:0.9983,rotation:-66.9377,x:95.1,y:-84.35,regX:-39.6}},{t:this.instance_12,p:{regX:-6.3,scaleX:0.9984,scaleY:0.9984,rotation:-75.3198,x:125.1,y:-157.95}},{t:this.instance_11,p:{regX:-4.9,scaleX:0.9983,scaleY:0.9983,rotation:-99.2107,x:131.6,y:-167.4}},{t:this.instance_10,p:{regX:-1.7,scaleX:0.9979,scaleY:0.9979,rotation:-16.8126,x:15.4,y:93.6}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-18.102,x:38.5,y:186.6,regX:2.6,regY:-53}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.3,rotation:-0.0814,y:-57.95,x:-5.6}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:23.0552,x:-32.2,y:190}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:3.2085,x:-4.85,y:-79.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-171.701,x:-52.95,y:58.45,regX:40.6,regY:0.2}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-170.4631,x:27.2,y:70.2,regX:5.5}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-170.5436,x:35.55,y:72.75,regX:6.4}},{t:this.instance,p:{rotation:-91.4137,x:-55.75,y:-21.2,scaleX:0.9982,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regX:2,regY:-46.1,rotation:4.674,x:-20.5,y:91.9,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9984,scaleY:0.9984,rotation:-51.6215,regY:-1.5,x:47.55,y:-26.5}},{t:this.instance_13,p:{regY:0.3,scaleX:0.9983,scaleY:0.9983,rotation:-67.6144,x:93.5,y:-85.7,regX:-39.6}},{t:this.instance_12,p:{regX:-6.3,scaleX:0.9984,scaleY:0.9984,rotation:-76.0141,x:122.75,y:-159.5}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9983,scaleY:0.9983,rotation:-99.9193,x:129.05,y:-169.2}},{t:this.instance_10,p:{regX:-1.7,scaleX:0.9979,scaleY:0.9979,rotation:-16.796,x:15.4,y:93.6}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-18.0729,x:38.6,y:186.4,regX:2.7,regY:-53.1}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.3,rotation:-0.0744,y:-57.95,x:-5.6}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:23.0438,x:-32.15,y:190}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:2.893,x:-4.85,y:-79.15}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-168.9001,x:-54.1,y:58.5,regX:40.6,regY:0.2}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-167.67,x:25.3,y:74.1,regX:5.5}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-167.7435,x:33.55,y:77.15,regX:6.4}},{t:this.instance,p:{rotation:-90.5281,x:-55.75,y:-21.25,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regX:2,regY:-46.2,rotation:4.6661,x:-20.45,y:91.8,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9984,scaleY:0.9984,rotation:-53.1795,regY:-1.5,x:47.5,y:-26.5}},{t:this.instance_13,p:{regY:0.4,scaleX:0.9983,scaleY:0.9983,rotation:-68.2918,x:91.95,y:-86.9,regX:-39.6}},{t:this.instance_12,p:{regX:-6.3,scaleX:0.9983,scaleY:0.9983,rotation:-76.7095,x:120.15,y:-161.15}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9983,scaleY:0.9983,rotation:-100.6287,x:126.4,y:-170.85}},{t:this.instance_10,p:{regX:-1.7,scaleX:0.9979,scaleY:0.9979,rotation:-16.7788,x:15.4,y:93.6}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-18.0452,x:38.6,y:186.4,regX:2.7,regY:-53.1}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.3,rotation:-0.0674,y:-57.95,x:-5.6}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:23.0324,x:-32.15,y:189.95}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:2.5784,x:-4.9,y:-79.05}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-166.0974,x:-55.45,y:58.5,regX:40.6,regY:0.2}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-164.8751,x:23.2,y:78,regX:5.5}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-164.9427,x:31.4,y:81.4,regX:6.3}},{t:this.instance,p:{rotation:-89.647,x:-55.7,y:-21.25,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regX:2,regY:-46.2,rotation:4.6583,x:-20.5,y:91.8,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9984,scaleY:0.9984,rotation:-54.7372,regY:-1.4,x:47.55,y:-26.45}},{t:this.instance_13,p:{regY:0.4,scaleX:0.9983,scaleY:0.9983,rotation:-68.9681,x:90.3,y:-88.1,regX:-39.6}},{t:this.instance_12,p:{regX:-6.3,scaleX:0.9984,scaleY:0.9984,rotation:-77.4041,x:117.7,y:-162.55}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9983,scaleY:0.9983,rotation:-101.3367,x:123.75,y:-172.45}},{t:this.instance_10,p:{regX:-1.7,scaleX:0.9979,scaleY:0.9979,rotation:-16.7622,x:15.4,y:93.6}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-18.0166,x:38.6,y:186.55,regX:2.7,regY:-53}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.3,rotation:-0.0604,y:-58,x:-5.55}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:23.021,x:-32.1,y:190}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:2.263,x:-4.9,y:-79.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-163.296,x:-56.6,y:58.55,regX:40.6,regY:0.2}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-162.0824,x:20.95,y:81.75,regX:5.5}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-162.1412,x:28.8,y:85.65,regX:6.4}},{t:this.instance,p:{rotation:-88.7607,x:-55.8,y:-21.25,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regX:2,regY:-46.2,rotation:4.6503,x:-20.5,y:91.85,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9984,scaleY:0.9984,rotation:-56.2946,regY:-1.5,x:47.5,y:-26.5}},{t:this.instance_13,p:{regY:0.3,scaleX:0.9983,scaleY:0.9983,rotation:-69.645,x:88.6,y:-89.3,regX:-39.6}},{t:this.instance_12,p:{regX:-6.3,scaleX:0.9983,scaleY:0.9984,rotation:-78.0977,x:115.1,y:-164.05}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9983,scaleY:0.9983,rotation:-102.0454,x:121.05,y:-174}},{t:this.instance_10,p:{regX:-1.7,scaleX:0.9979,scaleY:0.9979,rotation:-16.7458,x:15.4,y:93.6}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-17.9881,x:38.55,y:186.55,regX:2.7,regY:-53}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.3,rotation:-0.0534,y:-58,x:-5.55}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:23.0096,x:-32.15,y:190.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:1.9477,x:-4.85,y:-79.15}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-160.4943,x:-57.95,y:58.5,regX:40.6,regY:0.2}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-159.2877,x:18.35,y:85.55,regX:5.5}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-159.3422,x:26.15,y:89.75,regX:6.4}},{t:this.instance,p:{rotation:-87.8749,x:-55.75,y:-21.2,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,regY:-46.2,rotation:4.6415,x:-20.35,y:91.85,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9984,scaleY:0.9984,rotation:-57.8528,regY:-1.5,x:47.55,y:-26.5}},{t:this.instance_13,p:{regY:0.3,scaleX:0.9983,scaleY:0.9983,rotation:-70.3218,x:86.9,y:-90.35,regX:-39.6}},{t:this.instance_12,p:{regX:-6.3,scaleX:0.9983,scaleY:0.9983,rotation:-78.7921,x:112.6,y:-165.55}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9983,scaleY:0.9983,rotation:-102.7547,x:118.35,y:-175.55}},{t:this.instance_10,p:{regX:-1.7,scaleX:0.9979,scaleY:0.9979,rotation:-16.7303,x:15.4,y:93.65}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-17.9593,x:38.6,y:186.55,regX:2.7,regY:-53}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.3,rotation:-0.0473,y:-58,x:-5.6}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:22.9979,x:-32.15,y:190.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:1.6316,x:-4.85,y:-79.15}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-157.6931,x:-59.15,y:58.45,regX:40.6,regY:0.2}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-156.4936,x:15.7,y:89.2,regX:5.5}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-156.5397,x:23.4,y:93.85,regX:6.3}},{t:this.instance,p:{rotation:-86.9885,x:-55.75,y:-21.25,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regX:2,regY:-46.2,rotation:4.6327,x:-20.55,y:91.85,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9984,scaleY:0.9984,rotation:-59.4106,regY:-1.5,x:47.55,y:-26.55}},{t:this.instance_13,p:{regY:0.4,scaleX:0.9983,scaleY:0.9983,rotation:-70.9973,x:85.25,y:-91.3,regX:-39.6}},{t:this.instance_12,p:{regX:-6.3,scaleX:0.9983,scaleY:0.9983,rotation:-79.4868,x:109.9,y:-166.85}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9983,scaleY:0.9983,rotation:-103.4623,x:115.6,y:-176.95}},{t:this.instance_10,p:{regX:-1.7,scaleX:0.9979,scaleY:0.9979,rotation:-16.7137,x:15.45,y:93.65}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-17.931,x:38.45,y:186.65,regX:2.6,regY:-53}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.3,rotation:-0.0403,y:-58,x:-5.6}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:22.9869,x:-32.05,y:190}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:1.3164,x:-4.8,y:-79.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,rotation:-154.8925,x:-60.4,y:58.45,regX:40.6,regY:0.2}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-153.6989,x:12.95,y:92.8,regX:5.5}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-153.7409,x:20.25,y:97.7,regX:6.4}},{t:this.instance,p:{rotation:-86.1023,x:-55.8,y:-21.2,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regX:2,regY:-46.2,rotation:4.6248,x:-20.5,y:91.85,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9984,scaleY:0.9984,rotation:-60.9674,regY:-1.5,x:47.65,y:-26.7}},{t:this.instance_13,p:{regY:0.4,scaleX:0.9983,scaleY:0.9983,rotation:-71.6747,x:83.4,y:-92.35,regX:-39.6}},{t:this.instance_12,p:{regX:-6.3,scaleX:0.9983,scaleY:0.9983,rotation:-80.1806,x:107.25,y:-168.1}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9983,scaleY:0.9983,rotation:-104.172,x:112.8,y:-178.35}},{t:this.instance_10,p:{regX:-1.7,scaleX:0.9979,scaleY:0.9979,rotation:-16.6965,x:15.45,y:93.65}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-17.9025,x:38.5,y:186.5,regX:2.7,regY:-53.1}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.3,rotation:-0.0333,y:-58,x:-5.6}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:22.9751,x:-32.05,y:190}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:1.0013,x:-4.85,y:-79.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,rotation:-152.0894,x:-61.55,y:58.35,regX:40.6,regY:0.2}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-150.9057,x:9.9,y:96.3,regX:5.5}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-150.94,x:16.95,y:101.55,regX:6.4}},{t:this.instance,p:{rotation:-85.2169,x:-55.8,y:-21.2,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regX:2,regY:-46.2,rotation:4.6161,x:-20.55,y:91.85,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9984,scaleY:0.9984,rotation:-62.526,regY:-1.6,x:47.45,y:-26.6}},{t:this.instance_13,p:{regY:0.4,scaleX:0.9983,scaleY:0.9983,rotation:-72.3524,x:81.6,y:-93.35,regX:-39.6}},{t:this.instance_12,p:{regX:-6.3,scaleX:0.9984,scaleY:0.9984,rotation:-80.875,x:104.6,y:-169.4}},{t:this.instance_11,p:{regX:-4.9,scaleX:0.9983,scaleY:0.9983,rotation:-104.8806,x:110,y:-179.5}},{t:this.instance_10,p:{regX:-1.7,scaleX:0.9979,scaleY:0.9979,rotation:-16.6804,x:15.4,y:93.6}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-17.8739,x:38.5,y:186.5,regX:2.7,regY:-53.1}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.3,rotation:-0.0263,y:-58,x:-5.6}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:22.9637,x:-32.05,y:190.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:0.6862,x:-4.85,y:-79.15}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,rotation:-149.2886,x:-62.9,y:58.35,regX:40.6,regY:0.1}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-148.1107,x:6.8,y:99.7,regX:5.4}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-148.1391,x:13.55,y:105.35,regX:6.4}},{t:this.instance,p:{rotation:-84.3313,x:-55.8,y:-21.15,scaleX:0.9982,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regX:2,regY:-46.2,rotation:4.6082,x:-20.55,y:91.85,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9984,scaleY:0.9984,rotation:-64.0839,regY:-1.5,x:47.55,y:-26.5}},{t:this.instance_13,p:{regY:0.3,scaleX:0.9983,scaleY:0.9983,rotation:-73.0277,x:79.7,y:-94.2,regX:-39.6}},{t:this.instance_12,p:{regX:-6.2,scaleX:0.9984,scaleY:0.9984,rotation:-81.5698,x:101.9,y:-170.65}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9983,scaleY:0.9983,rotation:-105.5885,x:107.15,y:-180.9}},{t:this.instance_10,p:{regX:-1.7,scaleX:0.9979,scaleY:0.9979,rotation:-16.6632,x:15.4,y:93.6}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-17.8462,x:38.45,y:186.5,regX:2.7,regY:-53.1}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.3,rotation:-0.0193,y:-58,x:-5.55}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:22.9524,x:-32.05,y:190.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:0.3693,x:-4.9,y:-79.15}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-146.487,x:-64.2,y:58.2,regX:40.6,regY:0.1}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-145.3179,x:3.5,y:102.85,regX:5.4}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-145.3384,x:9.9,y:108.85,regX:6.4}},{t:this.instance,p:{rotation:-83.4452,x:-55.8,y:-21.15,scaleX:0.9982,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regX:2,regY:-46.2,rotation:4.5994,x:-20.5,y:91.85,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9984,scaleY:0.9984,rotation:-65.6422,regY:-1.5,x:47.55,y:-26.55}},{t:this.instance_13,p:{regY:0.3,scaleX:0.9983,scaleY:0.9983,rotation:-73.7049,x:77.9,y:-95.05,regX:-39.6}},{t:this.instance_12,p:{regX:-6.3,scaleX:0.9984,scaleY:0.9984,rotation:-82.2642,x:99.1,y:-171.6}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9983,scaleY:0.9983,rotation:-106.2979,x:104.25,y:-182.05}},{t:this.instance_10,p:{regX:-1.7,scaleX:0.9979,scaleY:0.9979,rotation:-16.648,x:15.4,y:93.7}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-17.8177,x:38.35,y:186.65,regX:2.6,regY:-53}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.3,rotation:-0.0123,y:-58,x:-5.55}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:22.941,x:-32.05,y:190.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:0.0551,x:-4.9,y:-79.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,rotation:-143.6847,x:-65.35,y:58.05,regX:40.6,regY:0.2}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-142.5237,x:-0.15,y:106,regX:5.5}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-142.5366,x:6.15,y:112.3,regX:6.4}},{t:this.instance,p:{rotation:-82.5601,x:-55.8,y:-21.15,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regX:2,regY:-46.2,rotation:4.5905,x:-20.5,y:91.85,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9984,scaleY:0.9984,rotation:-67.199,regY:-1.6,x:47.5,y:-26.55}},{t:this.instance_13,p:{regY:0.3,scaleX:0.9983,scaleY:0.9983,rotation:-74.3807,x:76,y:-95.95,regX:-39.6}},{t:this.instance_12,p:{regX:-6.3,scaleX:0.9983,scaleY:0.9983,rotation:-82.9582,x:96.3,y:-172.75}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9983,scaleY:0.9983,rotation:-107.0066,x:101.4,y:-183.1}},{t:this.instance_10,p:{regX:-1.7,scaleX:0.9979,scaleY:0.9979,rotation:-16.6314,x:15.4,y:93.7}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-17.7892,x:38.45,y:186.7,regX:2.7,regY:-53}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.3,rotation:-0.0053,y:-58,x:-5.55}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:22.9288,x:-32.05,y:190}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-0.2564,x:-4.85,y:-79.15}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,rotation:-140.8843,x:-66.55,y:57.9,regX:40.6,regY:0.2}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-139.7301,x:-3.75,y:109,regX:5.5}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-139.7368,x:2.25,y:115.5,regX:6.4}},{t:this.instance,p:{rotation:-81.6745,x:-55.8,y:-21.2,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,regY:-46.2,rotation:4.5826,x:-20.35,y:91.95,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9984,scaleY:0.9984,rotation:-68.7563,regY:-1.5,x:47.55,y:-26.65}},{t:this.instance_13,p:{regY:0.3,scaleX:0.9983,scaleY:0.9983,rotation:-75.0578,x:74.2,y:-96.75,regX:-39.6}},{t:this.instance_12,p:{regX:-6.3,scaleX:0.9983,scaleY:0.9983,rotation:-83.653,x:93.55,y:-173.75}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9983,scaleY:0.9983,rotation:-107.7146,x:98.4,y:-184.25}},{t:this.instance_10,p:{regX:-1.7,scaleX:0.9979,scaleY:0.9979,rotation:-16.6158,x:15.45,y:93.7}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-17.7615,x:38.35,y:186.7,regX:2.6,regY:-53}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.3,rotation:-0.0009,y:-58.05,x:-5.6}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:22.9174,x:-32,y:190.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-0.5715,x:-4.9,y:-79.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-138.0843,x:-67.8,y:57.75,regX:40.6,regY:0.2}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-136.9361,x:-7.6,y:111.75,regX:5.5}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-136.9372,x:-1.9,y:118.65,regX:6.4}},{t:this.instance,p:{rotation:-80.7889,x:-55.8,y:-21.25,scaleX:0.9982,scaleY:0.9983}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-97.6,-209.3,309.2,511.2);


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
	this.instance.setTransform(-57.3,-22.9,0.9985,0.9985,-69.5241,0,0,35.6,0.4);

	this.instance_1 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_1.setTransform(-37.9,123.55,0.9985,0.9985,-108.0855,0,0,6.4,-1.2);

	this.instance_2 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_2.setTransform(-35.55,114.75,0.9986,0.9986,-85.2969,0,0,5.7,-8.2);

	this.instance_3 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_3.setTransform(-84.35,50.1,0.9986,0.9986,-126.6198,0,0,40.6,0.1);

	this.instance_4 = new lib.ch1_headcopy("synched",0);
	this.instance_4.setTransform(-4.85,-79.15,0.9992,0.9992,-0.6011,0,0,0.2,53);

	this.instance_5 = new lib.ch1_uBodycopy("synched",0);
	this.instance_5.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_6 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_6.setTransform(-31.25,189.7,0.9987,0.9987,10.5308,0,0,3.2,-52.6);

	this.instance_7 = new lib.ch1_neckcopy("synched",0);
	this.instance_7.setTransform(-5.25,-58.05,0.9992,0.9992,-0.1129,0,0,-0.8,8.8);

	this.instance_8 = new lib.ch1_lBodycopy("synched",0);
	this.instance_8.setTransform(-5.6,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_9 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_9.setTransform(34.4,187.55,0.9982,0.9982,-9.1761,0,0,3.1,-53.6);

	this.instance_10 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_10.setTransform(15,93.6,0.9982,0.9982,-14.1263,0,0,-1.1,1.7);

	this.instance_11 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_11.setTransform(139.7,101.2,0.9986,0.9986,18.9563,0,0,-5,3);

	this.instance_12 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_12.setTransform(130.15,95.65,0.9986,0.9986,11.3695,0,0,-6,7.9);

	this.instance_13 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_13.setTransform(47.75,-26.35,0.9986,0.9986,74.9462,0,0,-31.5,-1.1);

	this.instance_14 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_14.setTransform(-22.25,91.75,0.9989,0.9989,3.3104,0,0,2.2,-45.8);

	this.instance_15 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_15.setTransform(68.3,45.4,0.9986,0.9986,39.8114,0,0,-39.8,-0.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{regY:-0.3,scaleX:0.9986,scaleY:0.9986,rotation:39.8114,x:68.3,y:45.4,regX:-39.8}},{t:this.instance_14,p:{regY:-45.8,scaleX:0.9989,scaleY:0.9989,rotation:3.3104,x:-22.25,y:91.75,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9986,scaleY:0.9986,rotation:74.9462,x:47.75,y:-26.35,regY:-1.1,regX:-31.5}},{t:this.instance_12,p:{regY:7.9,rotation:11.3695,x:130.15,y:95.65,regX:-6,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_11,p:{scaleX:0.9986,scaleY:0.9986,rotation:18.9563,x:139.7,y:101.2,regY:3}},{t:this.instance_10,p:{rotation:-14.1263,x:15,y:93.6,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_9,p:{regY:-53.6,scaleX:0.9982,scaleY:0.9982,rotation:-9.1761,x:34.4,y:187.55}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{rotation:-0.1129,x:-5.25,y:-58.05}},{t:this.instance_6,p:{scaleX:0.9987,scaleY:0.9987,rotation:10.5308,x:-31.25,y:189.7,regX:3.2}},{t:this.instance_5,p:{x:-7.35}},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:-0.6011,x:-4.85,y:-79.15,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,rotation:-126.6198,x:-84.35,y:50.1,regX:40.6}},{t:this.instance_2,p:{regY:-8.2,rotation:-85.2969,x:-35.55,y:114.75,scaleX:0.9986,scaleY:0.9986,regX:5.7}},{t:this.instance_1,p:{scaleX:0.9985,scaleY:0.9985,rotation:-108.0855,x:-37.9,y:123.55,regX:6.4}},{t:this.instance,p:{rotation:-69.5241,x:-57.3,y:-22.9,scaleX:0.9985,scaleY:0.9985,regY:0.4}}]}).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9985,scaleY:0.9985,rotation:38.5812,x:70.1,y:45.05,regX:-39.8}},{t:this.instance_14,p:{regY:-45.7,scaleX:0.9988,scaleY:0.9988,rotation:3.3097,x:-21.5,y:91.75,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:74.0386,x:48.4,y:-26.3,regY:-1.1,regX:-31.5}},{t:this.instance_12,p:{regY:8,rotation:10.1397,x:132.95,y:93.95,regX:-6,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_11,p:{scaleX:0.9985,scaleY:0.9985,rotation:17.7253,x:142.65,y:99.2,regY:3}},{t:this.instance_10,p:{rotation:-14.1261,x:15.6,y:93.55,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_9,p:{regY:-53.5,scaleX:0.9981,scaleY:0.9981,rotation:-9.1768,x:35.2,y:187.6}},{t:this.instance_8,p:{x:-4.85}},{t:this.instance_7,p:{rotation:-0.0936,x:-4.45,y:-58}},{t:this.instance_6,p:{scaleX:0.9986,scaleY:0.9986,rotation:10.5306,x:-30.5,y:189.65,regX:3.2}},{t:this.instance_5,p:{x:-6.6}},{t:this.instance_4,p:{scaleX:0.9991,scaleY:0.9991,rotation:-0.1453,x:-4.1,y:-79.15,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-124.6402,x:-83.4,y:50.15,regX:40.6}},{t:this.instance_2,p:{regY:-8.3,rotation:-83.3175,x:-36.95,y:116.4,scaleX:0.9986,scaleY:0.9986,regX:5.7}},{t:this.instance_1,p:{scaleX:0.9984,scaleY:0.9984,rotation:-106.1063,x:-39.45,y:125.15,regX:6.4}},{t:this.instance,p:{rotation:-69.6893,x:-56.55,y:-22.8,scaleX:0.9985,scaleY:0.9985,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9985,scaleY:0.9985,rotation:37.349,x:72,y:44.7,regX:-39.8}},{t:this.instance_14,p:{regY:-45.7,scaleX:0.9988,scaleY:0.9988,rotation:3.3097,x:-20.75,y:91.75,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:73.1304,x:49.1,y:-26.25,regY:-1.1,regX:-31.5}},{t:this.instance_12,p:{regY:8,rotation:8.9102,x:135.8,y:92.25,regX:-6,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_11,p:{scaleX:0.9985,scaleY:0.9985,rotation:16.495,x:145.6,y:97.3,regY:3}},{t:this.instance_10,p:{rotation:-14.1261,x:16.35,y:93.55,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_9,p:{regY:-53.5,scaleX:0.9981,scaleY:0.9981,rotation:-9.1768,x:35.9,y:187.6}},{t:this.instance_8,p:{x:-4.15}},{t:this.instance_7,p:{rotation:-0.0735,x:-3.8,y:-58.05}},{t:this.instance_6,p:{scaleX:0.9986,scaleY:0.9986,rotation:10.5306,x:-29.8,y:189.65,regX:3.2}},{t:this.instance_5,p:{x:-5.9}},{t:this.instance_4,p:{scaleX:0.9991,scaleY:0.9991,rotation:0.3045,x:-3.45,y:-79.15,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-122.6598,x:-82.5,y:50.2,regX:40.6}},{t:this.instance_2,p:{regY:-8.3,rotation:-81.3386,x:-38.3,y:118,scaleX:0.9986,scaleY:0.9986,regX:5.7}},{t:this.instance_1,p:{scaleX:0.9984,scaleY:0.9984,rotation:-104.1269,x:-41.15,y:126.65,regX:6.4}},{t:this.instance,p:{rotation:-69.8549,x:-55.8,y:-22.8,scaleX:0.9984,scaleY:0.9984,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9985,scaleY:0.9985,rotation:36.1192,x:73.75,y:44.2,regX:-39.9}},{t:this.instance_14,p:{regY:-45.7,scaleX:0.9988,scaleY:0.9988,rotation:3.3097,x:-20.05,y:91.75,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:72.2226,x:49.8,y:-26.35,regY:-1.1,regX:-31.5}},{t:this.instance_12,p:{regY:8,rotation:7.6785,x:138.65,y:90.5,regX:-6,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_11,p:{scaleX:0.9985,scaleY:0.9985,rotation:15.2642,x:148.55,y:95.35,regY:3}},{t:this.instance_10,p:{rotation:-14.1255,x:17.05,y:93.55,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{regY:-53.5,scaleX:0.9981,scaleY:0.9981,rotation:-9.1759,x:36.55,y:187.6}},{t:this.instance_8,p:{x:-3.4}},{t:this.instance_7,p:{rotation:-0.0542,x:-3,y:-58.05}},{t:this.instance_6,p:{scaleX:0.9986,scaleY:0.9986,rotation:10.5306,x:-29.05,y:189.65,regX:3.2}},{t:this.instance_5,p:{x:-5.15}},{t:this.instance_4,p:{scaleX:0.9991,scaleY:0.9991,rotation:0.7604,x:-2.7,y:-79.15,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-120.6802,x:-81.55,y:50.3,regX:40.6}},{t:this.instance_2,p:{regY:-8.3,rotation:-79.3587,x:-39.75,y:119.55,scaleX:0.9985,scaleY:0.9985,regX:5.7}},{t:this.instance_1,p:{scaleX:0.9984,scaleY:0.9984,rotation:-102.1468,x:-42.85,y:128.1,regX:6.4}},{t:this.instance,p:{rotation:-70.02,x:-55.1,y:-22.8,scaleX:0.9984,scaleY:0.9984,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9985,scaleY:0.9985,rotation:34.8881,x:75.65,y:43.8,regX:-39.8}},{t:this.instance_14,p:{regY:-45.7,scaleX:0.9988,scaleY:0.9988,rotation:3.3088,x:-19.3,y:91.75,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:71.3134,x:50.55,y:-26.3,regY:-1.1,regX:-31.5}},{t:this.instance_12,p:{regY:8,rotation:6.4495,x:141.45,y:88.75,regX:-6,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_11,p:{scaleX:0.9985,scaleY:0.9985,rotation:14.0326,x:151.4,y:93.3,regY:3}},{t:this.instance_10,p:{rotation:-14.1255,x:17.75,y:93.55,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{regY:-53.5,scaleX:0.9981,scaleY:0.9981,rotation:-9.1759,x:37.3,y:187.6}},{t:this.instance_8,p:{x:-2.7}},{t:this.instance_7,p:{rotation:-0.0341,x:-2.35,y:-58.05}},{t:this.instance_6,p:{scaleX:0.9987,scaleY:0.9987,rotation:10.5304,x:-28.3,y:189.65,regX:3.2}},{t:this.instance_5,p:{x:-4.45}},{t:this.instance_4,p:{scaleX:0.9991,scaleY:0.9991,rotation:1.2155,x:-1.95,y:-79.2,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-118.7024,x:-80.5,y:50.45,regX:40.5}},{t:this.instance_2,p:{regY:-8.3,rotation:-77.3805,x:-41.25,y:121.05,scaleX:0.9985,scaleY:0.9985,regX:5.7}},{t:this.instance_1,p:{scaleX:0.9984,scaleY:0.9984,rotation:-100.1679,x:-44.7,y:129.45,regX:6.4}},{t:this.instance,p:{rotation:-70.1871,x:-54.35,y:-22.85,scaleX:0.9984,scaleY:0.9984,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9985,scaleY:0.9985,rotation:33.6575,x:77.35,y:43.3,regX:-39.9}},{t:this.instance_14,p:{regY:-45.7,scaleX:0.9988,scaleY:0.9988,rotation:3.3088,x:-18.55,y:91.75,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:70.4046,x:51.25,y:-26.35,regY:-1.1,regX:-31.5}},{t:this.instance_12,p:{regY:8,rotation:5.2174,x:144.25,y:86.8,regX:-6,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_11,p:{scaleX:0.9985,scaleY:0.9985,rotation:12.8019,x:154.35,y:91.15,regY:3}},{t:this.instance_10,p:{rotation:-14.1255,x:18.45,y:93.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{regY:-53.5,scaleX:0.9981,scaleY:0.9981,rotation:-9.1759,x:38,y:187.6}},{t:this.instance_8,p:{x:-1.95}},{t:this.instance_7,p:{rotation:-0.014,x:-1.55,y:-58.05}},{t:this.instance_6,p:{scaleX:0.9987,scaleY:0.9987,rotation:10.5304,x:-27.55,y:189.65,regX:3.2}},{t:this.instance_5,p:{x:-3.7}},{t:this.instance_4,p:{scaleX:0.9991,scaleY:0.9991,rotation:1.6707,x:-1.35,y:-79.1,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-116.7221,x:-79.6,y:50.55,regX:40.5}},{t:this.instance_2,p:{regY:-8.2,rotation:-75.401,x:-42.6,y:122.5,scaleX:0.9985,scaleY:0.9985,regX:5.7}},{t:this.instance_1,p:{scaleX:0.9984,scaleY:0.9984,rotation:-98.1889,x:-46.45,y:130.75,regX:6.4}},{t:this.instance,p:{rotation:-70.3532,x:-53.6,y:-22.85,scaleX:0.9984,scaleY:0.9984,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9985,scaleY:0.9985,rotation:32.4263,x:79.25,y:42.95,regX:-39.8}},{t:this.instance_14,p:{regY:-45.7,scaleX:0.9988,scaleY:0.9988,rotation:3.308,x:-17.85,y:91.75,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:69.4971,x:52.1,y:-26.4,regY:-1.2,regX:-31.5}},{t:this.instance_12,p:{regY:8,rotation:3.9877,x:146.95,y:84.95,regX:-6,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_11,p:{scaleX:0.9985,scaleY:0.9985,rotation:11.5713,x:157.1,y:89.15,regY:3}},{t:this.instance_10,p:{rotation:-14.1255,x:19.2,y:93.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{regY:-53.5,scaleX:0.9981,scaleY:0.9981,rotation:-9.1759,x:38.75,y:187.6}},{t:this.instance_8,p:{x:-1.25}},{t:this.instance_7,p:{rotation:0,x:-0.9,y:-58.05}},{t:this.instance_6,p:{scaleX:0.9987,scaleY:0.9987,rotation:10.5296,x:-26.85,y:189.6,regX:3.2}},{t:this.instance_5,p:{x:-3}},{t:this.instance_4,p:{scaleX:0.9991,scaleY:0.9991,rotation:2.1251,x:-0.55,y:-79.2,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-114.7431,x:-78.6,y:50.55,regX:40.5}},{t:this.instance_2,p:{regY:-8.3,rotation:-73.4221,x:-44.4,y:123.75,scaleX:0.9985,scaleY:0.9985,regX:5.7}},{t:this.instance_1,p:{scaleX:0.9984,scaleY:0.9984,rotation:-96.2091,x:-48.4,y:131.95,regX:6.4}},{t:this.instance,p:{rotation:-70.5205,x:-52.9,y:-22.9,scaleX:0.9984,scaleY:0.9984,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9985,scaleY:0.9985,rotation:31.1956,x:81.05,y:42.45,regX:-39.8}},{t:this.instance_14,p:{regY:-45.7,scaleX:0.9988,scaleY:0.9988,rotation:3.308,x:-17.1,y:91.75,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:68.5881,x:52.65,y:-26.5,regY:-1.1,regX:-31.6}},{t:this.instance_12,p:{regY:8,rotation:2.7572,x:149.55,y:83.05,regX:-6.1,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_11,p:{scaleX:0.9985,scaleY:0.9985,rotation:10.3394,x:159.9,y:86.95,regY:3}},{t:this.instance_10,p:{rotation:-14.1255,x:19.9,y:93.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{regY:-53.5,scaleX:0.9981,scaleY:0.9981,rotation:-9.1759,x:39.45,y:187.55}},{t:this.instance_8,p:{x:-0.5}},{t:this.instance_7,p:{rotation:0.0201,x:-0.2,y:-58.05}},{t:this.instance_6,p:{scaleX:0.9987,scaleY:0.9987,rotation:10.5296,x:-26.1,y:189.6,regX:3.2}},{t:this.instance_5,p:{x:-2.25}},{t:this.instance_4,p:{scaleX:0.9991,scaleY:0.9991,rotation:2.5805,x:0.15,y:-79.1,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-112.7635,x:-77.75,y:50.55,regX:40.6}},{t:this.instance_2,p:{regY:-8.3,rotation:-71.4438,x:-45.95,y:124.9,scaleX:0.9985,scaleY:0.9985,regX:5.7}},{t:this.instance_1,p:{scaleX:0.9984,scaleY:0.9984,rotation:-94.2297,x:-50.2,y:133.1,regX:6.3}},{t:this.instance,p:{rotation:-70.6853,x:-52.2,y:-22.95,scaleX:0.9985,scaleY:0.9985,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.3,scaleX:0.9985,scaleY:0.9985,rotation:29.9658,x:82.75,y:42.05,regX:-39.9}},{t:this.instance_14,p:{regY:-45.7,scaleX:0.9988,scaleY:0.9988,rotation:3.3071,x:-16.4,y:91.75,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:67.6806,x:53.4,y:-26.4,regY:-1.1,regX:-31.5}},{t:this.instance_12,p:{regY:8,rotation:1.5262,x:152.35,y:81.1,regX:-6,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_11,p:{scaleX:0.9985,scaleY:0.9985,rotation:9.1091,x:162.65,y:84.8,regY:3}},{t:this.instance_10,p:{rotation:-14.1246,x:20.6,y:93.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{regY:-53.5,scaleX:0.9981,scaleY:0.9981,rotation:-9.175,x:40.15,y:187.55}},{t:this.instance_8,p:{x:0.2}},{t:this.instance_7,p:{rotation:0.0394,x:0.45,y:-58.05}},{t:this.instance_6,p:{scaleX:0.9986,scaleY:0.9986,rotation:10.5287,x:-25.35,y:189.6,regX:3.2}},{t:this.instance_5,p:{x:-1.55}},{t:this.instance_4,p:{scaleX:0.9991,scaleY:0.9991,rotation:3.037,x:0.9,y:-79.1,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-110.7837,x:-76.75,y:50.75,regX:40.5}},{t:this.instance_2,p:{regY:-8.3,rotation:-69.4648,x:-47.65,y:126.05,scaleX:0.9985,scaleY:0.9985,regX:5.7}},{t:this.instance_1,p:{scaleX:0.9985,scaleY:0.9985,rotation:-92.251,x:-52.1,y:133.95,regX:6.4}},{t:this.instance,p:{rotation:-70.8504,x:-51.4,y:-22.95,scaleX:0.9985,scaleY:0.9985,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9985,scaleY:0.9985,rotation:28.7352,x:84.7,y:41.5,regX:-39.8}},{t:this.instance_14,p:{regY:-45.7,scaleX:0.9988,scaleY:0.9988,rotation:3.3071,x:-15.65,y:91.75,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:66.7726,x:54.15,y:-26.4,regY:-1.1,regX:-31.5}},{t:this.instance_12,p:{regY:8,rotation:0.2959,x:154.95,y:79.05,regX:-6,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_11,p:{scaleX:0.9985,scaleY:0.9985,rotation:7.8777,x:165.35,y:82.5,regY:2.9}},{t:this.instance_10,p:{rotation:-14.1246,x:21.3,y:93.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{regY:-53.5,scaleX:0.9981,scaleY:0.9981,rotation:-9.175,x:40.9,y:187.55}},{t:this.instance_8,p:{x:0.9}},{t:this.instance_7,p:{rotation:0.0595,x:1.25,y:-58.05}},{t:this.instance_6,p:{scaleX:0.9986,scaleY:0.9986,rotation:10.5287,x:-24.6,y:189.6,regX:3.2}},{t:this.instance_5,p:{x:-0.8}},{t:this.instance_4,p:{scaleX:0.9991,scaleY:0.9991,rotation:3.4918,x:1.55,y:-79.15,regX:0.1}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-108.804,x:-75.85,y:50.65,regX:40.6}},{t:this.instance_2,p:{regY:-8.2,rotation:-67.4847,x:-49.15,y:127.1,scaleX:0.9985,scaleY:0.9985,regX:5.7}},{t:this.instance_1,p:{scaleX:0.9985,scaleY:0.9985,rotation:-90.2714,x:-54.05,y:134.8,regX:6.4}},{t:this.instance,p:{rotation:-71.0179,x:-50.7,y:-22.95,scaleX:0.9984,scaleY:0.9984,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9985,scaleY:0.9985,rotation:27.5044,x:86.45,y:41,regX:-39.8}},{t:this.instance_14,p:{regY:-45.7,scaleX:0.9988,scaleY:0.9988,rotation:3.3071,x:-14.95,y:91.75,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:65.8637,x:54.85,y:-26.45,regY:-1.1,regX:-31.5}},{t:this.instance_12,p:{regY:8,rotation:-0.929,x:157.6,y:77.1,regX:-6,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_11,p:{scaleX:0.9985,scaleY:0.9985,rotation:6.6464,x:168,y:80.4,regY:3}},{t:this.instance_10,p:{rotation:-14.1246,x:22.05,y:93.45,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{regY:-53.5,scaleX:0.9981,scaleY:0.9981,rotation:-9.1742,x:41.65,y:187.55}},{t:this.instance_8,p:{x:1.65}},{t:this.instance_7,p:{rotation:0.0796,x:1.95,y:-57.95}},{t:this.instance_6,p:{scaleX:0.9986,scaleY:0.9986,rotation:10.5287,x:-23.9,y:189.6,regX:3.2}},{t:this.instance_5,p:{x:-0.1}},{t:this.instance_4,p:{scaleX:0.9991,scaleY:0.9991,rotation:3.947,x:2.35,y:-79.05,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-106.8246,x:-74.9,y:50.75,regX:40.6}},{t:this.instance_2,p:{regY:-8.3,rotation:-65.506,x:-51,y:127.95,scaleX:0.9985,scaleY:0.9985,regX:5.7}},{t:this.instance_1,p:{scaleX:0.9984,scaleY:0.9984,rotation:-88.2957,x:-56.05,y:135.55,regX:6.4}},{t:this.instance,p:{rotation:-71.1829,x:-50,y:-22.95,scaleX:0.9985,scaleY:0.9985,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9985,scaleY:0.9985,rotation:26.2733,x:88.2,y:40.45,regX:-39.8}},{t:this.instance_14,p:{regY:-45.7,scaleX:0.9988,scaleY:0.9988,rotation:3.3062,x:-14.2,y:91.75,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:64.9544,x:55.55,y:-26.45,regY:-1.1,regX:-31.5}},{t:this.instance_12,p:{regY:8,rotation:-2.1595,x:160.1,y:75.05,regX:-6,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_11,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.4155,x:170.6,y:78.1,regY:3}},{t:this.instance_10,p:{rotation:-14.1246,x:22.75,y:93.45,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{regY:-53.5,scaleX:0.9981,scaleY:0.9981,rotation:-9.1742,x:42.35,y:187.55}},{t:this.instance_8,p:{x:2.35}},{t:this.instance_7,p:{rotation:0.0989,x:2.65,y:-57.95}},{t:this.instance_6,p:{scaleX:0.9986,scaleY:0.9986,rotation:10.528,x:-23.15,y:189.6,regX:3.2}},{t:this.instance_5,p:{x:0.6}},{t:this.instance_4,p:{scaleX:0.9991,scaleY:0.9991,rotation:4.4014,x:3.15,y:-79.05,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-104.845,x:-73.95,y:50.75,regX:40.6}},{t:this.instance_2,p:{regY:-8.3,rotation:-63.5266,x:-52.75,y:128.85,scaleX:0.9985,scaleY:0.9985,regX:5.7}},{t:this.instance_1,p:{scaleX:0.9984,scaleY:0.9984,rotation:-86.3171,x:-58.1,y:136.2,regX:6.4}},{t:this.instance,p:{rotation:-71.3494,x:-49.25,y:-23,scaleX:0.9985,scaleY:0.9985,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.3,scaleX:0.9985,scaleY:0.9985,rotation:25.0437,x:90,y:40.1,regX:-39.8}},{t:this.instance_14,p:{regY:-45.7,scaleX:0.9988,scaleY:0.9988,rotation:3.3062,x:-13.5,y:91.75,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:64.0466,x:56.4,y:-26.45,regY:-1.2,regX:-31.5}},{t:this.instance_12,p:{regY:7.9,rotation:-3.3893,x:162.4,y:72.85,regX:-6.1,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_11,p:{scaleX:0.9985,scaleY:0.9985,rotation:4.1836,x:173.1,y:75.75,regY:3}},{t:this.instance_10,p:{rotation:-14.1246,x:23.45,y:93.45,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{regY:-53.5,scaleX:0.9981,scaleY:0.9981,rotation:-9.1733,x:43.1,y:187.55}},{t:this.instance_8,p:{x:3.1}},{t:this.instance_7,p:{rotation:0.1199,x:3.4,y:-57.95}},{t:this.instance_6,p:{scaleX:0.9986,scaleY:0.9986,rotation:10.528,x:-22.4,y:189.6,regX:3.2}},{t:this.instance_5,p:{x:1.35}},{t:this.instance_4,p:{scaleX:0.9991,scaleY:0.9991,rotation:4.8571,x:3.85,y:-79.1,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-102.8656,x:-73,y:51.05,regX:40.5}},{t:this.instance_2,p:{regY:-8.3,rotation:-61.5477,x:-54.55,y:129.6,scaleX:0.9985,scaleY:0.9985,regX:5.7}},{t:this.instance_1,p:{scaleX:0.9984,scaleY:0.9984,rotation:-84.3376,x:-60.1,y:136.95,regX:6.3}},{t:this.instance,p:{rotation:-71.516,x:-48.5,y:-22.95,scaleX:0.9985,scaleY:0.9985,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9985,scaleY:0.9985,rotation:23.8129,x:91.8,y:39.35,regX:-39.8}},{t:this.instance_14,p:{regY:-45.7,scaleX:0.9988,scaleY:0.9988,rotation:3.3053,x:-12.75,y:91.75,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:63.1377,x:57.05,y:-26.55,regY:-1.2,regX:-31.5}},{t:this.instance_12,p:{regY:8,rotation:-4.6208,x:165.1,y:70.85,regX:-6,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_11,p:{scaleX:0.9985,scaleY:0.9985,rotation:2.9537,x:175.65,y:73.45,regY:3}},{t:this.instance_10,p:{rotation:-14.1246,x:24.15,y:93.45,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{regY:-53.5,scaleX:0.9981,scaleY:0.9981,rotation:-9.1733,x:43.8,y:187.55}},{t:this.instance_8,p:{x:3.8}},{t:this.instance_7,p:{rotation:0.14,x:4.1,y:-57.95}},{t:this.instance_6,p:{scaleX:0.9986,scaleY:0.9986,rotation:10.528,x:-21.65,y:189.6,regX:3.2}},{t:this.instance_5,p:{x:2.05}},{t:this.instance_4,p:{scaleX:0.9991,scaleY:0.9991,rotation:5.3121,x:4.6,y:-79.05,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-100.8871,x:-72.05,y:50.95,regX:40.6}},{t:this.instance_2,p:{regY:-8.3,rotation:-59.5677,x:-56.3,y:130.25,scaleX:0.9985,scaleY:0.9985,regX:5.7}},{t:this.instance_1,p:{scaleX:0.9984,scaleY:0.9984,rotation:-82.3591,x:-62.1,y:137.2,regX:6.4}},{t:this.instance,p:{rotation:-71.6811,x:-47.85,y:-23,scaleX:0.9984,scaleY:0.9984,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.3,scaleX:0.9985,scaleY:0.9985,rotation:22.582,x:93.45,y:38.85,regX:-39.8}},{t:this.instance_14,p:{regY:-45.7,scaleX:0.9988,scaleY:0.9988,rotation:3.3053,x:-12.05,y:91.8,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:62.2289,x:57.75,y:-26.5,regY:-1.1,regX:-31.5}},{t:this.instance_12,p:{regY:8,rotation:-5.8508,x:167.45,y:68.65,regX:-6,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_11,p:{scaleX:0.9985,scaleY:0.9985,rotation:1.7225,x:178.1,y:71.05,regY:3}},{t:this.instance_10,p:{rotation:-14.1238,x:24.9,y:93.45,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{regY:-53.5,scaleX:0.9981,scaleY:0.9981,rotation:-9.1733,x:44.55,y:187.55}},{t:this.instance_8,p:{x:4.55}},{t:this.instance_7,p:{rotation:0.1592,x:4.85,y:-57.9}},{t:this.instance_6,p:{scaleX:0.9986,scaleY:0.9986,rotation:10.5272,x:-20.95,y:189.6,regX:3.2}},{t:this.instance_5,p:{x:2.8}},{t:this.instance_4,p:{scaleX:0.9991,scaleY:0.9991,rotation:5.7668,x:5.35,y:-79.05,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-98.9083,x:-71.15,y:51.05,regX:40.6}},{t:this.instance_2,p:{regY:-8.3,rotation:-57.5886,x:-58.15,y:130.8,scaleX:0.9985,scaleY:0.9985,regX:5.7}},{t:this.instance_1,p:{scaleX:0.9984,scaleY:0.9984,rotation:-80.3786,x:-64.2,y:137.65,regX:6.4}},{t:this.instance,p:{rotation:-71.8472,x:-47.15,y:-23,scaleX:0.9984,scaleY:0.9984,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.3,scaleX:0.9985,scaleY:0.9985,rotation:23.7506,x:91.8,y:39.4,regX:-39.8}},{t:this.instance_14,p:{regY:-45.7,scaleX:0.9988,scaleY:0.9988,rotation:3.3133,x:-12.7,y:91.75,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:63.0841,x:57.05,y:-26.5,regY:-1.1,regX:-31.5}},{t:this.instance_12,p:{regY:8,rotation:-4.6972,x:165.2,y:70.65,regX:-6,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_11,p:{scaleX:0.9985,scaleY:0.9985,rotation:2.8687,x:175.75,y:73.35,regY:3}},{t:this.instance_10,p:{rotation:-14.1363,x:24.25,y:93.45,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{regY:-53.5,scaleX:0.9981,scaleY:0.9981,rotation:-9.1722,x:43.9,y:187.55}},{t:this.instance_8,p:{x:3.85}},{t:this.instance_7,p:{rotation:0.1487,x:4.2,y:-57.95}},{t:this.instance_6,p:{scaleX:0.9986,scaleY:0.9986,rotation:10.5503,x:-21.65,y:189.55,regX:3.2}},{t:this.instance_5,p:{x:2.1}},{t:this.instance_4,p:{scaleX:0.9991,scaleY:0.9991,rotation:5.3446,x:4.7,y:-79.1,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-100.7551,x:-72,y:51.05,regX:40.6}},{t:this.instance_2,p:{regY:-8.3,rotation:-59.4414,x:-56.45,y:130.3,scaleX:0.9985,scaleY:0.9985,regX:5.7}},{t:this.instance_1,p:{scaleX:0.9984,scaleY:0.9984,rotation:-82.2408,x:-62.3,y:137.3,regX:6.4}},{t:this.instance,p:{rotation:-71.6805,x:-47.8,y:-23,scaleX:0.9985,scaleY:0.9985,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9985,scaleY:0.9985,rotation:24.9183,x:90.15,y:39.85,regX:-39.8}},{t:this.instance_14,p:{regY:-45.7,scaleX:0.9988,scaleY:0.9988,rotation:3.3229,x:-13.4,y:91.75,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:63.9409,x:56.55,y:-26.55,regY:-1.2,regX:-31.5}},{t:this.instance_12,p:{regY:7.9,rotation:-3.5429,x:162.85,y:72.55,regX:-6,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_11,p:{scaleX:0.9986,scaleY:0.9986,rotation:4.0142,x:173.4,y:75.5,regY:3}},{t:this.instance_10,p:{rotation:-14.1499,x:23.55,y:93.45,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{regY:-53.5,scaleX:0.9981,scaleY:0.9981,rotation:-9.1722,x:43.25,y:187.55}},{t:this.instance_8,p:{x:3.15}},{t:this.instance_7,p:{rotation:0.1382,x:3.45,y:-57.95}},{t:this.instance_6,p:{scaleX:0.9986,scaleY:0.9986,rotation:10.5744,x:-22.3,y:189.6,regX:3.2}},{t:this.instance_5,p:{x:1.4}},{t:this.instance_4,p:{scaleX:0.9991,scaleY:0.9991,rotation:4.922,x:3.95,y:-79.05,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-102.6026,x:-72.9,y:50.95,regX:40.6}},{t:this.instance_2,p:{regY:-8.3,rotation:-61.2946,x:-54.7,y:129.5,scaleX:0.9985,scaleY:0.9985,regX:5.8}},{t:this.instance_1,p:{scaleX:0.9984,scaleY:0.9984,rotation:-84.1008,x:-60.35,y:137,regX:6.3}},{t:this.instance,p:{rotation:-71.5116,x:-48.4,y:-22.95,scaleX:0.9985,scaleY:0.9985,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9985,scaleY:0.9985,rotation:26.0862,x:88.55,y:40.35,regX:-39.8}},{t:this.instance_14,p:{regY:-45.7,scaleX:0.9988,scaleY:0.9988,rotation:3.3317,x:-14.15,y:91.75,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:64.7965,x:55.75,y:-26.4,regY:-1.1,regX:-31.5}},{t:this.instance_12,p:{regY:8,rotation:-2.3882,x:160.5,y:74.7,regX:-6,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_11,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.1596,x:171.05,y:77.75,regY:3}},{t:this.instance_10,p:{rotation:-14.1635,x:22.95,y:93.45,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{regY:-53.5,scaleX:0.9981,scaleY:0.9981,rotation:-9.1716,x:42.6,y:187.55}},{t:this.instance_8,p:{x:2.5}},{t:this.instance_7,p:{rotation:0.1269,x:2.8,y:-57.95}},{t:this.instance_6,p:{scaleX:0.9986,scaleY:0.9986,rotation:10.5984,x:-23.05,y:189.55,regX:3.2}},{t:this.instance_5,p:{x:0.75}},{t:this.instance_4,p:{scaleX:0.9991,scaleY:0.9991,rotation:4.4989,x:3.3,y:-79.05,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-104.4512,x:-73.8,y:50.85,regX:40.6}},{t:this.instance_2,p:{regY:-8.3,rotation:-63.1456,x:-53.2,y:128.95,scaleX:0.9985,scaleY:0.9985,regX:5.7}},{t:this.instance_1,p:{scaleX:0.9984,scaleY:0.9984,rotation:-85.9617,x:-58.5,y:136.35,regX:6.4}},{t:this.instance,p:{rotation:-71.3438,x:-49.1,y:-23,scaleX:0.9985,scaleY:0.9985,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9985,scaleY:0.9985,rotation:27.255,x:86.85,y:40.9,regX:-39.8}},{t:this.instance_14,p:{regY:-45.7,scaleX:0.9988,scaleY:0.9988,rotation:3.3404,x:-14.75,y:91.75,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:65.651,x:55.05,y:-26.45,regY:-1.1,regX:-31.5}},{t:this.instance_12,p:{regY:8,rotation:-1.2346,x:158.05,y:76.65,regX:-6.1,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_11,p:{scaleX:0.9985,scaleY:0.9985,rotation:6.3045,x:168.6,y:79.85,regY:3}},{t:this.instance_10,p:{rotation:-14.176,x:22.25,y:93.45,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{regY:-53.5,scaleX:0.9981,scaleY:0.9981,rotation:-9.1716,x:41.95,y:187.55}},{t:this.instance_8,p:{x:1.8}},{t:this.instance_7,p:{rotation:0.1155,x:2.15,y:-57.95}},{t:this.instance_6,p:{scaleX:0.9986,scaleY:0.9986,rotation:10.6223,x:-23.7,y:189.55,regX:3.2}},{t:this.instance_5,p:{x:0.05}},{t:this.instance_4,p:{scaleX:0.9991,scaleY:0.9991,rotation:4.0768,x:2.6,y:-79.1,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-106.2977,x:-74.75,y:50.85,regX:40.5}},{t:this.instance_2,p:{regY:-8.3,rotation:-64.9979,x:-51.6,y:128.2,scaleX:0.9985,scaleY:0.9985,regX:5.7}},{t:this.instance_1,p:{scaleX:0.9984,scaleY:0.9984,rotation:-87.8226,x:-56.65,y:135.75,regX:6.4}},{t:this.instance,p:{rotation:-71.1752,x:-49.8,y:-22.95,scaleX:0.9985,scaleY:0.9985,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.3,scaleX:0.9985,scaleY:0.9985,rotation:28.4237,x:85.15,y:41.45,regX:-39.8}},{t:this.instance_14,p:{regY:-45.7,scaleX:0.9988,scaleY:0.9988,rotation:3.3491,x:-15.45,y:91.75,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:66.5055,x:54.35,y:-26.4,regY:-1.1,regX:-31.5}},{t:this.instance_12,p:{regY:8,rotation:-0.0797,x:155.7,y:78.55,regX:-6,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_11,p:{scaleX:0.9985,scaleY:0.9985,rotation:7.4493,x:166.15,y:81.95,regY:3}},{t:this.instance_10,p:{rotation:-14.1896,x:21.6,y:93.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{regY:-53.5,scaleX:0.9981,scaleY:0.9981,rotation:-9.1716,x:41.3,y:187.55}},{t:this.instance_8,p:{x:1.15}},{t:this.instance_7,p:{rotation:0.1041,x:1.5,y:-57.95}},{t:this.instance_6,p:{scaleX:0.9986,scaleY:0.9986,rotation:10.6456,x:-24.45,y:189.6,regX:3.2}},{t:this.instance_5,p:{x:-0.55}},{t:this.instance_4,p:{scaleX:0.9991,scaleY:0.9991,rotation:3.6531,x:1.95,y:-79.1,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-108.1467,x:-75.6,y:50.7,regX:40.5}},{t:this.instance_2,p:{regY:-8.2,rotation:-66.851,x:-49.9,y:127.4,scaleX:0.9985,scaleY:0.9985,regX:5.7}},{t:this.instance_1,p:{scaleX:0.9984,scaleY:0.9985,rotation:-89.683,x:-54.75,y:135.05,regX:6.4}},{t:this.instance,p:{rotation:-71.0079,x:-50.5,y:-22.9,scaleX:0.9984,scaleY:0.9984,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9985,scaleY:0.9985,rotation:29.5928,x:83.55,y:41.8,regX:-39.8}},{t:this.instance_14,p:{regY:-45.7,scaleX:0.9988,scaleY:0.9988,rotation:3.358,x:-16.05,y:91.75,regX:2.3}},{t:this.instance_13,p:{scaleX:0.9986,scaleY:0.9986,rotation:67.3614,x:53.65,y:-26.4,regY:-1.1,regX:-31.5}},{t:this.instance_12,p:{regY:8,rotation:1.0699,x:153.3,y:80.45,regX:-6,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_11,p:{scaleX:0.9986,scaleY:0.9986,rotation:8.5968,x:163.55,y:84.1,regY:3}},{t:this.instance_10,p:{rotation:-14.2032,x:20.95,y:93.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{regY:-53.5,scaleX:0.9981,scaleY:0.9981,rotation:-9.1704,x:40.65,y:187.55}},{t:this.instance_8,p:{x:0.45}},{t:this.instance_7,p:{rotation:0.0936,x:0.75,y:-58}},{t:this.instance_6,p:{scaleX:0.9986,scaleY:0.9986,rotation:10.6695,x:-25,y:189.6,regX:3.3}},{t:this.instance_5,p:{x:-1.25}},{t:this.instance_4,p:{scaleX:0.9991,scaleY:0.9991,rotation:3.2297,x:1.2,y:-79.1,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-109.9938,x:-76.5,y:50.55,regX:40.6}},{t:this.instance_2,p:{regY:-8.3,rotation:-68.7026,x:-48.4,y:126.4,scaleX:0.9985,scaleY:0.9985,regX:5.7}},{t:this.instance_1,p:{scaleX:0.9984,scaleY:0.9984,rotation:-91.5404,x:-53,y:134.25,regX:6.4}},{t:this.instance,p:{rotation:-70.8401,x:-51.1,y:-22.9,scaleX:0.9985,scaleY:0.9985,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9985,scaleY:0.9985,rotation:30.7601,x:81.85,y:42.3,regX:-39.8}},{t:this.instance_14,p:{regY:-45.7,scaleX:0.9988,scaleY:0.9988,rotation:3.3667,x:-16.65,y:91.75,regX:2.3}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:68.2176,x:53,y:-26.4,regY:-1.1,regX:-31.5}},{t:this.instance_12,p:{regY:8,rotation:2.2244,x:150.8,y:82.35,regX:-6,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_11,p:{scaleX:0.9985,scaleY:0.9985,rotation:9.742,x:161.05,y:86.2,regY:3}},{t:this.instance_10,p:{rotation:-14.2168,x:20.2,y:93.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{regY:-53.5,scaleX:0.9981,scaleY:0.9981,rotation:-9.1704,x:40,y:187.55}},{t:this.instance_8,p:{x:-0.15}},{t:this.instance_7,p:{rotation:0.0831,x:0.1,y:-58}},{t:this.instance_6,p:{scaleX:0.9986,scaleY:0.9986,rotation:10.6937,x:-25.85,y:189.6,regX:3.2}},{t:this.instance_5,p:{x:-1.9}},{t:this.instance_4,p:{scaleX:0.9991,scaleY:0.9991,rotation:2.8074,x:0.55,y:-79.1,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-111.8414,x:-77.45,y:50.5,regX:40.6}},{t:this.instance_2,p:{regY:-8.2,rotation:-70.555,x:-46.7,y:125.45,scaleX:0.9985,scaleY:0.9985,regX:5.7}},{t:this.instance_1,p:{scaleX:0.9984,scaleY:0.9984,rotation:-93.4013,x:-51.2,y:133.35,regX:6.4}},{t:this.instance,p:{rotation:-70.6715,x:-51.85,y:-22.9,scaleX:0.9985,scaleY:0.9985,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9985,scaleY:0.9985,rotation:31.928,x:80.15,y:42.75,regX:-39.8}},{t:this.instance_14,p:{regY:-45.7,scaleX:0.9988,scaleY:0.9988,rotation:3.3755,x:-17.45,y:91.75,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9986,scaleY:0.9986,rotation:69.0719,x:52.4,y:-26.35,regY:-1.1,regX:-31.5}},{t:this.instance_12,p:{regY:8,rotation:3.3779,x:148.25,y:84.15,regX:-6,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_11,p:{scaleX:0.9985,scaleY:0.9985,rotation:10.8873,x:158.45,y:88.25,regY:3}},{t:this.instance_10,p:{rotation:-14.2287,x:19.6,y:93.55,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{regY:-53.5,scaleX:0.9981,scaleY:0.9981,rotation:-9.1696,x:39.35,y:187.55}},{t:this.instance_8,p:{x:-0.85}},{t:this.instance_7,p:{rotation:0.0717,x:-0.55,y:-58}},{t:this.instance_6,p:{scaleX:0.9986,scaleY:0.9986,rotation:10.7176,x:-26.55,y:189.55,regX:3.2}},{t:this.instance_5,p:{x:-2.6}},{t:this.instance_4,p:{scaleX:0.9991,scaleY:0.9991,rotation:2.3834,x:-0.15,y:-79.15,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-113.6888,x:-78.3,y:50.5,regX:40.6}},{t:this.instance_2,p:{regY:-8.3,rotation:-72.4073,x:-45.35,y:124.3,scaleX:0.9985,scaleY:0.9985,regX:5.7}},{t:this.instance_1,p:{scaleX:0.9984,scaleY:0.9984,rotation:-95.2613,x:-49.45,y:132.45,regX:6.4}},{t:this.instance,p:{rotation:-70.5042,x:-52.5,y:-22.9,scaleX:0.9985,scaleY:0.9985,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9985,scaleY:0.9985,rotation:33.0968,x:78.4,y:43.15,regX:-39.8}},{t:this.instance_14,p:{regY:-45.7,scaleX:0.9988,scaleY:0.9988,rotation:3.3842,x:-18.15,y:91.75,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:69.9271,x:51.7,y:-26.4,regY:-1.1,regX:-31.5}},{t:this.instance_12,p:{regY:7.9,rotation:4.5321,x:145.75,y:85.85,regX:-6,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_11,p:{scaleX:0.9985,scaleY:0.9985,rotation:12.0318,x:155.8,y:90.2,regY:3}},{t:this.instance_10,p:{rotation:-14.2421,x:18.95,y:93.55,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{regY:-53.5,scaleX:0.9981,scaleY:0.9981,rotation:-9.1696,x:38.7,y:187.55}},{t:this.instance_8,p:{x:-1.5}},{t:this.instance_7,p:{rotation:0.0612,x:-1.1,y:-58.05}},{t:this.instance_6,p:{scaleX:0.9986,scaleY:0.9986,rotation:10.7408,x:-27.25,y:189.55,regX:3.2}},{t:this.instance_5,p:{x:-3.25}},{t:this.instance_4,p:{scaleX:0.9991,scaleY:0.9991,rotation:1.9622,x:-0.8,y:-79.15,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-115.5379,x:-79.25,y:50.4,regX:40.6}},{t:this.instance_2,p:{regY:-8.3,rotation:-74.2589,x:-43.9,y:123.15,scaleX:0.9985,scaleY:0.9985,regX:5.7}},{t:this.instance_1,p:{scaleX:0.9984,scaleY:0.9984,rotation:-97.1225,x:-47.7,y:131.4,regX:6.4}},{t:this.instance,p:{rotation:-70.3355,x:-53.1,y:-22.9,scaleX:0.9984,scaleY:0.9984,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9985,scaleY:0.9985,rotation:34.2649,x:76.75,y:43.6,regX:-39.8}},{t:this.instance_14,p:{regY:-45.7,scaleX:0.9988,scaleY:0.9988,rotation:3.393,x:-18.85,y:91.75,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:70.7831,x:51,y:-26.3,regY:-1.1,regX:-31.5}},{t:this.instance_12,p:{regY:8,rotation:5.6871,x:143.1,y:87.7,regX:-6,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_11,p:{scaleX:0.9985,scaleY:0.9985,rotation:13.1785,x:153.2,y:92.1,regY:2.9}},{t:this.instance_10,p:{rotation:-14.2555,x:18.3,y:93.55,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_9,p:{regY:-53.5,scaleX:0.9981,scaleY:0.9981,rotation:-9.1696,x:38.05,y:187.55}},{t:this.instance_8,p:{x:-2.2}},{t:this.instance_7,p:{rotation:0.0499,x:-1.85,y:-58.05}},{t:this.instance_6,p:{scaleX:0.9986,scaleY:0.9986,rotation:10.7639,x:-27.95,y:189.6,regX:3.2}},{t:this.instance_5,p:{x:-3.95}},{t:this.instance_4,p:{scaleX:0.9991,scaleY:0.9991,rotation:1.5385,x:-1.4,y:-79.1,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-117.3851,x:-80.05,y:50.45,regX:40.5}},{t:this.instance_2,p:{regY:-8.3,rotation:-76.112,x:-42.4,y:121.8,scaleX:0.9985,scaleY:0.9985,regX:5.8}},{t:this.instance_1,p:{scaleX:0.9984,scaleY:0.9984,rotation:-98.9851,x:-46.05,y:130.3,regX:6.4}},{t:this.instance,p:{rotation:-70.1674,x:-53.85,y:-22.9,scaleX:0.9984,scaleY:0.9984,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9985,scaleY:0.9985,rotation:35.4342,x:74.95,y:43.9,regX:-39.9}},{t:this.instance_14,p:{regY:-45.7,scaleX:0.9988,scaleY:0.9988,rotation:3.4009,x:-19.5,y:91.75,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:71.6376,x:50.4,y:-26.35,regY:-1.1,regX:-31.5}},{t:this.instance_12,p:{regY:8,rotation:6.8419,x:140.45,y:89.5,regX:-6,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_11,p:{scaleX:0.9985,scaleY:0.9985,rotation:14.3242,x:150.35,y:94.1,regY:3}},{t:this.instance_10,p:{rotation:-14.2684,x:17.6,y:93.55,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{regY:-53.5,scaleX:0.9981,scaleY:0.9981,rotation:-9.1687,x:37.4,y:187.55}},{t:this.instance_8,p:{x:-2.85}},{t:this.instance_7,p:{rotation:0.0394,x:-2.5,y:-58.05}},{t:this.instance_6,p:{scaleX:0.9987,scaleY:0.9987,rotation:10.788,x:-28.55,y:189.55,regX:3.3}},{t:this.instance_5,p:{x:-4.6}},{t:this.instance_4,p:{scaleX:0.9991,scaleY:0.9991,rotation:1.1158,x:-2.1,y:-79.2,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-119.2327,x:-81,y:50.3,regX:40.6}},{t:this.instance_2,p:{regY:-8.3,rotation:-77.9647,x:-40.95,y:120.55,scaleX:0.9985,scaleY:0.9985,regX:5.7}},{t:this.instance_1,p:{scaleX:0.9984,scaleY:0.9984,rotation:-100.8449,x:-44.35,y:129.05,regX:6.4}},{t:this.instance,p:{rotation:-69.9998,x:-54.55,y:-22.9,scaleX:0.9985,scaleY:0.9985,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9985,scaleY:0.9985,rotation:36.6015,x:73.35,y:44.4,regX:-39.8}},{t:this.instance_14,p:{regY:-45.7,scaleX:0.9988,scaleY:0.9988,rotation:3.4097,x:-20.2,y:91.7,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:72.4926,x:49.7,y:-26.35,regY:-1.1,regX:-31.5}},{t:this.instance_12,p:{regY:8,rotation:7.996,x:137.8,y:91.1,regX:-6,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_11,p:{scaleX:0.9985,scaleY:0.9985,rotation:15.4694,x:147.7,y:96.05,regY:3}},{t:this.instance_10,p:{rotation:-14.282,x:16.9,y:93.55,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{regY:-53.5,scaleX:0.9981,scaleY:0.9981,rotation:-9.1687,x:36.75,y:187.55}},{t:this.instance_8,p:{x:-3.55}},{t:this.instance_7,p:{rotation:0.0289,x:-3.15,y:-58.05}},{t:this.instance_6,p:{scaleX:0.9986,scaleY:0.9986,rotation:10.812,x:-29.35,y:189.55,regX:3.2}},{t:this.instance_5,p:{x:-5.3}},{t:this.instance_4,p:{scaleX:0.9991,scaleY:0.9991,rotation:0.6922,x:-2.8,y:-79.15,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-121.0797,x:-81.95,y:50.2,regX:40.6}},{t:this.instance_2,p:{regY:-8.3,rotation:-79.8164,x:-39.6,y:119.25,scaleX:0.9985,scaleY:0.9985,regX:5.7}},{t:this.instance_1,p:{scaleX:0.9984,scaleY:0.9984,rotation:-102.7062,x:-42.7,y:127.75,regX:6.4}},{t:this.instance,p:{rotation:-69.832,x:-55.25,y:-22.85,scaleX:0.9985,scaleY:0.9985,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9985,scaleY:0.9985,rotation:37.77,x:71.65,y:44.75,regX:-39.8}},{t:this.instance_14,p:{regY:-45.7,scaleX:0.9988,scaleY:0.9988,rotation:3.4185,x:-20.9,y:91.7,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:73.3484,x:49,y:-26.25,regY:-1.1,regX:-31.5}},{t:this.instance_12,p:{regY:8,rotation:9.1504,x:135.15,y:92.85,regX:-6,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_11,p:{scaleX:0.9985,scaleY:0.9985,rotation:16.6155,x:144.9,y:97.75,regY:2.9}},{t:this.instance_10,p:{rotation:-14.2954,x:16.3,y:93.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{regY:-53.5,scaleX:0.9981,scaleY:0.9981,rotation:-9.1678,x:36.1,y:187.55}},{t:this.instance_8,p:{x:-4.2}},{t:this.instance_7,p:{rotation:0.0175,x:-3.8,y:-58.05}},{t:this.instance_6,p:{scaleX:0.9986,scaleY:0.9986,rotation:10.8362,x:-30,y:189.55,regX:3.3}},{t:this.instance_5,p:{x:-5.95}},{t:this.instance_4,p:{scaleX:0.9991,scaleY:0.9991,rotation:0.2704,x:-3.45,y:-79.15,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-122.9285,x:-82.8,y:50.1,regX:40.6}},{t:this.instance_2,p:{regY:-8.3,rotation:-81.6687,x:-38.4,y:117.7,scaleX:0.9985,scaleY:0.9985,regX:5.7}},{t:this.instance_1,p:{scaleX:0.9984,scaleY:0.9984,rotation:-104.5661,x:-41.1,y:126.35,regX:6.4}},{t:this.instance,p:{rotation:-69.6633,x:-55.95,y:-22.9,scaleX:0.9985,scaleY:0.9985,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9985,scaleY:0.9985,rotation:38.9381,x:69.9,y:45.1,regX:-39.8}},{t:this.instance_14,p:{regY:-45.7,scaleX:0.9988,scaleY:0.9988,rotation:3.4272,x:-21.4,y:91.7,regX:2.3}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:74.2052,x:48.35,y:-26.3,regY:-1.1,regX:-31.5}},{t:this.instance_12,p:{regY:7.9,rotation:10.3054,x:132.4,y:94.35,regX:-6,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_11,p:{scaleX:0.9986,scaleY:0.9986,rotation:17.7607,x:142.05,y:99.7,regY:3}},{t:this.instance_10,p:{rotation:-14.3088,x:15.55,y:93.5,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_9,p:{regY:-53.5,scaleX:0.9981,scaleY:0.9981,rotation:-9.1678,x:35.45,y:187.55}},{t:this.instance_8,p:{x:-4.9}},{t:this.instance_7,p:{rotation:0.007,x:-4.55,y:-58.05}},{t:this.instance_6,p:{scaleX:0.9986,scaleY:0.9986,rotation:10.8603,x:-30.75,y:189.55,regX:3.2}},{t:this.instance_5,p:{x:-6.65}},{t:this.instance_4,p:{scaleX:0.9991,scaleY:0.9991,rotation:-0.1479,x:-4.2,y:-79.15,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-124.7755,x:-83.7,y:50.05,regX:40.6}},{t:this.instance_2,p:{regY:-8.3,rotation:-83.5212,x:-37.05,y:116.2,scaleX:0.9985,scaleY:0.9985,regX:5.7}},{t:this.instance_1,p:{scaleX:0.9984,scaleY:0.9984,rotation:-106.4272,x:-39.6,y:124.9,regX:6.4}},{t:this.instance,p:{rotation:-69.497,x:-56.55,y:-22.9,scaleX:0.9985,scaleY:0.9985,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9985,scaleY:0.9985,rotation:40.1061,x:68.1,y:45.5,regX:-39.8}},{t:this.instance_14,p:{regY:-45.7,scaleX:0.9988,scaleY:0.9988,rotation:3.436,x:-22.25,y:91.7,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:75.058,x:47.65,y:-26.35,regY:-1.1,regX:-31.6}},{t:this.instance_12,p:{regY:8,rotation:11.4573,x:129.75,y:96.1,regX:-6,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_11,p:{scaleX:0.9985,scaleY:0.9985,rotation:18.9059,x:139.3,y:101.55,regY:3}},{t:this.instance_10,p:{rotation:-14.3215,x:15,y:93.55,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_9,p:{regY:-53.5,scaleX:0.9981,scaleY:0.9981,rotation:-9.1678,x:34.8,y:187.55}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{rotation:-0.0009,x:-5.15,y:-58.1}},{t:this.instance_6,p:{scaleX:0.9987,scaleY:0.9987,rotation:10.8843,x:-31.5,y:189.6,regX:3.2}},{t:this.instance_5,p:{x:-7.35}},{t:this.instance_4,p:{scaleX:0.9991,scaleY:0.9991,rotation:-0.5714,x:-4.75,y:-79.1,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-126.6226,x:-84.55,y:49.95,regX:40.6}},{t:this.instance_2,p:{regY:-8.3,rotation:-85.3722,x:-35.75,y:114.7,scaleX:0.9986,scaleY:0.9986,regX:5.7}},{t:this.instance_1,p:{scaleX:0.9984,scaleY:0.9984,rotation:-108.2871,x:-38,y:123.6,regX:6.3}},{t:this.instance,p:{rotation:-69.3286,x:-57.25,y:-22.85,scaleX:0.9985,scaleY:0.9985,regY:0.4}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-92.3,-210.2,303.9,514.3);


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
	this.instance = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance.setTransform(-89.4,44,0.9986,0.9986,-120.6632,0,0,44.1,-0.1);

	this.instance_1 = new lib.ch1_uArm_rcopy_1("synched",0);
	this.instance_1.setTransform(-57.35,-22.95,0.9986,0.9986,-64.2462,0,0,35.6,0.2);

	this.instance_2 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_2.setTransform(-42.7,124.2,0.9985,0.9985,-86.3585,0,0,6.8,-1.5);

	this.instance_3 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_3.setTransform(-46,116.85,0.9986,0.9986,-120.9373,0,0,5.6,-9.1);

	this.instance_4 = new lib.ch1_headcopy_1("synched",0);
	this.instance_4.setTransform(-5.3,-79.25,0.9991,0.9991,1.7275,0,0,0.2,53);

	this.instance_5 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_5.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_6 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_6.setTransform(-33.05,187.25,0.9986,0.9986,3.092,0,0,1.7,-55.6);

	this.instance_7 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_7.setTransform(-5.3,-58.05,0.9992,0.9992,-1.6775,0,0,-0.8,8.9);

	this.instance_8 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_8.setTransform(-5.6,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_9 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_9.setTransform(36.25,186.05,0.9982,0.9982,-8.0941,0,0,3.2,-53.8);

	this.instance_10 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_10.setTransform(18.3,91.3,0.9983,0.9983,-13.4708,0,0,-0.8,1.1);

	this.instance_11 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_11.setTransform(108.4,118.4,0.9986,0.9986,35.3162,0,0,-5.2,3.1);

	this.instance_12 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_12.setTransform(102.4,109.65,0.9987,0.9987,38.4613,0,0,-6,8.6);

	this.instance_13 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_13.setTransform(58.6,43.05,0.9986,0.9986,56.4493,0,0,-39.6,-0.9);

	this.instance_14 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_14.setTransform(47.85,-26.15,0.9986,0.9986,81.191,0,0,-31.3,-1.2);

	this.instance_15 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_15.setTransform(-19.85,92.1,0.9987,0.9987,5.296,0,0,2.2,-46.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{regX:2.2,scaleX:0.9987,scaleY:0.9987,rotation:5.296,x:-19.85,y:92.1}},{t:this.instance_14,p:{regX:-31.3,scaleY:0.9986,rotation:81.191,y:-26.15,scaleX:0.9986,x:47.85}},{t:this.instance_13,p:{rotation:56.4493,x:58.6,y:43.05,scaleX:0.9986,scaleY:0.9986,regY:-0.9,regX:-39.6}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:38.4613,x:102.4,y:109.65,regY:8.6}},{t:this.instance_11,p:{regX:-5.2,scaleX:0.9986,scaleY:0.9986,rotation:35.3162,x:108.4,y:118.4,regY:3.1}},{t:this.instance_10,p:{scaleX:0.9983,scaleY:0.9983,x:18.3,y:91.3,rotation:-13.4708}},{t:this.instance_9,p:{rotation:-8.0941,x:36.25,y:186.05,regX:3.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.8,regY:8.9,rotation:-1.6775,x:-5.3,y:-58.05}},{t:this.instance_6,p:{regY:-55.6,rotation:3.092,x:-33.05,y:187.25,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.2,regY:53,rotation:1.7275,x:-5.3,y:-79.25}},{t:this.instance_3,p:{scaleX:0.9986,scaleY:0.9986,rotation:-120.9373,x:-46,y:116.85,regX:5.6,regY:-9.1}},{t:this.instance_2,p:{regY:-1.5,scaleX:0.9985,scaleY:0.9985,rotation:-86.3585,x:-42.7,y:124.2,regX:6.8}},{t:this.instance_1,p:{regY:0.2,scaleX:0.9986,scaleY:0.9986,rotation:-64.2462,x:-57.35,y:-22.95,regX:35.6}},{t:this.instance,p:{scaleX:0.9986,scaleY:0.9986,rotation:-120.6632,x:-89.4,y:44}}]}).to({state:[{t:this.instance_15,p:{regX:2.1,scaleX:0.9986,scaleY:0.9986,rotation:5.2946,x:-19.9,y:92.05}},{t:this.instance_14,p:{regX:-31.2,scaleY:0.9985,rotation:81.5286,y:-26,scaleX:0.9986,x:47.85}},{t:this.instance_13,p:{rotation:54.1274,x:58.2,y:43,scaleX:0.9986,scaleY:0.9986,regY:-0.9,regX:-39.6}},{t:this.instance_12,p:{scaleX:0.9986,scaleY:0.9986,rotation:36.1392,x:104.75,y:107.8,regY:8.6}},{t:this.instance_11,p:{regX:-5.1,scaleX:0.9985,scaleY:0.9985,rotation:32.9924,x:111.1,y:116.4,regY:3.1}},{t:this.instance_10,p:{scaleX:0.9982,scaleY:0.9982,x:18.25,y:91.3,rotation:-13.4708}},{t:this.instance_9,p:{rotation:-8.0927,x:36.2,y:186,regX:3.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,regY:9,rotation:-1.6549,x:-5.35,y:-57.85}},{t:this.instance_6,p:{regY:-55.5,rotation:3.0904,x:-33.05,y:187.25,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.1,regY:52.9,rotation:1.9693,x:-5.25,y:-79.35}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-122.7072,x:-43.1,y:115.8,regX:5.6,regY:-9.1}},{t:this.instance_2,p:{regY:-1.6,scaleX:0.9984,scaleY:0.9984,rotation:-88.1284,x:-39.7,y:123.1,regX:6.8}},{t:this.instance_1,p:{regY:0.3,scaleX:0.9985,scaleY:0.9985,rotation:-64.8197,x:-57.45,y:-23,regX:35.6}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-122.4343,x:-88.65,y:44.3}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,scaleX:0.9986,scaleY:0.9986,rotation:5.2946,x:-19.9,y:92.05}},{t:this.instance_14,p:{regX:-31.2,scaleY:0.9985,rotation:81.8674,y:-25.95,scaleX:0.9985,x:47.85}},{t:this.instance_13,p:{rotation:51.8032,x:57.75,y:43,scaleX:0.9985,scaleY:0.9985,regY:-0.9,regX:-39.6}},{t:this.instance_12,p:{scaleX:0.9986,scaleY:0.9986,rotation:33.8156,x:106.85,y:105.95,regY:8.6}},{t:this.instance_11,p:{regX:-5.1,scaleX:0.9985,scaleY:0.9985,rotation:30.6682,x:113.55,y:114.2,regY:3.1}},{t:this.instance_10,p:{scaleX:0.9982,scaleY:0.9982,x:18.25,y:91.25,rotation:-13.4708}},{t:this.instance_9,p:{rotation:-8.0927,x:36.2,y:186,regX:3.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,regY:9,rotation:-1.633,x:-5.3,y:-57.9}},{t:this.instance_6,p:{regY:-55.5,rotation:3.0904,x:-33.05,y:187.25,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.1,regY:53,rotation:2.2127,x:-5.3,y:-79.25}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-124.4771,x:-40.3,y:114.75,regX:5.6,regY:-9.1}},{t:this.instance_2,p:{regY:-1.6,scaleX:0.9984,scaleY:0.9984,rotation:-89.8984,x:-36.6,y:121.85,regX:6.8}},{t:this.instance_1,p:{regY:0.2,scaleX:0.9985,scaleY:0.9985,rotation:-65.3927,x:-57.45,y:-23,regX:35.6}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-124.2039,x:-88,y:44.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,scaleX:0.9986,scaleY:0.9986,rotation:5.2946,x:-19.9,y:92.05}},{t:this.instance_14,p:{regX:-31.2,scaleY:0.9985,rotation:82.2051,y:-25.95,scaleX:0.9985,x:47.9}},{t:this.instance_13,p:{rotation:49.4794,x:57.35,y:43.1,scaleX:0.9985,scaleY:0.9985,regY:-0.9,regX:-39.6}},{t:this.instance_12,p:{scaleX:0.9986,scaleY:0.9986,rotation:31.492,x:109,y:103.95,regY:8.6}},{t:this.instance_11,p:{regX:-5.2,scaleX:0.9985,scaleY:0.9985,rotation:28.3458,x:115.95,y:111.85,regY:3.1}},{t:this.instance_10,p:{scaleX:0.9982,scaleY:0.9982,x:18.25,y:91.25,rotation:-13.4708}},{t:this.instance_9,p:{rotation:-8.0927,x:36.2,y:186,regX:3.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,regY:9,rotation:-1.6111,x:-5.3,y:-57.9}},{t:this.instance_6,p:{regY:-55.5,rotation:3.0904,x:-33.05,y:187.25,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.1,regY:53,rotation:2.4553,x:-5.3,y:-79.25}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-126.2475,x:-37.4,y:113.5,regX:5.6,regY:-9.1}},{t:this.instance_2,p:{regY:-1.6,scaleX:0.9984,scaleY:0.9984,rotation:-91.664,x:-33.5,y:120.5,regX:6.8}},{t:this.instance_1,p:{regY:0.3,scaleX:0.9985,scaleY:0.9985,rotation:-65.9652,x:-57.4,y:-22.95,regX:35.5}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-125.9738,x:-87.25,y:44.9}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,scaleX:0.9986,scaleY:0.9986,rotation:5.2946,x:-19.9,y:92.05}},{t:this.instance_14,p:{regX:-31.2,scaleY:0.9985,rotation:82.5453,y:-26,scaleX:0.9985,x:47.85}},{t:this.instance_13,p:{rotation:47.1568,x:56.95,y:43.15,scaleX:0.9985,scaleY:0.9985,regY:-0.9,regX:-39.6}},{t:this.instance_12,p:{scaleX:0.9986,scaleY:0.9986,rotation:29.1685,x:110.9,y:102,regY:8.7}},{t:this.instance_11,p:{regX:-5.2,scaleX:0.9985,scaleY:0.9985,rotation:26.0227,x:118.25,y:109.6,regY:3.2}},{t:this.instance_10,p:{scaleX:0.9982,scaleY:0.9982,x:18.25,y:91.25,rotation:-13.4708}},{t:this.instance_9,p:{rotation:-8.0927,x:36.2,y:186,regX:3.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,regY:8.9,rotation:-1.591,x:-5.25,y:-58.05}},{t:this.instance_6,p:{regY:-55.5,rotation:3.0895,x:-33.05,y:187.25,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.1,regY:53,rotation:2.6997,x:-5.3,y:-79.2}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-128.0182,x:-34.65,y:112.25,regX:5.6,regY:-9.1}},{t:this.instance_2,p:{regY:-1.6,scaleX:0.9984,scaleY:0.9984,rotation:-93.4346,x:-30.55,y:119.1,regX:6.8}},{t:this.instance_1,p:{regY:0.2,scaleX:0.9985,scaleY:0.9985,rotation:-66.538,x:-57.45,y:-22.9,regX:35.5}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-127.7439,x:-86.6,y:45.25}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,scaleX:0.9986,scaleY:0.9986,rotation:5.2937,x:-19.9,y:92.05}},{t:this.instance_14,p:{regX:-31.2,scaleY:0.9985,rotation:82.8835,y:-26,scaleX:0.9985,x:47.85}},{t:this.instance_13,p:{rotation:44.8328,x:56.6,y:43.1,scaleX:0.9985,scaleY:0.9985,regY:-1,regX:-39.6}},{t:this.instance_12,p:{scaleX:0.9986,scaleY:0.9986,rotation:26.845,x:112.9,y:99.7,regY:8.6}},{t:this.instance_11,p:{regX:-5.1,scaleX:0.9985,scaleY:0.9985,rotation:23.6984,x:120.6,y:107.1,regY:3.1}},{t:this.instance_10,p:{scaleX:0.9982,scaleY:0.9982,x:18.25,y:91.25,rotation:-13.4708}},{t:this.instance_9,p:{rotation:-8.0927,x:36.2,y:186,regX:3.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,regY:8.9,rotation:-1.5691,x:-5.3,y:-58.05}},{t:this.instance_6,p:{regY:-55.5,rotation:3.0895,x:-33.05,y:187.25,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.1,regY:53,rotation:2.9424,x:-5.25,y:-79.2}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-129.7871,x:-32,y:110.8,regX:5.7,regY:-9.1}},{t:this.instance_2,p:{regY:-1.6,scaleX:0.9984,scaleY:0.9984,rotation:-95.2043,x:-27.6,y:117.6,regX:6.8}},{t:this.instance_1,p:{regY:0.3,scaleX:0.9985,scaleY:0.9985,rotation:-67.1099,x:-57.35,y:-22.95,regX:35.5}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-129.5138,x:-85.95,y:45.5}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,scaleX:0.9986,scaleY:0.9986,rotation:5.2937,x:-19.9,y:92.05}},{t:this.instance_14,p:{regX:-31.2,scaleY:0.9985,rotation:83.2221,y:-26,scaleX:0.9985,x:47.8}},{t:this.instance_13,p:{rotation:42.5098,x:56.05,y:43.25,scaleX:0.9985,scaleY:0.9985,regY:-0.9,regX:-39.6}},{t:this.instance_12,p:{scaleX:0.9986,scaleY:0.9986,rotation:24.5204,x:114.75,y:97.4,regY:8.6}},{t:this.instance_11,p:{regX:-5.2,scaleX:0.9985,scaleY:0.9985,rotation:21.3753,x:122.6,y:104.5,regY:3.2}},{t:this.instance_10,p:{scaleX:0.9982,scaleY:0.9982,x:18.25,y:91.25,rotation:-13.4708}},{t:this.instance_9,p:{rotation:-8.0927,x:36.2,y:186,regX:3.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,regY:8.9,rotation:-1.5481,x:-5.25,y:-58.05}},{t:this.instance_6,p:{regY:-55.5,rotation:3.0895,x:-33.05,y:187.25,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.1,regY:52.9,rotation:3.186,x:-5.3,y:-79.3}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-131.5581,x:-29.2,y:109.5,regX:5.6,regY:-9.1}},{t:this.instance_2,p:{regY:-1.6,scaleX:0.9984,scaleY:0.9984,rotation:-96.9745,x:-24.75,y:116.1,regX:6.8}},{t:this.instance_1,p:{regY:0.2,scaleX:0.9985,scaleY:0.9985,rotation:-67.6825,x:-57.45,y:-22.9,regX:35.5}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-131.2846,x:-85.25,y:45.75}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,scaleX:0.9986,scaleY:0.9986,rotation:5.2937,x:-19.9,y:92.05}},{t:this.instance_14,p:{regX:-31.2,scaleY:0.9985,rotation:83.5606,y:-26,scaleX:0.9985,x:47.85}},{t:this.instance_13,p:{rotation:40.1858,x:55.75,y:43.25,scaleX:0.9985,scaleY:0.9985,regY:-1,regX:-39.6}},{t:this.instance_12,p:{scaleX:0.9986,scaleY:0.9986,rotation:22.1971,x:116.45,y:95.1,regY:8.6}},{t:this.instance_11,p:{regX:-5.2,scaleX:0.9985,scaleY:0.9985,rotation:19.0513,x:124.65,y:101.7,regY:3.1}},{t:this.instance_10,p:{scaleX:0.9982,scaleY:0.9982,x:18.25,y:91.25,rotation:-13.4708}},{t:this.instance_9,p:{rotation:-8.0927,x:36.15,y:186,regX:3.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,regY:8.9,rotation:-1.5262,x:-5.3,y:-58.05}},{t:this.instance_6,p:{regY:-55.5,rotation:3.0895,x:-33.05,y:187.25,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.1,regY:53,rotation:3.4288,x:-5.25,y:-79.25}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-133.3275,x:-26.65,y:108.1,regX:5.6,regY:-9.2}},{t:this.instance_2,p:{regY:-1.6,scaleX:0.9984,scaleY:0.9984,rotation:-98.7442,x:-21.9,y:114.55,regX:6.7}},{t:this.instance_1,p:{regY:0.3,scaleX:0.9985,scaleY:0.9985,rotation:-68.2557,x:-57.3,y:-23.05,regX:35.6}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-133.055,x:-84.45,y:46}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,scaleX:0.9986,scaleY:0.9986,rotation:5.2937,x:-19.9,y:92.05}},{t:this.instance_14,p:{regX:-31.3,scaleY:0.9985,rotation:83.898,y:-26.15,scaleX:0.9985,x:47.9}},{t:this.instance_13,p:{rotation:37.8633,x:55.25,y:43.35,scaleX:0.9986,scaleY:0.9986,regY:-0.9,regX:-39.6}},{t:this.instance_12,p:{scaleX:0.9986,scaleY:0.9986,rotation:19.8742,x:118.1,y:92.55,regY:8.6}},{t:this.instance_11,p:{regX:-5.2,scaleX:0.9985,scaleY:0.9985,rotation:16.7278,x:126.55,y:98.95,regY:3.1}},{t:this.instance_10,p:{scaleX:0.9982,scaleY:0.9982,x:18.25,y:91.25,rotation:-13.4708}},{t:this.instance_9,p:{rotation:-8.0928,x:36.15,y:186,regX:3.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,regY:8.9,rotation:-1.5052,x:-5.2,y:-58}},{t:this.instance_6,p:{regY:-55.5,rotation:3.0887,x:-33.05,y:187.25,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.1,regY:53,rotation:3.6725,x:-5.3,y:-79.2}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-135.0978,x:-23.9,y:106.5,regX:5.5,regY:-9.1}},{t:this.instance_2,p:{regY:-1.6,scaleX:0.9984,scaleY:0.9984,rotation:-100.5144,x:-19.15,y:112.7,regX:6.8}},{t:this.instance_1,p:{regY:0.2,scaleX:0.9985,scaleY:0.9985,rotation:-68.8296,x:-57.45,y:-22.95,regX:35.5}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-134.826,x:-83.8,y:46.3}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,scaleX:0.9986,scaleY:0.9986,rotation:5.2929,x:-19.9,y:92.05}},{t:this.instance_14,p:{regX:-31.2,scaleY:0.9985,rotation:84.2368,y:-26,scaleX:0.9985,x:47.8}},{t:this.instance_13,p:{rotation:35.5407,x:54.75,y:43.3,scaleX:0.9986,scaleY:0.9986,regY:-0.9,regX:-39.6}},{t:this.instance_12,p:{scaleX:0.9986,scaleY:0.9986,rotation:17.5501,x:119.6,y:90.05,regY:8.6}},{t:this.instance_11,p:{regX:-5.2,scaleX:0.9985,scaleY:0.9985,rotation:14.4038,x:128.3,y:96,regY:3.1}},{t:this.instance_10,p:{scaleX:0.9982,scaleY:0.9982,x:18.25,y:91.25,rotation:-13.4708}},{t:this.instance_9,p:{rotation:-8.0928,x:36.15,y:186,regX:3.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,regY:8.9,rotation:-1.4833,x:-5.25,y:-58}},{t:this.instance_6,p:{regY:-55.5,rotation:3.0887,x:-33.05,y:187.25,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.1,regY:53,rotation:3.9164,x:-5.2,y:-79.2}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-136.8683,x:-21.55,y:104.95,regX:5.6,regY:-9.2}},{t:this.instance_2,p:{regY:-1.6,scaleX:0.9984,scaleY:0.9984,rotation:-102.2849,x:-16.45,y:111,regX:6.8}},{t:this.instance_1,p:{regY:0.2,scaleX:0.9985,scaleY:0.9985,rotation:-69.4013,x:-57.45,y:-23,regX:35.5}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-136.5957,x:-83.15,y:46.55}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,scaleX:0.9986,scaleY:0.9986,rotation:5.2929,x:-19.9,y:92.05}},{t:this.instance_14,p:{regX:-31.2,scaleY:0.9985,rotation:84.5756,y:-26,scaleX:0.9985,x:47.8}},{t:this.instance_13,p:{rotation:33.2165,x:54.45,y:43.4,scaleX:0.9985,scaleY:0.9985,regY:-0.9,regX:-39.6}},{t:this.instance_12,p:{scaleX:0.9986,scaleY:0.9986,rotation:15.2265,x:120.95,y:87.5,regY:8.7}},{t:this.instance_11,p:{regX:-5.2,scaleX:0.9985,scaleY:0.9985,rotation:12.0809,x:129.95,y:93.05,regY:3.1}},{t:this.instance_10,p:{scaleX:0.9982,scaleY:0.9982,x:18.25,y:91.25,rotation:-13.4708}},{t:this.instance_9,p:{rotation:-8.0928,x:36.15,y:186,regX:3.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,regY:8.9,rotation:-1.4623,x:-5.2,y:-58}},{t:this.instance_6,p:{regY:-55.5,rotation:3.0887,x:-33.05,y:187.25,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.1,regY:53,rotation:4.1584,x:-5.3,y:-79.2}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-138.638,x:-18.95,y:103.15,regX:5.6,regY:-9.1}},{t:this.instance_2,p:{regY:-1.6,scaleX:0.9984,scaleY:0.9984,rotation:-104.0556,x:-13.8,y:109.15,regX:6.8}},{t:this.instance_1,p:{regY:0.3,scaleX:0.9985,scaleY:0.9985,rotation:-69.9753,x:-57.3,y:-22.95,regX:35.5}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-138.3668,x:-82.35,y:46.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,scaleX:0.9986,scaleY:0.9986,rotation:5.2929,x:-19.9,y:92.05}},{t:this.instance_14,p:{regX:-31.2,scaleY:0.9985,rotation:84.915,y:-26.05,scaleX:0.9986,x:47.8}},{t:this.instance_13,p:{rotation:30.8923,x:53.95,y:43.4,scaleX:0.9986,scaleY:0.9986,regY:-0.9,regX:-39.6}},{t:this.instance_12,p:{scaleX:0.9986,scaleY:0.9986,rotation:12.9031,x:122.35,y:84.65,regY:8.6}},{t:this.instance_11,p:{regX:-5.2,scaleX:0.9985,scaleY:0.9985,rotation:9.757,x:131.6,y:89.9,regY:3.1}},{t:this.instance_10,p:{scaleX:0.9982,scaleY:0.9982,x:18.25,y:91.25,rotation:-13.4708}},{t:this.instance_9,p:{rotation:-8.0928,x:36.15,y:186,regX:3.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,regY:8.9,rotation:-1.4404,x:-5.3,y:-58}},{t:this.instance_6,p:{regY:-55.5,rotation:3.0887,x:-33.05,y:187.25,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.1,regY:53,rotation:4.4016,x:-5.25,y:-79.25}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-140.4081,x:-16.55,y:101.4,regX:5.6,regY:-9.1}},{t:this.instance_2,p:{regY:-1.6,scaleX:0.9984,scaleY:0.9984,rotation:-105.8258,x:-11.25,y:107.25,regX:6.8}},{t:this.instance_1,p:{regY:0.2,scaleX:0.9985,scaleY:0.9985,rotation:-70.5475,x:-57.45,y:-22.9,regX:35.5}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-140.1362,x:-81.65,y:47.1}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,scaleX:0.9986,scaleY:0.9986,rotation:5.2929,x:-19.9,y:92.05}},{t:this.instance_14,p:{regX:-31.2,scaleY:0.9985,rotation:85.2534,y:-26.05,scaleX:0.9986,x:47.8}},{t:this.instance_13,p:{rotation:28.569,x:53.55,y:43.4,scaleX:0.9986,scaleY:0.9986,regY:-0.9,regX:-39.6}},{t:this.instance_12,p:{scaleX:0.9986,scaleY:0.9986,rotation:10.5792,x:123.5,y:82,regY:8.6}},{t:this.instance_11,p:{regX:-5.2,scaleX:0.9985,scaleY:0.9985,rotation:7.4333,x:132.9,y:86.8,regY:3.1}},{t:this.instance_10,p:{scaleX:0.9982,scaleY:0.9982,x:18.25,y:91.25,rotation:-13.4708}},{t:this.instance_9,p:{rotation:-8.0928,x:36.15,y:186,regX:3.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,regY:8.9,rotation:-1.4194,x:-5.25,y:-58}},{t:this.instance_6,p:{regY:-55.5,rotation:3.0878,x:-33.05,y:187.25,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.1,regY:53,rotation:4.6456,x:-5.3,y:-79.25}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-142.179,x:-14.1,y:99.7,regX:5.5,regY:-9.1}},{t:this.instance_2,p:{regY:-1.6,scaleX:0.9984,scaleY:0.9984,rotation:-107.5962,x:-8.6,y:105.3,regX:6.8}},{t:this.instance_1,p:{regY:0.2,scaleX:0.9985,scaleY:0.9985,rotation:-71.1193,x:-57.45,y:-23,regX:35.5}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-141.9063,x:-80.95,y:47.4}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,scaleX:0.9986,scaleY:0.9986,rotation:5.2921,x:-19.9,y:92.05}},{t:this.instance_14,p:{regX:-31.2,scaleY:0.9985,rotation:85.5924,y:-26.05,scaleX:0.9985,x:47.8}},{t:this.instance_13,p:{rotation:26.2452,x:53.25,y:43.5,scaleX:0.9986,scaleY:0.9986,regY:-0.9,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9986,scaleY:0.9986,rotation:8.2565,x:124.65,y:79.1,regY:8.6}},{t:this.instance_11,p:{regX:-5.2,scaleX:0.9985,scaleY:0.9985,rotation:5.1104,x:134.15,y:83.6,regY:3.1}},{t:this.instance_10,p:{scaleX:0.9982,scaleY:0.9982,x:18.25,y:91.25,rotation:-13.4708}},{t:this.instance_9,p:{rotation:-8.0928,x:36.15,y:186,regX:3.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,regY:8.9,rotation:-1.3975,x:-5.3,y:-58}},{t:this.instance_6,p:{regY:-55.5,rotation:3.0878,x:-33.05,y:187.25,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.1,regY:53,rotation:4.8897,x:-5.25,y:-79.25}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-143.9493,x:-11.85,y:97.8,regX:5.6,regY:-9.1}},{t:this.instance_2,p:{regY:-1.6,scaleX:0.9984,scaleY:0.9984,rotation:-109.3663,x:-6.2,y:103.3,regX:6.8}},{t:this.instance_1,p:{regY:0.3,scaleX:0.9985,scaleY:0.9985,rotation:-71.6921,x:-57.3,y:-22.95,regX:35.5}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-143.6766,x:-80.3,y:47.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,scaleX:0.9986,scaleY:0.9986,rotation:5.2921,x:-19.95,y:92.05}},{t:this.instance_14,p:{regX:-31.3,scaleY:0.9985,rotation:85.9304,y:-26.15,scaleX:0.9985,x:47.8}},{t:this.instance_13,p:{rotation:23.9235,x:52.65,y:43.5,scaleX:0.9985,scaleY:0.9985,regY:-0.8,regX:-39.6}},{t:this.instance_12,p:{scaleX:0.9986,scaleY:0.9986,rotation:5.9325,x:125.6,y:76.3,regY:8.7}},{t:this.instance_11,p:{regX:-5.2,scaleX:0.9985,scaleY:0.9985,rotation:2.7879,x:135.3,y:80.3,regY:3.1}},{t:this.instance_10,p:{scaleX:0.9982,scaleY:0.9982,x:18.2,y:91.25,rotation:-13.4708}},{t:this.instance_9,p:{rotation:-8.092,x:36.1,y:185.95,regX:3.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,regY:8.9,rotation:-1.3765,x:-5.25,y:-57.95}},{t:this.instance_6,p:{regY:-55.5,rotation:3.0878,x:-33.05,y:187.25,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.1,regY:53,rotation:5.1322,x:-5.2,y:-79.2}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-145.7188,x:-9.65,y:95.9,regX:5.5,regY:-9.1}},{t:this.instance_2,p:{regY:-1.6,scaleX:0.9984,scaleY:0.9984,rotation:-111.1358,x:-3.95,y:101.2,regX:6.8}},{t:this.instance_1,p:{regY:0.3,scaleX:0.9986,scaleY:0.9986,rotation:-72.2669,x:-57.3,y:-22.95,regX:35.5}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-145.4471,x:-79.55,y:47.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2.2,scaleX:0.9986,scaleY:0.9986,rotation:5.2832,x:-19.8,y:92.05}},{t:this.instance_14,p:{regX:-31.2,scaleY:0.9985,rotation:85.6267,y:-26.05,scaleX:0.9986,x:47.75}},{t:this.instance_13,p:{rotation:26.1089,x:53.1,y:43.5,scaleX:0.9986,scaleY:0.9986,regY:-0.9,regX:-39.6}},{t:this.instance_12,p:{scaleX:0.9986,scaleY:0.9986,rotation:8.1336,x:124.65,y:78.95,regY:8.6}},{t:this.instance_11,p:{regX:-5.1,scaleX:0.9985,scaleY:0.9985,rotation:5.0076,x:134.35,y:83.4,regY:3.1}},{t:this.instance_10,p:{scaleX:0.9982,scaleY:0.9982,x:18.25,y:91.25,rotation:-13.488}},{t:this.instance_9,p:{rotation:-8.1247,x:36.15,y:185.95,regX:3.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,regY:8.9,rotation:-1.3993,x:-5.3,y:-58}},{t:this.instance_6,p:{regY:-55.5,rotation:3.0738,x:-33.1,y:187.35,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.1,regY:53,rotation:4.9056,x:-5.3,y:-79.25}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-144.0259,x:-11.85,y:97.55,regX:5.7,regY:-9.1}},{t:this.instance_2,p:{regY:-1.6,scaleX:0.9984,scaleY:0.9984,rotation:-109.4571,x:-6.05,y:103.15,regX:6.8}},{t:this.instance_1,p:{regY:0.2,scaleX:0.9985,scaleY:0.9985,rotation:-71.7254,x:-57.45,y:-23,regX:35.5}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-143.7712,x:-80.2,y:47.65}}]},1).to({state:[{t:this.instance_15,p:{regX:2.2,scaleX:0.9986,scaleY:0.9986,rotation:5.2735,x:-19.8,y:92.1}},{t:this.instance_14,p:{regX:-31.2,scaleY:0.9985,rotation:85.321,y:-26.1,scaleX:0.9985,x:47.85}},{t:this.instance_13,p:{rotation:28.2956,x:53.6,y:43.45,scaleX:0.9985,scaleY:0.9985,regY:-0.9,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9986,scaleY:0.9986,rotation:10.3369,x:123.65,y:81.55,regY:8.6}},{t:this.instance_11,p:{regX:-5.2,scaleX:0.9985,scaleY:0.9985,rotation:7.2286,x:133.05,y:86.4,regY:3.1}},{t:this.instance_10,p:{scaleX:0.9982,scaleY:0.9982,x:18.25,y:91.25,rotation:-13.5069}},{t:this.instance_9,p:{rotation:-8.1575,x:36.25,y:185.95,regX:3.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,regY:8.9,rotation:-1.422,x:-5.3,y:-58}},{t:this.instance_6,p:{regY:-55.5,rotation:3.058,x:-33.05,y:187.35,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.1,regY:52.9,rotation:4.6764,x:-5.2,y:-79.4}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-142.3326,x:-14,y:99.45,regX:5.6,regY:-9.2}},{t:this.instance_2,p:{regY:-1.5,scaleX:0.9984,scaleY:0.9984,rotation:-107.7773,x:-8.3,y:105,regX:6.8}},{t:this.instance_1,p:{regY:0.3,scaleX:0.9985,scaleY:0.9985,rotation:-71.1868,x:-57.3,y:-22.9,regX:35.5}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-142.0964,x:-80.9,y:47.4}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,scaleX:0.9986,scaleY:0.9986,rotation:5.2647,x:-19.95,y:92.1}},{t:this.instance_14,p:{regX:-31.2,scaleY:0.9985,rotation:85.017,y:-26.05,scaleX:0.9986,x:47.85}},{t:this.instance_13,p:{rotation:30.4825,x:53.8,y:43.45,scaleX:0.9985,scaleY:0.9985,regY:-0.9,regX:-39.6}},{t:this.instance_12,p:{scaleX:0.9986,scaleY:0.9986,rotation:12.538,x:122.5,y:84.3,regY:8.6}},{t:this.instance_11,p:{regX:-5.1,scaleX:0.9985,scaleY:0.9985,rotation:9.4481,x:131.8,y:89.45,regY:3.1}},{t:this.instance_10,p:{scaleX:0.9982,scaleY:0.9982,x:18.25,y:91.25,rotation:-13.5258}},{t:this.instance_9,p:{rotation:-8.1918,x:36.3,y:185.95,regX:3.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,regY:8.9,rotation:-1.4448,x:-5.3,y:-58}},{t:this.instance_6,p:{regY:-55.5,rotation:3.0422,x:-33,y:187.35,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.1,regY:53,rotation:4.4489,x:-5.25,y:-79.25}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-140.6395,x:-16.05,y:101.25,regX:5.5,regY:-9.1}},{t:this.instance_2,p:{regY:-1.6,scaleX:0.9984,scaleY:0.9984,rotation:-106.0966,x:-10.8,y:107,regX:6.7}},{t:this.instance_1,p:{regY:0.2,scaleX:0.9985,scaleY:0.9985,rotation:-70.6477,x:-57.45,y:-23,regX:35.5}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-140.4215,x:-81.55,y:47.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,scaleX:0.9986,scaleY:0.9986,rotation:5.2551,x:-19.95,y:92.1}},{t:this.instance_14,p:{regX:-31.2,scaleY:0.9985,rotation:84.712,y:-26.05,scaleX:0.9985,x:47.85}},{t:this.instance_13,p:{rotation:32.6692,x:54.2,y:43.4,scaleX:0.9985,scaleY:0.9985,regY:-0.9,regX:-39.6}},{t:this.instance_12,p:{scaleX:0.9986,scaleY:0.9986,rotation:14.7402,x:121.3,y:86.8,regY:8.6}},{t:this.instance_11,p:{regX:-5.2,scaleX:0.9985,scaleY:0.9985,rotation:11.6695,x:130.25,y:92.4,regY:3.1}},{t:this.instance_10,p:{scaleX:0.9982,scaleY:0.9982,x:18.25,y:91.25,rotation:-13.5447}},{t:this.instance_9,p:{rotation:-8.2247,x:36.15,y:185.9,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,regY:8.9,rotation:-1.4675,x:-5.25,y:-58}},{t:this.instance_6,p:{regY:-55.5,rotation:3.0282,x:-33,y:187.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.1,regY:53,rotation:4.2216,x:-5.25,y:-79.2}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-138.9464,x:-18.35,y:102.85,regX:5.5,regY:-9.1}},{t:this.instance_2,p:{regY:-1.6,scaleX:0.9984,scaleY:0.9984,rotation:-104.4173,x:-13.25,y:108.7,regX:6.8}},{t:this.instance_1,p:{regY:0.2,scaleX:0.9985,scaleY:0.9985,rotation:-70.1077,x:-57.45,y:-22.95,regX:35.5}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-138.7458,x:-82.2,y:46.95}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,scaleX:0.9986,scaleY:0.9986,rotation:5.2471,x:-19.9,y:92.1}},{t:this.instance_14,p:{regX:-31.2,scaleY:0.9985,rotation:84.4067,y:-26,scaleX:0.9986,x:47.8}},{t:this.instance_13,p:{rotation:34.8557,x:54.65,y:43.3,scaleX:0.9986,scaleY:0.9986,regY:-0.9,regX:-39.6}},{t:this.instance_12,p:{scaleX:0.9986,scaleY:0.9986,rotation:16.9425,x:119.95,y:89.3,regY:8.6}},{t:this.instance_11,p:{regX:-5.2,scaleX:0.9985,scaleY:0.9985,rotation:13.8908,x:128.7,y:95.15,regY:3.1}},{t:this.instance_10,p:{scaleX:0.9982,scaleY:0.9982,x:18.25,y:91.25,rotation:-13.5627}},{t:this.instance_9,p:{rotation:-8.2592,x:36.3,y:185.9,regX:3.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,regY:8.9,rotation:-1.4903,x:-5.25,y:-58}},{t:this.instance_6,p:{regY:-55.5,rotation:3.0133,x:-33,y:187.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.1,regY:52.9,rotation:3.9936,x:-5.3,y:-79.35}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-137.2518,x:-20.75,y:104.4,regX:5.6,regY:-9.1}},{t:this.instance_2,p:{regY:-1.6,scaleX:0.9984,scaleY:0.9984,rotation:-102.737,x:-15.6,y:110.65,regX:6.7}},{t:this.instance_1,p:{regY:0.2,scaleX:0.9985,scaleY:0.9985,rotation:-69.5687,x:-57.5,y:-23,regX:35.5}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-137.0714,x:-82.95,y:46.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,scaleX:0.9986,scaleY:0.9986,rotation:5.2383,x:-19.9,y:92.1}},{t:this.instance_14,p:{regX:-31.2,scaleY:0.9985,rotation:84.1023,y:-26,scaleX:0.9986,x:47.85}},{t:this.instance_13,p:{rotation:37.044,x:55.05,y:43.45,scaleX:0.9986,scaleY:0.9986,regY:-0.9,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9986,scaleY:0.9986,rotation:19.1443,x:118.6,y:91.7,regY:8.6}},{t:this.instance_11,p:{regX:-5.2,scaleX:0.9985,scaleY:0.9985,rotation:16.1118,x:127.1,y:97.85,regY:3.1}},{t:this.instance_10,p:{scaleX:0.9982,scaleY:0.9982,x:18.25,y:91.25,rotation:-13.5808}},{t:this.instance_9,p:{rotation:-8.2917,x:36.35,y:185.9,regX:3.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,regY:8.9,rotation:-1.5131,x:-5.25,y:-58.05}},{t:this.instance_6,p:{regY:-55.5,rotation:2.9984,x:-32.95,y:187.35,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.1,regY:53,rotation:3.7655,x:-5.25,y:-79.2}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-135.5585,x:-23.1,y:105.95,regX:5.6,regY:-9.1}},{t:this.instance_2,p:{regY:-1.6,scaleX:0.9984,scaleY:0.9984,rotation:-101.0573,x:-18.25,y:112.2,regX:6.8}},{t:this.instance_1,p:{regY:0.3,scaleX:0.9985,scaleY:0.9985,rotation:-69.0286,x:-57.3,y:-22.9,regX:35.5}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-135.3956,x:-83.55,y:46.45}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,scaleX:0.9986,scaleY:0.9986,rotation:5.2286,x:-19.9,y:92.1}},{t:this.instance_14,p:{regX:-31.2,scaleY:0.9985,rotation:83.7984,y:-26,scaleX:0.9985,x:47.85}},{t:this.instance_13,p:{rotation:39.2296,x:55.3,y:43.3,scaleX:0.9986,scaleY:0.9986,regY:-0.9,regX:-39.6}},{t:this.instance_12,p:{scaleX:0.9986,scaleY:0.9986,rotation:21.3449,x:117,y:94.05,regY:8.6}},{t:this.instance_11,p:{regX:-5.2,scaleX:0.9985,scaleY:0.9985,rotation:18.3322,x:125.3,y:100.7,regY:3.2}},{t:this.instance_10,p:{scaleX:0.9982,scaleY:0.9982,x:18.3,y:91.3,rotation:-13.5997}},{t:this.instance_9,p:{rotation:-8.3256,x:36.3,y:185.9,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,regY:8.9,rotation:-1.5358,x:-5.3,y:-58.05}},{t:this.instance_6,p:{regY:-55.5,rotation:2.9835,x:-32.95,y:187.35,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.1,regY:53,rotation:3.5393,x:-5.3,y:-79.2}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-133.8657,x:-25.55,y:107.4,regX:5.6,regY:-9.1}},{t:this.instance_2,p:{regY:-1.6,scaleX:0.9984,scaleY:0.9984,rotation:-99.3781,x:-20.85,y:113.85,regX:6.8}},{t:this.instance_1,p:{regY:0.2,scaleX:0.9985,scaleY:0.9985,rotation:-68.4895,x:-57.45,y:-23.05,regX:35.5}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-133.7208,x:-84.2,y:46.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.2,scaleX:0.9986,scaleY:0.9986,rotation:5.2199,x:-19.8,y:92.05}},{t:this.instance_14,p:{regX:-31.2,scaleY:0.9985,rotation:83.4919,y:-26,scaleX:0.9985,x:47.85}},{t:this.instance_13,p:{rotation:41.4167,x:55.85,y:43.35,scaleX:0.9985,scaleY:0.9985,regY:-0.9,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9986,scaleY:0.9986,rotation:23.5481,x:115.4,y:96.3,regY:8.6}},{t:this.instance_11,p:{regX:-5.2,scaleX:0.9985,scaleY:0.9985,rotation:20.5516,x:123.4,y:103.25,regY:3.1}},{t:this.instance_10,p:{scaleX:0.9982,scaleY:0.9982,x:18.25,y:91.25,rotation:-13.6186}},{t:this.instance_9,p:{rotation:-8.3584,x:36.45,y:185.9,regX:3.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,regY:8.9,rotation:-1.5586,x:-5.3,y:-58.05}},{t:this.instance_6,p:{regY:-55.5,rotation:2.9686,x:-32.95,y:187.35,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.1,regY:53,rotation:3.3105,x:-5.25,y:-79.25}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-132.1725,x:-28.05,y:108.8,regX:5.6,regY:-9.1}},{t:this.instance_2,p:{regY:-1.6,scaleX:0.9984,scaleY:0.9984,rotation:-97.6985,x:-23.55,y:115.4,regX:6.8}},{t:this.instance_1,p:{regY:0.2,scaleX:0.9985,scaleY:0.9985,rotation:-67.9489,x:-57.45,y:-23,regX:35.5}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-132.0461,x:-84.85,y:45.9}}]},1).to({state:[{t:this.instance_15,p:{regX:2.2,scaleX:0.9986,scaleY:0.9986,rotation:5.2093,x:-19.8,y:92.05}},{t:this.instance_14,p:{regX:-31.2,scaleY:0.9985,rotation:83.1886,y:-26.05,scaleX:0.9985,x:47.85}},{t:this.instance_13,p:{rotation:43.6032,x:56.15,y:43.25,scaleX:0.9986,scaleY:0.9985,regY:-0.9,regX:-39.6}},{t:this.instance_12,p:{scaleX:0.9986,scaleY:0.9986,rotation:25.7502,x:113.7,y:98.55,regY:8.7}},{t:this.instance_11,p:{regX:-5.2,scaleX:0.9985,scaleY:0.9985,rotation:22.7739,x:121.45,y:105.75,regY:3.1}},{t:this.instance_10,p:{scaleX:0.9982,scaleY:0.9982,x:18.25,y:91.25,rotation:-13.6369}},{t:this.instance_9,p:{rotation:-8.392,x:36.45,y:185.85,regX:3.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,regY:8.9,rotation:-1.5813,x:-5.3,y:-58.05}},{t:this.instance_6,p:{regY:-55.5,rotation:2.9537,x:-32.9,y:187.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.1,regY:53,rotation:3.0834,x:-5.3,y:-79.2}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-130.4794,x:-30.55,y:110.2,regX:5.6,regY:-9.1}},{t:this.instance_2,p:{regY:-1.6,scaleX:0.9984,scaleY:0.9984,rotation:-96.019,x:-26.2,y:116.9,regX:6.8}},{t:this.instance_1,p:{regY:0.2,scaleX:0.9985,scaleY:0.9985,rotation:-67.4105,x:-57.45,y:-23,regX:35.5}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-130.3708,x:-85.5,y:45.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,scaleX:0.9986,scaleY:0.9986,rotation:5.2005,x:-19.9,y:92.05}},{t:this.instance_14,p:{regX:-31.2,scaleY:0.9985,rotation:82.8835,y:-26,scaleX:0.9985,x:47.85}},{t:this.instance_13,p:{rotation:45.79,x:56.55,y:43.15,scaleX:0.9985,scaleY:0.9985,regY:-0.9,regX:-39.6}},{t:this.instance_12,p:{scaleX:0.9986,scaleY:0.9986,rotation:27.9516,x:111.95,y:100.7,regY:8.7}},{t:this.instance_11,p:{regX:-5.2,scaleX:0.9985,scaleY:0.9985,rotation:24.9927,x:119.4,y:108.1,regY:3.1}},{t:this.instance_10,p:{scaleX:0.9982,scaleY:0.9982,x:18.25,y:91.25,rotation:-13.6558}},{t:this.instance_9,p:{rotation:-8.4257,x:36.5,y:185.9,regX:3.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,regY:9,rotation:-1.6041,x:-5.3,y:-57.9}},{t:this.instance_6,p:{regY:-55.5,rotation:2.9387,x:-32.9,y:187.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.1,regY:53,rotation:2.8548,x:-5.3,y:-79.2}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-128.7866,x:-33.1,y:111.5,regX:5.6,regY:-9.1}},{t:this.instance_2,p:{regY:-1.6,scaleX:0.9984,scaleY:0.9984,rotation:-94.3395,x:-28.9,y:118.35,regX:6.8}},{t:this.instance_1,p:{regY:0.2,scaleX:0.9985,scaleY:0.9985,rotation:-66.8702,x:-57.45,y:-22.95,regX:35.5}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-128.6959,x:-86.25,y:45.35}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,scaleX:0.9986,scaleY:0.9986,rotation:5.1909,x:-19.9,y:92.05}},{t:this.instance_14,p:{regX:-31.2,scaleY:0.9985,rotation:82.5798,y:-26.05,scaleX:0.9985,x:47.9}},{t:this.instance_13,p:{rotation:47.9761,x:56.85,y:43.2,scaleX:0.9985,scaleY:0.9985,regY:-0.9,regX:-39.6}},{t:this.instance_12,p:{scaleX:0.9986,scaleY:0.9986,rotation:30.1535,x:110.05,y:102.75,regY:8.7}},{t:this.instance_11,p:{regX:-5.2,scaleX:0.9985,scaleY:0.9985,rotation:27.2139,x:117.3,y:110.4,regY:3.1}},{t:this.instance_10,p:{scaleX:0.9982,scaleY:0.9982,x:18.25,y:91.25,rotation:-13.6747}},{t:this.instance_9,p:{rotation:-8.4591,x:36.55,y:185.9,regX:3.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,regY:9,rotation:-1.6251,x:-5.3,y:-57.9}},{t:this.instance_6,p:{regY:-55.5,rotation:2.923,x:-32.85,y:187.35,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.1,regY:53,rotation:2.6279,x:-5.35,y:-79.2}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-127.0928,x:-35.65,y:112.9,regX:5.5,regY:-9.1}},{t:this.instance_2,p:{regY:-1.6,scaleX:0.9984,scaleY:0.9984,rotation:-92.6595,x:-31.75,y:119.7,regX:6.8}},{t:this.instance_1,p:{regY:0.3,scaleX:0.9985,scaleY:0.9985,rotation:-66.3298,x:-57.35,y:-22.95,regX:35.5}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-127.0198,x:-86.8,y:45.05}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,scaleX:0.9986,scaleY:0.9986,rotation:5.1821,x:-19.9,y:92.05}},{t:this.instance_14,p:{regX:-31.2,scaleY:0.9985,rotation:82.2733,y:-25.95,scaleX:0.9985,x:47.85}},{t:this.instance_13,p:{rotation:50.1647,x:57.3,y:43.05,scaleX:0.9985,scaleY:0.9985,regY:-1,regX:-39.6}},{t:this.instance_12,p:{scaleX:0.9986,scaleY:0.9986,rotation:32.3559,x:108.25,y:104.65,regY:8.6}},{t:this.instance_11,p:{regX:-5.2,scaleX:0.9985,scaleY:0.9985,rotation:29.4336,x:115.05,y:112.6,regY:3.1}},{t:this.instance_10,p:{scaleX:0.9982,scaleY:0.9982,x:18.25,y:91.3,rotation:-13.6925}},{t:this.instance_9,p:{rotation:-8.492,x:36.5,y:185.9,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,regY:9,rotation:-1.6487,x:-5.35,y:-57.85}},{t:this.instance_6,p:{regY:-55.5,rotation:2.908,x:-32.85,y:187.35,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.1,regY:53,rotation:2.3993,x:-5.25,y:-79.25}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-125.4002,x:-38.35,y:113.9,regX:5.6,regY:-9.1}},{t:this.instance_2,p:{regY:-1.6,scaleX:0.9984,scaleY:0.9984,rotation:-90.979,x:-34.6,y:121.05,regX:6.8}},{t:this.instance_1,p:{regY:0.2,scaleX:0.9985,scaleY:0.9985,rotation:-65.7908,x:-57.35,y:-23.05,regX:35.6}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-125.345,x:-87.45,y:44.85}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,scaleX:0.9986,scaleY:0.9986,rotation:5.1734,x:-19.9,y:92.05}},{t:this.instance_14,p:{regX:-31.2,scaleY:0.9985,rotation:81.9692,y:-26,scaleX:0.9985,x:47.85}},{t:this.instance_13,p:{rotation:52.3496,x:57.65,y:43.1,scaleX:0.9985,scaleY:0.9985,regY:-0.9,regX:-39.6}},{t:this.instance_12,p:{scaleX:0.9986,scaleY:0.9986,rotation:34.5587,x:106.2,y:106.4,regY:8.6}},{t:this.instance_11,p:{regX:-5.2,scaleX:0.9985,scaleY:0.9985,rotation:31.6559,x:112.6,y:114.8,regY:3.2}},{t:this.instance_10,p:{scaleX:0.9982,scaleY:0.9982,x:18.25,y:91.3,rotation:-13.7117}},{t:this.instance_9,p:{rotation:-8.5256,x:36.65,y:185.9,regX:3.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,regY:9,rotation:-1.6715,x:-5.3,y:-57.85}},{t:this.instance_6,p:{regY:-55.5,rotation:2.8931,x:-32.85,y:187.35,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.1,regY:53,rotation:2.1725,x:-5.3,y:-79.25}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-123.7066,x:-41.1,y:115.1,regX:5.6,regY:-9.1}},{t:this.instance_2,p:{regY:-1.6,scaleX:0.9984,scaleY:0.9984,rotation:-89.3038,x:-37.5,y:122.25,regX:6.8}},{t:this.instance_1,p:{regY:0.2,scaleX:0.9985,scaleY:0.9985,rotation:-65.2509,x:-57.4,y:-23.1,regX:35.6}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-123.6689,x:-88.15,y:44.45}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,scaleX:0.9986,scaleY:0.9986,rotation:5.1638,x:-19.85,y:92.1}},{t:this.instance_14,p:{regX:-31.2,scaleY:0.9985,rotation:81.6638,y:-25.9,scaleX:0.9985,x:47.95}},{t:this.instance_13,p:{rotation:54.536,x:58.1,y:43.05,scaleX:0.9985,scaleY:0.9985,regY:-0.9,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9986,scaleY:0.9986,rotation:36.7603,x:104.1,y:108.25,regY:8.6}},{t:this.instance_11,p:{regX:-5.2,scaleX:0.9985,scaleY:0.9985,rotation:33.8761,x:110.25,y:116.7,regY:3.1}},{t:this.instance_10,p:{scaleX:0.9982,scaleY:0.9982,x:18.25,y:91.35,rotation:-13.7304}},{t:this.instance_9,p:{rotation:-8.5584,x:36.65,y:185.85,regX:3.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,regY:9,rotation:-1.6934,x:-5.4,y:-57.85}},{t:this.instance_6,p:{regY:-55.5,rotation:2.8782,x:-32.8,y:187.3,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.1,regY:52.9,rotation:1.9447,x:-5.3,y:-79.35}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-122.0137,x:-43.75,y:116.05,regX:5.6,regY:-9.1}},{t:this.instance_2,p:{regY:-1.6,scaleX:0.9984,scaleY:0.9984,rotation:-87.6254,x:-40.4,y:123.35,regX:6.8}},{t:this.instance_1,p:{regY:0.3,scaleX:0.9985,scaleY:0.9985,rotation:-64.7115,x:-57.4,y:-22.9,regX:35.5}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-121.9955,x:-88.8,y:44.25}}]},1).to({state:[{t:this.instance_15,p:{regX:2.2,scaleX:0.9986,scaleY:0.9986,rotation:5.1558,x:-19.75,y:92.1}},{t:this.instance_14,p:{regX:-31.2,scaleY:0.9985,rotation:81.3596,y:-26,scaleX:0.9986,x:47.85}},{t:this.instance_13,p:{rotation:56.7225,x:58.35,y:43.05,scaleX:0.9985,scaleY:0.9985,regY:-0.9,regX:-39.6}},{t:this.instance_12,p:{scaleX:0.9986,scaleY:0.9986,rotation:38.9609,x:101.85,y:110,regY:8.7}},{t:this.instance_11,p:{regX:-5.2,scaleX:0.9985,scaleY:0.9985,rotation:36.0966,x:107.75,y:118.65,regY:3.1}},{t:this.instance_10,p:{scaleX:0.9982,scaleY:0.9982,x:18.25,y:91.35,rotation:-13.7495}},{t:this.instance_9,p:{rotation:-8.593,x:36.7,y:185.85,regX:3.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,regY:9,rotation:-1.7161,x:-5.35,y:-57.9}},{t:this.instance_6,p:{regY:-55.5,rotation:2.8633,x:-32.8,y:187.3,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.1,regY:53,rotation:1.7171,x:-5.4,y:-79.2}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-120.3209,x:-46.6,y:117.05,regX:5.6,regY:-9.1}},{t:this.instance_2,p:{regY:-1.6,scaleX:0.9984,scaleY:0.9984,rotation:-85.9459,x:-43.45,y:124.55,regX:6.7}},{t:this.instance_1,p:{regY:0.2,scaleX:0.9985,scaleY:0.9985,rotation:-64.1731,x:-57.4,y:-22.95,regX:35.5}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-120.3205,x:-89.45,y:43.85}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-129.8,-207.9,291.5,512.2);


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
	this.instance.setTransform(-57.15,-22.9,0.999,0.999,-101.3103,0,0,35.9,0.7);

	this.instance_1 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_1.setTransform(47.5,27.1,0.9988,0.9988,170.2867,0,0,6.9,-1.3);

	this.instance_2 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_2.setTransform(39.05,29.05,0.999,0.999,157.2528,0,0,5.9,-8.4);

	this.instance_3 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_3.setTransform(-42.8,50.25,0.999,0.999,165.7422,0,0,44.4,0.2);

	this.instance_4 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_4.setTransform(-5.45,-78.75,0.9994,0.9994,1.7419,0,0,0.5,53.5);

	this.instance_5 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_5.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_6 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_6.setTransform(-36.85,185.65,0.9989,0.9989,17.0042,0,0,3.2,-55);

	this.instance_7 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_7.setTransform(-4.6,-57.95,0.9994,0.9994,-1.6903,0,0,-0.1,9);

	this.instance_8 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_8.setTransform(-5.6,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_9 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_9.setTransform(48.65,181.9,0.9986,0.9986,-7.282,0,0,2.6,-54.5);

	this.instance_10 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_10.setTransform(19.35,91.25,0.9985,0.9985,-20.8672,0,0,-0.6,1.4);

	this.instance_11 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_11.setTransform(72.65,133.3,0.999,0.999,80.1607,0,0,-5.2,2.9);

	this.instance_12 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_12.setTransform(72.85,121.9,0.999,0.999,72.7687,0,0,-6.6,7.8);

	this.instance_13 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_13.setTransform(42.75,48.15,0.999,0.999,68.6201,0,0,-40.2,0);

	this.instance_14 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_14.setTransform(47.6,-26.2,0.999,0.999,94.5468,0,0,-31.9,-1);

	this.instance_15 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_15.setTransform(-24.9,89.85,0.999,0.999,5.1301,0,0,2.6,-46.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{regX:2.6,regY:-46.5,scaleX:0.999,scaleY:0.999,rotation:5.1301,x:-24.9,y:89.85}},{t:this.instance_14,p:{rotation:94.5468,y:-26.2,scaleY:0.999,x:47.6,scaleX:0.999,regX:-31.9,regY:-1}},{t:this.instance_13,p:{regX:-40.2,regY:0,rotation:68.6201,x:42.75,y:48.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_12,p:{rotation:72.7687,x:72.85,y:121.9,regX:-6.6,scaleX:0.999,scaleY:0.999,regY:7.8}},{t:this.instance_11,p:{rotation:80.1607,x:72.65,y:133.3,scaleX:0.999,scaleY:0.999,regY:2.9}},{t:this.instance_10,p:{rotation:-20.8672,x:19.35,y:91.25,regY:1.4}},{t:this.instance_9,p:{scaleX:0.9986,scaleY:0.9986,rotation:-7.282,x:48.65,y:181.9,regX:2.6,regY:-54.5}},{t:this.instance_8},{t:this.instance_7,p:{rotation:-1.6903,x:-4.6,y:-57.95}},{t:this.instance_6,p:{rotation:17.0042,x:-36.85,y:185.65,regX:3.2,regY:-55}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.5,rotation:1.7419,x:-5.45,y:-78.75,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_3,p:{scaleX:0.999,scaleY:0.999,rotation:165.7422,x:-42.8,y:50.25,regY:0.2,regX:44.4}},{t:this.instance_2,p:{rotation:157.2528,x:39.05,y:29.05,regY:-8.4,scaleX:0.999,scaleY:0.999,regX:5.9}},{t:this.instance_1,p:{regY:-1.3,rotation:170.2867,x:47.5,y:27.1,regX:6.9,scaleX:0.9988,scaleY:0.9988}},{t:this.instance,p:{regX:35.9,scaleX:0.999,scaleY:0.999,rotation:-101.3103,x:-57.15,y:-22.9,regY:0.7}}]}).to({state:[{t:this.instance_15,p:{regX:2.5,regY:-46.4,scaleX:0.9989,scaleY:0.9989,rotation:5.1286,x:-24.95,y:89.8}},{t:this.instance_14,p:{rotation:95.7377,y:-26.25,scaleY:0.999,x:47.6,scaleX:0.999,regX:-31.9,regY:-1}},{t:this.instance_13,p:{regX:-40.1,regY:-0.1,rotation:67.1879,x:41.3,y:48,scaleX:0.999,scaleY:0.999}},{t:this.instance_12,p:{rotation:71.3362,x:73.1,y:120.95,regX:-6.6,scaleX:0.999,scaleY:0.999,regY:7.8}},{t:this.instance_11,p:{rotation:78.7278,x:73.2,y:132.25,scaleX:0.999,scaleY:0.999,regY:2.9}},{t:this.instance_10,p:{rotation:-20.866,x:19.25,y:91.2,regY:1.4}},{t:this.instance_9,p:{scaleX:0.9985,scaleY:0.9985,rotation:-7.2817,x:48.6,y:181.85,regX:2.6,regY:-54.5}},{t:this.instance_8},{t:this.instance_7,p:{rotation:-1.6711,x:-4.5,y:-57.9}},{t:this.instance_6,p:{rotation:17.0033,x:-36.75,y:185.6,regX:3.2,regY:-55}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.4,rotation:2.0842,x:-5.4,y:-78.8,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_3,p:{scaleX:0.9989,scaleY:0.9989,rotation:168.6039,x:-41.7,y:50,regY:0.2,regX:44.4}},{t:this.instance_2,p:{rotation:160.1122,x:41.05,y:32.8,regY:-8.4,scaleX:0.999,scaleY:0.999,regX:5.9}},{t:this.instance_1,p:{regY:-1.4,rotation:173.148,x:49.65,y:31.35,regX:6.9,scaleX:0.9988,scaleY:0.9988}},{t:this.instance,p:{regX:35.8,scaleX:0.9989,scaleY:0.9989,rotation:-102.2096,x:-57.1,y:-22.85,regY:0.7}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,regY:-46.4,scaleX:0.9989,scaleY:0.9989,rotation:5.1286,x:-24.95,y:89.8}},{t:this.instance_14,p:{rotation:96.9301,y:-26.3,scaleY:0.9989,x:47.55,scaleX:0.999,regX:-31.9,regY:-1}},{t:this.instance_13,p:{regX:-40.1,regY:-0.1,rotation:65.7546,x:39.75,y:47.85,scaleX:0.999,scaleY:0.999}},{t:this.instance_12,p:{rotation:69.9026,x:73.4,y:120,regX:-6.6,scaleX:0.999,scaleY:0.999,regY:7.8}},{t:this.instance_11,p:{rotation:77.295,x:73.7,y:131.35,scaleX:0.9989,scaleY:0.9989,regY:2.9}},{t:this.instance_10,p:{rotation:-20.866,x:19.25,y:91.2,regY:1.4}},{t:this.instance_9,p:{scaleX:0.9985,scaleY:0.9985,rotation:-7.2817,x:48.6,y:181.85,regX:2.6,regY:-54.5}},{t:this.instance_8},{t:this.instance_7,p:{rotation:-1.6528,x:-4.55,y:-57.9}},{t:this.instance_6,p:{rotation:17.0033,x:-36.75,y:185.6,regX:3.2,regY:-55}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.4,rotation:2.4274,x:-5.35,y:-78.8,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_3,p:{scaleX:0.9989,scaleY:0.9989,rotation:171.4629,x:-40.55,y:49.75,regY:0.2,regX:44.4}},{t:this.instance_2,p:{rotation:162.9725,x:42.95,y:36.7,regY:-8.4,scaleX:0.999,scaleY:0.999,regX:5.9}},{t:this.instance_1,p:{regY:-1.4,rotation:176.0077,x:51.8,y:35.65,regX:6.8,scaleX:0.9988,scaleY:0.9988}},{t:this.instance,p:{regX:35.8,scaleX:0.9989,scaleY:0.9989,rotation:-103.1092,x:-57.1,y:-22.85,regY:0.7}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,regY:-46.4,scaleX:0.9989,scaleY:0.9989,rotation:5.1286,x:-24.95,y:89.8}},{t:this.instance_14,p:{rotation:98.1219,y:-26.25,scaleY:0.9989,x:47.6,scaleX:0.9989,regX:-31.9,regY:-1}},{t:this.instance_13,p:{regX:-40.1,regY:-0.1,rotation:64.3207,x:38.2,y:47.7,scaleX:0.999,scaleY:0.999}},{t:this.instance_12,p:{rotation:68.4689,x:73.7,y:118.9,regX:-6.6,scaleX:0.999,scaleY:0.999,regY:7.8}},{t:this.instance_11,p:{rotation:75.861,x:74.4,y:130.2,scaleX:0.9989,scaleY:0.9989,regY:2.8}},{t:this.instance_10,p:{rotation:-20.866,x:19.25,y:91.2,regY:1.4}},{t:this.instance_9,p:{scaleX:0.9985,scaleY:0.9985,rotation:-7.2817,x:48.6,y:181.85,regX:2.6,regY:-54.5}},{t:this.instance_8},{t:this.instance_7,p:{rotation:-1.6352,x:-4.5,y:-57.95}},{t:this.instance_6,p:{rotation:17.0033,x:-36.75,y:185.6,regX:3.2,regY:-55}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.4,rotation:2.7716,x:-5.35,y:-78.85,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_3,p:{scaleX:0.9989,scaleY:0.9989,rotation:174.3228,x:-39.5,y:49.45,regY:0.2,regX:44.4}},{t:this.instance_2,p:{rotation:165.833,x:44.75,y:40.7,regY:-8.5,scaleX:0.999,scaleY:0.999,regX:5.9}},{t:this.instance_1,p:{regY:-1.4,rotation:178.8681,x:53.4,y:40.05,regX:6.9,scaleX:0.9988,scaleY:0.9988}},{t:this.instance,p:{regX:35.8,scaleX:0.9989,scaleY:0.9989,rotation:-104.0106,x:-57.1,y:-22.8,regY:0.7}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,regY:-46.4,scaleX:0.9989,scaleY:0.9989,rotation:5.1277,x:-24.95,y:89.8}},{t:this.instance_14,p:{rotation:99.3156,y:-26.25,scaleY:0.9989,x:47.55,scaleX:0.9989,regX:-31.9,regY:-1}},{t:this.instance_13,p:{regX:-40.1,regY:0,rotation:62.889,x:36.6,y:47.5,scaleX:0.999,scaleY:0.999}},{t:this.instance_12,p:{rotation:67.0369,x:73.9,y:117.9,regX:-6.5,scaleX:0.999,scaleY:0.999,regY:7.8}},{t:this.instance_11,p:{rotation:74.4287,x:74.8,y:129.1,scaleX:0.999,scaleY:0.999,regY:2.9}},{t:this.instance_10,p:{rotation:-20.866,x:19.25,y:91.2,regY:1.4}},{t:this.instance_9,p:{scaleX:0.9985,scaleY:0.9985,rotation:-7.2817,x:48.6,y:181.85,regX:2.6,regY:-54.5}},{t:this.instance_8},{t:this.instance_7,p:{rotation:-1.6169,x:-4.5,y:-57.95}},{t:this.instance_6,p:{rotation:17.0016,x:-36.75,y:185.6,regX:3.2,regY:-55}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.4,rotation:3.115,x:-5.3,y:-78.8,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_3,p:{scaleX:0.9989,scaleY:0.9989,rotation:177.1841,x:-38.35,y:49.2,regY:0.2,regX:44.4}},{t:this.instance_2,p:{rotation:168.694,x:46.1,y:44.5,regY:-8.4,scaleX:0.999,scaleY:0.999,regX:5.9}},{t:this.instance_1,p:{regY:-1.4,rotation:-178.2762,x:54.75,y:44.35,regX:6.9,scaleX:0.9988,scaleY:0.9988}},{t:this.instance,p:{regX:35.8,scaleX:0.9989,scaleY:0.9989,rotation:-104.9098,x:-57.1,y:-22.8,regY:0.7}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,regY:-46.4,scaleX:0.9989,scaleY:0.9989,rotation:5.1277,x:-24.95,y:89.8}},{t:this.instance_14,p:{rotation:100.5061,y:-26.25,scaleY:0.9989,x:47.55,scaleX:0.9989,regX:-31.9,regY:-1}},{t:this.instance_13,p:{regX:-40.1,regY:-0.1,rotation:61.4553,x:35.15,y:47.2,scaleX:0.999,scaleY:0.999}},{t:this.instance_12,p:{rotation:65.6038,x:74.1,y:116.65,regX:-6.6,scaleX:0.999,scaleY:0.999,regY:7.8}},{t:this.instance_11,p:{rotation:72.996,x:75.45,y:127.85,scaleX:0.999,scaleY:0.999,regY:2.8}},{t:this.instance_10,p:{rotation:-20.8651,x:19.2,y:91.2,regY:1.4}},{t:this.instance_9,p:{scaleX:0.9985,scaleY:0.9985,rotation:-7.2817,x:48.6,y:181.85,regX:2.6,regY:-54.5}},{t:this.instance_8},{t:this.instance_7,p:{rotation:-1.5985,x:-4.45,y:-57.95}},{t:this.instance_6,p:{rotation:17.0016,x:-36.7,y:185.6,regX:3.2,regY:-55}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.4,rotation:3.4584,x:-5.3,y:-78.8,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_3,p:{scaleX:0.9989,scaleY:0.9989,rotation:-179.9606,x:-37.2,y:48.8,regY:0.2,regX:44.4}},{t:this.instance_2,p:{rotation:171.5548,x:47.35,y:48.4,regY:-8.4,scaleX:0.999,scaleY:0.999,regX:5.9}},{t:this.instance_1,p:{regY:-1.4,rotation:-175.4162,x:56.15,y:48.7,regX:6.8,scaleX:0.9988,scaleY:0.9988}},{t:this.instance,p:{regX:35.8,scaleX:0.9989,scaleY:0.9989,rotation:-105.8103,x:-57.2,y:-22.75,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,regY:-46.4,scaleX:0.9989,scaleY:0.9989,rotation:5.1277,x:-24.95,y:89.8}},{t:this.instance_14,p:{rotation:101.6985,y:-26.25,scaleY:0.9989,x:47.6,scaleX:0.9989,regX:-31.9,regY:-1}},{t:this.instance_13,p:{regX:-40.1,regY:-0.1,rotation:60.0212,x:33.65,y:46.95,scaleX:0.999,scaleY:0.999}},{t:this.instance_12,p:{rotation:64.17,x:74.3,y:115.3,regX:-6.6,scaleX:0.999,scaleY:0.999,regY:7.8}},{t:this.instance_11,p:{rotation:71.5626,x:75.8,y:126.5,scaleX:0.999,scaleY:0.999,regY:2.9}},{t:this.instance_10,p:{rotation:-20.8651,x:19.2,y:91.2,regY:1.4}},{t:this.instance_9,p:{scaleX:0.9985,scaleY:0.9985,rotation:-7.2817,x:48.6,y:181.85,regX:2.6,regY:-54.5}},{t:this.instance_8},{t:this.instance_7,p:{rotation:-1.5819,x:-4.5,y:-57.95}},{t:this.instance_6,p:{rotation:17.0016,x:-36.7,y:185.6,regX:3.2,regY:-55}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.4,rotation:3.8038,x:-5.3,y:-78.8,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_3,p:{scaleX:0.9989,scaleY:0.9989,rotation:-177.1,x:-36.1,y:48.55,regY:0.2,regX:44.4}},{t:this.instance_2,p:{rotation:174.4154,x:48.4,y:52.25,regY:-8.4,scaleX:0.999,scaleY:0.999,regX:5.9}},{t:this.instance_1,p:{regY:-1.4,rotation:-172.5561,x:57.05,y:53.1,regX:6.9,scaleX:0.9988,scaleY:0.9988}},{t:this.instance,p:{regX:35.8,scaleX:0.9989,scaleY:0.9989,rotation:-106.7112,x:-57.3,y:-22.75,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,regY:-46.4,scaleX:0.9989,scaleY:0.9989,rotation:5.1277,x:-24.95,y:89.8}},{t:this.instance_14,p:{rotation:102.891,y:-26.25,scaleY:0.9989,x:47.5,scaleX:0.9989,regX:-31.9,regY:-1}},{t:this.instance_13,p:{regX:-40.2,regY:-0.1,rotation:58.5881,x:32.05,y:46.55,scaleX:0.999,scaleY:0.999}},{t:this.instance_12,p:{rotation:62.7371,x:74.45,y:113.95,regX:-6.6,scaleX:0.9989,scaleY:0.9989,regY:7.8}},{t:this.instance_11,p:{rotation:70.1294,x:76.25,y:125.15,scaleX:0.9989,scaleY:0.9989,regY:2.9}},{t:this.instance_10,p:{rotation:-20.8651,x:19.2,y:91.2,regY:1.4}},{t:this.instance_9,p:{scaleX:0.9985,scaleY:0.9985,rotation:-7.2809,x:48.6,y:181.8,regX:2.6,regY:-54.5}},{t:this.instance_8},{t:this.instance_7,p:{rotation:-1.5635,x:-4.5,y:-57.95}},{t:this.instance_6,p:{rotation:17.0016,x:-36.7,y:185.6,regX:3.2,regY:-55}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.5,rotation:4.1466,x:-5.3,y:-78.7,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_3,p:{scaleX:0.9989,scaleY:0.9989,rotation:-174.2392,x:-35.1,y:48.15,regY:0.2,regX:44.4}},{t:this.instance_2,p:{rotation:177.2755,x:49.15,y:56.3,regY:-8.5,scaleX:0.999,scaleY:0.999,regX:5.9}},{t:this.instance_1,p:{regY:-1.4,rotation:-169.6949,x:57.75,y:57.35,regX:6.9,scaleX:0.9988,scaleY:0.9988}},{t:this.instance,p:{regX:35.8,scaleX:0.9989,scaleY:0.9989,rotation:-107.6104,x:-57.15,y:-22.8,regY:0.7}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,regY:-46.4,scaleX:0.9989,scaleY:0.9989,rotation:5.1277,x:-24.95,y:89.8}},{t:this.instance_14,p:{rotation:104.0827,y:-26.15,scaleY:0.9989,x:47.5,scaleX:0.9989,regX:-31.8,regY:-1}},{t:this.instance_13,p:{regX:-40.1,regY:-0.1,rotation:57.1551,x:30.6,y:46.25,scaleX:0.999,scaleY:0.999}},{t:this.instance_12,p:{rotation:61.3034,x:74.6,y:112.5,regX:-6.6,scaleX:0.999,scaleY:0.999,regY:7.8}},{t:this.instance_11,p:{rotation:68.6961,x:76.65,y:123.75,scaleX:0.9989,scaleY:0.9989,regY:2.9}},{t:this.instance_10,p:{rotation:-20.8651,x:19.2,y:91.2,regY:1.4}},{t:this.instance_9,p:{scaleX:0.9985,scaleY:0.9985,rotation:-7.2809,x:48.6,y:181.8,regX:2.6,regY:-54.5}},{t:this.instance_8},{t:this.instance_7,p:{rotation:-1.5451,x:-4.45,y:-57.95}},{t:this.instance_6,p:{rotation:17.0016,x:-36.7,y:185.6,regX:3.2,regY:-55}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.4,rotation:4.4907,x:-5.35,y:-78.75,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_3,p:{scaleX:0.9989,scaleY:0.9989,rotation:-171.3789,x:-33.9,y:47.8,regY:0.2,regX:44.4}},{t:this.instance_2,p:{rotation:-179.8687,x:49.85,y:60,regY:-8.4,scaleX:0.999,scaleY:0.999,regX:5.9}},{t:this.instance_1,p:{regY:-1.4,rotation:-166.8349,x:58.4,y:61.6,regX:6.9,scaleX:0.9988,scaleY:0.9988}},{t:this.instance,p:{regX:35.8,scaleX:0.9989,scaleY:0.9989,rotation:-108.5108,x:-57.1,y:-22.75,regY:0.7}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,regY:-46.4,scaleX:0.9989,scaleY:0.9989,rotation:5.1268,x:-24.95,y:89.8}},{t:this.instance_14,p:{rotation:105.2749,y:-26.25,scaleY:0.9989,x:47.55,scaleX:0.9989,regX:-31.9,regY:-1}},{t:this.instance_13,p:{regX:-40.2,regY:-0.1,rotation:55.7213,x:29.1,y:45.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_12,p:{rotation:59.8714,x:74.75,y:111,regX:-6.6,scaleX:0.999,scaleY:0.999,regY:7.8}},{t:this.instance_11,p:{rotation:67.2637,x:77.1,y:122.15,scaleX:0.9989,scaleY:0.9989,regY:2.9}},{t:this.instance_10,p:{rotation:-20.8651,x:19.2,y:91.2,regY:1.4}},{t:this.instance_9,p:{scaleX:0.9985,scaleY:0.9985,rotation:-7.2809,x:48.6,y:181.8,regX:2.6,regY:-54.5}},{t:this.instance_8},{t:this.instance_7,p:{rotation:-1.5276,x:-4.5,y:-57.95}},{t:this.instance_6,p:{rotation:17.0016,x:-36.7,y:185.6,regX:3.2,regY:-55}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.5,rotation:4.8339,x:-5.35,y:-78.75,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_3,p:{scaleX:0.9989,scaleY:0.9989,rotation:-168.5191,x:-32.8,y:47.3,regY:0.3,regX:44.4}},{t:this.instance_2,p:{rotation:-177.0082,x:50.15,y:63.85,regY:-8.5,scaleX:0.999,scaleY:0.999,regX:5.9}},{t:this.instance_1,p:{regY:-1.4,rotation:-163.9743,x:58.6,y:65.8,regX:6.9,scaleX:0.9988,scaleY:0.9988}},{t:this.instance,p:{regX:35.8,scaleX:0.9989,scaleY:0.9989,rotation:-109.4111,x:-57.1,y:-22.8,regY:0.7}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,regY:-46.4,scaleX:0.9989,scaleY:0.9989,rotation:5.1268,x:-24.95,y:89.8}},{t:this.instance_14,p:{rotation:106.467,y:-26.25,scaleY:0.9989,x:47.45,scaleX:0.9989,regX:-31.9,regY:-0.9}},{t:this.instance_13,p:{regX:-40.1,regY:-0.1,rotation:54.29,x:27.6,y:45.45,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_12,p:{rotation:58.4384,x:74.85,y:109.6,regX:-6.5,scaleX:0.999,scaleY:0.999,regY:7.9}},{t:this.instance_11,p:{rotation:65.8298,x:77.5,y:120.5,scaleX:0.9989,scaleY:0.9989,regY:2.9}},{t:this.instance_10,p:{rotation:-20.8651,x:19.15,y:91.2,regY:1.4}},{t:this.instance_9,p:{scaleX:0.9985,scaleY:0.9985,rotation:-7.2809,x:48.6,y:181.8,regX:2.6,regY:-54.5}},{t:this.instance_8},{t:this.instance_7,p:{rotation:-1.5092,x:-4.45,y:-57.95}},{t:this.instance_6,p:{rotation:17.0016,x:-36.65,y:185.6,regX:3.2,regY:-55}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.4,rotation:5.1772,x:-5.25,y:-78.8,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_3,p:{scaleX:0.9989,scaleY:0.9989,rotation:-165.6591,x:-31.8,y:47,regY:0.2,regX:44.4}},{t:this.instance_2,p:{rotation:-174.1473,x:50.4,y:67.45,regY:-8.4,scaleX:0.999,scaleY:0.999,regX:5.9}},{t:this.instance_1,p:{regY:-1.4,rotation:-161.1147,x:58.65,y:69.9,regX:6.9,scaleX:0.9988,scaleY:0.9988}},{t:this.instance,p:{regX:35.9,scaleX:0.9989,scaleY:0.9989,rotation:-110.3104,x:-57.1,y:-22.9,regY:0.7}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,regY:-46.4,scaleX:0.9989,scaleY:0.9989,rotation:5.1268,x:-24.95,y:89.8}},{t:this.instance_14,p:{rotation:107.6589,y:-26.1,scaleY:0.9989,x:47.55,scaleX:0.9989,regX:-31.8,regY:-1}},{t:this.instance_13,p:{regX:-40.1,regY:-0.1,rotation:52.8555,x:26.15,y:45,scaleX:0.999,scaleY:0.999}},{t:this.instance_12,p:{rotation:57.0046,x:74.9,y:107.8,regX:-6.6,scaleX:0.999,scaleY:0.999,regY:7.8}},{t:this.instance_11,p:{rotation:64.3974,x:77.85,y:118.85,scaleX:0.999,scaleY:0.999,regY:2.9}},{t:this.instance_10,p:{rotation:-20.8651,x:19.15,y:91.2,regY:1.4}},{t:this.instance_9,p:{scaleX:0.9985,scaleY:0.9985,rotation:-7.28,x:48.6,y:181.8,regX:2.6,regY:-54.5}},{t:this.instance_8},{t:this.instance_7,p:{rotation:-1.4917,x:-4.5,y:-57.95}},{t:this.instance_6,p:{rotation:17.0016,x:-36.65,y:185.6,regX:3.2,regY:-55}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.4,rotation:5.5226,x:-5.3,y:-78.8,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_3,p:{scaleX:0.9989,scaleY:0.9989,rotation:-162.7993,x:-30.65,y:46.65,regY:0.2,regX:44.4}},{t:this.instance_2,p:{rotation:-171.2866,x:50.35,y:71.1,regY:-8.4,scaleX:0.999,scaleY:0.999,regX:5.9}},{t:this.instance_1,p:{regY:-1.4,rotation:-158.2534,x:58.45,y:74.05,regX:6.9,scaleX:0.9988,scaleY:0.9988}},{t:this.instance,p:{regX:35.9,scaleX:0.9989,scaleY:0.9989,rotation:-111.2106,x:-57.15,y:-22.85,regY:0.7}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,regY:-46.4,scaleX:0.9989,scaleY:0.9989,rotation:5.1268,x:-24.95,y:89.8}},{t:this.instance_14,p:{rotation:108.8512,y:-26.25,scaleY:0.9989,x:47.5,scaleX:0.9989,regX:-31.9,regY:-1}},{t:this.instance_13,p:{regX:-40.1,regY:-0.1,rotation:51.4217,x:24.65,y:44.6,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_12,p:{rotation:55.5708,x:74.9,y:106.1,regX:-6.7,scaleX:0.999,scaleY:0.999,regY:7.9}},{t:this.instance_11,p:{rotation:62.9641,x:78.2,y:117,scaleX:0.999,scaleY:0.999,regY:2.9}},{t:this.instance_10,p:{rotation:-20.8651,x:19.15,y:91.2,regY:1.4}},{t:this.instance_9,p:{scaleX:0.9985,scaleY:0.9985,rotation:-7.28,x:48.6,y:181.8,regX:2.6,regY:-54.5}},{t:this.instance_8},{t:this.instance_7,p:{rotation:-1.4742,x:-4.45,y:-57.95}},{t:this.instance_6,p:{rotation:17.0016,x:-36.65,y:185.6,regX:3.2,regY:-55}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.4,rotation:5.8655,x:-5.25,y:-78.8,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_3,p:{scaleX:0.9989,scaleY:0.9989,rotation:-159.9385,x:-29.6,y:46.25,regY:0.2,regX:44.4}},{t:this.instance_2,p:{rotation:-168.4263,x:50.1,y:74.65,regY:-8.4,scaleX:0.999,scaleY:0.999,regX:5.9}},{t:this.instance_1,p:{regY:-1.4,rotation:-155.3938,x:58.15,y:78.05,regX:6.8,scaleX:0.9988,scaleY:0.9988}},{t:this.instance,p:{regX:35.8,scaleX:0.9989,scaleY:0.9989,rotation:-112.1113,x:-57.1,y:-22.75,regY:0.7}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,regY:-46.4,scaleX:0.9989,scaleY:0.9989,rotation:5.126,x:-24.95,y:89.8}},{t:this.instance_14,p:{rotation:110.0428,y:-26.25,scaleY:0.999,x:47.5,scaleX:0.999,regX:-31.9,regY:-1}},{t:this.instance_13,p:{regX:-40.1,regY:-0.1,rotation:49.9899,x:23.2,y:44.05,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_12,p:{rotation:54.1382,x:75.1,y:104.3,regX:-6.6,scaleX:0.9989,scaleY:0.9989,regY:7.8}},{t:this.instance_11,p:{rotation:61.5308,x:78.5,y:115.25,scaleX:0.999,scaleY:0.999,regY:2.9}},{t:this.instance_10,p:{rotation:-20.8643,x:19.15,y:91.2,regY:1.4}},{t:this.instance_9,p:{scaleX:0.9985,scaleY:0.9985,rotation:-7.28,x:48.6,y:181.8,regX:2.6,regY:-54.5}},{t:this.instance_8},{t:this.instance_7,p:{rotation:-1.4559,x:-4.5,y:-57.95}},{t:this.instance_6,p:{rotation:17.0016,x:-36.65,y:185.6,regX:3.2,regY:-55}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.4,rotation:6.2084,x:-5.25,y:-78.8,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_3,p:{scaleX:0.9989,scaleY:0.9989,rotation:-157.0787,x:-28.55,y:45.8,regY:0.2,regX:44.4}},{t:this.instance_2,p:{rotation:-165.566,x:49.6,y:78.2,regY:-8.4,scaleX:0.999,scaleY:0.999,regX:5.9}},{t:this.instance_1,p:{regY:-1.4,rotation:-152.533,x:57.5,y:81.9,regX:6.8,scaleX:0.9988,scaleY:0.9988}},{t:this.instance,p:{regX:35.8,scaleX:0.9989,scaleY:0.9989,rotation:-113.0123,x:-57.1,y:-22.7,regY:0.7}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,regY:-46.4,scaleX:0.9989,scaleY:0.9989,rotation:5.126,x:-24.95,y:89.8}},{t:this.instance_14,p:{rotation:111.2363,y:-26.25,scaleY:0.9989,x:47.55,scaleX:0.9989,regX:-31.9,regY:-1}},{t:this.instance_13,p:{regX:-40.1,regY:-0.1,rotation:48.5563,x:21.7,y:43.55,scaleX:0.999,scaleY:0.999}},{t:this.instance_12,p:{rotation:52.7042,x:75.1,y:102.45,regX:-6.6,scaleX:0.999,scaleY:0.999,regY:7.8}},{t:this.instance_11,p:{rotation:60.0984,x:78.85,y:113.25,scaleX:0.9989,scaleY:0.9989,regY:2.9}},{t:this.instance_10,p:{rotation:-20.8643,x:19.1,y:91.2,regY:1.4}},{t:this.instance_9,p:{scaleX:0.9985,scaleY:0.9985,rotation:-7.28,x:48.55,y:181.75,regX:2.6,regY:-54.5}},{t:this.instance_8},{t:this.instance_7,p:{rotation:-1.4366,x:-4.5,y:-57.95}},{t:this.instance_6,p:{rotation:17.0016,x:-36.65,y:185.6,regX:3.2,regY:-55}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.4,rotation:6.5535,x:-5.35,y:-78.8,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_3,p:{scaleX:0.9989,scaleY:0.9989,rotation:-154.2178,x:-27.55,y:45.25,regY:0.2,regX:44.4}},{t:this.instance_2,p:{rotation:-162.7057,x:48.95,y:81.55,regY:-8.4,scaleX:0.9989,scaleY:0.9989,regX:5.9}},{t:this.instance_1,p:{regY:-1.4,rotation:-149.6729,x:56.6,y:85.65,regX:6.9,scaleX:0.9987,scaleY:0.9987}},{t:this.instance,p:{regX:35.8,scaleX:0.9989,scaleY:0.9989,rotation:-113.9111,x:-57.1,y:-22.75,regY:0.7}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,regY:-46.4,scaleX:0.9989,scaleY:0.9989,rotation:5.1277,x:-24.95,y:89.8}},{t:this.instance_14,p:{rotation:110.1232,y:-26.15,scaleY:0.999,x:47.55,scaleX:0.999,regX:-31.8,regY:-1}},{t:this.instance_13,p:{regX:-40.2,regY:-0.1,rotation:49.9029,x:23.05,y:44.05,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_12,p:{rotation:54.0435,x:75.15,y:104.35,regX:-6.5,scaleX:0.999,scaleY:0.999,regY:7.8}},{t:this.instance_11,p:{rotation:61.4392,x:78.55,y:115.05,scaleX:0.9989,scaleY:0.9989,regY:2.9}},{t:this.instance_10,p:{rotation:-20.8482,x:19.2,y:91.25,regY:1.4}},{t:this.instance_9,p:{scaleX:0.9985,scaleY:0.9985,rotation:-7.2527,x:48.6,y:181.8,regX:2.7,regY:-54.5}},{t:this.instance_8},{t:this.instance_7,p:{rotation:-1.4567,x:-4.5,y:-57.95}},{t:this.instance_6,p:{rotation:17.0138,x:-36.65,y:185.55,regX:3.2,regY:-55}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.4,rotation:6.2296,x:-5.3,y:-78.8,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_3,p:{scaleX:0.9989,scaleY:0.9989,rotation:-156.8854,x:-28.5,y:45.7,regY:0.2,regX:44.4}},{t:this.instance_2,p:{rotation:-165.3807,x:49.6,y:78.35,regY:-8.4,scaleX:0.999,scaleY:0.999,regX:5.9}},{t:this.instance_1,p:{regY:-1.4,rotation:-152.338,x:57.35,y:82.15,regX:6.9,scaleX:0.9987,scaleY:0.9987}},{t:this.instance,p:{regX:35.8,scaleX:0.9989,scaleY:0.9989,rotation:-113.0786,x:-57.1,y:-22.75,regY:0.7}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,regY:-46.4,scaleX:0.9989,scaleY:0.9989,rotation:5.1295,x:-24.95,y:89.8}},{t:this.instance_14,p:{rotation:109.009,y:-26.25,scaleY:0.9989,x:47.55,scaleX:0.9989,regX:-31.9,regY:-1}},{t:this.instance_13,p:{regX:-40.1,regY:-0.1,rotation:51.2497,x:24.5,y:44.5,scaleX:0.999,scaleY:0.999}},{t:this.instance_12,p:{rotation:55.3802,x:75,y:105.9,regX:-6.6,scaleX:0.999,scaleY:0.999,regY:7.8}},{t:this.instance_11,p:{rotation:62.7801,x:78.15,y:116.85,scaleX:0.9989,scaleY:0.9989,regY:2.9}},{t:this.instance_10,p:{rotation:-20.8324,x:19.15,y:91.25,regY:1.4}},{t:this.instance_9,p:{scaleX:0.9985,scaleY:0.9985,rotation:-7.2253,x:48.5,y:181.8,regX:2.6,regY:-54.5}},{t:this.instance_8},{t:this.instance_7,p:{rotation:-1.4751,x:-4.45,y:-57.95}},{t:this.instance_6,p:{rotation:17.0254,x:-36.7,y:185.5,regX:3.1,regY:-55}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.4,rotation:5.9077,x:-5.25,y:-78.8,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_3,p:{scaleX:0.9989,scaleY:0.9989,rotation:-159.5531,x:-29.45,y:46.05,regY:0.3,regX:44.4}},{t:this.instance_2,p:{rotation:-168.0559,x:50.05,y:75.15,regY:-8.4,scaleX:0.999,scaleY:0.999,regX:5.9}},{t:this.instance_1,p:{regY:-1.3,rotation:-155.003,x:58.05,y:78.5,regX:6.9,scaleX:0.9987,scaleY:0.9987}},{t:this.instance,p:{regX:35.8,scaleX:0.9989,scaleY:0.9989,rotation:-112.2456,x:-57.1,y:-22.7,regY:0.7}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,regY:-46.4,scaleX:0.9989,scaleY:0.9989,rotation:5.1312,x:-25,y:89.8}},{t:this.instance_14,p:{rotation:107.895,y:-26.25,scaleY:0.999,x:47.5,scaleX:0.999,regX:-31.9,regY:-1}},{t:this.instance_13,p:{regX:-40.1,regY:-0.1,rotation:52.5962,x:25.85,y:44.95,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_12,p:{rotation:56.7182,x:75,y:107.6,regX:-6.5,scaleX:0.9989,scaleY:0.9989,regY:7.8}},{t:this.instance_11,p:{rotation:64.1211,x:77.9,y:118.5,scaleX:0.9989,scaleY:0.9989,regY:2.9}},{t:this.instance_10,p:{rotation:-20.8164,x:19.2,y:91.2,regY:1.4}},{t:this.instance_9,p:{scaleX:0.9985,scaleY:0.9985,rotation:-7.1998,x:48.6,y:181.8,regX:2.7,regY:-54.5}},{t:this.instance_8},{t:this.instance_7,p:{rotation:-1.4944,x:-4.5,y:-57.95}},{t:this.instance_6,p:{rotation:17.0382,x:-36.65,y:185.6,regX:3.2,regY:-55}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.4,rotation:5.5859,x:-5.3,y:-78.8,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_3,p:{scaleX:0.9989,scaleY:0.9989,rotation:-162.2221,x:-30.5,y:46.55,regY:0.2,regX:44.4}},{t:this.instance_2,p:{rotation:-170.7309,x:50.45,y:71.85,regY:-8.4,scaleX:0.999,scaleY:0.999,regX:5.8}},{t:this.instance_1,p:{regY:-1.4,rotation:-157.6687,x:58.4,y:74.8,regX:6.9,scaleX:0.9988,scaleY:0.9988}},{t:this.instance,p:{regX:35.8,scaleX:0.9989,scaleY:0.9989,rotation:-111.413,x:-57.05,y:-22.75,regY:0.7}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,regY:-46.4,scaleX:0.9989,scaleY:0.9989,rotation:5.133,x:-25,y:89.8}},{t:this.instance_14,p:{rotation:106.7827,y:-26.25,scaleY:0.9989,x:47.5,scaleX:0.9989,regX:-31.9,regY:-1}},{t:this.instance_13,p:{regX:-40.1,regY:-0.1,rotation:53.9433,x:27.15,y:45.35,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_12,p:{rotation:58.0545,x:74.85,y:109.05,regX:-6.6,scaleX:0.999,scaleY:0.999,regY:7.8}},{t:this.instance_11,p:{rotation:65.462,x:77.55,y:120.05,scaleX:0.9989,scaleY:0.9989,regY:2.9}},{t:this.instance_10,p:{rotation:-20.8006,x:19.15,y:91.2,regY:1.4}},{t:this.instance_9,p:{scaleX:0.9985,scaleY:0.9985,rotation:-7.1725,x:48.45,y:181.9,regX:2.6,regY:-54.5}},{t:this.instance_8},{t:this.instance_7,p:{rotation:-1.5119,x:-4.45,y:-57.95}},{t:this.instance_6,p:{rotation:17.0512,x:-36.65,y:185.65,regX:3.2,regY:-54.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.4,rotation:5.2625,x:-5.3,y:-78.8,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_3,p:{scaleX:0.9989,scaleY:0.9989,rotation:-164.8887,x:-31.4,y:46.9,regY:0.2,regX:44.4}},{t:this.instance_2,p:{rotation:-173.406,x:50.45,y:68.6,regY:-8.5,scaleX:0.999,scaleY:0.999,regX:5.8}},{t:this.instance_1,p:{regY:-1.4,rotation:-160.3345,x:58.65,y:71.05,regX:6.9,scaleX:0.9987,scaleY:0.9987}},{t:this.instance,p:{regX:35.9,scaleX:0.9989,scaleY:0.9989,rotation:-110.5793,x:-57.1,y:-22.85,regY:0.7}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,regY:-46.4,scaleX:0.9989,scaleY:0.9989,rotation:5.1348,x:-25,y:89.8}},{t:this.instance_14,p:{rotation:105.669,y:-26.3,scaleY:0.9989,x:47.55,scaleX:0.9989,regX:-31.9,regY:-1}},{t:this.instance_13,p:{regX:-40.1,regY:-0.1,rotation:55.2897,x:28.65,y:45.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_12,p:{rotation:59.392,x:74.75,y:110.55,regX:-6.6,scaleX:0.9989,scaleY:0.9989,regY:7.8}},{t:this.instance_11,p:{rotation:66.8041,x:77.2,y:121.7,scaleX:0.999,scaleY:0.999,regY:2.9}},{t:this.instance_10,p:{rotation:-20.7845,x:19.2,y:91.2,regY:1.4}},{t:this.instance_9,p:{scaleX:0.9984,scaleY:0.9984,rotation:-7.1442,x:48.5,y:181.85,regX:2.7,regY:-54.5}},{t:this.instance_8},{t:this.instance_7,p:{rotation:-1.5302,x:-4.5,y:-57.95}},{t:this.instance_6,p:{rotation:17.0631,x:-36.7,y:185.7,regX:3.2,regY:-54.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.4,rotation:4.9409,x:-5.35,y:-78.85,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_3,p:{scaleX:0.9989,scaleY:0.9989,rotation:-167.5582,x:-32.4,y:47.25,regY:0.2,regX:44.4}},{t:this.instance_2,p:{rotation:-176.0797,x:50.25,y:64.95,regY:-8.4,scaleX:0.999,scaleY:0.999,regX:5.9}},{t:this.instance_1,p:{regY:-1.4,rotation:-162.9991,x:58.65,y:67.2,regX:6.9,scaleX:0.9988,scaleY:0.9988}},{t:this.instance,p:{regX:35.8,scaleX:0.9989,scaleY:0.9989,rotation:-109.7455,x:-57.25,y:-22.75,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,regY:-46.4,scaleX:0.9989,scaleY:0.9989,rotation:5.1365,x:-25,y:89.8}},{t:this.instance_14,p:{rotation:104.5554,y:-26.25,scaleY:0.999,x:47.5,scaleX:0.999,regX:-31.9,regY:-1}},{t:this.instance_13,p:{regX:-40.1,regY:-0.1,rotation:56.6362,x:30,y:46.1,scaleX:0.999,scaleY:0.999}},{t:this.instance_12,p:{rotation:60.7303,x:74.6,y:112,regX:-6.6,scaleX:0.999,scaleY:0.999,regY:7.8}},{t:this.instance_11,p:{rotation:68.1456,x:76.75,y:123.15,scaleX:0.999,scaleY:0.999,regY:2.9}},{t:this.instance_10,p:{rotation:-20.7687,x:19.15,y:91.2,regY:1.4}},{t:this.instance_9,p:{scaleX:0.9985,scaleY:0.9985,rotation:-7.1186,x:48.5,y:181.85,regX:2.7,regY:-54.5}},{t:this.instance_8},{t:this.instance_7,p:{rotation:-1.5495,x:-4.45,y:-57.95}},{t:this.instance_6,p:{rotation:17.0761,x:-36.7,y:185.7,regX:3.2,regY:-54.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.4,rotation:4.6187,x:-5.35,y:-78.75,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_3,p:{scaleX:0.9989,scaleY:0.9989,rotation:-170.2253,x:-33.4,y:47.55,regY:0.3,regX:44.4}},{t:this.instance_2,p:{rotation:-178.7554,x:50,y:61.45,regY:-8.4,scaleX:0.999,scaleY:0.999,regX:5.9}},{t:this.instance_1,p:{regY:-1.4,rotation:-165.6648,x:58.5,y:63.3,regX:6.9,scaleX:0.9988,scaleY:0.9988}},{t:this.instance,p:{regX:35.8,scaleX:0.9989,scaleY:0.9989,rotation:-108.9118,x:-57.15,y:-22.8,regY:0.7}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,regY:-46.4,scaleX:0.9989,scaleY:0.9989,rotation:5.1382,x:-25,y:89.8}},{t:this.instance_14,p:{rotation:103.4419,y:-26.25,scaleY:0.9989,x:47.55,scaleX:0.999,regX:-31.9,regY:-1}},{t:this.instance_13,p:{regX:-40.1,regY:-0.1,rotation:57.9816,x:31.4,y:46.45,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_12,p:{rotation:62.0665,x:74.4,y:113.45,regX:-6.6,scaleX:0.9989,scaleY:0.9989,regY:7.9}},{t:this.instance_11,p:{rotation:69.4862,x:76.55,y:124.6,scaleX:0.999,scaleY:0.999,regY:2.8}},{t:this.instance_10,p:{rotation:-20.7534,x:19.2,y:91.2,regY:1.4}},{t:this.instance_9,p:{scaleX:0.9985,scaleY:0.9985,rotation:-7.0912,x:48.6,y:181.9,regX:2.8,regY:-54.5}},{t:this.instance_8},{t:this.instance_7,p:{rotation:-1.5679,x:-4.5,y:-57.95}},{t:this.instance_6,p:{rotation:17.0897,x:-36.75,y:185.6,regX:3.2,regY:-55}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.4,rotation:4.2958,x:-5.35,y:-78.8,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_3,p:{scaleX:0.9989,scaleY:0.9989,rotation:-172.8934,x:-34.45,y:48,regY:0.2,regX:44.4}},{t:this.instance_2,p:{rotation:178.5742,x:49.55,y:57.95,regY:-8.4,scaleX:0.999,scaleY:0.999,regX:5.9}},{t:this.instance_1,p:{regY:-1.3,rotation:-168.3297,x:58.15,y:59.2,regX:6.9,scaleX:0.9988,scaleY:0.9988}},{t:this.instance,p:{regX:35.8,scaleX:0.9989,scaleY:0.9989,rotation:-108.0785,x:-57.1,y:-22.75,regY:0.7}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,regY:-46.4,scaleX:0.9989,scaleY:0.9989,rotation:5.1409,x:-25,y:89.8}},{t:this.instance_14,p:{rotation:102.3294,y:-26.3,scaleY:0.9989,x:47.6,scaleX:0.9989,regX:-31.9,regY:-1}},{t:this.instance_13,p:{regX:-40.1,regY:-0.1,rotation:59.3297,x:32.85,y:46.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_12,p:{rotation:63.404,x:74.3,y:114.65,regX:-6.6,scaleX:0.999,scaleY:0.999,regY:7.8}},{t:this.instance_11,p:{rotation:70.8277,x:75.95,y:125.9,scaleX:0.999,scaleY:0.999,regY:2.9}},{t:this.instance_10,p:{rotation:-20.7376,x:19.15,y:91.2,regY:1.4}},{t:this.instance_9,p:{scaleX:0.9985,scaleY:0.9985,rotation:-7.063,x:48.45,y:181.9,regX:2.7,regY:-54.5}},{t:this.instance_8},{t:this.instance_7,p:{rotation:-1.5871,x:-4.45,y:-57.95}},{t:this.instance_6,p:{rotation:17.0999,x:-36.7,y:185.55,regX:3.2,regY:-55}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.5,rotation:3.9731,x:-5.3,y:-78.7,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_3,p:{scaleX:0.9989,scaleY:0.9989,rotation:-175.5608,x:-35.45,y:48.25,regY:0.2,regX:44.4}},{t:this.instance_2,p:{rotation:175.8981,x:48.9,y:54.3,regY:-8.4,scaleX:0.999,scaleY:0.999,regX:5.9}},{t:this.instance_1,p:{regY:-1.4,rotation:-170.9957,x:57.55,y:55.35,regX:6.9,scaleX:0.9987,scaleY:0.9987}},{t:this.instance,p:{regX:35.8,scaleX:0.9989,scaleY:0.9989,rotation:-107.2453,x:-57.1,y:-22.8,regY:0.7}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,regY:-46.4,scaleX:0.9989,scaleY:0.9989,rotation:5.1427,x:-25,y:89.8}},{t:this.instance_14,p:{rotation:101.2171,y:-26.25,scaleY:0.999,x:47.6,scaleX:0.999,regX:-31.9,regY:-1}},{t:this.instance_13,p:{regX:-40.1,regY:-0.1,rotation:60.6765,x:34.3,y:47.05,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_12,p:{rotation:64.7431,x:74.1,y:115.9,regX:-6.6,scaleX:0.999,scaleY:0.999,regY:7.8}},{t:this.instance_11,p:{rotation:72.1689,x:75.5,y:127.15,scaleX:0.999,scaleY:0.999,regY:2.9}},{t:this.instance_10,p:{rotation:-20.7216,x:19.2,y:91.2,regY:1.4}},{t:this.instance_9,p:{scaleX:0.9985,scaleY:0.9985,rotation:-7.0365,x:48.5,y:181.9,regX:2.8,regY:-54.5}},{t:this.instance_8},{t:this.instance_7,p:{rotation:-1.6055,x:-4.5,y:-57.95}},{t:this.instance_6,p:{rotation:17.1135,x:-36.8,y:185.55,regX:3.2,regY:-55}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.4,rotation:3.6505,x:-5.3,y:-78.8,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_3,p:{scaleX:0.9989,scaleY:0.9989,rotation:-178.2292,x:-36.6,y:48.65,regY:0.2,regX:44.5}},{t:this.instance_2,p:{rotation:173.2235,x:48.05,y:50.85,regY:-8.5,scaleX:0.999,scaleY:0.999,regX:5.9}},{t:this.instance_1,p:{regY:-1.4,rotation:-173.6609,x:56.8,y:51.3,regX:6.9,scaleX:0.9987,scaleY:0.9987}},{t:this.instance,p:{regX:35.8,scaleX:0.9989,scaleY:0.9989,rotation:-106.4125,x:-57.1,y:-22.8,regY:0.7}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,regY:-46.4,scaleX:0.9989,scaleY:0.9989,rotation:5.1444,x:-25,y:89.8}},{t:this.instance_14,p:{rotation:100.103,y:-26.2,scaleY:0.9989,x:47.6,scaleX:0.9989,regX:-31.9,regY:-1}},{t:this.instance_13,p:{regX:-40.1,regY:-0.1,rotation:62.0231,x:35.7,y:47.25,scaleX:0.999,scaleY:0.999}},{t:this.instance_12,p:{rotation:66.0789,x:74,y:117.05,regX:-6.6,scaleX:0.999,scaleY:0.999,regY:7.8}},{t:this.instance_11,p:{rotation:73.5097,x:75.1,y:128.35,scaleX:0.9989,scaleY:0.9989,regY:2.9}},{t:this.instance_10,p:{rotation:-20.7058,x:19.2,y:91.2,regY:1.4}},{t:this.instance_9,p:{scaleX:0.9985,scaleY:0.9985,rotation:-7.01,x:48.4,y:181.95,regX:2.7,regY:-54.5}},{t:this.instance_8},{t:this.instance_7,p:{rotation:-1.623,x:-4.5,y:-57.95}},{t:this.instance_6,p:{rotation:17.1254,x:-36.75,y:185.55,regX:3.2,regY:-55}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.5,rotation:3.3279,x:-5.3,y:-78.65,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_3,p:{scaleX:0.9989,scaleY:0.9989,rotation:179.1081,x:-37.5,y:48.9,regY:0.2,regX:44.4}},{t:this.instance_2,p:{rotation:170.5492,x:47.2,y:47.1,regY:-8.4,scaleX:0.999,scaleY:0.999,regX:5.8}},{t:this.instance_1,p:{regY:-1.4,rotation:-176.3263,x:55.75,y:47.3,regX:6.9,scaleX:0.9988,scaleY:0.9988}},{t:this.instance,p:{regX:35.8,scaleX:0.9989,scaleY:0.9989,rotation:-105.5784,x:-57.15,y:-22.8,regY:0.7}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,regY:-46.4,scaleX:0.9989,scaleY:0.9989,rotation:5.1462,x:-25,y:89.8}},{t:this.instance_14,p:{rotation:98.9902,y:-26.2,scaleY:0.9989,x:47.5,scaleX:0.9989,regX:-31.8,regY:-1}},{t:this.instance_13,p:{regX:-40.1,regY:0,rotation:63.3696,x:37.05,y:47.55,scaleX:0.999,scaleY:0.999}},{t:this.instance_12,p:{rotation:67.4162,x:73.65,y:118.15,regX:-6.6,scaleX:0.999,scaleY:0.999,regY:7.8}},{t:this.instance_11,p:{rotation:74.8508,x:74.55,y:129.45,scaleX:0.999,scaleY:0.999,regY:2.9}},{t:this.instance_10,p:{rotation:-20.6894,x:19.25,y:91.25,regY:1.4}},{t:this.instance_9,p:{scaleX:0.9985,scaleY:0.9985,rotation:-6.9836,x:48.45,y:181.95,regX:2.8,regY:-54.5}},{t:this.instance_8},{t:this.instance_7,p:{rotation:-1.6422,x:-4.5,y:-57.95}},{t:this.instance_6,p:{rotation:17.1373,x:-36.8,y:185.6,regX:3.2,regY:-55}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.4,rotation:3.0064,x:-5.35,y:-78.8,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_3,p:{scaleX:0.9989,scaleY:0.9989,rotation:176.44,x:-38.5,y:49.25,regY:0.2,regX:44.4}},{t:this.instance_2,p:{rotation:167.8736,x:45.8,y:43.45,regY:-8.4,scaleX:0.999,scaleY:0.999,regX:5.9}},{t:this.instance_1,p:{regY:-1.4,rotation:-178.9916,x:54.6,y:43.2,regX:6.9,scaleX:0.9988,scaleY:0.9988}},{t:this.instance,p:{regX:35.8,scaleX:0.9989,scaleY:0.9989,rotation:-104.7448,x:-57.1,y:-22.85,regY:0.7}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,regY:-46.4,scaleX:0.9989,scaleY:0.9989,rotation:5.1479,x:-25,y:89.8}},{t:this.instance_14,p:{rotation:97.8761,y:-26.2,scaleY:0.999,x:47.55,scaleX:0.999,regX:-31.8,regY:-1}},{t:this.instance_13,p:{regX:-40.1,regY:0,rotation:64.7168,x:38.45,y:47.75,scaleX:0.999,scaleY:0.999}},{t:this.instance_12,p:{rotation:68.7529,x:73.4,y:119.1,regX:-6.7,scaleX:0.999,scaleY:0.999,regY:7.8}},{t:this.instance_11,p:{rotation:76.1919,x:74.1,y:130.5,scaleX:0.999,scaleY:0.999,regY:2.9}},{t:this.instance_10,p:{rotation:-20.6742,x:19.2,y:91.2,regY:1.4}},{t:this.instance_9,p:{scaleX:0.9985,scaleY:0.9985,rotation:-6.9554,x:48.35,y:181.95,regX:2.7,regY:-54.5}},{t:this.instance_8},{t:this.instance_7,p:{rotation:-1.6606,x:-4.55,y:-57.9}},{t:this.instance_6,p:{rotation:17.15,x:-36.8,y:185.55,regX:3.2,regY:-55}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.4,rotation:2.684,x:-5.35,y:-78.8,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_3,p:{scaleX:0.9989,scaleY:0.9989,rotation:173.7719,x:-39.65,y:49.45,regY:0.2,regX:44.5}},{t:this.instance_2,p:{rotation:165.199,x:44.4,y:39.8,regY:-8.4,scaleX:0.999,scaleY:0.999,regX:5.9}},{t:this.instance_1,p:{regY:-1.4,rotation:178.3471,x:53.15,y:39.15,regX:6.9,scaleX:0.9988,scaleY:0.9988}},{t:this.instance,p:{regX:35.8,scaleX:0.9989,scaleY:0.9989,rotation:-103.9114,x:-57.15,y:-22.8,regY:0.7}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,regY:-46.4,scaleX:0.9989,scaleY:0.9989,rotation:5.1497,x:-25,y:89.8}},{t:this.instance_14,p:{rotation:96.7627,y:-26.35,scaleY:0.9989,x:47.6,scaleX:0.9989,regX:-31.9,regY:-1}},{t:this.instance_13,p:{regX:-40.1,regY:-0.1,rotation:66.0625,x:40,y:47.9,scaleX:0.999,scaleY:0.999}},{t:this.instance_12,p:{rotation:70.0914,x:73.15,y:120.25,regX:-6.6,scaleX:0.999,scaleY:0.999,regY:7.9}},{t:this.instance_11,p:{rotation:77.5338,x:73.55,y:131.55,scaleX:0.999,scaleY:0.999,regY:2.9}},{t:this.instance_10,p:{rotation:-20.657,x:19.25,y:91.2,regY:1.4}},{t:this.instance_9,p:{scaleX:0.9985,scaleY:0.9985,rotation:-6.928,x:48.45,y:182,regX:2.8,regY:-54.5}},{t:this.instance_8},{t:this.instance_7,p:{rotation:-1.6799,x:-4.5,y:-57.95}},{t:this.instance_6,p:{rotation:17.1619,x:-36.85,y:185.55,regX:3.2,regY:-55}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.4,rotation:2.3617,x:-5.4,y:-78.8,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_3,p:{scaleX:0.9989,scaleY:0.9989,rotation:171.1043,x:-40.6,y:49.7,regY:0.2,regX:44.4}},{t:this.instance_2,p:{rotation:162.5235,x:42.9,y:36.15,regY:-8.4,scaleX:0.999,scaleY:0.999,regX:5.8}},{t:this.instance_1,p:{regY:-1.4,rotation:175.6821,x:51.5,y:35.1,regX:6.9,scaleX:0.9988,scaleY:0.9988}},{t:this.instance,p:{regX:35.8,scaleX:0.9989,scaleY:0.9989,rotation:-103.078,x:-57.1,y:-22.85,regY:0.7}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,regY:-46.4,scaleX:0.9989,scaleY:0.9989,rotation:5.1523,x:-25,y:89.8}},{t:this.instance_14,p:{rotation:95.6489,y:-26.3,scaleY:0.999,x:47.55,scaleX:0.999,regX:-31.9,regY:-1}},{t:this.instance_13,p:{regX:-40.1,regY:-0.1,rotation:67.4092,x:41.4,y:48.05,scaleX:0.999,scaleY:0.999}},{t:this.instance_12,p:{rotation:71.43,x:72.95,y:121.1,regX:-6.6,scaleX:0.999,scaleY:0.999,regY:7.8}},{t:this.instance_11,p:{rotation:78.8751,x:73,y:132.4,scaleX:0.999,scaleY:0.999,regY:2.9}},{t:this.instance_10,p:{rotation:-20.6412,x:19.2,y:91.2,regY:1.4}},{t:this.instance_9,p:{scaleX:0.9985,scaleY:0.9985,rotation:-6.9024,x:48.3,y:182.15,regX:2.7,regY:-54.4}},{t:this.instance_8},{t:this.instance_7,p:{rotation:-1.6974,x:-4.55,y:-57.95}},{t:this.instance_6,p:{rotation:17.1749,x:-36.85,y:185.55,regX:3.2,regY:-55}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.4,rotation:2.0388,x:-5.4,y:-78.8,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_3,p:{scaleX:0.9989,scaleY:0.9989,rotation:168.4362,x:-41.65,y:50,regY:0.2,regX:44.4}},{t:this.instance_2,p:{rotation:159.8481,x:41.05,y:32.55,regY:-8.4,scaleX:0.999,scaleY:0.999,regX:5.9}},{t:this.instance_1,p:{regY:-1.4,rotation:173.0175,x:49.7,y:31.1,regX:6.9,scaleX:0.9988,scaleY:0.9988}},{t:this.instance,p:{regX:35.8,scaleX:0.9989,scaleY:0.9989,rotation:-102.2446,x:-57.1,y:-22.85,regY:0.7}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,regY:-46.4,scaleX:0.9989,scaleY:0.9989,rotation:5.154,x:-25,y:89.75}},{t:this.instance_14,p:{rotation:94.5365,y:-26.15,scaleY:0.9989,x:47.5,scaleX:0.9989,regX:-31.8,regY:-1}},{t:this.instance_13,p:{regX:-40.1,regY:-0.1,rotation:68.7557,x:42.85,y:48.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_12,p:{rotation:72.7665,x:72.7,y:121.9,regX:-6.6,scaleX:0.999,scaleY:0.999,regY:7.8}},{t:this.instance_11,p:{rotation:80.216,x:72.5,y:133.35,scaleX:0.9989,scaleY:0.9989,regY:2.9}},{t:this.instance_10,p:{rotation:-20.6254,x:19.25,y:91.1,regY:1.3}},{t:this.instance_9,p:{scaleX:0.9985,scaleY:0.9985,rotation:-6.8752,x:48.4,y:182.05,regX:2.8,regY:-54.4}},{t:this.instance_8},{t:this.instance_7,p:{rotation:-1.7158,x:-4.5,y:-57.95}},{t:this.instance_6,p:{rotation:17.1877,x:-36.8,y:185.6,regX:3.2,regY:-55}},{t:this.instance_5},{t:this.instance_4,p:{regY:53.4,rotation:1.7167,x:-5.45,y:-78.75,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_3,p:{scaleX:0.9989,scaleY:0.9989,rotation:165.7691,x:-42.7,y:50.2,regY:0.2,regX:44.4}},{t:this.instance_2,p:{rotation:157.1745,x:39.1,y:29,regY:-8.4,scaleX:0.999,scaleY:0.999,regX:5.9}},{t:this.instance_1,p:{regY:-1.4,rotation:170.3528,x:47.7,y:27.1,regX:6.9,scaleX:0.9988,scaleY:0.9988}},{t:this.instance,p:{regX:35.8,scaleX:0.9989,scaleY:0.9989,rotation:-101.411,x:-57.15,y:-22.85,regY:0.7}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-98.5,-246.5,323.3,547.4);


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
	this.instance.setTransform(-59.1,-12.3,0.9975,0.9975,-56.1689,0,0,33.6,10.2);

	this.instance_1 = new lib.ch1_hand_rcopy2_2("synched",0);
	this.instance_1.setTransform(-103.75,132.3,0.9971,0.9971,-109.492,0,0,14.6,-0.1);

	this.instance_2 = new lib.ch1_thumb_rcopy2_2("synched",0);
	this.instance_2.setTransform(-103.7,132.65,0.9974,0.9975,-108.6243,0,0,4.4,-9);

	this.instance_3 = new lib.ch1_lArm_rcopy2_2("synched",0);
	this.instance_3.setTransform(-101.7,46.35,0.9974,0.9974,-93.8483,0,0,44.2,7.7);

	this.instance_4 = new lib.ch1_headcopy2_3("synched",0);
	this.instance_4.setTransform(-5.9,-81.45,0.9982,0.9982,-3.8989,0,0,1.6,51);

	this.instance_5 = new lib.ch1_uBodycopy2_2("synched",0);
	this.instance_5.setTransform(-7.35,-36,1,1,0,0,0,-0.1,-39.6);

	this.instance_6 = new lib.ch1_uLeg_lcopy2_2("synched",0);
	this.instance_6.setTransform(24,88.05,0.9947,0.9947,-8.9683,0,0,-0.1,4.5);

	this.instance_7 = new lib.ch1_uLeg_rcopy2_2("synched",0);
	this.instance_7.setTransform(-30.25,90.65,0.9956,0.9956,3.9321,0,0,1.4,-42);

	this.instance_8 = new lib.ch1_lLeg_rcopy2_2("synched",0);
	this.instance_8.setTransform(-41.95,185.85,0.995,0.995,11.9107,0,0,0.9,-51.1);

	this.instance_9 = new lib.ch1_neckcopy2_2("synched",0);
	this.instance_9.setTransform(-4.4,-59.6,0.9983,0.9983,-6.7911,0,0,-1.4,7.2);

	this.instance_10 = new lib.ch1_lLeg_lcopy2_2("synched",0);
	this.instance_10.setTransform(33.7,185.15,0.9949,0.9949,-5.5535,0,0,3.5,-50.9);

	this.instance_11 = new lib.ch1_hand_lcopy2_2("synched",0);
	this.instance_11.setTransform(99,125.35,0.9973,0.9973,46.9965,0,0,-10.4,10.7);

	this.instance_12 = new lib.ch1_thumb_lcopy2_2("synched",0);
	this.instance_12.setTransform(96.85,122.9,0.9972,0.9972,41.2264,0,0,-7.8,13.8);

	this.instance_13 = new lib.ch1_lArm_lcopy2_2("synched",0);
	this.instance_13.setTransform(51.7,49.2,0.9974,0.9974,63.8736,0,0,-45.8,12.8);

	this.instance_14 = new lib.ch1_uArm_lcopy2_2("synched",0);
	this.instance_14.setTransform(48.1,-21.45,0.9977,0.9976,87.62,0,0,-32.5,13.7);

	this.instance_15 = new lib.ch1_lBodycopy2_2("synched",0);
	this.instance_15.setTransform(-9.7,49,0.9995,0.9995,1.7768,0,0,-4.4,-21.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{regX:-4.4,rotation:1.7768,y:49,x:-9.7}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9977,rotation:87.62,x:48.1,y:-21.45}},{t:this.instance_13,p:{regX:-45.8,scaleX:0.9974,scaleY:0.9974,rotation:63.8736,x:51.7,y:49.2}},{t:this.instance_12,p:{rotation:41.2264,x:96.85,y:122.9,regX:-7.8,regY:13.8}},{t:this.instance_11,p:{regX:-10.4,regY:10.7,scaleX:0.9973,scaleY:0.9973,rotation:46.9965,x:99,y:125.35}},{t:this.instance_10,p:{rotation:-5.5535,x:33.7,y:185.15,scaleX:0.9949,scaleY:0.9949,regX:3.5,regY:-50.9}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:-6.7911,x:-4.4,y:-59.6}},{t:this.instance_8,p:{regX:0.9,scaleX:0.995,scaleY:0.995,rotation:11.9107,x:-41.95,y:185.85,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9956,scaleY:0.9956,rotation:3.9321,x:-30.25,y:90.65}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9683,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:-3.8989,regY:51,y:-81.45,x:-5.9}},{t:this.instance_3,p:{regX:44.2,scaleX:0.9974,scaleY:0.9974,rotation:-93.8483,x:-101.7,y:46.35,regY:7.7}},{t:this.instance_2,p:{regX:4.4,scaleY:0.9975,rotation:-108.6243,x:-103.7,y:132.65,regY:-9,scaleX:0.9974}},{t:this.instance_1,p:{regY:-0.1,scaleX:0.9971,scaleY:0.9971,rotation:-109.492,x:-103.75,y:132.3,regX:14.6}},{t:this.instance,p:{regX:33.6,scaleX:0.9975,scaleY:0.9975,rotation:-56.1689,y:-12.3,x:-59.1}}]}).to({state:[{t:this.instance_15,p:{regX:-4.5,rotation:1.7751,y:48.95,x:-9.7}},{t:this.instance_14,p:{regY:13.6,scaleX:0.9976,rotation:88.1111,x:48.25,y:-21.4}},{t:this.instance_13,p:{regX:-45.7,scaleX:0.9973,scaleY:0.9973,rotation:61.4265,x:51.1,y:49.25}},{t:this.instance_12,p:{rotation:38.7808,x:99.35,y:120.95,regX:-7.8,regY:13.8}},{t:this.instance_11,p:{regX:-10.5,regY:10.8,scaleX:0.9972,scaleY:0.9972,rotation:44.5518,x:101.45,y:123.2}},{t:this.instance_10,p:{rotation:-5.5529,x:33.65,y:185.1,scaleX:0.9949,scaleY:0.9949,regX:3.5,regY:-50.9}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.7793,x:-4.3,y:-59.55}},{t:this.instance_8,p:{regX:1,scaleX:0.9949,scaleY:0.9949,rotation:11.6074,x:-41.85,y:185.8,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9306,x:-30.2,y:90.55}},{t:this.instance_6,p:{regX:0,scaleX:0.9946,scaleY:0.9946,rotation:-8.968,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.5,scaleX:0.9981,scaleY:0.9981,rotation:-3.3602,regY:51,y:-81.45,x:-5.9}},{t:this.instance_3,p:{regX:44.3,scaleX:0.9973,scaleY:0.9973,rotation:-93.5797,x:-101.1,y:46.55,regY:7.7}},{t:this.instance_2,p:{regX:4.3,scaleY:0.9974,rotation:-108.3559,x:-103.5,y:133.2,regY:-9,scaleX:0.9974}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-109.2214,x:-103.65,y:132.65,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9974,scaleY:0.9974,rotation:-56.7346,y:-12.25,x:-59.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.5,rotation:1.7751,y:48.95,x:-9.7}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,rotation:88.602,x:48.15,y:-21.35}},{t:this.instance_13,p:{regX:-45.7,scaleX:0.9973,scaleY:0.9973,rotation:58.9821,x:50.45,y:49.3}},{t:this.instance_12,p:{rotation:36.3344,x:101.75,y:118.8,regX:-7.8,regY:13.8}},{t:this.instance_11,p:{regX:-10.5,regY:10.8,scaleX:0.9972,scaleY:0.9972,rotation:42.1055,x:103.95,y:121.05}},{t:this.instance_10,p:{rotation:-5.5521,x:33.65,y:185.1,scaleX:0.9949,scaleY:0.9949,regX:3.5,regY:-50.9}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.7677,x:-4.3,y:-59.55}},{t:this.instance_8,p:{regX:1,scaleX:0.9949,scaleY:0.9949,rotation:11.3042,x:-41.85,y:185.8,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9306,x:-30.2,y:90.55}},{t:this.instance_6,p:{regX:0,scaleX:0.9946,scaleY:0.9946,rotation:-8.968,x:24.05,y:88}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.5,scaleX:0.9981,scaleY:0.9981,rotation:-2.8225,regY:51.1,y:-81.35,x:-5.9}},{t:this.instance_3,p:{regX:44.2,scaleX:0.9974,scaleY:0.9974,rotation:-93.3093,x:-100.5,y:47.1,regY:7.7}},{t:this.instance_2,p:{regX:4.3,scaleY:0.9974,rotation:-108.0854,x:-103.45,y:133.5,regY:-9.1,scaleX:0.9974}},{t:this.instance_1,p:{regY:-0.1,scaleX:0.997,scaleY:0.997,rotation:-108.9521,x:-103.4,y:133.05,regX:14.6}},{t:this.instance,p:{regX:33.6,scaleX:0.9974,scaleY:0.9974,rotation:-57.3006,y:-12.3,x:-59.05}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.5,rotation:1.7751,y:48.95,x:-9.7}},{t:this.instance_14,p:{regY:13.6,scaleX:0.9976,rotation:89.0938,x:48.25,y:-21.4}},{t:this.instance_13,p:{regX:-45.7,scaleX:0.9974,scaleY:0.9974,rotation:56.5356,x:49.85,y:49.3}},{t:this.instance_12,p:{rotation:33.8892,x:104.05,y:116.55,regX:-7.8,regY:13.8}},{t:this.instance_11,p:{regX:-10.4,regY:10.8,scaleX:0.9972,scaleY:0.9972,rotation:39.6602,x:106.45,y:118.75}},{t:this.instance_10,p:{rotation:-5.5521,x:33.65,y:185.1,scaleX:0.9949,scaleY:0.9949,regX:3.5,regY:-50.9}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.7564,x:-4.3,y:-59.55}},{t:this.instance_8,p:{regX:0.9,scaleX:0.9949,scaleY:0.9949,rotation:11.0015,x:-41.95,y:185.75,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9306,x:-30.2,y:90.55}},{t:this.instance_6,p:{regX:0,scaleX:0.9946,scaleY:0.9946,rotation:-8.968,x:24.05,y:88}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.6,scaleX:0.9981,scaleY:0.9981,rotation:-2.2833,regY:51,y:-81.45,x:-5.75}},{t:this.instance_3,p:{regX:44.2,scaleX:0.9974,scaleY:0.9974,rotation:-93.038,x:-99.95,y:47.55,regY:7.7}},{t:this.instance_2,p:{regX:4.4,scaleY:0.9974,rotation:-107.8154,x:-103.2,y:133.8,regY:-9,scaleX:0.9974}},{t:this.instance_1,p:{regY:-0.1,scaleX:0.997,scaleY:0.997,rotation:-108.6826,x:-103.1,y:133.4,regX:14.6}},{t:this.instance,p:{regX:33.6,scaleX:0.9974,scaleY:0.9974,rotation:-57.8677,y:-12.35,x:-59.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.5,rotation:1.7751,y:48.95,x:-9.7}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,rotation:89.5846,x:48.1,y:-21.4}},{t:this.instance_13,p:{regX:-45.7,scaleX:0.9973,scaleY:0.9973,rotation:54.0886,x:49.25,y:49.3}},{t:this.instance_12,p:{rotation:31.4434,x:106.2,y:114.2,regX:-7.8,regY:13.8}},{t:this.instance_11,p:{regX:-10.4,regY:10.8,scaleX:0.9972,scaleY:0.9972,rotation:37.2138,x:108.7,y:116.3}},{t:this.instance_10,p:{rotation:-5.5521,x:33.65,y:185.1,scaleX:0.9949,scaleY:0.9949,regX:3.5,regY:-50.9}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.7448,x:-4.25,y:-59.55}},{t:this.instance_8,p:{regX:0.9,scaleX:0.9949,scaleY:0.9949,rotation:10.6983,x:-41.9,y:185.75,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9306,x:-30.2,y:90.55}},{t:this.instance_6,p:{regX:0,scaleX:0.9946,scaleY:0.9946,rotation:-8.968,x:24.05,y:88}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.5,scaleX:0.9981,scaleY:0.9981,rotation:-1.7451,regY:51,y:-81.45,x:-5.9}},{t:this.instance_3,p:{regX:44.2,scaleX:0.9973,scaleY:0.9973,rotation:-92.7676,x:-99.35,y:47.9,regY:7.7}},{t:this.instance_2,p:{regX:4.4,scaleY:0.9974,rotation:-107.5451,x:-102.95,y:134.2,regY:-9,scaleX:0.9974}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-108.4119,x:-103.05,y:133.85,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9975,scaleY:0.9975,rotation:-58.4336,y:-12.2,x:-59.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.5,rotation:1.7751,y:48.95,x:-9.7}},{t:this.instance_14,p:{regY:13.6,scaleX:0.9976,rotation:90.0719,x:48.2,y:-21.4}},{t:this.instance_13,p:{regX:-45.8,scaleX:0.9973,scaleY:0.9973,rotation:51.6437,x:48.6,y:49.15}},{t:this.instance_12,p:{rotation:28.9959,x:108.4,y:111.7,regX:-7.8,regY:13.8}},{t:this.instance_11,p:{regX:-10.5,regY:10.8,scaleX:0.9972,scaleY:0.9972,rotation:34.7676,x:110.85,y:113.65}},{t:this.instance_10,p:{rotation:-5.5521,x:33.65,y:185.1,scaleX:0.9949,scaleY:0.9949,regX:3.5,regY:-50.9}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.7343,x:-4.25,y:-59.55}},{t:this.instance_8,p:{regX:1,scaleX:0.9949,scaleY:0.9949,rotation:10.3962,x:-41.85,y:185.8,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9297,x:-30.2,y:90.55}},{t:this.instance_6,p:{regX:0,scaleX:0.9946,scaleY:0.9946,rotation:-8.968,x:24.05,y:88}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.5,scaleX:0.9981,scaleY:0.9981,rotation:-1.2062,regY:51,y:-81.5,x:-5.9}},{t:this.instance_3,p:{regX:44.3,scaleX:0.9973,scaleY:0.9973,rotation:-92.4982,x:-98.75,y:48.2,regY:7.7}},{t:this.instance_2,p:{regX:4.4,scaleY:0.9974,rotation:-107.2751,x:-102.75,y:134.5,regY:-9,scaleX:0.9974}},{t:this.instance_1,p:{regY:-0.1,scaleX:0.997,scaleY:0.997,rotation:-108.1418,x:-102.8,y:134.2,regX:14.6}},{t:this.instance,p:{regX:33.6,scaleX:0.9974,scaleY:0.9974,rotation:-58.9994,y:-12.35,x:-59.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.5,rotation:1.7751,y:48.95,x:-9.7}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,rotation:90.5627,x:48.05,y:-21.4}},{t:this.instance_13,p:{regX:-45.7,scaleX:0.9973,scaleY:0.9973,rotation:49.1958,x:48.05,y:49.25}},{t:this.instance_12,p:{rotation:26.5502,x:110.35,y:109.05,regX:-7.8,regY:13.8}},{t:this.instance_11,p:{regX:-10.5,regY:10.8,scaleX:0.9972,scaleY:0.9972,rotation:32.3204,x:112.9,y:110.9}},{t:this.instance_10,p:{rotation:-5.5521,x:33.65,y:185.1,scaleX:0.9949,scaleY:0.9949,regX:3.5,regY:-50.9}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.7227,x:-4.25,y:-59.6}},{t:this.instance_8,p:{regX:0.9,scaleX:0.9949,scaleY:0.9949,rotation:10.0942,x:-41.9,y:185.75,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9297,x:-30.2,y:90.55}},{t:this.instance_6,p:{regX:0,scaleX:0.9946,scaleY:0.9946,rotation:-8.968,x:24.05,y:88}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.5,scaleX:0.9981,scaleY:0.9981,rotation:-0.6692,regY:51,y:-81.45,x:-5.85}},{t:this.instance_3,p:{regX:44.2,scaleX:0.9974,scaleY:0.9974,rotation:-92.228,x:-98.1,y:48.7,regY:7.7}},{t:this.instance_2,p:{regX:4.4,scaleY:0.9974,rotation:-107.0044,x:-102.6,y:134.85,regY:-9,scaleX:0.9974}},{t:this.instance_1,p:{regY:-0.1,scaleX:0.997,scaleY:0.997,rotation:-107.8726,x:-102.55,y:134.5,regX:14.6}},{t:this.instance,p:{regX:33.6,scaleX:0.9974,scaleY:0.9974,rotation:-59.5654,y:-12.35,x:-59.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.5,rotation:1.7751,y:48.95,x:-9.7}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,rotation:91.0544,x:48.1,y:-21.4}},{t:this.instance_13,p:{regX:-45.7,scaleX:0.9973,scaleY:0.9973,rotation:46.7508,x:47.4,y:49.2}},{t:this.instance_12,p:{rotation:24.1031,x:112.25,y:106.3,regX:-7.8,regY:13.8}},{t:this.instance_11,p:{regX:-10.5,regY:10.8,scaleX:0.9972,scaleY:0.9972,rotation:29.8757,x:114.8,y:108.1}},{t:this.instance_10,p:{rotation:-5.5521,x:33.65,y:185.1,scaleX:0.9949,scaleY:0.9949,regX:3.5,regY:-50.9}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.7114,x:-4.25,y:-59.6}},{t:this.instance_8,p:{regX:0.9,scaleX:0.9949,scaleY:0.9949,rotation:9.7901,x:-41.9,y:185.75,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9297,x:-30.2,y:90.55}},{t:this.instance_6,p:{regX:0,scaleX:0.9946,scaleY:0.9946,rotation:-8.968,x:24.05,y:88}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.5,scaleX:0.9981,scaleY:0.9981,rotation:-0.1305,regY:51,y:-81.5,x:-5.9}},{t:this.instance_3,p:{regX:44.2,scaleX:0.9973,scaleY:0.9973,rotation:-91.9578,x:-97.5,y:49.05,regY:7.7}},{t:this.instance_2,p:{regX:4.4,scaleY:0.9974,rotation:-106.7349,x:-102.35,y:135.3,regY:-9,scaleX:0.9974}},{t:this.instance_1,p:{regY:-0.1,scaleX:0.997,scaleY:0.997,rotation:-107.6011,x:-102.35,y:134.95,regX:14.6}},{t:this.instance,p:{regX:33.6,scaleX:0.9974,scaleY:0.9974,rotation:-60.1314,y:-12.35,x:-59.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.5,rotation:1.7742,y:48.95,x:-9.75}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,rotation:91.5452,x:48.05,y:-21.45}},{t:this.instance_13,p:{regX:-45.7,scaleX:0.9973,scaleY:0.9973,rotation:44.3039,x:46.85,y:49.25}},{t:this.instance_12,p:{rotation:21.658,x:113.95,y:103.6,regX:-7.8,regY:13.8}},{t:this.instance_11,p:{regX:-10.5,regY:10.8,scaleX:0.9972,scaleY:0.9972,rotation:27.4296,x:116.65,y:105.15}},{t:this.instance_10,p:{rotation:-5.5521,x:33.65,y:185.1,scaleX:0.9949,scaleY:0.9949,regX:3.5,regY:-50.9}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.7007,x:-4.2,y:-59.6}},{t:this.instance_8,p:{regX:1,scaleX:0.9949,scaleY:0.9949,rotation:9.4879,x:-41.75,y:185.75,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9289,x:-30.2,y:90.55}},{t:this.instance_6,p:{regX:0,scaleX:0.9946,scaleY:0.9946,rotation:-8.968,x:24.05,y:88}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.5,scaleX:0.9981,scaleY:0.9981,rotation:0.4047,regY:51,y:-81.45,x:-5.85}},{t:this.instance_3,p:{regX:44.2,scaleX:0.9973,scaleY:0.9973,rotation:-91.6877,x:-96.85,y:49.45,regY:7.7}},{t:this.instance_2,p:{regX:4.4,scaleY:0.9973,rotation:-106.4664,x:-102.15,y:135.65,regY:-9,scaleX:0.9973}},{t:this.instance_1,p:{regY:-0.1,scaleX:0.997,scaleY:0.997,rotation:-107.3318,x:-102.15,y:135.25,regX:14.6}},{t:this.instance,p:{regX:33.6,scaleX:0.9974,scaleY:0.9974,rotation:-60.6978,y:-12.35,x:-59.05}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.5,rotation:1.7742,y:48.95,x:-9.75}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,rotation:92.0372,x:48.1,y:-21.45}},{t:this.instance_13,p:{regX:-45.7,scaleX:0.9973,scaleY:0.9973,rotation:41.8576,x:46.2,y:49.2}},{t:this.instance_12,p:{rotation:19.2107,x:115.65,y:100.6,regX:-7.8,regY:13.8}},{t:this.instance_11,p:{regX:-10.5,regY:10.8,scaleX:0.9972,scaleY:0.9972,rotation:24.9832,x:118.35,y:102.05}},{t:this.instance_10,p:{rotation:-5.5521,x:33.65,y:185.1,scaleX:0.9949,scaleY:0.9949,regX:3.5,regY:-50.9}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.6885,x:-4.2,y:-59.6}},{t:this.instance_8,p:{regX:0.9,scaleX:0.9949,scaleY:0.9949,rotation:9.1852,x:-41.85,y:185.75,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9289,x:-30.2,y:90.55}},{t:this.instance_6,p:{regX:0,scaleX:0.9946,scaleY:0.9946,rotation:-8.968,x:24.05,y:88}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.5,scaleX:0.9981,scaleY:0.9981,rotation:0.9434,regY:51,y:-81.45,x:-5.85}},{t:this.instance_3,p:{regX:44.2,scaleX:0.9973,scaleY:0.9973,rotation:-91.4176,x:-96.25,y:49.85,regY:7.7}},{t:this.instance_2,p:{regX:4.4,scaleY:0.9974,rotation:-106.1949,x:-101.9,y:135.95,regY:-9,scaleX:0.9974}},{t:this.instance_1,p:{regY:-0.1,scaleX:0.997,scaleY:0.997,rotation:-107.0617,x:-101.85,y:135.65,regX:14.6}},{t:this.instance,p:{regX:33.6,scaleX:0.9974,scaleY:0.9974,rotation:-61.2632,y:-12.35,x:-59.05}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.5,rotation:1.7742,y:48.95,x:-9.75}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,rotation:92.5292,x:48.05,y:-21.45}},{t:this.instance_13,p:{regX:-45.7,scaleX:0.9973,scaleY:0.9973,rotation:39.4125,x:45.65,y:49.1}},{t:this.instance_12,p:{rotation:16.7654,x:117.2,y:97.6,regX:-7.8,regY:13.8}},{t:this.instance_11,p:{regX:-10.5,regY:10.8,scaleX:0.9972,scaleY:0.9972,rotation:22.5373,x:119.9,y:98.95}},{t:this.instance_10,p:{rotation:-5.5521,x:33.65,y:185.1,scaleX:0.9949,scaleY:0.9949,regX:3.5,regY:-50.9}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.6769,x:-4.2,y:-59.6}},{t:this.instance_8,p:{regX:0.9,scaleX:0.9949,scaleY:0.9949,rotation:8.8817,x:-41.9,y:185.75,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9289,x:-30.2,y:90.55}},{t:this.instance_6,p:{regX:0,scaleX:0.9946,scaleY:0.9946,rotation:-8.968,x:24.05,y:88}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.5,scaleX:0.9981,scaleY:0.9981,rotation:1.4805,regY:51,y:-81.4,x:-5.8}},{t:this.instance_3,p:{regX:44.2,scaleX:0.9973,scaleY:0.9973,rotation:-91.1467,x:-95.65,y:50.2,regY:7.7}},{t:this.instance_2,p:{regX:4.4,scaleY:0.9974,rotation:-105.9249,x:-101.8,y:136.4,regY:-9.1,scaleX:0.9974}},{t:this.instance_1,p:{regY:-0.1,scaleX:0.997,scaleY:0.997,rotation:-106.7915,x:-101.7,y:135.9,regX:14.6}},{t:this.instance,p:{regX:33.6,scaleX:0.9974,scaleY:0.9974,rotation:-61.8303,y:-12.35,x:-59.05}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.5,rotation:1.7742,y:48.95,x:-9.75}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,rotation:93.0197,x:48.05,y:-21.55}},{t:this.instance_13,p:{regX:-45.7,scaleX:0.9973,scaleY:0.9973,rotation:36.966,x:45,y:49.15}},{t:this.instance_12,p:{rotation:14.3193,x:118.55,y:94.45,regX:-7.8,regY:13.8}},{t:this.instance_11,p:{regX:-10.5,regY:10.8,scaleX:0.9972,scaleY:0.9972,rotation:20.0904,x:121.4,y:95.65}},{t:this.instance_10,p:{rotation:-5.5521,x:33.65,y:185.1,scaleX:0.9949,scaleY:0.9949,regX:3.5,regY:-50.9}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.6656,x:-4.2,y:-59.6}},{t:this.instance_8,p:{regX:1,scaleX:0.9949,scaleY:0.9949,rotation:8.5786,x:-41.8,y:185.75,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9289,x:-30.2,y:90.55}},{t:this.instance_6,p:{regX:0,scaleX:0.9946,scaleY:0.9946,rotation:-8.968,x:24.05,y:88}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.5,scaleX:0.9982,scaleY:0.9982,rotation:2.0185,regY:51,y:-81.5,x:-5.85}},{t:this.instance_3,p:{regX:44.2,scaleX:0.9973,scaleY:0.9973,rotation:-90.8775,x:-95.05,y:50.55,regY:7.7}},{t:this.instance_2,p:{regX:4.4,scaleY:0.9974,rotation:-105.6544,x:-101.55,y:136.6,regY:-9,scaleX:0.9974}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-106.5215,x:-101.55,y:136.25,regX:14.6}},{t:this.instance,p:{regX:33.6,scaleX:0.9974,scaleY:0.9974,rotation:-62.3953,y:-12.35,x:-59}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.5,rotation:1.7742,y:48.95,x:-9.75}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,rotation:93.5113,x:48.05,y:-21.5}},{t:this.instance_13,p:{regX:-45.8,scaleX:0.9973,scaleY:0.9973,rotation:34.5189,x:44.3,y:48.95}},{t:this.instance_12,p:{rotation:11.8717,x:119.95,y:91.1,regX:-7.7,regY:13.7}},{t:this.instance_11,p:{regX:-10.5,regY:10.8,scaleX:0.9972,scaleY:0.9972,rotation:17.6448,x:122.7,y:92.35}},{t:this.instance_10,p:{rotation:-5.5521,x:33.65,y:185.1,scaleX:0.9949,scaleY:0.9949,regX:3.5,regY:-50.9}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.6541,x:-4.15,y:-59.6}},{t:this.instance_8,p:{regX:0.9,scaleX:0.9949,scaleY:0.9949,rotation:8.2756,x:-41.9,y:185.75,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.928,x:-30.2,y:90.55}},{t:this.instance_6,p:{regX:0,scaleX:0.9946,scaleY:0.9946,rotation:-8.968,x:24.05,y:88}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.5,scaleX:0.9981,scaleY:0.9981,rotation:2.5568,regY:51,y:-81.45,x:-5.8}},{t:this.instance_3,p:{regX:44.3,scaleX:0.9974,scaleY:0.9974,rotation:-90.6075,x:-94.25,y:50.7,regY:7.8}},{t:this.instance_2,p:{regX:4.4,scaleY:0.9974,rotation:-105.3849,x:-101.3,y:136.9,regY:-9,scaleX:0.9974}},{t:this.instance_1,p:{regY:-0.1,scaleX:0.997,scaleY:0.997,rotation:-106.2518,x:-101.2,y:136.55,regX:14.6}},{t:this.instance,p:{regX:33.6,scaleX:0.9974,scaleY:0.9974,rotation:-62.9606,y:-12.35,x:-59}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.5,rotation:1.7742,y:48.95,x:-9.75}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,rotation:94.0031,x:48,y:-21.5}},{t:this.instance_13,p:{regX:-45.7,scaleX:0.9973,scaleY:0.9973,rotation:32.0736,x:43.75,y:49}},{t:this.instance_12,p:{rotation:9.427,x:121.05,y:87.95,regX:-7.7,regY:13.8}},{t:this.instance_11,p:{regX:-10.4,regY:10.8,scaleX:0.9972,scaleY:0.9972,rotation:15.1978,x:124,y:88.95}},{t:this.instance_10,p:{rotation:-5.5512,x:33.65,y:185.1,scaleX:0.9949,scaleY:0.9949,regX:3.5,regY:-50.9}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.6434,x:-4.15,y:-59.6}},{t:this.instance_8,p:{regX:0.9,scaleX:0.9949,scaleY:0.9949,rotation:7.9738,x:-41.9,y:185.6,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.928,x:-30.2,y:90.55}},{t:this.instance_6,p:{regX:0,scaleX:0.9946,scaleY:0.9946,rotation:-8.968,x:24.05,y:88}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.5,scaleX:0.9981,scaleY:0.9981,rotation:3.0962,regY:51.1,y:-81.3,x:-5.8}},{t:this.instance_3,p:{regX:44.2,scaleX:0.9974,scaleY:0.9974,rotation:-90.3357,x:-93.65,y:51.25,regY:7.8}},{t:this.instance_2,p:{regX:4.4,scaleY:0.9974,rotation:-105.1153,x:-101.05,y:137.2,regY:-9,scaleX:0.9974}},{t:this.instance_1,p:{regY:-0.1,scaleX:0.997,scaleY:0.997,rotation:-105.9809,x:-100.95,y:136.9,regX:14.6}},{t:this.instance,p:{regX:33.6,scaleX:0.9974,scaleY:0.9974,rotation:-63.5282,y:-12.35,x:-59}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.5,rotation:1.7742,y:48.95,x:-9.75}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,rotation:94.4935,x:48.05,y:-21.45}},{t:this.instance_13,p:{regX:-45.7,scaleX:0.9973,scaleY:0.9973,rotation:29.6271,x:43.2,y:48.95}},{t:this.instance_12,p:{rotation:6.9809,x:122.1,y:84.45,regX:-7.7,regY:13.7}},{t:this.instance_11,p:{regX:-10.5,regY:10.8,scaleX:0.9972,scaleY:0.9972,rotation:12.7518,x:124.85,y:85.4}},{t:this.instance_10,p:{rotation:-5.5512,x:33.6,y:185.05,scaleX:0.9949,scaleY:0.9949,regX:3.5,regY:-50.9}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.632,x:-4.1,y:-59.6}},{t:this.instance_8,p:{regX:0.9,scaleX:0.9949,scaleY:0.9949,rotation:7.6714,x:-41.9,y:185.6,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.928,x:-30.2,y:90.6}},{t:this.instance_6,p:{regX:0,scaleX:0.9946,scaleY:0.9946,rotation:-8.968,x:24.05,y:88}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.5,scaleX:0.9981,scaleY:0.9981,rotation:3.634,regY:51,y:-81.4,x:-5.85}},{t:this.instance_3,p:{regX:44.2,scaleX:0.9973,scaleY:0.9973,rotation:-90.0666,x:-93.1,y:51.55,regY:7.7}},{t:this.instance_2,p:{regX:4.4,scaleY:0.9973,rotation:-104.844,x:-100.85,y:137.55,regY:-9,scaleX:0.9973}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-105.7115,x:-100.85,y:137.2,regX:14.6}},{t:this.instance,p:{regX:33.6,scaleX:0.9974,scaleY:0.9974,rotation:-64.0939,y:-12.35,x:-59.05}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.5,rotation:1.7699,y:48.95,x:-9.7}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,rotation:94.0392,x:48.05,y:-21.5}},{t:this.instance_13,p:{regX:-45.7,scaleX:0.9973,scaleY:0.9973,rotation:31.93,x:43.65,y:49.05}},{t:this.instance_12,p:{rotation:9.2662,x:121.05,y:87.75,regX:-7.8,regY:13.8}},{t:this.instance_11,p:{regX:-10.5,regY:10.8,scaleX:0.9972,scaleY:0.9972,rotation:15.0342,x:123.85,y:88.7}},{t:this.instance_10,p:{rotation:-5.5636,x:33.65,y:185.1,scaleX:0.9949,scaleY:0.9949,regX:3.5,regY:-50.9}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.6478,x:-4.15,y:-59.6}},{t:this.instance_8,p:{regX:0.9,scaleX:0.9949,scaleY:0.9949,rotation:7.9605,x:-41.9,y:185.55,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9324,x:-30.2,y:90.6}},{t:this.instance_6,p:{regX:0,scaleX:0.9946,scaleY:0.9946,rotation:-8.9805,x:24.1,y:88}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.6,scaleX:0.9981,scaleY:0.9981,rotation:3.1242,regY:51.1,y:-81.3,x:-5.75}},{t:this.instance_3,p:{regX:44.3,scaleX:0.9973,scaleY:0.9974,rotation:-90.3261,x:-93.7,y:51.1,regY:7.7}},{t:this.instance_2,p:{regX:4.4,scaleY:0.9974,rotation:-105.1117,x:-101.05,y:137.25,regY:-9,scaleX:0.9974}},{t:this.instance_1,p:{regY:-0.1,scaleX:0.997,scaleY:0.997,rotation:-105.9979,x:-100.95,y:136.9,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9974,scaleY:0.9974,rotation:-63.5655,y:-12.2,x:-59.15}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.5,rotation:1.7664,y:48.95,x:-9.75}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,rotation:93.5833,x:48.05,y:-21.55}},{t:this.instance_13,p:{regX:-45.8,scaleX:0.9973,scaleY:0.9973,rotation:34.2332,x:44.15,y:49.05}},{t:this.instance_12,p:{rotation:11.55,x:119.95,y:90.8,regX:-7.8,regY:13.8}},{t:this.instance_11,p:{regX:-10.5,regY:10.8,scaleX:0.9972,scaleY:0.9972,rotation:17.3165,x:122.8,y:91.95}},{t:this.instance_10,p:{rotation:-5.5751,x:33.7,y:185.1,scaleX:0.9948,scaleY:0.9948,regX:3.5,regY:-50.9}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.6636,x:-4.2,y:-59.6}},{t:this.instance_8,p:{regX:0.9,scaleX:0.9949,scaleY:0.9949,rotation:8.2516,x:-41.9,y:185.75,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9376,x:-30.25,y:90.6}},{t:this.instance_6,p:{regX:0,scaleX:0.9946,scaleY:0.9946,rotation:-8.993,x:24.05,y:88}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.6,scaleX:0.9981,scaleY:0.9981,rotation:2.6147,regY:51,y:-81.5,x:-5.7}},{t:this.instance_3,p:{regX:44.3,scaleX:0.9974,scaleY:0.9974,rotation:-90.5865,x:-94.3,y:50.75,regY:7.7}},{t:this.instance_2,p:{regX:4.4,scaleY:0.9974,rotation:-105.3804,x:-101.25,y:137,regY:-9,scaleX:0.9974}},{t:this.instance_1,p:{regY:-0.1,scaleX:0.997,scaleY:0.997,rotation:-106.2846,x:-101.15,y:136.65,regX:14.5}},{t:this.instance,p:{regX:33.6,scaleX:0.9974,scaleY:0.9974,rotation:-63.0355,y:-12.35,x:-59.05}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.5,rotation:1.7629,y:48.95,x:-9.75}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,rotation:93.1267,x:48.05,y:-21.45}},{t:this.instance_13,p:{regX:-45.7,scaleX:0.9973,scaleY:0.9973,rotation:36.5361,x:44.85,y:49.1}},{t:this.instance_12,p:{rotation:13.8338,x:118.75,y:93.85,regX:-7.8,regY:13.8}},{t:this.instance_11,p:{regX:-10.4,regY:10.8,scaleX:0.9972,scaleY:0.9972,rotation:19.5983,x:121.7,y:95.1}},{t:this.instance_10,p:{rotation:-5.5865,x:33.6,y:185.1,scaleX:0.9949,scaleY:0.9949,regX:3.4,regY:-50.9}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.6806,x:-4.15,y:-59.6}},{t:this.instance_8,p:{regX:0.9,scaleX:0.9949,scaleY:0.9949,rotation:8.5422,x:-41.9,y:185.7,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9429,x:-30.2,y:90.6}},{t:this.instance_6,p:{regX:0,scaleX:0.9946,scaleY:0.9946,rotation:-9.0061,x:24.1,y:88}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.5,scaleX:0.9981,scaleY:0.9981,rotation:2.1045,regY:51,y:-81.5,x:-5.8}},{t:this.instance_3,p:{regX:44.2,scaleX:0.9973,scaleY:0.9973,rotation:-90.8468,x:-94.9,y:50.55,regY:7.7}},{t:this.instance_2,p:{regX:4.4,scaleY:0.9974,rotation:-105.6488,x:-101.45,y:136.6,regY:-9,scaleX:0.9974}},{t:this.instance_1,p:{regY:-0.1,scaleX:0.997,scaleY:0.997,rotation:-106.5709,x:-101.4,y:136.35,regX:14.6}},{t:this.instance,p:{regX:33.6,scaleX:0.9974,scaleY:0.9974,rotation:-62.5055,y:-12.35,x:-59.05}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,rotation:1.7585,y:49,x:-9.65}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,rotation:92.6722,x:48.05,y:-21.5}},{t:this.instance_13,p:{regX:-45.7,scaleX:0.9973,scaleY:0.9973,rotation:38.8385,x:45.45,y:49.15}},{t:this.instance_12,p:{rotation:16.1197,x:117.5,y:96.75,regX:-7.8,regY:13.7}},{t:this.instance_11,p:{regX:-10.4,regY:10.8,scaleX:0.9972,scaleY:0.9972,rotation:21.8794,x:120.4,y:98.2}},{t:this.instance_10,p:{rotation:-5.5988,x:33.75,y:185.1,scaleX:0.9949,scaleY:0.9949,regX:3.5,regY:-50.9}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.6964,x:-4.2,y:-59.6}},{t:this.instance_8,p:{regX:0.9,scaleX:0.9949,scaleY:0.9949,rotation:8.8329,x:-41.95,y:185.75,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.949,x:-30.15,y:90.6}},{t:this.instance_6,p:{regX:0,scaleX:0.9946,scaleY:0.9946,rotation:-9.0206,x:24.1,y:88}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.5,scaleX:0.9981,scaleY:0.9981,rotation:1.5944,regY:51,y:-81.4,x:-5.75}},{t:this.instance_3,p:{regX:44.2,scaleX:0.9973,scaleY:0.9973,rotation:-91.1055,x:-95.45,y:50.3,regY:7.7}},{t:this.instance_2,p:{regX:4.4,scaleY:0.9974,rotation:-105.9166,x:-101.75,y:136.45,regY:-9.1,scaleX:0.9974}},{t:this.instance_1,p:{regY:-0.1,scaleX:0.997,scaleY:0.997,rotation:-106.8575,x:-101.5,y:135.95,regX:14.6}},{t:this.instance,p:{regX:33.6,scaleX:0.9974,scaleY:0.9974,rotation:-61.9766,y:-12.35,x:-59}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,rotation:1.755,y:49,x:-9.65}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,rotation:92.2152,x:48.05,y:-21.5}},{t:this.instance_13,p:{regX:-45.7,scaleX:0.9973,scaleY:0.9973,rotation:41.1421,x:46,y:49.2}},{t:this.instance_12,p:{rotation:18.4053,x:116.05,y:99.7,regX:-7.8,regY:13.8}},{t:this.instance_11,p:{regX:-10.4,regY:10.8,scaleX:0.9972,scaleY:0.9972,rotation:24.1632,x:118.95,y:101.2}},{t:this.instance_10,p:{rotation:-5.6096,x:33.8,y:185.1,scaleX:0.9948,scaleY:0.9948,regX:3.5,regY:-50.9}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.7132,x:-4.2,y:-59.6}},{t:this.instance_8,p:{regX:0.9,scaleX:0.9949,scaleY:0.9949,rotation:9.1237,x:-41.9,y:185.7,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9543,x:-30.2,y:90.6}},{t:this.instance_6,p:{regX:0,scaleX:0.9946,scaleY:0.9946,rotation:-9.0331,x:24.05,y:88}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.5,scaleX:0.9981,scaleY:0.9981,rotation:1.0844,regY:51.1,y:-81.3,x:-5.85}},{t:this.instance_3,p:{regX:44.2,scaleX:0.9974,scaleY:0.9974,rotation:-91.3659,x:-96.05,y:49.95,regY:7.7}},{t:this.instance_2,p:{regX:4.4,scaleY:0.9974,rotation:-106.1832,x:-101.8,y:136.1,regY:-9,scaleX:0.9974}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-107.1432,x:-101.9,y:135.75,regX:14.6}},{t:this.instance,p:{regX:33.6,scaleX:0.9974,scaleY:0.9974,rotation:-61.4463,y:-12.35,x:-59.05}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,rotation:1.7515,y:49,x:-9.65}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,rotation:91.7601,x:48.05,y:-21.45}},{t:this.instance_13,p:{regX:-45.8,scaleX:0.9973,scaleY:0.9973,rotation:43.4452,x:46.45,y:49.15}},{t:this.instance_12,p:{rotation:20.6895,x:114.55,y:102.5,regX:-7.8,regY:13.8}},{t:this.instance_11,p:{regX:-10.5,regY:10.8,scaleX:0.9972,scaleY:0.9972,rotation:26.4439,x:117.3,y:104.05}},{t:this.instance_10,p:{rotation:-5.6218,x:33.85,y:185.05,scaleX:0.9949,scaleY:0.9949,regX:3.5,regY:-50.9}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.729,x:-4.2,y:-59.55}},{t:this.instance_8,p:{regX:0.9,scaleX:0.9949,scaleY:0.9949,rotation:9.4148,x:-41.9,y:185.75,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9597,x:-30.15,y:90.6}},{t:this.instance_6,p:{regX:0,scaleX:0.9946,scaleY:0.9946,rotation:-9.0463,x:24.1,y:88}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.5,scaleX:0.9981,scaleY:0.9981,rotation:0.5746,regY:51,y:-81.45,x:-5.85}},{t:this.instance_3,p:{regX:44.2,scaleX:0.9973,scaleY:0.9973,rotation:-91.6263,x:-96.55,y:49.65,regY:7.8}},{t:this.instance_2,p:{regX:4.4,scaleY:0.9973,rotation:-106.4517,x:-102.05,y:135.75,regY:-9,scaleX:0.9973}},{t:this.instance_1,p:{regY:-0.1,scaleX:0.997,scaleY:0.997,rotation:-107.43,x:-101.95,y:135.35,regX:14.6}},{t:this.instance,p:{regX:33.6,scaleX:0.9974,scaleY:0.9974,rotation:-60.9168,y:-12.35,x:-59}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,rotation:1.748,y:49,x:-9.65}},{t:this.instance_14,p:{regY:13.6,scaleX:0.9976,rotation:91.3042,x:48.2,y:-21.4}},{t:this.instance_13,p:{regX:-45.7,scaleX:0.9973,scaleY:0.9973,rotation:45.7482,x:47.15,y:49.2}},{t:this.instance_12,p:{rotation:22.9735,x:112.95,y:105.15,regX:-7.8,regY:13.8}},{t:this.instance_11,p:{regX:-10.5,regY:10.8,scaleX:0.9972,scaleY:0.9972,rotation:28.726,x:115.5,y:106.85}},{t:this.instance_10,p:{rotation:-5.6332,x:33.85,y:185.05,scaleX:0.9949,scaleY:0.9949,regX:3.5,regY:-50.9}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.7448,x:-4.2,y:-59.55}},{t:this.instance_8,p:{regX:1,scaleX:0.9949,scaleY:0.9949,rotation:9.7055,x:-41.85,y:185.75,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.965,x:-30.15,y:90.6}},{t:this.instance_6,p:{regX:0,scaleX:0.9946,scaleY:0.9946,rotation:-9.0597,x:24.05,y:88}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.5,scaleX:0.9981,scaleY:0.9981,rotation:0.0648,regY:51,y:-81.45,x:-5.85}},{t:this.instance_3,p:{regX:44.2,scaleX:0.9973,scaleY:0.9973,rotation:-91.8859,x:-97.15,y:49.25,regY:7.8}},{t:this.instance_2,p:{regX:4.4,scaleY:0.9974,rotation:-106.7183,x:-102.15,y:135.45,regY:-9,scaleX:0.9974}},{t:this.instance_1,p:{regY:-0.1,scaleX:0.997,scaleY:0.997,rotation:-107.7162,x:-102.2,y:135.1,regX:14.6}},{t:this.instance,p:{regX:33.6,scaleX:0.9975,scaleY:0.9975,rotation:-60.387,y:-12.3,x:-59.05}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,rotation:1.7436,y:49,x:-9.65}},{t:this.instance_14,p:{regY:13.6,scaleX:0.9976,rotation:90.8484,x:48.25,y:-21.4}},{t:this.instance_13,p:{regX:-45.7,scaleX:0.9973,scaleY:0.9973,rotation:48.0512,x:47.7,y:49.25}},{t:this.instance_12,p:{rotation:25.2589,x:111.2,y:107.85,regX:-7.8,regY:13.8}},{t:this.instance_11,p:{regX:-10.5,regY:10.8,scaleX:0.9972,scaleY:0.9972,rotation:31.0087,x:113.75,y:109.6}},{t:this.instance_10,p:{rotation:-5.6458,x:33.75,y:185.05,scaleX:0.9949,scaleY:0.9949,regX:3.4,regY:-50.9}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.7616,x:-4.25,y:-59.55}},{t:this.instance_8,p:{regX:1,scaleX:0.9949,scaleY:0.9949,rotation:9.9953,x:-41.9,y:185.8,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9702,x:-30.15,y:90.6}},{t:this.instance_6,p:{regX:0,scaleX:0.9946,scaleY:0.9946,rotation:-9.0732,x:24.1,y:88}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.5,scaleX:0.9981,scaleY:0.9981,rotation:-0.4415,regY:51,y:-81.5,x:-5.85}},{t:this.instance_3,p:{regX:44.2,scaleX:0.9974,scaleY:0.9974,rotation:-92.1455,x:-97.75,y:48.85,regY:7.7}},{t:this.instance_2,p:{regX:4.4,scaleY:0.9974,rotation:-106.987,x:-102.45,y:135.1,regY:-9,scaleX:0.9974}},{t:this.instance_1,p:{regY:-0.1,scaleX:0.997,scaleY:0.997,rotation:-108.0024,x:-102.35,y:134.7,regX:14.6}},{t:this.instance,p:{regX:33.6,scaleX:0.9974,scaleY:0.9974,rotation:-59.8581,y:-12.35,x:-59}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,rotation:1.7401,y:49,x:-9.65}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,rotation:90.3935,x:48.05,y:-21.4}},{t:this.instance_13,p:{regX:-45.8,scaleX:0.9973,scaleY:0.9973,rotation:50.3547,x:48.15,y:49.15}},{t:this.instance_12,p:{rotation:27.5441,x:109.35,y:110.3,regX:-7.8,regY:13.8}},{t:this.instance_11,p:{regX:-10.4,regY:10.8,scaleX:0.9972,scaleY:0.9972,rotation:33.2906,x:112,y:112.25}},{t:this.instance_10,p:{rotation:-5.6581,x:33.9,y:185.05,scaleX:0.9949,scaleY:0.9949,regX:3.5,regY:-50.9}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.7776,x:-4.25,y:-59.55}},{t:this.instance_8,p:{regX:1,scaleX:0.9949,scaleY:0.9949,rotation:10.2871,x:-41.85,y:185.85,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9755,x:-30.15,y:90.6}},{t:this.instance_6,p:{regX:0,scaleX:0.9946,scaleY:0.9946,rotation:-9.0863,x:24.1,y:88}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.5,scaleX:0.9981,scaleY:0.9981,rotation:-0.9496,regY:51.1,y:-81.3,x:-5.9}},{t:this.instance_3,p:{regX:44.2,scaleX:0.9974,scaleY:0.9974,rotation:-92.4052,x:-98.35,y:48.5,regY:7.7}},{t:this.instance_2,p:{regX:4.4,scaleY:0.9973,rotation:-107.254,x:-102.55,y:134.75,regY:-9,scaleX:0.9973}},{t:this.instance_1,p:{regY:-0.1,scaleX:0.997,scaleY:0.997,rotation:-108.2888,x:-102.55,y:134.4,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9974,scaleY:0.9974,rotation:-59.3273,y:-12.25,x:-59.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,rotation:1.7366,y:49,x:-9.65}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,rotation:89.9422,x:48.05,y:-21.45}},{t:this.instance_13,p:{regX:-45.7,scaleX:0.9973,scaleY:0.9973,rotation:52.6574,x:48.8,y:49.2}},{t:this.instance_12,p:{rotation:29.8289,x:107.4,y:112.75,regX:-7.8,regY:13.8}},{t:this.instance_11,p:{regX:-10.5,regY:10.8,scaleX:0.9972,scaleY:0.9972,rotation:35.5727,x:109.9,y:114.7}},{t:this.instance_10,p:{rotation:-5.6695,x:33.95,y:185.05,scaleX:0.9949,scaleY:0.9949,regX:3.5,regY:-50.9}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.7925,x:-4.3,y:-59.55}},{t:this.instance_8,p:{regX:0.9,scaleX:0.9949,scaleY:0.9949,rotation:10.5775,x:-41.95,y:185.7,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9807,x:-30.2,y:90.6}},{t:this.instance_6,p:{regX:0,scaleX:0.9946,scaleY:0.9946,rotation:-9.0999,x:24.05,y:88}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.5,scaleX:0.9981,scaleY:0.9981,rotation:-1.4595,regY:51,y:-81.45,x:-5.9}},{t:this.instance_3,p:{regX:44.2,scaleX:0.9973,scaleY:0.9973,rotation:-92.6658,x:-98.9,y:48.15,regY:7.7}},{t:this.instance_2,p:{regX:4.4,scaleY:0.9974,rotation:-107.5232,x:-102.7,y:134.4,regY:-9,scaleX:0.9974}},{t:this.instance_1,p:{regY:-0.1,scaleX:0.997,scaleY:0.997,rotation:-108.575,x:-102.75,y:134,regX:14.6}},{t:this.instance,p:{regX:33.6,scaleX:0.9974,scaleY:0.9974,rotation:-58.7981,y:-12.35,x:-59.05}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,rotation:1.7331,y:49,x:-9.65}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,rotation:89.4864,x:48.1,y:-21.45}},{t:this.instance_13,p:{regX:-45.6,scaleX:0.9973,scaleY:0.9973,rotation:54.9604,x:49.4,y:49.35}},{t:this.instance_12,p:{rotation:32.1139,x:105.4,y:115.05,regX:-7.8,regY:13.8}},{t:this.instance_11,p:{regX:-10.5,regY:10.8,scaleX:0.9972,scaleY:0.9972,rotation:37.8552,x:107.8,y:117.05}},{t:this.instance_10,p:{rotation:-5.6811,x:34,y:185.1,scaleX:0.9949,scaleY:0.9949,regX:3.5,regY:-50.9}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.8093,x:-4.3,y:-59.55}},{t:this.instance_8,p:{regX:0.9,scaleX:0.9949,scaleY:0.9949,rotation:10.8682,x:-41.95,y:185.7,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9869,x:-30.15,y:90.6}},{t:this.instance_6,p:{regX:0,scaleX:0.9946,scaleY:0.9946,rotation:-9.1131,x:24.15,y:88}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.5,scaleX:0.9981,scaleY:0.9981,rotation:-1.9695,regY:51,y:-81.45,x:-5.85}},{t:this.instance_3,p:{regX:44.2,scaleX:0.9974,scaleY:0.9974,rotation:-92.9256,x:-99.5,y:47.85,regY:7.7}},{t:this.instance_2,p:{regX:4.4,scaleY:0.9974,rotation:-107.7907,x:-102.95,y:134.1,regY:-9,scaleX:0.9974}},{t:this.instance_1,p:{regY:-0.1,scaleX:0.997,scaleY:0.997,rotation:-108.8606,x:-102.85,y:133.7,regX:14.6}},{t:this.instance,p:{regX:33.6,scaleX:0.9974,scaleY:0.9974,rotation:-58.269,y:-12.3,x:-59.05}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,rotation:1.7296,y:49,x:-9.65}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,rotation:89.0298,x:48.1,y:-21.4}},{t:this.instance_13,p:{regX:-45.7,scaleX:0.9973,scaleY:0.9973,rotation:57.2635,x:49.95,y:49.25}},{t:this.instance_12,p:{rotation:34.3994,x:103.3,y:117.2,regX:-7.8,regY:13.8}},{t:this.instance_11,p:{regX:-10.4,regY:10.8,scaleX:0.9972,scaleY:0.9972,rotation:40.1375,x:105.55,y:119.4}},{t:this.instance_10,p:{rotation:-5.6925,x:34.05,y:185.1,scaleX:0.9949,scaleY:0.9949,regX:3.5,regY:-50.9}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.8251,x:-4.3,y:-59.55}},{t:this.instance_8,p:{regX:0.9,scaleX:0.9949,scaleY:0.9949,rotation:11.1591,x:-42,y:185.65,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9922,x:-30.15,y:90.6}},{t:this.instance_6,p:{regX:0,scaleX:0.9946,scaleY:0.9946,rotation:-9.1263,x:24.15,y:88}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.5,scaleX:0.9981,scaleY:0.9981,rotation:-2.4805,regY:51,y:-81.5,x:-5.9}},{t:this.instance_3,p:{regX:44.2,scaleX:0.9974,scaleY:0.9974,rotation:-93.1845,x:-100.05,y:47.45,regY:7.7}},{t:this.instance_2,p:{regX:4.3,scaleY:0.9974,rotation:-108.0588,x:-103.2,y:133.8,regY:-9.1,scaleX:0.9974}},{t:this.instance_1,p:{regY:-0.1,scaleX:0.997,scaleY:0.997,rotation:-109.1479,x:-103.05,y:133.3,regX:14.6}},{t:this.instance,p:{regX:33.6,scaleX:0.9974,scaleY:0.9974,rotation:-57.7386,y:-12.3,x:-59.05}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,rotation:1.7261,y:49,x:-9.65}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,rotation:88.574,x:48.1,y:-21.4}},{t:this.instance_13,p:{regX:-45.7,scaleX:0.9973,scaleY:0.9973,rotation:59.5662,x:50.5,y:49.25}},{t:this.instance_12,p:{rotation:36.684,x:101.05,y:119.3,regX:-7.8,regY:13.8}},{t:this.instance_11,p:{regX:-10.5,regY:10.8,scaleX:0.9972,scaleY:0.9972,rotation:42.4189,x:103.3,y:121.55}},{t:this.instance_10,p:{rotation:-5.7032,x:34,y:184.95,scaleX:0.9949,scaleY:0.9949,regX:3.4,regY:-51}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.8418,x:-4.3,y:-59.55}},{t:this.instance_8,p:{regX:0.9,scaleX:0.9949,scaleY:0.9949,rotation:11.4495,x:-42,y:185.8,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9975,x:-30.15,y:90.6}},{t:this.instance_6,p:{regX:0,scaleX:0.9946,scaleY:0.9946,rotation:-9.1391,x:24.1,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.5,scaleX:0.9981,scaleY:0.9981,rotation:-2.9892,regY:51,y:-81.45,x:-5.95}},{t:this.instance_3,p:{regX:44.2,scaleX:0.9973,scaleY:0.9973,rotation:-93.4436,x:-100.6,y:47.05,regY:7.7}},{t:this.instance_2,p:{regX:4.4,scaleY:0.9974,rotation:-108.3266,x:-103.25,y:133.35,regY:-9,scaleX:0.9974}},{t:this.instance_1,p:{regY:-0.1,scaleX:0.997,scaleY:0.997,rotation:-109.4352,x:-103.25,y:132.9,regX:14.6}},{t:this.instance,p:{regX:33.6,scaleX:0.9974,scaleY:0.9974,rotation:-57.2097,y:-12.3,x:-59.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,rotation:1.7226,y:49,x:-9.65}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,rotation:88.1189,x:48.15,y:-21.45}},{t:this.instance_13,p:{regX:-45.7,scaleX:0.9973,scaleY:0.9973,rotation:61.869,x:51.1,y:49.25}},{t:this.instance_12,p:{rotation:38.9686,x:98.75,y:121.25,regX:-7.8,regY:13.8}},{t:this.instance_11,p:{regX:-10.5,regY:10.8,scaleX:0.9972,scaleY:0.9972,rotation:44.7018,x:100.85,y:123.6}},{t:this.instance_10,p:{rotation:-5.7155,x:34.1,y:185.05,scaleX:0.9949,scaleY:0.9949,regX:3.5,regY:-50.9}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.8579,x:-4.3,y:-59.55}},{t:this.instance_8,p:{regX:1,scaleX:0.9949,scaleY:0.9949,rotation:11.742,x:-41.95,y:185.8,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:4.0028,x:-30.25,y:90.55}},{t:this.instance_6,p:{regX:0,scaleX:0.9946,scaleY:0.9946,rotation:-9.1522,x:24.15,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.5,scaleX:0.9981,scaleY:0.9981,rotation:-3.4989,regY:51,y:-81.5,x:-5.95}},{t:this.instance_3,p:{regX:44.2,scaleX:0.9973,scaleY:0.9974,rotation:-93.7045,x:-101.15,y:46.65,regY:7.7}},{t:this.instance_2,p:{regX:4.4,scaleY:0.9974,rotation:-108.5943,x:-103.4,y:132.95,regY:-9,scaleX:0.9974}},{t:this.instance_1,p:{regY:-0.1,scaleX:0.997,scaleY:0.997,rotation:-109.7198,x:-103.35,y:132.6,regX:14.6}},{t:this.instance,p:{regX:33.6,scaleX:0.9974,scaleY:0.9974,rotation:-56.6797,y:-12.3,x:-59.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,rotation:1.7182,y:49,x:-9.65}},{t:this.instance_14,p:{regY:13.6,scaleX:0.9976,rotation:87.6638,x:48.2,y:-21.45}},{t:this.instance_13,p:{regX:-45.8,scaleX:0.9973,scaleY:0.9973,rotation:64.172,x:51.55,y:49.2}},{t:this.instance_12,p:{rotation:41.2522,x:96.4,y:123.05,regX:-7.8,regY:13.8}},{t:this.instance_11,p:{regX:-10.4,regY:10.8,scaleX:0.9972,scaleY:0.9972,rotation:46.983,x:98.55,y:125.6}},{t:this.instance_10,p:{rotation:-5.7269,x:34.15,y:185.05,scaleX:0.9949,scaleY:0.9949,regX:3.5,regY:-50.9}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.8737,x:-4.35,y:-59.55}},{t:this.instance_8,p:{regX:0.9,scaleX:0.9949,scaleY:0.9949,rotation:12.0301,x:-42,y:185.8,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:4.008,x:-30.2,y:90.55}},{t:this.instance_6,p:{regX:0,scaleX:0.9946,scaleY:0.9946,rotation:-9.1667,x:24.1,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.5,scaleX:0.9981,scaleY:0.9981,rotation:-4.0089,regY:51.1,y:-81.3,x:-6}},{t:this.instance_3,p:{regX:44.3,scaleX:0.9974,scaleY:0.9974,rotation:-93.9636,x:-101.65,y:46.2,regY:7.7}},{t:this.instance_2,p:{regX:4.4,scaleY:0.9974,rotation:-108.861,x:-103.5,y:132.6,regY:-9,scaleX:0.9974}},{t:this.instance_1,p:{regY:-0.1,scaleX:0.997,scaleY:0.997,rotation:-110.0069,x:-103.55,y:132.2,regX:14.6}},{t:this.instance,p:{regX:33.6,scaleX:0.9974,scaleY:0.9974,rotation:-56.1509,y:-12.35,x:-59.05}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-122.6,-204.3,282.79999999999995,501.6);


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
	this.instance_2 = new lib.ch1_headcopy2_2("synched",0);
	this.instance_2.setTransform(-0.15,51.35,0.999,0.999,2.3215,0,0,0.9,52.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-80.2,-71.5,171.10000000000002,152.5);


(lib.Tween4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CharacterGood_01();
	this.instance.setTransform(-32.75,3.8,0.2582,0.2582,0,0,0,12.4,42);

	this.instance_1 = new lib.CharacterGood_04();
	this.instance_1.setTransform(16.65,5.6,0.2582,0.2582,0,0,0,38,49.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-61.3,-70.6,122.69999999999999,141.39999999999998);


(lib.Tween3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(-40.2,-1.7,0.2582,0.2582,0,0,0,-39.9,46.3);

	this.instance_1 = new lib.CharacterGood_02();
	this.instance_1.setTransform(9.6,-1.3,0.2582,0.2582,0,0,0,-39.9,46.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-55.5,-66.5,111.1,131.8);


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
	this.instance = new lib.CachedBmp_103();
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
p.nominalBounds = new cjs.Rectangle(-127.2,-205.9,258.8,409.20000000000005);


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
	this.instance = new lib.ch1_uArm_rcopy_2("synched",0);
	this.instance.setTransform(-59,-12.4,0.9977,0.9977,-60.7503,0,0,33.8,10.2);

	this.instance_1 = new lib.ch1_hand_rcopy_2("synched",0);
	this.instance_1.setTransform(-102.6,135.55,0.9973,0.9973,-115.328,0,0,14.5,-0.2);

	this.instance_2 = new lib.ch1_thumb_rcopy_2("synched",0);
	this.instance_2.setTransform(-102.35,135.4,0.9976,0.9976,-108.8232,0,0,4.7,-8.9);

	this.instance_3 = new lib.ch1_lArm_rcopy_2("synched",0);
	this.instance_3.setTransform(-96.75,49.2,0.9976,0.9976,-91.2682,0,0,44.6,7.5);

	this.instance_4 = new lib.ch1_headcopy_2("synched",0);
	this.instance_4.setTransform(1.4,-80.85,0.9982,0.9982,-7.1424,0,0,1.9,51);

	this.instance_5 = new lib.ch1_uBodycopy_2("synched",0);
	this.instance_5.setTransform(-7.35,-36,1,1,0,0,0,-0.1,-39.6);

	this.instance_6 = new lib.ch1_uLeg_lcopy_2("synched",0);
	this.instance_6.setTransform(23.95,88.2,0.9949,0.9949,-8.9721,0,0,-0.2,4.4);

	this.instance_7 = new lib.ch1_uLeg_rcopy_2("synched",0);
	this.instance_7.setTransform(-29.9,89.85,0.9957,0.9957,3.9387,0,0,1.5,-42.8);

	this.instance_8 = new lib.ch1_lLeg_rcopy_2("synched",0);
	this.instance_8.setTransform(-41.55,185.45,0.9953,0.9953,10.0062,0,0,1.2,-51.5);

	this.instance_9 = new lib.ch1_neckcopy_2("synched",0);
	this.instance_9.setTransform(-4.15,-59.15,0.9983,0.9983,11.4709,0,0,-1.2,7.7);

	this.instance_10 = new lib.ch1_lLeg_lcopy_2("synched",0);
	this.instance_10.setTransform(33.95,185.55,0.995,0.995,-9.252,0,0,3.4,-50.6);

	this.instance_11 = new lib.ch1_hand_lcopy_2("synched",0);
	this.instance_11.setTransform(84.25,125.4,0.9975,0.9975,76.0987,0,0,-10.3,10.6);

	this.instance_12 = new lib.ch1_thumb_lcopy_2("synched",0);
	this.instance_12.setTransform(82.1,122.55,0.9975,0.9975,40.7831,0,0,-7.7,13.6);

	this.instance_13 = new lib.ch1_lArm_lcopy_2("synched",0);
	this.instance_13.setTransform(36.55,49,0.9976,0.9976,63.921,0,0,-45.7,13);

	this.instance_14 = new lib.ch1_uArm_lcopy_2("synched",0);
	this.instance_14.setTransform(48,-20.9,0.9978,0.9978,99.7856,0,0,-32.8,13.6);

	this.instance_15 = new lib.ch1_lBodycopy_2("synched",0);
	this.instance_15.setTransform(-9.3,49.05,0.9995,0.9995,1.7768,0,0,-4,-21.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7768,y:49.05,x:-9.3,regY:-21.9}},{t:this.instance_14,p:{regX:-32.8,scaleX:0.9978,scaleY:0.9978,rotation:99.7856,x:48,y:-20.9,regY:13.6}},{t:this.instance_13,p:{regY:13,scaleX:0.9976,scaleY:0.9976,rotation:63.921,x:36.55,y:49,regX:-45.7}},{t:this.instance_12,p:{regY:13.6,scaleX:0.9975,scaleY:0.9975,rotation:40.7831,x:82.1,y:122.55}},{t:this.instance_11,p:{regX:-10.3,regY:10.6,scaleX:0.9975,scaleY:0.9975,rotation:76.0987,x:84.25,y:125.4}},{t:this.instance_10,p:{rotation:-9.252,x:33.95,y:185.55,regX:3.4,scaleX:0.995,scaleY:0.995}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.4709,y:-59.15,x:-4.15}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9953,scaleY:0.9953,rotation:10.0062,x:-41.55,regY:-51.5,y:185.45}},{t:this.instance_7,p:{regX:1.5,scaleX:0.9957,scaleY:0.9957,rotation:3.9387,x:-29.9,y:89.85}},{t:this.instance_6,p:{scaleX:0.9949,scaleY:0.9949,rotation:-8.9721,x:23.95,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-7.1424,y:-80.85,x:1.4,regX:1.9,regY:51}},{t:this.instance_3,p:{scaleX:0.9976,scaleY:0.9976,rotation:-91.2682,x:-96.75,y:49.2,regY:7.5}},{t:this.instance_2,p:{regY:-8.9,scaleX:0.9976,scaleY:0.9976,rotation:-108.8232,x:-102.35,y:135.4,regX:4.7}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9973,scaleY:0.9973,rotation:-115.328,x:-102.6,y:135.55,regX:14.5}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-60.7503,x:-59,y:-12.4,regX:33.8}}]}).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7751,y:48.95,x:-9.3,regY:-21.9}},{t:this.instance_14,p:{regX:-32.9,scaleX:0.9977,scaleY:0.9977,rotation:98.8636,x:47.95,y:-21.05,regY:13.6}},{t:this.instance_13,p:{regY:13.1,scaleX:0.9975,scaleY:0.9975,rotation:65.3171,x:37.55,y:49.2,regX:-45.7}},{t:this.instance_12,p:{regY:13.7,scaleX:0.9974,scaleY:0.9974,rotation:42.1781,x:81.35,y:124}},{t:this.instance_11,p:{regX:-10.2,regY:10.5,scaleX:0.9974,scaleY:0.9974,rotation:77.4959,x:83.5,y:126.65}},{t:this.instance_10,p:{rotation:-9.2516,x:33.9,y:185.5,regX:3.4,scaleX:0.995,scaleY:0.995}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.4654,y:-59.1,x:-4.15}},{t:this.instance_8,p:{regX:1.3,scaleX:0.9952,scaleY:0.9952,rotation:10.0051,x:-41.45,regY:-51.5,y:185.45}},{t:this.instance_7,p:{regX:1.4,scaleX:0.9956,scaleY:0.9956,rotation:3.938,x:-29.95,y:89.75}},{t:this.instance_6,p:{scaleX:0.9947,scaleY:0.9947,rotation:-8.9732,x:23.85,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-6.7723,y:-80.75,x:1.4,regX:1.9,regY:51}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-92.9005,x:-94.85,y:50.25,regY:7.5}},{t:this.instance_2,p:{regY:-8.8,scaleX:0.9975,scaleY:0.9975,rotation:-110.455,x:-97.9,y:136.65,regX:4.7}},{t:this.instance_1,p:{regY:-0.3,scaleX:0.9972,scaleY:0.9972,rotation:-116.9591,x:-98.15,y:136.75,regX:14.5}},{t:this.instance,p:{scaleX:0.9976,scaleY:0.9976,rotation:-62.5108,x:-59.05,y:-12.35,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7751,y:48.95,x:-9.3,regY:-21.9}},{t:this.instance_14,p:{regX:-32.8,scaleX:0.9977,scaleY:0.9977,rotation:97.9414,x:47.9,y:-20.95,regY:13.6}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:66.7136,x:38.8,y:49.4,regX:-45.6}},{t:this.instance_12,p:{regY:13.7,scaleX:0.9974,scaleY:0.9974,rotation:43.5737,x:80.65,y:125.15}},{t:this.instance_11,p:{regX:-10.2,regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:78.8921,x:82.7,y:127.95}},{t:this.instance_10,p:{rotation:-9.2516,x:33.9,y:185.5,regX:3.4,scaleX:0.995,scaleY:0.995}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.4609,y:-59.1,x:-4.15}},{t:this.instance_8,p:{regX:1.3,scaleX:0.9952,scaleY:0.9952,rotation:10.0051,x:-41.45,regY:-51.5,y:185.45}},{t:this.instance_7,p:{regX:1.4,scaleX:0.9956,scaleY:0.9956,rotation:3.938,x:-29.95,y:89.75}},{t:this.instance_6,p:{scaleX:0.9947,scaleY:0.9947,rotation:-8.9732,x:23.85,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-6.3992,y:-80.75,x:1.35,regX:1.9,regY:51}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-94.5333,x:-92.85,y:51.35,regY:7.5}},{t:this.instance_2,p:{regY:-9,scaleX:0.9975,scaleY:0.9975,rotation:-112.0882,x:-93.6,y:137.9,regX:4.7}},{t:this.instance_1,p:{regY:-0.3,scaleX:0.9972,scaleY:0.9972,rotation:-118.5934,x:-93.75,y:137.9,regX:14.5}},{t:this.instance,p:{scaleX:0.9976,scaleY:0.9976,rotation:-64.2702,x:-59,y:-12.45,regX:33.9}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7751,y:48.95,x:-9.3,regY:-21.9}},{t:this.instance_14,p:{regX:-32.8,scaleX:0.9977,scaleY:0.9977,rotation:97.0213,x:47.9,y:-21,regY:13.6}},{t:this.instance_13,p:{regY:13.1,scaleX:0.9975,scaleY:0.9975,rotation:68.1092,x:39.85,y:49.5,regX:-45.7}},{t:this.instance_12,p:{regY:13.7,scaleX:0.9974,scaleY:0.9974,rotation:44.9702,x:79.9,y:126.2}},{t:this.instance_11,p:{regX:-10.2,regY:10.5,scaleX:0.9974,scaleY:0.9974,rotation:80.2869,x:81.95,y:129.1}},{t:this.instance_10,p:{rotation:-9.2516,x:33.9,y:185.5,regX:3.4,scaleX:0.995,scaleY:0.995}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.4554,y:-59.1,x:-4.15}},{t:this.instance_8,p:{regX:1.3,scaleX:0.9952,scaleY:0.9952,rotation:10.0051,x:-41.45,regY:-51.5,y:185.45}},{t:this.instance_7,p:{regX:1.4,scaleX:0.9956,scaleY:0.9956,rotation:3.9372,x:-29.95,y:89.75}},{t:this.instance_6,p:{scaleX:0.9947,scaleY:0.9947,rotation:-8.9732,x:23.85,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-6.0292,y:-80.8,x:1.4,regX:1.9,regY:51}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-96.1662,x:-90.95,y:52.35,regY:7.5}},{t:this.instance_2,p:{regY:-8.9,scaleX:0.9975,scaleY:0.9975,rotation:-113.721,x:-89.2,y:138.8,regX:4.7}},{t:this.instance_1,p:{regY:-0.3,scaleX:0.9972,scaleY:0.9972,rotation:-120.225,x:-89.4,y:138.9,regX:14.5}},{t:this.instance,p:{scaleX:0.9976,scaleY:0.9976,rotation:-66.0303,x:-59,y:-12.35,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7751,y:48.95,x:-9.3,regY:-21.9}},{t:this.instance_14,p:{regX:-32.9,scaleX:0.9977,scaleY:0.9977,rotation:96.0998,x:47.95,y:-21.1,regY:13.6}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:69.5053,x:41.05,y:49.55,regX:-45.7}},{t:this.instance_12,p:{regY:13.7,scaleX:0.9974,scaleY:0.9974,rotation:46.3662,x:79.1,y:127.3}},{t:this.instance_11,p:{regX:-10.2,regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:81.6838,x:81.05,y:130.25}},{t:this.instance_10,p:{rotation:-9.2516,x:33.9,y:185.5,regX:3.4,scaleX:0.995,scaleY:0.995}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.4509,y:-59.1,x:-4.15}},{t:this.instance_8,p:{regX:1.3,scaleX:0.9952,scaleY:0.9952,rotation:10.0051,x:-41.45,regY:-51.5,y:185.45}},{t:this.instance_7,p:{regX:1.4,scaleX:0.9956,scaleY:0.9956,rotation:3.9372,x:-29.95,y:89.75}},{t:this.instance_6,p:{scaleX:0.9947,scaleY:0.9947,rotation:-8.9732,x:23.85,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-5.6568,y:-80.75,x:1.4,regX:1.9,regY:51}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-97.7979,x:-88.95,y:53.3,regY:7.5}},{t:this.instance_2,p:{regY:-8.9,scaleX:0.9975,scaleY:0.9975,rotation:-115.3538,x:-84.6,y:139.65,regX:4.7}},{t:this.instance_1,p:{regY:-0.3,scaleX:0.9972,scaleY:0.9972,rotation:-121.8585,x:-84.9,y:139.75,regX:14.5}},{t:this.instance,p:{scaleX:0.9976,scaleY:0.9976,rotation:-67.7909,x:-59.05,y:-12.35,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7751,y:48.95,x:-9.3,regY:-21.9}},{t:this.instance_14,p:{regX:-32.8,scaleX:0.9977,scaleY:0.9977,rotation:95.1778,x:47.9,y:-20.95,regY:13.6}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:70.9007,x:42.2,y:49.7,regX:-45.7}},{t:this.instance_12,p:{regY:13.7,scaleX:0.9974,scaleY:0.9974,rotation:47.761,x:78.35,y:128.3}},{t:this.instance_11,p:{regX:-10.2,regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:83.0795,x:80.1,y:131.25}},{t:this.instance_10,p:{rotation:-9.2516,x:33.9,y:185.5,regX:3.4,scaleX:0.995,scaleY:0.995}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.4458,y:-59.1,x:-4.15}},{t:this.instance_8,p:{regX:1.3,scaleX:0.9952,scaleY:0.9952,rotation:10.0042,x:-41.45,regY:-51.5,y:185.45}},{t:this.instance_7,p:{regX:1.4,scaleX:0.9956,scaleY:0.9956,rotation:3.9372,x:-29.95,y:89.75}},{t:this.instance_6,p:{scaleX:0.9947,scaleY:0.9947,rotation:-8.9732,x:23.85,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-5.2864,y:-80.7,x:1.55,regX:2,regY:51}},{t:this.instance_3,p:{scaleX:0.9976,scaleY:0.9976,rotation:-99.4308,x:-86.85,y:54.2,regY:7.5}},{t:this.instance_2,p:{regY:-8.9,scaleX:0.9975,scaleY:0.9975,rotation:-116.986,x:-80.2,y:140.4,regX:4.7}},{t:this.instance_1,p:{regY:-0.3,scaleX:0.9972,scaleY:0.9972,rotation:-123.4909,x:-80.4,y:140.45,regX:14.5}},{t:this.instance,p:{scaleX:0.9976,scaleY:0.9976,rotation:-69.5499,x:-59.05,y:-12.45,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7751,y:48.95,x:-9.3,regY:-21.9}},{t:this.instance_14,p:{regX:-32.8,scaleX:0.9977,scaleY:0.9977,rotation:94.2572,x:47.9,y:-20.95,regY:13.6}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:72.2962,x:43.25,y:49.7,regX:-45.7}},{t:this.instance_12,p:{regY:13.7,scaleX:0.9974,scaleY:0.9974,rotation:49.1564,x:77.5,y:129.25}},{t:this.instance_11,p:{regX:-10.3,regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:84.4753,x:79.3,y:132.1}},{t:this.instance_10,p:{rotation:-9.2516,x:33.9,y:185.5,regX:3.4,scaleX:0.995,scaleY:0.995}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.4413,y:-59.1,x:-4.1}},{t:this.instance_8,p:{regX:1.3,scaleX:0.9952,scaleY:0.9952,rotation:10.0042,x:-41.45,regY:-51.5,y:185.45}},{t:this.instance_7,p:{regX:1.4,scaleX:0.9956,scaleY:0.9956,rotation:3.9372,x:-29.95,y:89.75}},{t:this.instance_6,p:{scaleX:0.9947,scaleY:0.9947,rotation:-8.9732,x:23.85,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-4.9145,y:-80.75,x:1.5,regX:1.9,regY:51}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-101.0635,x:-84.8,y:55,regY:7.5}},{t:this.instance_2,p:{regY:-8.9,scaleX:0.9975,scaleY:0.9975,rotation:-118.6198,x:-75.65,y:141,regX:4.7}},{t:this.instance_1,p:{regY:-0.3,scaleX:0.9972,scaleY:0.9972,rotation:-125.1256,x:-75.85,y:141.05,regX:14.5}},{t:this.instance,p:{scaleX:0.9976,scaleY:0.9976,rotation:-71.3109,x:-59.05,y:-12.4,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7751,y:48.95,x:-9.3,regY:-21.9}},{t:this.instance_14,p:{regX:-32.8,scaleX:0.9978,scaleY:0.9978,rotation:93.3351,x:47.9,y:-21,regY:13.6}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:73.6925,x:44.45,y:49.85,regX:-45.7}},{t:this.instance_12,p:{regY:13.7,scaleX:0.9974,scaleY:0.9974,rotation:50.5541,x:76.65,y:130.15}},{t:this.instance_11,p:{regX:-10.2,regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:85.8714,x:78.35,y:133.2}},{t:this.instance_10,p:{rotation:-9.2516,x:33.9,y:185.5,regX:3.4,scaleX:0.995,scaleY:0.995}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.4358,y:-59.1,x:-4.1}},{t:this.instance_8,p:{regX:1.3,scaleX:0.9952,scaleY:0.9952,rotation:10.0042,x:-41.45,regY:-51.5,y:185.45}},{t:this.instance_7,p:{regX:1.4,scaleX:0.9956,scaleY:0.9956,rotation:3.9372,x:-29.95,y:89.75}},{t:this.instance_6,p:{scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:23.85,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-4.5435,y:-80.65,x:1.65,regX:2,regY:51}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-102.6963,x:-82.7,y:55.75,regY:7.5}},{t:this.instance_2,p:{regY:-8.9,scaleX:0.9975,scaleY:0.9975,rotation:-120.2532,x:-71.1,y:141.45,regX:4.7}},{t:this.instance_1,p:{regY:-0.3,scaleX:0.9972,scaleY:0.9972,rotation:-126.7571,x:-71.4,y:141.6,regX:14.5}},{t:this.instance,p:{scaleX:0.9976,scaleY:0.9976,rotation:-73.0714,x:-59,y:-12.45,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7742,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{regX:-32.8,scaleX:0.9977,scaleY:0.9977,rotation:92.4139,x:48,y:-20.95,regY:13.5}},{t:this.instance_13,p:{regY:13.1,scaleX:0.9975,scaleY:0.9975,rotation:75.0883,x:45.4,y:49.9,regX:-45.7}},{t:this.instance_12,p:{regY:13.7,scaleX:0.9974,scaleY:0.9974,rotation:51.9502,x:75.8,y:130.9}},{t:this.instance_11,p:{regX:-10.2,regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:87.2668,x:77.45,y:134.1}},{t:this.instance_10,p:{rotation:-9.2516,x:33.9,y:185.5,regX:3.4,scaleX:0.995,scaleY:0.995}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.4314,y:-59.1,x:-4.1}},{t:this.instance_8,p:{regX:1.3,scaleX:0.9952,scaleY:0.9952,rotation:10.0042,x:-41.45,regY:-51.5,y:185.45}},{t:this.instance_7,p:{regX:1.4,scaleX:0.9956,scaleY:0.9956,rotation:3.9372,x:-29.95,y:89.75}},{t:this.instance_6,p:{scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:23.85,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-4.1728,y:-80.8,x:1.55,regX:1.9,regY:50.9}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9976,rotation:-104.3285,x:-80.55,y:56.5,regY:7.5}},{t:this.instance_2,p:{regY:-8.9,scaleX:0.9975,scaleY:0.9975,rotation:-121.8846,x:-66.6,y:141.75,regX:4.7}},{t:this.instance_1,p:{regY:-0.3,scaleX:0.9972,scaleY:0.9972,rotation:-128.3902,x:-66.85,y:141.95,regX:14.5}},{t:this.instance,p:{scaleX:0.9976,scaleY:0.9976,rotation:-74.83,x:-59.05,y:-12.4,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7742,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{regX:-32.8,scaleX:0.9978,scaleY:0.9978,rotation:91.4933,x:47.95,y:-20.95,regY:13.6}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:76.4844,x:46.65,y:50,regX:-45.6}},{t:this.instance_12,p:{regY:13.7,scaleX:0.9974,scaleY:0.9974,rotation:53.3443,x:75,y:131.7}},{t:this.instance_11,p:{regX:-10.2,regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:88.6632,x:76.55,y:134.9}},{t:this.instance_10,p:{rotation:-9.2516,x:33.9,y:185.5,regX:3.4,scaleX:0.995,scaleY:0.995}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.426,y:-59.1,x:-4.05}},{t:this.instance_8,p:{regX:1.3,scaleX:0.9952,scaleY:0.9952,rotation:10.0042,x:-41.45,regY:-51.5,y:185.45}},{t:this.instance_7,p:{regX:1.4,scaleX:0.9956,scaleY:0.9956,rotation:3.9363,x:-29.95,y:89.75}},{t:this.instance_6,p:{scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:23.85,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-3.8014,y:-80.65,x:1.6,regX:1.9,regY:51}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-105.9612,x:-78.45,y:57.15,regY:7.5}},{t:this.instance_2,p:{regY:-8.9,scaleX:0.9975,scaleY:0.9975,rotation:-123.5187,x:-62,y:142,regX:4.7}},{t:this.instance_1,p:{regY:-0.3,scaleX:0.9972,scaleY:0.9972,rotation:-130.0241,x:-62.25,y:142.15,regX:14.5}},{t:this.instance,p:{scaleX:0.9976,scaleY:0.9976,rotation:-76.5916,x:-59.05,y:-12.45,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7742,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{regX:-32.8,scaleX:0.9978,scaleY:0.9978,rotation:90.5713,x:48.05,y:-21,regY:13.5}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:77.8805,x:47.85,y:49.9,regX:-45.7}},{t:this.instance_12,p:{regY:13.7,scaleX:0.9974,scaleY:0.9974,rotation:54.74,x:74.05,y:132.4}},{t:this.instance_11,p:{regX:-10.2,regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:90.0535,x:75.65,y:135.65}},{t:this.instance_10,p:{rotation:-9.2516,x:33.9,y:185.5,regX:3.4,scaleX:0.995,scaleY:0.995}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.4216,y:-59.1,x:-4.05}},{t:this.instance_8,p:{regX:1.3,scaleX:0.9952,scaleY:0.9952,rotation:10.0033,x:-41.45,regY:-51.5,y:185.45}},{t:this.instance_7,p:{regX:1.4,scaleX:0.9956,scaleY:0.9956,rotation:3.9363,x:-29.95,y:89.75}},{t:this.instance_6,p:{scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:23.85,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-3.4294,y:-80.7,x:1.6,regX:1.9,regY:51}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-107.5943,x:-76.35,y:57.7,regY:7.5}},{t:this.instance_2,p:{regY:-8.8,scaleX:0.9975,scaleY:0.9975,rotation:-125.1514,x:-57.45,y:141.95,regX:4.7}},{t:this.instance_1,p:{regY:-0.3,scaleX:0.9972,scaleY:0.9972,rotation:-131.6572,x:-57.65,y:142.15,regX:14.5}},{t:this.instance,p:{scaleX:0.9976,scaleY:0.9976,rotation:-78.3511,x:-59.05,y:-12.4,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7742,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{regX:-32.8,scaleX:0.9978,scaleY:0.9978,rotation:89.6539,x:47.95,y:-20.9,regY:13.6}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:79.2762,x:48.95,y:49.8,regX:-45.8}},{t:this.instance_12,p:{regY:13.7,scaleX:0.9974,scaleY:0.9974,rotation:56.1368,x:73.15,y:132.9}},{t:this.instance_11,p:{regX:-10.2,regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:91.45,x:74.65,y:136.3}},{t:this.instance_10,p:{rotation:-9.2516,x:33.9,y:185.5,regX:3.4,scaleX:0.995,scaleY:0.995}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.4163,y:-59.1,x:-4.05}},{t:this.instance_8,p:{regX:1.3,scaleX:0.9952,scaleY:0.9952,rotation:10.0033,x:-41.45,regY:-51.5,y:185.45}},{t:this.instance_7,p:{regX:1.4,scaleX:0.9956,scaleY:0.9956,rotation:3.9363,x:-29.95,y:89.75}},{t:this.instance_6,p:{scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:23.85,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-3.0583,y:-80.6,x:1.6,regX:1.9,regY:51}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-109.2268,x:-74.15,y:58.25,regY:7.5}},{t:this.instance_2,p:{regY:-8.9,scaleX:0.9975,scaleY:0.9975,rotation:-126.7856,x:-52.85,y:141.95,regX:4.7}},{t:this.instance_1,p:{regY:-0.3,scaleX:0.9972,scaleY:0.9972,rotation:-133.2905,x:-53.15,y:142.15,regX:14.5}},{t:this.instance,p:{scaleX:0.9976,scaleY:0.9976,rotation:-80.1105,x:-59,y:-12.45,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7742,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{regX:-32.8,scaleX:0.9978,scaleY:0.9978,rotation:88.7328,x:48.05,y:-21,regY:13.5}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:80.672,x:50.1,y:49.8,regX:-45.7}},{t:this.instance_12,p:{regY:13.7,scaleX:0.9974,scaleY:0.9974,rotation:57.5319,x:72.3,y:133.45}},{t:this.instance_11,p:{regX:-10.2,regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:92.8456,x:73.65,y:136.8}},{t:this.instance_10,p:{rotation:-9.2516,x:33.9,y:185.5,regX:3.4,scaleX:0.995,scaleY:0.995}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.4116,y:-59.1,x:-4.05}},{t:this.instance_8,p:{regX:1.3,scaleX:0.9952,scaleY:0.9952,rotation:10.0033,x:-41.45,regY:-51.5,y:185.45}},{t:this.instance_7,p:{regX:1.4,scaleX:0.9956,scaleY:0.9956,rotation:3.9363,x:-29.95,y:89.75}},{t:this.instance_6,p:{scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:23.85,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-2.6873,y:-80.65,x:1.65,regX:1.9,regY:51}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-110.8597,x:-71.95,y:58.6,regY:7.5}},{t:this.instance_2,p:{regY:-8.9,scaleX:0.9975,scaleY:0.9975,rotation:-128.4174,x:-48.3,y:141.75,regX:4.7}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9972,scaleY:0.9972,rotation:-134.9225,x:-48.5,y:141.85,regX:14.5}},{t:this.instance,p:{scaleX:0.9976,scaleY:0.9976,rotation:-81.8709,x:-59,y:-12.45,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7742,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{regX:-32.8,scaleX:0.9978,scaleY:0.9978,rotation:87.8115,x:47.95,y:-21.05,regY:13.6}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:82.0681,x:51.25,y:49.85,regX:-45.7}},{t:this.instance_12,p:{regY:13.7,scaleX:0.9974,scaleY:0.9974,rotation:58.927,x:71.45,y:133.9}},{t:this.instance_11,p:{regX:-10.3,regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:94.242,x:72.65,y:137.2}},{t:this.instance_10,p:{rotation:-9.2516,x:33.85,y:185.5,regX:3.4,scaleX:0.995,scaleY:0.995}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.4063,y:-59.1,x:-4.05}},{t:this.instance_8,p:{regX:1.3,scaleX:0.9952,scaleY:0.9952,rotation:10.0033,x:-41.45,regY:-51.5,y:185.45}},{t:this.instance_7,p:{regX:1.4,scaleX:0.9956,scaleY:0.9956,rotation:3.9363,x:-29.95,y:89.75}},{t:this.instance_6,p:{scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:23.85,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-2.3164,y:-80.8,x:1.65,regX:1.9,regY:50.9}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-112.4928,x:-69.75,y:59,regY:7.5}},{t:this.instance_2,p:{regY:-8.9,scaleX:0.9975,scaleY:0.9975,rotation:-130.0508,x:-43.75,y:141.4,regX:4.7}},{t:this.instance_1,p:{regY:-0.3,scaleX:0.9972,scaleY:0.9972,rotation:-136.5569,x:-44,y:141.6,regX:14.5}},{t:this.instance,p:{scaleX:0.9976,scaleY:0.9976,rotation:-83.6308,x:-59,y:-12.4,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7742,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{regX:-32.8,scaleX:0.9978,scaleY:0.9978,rotation:86.8896,x:47.85,y:-21,regY:13.6}},{t:this.instance_13,p:{regY:13.1,scaleX:0.9975,scaleY:0.9975,rotation:83.4641,x:52.2,y:49.8,regX:-45.7}},{t:this.instance_12,p:{regY:13.7,scaleX:0.9974,scaleY:0.9974,rotation:60.324,x:70.45,y:134.3}},{t:this.instance_11,p:{regX:-10.2,regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:95.6375,x:71.7,y:137.8}},{t:this.instance_10,p:{rotation:-9.2516,x:33.85,y:185.45,regX:3.4,scaleX:0.995,scaleY:0.995}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.4027,y:-59.1,x:-4.05}},{t:this.instance_8,p:{regX:1.3,scaleX:0.9952,scaleY:0.9952,rotation:10.0033,x:-41.4,regY:-51.5,y:185.45}},{t:this.instance_7,p:{regX:1.4,scaleX:0.9956,scaleY:0.9956,rotation:3.9354,x:-30,y:89.75}},{t:this.instance_6,p:{scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:23.8,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-1.9457,y:-80.55,x:1.8,regX:2,regY:51}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-114.1248,x:-67.55,y:59.25,regY:7.5}},{t:this.instance_2,p:{regY:-9,scaleX:0.9975,scaleY:0.9975,rotation:-131.6825,x:-39.3,y:140.95,regX:4.7}},{t:this.instance_1,p:{regY:-0.3,scaleX:0.9972,scaleY:0.9972,rotation:-138.1895,x:-39.5,y:141.1,regX:14.5}},{t:this.instance,p:{scaleX:0.9976,scaleY:0.9976,rotation:-85.3916,x:-58.9,y:-12.5,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7699,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{regX:-32.8,scaleX:0.9978,scaleY:0.9978,rotation:87.744,x:47.9,y:-20.95,regY:13.6}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:82.139,x:51.25,y:49.8,regX:-45.7}},{t:this.instance_12,p:{regY:13.6,scaleX:0.9974,scaleY:0.9974,rotation:59.0146,x:71.4,y:133.9}},{t:this.instance_11,p:{regX:-10.2,regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:94.3422,x:72.65,y:137.35}},{t:this.instance_10,p:{rotation:-9.2462,x:33.9,y:185.45,regX:3.4,scaleX:0.995,scaleY:0.995}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.4056,y:-59.1,x:-4.05}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9952,scaleY:0.9952,rotation:10.022,x:-41.5,regY:-51.4,y:185.55}},{t:this.instance_7,p:{regX:1.4,scaleX:0.9956,scaleY:0.9956,rotation:3.9399,x:-30,y:89.8}},{t:this.instance_6,p:{scaleX:0.9947,scaleY:0.9947,rotation:-8.9846,x:23.9,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-2.2735,y:-80.8,x:1.6,regX:1.9,regY:50.9}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-112.5906,x:-69.65,y:58.95,regY:7.5}},{t:this.instance_2,p:{regY:-9,scaleX:0.9975,scaleY:0.9975,rotation:-130.162,x:-43.55,y:141.45,regX:4.7}},{t:this.instance_1,p:{regY:-0.3,scaleX:0.9972,scaleY:0.9972,rotation:-136.6536,x:-43.75,y:141.6,regX:14.5}},{t:this.instance,p:{scaleX:0.9976,scaleY:0.9976,rotation:-83.7479,x:-59,y:-12.4,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7664,y:49.05,x:-9.4,regY:-21.8}},{t:this.instance_14,p:{regX:-32.8,scaleX:0.9978,scaleY:0.9978,rotation:88.5979,x:47.9,y:-20.95,regY:13.6}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:80.814,x:50.25,y:49.8,regX:-45.7}},{t:this.instance_12,p:{regY:13.6,scaleX:0.9974,scaleY:0.9974,rotation:57.7041,x:72.4,y:133.5}},{t:this.instance_11,p:{regX:-10.2,regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:93.0466,x:73.6,y:136.9}},{t:this.instance_10,p:{rotation:-9.24,x:33.9,y:185.4,regX:3.4,scaleX:0.995,scaleY:0.995}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.4092,y:-59.1,x:-4.05}},{t:this.instance_8,p:{regX:1.3,scaleX:0.9952,scaleY:0.9952,rotation:10.0435,x:-41.55,regY:-51.4,y:185.6}},{t:this.instance_7,p:{regX:1.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9452,x:-29.9,y:89.8}},{t:this.instance_6,p:{scaleX:0.9948,scaleY:0.9948,rotation:-8.9962,x:23.9,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-2.6022,y:-80.65,x:1.55,regX:1.9,regY:51}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-111.0552,x:-71.65,y:58.7,regY:7.5}},{t:this.instance_2,p:{regY:-9,scaleX:0.9975,scaleY:0.9975,rotation:-128.6408,x:-47.85,y:141.8,regX:4.7}},{t:this.instance_1,p:{regY:-0.3,scaleX:0.9972,scaleY:0.9972,rotation:-135.119,x:-48,y:141.9,regX:14.5}},{t:this.instance,p:{scaleX:0.9976,scaleY:0.9976,rotation:-82.1038,x:-58.95,y:-12.4,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7629,y:49.05,x:-9.3,regY:-21.8}},{t:this.instance_14,p:{regX:-32.8,scaleX:0.9978,scaleY:0.9978,rotation:89.4515,x:48,y:-20.9,regY:13.5}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:79.492,x:49.25,y:49.9,regX:-45.7}},{t:this.instance_12,p:{regY:13.7,scaleX:0.9974,scaleY:0.9974,rotation:56.3957,x:73.15,y:133}},{t:this.instance_11,p:{regX:-10.2,regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:91.7499,x:74.55,y:136.4}},{t:this.instance_10,p:{rotation:-9.2347,x:33.95,y:185.45,regX:3.4,scaleX:0.995,scaleY:0.995}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.4126,y:-59.1,x:-4.05}},{t:this.instance_8,p:{regX:1.3,scaleX:0.9952,scaleY:0.9952,rotation:10.0631,x:-41.45,regY:-51.4,y:185.6}},{t:this.instance_7,p:{regX:1.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9494,x:-29.9,y:89.8}},{t:this.instance_6,p:{scaleX:0.9948,scaleY:0.9948,rotation:-9.0094,x:23.9,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-2.9311,y:-80.65,x:1.55,regX:1.9,regY:51}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-109.5201,x:-73.7,y:58.3,regY:7.5}},{t:this.instance_2,p:{regY:-8.9,scaleX:0.9975,scaleY:0.9975,rotation:-127.1186,x:-52.05,y:141.9,regX:4.7}},{t:this.instance_1,p:{regY:-0.3,scaleX:0.9972,scaleY:0.9972,rotation:-133.5845,x:-52.2,y:142.1,regX:14.5}},{t:this.instance,p:{scaleX:0.9976,scaleY:0.9976,rotation:-80.4599,x:-58.95,y:-12.4,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7585,y:49.1,x:-9.3,regY:-21.8}},{t:this.instance_14,p:{regX:-32.8,scaleX:0.9978,scaleY:0.9978,rotation:90.3014,x:47.85,y:-20.95,regY:13.6}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:78.1661,x:48.15,y:49.9,regX:-45.7}},{t:this.instance_12,p:{regY:13.7,scaleX:0.9974,scaleY:0.9974,rotation:55.0863,x:74.05,y:132.45}},{t:this.instance_11,p:{regX:-10.2,regY:10.5,scaleX:0.9974,scaleY:0.9974,rotation:90.4541,x:75.65,y:135.75}},{t:this.instance_10,p:{rotation:-9.2284,x:34.1,y:185.45,regX:3.5,scaleX:0.995,scaleY:0.995}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.4171,y:-59.1,x:-4.05}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9952,scaleY:0.9952,rotation:10.0854,x:-41.55,regY:-51.4,y:185.55}},{t:this.instance_7,p:{regX:1.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9549,x:-29.9,y:89.8}},{t:this.instance_6,p:{scaleX:0.9947,scaleY:0.9947,rotation:-9.0239,x:23.9,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-3.26,y:-80.7,x:1.55,regX:1.9,regY:51}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9976,rotation:-107.9843,x:-75.75,y:57.8,regY:7.5}},{t:this.instance_2,p:{regY:-8.9,scaleX:0.9975,scaleY:0.9975,rotation:-125.597,x:-56.3,y:142.05,regX:4.7}},{t:this.instance_1,p:{regY:-0.3,scaleX:0.9972,scaleY:0.9972,rotation:-132.0483,x:-56.6,y:142.2,regX:14.5}},{t:this.instance,p:{scaleX:0.9976,scaleY:0.9976,rotation:-78.8154,x:-58.95,y:-12.6,regX:33.9}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.755,y:49.1,x:-9.3,regY:-21.8}},{t:this.instance_14,p:{regX:-32.8,scaleX:0.9978,scaleY:0.9978,rotation:91.155,x:47.9,y:-20.9,regY:13.6}},{t:this.instance_13,p:{regY:13.1,scaleX:0.9975,scaleY:0.9975,rotation:76.8419,x:47.05,y:49.9,regX:-45.7}},{t:this.instance_12,p:{regY:13.7,scaleX:0.9974,scaleY:0.9974,rotation:53.7754,x:74.85,y:131.8}},{t:this.instance_11,p:{regX:-10.2,regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:89.1637,x:76.45,y:135.1}},{t:this.instance_10,p:{rotation:-9.224,x:34.1,y:185.45,regX:3.5,scaleX:0.995,scaleY:0.995}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.4205,y:-59.1,x:-4.05}},{t:this.instance_8,p:{regX:1.3,scaleX:0.9952,scaleY:0.9952,rotation:10.1066,x:-41.45,regY:-51.4,y:185.55}},{t:this.instance_7,p:{regX:1.4,scaleX:0.9956,scaleY:0.9956,rotation:3.9592,x:-29.95,y:89.8}},{t:this.instance_6,p:{scaleX:0.9948,scaleY:0.9948,rotation:-9.0354,x:23.9,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-3.5881,y:-80.7,x:1.55,regX:1.9,regY:51}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-106.4493,x:-77.7,y:57.4,regY:7.5}},{t:this.instance_2,p:{regY:-8.9,scaleX:0.9975,scaleY:0.9975,rotation:-124.0751,x:-60.6,y:142,regX:4.7}},{t:this.instance_1,p:{regY:-0.3,scaleX:0.9972,scaleY:0.9972,rotation:-130.5131,x:-60.85,y:142.15,regX:14.5}},{t:this.instance,p:{scaleX:0.9976,scaleY:0.9976,rotation:-77.1718,x:-59,y:-12.5,regX:33.9}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7515,y:49.1,x:-9.3,regY:-21.8}},{t:this.instance_14,p:{regX:-32.8,scaleX:0.9977,scaleY:0.9977,rotation:92.0088,x:47.95,y:-21,regY:13.6}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:75.518,x:46.1,y:49.85,regX:-45.7}},{t:this.instance_12,p:{regY:13.7,scaleX:0.9974,scaleY:0.9974,rotation:52.4662,x:75.65,y:131.15}},{t:this.instance_11,p:{regX:-10.2,regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:87.8669,x:77.3,y:134.35}},{t:this.instance_10,p:{rotation:-9.2179,x:34.15,y:185.5,regX:3.5,scaleX:0.995,scaleY:0.995}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.4242,y:-59.1,x:-4.1}},{t:this.instance_8,p:{regX:1.3,scaleX:0.9952,scaleY:0.9952,rotation:10.1257,x:-41.5,regY:-51.4,y:185.6}},{t:this.instance_7,p:{regX:1.4,scaleX:0.9956,scaleY:0.9956,rotation:3.9645,x:-30,y:89.8}},{t:this.instance_6,p:{scaleX:0.9948,scaleY:0.9948,rotation:-9.0487,x:23.9,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-3.9173,y:-80.65,x:1.55,regX:1.9,regY:51}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-104.9146,x:-79.6,y:56.75,regY:7.6}},{t:this.instance_2,p:{regY:-9,scaleX:0.9975,scaleY:0.9975,rotation:-122.5538,x:-64.9,y:141.95,regX:4.7}},{t:this.instance_1,p:{regY:-0.3,scaleX:0.9972,scaleY:0.9972,rotation:-128.9784,x:-65.1,y:142.05,regX:14.5}},{t:this.instance,p:{scaleX:0.9976,scaleY:0.9976,rotation:-75.5272,x:-59,y:-12.45,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.748,y:49.1,x:-9.3,regY:-21.8}},{t:this.instance_14,p:{regX:-32.9,scaleX:0.9978,scaleY:0.9978,rotation:92.8621,x:47.9,y:-21.1,regY:13.6}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:74.1932,x:45,y:50,regX:-45.6}},{t:this.instance_12,p:{regY:13.7,scaleX:0.9974,scaleY:0.9974,rotation:51.1566,x:76.55,y:130.35}},{t:this.instance_11,p:{regX:-10.2,regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:86.5715,x:78.25,y:133.6}},{t:this.instance_10,p:{rotation:-9.2126,x:34.05,y:185.5,regX:3.4,scaleX:0.995,scaleY:0.995}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.4279,y:-59.1,x:-4.1}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9952,scaleY:0.9952,rotation:10.1453,x:-41.55,regY:-51.4,y:185.55}},{t:this.instance_7,p:{regX:1.4,scaleX:0.9956,scaleY:0.9956,rotation:3.9698,x:-30,y:89.8}},{t:this.instance_6,p:{scaleX:0.9947,scaleY:0.9947,rotation:-9.0631,x:23.9,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-4.2457,y:-80.7,x:1.45,regX:1.9,regY:51}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9976,rotation:-103.3788,x:-81.7,y:56.05,regY:7.5}},{t:this.instance_2,p:{regY:-9,scaleX:0.9975,scaleY:0.9975,rotation:-121.0329,x:-69.15,y:141.8,regX:4.6}},{t:this.instance_1,p:{regY:-0.3,scaleX:0.9972,scaleY:0.9972,rotation:-127.4438,x:-69.35,y:141.8,regX:14.5}},{t:this.instance,p:{scaleX:0.9976,scaleY:0.9976,rotation:-73.885,x:-58.95,y:-12.5,regX:33.9}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7436,y:49.1,x:-9.3,regY:-21.8}},{t:this.instance_14,p:{regX:-32.8,scaleX:0.9978,scaleY:0.9978,rotation:93.7161,x:47.9,y:-20.95,regY:13.6}},{t:this.instance_13,p:{regY:13.1,scaleX:0.9975,scaleY:0.9975,rotation:72.8698,x:43.85,y:49.8,regX:-45.7}},{t:this.instance_12,p:{regY:13.7,scaleX:0.9974,scaleY:0.9974,rotation:49.8477,x:77.4,y:129.65}},{t:this.instance_11,p:{regX:-10.3,regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:85.2753,x:79.05,y:132.6}},{t:this.instance_10,p:{rotation:-9.2063,x:34.1,y:185.5,regX:3.4,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.4314,y:-59.1,x:-4.1}},{t:this.instance_8,p:{regX:1.3,scaleX:0.9952,scaleY:0.9952,rotation:10.1677,x:-41.5,regY:-51.5,y:185.5}},{t:this.instance_7,p:{regX:1.4,scaleX:0.9956,scaleY:0.9956,rotation:3.9741,x:-30,y:89.8}},{t:this.instance_6,p:{scaleX:0.9948,scaleY:0.9948,rotation:-9.0752,x:23.85,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-4.5742,y:-80.65,x:1.45,regX:1.9,regY:51}},{t:this.instance_3,p:{scaleX:0.9976,scaleY:0.9976,rotation:-101.844,x:-83.75,y:55.45,regY:7.5}},{t:this.instance_2,p:{regY:-8.9,scaleX:0.9975,scaleY:0.9975,rotation:-119.5116,x:-73.4,y:141.2,regX:4.7}},{t:this.instance_1,p:{regY:-0.4,scaleX:0.9972,scaleY:0.9972,rotation:-125.9088,x:-73.6,y:141.55,regX:14.4}},{t:this.instance,p:{scaleX:0.9976,scaleY:0.9976,rotation:-72.241,x:-59.05,y:-12.4,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7401,y:49.1,x:-9.3,regY:-21.8}},{t:this.instance_14,p:{regX:-32.8,scaleX:0.9977,scaleY:0.9977,rotation:94.5693,x:47.9,y:-20.95,regY:13.6}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:71.544,x:42.9,y:49.75,regX:-45.7}},{t:this.instance_12,p:{regY:13.7,scaleX:0.9974,scaleY:0.9974,rotation:48.5364,x:78.1,y:128.8}},{t:this.instance_11,p:{regX:-10.2,regY:10.5,scaleX:0.9974,scaleY:0.9974,rotation:83.9801,x:80.1,y:131.8}},{t:this.instance_10,p:{rotation:-9.2001,x:34.1,y:185.5,regX:3.4,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.435,y:-59.1,x:-4.1}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9952,scaleY:0.9952,rotation:10.1874,x:-41.55,regY:-51.5,y:185.45}},{t:this.instance_7,p:{regX:1.4,scaleX:0.9956,scaleY:0.9956,rotation:3.9794,x:-30,y:89.8}},{t:this.instance_6,p:{scaleX:0.9948,scaleY:0.9948,rotation:-9.0878,x:23.9,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-4.9029,y:-80.75,x:1.45,regX:1.9,regY:51}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-100.309,x:-85.6,y:54.75,regY:7.5}},{t:this.instance_2,p:{regY:-8.9,scaleX:0.9975,scaleY:0.9975,rotation:-117.9884,x:-77.65,y:140.75,regX:4.7}},{t:this.instance_1,p:{regY:-0.3,scaleX:0.9972,scaleY:0.9972,rotation:-124.3734,x:-77.9,y:140.85,regX:14.5}},{t:this.instance,p:{scaleX:0.9976,scaleY:0.9976,rotation:-70.597,x:-59,y:-12.35,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7366,y:49.1,x:-9.3,regY:-21.8}},{t:this.instance_14,p:{regX:-32.9,scaleX:0.9977,scaleY:0.9977,rotation:95.4242,x:47.95,y:-21.1,regY:13.6}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:70.2201,x:41.8,y:49.65,regX:-45.7}},{t:this.instance_12,p:{regY:13.7,scaleX:0.9974,scaleY:0.9974,rotation:47.2269,x:78.95,y:127.9}},{t:this.instance_11,p:{regX:-10.2,regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:82.6837,x:80.8,y:130.85}},{t:this.instance_10,p:{rotation:-9.1948,x:34.1,y:185.5,regX:3.4,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.4394,y:-59.1,x:-4.1}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9952,scaleY:0.9952,rotation:10.2079,x:-41.55,regY:-51.5,y:185.4}},{t:this.instance_7,p:{regX:1.4,scaleX:0.9956,scaleY:0.9956,rotation:3.9838,x:-30,y:89.8}},{t:this.instance_6,p:{scaleX:0.9948,scaleY:0.9948,rotation:-9.1004,x:23.9,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-5.2319,y:-80.7,x:1.55,regX:2,regY:51}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-98.7731,x:-87.6,y:53.9,regY:7.5}},{t:this.instance_2,p:{regY:-8.9,scaleX:0.9975,scaleY:0.9975,rotation:-116.4678,x:-81.9,y:140.15,regX:4.7}},{t:this.instance_1,p:{regY:-0.3,scaleX:0.9972,scaleY:0.9972,rotation:-122.8382,x:-82.15,y:140.25,regX:14.5}},{t:this.instance,p:{scaleX:0.9976,scaleY:0.9976,rotation:-68.9522,x:-59.1,y:-12.35,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7331,y:49.1,x:-9.25,regY:-21.8}},{t:this.instance_14,p:{regX:-32.9,scaleX:0.9977,scaleY:0.9977,rotation:96.2787,x:47.9,y:-21.1,regY:13.6}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:68.8967,x:40.8,y:49.45,regX:-45.8}},{t:this.instance_12,p:{regY:13.7,scaleX:0.9974,scaleY:0.9974,rotation:45.9174,x:79.75,y:126.9}},{t:this.instance_11,p:{regX:-10.2,regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:81.3887,x:81.65,y:129.85}},{t:this.instance_10,p:{rotation:-9.1886,x:34.15,y:185.5,regX:3.4,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.4437,y:-59.1,x:-4.1}},{t:this.instance_8,p:{regX:1.3,scaleX:0.9952,scaleY:0.9952,rotation:10.2293,x:-41.5,regY:-51.5,y:185.5}},{t:this.instance_7,p:{regX:1.4,scaleX:0.9956,scaleY:0.9956,rotation:3.9891,x:-30,y:89.8}},{t:this.instance_6,p:{scaleX:0.9948,scaleY:0.9948,rotation:-9.1145,x:23.95,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-5.5601,y:-80.75,x:1.55,regX:2,regY:51}},{t:this.instance_3,p:{scaleX:0.9976,scaleY:0.9976,rotation:-97.2374,x:-89.45,y:53.05,regY:7.5}},{t:this.instance_2,p:{regY:-8.9,scaleX:0.9975,scaleY:0.9975,rotation:-114.9464,x:-86.1,y:139.45,regX:4.7}},{t:this.instance_1,p:{regY:-0.3,scaleX:0.9972,scaleY:0.9972,rotation:-121.303,x:-86.3,y:139.5,regX:14.5}},{t:this.instance,p:{scaleX:0.9976,scaleY:0.9976,rotation:-67.3089,x:-59,y:-12.35,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7296,y:49.1,x:-9.25,regY:-21.8}},{t:this.instance_14,p:{regX:-32.8,scaleX:0.9977,scaleY:0.9977,rotation:97.1319,x:47.9,y:-20.95,regY:13.6}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:67.5726,x:39.7,y:49.45,regX:-45.7}},{t:this.instance_12,p:{regY:13.7,scaleX:0.9974,scaleY:0.9974,rotation:44.6083,x:80.5,y:125.85}},{t:this.instance_11,p:{regX:-10.2,regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:80.0921,x:82.5,y:128.75}},{t:this.instance_10,p:{rotation:-9.1832,x:34.15,y:185.5,regX:3.4,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.4465,y:-59.1,x:-4.15}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9952,scaleY:0.9952,rotation:10.2496,x:-41.65,regY:-51.5,y:185.45}},{t:this.instance_7,p:{regX:1.4,scaleX:0.9956,scaleY:0.9956,rotation:3.9936,x:-30,y:89.8}},{t:this.instance_6,p:{scaleX:0.9948,scaleY:0.9948,rotation:-9.1278,x:23.95,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-5.8883,y:-80.75,x:1.4,regX:1.9,regY:51}},{t:this.instance_3,p:{scaleX:0.9976,scaleY:0.9976,rotation:-95.7035,x:-91.2,y:52.2,regY:7.6}},{t:this.instance_2,p:{regY:-8.9,scaleX:0.9975,scaleY:0.9975,rotation:-113.4251,x:-90.25,y:138.65,regX:4.7}},{t:this.instance_1,p:{regY:-0.3,scaleX:0.9972,scaleY:0.9972,rotation:-119.7697,x:-90.55,y:138.65,regX:14.5}},{t:this.instance,p:{scaleX:0.9976,scaleY:0.9976,rotation:-65.6659,x:-59.1,y:-12.35,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7261,y:49.1,x:-9.25,regY:-21.8}},{t:this.instance_14,p:{regX:-32.8,scaleX:0.9977,scaleY:0.9977,rotation:97.9857,x:47.85,y:-21,regY:13.6}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:66.2473,x:38.75,y:49.3,regX:-45.7}},{t:this.instance_12,p:{regY:13.7,scaleX:0.9974,scaleY:0.9974,rotation:43.2996,x:81.2,y:124.85}},{t:this.instance_11,p:{regX:-10.2,regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:78.7954,x:83.2,y:127.6}},{t:this.instance_10,p:{rotation:-9.177,x:34.15,y:185.5,regX:3.4,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.4503,y:-59.1,x:-4.15}},{t:this.instance_8,p:{regX:1.3,scaleX:0.9952,scaleY:0.9952,rotation:10.271,x:-41.5,regY:-51.5,y:185.45}},{t:this.instance_7,p:{regX:1.4,scaleX:0.9956,scaleY:0.9956,rotation:3.9987,x:-30.05,y:89.8}},{t:this.instance_6,p:{scaleX:0.9948,scaleY:0.9948,rotation:-9.1395,x:23.9,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-6.2177,y:-80.75,x:1.4,regX:1.9,regY:51}},{t:this.instance_3,p:{scaleX:0.9976,scaleY:0.9976,rotation:-94.1684,x:-93.2,y:51.25,regY:7.5}},{t:this.instance_2,p:{regY:-9,scaleX:0.9975,scaleY:0.9975,rotation:-111.903,x:-94.5,y:137.7,regX:4.7}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9972,scaleY:0.9972,rotation:-118.234,x:-94.55,y:137.7,regX:14.5}},{t:this.instance,p:{scaleX:0.9976,scaleY:0.9976,rotation:-64.0213,x:-59.05,y:-12.4,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7226,y:49.1,x:-9.25,regY:-21.8}},{t:this.instance_14,p:{regX:-32.9,scaleX:0.9977,scaleY:0.9977,rotation:98.8397,x:47.95,y:-21.05,regY:13.6}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:64.923,x:37.7,y:49.15,regX:-45.7}},{t:this.instance_12,p:{regY:13.6,scaleX:0.9974,scaleY:0.9974,rotation:41.9888,x:82,y:123.6}},{t:this.instance_11,p:{regX:-10.2,regY:10.5,scaleX:0.9974,scaleY:0.9974,rotation:77.5004,x:84.1,y:126.35}},{t:this.instance_10,p:{rotation:-9.1717,x:34.35,y:185.5,regX:3.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.4539,y:-59.1,x:-4.15}},{t:this.instance_8,p:{regX:1.3,scaleX:0.9952,scaleY:0.9952,rotation:10.2906,x:-41.55,regY:-51.5,y:185.5}},{t:this.instance_7,p:{regX:1.4,scaleX:0.9956,scaleY:0.9956,rotation:4.005,x:-30,y:89.8}},{t:this.instance_6,p:{scaleX:0.9948,scaleY:0.9948,rotation:-9.1528,x:23.95,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-6.5465,y:-80.8,x:1.4,regX:1.9,regY:51}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-92.6328,x:-95,y:50.2,regY:7.5}},{t:this.instance_2,p:{regY:-8.8,scaleX:0.9975,scaleY:0.9975,rotation:-110.3809,x:-98.45,y:136.55,regX:4.7}},{t:this.instance_1,p:{regY:-0.3,scaleX:0.9972,scaleY:0.9972,rotation:-116.6991,x:-98.75,y:136.7,regX:14.4}},{t:this.instance,p:{scaleX:0.9976,scaleY:0.9976,rotation:-62.3779,x:-59,y:-12.5,regX:33.9}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7182,y:49.1,x:-9.25,regY:-21.8}},{t:this.instance_14,p:{regX:-32.8,scaleX:0.9977,scaleY:0.9977,rotation:99.6937,x:47.9,y:-20.95,regY:13.6}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:63.5992,x:36.75,y:48.95,regX:-45.7}},{t:this.instance_12,p:{regY:13.6,scaleX:0.9974,scaleY:0.9974,rotation:40.679,x:82.65,y:122.4}},{t:this.instance_11,p:{regX:-10.3,regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:76.2051,x:84.7,y:125}},{t:this.instance_10,p:{rotation:-9.1672,x:34.3,y:185.5,regX:3.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.4573,y:-59.15,x:-4.15}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9952,scaleY:0.9952,rotation:10.3111,x:-41.7,regY:-51.5,y:185.5}},{t:this.instance_7,p:{regX:1.5,scaleX:0.9956,scaleY:0.9956,rotation:4.0085,x:-29.9,y:89.8}},{t:this.instance_6,p:{scaleX:0.9948,scaleY:0.9948,rotation:-9.1663,x:23.95,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-6.8746,y:-80.8,x:1.5,regX:2,regY:51}},{t:this.instance_3,p:{scaleX:0.9976,scaleY:0.9976,rotation:-91.0982,x:-96.75,y:49.1,regY:7.5}},{t:this.instance_2,p:{regY:-8.9,scaleX:0.9975,scaleY:0.9975,rotation:-108.8609,x:-102.6,y:135.4,regX:4.7}},{t:this.instance_1,p:{regY:-0.3,scaleX:0.9972,scaleY:0.9972,rotation:-115.164,x:-102.85,y:135.45,regX:14.5}},{t:this.instance,p:{scaleX:0.9976,scaleY:0.9976,rotation:-60.7356,x:-58.9,y:-12.55,regX:33.9}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-117.6,-206.5,228,503.6);


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
	this.instance = new lib.CharacterCivilian_09();
	this.instance.setTransform(25.05,-1.5,0.2594,0.2594,0,0,180,-4.5,40.1);

	this.instance_1 = new lib.CharacterCivilian_07();
	this.instance_1.setTransform(-20.9,-0.95,0.2594,0.2594,0,0,180,-4.5,42.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-56.4,-65.4,112.8,130.7);


// stage content:
(lib.LessonChapter3_07 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,308];
	this.streamSoundSymbolsList[0] = [{id:"AfterWar207wav",startFrame:0,endFrame:309,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("AfterWar207wav",0);
		this.InsertIntoSoundStreamData(soundInstance,0,309,1);
	}
	this.frame_308 = function() {
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
			document.location.replace("https://ninzato.github.io/history-of-badr-war/LessonChapter3_08.html");
			}, 500);
			
		}
		
		this.prevBtn.addEventListener("click", fl_ClickToGoToWebPage_2);
		
		function fl_ClickToGoToWebPage_2() {
			createjs.Sound.play("popsound");
			
			setTimeout(function(){
			document.location.replace("https://ninzato.github.io/history-of-badr-war/LessonChapter3_06.html");
			}, 500);
			
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(308).call(this.frame_308).wait(1));

	// Subtitle
	this.instance = new lib.CachedBmp_67();
	this.instance.setTransform(182.8,582.4,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_66();
	this.instance_1.setTransform(165.6,564.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(309));

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.homeBtn},{t:this.prevBtn},{t:this.nextBtn}]}).wait(309));

	// Rasulullah
	this.instance_2 = new lib.Rasulullah_icon_button();
	this.instance_2.setTransform(639.1,453.15,0.4624,0.4624);
	new cjs.ButtonHelper(this.instance_2, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(309));

	// Layer_6
	this.instance_3 = new lib.warSpoils();
	this.instance_3.setTransform(639.95,359.9,0.7011,0.6844);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(309));

	// Layer_5
	this.instance_4 = new lib.ransom();
	this.instance_4.setTransform(637.1,371.35,0.3218,0.3218);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(65).to({_off:false},0).wait(1).to({regX:0.5,regY:0.5,x:633.35,y:369.65},0).wait(1).to({x:629.5,y:367.9},0).wait(1).to({x:625.6,y:366.15},0).wait(1).to({x:621.75,y:364.5},0).wait(1).to({x:617.85,y:362.9},0).wait(1).to({x:613.95,y:361.3},0).wait(1).to({x:610.05,y:359.8},0).wait(1).to({x:606.15,y:358.35},0).wait(1).to({x:602.25,y:356.95},0).wait(1).to({x:598.35,y:355.55},0).wait(1).to({x:594.45,y:354.25},0).wait(1).to({x:590.5,y:353},0).wait(1).to({x:586.6,y:351.8},0).wait(1).to({x:582.65,y:350.65},0).wait(1).to({x:578.7,y:349.55},0).wait(1).to({x:574.8,y:348.5},0).wait(1).to({x:570.85,y:347.5},0).wait(1).to({x:566.9,y:346.55},0).wait(1).to({x:562.95,y:345.65},0).wait(1).to({x:558.95,y:344.8},0).wait(1).to({x:555,y:344},0).wait(1).to({x:551.05,y:343.25},0).wait(1).to({x:547.05,y:342.55},0).wait(1).to({x:543.1,y:341.95},0).wait(1).to({x:539.1,y:341.35},0).wait(1).to({x:535.1,y:340.8},0).wait(1).to({x:531.1,y:340.3},0).wait(1).to({x:527.1,y:339.9},0).wait(1).to({x:523.1,y:339.5},0).wait(1).to({x:519.1,y:339.15},0).wait(1).to({x:515.1,y:338.9},0).wait(1).to({x:511.05,y:338.65},0).wait(1).to({x:507.05,y:338.45},0).wait(1).to({x:503,y:338.35},0).wait(1).to({x:498.95,y:338.25},0).wait(1).to({x:494.95},0).wait(1).to({x:490.9},0).wait(1).to({x:486.85,y:338.35},0).wait(1).to({x:482.8,y:338.45},0).wait(1).to({x:478.7,y:338.65},0).wait(1).to({x:474.65,y:338.9},0).wait(1).to({x:470.6,y:339.15},0).wait(1).to({x:466.5,y:339.5},0).wait(1).to({x:462.4,y:339.9},0).wait(1).to({x:458.35,y:340.3},0).wait(1).to({x:454.25,y:340.8},0).wait(1).to({x:450.15,y:341.35},0).wait(1).to({x:446.05,y:341.95},0).wait(1).to({x:441.95,y:342.55},0).wait(1).to({x:437.8,y:343.25},0).wait(1).to({x:433.7,y:344},0).wait(1).to({x:429.6,y:344.8},0).wait(1).to({x:425.45,y:345.65},0).wait(1).to({x:421.3,y:346.55},0).wait(1).to({x:417.2,y:347.5},0).wait(1).to({x:413.05,y:348.5},0).wait(1).to({x:408.9,y:349.55},0).wait(1).to({x:404.75,y:350.65},0).wait(1).to({x:400.55,y:351.8},0).wait(1).to({x:396.4,y:353},0).wait(1).to({x:392.25,y:354.25},0).wait(1).to({x:388.05,y:355.55},0).wait(1).to({x:383.9,y:356.95},0).wait(1).to({x:379.7,y:358.35},0).wait(1).to({x:375.5,y:359.8},0).wait(1).to({x:371.3,y:361.3},0).wait(1).to({x:367.1,y:362.85},0).wait(1).to({x:362.9,y:364.5},0).wait(1).to({x:358.7,y:366.15},0).wait(1).to({x:354.45,y:367.85},0).wait(1).to({x:350.25,y:369.65},0).wait(1).to({x:346,y:371.45},0).wait(1).to({x:341.8,y:373.35},0).wait(1).to({x:337.55,y:375.25},0).wait(1).to({x:333.3,y:377.25},0).wait(1).to({x:329.05,y:379.25},0).wait(1).to({x:324.8,y:381.35},0).wait(1).to({x:320.55,y:383.5},0).wait(166));

	// Layer_4
	this.instance_5 = new lib.ransom();
	this.instance_5.setTransform(637.1,371.35,0.3218,0.3218);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(119).to({_off:false},0).wait(1).to({regX:0.5,regY:0.5,x:642.7,y:369.45},0).wait(1).to({x:648.15,y:367.5},0).wait(1).to({x:653.55,y:365.65},0).wait(1).to({x:658.95,y:363.8},0).wait(1).to({x:664.3,y:362.05},0).wait(1).to({x:669.65,y:360.35},0).wait(1).to({x:674.95,y:358.7},0).wait(1).to({x:680.25,y:357.1},0).wait(1).to({x:685.5,y:355.6},0).wait(1).to({x:690.7,y:354.15},0).wait(1).to({x:695.9,y:352.75},0).wait(1).to({x:701.05,y:351.4},0).wait(1).to({x:706.2,y:350.1},0).wait(1).to({x:711.3,y:348.9},0).wait(1).to({x:716.4,y:347.75},0).wait(1).to({x:721.45,y:346.65},0).wait(1).to({x:726.45,y:345.65},0).wait(1).to({x:731.45,y:344.65},0).wait(1).to({x:736.4,y:343.75},0).wait(1).to({x:741.35,y:342.9},0).wait(1).to({x:746.25,y:342.15},0).wait(1).to({x:751.15,y:341.4},0).wait(1).to({x:756,y:340.75},0).wait(1).to({x:760.8,y:340.15},0).wait(1).to({x:765.6,y:339.6},0).wait(1).to({x:770.35,y:339.15},0).wait(1).to({x:775.1,y:338.7},0).wait(1).to({x:779.8,y:338.35},0).wait(1).to({x:784.5,y:338.05},0).wait(1).to({x:789.15,y:337.85},0).wait(1).to({x:793.75,y:337.65},0).wait(1).to({x:798.35,y:337.55},0).wait(1).to({x:802.95,y:337.5},0).wait(1).to({x:807.45},0).wait(1).to({x:812,y:337.6},0).wait(1).to({x:816.45,y:337.75},0).wait(1).to({x:820.9,y:337.9},0).wait(1).to({x:825.35,y:338.2},0).wait(1).to({x:829.75,y:338.5},0).wait(1).to({x:834.1,y:338.9},0).wait(1).to({x:838.45,y:339.35},0).wait(1).to({x:842.75,y:339.85},0).wait(1).to({x:847.05,y:340.4},0).wait(1).to({x:851.3,y:341},0).wait(1).to({x:855.5,y:341.7},0).wait(1).to({x:859.7,y:342.45},0).wait(1).to({x:863.9,y:343.25},0).wait(1).to({x:868.05,y:344.15},0).wait(1).to({x:872.15,y:345.1},0).wait(1).to({x:876.25,y:346.05},0).wait(1).to({x:880.3,y:347.15},0).wait(1).to({x:884.3,y:348.25},0).wait(1).to({x:888.3,y:349.4},0).wait(1).to({x:892.3,y:350.65},0).wait(1).to({x:896.2,y:351.95},0).wait(1).to({x:900.15,y:353.35},0).wait(1).to({x:904,y:354.75},0).wait(1).to({x:907.85,y:356.25},0).wait(1).to({x:911.7,y:357.8},0).wait(1).to({x:915.5,y:359.4},0).wait(1).to({x:919.25,y:361.05},0).wait(1).to({x:923,y:362.8},0).wait(1).to({x:926.75,y:364.6},0).wait(1).to({x:930.4,y:366.45},0).wait(1).to({x:934.05,y:368.35},0).wait(1).to({x:937.7,y:370.35},0).wait(1).to({x:941.3,y:372.35},0).wait(1).to({x:944.85,y:374.45},0).wait(1).to({x:948.4,y:376.65},0).wait(1).to({x:951.95,y:378.85},0).wait(1).to({x:955.4,y:381.15},0).wait(1).to({x:958.9,y:383.5},0).wait(118));

	// Layer_3
	this.instance_6 = new lib.ransom();
	this.instance_6.setTransform(642.65,359.95,0.3218,0.3218);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(166).to({_off:false},0).wait(1).to({regX:0.5,regY:0.5,x:644.1,y:357.4},0).wait(1).to({x:645.95,y:354.9},0).wait(1).to({x:647.95,y:352.55},0).wait(1).to({x:650.05,y:350.3},0).wait(1).to({x:652.2,y:348.15},0).wait(1).to({x:654.5,y:346.15},0).wait(1).to({x:656.85,y:344.2},0).wait(1).to({x:659.3,y:342.3},0).wait(1).to({x:661.8,y:340.55},0).wait(1).to({x:664.55,y:338.8},0).wait(1).to({x:667,y:337.3},0).wait(1).to({x:669.5,y:335.45},0).wait(1).to({x:671.8,y:333.45},0).wait(1).to({x:674,y:331.3},0).wait(1).to({x:676.15,y:329.1},0).wait(1).to({x:678.2,y:326.85},0).wait(1).to({x:680.25,y:324.55},0).wait(1).to({x:682.2,y:322.15},0).wait(1).to({x:684.1,y:319.75},0).wait(1).to({x:685.95,y:317.3},0).wait(1).to({x:687.75,y:314.8},0).wait(1).to({x:689.5,y:312.3},0).wait(1).to({x:691.15,y:309.75},0).wait(1).to({x:692.8,y:307.1},0).wait(1).to({x:694.35,y:304.45},0).wait(1).to({x:695.8,y:301.8},0).wait(1).to({x:697.2,y:299.05},0).wait(1).to({x:698.5,y:296.3},0).wait(1).to({x:699.75,y:293.45},0).wait(1).to({x:700.9,y:290.6},0).wait(1).to({x:702,y:287.5},0).wait(1).to({x:702.65,y:284.75},0).wait(1).to({x:702.8,y:281.75},0).wait(1).to({x:702.75,y:278.65},0).wait(1).to({x:702.6,y:275.6},0).wait(1).to({x:702.35,y:272.5},0).wait(1).to({x:702,y:269.45},0).wait(1).to({x:701.6,y:266.4},0).wait(1).to({x:701.05,y:263.4},0).wait(1).to({x:700.5,y:260.4},0).wait(1).to({x:699.8,y:257.4},0).wait(1).to({x:699.05,y:254.4},0).wait(1).to({x:698.2,y:251.45},0).wait(1).to({x:697.25,y:248.55},0).wait(1).to({x:696.25,y:245.65},0).wait(1).to({x:695.1,y:242.75},0).wait(1).to({x:693.9,y:240},0).wait(1).to({x:692.6,y:237.25},0).wait(1).to({x:691.3,y:234.45},0).wait(1).to({x:690,y:231.7},0).wait(1).to({x:688.65,y:228.9},0).wait(1).to({x:687.3,y:226.15},0).wait(1).to({x:685.95,y:223.4},0).wait(1).to({x:684.6,y:220.6},0).wait(1).to({x:683.25,y:217.85},0).wait(1).to({x:681.9,y:215.1},0).wait(1).to({x:680.5,y:212.4},0).wait(1).to({x:679.1,y:209.65},0).wait(1).to({x:677.7,y:206.9},0).wait(1).to({x:676.3,y:204.15},0).wait(1).to({x:674.85,y:201.45},0).wait(1).to({x:673.4,y:198.75},0).wait(1).to({x:671.9,y:196.1},0).wait(1).to({x:670.35,y:193.45},0).wait(1).to({x:668.5,y:191.05},0).wait(1).to({x:666.5,y:188.75},0).wait(1).to({x:664.35,y:186.55},0).wait(1).to({x:662.1,y:184.45},0).wait(1).to({x:659.75,y:182.4},0).wait(1).to({x:657.4,y:180.45},0).wait(1).to({x:655,y:178.55},0).wait(1).to({x:652.55,y:176.65},0).wait(1).to({x:650.1,y:174.8},0).wait(1).to({x:647.65,y:172.95},0).wait(1).to({x:645.2,y:171.15},0).wait(1).to({x:642.85,y:169.25},0).wait(67));

	// people
	this.instance_7 = new lib.Tween1("synched",0);
	this.instance_7.setTransform(952.75,361.65);

	this.instance_8 = new lib.Tween3("synched",0);
	this.instance_8.setTransform(327.45,362.95);

	this.instance_9 = new lib.Tween4("synched",0);
	this.instance_9.setTransform(654.4,138.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_9},{t:this.instance_8},{t:this.instance_7}]}).wait(309));

	// Background
	this.instance_10 = new lib.Chap3GeneralScene();

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(309));

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
		{src:"images/LessonChapter3_07_atlas_1.png?1655397265006", id:"LessonChapter3_07_atlas_1"},
		{src:"images/LessonChapter3_07_atlas_2.png?1655397265006", id:"LessonChapter3_07_atlas_2"},
		{src:"sounds/AfterWar207wav.mp3?1655397265359", id:"AfterWar207wav"},
		{src:"sounds/popsound.mp3?1655397265359", id:"popsound"}
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