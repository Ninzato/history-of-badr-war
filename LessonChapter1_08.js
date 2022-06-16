(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"LessonChapter1_08_atlas_1", frames: [[1927,961,88,153],[950,754,68,165],[1916,0,84,202],[620,754,271,266],[650,1144,195,58],[0,1015,277,140],[1389,1156,166,50],[279,1031,235,119],[516,1144,132,102],[1802,1136,133,102],[333,721,285,308],[1366,721,304,286],[1033,402,330,317],[1781,268,228,432],[0,721,331,292],[1697,402,55,257],[1927,702,55,257],[1984,702,55,256],[893,754,55,256],[1646,1136,154,132],[628,402,403,350],[1469,1009,175,145],[1035,1128,175,144],[858,1128,175,145],[1212,1128,175,144],[0,402,626,317],[893,1015,574,111],[279,1152,217,42],[620,1022,236,120],[1365,402,330,317],[1697,702,228,432],[1033,721,331,292],[0,268,1779,132],[0,0,1914,266],[1937,1116,91,87],[516,1031,91,88]]}
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



(lib.CachedBmp_751 = function() {
	this.initialize(ss["LessonChapter1_08_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_750 = function() {
	this.initialize(ss["LessonChapter1_08_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_749 = function() {
	this.initialize(ss["LessonChapter1_08_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_748 = function() {
	this.initialize(ss["LessonChapter1_08_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_747 = function() {
	this.initialize(ss["LessonChapter1_08_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_746 = function() {
	this.initialize(ss["LessonChapter1_08_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_745 = function() {
	this.initialize(ss["LessonChapter1_08_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_744 = function() {
	this.initialize(ss["LessonChapter1_08_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_743 = function() {
	this.initialize(ss["LessonChapter1_08_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_742 = function() {
	this.initialize(ss["LessonChapter1_08_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_741 = function() {
	this.initialize(ss["LessonChapter1_08_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_740 = function() {
	this.initialize(ss["LessonChapter1_08_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_739 = function() {
	this.initialize(ss["LessonChapter1_08_atlas_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_738 = function() {
	this.initialize(ss["LessonChapter1_08_atlas_1"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_737 = function() {
	this.initialize(ss["LessonChapter1_08_atlas_1"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_736 = function() {
	this.initialize(ss["LessonChapter1_08_atlas_1"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_735 = function() {
	this.initialize(ss["LessonChapter1_08_atlas_1"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_734 = function() {
	this.initialize(ss["LessonChapter1_08_atlas_1"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_733 = function() {
	this.initialize(ss["LessonChapter1_08_atlas_1"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_732 = function() {
	this.initialize(ss["LessonChapter1_08_atlas_1"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_731 = function() {
	this.initialize(ss["LessonChapter1_08_atlas_1"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_730 = function() {
	this.initialize(ss["LessonChapter1_08_atlas_1"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_729 = function() {
	this.initialize(ss["LessonChapter1_08_atlas_1"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_728 = function() {
	this.initialize(ss["LessonChapter1_08_atlas_1"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_727 = function() {
	this.initialize(ss["LessonChapter1_08_atlas_1"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_726 = function() {
	this.initialize(ss["LessonChapter1_08_atlas_1"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_725 = function() {
	this.initialize(ss["LessonChapter1_08_atlas_1"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_724 = function() {
	this.initialize(ss["LessonChapter1_08_atlas_1"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_723 = function() {
	this.initialize(ss["LessonChapter1_08_atlas_1"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_722 = function() {
	this.initialize(ss["LessonChapter1_08_atlas_1"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_721 = function() {
	this.initialize(ss["LessonChapter1_08_atlas_1"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_720 = function() {
	this.initialize(ss["LessonChapter1_08_atlas_1"]);
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_719 = function() {
	this.initialize(img.CachedBmp_719);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,4743,2573);


(lib.CachedBmp_718 = function() {
	this.initialize(ss["LessonChapter1_08_atlas_1"]);
	this.gotoAndStop(32);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_717 = function() {
	this.initialize(ss["LessonChapter1_08_atlas_1"]);
	this.gotoAndStop(33);
}).prototype = p = new cjs.Sprite();



(lib.CompoundPath = function() {
	this.initialize(ss["LessonChapter1_08_atlas_1"]);
	this.gotoAndStop(34);
}).prototype = p = new cjs.Sprite();



(lib.Group_1 = function() {
	this.initialize(ss["LessonChapter1_08_atlas_1"]);
	this.gotoAndStop(35);
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
	this.shape.graphics.f("#564024").s().p("AFwKlQjOgBjxhYQing8iQguIhvghIACANQAJASAeAUQBhA+EVA8QhFAGhlgQQjJggiahqQhGgwh4h1IjcjfQkbkdhogfQiPgqhGhZQg/hRAThVQAShVBZgoQBigsCOAkQBWAVCSA9QBWAkC7BTQFnCcCyAPQgsAJhPgCQidgDiqg0IBLAgQBgAlBkAeQFABfDygOQDzgODKAvQBmAXA0AaQhYgOhlgLQjLgXhDAPQhrAXgiAGQgrAHgiABIBZAFQCjAIBLgEQBfgFClAbQC0AeC3A3QhYgKhmgHQjNgPhIAQIDRA2QDrA5CCALQDnATDIB/QBkA/A2A7QiAgsiTgtQkohahngCQAOApCyBGQCrBCBXAGQguAMhUAFQioAKjAgmIBuAvQB6A9A5BBQg4gchVgZQiogyiKASQhsAOhIgbQhTgfhxAEIBPAcQBaAfA7AOQgHAIgbAIQg3APhkgCICwAgQDNAgCKABQg0AQhtADQjbAGkfg+IBFAdQBRAfA9AMQg0AQheAAIgLAAg");
	this.shape.setTransform(-4.6186,-0.2054,0.2161,0.2758,49.7342);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-23.1,-37.8,33.400000000000006,72.6);


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
	this.shape.graphics.f("#2B2012").s().p("AQrKPQg3gkgZgMQAIAFAGAWQAGAVAeASQgrgBgageQgZgdgWABIgSAIQgOAHgSgEQAbAaAfATQhMgEhjgwQhcgshEg8QAKAMATArQAeAxBDA0QhdgQhlhCQheg9hEhTQAJAiAOAbQATAkAYAQQg8gag3gyQg1gxgig4IgPgbQADAyApAtQgUgMhvhcQhmhUgQgGQAIAKAFAfQANAiAwAjQhkgcgzhEIgog0QgbgcglgSQAHALAOAiQANAfAMANQhggahXhAQhXhAg4hVQAEAcARAbQAQAaAYAVQgYgOgwgNIhXgXQhqgdgVgtIgNgcQAAAQgIArQgEApAOASQgcgVgPgpQgQgzgKgfQgJgag5gwQg1gtgfgOQgkgPgZAOQgPAIgbAhQgcAhgWAMQgkAVgygFQgNgCgbAJQglALgMACQhBANgtg1QANgHgDg8QgDhDADgFQAFgNgJgRQgJgRAJgWQARgyAPgdQAbg1A2gnQgSApgFAZQgCAOAAAbQAPgiAng3QA/hXA3gRQgQATgGANQgFALgDAUQAvg/AzgeQA9gkB6gcQg0AtgQAgQgIAagEAHQA1guBGghQBUgmBHABQgMAHgMASQgNATgEASQARgBAcgNQAagMAYgQQAmgbBAgGQAqgDBgAGQhCAFg8AlIgxAoICAgnQCLggBPAZQglgCg4ANQg/AOgVAUQBGgWB+AOQCnATB4gIQgSAOhHAPQhBAPgWAYQBLgIBdAbQAqAMCeA+QgZgDgcABQgnACgeAJQARAKBLAJQBFAJAUgCQA8gFAtAJQAsAIApAYQgfgGg8AOQg6AOgdASIAlgEQC3gLBkBWQgfgRgkgCQgkgCgiAMQB6AOBYAwQBiA1BvB8QgwgYgmgBQgkADgSgDQBbAdBtBhQBrBiApBYQg/g6gigVQgTgKgcgHQANATAPAhQAKAXAFASQAKAeBXBSQBRBMgBAcQgkgYg0gOQg2gPgHAPQAMAODDChQg4gbhQgRQhAgNgjgaQAIASAzAfQA7AjADADQg/gTgcgKQgwgRg0g4QAJAYAQAZQARAbARANQgpgDghgbQgUgQgIgQQAMAtBNA1IBYA6Qg2gGg3gfg");
	this.shape.setTransform(23.2184,-28.1883,0.341,0.341);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#654A2A").s().p("AlcQ4Qgngeg1hdQg9hrgjh2QhglFCcjGQAcgjhKhOQgugviRhzQiZh7hChBQhvhsgYhOQhqlYA/ixQBckDG6gwQCogTE4ChQCSBLEICqQESCxCPB0QD4DKBDCiQB9EvgzFHQg1FOjZDUQjbDVj8BJQhxAhhtAAQkGAAjzi/g");
	this.shape_1.setTransform(24.1089,1.5961,0.341,0.341);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-22.7,-51.8,91.9,96.8);


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
	this.shape.graphics.f("#564024").s().p("AgUSIQhmgFgchTQgVg9gCg4QgBgfAHg+QANh4glhpQgTg2gFhUQgDgngBh9QgCjugqiQQgniDgeigQgbiRgHhfQgKh5AQhwQATiHA1hVQCJjeFECjQBiAxA5BpQA7BtgWBwQhwJOgPC3QgEAugBA3QgDAzgQBWQguBlACB7QABA1AWCfQASB/gLBJQgPBqhMBTQgQASgkALQghAKgjAAIgJAAg");
	this.shape.setTransform(-14.9002,-7.7291,0.3409,0.3409);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-27.5,-47.3,25.3,79.1);


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
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2B2012").s().p("AhmCLQhGgPg9goIgFgQQgFgbAKgpQAShPBGhBQAiAoBkACQCZAFA9gbQAkBpABApIAAAAIgDAVQgHATgQABQgcAAgjALQgmALgbARQhCArhHAAQgZAAgagGg");
	this.shape.setTransform(-3.9593,-4.5165,0.341,0.341);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#564024").s().p("AhmNWQhGgPg9gpIgFgQQgFgdALgrQAVhWBRhDQBhhRgLh8QgDglgQg/QgRhCgDgWQgMhjgIh6IgNi5QgPjAgvhwIgZg+QgGgdAOhUQAMhIA4gkQAzghBEAEQBBAEAwAkQA0AnAEA5QADAugWA8QgMAhglBNQg7B6AmFBQAVCuAyEiQACATAwCLQAuCEABAtIAAABIgDAUQgHAUgQAAQgcABgjAKQgmALgbASQhCAqhHAAQgZAAgagFg");
	this.shape_1.setTransform(-4.0423,-29.1694,0.3405,0.3405);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-12.2,-58.4,16.5,58.8);


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
	this.shape.graphics.f("#654A2A").s().p("AgUSIQhmgFgchTQgVg+gCg3QgBgfAHg+QANh4glhpQgTg2gFhUQgDgngBh9QgCjugqiQQgmiDgeigQgbiQgIhgQgKh5AQhwQATiHA1hWQCJjdFECjQBiAxA5BoQA7BugVBwQhxJNgPC3QgEAvgBA2QgDAzgQBXQguBlACB7QABA1AWCfQASB/gKBJQgQBqhMBTQgQARgkAMQgiAKgiAAIgJAAg");
	this.shape.setTransform(-1.1846,-0.1686,0.3409,0.3409);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.8,-39.7,25.3,79.1);


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
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2B2012").s().p("AhmCLQhEgOg/gpIgFgQQgFgbAJgoQAShQBHhAQAiAnBkADQCZAEA9gbQAkBtABAlIgDAVQgHAUgQAAQgcABgjAKQgmALgbARQhCAqhGAAQgZAAgbgFg");
	this.shape.setTransform(12.0676,2.7429,0.341,0.341);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#654A2A").s().p("AhmNWQhFgOg+gqIgFgPQgFgeALgrQAVhWBRhDQBhhRgLh8QgDglgQg+QgRhCgDgXQgMhigJh7QgHiAgFg5QgPjAgvhwIgZg+QgGgdANhTQAMhIA5glQAyghBFAEQBBAFAwAjQAzAnAEA6QADAugVA8QgMAhglBNQg7B6AmFBQAVCtAxEjQADASAwCLQAuCFABAtIgDAVQgHATgQABQgcAAgjALQgmALgbARQhCAqhGAAQgaAAgagFg");
	this.shape_1.setTransform(11.849,-21.9258,0.3405,0.3405);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(3.7,-51.1,16.6,58.800000000000004);


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
	this.shape.graphics.f("#564024").s().p("AhQSIQhmgFgchTQgVg9gCg4QgBgfAHg+QANh4glhpQgdhSgrjcQgxj3gniGQgmiEgeigQgbiRgIhfQgIhrA8h+QA+iBBuhbQB7hmCSgUQCmgYCtBXQBiAxA4BpQA7BtgVBwQhwJLh2C6QgdAuguA3QgjAygQBXQguBlACB7QABA1AWCfQASB/gKBJQgQBqhMBTQgQASgjALQghAKgjAAIgKAAg");
	this.shape.setTransform(-3.9683,2.9095,0.3409,0.3409);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-21.5,-36.6,35.1,79.1);


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
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2B2012").s().p("AhmCLQhHgPg8goIgFgQQgFgbAJgpQAShPBHhBQAhAoBlACQCZAFA9gbQAkBrABAnIAAAAIgDAVQgHATgQABQgcAAgjALQgmALgbARQhCArhHAAQgZAAgagGg");
	this.shape.setTransform(5.9834,8.0539,0.341,0.341);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#564024").s().p("AhmNWQhHgPg8gpIgFgQQgFgdALgrQAVhWBRhDQBhhRgLh8QgDglgQg/QgShCgCgWQgMhjgJh6QgHiAgFg5QgPjAgvhwIgZg+QgGgeANhTQAMhIA5gkQAyghBFAEQBBAEAwAkQAzAnAEA5QADAugVA8QgMAiglBMQg7B6AmFBQAVCuAxEiQADATAwCLQAuCFABAsIAAABIgDAUQgHAUgQAAQgcABgjAKQgmALgbASQhCAqhHAAQgZAAgagFg");
	this.shape_1.setTransform(5.7874,-16.5842,0.3405,0.3405);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2.4,-45.8,16.599999999999998,58.8);


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
	this.shape.graphics.f("#654A2A").s().p("AhPSIQhmgFgdhTQgVg+gCg3QgBgfAHg+QAOh4gmhpQgchRgrjdQgxj2goiIQgmiDgeigQgbiRgIhfQgIhrA8h+QA+iBBuhbQB7hmCSgUQCmgYCtBXQBiAxA4BpQA7BtgVBwQhwJLh2C5Qg2BHgVAeQgjAzgQBXQgtBlABB7QABA1AWCfQASB/gKBJQgQBqhMBTQgPASgkALQghAKgjAAIgJAAg");
	this.shape.setTransform(-1.5114,-0.6285,0.3409,0.3409);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.1,-40.1,35.2,79);


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
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2B2012").s().p("AhmCLQhGgOg9gpIgFgQQgFgbAJgoQAShQBHhAQAiAnBkADQCZAEA9gbQAkBtABAlIAAABIgDAUQgHAUgQAAQgcABgjAKQgmALgbARQhCAqhGAAQgZAAgbgFg");
	this.shape.setTransform(8.1484,3.0633,0.341,0.341);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#654A2A").s().p("AhmNWQhGgOg9gqIgFgPQgFgeALgrQAVhWBRhDQBhhRgLh7QgDgmgQg+QgRhCgDgXQgMhjgIh6IgNi5QgPjAgvhwIgZg9QgGgeAOhTQAMhIA4glQAzghBEAFQBBAEAwAkQAzAmAEA6QADAugVA8QgMAhglBNQg7B6AmFBQAVCtAyEjQACATAwCKQAuCFABAtIAAAAIgDAVQgHATgQABQgcAAgjALQgmALgbARQhCAqhGAAQgZAAgbgFg");
	this.shape_1.setTransform(7.9075,-21.5839,0.3405,0.3405);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.2,-50.8,16.599999999999998,58.8);


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
	this.instance = new lib.CachedBmp_751();
	this.instance.setTransform(-16.9,-29,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.9,-29,44,76.5);


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
	this.instance = new lib.CachedBmp_742();
	this.instance.setTransform(-33.05,-28.05,0.4875,0.4875);

	this.instance_1 = new lib.CachedBmp_743();
	this.instance_1.setTransform(-33.05,-28.15,0.4875,0.4875);

	this.instance_2 = new lib.CompoundPath();
	this.instance_2.setTransform(-159.75,-154.3,3.5007,3.5007);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_2},{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-159.7,-154.3,318.5,304.6);


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
	this.instance = new lib.CachedBmp_741();
	this.instance.setTransform(-68.4,-83.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.4,-83.6,142.5,154);


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
	this.instance = new lib.CachedBmp_740();
	this.instance.setTransform(-73.35,-69.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-73.3,-69.7,152,143);


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
	this.instance = new lib.CachedBmp_739();
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
	this.instance = new lib.CachedBmp_738();
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
	this.instance_1 = new lib.CachedBmp_737();
	this.instance_1.setTransform(-78.3,-67.4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

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
	this.instance = new lib.CachedBmp_736();
	this.instance.setTransform(-9.5,-43.95,0.343,0.343);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.5,-43.9,18.9,88.1);


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
	this.instance = new lib.CachedBmp_735();
	this.instance.setTransform(-9.5,-43.95,0.343,0.343);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.5,-43.9,18.9,88.1);


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
	this.instance = new lib.CachedBmp_734();
	this.instance.setTransform(-9.45,-43.95,0.3434,0.3434);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.4,-43.9,18.9,87.9);


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
	this.instance = new lib.CachedBmp_733();
	this.instance.setTransform(-9.45,-44,0.3435,0.3435);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.4,-44,18.9,88);


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
	this.instance = new lib.CachedBmp_732();
	this.instance.setTransform(-26.5,-22.65,0.3431,0.3431);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-26.5,-22.6,52.9,45.3);


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
	this.instance = new lib.CachedBmp_731();
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

	// Layer_2
	this.instance = new lib.CachedBmp_729();
	this.instance.setTransform(-43.65,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_730();
	this.instance_1.setTransform(-43.45,-36.05,0.5,0.5);

	this.instance_2 = new lib.Group_1();
	this.instance_2.setTransform(-214.75,-207.05,4.7387,4.7387);

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
	this.instance = new lib.CachedBmp_727();
	this.instance.setTransform(-43.7,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_728();
	this.instance_1.setTransform(-42.15,-36.05,0.5,0.5);

	this.instance_2 = new lib.Group_1();
	this.instance_2.setTransform(216.45,-207.05,4.7386,4.7386,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_2},{t:this.instance_1}]},1).wait(1));

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
	this.instance_1 = new lib.CachedBmp_722();
	this.instance_1.setTransform(-86,-83.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

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
	this.instance = new lib.CachedBmp_721();
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
	this.instance = new lib.CachedBmp_720();
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
	this.instance = new lib.ch1_headcopy2("synched",0);
	this.instance.setTransform(14.85,-101.25,0.412,0.412,0,-8.1214,171.8786,-0.2,52.9);

	this.instance_1 = new lib.CachedBmp_750();
	this.instance_1.setTransform(9.2,-78.75,0.5,0.5);

	this.instance_2 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_2.setTransform(18.6,-78.15,0.4247,0.4247,0,-4.6925,175.3075,-0.5,-24.7);

	this.instance_3 = new lib.CachedBmp_749();
	this.instance_3.setTransform(-0.85,-43.45,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_748();
	this.instance_4.setTransform(-61.7,-86,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-61.7,-155.4,135.5,213);


(lib.horse_01 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(62.4,45.9,0.9967,0.9967,-14.0796,0,0,7.5,-46.2);

	this.instance_1 = new lib.camel_leg_f_l_bcopy("synched",0);
	this.instance_1.setTransform(-26.25,53.35,0.9979,0.9979,33.3027,0,0,11.5,-45.1);

	this.instance_2 = new lib.camel_leg_b_l_ucopy("synched",0);
	this.instance_2.setTransform(55.9,-15.05,0.9975,0.9975,-13.1247,0,0,2.7,-27.2);

	this.instance_3 = new lib.camel_leg_f_l_ucopy("synched",0);
	this.instance_3.setTransform(2.2,2.15,0.9981,0.9981,28.2246,0,0,0.5,-26.8);

	this.instance_4 = new lib.camel_headcopy("synched",0);
	this.instance_4.setTransform(-55.15,-75.85,0.998,0.998,1.656,0,0,21.9,17.3);

	this.instance_5 = new lib.camel_neckcopy("synched",0);
	this.instance_5.setTransform(-35.4,-39.2,0.9978,0.9978,19.9924,0,0,33.8,15.1);

	this.instance_6 = new lib.camel_bodycopy("synched",0);
	this.instance_6.setTransform(-4.15,-35.75);

	this.instance_7 = new lib.camel_leg_f_r_bcopy("synched",0);
	this.instance_7.setTransform(-29.95,41.05,0.9982,0.9982,-26.7973,0,0,-4.9,-53);

	this.instance_8 = new lib.camel_leg_f_r_ucopy("synched",0);
	this.instance_8.setTransform(-49.7,-14.65,0.9984,0.9984,-19.5942,0,0,-15.3,-34.5);

	this.instance_9 = new lib.camel_leg_b_r_bcopy("synched",0);
	this.instance_9.setTransform(44.55,35.5,0.9969,0.9969,-11.5371,0,0,5,-40.2);

	this.instance_10 = new lib.camel_leg_b_r_ucopy("synched",0);
	this.instance_10.setTransform(33.85,-32,0.9965,0.9965,-15.7944,0,0,1.8,-29.1);

	this.instance_11 = new lib.camel_tailcopy("synched",0);
	this.instance_11.setTransform(53.2,-33.6,0.9978,0.9978,-45.2447,0,0,-14.5,-32);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-45.2447,y:-33.6,x:53.2,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.8,regY:-29.1,scaleX:0.9965,scaleY:0.9965,rotation:-15.7944,x:33.85,y:-32}},{t:this.instance_9,p:{rotation:-11.5371,x:44.55,y:35.5,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9984,scaleY:0.9984,rotation:-19.5942,x:-49.7,y:-14.65,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,rotation:-26.7973,x:-29.95,y:41.05,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.8,regY:15.1,scaleX:0.9978,scaleY:0.9978,rotation:19.9924,x:-35.4,y:-39.2}},{t:this.instance_4,p:{scaleX:0.998,scaleY:0.998,rotation:1.656,x:-55.15,y:-75.85,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:28.2246,x:2.2,y:2.15,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.7,scaleX:0.9975,scaleY:0.9975,rotation:-13.1247,y:-15.05,regY:-27.2,x:55.9}},{t:this.instance_1,p:{regX:11.5,scaleX:0.9979,scaleY:0.9979,rotation:33.3027,x:-26.25,y:53.35,regY:-45.1}},{t:this.instance,p:{rotation:-14.0796,x:62.4,y:45.9,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]}).to({state:[{t:this.instance_11,p:{regX:-14.4,rotation:-45.7144,y:-33.55,x:53.2,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-28.9,scaleX:0.9964,scaleY:0.9964,rotation:-14.1658,x:33.95,y:-31.7}},{t:this.instance_9,p:{rotation:-10.963,x:42.5,y:35.75,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.6,scaleX:0.9983,scaleY:0.9983,rotation:-17.2963,x:-49.6,y:-14.75,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-28.2395,x:-32.1,y:41.75,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:18.7315,x:-35.45,y:-39.3}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:1.4002,x:-55.85,y:-75.45,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:26.484,x:2.3,y:2,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:-13.3041,y:-15.2,regY:-27.2,x:55.9}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:28.4745,x:-24.7,y:54.1,regY:-45.1}},{t:this.instance,p:{rotation:-18.9634,x:62.6,y:45.75,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-46.1847,y:-33.45,x:53.1,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:-12.5369,x:33.95,y:-31.8}},{t:this.instance_9,p:{rotation:-10.3899,x:40.55,y:35.95,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:-14.9993,x:-49.55,y:-14.6,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-29.682,x:-34.45,y:42.4,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.6,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:17.4694,x:-35.5,y:-39.35}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:1.1434,x:-56.65,y:-74.95,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:24.7419,x:2.3,y:2,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9975,scaleY:0.9975,rotation:-13.4839,y:-15.3,regY:-27.3,x:55.9}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:23.6442,x:-23.15,y:54.9,regY:-45.1}},{t:this.instance,p:{rotation:-23.8479,x:62.85,y:45.7,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-46.6551,y:-33.4,x:53.15,regY:-31.9,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:-10.9097,x:33.95,y:-31.75}},{t:this.instance_9,p:{rotation:-9.8161,x:38.65,y:36.1,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:-12.7011,x:-49.55,y:-14.65,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-31.1245,x:-36.75,y:43,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:16.2086,x:-35.4,y:-39.3}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.8849,x:-57.45,y:-74.5,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:23.0005,x:2.3,y:2.05,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:-13.6638,y:-15.2,regY:-27.2,x:55.95}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:18.8148,x:-21.5,y:55.55,regY:-45.1}},{t:this.instance,p:{rotation:-28.7318,x:62.95,y:45.65,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-47.1257,y:-33.4,x:53.05,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:-9.2807,x:33.9,y:-31.75}},{t:this.instance_9,p:{rotation:-9.2417,x:36.7,y:36.2,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:-10.4028,x:-49.55,y:-14.65,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-32.5671,x:-38.95,y:43.45,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:14.9478,x:-35.4,y:-39.3}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.6299,x:-58.25,y:-74,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:21.2599,x:2.35,y:2.05,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:-13.8422,y:-15.2,regY:-27.2,x:55.85}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:13.9848,x:-19.9,y:56.3,regY:-45.1}},{t:this.instance,p:{rotation:-33.6178,x:63.15,y:45.65,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-47.5957,y:-33.45,x:53.05,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:-7.6526,x:33.95,y:-31.75}},{t:this.instance_9,p:{rotation:-8.6689,x:34.75,y:36.3,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:-8.1042,x:-49.55,y:-14.7,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-34.01,x:-41.3,y:43.95,regY:-52.9,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:13.6879,x:-35.4,y:-39.35}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.3732,x:-58.95,y:-73.5,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:19.5189,x:2.3,y:2.05,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.7,scaleX:0.9974,scaleY:0.9974,rotation:-14.0222,y:-15.2,regY:-27.2,x:55.8}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:9.1557,x:-18.2,y:56.95,regY:-45.1}},{t:this.instance,p:{rotation:-38.5024,x:63.35,y:45.55,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-48.0653,y:-33.45,x:53.1,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:-6.0239,x:33.9,y:-31.75}},{t:this.instance_9,p:{rotation:-8.0946,x:32.9,y:36.35,regY:-40.1,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:-5.8077,x:-49.55,y:-14.7,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-35.4529,x:-43.7,y:44.1,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.8,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:12.4276,x:-35.3,y:-39.3}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.1156,x:-59.7,y:-72.95,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:17.7781,x:2.35,y:2.1,regX:0.6,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:-14.2025,y:-15.25,regY:-27.2,x:55.95}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:4.3254,x:-16.5,y:57.55,regY:-45.1}},{t:this.instance,p:{rotation:-43.3877,x:63.6,y:45.55,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-48.5364,y:-33.4,x:53.05,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:-4.3966,x:33.9,y:-31.7}},{t:this.instance_9,p:{rotation:-7.52,x:30.95,y:36.15,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:-3.5088,x:-49.5,y:-14.7,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-36.8951,x:-46.1,y:44.4,regY:-53,regX:-5}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:11.1663,x:-35.4,y:-39.3}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:-0.1367,x:-60.4,y:-72.4,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:16.0376,x:2.5,y:2.05,regX:0.6,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:-14.3819,y:-15.4,regY:-27.3,x:55.85}},{t:this.instance_1,p:{regX:11.3,scaleX:0.9978,scaleY:0.9978,rotation:-0.5003,x:-15,y:58.05,regY:-45.1}},{t:this.instance,p:{rotation:-48.2724,x:63.8,y:45.45,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-49.007,y:-33.35,x:53.1,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:-2.7676,x:33.9,y:-31.7}},{t:this.instance_9,p:{rotation:-6.9473,x:29,y:36.05,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.6,scaleX:0.9983,scaleY:0.9983,rotation:-1.2122,x:-49.5,y:-14.85,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-38.339,x:-48.45,y:44.45,regY:-53,regX:-5}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:9.905,x:-35.4,y:-39.3}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:-0.3934,x:-61.2,y:-71.8,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:14.2967,x:2.35,y:2.05,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:-14.5603,y:-15.25,regY:-27.2,x:55.9}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:-5.3306,x:-13.1,y:58.5,regY:-45.1}},{t:this.instance,p:{rotation:-53.1573,x:64,y:45.5,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.4,rotation:-49.478,y:-33.5,x:53.15,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:-1.1398,x:33.95,y:-31.7}},{t:this.instance_9,p:{rotation:-6.3732,x:27.05,y:35.9,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.6,scaleX:0.9983,scaleY:0.9983,rotation:1.0825,x:-49.55,y:-14.85,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-39.7813,x:-50.7,y:44.45,regY:-52.9,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:8.6442,x:-35.4,y:-39.3}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:-0.651,x:-61.85,y:-71.2,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:12.5559,x:2.4,y:2,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:-14.7404,y:-15.3,regY:-27.2,x:55.95}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:-10.1599,x:-11.45,y:58.9,regY:-45.1}},{t:this.instance,p:{rotation:-58.0419,x:64.25,y:45.4,regX:7.6,scaleX:0.9966,scaleY:0.9966,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-49.5128,y:-33.35,x:53.1,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:0.2176,x:33.9,y:-31.7}},{t:this.instance_9,p:{rotation:-3.1149,x:25.5,y:35.85,regY:-40.1,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:4.4991,x:-49.7,y:-14.75,regX:-15.4}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-38.8196,x:-54.25,y:44.25,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:8.4475,x:-35.35,y:-39.3}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.1954,x:-61.95,y:-71.3,regY:17.2,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:15.7136,x:2.55,y:2.05,regX:0.6,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:-12.0041,y:-15.25,regY:-27.2,x:56}},{t:this.instance_1,p:{regX:11.5,scaleX:0.9978,scaleY:0.9978,rotation:-13.1313,x:-14.4,y:58.15,regY:-45.1}},{t:this.instance,p:{rotation:-50.2841,x:61.25,y:45.8,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-49.5464,y:-33.3,x:53.05,regY:-32,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:1.5778,x:33.9,y:-31.65}},{t:this.instance_9,p:{rotation:0.1394,x:23.9,y:35.5,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:7.9158,x:-49.5,y:-14.7,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-37.8587,x:-57.8,y:43.8,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.6,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:8.2491,x:-35.5,y:-39.35}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:1.0452,x:-62,y:-71.05,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:18.8726,x:2.35,y:2.05,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:-9.2675,y:-15.3,regY:-27.3,x:55.95}},{t:this.instance_1,p:{regX:11.5,scaleX:0.9978,scaleY:0.9978,rotation:-16.1016,x:-17.55,y:57.05,regY:-45.1}},{t:this.instance,p:{rotation:-42.5262,x:58.35,y:45.9,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-49.5811,y:-33.3,x:53.05,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:2.9389,x:33.9,y:-31.65}},{t:this.instance_9,p:{rotation:3.3986,x:22.35,y:35.25,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:11.33,x:-49.55,y:-14.7,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-36.8964,x:-61.25,y:43.25,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:8.0524,x:-35.35,y:-39.35}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:1.8944,x:-62.15,y:-71.05,regY:17.2,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:22.0304,x:2.4,y:2.05,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:-6.5302,y:-15.2,regY:-27.2,x:55.9}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:-19.0736,x:-20.6,y:55.85,regY:-45.1}},{t:this.instance,p:{rotation:-34.7672,x:55.35,y:45.95,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-49.6165,y:-33.3,x:53.15,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-28.9,scaleX:0.9964,scaleY:0.9964,rotation:4.2999,x:33.9,y:-31.5}},{t:this.instance_9,p:{rotation:6.6575,x:20.7,y:35.1,regY:-40.1,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:14.7468,x:-49.55,y:-14.75,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-35.9366,x:-64.75,y:42.35,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:7.8552,x:-35.4,y:-39.35}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:2.7441,x:-62.3,y:-70.85,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:25.1883,x:2.4,y:2.05,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:-3.7946,y:-15.25,regY:-27.2,x:55.95}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:-22.044,x:-23.45,y:54.65,regY:-45}},{t:this.instance,p:{rotation:-27.0091,x:52.45,y:45.9,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-49.6495,y:-33.25,x:53.1,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:5.6606,x:33.9,y:-31.6}},{t:this.instance_9,p:{rotation:9.9168,x:19.1,y:34.65,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9982,scaleY:0.9982,rotation:18.1635,x:-49.55,y:-14.75,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-34.9751,x:-68.05,y:41.45,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15.1,scaleX:0.9977,scaleY:0.9977,rotation:7.6579,x:-35.35,y:-39.2}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:3.5944,x:-62.55,y:-70.75,regY:17.3,regX:21.8}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:28.3455,x:2.45,y:2.15,regX:0.6,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9975,scaleY:0.9975,rotation:-1.0563,y:-15.3,regY:-27.2,x:55.95}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:-25.0151,x:-26.45,y:53.05,regY:-45.1}},{t:this.instance,p:{rotation:-19.2522,x:49.5,y:45.65,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-49.6849,y:-33.25,x:53.1,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:7.022,x:33.95,y:-31.6}},{t:this.instance_9,p:{rotation:13.1754,x:17.55,y:34.4,regY:-40.1,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.6,scaleX:0.9983,scaleY:0.9983,rotation:21.5807,x:-49.55,y:-14.85,regX:-15.4}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-34.0137,x:-71.35,y:40.3,regY:-52.9,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:7.4608,x:-35.4,y:-39.3}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:4.4437,x:-62.45,y:-70.65,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:31.5034,x:2.45,y:2.1,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9975,scaleY:0.9975,rotation:1.6761,y:-15.25,regY:-27.2,x:56}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:-27.9872,x:-29.1,y:51.35,regY:-45.1}},{t:this.instance,p:{rotation:-11.4952,x:46.6,y:45.3,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-49.7185,y:-33.25,x:53.15,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.8,regY:-29.1,scaleX:0.9964,scaleY:0.9964,rotation:8.3829,x:33.8,y:-31.7}},{t:this.instance_9,p:{rotation:16.4335,x:16.15,y:33.8,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:24.9966,x:-49.55,y:-14.75,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-33.0533,x:-74.65,y:38.75,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:7.2637,x:-35.4,y:-39.3}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:5.2938,x:-62.6,y:-70.55,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:34.6622,x:2.3,y:2.15,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:4.4124,y:-15.3,regY:-27.2,x:55.95}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:-30.9573,x:-31.85,y:49.5,regY:-45.1}},{t:this.instance,p:{rotation:-3.7368,x:43.65,y:44.8,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.4,rotation:-49.754,y:-33.35,x:53.15,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29.1,scaleX:0.9964,scaleY:0.9964,rotation:9.7432,x:33.9,y:-31.7}},{t:this.instance_9,p:{rotation:19.6931,x:14.55,y:33.4,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:28.4124,x:-49.5,y:-14.8,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-32.0911,x:-77.9,y:37.3,regY:-53,regX:-5}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:7.065,x:-35.35,y:-39.3}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:6.1446,x:-62.7,y:-70.4,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:37.8201,x:2.35,y:2.1,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:7.149,y:-15.25,regY:-27.2,x:55.9}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:-33.9277,x:-34.35,y:47.55,regY:-45.1}},{t:this.instance,p:{rotation:4.0172,x:40.85,y:44.05,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-49.7881,y:-33.2,x:53.05,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:11.1046,x:33.85,y:-31.55}},{t:this.instance_9,p:{rotation:22.9523,x:13,y:33,regY:-40.2,scaleX:0.9968,scaleY:0.9968}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:31.8286,x:-49.55,y:-14.75,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-31.1301,x:-80.8,y:35.45,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:6.869,x:-35.4,y:-39.35}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:6.9939,x:-62.75,y:-70.35,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:40.9779,x:2.5,y:2.2,regX:0.6,regY:-26.8}},{t:this.instance_2,p:{regX:2.7,scaleX:0.9974,scaleY:0.9974,rotation:9.8871,y:-15.4,regY:-27.3,x:55.85}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:-36.8995,x:-36.85,y:45.45,regY:-45.1}},{t:this.instance,p:{rotation:11.7754,x:37.95,y:43.3,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-49.8235,y:-33.25,x:53.1,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:12.4653,x:33.9,y:-31.55}},{t:this.instance_9,p:{rotation:26.2105,x:11.5,y:32.45,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:35.2451,x:-49.65,y:-14.85,regX:-15.4}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-30.1689,x:-83.75,y:33.45,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:6.6713,x:-35.35,y:-39.35}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:7.8445,x:-62.9,y:-70.2,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:44.1371,x:2.35,y:2.15,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:12.623,y:-15.3,regY:-27.2,x:56}},{t:this.instance_1,p:{regX:11.5,scaleX:0.9978,scaleY:0.9978,rotation:-39.87,x:-39.1,y:43.25,regY:-45.1}},{t:this.instance,p:{rotation:19.5329,x:35.15,y:42.35,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-48.9934,y:-33.3,x:53.1,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:12.8493,x:33.9,y:-31.55}},{t:this.instance_9,p:{rotation:22.8021,x:11.1,y:32.25,regY:-40.2,scaleX:0.9968,scaleY:0.9968}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9982,scaleY:0.9982,rotation:33.4634,x:-49.55,y:-14.8,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-23.9376,x:-82.15,y:34.55,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:7.0871,x:-35.4,y:-39.3}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:7.5308,x:-62.65,y:-70.5,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:44.2827,x:2.35,y:2.15,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:13.2543,y:-15.3,regY:-27.2,x:55.85}},{t:this.instance_1,p:{regX:11.5,scaleX:0.9978,scaleY:0.9978,rotation:-32.0672,x:-39.2,y:43.15,regY:-45.1}},{t:this.instance,p:{rotation:20.8817,x:34.65,y:42.2,regX:7.6,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-48.1627,y:-33.25,x:53.05,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29.1,scaleX:0.9964,scaleY:0.9964,rotation:13.232,x:33.95,y:-31.6}},{t:this.instance_9,p:{rotation:19.3927,x:10.6,y:32.15,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:31.6816,x:-49.55,y:-14.75,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-17.7051,x:-80.7,y:35.5,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:7.5058,x:-35.4,y:-39.3}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:7.2179,x:-62.45,y:-70.55,regY:17.4,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:44.4264,x:2.35,y:2.15,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.7,scaleX:0.9974,scaleY:0.9974,rotation:13.8866,y:-15.35,regY:-27.2,x:55.8}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:-24.2655,x:-39.4,y:43.1,regY:-45.1}},{t:this.instance,p:{rotation:22.2324,x:33.85,y:42,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-47.3328,y:-33.25,x:53.1,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:13.6181,x:33.9,y:-31.5}},{t:this.instance_9,p:{rotation:15.985,x:10.3,y:31.95,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:29.9008,x:-49.6,y:-14.85,regX:-15.4}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-11.4742,x:-79.1,y:36.35,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:7.9233,x:-35.35,y:-39.35}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:6.9039,x:-62.15,y:-70.8,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:44.572,x:2.35,y:2.15,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:14.5159,y:-15.3,regY:-27.2,x:55.95}},{t:this.instance_1,p:{regX:11.3,scaleX:0.9978,scaleY:0.9978,rotation:-16.464,x:-39.5,y:43.1,regY:-45}},{t:this.instance,p:{rotation:23.5811,x:33.25,y:41.65,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.4,rotation:-46.502,y:-33.35,x:53.2,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:14.0016,x:33.85,y:-31.5}},{t:this.instance_9,p:{rotation:12.5763,x:9.8,y:31.85,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:28.119,x:-49.5,y:-14.85,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-5.2419,x:-77.4,y:37.25,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:8.3403,x:-35.4,y:-39.3}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:6.5906,x:-62.1,y:-71.05,regY:17.3,regX:21.8}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:44.7169,x:2.35,y:2.15,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:15.1477,y:-15.4,regY:-27.3,x:55.9}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:-8.6607,x:-39.55,y:42.85,regY:-45.1}},{t:this.instance,p:{rotation:24.9301,x:32.6,y:41.45,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-45.6723,y:-33.2,x:53.05,regY:-32,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_10,p:{regX:1.9,regY:-29.1,scaleX:0.9964,scaleY:0.9964,rotation:14.3859,x:33.9,y:-31.6}},{t:this.instance_9,p:{rotation:9.1663,x:9.4,y:31.65,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:26.3375,x:-49.5,y:-14.85,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:0.9846,x:-75.85,y:38.1,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:8.7567,x:-35.4,y:-39.35}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:6.2759,x:-61.85,y:-71.25,regY:17.3,regX:21.8}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:44.8631,x:2.35,y:2.15,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:15.78,y:-15.3,regY:-27.2,x:55.95}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:-0.8587,x:-39.65,y:42.75,regY:-45.1}},{t:this.instance,p:{rotation:26.2791,x:32,y:41.1,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.4,rotation:-44.8426,y:-33.2,x:53.2,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29.1,scaleX:0.9964,scaleY:0.9964,rotation:14.7696,x:33.9,y:-31.55}},{t:this.instance_9,p:{rotation:5.7576,x:8.95,y:31.5,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:24.5558,x:-49.6,y:-14.9,regX:-15.4}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:7.2175,x:-74.1,y:38.9,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:9.1738,x:-35.4,y:-39.35}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:5.9639,x:-61.5,y:-71.6,regY:17.2,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:45.0068,x:2.35,y:2.15,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:16.4103,y:-15.25,regY:-27.2,x:55.9}},{t:this.instance_1,p:{regX:11.5,scaleX:0.9978,scaleY:0.9978,rotation:6.9387,x:-39.6,y:42.7,regY:-45.1}},{t:this.instance,p:{rotation:27.6282,x:31.3,y:40.8,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-44.0136,y:-33.1,x:53.1,regY:-32,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:15.1535,x:33.9,y:-31.45}},{t:this.instance_9,p:{rotation:2.3493,x:8.55,y:31.3,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:22.7753,x:-49.55,y:-14.85,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:13.4503,x:-72.45,y:39.6,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:9.592,x:-35.35,y:-39.35}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:5.6496,x:-61.3,y:-71.6,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:45.1536,x:2.35,y:2.15,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.7,scaleX:0.9974,scaleY:0.9974,rotation:17.0409,y:-15.3,regY:-27.2,x:55.75}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:14.7409,x:-39.8,y:42.55,regY:-45.1}},{t:this.instance,p:{rotation:28.9788,x:30.8,y:40.65,regX:7.6,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.4,rotation:-43.1818,y:-33.2,x:53.2,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:15.5375,x:33.85,y:-31.45}},{t:this.instance_9,p:{rotation:-1.056,x:8.1,y:31.2,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:20.9923,x:-49.45,y:-14.85,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:19.6807,x:-70.65,y:40.3,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:10.0082,x:-35.4,y:-39.3}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:5.3353,x:-61.05,y:-71.7,regY:17.4,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:45.2992,x:2.35,y:2.15,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:17.6721,y:-15.3,regY:-27.2,x:55.8}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:22.5434,x:-39.9,y:42.45,regY:-45.1}},{t:this.instance,p:{rotation:30.3266,x:30.1,y:40.25,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-42.3516,y:-33.15,x:53.15,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:15.9223,x:33.85,y:-31.45}},{t:this.instance_9,p:{rotation:-4.4641,x:7.7,y:30.95,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:19.211,x:-49.5,y:-14.9,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:25.9128,x:-69,y:40.9,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:10.4267,x:-35.4,y:-39.3}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:5.0229,x:-60.85,y:-72.05,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:45.4441,x:2.4,y:2.15,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:18.3027,y:-15.3,regY:-27.2,x:55.8}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:30.3448,x:-39.95,y:42.3,regY:-45.1}},{t:this.instance,p:{rotation:31.6764,x:29.55,y:40.05,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-41.5226,y:-33.1,x:53.1,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.8,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:16.3058,x:33.7,y:-31.5}},{t:this.instance_9,p:{rotation:-7.8722,x:7.3,y:30.75,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:17.4304,x:-49.5,y:-14.95,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:32.145,x:-67.2,y:41.45,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15.1,scaleX:0.9977,scaleY:0.9977,rotation:10.844,x:-35.4,y:-39.25}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:4.7091,x:-60.5,y:-72.25,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:45.5891,x:2.45,y:2.15,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:18.9339,y:-15.35,regY:-27.2,x:55.8}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:38.1473,x:-40.1,y:42.35,regY:-45}},{t:this.instance,p:{rotation:33.0256,x:29,y:39.75,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-41.088,y:-33.05,x:53.25,regY:-31.9,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:13.0916,x:33.9,y:-31.4}},{t:this.instance_9,p:{rotation:-9.5725,x:10.85,y:32.15,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:15.3038,x:-49.45,y:-14.95,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:27.2322,x:-65.1,y:42.1,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.6,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:11.344,x:-35.5,y:-39.35}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:4.7495,x:-60.3,y:-72.45,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:44.642,x:2.45,y:2.1,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:18.9757,y:-15.35,regY:-27.2,x:55.85}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:38.236,x:-39.35,y:42.9,regY:-45.1}},{t:this.instance,p:{rotation:30.8056,x:28.9,y:39.7,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-40.6557,y:-33.05,x:53.1,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:9.8776,x:33.85,y:-31.4}},{t:this.instance_9,p:{rotation:-11.2731,x:14.4,y:33.4,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.6,scaleX:0.9983,scaleY:0.9983,rotation:13.1764,x:-49.45,y:-15.1,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:22.3195,x:-62.85,y:42.65,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:11.8449,x:-35.4,y:-39.3}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:4.7909,x:-60,y:-72.75,regY:17.2,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:43.6942,x:2.4,y:2.15,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:19.0173,y:-15.35,regY:-27.2,x:55.8}},{t:this.instance_1,p:{regX:11.3,scaleX:0.9978,scaleY:0.9978,rotation:38.3251,x:-38.85,y:43.65,regY:-45}},{t:this.instance,p:{rotation:28.5865,x:28.85,y:39.7,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.4,rotation:-40.2212,y:-33.2,x:53.25,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:6.6631,x:33.9,y:-31.4}},{t:this.instance_9,p:{rotation:-12.9718,x:18.15,y:34.35,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:11.0497,x:-49.5,y:-14.95,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:17.4067,x:-60.75,y:43.1,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:12.347,x:-35.35,y:-39.35}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:4.8314,x:-59.65,y:-72.9,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:42.7472,x:2.35,y:2.25,regX:0.5,regY:-26.7}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:19.0581,y:-15.35,regY:-27.2,x:55.8}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:38.415,x:-38,y:44.25,regY:-45.1}},{t:this.instance,p:{rotation:26.3669,x:28.75,y:39.7,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-39.789,y:-33.15,x:53.1,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:3.4486,x:33.9,y:-31.4}},{t:this.instance_9,p:{rotation:-14.6721,x:21.85,y:35.1,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:8.9217,x:-49.45,y:-14.9,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:12.4943,x:-58.55,y:43.5,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15.1,scaleX:0.9977,scaleY:0.9977,rotation:12.8489,x:-35.35,y:-39.2}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:4.8718,x:-59.4,y:-73.05,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:41.7996,x:2.3,y:2.25,regX:0.5,regY:-26.7}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:19.0996,y:-15.4,regY:-27.2,x:55.85}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:38.503,x:-37.35,y:44.95,regY:-45.1}},{t:this.instance,p:{rotation:24.1478,x:28.7,y:39.65,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-39.3544,y:-33.15,x:53.1,regY:-32,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:0.2343,x:33.85,y:-31.4}},{t:this.instance_9,p:{rotation:-16.3711,x:25.65,y:35.6,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:6.7946,x:-49.5,y:-14.95,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:7.5813,x:-56.5,y:43.75,regY:-53,regX:-5}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:13.3491,x:-35.35,y:-39.35}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:4.9131,x:-59.2,y:-73.3,regY:17.3,regX:21.8}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:40.8524,x:2.5,y:2.1,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:19.1398,y:-15.4,regY:-27.2,x:55.8}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:38.5921,x:-36.55,y:45.55,regY:-45.1}},{t:this.instance,p:{rotation:21.9286,x:28.7,y:39.7,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.4,rotation:-38.921,y:-33.1,x:53.2,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:-2.9758,x:33.95,y:-31.35}},{t:this.instance_9,p:{rotation:-18.073,x:29.4,y:35.95,regY:-40.2,scaleX:0.9968,scaleY:0.9968}},{t:this.instance_8,p:{regY:-34.6,scaleX:0.9983,scaleY:0.9983,rotation:4.6687,x:-49.45,y:-15.1,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:2.669,x:-54.4,y:44,regY:-53,regX:-5}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:13.8503,x:-35.35,y:-39.3}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:4.9545,x:-58.95,y:-73.45,regY:17.3,regX:21.8}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:39.9053,x:2.45,y:2.15,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:19.1817,y:-15.35,regY:-27.2,x:55.8}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:38.6806,x:-35.9,y:46.1,regY:-45.1}},{t:this.instance,p:{rotation:19.7088,x:28.7,y:39.55,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-38.4878,y:-33.1,x:53.2,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:-6.1899,x:33.95,y:-31.35}},{t:this.instance_9,p:{rotation:-19.7713,x:33.25,y:36.1,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:2.5406,x:-49.4,y:-15,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-2.2403,x:-52.05,y:44.15,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:14.3536,x:-35.35,y:-39.3}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:4.9957,x:-58.55,y:-73.65,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:38.9568,x:2.5,y:2.15,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:19.2225,y:-15.3,regY:-27.2,x:55.8}},{t:this.instance_1,p:{regX:11.3,scaleX:0.9978,scaleY:0.9978,rotation:38.7704,x:-35.2,y:46.7,regY:-45.1}},{t:this.instance,p:{rotation:17.4896,x:28.7,y:39.65,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-38.0543,y:-33.1,x:53.1,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:-9.4052,x:33.9,y:-31.3}},{t:this.instance_9,p:{rotation:-21.4721,x:37.05,y:36.15,regY:-40.1,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:0.4151,x:-49.45,y:-15,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-7.1529,x:-49.85,y:44.15,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:14.8537,x:-35.4,y:-39.35}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:5.0363,x:-58.15,y:-73.9,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:38.0098,x:2.45,y:2.15,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:19.2635,y:-15.4,regY:-27.2,x:55.8}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:38.8595,x:-34.4,y:47.45,regY:-45.1}},{t:this.instance,p:{rotation:15.2705,x:28.7,y:39.6,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-37.6215,y:-33.05,x:53.15,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:-12.6184,x:33.9,y:-31.3}},{t:this.instance_9,p:{rotation:-23.1712,x:40.8,y:35.75,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:-1.7089,x:-49.5,y:-15,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-12.0648,x:-47.65,y:44.1,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:15.3553,x:-35.35,y:-39.3}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:5.0767,x:-58.05,y:-74,regY:17.4,regX:21.8}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:37.0621,x:2.45,y:2.15,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:19.3042,y:-15.4,regY:-27.2,x:55.8}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:38.9485,x:-33.6,y:48,regY:-45.1}},{t:this.instance,p:{rotation:13.0512,x:28.65,y:39.55,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-37.1883,y:-33.1,x:53.1,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.8,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:-15.8328,x:33.8,y:-31.35}},{t:this.instance_9,p:{rotation:-24.872,x:44.55,y:35.25,regY:-40.2,scaleX:0.9968,scaleY:0.9968}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:-3.8343,x:-49.45,y:-15,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-16.9775,x:-45.45,y:44.05,regY:-53,regX:-5}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:15.8564,x:-35.4,y:-39.3}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:5.1171,x:-57.7,y:-74.25,regY:17.3,regX:21.8}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:36.1148,x:2.5,y:2.15,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:19.3461,y:-15.35,regY:-27.2,x:55.8}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:39.0376,x:-32.8,y:48.6,regY:-45.1}},{t:this.instance,p:{rotation:10.8308,x:28.6,y:39.5,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.3}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-38.8046,y:-33.2,x:53.15,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:-15.8739,x:33.85,y:-31.45}},{t:this.instance_9,p:{rotation:-22.304,x:44.6,y:35.25,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:-6.9639,x:-49.45,y:-14.95,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-18.9679,x:-42.35,y:43.8,regY:-53,regX:-5}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:16.6856,x:-35.35,y:-39.3}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:4.4261,x:-57.1,y:-74.65,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:34.5067,x:2.35,y:2.25,regX:0.5,regY:-26.7}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:12.8406,y:-15.35,regY:-27.2,x:55.9}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:37.8765,x:-31.55,y:49.65,regY:-45.1}},{t:this.instance,p:{rotation:5.8001,x:35,y:42.35,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-40.4188,y:-33.2,x:53.15,regY:-32,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:-15.9159,x:33.85,y:-31.55}},{t:this.instance_9,p:{rotation:-19.7349,x:44.65,y:35.3,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:-10.094,x:-49.65,y:-14.8,regX:-15.4}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-20.9586,x:-39.1,y:43.3,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:17.5146,x:-35.4,y:-39.35}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:3.7357,x:-56.55,y:-74.95,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:32.8997,x:2.4,y:2.1,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:6.3352,y:-15.25,regY:-27.2,x:55.95}},{t:this.instance_1,p:{regX:11.3,scaleX:0.9978,scaleY:0.9978,rotation:36.7148,x:-30.35,y:50.55,regY:-45.1}},{t:this.instance,p:{rotation:0.7684,x:41.7,y:44.35,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-42.0334,y:-33.25,x:53.15,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:-15.9581,x:33.85,y:-31.7}},{t:this.instance_9,p:{rotation:-17.1666,x:44.6,y:35.35,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.6,scaleX:0.9983,scaleY:0.9983,rotation:-13.2223,x:-49.55,y:-14.85,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-22.9494,x:-36.1,y:42.75,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:18.3424,x:-35.4,y:-39.25}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:3.045,x:-56.1,y:-75.3,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:31.2904,x:2.4,y:2.1,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:-0.1657,y:-15.25,regY:-27.2,x:55.9}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:35.5541,x:-28.95,y:51.55,regY:-45.1}},{t:this.instance,p:{rotation:-4.26,x:48.6,y:45.7,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-43.6486,y:-33.3,x:53.2,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:-15.9991,x:33.85,y:-31.8}},{t:this.instance_9,p:{rotation:-14.5993,x:44.7,y:35.35,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:-16.3513,x:-49.55,y:-14.75,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-24.938,x:-33.05,y:42,regY:-53,regX:-5}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:19.1699,x:-35.4,y:-39.3}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:2.3539,x:-55.5,y:-75.6,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:29.6829,x:2.3,y:2.1,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9975,scaleY:0.9975,rotation:-6.6712,y:-15.15,regY:-27.2,x:55.9}},{t:this.instance_1,p:{regX:11.5,scaleX:0.9978,scaleY:0.9978,rotation:34.3914,x:-27.45,y:52.55,regY:-45.1}},{t:this.instance,p:{rotation:-9.2914,x:55.55,y:46.15,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-45.2627,y:-33.45,x:53.1,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.8,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:-16.0408,x:33.75,y:-31.85}},{t:this.instance_9,p:{rotation:-12.0298,x:44.65,y:35.35,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:-19.4802,x:-49.65,y:-14.6,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-26.9266,x:-30,y:41.05,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:20.0521,x:-35.4,y:-39.3}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:1.7156,x:-55,y:-75.9,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:28.0747,x:2.25,y:2.1,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:-13.1761,y:-15.2,regY:-27.2,x:55.95}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:33.232,x:-26.15,y:53.3,regY:-45.1}},{t:this.instance,p:{rotation:-14.322,x:62.45,y:45.8,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-105.3,-191.2,225.1,302.29999999999995);


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
	this.instance_1 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_1.setTransform(-0.15,51.35,0.999,0.999,2.3215,0,0,0.9,52.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-80.2,-71.5,171.10000000000002,152.5);


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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_11,p:{scaleX:0.9976,scaleY:0.9976,rotation:-38.5177,y:-29.5,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-14.7197,x:68.4,y:28.05,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9993,scaleY:0.9993,rotation:-1.9365,x:55.85,y:-37.25,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-24.7536,x:-35.3,y:-9.45,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.6,regY:-38.1,scaleX:0.9993,scaleY:0.9993,rotation:-24.9747,x:-12.15,y:54.2}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.999,scaleY:0.999,rotation:19.9889,x:-57.75,y:-33.7,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-11.7605,x:-63.7,y:-67.4,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:6.6753,x:0.6,y:3.75,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:1.9,regY:-28.2,scaleX:0.9985,scaleY:0.9985,rotation:-11.9453,x:53.6,y:-21.25}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.9991,scaleY:0.9991,rotation:7.1205,x:-13.95,y:65.7,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:4.4785,x:58.25,y:46,scaleX:0.9978,scaleY:0.9978}}]}).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-37.89,y:-29.5,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.0915,x:67.75,y:28.4,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-2.4164,x:55.8,y:-37.15,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-23.2952,x:-35.2,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-26.3706,x:-13.8,y:54.7}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.4693,x:-57.65,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-12.0932,x:-64,y:-67.3,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:6.0145,x:0.7,y:3.65,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-12.8634,x:53.7,y:-21.25}},{t:this.instance_1,p:{regY:-38.9,scaleX:0.999,scaleY:0.999,rotation:5.5774,x:-13.1,y:65.65,regX:3.9}},{t:this.instance,p:{regX:4.8,rotation:3.1315,x:59.4,y:45.85,scaleX:0.9978,scaleY:0.9978}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-37.262,y:-29.5,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-13.4645,x:67.1,y:28.85,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9992,scaleY:0.9992,rotation:-2.8973,x:55.8,y:-37.25,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-21.8363,x:-35.35,y:-9.45,regX:-1.1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-27.77,x:-15.4,y:55.25}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:18.9517,x:-57.75,y:-33.5,regY:12.9,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-12.4274,x:-64.3,y:-67.25,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:5.3542,x:0.7,y:3.8,regY:-25,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.2,scaleX:0.9984,scaleY:0.9984,rotation:-13.7833,x:53.7,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:4.0351,x:-12.35,y:65.9,regX:3.9}},{t:this.instance,p:{regX:4.8,rotation:1.7825,x:60.5,y:45.75,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-36.6343,y:-29.45,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-12.8347,x:66.5,y:29.2,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.3793,x:55.8,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-20.3772,x:-35.25,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-29.1681,x:-17.05,y:55.7}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:18.4322,x:-57.75,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-12.7619,x:-64.55,y:-67.2,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:4.6927,x:0.7,y:3.7,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-14.7021,x:53.75,y:-21.3}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:2.4932,x:-11.7,y:66.05,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:0.4338,x:61.45,y:45.7,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-36.0059,y:-29.45,x:32.45,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-12.2076,x:65.85,y:29.55,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.8588,x:56,y:-37.1,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-18.919,x:-35.25,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-30.567,x:-18.75,y:56.15}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:17.9135,x:-57.85,y:-33.65,regY:12.8,regX:9.6}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-13.0958,x:-64.9,y:-67.1,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:4.0319,x:0.7,y:3.7,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-15.6212,x:53.7,y:-21.3}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:0.9496,x:-10.95,y:66.15,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-0.9096,x:62.5,y:45.55,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-35.378,y:-29.45,x:32.45,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-11.58,x:65.15,y:29.95,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-4.3404,x:55.95,y:-37,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-17.4606,x:-35.25,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-31.9654,x:-20.4,y:56.45}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:17.3953,x:-57.65,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-13.4313,x:-65.2,y:-67.05,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:3.3708,x:0.65,y:3.65,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:1.9,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-16.5406,x:53.5,y:-21.3}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-0.5881,x:-10.2,y:66.3,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-2.2596,x:63.6,y:45.3,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-34.7507,y:-29.45,x:32.45,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-10.951,x:64.5,y:30.3,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-4.8205,x:55.9,y:-37.05,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-16.0016,x:-35.25,y:-9.45,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-33.3642,x:-22.1,y:56.85}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:16.876,x:-57.8,y:-33.45,regY:12.9,regX:9.6}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-13.7662,x:-65.5,y:-67.05,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:2.7101,x:0.65,y:3.65,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-17.4591,x:53.7,y:-21.3}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-2.1306,x:-9.5,y:66.4,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-3.6065,x:64.65,y:45.15,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-34.1228,y:-29.35,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-10.3236,x:63.9,y:30.65,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-5.3027,x:55.9,y:-37.05,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-14.5435,x:-35.25,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-34.762,x:-23.8,y:57.15}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:16.3584,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-14.0997,x:-65.8,y:-66.85,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:2.0488,x:0.65,y:3.65,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-18.3782,x:53.7,y:-21.3}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-3.6737,x:-8.75,y:66.5,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-4.9553,x:65.65,y:45,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-33.4949,y:-29.4,x:32.45,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-9.6955,x:63.4,y:30.95,regX:4.6}},{t:this.instance_9,p:{regY:-36,scaleX:0.9993,scaleY:0.9993,rotation:-5.7835,x:55.9,y:-37,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-13.0842,x:-35.15,y:-9.4,regX:-1,regY:-28}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-36.161,x:-25.55,y:57.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:15.839,x:-57.7,y:-33.45,regY:12.9,regX:9.7}},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-14.4347,x:-66.1,y:-66.85,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:1.3879,x:0.65,y:3.8,regY:-25,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-19.2973,x:53.75,y:-21.35}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-5.2159,x:-8.05,y:66.65,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-6.3033,x:66.75,y:44.8,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-32.8679,y:-29.35,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-9.0658,x:62.6,y:31.3,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-6.2648,x:55.75,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-11.6254,x:-35.25,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-37.559,x:-27.25,y:57.6}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:15.3202,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-14.7686,x:-66.4,y:-66.75,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:0.7272,x:0.65,y:3.6,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.2,scaleX:0.9984,scaleY:0.9984,rotation:-20.2166,x:53.6,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-6.7576,x:-7.35,y:66.75,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-7.6524,x:67.8,y:44.6,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-32.2392,y:-29.4,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-8.4393,x:61.95,y:31.65,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9993,scaleY:0.9993,rotation:-6.7455,x:55.7,y:-37,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-10.1668,x:-35.25,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-38.9577,x:-28.95,y:57.75}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:14.8026,x:-57.8,y:-33.6,regY:12.8,regX:9.6}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-15.103,x:-66.65,y:-66.55,regY:11.6,regX:12.6}},{t:this.instance_3,p:{rotation:0.0656,x:0.7,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-21.1358,x:53.7,y:-21.3}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-8.3016,x:-6.65,y:66.85,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-9.0012,x:68.85,y:44.3,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-31.611,y:-29.4,x:32.45,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-7.812,x:61.25,y:31.9,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-7.2261,x:55.75,y:-37,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-8.7083,x:-35.2,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-40.3565,x:-30.65,y:57.9}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:14.2829,x:-57.8,y:-33.45,regY:12.9,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-15.4376,x:-66.95,y:-66.6,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-0.5906,x:0.7,y:3.6,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-22.0546,x:53.65,y:-21.35}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-9.8439,x:-5.9,y:66.85,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-10.3496,x:69.85,y:44.05,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-30.9837,y:-29.4,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-7.1847,x:60.55,y:32.25,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-7.708,x:55.9,y:-37,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-7.249,x:-35.35,y:-9.4,regX:-1.1,regY:-28}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-41.7544,x:-32.4,y:58}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:13.7649,x:-57.7,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-15.7718,x:-67.4,y:-66.45,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-1.2514,x:0.7,y:3.65,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.2,scaleX:0.9984,scaleY:0.9984,rotation:-22.9736,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-11.386,x:-5.2,y:66.95,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-11.6985,x:70.95,y:43.8,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-30.3565,y:-29.45,x:32.4,regY:-29.3,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5554,x:59.85,y:32.55,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-8.1885,x:55.85,y:-36.95,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-5.791,x:-35.35,y:-9.55,regX:-1.1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-43.1529,x:-34.1,y:58}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:13.2463,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-16.107,x:-67.5,y:-66.35,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-1.9131,x:0.7,y:3.8,regY:-25,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-23.893,x:53.7,y:-21.35}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-12.9293,x:-4.5,y:67,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-13.0462,x:71.95,y:43.5,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-29.7286,y:-29.35,x:32.35,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-5.928,x:59.25,y:32.85,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-8.6689,x:55.75,y:-36.95,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-4.3324,x:-35.15,y:-9.4,regX:-1,regY:-28}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-44.5508,x:-35.85,y:58.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:12.7274,x:-57.8,y:-33.65,regY:12.8,regX:9.6}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-16.4418,x:-67.85,y:-66.3,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-2.5734,x:0.7,y:3.65,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-24.8139,x:53.7,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.4716,x:-3.9,y:67.05,regX:3.8}},{t:this.instance,p:{regX:4.7,rotation:-14.3948,x:73,y:43.2,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-28.9069,y:-29.35,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-5.6762,x:58.35,y:33.2,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-8.4672,x:55.75,y:-36.95,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-4.0508,x:-35.25,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-42.756,x:-36.2,y:58}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:12.9633,x:-57.65,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-16.0989,x:-67.7,y:-66.3,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-3.0562,x:0.7,y:3.6,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-25.3561,x:53.7,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.4419,x:-3.3,y:67.1,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-14.2337,x:73.6,y:43,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-28.0849,y:-29.35,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-5.4236,x:57.35,y:33.6,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-8.2672,x:55.85,y:-36.95,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-3.7685,x:-35.25,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.1,scaleX:0.9992,scaleY:0.9992,rotation:-40.9615,x:-36.45,y:58.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:13.199,x:-57.65,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-15.7582,x:-67.7,y:-66.35,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-3.5374,x:0.75,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-25.8973,x:53.7,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.413,x:-2.8,y:67.15,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-14.0726,x:74.15,y:42.85,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-27.2624,y:-29.35,x:32.35,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-5.172,x:56.5,y:33.95,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-8.0648,x:55.75,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-3.487,x:-35.15,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-39.1668,x:-36.9,y:58}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:13.4353,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-15.4176,x:-67.4,y:-66.45,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-4.0196,x:0.75,y:3.65,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-26.4401,x:53.65,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.3831,x:-2.25,y:67.15,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-13.913,x:74.8,y:42.6,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-26.4408,y:-29.45,x:32.35,regY:-29.3,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-4.9205,x:55.6,y:34.25,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-7.8616,x:55.85,y:-36.9,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-3.205,x:-35.2,y:-9.6,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.6,regY:-38.1,scaleX:0.9992,scaleY:0.9992,rotation:-37.3718,x:-37.1,y:58.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:13.6715,x:-57.85,y:-33.6,regY:12.8,regX:9.6}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-15.0758,x:-67.3,y:-66.4,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-4.5014,x:0.8,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-26.9821,x:53.65,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.3542,x:-1.65,y:67.15,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-13.7515,x:75.4,y:42.45,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-25.6188,y:-29.3,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-4.6682,x:54.85,y:34.6,regX:4.6}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-7.6603,x:55.75,y:-36.95,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-2.9229,x:-35.2,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-35.5774,x:-37.55,y:57.95}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:13.9082,x:-57.8,y:-33.65,regY:12.8,regX:9.6}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-14.734,x:-67.2,y:-66.5,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-4.9834,x:0.7,y:3.6,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-27.5257,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.3253,x:-1.1,y:67.2,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-13.5916,x:76,y:42.2,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-24.7971,y:-29.4,x:32.3,regY:-29.3,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-4.4168,x:53.8,y:34.95,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-7.4581,x:55.85,y:-36.85,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-2.64,x:-35.25,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.1,scaleX:0.9992,scaleY:0.9992,rotation:-33.7833,x:-37.75,y:58.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:14.1439,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-14.3924,x:-66.9,y:-66.45,regY:11.6,regX:12.6}},{t:this.instance_3,p:{rotation:-5.465,x:0.7,y:3.75,regY:-25,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-28.0686,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.2954,x:-0.5,y:67.2,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-13.4305,x:76.6,y:42,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-23.9753,y:-29.3,x:32.35,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-4.1638,x:53,y:35.15,regX:4.6}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9992,scaleY:0.9992,rotation:-7.2561,x:55.7,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-2.3572,x:-35.2,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-31.9879,x:-38.15,y:57.95}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:14.3799,x:-57.7,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-14.0511,x:-66.85,y:-66.6,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-5.9477,x:0.7,y:3.6,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-28.6105,x:53.6,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.2665,x:0,y:67.2,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-13.2703,x:77.2,y:41.75,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-23.1522,y:-29.45,x:32.3,regY:-29.3,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-3.9127,x:52.05,y:35.5,regX:4.6}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-7.0551,x:55.75,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-2.0753,x:-35.2,y:-9.4,regX:-1,regY:-28}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-30.1936,x:-38.5,y:57.95}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:14.6164,x:-57.75,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-13.7104,x:-66.7,y:-66.6,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-6.4301,x:0.75,y:3.75,regY:-25,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-29.1533,x:53.65,y:-21.35}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.2377,x:0.55,y:67.25,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-13.1083,x:77.85,y:41.6,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-22.3312,y:-29.4,x:32.35,regY:-29.3,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-3.6598,x:51,y:35.75,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-6.8532,x:55.7,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-1.7935,x:-35.25,y:-9.4,regX:-1,regY:-28}},{t:this.instance_7,p:{regX:3.6,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-28.3986,x:-38.8,y:57.85}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:14.8533,x:-57.85,y:-33.65,regY:12.8,regX:9.6}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-13.3691,x:-66.6,y:-66.6,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-6.9102,x:0.75,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-29.6959,x:53.6,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.208,x:1.05,y:67.15,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-12.9484,x:78.45,y:41.35,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-21.5093,y:-29.4,x:32.35,regY:-29.3,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-3.408,x:50.05,y:36.05,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9992,scaleY:0.9992,rotation:-6.6514,x:55.75,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-1.5117,x:-35.2,y:-9.6,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-26.6034,x:-39.15,y:57.9}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:15.0888,x:-57.75,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-13.0275,x:-66.45,y:-66.65,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-7.3934,x:0.7,y:3.65,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-30.2373,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.1791,x:1.55,y:67.15,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-12.788,x:79,y:41.05,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-20.686,y:-29.35,x:32.35,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-3.1569,x:49.25,y:36.3,regX:4.6}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-6.4489,x:55.7,y:-36.85,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-1.2291,x:-35.2,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.8106,x:-39.55,y:57.9}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:15.3257,x:-57.7,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-12.6865,x:-66.3,y:-66.7,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-7.8754,x:0.7,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-30.7798,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.15,x:2.1,y:67.15,regX:3.9}},{t:this.instance,p:{regX:4.8,rotation:-12.6273,x:79.7,y:40.8,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-19.8649,y:-29.35,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-2.9043,x:48.2,y:36.45,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-6.2473,x:55.75,y:-36.95,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-0.9474,x:-35.15,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-23.0149,x:-39.8,y:57.85}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:15.5616,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-12.3438,x:-66.15,y:-66.75,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-8.3572,x:0.7,y:3.6,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-31.3234,x:53.65,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.1201,x:2.65,y:67.1,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-12.4657,x:80.2,y:40.6,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-19.0444,y:-29.35,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-2.6518,x:47.25,y:36.75,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-6.0466,x:55.7,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-0.6648,x:-35.35,y:-9.6,regX:-1.1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-21.2212,x:-40.2,y:57.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:15.7972,x:-57.8,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-12.0044,x:-66,y:-66.8,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-8.8387,x:0.7,y:3.55,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-31.8659,x:53.65,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.0914,x:3.15,y:67.1,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-12.306,x:80.8,y:40.3,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-18.2218,y:-29.25,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-2.4001,x:46.4,y:36.9,regX:4.6}},{t:this.instance_9,p:{regY:-36,scaleX:0.9993,scaleY:0.9993,rotation:-5.8442,x:55.75,y:-36.95,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-0.3823,x:-35.2,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-19.4261,x:-40.5,y:57.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:16.0338,x:-57.7,y:-33.5,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-11.663,x:-65.85,y:-66.85,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-9.3216,x:0.7,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-32.4081,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.0617,x:3.75,y:67.15,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-12.1455,x:81.4,y:40.05,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-17.3989,y:-29.3,x:32.35,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-2.1485,x:45.35,y:37.15,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9993,scaleY:0.9993,rotation:-5.6419,x:55.7,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-0.0997,x:-35.2,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.6,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-17.6317,x:-40.65,y:57.7}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:16.27,x:-57.7,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-11.3225,x:-65.75,y:-66.85,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-9.8025,x:0.7,y:3.75,regY:-25,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-32.95,x:53.7,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.0331,x:4.25,y:67.05,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-11.9832,x:81.9,y:39.8,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-16.5779,y:-29.25,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-1.8969,x:44.4,y:37.3,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-5.4408,x:55.75,y:-36.85,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:0.1776,x:-35.15,y:-9.6,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-15.8365,x:-41.15,y:57.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:16.5073,x:-57.75,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-10.9811,x:-65.65,y:-66.95,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-10.2843,x:0.7,y:3.65,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:1.9,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-33.4926,x:53.55,y:-21.35}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.0042,x:4.75,y:67,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-11.8239,x:82.55,y:39.55,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-15.7555,y:-29.3,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-1.6445,x:43.4,y:37.45,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-5.2385,x:55.75,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:0.4592,x:-35.35,y:-9.55,regX:-1.1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-14.0424,x:-41.5,y:57.65}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:16.7422,x:-57.7,y:-33.45,regY:12.9,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-10.6379,x:-65.6,y:-66.9,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-10.7675,x:0.7,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-34.0357,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-13.9753,x:5.35,y:67,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-11.6627,x:83.1,y:39.2,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-14.9348,y:-29.3,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-1.3921,x:42.5,y:37.65,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-5.0374,x:55.75,y:-36.85,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:0.7427,x:-35.25,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-12.247,x:-41.8,y:57.65}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:16.9787,x:-57.75,y:-33.5,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-10.2979,x:-65.3,y:-66.95,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-11.2488,x:0.7,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-34.578,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-13.9462,x:5.85,y:66.95,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-11.5019,x:83.65,y:38.95,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-14.1126,y:-29.3,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-1.1406,x:41.5,y:37.8,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-4.8346,x:55.7,y:-36.95,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:1.0235,x:-35.2,y:-9.6,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.6,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-10.4533,x:-42,y:57.6}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:17.2151,x:-57.7,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-9.9566,x:-65.15,y:-67,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-11.7311,x:0.7,y:3.65,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-35.1209,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-13.9167,x:6.45,y:66.9,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-11.3419,x:84.25,y:38.7,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-13.291,y:-29.3,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-0.8892,x:40.55,y:37.95,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-4.6336,x:55.8,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:1.3061,x:-35.2,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-8.6576,x:-42.5,y:57.55}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:17.4515,x:-57.75,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-9.6156,x:-65.2,y:-67,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-12.2131,x:0.7,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-35.664,x:53.65,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-13.8877,x:7,y:66.85,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-11.1804,x:84.85,y:38.4,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-12.4671,y:-29.4,x:32.35,regY:-29.3,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-0.6369,x:39.65,y:38.05,regX:4.6}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-4.4325,x:55.7,y:-36.85,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:1.5896,x:-35.15,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-6.8638,x:-42.85,y:57.55}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:17.6876,x:-57.7,y:-33.4,regY:12.9,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-9.274,x:-65.05,y:-66.9,regY:11.6,regX:12.5}},{t:this.instance_3,p:{rotation:-12.6953,x:0.7,y:3.75,regY:-25,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-36.206,x:53.65,y:-21.5}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-13.8573,x:7.5,y:66.75,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-11.0205,x:85.4,y:38.1,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-11.6463,y:-29.3,x:32.35,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-0.3854,x:38.65,y:38.1,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-4.2298,x:55.75,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:1.8697,x:-35.25,y:-9.6,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.6,regY:-38.1,scaleX:0.9992,scaleY:0.9992,rotation:-5.0673,x:-42.95,y:57.65}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:17.9235,x:-57.85,y:-33.65,regY:12.8,regX:9.6}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-8.9318,x:-64.75,y:-67.05,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-13.1765,x:0.75,y:3.75,regY:-25,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.2,scaleX:0.9984,scaleY:0.9984,rotation:-36.7487,x:53.55,y:-21.5}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-13.8291,x:8.05,y:66.7,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-10.8597,x:85.95,y:37.75,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-10.8244,y:-29.25,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-0.1332,x:37.65,y:38.2,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-4.0272,x:55.75,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:2.1524,x:-35.2,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-3.2733,x:-43.45,y:57.45}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:18.1601,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-8.5909,x:-64.65,y:-67.2,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-13.6593,x:0.7,y:3.7,regY:-25,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-37.2913,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-13.7994,x:8.55,y:66.6,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-10.699,x:86.5,y:37.5,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-10.0018,y:-29.25,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:0.1139,x:36.65,y:38.3,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.8255,x:55.8,y:-36.9,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:2.4343,x:-35.15,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-1.4788,x:-43.8,y:57.4}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:18.3954,x:-57.7,y:-33.45,regY:12.9,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-8.2503,x:-64.5,y:-67.15,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-14.1417,x:0.65,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-37.8335,x:53.6,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-13.7705,x:9.05,y:66.55,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-10.5383,x:87.05,y:37.2,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-9.1814,y:-29.25,x:32.35,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:0.367,x:35.75,y:38.35,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.6239,x:55.75,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:2.7179,x:-35.2,y:-9.6,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9993,scaleY:0.9993,rotation:0.3106,x:-44.1,y:57.35}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:18.6317,x:-57.7,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-7.9082,x:-64.4,y:-67.05,regY:11.6,regX:12.6}},{t:this.instance_3,p:{rotation:-14.6235,x:0.75,y:3.7,regY:-25,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-38.3754,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-13.7416,x:9.6,y:66.45,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-10.3773,x:87.6,y:36.8,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-8.3584,y:-29.25,x:32.35,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:0.6185,x:34.7,y:38.4,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.4222,x:55.7,y:-36.85,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:2.9991,x:-35.25,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9993,scaleY:0.9993,rotation:2.1065,x:-44.4,y:57.35}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:18.8684,x:-57.75,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-7.5672,x:-64.2,y:-67.15,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-15.1051,x:0.7,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.2,scaleX:0.9984,scaleY:0.9984,rotation:-38.9194,x:53.55,y:-21.55}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-13.7119,x:10.1,y:66.5,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-10.2169,x:88.15,y:36.5,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9976,scaleY:0.9976,rotation:-7.538,y:-29.3,x:32.3,regY:-29.3,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:0.8708,x:33.75,y:38.4,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.2206,x:55.75,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:3.2812,x:-35.15,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:3.9001,x:-44.7,y:57.25}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.1053,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-7.2265,x:-64.05,y:-67.25,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-15.587,x:0.75,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:1.9,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-39.4619,x:53.5,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-13.6831,x:10.65,y:66.35,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-10.0567,x:88.7,y:36.15,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-6.7157,y:-29.35,x:32.35,regY:-29.3,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:1.1222,x:32.9,y:38.45,regX:4.6}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.0191,x:55.75,y:-36.85,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:3.5642,x:-35.2,y:-9.6,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.6,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:5.6957,x:-45,y:57.2}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.3409,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-6.8843,x:-63.9,y:-67.2,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-16.0687,x:0.7,y:3.55,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-40.0037,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-13.6533,x:11.15,y:66.35,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-9.8948,x:89.25,y:35.85,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-5.8921,y:-29.25,x:32.3,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:1.3737,x:31.85,y:38.4,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9992,scaleY:0.9992,rotation:-2.8167,x:55.75,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:3.8465,x:-35.2,y:-9.45,regX:-1,regY:-28}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:7.49,x:-45.5,y:57.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.5762,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-6.5425,x:-63.85,y:-67.35,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-16.5502,x:0.7,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:1.9,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-40.5454,x:53.55,y:-21.35}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-13.6245,x:11.65,y:66.25,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-9.7347,x:89.75,y:35.5,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-5.0706,y:-29.25,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:1.626,x:30.85,y:38.4,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-2.6144,x:55.7,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:4.1279,x:-35.2,y:-9.4,regX:-1,regY:-28}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:9.2855,x:-45.75,y:57.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.8126,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-6.2016,x:-63.7,y:-67.3,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-17.0327,x:0.7,y:3.55,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-41.0899,x:53.6,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-13.5948,x:12.2,y:66.15,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-9.5747,x:90.35,y:35.15,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-6.7457,y:-29.35,x:32.35,regY:-29.3,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:0.7367,x:32.95,y:38.4,regX:4.6}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-2.7239,x:55.7,y:-36.85,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:3.552,x:-35.2,y:-9.6,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:8.1259,x:-45.1,y:57.2}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.4865,x:-57.65,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-7.2591,x:-63.85,y:-67.3,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-16.0471,x:0.7,y:3.55,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-39.9918,x:53.65,y:-21.5}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.9093,x:11.15,y:66.3,regX:3.9}},{t:this.instance,p:{regX:4.8,rotation:-9.4701,x:89.35,y:35.8,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9976,scaleY:0.9976,rotation:-8.4213,y:-29.25,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-0.148,x:34.8,y:38.4,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9992,scaleY:0.9992,rotation:-2.8325,x:55.7,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:2.9745,x:-35.2,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:6.966,x:-44.45,y:57.3}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.1607,x:-57.7,y:-33.5,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-8.3158,x:-64.05,y:-67.2,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-15.0613,x:0.8,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-38.8963,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-16.2224,x:9.95,y:66.5,regX:3.8}},{t:this.instance,p:{regX:4.7,rotation:-9.368,x:88.15,y:36.6,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-10.0962,y:-29.25,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-1.0372,x:36.8,y:38.25,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-2.942,x:55.75,y:-36.8,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:2.3983,x:-35.2,y:-9.6,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:5.8048,x:-43.7,y:57.45}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:18.833,x:-57.8,y:-33.6,regY:12.8,regX:9.6}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-9.3733,x:-64.45,y:-67.15,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-14.0759,x:0.65,y:3.55,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-37.7978,x:53.65,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-17.5366,x:8.9,y:66.6,regX:3.8}},{t:this.instance,p:{regX:4.8,rotation:-9.2631,x:87.15,y:37.2,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-11.7716,y:-29.3,x:32.35,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-1.9267,x:38.8,y:38.1,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.0497,x:55.75,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:1.8215,x:-35.2,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:4.6459,x:-43.05,y:57.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:18.5069,x:-57.65,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-10.4288,x:-64.45,y:-67.05,regY:11.6,regX:12.6}},{t:this.instance_3,p:{rotation:-13.0893,x:0.65,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-36.7011,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-18.8495,x:7.9,y:66.7,regX:3.9}},{t:this.instance,p:{regX:4.8,rotation:-9.1601,x:86,y:37.8,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-13.4476,y:-29.4,x:32.3,regY:-29.3,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-2.8166,x:40.75,y:37.85,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.1584,x:55.75,y:-36.85,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:1.2457,x:-35.2,y:-9.6,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:3.4845,x:-42.45,y:57.6}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:18.1803,x:-57.7,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-11.4859,x:-64.6,y:-67.1,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-12.104,x:0.7,y:3.65,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:1.9,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-35.6057,x:53.5,y:-21.35}},{t:this.instance_1,p:{regY:-38.9,scaleX:0.999,scaleY:0.999,rotation:-20.1632,x:6.75,y:66.7,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-9.0562,x:84.75,y:38.4,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-15.1217,y:-29.25,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-3.7055,x:42.75,y:37.65,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.267,x:55.7,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:0.6683,x:-35.2,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:2.3245,x:-41.7,y:57.65}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:17.854,x:-57.75,y:-33.6,regY:12.8,regX:9.6}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-12.5419,x:-64.8,y:-67.05,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-11.1179,x:0.65,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-34.5081,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-21.4775,x:5.7,y:66.95,regX:3.9}},{t:this.instance,p:{regX:4.8,rotation:-8.9515,x:83.75,y:39,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-16.7973,y:-29.3,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-4.5952,x:44.75,y:37.3,regX:4.6}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.3775,x:55.7,y:-36.85,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:0.0918,x:-35.2,y:-9.6,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.6,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:1.1646,x:-40.95,y:57.7}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:17.5265,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-13.5996,x:-65.05,y:-67,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-10.1321,x:0.7,y:3.6,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:1.9,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-33.4098,x:53.6,y:-21.35}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-22.791,x:4.6,y:67.05,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-8.8486,x:82.45,y:39.6,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-18.4718,y:-29.35,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-5.4844,x:46.55,y:36.85,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.4852,x:55.7,y:-36.95,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-0.4802,x:-35.25,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:0.0035,x:-40.35,y:57.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:17.201,x:-57.75,y:-33.65,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-14.6563,x:-65.25,y:-66.95,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-9.1469,x:0.75,y:3.75,regY:-25,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-32.3134,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-24.1045,x:3.4,y:67.1,regX:3.8}},{t:this.instance,p:{regX:4.7,rotation:-8.744,x:81.25,y:40.2,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-20.1475,y:-29.35,x:32.35,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-6.3739,x:48.5,y:36.4,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.5931,x:55.7,y:-36.85,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-1.0576,x:-35.2,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.1,scaleX:0.9992,scaleY:0.9992,rotation:-1.1524,x:-39.65,y:58}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:16.8743,x:-57.8,y:-33.45,regY:12.9,regX:9.6}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-15.713,x:-65.5,y:-66.9,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-8.1609,x:0.7,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.2,scaleX:0.9984,scaleY:0.9984,rotation:-31.217,x:53.6,y:-21.55}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-25.4182,x:2.3,y:67.15,regX:3.8}},{t:this.instance,p:{regX:4.8,rotation:-8.642,x:80.2,y:40.6,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-21.8213,y:-29.45,x:32.35,regY:-29.3,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-7.2631,x:50.4,y:35.95,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.7019,x:55.75,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-1.6351,x:-35.2,y:-9.45,regX:-1,regY:-28}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-2.3114,x:-39.05,y:57.85}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:16.5481,x:-57.7,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-16.7694,x:-65.65,y:-66.9,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-7.1747,x:0.7,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-30.1196,x:53.65,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-26.733,x:1.3,y:67.25,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-8.5366,x:78.9,y:41.15,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-23.4965,y:-29.25,x:32.3,regY:-29.2,regX:0.3}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-8.1515,x:52.45,y:35.35,regX:4.6}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.8105,x:55.7,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-2.211,x:-35.25,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-3.4723,x:-38.35,y:57.95}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:16.2218,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-17.8263,x:-65.8,y:-66.8,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-6.1888,x:0.7,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-29.0228,x:53.7,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-28.0454,x:0.25,y:67.15,regX:3.9}},{t:this.instance,p:{regX:4.8,rotation:-8.433,x:77.85,y:41.55,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-25.1723,y:-29.3,x:32.35,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-9.0428,x:54.2,y:34.75,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9992,scaleY:0.9992,rotation:-3.9193,x:55.9,y:-37.05,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-2.788,x:-35.2,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-4.6318,x:-37.65,y:57.95}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:15.8944,x:-57.7,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-18.8833,x:-66.05,y:-66.75,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-5.2039,x:0.8,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.2,scaleX:0.9984,scaleY:0.9984,rotation:-27.9276,x:53.6,y:-21.55}},{t:this.instance_1,p:{regY:-38.9,scaleX:0.999,scaleY:0.999,rotation:-29.3603,x:-0.95,y:67.1,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-8.3292,x:76.5,y:42,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-26.8469,y:-29.35,x:32.3,regY:-29.2,regX:0.3}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-9.932,x:56.05,y:34.1,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-4.0281,x:55.75,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-3.3645,x:-35.2,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.6,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-5.7924,x:-36.85,y:58}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:15.5682,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-19.9399,x:-66.2,y:-66.75,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-4.2178,x:0.7,y:3.6,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-26.8298,x:53.7,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-30.6733,x:-1.95,y:67.1,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-8.2256,x:75.25,y:42.5,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-28.5237,y:-29.35,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-10.8215,x:57.9,y:33.35,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9993,scaleY:0.9993,rotation:-4.1377,x:55.75,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-3.9412,x:-35.35,y:-9.45,regX:-1.1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-6.953,x:-36.3,y:58.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:15.2415,x:-57.7,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-20.9959,x:-66.4,y:-66.7,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-3.2322,x:0.75,y:3.6,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:1.9,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-25.7321,x:53.55,y:-21.3}},{t:this.instance_1,p:{regY:-38.9,scaleX:0.999,scaleY:0.999,rotation:-31.9871,x:-3.15,y:67,regX:3.9}},{t:this.instance,p:{regX:4.8,rotation:-8.122,x:74.15,y:42.8,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-30.197,y:-29.35,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-11.7114,x:59.75,y:32.55,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-4.2457,x:55.85,y:-36.95,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-4.5166,x:-35.2,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-8.1127,x:-35.65,y:58}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:14.9141,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-22.0525,x:-66.7,y:-66.6,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-2.245,x:0.7,y:3.75,regY:-25,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-24.6368,x:53.65,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-33.3005,x:-4.35,y:67.1,regX:3.8}},{t:this.instance,p:{regX:4.7,rotation:-8.0186,x:72.8,y:43.25,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-30.4712,y:-29.4,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-11.798,x:60.15,y:32.4,regX:4.6}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9993,scaleY:0.9993,rotation:-4.1614,x:55.85,y:-37.05,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-5.1882,x:-35.2,y:-9.4,regX:-1,regY:-28}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-8.6627,x:-34.9,y:58}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:15.0845,x:-57.75,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-21.7018,x:-66.5,y:-66.7,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-1.9411,x:0.75,y:3.75,regY:-25,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-24.2159,x:53.65,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-31.9415,x:-4.5,y:67.05,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-7.5983,x:72.3,y:43.4,scaleX:0.9978,scaleY:0.9978}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-30.7443,y:-29.45,x:32.35,regY:-29.3,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-11.8843,x:60.3,y:32.35,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-4.0781,x:55.85,y:-36.95,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-5.8587,x:-35.15,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-9.2146,x:-34.05,y:58}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:15.254,x:-57.75,y:-33.45,regY:12.9,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-21.3506,x:-66.4,y:-66.6,regY:11.6,regX:12.6}},{t:this.instance_3,p:{rotation:-1.6374,x:0.75,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-23.7953,x:53.7,y:-21.35}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-30.5839,x:-4.8,y:66.95,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-7.1778,x:71.85,y:43.5,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-31.0179,y:-29.35,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-11.9719,x:60.6,y:32.1,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.993,x:55.9,y:-36.9,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-6.5292,x:-35.25,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-9.7645,x:-33.25,y:58.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:15.4236,x:-57.7,y:-33.5,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-21.0003,x:-66.3,y:-66.75,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-1.3327,x:0.7,y:3.65,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-23.3745,x:53.7,y:-21.4}},{t:this.instance_1,p:{regY:-38.9,scaleX:0.999,scaleY:0.999,rotation:-29.2238,x:-5.25,y:66.85,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-6.7575,x:71.4,y:43.65,scaleX:0.9978,scaleY:0.9978}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-31.2899,y:-29.45,x:32.35,regY:-29.3,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-12.0597,x:60.9,y:32,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9992,scaleY:0.9992,rotation:-3.908,x:55.9,y:-37.1,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-7.1998,x:-35.2,y:-9.4,regX:-1,regY:-28}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-10.3164,x:-32.45,y:57.95}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:15.5937,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-20.6485,x:-66.1,y:-66.65,regY:11.6,regX:12.6}},{t:this.instance_3,p:{rotation:-1.0299,x:0.7,y:3.65,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.2,scaleX:0.9984,scaleY:0.9984,rotation:-22.9555,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-27.8681,x:-5.45,y:66.9,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-6.3378,x:70.9,y:43.75,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-31.5626,y:-29.35,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-12.1466,x:61.2,y:31.9,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.8237,x:55.75,y:-37,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-7.8712,x:-35.35,y:-9.45,regX:-1.1,regY:-28}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-10.8657,x:-31.7,y:57.95}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:15.7617,x:-57.7,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-20.2963,x:-66.1,y:-66.8,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-0.7254,x:0.7,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-22.5336,x:53.7,y:-21.35}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-26.5091,x:-5.85,y:66.9,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-5.9166,x:70.45,y:43.9,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-31.8369,y:-29.5,x:32.4,regY:-29.3,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-12.2334,x:61.5,y:31.8,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.7404,x:55.7,y:-37,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-8.5411,x:-35.25,y:-9.4,regX:-1,regY:-28}},{t:this.instance_7,p:{regX:3.6,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-11.4177,x:-30.8,y:57.95}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:15.9316,x:-57.75,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-19.9454,x:-66,y:-66.8,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-0.4209,x:0.7,y:3.6,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-22.1143,x:53.7,y:-21.35}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-25.1493,x:-6.15,y:66.8,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-5.4973,x:69.95,y:44,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-32.1081,y:-29.4,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-12.3205,x:61.8,y:31.65,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.6553,x:55.7,y:-37,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-9.2122,x:-35.35,y:-9.45,regX:-1.1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-11.9678,x:-30.15,y:57.85}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:16.1022,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-19.5944,x:-65.9,y:-66.9,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-0.1164,x:0.7,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-21.6943,x:53.65,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-23.7914,x:-6.6,y:66.85,regX:3.8}},{t:this.instance,p:{regX:4.7,rotation:-5.0776,x:69.45,y:44.2,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-32.3824,y:-29.5,x:32.3,regY:-29.3,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-12.4066,x:62.2,y:31.45,regX:4.6}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.5713,x:55.7,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-9.8828,x:-35.25,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-12.5177,x:-29.3,y:57.85}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:16.2711,x:-57.7,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-19.2418,x:-65.8,y:-66.85,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:0.1829,x:0.7,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:1.9,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-21.2747,x:53.55,y:-21.35}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-22.4336,x:-6.85,y:66.75,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-4.6581,x:68.95,y:44.3,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-32.655,y:-29.35,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-12.4942,x:62.5,y:31.3,regX:4.6}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.487,x:55.7,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-10.5539,x:-35.3,y:-9.5,regX:-1.1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-13.0702,x:-28.55,y:57.7}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:16.4398,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-18.8916,x:-65.85,y:-66.9,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:0.4874,x:0.65,y:3.6,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:1.9,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-20.8531,x:53.55,y:-21.35}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-21.0746,x:-7.15,y:66.75,regX:3.9}},{t:this.instance,p:{regX:4.8,rotation:-4.237,x:68.65,y:44.45,scaleX:0.9978,scaleY:0.9978}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-32.9282,y:-29.4,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-12.5814,x:62.8,y:31.2,regX:4.6}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.4038,x:55.7,y:-37,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-11.2238,x:-35.2,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-13.6207,x:-27.75,y:57.7}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:16.6093,x:-57.65,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-18.5385,x:-65.6,y:-66.9,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:0.791,x:0.65,y:3.65,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-20.4341,x:53.65,y:-21.35}},{t:this.instance_1,p:{regY:-38.9,scaleX:0.999,scaleY:0.999,rotation:-19.7172,x:-7.7,y:66.55,regX:3.8}},{t:this.instance,p:{regX:4.7,rotation:-3.8163,x:68.05,y:44.5,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-33.2017,y:-29.35,x:32.45,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-12.6691,x:62.9,y:31.05,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.3188,x:55.7,y:-37,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-11.8944,x:-35.4,y:-9.5,regX:-1.1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-14.1716,x:-26.95,y:57.6}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:16.7793,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-18.1878,x:-65.5,y:-66.95,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:1.0947,x:0.75,y:3.8,regY:-25,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-20.0138,x:53.7,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-18.3577,x:-7.85,y:66.6,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-3.3975,x:67.6,y:44.55,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-33.474,y:-29.45,x:32.45,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-12.7554,x:63.2,y:30.9,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.2338,x:55.7,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-12.5656,x:-35.2,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-14.7219,x:-26.15,y:57.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:16.9485,x:-57.8,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-17.8357,x:-65.45,y:-66.95,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:1.3993,x:0.65,y:3.8,regY:-25,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-19.5925,x:53.7,y:-21.35}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-16.999,x:-8.1,y:66.6,regX:3.9}},{t:this.instance,p:{regX:4.8,rotation:-2.9762,x:67.2,y:44.7,scaleX:0.9978,scaleY:0.9978}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-33.7472,y:-29.35,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-12.8427,x:63.5,y:30.75,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.1496,x:55.75,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-13.2353,x:-35.25,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.1,scaleX:0.9992,scaleY:0.9992,rotation:-15.2733,x:-25.4,y:57.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:17.1188,x:-57.8,y:-33.7,regY:12.8,regX:9.6}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-17.4845,x:-65.35,y:-67.05,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:1.7039,x:0.65,y:3.8,regY:-25,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-19.1726,x:53.7,y:-21.35}},{t:this.instance_1,p:{regY:-38.9,scaleX:0.999,scaleY:0.999,rotation:-15.6415,x:-8.45,y:66.45,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-2.556,x:66.55,y:44.85,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-34.0211,y:-29.4,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-12.9297,x:63.8,y:30.65,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9993,scaleY:0.9993,rotation:-3.0654,x:55.8,y:-37,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-13.9075,x:-35.2,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-15.8229,x:-24.6,y:57.3}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:17.2879,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-17.134,x:-65.2,y:-66.95,regY:11.6,regX:12.6}},{t:this.instance_3,p:{rotation:2.0086,x:0.65,y:3.65,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-18.7526,x:53.7,y:-21.3}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.2829,x:-8.75,y:66.5,regX:3.9}},{t:this.instance,p:{regX:4.8,rotation:-2.1359,x:66.25,y:44.9,scaleX:0.9978,scaleY:0.9978}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-34.2937,y:-29.35,x:32.45,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-13.0172,x:64.1,y:30.5,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-2.9823,x:55.8,y:-37,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-14.576,x:-35.2,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-16.3748,x:-23.75,y:57.15}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:17.4576,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-16.7816,x:-65.2,y:-67.05,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:2.3116,x:0.65,y:3.65,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.2,scaleX:0.9984,scaleY:0.9984,rotation:-18.333,x:53.65,y:-21.5}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-12.9248,x:-9.1,y:66.45,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-1.7151,x:65.65,y:44.95,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-34.5649,y:-29.45,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-13.1043,x:64.35,y:30.35,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9992,scaleY:0.9992,rotation:-2.8973,x:55.8,y:-37.2,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-15.2467,x:-35.25,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.1,scaleX:0.9992,scaleY:0.9992,rotation:-16.9254,x:-22.95,y:57.15}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:17.6259,x:-57.65,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-16.4311,x:-65.05,y:-67.05,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:2.6163,x:0.65,y:3.65,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-17.913,x:53.65,y:-21.3}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-11.5663,x:-9.45,y:66.45,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-1.2952,x:65.1,y:45.1,scaleX:0.9978,scaleY:0.9978}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-34.8387,y:-29.5,x:32.45,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-13.1917,x:64.6,y:30.2,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9992,scaleY:0.9992,rotation:-2.8123,x:55.8,y:-37.2,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-15.918,x:-35.2,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-17.477,x:-22.15,y:56.85}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:17.7959,x:-57.65,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-16.0796,x:-65,y:-67,regY:11.6,regX:12.6}},{t:this.instance_3,p:{rotation:2.9203,x:0.65,y:3.65,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-17.492,x:53.65,y:-21.3}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-10.2083,x:-9.75,y:66.4,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-0.8754,x:64.65,y:45.25,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-35.1118,y:-29.5,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-13.2781,x:64.9,y:30.05,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-2.7282,x:55.8,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-16.5887,x:-35.15,y:-9.35,regX:-1,regY:-28}},{t:this.instance_7,p:{regX:3.6,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-18.0263,x:-21.35,y:56.7}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:17.9661,x:-57.7,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-15.7274,x:-65,y:-67.1,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:3.2243,x:0.6,y:3.65,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-17.0721,x:53.65,y:-21.3}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-8.8497,x:-10.1,y:66.35,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-0.4548,x:64.15,y:45.25,scaleX:0.9978,scaleY:0.9978}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-35.3841,y:-29.45,x:32.45,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-13.3646,x:65.2,y:29.9,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-2.6432,x:55.8,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-17.2587,x:-35.15,y:-9.35,regX:-1,regY:-28}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-18.5774,x:-20.65,y:56.6}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:18.1355,x:-57.7,y:-33.65,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-15.3766,x:-64.75,y:-67.1,regY:11.6,regX:12.6}},{t:this.instance_3,p:{rotation:3.5286,x:0.7,y:3.65,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-16.6522,x:53.65,y:-21.3}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-7.4906,x:-10.45,y:66.25,regX:3.9}},{t:this.instance,p:{regX:4.8,rotation:-0.0342,x:63.85,y:45.4,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-35.6594,y:-29.45,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-13.4526,x:65.45,y:29.75,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9992,scaleY:0.9992,rotation:-2.5592,x:55.8,y:-37.25,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-17.9298,x:-35.2,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-19.1283,x:-19.85,y:56.35}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:18.3049,x:-57.8,y:-33.45,regY:12.9,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-15.0251,x:-64.7,y:-67.2,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:3.8328,x:0.7,y:3.8,regY:-25,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-16.2321,x:53.65,y:-21.3}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-6.1323,x:-10.9,y:66.25,regX:3.8}},{t:this.instance,p:{regX:4.7,rotation:0.3812,x:63.2,y:45.45,scaleX:0.9978,scaleY:0.9978}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-35.9301,y:-29.45,x:32.35,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-13.5393,x:65.75,y:29.5,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9993,scaleY:0.9993,rotation:-2.4751,x:55.8,y:-37.15,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-18.6004,x:-35.2,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-19.6788,x:-19.05,y:56.15}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:18.4737,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-14.6746,x:-64.55,y:-67.2,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:4.1372,x:0.7,y:3.7,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-15.8112,x:53.65,y:-21.3}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-4.7742,x:-11.1,y:66.15,regX:3.9}},{t:this.instance,p:{regX:4.8,rotation:0.8009,x:62.85,y:45.45,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-36.2048,y:-29.45,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-13.6266,x:66,y:29.45,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9993,scaleY:0.9993,rotation:-2.391,x:55.8,y:-37.15,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-19.2709,x:-35.2,y:-9.35,regX:-1,regY:-28}},{t:this.instance_7,p:{regX:3.5,regY:-38.1,scaleX:0.9992,scaleY:0.9992,rotation:-20.2304,x:-18.25,y:56.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:18.6439,x:-57.7,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-14.3217,x:-64.45,y:-67.15,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:4.4407,x:0.7,y:3.7,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-15.3922,x:53.7,y:-21.3}},{t:this.instance_1,p:{regY:-38.9,scaleX:0.999,scaleY:0.999,rotation:-3.4159,x:-11.4,y:66,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:1.2207,x:62.25,y:45.55,scaleX:0.9978,scaleY:0.9978}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-36.4764,y:-29.5,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-13.7133,x:66.3,y:29.3,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9993,scaleY:0.9993,rotation:-2.3069,x:55.8,y:-37.15,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-19.9425,x:-35.25,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-20.7797,x:-17.55,y:55.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:18.8128,x:-57.75,y:-33.65,regY:12.8,regX:9.6}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-13.9711,x:-64.5,y:-67.2,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:4.7445,x:0.65,y:3.7,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-14.9718,x:53.7,y:-21.3}},{t:this.instance_1,p:{regY:-38.9,scaleX:0.999,scaleY:0.999,rotation:-2.057,x:-11.75,y:65.9,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:1.6414,x:61.75,y:45.6,scaleX:0.9978,scaleY:0.9978}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-36.7505,y:-29.45,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-13.8008,x:66.6,y:29.15,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-2.2229,x:55.8,y:-37.15,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-20.6113,x:-35.3,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-21.332,x:-16.75,y:55.65}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:18.9833,x:-57.85,y:-33.5,regY:12.9,regX:9.6}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-13.6195,x:-64.25,y:-67.25,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:5.0492,x:0.7,y:3.7,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-14.5506,x:53.7,y:-21.25}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-0.6992,x:-12.05,y:66,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:2.0605,x:61.25,y:45.6,scaleX:0.9978,scaleY:0.9978}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-37.0231,y:-29.45,x:32.35,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-13.8873,x:66.85,y:28.95,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9993,scaleY:0.9993,rotation:-2.1379,x:55.8,y:-37.15,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-21.2834,x:-35.35,y:-9.5,regX:-1.1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-21.8826,x:-16.05,y:55.4}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.1524,x:-57.75,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-13.2676,x:-64.15,y:-67.3,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:5.3542,x:0.7,y:3.8,regY:-25,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-14.1314,x:53.7,y:-21.3}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:0.6555,x:-12.4,y:65.9,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:2.4806,x:60.8,y:45.7,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-37.2957,y:-29.45,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-13.9748,x:67.15,y:28.8,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-2.0539,x:55.8,y:-37.15,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-21.9549,x:-35.3,y:-9.45,regX:-1.1,regY:-28.1}},{t:this.instance_7,p:{regX:3.6,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-22.4325,x:-15.2,y:55.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.3212,x:-57.7,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-12.9171,x:-64.2,y:-67.25,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:5.6574,x:0.65,y:3.65,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-13.7104,x:53.7,y:-21.25}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:2.0132,x:-12.75,y:65.85,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:2.9025,x:60.25,y:45.85,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-37.5691,y:-29.5,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.0624,x:67.45,y:28.65,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-1.969,x:55.8,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-22.6245,x:-35.25,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-22.9839,x:-14.45,y:54.9}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.4909,x:-57.65,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-12.5655,x:-64.05,y:-67.35,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:5.9618,x:0.65,y:3.65,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-13.2906,x:53.7,y:-21.3}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:3.3721,x:-13.05,y:65.75,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:3.322,x:59.8,y:45.85,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-37.8419,y:-29.5,x:32.45,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.1484,x:67.7,y:28.5,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-1.8859,x:55.8,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-23.296,x:-35.2,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-23.5338,x:-13.75,y:54.65}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.6601,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-12.2132,x:-63.9,y:-67.25,regY:11.6,regX:12.6}},{t:this.instance_3,p:{rotation:6.2662,x:0.65,y:3.65,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-12.87,x:53.7,y:-21.25}},{t:this.instance_1,p:{regY:-38.9,scaleX:0.999,scaleY:0.999,rotation:4.7302,x:-13.4,y:65.5,regX:3.9}},{t:this.instance,p:{regX:4.8,rotation:3.7416,x:59.45,y:45.8,scaleX:0.9978,scaleY:0.9978}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.1154,y:-29.4,x:32.3,regY:-29.2,regX:0.3}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.236,x:67.95,y:28.4,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-1.8027,x:55.9,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-23.9654,x:-35.25,y:-9.45,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.0866,x:-13,y:54.4}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.83,x:-57.8,y:-33.6,regY:12.8,regX:9.6}},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-11.8619,x:-63.9,y:-67.35,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:6.5691,x:0.65,y:3.75,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-12.4506,x:53.7,y:-21.25}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:6.0883,x:-13.85,y:65.6,regX:3.8}},{t:this.instance,p:{regX:4.7,rotation:4.1632,x:58.8,y:45.95,scaleX:0.9978,scaleY:0.9978}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.3888,y:-29.45,x:32.35,regY:-29.2,regX:0.3}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.3226,x:68.2,y:28.2,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-1.7169,x:55.9,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-24.6372,x:-35.25,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.6,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.6372,x:-12.25,y:54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:20.0518,x:-57.7,y:-33.65,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-11.4575,x:-63.6,y:-67.5,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:6.8732,x:0.65,y:3.65,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-12.0293,x:53.7,y:-21.25}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:7.4457,x:-14.2,y:65.55,regX:3.8}},{t:this.instance,p:{regX:4.7,rotation:4.5824,x:58.25,y:45.95,scaleX:0.9977,scaleY:0.9977}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-115.5,-108.8,224.2,259.7);


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


(lib.muslims_icon = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_747();
	this.instance.setTransform(-53.75,-147.7,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_746();
	this.instance_1.setTransform(-74.2,-168.15,0.5,0.5);

	this.instance_2 = new lib.horse_01();
	this.instance_2.setTransform(-15.5,33.7,0.6081,0.6081,0,0,0,-7.7,19.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.muslims_icon, new cjs.Rectangle(-74.2,-168.1,138.5,251.8), null);


(lib.muslims_button = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_745();
	this.instance.setTransform(-43.65,-98.25,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_744();
	this.instance_1.setTransform(-61,-115.6,0.5,0.5);

	this.instance_2 = new lib.camel_leg_b_l_bcopy("synched",0);
	this.instance_2.setTransform(24.7,69.5,0.5163,0.5161,-14.0728,0,0,8,-45.2);

	this.instance_3 = new lib.camel_leg_f_l_bcopy("synched",0);
	this.instance_3.setTransform(-21.35,73.4,0.5168,0.5168,33.303,0,0,12,-44.1);

	this.instance_4 = new lib.camel_leg_b_l_ucopy("synched",0);
	this.instance_4.setTransform(21.3,37.85,0.5167,0.5166,-13.1142,0,0,3.4,-26.4);

	this.instance_5 = new lib.camel_leg_f_l_ucopy("synched",0);
	this.instance_5.setTransform(-6.5,46.85,0.5169,0.5169,28.2264,0,0,1,-26.2);

	this.instance_6 = new lib.camel_headcopy("synched",0);
	this.instance_6.setTransform(-36.25,6.4,0.5169,0.5168,1.6412,0,0,22.1,17.2);

	this.instance_7 = new lib.camel_neckcopy("synched",0);
	this.instance_7.setTransform(-26.15,25.25,0.5168,0.5167,19.9885,0,0,33.8,15.6);

	this.instance_8 = new lib.camel_bodycopy("synched",0);
	this.instance_8.setTransform(-9.8,27.2,0.518,0.5179,0,0,0,0.1,0.7);

	this.instance_9 = new lib.camel_leg_f_r_bcopy("synched",0);
	this.instance_9.setTransform(-23.3,67,0.517,0.5169,-26.7988,0,0,-5.5,-52.3);

	this.instance_10 = new lib.camel_leg_f_r_ucopy("synched",0);
	this.instance_10.setTransform(-33.45,38.2,0.5171,0.517,-19.5939,0,0,-15.7,-33.7);

	this.instance_11 = new lib.camel_leg_b_r_bcopy("synched",0);
	this.instance_11.setTransform(15.35,64.15,0.5164,0.5163,-11.5288,0,0,5.5,-39.2);

	this.instance_12 = new lib.camel_leg_b_r_ucopy("synched",0);
	this.instance_12.setTransform(9.95,29.2,0.5161,0.516,-15.7846,0,0,2.6,-28.1);

	this.instance_13 = new lib.camel_tailcopy("synched",0);
	this.instance_13.setTransform(19.9,28.25,0.5167,0.5168,-45.2536,0,0,-14.3,-31);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).to({state:[]},1).wait(1));

	// Layer_1
	this.instance_14 = new lib.muslims_icon();
	this.instance_14.setTransform(1.75,27.35,0.8493,0.8493,0,0,0,0.2,0.2);
	this.instance_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(1).to({_off:false},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-61.4,-115.6,117.9,213.89999999999998);


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
	this.instance_8.setTransform(-41.5,185.5,0.995,0.995,8.7321,0,0,1.2,-51.4);

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
	this.instance_15.setTransform(-10.2,49.1,0.9994,0.9994,1.7752,0,0,-4.9,-21.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{regX:-4.9,scaleX:0.9994,scaleY:0.9994,rotation:1.7752,x:-10.2,y:49.1,regY:-21.8}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9975,scaleY:0.9975,rotation:104.8947,x:48.2,y:-21.25,regY:13.3}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:75.9986,x:30.55,y:48.1,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:150.1937,x:59.7,y:129.55,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.9971,scaleY:0.9971,rotation:124.9995,x:56.7,y:130.1,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:-14.5568,y:185.75,x:33.9,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{rotation:11.3493,x:-4.05,regX:-1.3,scaleX:0.998,scaleY:0.998,y:-59.4,regY:7.4}},{t:this.instance_8,p:{scaleX:0.995,scaleY:0.995,rotation:8.7321,x:-41.5,y:185.5}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.931,y:90.35,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-8.9646,x:24.9,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-11.8556,x:1.45,y:-81.45,scaleX:0.9979,scaleY:0.9979,regY:50.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-140.2196,x:-58.4,regX:44.5,y:59.6,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-102.4158,x:3,y:120.8,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.5,scaleX:0.9969,scaleY:0.9969,rotation:-132.2022,x:2.55,y:120.6,regY:-0.4}},{t:this.instance,p:{regX:33.6,regY:9.5,rotation:-92.6463,x:-59.7,y:-12.4,scaleX:0.9974,scaleY:0.9974}}]}).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.771,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:104.727,x:48,y:-21.3,regY:13.3}},{t:this.instance_13,p:{scaleX:0.9971,scaleY:0.9971,rotation:74.3368,x:30.75,y:48.1,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:144.4188,x:62.25,y:128.65,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:119.672,x:59.35,y:129.45,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.0092,y:185.7,x:33.9,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{rotation:11.8482,x:-3.95,regX:-1.3,scaleX:0.998,scaleY:0.998,y:-59.4,regY:7.4}},{t:this.instance_8,p:{scaleX:0.9948,scaleY:0.9948,rotation:8.7223,x:-41.45,y:185.45}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9365,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9786,x:24.85,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-11.3376,x:1.7,y:-81.35,scaleX:0.9979,scaleY:0.9979,regY:50.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-137.9803,x:-58.95,regX:44.5,y:59.6,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-100.1751,x:-0.1,y:123.2,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-129.9632,x:-0.4,y:123,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-92.2077,x:-59.8,y:-12.3,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7666,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:104.5614,x:48.05,y:-21.3,regY:13.3}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9971,rotation:72.6728,x:30.95,y:48.1,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:138.6419,x:64.75,y:127.6,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:114.3453,x:62,y:128.9,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.4598,y:185.7,x:33.95,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{rotation:12.3464,x:-4.1,regX:-1.4,scaleX:0.9979,scaleY:0.9979,y:-59.5,regY:7.4}},{t:this.instance_8,p:{scaleX:0.9949,scaleY:0.9949,rotation:8.7124,x:-41.45,y:185.5}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9419,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-8.9927,x:24.85,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-10.8171,x:1.9,y:-81.3,scaleX:0.9979,scaleY:0.9979,regY:50.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-135.7403,x:-59.55,regX:44.5,y:59.6,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-97.9342,x:-3.2,y:125.4,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-127.7224,x:-3.5,y:125.3,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-91.7709,x:-59.8,y:-12.35,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7622,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:104.3936,x:48.1,y:-21.3,regY:13.3}},{t:this.instance_13,p:{scaleX:0.9971,scaleY:0.9971,rotation:71.0097,x:31.25,y:48.2,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:132.8648,x:67.25,y:126.7,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:109.0175,x:64.55,y:128.2,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-12.9111,y:185.7,x:34,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{rotation:12.8452,x:-4.05,regX:-1.4,scaleX:0.998,scaleY:0.998,y:-59.5,regY:7.4}},{t:this.instance_8,p:{scaleX:0.9949,scaleY:0.9949,rotation:8.7017,x:-41.45,y:185.5}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9471,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.007,x:24.85,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-10.2975,x:2.1,y:-81.15,scaleX:0.9979,scaleY:0.9979,regY:50.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-133.5014,x:-60.1,regX:44.6,y:59.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-95.6931,x:-6.4,y:127.55,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-125.4824,x:-6.65,y:127.4,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-91.3325,x:-59.85,y:-12.3,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7587,x:-10.25,y:49.05,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:104.2274,x:48.1,y:-21.25,regY:13.3}},{t:this.instance_13,p:{scaleX:0.9971,scaleY:0.9971,rotation:69.3459,x:31.45,y:48.2,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:127.0877,x:69.7,y:125.65,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:103.69,x:67.2,y:127.5,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-12.3631,y:185.75,x:33.9,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{rotation:13.3448,x:-4.05,regX:-1.4,scaleX:0.9979,scaleY:0.9979,y:-59.45,regY:7.4}},{t:this.instance_8,p:{scaleX:0.9949,scaleY:0.9949,rotation:8.6918,x:-41.4,y:185.5}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9524,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-9.0213,x:24.85,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-9.7779,x:2.3,y:-81.2,scaleX:0.9978,scaleY:0.9978,regY:50.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-131.2607,x:-60.6,regX:44.5,y:59.6,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-93.4529,x:-9.45,y:129.55,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-123.242,x:-9.8,y:129.4,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-90.8941,x:-59.8,y:-12.35,scaleX:0.9973,scaleY:0.9973}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7543,x:-10.25,y:49.05,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:104.0603,x:48.05,y:-21.25,regY:13.3}},{t:this.instance_13,p:{scaleX:0.9971,scaleY:0.9971,rotation:67.6826,x:31.6,y:48.25,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:121.3117,x:72.15,y:124.55,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.9971,scaleY:0.9971,rotation:98.3625,x:69.85,y:126.6,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-11.814,y:185.7,x:33.95,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{rotation:13.8431,x:-4.1,regX:-1.4,scaleX:0.9979,scaleY:0.9979,y:-59.5,regY:7.4}},{t:this.instance_8,p:{scaleX:0.9948,scaleY:0.9948,rotation:8.6823,x:-41.45,y:185.5}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9586,y:90.3,x:-30}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-9.0364,x:24.9,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-9.2589,x:2.5,y:-81.1,scaleX:0.9979,scaleY:0.9979,regY:50.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-129.0206,x:-61.15,regX:44.5,y:59.6,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-91.2117,x:-12.8,y:131.5,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-121.0014,x:-13.15,y:131.35,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.4,rotation:-90.4558,x:-59.7,y:-12.25,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.75,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:103.894,x:48,y:-21.3,regY:13.3}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:66.0198,x:31.85,y:48.25,regY:12.7,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:115.5352,x:74.5,y:123.45,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:93.0354,x:72.45,y:125.65,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-11.2649,y:185.7,x:33.9,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{rotation:14.3426,x:-4.05,regX:-1.4,scaleX:0.9979,scaleY:0.9979,y:-59.45,regY:7.4}},{t:this.instance_8,p:{scaleX:0.9949,scaleY:0.9949,rotation:8.6723,x:-41.5,y:185.5}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9638,y:90.3,x:-30}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-9.0507,x:24.85,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-8.7394,x:2.7,y:-81.1,scaleX:0.9978,scaleY:0.9978,regY:50.3,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-126.782,x:-61.55,regX:44.5,y:59.5,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-88.9751,x:-16.1,y:133.3,regY:-9,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-118.7621,x:-16.55,y:133.15,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.4,rotation:-90.0175,x:-59.65,y:-12.35,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7456,x:-10.25,y:49.05,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:103.7259,x:48.05,y:-21.25,regY:13.3}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:64.3568,x:32.05,y:48.3,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:109.7593,x:76.9,y:122.2,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.9971,scaleY:0.9971,rotation:87.7125,x:75.05,y:124.75,regX:-10.1,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-10.716,y:185.65,x:34.05,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{rotation:14.8407,x:-4.1,regX:-1.4,scaleX:0.9979,scaleY:0.9979,y:-59.45,regY:7.4}},{t:this.instance_8,p:{scaleX:0.9949,scaleY:0.9949,rotation:8.6625,x:-41.5,y:185.45}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9691,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-9.0649,x:24.85,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-8.2192,x:2.9,y:-81.05,scaleX:0.9979,scaleY:0.9979,regY:50.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-124.5402,x:-62.25,regX:44.5,y:59.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-86.7352,x:-19.75,y:135,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-116.5215,x:-19.95,y:134.85,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.4,rotation:-89.5863,x:-59.7,y:-12.35,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7421,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:103.5598,x:48.05,y:-21.25,regY:13.3}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:62.6927,x:32.2,y:48.4,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:103.9835,x:79.25,y:120.9,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:82.3857,x:77.6,y:123.45,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-10.1661,y:185.65,x:34.05,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{rotation:15.3399,x:-4.05,regX:-1.4,scaleX:0.9979,scaleY:0.9979,y:-59.45,regY:7.4}},{t:this.instance_8,p:{scaleX:0.9949,scaleY:0.9949,rotation:8.6521,x:-41.5,y:185.5}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9753,y:90.3,x:-30}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-9.08,x:24.85,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-7.7,x:3.25,y:-80.9,scaleX:0.9979,scaleY:0.9979,regY:50.4,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-122.3009,x:-62.75,regX:44.5,y:59.45,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-84.4935,x:-23.3,y:136.65,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-114.2809,x:-23.5,y:136.35,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-89.1471,x:-59.8,y:-12.35,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7377,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:103.3923,x:48.1,y:-21.25,regY:13.2}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:61.0287,x:32.45,y:48.4,regY:12.7,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:98.2062,x:81.5,y:119.6,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:77.058,x:80.15,y:122.4,regX:-10.1,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-9.6184,y:185.7,x:34.1,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{rotation:15.8379,x:-4,regX:-1.4,scaleX:0.9979,scaleY:0.9979,y:-59.45,regY:7.4}},{t:this.instance_8,p:{scaleX:0.9949,scaleY:0.9949,rotation:8.6414,x:-41.5,y:185.45}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9806,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-9.0943,x:24.85,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-7.1795,x:3.4,y:-80.85,scaleX:0.9979,scaleY:0.9979,regY:50.4,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-120.0609,x:-63.3,regX:44.5,y:59.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-82.2525,x:-26.85,y:138,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-112.0415,x:-27.1,y:137.85,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-88.7096,x:-59.85,y:-12.35,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7333,x:-10.2,y:49.1,regY:-21.8}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9974,scaleY:0.9974,rotation:103.2265,x:48.05,y:-21.4,regY:13.3}},{t:this.instance_13,p:{scaleX:0.9971,scaleY:0.9971,rotation:59.3666,x:32.6,y:48.45,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:92.4313,x:83.75,y:118.25,regX:-7}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:71.7298,x:82.65,y:121,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-9.0687,y:185.6,x:34.1,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{rotation:16.3367,x:-4.05,regX:-1.4,scaleX:0.9979,scaleY:0.9979,y:-59.45,regY:7.4}},{t:this.instance_8,p:{scaleX:0.9949,scaleY:0.9949,rotation:8.6332,x:-41.45,y:185.45}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9867,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1085,x:24.9,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-6.6606,x:3.6,y:-80.8,scaleX:0.9979,scaleY:0.9979,regY:50.4,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-117.8211,x:-63.8,regX:44.5,y:59.35,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-80.0119,x:-30.55,y:139.35,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-109.8007,x:-30.75,y:139.2,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-88.272,x:-59.85,y:-12.35,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7289,x:-10.2,y:49.1,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:103.0591,x:48.15,y:-21.25,regY:13.2}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:57.7034,x:32.8,y:48.5,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:86.6574,x:85.95,y:116.65,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:66.4029,x:85.15,y:119.6,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-8.5208,y:185.65,x:34.05,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{rotation:16.837,x:-4.05,regX:-1.4,scaleX:0.9979,scaleY:0.9979,y:-59.45,regY:7.4}},{t:this.instance_8,p:{scaleX:0.9949,scaleY:0.9949,rotation:8.6236,x:-41.5,y:185.45}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9921,y:90.3,x:-29.9}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-9.1219,x:24.85,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-6.1421,x:3.8,y:-80.8,scaleX:0.9979,scaleY:0.9979,regY:50.4,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-115.5808,x:-64.3,regX:44.5,y:59.4,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-77.771,x:-34.05,y:140.5,regY:-9,regX:4.4}},{t:this.instance_1,p:{regX:14.5,scaleX:0.9968,scaleY:0.9968,rotation:-107.5604,x:-34.55,y:140.25,regY:-0.5}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-87.8335,x:-59.85,y:-12.35,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7254,x:-10.2,y:49.1,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:102.892,x:48.05,y:-21.3,regY:13.3}},{t:this.instance_13,p:{scaleX:0.9971,scaleY:0.9971,rotation:56.0393,x:33.05,y:48.6,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:80.8812,x:88.2,y:115.2,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:61.0751,x:87.6,y:118.2,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-7.972,y:185.65,x:34.1,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{rotation:17.3362,x:-4,regX:-1.4,scaleX:0.9979,scaleY:0.9979,y:-59.4,regY:7.4}},{t:this.instance_8,p:{scaleX:0.9949,scaleY:0.9949,rotation:8.6129,x:-41.55,y:185.45}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9973,y:90.3,x:-29.9}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1361,x:24.9,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-5.6216,x:3.95,y:-80.7,scaleX:0.9979,scaleY:0.9979,regY:50.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9972,rotation:-113.3407,x:-64.9,regX:44.6,y:59.25,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-75.5295,x:-37.95,y:141.6,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-105.3207,x:-38.25,y:141.4,regY:-0.4}},{t:this.instance,p:{regX:33.6,regY:9.3,rotation:-87.3949,x:-59.85,y:-12.5,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7211,x:-10.2,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:102.7255,x:48,y:-21.25,regY:13.3}},{t:this.instance_13,p:{scaleX:0.9971,scaleY:0.9971,rotation:54.3761,x:33.25,y:48.6,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:75.1046,x:90.25,y:113.55,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:55.7481,x:90.05,y:116.6,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-7.4229,y:185.65,x:34,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{rotation:17.8343,x:-4.05,regX:-1.4,scaleX:0.9979,scaleY:0.9979,y:-59.35,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9949,scaleY:0.9949,rotation:8.603,x:-41.55,y:185.4}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0034,y:90.25,x:-29.9}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1503,x:24.85,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-5.1015,x:4.05,y:-80.6,scaleX:0.9979,scaleY:0.9979,regY:50.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-111.1006,x:-65.35,regX:44.5,y:59.25,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-73.2878,x:-41.8,y:142.55,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-103.0805,x:-42,y:142.3,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-86.9569,x:-59.8,y:-12.35,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-10.2,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9974,scaleY:0.9974,rotation:102.5577,x:48.1,y:-21.45,regY:13.3}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:52.7121,x:33.4,y:48.65,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:69.3288,x:92.4,y:112,regX:-7}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:50.4199,x:92.4,y:114.95,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-6.8745,y:185.6,x:34.1,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{rotation:18.3338,x:-4,regX:-1.4,scaleX:0.9979,scaleY:0.9979,y:-59.5,regY:7.4}},{t:this.instance_8,p:{scaleX:0.9949,scaleY:0.9949,rotation:8.5932,x:-41.55,y:185.45}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.25,x:-29.9}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.85,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-4.5827,x:4.25,y:-80.5,scaleX:0.9979,scaleY:0.9979,regY:50.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-108.8608,x:-65.95,regX:44.6,y:59.15,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-71.0485,x:-45.6,y:143.3,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.5,scaleX:0.9968,scaleY:0.9968,rotation:-100.8383,x:-45.75,y:143,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-86.5196,x:-59.8,y:-12.4,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7202,x:-10.2,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:101.7773,x:48,y:-21.25,regY:13.3}},{t:this.instance_13,p:{scaleX:0.9971,scaleY:0.9971,rotation:53.5753,x:34.4,y:48.85,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:70.206,x:92.25,y:113,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:51.3094,x:92.4,y:116,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-7.1676,y:185.6,x:34.1,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{rotation:18.3626,x:-4.05,regX:-1.4,scaleX:0.9979,scaleY:0.9979,y:-59.4,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9949,scaleY:0.9949,rotation:8.6021,x:-41.55,y:185.4}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0034,y:90.25,x:-29.9}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1513,x:24.85,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-4.5538,x:4.3,y:-80.5,scaleX:0.9978,scaleY:0.9978,regY:50.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-109.0746,x:-67.9,regX:44.5,y:59,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-71.262,x:-47.25,y:143.05,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-101.0528,x:-47.4,y:142.85,regY:-0.4}},{t:this.instance,p:{regX:33.6,regY:9.4,rotation:-84.9734,x:-59.7,y:-12.5,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7254,x:-10.2,y:49.05,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:100.9969,x:48.15,y:-21.3,regY:13.2}},{t:this.instance_13,p:{scaleX:0.9971,scaleY:0.9971,rotation:54.4396,x:35.3,y:48.95,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:71.0826,x:92.25,y:114,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:52.199,x:92.3,y:117.1,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-7.461,y:185.6,x:34.1,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{rotation:18.3931,x:-4,regX:-1.4,scaleX:0.9979,scaleY:0.9979,y:-59.5,regY:7.4}},{t:this.instance_8,p:{scaleX:0.9949,scaleY:0.9949,rotation:8.6121,x:-41.55,y:185.45}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9982,y:90.3,x:-29.9}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-9.138,x:24.9,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-4.5256,x:4.3,y:-80.5,scaleX:0.9978,scaleY:0.9978,regY:50.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-109.2873,x:-69.85,regX:44.6,y:58.7,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-71.4774,x:-48.8,y:142.75,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-101.2671,x:-49,y:142.5,regY:-0.4}},{t:this.instance,p:{regX:33.6,regY:9.3,rotation:-83.427,x:-59.8,y:-12.5,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7281,x:-10.2,y:49.05,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:100.2159,x:48.05,y:-21.3,regY:13.3}},{t:this.instance_13,p:{scaleX:0.9971,scaleY:0.9971,rotation:55.3038,x:36.25,y:49.2,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:71.9599,x:92.25,y:115.05,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:53.0868,x:92.25,y:118.1,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-7.7537,y:185.65,x:34,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{rotation:18.4228,x:-4.05,regX:-1.4,scaleX:0.9979,scaleY:0.9979,y:-59.5,regY:7.4}},{t:this.instance_8,p:{scaleX:0.9949,scaleY:0.9949,rotation:8.6208,x:-41.5,y:185.45}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9929,y:90.3,x:-29.9}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1237,x:24.85,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-4.4974,x:4.35,y:-80.5,scaleX:0.9979,scaleY:0.9979,regY:50.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-109.5,x:-71.75,regX:44.5,y:58.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-71.6906,x:-50.3,y:142.4,regY:-9,regX:4.4}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-101.4792,x:-50.65,y:142.3,regY:-0.4}},{t:this.instance,p:{regX:33.6,regY:9.4,rotation:-81.8811,x:-59.65,y:-12.5,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7316,x:-10.2,y:49.05,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:99.4347,x:48,y:-21.35,regY:13.3}},{t:this.instance_13,p:{scaleX:0.9971,scaleY:0.9971,rotation:56.1657,x:37.25,y:49.35,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:72.8365,x:92.15,y:116.05,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:53.9758,x:92.15,y:119.1,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-8.0483,y:185.6,x:34.05,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{rotation:18.453,x:-4,regX:-1.4,scaleX:0.9979,scaleY:0.9979,y:-59.5,regY:7.4}},{t:this.instance_8,p:{scaleX:0.9949,scaleY:0.9949,rotation:8.6298,x:-41.55,y:185.4}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9876,y:90.3,x:-29.9}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-9.1104,x:24.85,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-4.4685,x:4.3,y:-80.5,scaleX:0.9978,scaleY:0.9978,regY:50.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-109.714,x:-73.55,regX:44.5,y:58.1,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-71.9052,x:-52.05,y:141.95,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-101.6923,x:-52.25,y:141.75,regY:-0.4}},{t:this.instance,p:{regX:33.6,regY:9.3,rotation:-80.3355,x:-59.75,y:-12.55,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7351,x:-10.25,y:49.05,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:98.6545,x:48.05,y:-21.35,regY:13.3}},{t:this.instance_13,p:{scaleX:0.9971,scaleY:0.9971,rotation:57.0307,x:38.25,y:49.45,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:73.7134,x:92.1,y:117,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:54.8647,x:92.05,y:120.05,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-8.343,y:185.6,x:33.95,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{rotation:18.482,x:-3.95,regX:-1.4,scaleX:0.9979,scaleY:0.9979,y:-59.45,regY:7.4}},{t:this.instance_8,p:{scaleX:0.9949,scaleY:0.9949,rotation:8.6377,x:-41.5,y:185.4}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9824,y:90.3,x:-29.9}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.0978,x:24.85,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-4.4395,x:4.35,y:-80.5,scaleX:0.9978,scaleY:0.9978,regY:50.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-109.9268,x:-75.4,regX:44.5,y:57.75,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-72.1185,x:-53.6,y:141.35,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-101.9082,x:-53.8,y:141.25,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-78.7881,x:-59.8,y:-12.4,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7386,x:-10.25,y:49.05,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:97.8733,x:48,y:-21.3,regY:13.3}},{t:this.instance_13,p:{scaleX:0.9971,scaleY:0.9971,rotation:57.8944,x:39.2,y:49.6,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:74.5902,x:92.05,y:118,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:55.7537,x:91.95,y:121,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-8.6366,y:185.65,x:33.95,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{rotation:18.5114,x:-4,regX:-1.4,scaleX:0.9979,scaleY:0.9979,y:-59.45,regY:7.4}},{t:this.instance_8,p:{scaleX:0.9949,scaleY:0.9949,rotation:8.6476,x:-41.5,y:185.4}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.977,y:90.3,x:-29.9}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-9.0836,x:24.85,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-4.4114,x:4.4,y:-80.5,scaleX:0.9978,scaleY:0.9978,regY:50.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-110.1395,x:-77.45,regX:44.5,y:57.3,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-72.3333,x:-55.2,y:140.75,regY:-9.1,regX:4.5}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-102.1201,x:-55.35,y:140.75,regY:-0.4}},{t:this.instance,p:{regX:33.6,regY:9.3,rotation:-77.2433,x:-59.8,y:-12.55,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7421,x:-10.25,y:49.05,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:97.0926,x:48.05,y:-21.4,regY:13.3}},{t:this.instance_13,p:{scaleX:0.9971,scaleY:0.9971,rotation:58.7582,x:40.2,y:49.7,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:75.4685,x:92,y:118.8,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:56.6419,x:91.8,y:121.85,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-8.9298,y:185.65,x:33.85,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{rotation:18.5422,x:-3.95,regX:-1.4,scaleX:0.9979,scaleY:0.9979,y:-59.45,regY:7.4}},{t:this.instance_8,p:{scaleX:0.9949,scaleY:0.9949,rotation:8.6563,x:-41.45,y:185.4}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9718,y:90.3,x:-29.85}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.0702,x:24.9,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-4.3823,x:4.4,y:-80.5,scaleX:0.9979,scaleY:0.9979,regY:50.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-110.3537,x:-79.3,regX:44.5,y:56.85,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-72.5468,x:-56.75,y:140.3,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-102.3345,x:-56.9,y:140.25,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-75.6969,x:-59.8,y:-12.45,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7456,x:-10.25,y:49,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:96.3114,x:48,y:-21.3,regY:13.3}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:59.6213,x:41.2,y:49.75,regY:12.7,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:76.3453,x:92,y:119.65,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:57.5316,x:91.7,y:122.75,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-9.2229,y:185.5,x:33.9,regX:3.4,regY:-50.5}},{t:this.instance_9,p:{rotation:18.5696,x:-3.95,regX:-1.4,scaleX:0.9979,scaleY:0.9979,y:-59.45,regY:7.4}},{t:this.instance_8,p:{scaleX:0.9949,scaleY:0.9949,rotation:8.6654,x:-41.5,y:185.4}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9665,y:90.3,x:-29.85}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-9.0569,x:24.85,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-4.3542,x:4.4,y:-80.5,scaleX:0.9979,scaleY:0.9979,regY:50.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-110.567,x:-81.1,regX:44.5,y:56.25,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-72.7615,x:-58.25,y:139.6,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-102.5473,x:-58.4,y:139.65,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-74.1506,x:-59.85,y:-12.5,scaleX:0.9973,scaleY:0.9973}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7491,x:-10.25,y:49.05,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:95.53,x:48.05,y:-21.3,regY:13.2}},{t:this.instance_13,p:{scaleX:0.9971,scaleY:0.9971,rotation:60.485,x:42,y:49.85,regY:12.8,regX:-45.2}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:77.2215,x:91.9,y:120.55,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:58.4204,x:91.5,y:123.65,regX:-10.2,regY:10.8}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-9.5177,y:185.6,x:33.8,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{rotation:18.6012,x:-3.95,regX:-1.4,scaleX:0.9979,scaleY:0.9979,y:-59.45,regY:7.4}},{t:this.instance_8,p:{scaleX:0.9949,scaleY:0.9949,rotation:8.6741,x:-41.5,y:185.4}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9603,y:90.3,x:-29.9}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-9.0426,x:24.85,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-4.3261,x:4.45,y:-80.5,scaleX:0.9979,scaleY:0.9979,regY:50.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-110.7815,x:-82.9,regX:44.5,y:55.6,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-72.9753,x:-59.75,y:138.95,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-102.7611,x:-59.95,y:138.85,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-72.6043,x:-59.8,y:-12.5,scaleX:0.9973,scaleY:0.9973}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7526,x:-10.25,y:49.05,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:94.7501,x:48.15,y:-21.35,regY:13.2}},{t:this.instance_13,p:{scaleX:0.9971,scaleY:0.9971,rotation:61.3481,x:43,y:49.95,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:78.0987,x:91.7,y:121.25,regX:-7.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:59.3087,x:91.5,y:124.5,regX:-10.1,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-9.811,y:185.6,x:33.8,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{rotation:18.6297,x:-3.9,regX:-1.4,scaleX:0.9979,scaleY:0.9979,y:-59.45,regY:7.4}},{t:this.instance_8,p:{scaleX:0.9949,scaleY:0.9949,rotation:8.6839,x:-41.45,y:185.4}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9551,y:90.3,x:-29.9}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.0302,x:24.85,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-4.297,x:4.4,y:-80.5,scaleX:0.9979,scaleY:0.9979,regY:50.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-110.9943,x:-84.65,regX:44.5,y:55,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-73.1897,x:-61.35,y:138.25,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-102.9743,x:-61.45,y:138.1,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-71.0578,x:-59.8,y:-12.45,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7561,x:-10.25,y:49,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:93.9686,x:48,y:-21.4,regY:13.3}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:62.2119,x:44,y:50,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:78.9771,x:91.65,y:122.1,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:60.198,x:91.3,y:125.2,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-10.1054,y:185.6,x:33.8,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{rotation:18.6596,x:-3.9,regX:-1.4,scaleX:0.9979,scaleY:0.9979,y:-59.45,regY:7.4}},{t:this.instance_8,p:{scaleX:0.9948,scaleY:0.9948,rotation:8.6921,x:-41.4,y:185.4}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9497,y:90.3,x:-29.85}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.015,x:24.85,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-4.2689,x:4.45,y:-80.5,scaleX:0.9979,scaleY:0.9979,regY:50.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-111.207,x:-86.6,regX:44.5,y:54.35,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-73.404,x:-62.8,y:137.4,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-103.1879,x:-62.95,y:137.3,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-69.5122,x:-59.8,y:-12.45,scaleX:0.9973,scaleY:0.9973}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7605,x:-10.25,y:49,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:93.1878,x:48,y:-21.35,regY:13.3}},{t:this.instance_13,p:{scaleX:0.9971,scaleY:0.9971,rotation:63.075,x:44.9,y:49.95,regY:12.8,regX:-45.2}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:79.8538,x:91.5,y:122.95,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:61.0869,x:91.05,y:125.9,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-10.3969,y:185.65,x:33.75,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{rotation:18.689,x:-3.95,regX:-1.4,scaleX:0.9979,scaleY:0.9979,y:-59.45,regY:7.4}},{t:this.instance_8,p:{scaleX:0.9949,scaleY:0.9949,rotation:8.7008,x:-41.45,y:185.4}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9454,y:90.3,x:-29.85}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.0017,x:24.9,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-4.2401,x:4.45,y:-80.45,scaleX:0.9979,scaleY:0.9979,regY:50.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-111.4204,x:-88.35,regX:44.5,y:53.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-73.6188,x:-64.3,y:136.6,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-103.4013,x:-64.6,y:136.5,regY:-0.5}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-67.966,x:-59.8,y:-12.4,scaleX:0.9973,scaleY:0.9973}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.764,x:-10.25,y:49.05,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:92.4077,x:48,y:-21.4,regY:13.3}},{t:this.instance_13,p:{scaleX:0.9971,scaleY:0.9971,rotation:63.9392,x:45.95,y:50.1,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:80.73,x:91.35,y:123.5,regX:-7.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:61.976,x:90.9,y:126.65,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-10.6917,y:185.65,x:33.65,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{rotation:18.7189,x:-3.9,regX:-1.4,scaleX:0.9979,scaleY:0.9979,y:-59.45,regY:7.4}},{t:this.instance_8,p:{scaleX:0.9949,scaleY:0.9949,rotation:8.7116,x:-41.45,y:185.35}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.94,y:90.25,x:-29.9}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9884,x:24.85,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-4.212,x:4.5,y:-80.5,scaleX:0.9979,scaleY:0.9979,regY:50.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-111.6337,x:-90.15,regX:44.5,y:52.75,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-73.8324,x:-65.75,y:135.65,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-103.6163,x:-66.05,y:135.6,regY:-0.5}},{t:this.instance,p:{regX:33.5,regY:9.4,rotation:-66.42,x:-59.7,y:-12.4,scaleX:0.9973,scaleY:0.9973}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7675,x:-10.25,y:49.05,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:91.6262,x:48.05,y:-21.4,regY:13.3}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:64.8023,x:47,y:50.1,regY:12.7,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:81.6078,x:91.25,y:124.3,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:62.8644,x:90.7,y:127.3,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-10.9853,y:185.65,x:33.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{rotation:18.7477,x:-3.9,regX:-1.4,scaleX:0.998,scaleY:0.998,y:-59.45,regY:7.4}},{t:this.instance_8,p:{scaleX:0.9949,scaleY:0.9949,rotation:8.7203,x:-41.45,y:185.35}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9348,y:90.25,x:-29.9}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9741,x:24.85,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-4.1837,x:4.45,y:-80.5,scaleX:0.9979,scaleY:0.9979,regY:50.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-111.847,x:-91.8,regX:44.5,y:51.9,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-74.0469,x:-67.15,y:134.75,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-103.8282,x:-67.5,y:134.65,regY:-0.5}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-64.8723,x:-59.75,y:-12.45,scaleX:0.9973,scaleY:0.9973}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.771,x:-10.25,y:49.05,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:90.845,x:48.05,y:-21.45,regY:13.2}},{t:this.instance_13,p:{scaleX:0.9971,scaleY:0.9971,rotation:65.6662,x:47.8,y:50.05,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:82.4842,x:91.05,y:124.95,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:63.7534,x:90.5,y:127.95,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-11.2794,y:185.65,x:33.6,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{rotation:18.7777,x:-4,regX:-1.4,scaleX:0.9979,scaleY:0.9979,y:-59.45,regY:7.4}},{t:this.instance_8,p:{scaleX:0.9949,scaleY:0.9949,rotation:8.7293,x:-41.4,y:185.35}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,y:90.25,x:-29.8}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9617,x:24.85,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-4.1557,x:4.5,y:-80.5,scaleX:0.9979,scaleY:0.9979,regY:50.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-112.0603,x:-93.5,regX:44.5,y:51.05,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-74.2603,x:-68.6,y:133.8,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.5,scaleX:0.9968,scaleY:0.9968,rotation:-104.0433,x:-68.8,y:133.6,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-63.3271,x:-59.8,y:-12.55,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7675,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:91.7787,x:48,y:-21.35,regY:13.3}},{t:this.instance_13,p:{scaleX:0.9971,scaleY:0.9971,rotation:66.3688,x:46.65,y:50.1,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:86.9929,x:89.05,y:125.6,regX:-7}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:67.8306,x:88.25,y:128.5,regX:-10.1,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-11.5202,y:185.65,x:33.65,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{rotation:18.2898,x:-3.95,regX:-1.4,scaleX:0.9979,scaleY:0.9979,y:-59.5,regY:7.4}},{t:this.instance_8,p:{scaleX:0.9949,scaleY:0.9949,rotation:8.7203,x:-41.45,y:185.35}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9348,y:90.3,x:-29.9}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9741,x:24.85,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-4.6794,x:4.3,y:-80.65,scaleX:0.9979,scaleY:0.9979,regY:50.3,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-113.948,x:-91.35,regX:44.5,y:52.15,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-76.1483,x:-63.65,y:134.05,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-105.9305,x:-63.9,y:133.9,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-65.2931,x:-59.8,y:-12.45,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.764,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9974,scaleY:0.9974,rotation:92.713,x:48,y:-21.5,regY:13.3}},{t:this.instance_13,p:{scaleX:0.9971,scaleY:0.9971,rotation:67.0714,x:45.55,y:50.1,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:91.4986,x:86.95,y:125.9,regX:-7.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:71.9067,x:85.95,y:128.85,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-11.7609,y:185.55,x:33.7,regX:3.4,regY:-50.5}},{t:this.instance_9,p:{rotation:17.8024,x:-4,regX:-1.4,scaleX:0.9979,scaleY:0.9979,y:-59.35,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9949,scaleY:0.9949,rotation:8.7116,x:-41.45,y:185.35}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.94,y:90.3,x:-29.9}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9884,x:24.85,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-5.2053,x:4.15,y:-80.65,scaleX:0.9979,scaleY:0.9979,regY:50.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-115.8353,x:-89.15,regX:44.5,y:53.2,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-78.0343,x:-58.75,y:134.1,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-107.8173,x:-59.05,y:134.05,regY:-0.5}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-67.2596,x:-59.8,y:-12.5,scaleX:0.9973,scaleY:0.9973}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7605,x:-10.25,y:49.05,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:93.6462,x:48,y:-21.4,regY:13.3}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:67.7741,x:44.35,y:50,regY:12.8,regX:-45.2}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:96.0076,x:84.85,y:126.3,regX:-7.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:75.985,x:83.6,y:129.4,regX:-10.1,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-12.0026,y:185.65,x:33.8,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{rotation:17.3137,x:-4,regX:-1.4,scaleX:0.9979,scaleY:0.9979,y:-59.45,regY:7.4}},{t:this.instance_8,p:{scaleX:0.9949,scaleY:0.9949,rotation:8.7008,x:-41.45,y:185.4}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9454,y:90.3,x:-29.85}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.0017,x:24.9,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-5.7307,x:3.95,y:-80.7,scaleX:0.9979,scaleY:0.9979,regY:50.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-117.7238,x:-87.05,regX:44.6,y:54.1,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-79.9211,x:-53.85,y:134.1,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-109.705,x:-54.1,y:134,regY:-0.5}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-69.2251,x:-59.8,y:-12.45,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7561,x:-10.25,y:49.05,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:94.5795,x:48.15,y:-21.35,regY:13.2}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:68.4768,x:43.2,y:49.9,regY:12.8,regX:-45.2}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:100.5161,x:82.75,y:126.85,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:80.0609,x:81.25,y:129.65,regX:-10.1,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-12.2434,y:185.65,x:33.8,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{rotation:16.826,x:-4.05,regX:-1.4,scaleX:0.9979,scaleY:0.9979,y:-59.45,regY:7.4}},{t:this.instance_8,p:{scaleX:0.9948,scaleY:0.9948,rotation:8.6921,x:-41.4,y:185.4}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9497,y:90.3,x:-29.85}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.015,x:24.85,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-6.2558,x:3.8,y:-80.8,scaleX:0.9978,scaleY:0.9978,regY:50.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-119.6112,x:-84.5,regX:44.5,y:55,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-81.808,x:-48.95,y:133.85,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-111.5928,x:-49.1,y:133.75,regY:-0.4}},{t:this.instance,p:{regX:33.6,regY:9.3,rotation:-71.1922,x:-59.75,y:-12.5,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7526,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:95.514,x:48,y:-21.3,regY:13.3}},{t:this.instance_13,p:{scaleX:0.9971,scaleY:0.9971,rotation:69.1796,x:42.05,y:49.8,regY:12.8,regX:-45.2}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:105.026,x:80.7,y:127.25,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.9971,scaleY:0.9971,rotation:84.1386,x:78.95,y:129.95,regX:-10.1,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-12.4847,y:185.6,x:33.85,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{rotation:16.3376,x:-4,regX:-1.4,scaleX:0.9979,scaleY:0.9979,y:-59.5,regY:7.4}},{t:this.instance_8,p:{scaleX:0.9949,scaleY:0.9949,rotation:8.6839,x:-41.45,y:185.45}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9551,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.0302,x:24.85,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-6.7806,x:3.65,y:-80.85,scaleX:0.9979,scaleY:0.9979,regY:50.4,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-121.4983,x:-82.35,regX:44.6,y:55.8,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-83.6951,x:-43.9,y:133.45,regY:-9,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-113.4802,x:-44.2,y:133.35,regY:-0.4}},{t:this.instance,p:{regX:33.6,regY:9.3,rotation:-73.1589,x:-59.75,y:-12.5,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7491,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:96.4473,x:48,y:-21.35,regY:13.3}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:69.8813,x:40.9,y:49.85,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:109.5341,x:78.55,y:127.7,regX:-7}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:88.2153,x:76.7,y:130.15,regX:-10.1,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-12.7254,y:185.65,x:33.9,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{rotation:15.849,x:-4,regX:-1.4,scaleX:0.9979,scaleY:0.9979,y:-59.5,regY:7.4}},{t:this.instance_8,p:{scaleX:0.9949,scaleY:0.9949,rotation:8.6741,x:-41.5,y:185.45}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9603,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-9.0426,x:24.85,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-7.3049,x:3.45,y:-80.9,scaleX:0.9979,scaleY:0.9979,regY:50.4,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-123.3866,x:-79.85,regX:44.5,y:56.6,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-85.5813,x:-39.1,y:132.9,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-115.3687,x:-39.3,y:132.8,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-75.1254,x:-59.75,y:-12.45,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7456,x:-10.25,y:49.05,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:97.3807,x:48.05,y:-21.35,regY:13.3}},{t:this.instance_13,p:{scaleX:0.9971,scaleY:0.9971,rotation:70.5852,x:39.75,y:49.7,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:114.0436,x:76.45,y:128,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.9971,scaleY:0.9971,rotation:92.2883,x:74.4,y:130.25,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-12.9668,y:185.65,x:34,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{rotation:15.3625,x:-4,regX:-1.4,scaleX:0.9979,scaleY:0.9979,y:-59.45,regY:7.4}},{t:this.instance_8,p:{scaleX:0.9949,scaleY:0.9949,rotation:8.6654,x:-41.5,y:185.45}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9665,y:90.3,x:-29.9}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-9.0569,x:24.85,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-7.8309,x:3.2,y:-81.1,scaleX:0.9979,scaleY:0.9979,regY:50.3,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-125.2743,x:-77.5,regX:44.5,y:57.2,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-87.4681,x:-34.2,y:132.15,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-117.255,x:-34.45,y:132.2,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-77.0923,x:-59.75,y:-12.4,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7421,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:98.3143,x:48,y:-21.35,regY:13.3}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:71.287,x:38.55,y:49.55,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:118.5528,x:74.35,y:128.25,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:96.3651,x:72.1,y:130.4,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.2084,y:185.65,x:34.05,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{rotation:14.8749,x:-4,regX:-1.4,scaleX:0.9979,scaleY:0.9979,y:-59.5,regY:7.4}},{t:this.instance_8,p:{scaleX:0.9949,scaleY:0.9949,rotation:8.6563,x:-41.45,y:185.45}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9718,y:90.3,x:-29.9}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.0702,x:24.9,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-8.3556,x:2.9,y:-81,scaleX:0.9979,scaleY:0.9979,regY:50.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-127.1615,x:-75.25,regX:44.5,y:57.85,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-89.3556,x:-29.35,y:131.35,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-119.1421,x:-29.6,y:131.15,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-79.0587,x:-59.8,y:-12.4,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7386,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9974,scaleY:0.9974,rotation:99.2482,x:48.05,y:-21.45,regY:13.3}},{t:this.instance_13,p:{scaleX:0.9971,scaleY:0.9971,rotation:71.9895,x:37.45,y:49.4,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:123.0617,x:72.15,y:128.5,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:100.4423,x:69.8,y:130.45,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.4489,y:185.65,x:34.05,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{rotation:14.386,x:-4.05,regX:-1.4,scaleX:0.998,scaleY:0.998,y:-59.45,regY:7.4}},{t:this.instance_8,p:{scaleX:0.9949,scaleY:0.9949,rotation:8.6476,x:-41.5,y:185.5}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.977,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-9.0836,x:24.85,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-8.8801,x:2.7,y:-81.05,scaleX:0.9979,scaleY:0.9979,regY:50.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-129.0492,x:-72.8,regX:44.5,y:58.4,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-91.238,x:-24.5,y:130.25,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-121.0289,x:-24.8,y:130.1,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-81.024,x:-59.8,y:-12.4,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7351,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:100.182,x:48.15,y:-21.3,regY:13.2}},{t:this.instance_13,p:{scaleX:0.9971,scaleY:0.9971,rotation:72.6927,x:36.3,y:49.2,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:127.5712,x:70.05,y:128.85,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:104.5199,x:67.55,y:130.55,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6896,y:185.65,x:34.1,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{rotation:13.8973,x:-3.9,regX:-1.3,scaleX:0.9979,scaleY:0.9979,y:-59.45,regY:7.4}},{t:this.instance_8,p:{scaleX:0.9949,scaleY:0.9949,rotation:8.6377,x:-41.5,y:185.5}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9824,y:90.3,x:-30}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.0978,x:24.85,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-9.4057,x:2.5,y:-81.15,scaleX:0.9978,scaleY:0.9978,regY:50.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-130.9376,x:-70.3,regX:44.5,y:58.75,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-93.1243,x:-19.75,y:129.05,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-122.9162,x:-20.05,y:128.85,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-82.99,x:-59.75,y:-12.35,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7316,x:-10.2,y:49.1,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:101.1148,x:48.1,y:-21.3,regY:13.3}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:73.395,x:35.15,y:49.05,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:132.0797,x:67.95,y:129,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:108.5972,x:65.3,y:130.5,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.9311,y:185.65,x:34.2,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{rotation:13.4105,x:-4,regX:-1.3,scaleX:0.9979,scaleY:0.9979,y:-59.45,regY:7.4}},{t:this.instance_8,p:{scaleX:0.9949,scaleY:0.9949,rotation:8.6298,x:-41.55,y:185.5}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9876,y:90.35,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-9.1104,x:24.9,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-9.9307,x:2.3,y:-81.15,scaleX:0.9979,scaleY:0.9979,regY:50.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-132.8246,x:-67.95,regX:44.5,y:59.1,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-95.0116,x:-15,y:127.7,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-124.8033,x:-15.35,y:127.6,regY:-0.5}},{t:this.instance,p:{regX:33.6,regY:9.3,rotation:-84.9567,x:-59.75,y:-12.5,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7281,x:-10.2,y:49.1,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:102.05,x:48.1,y:-21.25,regY:13.2}},{t:this.instance_13,p:{scaleX:0.9971,scaleY:0.9971,rotation:74.0981,x:34.1,y:48.8,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.997,scaleY:0.997,rotation:136.5893,x:65.8,y:129.25,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:112.6734,x:63.05,y:130.45,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.1725,y:185.65,x:34.25,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{rotation:12.9209,x:-4.05,regX:-1.4,scaleX:0.9979,scaleY:0.9979,y:-59.5,regY:7.4}},{t:this.instance_8,p:{scaleX:0.9949,scaleY:0.9949,rotation:8.6208,x:-41.5,y:185.5}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9929,y:90.35,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1237,x:24.9,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-10.4561,x:2.15,y:-81.25,scaleX:0.9979,scaleY:0.9979,regY:50.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-134.7123,x:-65.4,regX:44.5,y:59.25,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-96.8979,x:-10.35,y:126.2,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-126.691,x:-10.6,y:126.05,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-86.9244,x:-59.8,y:-12.3,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7254,x:-10.2,y:49.1,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:102.9828,x:48.05,y:-21.25,regY:13.3}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:74.8005,x:32.9,y:48.55,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:141.0982,x:63.7,y:129.3,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:116.7505,x:60.8,y:130.3,regX:-10.2,regY:10.8}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.4134,y:185.65,x:34.25,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{rotation:12.4344,x:-4.05,regX:-1.4,scaleX:0.9979,scaleY:0.9979,y:-59.5,regY:7.4}},{t:this.instance_8,p:{scaleX:0.9949,scaleY:0.9949,rotation:8.6121,x:-41.55,y:185.5}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9982,y:90.35,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-9.138,x:24.95,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-10.9812,x:1.95,y:-81.25,scaleX:0.9979,scaleY:0.9979,regY:50.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-136.6004,x:-63.05,regX:44.5,y:59.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-98.7849,x:-5.6,y:124.45,regY:-9,regX:4.4}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-128.5789,x:-6,y:124.4,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-88.8893,x:-59.8,y:-12.3,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7202,x:-10.2,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:103.9163,x:48,y:-21.3,regY:13.3}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:75.5027,x:31.9,y:48.25,regY:12.7,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:145.6071,x:61.55,y:129.4,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:120.8281,x:58.65,y:130.35,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.6541,y:185.65,x:34.15,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{rotation:11.945,x:-4.15,regX:-1.4,scaleX:0.9979,scaleY:0.9979,y:-59.5,regY:7.4}},{t:this.instance_8,p:{scaleX:0.9949,scaleY:0.9949,rotation:8.6021,x:-41.55,y:185.5}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0034,y:90.3,x:-30}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1513,x:24.9,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-11.5056,x:1.75,y:-81.3,scaleX:0.9979,scaleY:0.9979,regY:50.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-138.4877,x:-60.65,regX:44.5,y:59.65,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-100.6715,x:-1.1,y:122.6,regY:-9,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-130.4667,x:-1.5,y:122.5,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-90.8512,x:-59.8,y:-12.35,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-10.2,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:104.8505,x:48.2,y:-21.15,regY:13.2}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:76.2045,x:30.65,y:48.15,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:150.1157,x:59.45,y:129.55,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:124.9037,x:56.45,y:130.15,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.8959,y:185.6,x:34.2,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{rotation:11.4567,x:-3.95,regX:-1.3,scaleX:0.9979,scaleY:0.9979,y:-59.35,regY:7.4}},{t:this.instance_8,p:{scaleX:0.9949,scaleY:0.9949,rotation:8.5932,x:-41.55,y:185.55}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-30}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.9,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-12.0297,x:1.55,y:-81.35,scaleX:0.9979,scaleY:0.9979,regY:50.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-140.3744,x:-58.2,regX:44.5,y:59.65,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-102.5568,x:3.25,y:120.6,regY:-9.1,regX:4.5}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-132.354,x:2.95,y:120.55,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-92.8176,x:-59.85,y:-12.2,scaleX:0.9974,scaleY:0.9974}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-114.5,-212.2,237.9,509.4);


(lib.abuSufyan_icon = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.instance = new lib.CachedBmp_725();
	this.instance.setTransform(13,-304.6,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// flash0_ai
	this.instance_1 = new lib.CachedBmp_726();
	this.instance_1.setTransform(0,-356,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_1
	this.instance_2 = new lib.CharacterCivilian_09();
	this.instance_2.setTransform(53.95,42.85,0.5762,0.5762,0,0,180,-5.2,40.2);

	this.instance_3 = new lib.camel_01();
	this.instance_3.setTransform(186,-22.45,1.4589,1.4589,0,0,0,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3},{t:this.instance_2}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.abuSufyan_icon, new cjs.Rectangle(-0.1,-356,322.90000000000003,550.2), null);


(lib.abuSufyan_button = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_724();
	this.instance.setTransform(-52.4,-85.35,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_723();
	this.instance_1.setTransform(-57.55,-104.55,0.5,0.5);

	this.instance_2 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_2.setTransform(28.5,34.5,0.2169,0.2169,-92.6207,0,0,32.1,9.6);

	this.instance_3 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_3.setTransform(42.05,63.25,0.2168,0.2168,-132.204,0,0,12.9,0.2);

	this.instance_4 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_4.setTransform(42.15,63.25,0.2169,0.2169,-102.3915,0,0,3.6,-7.7);

	this.instance_5 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_5.setTransform(28.8,49.95,0.2168,0.2168,-140.2197,0,0,43.8,7.1);

	this.instance_6 = new lib.ch1_headcopy3("synched",0);
	this.instance_6.setTransform(41.8,19.45,0.217,0.217,-11.8362,0,0,3.3,51.8);

	this.instance_7 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_7.setTransform(39.9,29.35,0.2175,0.2175,0,0,0,1.4,-38.1);

	this.instance_8 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_8.setTransform(46.85,56.35,0.2163,0.2163,-8.9453,0,0,1.9,6.2);

	this.instance_9 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_9.setTransform(34.9,56.65,0.2165,0.2165,3.9006,0,0,1.6,-41.3);

	this.instance_10 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_10.setTransform(32.5,77.6,0.2164,0.2164,8.7136,0,0,2,-49.6);

	this.instance_11 = new lib.ch1_neckcopy2("synched",0);
	this.instance_11.setTransform(40.65,24,0.217,0.217,11.3328,0,0,0.5,7);

	this.instance_12 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_12.setTransform(48.85,77.65,0.2163,0.2163,-14.5372,0,0,4.2,-48.6);

	this.instance_13 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_13.setTransform(53.8,65.3,0.2168,0.2168,124.991,0,0,-10.4,9.2);

	this.instance_14 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_14.setTransform(54.45,65.2,0.2168,0.2168,150.2106,0,0,-7.9,12);

	this.instance_15 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_15.setTransform(48.2,47.65,0.2169,0.2169,76.0136,0,0,-43.2,11.6);

	this.instance_16 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_16.setTransform(51.95,32.65,0.2169,0.2169,104.8779,0,0,-31.8,11.3);

	this.instance_17 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_17.setTransform(39.25,47.85,0.2173,0.2173,1.7501,0,0,-3.6,-20.4);

	this.instance_18 = new lib.camel_leg_b_l_b("synched",0);
	this.instance_18.setTransform(-41.85,46.65,0.5523,0.5523,0,-4.4684,175.5316,5.4,-37.5);

	this.instance_19 = new lib.camel_leg_f_l_b("synched",0);
	this.instance_19.setTransform(-1.8,57.6,0.553,0.553,0,-7.1119,172.8881,3.8,-38);

	this.instance_20 = new lib.camel_leg_b_l_u("synched",0);
	this.instance_20.setTransform(-39.4,9.5,0.5527,0.5527,0,11.9341,-168.0659,2.6,-27.3);

	this.instance_21 = new lib.camel_leg_f_l_u("synched",0);
	this.instance_21.setTransform(-9.95,23.25,0.5531,0.5531,0,-6.6649,173.3351,-0.2,-24.7);

	this.instance_22 = new lib.camel_head("synched",0);
	this.instance_22.setTransform(25.8,-16.15,0.553,0.553,0,11.749,-168.251,12.2,11.2);

	this.instance_23 = new lib.camel_neck("synched",0);
	this.instance_23.setTransform(22.45,2.5,0.5529,0.5529,0,-19.9797,160.0203,9.1,12.7);

	this.instance_24 = new lib.camel_body("synched",0);
	this.instance_24.setTransform(-7.3,1.4,0.5535,0.5535,0,0,180,0.7,0.5);

	this.instance_25 = new lib.camel_leg_f_r_b("synched",0);
	this.instance_25.setTransform(-2.75,51.15,0.5531,0.5531,0,24.9665,-155.0335,3.8,-37.2);

	this.instance_26 = new lib.camel_leg_f_r_u("synched",0);
	this.instance_26.setTransform(10,16,0.5532,0.5532,0,24.7463,-155.2537,-1.4,-27.6);

	this.instance_27 = new lib.camel_tail("synched",0);
	this.instance_27.setTransform(-40.55,0.6,0.5531,0.5531,0,1.9223,-178.0777,-7.7,-35.4);

	this.instance_28 = new lib.camel_leg_b_r_b("synched",0);
	this.instance_28.setTransform(-47.4,36.7,0.5524,0.5524,0,14.711,-165.289,5,-36.8);

	this.instance_29 = new lib.camel_leg_b_r_u("synched",0);
	this.instance_29.setTransform(-27.5,4.85,0.5522,0.5522,0,38.5171,-141.4829,0.5,-28.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_29},{t:this.instance_28},{t:this.instance_27},{t:this.instance_26},{t:this.instance_25},{t:this.instance_24},{t:this.instance_23},{t:this.instance_22},{t:this.instance_21},{t:this.instance_20},{t:this.instance_19},{t:this.instance_18},{t:this.instance_17},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).to({state:[]},1).wait(1));

	// Layer_1
	this.instance_30 = new lib.abuSufyan_icon();
	this.instance_30.setTransform(10.85,24.25,0.377,0.377,0,0,180,131.9,-13.9);
	this.instance_30._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_30).wait(1).to({_off:false},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-61.1,-104.7,121.7,207.8);


// stage content:
(lib.LessonChapter1_08 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,169];
	this.streamSoundSymbolsList[0] = [{id:"beforewar2edit_08wav",startFrame:0,endFrame:170,loop:1,offset:8010}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("beforewar2edit_08wav",0,8010);
		this.InsertIntoSoundStreamData(soundInstance,0,170,1,8010);
	}
	this.frame_169 = function() {
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
			document.location.replace("https://ninzato.github.io/history-of-badr-war/LessonChapter1_09.html");
			}, 500);
			
		}
		
		this.prevBtn.addEventListener("click", fl_ClickToGoToWebPage_2);
		
		function fl_ClickToGoToWebPage_2() {
			createjs.Sound.play("popsound");
			
			setTimeout(function(){
			document.location.replace("https://ninzato.github.io/history-of-badr-war/LessonChapter1_07.html");
			}, 500);
			
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(169).call(this.frame_169).wait(1));

	// Subtitle
	this.instance = new lib.CachedBmp_718();
	this.instance.setTransform(195.55,597,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_717();
	this.instance_1.setTransform(165.6,564.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(170));

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.homeBtn},{t:this.prevBtn},{t:this.nextBtn}]}).wait(170));

	// interaction
	this.instance_2 = new lib.abuSufyan_button();
	this.instance_2.setTransform(484.8,457.45);
	new cjs.ButtonHelper(this.instance_2, 0, 1, 1);

	this.instance_3 = new lib.muslims_button();
	this.instance_3.setTransform(511.7,217.65);
	new cjs.ButtonHelper(this.instance_3, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_3},{t:this.instance_2}]},169).wait(1));

	// Muslims
	this.instance_4 = new lib.muslims_icon();
	this.instance_4.setTransform(860.3,218.75,0.8493,0.8493,0,0,0,0.2,0.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1).to({regX:-0.8,regY:-39.2,scaleX:0.8494,scaleY:0.8494,x:858.7,y:187.65},0).wait(1).to({x:858,y:190.05},0).wait(1).to({x:857.25,y:192.35},0).wait(1).to({x:856.5,y:194.65},0).wait(1).to({x:855.75,y:196.9},0).wait(1).to({x:854.95,y:199.1},0).wait(1).to({x:854.15,y:201.3},0).wait(1).to({x:853.3,y:203.45},0).wait(1).to({x:852.5,y:205.6},0).wait(1).to({x:851.65,y:207.7},0).wait(1).to({x:850.75,y:209.75},0).wait(1).to({x:849.9,y:211.75},0).wait(1).to({x:848.95,y:213.75},0).wait(1).to({x:848.05,y:215.7},0).wait(1).to({x:847.15,y:217.65},0).wait(1).to({x:846.2,y:219.55},0).wait(1).to({x:845.2,y:221.45},0).wait(1).to({x:844.25,y:223.3},0).wait(1).to({x:843.25,y:225.1},0).wait(1).to({x:842.25,y:226.9},0).wait(1).to({x:841.2,y:228.65},0).wait(1).to({x:840.15,y:230.35},0).wait(1).to({x:839.1,y:232.05},0).wait(1).to({x:838.05,y:233.7},0).wait(1).to({x:836.95,y:235.35},0).wait(1).to({x:835.85,y:236.95},0).wait(1).to({x:834.75,y:238.55},0).wait(1).to({x:833.6,y:240.1},0).wait(1).to({x:832.45,y:241.65},0).wait(1).to({x:831.3,y:243.15},0).wait(1).to({x:830.1,y:244.6},0).wait(1).to({x:828.9,y:246.05},0).wait(1).to({x:827.7,y:247.45},0).wait(1).to({x:826.5,y:248.85},0).wait(1).to({x:825.25,y:250.2},0).wait(1).to({x:824,y:251.55},0).wait(1).to({x:822.75,y:252.85},0).wait(1).to({x:821.45,y:254.15},0).wait(1).to({x:820.15,y:255.4},0).wait(1).to({x:818.85,y:256.65},0).wait(1).to({x:817.55,y:257.85},0).wait(1).to({x:816.2,y:259.05},0).wait(1).to({x:814.85,y:260.2},0).wait(1).to({x:813.45,y:261.3},0).wait(1).to({x:812.1,y:262.4},0).wait(1).to({x:810.7,y:263.5},0).wait(1).to({x:809.3,y:264.55},0).wait(1).to({x:807.85,y:265.55},0).wait(1).to({x:806.4,y:266.55},0).wait(1).to({x:804.95,y:267.55},0).wait(1).to({x:803.5,y:268.5},0).wait(1).to({x:802,y:269.4},0).wait(1).to({x:800.5,y:270.3},0).wait(1).to({x:799,y:271.2},0).wait(1).to({x:797.45,y:272.05},0).wait(1).to({x:795.9,y:272.9},0).wait(1).to({x:794.35,y:273.7},0).wait(1).to({x:792.8,y:274.45},0).wait(1).to({x:791.2,y:275.2},0).wait(1).to({x:789.6,y:275.95},0).wait(1).to({x:788,y:276.65},0).wait(1).to({x:786.35,y:277.35},0).wait(1).to({x:784.7,y:278},0).wait(1).to({x:783.05,y:278.6},0).wait(1).to({x:781.35,y:279.25},0).wait(1).to({x:779.65,y:279.8},0).wait(1).to({x:777.95,y:280.4},0).wait(1).to({x:776.25,y:280.9},0).wait(1).to({x:774.5,y:281.45},0).wait(1).to({x:772.75,y:281.95},0).wait(1).to({x:771,y:282.4},0).wait(1).to({x:769.2,y:282.85},0).wait(1).to({x:767.45,y:283.25},0).wait(1).to({x:765.6,y:283.65},0).wait(1).to({x:763.8,y:284.05},0).wait(1).to({x:761.95,y:284.4},0).wait(1).to({x:760.1,y:284.7},0).wait(1).to({x:758.25,y:285},0).wait(1).to({x:756.35,y:285.3},0).wait(1).to({x:754.45,y:285.55},0).wait(1).to({x:752.55,y:285.8},0).wait(1).to({x:750.6,y:286},0).wait(1).to({x:748.65,y:286.2},0).wait(1).to({x:746.7,y:286.35},0).wait(1).to({x:744.7,y:286.5},0).wait(1).to({x:742.75,y:286.6},0).wait(1).to({x:740.7,y:286.7},0).wait(1).to({x:738.7,y:286.75},0).wait(1).to({x:736.65,y:286.8},0).wait(1).to({x:734.6,y:286.85},0).wait(1).to({x:732.55},0).wait(1).to({x:730.45,y:286.8},0).wait(1).to({x:728.35,y:286.75},0).wait(1).to({x:726.25,y:286.7},0).wait(1).to({x:724.1,y:286.6},0).wait(1).to({x:721.95,y:286.5},0).wait(1).to({x:719.8,y:286.35},0).wait(1).to({x:717.6,y:286.15},0).wait(1).to({x:715.4,y:286},0).wait(1).to({x:713.2,y:285.8},0).wait(1).to({x:710.95,y:285.55},0).wait(1).to({x:708.7,y:285.3},0).wait(1).to({x:706.45,y:285},0).wait(1).to({x:704.15,y:284.7},0).wait(1).to({x:701.85,y:284.35},0).wait(1).to({x:699.55,y:284},0).wait(1).to({x:697.2,y:283.65},0).wait(1).to({x:694.85,y:283.25},0).wait(1).to({x:692.5,y:282.8},0).wait(1).to({x:690.1,y:282.35},0).wait(1).to({x:687.7,y:281.9},0).wait(1).to({x:685.3,y:281.4},0).wait(1).to({x:682.85,y:280.85},0).wait(1).to({x:680.4,y:280.3},0).wait(1).to({x:677.95,y:279.75},0).wait(1).to({x:675.45,y:279.15},0).wait(1).to({x:672.95,y:278.55},0).wait(1).to({x:670.4,y:277.9},0).wait(1).to({x:667.85,y:277.2},0).wait(1).to({x:665.3,y:276.55},0).wait(1).to({x:662.7,y:275.8},0).wait(1).to({x:660.1,y:275.05},0).wait(1).to({x:657.5,y:274.3},0).wait(1).to({x:654.85,y:273.5},0).wait(1).to({x:652.2,y:272.7},0).wait(1).to({x:649.55,y:271.85},0).wait(1).to({x:646.85,y:271},0).wait(1).to({x:644.15,y:270.1},0).wait(1).to({x:641.4,y:269.15},0).wait(1).to({x:638.65,y:268.2},0).wait(1).to({x:635.9,y:267.25},0).wait(1).to({x:633.1,y:266.25},0).wait(1).to({x:630.3,y:265.2},0).wait(1).to({x:627.45,y:264.15},0).wait(1).to({x:624.6,y:263.1},0).wait(1).to({x:621.7,y:262},0).wait(1).to({x:618.8,y:260.85},0).wait(1).to({x:615.9,y:259.7},0).wait(1).to({x:612.95,y:258.5},0).wait(1).to({x:610,y:257.3},0).wait(1).to({x:607.05,y:256.1},0).wait(1).to({x:604.05,y:254.8},0).wait(1).to({x:601,y:253.5},0).wait(1).to({x:597.95,y:252.2},0).wait(1).to({x:594.9,y:250.85},0).wait(1).to({x:591.8,y:249.45},0).wait(1).to({x:588.7,y:248.05},0).wait(1).to({x:585.55,y:246.65},0).wait(1).to({x:582.4,y:245.15},0).wait(1).to({x:579.25,y:243.65},0).wait(1).to({x:576,y:242.15},0).wait(1).to({x:572.8,y:240.6},0).wait(1).to({x:569.55,y:239},0).wait(1).to({x:566.25,y:237.4},0).wait(1).to({x:562.95,y:235.75},0).wait(1).to({x:559.65,y:234.1},0).wait(1).to({x:556.3,y:232.4},0).wait(1).to({x:552.9,y:230.65},0).wait(1).to({x:549.5,y:228.9},0).wait(1).to({x:546.1,y:227.1},0).wait(1).to({x:542.6,y:225.3},0).wait(1).to({x:539.15,y:223.4},0).wait(1).to({x:535.65,y:221.55},0).wait(1).to({x:532.1,y:219.6},0).wait(1).to({x:528.55,y:217.65},0).wait(1).to({x:524.95,y:215.65},0).wait(1).to({x:521.3,y:213.65},0).wait(1).to({x:517.65,y:211.55},0).to({_off:true},1).wait(1));

	// abu_sufyan
	this.instance_5 = new lib.abuSufyan_icon();
	this.instance_5.setTransform(168.5,-73.65,0.3771,0.3771,0,0,180,129.3,-13.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1).to({regX:161.9,regY:-79.2,x:154.55,y:-94.5},0).wait(1).to({x:153.15,y:-90.65},0).wait(1).to({x:151.8,y:-86.7},0).wait(1).to({x:150.55,y:-82.8},0).wait(1).to({x:149.3,y:-78.85},0).wait(1).to({x:148.15,y:-74.9},0).wait(1).to({x:147,y:-70.9},0).wait(1).to({x:145.9,y:-66.95},0).wait(1).to({x:144.85,y:-62.95},0).wait(1).to({x:143.8,y:-58.95},0).wait(1).to({x:142.8,y:-54.95},0).wait(1).to({x:141.85,y:-50.9},0).wait(1).to({x:140.9,y:-46.9},0).wait(1).to({x:140,y:-42.85},0).wait(1).to({x:139.15,y:-38.8},0).wait(1).to({x:138.35,y:-34.8},0).wait(1).to({x:137.55,y:-30.7},0).wait(1).to({x:136.8,y:-26.7},0).wait(1).to({x:136.1,y:-22.65},0).wait(1).to({x:135.4,y:-18.55},0).wait(1).to({x:134.8,y:-14.5},0).wait(1).to({x:134.25,y:-10.4},0).wait(1).to({x:133.7,y:-6.3},0).wait(1).to({x:133.25,y:-2.2},0).wait(1).to({x:132.8,y:1.9},0).wait(1).to({x:132.45,y:6.05},0).wait(1).to({x:132.15,y:10.15},0).wait(1).to({x:131.95,y:14.25},0).wait(1).to({x:131.8,y:18.4},0).wait(1).to({x:131.75,y:22.55},0).wait(1).to({x:131.8,y:26.65},0).wait(1).to({x:131.95,y:30.8},0).wait(1).to({x:132.2,y:34.9},0).wait(1).to({x:132.6,y:39},0).wait(1).to({x:133.15,y:43.1},0).wait(1).to({x:133.85,y:47.15},0).wait(1).to({x:134.8,y:51.15},0).wait(1).to({x:136.1,y:55.1},0).wait(1).to({x:137.5,y:58.95},0).wait(1).to({x:138.95,y:62.85},0).wait(1).to({x:140.5,y:66.65},0).wait(1).to({x:142.15,y:70.45},0).wait(1).to({x:143.8,y:74.25},0).wait(1).to({x:145.5,y:78},0).wait(1).to({x:147.25,y:81.75},0).wait(1).to({x:149,y:85.5},0).wait(1).to({x:150.8,y:89.2},0).wait(1).to({x:152.65,y:92.9},0).wait(1).to({x:154.5,y:96.6},0).wait(1).to({x:156.4,y:100.25},0).wait(1).to({x:158.35,y:103.9},0).wait(1).to({x:160.3,y:107.5},0).wait(1).to({x:162.3,y:111.15},0).wait(1).to({x:164.35,y:114.7},0).wait(1).to({x:166.4,y:118.3},0).wait(1).to({x:168.5,y:121.85},0).wait(1).to({x:170.65,y:125.4},0).wait(1).to({x:172.8,y:128.9},0).wait(1).to({x:175,y:132.4},0).wait(1).to({x:177.25,y:135.9},0).wait(1).to({x:179.5,y:139.35},0).wait(1).to({x:181.85,y:142.75},0).wait(1).to({x:184.2,y:146.15},0).wait(1).to({x:186.6,y:149.5},0).wait(1).to({x:189,y:152.85},0).wait(1).to({x:191.5,y:156.15},0).wait(1).to({x:194.05,y:159.4},0).wait(1).to({x:196.6,y:162.6},0).wait(1).to({x:199.25,y:165.8},0).wait(1).to({x:201.95,y:168.95},0).wait(1).to({x:204.7,y:172},0).wait(1).to({x:207.5,y:175.05},0).wait(1).to({x:210.4,y:178.05},0).wait(1).to({x:213.3,y:180.9},0).wait(1).to({x:216.25,y:183.8},0).wait(1).to({x:219.15,y:186.7},0).wait(1).to({x:222,y:189.7},0).wait(1).to({x:224.9,y:192.65},0).wait(1).to({x:227.75,y:195.65},0).wait(1).to({x:230.55,y:198.65},0).wait(1).to({x:233.4,y:201.65},0).wait(1).to({x:236.2,y:204.7},0).wait(1).to({x:239,y:207.7},0).wait(1).to({x:241.8,y:210.75},0).wait(1).to({x:244.6,y:213.8},0).wait(1).to({x:247.35,y:216.85},0).wait(1).to({x:250.1,y:219.95},0).wait(1).to({x:252.9,y:223},0).wait(1).to({x:255.65,y:226.1},0).wait(1).to({x:258.4,y:229.15},0).wait(1).to({x:261.1,y:232.25},0).wait(1).to({x:263.85,y:235.35},0).wait(1).to({x:266.55,y:238.45},0).wait(1).to({x:269.3,y:241.6},0).wait(1).to({x:272,y:244.7},0).wait(1).to({x:274.7,y:247.85},0).wait(1).to({x:277.35,y:250.95},0).wait(1).to({x:280.05,y:254.1},0).wait(1).to({x:282.7,y:257.25},0).wait(1).to({x:285.4,y:260.4},0).wait(1).to({x:288.05,y:263.55},0).wait(1).to({x:290.7,y:266.75},0).wait(1).to({x:293.3,y:269.9},0).wait(1).to({x:295.95,y:273.1},0).wait(1).to({x:298.55,y:276.3},0).wait(1).to({x:301.15,y:279.5},0).wait(1).to({x:303.75,y:282.7},0).wait(1).to({x:306.35,y:285.95},0).wait(1).to({x:308.9,y:289.2},0).wait(1).to({x:311.45,y:292.45},0).wait(1).to({x:314,y:295.7},0).wait(1).to({x:316.55,y:298.95},0).wait(1).to({x:319.05,y:302.25},0).wait(1).to({x:321.5,y:305.5},0).wait(1).to({x:324,y:308.85},0).wait(1).to({x:326.45,y:312.15},0).wait(1).to({x:328.9,y:315.5},0).wait(1).to({x:331.3,y:318.8},0).wait(1).to({x:333.85,y:322.1},0).wait(1).to({x:336.4,y:325.3},0).wait(1).to({x:339.05,y:328.5},0).wait(1).to({x:341.7,y:331.65},0).wait(1).to({x:344.4,y:334.75},0).wait(1).to({x:347.2,y:337.85},0).wait(1).to({x:349.95,y:340.9},0).wait(1).to({x:352.75,y:343.9},0).wait(1).to({x:355.6,y:346.9},0).wait(1).to({x:358.45,y:349.9},0).wait(1).to({x:361.35,y:352.85},0).wait(1).to({x:364.25,y:355.75},0).wait(1).to({x:367.2,y:358.7},0).wait(1).to({x:370.1,y:361.6},0).wait(1).to({x:373.05,y:364.45},0).wait(1).to({x:376.05,y:367.35},0).wait(1).to({x:379.05,y:370.2},0).wait(1).to({x:382.05,y:373},0).wait(1).to({x:385.05,y:375.85},0).wait(1).to({x:388.1,y:378.65},0).wait(1).to({x:391.1,y:381.45},0).wait(1).to({x:394.15,y:384.25},0).wait(1).to({x:397.25,y:387},0).wait(1).to({x:400.3,y:389.75},0).wait(1).to({x:403.4,y:392.5},0).wait(1).to({x:406.45,y:395.25},0).wait(1).to({x:409.55,y:398},0).wait(1).to({x:412.7,y:400.7},0).wait(1).to({x:415.8,y:403.4},0).wait(1).to({x:418.9,y:406.1},0).wait(1).to({x:422.05,y:408.8},0).wait(1).to({x:425.2,y:411.45},0).wait(1).to({x:428.35,y:414.15},0).wait(1).to({x:431.5,y:416.8},0).wait(1).to({x:434.7,y:419.45},0).wait(1).to({x:437.85,y:422.1},0).wait(1).to({x:441.05,y:424.7},0).wait(1).to({x:444.25,y:427.35},0).wait(1).to({x:447.4,y:429.95},0).wait(1).to({x:450.65,y:432.55},0).wait(1).to({x:453.85,y:435.15},0).wait(1).to({x:457.1,y:437.7},0).wait(1).to({x:460.3,y:440.3},0).wait(1).to({x:463.55,y:442.85},0).wait(1).to({x:466.8,y:445.4},0).wait(1).to({x:470.1,y:447.9},0).wait(1).to({x:473.35,y:450.4},0).wait(1).to({x:476.65,y:452.9},0).wait(1).to({x:480,y:455.35},0).wait(1).to({x:483.4,y:457.7},0).to({_off:true},1).wait(1));

	// flash0_ai
	this.instance_6 = new lib.CachedBmp_719();
	this.instance_6.setTransform(-447.85,-272,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(170));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(192.1,88,1731.6000000000001,926.5);
// library properties:
lib.properties = {
	id: 'A6F1A483617F544186FFC32FE4892FD2',
	width: 1280,
	height: 720,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/CachedBmp_719.png?1655324429766", id:"CachedBmp_719"},
		{src:"images/LessonChapter1_08_atlas_1.png?1655324429469", id:"LessonChapter1_08_atlas_1"},
		{src:"sounds/beforewar2edit_08wav.mp3?1655324429766", id:"beforewar2edit_08wav"},
		{src:"sounds/popsound.mp3?1655324429766", id:"popsound"}
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