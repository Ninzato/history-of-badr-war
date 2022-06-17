(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"LessonChapter3_08_atlas_1", frames: [[1282,0,620,208],[1282,420,620,108],[1282,210,620,208],[1282,530,620,108],[354,1188,163,120],[519,1188,163,120],[1904,524,134,50],[1904,132,132,102],[1904,0,134,130],[1904,576,122,50],[0,1188,175,145],[1831,990,202,144],[1904,628,115,48],[177,1188,175,145],[1831,1136,199,144],[0,990,1829,196],[0,722,1914,266],[1904,435,91,87],[1904,345,91,88],[1904,236,110,107],[0,0,1280,720]]}
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



(lib.CachedBmp_2754 = function() {
	this.initialize(ss["LessonChapter3_08_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2753 = function() {
	this.initialize(ss["LessonChapter3_08_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2752 = function() {
	this.initialize(ss["LessonChapter3_08_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2751 = function() {
	this.initialize(ss["LessonChapter3_08_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2750 = function() {
	this.initialize(ss["LessonChapter3_08_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2749 = function() {
	this.initialize(ss["LessonChapter3_08_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2748 = function() {
	this.initialize(ss["LessonChapter3_08_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2747 = function() {
	this.initialize(ss["LessonChapter3_08_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2746 = function() {
	this.initialize(ss["LessonChapter3_08_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2745 = function() {
	this.initialize(ss["LessonChapter3_08_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2744 = function() {
	this.initialize(ss["LessonChapter3_08_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2743 = function() {
	this.initialize(ss["LessonChapter3_08_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2742 = function() {
	this.initialize(ss["LessonChapter3_08_atlas_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2741 = function() {
	this.initialize(ss["LessonChapter3_08_atlas_1"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2740 = function() {
	this.initialize(ss["LessonChapter3_08_atlas_1"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2739 = function() {
	this.initialize(ss["LessonChapter3_08_atlas_1"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2738 = function() {
	this.initialize(ss["LessonChapter3_08_atlas_1"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CompoundPath = function() {
	this.initialize(ss["LessonChapter3_08_atlas_1"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.Group_1 = function() {
	this.initialize(ss["LessonChapter3_08_atlas_1"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.Path = function() {
	this.initialize(ss["LessonChapter3_08_atlas_1"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.Chap3GeneralScene = function() {
	this.initialize(ss["LessonChapter3_08_atlas_1"]);
	this.gotoAndStop(20);
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
	this.instance = new lib.CachedBmp_2754();
	this.instance.setTransform(0,91,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2753();
	this.instance_1.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol2, new cjs.Rectangle(0,0,310,195), null);


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
	this.instance = new lib.CachedBmp_2752();
	this.instance.setTransform(0,91,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2751();
	this.instance_1.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol1, new cjs.Rectangle(0,0,310,195), null);


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
	this.instance = new lib.CachedBmp_2749();
	this.instance.setTransform(-40.65,-35.5,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2750();
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
	this.instance = new lib.CachedBmp_2746();
	this.instance.setTransform(-33.05,-28.05,0.4875,0.4875);

	this.instance_1 = new lib.CachedBmp_2748();
	this.instance_1.setTransform(-33,10.75,0.4875,0.4875);

	this.instance_2 = new lib.CachedBmp_2747();
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
	this.instance = new lib.CachedBmp_2743();
	this.instance.setTransform(-43.65,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2745();
	this.instance_1.setTransform(-3.8,-12.5,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_2744();
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
	this.instance = new lib.CachedBmp_2740();
	this.instance.setTransform(-55.95,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2742();
	this.instance_1.setTransform(-55.95,-12,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_2741();
	this.instance_2.setTransform(-42.15,-36.05,0.5,0.5);

	this.instance_3 = new lib.Group_1();
	this.instance_3.setTransform(216.45,-207.05,4.7384,4.7384,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-214.7,-207,431.2,417);


// stage content:
(lib.LessonChapter3_08 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,271];
	this.streamSoundSymbolsList[0] = [{id:"AfterWar209wav",startFrame:0,endFrame:272,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("AfterWar209wav",0);
		this.InsertIntoSoundStreamData(soundInstance,0,272,1);
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
			document.location.replace("https://ninzato.github.io/history-of-badr-war/LessonChapter3_09.html");
			}, 500);
			
		}
		
		this.prevBtn.addEventListener("click", fl_ClickToGoToWebPage_2);
		
		function fl_ClickToGoToWebPage_2() {
			createjs.Sound.play("popsound");
			
			setTimeout(function(){
			document.location.replace("https://ninzato.github.io/history-of-badr-war/LessonChapter3_07.html");
			}, 500);
			
		}
		
		
		this.replaybtn.addEventListener("click", fl_ClickToGoToAndPlayFromFrame.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame()
		{
			this.gotoAndPlay(1);
		}
	}
	this.frame_271 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(271).call(this.frame_271).wait(1));

	// Subtitle
	this.instance = new lib.CachedBmp_2739();
	this.instance.setTransform(182.8,581,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2738();
	this.instance_1.setTransform(165.6,564.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(272));

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.homeBtn},{t:this.prevBtn},{t:this.nextBtn},{t:this.replaybtn}]}).wait(272));

	// Quraish
	this.instance_2 = new lib.Symbol1();
	this.instance_2.setTransform(833.55,324.5,1,1,0,0,0,154.9,97.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1).to({regX:155,x:833.65},0).wait(76).to({scaleX:0.9955,scaleY:0.9955,y:324.45},0).wait(1).to({scaleX:0.991,scaleY:0.991},0).wait(1).to({scaleX:0.9864,scaleY:0.9864,y:324.5},0).wait(1).to({scaleX:0.9819,scaleY:0.9819},0).wait(1).to({scaleX:0.9774,scaleY:0.9774},0).wait(1).to({scaleX:0.9729,scaleY:0.9729,y:324.45},0).wait(1).to({scaleX:0.9683,scaleY:0.9683},0).wait(1).to({scaleX:0.9638,scaleY:0.9638},0).wait(1).to({scaleX:0.9593,scaleY:0.9593,y:324.5},0).wait(1).to({scaleX:0.9548,scaleY:0.9548},0).wait(1).to({scaleX:0.9502,scaleY:0.9502},0).wait(1).to({scaleX:0.9457,scaleY:0.9457,y:324.45},0).wait(1).to({scaleX:0.9412,scaleY:0.9412},0).wait(1).to({scaleX:0.9367,scaleY:0.9367},0).wait(1).to({scaleX:0.9321,scaleY:0.9321,y:324.5},0).wait(1).to({scaleX:0.9276,scaleY:0.9276},0).wait(1).to({scaleX:0.9231,scaleY:0.9231},0).wait(1).to({scaleX:0.9186,scaleY:0.9186,y:324.45},0).wait(1).to({scaleX:0.914,scaleY:0.914,x:833.6},0).wait(1).to({scaleX:0.9095,scaleY:0.9095,y:324.5},0).wait(1).to({scaleX:0.905,scaleY:0.905},0).wait(1).to({scaleX:0.9005,scaleY:0.9005},0).wait(1).to({scaleX:0.8959,scaleY:0.8959,y:324.45},0).wait(1).to({scaleX:0.8914,scaleY:0.8914},0).wait(1).to({scaleX:0.8869,scaleY:0.8869},0).wait(1).to({scaleX:0.8824,scaleY:0.8824,y:324.5},0).wait(1).to({scaleX:0.8778,scaleY:0.8778},0).wait(1).to({scaleX:0.8733,scaleY:0.8733},0).wait(1).to({scaleX:0.8688,scaleY:0.8688,y:324.45},0).wait(1).to({scaleX:0.8643,scaleY:0.8643},0).wait(1).to({scaleX:0.8597,scaleY:0.8597},0).wait(1).to({scaleX:0.8552,scaleY:0.8552,y:324.5},0).wait(1).to({scaleX:0.8507,scaleY:0.8507},0).wait(1).to({scaleX:0.8462,scaleY:0.8462},0).wait(1).to({scaleX:0.8416,scaleY:0.8416,y:324.45},0).wait(1).to({scaleX:0.8371,scaleY:0.8371},0).wait(1).to({scaleX:0.8326,scaleY:0.8326,y:324.5},0).wait(1).to({scaleX:0.8281,scaleY:0.8281},0).wait(1).to({scaleX:0.8235,scaleY:0.8235},0).wait(1).to({scaleX:0.819,scaleY:0.819,y:324.45},0).wait(1).to({scaleX:0.8145,scaleY:0.8145},0).wait(1).to({scaleX:0.81,scaleY:0.81},0).wait(1).to({scaleX:0.8054,scaleY:0.8054,y:324.5},0).wait(1).to({scaleX:0.8009,scaleY:0.8009},0).wait(1).to({scaleX:0.7964,scaleY:0.7964},0).wait(1).to({scaleX:0.7919,scaleY:0.7919,y:324.45},0).wait(1).to({scaleX:0.7873,scaleY:0.7873},0).wait(1).to({scaleX:0.7828,scaleY:0.7828},0).wait(1).to({scaleX:0.7783,scaleY:0.7783,y:324.5},0).wait(1).to({scaleX:0.7738,scaleY:0.7738},0).wait(1).to({scaleX:0.7692,scaleY:0.7692},0).wait(1).to({scaleX:0.7647,scaleY:0.7647,y:324.45},0).wait(1).to({scaleX:0.7602,scaleY:0.7602},0).wait(1).to({scaleX:0.7557,scaleY:0.7557,y:324.5},0).wait(1).to({scaleX:0.7511,scaleY:0.7511},0).wait(1).to({scaleX:0.7466,scaleY:0.7466},0).wait(1).to({scaleX:0.7421,scaleY:0.7421,y:324.45},0).wait(1).to({scaleX:0.7376,scaleY:0.7376},0).wait(1).to({scaleX:0.733,scaleY:0.733},0).wait(1).to({scaleX:0.7285,scaleY:0.7285,y:324.5},0).wait(1).to({scaleX:0.724,scaleY:0.724},0).wait(1).to({scaleX:0.7195,scaleY:0.7195},0).wait(1).to({scaleX:0.7149,scaleY:0.7149,y:324.45},0).wait(1).to({scaleX:0.7104,scaleY:0.7104},0).wait(1).to({scaleX:0.7059,scaleY:0.7059},0).wait(1).to({scaleX:0.7014,scaleY:0.7014,y:324.5},0).wait(1).to({scaleX:0.6968,scaleY:0.6968},0).wait(1).to({scaleX:0.6923,scaleY:0.6923},0).wait(1).to({x:840.3},0).wait(1).to({x:847.05},0).wait(1).to({x:853.8},0).wait(1).to({x:860.55},0).wait(1).to({x:867.25},0).wait(1).to({x:874},0).wait(1).to({x:880.75},0).wait(1).to({x:887.5},0).wait(1).to({x:894.2},0).wait(1).to({x:900.95},0).wait(1).to({x:907.7},0).wait(1).to({x:914.4},0).wait(1).to({x:921.15},0).wait(1).to({x:927.9},0).wait(1).to({x:934.65},0).wait(1).to({x:941.35},0).wait(1).to({x:948.1},0).wait(1).to({x:954.85},0).wait(1).to({x:961.55},0).wait(1).to({x:968.3},0).wait(1).to({x:975.05},0).wait(1).to({x:981.8},0).wait(1).to({x:988.5},0).wait(1).to({x:995.25},0).wait(1).to({x:1002},0).wait(1).to({x:1008.75},0).wait(1).to({x:1015.45},0).wait(1).to({x:1022.2},0).wait(1).to({x:1028.95},0).wait(1).to({x:1035.65},0).wait(1).to({x:1042.4},0).wait(1).to({x:1049.15},0).wait(1).to({x:1055.9},0).wait(1).to({x:1062.6},0).wait(1).to({x:1069.35},0).wait(1).to({x:1076.1},0).wait(1).to({x:1082.85},0).wait(1).to({x:1089.55},0).wait(1).to({x:1096.3},0).wait(1).to({x:1103.05},0).wait(1).to({x:1109.75},0).wait(1).to({x:1116.5},0).wait(1).to({x:1123.25},0).wait(1).to({x:1130},0).wait(1).to({x:1136.7},0).wait(1).to({x:1143.45},0).wait(1).to({x:1150.2},0).wait(1).to({x:1156.9},0).wait(1).to({x:1163.65},0).wait(1).to({x:1170.4},0).wait(1).to({x:1177.15},0).wait(1).to({x:1183.85},0).wait(1).to({x:1190.6},0).wait(1).to({x:1197.35},0).wait(1).to({x:1204.1},0).wait(1).to({x:1210.8},0).wait(1).to({x:1217.55},0).wait(1).to({x:1224.3},0).wait(1).to({x:1231},0).wait(1).to({x:1237.75},0).wait(1).to({x:1244.5},0).wait(1).to({x:1251.25},0).wait(1).to({x:1257.95},0).wait(1).to({x:1264.7},0).wait(1).to({x:1271.45},0).wait(1).to({x:1278.15},0).wait(1).to({x:1284.9},0).wait(1).to({x:1291.65},0).wait(1).to({x:1298.4},0).wait(1).to({x:1305.1},0).wait(1).to({x:1311.85},0).wait(1).to({x:1318.6},0).wait(1).to({x:1325.35},0).wait(1).to({x:1332.05},0).wait(1).to({x:1338.8},0).wait(1).to({x:1345.55},0).wait(52));

	// Muslims
	this.instance_3 = new lib.Symbol2();
	this.instance_3.setTransform(446.45,324.5,1,1,0,0,0,154.9,97.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1).to({regX:155,x:446.55},0).wait(76).to({scaleX:1.008,scaleY:1.008},0).wait(1).to({scaleX:1.0159,scaleY:1.0159,x:446.5,y:324.45},0).wait(1).to({scaleX:1.0239,scaleY:1.0239,y:324.5},0).wait(1).to({scaleX:1.0319,scaleY:1.0319,x:446.55,y:324.45},0).wait(1).to({scaleX:1.0399,scaleY:1.0399,y:324.5},0).wait(1).to({scaleX:1.0478,scaleY:1.0478,x:446.5,y:324.45},0).wait(1).to({scaleX:1.0558,scaleY:1.0558,x:446.55,y:324.5},0).wait(1).to({scaleX:1.0638,scaleY:1.0638,y:324.45},0).wait(1).to({scaleX:1.0717,scaleY:1.0717,x:446.5,y:324.5},0).wait(1).to({scaleX:1.0797,scaleY:1.0797,x:446.55,y:324.45},0).wait(1).to({scaleX:1.0877,scaleY:1.0877},0).wait(1).to({scaleX:1.0957,scaleY:1.0957,y:324.5},0).wait(1).to({scaleX:1.1036,scaleY:1.1036,x:446.5,y:324.45},0).wait(1).to({scaleX:1.1116,scaleY:1.1116,x:446.55,y:324.5},0).wait(1).to({scaleX:1.1196,scaleY:1.1196,y:324.45},0).wait(1).to({scaleX:1.1276,scaleY:1.1276,x:446.5,y:324.5},0).wait(1).to({scaleX:1.1355,scaleY:1.1355,x:446.55,y:324.45},0).wait(1).to({scaleX:1.1435,scaleY:1.1435,y:324.5},0).wait(1).to({scaleX:1.1515,scaleY:1.1515,y:324.45},0).wait(1).to({scaleX:1.1594,scaleY:1.1594,y:324.5},0).wait(1).to({scaleX:1.1674,scaleY:1.1674,y:324.45},0).wait(1).to({scaleX:1.1754,scaleY:1.1754},0).wait(1).to({scaleX:1.1834,scaleY:1.1834,x:446.5,y:324.5},0).wait(1).to({scaleX:1.1913,scaleY:1.1913,x:446.55,y:324.45},0).wait(1).to({scaleX:1.1993,scaleY:1.1993,y:324.5},0).wait(1).to({scaleX:1.2073,scaleY:1.2073,y:324.45},0).wait(1).to({scaleX:1.2152,scaleY:1.2152,y:324.5},0).wait(1).to({scaleX:1.2232,scaleY:1.2232,y:324.45},0).wait(1).to({scaleX:1.2312,scaleY:1.2312,y:324.5},0).wait(1).to({scaleX:1.2392,scaleY:1.2392,y:324.45},0).wait(1).to({scaleX:1.2471,scaleY:1.2471,y:324.5},0).wait(1).to({scaleX:1.2551,scaleY:1.2551,y:324.45},0).wait(1).to({scaleX:1.2631,scaleY:1.2631},0).wait(1).to({scaleX:1.2711,scaleY:1.2711,y:324.5},0).wait(1).to({scaleX:1.279,scaleY:1.279,y:324.45},0).wait(1).to({scaleX:1.287,scaleY:1.287,y:324.5},0).wait(1).to({scaleX:1.295,scaleY:1.295,y:324.45},0).wait(1).to({scaleX:1.3029,scaleY:1.3029,y:324.5},0).wait(1).to({scaleX:1.3109,scaleY:1.3109,y:324.45},0).wait(1).to({scaleX:1.3189,scaleY:1.3189,x:446.6,y:324.5},0).wait(1).to({scaleX:1.3269,scaleY:1.3269,x:446.55,y:324.45},0).wait(1).to({scaleX:1.3348,scaleY:1.3348,y:324.5},0).wait(1).to({scaleX:1.3428,scaleY:1.3428,y:324.45},0).wait(1).to({scaleX:1.3508,scaleY:1.3508},0).wait(1).to({scaleX:1.3587,scaleY:1.3587,y:324.5},0).wait(1).to({scaleX:1.3667,scaleY:1.3667,y:324.45},0).wait(1).to({scaleX:1.3747,scaleY:1.3747,x:446.6,y:324.5},0).wait(1).to({scaleX:1.3827,scaleY:1.3827,x:446.55,y:324.45},0).wait(1).to({scaleX:1.3906,scaleY:1.3906,y:324.5},0).wait(1).to({scaleX:1.3986,scaleY:1.3986,x:446.6,y:324.45},0).wait(1).to({scaleX:1.4066,scaleY:1.4066,x:446.55,y:324.5},0).wait(1).to({scaleX:1.4146,scaleY:1.4146,y:324.45},0).wait(1).to({scaleX:1.4225,scaleY:1.4225,x:446.6,y:324.5},0).wait(1).to({scaleX:1.4305,scaleY:1.4305,y:324.45},0).wait(1).to({scaleX:1.4385,scaleY:1.4385,x:446.55},0).wait(1).to({scaleX:1.4464,scaleY:1.4464,y:324.5},0).wait(1).to({scaleX:1.4544,scaleY:1.4544,x:446.6,y:324.45},0).wait(1).to({scaleX:1.4624,scaleY:1.4624,x:446.55,y:324.5},0).wait(1).to({scaleX:1.4704,scaleY:1.4704,y:324.45},0).wait(1).to({scaleX:1.4783,scaleY:1.4783,x:446.6,y:324.5},0).wait(1).to({scaleX:1.4863,scaleY:1.4863,y:324.45},0).wait(1).to({scaleX:1.4943,scaleY:1.4943,x:446.55,y:324.5},0).wait(1).to({scaleX:1.5022,scaleY:1.5022,x:446.6,y:324.45},0).wait(1).to({scaleX:1.5102,scaleY:1.5102,y:324.5},0).wait(1).to({scaleX:1.5182,scaleY:1.5182,x:446.55,y:324.45},0).wait(1).to({scaleX:1.5262,scaleY:1.5262},0).wait(1).to({scaleX:1.5341,scaleY:1.5341,x:446.6,y:324.5},0).wait(1).to({scaleX:1.5421,scaleY:1.5421,y:324.45},0).wait(1).to({x:449.15},0).wait(1).to({x:451.7},0).wait(1).to({x:454.25},0).wait(1).to({x:456.8},0).wait(1).to({x:459.35},0).wait(1).to({x:461.9},0).wait(1).to({x:464.4},0).wait(1).to({x:466.95},0).wait(1).to({x:469.5},0).wait(1).to({x:472.05},0).wait(1).to({x:474.6},0).wait(1).to({x:477.15},0).wait(1).to({x:479.7},0).wait(1).to({x:482.25},0).wait(1).to({x:484.8},0).wait(1).to({x:487.35},0).wait(1).to({x:489.9},0).wait(1).to({x:492.45},0).wait(1).to({x:495},0).wait(1).to({x:497.5},0).wait(1).to({x:500.05},0).wait(1).to({x:502.6},0).wait(1).to({x:505.15},0).wait(1).to({x:507.7},0).wait(1).to({x:510.25},0).wait(1).to({x:512.8},0).wait(1).to({x:515.35},0).wait(1).to({x:517.9},0).wait(1).to({x:520.45},0).wait(1).to({x:523},0).wait(1).to({x:525.55},0).wait(1).to({x:528.1},0).wait(1).to({x:530.6},0).wait(1).to({x:533.15},0).wait(1).to({x:535.7},0).wait(1).to({x:538.25},0).wait(1).to({x:540.8},0).wait(1).to({x:543.35},0).wait(1).to({x:545.9},0).wait(1).to({x:548.45},0).wait(1).to({x:551},0).wait(1).to({x:553.55},0).wait(1).to({x:556.1},0).wait(1).to({x:558.65},0).wait(1).to({x:561.15},0).wait(1).to({x:563.7},0).wait(1).to({x:566.25},0).wait(1).to({x:568.8},0).wait(1).to({x:571.35},0).wait(1).to({x:573.9},0).wait(1).to({x:576.45},0).wait(1).to({x:579},0).wait(1).to({x:581.55},0).wait(1).to({x:584.1},0).wait(1).to({x:586.65},0).wait(1).to({x:589.2},0).wait(1).to({x:591.75},0).wait(1).to({x:594.25},0).wait(1).to({x:596.8},0).wait(1).to({x:599.35},0).wait(1).to({x:601.9},0).wait(1).to({x:604.45},0).wait(1).to({x:607},0).wait(1).to({x:609.55},0).wait(1).to({x:612.1},0).wait(1).to({x:614.65},0).wait(1).to({x:617.2},0).wait(1).to({x:619.75},0).wait(1).to({x:622.3},0).wait(1).to({x:624.85},0).wait(1).to({x:627.35},0).wait(1).to({x:629.9},0).wait(1).to({x:632.45},0).wait(1).to({x:635},0).wait(1).to({x:637.55},0).wait(1).to({x:640.1},0).wait(52));

	// Background
	this.instance_4 = new lib.Chap3GeneralScene();

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(272));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(515.3,267.8,937.6000000000001,572.2);
// library properties:
lib.properties = {
	id: 'A6F1A483617F544186FFC32FE4892FD2',
	width: 1280,
	height: 720,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/LessonChapter3_08_atlas_1.png", id:"LessonChapter3_08_atlas_1"},
		{src:"sounds/AfterWar209wav.mp3", id:"AfterWar209wav"},
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