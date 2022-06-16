(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"LessonChapter1_06_atlas_1", frames: [[0,268,707,707],[1336,702,88,153],[709,268,271,419],[1014,838,132,102],[1014,734,133,102],[982,268,330,317],[1314,268,228,432],[1544,268,331,292],[982,587,175,145],[1544,562,175,144],[709,689,175,145],[1159,702,175,144],[1159,587,126,111],[886,734,126,111],[709,836,126,111],[0,977,1779,132],[0,0,1914,266],[1148,848,91,87],[837,847,91,88]]},
		{name:"LessonChapter1_06_atlas_2", frames: [[0,1082,793,793],[0,0,1920,1080]]}
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



(lib.CachedBmp_685 = function() {
	this.initialize(ss["LessonChapter1_06_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_684 = function() {
	this.initialize(ss["LessonChapter1_06_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_673 = function() {
	this.initialize(ss["LessonChapter1_06_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_683 = function() {
	this.initialize(ss["LessonChapter1_06_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_671 = function() {
	this.initialize(ss["LessonChapter1_06_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_670 = function() {
	this.initialize(ss["LessonChapter1_06_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_669 = function() {
	this.initialize(ss["LessonChapter1_06_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_682 = function() {
	this.initialize(ss["LessonChapter1_06_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_681 = function() {
	this.initialize(ss["LessonChapter1_06_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_666 = function() {
	this.initialize(ss["LessonChapter1_06_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_665 = function() {
	this.initialize(ss["LessonChapter1_06_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_664 = function() {
	this.initialize(ss["LessonChapter1_06_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_663 = function() {
	this.initialize(ss["LessonChapter1_06_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_662 = function() {
	this.initialize(ss["LessonChapter1_06_atlas_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_661 = function() {
	this.initialize(ss["LessonChapter1_06_atlas_1"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_660 = function() {
	this.initialize(ss["LessonChapter1_06_atlas_1"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_659 = function() {
	this.initialize(ss["LessonChapter1_06_atlas_1"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_658 = function() {
	this.initialize(ss["LessonChapter1_06_atlas_1"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CompoundPath = function() {
	this.initialize(ss["LessonChapter1_06_atlas_1"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.Group_1 = function() {
	this.initialize(ss["LessonChapter1_06_atlas_1"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.Chap2Scene11 = function() {
	this.initialize(ss["LessonChapter1_06_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



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
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#ABD4EF").s().p("AnhOKQhhhpg0iIQgyiEAAiPQAAjEBciqQCdkgBdixQCHkCBojXIBjjNIBjDNQBnDVCIEEQBXCkCjEtQBzDUgcD0QgdD5ilCxQhiBph/A4Qh7A1iFAAQkZAAjIjWg");
	this.shape.setTransform(30.272,6.7447,0.0892,0.0892);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#ABD4EF").s().p("AnhOKQhhhpg0iIQgyiEAAiPQAAjEBciqQCdkgBdixQCHkCBojXIBjjNIBjDNQBnDVCIEEQBXCkCjEtQBzDUgcD0QgdD5ilCxQhiBph/A4Qh7A1iFAAQkZAAjIjWg");
	this.shape_1.setTransform(-29.414,-5.3331,0.1019,0.1019);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-36.3,-16.7,72.69999999999999,33.5);


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
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#ABD4EF").s().p("AnhOKQhhhpg0iIQgyiEAAiPQAAjEBciqQCdkgBdixQCHkCBojXIBjjNIBjDNQBnDVCIEEQBXCkCjEtQBzDUgcD0QgdD5ilCxQhiBph/A4Qh7A1iFAAQkZAAjIjWg");
	this.shape.setTransform(0.0258,-0.0027,0.0562,0.0562);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.8,-6.3,7.699999999999999,12.6);


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
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#ABD4EF").s().p("AnhOKQhhhpg0iIQgyiEAAiPQAAjEBciqQCdkgBdixQCHkCBojXIBjjNIBjDNQBnDVCIEEQBXCkCjEtQBzDUgcD0QgdD5ilCxQhiBph/A4Qh7A1iFAAQkZAAjIjWg");
	this.shape.setTransform(0.0258,-0.0027,0.0562,0.0562);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.8,-6.3,7.699999999999999,12.6);


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
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#ABD4EF").s().p("AnhOKQhhhpg0iIQgyiEAAiPQAAjEBciqQCdkgBdixQCHkCBojXIBjjNIBjDNQBnDVCIEEQBXCkCjEtQBzDUgcD0QgdD5ilCxQhiBph/A4Qh7A1iFAAQkZAAjIjWg");
	this.shape.setTransform(-0.0113,-0.0062,0.074,0.074);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5,-8.3,10.1,16.6);


(lib.ripple = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_684();
	this.instance.setTransform(-176.65,-176.65,0.5,0.5);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AqxZkQk/iHj2j2Qj2j2iHk/QiLlJgBlpQABloCLlKQCHk+D2j2QD2j2E/iHQFJiMFoAAQFpAAFJCMQE/CHD2D2QD2D2CHE+QCLFKABFoQgBFpiLFJQiHE/j2D2Qj2D2k/CHQlJCMlpAAQloAAlJiMgAqi4+Qk3CEjwDxQjxDwiDE3QiJFCAAFgQAAFhCJFCQCDE3DxDxQDwDwE3CEQFDCJFfAAQFgAAFDiJQE3iEDxjwQDwjxCDk3QCJlCAAlhQAAlgiJlCQiDk3jwjwQjxjxk3iEQlDiJlgAAQlfAAlDCJgAnSRSQjXhbinimQilinhcjXQhfjfAAj0QAAjzBfjfQBcjXClinQCnimDXhbQDgheDyAAQD0AADfBeQDXBbCnCmQClCnBcDXQBfDfAADzQAAD0hfDfQhcDXilCnQinCmjXBbQjfBej0AAQjyAAjghegAm6wZQjNBWieCeQieCehWDNQhbDUABDmQgBDnBbDUQBWDNCeCeQCeCeDNBWQDTBaDnAAQDnAADVhaQDMhWCeieQCeieBWjNQBbjUgBjnQABjmhbjUQhWjNieieQieiejMhWQjVhajnAAQjnAAjTBagAk+L0QiUg/hxhxQhxhyg/iTQhAiYAAinQAAimBAiYQA/iTBxhyQByhxCTg/QCZhAClAAQCnAACYBAQCTA+ByByQBxByA/CTQBBCYAACmQAACnhBCYQg/CThxByQhyBxiTA/QiYBAinAAQimAAiYhAgAkfqpQiFA5hmBmQhmBng4CEQg7CJAACWQAACWA7CKQA4CEBmBnQBmBmCFA5QCJA6CWAAQCXAACJg6QCFg5BmhmQBnhnA4iEQA6iKABiWQgBiWg6iJQg4iEhnhnQhmhmiFg5QiJg6iXAAQiWAAiJA6g");
	this.shape.setTransform(0,0.025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("Aq1ZsQlAiHj3j3Qj3j4iIlAQiMlMgBlqQABlpCMlMQCIlAD3j3QD3j3FAiIQFMiNFpAAQFqAAFMCNQFACID4D3QD3D3CHFAQCMFLABFqQgBFqiMFMQiHFAj3D4Qj4D3lACHQlLCNlrAAQlqAAlLiNgAqm5GQk4CEjxDyQjyDyiFE4QiJFFAAFhQAAFiCJFEQCFE5DyDyQDxDyE4CEQFFCJFhAAQFiAAFFiJQE4iEDyjyQDyjyCEk5QCJlEAAliQAAlhiJlFQiEk4jyjyQjyjyk4iEQlFiJliAAQlhAAlFCJgAnURYQjZhciminQioinhcjZQhfjgAAj1QAAj0BfjgQBcjZCoinQCminDZhbQDghfD0AAQD1AADhBfQDYBbCmCnQCoCnBcDZQBfDgAAD0QAAD1hfDgQhcDZioCnQimCnjYBcQjhBej1AAQj0AAjghegAm9weQjNBXifCeQieCfhYDNQhaDVAADoQAADpBaDUQBYDOCeCfQCfCfDNBWQDVBbDoAAQDpAADUhbQDOhWCfifQCfifBXjOQBajUAAjpQAAjohajVQhXjNififQifiejOhXQjUhbjpAAQjoAAjVBbgAk/L4QiVg/hxhyQhzhyg/iUQhBiaABinQgBimBBiaQA/iTBzhzQByhyCUg/QCZhBCmAAQCnAACaBBQCUA/ByByQByBzA/CTQBBCaAACmQAACnhBCaQg/CUhyByQhyByiUA/QiaBBinAAQimAAiZhBgAkhqsQiFA4hnBnQhnBog4CFQg6CKAACWQAACXA6CKQA4CGBnBnQBnBnCFA4QCLA7CWAAQCXAACLg7QCFg4BnhnQBnhnA5iGQA6iKAAiXQAAiWg6iKQg5iFhnhoQhnhniFg4QiLg7iXAAQiWAAiLA7g");
	this.shape_1.setTransform(0,0.025);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("Aq5Z1QlCiJj3j4Qj5j5iIlCQiOlNAAlsQAAlrCOlOQCIlCD5j4QD3j4FCiJQFOiNFrAAQFsAAFOCNQFCCJD3D4QD5D4CIFCQCOFNAAFsQAAFsiOFNQiIFCj5D5Qj3D4lCCJQlOCNlsAAQlrAAlOiNgAqo5OQk7CFjyDzQj0DziFE6QiKFGAAFjQAAFkCKFGQCFE6D0DzQDyDzE7CFQFFCKFjAAQFkAAFGiKQE6iFDzjzQDzjzCFk6QCKlGAAlkQAAljiKlGQiFk6jzjzQjzjzk6iFQlGiKlkAAQljAAlFCKgAnXRdQjZhcioioQioiohdjaQhfjhABj2QgBj1BfjiQBdjZCoioQCoioDZhcQDihfD1AAQD2AADiBfQDZBcCoCoQCoCoBdDZQBfDiAAD1QAAD3hfDgQhdDaioCoQinCojaBcQjiBgj2AAQj1AAjihggAm+wkQjQBYifCfQifCfhYDPQhbDWAADpQAADqBbDWQBYDOCfCgQCfCgDQBXQDVBbDpAAQDqAADWhbQDOhXCgigQCgigBXjOQBbjWAAjqQAAjphbjWQhXjPigifQigifjOhYQjWhbjqAAQjpAAjVBbgAlBL8QiVhAhyhyQhzhzg/iVQhCiaAAioQAAinBCibQA/iUBzhyQByhzCVhAQCahBCnAAQCoAACaBBQCVA/BzB0QBzByA+CUQBCCbAACnQAACohCCaQg+CVhzBzQhzByiVBAQiaBBioAAQinAAiahBgAkiqwQiGA5hnBoQhnBng6CGQg6CLAACXQAACYA6CLQA6CGBnBnQBnBoCGA5QCMA7CWAAQCYAACLg7QCGg5BnhoQBohnA5iGQA7iLAAiYQAAiXg7iLQg5iGhohnQhnhoiGg5QiLg6iYAAQiWAAiMA6g");
	this.shape_2.setTransform(0,0.025);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("Aq8Z9QlDiJj6j6Qj5j6iKlDQiOlPAAluQAAltCOlPQCKlED5j5QD6j6FDiJQFPiOFtAAQFuAAFPCOQFDCJD6D6QD5D5CKFEQCNFOABFuQgBFuiNFPQiKFDj5D6Qj6D6lDCJQlPCOluAAQltAAlPiOgAqs5WQk8CFj0D1Qj0D0iGE8QiLFHABFlQgBFmCLFHQCGE8D0D0QD0D1E8CFQFICLFkAAQFmAAFIiLQE7iFD1j1QDzj0CGk8QCLlHAAlmQAAlliLlHQiGk8jzj0Qj1j1k7iFQlIiLlmAAQlkAAlICLgAnZRjQjahdipioQipiphdjbQhgjjAAj3QAAj3BgjiQBdjbCpioQCpipDahdQDjhgD2AAQD3AADjBgQDbBdCoCpQCpCoBdDbQBgDiAAD3QAAD4hgDiQhdDbipCpQioCojbBdQjjBgj3AAQj2AAjjhggAnBwpQjQBYigCgQigCghZDQQhbDXABDqQgBDrBbDXQBZDQCgCgQCgCgDQBYQDXBcDqAAQDrAADXhcQDQhYCgigQCgigBZjQQBbjXAAjrQAAjqhbjXQhZjQigigQigigjQhYQjXhbjrAAQjqAAjXBbgAlDMAQiWhAhyhzQh0h0hAiVQhBibAAipQAAioBBibQBAiVB0hzQBzh0CVhAQCbhBCoAAQCqAACaBBQCWBABzB0QBzBzBACVQBCCbgBCoQABCphCCbQhACVhzB0QhzBziWBAQiaBBiqAAQipAAiahBgAkkqzQiGA5hnBoQhpBog5CHQg7CLAACYQAACYA7CMQA5CHBpBoQBnBoCGA5QCMA7CYAAQCZAACMg7QCGg5BohoQBphoA4iHQA8iMAAiYQAAiYg8iLQg4iHhphoQhohoiGg5QiMg7iZAAQiYAAiMA7g");
	this.shape_3.setTransform(0,0.025);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("ArAaFQlEiKj8j6Qj6j8iKlFQiPlQAAlwQAAlvCPlRQCKlFD6j7QD8j6FEiKQFSiPFuAAQFwAAFRCPQFECKD8D6QD6D7CKFFQCPFRAAFvQAAFwiPFQQiKFFj6D8Qj8D6lECKQlRCPlwAAQlvAAlRiPgAqw5eQk9CGj1D2Qj1D1iHE9QiMFJABFnQgBFoCMFIQCHE+D1D1QD1D2E9CGQFJCMFnAAQFoAAFIiMQE+iGD2j2QD1j1CGk+QCMlIgBloQABlniMlJQiGk9j1j1Qj2j2k+iGQlIiMloAAQlnAAlJCMgAnbRoQjchciqiqQipiqhejcQhgjkAAj4QAAj4BgjkQBejbCpiqQCqipDchdQDjhhD4AAQD5AADjBhQDcBdCqCpQCpCqBeDbQBgDkAAD4QAAD5hgDjQheDcipCqQipCqjdBcQjjBhj5AAQj4AAjjhhgAnDwuQjRBYiiChQigChhZDRQhbDYgBDrQABDsBbDYQBZDRCgChQCiChDRBZQDXBbDsAAQDtAADYhbQDQhZCiihQChihBYjRQBcjYAAjsQAAjrhcjYQhYjRihihQiiihjQhYQjYhcjtAAQjsAAjXBcgAlFMEQiWhBhzhzQh0h0hAiXQhCibABiqQgBipBCicQBAiWB0hzQB0h0CVhAQCchCCpAAQCrAACbBCQCWA/B0B1QBzBzBACWQBDCcAACpQAACqhDCbQhACXhzB0Qh0BziWBBQibBBirAAQipAAichBgAkkq2QiIA5hoBpQhpBog5CIQg8CMABCYQgBCZA8CNQA5CHBpBpQBoBoCIA6QCMA7CYAAQCZAACNg7QCHg6BphoQBphpA5iHQA8iNgBiZQABiYg8iMQg5iIhphoQhphpiHg5QiNg8iZAAQiYAAiMA8g");
	this.shape_4.setTransform(0,0.025);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("ArDaNQlHiKj8j8Qj8j8iKlHQiQlTAAlxQAAlxCQlTQCKlGD8j8QD8j8FHiKQFSiQFxAAQFxAAFTCQQFHCKD8D8QD8D8CKFGQCQFTAAFxQAAFxiQFTQiKFHj8D8Qj8D8lHCKQlSCQlyAAQlxAAlSiQgAqz5mQk/CHj2D2Qj3D3iHE+QiMFMAAFoQAAFpCMFLQCHE/D3D3QD2D2E/CHQFLCNFoAAQFpAAFLiNQE/iHD3j2QD2j3CHk/QCMlLAAlpQAAloiMlMQiHk+j2j3Qj3j2k/iHQlLiMlpgBQloABlLCMgAneRuQjchdirirQiqiqhejeQhhjkAAj6QAAj6BhjkQBejcCqirQCrirDchdQDlhhD5AAQD6AADlBhQDcBdCrCrQCqCrBeDcQBhDkAAD6QAAD6hhDkQheDeiqCqQiqCrjdBdQjlBhj6AAQj5AAjlhhgAnGw0QjRBZijChQihCihZDSQhcDZAADtQAADtBcDZQBZDSChCiQCjCiDRBZQDZBcDtAAQDtAADZhcQDShZCiiiQCiiiBZjSQBcjZAAjtQAAjthcjZQhZjSiiiiQiiihjShZQjZhcjtAAQjtAAjZBcgAlGMHQiXhAh0h1Qh1h0hAiXQhCicAAirQAAiqBCicQBAiXB1h1QB0h0CXhAQCchCCqAAQCrAACcBCQCXA/B1B1QB0B1BACXQBCCcAACqQAACrhCCcQhACXh0B0Qh1B1iXBAQicBCirAAQiqAAichCgAkmq6QiIA6hpBoQhpBqg6CIQg8CNAACZQAACaA8CNQA6CIBpBpQBpBpCIA6QCNA8CZgBQCaABCNg8QCIg6BphpQBphpA6iIQA8iNAAiaQAAiZg8iNQg6iIhphqQhphoiIg6QiNg8iaAAQiZAAiNA8g");
	this.shape_5.setTransform(0.025,0.05);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("ArHaWQlIiLj9j9Qj9j/iMlIQiQlUAAlzQAAlyCQlVQCMlID9j+QD9j8FIiMQFViQFyAAQFzAAFUCQQFJCMD9D8QD9D+CMFIQCQFUAAFzQAAFziQFUQiMFIj9D/Qj9D9lJCLQlTCQl0AAQlzAAlUiQgAq35vQlACIj4D4Qj4D3iHFBQiNFNAAFqQAAFrCNFMQCHFBD4D4QD4D4FACHQFNCOFqAAQFrAAFMiOQFBiHD4j4QD4j4CHlBQCNlMAAlrQAAlqiNlNQiHlBj4j3Qj4j4lBiIQlMiMlrgBQlqABlNCMgAngR0QjeheirisQisirhejeQhhjmAAj7QAAj7BhjlQBejeCsirQCrisDeheQDmhhD6AAQD7AADmBhQDeBeCrCsQCrCrBfDeQBhDlAAD7QAAD8hhDlQhfDeirCrQirCsjeBeQjmBhj7AAQj6AAjmhhgAnIw5QjTBZijCjQiiCihZDTQhdDaAADuQAADvBdDaQBZDSCiCjQCjCjDTBZQDaBdDuAAQDvAADahdQDShZCjijQCjijBZjSQBdjaAAjvQAAjuhdjaQhZjTijiiQijijjShZQjahdjvAAQjuAAjaBdgAlIMLQiYhAh0h2Qh1h1hBiXQhCidAAisQAAirBCidQBBiYB1h0QB1h1CXhBQCdhDCrAAQCsAACdBDQCYBAB0B2QB2B0BACYQBDCdAACrQAACshDCdQhACXh2B1Qh0B2iYBAQidBDisgBQirABidhDgAkoq+QiJA6hpBqQhpBpg6CJQg8COAACaQAACaA8COQA6CJBpBqQBpBqCJA5QCOA9CaAAQCbAACOg9QCIg5BqhqQBqhqA6iJQA8iOAAiaQAAiag8iOQg6iJhqhpQhqhqiIg6QiOg7ibgBQiaABiOA7g");
	this.shape_6.setTransform(0.025,0.05);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("ArKaeQlKiMj/j/Qj+j+iMlLQiRlUAAl2QAAl1CRlVQCMlLD+j+QD/j/FKiLQFWiRF0AAQF1AAFWCRQFKCLD+D/QD/D+CMFLQCRFVAAF1QAAF2iRFUQiMFLj/D+Qj+D/lKCMQlVCRl2AAQl1AAlViRgAq653QlCCJj5D5Qj5D4iJFCQiNFPAAFsQAAFtCNFOQCJFCD5D5QD5D5FCCIQFOCOFsAAQFtAAFOiOQFCiID5j5QD5j5CIlCQCOlOAAltQAAlsiOlPQiIlCj5j4Qj5j5lCiJQlOiOltAAQlsAAlOCOgAnjR5QjeheitisQisishfjgQhhjnAAj8QAAj8BhjnQBfjfCsisQCtisDeheQDnhiD8AAQD8AADnBiQDfBeCsCsQCtCsBeDfQBiDnAAD8QAAD9hiDmQheDgitCsQirCsjgBeQjnBij8AAQj8AAjnhigAnKw/QjUBaikCjQijCkhaDTQhdDcAADvQAADwBdDaQBaDVCjCkQCkCjDUBaQDbBdDvgBQDwABDbhdQDUhaCkijQCjikBajVQBdjaAAjwQAAjvhdjcQhajTijikQikijjUhaQjbhdjwABQjvgBjbBdgAlKMPQiYhBh1h2Qh2h1hBiZQhCidAAitQAAirBCifQBBiYB2h2QB1h1CYhBQCfhCCrAAQCtAACdBCQCZBBB1B1QB2B2BBCYQBDCfAACrQAACthDCdQhBCZh2B1Qh1B2iZBBQidBCitAAQisAAiehCgAkprBQiKA6hpBrQhrBqg6CJQg8COAACbQAACcA8COQA6CJBrBqQBpBrCKA6QCOA8CbAAQCcAACOg8QCJg6BrhrQBqhqA6iJQA8iOAAicQAAibg8iOQg6iJhqhqQhrhriJg6QiOg8icAAQibAAiOA8g");
	this.shape_7.setTransform(0.025,0.05);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("ArOamQlLiMkAkAQkAkAiMlMQiSlXAAl3QAAl3CSlXQCMlMEAj/QEAkAFLiMQFYiSF2AAQF3AAFXCSQFMCMEAEAQEAD/CMFMQCSFXAAF3QAAF3iSFXQiMFMkAEAQkAEAlMCMQlXCSl3AAQl3AAlXiSgAq95/QlECJj6D6Qj7D7iJFDQiOFQAAFuQAAFvCOFPQCJFED7D7QD6D6FECJQFPCOFuAAQFvAAFPiOQFEiJD7j6QD6j7CJlEQCOlPAAlvQAAluiOlQQiJlDj6j7Qj7j6lEiJQlPiOlvAAQluAAlPCOgAnlR/QjghfititQitithfjhQhijnAAj+QAAj9BijoQBfjgCtitQCtitDghfQDohiD9AAQD+AADoBiQDgBfCtCtQCtCtBfDgQBiDoAAD9QAAD+hiDnQhfDhitCtQitCtjgBfQjoBij+AAQj9AAjohigAnMxEQjVBailClQikCjhaDWQheDcAADwQAADwBeDdQBaDVCkCkQClClDVBZQDcBeDwABQDxgBDcheQDVhZClilQCkikBajVQBejdAAjwQAAjwhejcQhajWikijQililjVhaQjchejxAAQjwAAjcBegAlLMSQiZhAh2h3Qh2h2hCiZQhDieAAiuQAAitBDifQBCiYB2h2QB2h2CZhCQCfhDCsAAQCuAACeBDQCZBBB2B3QB3B2BACYQBECfAACtQAACuhECeQhACZh3B2Qh2B3iZBAQieBDiuABQitgBiehDgAkrrFQiKA7hqBrQhrBqg6CLQg9COAACcQAACcA9CPQA6CLBrBqQBqBrCKA7QCQA8CbAAQCcAACQg8QCKg7BqhrQBrhqA7iLQA8iPAAicQAAicg8iOQg7iLhrhqQhqhriKg7QiQg8icAAQibAAiQA8g");
	this.shape_8.setTransform(0.025,0.05);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("ArRavQlNiOkBkAQkBkCiOlOQiSlYAAl5QAAl4CSlZQCOlOEBkBQEBkAFNiOQFZiSF4AAQF5AAFZCSQFNCOEBEAQEBEBCOFOQCSFYAAF5QAAF5iSFYQiOFOkBECQkBEAlNCOQlZCSl5AAQl4AAlZiSgArB6HQlFCJj7D9Qj8D6iKFGQiPFSAAFvQAAFwCPFRQCKFGD8D8QD7D7FFCKQFSCPFvAAQFwAAFSiPQFFiKD8j7QD7j8CKlGQCPlRAAlwQAAlviPlSQiKlGj7j6Qj8j9lFiJQlSiPlwAAQlvAAlSCPgAnnSFQjhhgiuitQiuivhgjhQhjjqAAj+QAAj/BjjoQBgjiCuiuQCuitDhhfQDphkD+ABQD/gBDpBkQDhBfCuCtQCuCuBgDiQBjDoAAD/QAAD/hjDpQhgDhiuCvQitCtjiBgQjpBjj/AAQj+AAjphjgAnPxJQjVBaimClQilClhaDWQheDeAADxQAADyBeDdQBaDWClCmQCmCkDVBbQDeBeDxAAQDyAADdheQDWhbCmikQClimBajWQBejdAAjyQAAjxhejeQhajWililQimiljWhaQjdhejyAAQjxAAjeBegAlNMXQiahCh2h3Qh3h2hBibQhEifAAiuQAAiuBEifQBBiZB3h3QB3h3CZhCQCghDCtAAQCvAACfBDQCaBBB2B4QB3B3BBCZQBECfAACuQAACuhECfQhBCbh3B2Qh2B3iaBCQifBDivAAQiuAAifhDgAksrIQiLA7hrBrQhrBrg7CLQg9CPAACdQAACdA9CQQA7CKBrBsQBrBrCLA7QCQA8CcABQCdgBCQg8QCLg7BrhrQBrhsA7iKQA9iQAAidQAAidg9iPQg7iLhrhrQhrhriLg7QiQg9idAAQicAAiQA9g");
	this.shape_9.setTransform(0.025,0.05);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("ArVa3QlOiOkDkCQkCkDiOlPQiTlaAAl7QAAl6CTlbQCOlPECkCQEDkCFOiOQFbiTF6AAQF7AAFaCTQFPCOEDECQECECCOFPQCTFbAAF6QAAF7iTFaQiOFPkCEDQkDEClPCOQlaCTl7AAQl6AAlbiTgArE6PQlHCKj9D9Qj9D9iKFGQiPFUAAFxQAAFyCPFTQCKFHD9D8QD9D+FHCKQFTCQFxAAQFyAAFTiQQFHiKD9j+QD9j8CKlHQCPlTAAlyQAAlxiPlUQiKlGj9j9Qj9j9lHiKQlTiQlyAAQlxAAlTCQgAnqSKQjihfiuiwQiviuhgjiQhkjsAAj/QAAkABkjqQBgjiCvivQCuiuDihgQDrhjD/AAQEAAADrBjQDiBgCuCuQCvCvBgDiQBkDqAAEAQAAEAhkDrQhgDiivCuQiuCwjiBfQjrBjkAAAQj/AAjrhjgAnRxPQjXBbimCmQimCmhbDXQheDfAADyQAADzBeDfQBbDXCmClQCmCmDXBcQDeBeDzAAQDzAADfheQDXhcCmimQCmilBbjXQBejfAAjzQAAjyhejfQhbjXimimQimimjXhbQjfhejzAAQjzAAjeBegAlOMaQibhCh3h3Qh3h3hCibQhEigAAivQAAiuBEigQBCibB3h3QB3h3CbhCQCghECuAAQCvAACgBEQCbBBB3B4QB4B3BBCbQBECgAACuQAACvhECgQhBCbh4B3Qh3B3ibBCQigBEivAAQiuAAighEgAkurMQiLA8hrBrQhsBsg7CLQg9CRAACdQAACeA9CRQA7CKBsBsQBrBsCLA8QCRA8CdAAQCeAACRg8QCLg8BshsQBrhsA8iKQA9iRAAieQAAidg9iRQg8iLhrhsQhshriLg8QiRg8ieAAQidAAiRA8g");
	this.shape_10.setTransform(0.025,0.05);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("ArYbAQlQiPkEkEQkDkEiPlQQiUlcAAl9QAAl8CUlcQCPlQEDkEQEEkDFQiQQFdiTF7AAQF9AAFcCTQFRCQEDEDQEEEECOFQQCUFcAAF8QAAF9iUFcQiOFQkEEEQkDEElRCPQlcCTl9AAQl8AAlciTgArI6XQlICLj+D+Qj+D9iLFJQiQFVAAFzQAAF0CQFUQCLFKD+D9QD+D+FICMQFVCPFzABQF0gBFViPQFIiMD+j+QD+j9CLlKQCQlUAAl0QAAlziQlVQiLlJj+j9Qj+j+lIiLQlViRl0AAQlzAAlVCRgAnsSQQjjhhiwivQiviwhhjjQhkjsAAkBQAAkBBkjrQBhjjCviwQCwiwDjhgQDshjEAgBQEBABDsBjQDjBgCwCwQCvCwBhDjQBkDrAAEBQAAEChkDrQhhDjivCwQivCvjkBhQjsBkkBAAQkAAAjshkgAnTxTQjYBbinCmQinCnhbDYQhfDgAADzQAAD1BfDfQBbDYCnCnQCnCmDYBcQDfBfD0AAQD1AADfhfQDYhcCnimQCninBbjYQBfjfAAj1QAAjzhfjgQhbjYininQinimjYhbQjfhgj1AAQj0AAjfBggAlQMfQibhDh4h4Qh4h3hCicQhEihAAiwQAAivBEihQBCibB4h4QB4h4CbhCQChhECvAAQCwAAChBEQCcBCB3B4QB4B4BCCbQBFChAACvQAACwhFChQhCCch4B3Qh3B4icBDQihBDiwAAQivAAihhDgAkvrPQiMA7hsBtQhsBsg7CMQg+CRAACeQAACfA+CRQA7CMBsBsQBsBsCMA8QCRA9CeABQCfgBCRg9QCMg8BshsQBthsA7iMQA+iRAAifQAAieg+iRQg7iMhthsQhshtiMg7QiRg9ifAAQieAAiRA9g");
	this.shape_11.setTransform(0.025,0.05);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("ArbbIQlTiQkEkFQkFkEiQlTQiUldAAl/QAAl+CUldQCQlTEFkFQEEkFFTiPQFeiUF9AAQF+AAFfCUQFSCPEEEFQEFEFCQFTQCUFdAAF+QAAF/iUFdQiQFTkFEEQkEEFlSCQQleCUl/AAQl+AAldiUgArL6fQlKCLj/EAQj/D/iMFJQiRFXAAF1QAAF2CRFWQCMFKD/EAQD/D+FKCNQFWCQF1ABQF2gBFWiQQFKiNEAj+QD+kACMlKQCRlWAAl2QAAl1iRlXQiMlJj+j/QkAkAlKiLQlWiSl2AAQl1AAlWCSgAnuSVQjkhhixiwQiwixhijkQhkjtAAkCQAAkCBkjtQBijkCwixQCxivDkhhQDshlECABQEDgBDsBlQDkBhCxCvQCwCxBiDkQBkDtAAECQAAEDhkDsQhiDkiwCxQiwCwjlBhQjsBlkDAAQkCAAjshlgAnVxZQjZBcioCnQioCohbDZQhgDgAAD1QAAD1BgDhQBbDZCoCoQCoCoDZBbQDgBfD1AAQD2AADghfQDZhbCoioQCoioBbjZQBgjhAAj1QAAj1hgjgQhbjZioioQioinjZhcQjghfj2AAQj1AAjgBfgAlSMiQichCh4h5Qh4h5hDibQhEiiAAixQAAiwBEiiQBDicB4h4QB5h5CbhCQCihFCwAAQCxAACiBFQCcBCB4B5QB5B4BCCcQBFCiAACwQAACxhFCiQhCCbh5B5Qh4B5icBCQiiBFixAAQiwAAiihFgAkwrSQiNA8htBsQhsBtg8CNQg+CRAACfQAACfA+CSQA8CNBsBtQBtBsCNA8QCRA+CfAAQCgAACRg+QCNg8BthsQBthtA7iNQA+iSAAifQAAifg+iRQg7iNhthtQhthsiNg8QiRg+igAAQifAAiRA+g");
	this.shape_12.setTransform(0.025,0.05);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("ArfbQQlUiQkGkGQkGkHiQlTQiVlgAAmAQAAmACVlfQCQlUEGkGQEGkGFUiQQFgiVF/AAQGAAAFgCVQFUCQEGEGQEGEGCQFUQCVFfAAGAQAAGAiVFgQiQFTkGEHQkGEGlUCQQlfCVmBAAQmAAAlfiVgArP6nQlLCMkAEBQkBEAiMFLQiSFYAAF3QAAF4CSFXQCMFMEBEAQEAEBFLCMQFYCSF3AAQF4AAFXiSQFMiMEBkBQEAkACMlMQCSlXAAl4QAAl3iSlYQiMlLkAkAQkBkBlMiMQlXiSl4AAQl3AAlYCSgAnxSbQjlhhixixQixiyhijmQhljtAAkEQAAkDBljuQBijlCxixQCxiyDlhhQDuhlEDABQEEgBDuBlQDlBhCxCyQCyCxBhDlQBlDuAAEDQAAEEhlDtQhhDmiyCyQixCxjlBhQjuBkkEAAQkDAAjuhkgAnXxeQjbBcioCoQioCohdDbQhgDhAAD2QAAD3BgDiQBdDaCoCoQCoCpDbBbQDhBhD2gBQD3ABDihhQDahbCoipQCpioBcjaQBgjiAAj3QAAj2hgjhQhcjbipioQioiojahcQjihgj3gBQj2ABjhBggAlTMmQidhDh5h5Qh5h5hDidQhEijAAixQAAixBEijQBDicB5h5QB5h5CdhDQCjhECwAAQCyAACiBEQCdBDB5B5QB5B5BDCcQBFCjAACxQAACxhFCjQhDCdh5B5Qh5B5idBDQiiBEiyAAQixAAiihEgAkyrWQiNA8htBtQhuBug7CNQg+CTAACfQAACgA+CSQA7COBuBtQBtBtCNA9QCTA+CfAAQCgAACTg+QCNg9BuhtQBthtA8iOQA+iSAAigQAAifg+iTQg8iNhthuQhuhtiNg8QiTg9iggBQifABiTA9g");
	this.shape_13.setTransform(0.025,0.05);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AribZQlWiRkHkIQkHkIiRlVQiWlhAAmCQAAmBCWlhQCRlWEHkHQEHkIFWiRQFhiVGBAAQGCAAFiCVQFVCREHEIQEHEHCRFWQCWFgAAGCQAAGCiWFhQiRFVkHEIQkHEIlVCRQlhCVmDAAQmBAAlhiVgArS6vQlNCMkBECQkCECiNFNQiTFaAAF4QAAF6CTFYQCNFOECECQEBECFNCMQFaCTF4AAQF5AAFaiTQFNiMECkCQEBkCCNlOQCTlYAAl6QAAl4iTlaQiNlNkBkCQkCkClNiMQlaiTl5AAQl4AAlaCTgAnzShQjmhiiziyQiyizhijmQhljvAAkFQAAkFBljvQBijmCyiyQCziyDmhiQDvhkEEgBQEFABDvBkQDmBiCzCyQCyCyBiDmQBlDvAAEFQAAEFhlDvQhiDmiyCzQiyCyjnBiQjvBlkFAAQkEAAjvhlgAnaxkQjbBdipCpQipCphdDbQhgDjAAD3QAAD4BgDjQBdDbCpCpQCpCqDbBcQDjBgD3AAQD4AADjhgQDbhcCpiqQCqipBcjbQBgjjAAj4QAAj3hgjjQhcjbiqipQipipjbhdQjjhgj4AAQj3AAjjBggAlVMqQiehDh4h6Qh6h5hDieQhFijAAizQAAiyBFijQBDieB6h5QB5h6CdhDQCkhFCxAAQCzAACjBFQCeBDB5B6QB6B5BDCeQBFCjAACyQAACzhFCjQhDCeh6B5Qh5B6ieBDQijBFizAAQiyAAijhFgAkzrZQiPA8htBuQhuBtg8CPQg+CTAACgQAAChA+CTQA8COBuBuQBtBuCPA8QCTA+CgAAQChAACTg+QCOg8BuhuQBuhuA8iOQA/iTAAihQAAigg/iTQg8iPhuhtQhuhuiOg8QiTg+ihgBQigABiTA+g");
	this.shape_14.setTransform(0.025,0.05);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("ArmbhQlXiSkIkIQkJkJiRlXQiXljAAmEQAAmDCXljQCRlXEJkJQEIkIFXiSQFjiWGDAAQGEAAFjCWQFXCSEJEIQEIEJCSFXQCWFiAAGEQAAGEiWFjQiSFXkIEJQkJEIlXCSQljCWmEAAQmDAAljiWgArV63QlPCNkDEDQkDEDiNFOQiTFbAAF7QAAF8CTFaQCNFQEDECQEDEDFPCOQFbCTF6AAQF7AAFbiTQFPiOEDkDQEDkCCOlQQCTlaAAl8QAAl7iTlbQiOlOkDkDQkDkDlPiNQlbiTl7AAQl6AAlbCTgAn1SmQjohiiziyQizi0hijnQhmjxAAkGQAAkGBmjwQBijnCzizQCzizDohiQDwhmEFAAQEGAADxBmQDnBiCzCzQCzCzBjDnQBlDwAAEGQAAEGhlDxQhjDnizC0QizCyjnBiQjxBmkGAAQkFAAjwhmgAncxpQjcBdirCqQipCphdDdQhhDkAAD4QAAD5BhDkQBdDcCpCqQCrCqDcBdQDkBhD4AAQD5AADkhhQDchdCqiqQCqiqBdjcQBhjkAAj5QAAj4hhjkQhdjdiqipQiqiqjchdQjkhhj5AAQj4AAjkBhgAlWMtQifhDh5h6Qh7h6hDifQhGijAAi0QAAizBGijQBDifB7h5QB6h7CehDQCkhGCyAAQC0AACkBGQCeBDB6B7QB6B5BDCfQBGCjAACzQAAC0hGCjQhDCfh6B6Qh6B6ieBDQikBGi0AAQizAAijhGgAk1rcQiPA8huBuQhuBug8CQQg/CTAAChQAAChA/CUQA8CPBuBvQBuBuCPA9QCUA+ChABQCigBCUg+QCPg9BuhuQBuhvA9iPQA/iUAAihQAAihg/iTQg9iQhuhuQhuhuiPg8QiUg/iiAAQihAAiUA/g");
	this.shape_15.setTransform(0.025,0.05);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("ArpbpQlZiSkKkKQkKkKiSlZQiXlkAAmGQAAmFCXllQCSlZEKkJQEKkKFZiSQFkiXGFAAQGGAAFlCXQFYCSEKEKQEKEJCSFZQCXFkAAGGQAAGGiXFkQiSFZkKEKQkKEKlYCSQllCXmGAAQmFAAlkiXgArZ7AQlQCPkEEEQkEEEiPFQQiTFdAAF8QAAF9CTFcQCPFSEEEDQEEEEFQCPQFdCUF8AAQF9AAFdiUQFQiPEEkEQEEkDCPlSQCTlcAAl9QAAl8iTldQiPlQkEkEQkEkElQiPQldiTl9AAQl8AAldCTgAn4SsQjohji0i0Qi0i0hjjpQhmjxAAkHQAAkHBmjxQBjjpC0i0QC0izDohjQDxhmEHAAQEHAADyBmQDoBjC0CzQC0C0BjDpQBmDxAAEHQAAEHhmDxQhjDpi0C0QizC0jpBjQjyBmkHAAQkHAAjxhmgAnexuQjdBdisCqQiqCrheDeQhhDlAAD5QAAD6BhDlQBeDdCqCsQCsCqDdBdQDkBiD6AAQD6AADlhiQDehdCriqQCqisBejdQBhjlAAj6QAAj5hhjlQhejeiqirQiriqjehdQjlhhj6gBQj6ABjkBhgAlYMyQifhFh6h6Qh7h7hEifQhGikAAi1QAAizBGilQBEifB7h7QB6h7CfhEQClhFCzAAQC1AACkBFQCfBEB7B7QB7B7BDCfQBGClAACzQAAC1hGCkQhDCfh7B7Qh7B6ifBFQikBFi1AAQizAAilhFgAk2rgQiQA8huBvQhvBvg9CQQg/CVAAChQAACjA/CUQA9CQBvBvQBuBuCQA9QCVA/ChAAQCjAACUg/QCQg9BvhuQBuhvA9iQQA/iUAAijQAAihg/iVQg9iQhuhvQhvhviQg8QiUg/ijAAQihAAiVA/g");
	this.shape_16.setTransform(0.025,0.05);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("ArtbxQlaiTkLkLQkLkLiTlaQiYlmAAmIQAAmHCYlmQCTlbELkLQELkLFaiSQFniYGGAAQGHAAFnCYQFaCSELELQELELCTFbQCYFmAAGHQAAGIiYFmQiTFakLELQkLELlaCTQlmCYmIAAQmHAAlmiYgArc7IQlSCPkFEGQkGEEiPFSQiUFfAAF+QAAF/CUFeQCPFSEGEFQEFEGFSCPQFeCUF+AAQF+AAFfiUQFSiPEFkGQEFkFCPlSQCVleAAl/QAAl+iVlfQiPlSkFkEQkFkGlSiPQlfiUl+AAQl+AAleCUgAn6SxQjqhji0i0Qi1i1hkjqQhnjzAAkIQAAkIBnjzQBkjpC1i1QC0i0DqhkQDyhmEIAAQEIAADzBmQDpBkC1C0QC1C1BkDpQBmDzABEIQgBEJhmDyQhkDqi1C1Qi0C0jqBjQjzBnkIAAQkIAAjyhngAngx0QjfBeisCrQirCsheDeQhiDnAAD6QAAD7BiDmQBeDeCrCsQCsCsDfBeQDlBhD7AAQD8AADmhhQDeheCrisQCsisBejeQBijmAAj7QAAj6hijnQhejeisisQirirjeheQjmhij8AAQj7AAjlBigAlaM1QighEh7h7Qh7h8hEigQhGilAAi1QAAi0BGimQBEigB7h7QB7h7CghEQCmhGC0AAQC1AACmBGQCfBDB8B8QB8B7BDCgQBGCmAAC0QAAC1hGClQhDCgh8B8Qh8B7ifBEQimBGi1AAQi1AAilhGgAk4rkQiQA9hvBwQhwBvg8CQQhACVABCjQgBCjBACVQA8CQBwBwQBvBvCQA9QCVBACjAAQCkAACVhAQCPg9BwhvQBwhwA8iQQBAiVAAijQAAijhAiVQg8iQhwhvQhwhwiPg9QiVg/ikAAQijAAiVA/g");
	this.shape_17.setTransform(0.05,0.075);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("Arxb6QlbiUkMkMQkNkNiTlcQiZloAAmJQAAmJCZloQCTlcENkMQEMkMFbiUQFoiYGJAAQGJAAFpCYQFcCUELEMQENEMCTFcQCZFoAAGJQAAGJiZFoQiTFckNENQkLEMlcCUQlpCYmJAAQmJAAloiYgArg7QQlTCPkHEHQkHEGiPFUQiVFgAAGAQAAGBCVFfQCPFUEHEHQEHEGFTCQQFgCVGAAAQGAAAFhiVQFTiQEHkGQEGkHCQlUQCVlfAAmBQAAmAiVlgQiQlUkGkGQkHkHlTiPQlhiVmAAAQmAAAlgCVgAn9S3Qjrhki1i1Qi2i2hjjrQhojzAAkKQAAkKBojzQBjjrC2i1QC1i2DrhjQDzhnEKAAQEKAAD0BnQDqBjC2C2QC1C1BkDrQBoDzAAEKQAAEKhoDzQhkDri1C2Qi2C1jqBkQj0BnkKAAQkKAAjzhngAnjx5QjfBeitCsQisCtheDfQhjDnABD8QgBD8BjDnQBeDgCsCsQCtCtDfBeQDnBiD8AAQD8AADohiQDfheCtitQCsisBejgQBijnAAj8QAAj8hijnQhejfisitQitisjfheQjohij8AAQj8AAjnBigAlcM5QighEh7h9Qh8h7hFihQhGimAAi2QAAi1BGinQBFigB8h8QB7h8CghEQCnhHC1AAQC2AACnBHQCgBEB7B8QB9B8BECgQBHCnAAC1QAAC2hHCmQhEChh9B7Qh7B9igBEQinBGi2AAQi1AAinhGgAk6rnQiRA9hvBwQhwBwg9CRQhACVAACkQAACkBACWQA9CRBwBvQBvBwCRA+QCWA/CkAAQCkAACWg/QCRg+BvhwQBxhvA9iRQBAiWAAikQAAikhAiVQg9iRhxhwQhvhwiRg9QiWhAikAAQikAAiWBAg");
	this.shape_18.setTransform(0.05,0.075);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("Ar0cCQldiUkOkOQkNkOiVldQiZlqAAmLQAAmKCZlqQCVleENkNQEOkOFdiUQFqiZGKAAQGLAAFqCZQFeCUENEOQENENCUFeQCaFpAAGLQAAGLiaFqQiUFdkNEOQkNEOleCUQlpCZmMAAQmLAAlpiZgArj7YQlVCQkHEIQkJEHiQFVQiWFiAAGCQAAGCCWFhQCQFWEJEIQEHEIFVCQQFhCWGCAAQGCAAFhiWQFWiQEIkIQEIkICQlWQCVlhAAmCQAAmCiVliQiQlVkIkHQkIkIlWiQQlhiWmCAAQmCAAlhCWgAn/S9Qjshki2i3Qi3i2hkjsQhoj1ABkLQgBkLBoj0QBkjsC3i3QC2i2DshkQD1hnEKAAQELAAD1BnQDrBkC3C2QC2C3BlDsQBnD0AAELQAAELhnD1QhlDsi2C2Qi2C3jsBkQj1BnkLAAQkKAAj1hngAnlx+QjhBeitCtQitCthfDhQhiDogBD9QABD9BiDpQBfDgCtCtQCtCuDhBeQDoBjD9AAQD9AADphjQDgheCtiuQCuitBejgQBjjpAAj9QAAj9hjjoQhejhiuitQititjgheQjphjj9AAQj9AAjoBjgAldM9QihhFh9h9Qh8h8hFihQhGingBi3QABi2BGinQBFihB8h9QB9h8ChhFQCnhHC2AAQC3AACnBHQChBEB9B9QB8B9BEChQBHCnABC2QgBC3hHCnQhEChh8B8Qh9B9ihBFQinBGi3AAQi2AAinhGgAk7rqQiRA9hxBwQhwBxg9CSQhACWAACkQAAClBACWQA9CSBwBwQBxBwCRA+QCXBACkAAQClAACWhAQCSg+BxhwQBwhwA9iSQBBiWgBilQABikhBiWQg9iShwhxQhxhwiSg9QiWhAilAAQikAAiXBAg");
	this.shape_19.setTransform(0.05,0.075);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("Ar3cKQlfiVkQkOQkOkQiVlfQialrAAmNQAAmMCalsQCVlfEOkPQEQkOFfiVQFriaGMAAQGNAAFsCaQFfCVEPEOQEOEPCVFfQCaFrAAGNQAAGNiaFrQiVFfkOEQQkPEOlfCVQlrCamOAAQmNAAlqiagArn7gQlWCRkJEJQkJEIiRFXQiWFkAAGDQAAGECWFjQCRFXEJEJQEJEJFWCRQFkCXGDAAQGEAAFjiXQFXiREJkJQEJkJCRlXQCWljAAmEQAAmDiWlkQiRlXkJkIQkJkJlXiRQljiXmEAAQmDAAlkCXgAoBTCQjthki4i3Qi2i4hljtQhpj2AAkMQAAkMBpj2QBljsC2i4QC4i3DthkQD1hoEMAAQEMAAD2BoQDtBkC4C3QC2C4BlDsQBoD2ABEMQgBENhoD1QhlDti2C4Qi4C3jtBkQj2BokMAAQkMAAj1hogAnnyEQjiBfiuCuQiuCuhfDhQhjDqAAD+QAAD/BjDpQBfDhCuCuQCuCvDiBfQDpBjD+AAQD/AADphjQDhhfCvivQCuiuBfjhQBjjpAAj/QAAj+hjjqQhfjhiuiuQiviujhhfQjphjj/AAQj+AAjpBjgAlfNBQiihFh8h+Qh+h8hEijQhIinABi4QgBi3BIioQBEiiB+h8QB8h+CihFQCohHC3AAQC4AACnBHQCjBFB9B+QB9B8BFCiQBHCoAAC3QAAC4hHCnQhFCjh9B8Qh9B+ijBFQinBHi4AAQi3AAiohHgAk8ruQiTA+hwBxQhxBxg9CSQhBCXAAClQAAClBBCYQA9CSBxBxQBwBxCTA+QCYBACkAAQCmAACXhAQCSg+BxhxQBxhxA+iSQBAiYAAilQAAilhAiXQg+iShxhxQhxhxiSg+QiXhAimAAQikAAiYBAg");
	this.shape_20.setTransform(0.05,0.075);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("Ar7cTQlhiWkQkQQkQkRiVlgQibltAAmPQAAmOCbltQCVlhEQkQQEQkQFhiWQFtiaGOAAQGPAAFtCaQFhCWEPEQQEQEQCWFhQCbFsAAGPQAAGPibFtQiWFgkQERQkPEQlhCWQltCamPAAQmOAAltiagArq7pQlZCSkJELQkLEJiSFZQiWFlAAGFQAAGGCWFkQCSFZELEKQEJELFZCRQFlCYGFAAQGGAAFkiYQFZiRELkLQEKkKCRlZQCXlkAAmGQAAmFiXllQiRlZkKkJQkLkLlZiSQlkiXmGAAQmFAAllCXgAoETIQjthli5i4Qi4i4hmjvQhoj3AAkNQAAkNBoj3QBmjuC4i4QC5i4DthlQD3hpENAAQEOAAD2BpQDuBlC5C4QC3C4BmDuQBpD3AAENQAAEOhpD2QhmDvi3C4Qi4C4jvBlQj2BpkOAAQkNAAj3hpgAnpyJQjjBfivCvQivCvhfDiQhkDrAAD/QAAEABkDqQBfDjCvCvQCvCuDjBgQDqBkD/AAQEAAADrhkQDihgCviuQCvivBfjjQBkjqAAkAQAAj/hkjrQhfjiivivQivivjihfQjrhkkAAAQj/AAjqBkgAlgNFQijhGh9h+Qh+h9hGijQhGiogBi5QABi4BGipQBGiiB+h9QB9h+CjhGQCohHC4AAQC5AACoBHQCjBFB9B/QB/B9BECiQBICpAAC4QAAC5hICoQhECjh/B9Qh9B+ijBGQioBHi5AAQi4AAiohHgAk9rxQiUA+hwBxQhyBxg+CUQhBCXAACmQAACmBBCYQA+CTByBxQBwByCUA+QCXBBCmAAQCmAACYhBQCTg+BxhyQByhxA/iTQBAiYAAimQAAimhAiXQg/iUhyhxQhxhxiTg+QiYhBimAAQimAAiXBBg");
	this.shape_21.setTransform(0.05,0.075);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("Ar+cbQljiWkRkSQkSkRiWljQibluAAmRQAAmQCblvQCWliESkRQERkSFjiWQFuibGQAAQGQAAFvCbQFjCWERESQESERCVFiQCcFvAAGQQAAGRicFuQiVFjkSERQkRESljCWQluCbmRAAQmQAAluibgArt7xQlbCTkKELQkMELiSFaQiYFnAAGHQAAGICYFmQCSFaEMELQEKEMFbCTQFmCXGHAAQGHAAFniXQFaiTEMkMQELkLCTlaQCXlmAAmIQAAmHiXlnQiTlakLkLQkMkLlaiTQlniXmHAAQmHAAlmCXgAoGTOQjvhmi5i5Qi5i5hmjvQhpj5AAkOQAAkPBpj3QBmjvC5i5QC5i5DvhmQD3hpEPAAQEPAAD4BpQDvBmC5C5QC5C5BmDvQBpD3AAEPQAAEPhpD4QhmDvi5C5Qi4C5jwBmQj4BpkPAAQkPAAj3hpgAnsyOQjjBgixCvQivCwhgDjQhjDsgBEAQABEBBjDrQBgDkCvCwQCxCvDjBgQDrBkEBAAQEBAADshkQDjhgCwivQCwiwBgjkQBjjrABkBQgBkAhjjsQhgjjiwiwQiwivjjhgQjshkkBAAQkBAAjrBkgAliNIQikhFh9h/Qh+h+hGijQhIiqAAi5QAAi4BIiqQBGijB+h+QB+h/CjhFQCqhIC4AAQC5AACqBIQCjBFB/B/QB+B+BFCjQBICqAAC4QAAC5hICqQhFCjh+B+Qh/B/ijBFQiqBIi5AAQi4AAiqhIgAk/r1QiUA+hyByQhyByg9CUQhBCZAACmQAACnBBCZQA9CTByByQByByCUA/QCZBACmAAQCnAACZhAQCTg/BzhyQBxhyA/iTQBBiZgBinQABimhBiZQg/iUhxhyQhzhyiTg+QiZhBinAAQimAAiZBBg");
	this.shape_22.setTransform(0.05,0.075);

	this.instance_1 = new lib.CachedBmp_685();
	this.instance_1.setTransform(-198.25,-198.25,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.instance_1}]},1).wait(1));

	// flash0_ai
	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AmQGRQimimgBjrQABjpCminQCnimDpgBQDqABCnCmQCnCngBDpQABDrinCmQimCnjrgBQjpABiningAlJlJQiKCJAADAQAADBCKCJQCJCJDAAAQDBAACJiJQCJiJAAjBQAAjAiJiJQiJiKjBAAQjAAAiJCKg");

	this.timeline.addTween(cjs.Tween.get(this.shape_23).wait(25));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-198.2,-198.2,396.5,396.5);


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
	this.shape.setTransform(23.2158,-28.1894,0.341,0.341);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#654A2A").s().p("AlcQ4Qgngeg1hdQg9hrgjh2QhglFCcjGQAcgjhKhOQgugviRhzQiZh7hChBQhvhsgYhOQhqlYA/ixQBckDG6gwQCogTE4ChQCSBLEICqQESCxCPB0QD4DKBDCiQB9EvgzFHQg1FOjZDUQjbDVj8BJQhxAhhtAAQkGAAjzi/g");
	this.shape_1.setTransform(24.1063,1.5937,0.341,0.341);

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
	this.shape.setTransform(-14.9047,-7.7404,0.3409,0.3409);

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
	this.shape.setTransform(-3.9616,-4.5258,0.341,0.341);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#564024").s().p("AhmNWQhGgPg9gpIgFgQQgFgdALgrQAVhWBRhDQBhhRgLh8QgDglgQg/QgRhCgDgWQgMhjgIh6IgNi5QgPjAgvhwIgZg+QgGgdAOhUQAMhIA4gkQAzghBEAEQBBAEAwAkQA0AnAEA5QADAugWA8QgMAhglBNQg7B6AmFBQAVCuAyEiQACATAwCLQAuCEABAtIAAABIgDAUQgHAUgQAAQgcABgjAKQgmALgbASQhCAqhHAAQgZAAgagFg");
	this.shape_1.setTransform(-4.0515,-29.202,0.3404,0.3404);

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
	this.shape.setTransform(-1.1921,-0.1805,0.3409,0.3409);

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
	this.shape.setTransform(12.0638,2.7334,0.341,0.341);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#654A2A").s().p("AhmNWQhFgOg+gqIgFgPQgFgeALgrQAVhWBRhDQBhhRgLh8QgDglgQg+QgRhCgDgXQgMhigJh7QgHiAgFg5QgPjAgvhwIgZg+QgGgdANhTQAMhIA5glQAyghBFAEQBBAFAwAjQAzAnAEA6QADAugVA8QgMAhglBNQg7B6AmFBQAVCtAxEjQADASAwCLQAuCFABAtIgDAVQgHATgQABQgcAAgjALQgmALgbARQhCAqhGAAQgaAAgagFg");
	this.shape_1.setTransform(11.8338,-21.9595,0.3404,0.3404);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(3.7,-51.2,16.6,58.900000000000006);


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
	this.shape.setTransform(-3.9795,2.899,0.3409,0.3409);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-21.5,-36.6,35.1,79);


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
	this.shape.setTransform(5.9778,8.0451,0.341,0.341);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#564024").s().p("AhmNWQhHgPg8gpIgFgQQgFgdALgrQAVhWBRhDQBhhRgLh8QgDglgQg/QgShCgCgWQgMhjgJh6QgHiAgFg5QgPjAgvhwIgZg+QgGgeANhTQAMhIA5gkQAyghBFAEQBBAEAwAkQAzAnAEA5QADAugVA8QgMAiglBMQg7B6AmFBQAVCuAxEiQADATAwCLQAuCFABAsIAAABIgDAUQgHAUgQAAQgcABgjAKQgmALgbASQhCAqhHAAQgZAAgagFg");
	this.shape_1.setTransform(5.7651,-16.6151,0.3404,0.3404);

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
	this.shape.setTransform(-1.5252,-0.6395,0.3409,0.3409);

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
	this.shape.setTransform(8.1415,3.0542,0.341,0.341);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#654A2A").s().p("AhmNWQhGgOg9gqIgFgPQgFgeALgrQAVhWBRhDQBhhRgLh7QgDgmgQg+QgRhCgDgXQgMhjgIh6IgNi5QgPjAgvhwIgZg9QgGgeAOhTQAMhIA4glQAzghBEAFQBBAEAwAkQAzAmAEA6QADAugVA8QgMAhglBNQg7B6AmFBQAVCtAyEjQACATAwCKQAuCFABAtIAAAAIgDAVQgHATgQABQgcAAgjALQgmALgbARQhCAqhGAAQgZAAgbgFg");
	this.shape_1.setTransform(7.8801,-21.6158,0.3404,0.3404);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.3,-50.8,16.7,58.8);


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
	this.instance = new lib.CachedBmp_673();
	this.instance.setTransform(-16.9,-29,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.9,-29,44,76.5);


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
	this.instance = new lib.CachedBmp_683();
	this.instance.setTransform(-61.7,-152.05,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-61.7,-152,135.5,209.5);


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
	this.instance = new lib.CachedBmp_670();
	this.instance.setTransform(-33.05,-28.05,0.4875,0.4875);

	this.instance_1 = new lib.CachedBmp_671();
	this.instance_1.setTransform(-33.05,-28.15,0.4875,0.4875);

	this.instance_2 = new lib.CompoundPath();
	this.instance_2.setTransform(-159.75,-154.3,3.5007,3.5007);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_2},{t:this.instance_1}]},1).wait(1));

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
	this.instance = new lib.CachedBmp_669();
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
	this.instance = new lib.CachedBmp_682();
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
	this.instance = new lib.CachedBmp_681();
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
	this.instance = new lib.CachedBmp_665();
	this.instance.setTransform(-43.65,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_666();
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
	this.instance = new lib.CachedBmp_663();
	this.instance.setTransform(-43.7,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_664();
	this.instance_1.setTransform(-42.15,-36.05,0.5,0.5);

	this.instance_2 = new lib.Group_1();
	this.instance_2.setTransform(216.45,-207.05,4.7386,4.7386,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_2},{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-214.7,-207,431.2,417);


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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-45.2447,y:-33.6,x:53.2,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.8,regY:-29.1,scaleX:0.9965,scaleY:0.9965,rotation:-15.7944,x:33.85,y:-32}},{t:this.instance_9,p:{rotation:-11.5371,x:44.55,y:35.5,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9984,scaleY:0.9984,rotation:-19.5942,x:-49.7,y:-14.65,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,rotation:-26.7973,x:-29.95,y:41.05,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.8,regY:15.1,scaleX:0.9978,scaleY:0.9978,rotation:19.9924,x:-35.4,y:-39.2}},{t:this.instance_4,p:{scaleX:0.998,scaleY:0.998,rotation:1.656,x:-55.15,y:-75.85,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:28.2246,x:2.2,y:2.15,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.7,scaleX:0.9975,scaleY:0.9975,rotation:-13.1247,y:-15.05,regY:-27.2,x:55.9}},{t:this.instance_1,p:{regX:11.5,scaleX:0.9979,scaleY:0.9979,rotation:33.3027,x:-26.25,y:53.35,regY:-45.1}},{t:this.instance,p:{rotation:-14.0796,x:62.4,y:45.9,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]}).to({state:[{t:this.instance_11,p:{regX:-14.4,rotation:-45.7144,y:-33.55,x:53.2,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-28.9,scaleX:0.9964,scaleY:0.9964,rotation:-14.1658,x:33.95,y:-31.7}},{t:this.instance_9,p:{rotation:-10.963,x:42.5,y:35.75,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.6,scaleX:0.9983,scaleY:0.9983,rotation:-17.2963,x:-49.6,y:-14.75,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-28.2395,x:-32.1,y:41.75,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:18.7315,x:-35.45,y:-39.3}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:1.4002,x:-55.85,y:-75.45,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:26.484,x:2.3,y:2,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:-13.3041,y:-15.2,regY:-27.2,x:55.9}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:28.4745,x:-24.7,y:54.1,regY:-45.1}},{t:this.instance,p:{rotation:-18.9634,x:62.6,y:45.75,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-46.1847,y:-33.45,x:53.1,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:-12.5371,x:33.95,y:-31.8}},{t:this.instance_9,p:{rotation:-10.3899,x:40.55,y:35.95,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:-14.9993,x:-49.55,y:-14.6,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-29.6824,x:-34.45,y:42.4,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.6,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:17.4694,x:-35.5,y:-39.35}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:1.1434,x:-56.65,y:-74.95,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:24.7419,x:2.3,y:2,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9975,scaleY:0.9975,rotation:-13.4839,y:-15.3,regY:-27.3,x:55.9}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:23.6442,x:-23.15,y:54.9,regY:-45.1}},{t:this.instance,p:{rotation:-23.8479,x:62.85,y:45.7,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-46.6551,y:-33.4,x:53.15,regY:-31.9,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:-10.9097,x:33.95,y:-31.75}},{t:this.instance_9,p:{rotation:-9.8161,x:38.65,y:36.1,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:-12.7011,x:-49.55,y:-14.65,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-31.1245,x:-36.75,y:43,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:16.2086,x:-35.4,y:-39.3}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.8849,x:-57.45,y:-74.5,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:23.0005,x:2.3,y:2.05,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:-13.6638,y:-15.2,regY:-27.2,x:55.95}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:18.8148,x:-21.5,y:55.55,regY:-45.1}},{t:this.instance,p:{rotation:-28.7318,x:62.95,y:45.65,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-47.1257,y:-33.4,x:53.05,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:-9.2807,x:33.9,y:-31.75}},{t:this.instance_9,p:{rotation:-9.2417,x:36.7,y:36.2,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:-10.4028,x:-49.55,y:-14.65,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-32.5671,x:-38.95,y:43.45,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:14.9478,x:-35.4,y:-39.3}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.6299,x:-58.25,y:-74,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:21.2602,x:2.35,y:2.05,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:-13.8422,y:-15.2,regY:-27.2,x:55.85}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:13.9848,x:-19.9,y:56.3,regY:-45.1}},{t:this.instance,p:{rotation:-33.6178,x:63.15,y:45.65,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-47.5957,y:-33.45,x:53.05,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:-7.6526,x:33.95,y:-31.75}},{t:this.instance_9,p:{rotation:-8.669,x:34.75,y:36.3,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:-8.1042,x:-49.55,y:-14.7,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-34.01,x:-41.3,y:43.95,regY:-52.9,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:13.6879,x:-35.4,y:-39.35}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.3732,x:-58.95,y:-73.5,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:19.5189,x:2.3,y:2.05,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.7,scaleX:0.9974,scaleY:0.9974,rotation:-14.0222,y:-15.2,regY:-27.2,x:55.8}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:9.1557,x:-18.2,y:56.95,regY:-45.1}},{t:this.instance,p:{rotation:-38.5024,x:63.35,y:45.55,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-48.0653,y:-33.45,x:53.1,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:-6.024,x:33.9,y:-31.75}},{t:this.instance_9,p:{rotation:-8.0946,x:32.9,y:36.35,regY:-40.1,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:-5.8077,x:-49.55,y:-14.7,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-35.4529,x:-43.7,y:44.1,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.8,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:12.4276,x:-35.3,y:-39.3}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.1156,x:-59.7,y:-72.95,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:17.7781,x:2.35,y:2.1,regX:0.6,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:-14.2025,y:-15.25,regY:-27.2,x:55.95}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:4.3254,x:-16.5,y:57.55,regY:-45.1}},{t:this.instance,p:{rotation:-43.3877,x:63.6,y:45.55,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-48.5364,y:-33.4,x:53.05,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:-4.3966,x:33.9,y:-31.7}},{t:this.instance_9,p:{rotation:-7.5201,x:30.95,y:36.15,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:-3.5088,x:-49.5,y:-14.7,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-36.8951,x:-46.1,y:44.4,regY:-53,regX:-5}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:11.1663,x:-35.4,y:-39.3}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:-0.1367,x:-60.4,y:-72.4,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:16.0376,x:2.5,y:2.05,regX:0.6,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:-14.3819,y:-15.4,regY:-27.3,x:55.85}},{t:this.instance_1,p:{regX:11.3,scaleX:0.9978,scaleY:0.9978,rotation:-0.5003,x:-15,y:58.05,regY:-45.1}},{t:this.instance,p:{rotation:-48.2724,x:63.8,y:45.45,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-49.007,y:-33.35,x:53.1,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:-2.7676,x:33.9,y:-31.7}},{t:this.instance_9,p:{rotation:-6.9473,x:29,y:36.05,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.6,scaleX:0.9983,scaleY:0.9983,rotation:-1.2122,x:-49.5,y:-14.85,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-38.339,x:-48.45,y:44.45,regY:-53,regX:-5}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:9.905,x:-35.4,y:-39.3}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:-0.3934,x:-61.2,y:-71.8,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:14.2967,x:2.35,y:2.05,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:-14.5603,y:-15.25,regY:-27.2,x:55.9}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:-5.3306,x:-13.1,y:58.5,regY:-45.1}},{t:this.instance,p:{rotation:-53.1573,x:64,y:45.5,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.4,rotation:-49.478,y:-33.5,x:53.15,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:-1.1398,x:33.95,y:-31.7}},{t:this.instance_9,p:{rotation:-6.3732,x:27.05,y:35.9,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.6,scaleX:0.9983,scaleY:0.9983,rotation:1.0825,x:-49.55,y:-14.85,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-39.7813,x:-50.7,y:44.45,regY:-52.9,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:8.6442,x:-35.4,y:-39.3}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:-0.651,x:-61.85,y:-71.2,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:12.5559,x:2.4,y:2,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:-14.7404,y:-15.3,regY:-27.2,x:55.95}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:-10.1599,x:-11.45,y:58.9,regY:-45.1}},{t:this.instance,p:{rotation:-58.0419,x:64.25,y:45.4,regX:7.6,scaleX:0.9966,scaleY:0.9966,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-49.5128,y:-33.35,x:53.1,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:0.2176,x:33.9,y:-31.7}},{t:this.instance_9,p:{rotation:-3.1149,x:25.5,y:35.85,regY:-40.1,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:4.4991,x:-49.7,y:-14.75,regX:-15.4}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-38.8196,x:-54.25,y:44.25,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:8.4475,x:-35.35,y:-39.3}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.1954,x:-61.95,y:-71.3,regY:17.2,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:15.7136,x:2.55,y:2.05,regX:0.6,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:-12.0041,y:-15.25,regY:-27.2,x:56}},{t:this.instance_1,p:{regX:11.5,scaleX:0.9978,scaleY:0.9978,rotation:-13.1313,x:-14.4,y:58.15,regY:-45.1}},{t:this.instance,p:{rotation:-50.2841,x:61.25,y:45.8,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-49.5464,y:-33.3,x:53.05,regY:-32,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:1.5778,x:33.9,y:-31.65}},{t:this.instance_9,p:{rotation:0.1394,x:23.9,y:35.5,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:7.9158,x:-49.5,y:-14.7,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-37.8587,x:-57.8,y:43.8,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.6,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:8.2491,x:-35.5,y:-39.35}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:1.0452,x:-62,y:-71.05,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:18.8726,x:2.35,y:2.05,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:-9.2675,y:-15.3,regY:-27.3,x:55.95}},{t:this.instance_1,p:{regX:11.5,scaleX:0.9978,scaleY:0.9978,rotation:-16.1016,x:-17.55,y:57.05,regY:-45.1}},{t:this.instance,p:{rotation:-42.5262,x:58.35,y:45.9,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-49.5811,y:-33.3,x:53.05,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:2.9389,x:33.9,y:-31.65}},{t:this.instance_9,p:{rotation:3.3986,x:22.35,y:35.25,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:11.33,x:-49.55,y:-14.7,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-36.8964,x:-61.25,y:43.25,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:8.0524,x:-35.35,y:-39.35}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:1.8944,x:-62.15,y:-71.05,regY:17.2,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:22.0304,x:2.4,y:2.05,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:-6.5302,y:-15.2,regY:-27.2,x:55.9}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:-19.0736,x:-20.6,y:55.85,regY:-45.1}},{t:this.instance,p:{rotation:-34.7672,x:55.35,y:45.95,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-49.6165,y:-33.3,x:53.15,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-28.9,scaleX:0.9964,scaleY:0.9964,rotation:4.2999,x:33.9,y:-31.5}},{t:this.instance_9,p:{rotation:6.6575,x:20.7,y:35.1,regY:-40.1,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:14.7468,x:-49.55,y:-14.75,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-35.9366,x:-64.75,y:42.35,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:7.8552,x:-35.4,y:-39.35}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:2.7441,x:-62.3,y:-70.85,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:25.1883,x:2.4,y:2.05,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:-3.7946,y:-15.25,regY:-27.2,x:55.95}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:-22.044,x:-23.45,y:54.65,regY:-45}},{t:this.instance,p:{rotation:-27.0091,x:52.45,y:45.9,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-49.6495,y:-33.25,x:53.1,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:5.6606,x:33.9,y:-31.6}},{t:this.instance_9,p:{rotation:9.9168,x:19.1,y:34.65,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9982,scaleY:0.9982,rotation:18.1635,x:-49.55,y:-14.75,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-34.9751,x:-68.05,y:41.45,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15.1,scaleX:0.9977,scaleY:0.9977,rotation:7.6579,x:-35.35,y:-39.2}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:3.5944,x:-62.55,y:-70.75,regY:17.3,regX:21.8}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:28.3455,x:2.45,y:2.15,regX:0.6,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:-1.0563,y:-15.3,regY:-27.2,x:55.95}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:-25.0151,x:-26.45,y:53.05,regY:-45.1}},{t:this.instance,p:{rotation:-19.2522,x:49.5,y:45.65,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-49.6849,y:-33.25,x:53.1,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:7.022,x:33.95,y:-31.6}},{t:this.instance_9,p:{rotation:13.1754,x:17.55,y:34.4,regY:-40.1,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.6,scaleX:0.9983,scaleY:0.9983,rotation:21.5807,x:-49.55,y:-14.85,regX:-15.4}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-34.0137,x:-71.35,y:40.3,regY:-52.9,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:7.4608,x:-35.4,y:-39.3}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:4.4437,x:-62.45,y:-70.65,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:31.5034,x:2.45,y:2.1,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9975,scaleY:0.9975,rotation:1.6761,y:-15.25,regY:-27.2,x:56}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:-27.9872,x:-29.1,y:51.35,regY:-45.1}},{t:this.instance,p:{rotation:-11.4952,x:46.6,y:45.3,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-49.7185,y:-33.25,x:53.15,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.8,regY:-29.1,scaleX:0.9964,scaleY:0.9964,rotation:8.3829,x:33.8,y:-31.7}},{t:this.instance_9,p:{rotation:16.4335,x:16.15,y:33.8,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:24.9966,x:-49.55,y:-14.75,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-33.0533,x:-74.65,y:38.75,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:7.2637,x:-35.4,y:-39.3}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:5.2939,x:-62.6,y:-70.55,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:34.6622,x:2.3,y:2.15,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:4.4124,y:-15.3,regY:-27.2,x:55.95}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:-30.9573,x:-31.85,y:49.5,regY:-45.1}},{t:this.instance,p:{rotation:-3.7368,x:43.65,y:44.8,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.4,rotation:-49.754,y:-33.35,x:53.15,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29.1,scaleX:0.9964,scaleY:0.9964,rotation:9.7432,x:33.9,y:-31.7}},{t:this.instance_9,p:{rotation:19.6931,x:14.55,y:33.4,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:28.4124,x:-49.5,y:-14.8,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-32.0911,x:-77.9,y:37.3,regY:-53,regX:-5}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:7.065,x:-35.35,y:-39.3}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:6.1446,x:-62.7,y:-70.4,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:37.8201,x:2.35,y:2.1,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:7.149,y:-15.25,regY:-27.2,x:55.9}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:-33.9277,x:-34.35,y:47.55,regY:-45.1}},{t:this.instance,p:{rotation:4.0172,x:40.85,y:44.05,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-49.7881,y:-33.2,x:53.05,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:11.1046,x:33.85,y:-31.55}},{t:this.instance_9,p:{rotation:22.9523,x:13,y:33,regY:-40.2,scaleX:0.9968,scaleY:0.9968}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:31.8286,x:-49.55,y:-14.75,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-31.1301,x:-80.8,y:35.45,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:6.869,x:-35.4,y:-39.35}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:6.9939,x:-62.75,y:-70.35,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:40.9779,x:2.5,y:2.2,regX:0.6,regY:-26.8}},{t:this.instance_2,p:{regX:2.7,scaleX:0.9974,scaleY:0.9974,rotation:9.8871,y:-15.4,regY:-27.3,x:55.85}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:-36.8995,x:-36.85,y:45.45,regY:-45.1}},{t:this.instance,p:{rotation:11.7754,x:37.95,y:43.3,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-49.8235,y:-33.25,x:53.1,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:12.4653,x:33.9,y:-31.55}},{t:this.instance_9,p:{rotation:26.2105,x:11.5,y:32.45,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:35.2451,x:-49.65,y:-14.85,regX:-15.4}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-30.1689,x:-83.75,y:33.45,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:6.6713,x:-35.35,y:-39.35}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:7.8445,x:-62.9,y:-70.2,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:44.1371,x:2.35,y:2.15,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:12.623,y:-15.3,regY:-27.2,x:56}},{t:this.instance_1,p:{regX:11.5,scaleX:0.9978,scaleY:0.9978,rotation:-39.87,x:-39.1,y:43.25,regY:-45.1}},{t:this.instance,p:{rotation:19.5329,x:35.15,y:42.35,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-48.9934,y:-33.3,x:53.1,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:12.8493,x:33.9,y:-31.55}},{t:this.instance_9,p:{rotation:22.8021,x:11.1,y:32.25,regY:-40.2,scaleX:0.9968,scaleY:0.9968}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9982,scaleY:0.9982,rotation:33.4634,x:-49.55,y:-14.8,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-23.9376,x:-82.15,y:34.55,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:7.0871,x:-35.4,y:-39.3}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:7.5308,x:-62.65,y:-70.5,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:44.2827,x:2.35,y:2.15,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:13.2543,y:-15.3,regY:-27.2,x:55.85}},{t:this.instance_1,p:{regX:11.5,scaleX:0.9978,scaleY:0.9978,rotation:-32.0672,x:-39.2,y:43.15,regY:-45.1}},{t:this.instance,p:{rotation:20.8817,x:34.65,y:42.2,regX:7.6,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-48.1627,y:-33.25,x:53.05,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29.1,scaleX:0.9964,scaleY:0.9964,rotation:13.232,x:33.95,y:-31.6}},{t:this.instance_9,p:{rotation:19.3927,x:10.6,y:32.15,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:31.6816,x:-49.55,y:-14.75,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-17.7051,x:-80.7,y:35.5,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:7.5058,x:-35.4,y:-39.3}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:7.218,x:-62.45,y:-70.55,regY:17.4,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:44.4264,x:2.35,y:2.15,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.7,scaleX:0.9974,scaleY:0.9974,rotation:13.8866,y:-15.35,regY:-27.2,x:55.8}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:-24.2655,x:-39.4,y:43.1,regY:-45.1}},{t:this.instance,p:{rotation:22.2324,x:33.85,y:42,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-47.3328,y:-33.25,x:53.1,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:13.6181,x:33.9,y:-31.5}},{t:this.instance_9,p:{rotation:15.985,x:10.3,y:31.95,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:29.9008,x:-49.6,y:-14.85,regX:-15.4}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-11.4742,x:-79.1,y:36.35,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:7.9233,x:-35.35,y:-39.35}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:6.9039,x:-62.15,y:-70.8,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:44.572,x:2.35,y:2.15,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:14.5159,y:-15.3,regY:-27.2,x:55.95}},{t:this.instance_1,p:{regX:11.3,scaleX:0.9978,scaleY:0.9978,rotation:-16.464,x:-39.5,y:43.1,regY:-45}},{t:this.instance,p:{rotation:23.5811,x:33.25,y:41.65,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.4,rotation:-46.502,y:-33.35,x:53.2,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:14.0016,x:33.85,y:-31.5}},{t:this.instance_9,p:{rotation:12.5763,x:9.8,y:31.85,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:28.119,x:-49.5,y:-14.85,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-5.2419,x:-77.4,y:37.25,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:8.3403,x:-35.4,y:-39.3}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:6.5906,x:-62.1,y:-71.05,regY:17.3,regX:21.8}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:44.7169,x:2.35,y:2.15,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:15.1477,y:-15.4,regY:-27.3,x:55.9}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:-8.6607,x:-39.55,y:42.85,regY:-45.1}},{t:this.instance,p:{rotation:24.9301,x:32.6,y:41.45,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-45.6723,y:-33.2,x:53.05,regY:-32,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_10,p:{regX:1.9,regY:-29.1,scaleX:0.9964,scaleY:0.9964,rotation:14.3859,x:33.9,y:-31.6}},{t:this.instance_9,p:{rotation:9.1663,x:9.4,y:31.65,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:26.3375,x:-49.5,y:-14.85,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:0.9846,x:-75.85,y:38.1,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:8.7567,x:-35.4,y:-39.35}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:6.2759,x:-61.85,y:-71.25,regY:17.3,regX:21.8}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:44.8631,x:2.35,y:2.15,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:15.78,y:-15.3,regY:-27.2,x:55.95}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:-0.8587,x:-39.65,y:42.75,regY:-45.1}},{t:this.instance,p:{rotation:26.2791,x:32,y:41.1,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.4,rotation:-44.8426,y:-33.2,x:53.2,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29.1,scaleX:0.9964,scaleY:0.9964,rotation:14.7696,x:33.9,y:-31.55}},{t:this.instance_9,p:{rotation:5.7576,x:8.95,y:31.5,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:24.5558,x:-49.6,y:-14.9,regX:-15.4}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:7.2175,x:-74.1,y:38.9,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:9.1738,x:-35.4,y:-39.35}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:5.9639,x:-61.5,y:-71.6,regY:17.2,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:45.0068,x:2.35,y:2.15,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:16.4103,y:-15.25,regY:-27.2,x:55.9}},{t:this.instance_1,p:{regX:11.5,scaleX:0.9978,scaleY:0.9978,rotation:6.9387,x:-39.6,y:42.7,regY:-45.1}},{t:this.instance,p:{rotation:27.6282,x:31.3,y:40.8,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-44.0136,y:-33.1,x:53.1,regY:-32,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:15.1535,x:33.9,y:-31.45}},{t:this.instance_9,p:{rotation:2.3493,x:8.55,y:31.3,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:22.7753,x:-49.55,y:-14.85,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:13.4503,x:-72.45,y:39.6,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:9.592,x:-35.35,y:-39.35}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:5.6496,x:-61.3,y:-71.6,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:45.1536,x:2.35,y:2.15,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.7,scaleX:0.9974,scaleY:0.9974,rotation:17.0409,y:-15.3,regY:-27.2,x:55.75}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:14.7409,x:-39.8,y:42.55,regY:-45.1}},{t:this.instance,p:{rotation:28.9788,x:30.8,y:40.65,regX:7.6,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.4,rotation:-43.1818,y:-33.2,x:53.2,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:15.5375,x:33.85,y:-31.45}},{t:this.instance_9,p:{rotation:-1.056,x:8.1,y:31.2,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:20.9923,x:-49.45,y:-14.85,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:19.6807,x:-70.65,y:40.3,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:10.0082,x:-35.4,y:-39.3}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:5.3353,x:-61.05,y:-71.7,regY:17.4,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:45.2992,x:2.35,y:2.15,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:17.6721,y:-15.3,regY:-27.2,x:55.8}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:22.5434,x:-39.9,y:42.45,regY:-45.1}},{t:this.instance,p:{rotation:30.3266,x:30.1,y:40.25,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-42.3516,y:-33.15,x:53.15,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:15.9223,x:33.85,y:-31.45}},{t:this.instance_9,p:{rotation:-4.4641,x:7.7,y:30.95,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:19.211,x:-49.5,y:-14.9,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:25.9128,x:-69,y:40.9,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:10.4267,x:-35.4,y:-39.3}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:5.0229,x:-60.85,y:-72.05,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:45.4441,x:2.4,y:2.15,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:18.3027,y:-15.3,regY:-27.2,x:55.8}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:30.3448,x:-39.95,y:42.3,regY:-45.1}},{t:this.instance,p:{rotation:31.6764,x:29.55,y:40.05,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-41.5226,y:-33.1,x:53.1,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.8,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:16.3058,x:33.7,y:-31.5}},{t:this.instance_9,p:{rotation:-7.8722,x:7.3,y:30.75,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:17.4304,x:-49.5,y:-14.95,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:32.145,x:-67.2,y:41.45,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15.1,scaleX:0.9977,scaleY:0.9977,rotation:10.844,x:-35.4,y:-39.25}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:4.7091,x:-60.5,y:-72.25,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:45.5891,x:2.45,y:2.15,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:18.9339,y:-15.35,regY:-27.2,x:55.8}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:38.1473,x:-40.1,y:42.35,regY:-45}},{t:this.instance,p:{rotation:33.0256,x:29,y:39.75,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-41.088,y:-33.05,x:53.25,regY:-31.9,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:13.0916,x:33.9,y:-31.4}},{t:this.instance_9,p:{rotation:-9.5725,x:10.85,y:32.15,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:15.3038,x:-49.45,y:-14.95,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:27.2322,x:-65.1,y:42.1,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.6,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:11.344,x:-35.5,y:-39.35}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:4.7495,x:-60.3,y:-72.45,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:44.642,x:2.45,y:2.1,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:18.9757,y:-15.35,regY:-27.2,x:55.85}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:38.236,x:-39.35,y:42.9,regY:-45.1}},{t:this.instance,p:{rotation:30.8056,x:28.9,y:39.7,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-40.6557,y:-33.05,x:53.1,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:9.8776,x:33.85,y:-31.4}},{t:this.instance_9,p:{rotation:-11.2731,x:14.4,y:33.4,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.6,scaleX:0.9983,scaleY:0.9983,rotation:13.1764,x:-49.45,y:-15.1,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:22.3195,x:-62.85,y:42.65,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:11.8449,x:-35.4,y:-39.3}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:4.7909,x:-60,y:-72.75,regY:17.2,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:43.6942,x:2.4,y:2.15,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:19.0173,y:-15.35,regY:-27.2,x:55.8}},{t:this.instance_1,p:{regX:11.3,scaleX:0.9978,scaleY:0.9978,rotation:38.3251,x:-38.85,y:43.65,regY:-45}},{t:this.instance,p:{rotation:28.5865,x:28.85,y:39.7,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.4,rotation:-40.2212,y:-33.2,x:53.25,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:6.6631,x:33.9,y:-31.4}},{t:this.instance_9,p:{rotation:-12.9718,x:18.15,y:34.35,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:11.0497,x:-49.5,y:-14.95,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:17.4067,x:-60.75,y:43.1,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:12.347,x:-35.35,y:-39.35}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:4.8314,x:-59.65,y:-72.9,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:42.7472,x:2.35,y:2.25,regX:0.5,regY:-26.7}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:19.0581,y:-15.35,regY:-27.2,x:55.8}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:38.415,x:-38,y:44.25,regY:-45.1}},{t:this.instance,p:{rotation:26.3669,x:28.75,y:39.7,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-39.789,y:-33.15,x:53.1,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:3.4486,x:33.9,y:-31.4}},{t:this.instance_9,p:{rotation:-14.6721,x:21.85,y:35.1,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:8.9217,x:-49.45,y:-14.9,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:12.4943,x:-58.55,y:43.5,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15.1,scaleX:0.9977,scaleY:0.9977,rotation:12.8489,x:-35.35,y:-39.2}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:4.8718,x:-59.4,y:-73.05,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:41.7996,x:2.3,y:2.25,regX:0.5,regY:-26.7}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:19.0996,y:-15.4,regY:-27.2,x:55.85}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:38.503,x:-37.35,y:44.95,regY:-45.1}},{t:this.instance,p:{rotation:24.1478,x:28.7,y:39.65,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-39.3544,y:-33.15,x:53.1,regY:-32,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:0.2343,x:33.85,y:-31.4}},{t:this.instance_9,p:{rotation:-16.3711,x:25.65,y:35.6,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:6.7946,x:-49.5,y:-14.95,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:7.5813,x:-56.5,y:43.75,regY:-53,regX:-5}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:13.3491,x:-35.35,y:-39.35}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:4.9131,x:-59.2,y:-73.3,regY:17.3,regX:21.8}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:40.8524,x:2.5,y:2.1,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:19.1398,y:-15.4,regY:-27.2,x:55.8}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:38.5921,x:-36.55,y:45.55,regY:-45.1}},{t:this.instance,p:{rotation:21.9286,x:28.7,y:39.7,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.4,rotation:-38.921,y:-33.1,x:53.2,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:-2.9758,x:33.95,y:-31.35}},{t:this.instance_9,p:{rotation:-18.073,x:29.4,y:35.95,regY:-40.2,scaleX:0.9968,scaleY:0.9968}},{t:this.instance_8,p:{regY:-34.6,scaleX:0.9983,scaleY:0.9983,rotation:4.6687,x:-49.45,y:-15.1,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:2.669,x:-54.4,y:44,regY:-53,regX:-5}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:13.8503,x:-35.35,y:-39.3}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:4.9545,x:-58.95,y:-73.45,regY:17.3,regX:21.8}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:39.9053,x:2.45,y:2.15,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:19.1817,y:-15.35,regY:-27.2,x:55.8}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:38.6806,x:-35.9,y:46.1,regY:-45.1}},{t:this.instance,p:{rotation:19.7088,x:28.7,y:39.55,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-38.4878,y:-33.1,x:53.2,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:-6.1899,x:33.95,y:-31.35}},{t:this.instance_9,p:{rotation:-19.7713,x:33.25,y:36.1,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:2.5406,x:-49.4,y:-15,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-2.2403,x:-52.05,y:44.15,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:14.3536,x:-35.35,y:-39.3}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:4.9957,x:-58.55,y:-73.65,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:38.9568,x:2.5,y:2.15,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:19.2225,y:-15.3,regY:-27.2,x:55.8}},{t:this.instance_1,p:{regX:11.3,scaleX:0.9978,scaleY:0.9978,rotation:38.7704,x:-35.2,y:46.7,regY:-45.1}},{t:this.instance,p:{rotation:17.4896,x:28.7,y:39.65,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-38.0543,y:-33.1,x:53.1,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:-9.4052,x:33.9,y:-31.3}},{t:this.instance_9,p:{rotation:-21.4721,x:37.05,y:36.15,regY:-40.1,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:0.4151,x:-49.45,y:-15,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-7.1529,x:-49.85,y:44.15,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:14.8537,x:-35.4,y:-39.35}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:5.0363,x:-58.15,y:-73.9,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:38.0098,x:2.45,y:2.15,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:19.2635,y:-15.4,regY:-27.2,x:55.8}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:38.8595,x:-34.4,y:47.45,regY:-45.1}},{t:this.instance,p:{rotation:15.2705,x:28.7,y:39.6,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-37.6215,y:-33.05,x:53.15,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:-12.6184,x:33.9,y:-31.3}},{t:this.instance_9,p:{rotation:-23.1712,x:40.8,y:35.75,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:-1.7089,x:-49.5,y:-15,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-12.0648,x:-47.65,y:44.1,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:15.3553,x:-35.35,y:-39.3}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:5.0767,x:-58.05,y:-74,regY:17.4,regX:21.8}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:37.0621,x:2.45,y:2.15,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:19.3042,y:-15.4,regY:-27.2,x:55.8}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:38.9485,x:-33.6,y:48,regY:-45.1}},{t:this.instance,p:{rotation:13.0512,x:28.65,y:39.55,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-37.1883,y:-33.1,x:53.1,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.8,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:-15.8328,x:33.8,y:-31.35}},{t:this.instance_9,p:{rotation:-24.872,x:44.55,y:35.25,regY:-40.2,scaleX:0.9968,scaleY:0.9968}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:-3.8343,x:-49.45,y:-15,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-16.9775,x:-45.45,y:44.05,regY:-53,regX:-5}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:15.8567,x:-35.4,y:-39.3}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:5.1171,x:-57.7,y:-74.25,regY:17.3,regX:21.8}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:36.1148,x:2.5,y:2.15,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:19.3461,y:-15.35,regY:-27.2,x:55.8}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:39.0376,x:-32.8,y:48.6,regY:-45.1}},{t:this.instance,p:{rotation:10.8308,x:28.6,y:39.5,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.3}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-38.8046,y:-33.2,x:53.15,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:-15.8739,x:33.85,y:-31.45}},{t:this.instance_9,p:{rotation:-22.304,x:44.6,y:35.25,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:-6.9639,x:-49.45,y:-14.95,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-18.9679,x:-42.35,y:43.8,regY:-53,regX:-5}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:16.6856,x:-35.35,y:-39.3}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:4.4261,x:-57.1,y:-74.65,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:34.5067,x:2.35,y:2.25,regX:0.5,regY:-26.7}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:12.8406,y:-15.35,regY:-27.2,x:55.9}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:37.8765,x:-31.55,y:49.65,regY:-45.1}},{t:this.instance,p:{rotation:5.8001,x:35,y:42.35,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-40.4188,y:-33.2,x:53.15,regY:-32,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:-15.9159,x:33.85,y:-31.55}},{t:this.instance_9,p:{rotation:-19.7349,x:44.65,y:35.3,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:-10.094,x:-49.65,y:-14.8,regX:-15.4}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-20.9586,x:-39.1,y:43.3,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:17.5146,x:-35.4,y:-39.35}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:3.7357,x:-56.55,y:-74.95,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:32.8997,x:2.4,y:2.1,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:6.3352,y:-15.25,regY:-27.2,x:55.95}},{t:this.instance_1,p:{regX:11.3,scaleX:0.9978,scaleY:0.9978,rotation:36.7148,x:-30.35,y:50.55,regY:-45.1}},{t:this.instance,p:{rotation:0.7684,x:41.7,y:44.35,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-42.0334,y:-33.25,x:53.15,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:-15.9581,x:33.85,y:-31.7}},{t:this.instance_9,p:{rotation:-17.1666,x:44.6,y:35.35,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.6,scaleX:0.9983,scaleY:0.9983,rotation:-13.2223,x:-49.55,y:-14.85,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-22.9494,x:-36.1,y:42.75,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:18.3424,x:-35.4,y:-39.25}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:3.045,x:-56.1,y:-75.3,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:31.2904,x:2.4,y:2.1,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:-0.1657,y:-15.25,regY:-27.2,x:55.9}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:35.5541,x:-28.95,y:51.55,regY:-45.1}},{t:this.instance,p:{rotation:-4.26,x:48.6,y:45.7,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-43.6486,y:-33.3,x:53.2,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.9,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:-15.9991,x:33.85,y:-31.8}},{t:this.instance_9,p:{rotation:-14.5993,x:44.7,y:35.35,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:-16.3513,x:-49.55,y:-14.75,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-24.938,x:-33.05,y:42,regY:-53,regX:-5}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:19.1699,x:-35.4,y:-39.3}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:2.3539,x:-55.5,y:-75.6,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:29.6829,x:2.3,y:2.1,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9975,scaleY:0.9975,rotation:-6.6712,y:-15.15,regY:-27.2,x:55.9}},{t:this.instance_1,p:{regX:11.5,scaleX:0.9978,scaleY:0.9978,rotation:34.3914,x:-27.45,y:52.55,regY:-45.1}},{t:this.instance,p:{rotation:-9.2914,x:55.55,y:46.15,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).to({state:[{t:this.instance_11,p:{regX:-14.5,rotation:-45.2627,y:-33.45,x:53.1,regY:-32,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10,p:{regX:1.8,regY:-29,scaleX:0.9964,scaleY:0.9964,rotation:-16.0408,x:33.75,y:-31.85}},{t:this.instance_9,p:{rotation:-12.0298,x:44.65,y:35.35,regY:-40.2,scaleX:0.9969,scaleY:0.9969}},{t:this.instance_8,p:{regY:-34.5,scaleX:0.9983,scaleY:0.9983,rotation:-19.4802,x:-49.65,y:-14.6,regX:-15.3}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,rotation:-26.9266,x:-30,y:41.05,regY:-53,regX:-4.9}},{t:this.instance_6},{t:this.instance_5,p:{regX:33.7,regY:15,scaleX:0.9977,scaleY:0.9977,rotation:20.0521,x:-35.4,y:-39.3}},{t:this.instance_4,p:{scaleX:0.9979,scaleY:0.9979,rotation:1.7156,x:-55,y:-75.9,regY:17.3,regX:21.9}},{t:this.instance_3,p:{scaleX:0.998,scaleY:0.998,rotation:28.0747,x:2.25,y:2.1,regX:0.5,regY:-26.8}},{t:this.instance_2,p:{regX:2.8,scaleX:0.9974,scaleY:0.9974,rotation:-13.1761,y:-15.2,regY:-27.2,x:55.95}},{t:this.instance_1,p:{regX:11.4,scaleX:0.9978,scaleY:0.9978,rotation:33.232,x:-26.15,y:53.3,regY:-45.1}},{t:this.instance,p:{rotation:-14.3222,x:62.45,y:45.8,regX:7.5,scaleX:0.9967,scaleY:0.9967,regY:-46.2}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-105.3,-187.8,225.1,298.9);


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
	this.instance = new lib.ch1_headcopy2("synched",0);
	this.instance.setTransform(-0.15,51.35,0.999,0.999,2.3215,0,0,0.9,52.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-80.2,-71.5,171.10000000000002,152.5);


(lib.horse_01_button = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-34.7,50.4,0.6059,0.6059,0,14.0723,-165.9277,7.9,-45.9);

	this.instance_1 = new lib.camel_leg_f_l_bcopy("synched",0);
	this.instance_1.setTransform(19.4,55.1,0.6066,0.6066,0,-33.3011,146.6989,11.5,-44.6);

	this.instance_2 = new lib.camel_leg_b_l_ucopy("synched",0);
	this.instance_2.setTransform(-30.65,13.4,0.6064,0.6064,0,13.1179,-166.8821,3,-26.8);

	this.instance_3 = new lib.camel_leg_f_l_ucopy("synched",0);
	this.instance_3.setTransform(2.05,23.9,0.6067,0.6067,0,-28.2207,151.7793,0.6,-26.4);

	this.instance_4 = new lib.camel_headcopy("synched",0);
	this.instance_4.setTransform(36.9,-23.45,0.6067,0.6067,0,-1.6502,178.3498,21.8,17.2);

	this.instance_5 = new lib.camel_neckcopy("synched",0);
	this.instance_5.setTransform(24.85,-1.3,0.6065,0.6065,0,-19.9877,160.0123,33.6,14.8);

	this.instance_6 = new lib.camel_bodycopy("synched",0);
	this.instance_6.setTransform(5.85,0.9,0.6079,0.6079,0,0,180,-0.1,0.4);

	this.instance_7 = new lib.camel_leg_f_r_bcopy("synched",0);
	this.instance_7.setTransform(21.5,47.5,0.6068,0.6068,0,26.7951,-153.2049,-5,-52.7);

	this.instance_8 = new lib.camel_leg_f_r_ucopy("synched",0);
	this.instance_8.setTransform(33.6,13.75,0.6069,0.6069,0,19.5894,-160.4106,-15.6,-34.1);

	this.instance_9 = new lib.camel_leg_b_r_bcopy("synched",0);
	this.instance_9.setTransform(-23.75,44.15,0.606,0.606,0,11.5306,-168.4694,5.2,-39.8);

	this.instance_10 = new lib.camel_leg_b_r_ucopy("synched",0);
	this.instance_10.setTransform(-17.25,3.2,0.6058,0.6058,0,15.7892,-164.2108,2.1,-28.6);

	this.instance_11 = new lib.camel_tailcopy("synched",0);
	this.instance_11.setTransform(-29,2.25,0.6066,0.6066,0,45.2446,-134.7554,-14.5,-31.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).to({state:[]},1).wait(1));

	// Layer_1
	this.instance_12 = new lib.horse_01();
	this.instance_12.setTransform(8.05,34.7,0.6081,0.6081,0,0,180,-7.7,19.9);
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1).to({_off:false},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.3,-91.7,129.3,176.4);


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

	// sweat3
	this.instance = new lib.Tween1("synched",0);
	this.instance.setTransform(-56.25,-151.55);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({y:-128.3},12).to({_off:true},1).wait(7));

	// sweat2
	this.instance_1 = new lib.Tween2("synched",0);
	this.instance_1.setTransform(0.2,-176.35);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(6).to({_off:false},0).to({y:-170.25},4).to({y:-135.7},9).wait(1));

	// sweat1
	this.instance_2 = new lib.Tween3("synched",0);
	this.instance_2.setTransform(50.8,-162.15);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(2).to({_off:false},0).to({y:-159.7},4).to({y:-120.85},10).to({_off:true},1).wait(3));

	// flash0_ai
	this.instance_3 = new lib.Tween4("synched",0);
	this.instance_3.setTransform(1,-168.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({y:-165.7},19).wait(1));

	// Armature_1
	this.instance_4 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_4.setTransform(-59.05,-12.35,0.9978,0.9978,-69.1978,0,0,33.8,10.2);

	this.instance_5 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_5.setTransform(-103.7,138.9,0.9974,0.9974,-108.2376,0,0,14.6,-0.1);

	this.instance_6 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_6.setTransform(-103.45,138.95,0.9977,0.9977,-101.7334,0,0,4.7,-8.8);

	this.instance_7 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_7.setTransform(-87.25,54.1,0.9977,0.9977,-84.1781,0,0,44.6,7.6);

	this.instance_8 = new lib.ch1_headcopy("synched",0);
	this.instance_8.setTransform(1.3,-80.8,0.9983,0.9983,-11.8652,0,0,1.9,51.1);

	this.instance_9 = new lib.ch1_uBodycopy("synched",0);
	this.instance_9.setTransform(-7.35,-36,1,1,0,0,0,-0.1,-39.6);

	this.instance_10 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_10.setTransform(23.75,88.2,0.9949,0.9949,-8.9752,0,0,-0.4,4.4);

	this.instance_11 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_11.setTransform(-30,89.75,0.9957,0.9957,3.9411,0,0,1.4,-42.9);

	this.instance_12 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_12.setTransform(-41.4,185.4,0.9953,0.9953,10.0073,0,0,1.4,-51.6);

	this.instance_13 = new lib.ch1_neckcopy("synched",0);
	this.instance_13.setTransform(-4.15,-59.2,0.9984,0.9984,11.3566,0,0,-1.2,7.7);

	this.instance_14 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_14.setTransform(33.75,185.6,0.9951,0.9951,-9.255,0,0,3.2,-50.6);

	this.instance_15 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_15.setTransform(96.6,129,0.9976,0.9976,80.1018,0,0,-10.5,10.7);

	this.instance_16 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_16.setTransform(94.8,126.3,0.9976,0.9976,44.7893,0,0,-7.7,13.6);

	this.instance_17 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_17.setTransform(54.4,49.75,0.9976,0.9976,67.926,0,0,-45.7,13.1);

	this.instance_18 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_18.setTransform(47.85,-21.05,0.9979,0.9979,85.3023,0,0,-33,13.8);

	this.instance_19 = new lib.ch1_lBodycopy("synched",0);
	this.instance_19.setTransform(-9.2,48.95,0.9995,0.9995,1.7768,0,0,-3.9,-22);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_19,p:{regY:-22,rotation:1.7768,x:-9.2,y:48.95,regX:-3.9}},{t:this.instance_18,p:{regX:-33,regY:13.8,scaleX:0.9979,scaleY:0.9979,rotation:85.3023,x:47.85,y:-21.05}},{t:this.instance_17,p:{rotation:67.926,x:54.4,y:49.75,regX:-45.7,regY:13.1}},{t:this.instance_16,p:{regY:13.6,scaleX:0.9976,scaleY:0.9976,x:94.8,y:126.3,rotation:44.7893}},{t:this.instance_15,p:{scaleX:0.9976,scaleY:0.9976,rotation:80.1018,x:96.6,y:129,regY:10.7,regX:-10.5}},{t:this.instance_14,p:{scaleX:0.9951,scaleY:0.9951,rotation:-9.255,x:33.75,y:185.6,regX:3.2}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:11.3566,y:-59.2,x:-4.15}},{t:this.instance_12,p:{regX:1.4,regY:-51.6,rotation:10.0073,x:-41.4,scaleX:0.9953,scaleY:0.9953,y:185.4}},{t:this.instance_11,p:{regX:1.4,rotation:3.9411,x:-30,y:89.75,scaleX:0.9957,scaleY:0.9957}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-8.9752,x:23.75,y:88.2}},{t:this.instance_9},{t:this.instance_8,p:{scaleX:0.9983,scaleY:0.9983,rotation:-11.8652,x:1.3,y:-80.8}},{t:this.instance_7,p:{regY:7.6,scaleX:0.9977,scaleY:0.9977,rotation:-84.1781,x:-87.25,y:54.1}},{t:this.instance_6,p:{scaleX:0.9977,scaleY:0.9977,rotation:-101.7334,x:-103.45,y:138.95,regX:4.7}},{t:this.instance_5,p:{regX:14.6,scaleX:0.9974,scaleY:0.9974,rotation:-108.2376,x:-103.7,y:138.9}},{t:this.instance_4,p:{scaleX:0.9978,scaleY:0.9978,rotation:-69.1978,x:-59.05,y:-12.35}}]}).to({state:[{t:this.instance_19,p:{regY:-21.9,rotation:1.7751,x:-9.1,y:49,regX:-3.9}},{t:this.instance_18,p:{regX:-32.9,regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:85.3027,x:47.9,y:-21.1}},{t:this.instance_17,p:{rotation:67.9263,x:54.35,y:49.7,regX:-45.7,regY:13.1}},{t:this.instance_16,p:{regY:13.5,scaleX:0.9975,scaleY:0.9975,x:94.75,y:126.15,rotation:44.7893}},{t:this.instance_15,p:{scaleX:0.9975,scaleY:0.9975,rotation:80.1022,x:96.5,y:128.95,regY:10.7,regX:-10.5}},{t:this.instance_14,p:{scaleX:0.995,scaleY:0.995,rotation:-9.2539,x:33.65,y:185.55,regX:3.2}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.3431,y:-59.15,x:-4.15}},{t:this.instance_12,p:{regX:1.3,regY:-51.5,rotation:10.0062,x:-41.45,scaleX:0.9953,scaleY:0.9953,y:185.4}},{t:this.instance_11,p:{regX:1.5,rotation:3.9405,x:-29.85,y:89.7,scaleX:0.9957,scaleY:0.9957}},{t:this.instance_10,p:{scaleX:0.9948,scaleY:0.9948,rotation:-8.9749,x:23.7,y:88.15}},{t:this.instance_9},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:-11.7016,x:1.35,y:-80.7}},{t:this.instance_7,p:{regY:7.5,scaleX:0.9976,scaleY:0.9976,rotation:-84.1787,x:-87.3,y:54.05}},{t:this.instance_6,p:{scaleX:0.9976,scaleY:0.9976,rotation:-101.7324,x:-103.35,y:138.9,regX:4.7}},{t:this.instance_5,p:{regX:14.5,scaleX:0.9973,scaleY:0.9973,rotation:-108.237,x:-103.65,y:138.95}},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-69.1982,x:-59,y:-12.35}}]},1).to({state:[{t:this.instance_19,p:{regY:-21.9,rotation:1.7751,x:-9.1,y:49,regX:-3.9}},{t:this.instance_18,p:{regX:-32.9,regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:85.3027,x:47.9,y:-21.1}},{t:this.instance_17,p:{rotation:67.9263,x:54.35,y:49.7,regX:-45.7,regY:13.1}},{t:this.instance_16,p:{regY:13.5,scaleX:0.9975,scaleY:0.9975,x:94.75,y:126.15,rotation:44.7893}},{t:this.instance_15,p:{scaleX:0.9975,scaleY:0.9975,rotation:80.1022,x:96.5,y:128.95,regY:10.7,regX:-10.5}},{t:this.instance_14,p:{scaleX:0.995,scaleY:0.995,rotation:-9.2539,x:33.65,y:185.55,regX:3.2}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.3305,y:-59.15,x:-4.15}},{t:this.instance_12,p:{regX:1.3,regY:-51.5,rotation:10.0062,x:-41.45,scaleX:0.9953,scaleY:0.9953,y:185.4}},{t:this.instance_11,p:{regX:1.5,rotation:3.9396,x:-29.85,y:89.7,scaleX:0.9957,scaleY:0.9957}},{t:this.instance_10,p:{scaleX:0.9948,scaleY:0.9948,rotation:-8.9749,x:23.7,y:88.15}},{t:this.instance_9},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:-11.5351,x:1.4,y:-80.7}},{t:this.instance_7,p:{regY:7.5,scaleX:0.9976,scaleY:0.9976,rotation:-84.1787,x:-87.3,y:54.05}},{t:this.instance_6,p:{scaleX:0.9976,scaleY:0.9976,rotation:-101.7324,x:-103.35,y:138.9,regX:4.7}},{t:this.instance_5,p:{regX:14.5,scaleX:0.9973,scaleY:0.9973,rotation:-108.237,x:-103.65,y:138.95}},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-69.1982,x:-59,y:-12.35}}]},1).to({state:[{t:this.instance_19,p:{regY:-21.9,rotation:1.7751,x:-9.1,y:48.95,regX:-3.9}},{t:this.instance_18,p:{regX:-32.9,regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:85.3027,x:47.9,y:-21.15}},{t:this.instance_17,p:{rotation:67.9263,x:54.35,y:49.7,regX:-45.7,regY:13.1}},{t:this.instance_16,p:{regY:13.5,scaleX:0.9975,scaleY:0.9975,x:94.7,y:126.15,rotation:44.7893}},{t:this.instance_15,p:{scaleX:0.9975,scaleY:0.9975,rotation:80.1022,x:96.5,y:128.95,regY:10.7,regX:-10.5}},{t:this.instance_14,p:{scaleX:0.995,scaleY:0.995,rotation:-9.2539,x:33.65,y:185.55,regX:3.2}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.318,y:-59.15,x:-4.15}},{t:this.instance_12,p:{regX:1.3,regY:-51.5,rotation:10.0062,x:-41.45,scaleX:0.9953,scaleY:0.9953,y:185.4}},{t:this.instance_11,p:{regX:1.5,rotation:3.9396,x:-29.85,y:89.7,scaleX:0.9957,scaleY:0.9957}},{t:this.instance_10,p:{scaleX:0.9948,scaleY:0.9948,rotation:-8.974,x:23.7,y:88.15}},{t:this.instance_9},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:-11.369,x:1.35,y:-80.65}},{t:this.instance_7,p:{regY:7.5,scaleX:0.9976,scaleY:0.9976,rotation:-84.1787,x:-87.3,y:54.05}},{t:this.instance_6,p:{scaleX:0.9976,scaleY:0.9976,rotation:-101.7324,x:-103.35,y:138.9,regX:4.7}},{t:this.instance_5,p:{regX:14.5,scaleX:0.9973,scaleY:0.9973,rotation:-108.237,x:-103.65,y:138.95}},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-69.1982,x:-59,y:-12.35}}]},1).to({state:[{t:this.instance_19,p:{regY:-21.9,rotation:1.7751,x:-9.1,y:48.95,regX:-3.9}},{t:this.instance_18,p:{regX:-32.9,regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:85.3027,x:47.9,y:-21.15}},{t:this.instance_17,p:{rotation:67.9263,x:54.35,y:49.7,regX:-45.7,regY:13.1}},{t:this.instance_16,p:{regY:13.5,scaleX:0.9975,scaleY:0.9975,x:94.7,y:126.15,rotation:44.7893}},{t:this.instance_15,p:{scaleX:0.9975,scaleY:0.9975,rotation:80.1031,x:96.5,y:128.95,regY:10.7,regX:-10.5}},{t:this.instance_14,p:{scaleX:0.995,scaleY:0.995,rotation:-9.2539,x:33.65,y:185.55,regX:3.2}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.3046,y:-59.15,x:-4.2}},{t:this.instance_12,p:{regX:1.3,regY:-51.5,rotation:10.0062,x:-41.45,scaleX:0.9953,scaleY:0.9953,y:185.4}},{t:this.instance_11,p:{regX:1.5,rotation:3.9395,x:-29.85,y:89.7,scaleX:0.9957,scaleY:0.9957}},{t:this.instance_10,p:{scaleX:0.9948,scaleY:0.9948,rotation:-8.974,x:23.7,y:88.15}},{t:this.instance_9},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:-11.2038,x:1.35,y:-80.65}},{t:this.instance_7,p:{regY:7.5,scaleX:0.9976,scaleY:0.9976,rotation:-84.1787,x:-87.3,y:54.05}},{t:this.instance_6,p:{scaleX:0.9976,scaleY:0.9976,rotation:-101.7324,x:-103.35,y:138.85,regX:4.7}},{t:this.instance_5,p:{regX:14.5,scaleX:0.9973,scaleY:0.9973,rotation:-108.237,x:-103.65,y:138.95}},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-69.1982,x:-59,y:-12.35}}]},1).to({state:[{t:this.instance_19,p:{regY:-21.9,rotation:1.7742,x:-9.15,y:48.95,regX:-3.9}},{t:this.instance_18,p:{regX:-32.9,regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:85.3036,x:47.9,y:-21.1}},{t:this.instance_17,p:{rotation:67.9263,x:54.35,y:49.7,regX:-45.7,regY:13.1}},{t:this.instance_16,p:{regY:13.5,scaleX:0.9975,scaleY:0.9975,x:94.7,y:126.15,rotation:44.7893}},{t:this.instance_15,p:{scaleX:0.9975,scaleY:0.9975,rotation:80.1031,x:96.5,y:128.95,regY:10.7,regX:-10.5}},{t:this.instance_14,p:{scaleX:0.995,scaleY:0.995,rotation:-9.253,x:33.65,y:185.55,regX:3.2}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.2902,y:-59.15,x:-4.2}},{t:this.instance_12,p:{regX:1.3,regY:-51.5,rotation:10.0062,x:-41.45,scaleX:0.9953,scaleY:0.9953,y:185.4}},{t:this.instance_11,p:{regX:1.5,rotation:3.9395,x:-29.85,y:89.7,scaleX:0.9957,scaleY:0.9957}},{t:this.instance_10,p:{scaleX:0.9948,scaleY:0.9948,rotation:-8.974,x:23.7,y:88.15}},{t:this.instance_9},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:-11.0377,x:1.35,y:-80.65}},{t:this.instance_7,p:{regY:7.5,scaleX:0.9976,scaleY:0.9976,rotation:-84.1795,x:-87.3,y:54}},{t:this.instance_6,p:{scaleX:0.9976,scaleY:0.9976,rotation:-101.7324,x:-103.35,y:138.85,regX:4.7}},{t:this.instance_5,p:{regX:14.5,scaleX:0.9973,scaleY:0.9973,rotation:-108.2365,x:-103.65,y:138.95}},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-69.1982,x:-59,y:-12.35}}]},1).to({state:[{t:this.instance_19,p:{regY:-21.9,rotation:1.7742,x:-9.15,y:48.95,regX:-3.9}},{t:this.instance_18,p:{regX:-32.9,regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:85.3036,x:47.9,y:-21.1}},{t:this.instance_17,p:{rotation:67.9263,x:54.35,y:49.65,regX:-45.7,regY:13.1}},{t:this.instance_16,p:{regY:13.5,scaleX:0.9975,scaleY:0.9975,x:94.65,y:126.15,rotation:44.7893}},{t:this.instance_15,p:{scaleX:0.9975,scaleY:0.9975,rotation:80.1031,x:96.5,y:128.95,regY:10.7,regX:-10.5}},{t:this.instance_14,p:{scaleX:0.995,scaleY:0.995,rotation:-9.253,x:33.65,y:185.55,regX:3.2}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.2778,y:-59.15,x:-4.1}},{t:this.instance_12,p:{regX:1.3,regY:-51.5,rotation:10.0062,x:-41.45,scaleX:0.9953,scaleY:0.9953,y:185.4}},{t:this.instance_11,p:{regX:1.5,rotation:3.9395,x:-29.85,y:89.7,scaleX:0.9957,scaleY:0.9957}},{t:this.instance_10,p:{scaleX:0.9948,scaleY:0.9948,rotation:-8.974,x:23.7,y:88.15}},{t:this.instance_9},{t:this.instance_8,p:{scaleX:0.9983,scaleY:0.9983,rotation:-10.8726,x:1.35,y:-80.65}},{t:this.instance_7,p:{regY:7.5,scaleX:0.9976,scaleY:0.9976,rotation:-84.1795,x:-87.3,y:54}},{t:this.instance_6,p:{scaleX:0.9976,scaleY:0.9976,rotation:-101.7315,x:-103.35,y:138.85,regX:4.7}},{t:this.instance_5,p:{regX:14.5,scaleX:0.9973,scaleY:0.9973,rotation:-108.2365,x:-103.65,y:138.95}},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-69.1982,x:-59,y:-12.35}}]},1).to({state:[{t:this.instance_19,p:{regY:-21.9,rotation:1.7742,x:-9.15,y:48.95,regX:-3.9}},{t:this.instance_18,p:{regX:-32.9,regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:85.3036,x:47.9,y:-21.1}},{t:this.instance_17,p:{rotation:67.9263,x:54.35,y:49.65,regX:-45.7,regY:13.1}},{t:this.instance_16,p:{regY:13.5,scaleX:0.9975,scaleY:0.9975,x:94.65,y:126.15,rotation:44.7893}},{t:this.instance_15,p:{scaleX:0.9975,scaleY:0.9975,rotation:80.1031,x:96.5,y:128.95,regY:10.7,regX:-10.5}},{t:this.instance_14,p:{scaleX:0.995,scaleY:0.995,rotation:-9.253,x:33.65,y:185.55,regX:3.2}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.2653,y:-59.15,x:-4.15}},{t:this.instance_12,p:{regX:1.3,regY:-51.5,rotation:10.0052,x:-41.45,scaleX:0.9953,scaleY:0.9953,y:185.4}},{t:this.instance_11,p:{regX:1.5,rotation:3.9395,x:-29.85,y:89.7,scaleX:0.9957,scaleY:0.9957}},{t:this.instance_10,p:{scaleX:0.9948,scaleY:0.9948,rotation:-8.9731,x:23.7,y:88.15}},{t:this.instance_9},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.707,x:1.4,y:-80.65}},{t:this.instance_7,p:{regY:7.5,scaleX:0.9976,scaleY:0.9976,rotation:-84.1796,x:-87.3,y:54}},{t:this.instance_6,p:{scaleX:0.9976,scaleY:0.9976,rotation:-101.7315,x:-103.35,y:138.85,regX:4.7}},{t:this.instance_5,p:{regX:14.5,scaleX:0.9973,scaleY:0.9973,rotation:-108.2354,x:-103.6,y:138.95}},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-69.1985,x:-59,y:-12.35}}]},1).to({state:[{t:this.instance_19,p:{regY:-21.9,rotation:1.7742,x:-9.15,y:48.95,regX:-3.9}},{t:this.instance_18,p:{regX:-32.9,regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:85.3036,x:47.9,y:-21.1}},{t:this.instance_17,p:{rotation:67.9263,x:54.35,y:49.65,regX:-45.7,regY:13.1}},{t:this.instance_16,p:{regY:13.5,scaleX:0.9975,scaleY:0.9975,x:94.65,y:126.15,rotation:44.7893}},{t:this.instance_15,p:{scaleX:0.9975,scaleY:0.9975,rotation:80.104,x:96.5,y:128.95,regY:10.7,regX:-10.5}},{t:this.instance_14,p:{scaleX:0.995,scaleY:0.995,rotation:-9.253,x:33.65,y:185.55,regX:3.2}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.251,y:-59.15,x:-4.15}},{t:this.instance_12,p:{regX:1.3,regY:-51.5,rotation:10.0052,x:-41.45,scaleX:0.9953,scaleY:0.9953,y:185.4}},{t:this.instance_11,p:{regX:1.5,rotation:3.9387,x:-29.85,y:89.7,scaleX:0.9957,scaleY:0.9957}},{t:this.instance_10,p:{scaleX:0.9948,scaleY:0.9948,rotation:-8.9731,x:23.7,y:88.15}},{t:this.instance_9},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.5413,x:1.4,y:-80.65}},{t:this.instance_7,p:{regY:7.5,scaleX:0.9976,scaleY:0.9976,rotation:-84.1805,x:-87.3,y:54}},{t:this.instance_6,p:{scaleX:0.9976,scaleY:0.9976,rotation:-101.7315,x:-103.35,y:138.85,regX:4.7}},{t:this.instance_5,p:{regX:14.5,scaleX:0.9973,scaleY:0.9973,rotation:-108.2354,x:-103.6,y:138.95}},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-69.1985,x:-59,y:-12.35}}]},1).to({state:[{t:this.instance_19,p:{regY:-21.9,rotation:1.7742,x:-9.15,y:48.95,regX:-3.9}},{t:this.instance_18,p:{regX:-32.9,regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:85.3036,x:47.9,y:-21.1}},{t:this.instance_17,p:{rotation:67.9263,x:54.35,y:49.65,regX:-45.7,regY:13.1}},{t:this.instance_16,p:{regY:13.5,scaleX:0.9975,scaleY:0.9975,x:94.65,y:126.1,rotation:44.7893}},{t:this.instance_15,p:{scaleX:0.9975,scaleY:0.9975,rotation:80.104,x:96.5,y:128.95,regY:10.7,regX:-10.5}},{t:this.instance_14,p:{scaleX:0.995,scaleY:0.995,rotation:-9.2529,x:33.65,y:185.55,regX:3.2}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.2385,y:-59.15,x:-4.1}},{t:this.instance_12,p:{regX:1.3,regY:-51.5,rotation:10.0052,x:-41.45,scaleX:0.9953,scaleY:0.9953,y:185.4}},{t:this.instance_11,p:{regX:1.5,rotation:3.9387,x:-29.85,y:89.7,scaleX:0.9957,scaleY:0.9957}},{t:this.instance_10,p:{scaleX:0.9948,scaleY:0.9948,rotation:-8.9731,x:23.65,y:88.1}},{t:this.instance_9},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.3746,x:1.35,y:-80.65}},{t:this.instance_7,p:{regY:7.5,scaleX:0.9976,scaleY:0.9976,rotation:-84.1805,x:-87.3,y:54}},{t:this.instance_6,p:{scaleX:0.9976,scaleY:0.9976,rotation:-101.7315,x:-103.3,y:138.85,regX:4.7}},{t:this.instance_5,p:{regX:14.5,scaleX:0.9973,scaleY:0.9973,rotation:-108.2354,x:-103.55,y:138.95}},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-69.199,x:-59,y:-12.3}}]},1).to({state:[{t:this.instance_19,p:{regY:-21.9,rotation:1.7681,x:-9.15,y:48.95,regX:-3.9}},{t:this.instance_18,p:{regX:-32.9,regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:85.3107,x:47.9,y:-21.15}},{t:this.instance_17,p:{rotation:67.9535,x:54.45,y:49.75,regX:-45.6,regY:13.1}},{t:this.instance_16,p:{regY:13.6,scaleX:0.9975,scaleY:0.9975,x:94.55,y:126.2,rotation:44.8364}},{t:this.instance_15,p:{scaleX:0.9975,scaleY:0.9975,rotation:80.1733,x:96.4,y:128.9,regY:10.7,regX:-10.5}},{t:this.instance_14,p:{scaleX:0.995,scaleY:0.995,rotation:-9.2442,x:33.7,y:185.5,regX:3.2}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.26,y:-59.15,x:-4.15}},{t:this.instance_12,p:{regX:1.4,regY:-51.5,rotation:10.0357,x:-41.35,scaleX:0.9952,scaleY:0.9952,y:185.5}},{t:this.instance_11,p:{regX:1.4,rotation:3.9449,x:-30,y:89.7,scaleX:0.9957,scaleY:0.9957}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-8.9916,x:23.75,y:88.15}},{t:this.instance_9},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.5413,x:1.4,y:-80.65}},{t:this.instance_7,p:{regY:7.5,scaleX:0.9976,scaleY:0.9976,rotation:-84.1848,x:-87.3,y:54.05}},{t:this.instance_6,p:{scaleX:0.9976,scaleY:0.9976,rotation:-101.7558,x:-103.35,y:138.9,regX:4.7}},{t:this.instance_5,p:{regX:14.5,scaleX:0.9973,scaleY:0.9973,rotation:-108.2409,x:-103.6,y:138.95}},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-69.2112,x:-59,y:-12.35}}]},1).to({state:[{t:this.instance_19,p:{regY:-21.9,rotation:1.7629,x:-9.3,y:48.95,regX:-4}},{t:this.instance_18,p:{regX:-32.9,regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:85.3177,x:47.9,y:-21.15}},{t:this.instance_17,p:{rotation:67.9782,x:54.4,y:49.8,regX:-45.6,regY:13.1}},{t:this.instance_16,p:{regY:13.6,scaleX:0.9975,scaleY:0.9975,x:94.5,y:126.3,rotation:44.8847}},{t:this.instance_15,p:{scaleX:0.9975,scaleY:0.9975,rotation:80.241,x:96.3,y:128.95,regY:10.7,regX:-10.5}},{t:this.instance_14,p:{scaleX:0.995,scaleY:0.995,rotation:-9.2352,x:33.7,y:185.5,regX:3.2}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.2823,y:-59.15,x:-4.15}},{t:this.instance_12,p:{regX:1.3,regY:-51.5,rotation:10.066,x:-41.5,scaleX:0.9953,scaleY:0.9953,y:185.45}},{t:this.instance_11,p:{regX:1.4,rotation:3.9528,x:-30,y:89.7,scaleX:0.9957,scaleY:0.9957}},{t:this.instance_10,p:{scaleX:0.9948,scaleY:0.9948,rotation:-9.0105,x:23.75,y:88.15}},{t:this.instance_9},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.7062,x:1.4,y:-80.65}},{t:this.instance_7,p:{regY:7.5,scaleX:0.9976,scaleY:0.9976,rotation:-84.1893,x:-87.3,y:54.05}},{t:this.instance_6,p:{scaleX:0.9976,scaleY:0.9976,rotation:-101.7817,x:-103.3,y:138.9,regX:4.7}},{t:this.instance_5,p:{regX:14.5,scaleX:0.9973,scaleY:0.9973,rotation:-108.2453,x:-103.65,y:139}},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-69.2243,x:-59,y:-12.4}}]},1).to({state:[{t:this.instance_19,p:{regY:-21.9,rotation:1.7567,x:-9.3,y:49,regX:-4}},{t:this.instance_18,p:{regX:-32.9,regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:85.3247,x:47.9,y:-21.15}},{t:this.instance_17,p:{rotation:68.0038,x:54.35,y:49.75,regX:-45.6,regY:13.1}},{t:this.instance_16,p:{regY:13.6,scaleX:0.9975,scaleY:0.9975,x:94.4,y:126.35,rotation:44.9318}},{t:this.instance_15,p:{scaleX:0.9975,scaleY:0.9975,rotation:80.3086,x:96.45,y:129,regY:10.6,regX:-10.5}},{t:this.instance_14,p:{scaleX:0.995,scaleY:0.995,rotation:-9.2263,x:33.9,y:185.5,regX:3.3}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.3046,y:-59.15,x:-4.15}},{t:this.instance_12,p:{regX:1.4,regY:-51.5,rotation:10.0963,x:-41.35,scaleX:0.9953,scaleY:0.9953,y:185.45}},{t:this.instance_11,p:{regX:1.4,rotation:3.9598,x:-29.95,y:89.7,scaleX:0.9957,scaleY:0.9957}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-9.0301,x:23.75,y:88.15}},{t:this.instance_9},{t:this.instance_8,p:{scaleX:0.9983,scaleY:0.9983,rotation:-10.8718,x:1.35,y:-80.65}},{t:this.instance_7,p:{regY:7.5,scaleX:0.9976,scaleY:0.9976,rotation:-84.1944,x:-87.25,y:54.05}},{t:this.instance_6,p:{scaleX:0.9976,scaleY:0.9976,rotation:-101.8065,x:-103.25,y:138.9,regX:4.7}},{t:this.instance_5,p:{regX:14.5,scaleX:0.9973,scaleY:0.9973,rotation:-108.25,x:-103.6,y:139}},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-69.2376,x:-59,y:-12.35}}]},1).to({state:[{t:this.instance_19,p:{regY:-21.9,rotation:1.7515,x:-9.2,y:49,regX:-3.9}},{t:this.instance_18,p:{regX:-32.9,regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:85.3318,x:47.95,y:-21.15}},{t:this.instance_17,p:{rotation:68.0293,x:54.35,y:49.6,regX:-45.8,regY:13}},{t:this.instance_16,p:{regY:13.6,scaleX:0.9975,scaleY:0.9975,x:94.35,y:126.3,rotation:44.9789}},{t:this.instance_15,p:{scaleX:0.9975,scaleY:0.9975,rotation:80.3779,x:96.25,y:128.95,regY:10.7,regX:-10.5}},{t:this.instance_14,p:{scaleX:0.995,scaleY:0.995,rotation:-9.2183,x:33.75,y:185.55,regX:3.2}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.3261,y:-59.15,x:-4.15}},{t:this.instance_12,p:{regX:1.3,regY:-51.5,rotation:10.1266,x:-41.5,scaleX:0.9953,scaleY:0.9953,y:185.4}},{t:this.instance_11,p:{regX:1.4,rotation:3.9669,x:-30,y:89.7,scaleX:0.9957,scaleY:0.9957}},{t:this.instance_10,p:{scaleX:0.9948,scaleY:0.9948,rotation:-9.0497,x:23.75,y:88.15}},{t:this.instance_9},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:-11.0377,x:1.35,y:-80.65}},{t:this.instance_7,p:{regY:7.5,scaleX:0.9976,scaleY:0.9976,rotation:-84.199,x:-87.25,y:54.05}},{t:this.instance_6,p:{scaleX:0.9976,scaleY:0.9976,rotation:-101.8326,x:-103.2,y:138.95,regX:4.7}},{t:this.instance_5,p:{regX:14.5,scaleX:0.9973,scaleY:0.9973,rotation:-108.2556,x:-103.55,y:139}},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-69.2509,x:-59,y:-12.35}}]},1).to({state:[{t:this.instance_19,p:{regY:-21.9,rotation:1.7453,x:-9.2,y:49,regX:-3.9}},{t:this.instance_18,p:{regX:-32.9,regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:85.3379,x:47.95,y:-21.15}},{t:this.instance_17,p:{rotation:68.0549,x:54.25,y:49.6,regX:-45.8,regY:13.1}},{t:this.instance_16,p:{regY:13.6,scaleX:0.9975,scaleY:0.9975,x:94.35,y:126.3,rotation:45.026}},{t:this.instance_15,p:{scaleX:0.9975,scaleY:0.9975,rotation:80.447,x:96.15,y:128.85,regY:10.7,regX:-10.6}},{t:this.instance_14,p:{scaleX:0.995,scaleY:0.995,rotation:-9.2103,x:33.85,y:185.55,regX:3.2}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.3475,y:-59.15,x:-4.15}},{t:this.instance_12,p:{regX:1.4,regY:-51.5,rotation:10.1578,x:-41.4,scaleX:0.9953,scaleY:0.9953,y:185.4}},{t:this.instance_11,p:{regX:1.4,rotation:3.9739,x:-30,y:89.7,scaleX:0.9957,scaleY:0.9957}},{t:this.instance_10,p:{scaleX:0.9948,scaleY:0.9948,rotation:-9.0692,x:23.7,y:88.15}},{t:this.instance_9},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:-11.2029,x:1.35,y:-80.65}},{t:this.instance_7,p:{regY:7.5,scaleX:0.9976,scaleY:0.9976,rotation:-84.2032,x:-87.25,y:54.05}},{t:this.instance_6,p:{scaleX:0.9976,scaleY:0.9976,rotation:-101.8584,x:-103.25,y:138.9,regX:4.7}},{t:this.instance_5,p:{regX:14.5,scaleX:0.9973,scaleY:0.9973,rotation:-108.2611,x:-103.5,y:139}},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-69.2637,x:-59,y:-12.4}}]},1).to({state:[{t:this.instance_19,p:{regY:-21.9,rotation:1.7401,x:-9.2,y:49,regX:-3.9}},{t:this.instance_18,p:{regX:-32.9,regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:85.3449,x:47.9,y:-21.1}},{t:this.instance_17,p:{rotation:68.0813,x:54.35,y:49.75,regX:-45.7,regY:13.1}},{t:this.instance_16,p:{regY:13.6,scaleX:0.9975,scaleY:0.9975,x:94.35,y:126.35,rotation:45.0725}},{t:this.instance_15,p:{scaleX:0.9975,scaleY:0.9975,rotation:80.5148,x:96.15,y:128.9,regY:10.7,regX:-10.6}},{t:this.instance_14,p:{scaleX:0.995,scaleY:0.995,rotation:-9.2014,x:33.9,y:185.55,regX:3.2}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.3682,y:-59.15,x:-4.1}},{t:this.instance_12,p:{regX:1.3,regY:-51.5,rotation:10.1882,x:-41.5,scaleX:0.9953,scaleY:0.9953,y:185.4}},{t:this.instance_11,p:{regX:1.4,rotation:3.981,x:-29.95,y:89.7,scaleX:0.9956,scaleY:0.9956}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-9.0878,x:23.75,y:88.1}},{t:this.instance_9},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:-11.3682,x:1.35,y:-80.65}},{t:this.instance_7,p:{regY:7.5,scaleX:0.9976,scaleY:0.9976,rotation:-84.2078,x:-87.2,y:54.1}},{t:this.instance_6,p:{scaleX:0.9976,scaleY:0.9976,rotation:-101.8826,x:-103.25,y:138.8,regX:4.8}},{t:this.instance_5,p:{regX:14.5,scaleX:0.9973,scaleY:0.9973,rotation:-108.2667,x:-103.55,y:139}},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-69.277,x:-59.05,y:-12.3}}]},1).to({state:[{t:this.instance_19,p:{regY:-21.9,rotation:1.7357,x:-9.15,y:49,regX:-3.9}},{t:this.instance_18,p:{regX:-32.9,regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:85.352,x:47.9,y:-21.05}},{t:this.instance_17,p:{rotation:68.1065,x:54.25,y:49.7,regX:-45.7,regY:13.1}},{t:this.instance_16,p:{regY:13.6,scaleX:0.9975,scaleY:0.9975,x:94.35,y:126.35,rotation:45.1209}},{t:this.instance_15,p:{scaleX:0.9975,scaleY:0.9975,rotation:80.5832,x:96.1,y:129.05,regY:10.7,regX:-10.5}},{t:this.instance_14,p:{scaleX:0.995,scaleY:0.995,rotation:-9.1923,x:33.85,y:185.55,regX:3.2}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.3912,y:-59.15,x:-4.1}},{t:this.instance_12,p:{regX:1.4,regY:-51.5,rotation:10.2195,x:-41.4,scaleX:0.9953,scaleY:0.9953,y:185.4}},{t:this.instance_11,p:{regX:1.4,rotation:3.988,x:-30,y:89.7,scaleX:0.9957,scaleY:0.9957}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-9.1075,x:23.7,y:88.1}},{t:this.instance_9},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:-11.5343,x:1.35,y:-80.7}},{t:this.instance_7,p:{regY:7.5,scaleX:0.9976,scaleY:0.9976,rotation:-84.2121,x:-87.2,y:54.15}},{t:this.instance_6,p:{scaleX:0.9976,scaleY:0.9976,rotation:-101.9086,x:-103.25,y:138.85,regX:4.8}},{t:this.instance_5,p:{regX:14.5,scaleX:0.9973,scaleY:0.9973,rotation:-108.2711,x:-103.5,y:139}},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-69.2892,x:-59.05,y:-12.3}}]},1).to({state:[{t:this.instance_19,p:{regY:-21.9,rotation:1.7296,x:-9.15,y:49,regX:-3.9}},{t:this.instance_18,p:{regX:-32.9,regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:85.359,x:47.9,y:-21.1}},{t:this.instance_17,p:{rotation:68.132,x:54.25,y:49.75,regX:-45.7,regY:13.1}},{t:this.instance_16,p:{regY:13.6,scaleX:0.9975,scaleY:0.9975,x:94.3,y:126.4,rotation:45.1692}},{t:this.instance_15,p:{scaleX:0.9975,scaleY:0.9975,rotation:80.6515,x:96.05,y:129.05,regY:10.7,regX:-10.5}},{t:this.instance_14,p:{scaleX:0.995,scaleY:0.995,rotation:-9.1835,x:33.95,y:185.55,regX:3.2}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.412,y:-59.15,x:-4.1}},{t:this.instance_12,p:{regX:1.3,regY:-51.5,rotation:10.2498,x:-41.5,scaleX:0.9953,scaleY:0.9953,y:185.45}},{t:this.instance_11,p:{regX:1.5,rotation:3.9951,x:-29.85,y:89.75,scaleX:0.9956,scaleY:0.9956}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-9.127,x:23.75,y:88.15}},{t:this.instance_9},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:-11.6997,x:1.35,y:-80.7}},{t:this.instance_7,p:{regY:7.5,scaleX:0.9976,scaleY:0.9976,rotation:-84.2166,x:-87.2,y:54.15}},{t:this.instance_6,p:{scaleX:0.9976,scaleY:0.9976,rotation:-101.9338,x:-103.15,y:139,regX:4.7}},{t:this.instance_5,p:{regX:14.5,scaleX:0.9973,scaleY:0.9973,rotation:-108.2767,x:-103.45,y:139.05}},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-69.3025,x:-59.1,y:-12.35}}]},1).to({state:[{t:this.instance_19,p:{regY:-21.9,rotation:1.7243,x:-9.15,y:49,regX:-3.9}},{t:this.instance_18,p:{regX:-32.9,regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:85.3652,x:47.9,y:-21.1}},{t:this.instance_17,p:{rotation:68.1568,x:54.2,y:49.8,regX:-45.7,regY:13.1}},{t:this.instance_16,p:{regY:13.6,scaleX:0.9975,scaleY:0.9975,x:94.25,y:126.45,rotation:45.2157}},{t:this.instance_15,p:{scaleX:0.9975,scaleY:0.9975,rotation:80.7201,x:96,y:128.95,regY:10.7,regX:-10.6}},{t:this.instance_14,p:{scaleX:0.995,scaleY:0.995,rotation:-9.1747,x:34,y:185.45,regX:3.2}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.4351,y:-59.15,x:-4.1}},{t:this.instance_12,p:{regX:1.4,regY:-51.5,rotation:10.2802,x:-41.4,scaleX:0.9953,scaleY:0.9953,y:185.4}},{t:this.instance_11,p:{regX:1.5,rotation:4.002,x:-29.85,y:89.75,scaleX:0.9957,scaleY:0.9957}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-9.1458,x:23.7,y:88.15}},{t:this.instance_9},{t:this.instance_8,p:{scaleX:0.9983,scaleY:0.9983,rotation:-11.8651,x:1.4,y:-80.7}},{t:this.instance_7,p:{regY:7.6,scaleX:0.9976,scaleY:0.9976,rotation:-84.2217,x:-87.05,y:54.15}},{t:this.instance_6,p:{scaleX:0.9976,scaleY:0.9976,rotation:-101.9606,x:-103.15,y:139,regX:4.7}},{t:this.instance_5,p:{regX:14.5,scaleX:0.9973,scaleY:0.9973,rotation:-108.2819,x:-103.5,y:139.05}},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-69.3152,x:-59.1,y:-12.3}}]},1).to({state:[{t:this.instance_19,p:{regY:-21.9,rotation:1.7182,x:-9.15,y:49,regX:-3.9}},{t:this.instance_18,p:{regX:-32.9,regY:13.8,scaleX:0.9978,scaleY:0.9978,rotation:85.3713,x:47.8,y:-21.1}},{t:this.instance_17,p:{rotation:68.1823,x:54.3,y:49.85,regX:-45.6,regY:13.1}},{t:this.instance_16,p:{regY:13.6,scaleX:0.9975,scaleY:0.9975,x:94.2,y:126.4,rotation:45.2628}},{t:this.instance_15,p:{scaleX:0.9975,scaleY:0.9975,rotation:80.7882,x:95.95,y:129.1,regY:10.7,regX:-10.5}},{t:this.instance_14,p:{scaleX:0.995,scaleY:0.995,rotation:-9.1675,x:34.1,y:185.45,regX:3.3}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.4557,y:-59.15,x:-4.15}},{t:this.instance_12,p:{regX:1.3,regY:-51.5,rotation:10.3105,x:-41.55,scaleX:0.9953,scaleY:0.9953,y:185.45}},{t:this.instance_11,p:{regX:1.4,rotation:4.0092,x:-30,y:89.75,scaleX:0.9956,scaleY:0.9956}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-9.1654,x:23.75,y:88.2}},{t:this.instance_9},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:-12.03,x:1.35,y:-80.65}},{t:this.instance_7,p:{regY:7.6,scaleX:0.9976,scaleY:0.9976,rotation:-84.2254,x:-87.05,y:54.15}},{t:this.instance_6,p:{scaleX:0.9976,scaleY:0.9976,rotation:-101.9849,x:-103.15,y:139,regX:4.7}},{t:this.instance_5,p:{regX:14.5,scaleX:0.9973,scaleY:0.9973,rotation:-108.2869,x:-103.45,y:139.05}},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-69.3286,x:-59.1,y:-12.35}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-112.3,-212.3,235.1,509.40000000000003);


(lib.CharacterCivilian_08_sweat_button = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Tween1("synched",0);
	this.instance.setTransform(-49.1,-202.1);

	this.instance_1 = new lib.Tween4("synched",0);
	this.instance_1.setTransform(8.15,-219.45);

	this.instance_2 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_2.setTransform(-51.9,-62.9,0.9978,0.9978,-69.1978,0,0,33.8,10.2);

	this.instance_3 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_3.setTransform(-96.55,88.35,0.9974,0.9974,-108.2376,0,0,14.6,-0.1);

	this.instance_4 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_4.setTransform(-96.3,88.4,0.9977,0.9977,-101.7334,0,0,4.7,-8.8);

	this.instance_5 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_5.setTransform(-80.1,3.55,0.9977,0.9977,-84.1781,0,0,44.6,7.6);

	this.instance_6 = new lib.ch1_headcopy("synched",0);
	this.instance_6.setTransform(8.45,-131.35,0.9983,0.9983,-11.8652,0,0,1.9,51.1);

	this.instance_7 = new lib.ch1_uBodycopy("synched",0);
	this.instance_7.setTransform(-0.2,-86.55,1,1,0,0,0,-0.1,-39.6);

	this.instance_8 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_8.setTransform(30.9,37.65,0.9949,0.9949,-8.9752,0,0,-0.4,4.4);

	this.instance_9 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_9.setTransform(-22.85,39.2,0.9957,0.9957,3.9411,0,0,1.4,-42.9);

	this.instance_10 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_10.setTransform(-34.25,134.85,0.9953,0.9953,10.0073,0,0,1.4,-51.6);

	this.instance_11 = new lib.ch1_neckcopy("synched",0);
	this.instance_11.setTransform(3,-109.75,0.9984,0.9984,11.3566,0,0,-1.2,7.7);

	this.instance_12 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_12.setTransform(40.9,135.05,0.9951,0.9951,-9.255,0,0,3.2,-50.6);

	this.instance_13 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_13.setTransform(103.75,78.45,0.9976,0.9976,80.1018,0,0,-10.5,10.7);

	this.instance_14 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_14.setTransform(101.95,75.75,0.9976,0.9976,44.7893,0,0,-7.7,13.6);

	this.instance_15 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_15.setTransform(61.55,-0.8,0.9976,0.9976,67.926,0,0,-45.7,13.1);

	this.instance_16 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_16.setTransform(55,-71.6,0.9979,0.9979,85.3023,0,0,-33,13.8);

	this.instance_17 = new lib.ch1_lBodycopy("synched",0);
	this.instance_17.setTransform(-2.05,-1.6,0.9995,0.9995,1.7768,0,0,-3.9,-22);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_17},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).to({state:[]},1).wait(1));

	// Layer_1
	this.instance_18 = new lib.CharacterCivilian_09();
	this.instance_18.setTransform(11.05,-9.65,1,1,0,0,0,3.9,40.9);
	this.instance_18._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(1).to({_off:false},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-109.2,-262.8,240.60000000000002,510.1);


// stage content:
(lib.LessonChapter1_06 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,144,304];
	this.streamSoundSymbolsList[0] = [{id:"beforewar2edit_06wav",startFrame:0,endFrame:154,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("beforewar2edit_06wav",0);
		this.InsertIntoSoundStreamData(soundInstance,0,154,1);
	}
	this.frame_144 = function() {
		this.stop();
		
		this.homeBtn.addEventListener("click", fl_ClickToGoToHomePage);
		
		function fl_ClickToGoToHomePage() {
			createjs.Sound.play("popsound");
			
			setTimeout(function(){
			document.location.replace("http://127.0.0.1:8090/Home.html");
			}, 500);
		}
		
		this.CharacterCivilian_08_sweat_action_button.addEventListener("click", fl_ClickToGoToAndPlayFromFrame.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame()
		{
			createjs.Sound.play("horsesound");
			this.gotoAndPlay(155);
		}
	}
	this.frame_304 = function() {
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
			document.location.replace("https://ninzato.github.io/history-of-badr-war/LessonChapter1_07.html");
			}, 500);
			
		}
		
		this.prevBtn.addEventListener("click", fl_ClickToGoToWebPage_2);
		
		function fl_ClickToGoToWebPage_2() {
			createjs.Sound.play("popsound");
			
			setTimeout(function(){
			document.location.replace("https://ninzato.github.io/history-of-badr-war/LessonChapter1_05.html");
			}, 500);
			
		}
		
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(144).call(this.frame_144).wait(160).call(this.frame_304).wait(1));

	// Subtitle
	this.instance = new lib.CachedBmp_659();
	this.instance.setTransform(195.55,597,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_658();
	this.instance_1.setTransform(165.6,564.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(305));

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.homeBtn},{t:this.prevBtn},{t:this.nextBtn}]}).wait(305));

	// interaction
	this.instance_2 = new lib.horse_01_button();
	this.instance_2.setTransform(963,368.55);
	new cjs.ButtonHelper(this.instance_2, 0, 1, 1);

	this.abuSufyanBtn = new lib.CharacterCivilian_08_sweat_button();
	this.abuSufyanBtn.name = "abuSufyanBtn";
	this.abuSufyanBtn.setTransform(197.55,222.95,0.4269,0.4268,0,0,0,0,0.1);
	new cjs.ButtonHelper(this.abuSufyanBtn, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.abuSufyanBtn},{t:this.instance_2}]},298).wait(7));

	// horse
	this.instance_3 = new lib.horse_01();
	this.instance_3.setTransform(318.05,279.9,0.6081,0.6081,0,0,180,-7.7,19.9);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(154).to({_off:false},0).wait(1).to({regX:16.4,regY:-37.9,x:304.85,y:246.85},0).wait(1).to({x:306.35,y:249},0).wait(1).to({x:307.85,y:251.1},0).wait(1).to({x:309.45,y:253.2},0).wait(1).to({x:311.1,y:255.25},0).wait(1).to({x:312.75,y:257.3},0).wait(1).to({x:314.5,y:259.35},0).wait(1).to({x:316.25,y:261.35},0).wait(1).to({x:318.05,y:263.35},0).wait(1).to({x:319.9,y:265.3},0).wait(1).to({x:321.8,y:267.25},0).wait(1).to({x:323.75,y:269.2},0).wait(1).to({x:325.7,y:271.15},0).wait(1).to({x:327.75,y:273.05},0).wait(1).to({x:329.8,y:274.95},0).wait(1).to({x:331.9,y:276.8},0).wait(1).to({x:334.05,y:278.65},0).wait(1).to({x:336.25,y:280.5},0).wait(1).to({x:338.5,y:282.3},0).wait(1).to({x:340.8,y:284.1},0).wait(1).to({x:343.15,y:285.9},0).wait(1).to({x:345.5,y:287.65},0).wait(1).to({x:347.95,y:289.4},0).wait(1).to({x:350.4,y:291.1},0).wait(1).to({x:352.9,y:292.8},0).wait(1).to({x:355.45,y:294.5},0).wait(1).to({x:358.05,y:296.2},0).wait(1).to({x:360.7,y:297.85},0).wait(1).to({x:363.35,y:299.45},0).wait(1).to({x:366.1,y:301.1},0).wait(1).to({x:368.85,y:302.7},0).wait(1).to({x:371.65,y:304.25},0).wait(1).to({x:374.55,y:305.8},0).wait(1).to({x:377.45,y:307.35},0).wait(1).to({x:380.4,y:308.9},0).wait(1).to({x:383.35,y:310.4},0).wait(1).to({x:386.4,y:311.9},0).wait(1).to({x:389.45,y:313.35},0).wait(1).to({x:392.6,y:314.85},0).wait(1).to({x:395.75,y:316.25},0).wait(1).to({x:398.95,y:317.7},0).wait(1).to({x:402.2,y:319.1},0).wait(1).to({x:405.5,y:320.45},0).wait(1).to({x:408.85,y:321.85},0).wait(1).to({x:412.25,y:323.2},0).wait(1).to({x:415.65,y:324.5},0).wait(1).to({x:419.1,y:325.8},0).wait(1).to({x:422.65,y:327.1},0).wait(1).to({x:426.2,y:328.4},0).wait(1).to({x:429.8,y:329.65},0).wait(1).to({x:433.45,y:330.9},0).wait(1).to({x:437.15,y:332.1},0).wait(1).to({x:440.85,y:333.3},0).wait(1).to({x:444.65,y:334.5},0).wait(1).to({x:448.45,y:335.65},0).wait(1).to({x:452.3,y:336.8},0).wait(1).to({x:456.2,y:337.95},0).wait(1).to({x:460.2,y:339.05},0).wait(1).to({x:464.15,y:340.15},0).wait(1).to({x:468.2,y:341.25},0).wait(1).to({x:472.3,y:342.3},0).wait(1).to({x:476.4,y:343.35},0).wait(1).to({x:480.6,y:344.35},0).wait(1).to({x:484.8,y:345.35},0).wait(1).to({x:489.05,y:346.35},0).wait(1).to({x:493.35,y:347.3},0).wait(1).to({x:497.7,y:348.25},0).wait(1).to({x:502.1,y:349.2},0).wait(1).to({x:506.5,y:350.1},0).wait(1).to({x:511,y:351},0).wait(1).to({x:515.5,y:351.9},0).wait(1).to({x:520.1,y:352.75},0).wait(1).to({x:524.7,y:353.6},0).wait(1).to({x:529.35,y:354.45},0).wait(1).to({x:534.05,y:355.25},0).wait(1).to({x:538.8,y:356.05},0).wait(1).to({x:543.55,y:356.8},0).wait(1).to({x:548.4,y:357.55},0).wait(1).to({x:553.25,y:358.3},0).wait(1).to({x:558.15,y:359},0).wait(1).to({x:563.15,y:359.7},0).wait(1).to({x:568.15,y:360.4},0).wait(1).to({x:573.2,y:361.05},0).wait(1).to({x:578.25,y:361.7},0).wait(1).to({x:583.4,y:362.35},0).wait(1).to({x:588.6,y:362.95},0).wait(1).to({x:593.8,y:363.55},0).wait(1).to({x:599.05,y:364.1},0).wait(1).to({x:604.35,y:364.7},0).wait(1).to({x:609.7,y:365.2},0).wait(1).to({x:615.1,y:365.75},0).wait(1).to({x:620.55,y:366.25},0).wait(1).to({x:626.05,y:366.75},0).wait(1).to({x:631.55,y:367.2},0).wait(1).to({x:637.15,y:367.65},0).wait(1).to({x:642.75,y:368.1},0).wait(1).to({x:648.4,y:368.5},0).wait(1).to({x:654.1,y:368.9},0).wait(1).to({x:659.85,y:369.25},0).wait(1).to({x:665.65,y:369.6},0).wait(1).to({x:671.5,y:369.95},0).wait(1).to({x:677.4,y:370.3},0).wait(1).to({x:683.3,y:370.6},0).wait(1).to({x:689.25,y:370.9},0).wait(1).to({x:695.3,y:371.15},0).wait(1).to({x:701.35,y:371.4},0).wait(1).to({x:707.45,y:371.65},0).wait(1).to({x:713.55,y:371.85},0).wait(1).to({x:719.75,y:372.05},0).wait(1).to({x:726,y:372.25},0).wait(1).to({x:732.25,y:372.4},0).wait(1).to({x:738.6,y:372.55},0).wait(1).to({x:744.95,y:372.65},0).wait(1).to({x:751.35,y:372.75},0).wait(1).to({x:757.8,y:372.85},0).wait(1).to({x:764.3,y:372.95},0).wait(1).to({x:770.85,y:373},0).wait(1).to({x:777.4},0).wait(1).to({x:784.05,y:373.05},0).wait(1).to({x:790.7},0).wait(1).to({x:797.45,y:373},0).wait(1).to({x:804.2},0).wait(1).to({x:811,y:372.95},0).wait(1).to({x:817.85,y:372.85},0).wait(1).to({x:824.75,y:372.75},0).wait(1).to({x:831.65,y:372.65},0).wait(1).to({x:838.65,y:372.55},0).wait(1).to({x:845.65,y:372.4},0).wait(1).to({x:852.75,y:372.25},0).wait(1).to({x:859.85,y:372.05},0).wait(1).to({x:867,y:371.85},0).wait(1).to({x:874.2,y:371.65},0).wait(1).to({x:881.45,y:371.4},0).wait(1).to({x:888.75,y:371.15},0).wait(1).to({x:896.05,y:370.9},0).wait(1).to({x:903.45,y:370.6},0).wait(1).to({x:910.85,y:370.3},0).wait(1).to({x:918.35,y:369.95},0).wait(1).to({x:925.85,y:369.6},0).wait(1).to({x:933.4,y:369.25},0).wait(1).to({x:941,y:368.9},0).wait(1).to({x:948.65,y:368.5},0).wait(1).to({x:956.3,y:368.05},0).to({_off:true},1).wait(7));

	// mecca
	this.instance_4 = new lib.CachedBmp_660();
	this.instance_4.setTransform(1037.4,369.1,0.5,0.5);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(154).to({_off:false},0).wait(151));

	// people
	this.instance_5 = new lib.CharacterCivilian_09();
	this.instance_5.setTransform(198.8,218.55,0.4271,0.4271,0,0,0,-4.2,40.1);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(154).to({_off:false},0).wait(151));

	// Layer_1
	this.instance_6 = new lib.ripple();
	this.instance_6.setTransform(199.35,218.5,0.2743,0.2743);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(144).to({_off:false},0).to({_off:true},9).wait(152));

	// interaction
	this.CharacterCivilian_08_sweat_action_button = new lib.CharacterCivilian_08_sweat_button();
	this.CharacterCivilian_08_sweat_action_button.name = "CharacterCivilian_08_sweat_action_button";
	this.CharacterCivilian_08_sweat_action_button.setTransform(197.55,222.95,0.4269,0.4268,0,0,0,0,0.1);
	this.CharacterCivilian_08_sweat_action_button._off = true;
	new cjs.ButtonHelper(this.CharacterCivilian_08_sweat_action_button, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.CharacterCivilian_08_sweat_action_button).wait(144).to({_off:false},0).wait(10).to({_off:true},1).wait(150));

	// mecca
	this.instance_7 = new lib.CachedBmp_661();
	this.instance_7.setTransform(1037.4,369.1,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_662();
	this.instance_8.setTransform(1037.4,369.1,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_7}]}).to({state:[{t:this.instance_8}]},154).to({state:[]},1).wait(150));

	// people
	this.instance_9 = new lib.CharacterCivilian_09();
	this.instance_9.setTransform(198.8,218.55,0.4271,0.4271,0,0,0,-4.2,40.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(154).to({_off:true},1).wait(150));

	// Background
	this.instance_10 = new lib.Chap2Scene11();
	this.instance_10.setTransform(0,0,0.6667,0.6667);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(305));

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
		{src:"images/LessonChapter1_06_atlas_1.png?1655324213253", id:"LessonChapter1_06_atlas_1"},
		{src:"images/LessonChapter1_06_atlas_2.png?1655324213253", id:"LessonChapter1_06_atlas_2"},
		{src:"sounds/beforewar2edit_06wav.mp3?1655324213404", id:"beforewar2edit_06wav"},
		{src:"sounds/horsesound.mp3?1655324213404", id:"horsesound"},
		{src:"sounds/popsound.mp3?1655324213404", id:"popsound"}
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