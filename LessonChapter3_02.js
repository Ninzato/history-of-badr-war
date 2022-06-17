(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"LessonChapter3_02_atlas_1", frames: [[1282,0,626,626],[0,990,626,626],[628,990,626,626],[1256,990,626,626],[0,722,1914,266],[0,0,1280,720]]},
		{name:"LessonChapter3_02_atlas_2", frames: [[0,0,626,626],[0,628,626,626],[0,1256,626,626],[628,0,626,561],[1256,0,626,561],[628,563,626,561],[1256,563,626,561],[628,1126,626,561],[1256,1126,626,561]]},
		{name:"LessonChapter3_02_atlas_3", frames: [[0,0,626,561],[628,0,626,496],[1256,0,626,496],[628,498,626,496],[0,563,626,496],[1256,498,626,496],[0,1061,626,496],[628,996,626,496],[0,1559,626,431],[628,1494,626,431],[1256,996,626,431],[1256,1429,626,431]]},
		{name:"LessonChapter3_02_atlas_4", frames: [[0,0,626,431],[628,0,626,431],[1256,0,626,431],[0,433,626,366],[628,433,626,366],[1256,433,626,366],[0,801,626,366],[0,1169,626,366],[0,1537,626,366],[628,801,626,366],[1256,801,626,301],[1256,1104,626,301],[628,1169,626,301],[1256,1407,626,301],[628,1472,626,301],[1256,1710,626,301]]},
		{name:"LessonChapter3_02_atlas_5", frames: [[1872,1130,163,120],[0,1818,163,120],[1884,524,134,50],[1884,132,132,102],[1884,0,134,130],[1884,576,122,50],[405,1672,175,145],[0,1672,202,144],[1884,628,115,48],[582,1778,175,145],[204,1672,199,144],[1244,1130,626,106],[1244,1238,626,106],[0,1240,626,106],[628,1346,626,106],[1256,1346,626,106],[0,1348,626,106],[628,1454,626,106],[759,1778,626,40],[628,1240,528,40],[759,1820,431,40],[165,1819,333,40],[165,1861,236,40],[0,1130,620,108],[622,1130,620,108],[0,0,626,301],[628,0,626,236],[1256,0,626,236],[628,238,626,236],[1256,238,626,236],[0,303,626,236],[628,476,626,236],[1256,476,626,236],[0,541,626,171],[0,784,626,171],[628,784,626,171],[1256,784,626,171],[0,957,626,171],[628,957,626,171],[1256,957,626,171],[1256,1454,626,106],[0,1456,626,106],[628,1562,626,106],[1256,1562,626,106],[0,1564,626,106],[628,1670,626,106],[1256,1670,626,106],[1387,1778,626,40],[628,1282,528,40],[1192,1820,431,40],[1625,1820,333,40],[759,1862,236,40],[0,714,1829,68],[1884,435,91,87],[1884,345,91,88],[1884,236,110,107]]}
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



(lib.CachedBmp_2573 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2572 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2571 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2570 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2569 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2568 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2567 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2566 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2565 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2564 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2563 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2562 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2561 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2560 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2559 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2558 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2557 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2556 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2555 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2554 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2553 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2552 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2551 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2550 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2549 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2548 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2547 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2546 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2545 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2544 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2543 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2542 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2541 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2540 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_2"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2539 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_2"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2538 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_2"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2537 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_2"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2536 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_2"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2535 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2534 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_3"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2533 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_3"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2532 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_3"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2531 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_3"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2530 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_3"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2529 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_3"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2528 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_3"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2527 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_3"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2526 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_3"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2525 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_3"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2524 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_3"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2523 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_4"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2522 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_4"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2521 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_4"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2520 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_4"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2519 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_4"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2518 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_4"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2517 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_4"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2516 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_4"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2515 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_4"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2514 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_4"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2513 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_4"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2512 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_4"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2511 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_4"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2510 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_4"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2509 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_4"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2508 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_4"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2507 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2506 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2505 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2504 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2503 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2502 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2501 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2500 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(32);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2499 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(33);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2498 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(34);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2497 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(35);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2496 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(36);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2495 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(37);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2494 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(38);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2493 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(39);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2492 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(40);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2491 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(41);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2490 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(42);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2489 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(43);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2488 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(44);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2487 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(45);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2486 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(46);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2485 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(47);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2484 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(48);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2483 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(49);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2482 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(50);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2481 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(51);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2480 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(52);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2479 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CompoundPath = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(53);
}).prototype = p = new cjs.Sprite();



(lib.Group_1 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(54);
}).prototype = p = new cjs.Sprite();



(lib.Path = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(55);
}).prototype = p = new cjs.Sprite();



(lib.Chap3GeneralScene = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(5);
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
	this.instance = new lib.CachedBmp_2572();
	this.instance.setTransform(-40.65,-35.5,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2573();
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
	this.instance = new lib.CachedBmp_2569();
	this.instance.setTransform(-33.05,-28.05,0.4875,0.4875);

	this.instance_1 = new lib.CachedBmp_2571();
	this.instance_1.setTransform(-33,10.75,0.4875,0.4875);

	this.instance_2 = new lib.CachedBmp_2570();
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
	this.instance = new lib.CachedBmp_2566();
	this.instance.setTransform(-43.65,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2568();
	this.instance_1.setTransform(-3.8,-12.5,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_2567();
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
	this.instance = new lib.CachedBmp_2563();
	this.instance.setTransform(-55.95,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2565();
	this.instance_1.setTransform(-55.95,-12,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_2564();
	this.instance_2.setTransform(-42.15,-36.05,0.5,0.5);

	this.instance_3 = new lib.Group_1();
	this.instance_3.setTransform(216.45,-207.05,4.7384,4.7384,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-214.7,-207,431.2,417);


// stage content:
(lib.LessonChapter3_02 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,135];
	this.streamSoundSymbolsList[0] = [{id:"AfterWar202wav",startFrame:0,endFrame:136,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("AfterWar202wav",0);
		this.InsertIntoSoundStreamData(soundInstance,0,136,1);
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
			document.location.replace("https://ninzato.github.io/history-of-badr-war/LessonChapter3_03.html");
			}, 500);
			
		}
		
		this.prevBtn.addEventListener("click", fl_ClickToGoToWebPage_2);
		
		function fl_ClickToGoToWebPage_2() {
			createjs.Sound.play("popsound");
			
			setTimeout(function(){
			document.location.replace("https://ninzato.github.io/history-of-badr-war/LessonChapter3_01.html");
			}, 500);
			
		}
		
		this.replaybtn.addEventListener("click", fl_ClickToGoToAndPlayFromFrame.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame()
		{
			this.gotoAndPlay(1);
		}
	}
	this.frame_135 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(135).call(this.frame_135).wait(1));

	// Subtitle
	this.instance = new lib.CachedBmp_2480();
	this.instance.setTransform(182.8,614.4,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2479();
	this.instance_1.setTransform(165.6,564.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(136));

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.homeBtn},{t:this.prevBtn},{t:this.nextBtn},{t:this.replaybtn}]}).wait(136));

	// Quraisy
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3D0C01").s().p("AiqCrQhGhHAAhkQAAhjBGhHQBHhGBjAAQBkAABHBGQBGBHAABjQAABkhGBHQhHBGhkAAQhjAAhHhGg");
	this.shape.setTransform(688.7532,213.1146,0.4192,0.4192);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#00563E").s().p("AiqCrQhGhHAAhkQAAhjBGhHQBHhGBjAAQBkAABHBGQBGBHAABjQAABkhGBHQhHBGhkAAQhjAAhHhGg");
	this.shape_1.setTransform(737.5433,213.1146,0.4192,0.4192);

	this.instance_2 = new lib.CachedBmp_2481();
	this.instance_2.setTransform(678.65,203,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_2482();
	this.instance_3.setTransform(678.65,203,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_2483();
	this.instance_4.setTransform(678.65,203,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_2484();
	this.instance_5.setTransform(678.65,203,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_2485();
	this.instance_6.setTransform(678.65,203,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_2486();
	this.instance_7.setTransform(678.65,203,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_2487();
	this.instance_8.setTransform(678.65,203,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_2488();
	this.instance_9.setTransform(678.65,203,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_2489();
	this.instance_10.setTransform(678.65,203,0.5,0.5);

	this.instance_11 = new lib.CachedBmp_2490();
	this.instance_11.setTransform(678.65,203,0.5,0.5);

	this.instance_12 = new lib.CachedBmp_2491();
	this.instance_12.setTransform(678.65,203,0.5,0.5);

	this.instance_13 = new lib.CachedBmp_2492();
	this.instance_13.setTransform(678.65,203,0.5,0.5);

	this.instance_14 = new lib.CachedBmp_2493();
	this.instance_14.setTransform(678.65,203,0.5,0.5);

	this.instance_15 = new lib.CachedBmp_2494();
	this.instance_15.setTransform(678.65,203,0.5,0.5);

	this.instance_16 = new lib.CachedBmp_2495();
	this.instance_16.setTransform(678.65,203,0.5,0.5);

	this.instance_17 = new lib.CachedBmp_2496();
	this.instance_17.setTransform(678.65,203,0.5,0.5);

	this.instance_18 = new lib.CachedBmp_2497();
	this.instance_18.setTransform(678.65,203,0.5,0.5);

	this.instance_19 = new lib.CachedBmp_2498();
	this.instance_19.setTransform(678.65,203,0.5,0.5);

	this.instance_20 = new lib.CachedBmp_2499();
	this.instance_20.setTransform(678.65,203,0.5,0.5);

	this.instance_21 = new lib.CachedBmp_2500();
	this.instance_21.setTransform(678.65,203,0.5,0.5);

	this.instance_22 = new lib.CachedBmp_2501();
	this.instance_22.setTransform(678.65,203,0.5,0.5);

	this.instance_23 = new lib.CachedBmp_2502();
	this.instance_23.setTransform(678.65,203,0.5,0.5);

	this.instance_24 = new lib.CachedBmp_2503();
	this.instance_24.setTransform(678.65,203,0.5,0.5);

	this.instance_25 = new lib.CachedBmp_2504();
	this.instance_25.setTransform(678.65,203,0.5,0.5);

	this.instance_26 = new lib.CachedBmp_2505();
	this.instance_26.setTransform(678.65,203,0.5,0.5);

	this.instance_27 = new lib.CachedBmp_2506();
	this.instance_27.setTransform(678.65,203,0.5,0.5);

	this.instance_28 = new lib.CachedBmp_2507();
	this.instance_28.setTransform(678.65,203,0.5,0.5);

	this.instance_29 = new lib.CachedBmp_2508();
	this.instance_29.setTransform(678.65,203,0.5,0.5);

	this.instance_30 = new lib.CachedBmp_2509();
	this.instance_30.setTransform(678.65,203,0.5,0.5);

	this.instance_31 = new lib.CachedBmp_2510();
	this.instance_31.setTransform(678.65,203,0.5,0.5);

	this.instance_32 = new lib.CachedBmp_2511();
	this.instance_32.setTransform(678.65,203,0.5,0.5);

	this.instance_33 = new lib.CachedBmp_2512();
	this.instance_33.setTransform(678.65,203,0.5,0.5);

	this.instance_34 = new lib.CachedBmp_2513();
	this.instance_34.setTransform(678.65,203,0.5,0.5);

	this.instance_35 = new lib.CachedBmp_2514();
	this.instance_35.setTransform(678.65,203,0.5,0.5);

	this.instance_36 = new lib.CachedBmp_2515();
	this.instance_36.setTransform(678.65,203,0.5,0.5);

	this.instance_37 = new lib.CachedBmp_2516();
	this.instance_37.setTransform(678.65,203,0.5,0.5);

	this.instance_38 = new lib.CachedBmp_2517();
	this.instance_38.setTransform(678.65,203,0.5,0.5);

	this.instance_39 = new lib.CachedBmp_2518();
	this.instance_39.setTransform(678.65,203,0.5,0.5);

	this.instance_40 = new lib.CachedBmp_2519();
	this.instance_40.setTransform(678.65,203,0.5,0.5);

	this.instance_41 = new lib.CachedBmp_2520();
	this.instance_41.setTransform(678.65,203,0.5,0.5);

	this.instance_42 = new lib.CachedBmp_2521();
	this.instance_42.setTransform(678.65,203,0.5,0.5);

	this.instance_43 = new lib.CachedBmp_2522();
	this.instance_43.setTransform(678.65,203,0.5,0.5);

	this.instance_44 = new lib.CachedBmp_2523();
	this.instance_44.setTransform(678.65,203,0.5,0.5);

	this.instance_45 = new lib.CachedBmp_2524();
	this.instance_45.setTransform(678.65,203,0.5,0.5);

	this.instance_46 = new lib.CachedBmp_2525();
	this.instance_46.setTransform(678.65,203,0.5,0.5);

	this.instance_47 = new lib.CachedBmp_2526();
	this.instance_47.setTransform(678.65,203,0.5,0.5);

	this.instance_48 = new lib.CachedBmp_2527();
	this.instance_48.setTransform(678.65,203,0.5,0.5);

	this.instance_49 = new lib.CachedBmp_2528();
	this.instance_49.setTransform(678.65,203,0.5,0.5);

	this.instance_50 = new lib.CachedBmp_2529();
	this.instance_50.setTransform(678.65,203,0.5,0.5);

	this.instance_51 = new lib.CachedBmp_2530();
	this.instance_51.setTransform(678.65,203,0.5,0.5);

	this.instance_52 = new lib.CachedBmp_2531();
	this.instance_52.setTransform(678.65,203,0.5,0.5);

	this.instance_53 = new lib.CachedBmp_2532();
	this.instance_53.setTransform(678.65,203,0.5,0.5);

	this.instance_54 = new lib.CachedBmp_2533();
	this.instance_54.setTransform(678.65,203,0.5,0.5);

	this.instance_55 = new lib.CachedBmp_2534();
	this.instance_55.setTransform(678.65,203,0.5,0.5);

	this.instance_56 = new lib.CachedBmp_2535();
	this.instance_56.setTransform(678.65,203,0.5,0.5);

	this.instance_57 = new lib.CachedBmp_2536();
	this.instance_57.setTransform(678.65,203,0.5,0.5);

	this.instance_58 = new lib.CachedBmp_2537();
	this.instance_58.setTransform(678.65,203,0.5,0.5);

	this.instance_59 = new lib.CachedBmp_2538();
	this.instance_59.setTransform(678.65,203,0.5,0.5);

	this.instance_60 = new lib.CachedBmp_2539();
	this.instance_60.setTransform(678.65,203,0.5,0.5);

	this.instance_61 = new lib.CachedBmp_2540();
	this.instance_61.setTransform(678.65,203,0.5,0.5);

	this.instance_62 = new lib.CachedBmp_2541();
	this.instance_62.setTransform(678.65,203,0.5,0.5);

	this.instance_63 = new lib.CachedBmp_2542();
	this.instance_63.setTransform(678.65,203,0.5,0.5);

	this.instance_64 = new lib.CachedBmp_2543();
	this.instance_64.setTransform(678.65,203,0.5,0.5);

	this.instance_65 = new lib.CachedBmp_2544();
	this.instance_65.setTransform(678.65,203,0.5,0.5);

	this.instance_66 = new lib.CachedBmp_2545();
	this.instance_66.setTransform(678.65,203,0.5,0.5);

	this.instance_67 = new lib.CachedBmp_2546();
	this.instance_67.setTransform(678.65,203,0.5,0.5);

	this.instance_68 = new lib.CachedBmp_2547();
	this.instance_68.setTransform(678.65,203,0.5,0.5);

	this.instance_69 = new lib.CachedBmp_2548();
	this.instance_69.setTransform(678.65,203,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape}]},40).to({state:[{t:this.shape},{t:this.shape_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_12}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_14}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_19}]},1).to({state:[{t:this.instance_20}]},1).to({state:[{t:this.instance_21}]},1).to({state:[{t:this.instance_22}]},1).to({state:[{t:this.instance_23}]},1).to({state:[{t:this.instance_24}]},1).to({state:[{t:this.instance_25}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_27}]},1).to({state:[{t:this.instance_28}]},1).to({state:[{t:this.instance_29}]},1).to({state:[{t:this.instance_30}]},1).to({state:[{t:this.instance_31}]},1).to({state:[{t:this.instance_32}]},1).to({state:[{t:this.instance_33}]},1).to({state:[{t:this.instance_34}]},1).to({state:[{t:this.instance_35}]},1).to({state:[{t:this.instance_36}]},1).to({state:[{t:this.instance_37}]},1).to({state:[{t:this.instance_38}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_41}]},1).to({state:[{t:this.instance_42}]},1).to({state:[{t:this.instance_43}]},1).to({state:[{t:this.instance_44}]},1).to({state:[{t:this.instance_45}]},1).to({state:[{t:this.instance_46}]},1).to({state:[{t:this.instance_47}]},1).to({state:[{t:this.instance_48}]},1).to({state:[{t:this.instance_49}]},1).to({state:[{t:this.instance_50}]},1).to({state:[{t:this.instance_51}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_53}]},1).to({state:[{t:this.instance_54}]},1).to({state:[{t:this.instance_55}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_57}]},1).to({state:[{t:this.instance_58}]},1).to({state:[{t:this.instance_59}]},1).to({state:[{t:this.instance_60}]},1).to({state:[{t:this.instance_61}]},1).to({state:[{t:this.instance_62}]},1).to({state:[{t:this.instance_63}]},1).to({state:[{t:this.instance_64}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_66}]},1).to({state:[{t:this.instance_67}]},1).to({state:[{t:this.instance_68}]},1).to({state:[{t:this.instance_69}]},1).wait(27));

	// Layer_4
	this.instance_70 = new lib.CachedBmp_2549();
	this.instance_70.setTransform(678.65,129,0.5,0.5);
	this.instance_70._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_70).wait(29).to({_off:false},0).wait(107));

	// Layer_3
	this.instance_71 = new lib.CachedBmp_2550();
	this.instance_71.setTransform(291.55,259.1,0.5,0.5);
	this.instance_71._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_71).wait(15).to({_off:false},0).wait(121));

	// Muslims
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FBF6E0").s().p("AiqCrQhGhHAAhkQAAhjBGhHQBHhGBjAAQBkAABHBGQBGBHAABjQAABkhGBHQhHBGhkAAQhjAAhHhGg");
	this.shape_2.setTransform(298.6037,343.233,0.4191,0.4191);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#EBC49D").s().p("AiqCrQhGhHAAhkQAAhjBGhHQBHhGBjAAQBkAABHBGQBGBHAABjQAABkhGBHQhHBGhkAAQhjAAhHhGg");
	this.shape_3.setTransform(347.3711,343.233,0.4191,0.4191);

	this.instance_72 = new lib.CachedBmp_2551();
	this.instance_72.setTransform(288.6,333,0.5,0.5);

	this.instance_73 = new lib.CachedBmp_2552();
	this.instance_73.setTransform(288.6,333,0.5,0.5);

	this.instance_74 = new lib.CachedBmp_2553();
	this.instance_74.setTransform(288.6,333,0.5,0.5);

	this.instance_75 = new lib.CachedBmp_2554();
	this.instance_75.setTransform(288.6,333,0.5,0.5);

	this.instance_76 = new lib.CachedBmp_2555();
	this.instance_76.setTransform(288.6,333,0.5,0.5);

	this.instance_77 = new lib.CachedBmp_2556();
	this.instance_77.setTransform(288.6,333,0.5,0.5);

	this.instance_78 = new lib.CachedBmp_2557();
	this.instance_78.setTransform(288.6,333,0.5,0.5);

	this.instance_79 = new lib.CachedBmp_2558();
	this.instance_79.setTransform(288.6,333,0.5,0.5);

	this.instance_80 = new lib.CachedBmp_2559();
	this.instance_80.setTransform(288.6,333,0.5,0.5);

	this.instance_81 = new lib.CachedBmp_2560();
	this.instance_81.setTransform(288.6,333,0.5,0.5);

	this.instance_82 = new lib.CachedBmp_2561();
	this.instance_82.setTransform(288.6,333,0.5,0.5);

	this.instance_83 = new lib.CachedBmp_2562();
	this.instance_83.setTransform(288.6,333,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_2}]},26).to({state:[{t:this.shape_2},{t:this.shape_3}]},1).to({state:[{t:this.instance_72}]},1).to({state:[{t:this.instance_73}]},1).to({state:[{t:this.instance_74}]},1).to({state:[{t:this.instance_75}]},1).to({state:[{t:this.instance_76}]},1).to({state:[{t:this.instance_77}]},1).to({state:[{t:this.instance_78}]},1).to({state:[{t:this.instance_79}]},1).to({state:[{t:this.instance_80}]},1).to({state:[{t:this.instance_81}]},1).to({state:[{t:this.instance_82}]},1).to({state:[{t:this.instance_83}]},1).wait(97));

	// Background
	this.instance_84 = new lib.Chap3GeneralScene();

	this.timeline.addTween(cjs.Tween.get(this.instance_84).wait(136));

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
		{src:"images/LessonChapter3_02_atlas_1.png", id:"LessonChapter3_02_atlas_1"},
		{src:"images/LessonChapter3_02_atlas_2.png", id:"LessonChapter3_02_atlas_2"},
		{src:"images/LessonChapter3_02_atlas_3.png", id:"LessonChapter3_02_atlas_3"},
		{src:"images/LessonChapter3_02_atlas_4.png", id:"LessonChapter3_02_atlas_4"},
		{src:"images/LessonChapter3_02_atlas_5.png", id:"LessonChapter3_02_atlas_5"},
		{src:"sounds/AfterWar202wav.mp3", id:"AfterWar202wav"},
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