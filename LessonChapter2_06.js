(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"LessonChapter2_06_atlas_1", frames: [[0,1484,471,238],[0,1724,471,238],[473,1484,471,238],[1510,1484,330,308],[832,1724,356,308],[473,1724,357,308],[1190,1484,318,330],[0,1350,1779,132],[0,1082,1914,266],[0,0,1920,1080]]},
		{name:"LessonChapter2_06_atlas_2", frames: [[354,316,163,120],[354,438,163,120],[1177,591,134,50],[1817,459,132,102],[1177,459,134,130],[940,310,417,147],[1359,310,366,147],[1727,310,295,147],[969,0,285,308],[519,316,77,245],[940,459,77,244],[1256,0,285,308],[0,459,77,245],[1019,459,77,244],[640,294,298,267],[1543,0,285,308],[79,459,77,245],[1098,459,77,244],[1560,545,193,36],[270,560,193,36],[324,0,314,314],[640,0,327,292],[465,563,193,36],[660,563,193,36],[0,0,322,310],[1755,563,193,36],[1560,583,193,36],[158,598,122,50],[0,312,175,145],[1830,0,202,144],[282,598,115,48],[177,316,175,145],[1830,146,199,144],[1313,545,152,54],[1313,459,166,84],[399,601,152,29],[1481,459,166,84],[553,601,152,29],[1649,459,166,84],[1467,545,91,87],[1951,459,91,88],[158,463,110,107]]}
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



(lib.CachedBmp_2212 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2211 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2210 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2209 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2208 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_2"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2207 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_2"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2206 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2205 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_2"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2204 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2203 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2202 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_2"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2201 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_2"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2200 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_2"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2199 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_2"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2198 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_2"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2197 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_2"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2196 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_2"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2195 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_2"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2194 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_2"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2193 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_2"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2192 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_2"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2191 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_2"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2190 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_2"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2189 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_2"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2188 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2187 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_2"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2186 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2185 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_2"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2184 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_2"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2183 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_2"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2182 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2181 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_2"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2180 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_2"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2179 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2178 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_2"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2177 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_2"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2176 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_2"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2175 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_2"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2174 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_2"]);
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2173 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_2"]);
	this.gotoAndStop(32);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2172 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_2"]);
	this.gotoAndStop(33);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2171 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_2"]);
	this.gotoAndStop(34);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2170 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_2"]);
	this.gotoAndStop(35);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2169 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_2"]);
	this.gotoAndStop(36);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2168 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_2"]);
	this.gotoAndStop(37);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2167 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_2"]);
	this.gotoAndStop(38);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2166 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2165 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CompoundPath = function() {
	this.initialize(ss["LessonChapter2_06_atlas_2"]);
	this.gotoAndStop(39);
}).prototype = p = new cjs.Sprite();



(lib.Group_1 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_2"]);
	this.gotoAndStop(40);
}).prototype = p = new cjs.Sprite();



(lib.Path = function() {
	this.initialize(ss["LessonChapter2_06_atlas_2"]);
	this.gotoAndStop(41);
}).prototype = p = new cjs.Sprite();



(lib.Chap2Scene4 = function() {
	this.initialize(ss["LessonChapter2_06_atlas_1"]);
	this.gotoAndStop(9);
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
	this.instance = new lib.CachedBmp_2211();
	this.instance.setTransform(-40.65,-35.5,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2212();
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
	this.instance = new lib.CachedBmp_2208();
	this.instance.setTransform(-33.05,-28.05,0.4875,0.4875);

	this.instance_1 = new lib.CachedBmp_2210();
	this.instance_1.setTransform(-33,10.75,0.4875,0.4875);

	this.instance_2 = new lib.CachedBmp_2209();
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
	this.instance = new lib.CachedBmp_2201();
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
	this.instance = new lib.CachedBmp_2200();
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
	this.instance = new lib.CachedBmp_2199();
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
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#1D1D1B").ss(5).p("AoqFlQiZjRgRjFQgTjlCrivQCdiiE3hpQBsglB+AIIAeADQBVADByAtQBAAZB4A0QAtAdAeAcQAdAbAJAUIACADQAPAjgCAZQgDAagVASQBRBigBB3QgBBDgoBKQggA6g2A7QgBABgQADACwkfQAHgSghgeQgggdgzgWQg4gYgzgDQg9gDgrAcQhlBEgaBwQgFAVgHA8QgGApgJAQQgGAKgZAlQgbApgTApQgIATgHASQhIC/BBDUIABAFQACAHADAGIgGgSACwkfQAlgLAhgGQBzgiCDgVQA8gJAlgNQAngMATgRAAzgRQAXhdAfhBQAag0Arg3IACgFIAAAAAAzgRQAOAcAdAWQBIA5CqABQBrABB7gUIAFgBIABAAIALgCQgGAOgJAOIgGAIIgHAXQgIAegGAiQgVBvADB0QAECGhSBNQg8A5hYANQgOAChtATQhWAPg7AGQAXgSAUgVIAPgRQB/AaAIgLQAEgGgQgSQgZgbgSgTQhMhRglhOQg6h4APiEQARiNAXhggAmDISQhXgpguhAQgWghgMgjIAHgOQABgDABgBQAUgrAkg/QA8hnA2hHAAdLmQhuAOhMgHQhegIgxgnQgagjgZg0QgUgogQgtAmHIFIAEAN");
	this.shape.setTransform(3.5811,1.449);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#BAA087").s().p("AidLtQhegIgxgnQgagjgZg0QgUgogQgtIgEgNIAEANQhXgpguhAQgWghgMgjIAHgOIACgEQAUgrAkg/QA8hnA2hHIgPAlQgmBlAABqQAABgAfBkQgfhkAAhgQAAhqAmhlIAPglQATgpAbgpIAfgvQAJgQAGgpQAHg8AFgVQAahwBlhEIACgBQAmgYA0AAIAAAAIAAAAIAGAAIAAAAIAGAAQAzADA4AYQAzAWAgAdQAbAZAAARIgBAGIABgGQAAgRgbgZQgggdgzgWQg4gYgzgDIgGAAIAAAAIgGAAIAAAAIAAAAQg0AAgmAYIgCABQhlBEgaBwQgFAVgHA8QgGApgJAQIgfAvQgbApgTApQg2BHg8BnQgkA/gUArIgCAEIgHAOQiZjRgRjFQgTjlCrivQCdiiE3hpQBsglB+AIIAeADQBVADByAtQBAAZB4A0QAtAdAeAcQAdAbAJAUIACADQAPAjgCAZQgDAagVASQBRBigBB3QgBBDgoBKQggA6g2A7IgRAEIgLACIgBAAIgFABIgHABQhxAShkAAIAAAAIAAAAIgKAAQiqgBhIg5QgdgWgOgcQAXhdAfhBQAag0Arg3IACgFIAAAAIAAAAIgCAFQgrA3gaA0QgfBBgXBdQAOAcAdAWQBIA5CqABIAKAAIAAAAIAAAAQBkAABxgSIAHgBIAFgBIABAAIALgCQgGAOgJAOIgGAIIgHAXQgIAegGAiQgVBvADB0QAECGhSBNQg8A5hYANIh7AVQhWAPg7AGQAXgSAUgVIAPgRIBAAMIAGABIALACIABAAIAEABIADAAIAAAAIABAAIACAAIABAAIACABIAAAAIAEAAIACAAIABAAIACABIABAAIADAAIABAAIACAAIACAAIADABIAEAAIAAAAQAMAAACgDIABgBIAAgDQAAgGgMgPIgrguQhMhRglhOQguheAAhlQAAgcADgdQARiNAXhgQgXBggRCNQgDAdAAAcQAABlAuBeQAlBOBMBRIArAuQAMAPAAAGIAAADIgBABQgCADgMAAIAAAAIgEAAIgDgBIgCAAIgCAAIgBAAIgDAAIgBAAIgCgBIgBAAIgCAAIgEAAIAAAAIgCgBIgBAAIgCAAIgBAAIAAAAIgDAAIgEgBIgBAAIgLgCIgGgBIhAgMIgPARQgUAVgXASQhIAJg6AAQgeAAgagCgAmMH4QACAHADAGIgGgSgAJNl9QglANg8AJQiDAVhzAiQghAGglALQAlgLAhgGQBzgiCDgVQA8gJAlgNQAngMATgRQgTARgnAMgAAzgRIAAAAg");
	this.shape_1.setTransform(3.5811,1.4151);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-73.4,-81.1,159.5,165.7);


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
	this.instance = new lib.CachedBmp_2198();
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
	this.instance = new lib.CachedBmp_2197();
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
	this.instance = new lib.CachedBmp_2196();
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
	this.instance = new lib.CachedBmp_2195();
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
	this.instance_1 = new lib.CachedBmp_2194();
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
	this.instance_1 = new lib.CachedBmp_2193();
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
	this.instance_1 = new lib.CachedBmp_2192();
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
	this.instance = new lib.CachedBmp_2191();
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
	this.instance = new lib.CachedBmp_2190();
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
	this.instance = new lib.CachedBmp_2189();
	this.instance.setTransform(-71.35,-78.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-71.3,-78.6,157,157);


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
	this.shape_4.graphics.f("#5C4734").s().p("AhlI5QgkgkgDg+QgdnjgImKQgCg/AigyIACgDQAagmAngVQAmgUApAAQAqAAAlAUQAoAUAaAnQARAaAIAfQAIAegBAgQgNDogTDgQgTDsgXC2QgHA+gmAlQgjAggtAAQgvAAghghg");
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
	this.shape_3.graphics.f("#5C4734").s().p("AhlI5QgkgkgDg+QgdnjgImKQgCg/AigyIACgDQAagmAngVQAmgUApAAQAqAAAlAUQAoAUAaAnQARAaAIAfQAIAegBAgQgNDogTDgQgTDsgXC2QgHA+gmAlQgjAggtAAQgvAAghghg");
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
	this.instance_2 = new lib.CachedBmp_2188();
	this.instance_2.setTransform(-86,-83.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-86,-83.6,165,154);


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
	this.shape_2.graphics.f("#453526").s().p("AgyByQjCgPiugVQgfgEgSgWQgRgVgBgbQgBgbAPgUQARgXAfgEQC6gYCegPQC/gSBkAAQCMAAA/AbQBHAfAABLQAABMhDAZQg3AViYAAQhUAAiygOg");
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
	this.shape_2.graphics.f("#453526").s().p("AmeBlQhHgfAAhLQAAhMBDgZQA3gVCYAAQBUAACxAOQDDAPCuAVQAfAEASAXQARAUABAbQABAbgPAUQgRAXgfAEQi9AYicAPQi/AShjAAQiMAAg/gbg");
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
	this.shape.graphics.f("#5C4734").s().p("AhCF9QgVAAgXgRQgZgTgUgdQgvhJANhYQAWiOAah0QAhiTAdg0QAQgeAhgWQAjgXAlgCQBdgGAiB3QAFARAACZQABCfALA9QAUBognBRQgPAhgWAUQgVATgUAAg");
	this.shape.setTransform(-0.174,-22.7143);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2D2318").s().p("AAPFzQgTgBgJgLQgLgNAAgdQAAijgjjPQgsjggRhdIDCAAIgHKQQA9AdgHAdQgDAMgOAHQgOAIgTAAg");
	this.shape_1.setTransform(1.186,23.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

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
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#453526").s().p("AiNEyQjDgQicgiQASiygHjWQgEhrgHhIQDyAHD0ALQHnAVAJAUQADAGAAAYQAAA+gRCwQgNB8gOB4QiPA8jwAAQhfAAhwgKg");
	this.shape_3.setTransform(0.4,19.425);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

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
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#453526").s().p("AAYBKQkfgCiagNQgfgDgSgRQgQgQAAgVQAAgUAQgQQASgRAegDQDYgUIzAAQA7AAAWAJQApAPAAAyQAAAzgpAPQgWAIg7AAIjSABIh/gBg");
	this.shape_1.setTransform(-0.0258,-0.03);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.3,-7.5,96.6,15);


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
	this.shape_1.graphics.f("#453526").s().p("Am5BCQgpgPAAgzQAAgyApgPQAWgIA7AAQC5gBCXAAQEgACCbAPQAeACASARQAQAQAAAVQAAAUgQAPQgSASgeADQjYAUozAAQg6AAgXgJg");
	this.shape_1.setTransform(0.05,0.0188);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.2,-7.4,96.6,14.9);


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
	this.instance_1 = new lib.CachedBmp_2187();
	this.instance_1.setTransform(-78.4,-67.4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-78.4,-67.4,163.5,146);


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


(lib.ch1_uLeg_rcopy2_3 = function(mode,startPosition,loop,reversed) {
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
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#4F1006").s().p("AhlI5QgkgkgDg+QgdnjgImKQgCg/AigyIACgDQAagmAngVQAmgUApAAQAqAAAlAUQAoAUAaAnQARAaAIAfQAIAegBAgQgNDogTDgQgTDsgXC2QgHA+gmAlQgjAggtAAQgvAAghghg");
	this.shape_6.setTransform(1.4087,4.525);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#D3C2B2").s().p("Ag5IcQgUgUgCghQgGhWgPl2QgOlRgEiPQgBggAXgbIABgCQAjgqA9AAQA9AAAjAqQAYAcgCAjIgjHjIghHHQgDAigUATQgSARgYAAQgZAAgSgRg");
	this.shape_7.setTransform(0,-44.2,1,1,0,0,0,0,-44.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-55.7,35.599999999999994,120.5);


(lib.ch1_uLeg_lcopy2_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape_4.graphics.f("#4F1006").s().p("AhlI5QgkgkgDg+QgdnjgImKQgCg/AigyIACgDQAagmAngVQAmgUApAAQAqAAAlAUQAoAUAaAnQARAaAIAfQAIAegBAgQgNDogTDgQgTDsgXC2QgHA+gmAlQgjAggtAAQgvAAghghg");
	this.shape_4.setTransform(-2.1913,53.125);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20,-7.1,35.6,120.5);


(lib.ch1_uBodycopy2_3 = function(mode,startPosition,loop,reversed) {
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
	this.instance_3 = new lib.CachedBmp_2186();
	this.instance_3.setTransform(-86,-83.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-86,-83.6,178,154);


(lib.ch1_uArm_rcopy2_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape_3.graphics.f("#3D0C01").s().p("AgyByQjCgPiugVQgfgEgSgWQgRgVgBgbQgBgbAPgUQARgXAfgEQC6gYCegPQC/gSBkAAQCMAAA/AbQBHAfAABLQAABMhDAZQg3AViYAAQhUAAiygOg");
	this.shape_3.setTransform(33,0,1,1,0,0,0,33,0);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.6,-12.8,97.2,25.6);


(lib.ch1_uArm_lcopy2_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape_3.graphics.f("#3D0C01").s().p("AmeBlQhHgfAAhLQAAhMBDgZQA3gVCYAAQBUAACxAOQDDAPCuAVQAfAEASAXQARAUABAbQABAbgPAUQgRAXgfAEQi9AYicAPQi/AShjAAQiMAAg/gbg");
	this.shape_3.setTransform(-33.4,0,1,1,0,0,0,-33.4,0);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.6,-12.8,97.2,25.6);


(lib.ch1_thumb_rcopy2_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape_3.graphics.f("#7C6253").s().p("Ai1DWQgYgSAXgnQAKgSA1hAQAyg6ARgkQAcg3gTgqQgTgtAigiQAdggA2gHQA4gIAnAZQAtAcgBA8QAAA/gnBNQgmBMg6A7Qg8A/g9AUQgaAIgXAAQgmAAgggXg");
	this.shape_3.setTransform(5.35,-8.55,0.5738,0.5738,0,0,0,9.3,-14.9);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-11.2,-13.6,22.4,27.2);


(lib.ch1_thumb_lcopy2_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape_3.graphics.f("#7C6253").s().p("AiVDaQgtgcABg8QABg/AnhNQAlhLA6g8QA9g/A8gUQBEgWAzAlQAYASgWAnQgLATg1A/QgxA7gSAkQgbA3ASAqQAUAsgiAjQgeAfg2AHQgOACgMAAQgoAAgdgTg");
	this.shape_3.setTransform(-5.45,8.55,0.5738,0.5738,0,0,0,-9.5,14.9);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-11.1,-13.6,22.299999999999997,27.2);


(lib.ch1_neckcopy2_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape_3.graphics.f("#19D1AE").s().p("AhWD/QgjgkAAgzIAAlPQAAgzAjgkQAkgjAyAAQAzAAAjAjQAkAkAAAzIAAFPQAAAzgkAkQgjAjgzAAQgyAAgkgjg");
	this.shape_3.setTransform(-0.05,10.05,0.5738,0.5738,0,0,0,-0.1,17.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7,-16.6,14,33.3);


(lib.ch1_lLeg_rcopy2_3 = function(mode,startPosition,loop,reversed) {
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


(lib.ch1_lLeg_lcopy2_3 = function(mode,startPosition,loop,reversed) {
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


(lib.ch1_lBodycopy2_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape_4.graphics.f("#3D0C01").s().p("AiNEyQjDgQicgiQASiygHjWQgEhrgHhIQDyAHD0ALQHnAVAJAUQADAGAAAYQAAA+gRCwQgNB8gOB4QiPA8jwAAQhfAAhwgKg");
	this.shape_4.setTransform(0.4,19.425);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.9,-12.1,98.6,63.1);


(lib.ch1_lArm_rcopy2_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance_1 = new lib.CachedBmp_2185();
	this.instance_1.setTransform(-48.3,-8.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.3,-8.9,96.5,18);


(lib.ch1_lArm_lcopy2_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance_1 = new lib.CachedBmp_2184();
	this.instance_1.setTransform(-48.25,-8.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.2,-8.9,96.5,18);


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
	this.instance_2 = new lib.CachedBmp_2183();
	this.instance_2.setTransform(-73.85,-69.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-73.8,-69.6,161,155);


(lib.ch1_hand_rcopy2_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape_3.graphics.f("#7C6253").s().p("AlRC5QgZgUAAg+QgBg6AUhDQAVhGAiguQAmgzAqgCIB5gGQBZgDBDAEQDFAMA4BNQBwCYi/AkQg5ALhsAEQhsAEgWAEQgjAHguAWQgbANgyAcQgyAZgiAAQgaAAgRgOg");
	this.shape_3.setTransform(14.8,-0.3,0.5738,0.5738,0,0,0,25.8,-0.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20.8,-11.4,41.7,22.9);


(lib.ch1_hand_lcopy2_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape_3.graphics.f("#7C6253").s().p("AhDDGQjGgMg4hNQhviYC+glQA5gLBsgDQBsgEAWgEQAjgHAvgXQAagNAygbQBXgsAoAgQAZAVAAA9QABA6gUBDQgVBHghAuQgmAzgrACQitAFhFAAIgiAAg");
	this.shape_3.setTransform(-15.05,0.3,0.5738,0.5738,0,0,0,-26.2,0.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

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
	this.shape_2.graphics.f("#00563E").s().p("AhlI5QgkgkgDg+QgdnjgImKQgCg/AigyIACgDQAagmAngVQAmgUApAAQAqAAAlAUQAoAUAaAnQARAaAIAfQAIAegBAgQgNDogTDgQgTDsgXC2QgHA+gmAlQgjAggtAAQgvAAghghg");
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
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#00563E").s().p("AhlI5QgkgkgDg+QgdnjgImKQgCg/AigyIACgDQAagmAngVQAmgUApAAQAqAAAlAUQAoAUAaAnQARAaAIAfQAIAegBAgQgNDogTDgQgTDsgXC2QgHA+gmAlQgjAggtAAQgvAAghghg");
	this.shape_2.setTransform(-2.1913,53.125);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

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
	this.instance_1 = new lib.CachedBmp_2182();
	this.instance_1.setTransform(-86,-83.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-86,-83.6,178.5,154);


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
	this.shape_1.graphics.f("#013221").s().p("AgyByQjCgPiugVQgfgEgSgWQgRgVgBgbQgBgbAPgUQARgXAfgEQC6gYCegPQC/gSBkAAQCMAAA/AbQBHAfAABLQAABMhDAZQg3AViYAAQhUAAiygOg");
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
	this.shape_1.graphics.f("#013221").s().p("AmeBlQhHgfAAhLQAAhMBDgZQA3gVCYAAQBUAACxAOQDDAPCuAVQAfAEASAXQARAUABAbQABAbgPAUQgRAXgfAEQi9AYicAPQi/AShjAAQiMAAg/gbg");
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
	this.shape.graphics.f("#00563E").s().p("AhCF9QgVAAgXgRQgZgTgUgdQgvhJANhYQAWiOAah0QAhiTAdg0QAQgeAhgWQAjgXAlgCQBdgGAiB3QAFARAACZQABCfALA9QAUBognBRQgPAhgWAUQgVATgUAAg");
	this.shape.setTransform(-0.174,-22.7143);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#1B1810").s().p("AAPFzQgTgBgJgLQgLgNAAgdQAAijgjjPQgsjggRhdIDCAAIgHKQQA9AdgHAdQgDAMgOAHQgOAIgTAAg");
	this.shape_1.setTransform(1.186,23.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

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
	this.shape_1.graphics.f("#013221").s().p("AiNEyQjDgQicgiQASiygHjWQgEhrgHhIQDyAHD0ALQHnAVAJAUQADAGAAAYQAAA+gRCwQgNB8gOB4QiPA8jwAAQhfAAhwgKg");
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
	this.instance = new lib.CachedBmp_2181();
	this.instance.setTransform(-48.3,-8.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.3,-8.9,96.5,18);


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
	this.instance = new lib.CachedBmp_2180();
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
	this.instance_1 = new lib.CachedBmp_2179();
	this.instance_1.setTransform(-76.25,-80.25,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-76.2,-80.2,159,165);


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
	this.instance = new lib.CachedBmp_2176();
	this.instance.setTransform(-43.65,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2178();
	this.instance_1.setTransform(-3.8,-12.5,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_2177();
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
	this.instance = new lib.CachedBmp_2173();
	this.instance.setTransform(-55.95,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2175();
	this.instance_1.setTransform(-55.95,-12,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_2174();
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

	// Character
	this.instance = new lib.CachedBmp_2207();
	this.instance.setTransform(-105.15,-346.15,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2206();
	this.instance_1.setTransform(-118.55,-369,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(42));

	// Armature_1
	this.instance_2 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_2.setTransform(-55.75,-21.7,0.9982,0.9982,-98.6228,0,0,37.9,-0.1);

	this.instance_3 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_3.setTransform(-51.65,147.3,0.9981,0.9981,0,99.7345,-80.2655,6.3,-1.4);

	this.instance_4 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_4.setTransform(-51.75,138.35,0.9983,0.9983,0,99.6328,-80.3672,5.3,-8.3);

	this.instance_5 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_5.setTransform(-43.2,57.5,0.9983,0.9983,-83.3464,0,0,40.5,0.1);

	this.instance_6 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_6.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_7 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_7.setTransform(-42.3,187.95,0.9981,0.9981,0,6.6609,-173.3391,2.9,-53.5);

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

	this.instance_16 = new lib.ch1_headcopy2("synched",0);
	this.instance_16.setTransform(0.25,-76.8,0.9989,0.9989,0,0.5873,-179.4127,0.4,52.9);

	this.instance_17 = new lib.ch1_neckcopy2("synched",0);
	this.instance_17.setTransform(-5.8,-58,0.999,0.999,-0.1006,0,0,-1.4,8.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_17,p:{regX:-1.4,scaleX:0.999,scaleY:0.999,rotation:-0.1006,x:-5.8,y:-58}},{t:this.instance_16,p:{regX:0.4,skewX:0.5873,skewY:-179.4127,x:0.25,y:-76.8,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:134.1596,x:44.75,y:48.2}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,skewX:-79.8966,skewY:100.1034,x:-14.25,y:103.85,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.9,regY:3.2,scaleX:0.9982,scaleY:0.9982,skewX:-56.0427,skewY:123.9573,x:-12.5,y:115.1}},{t:this.instance_12,p:{regX:1.8,regY:-45.8,rotation:12.4516,y:92.25,x:-20.6,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.4,rotation:92.9576,x:47.7,y:-26.55,scaleY:0.9984,scaleX:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9979,scaleY:0.9979,rotation:-8.4151,x:8.2,y:96.05}},{t:this.instance_9,p:{regX:2.5,skewX:-2.5039,skewY:177.4961,x:24.55,y:192.2,scaleX:0.9979,scaleY:0.9979,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:2.9,scaleX:0.9981,scaleY:0.9981,skewX:6.6609,skewY:-173.3391,x:-42.3,y:187.95,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0.1,scaleX:0.9983,scaleY:0.9983,rotation:-83.3464,x:-43.2,y:57.5,regX:40.5}},{t:this.instance_4,p:{regX:5.3,skewX:99.6328,skewY:-80.3672,x:-51.75,y:138.35,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.3,scaleX:0.9981,scaleY:0.9981,skewX:99.7345,skewY:-80.2655,x:-51.65,y:147.3}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-98.6228,x:-55.75,y:-21.7,regY:-0.1}}]}).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.9989,scaleY:0.9989,rotation:-0.1076,x:-5.9,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:0.3904,skewY:-179.6096,x:0.15,y:-76.7,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:132.8325,x:45.8,y:48.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-81.2249,skewY:98.7751,x:-11.8,y:105.25,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9981,scaleY:0.9981,skewX:-57.3706,skewY:122.6294,x:-9.8,y:116.5}},{t:this.instance_12,p:{regX:1.7,regY:-45.7,rotation:11.1755,y:92.3,x:-20.6,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:92.0916,x:47.65,y:-26.5,scaleY:0.9984,scaleX:0.9984}},{t:this.instance_10,p:{regX:-2,regY:2.2,scaleX:0.9978,scaleY:0.9978,rotation:-7.0687,x:8.35,y:96.1}},{t:this.instance_9,p:{regX:2.4,skewX:-1.9945,skewY:178.0055,x:22.7,y:192.4,scaleX:0.9979,scaleY:0.9979,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:5.3849,skewY:-174.6151,x:-40.3,y:188.4,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-81.5488,x:-43.75,y:57.5,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:101.4302,skewY:-78.5698,x:-54.75,y:138.1,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:101.5329,skewY:-78.4671,x:-54.95,y:147.1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-98.2568,x:-55.7,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.1164,x:-5.9,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:0.1926,skewY:-179.8074,x:0.1,y:-76.8,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:131.5031,x:46.95,y:48.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-82.5527,skewY:97.4473,x:-9.4,y:106.6,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9981,scaleY:0.9981,skewX:-58.6993,skewY:121.3007,x:-7.05,y:117.7}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:9.9009,y:92.15,x:-20.55,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:91.2243,x:47.6,y:-26.5,scaleY:0.9984,scaleX:0.9984}},{t:this.instance_10,p:{regX:-2,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:-5.7224,x:8.7,y:95.9}},{t:this.instance_9,p:{regX:2.5,skewX:-1.4844,skewY:178.5156,x:20.65,y:192.6,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:4.1085,skewY:-175.8915,x:-38.1,y:188.9,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-79.751,x:-44.3,y:57.55,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:103.2286,skewY:-76.7714,x:-57.8,y:137.75,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:103.3307,skewY:-76.6693,x:-58.3,y:146.7}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-97.8914,x:-55.7,y:-21.65,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.1252,x:-5.9,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:0,skewY:180,x:0.05,y:-76.75,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:130.1754,x:48.15,y:48.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-83.8818,skewY:96.1182,x:-6.85,y:107.85,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-60.0275,skewY:119.9725,x:-4.3,y:119}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:8.6248,y:92.15,x:-20.55,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:90.3582,x:47.65,y:-26.5,scaleY:0.9984,scaleX:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:-4.3775,x:9.15,y:95.75}},{t:this.instance_9,p:{regX:2.4,skewX:-0.9735,skewY:179.0265,x:18.85,y:192.75,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:2.8333,skewY:-177.1667,x:-35.9,y:189.15,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-77.9533,x:-44.8,y:57.7,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:105.0268,skewY:-74.9732,x:-60.8,y:137.4,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,skewX:105.129,skewY:-74.871,x:-61.65,y:146.35}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-97.5263,x:-55.7,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.1339,x:-5.85,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-0.1952,skewY:179.8048,x:0.05,y:-76.75,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:128.8477,x:49.25,y:48.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-85.2102,skewY:94.7898,x:-4.35,y:109.1,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-61.3565,skewY:118.6435,x:-1.5,y:120.2}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:7.3487,y:92.15,x:-20.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:89.4956,x:47.7,y:-26.45,scaleY:0.9984,scaleX:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:-3.0304,x:9.55,y:95.65}},{t:this.instance_9,p:{regX:2.5,skewX:-0.4635,skewY:179.5365,x:16.8,y:192.75,scaleX:0.9978,scaleY:0.9978,regY:-53.3}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:1.5586,skewY:-178.4414,x:-33.75,y:189.5,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-76.1532,x:-45.3,y:57.75,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:106.8262,skewY:-73.1738,x:-63.85,y:136.95,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:106.9275,skewY:-73.0725,x:-64.9,y:145.85}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-97.1609,x:-55.65,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.1435,x:-5.9,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-0.3912,skewY:179.6088,x:0,y:-76.75,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:127.5193,x:50.35,y:48.15}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-86.5378,skewY:93.4622,x:-1.9,y:110.25,regY:7.9,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-62.684,skewY:117.316,x:1.3,y:121.35}},{t:this.instance_12,p:{regX:1.8,regY:-45.7,rotation:6.0735,y:92.3,x:-20.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.4,rotation:88.6285,x:47.65,y:-26.6,scaleY:0.9984,scaleX:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:-1.6843,x:9.9,y:95.45}},{t:this.instance_9,p:{regX:2.4,skewX:0.0412,skewY:-179.9588,x:15,y:192.9,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:0.2821,skewY:-179.7179,x:-31.6,y:189.85,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-74.3561,x:-45.8,y:57.75,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:108.6244,skewY:-71.3756,x:-66.85,y:136.35,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,skewX:108.7255,skewY:-71.2745,x:-68.1,y:145.25}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-96.7946,x:-55.75,y:-21.75,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.6,scaleX:0.999,scaleY:0.999,rotation:-0.1523,x:-6,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-0.5882,skewY:179.4118,x:0.05,y:-76.75,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:126.1897,x:51.5,y:48.1}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,skewX:-87.8671,skewY:92.1329,x:0.85,y:111.45,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-64.0127,skewY:115.9873,x:4.1,y:122.35}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:4.7978,y:92.2,x:-20.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.2,rotation:87.762,x:47.65,y:-26.35,scaleY:0.9984,scaleX:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:-0.3391,x:10.15,y:95.35}},{t:this.instance_9,p:{regX:2.4,skewX:0.552,skewY:-179.448,x:13,y:192.9,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-0.989,skewY:179.011,x:-29.4,y:190.05,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-72.5558,x:-46.35,y:57.85,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:110.4225,skewY:-69.5775,x:-69.75,y:135.7,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:110.5252,skewY:-69.4748,x:-71.35,y:144.6}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-96.4295,x:-55.75,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.6,scaleX:0.999,scaleY:0.999,rotation:-0.161,x:-6,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-0.786,skewY:179.214,x:0.1,y:-76.75,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:124.861,x:52.65,y:48.05}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-89.196,skewY:90.804,x:3.4,y:112.45,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-65.3417,skewY:114.6583,x:6.9,y:123.35}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:3.5228,y:92.15,x:-20.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:86.8949,x:47.6,y:-26.5,scaleY:0.9984,scaleX:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:1.0024,x:10.5,y:95.2}},{t:this.instance_9,p:{regX:2.4,skewX:1.062,skewY:-178.938,x:11.1,y:192.65,scaleX:0.9978,scaleY:0.9978,regY:-53.3}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-2.2642,skewY:177.7358,x:-27.2,y:190.15,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-70.7582,x:-46.85,y:57.9,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:112.2216,skewY:-67.7784,x:-72.75,y:135,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:112.3228,skewY:-67.6772,x:-74.55,y:143.85}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-96.0638,x:-55.7,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.1698,x:-5.85,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-0.9821,skewY:179.0179,x:0.1,y:-76.75,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:123.5331,x:53.75,y:47.95}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,skewX:-90.5202,skewY:89.4798,x:6.1,y:113.6,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-66.6702,skewY:113.3298,x:9.75,y:124.35}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:2.2469,y:92.15,x:-20.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:86.0289,x:47.65,y:-26.45,scaleY:0.9984,scaleX:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:2.348,x:10.85,y:95.1}},{t:this.instance_9,p:{regX:2.4,skewX:1.572,skewY:-178.428,x:9.2,y:192.7,scaleX:0.9979,scaleY:0.9979,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-3.5396,skewY:176.4604,x:-25,y:190.35,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-68.9606,x:-47.35,y:57.95,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:114.0188,skewY:-65.9812,x:-75.7,y:134.15,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.3,scaleX:0.998,scaleY:0.998,skewX:114.1217,skewY:-65.8783,x:-77.75,y:142.75}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-95.6984,x:-55.65,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.1785,x:-5.8,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-1.179,skewY:178.821,x:0.15,y:-76.75,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:122.2042,x:54.85,y:47.85}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-91.849,skewY:88.151,x:8.65,y:114.5,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9981,scaleY:0.9981,skewX:-67.9989,skewY:112.0011,x:12.7,y:125.3}},{t:this.instance_12,p:{regX:1.7,regY:-45.7,rotation:0.9721,y:92.3,x:-20.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:85.1612,x:47.6,y:-26.55,scaleY:0.9984,scaleX:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:3.694,x:11.15,y:95.05}},{t:this.instance_9,p:{regX:2.4,skewX:2.0813,skewY:-177.9187,x:7.2,y:192.45,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-4.8159,skewY:175.1841,x:-22.85,y:190.35,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-67.1615,x:-47.85,y:58,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:115.8177,skewY:-64.1823,x:-78.45,y:133.4,regY:-8.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:115.9198,skewY:-64.0802,x:-80.95,y:141.95}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-95.3323,x:-55.7,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.1873,x:-5.85,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-1.3743,skewY:178.6257,x:0.1,y:-76.8,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:120.8748,x:56,y:47.75}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-93.1779,skewY:86.8221,x:11.2,y:115.4,regY:7.9,regX:-6.2}},{t:this.instance_13,p:{regX:-4.9,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-69.326,skewY:110.674,x:15.7,y:126}},{t:this.instance_12,p:{regX:1.7,regY:-45.7,rotation:-0.2995,y:92.3,x:-20.45,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:84.2949,x:47.65,y:-26.5,scaleY:0.9984,scaleX:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.2,scaleX:0.9978,scaleY:0.9978,rotation:5.0412,x:11.5,y:95}},{t:this.instance_9,p:{regX:2.4,skewX:2.5917,skewY:-177.4083,x:5.25,y:192.2,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-6.0911,skewY:173.9089,x:-20.65,y:190.4,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-65.3637,x:-48.3,y:58.1,regX:40.5}},{t:this.instance_4,p:{regX:5.3,skewX:117.6159,skewY:-62.3841,x:-81.35,y:132.25,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:117.7181,skewY:-62.2819,x:-84.05,y:140.95}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-94.9683,x:-55.7,y:-21.75,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.1969,x:-5.85,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-1.5713,skewY:178.4287,x:0.1,y:-76.85,regY:52.8}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:119.5479,x:57.1,y:47.6}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-94.505,skewY:85.495,x:13.9,y:116.45,regY:7.9,regX:-6.1}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-70.6551,skewY:109.3449,x:18.6,y:126.9}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:-1.5748,y:92.2,x:-20.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:83.4272,x:47.65,y:-26.5,scaleY:0.9983,scaleX:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.2,scaleX:0.9978,scaleY:0.9978,rotation:6.3869,x:11.8,y:94.85}},{t:this.instance_9,p:{regX:2.4,skewX:3.1023,skewY:-176.8977,x:3.3,y:191.9,scaleX:0.9979,scaleY:0.9979,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-7.3666,skewY:172.6334,x:-18.35,y:190.55,regY:-53.4}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-63.5642,x:-48.85,y:58.1,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:119.4152,skewY:-60.5848,x:-84.25,y:131.35,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:119.517,skewY:-60.483,x:-87.2,y:139.8}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-94.6017,x:-55.75,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.2057,x:-5.85,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-1.7674,skewY:178.2326,x:0.15,y:-76.9,regY:52.8}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:118.2198,x:58.2,y:47.45}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-95.8347,skewY:84.1653,x:16.7,y:117.15,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.4,scaleX:0.9982,scaleY:0.9982,skewX:-71.983,skewY:108.017,x:21.75,y:127.6}},{t:this.instance_12,p:{regX:1.8,regY:-45.8,rotation:-2.8509,y:92.25,x:-20.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.4,rotation:82.5609,x:47.6,y:-26.65,scaleY:0.9984,scaleX:0.9984}},{t:this.instance_10,p:{regX:-2,regY:2.2,scaleX:0.9978,scaleY:0.9978,rotation:7.7316,x:12.1,y:94.7}},{t:this.instance_9,p:{regX:2.4,skewX:3.6113,skewY:-176.3887,x:1.35,y:191.5,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:2.9,scaleX:0.998,scaleY:0.998,skewX:-8.6423,skewY:171.3577,x:-16.05,y:190.35,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-61.7665,x:-49.35,y:58.15,regX:40.5}},{t:this.instance_4,p:{regX:5.3,skewX:121.2134,skewY:-58.7866,x:-86.95,y:130.2,regY:-8.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:121.3157,skewY:-58.6843,x:-90.25,y:138.65}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-94.2371,x:-55.7,y:-21.75,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.2144,x:-5.85,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-1.9653,skewY:178.0347,x:0.05,y:-76.8,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:116.8898,x:59.35,y:47.35}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-97.1629,skewY:82.8371,x:19.5,y:117.9,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-73.3128,skewY:106.6872,x:24.6,y:128.25}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:-4.1267,y:92.25,x:-20.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.2,rotation:81.6947,x:47.7,y:-26.35,scaleY:0.9984,scaleX:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:9.0779,x:12.5,y:94.4}},{t:this.instance_9,p:{regX:2.5,skewX:4.1224,skewY:-175.8776,x:-0.6,y:191.1,scaleX:0.9979,scaleY:0.9979,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-9.9176,skewY:170.0823,x:-14,y:190.2,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-59.9686,x:-49.85,y:58.15,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:123.0119,skewY:-56.9881,x:-89.75,y:129.05,regY:-8.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:123.1138,skewY:-56.8862,x:-93.25,y:137.3}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9982,rotation:-93.87,x:-55.7,y:-21.75,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.2232,x:-5.8,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-2.1615,skewY:177.8385,x:0.05,y:-76.75,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:115.5627,x:60.4,y:47.1}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-98.4915,skewY:81.5085,x:22.3,y:118.7,regY:8,regX:-6.1}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-74.6398,skewY:105.3602,x:27.6,y:128.85}},{t:this.instance_12,p:{regX:1.7,regY:-45.7,rotation:-5.4018,y:92.3,x:-20.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:80.8271,x:47.6,y:-26.5,scaleY:0.9983,scaleX:0.9983}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:10.4239,x:12.9,y:94.25}},{t:this.instance_9,p:{regX:2.4,skewX:4.6321,skewY:-175.3679,x:-2.4,y:190.65,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-11.1929,skewY:168.8071,x:-11.95,y:190.05,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-58.1696,x:-50.4,y:58.2,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:124.8106,skewY:-55.1894,x:-92.45,y:127.85,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:124.9122,skewY:-55.0878,x:-96.15,y:136.05}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-93.5049,x:-55.65,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.2319,x:-5.85,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-2.3586,skewY:177.6414,x:0,y:-76.75,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:114.2335,x:61.5,y:46.9}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-99.8195,skewY:80.1805,x:25.05,y:119.35,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-75.9689,skewY:104.0311,x:30.65,y:129.4}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:-6.6771,y:92.25,x:-20.35,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:79.9611,x:47.65,y:-26.5,scaleY:0.9983,scaleX:0.9983}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:11.7713,x:13.2,y:94.15}},{t:this.instance_9,p:{regX:2.4,skewX:5.1422,skewY:-174.8578,x:-4.35,y:190.2,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:2.9,scaleX:0.998,scaleY:0.998,skewX:-12.4695,skewY:167.5305,x:-9.65,y:189.8,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-56.3714,x:-50.9,y:58.25,regX:40.5}},{t:this.instance_4,p:{regX:5.3,skewX:126.6093,skewY:-53.3907,x:-95.1,y:126.4,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:126.7112,skewY:-53.2888,x:-99.15,y:134.6}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-93.1399,x:-55.7,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.2415,x:-5.85,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-2.554,skewY:177.446,x:0,y:-76.75,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:112.9058,x:62.65,y:46.7}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-101.1485,skewY:78.8515,x:27.85,y:119.9,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-77.2967,skewY:102.7033,x:33.65,y:129.85}},{t:this.instance_12,p:{regX:1.8,regY:-45.8,rotation:-7.9521,y:92.2,x:-20.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:79.0935,x:47.6,y:-26.5,scaleY:0.9983,scaleX:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:13.1154,x:13.45,y:94}},{t:this.instance_9,p:{regX:2.4,skewX:5.6525,skewY:-174.3475,x:-6.2,y:189.4,scaleX:0.9978,scaleY:0.9978,regY:-53.3}},{t:this.instance_8},{t:this.instance_7,p:{regX:2.9,scaleX:0.998,scaleY:0.998,skewX:-13.7449,skewY:166.2551,x:-7.45,y:189.6,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-54.573,x:-51.4,y:58.25,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:128.4068,skewY:-51.5932,x:-97.75,y:125.15,regY:-8.4,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_3,p:{regX:6.3,scaleX:0.998,scaleY:0.998,skewX:128.5089,skewY:-51.4911,x:-101.95,y:132.9}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-92.7742,x:-55.65,y:-21.75,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.2503,x:-5.85,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-2.7502,skewY:177.2498,x:0.05,y:-76.7,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:111.5773,x:63.75,y:46.45}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-102.4764,skewY:77.5236,x:30.65,y:120.35,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-78.625,skewY:101.375,x:36.7,y:130.3}},{t:this.instance_12,p:{regX:1.8,regY:-45.8,rotation:-9.2284,y:92.15,x:-20.35,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.4,rotation:78.2272,x:47.55,y:-26.65,scaleY:0.9983,scaleX:0.9983}},{t:this.instance_10,p:{regX:-2,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:14.4628,x:13.8,y:93.8}},{t:this.instance_9,p:{regX:2.4,skewX:6.1625,skewY:-173.8375,x:-8.15,y:188.95,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-15.0206,skewY:164.9794,x:-5.45,y:189.35,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-52.7743,x:-51.95,y:58.3,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:130.2049,skewY:-49.7951,x:-100.3,y:123.65,regY:-8.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:130.3076,skewY:-49.6924,x:-104.85,y:131.45}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-92.4076,x:-55.7,y:-21.8,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.2591,x:-5.85,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-2.9473,skewY:177.0526,x:0.05,y:-76.85,regY:52.8}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:110.2488,x:64.85,y:46.15}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-103.8054,skewY:76.1946,x:33.5,y:120.9,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-79.9539,skewY:100.0461,x:39.75,y:130.65}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:-10.5033,y:92.2,x:-20.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:77.36,x:47.55,y:-26.5,scaleY:0.9984,scaleX:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:15.8089,x:14.2,y:93.75}},{t:this.instance_9,p:{regX:2.5,skewX:6.6723,skewY:-173.3277,x:-10.15,y:188.2,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-16.2953,skewY:163.7047,x:-3.25,y:188.95,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-50.9758,x:-52.45,y:58.3,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:132.0038,skewY:-47.9962,x:-102.95,y:122.15,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.3,scaleX:0.998,scaleY:0.998,skewX:132.1055,skewY:-47.8945,x:-107.55,y:129.75}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-92.0439,x:-55.7,y:-21.75,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.2678,x:-5.8,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-3.1438,skewY:176.8562,x:0.05,y:-76.8,regY:52.8}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:108.9194,x:65.9,y:45.9}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-105.1342,skewY:74.8658,x:36.35,y:121.35,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-81.2821,skewY:98.7179,x:42.8,y:130.9}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:-11.7797,y:92.2,x:-20.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.4,rotation:76.4931,x:47.6,y:-26.65,scaleY:0.9983,scaleX:0.9983}},{t:this.instance_10,p:{regX:-1.9,regY:2.2,scaleX:0.9978,scaleY:0.9978,rotation:17.1539,x:14.5,y:93.65}},{t:this.instance_9,p:{regX:2.4,skewX:7.1832,skewY:-172.8168,x:-11.9,y:187.5,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-17.5714,skewY:162.4286,x:-1.05,y:188.5,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-49.178,x:-52.95,y:58.3,regX:40.5}},{t:this.instance_4,p:{regX:5.3,skewX:133.8022,skewY:-46.1978,x:-105.25,y:120.45,regY:-8.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_3,p:{regX:6.3,scaleX:0.998,scaleY:0.998,skewX:133.9048,skewY:-46.0952,x:-110.3,y:127.9}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-91.6785,x:-55.7,y:-21.75,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.2766,x:-5.85,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-3.341,skewY:176.659,x:0.05,y:-76.75,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:107.5904,x:67.05,y:45.6}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-106.4619,skewY:73.5381,x:39.2,y:121.75,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.2,scaleX:0.9982,scaleY:0.9982,skewX:-82.6118,skewY:97.3882,x:45.8,y:131.15}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:-13.0551,y:92.2,x:-20.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:75.6271,x:47.6,y:-26.5,scaleY:0.9984,scaleX:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.2,scaleX:0.9978,scaleY:0.9978,rotation:18.5003,x:14.75,y:93.5}},{t:this.instance_9,p:{regX:2.4,skewX:7.6923,skewY:-172.3077,x:-13.75,y:186.75,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-18.8466,skewY:161.1534,x:1.1,y:187.95,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-47.3783,x:-53.45,y:58.3,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:135.6007,skewY:-44.3993,x:-107.8,y:118.8,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:135.7037,skewY:-44.2963,x:-113,y:126.2}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-91.3122,x:-55.6,y:-21.75,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.2862,x:-5.85,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-3.5383,skewY:176.4617,x:0,y:-76.7,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:106.2636,x:68.05,y:45.35}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-107.7897,skewY:72.2103,x:41.95,y:122.05,regY:7.9,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-83.9399,skewY:96.0601,x:49,y:131.3}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:-14.3304,y:92.25,x:-20.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:74.76,x:47.6,y:-26.5,scaleY:0.9983,scaleX:0.9983}},{t:this.instance_10,p:{regX:-2,regY:2.1,scaleX:0.9977,scaleY:0.9977,rotation:19.846,x:15,y:93.2}},{t:this.instance_9,p:{regX:2.4,skewX:8.2026,skewY:-171.7974,x:-15.6,y:185.8,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-20.1237,skewY:159.8763,x:3.25,y:187.5,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-45.581,x:-53.9,y:58.35,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:137.3998,skewY:-42.6002,x:-110.25,y:117.15,regY:-8.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:137.5014,skewY:-42.4986,x:-115.65,y:124.3}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-90.9478,x:-55.65,y:-21.75,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.2713,x:-5.8,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-3.327,skewY:176.673,x:-0.05,y:-76.75,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:107.6536,x:66.95,y:45.7}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-106.386,skewY:73.614,x:38.95,y:121.7,regY:7.9,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.2,scaleX:0.9982,scaleY:0.9982,skewX:-82.5268,skewY:97.4732,x:45.65,y:131.1}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:-12.9839,y:92.15,x:-20.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.4,rotation:75.6634,x:47.55,y:-26.65,scaleY:0.9984,scaleX:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.2,scaleX:0.9978,scaleY:0.9978,rotation:18.4244,x:14.75,y:93.5}},{t:this.instance_9,p:{regX:2.4,skewX:7.6534,skewY:-172.3466,x:-13.65,y:186.75,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-18.7782,skewY:161.2218,x:0.9,y:188.05,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-47.4564,x:-53.4,y:58.3,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:135.519,skewY:-44.481,x:-107.6,y:119,regY:-8.4,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:135.6157,skewY:-44.3843,x:-112.85,y:126.25}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-91.328,x:-55.75,y:-21.75,regY:-0.2}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.2573,x:-5.85,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-3.1166,skewY:176.8834,x:-0.05,y:-76.85,regY:52.8}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:109.0443,x:65.8,y:45.95}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-104.9844,skewY:75.0156,x:36.1,y:121.25,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.9,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-81.1121,skewY:98.8879,x:42.55,y:130.8}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:-11.6366,y:92.2,x:-20.35,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:76.5663,x:47.65,y:-26.55,scaleY:0.9983,scaleX:0.9983}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:17.0015,x:14.45,y:93.55}},{t:this.instance_9,p:{regX:2.5,skewX:7.1036,skewY:-172.8963,x:-11.8,y:187.55,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-17.4315,skewY:162.5685,x:-1.35,y:188.55,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-49.3314,x:-52.9,y:58.3,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:133.6381,skewY:-46.3619,x:-105.1,y:120.65,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:133.7301,skewY:-46.2699,x:-110.1,y:128.2}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-91.7065,x:-55.8,y:-21.75,regY:-0.2}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.2424,x:-5.85,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-2.9062,skewY:177.0938,x:0,y:-76.85,regY:52.8}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:110.4336,x:64.7,y:46.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-103.5813,skewY:76.4187,x:33,y:120.95,regY:7.9,regX:-6.1}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-79.6986,skewY:100.3014,x:39.3,y:130.6}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:-10.2896,y:92.2,x:-20.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:77.4696,x:47.55,y:-26.55,scaleY:0.9984,scaleX:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:15.5793,x:14.15,y:93.7}},{t:this.instance_9,p:{regX:2.5,skewX:6.5558,skewY:-173.4442,x:-9.8,y:188.35,scaleX:0.9979,scaleY:0.9979,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-16.0868,skewY:163.9132,x:-3.6,y:189,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-51.2042,x:-52.35,y:58.3,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:131.7575,skewY:-48.2425,x:-102.55,y:122.3,regY:-8.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:131.8443,skewY:-48.1557,x:-107.25,y:129.95}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-92.086,x:-55.8,y:-21.75,regY:-0.2}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.2284,x:-5.8,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-2.6959,skewY:177.3041,x:0.05,y:-76.75,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:111.825,x:63.55,y:46.5}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-102.1778,skewY:77.8222,x:30.15,y:120.3,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.9,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-78.2861,skewY:101.7139,x:36.2,y:130.05}},{t:this.instance_12,p:{regX:1.7,regY:-45.7,rotation:-8.9421,y:92.35,x:-20.35,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:78.3732,x:47.6,y:-26.55,scaleY:0.9983,scaleX:0.9983}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:14.157,x:13.75,y:93.9}},{t:this.instance_9,p:{regX:2.5,skewX:6.0067,skewY:-173.9933,x:-7.8,y:189.05,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-14.7408,skewY:165.2592,x:-5.85,y:189.35,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-53.08,x:-51.85,y:58.3,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:129.8767,skewY:-50.1233,x:-99.9,y:123.85,regY:-8.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:129.9577,skewY:-50.0423,x:-104.4,y:131.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-92.4664,x:-55.65,y:-21.8,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.2135,x:-5.85,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-2.4865,skewY:177.5135,x:0.05,y:-76.75,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:113.215,x:62.4,y:46.7}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-100.7739,skewY:79.2261,x:27.25,y:119.7,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-76.8726,skewY:103.1274,x:32.95,y:129.75}},{t:this.instance_12,p:{regX:1.7,regY:-45.7,rotation:-7.5959,y:92.4,x:-20.45,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:79.2754,x:47.6,y:-26.55,scaleY:0.9983,scaleX:0.9983}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:12.7345,x:13.45,y:94.1}},{t:this.instance_9,p:{regX:2.4,skewX:5.4572,skewY:-174.5428,x:-5.7,y:189.6,scaleX:0.9978,scaleY:0.9978,regY:-53.3}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-13.3942,skewY:166.6058,x:-8.15,y:189.65,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-54.9562,x:-51.35,y:58.25,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:127.9953,skewY:-52.0047,x:-97.2,y:125.4,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:128.0717,skewY:-51.9283,x:-101.45,y:133.35}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-92.8478,x:-55.7,y:-21.75,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.1995,x:-5.85,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-2.2771,skewY:177.7229,x:0.1,y:-76.7,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:114.6055,x:61.25,y:46.95}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-99.3721,skewY:80.6279,x:24.35,y:119.1,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-75.4584,skewY:104.5416,x:29.8,y:129.25}},{t:this.instance_12,p:{regX:1.8,regY:-45.8,rotation:-6.2489,y:92.2,x:-20.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_11,p:{regX:-31.3,rotation:80.1779,x:47.6,y:-26.55,scaleY:0.9983,scaleX:0.9983}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:11.3127,x:13.1,y:94.2}},{t:this.instance_9,p:{regX:2.4,skewX:4.909,skewY:-175.091,x:-3.65,y:190.3,scaleX:0.9979,scaleY:0.9979,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-12.0499,skewY:167.9501,x:-10.5,y:190,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-56.8303,x:-50.75,y:58.2,regX:40.5}},{t:this.instance_4,p:{regX:5.3,skewX:126.1149,skewY:-53.8851,x:-94.45,y:126.8,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.3,scaleX:0.998,scaleY:0.998,skewX:126.1863,skewY:-53.8137,x:-98.3,y:134.8}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-93.2268,x:-55.7,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.1847,x:-5.8,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-2.066,skewY:177.934,x:0.05,y:-76.75,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:115.9955,x:60.1,y:47.15}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-97.9696,skewY:82.0304,x:21.4,y:118.35,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.2,scaleX:0.9982,scaleY:0.9982,skewX:-74.0437,skewY:105.9563,x:26.45,y:128.7}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:-4.9015,y:92.2,x:-20.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.2,rotation:81.0825,x:47.65,y:-26.35,scaleY:0.9983,scaleX:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:9.8897,x:12.75,y:94.25}},{t:this.instance_9,p:{regX:2.4,skewX:4.3596,skewY:-175.6403,x:-1.6,y:190.7,scaleX:0.9978,scaleY:0.9978,regY:-53.3}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-10.7037,skewY:169.2962,x:-12.75,y:190.15,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-58.7052,x:-50.25,y:58.2,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:124.2346,skewY:-55.7654,x:-91.7,y:128.15,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:124.3006,skewY:-55.6994,x:-95.3,y:136.45}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-93.6067,x:-55.75,y:-21.75,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.1707,x:-5.85,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-1.8558,skewY:178.1441,x:0.05,y:-76.9,regY:52.8}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:117.3872,x:58.95,y:47.35}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-96.5659,skewY:83.4341,x:18.55,y:117.65,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.4,scaleX:0.9982,scaleY:0.9982,skewX:-72.6304,skewY:107.3696,x:23.6,y:128.05}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:-3.5554,y:92.15,x:-20.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:81.9848,x:47.65,y:-26.5,scaleY:0.9983,scaleX:0.9983}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:8.4696,x:12.4,y:94.45}},{t:this.instance_9,p:{regX:2.4,skewX:3.8106,skewY:-176.1894,x:0.45,y:191.35,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:2.9,scaleX:0.998,scaleY:0.998,skewX:-9.3598,skewY:170.6402,x:-14.95,y:190.25,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-60.5802,x:-49.7,y:58.2,regX:40.5}},{t:this.instance_4,p:{regX:5.3,skewX:122.3543,skewY:-57.6457,x:-88.7,y:129.4,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:122.414,skewY:-57.586,x:-92.15,y:137.8}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-93.9868,x:-55.75,y:-21.75,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.6,scaleX:0.999,scaleY:0.999,rotation:-0.1558,x:-6,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-1.6448,skewY:178.3552,x:0.05,y:-76.9,regY:52.8}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:118.7779,x:57.8,y:47.55}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-95.1634,skewY:84.8366,x:15.65,y:116.9,regY:8,regX:-6.1}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-71.2169,skewY:108.7831,x:20.35,y:127.25}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:-2.2075,y:92.2,x:-20.45,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.2,rotation:82.8885,x:47.65,y:-26.35,scaleY:0.9983,scaleX:0.9983}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:7.0468,x:12.05,y:94.7}},{t:this.instance_9,p:{regX:2.5,skewX:3.2619,skewY:-176.738,x:2.25,y:191.7,scaleX:0.9979,scaleY:0.9979,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-8.0136,skewY:171.9864,x:-17.35,y:190.4,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-62.4553,x:-49.2,y:58.15,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:120.4734,skewY:-59.5266,x:-85.75,y:130.75,regY:-8.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:120.5281,skewY:-59.4719,x:-89.05,y:139.1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-94.3663,x:-55.85,y:-21.75,regY:-0.2}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.1418,x:-5.85,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-1.4347,skewY:178.5653,x:0.05,y:-76.9,regY:52.8}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:120.1678,x:56.6,y:47.7}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-93.7596,skewY:86.2404,x:12.8,y:115.9,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-69.8046,skewY:110.1954,x:17.3,y:126.55}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:-0.8609,y:92.15,x:-20.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:83.7913,x:47.6,y:-26.5,scaleY:0.9983,scaleX:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:5.6247,x:11.7,y:94.85}},{t:this.instance_9,p:{regX:2.4,skewX:2.7127,skewY:-177.2873,x:4.4,y:192.1,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-6.6675,skewY:173.3325,x:-19.65,y:190.45,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-64.3308,x:-48.6,y:58.05,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:118.5919,skewY:-61.4081,x:-82.95,y:131.8,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:118.643,skewY:-61.357,x:-85.8,y:140.25}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-94.7484,x:-55.7,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.1269,x:-5.9,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-1.2254,skewY:178.7746,x:0.1,y:-76.75,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:121.558,x:55.45,y:47.85}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-92.3564,skewY:87.6436,x:10.05,y:114.95,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.2,scaleX:0.9982,scaleY:0.9982,skewX:-68.3899,skewY:111.6101,x:14.1,y:125.7}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:0.4817,y:92.25,x:-20.45,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:84.6943,x:47.6,y:-26.5,scaleY:0.9983,scaleX:0.9983}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:4.2017,x:11.35,y:94.95}},{t:this.instance_9,p:{regX:2.4,skewX:2.1637,skewY:-177.8363,x:6.5,y:192.4,scaleX:0.9979,scaleY:0.9979,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-5.3216,skewY:174.6784,x:-21.95,y:190.45,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-66.2058,x:-48.1,y:58.05,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:116.7108,skewY:-63.2892,x:-80.05,y:132.8,regY:-8.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:116.7562,skewY:-63.2438,x:-82.55,y:141.4}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-95.1274,x:-55.75,y:-21.75,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.1129,x:-5.9,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-1.0145,skewY:178.9855,x:0.15,y:-76.75,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:122.9494,x:54.3,y:48}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-90.9537,skewY:89.0463,x:7.35,y:113.95,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-66.9774,skewY:113.0226,x:11.1,y:124.8}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:1.8281,y:92.15,x:-20.45,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:85.5979,x:47.65,y:-26.45,scaleY:0.9984,scaleX:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:2.7804,x:11.05,y:95.1}},{t:this.instance_9,p:{regX:2.4,skewX:1.6159,skewY:-178.3841,x:8.55,y:192.65,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-3.9758,skewY:176.0242,x:-24.3,y:190.4,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-68.0816,x:-47.6,y:58,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:114.8301,skewY:-65.1699,x:-77.05,y:133.8,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:114.8713,skewY:-65.1287,x:-79.3,y:142.5}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-95.5074,x:-55.75,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.0989,x:-5.8,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-0.8053,skewY:179.1947,x:0.15,y:-76.75,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:124.3396,x:53.15,y:48}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,skewX:-89.5551,skewY:90.4449,x:4.55,y:112.9,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-65.562,skewY:114.438,x:8.15,y:123.8}},{t:this.instance_12,p:{regX:1.8,regY:-45.8,rotation:3.1754,y:92.2,x:-20.35,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:86.5011,x:47.65,y:-26.55,scaleY:0.9983,scaleX:0.9983}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:1.3574,x:10.7,y:95.2}},{t:this.instance_9,p:{regX:2.4,skewX:1.0663,skewY:-178.9337,x:10.6,y:192.6,scaleX:0.9978,scaleY:0.9978,regY:-53.3}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-2.6316,skewY:177.3684,x:-26.6,y:190.2,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-69.9556,x:-47.1,y:57.9,regX:40.5}},{t:this.instance_4,p:{regX:5.3,skewX:112.95,skewY:-67.05,x:-74,y:134.6,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:112.9852,skewY:-67.0148,x:-76,y:143.45}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-95.8876,x:-55.7,y:-21.8,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.0858,x:-5.85,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-0.5943,skewY:179.4057,x:0.05,y:-76.75,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:125.73,x:52,y:48.15}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-88.1519,skewY:91.8481,x:1.85,y:111.75,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-64.1494,skewY:115.8506,x:5.05,y:122.75}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:4.5228,y:92.15,x:-20.55,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.2,rotation:87.4035,x:47.65,y:-26.35,scaleY:0.9983,scaleX:0.9983}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:-0.0596,x:10.3,y:95.35}},{t:this.instance_9,p:{regX:2.4,skewX:0.5169,skewY:-179.4831,x:12.7,y:192.85,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-1.2861,skewY:178.7139,x:-28.85,y:190.05,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-71.8309,x:-46.55,y:57.85,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:111.0694,skewY:-68.9306,x:-70.9,y:135.45,regY:-8.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:111.0996,skewY:-68.9004,x:-72.65,y:144.3}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-96.2674,x:-55.75,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.0709,x:-5.85,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-0.3834,skewY:179.6166,x:0.1,y:-76.75,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:127.1211,x:50.8,y:48.15}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-86.7492,skewY:93.2508,x:-0.95,y:110.6,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9981,scaleY:0.9981,skewX:-62.7361,skewY:117.2639,x:2.2,y:121.65}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:5.8693,y:92.15,x:-20.45,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:88.3079,x:47.65,y:-26.5,scaleY:0.9984,scaleX:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:-1.4818,x:9.95,y:95.45}},{t:this.instance_9,p:{regX:2.5,skewX:-0.0272,skewY:179.9728,x:14.65,y:192.85,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:0.0552,skewY:-179.9448,x:-31.2,y:189.8,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-73.7057,x:-46,y:57.8,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:109.1877,skewY:-70.8123,x:-67.85,y:136.1,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:109.2128,skewY:-70.7872,x:-69.3,y:144.95}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-96.6482,x:-55.75,y:-21.65,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.056,x:-5.8,y:-58}},{t:this.instance_16,p:{regX:0.5,skewX:-0.1742,skewY:179.8258,x:0.05,y:-76.75,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:128.5113,x:49.6,y:48.15}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-85.3455,skewY:94.6545,x:-3.6,y:109.55,regY:8,regX:-6.1}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9981,scaleY:0.9981,skewX:-61.3228,skewY:118.6772,x:-0.75,y:120.5}},{t:this.instance_12,p:{regX:1.8,regY:-45.8,rotation:7.2163,y:92.25,x:-20.45,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:89.2101,x:47.6,y:-26.45,scaleY:0.9984,scaleX:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:-2.9041,x:9.6,y:95.6}},{t:this.instance_9,p:{regX:2.4,skewX:-0.5774,skewY:179.4226,x:16.75,y:192.7,scaleX:0.9979,scaleY:0.9979,regY:-53.3}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:1.4009,skewY:-178.5991,x:-33.55,y:189.6,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-75.5803,x:-45.5,y:57.8,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:107.3074,skewY:-72.6926,x:-64.8,y:136.7,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:107.3279,skewY:-72.6721,x:-65.9,y:145.6}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-97.0276,x:-55.75,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.042,x:-5.8,y:-58}},{t:this.instance_16,p:{regX:0.5,skewX:0.0315,skewY:-179.9685,x:0.05,y:-76.75,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:129.9012,x:48.45,y:48.3}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-83.9425,skewY:96.0575,x:-6.25,y:108.15,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-59.9086,skewY:120.0914,x:-3.65,y:119.25}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:8.5627,y:92.15,x:-20.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:90.1086,x:47.65,y:-26.5,scaleY:0.9984,scaleX:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:-4.3264,x:9.2,y:95.75}},{t:this.instance_9,p:{regX:2.4,skewX:-1.1251,skewY:178.8749,x:18.8,y:192.75,scaleX:0.9979,scaleY:0.9979,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:2.7456,skewY:-177.2544,x:-35.85,y:189.2,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-77.4558,x:-44.95,y:57.75,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:105.427,skewY:-74.573,x:-61.6,y:137.25,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:105.4416,skewY:-74.5584,x:-62.5,y:146.2}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-97.4081,x:-55.75,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.9989,scaleY:0.9989,rotation:-0.028,x:-5.8,y:-58}},{t:this.instance_16,p:{regX:0.5,skewX:0.2424,skewY:-179.7576,x:0.15,y:-76.75,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:131.2915,x:47.3,y:48.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-82.5394,skewY:97.4606,x:-8.9,y:106.75,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.2,scaleX:0.9982,scaleY:0.9982,skewX:-58.4953,skewY:121.5047,x:-6.7,y:117.9}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:9.9107,y:92.15,x:-20.6,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.4,rotation:91.0124,x:47.65,y:-26.6,scaleY:0.9984,scaleX:0.9984}},{t:this.instance_10,p:{regX:-2,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:-5.7488,x:8.75,y:95.85}},{t:this.instance_9,p:{regX:2.4,skewX:-1.6737,skewY:178.3263,x:20.85,y:192.55,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:4.0919,skewY:-175.9081,x:-38.1,y:188.85,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-79.3308,x:-44.45,y:57.5,regX:40.6}},{t:this.instance_4,p:{regX:5.2,skewX:103.5462,skewY:-76.4538,x:-58.6,y:137.75,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:103.555,skewY:-76.445,x:-59.05,y:146.65}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-97.7887,x:-55.75,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.9989,scaleY:0.9989,rotation:-0.0131,x:-5.75,y:-58}},{t:this.instance_16,p:{regX:0.5,skewX:0.4534,skewY:-179.5466,x:0.1,y:-76.7,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:132.6825,x:46.05,y:48.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-81.1363,skewY:98.8637,x:-11.45,y:105.4,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-57.0817,skewY:122.9183,x:-9.45,y:116.65}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:11.2569,y:92.15,x:-20.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:91.9147,x:47.65,y:-26.5,scaleY:0.9984,scaleX:0.9984}},{t:this.instance_10,p:{regX:-2,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:-7.1712,x:8.45,y:95.95}},{t:this.instance_9,p:{regX:2.4,skewX:-2.2225,skewY:177.7775,x:22.9,y:192.35,scaleX:0.9979,scaleY:0.9979,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:5.4368,skewY:-174.5632,x:-40.4,y:188.4,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-81.2054,x:-43.9,y:57.5,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:101.6651,skewY:-78.3349,x:-55.45,y:138.05,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:101.669,skewY:-78.331,x:-55.6,y:147.05}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-98.1683,x:-55.7,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.0009,x:-5.8,y:-58.05}},{t:this.instance_16,p:{regX:0.5,skewX:0.6617,skewY:-179.3383,x:0.25,y:-76.75,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:134.0728,x:44.9,y:48.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-79.7347,skewY:100.2653,x:-14.05,y:103.9,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-55.6688,skewY:124.3312,x:-12.3,y:115.25}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:12.6025,y:92.15,x:-20.65,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:92.8183,x:47.65,y:-26.5,scaleY:0.9984,scaleX:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:-8.5918,x:8.2,y:96}},{t:this.instance_9,p:{regX:2.4,skewX:-2.7715,skewY:177.2285,x:24.9,y:192.15,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:2.9,scaleX:0.998,scaleY:0.998,skewX:6.7811,skewY:-173.2188,x:-42.6,y:187.85,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-83.0804,x:-43.4,y:57.5,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:99.7835,skewY:-80.2165,x:-52.15,y:138.3,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:99.7832,skewY:-80.2168,x:-52.05,y:147.3}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-98.5473,x:-55.7,y:-21.65,regY:-0.1}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-142.6,-369,259.6,676.4);


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
	this.instance = new lib.CachedBmp_2205();
	this.instance.setTransform(-94.5,-342.4,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2204();
	this.instance_1.setTransform(-120.9,-365.25,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(42));

	// Armature_1
	this.instance_2 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_2.setTransform(-57.45,-22.95,0.9984,0.9984,-96.0919,0,0,35.4,0.1);

	this.instance_3 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_3.setTransform(-116.4,114.45,0.9983,0.9983,0,124.6947,-55.3053,6.6,-1.5);

	this.instance_4 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_4.setTransform(-109.2,110.65,0.9984,0.9984,0,159.2764,-20.7236,5.5,-9.1);

	this.instance_5 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_5.setTransform(-49.2,50.55,0.9985,0.9985,-43.8427,0,0,44,0);

	this.instance_6 = new lib.ch1_uBodycopy("synched",0);
	this.instance_6.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_7 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_7.setTransform(-3.65,182.2,0.9983,0.9983,0,-22.7945,157.2055,1.8,-55.5);

	this.instance_8 = new lib.ch1_lBodycopy("synched",0);
	this.instance_8.setTransform(-5.6,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_9 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_9.setTransform(-23.15,181.55,0.9979,0.9979,0,10.6587,-169.3413,3.1,-53.4);

	this.instance_10 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_10.setTransform(15.9,92.55,0.998,0.998,22.6213,0,0,-1,1.4);

	this.instance_11 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_11.setTransform(84.45,133.25,0.9985,0.9985,0,-96.4018,83.5982,-4.9,3.2);

	this.instance_12 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_12.setTransform(79.35,123.45,0.9985,0.9985,0,-99.5494,80.4506,-6,8.4);

	this.instance_13 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_13.setTransform(70.5,40.05,0.9984,0.9984,81.8892,0,0,-39.7,-1);

	this.instance_14 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_14.setTransform(47.9,-26.2,0.9984,0.9984,71.1253,0,0,-31.2,-1.4);

	this.instance_15 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_15.setTransform(-26.65,89.85,0.9984,0.9984,-14.3425,0,0,1.8,-46);

	this.instance_16 = new lib.ch1_headcopy("synched",0);
	this.instance_16.setTransform(-0.7,-79.45,0.9991,0.9991,0,-1.7225,178.2775,-0.1,52.8);

	this.instance_17 = new lib.ch1_neckcopy("synched",0);
	this.instance_17.setTransform(-5.6,-57.7,0.9991,0.9991,-1.6733,0,0,-1.1,9.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_17,p:{regX:-1.1,rotation:-1.6733,x:-5.6,y:-57.7,regY:9.2}},{t:this.instance_16,p:{scaleX:0.9991,scaleY:0.9991,skewX:-1.7225,skewY:178.2775,x:-0.7,y:-79.45}},{t:this.instance_15,p:{regY:-46,scaleX:0.9984,scaleY:0.9984,rotation:-14.3425,x:-26.65,y:89.85,regX:1.8}},{t:this.instance_14,p:{rotation:71.1253,x:47.9,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1,rotation:81.8892,x:70.5,y:40.05}},{t:this.instance_12,p:{regY:8.4,scaleX:0.9985,scaleY:0.9985,skewX:-99.5494,skewY:80.4506,x:79.35,y:123.45,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9985,scaleY:0.9985,skewX:-96.4018,skewY:83.5982,x:84.45,y:133.25,regX:-4.9}},{t:this.instance_10,p:{regY:1.4,scaleX:0.998,scaleY:0.998,rotation:22.6213,x:15.9,y:92.55,regX:-1}},{t:this.instance_9,p:{regY:-53.4,scaleX:0.9979,scaleY:0.9979,skewX:10.6587,skewY:-169.3413,x:-23.15,y:181.55,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9983,scaleY:0.9983,skewX:-22.7945,skewY:157.2055,x:-3.65,y:182.2,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9985,scaleY:0.9985,rotation:-43.8427,x:-49.2,y:50.55,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9984,scaleY:0.9984,skewX:159.2764,skewY:-20.7236,x:-109.2,y:110.65,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,skewX:124.6947,skewY:-55.3053,x:-116.4,y:114.45,regX:6.6,regY:-1.5}},{t:this.instance_2,p:{rotation:-96.0919,x:-57.45,y:-22.95,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]}).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-1.7128,x:-5.7,y:-57.65,regY:9.2}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-1.9721,skewY:178.0279,x:-0.65,y:-79.45}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-13.063,x:-26.9,y:89.75,regX:1.8}},{t:this.instance_14,p:{rotation:71.6102,x:47.95,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.6,regY:-1.1,rotation:83.411,x:70,y:40.35}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-98.0288,skewY:81.9712,x:76.6,y:123.75,regX:-6}},{t:this.instance_11,p:{regY:3.3,scaleX:0.9984,scaleY:0.9984,skewX:-94.8789,skewY:85.1211,x:81.45,y:133.75,regX:-4.9}},{t:this.instance_10,p:{regY:1.6,scaleX:0.9979,scaleY:0.9979,rotation:21.3034,x:15.8,y:92.75,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:9.341,skewY:-170.659,x:-20.95,y:182.4,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-21.5147,skewY:158.4853,x:-6,y:182.5,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-45.9858,x:-47.7,y:50.4,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:157.1349,skewY:-22.8651,x:-105.35,y:112.6,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:122.5522,skewY:-57.4478,x:-112.5,y:116.7,regX:6.6,regY:-1.5}},{t:this.instance_2,p:{rotation:-97.2386,x:-57.4,y:-22.9,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-1.7548,x:-5.65,y:-57.65,regY:9.2}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-2.2235,skewY:177.7765,x:-0.7,y:-79.45}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-11.7831,x:-27.1,y:89.65,regX:1.8}},{t:this.instance_14,p:{rotation:72.0929,x:47.95,regX:-31.3,y:-26.3,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.8,regY:-1.1,rotation:84.9338,x:69.45,y:40.35}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9984,scaleY:0.9984,skewX:-96.5078,skewY:83.4922,x:74,y:124.15,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-93.3583,skewY:86.6417,x:78.25,y:134.15,regX:-4.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:19.9842,x:15.85,y:92.55,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:8.0212,skewY:-171.9788,x:-18.9,y:183.2,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-20.235,skewY:159.765,x:-8.4,y:182.8,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-48.1285,x:-46.2,y:50.2,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:154.9923,skewY:-25.0077,x:-101.5,y:114.6,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:120.4091,skewY:-59.5909,x:-108.4,y:118.8,regX:6.7,regY:-1.5}},{t:this.instance_2,p:{rotation:-98.3858,x:-57.45,y:-22.85,regX:35.3,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-1.7969,x:-5.7,y:-57.65,regY:9.2}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-2.4748,skewY:177.5252,x:-0.65,y:-79.4}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-10.5033,x:-27.3,y:89.5,regX:1.8}},{t:this.instance_14,p:{rotation:72.5753,x:47.9,regX:-31.2,y:-26.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.6,regY:-1.1,rotation:86.4539,x:68.9,y:40.75}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-94.9861,skewY:85.0139,x:71.1,y:124.4,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-91.8374,skewY:88.1626,x:75.2,y:134.6,regX:-4.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:18.6657,x:15.85,y:92.6,regX:-1}},{t:this.instance_9,p:{regY:-53.2,scaleX:0.9978,scaleY:0.9978,skewX:6.7031,skewY:-173.2969,x:-16.75,y:184.05,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-18.9543,skewY:161.0457,x:-10.8,y:183.1,regX:1.9,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-50.2712,x:-44.65,y:49.9,regX:44.1,regY:0}},{t:this.instance_4,p:{scaleX:0.9984,scaleY:0.9984,skewX:152.8483,skewY:-27.1517,x:-97.6,y:116.35,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:118.2656,skewY:-61.7344,x:-104.5,y:120.85,regX:6.6,regY:-1.4}},{t:this.instance_2,p:{rotation:-99.5332,x:-57.45,y:-22.9,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-1.8388,x:-5.7,y:-57.65,regY:9.2}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-2.7254,skewY:177.2746,x:-0.75,y:-79.45}},{t:this.instance_15,p:{regY:-46,scaleX:0.9983,scaleY:0.9983,rotation:-9.2232,x:-27.6,y:89.3,regX:1.8}},{t:this.instance_14,p:{rotation:73.0586,x:47.9,regX:-31.2,y:-26.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:87.975,x:68.3,y:40.8}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-93.4652,skewY:86.5348,x:68.3,y:124.6,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-90.3161,skewY:89.6839,x:72.15,y:134.9,regX:-4.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:17.3463,x:15.95,y:92.6,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:5.385,skewY:-174.615,x:-14.6,y:184.65,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-17.6763,skewY:162.3237,x:-13.05,y:183.3,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-52.4139,x:-43.25,y:49.65,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:150.7062,skewY:-29.2938,x:-93.6,y:117.95,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:116.1228,skewY:-63.8772,x:-100.2,y:122.8,regX:6.6,regY:-1.5}},{t:this.instance_2,p:{rotation:-100.6817,x:-57.4,y:-22.95,regX:35.4,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-1.8817,x:-5.7,y:-57.65,regY:9.2}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-2.9769,skewY:177.0231,x:-0.7,y:-79.45}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-7.9441,x:-27.8,y:89.25,regX:1.8}},{t:this.instance_14,p:{rotation:73.5412,x:47.95,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:89.4956,x:67.75,y:40.9}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-91.9434,skewY:88.0566,x:65.55,y:124.7,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-88.7994,skewY:91.2006,x:69.1,y:135.1,regX:-4.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:16.0275,x:16,y:92.5,regX:-1}},{t:this.instance_9,p:{regY:-53.2,scaleX:0.9979,scaleY:0.9979,skewX:4.0653,skewY:-175.9347,x:-12.6,y:185.45,regX:3.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-16.3955,skewY:163.6043,x:-15.4,y:183.5,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-54.5576,x:-41.95,y:49.35,regX:44,regY:-0.1}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:148.563,skewY:-31.437,x:-89.55,y:119.55,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:113.9795,skewY:-66.0205,x:-96.05,y:124.6,regX:6.6,regY:-1.5}},{t:this.instance_2,p:{rotation:-101.8279,x:-57.45,y:-22.95,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-1.9238,x:-5.7,y:-57.75,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-3.2276,skewY:176.7724,x:-0.8,y:-79.45}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-6.6648,x:-27.9,y:89.2,regX:1.9}},{t:this.instance_14,p:{rotation:74.0251,x:47.95,regX:-31.2,y:-26.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.8,regY:-1.1,rotation:91.0132,x:67.1,y:40.95}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9985,scaleY:0.9985,skewX:-90.4221,skewY:89.5779,x:62.7,y:124.8,regX:-6}},{t:this.instance_11,p:{regY:3.3,scaleX:0.9984,scaleY:0.9984,skewX:-87.2774,skewY:92.7226,x:66.15,y:135.3,regX:-4.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:14.7082,x:16,y:92.55,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:2.747,skewY:-177.253,x:-10.3,y:186,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-15.1161,skewY:164.8839,x:-17.7,y:183.55,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-56.6997,x:-40.35,y:49.1,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:146.4197,skewY:-33.5803,x:-85.55,y:120.9,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:111.8352,skewY:-68.1648,x:-91.7,y:126.25,regX:6.6,regY:-1.5}},{t:this.instance_2,p:{rotation:-102.9757,x:-57.45,y:-22.95,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-1.9658,x:-5.7,y:-57.75,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-3.48,skewY:176.52,x:-0.75,y:-79.45}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-5.3843,x:-28.25,y:89.05,regX:1.8}},{t:this.instance_14,p:{rotation:74.5075,x:47.9,regX:-31.2,y:-26.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:92.5333,x:66.6,y:41.3}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-88.9063,skewY:91.0937,x:59.95,y:124.8,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-85.757,skewY:94.243,x:62.95,y:135.4,regX:-4.9}},{t:this.instance_10,p:{regY:1.4,scaleX:0.9979,scaleY:0.9979,rotation:13.3896,x:16.05,y:92.4,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9979,scaleY:0.9979,skewX:1.4274,skewY:-178.5726,x:-8.2,y:186.55,regX:3.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-13.8359,skewY:166.1641,x:-20,y:183.7,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-58.8439,x:-38.9,y:48.7,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:144.2763,skewY:-35.7237,x:-81.35,y:122.25,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:109.693,skewY:-70.307,x:-87.5,y:127.75,regX:6.6,regY:-1.4}},{t:this.instance_2,p:{rotation:-104.1233,x:-57.45,y:-22.9,regX:35.3,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.007,x:-5.7,y:-57.75,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-3.7308,skewY:176.2692,x:-0.7,y:-79.45}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-4.1039,x:-28.5,y:88.9,regX:1.8}},{t:this.instance_14,p:{rotation:74.9914,x:47.95,regX:-31.2,y:-26.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.8,regY:-1.1,rotation:94.0542,x:66.05,y:41.35}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-87.3853,skewY:92.6147,x:57.15,y:124.75,regX:-6}},{t:this.instance_11,p:{regY:3.3,scaleX:0.9984,scaleY:0.9984,skewX:-84.2363,skewY:95.7637,x:60,y:135.6,regX:-4.8}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:12.0703,x:16,y:92.5,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:0.1086,skewY:-179.8914,x:-5.9,y:187.05,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-12.5557,skewY:167.4441,x:-22.4,y:183.75,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-60.9858,x:-37.5,y:48.35,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:142.1326,skewY:-37.8674,x:-77.05,y:123.35,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:107.5503,skewY:-72.4497,x:-82.85,y:129.05,regX:6.7,regY:-1.6}},{t:this.instance_2,p:{rotation:-105.2714,x:-57.45,y:-23,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.0499,x:-5.65,y:-57.75,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-3.9817,skewY:176.0183,x:-0.8,y:-79.45}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-2.8246,x:-28.7,y:88.8,regX:1.8}},{t:this.instance_14,p:{rotation:75.4731,x:47.9,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:95.5764,x:65.45,y:41.6}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-85.8634,skewY:94.1366,x:54.35,y:124.65,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-82.714,skewY:97.286,x:56.75,y:135.4,regX:-4.9}},{t:this.instance_10,p:{regY:1.4,scaleX:0.9979,scaleY:0.9979,rotation:10.7517,x:15.95,y:92.35,regX:-1.1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9979,scaleY:0.9979,skewX:-1.2057,skewY:178.7943,x:-3.75,y:187.5,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-11.2775,skewY:168.7225,x:-24.75,y:183.65,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-63.1303,x:-36.1,y:47.9,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:139.9898,skewY:-40.0102,x:-72.9,y:124.3,regY:-9}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:105.4075,skewY:-74.5925,x:-78.45,y:130.4,regX:6.6,regY:-1.5}},{t:this.instance_2,p:{rotation:-106.4183,x:-57.4,y:-23,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.0919,x:-5.65,y:-57.75,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-4.2335,skewY:175.7665,x:-0.75,y:-79.45}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-1.545,x:-28.95,y:88.65,regX:1.8}},{t:this.instance_14,p:{rotation:75.9576,x:47.9,regX:-31.2,y:-26.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:97.0971,x:64.9,y:41.75}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-84.3412,skewY:95.6588,x:51.6,y:124.5,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-81.1929,skewY:98.8071,x:53.75,y:135.25,regX:-4.9}},{t:this.instance_10,p:{regY:1.6,scaleX:0.9979,scaleY:0.9979,rotation:9.4321,x:16.1,y:92.6,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:-2.5233,skewY:177.4767,x:-1.5,y:187.9,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-9.997,skewY:170.003,x:-27.1,y:183.6,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-65.2739,x:-34.7,y:47.45,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:137.8465,skewY:-42.1535,x:-68.6,y:125.15,regY:-9}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:103.2643,skewY:-76.7357,x:-73.95,y:131.45,regX:6.6,regY:-1.5}},{t:this.instance_2,p:{rotation:-107.5659,x:-57.4,y:-23,regX:35.4,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.1339,x:-5.65,y:-57.75,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-4.4854,skewY:175.5146,x:-0.8,y:-79.45}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-0.2653,x:-29.2,y:88.55,regX:1.8}},{t:this.instance_14,p:{rotation:76.4393,x:47.9,regX:-31.3,y:-26.35,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:98.6184,x:64.3,y:41.85}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-82.821,skewY:97.179,x:48.8,y:124.25,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-79.6733,skewY:100.3267,x:50.65,y:135.2,regX:-4.8}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:8.1137,x:16.15,y:92.45,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9979,scaleY:0.9979,skewX:-3.8431,skewY:176.1569,x:0.7,y:188.3,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-8.7169,skewY:171.2831,x:-29.55,y:183.5,regX:1.9,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-67.4158,x:-33.25,y:47.05,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9984,scaleY:0.9984,skewX:135.7035,skewY:-44.2965,x:-64.2,y:126,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,skewX:101.1215,skewY:-78.8785,x:-69.5,y:132.5,regX:6.5,regY:-1.4}},{t:this.instance_2,p:{rotation:-108.7133,x:-57.4,y:-22.95,regX:35.4,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.1759,x:-5.65,y:-57.75,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-4.7365,skewY:175.2635,x:-0.75,y:-79.5}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:1.0107,x:-29.45,y:88.4,regX:1.8}},{t:this.instance_14,p:{rotation:76.9231,x:47.85,regX:-31.2,y:-26.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:100.1407,x:63.7,y:42.05}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-81.2986,skewY:98.7014,x:46.05,y:124.05,regX:-5.9}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-78.1512,skewY:101.8488,x:47.65,y:134.75,regX:-4.9}},{t:this.instance_10,p:{regY:1.6,scaleX:0.9979,scaleY:0.9979,rotation:6.7954,x:16,y:92.45,regX:-1.1}},{t:this.instance_9,p:{regY:-53.2,scaleX:0.9978,scaleY:0.9978,skewX:-5.1615,skewY:174.8385,x:2.85,y:188.75,regX:3.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-7.4377,skewY:172.5623,x:-31.8,y:183.3,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-69.5593,x:-31.8,y:46.55,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:133.5614,skewY:-46.4386,x:-59.8,y:126.55,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:98.978,skewY:-81.022,x:-64.6,y:133.15,regX:6.6,regY:-1.6}},{t:this.instance_2,p:{rotation:-109.8618,x:-57.4,y:-23,regX:35.4,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.218,x:-5.7,y:-57.7,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-4.9876,skewY:175.0124,x:-0.8,y:-79.4}},{t:this.instance_15,p:{regY:-46,scaleX:0.9983,scaleY:0.9983,rotation:2.2907,x:-29.6,y:88.1,regX:1.8}},{t:this.instance_14,p:{rotation:77.4073,x:47.85,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:101.6611,x:63.1,y:42.15}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-79.7787,skewY:100.2213,x:43.3,y:123.55,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-76.6294,skewY:103.3706,x:44.6,y:134.5,regX:-4.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:5.4762,x:16.15,y:92.4,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:-6.4809,skewY:173.5191,x:5.25,y:188.8,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-6.1586,skewY:173.8414,x:-34.25,y:183.05,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-71.7035,x:-30.45,y:46,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:131.4173,skewY:-48.5827,x:-55.45,y:127.15,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:96.8344,skewY:-83.1656,x:-59.95,y:133.8,regX:6.6,regY:-1.6}},{t:this.instance_2,p:{rotation:-111.0093,x:-57.4,y:-23,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.2591,x:-5.7,y:-57.7,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-5.2389,skewY:174.761,x:-0.85,y:-79.4}},{t:this.instance_15,p:{regY:-46,scaleX:0.9983,scaleY:0.9983,rotation:3.5693,x:-29.85,y:88,regX:1.8}},{t:this.instance_14,p:{rotation:77.8904,x:47.9,regX:-31.2,y:-26.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:103.1829,x:62.55,y:42.25}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-78.2578,skewY:101.7422,x:40.5,y:123.25,regX:-5.9}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-75.1085,skewY:104.8915,x:41.6,y:134,regX:-4.9}},{t:this.instance_10,p:{regY:1.6,scaleX:0.9979,scaleY:0.9979,rotation:4.1573,x:16.2,y:92.5,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:-7.8,skewY:172.2,x:7.5,y:189.05,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-4.8782,skewY:175.1218,x:-36.5,y:182.8,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-73.846,x:-29.1,y:45.4,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:129.275,skewY:-50.725,x:-50.95,y:127.4,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:94.6917,skewY:-85.3083,x:-55.4,y:134.3,regX:6.6,regY:-1.5}},{t:this.instance_2,p:{rotation:-112.1575,x:-57.4,y:-23,regX:35.4,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.3012,x:-5.7,y:-57.7,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-5.4904,skewY:174.5096,x:-0.8,y:-79.4}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:4.8487,x:-30.1,y:88,regX:1.8}},{t:this.instance_14,p:{rotation:78.3731,x:47.9,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1,rotation:104.7031,x:61.85,y:42.3}},{t:this.instance_12,p:{regY:8.4,scaleX:0.9984,scaleY:0.9984,skewX:-76.7358,skewY:103.2642,x:37.7,y:122.55,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-73.5878,skewY:106.4122,x:38.55,y:133.6,regX:-4.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:2.838,x:16.25,y:92.35,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:-9.1182,skewY:170.8818,x:9.7,y:189.2,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-3.5977,skewY:176.4022,x:-38.9,y:182.45,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-75.9884,x:-27.65,y:44.9,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:127.1316,skewY:-52.8684,x:-46.65,y:127.45,regY:-9}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:92.5486,skewY:-87.4514,x:-50.7,y:134.5,regX:6.7,regY:-1.5}},{t:this.instance_2,p:{rotation:-113.3041,x:-57.4,y:-22.95,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.3432,x:-5.7,y:-57.7,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-5.7419,skewY:174.2581,x:-0.85,y:-79.4}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:6.1297,x:-30.3,y:87.85,regX:1.8}},{t:this.instance_14,p:{rotation:78.8551,x:47.85,regX:-31.2,y:-26.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1,rotation:106.2249,x:61.25,y:42.5}},{t:this.instance_12,p:{regY:8.4,scaleX:0.9984,scaleY:0.9984,skewX:-75.2149,skewY:104.7851,x:35.05,y:122.05,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-72.0671,skewY:107.9329,x:35.55,y:133.05,regX:-4.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:1.5185,x:16.25,y:92.3,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9979,skewX:-10.4365,skewY:169.5633,x:11.95,y:189.35,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-2.3181,skewY:177.6819,x:-41.25,y:182.1,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-78.1314,x:-26.35,y:44.2,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:124.9881,skewY:-55.0119,x:-42.1,y:127.6,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,skewX:90.4055,skewY:-89.5945,x:-45.95,y:134.85,regX:6.6,regY:-1.5}},{t:this.instance_2,p:{rotation:-114.4517,x:-57.4,y:-22.95,regX:35.4,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.3853,x:-5.65,y:-57.7,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-5.9927,skewY:174.0073,x:-0.85,y:-79.4}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:7.4104,x:-30.55,y:87.65,regX:1.8}},{t:this.instance_14,p:{rotation:79.3385,x:47.85,regX:-31.2,y:-26.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.8,regY:-1.1,rotation:107.7462,x:60.8,y:42.55}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-73.6933,skewY:106.3067,x:32.5,y:121.5,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-70.5454,skewY:109.4546,x:32.55,y:132.6,regX:-4.8}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:0.1998,x:16.3,y:92.3,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:-11.7565,skewY:168.2435,x:14.15,y:189.4,regX:3.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-1.0379,skewY:178.9621,x:-43.55,y:181.7,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-80.2755,x:-25,y:43.65,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:122.8441,skewY:-57.1559,x:-37.6,y:127.6,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:88.2665,skewY:-91.7335,x:-41.25,y:134.8,regX:6.6,regY:-1.5}},{t:this.instance_2,p:{rotation:-115.5996,x:-57.35,y:-22.95,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.4273,x:-5.65,y:-57.7,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-6.2443,skewY:173.7557,x:-0.85,y:-79.4}},{t:this.instance_15,p:{regY:-46,scaleX:0.9983,scaleY:0.9983,rotation:8.6884,x:-30.7,y:87.4,regX:1.8}},{t:this.instance_14,p:{rotation:79.8227,x:47.9,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:109.2671,x:60.3,y:42.7}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-72.1734,skewY:107.8266,x:29.8,y:120.8,regX:-6}},{t:this.instance_11,p:{regY:3.3,scaleX:0.9984,scaleY:0.9984,skewX:-69.0244,skewY:110.9756,x:29.75,y:131.85,regX:-4.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-1.1145,x:16.35,y:92.3,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:-13.0744,skewY:166.9256,x:16.5,y:189.4,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:0.2365,skewY:-179.7635,x:-45.85,y:181.25,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-82.418,x:-23.65,y:42.95,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:120.7015,skewY:-59.2985,x:-33.15,y:127.3,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,skewX:86.1234,skewY:-93.8766,x:-36.5,y:134.8,regX:6.6,regY:-1.5}},{t:this.instance_2,p:{rotation:-116.7464,x:-57.4,y:-23,regX:35.4,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.4693,x:-5.65,y:-57.7,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-6.4953,skewY:173.5047,x:-0.85,y:-79.45}},{t:this.instance_15,p:{regY:-46,scaleX:0.9983,scaleY:0.9983,rotation:9.9681,x:-31,y:87.25,regX:1.8}},{t:this.instance_14,p:{rotation:80.3048,x:47.95,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:110.7875,x:59.65,y:42.85}},{t:this.instance_12,p:{regY:8.4,scaleX:0.9984,scaleY:0.9984,skewX:-70.6518,skewY:109.3482,x:27,y:120.05,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-67.5021,skewY:112.4979,x:26.65,y:131.05,regX:-4.8}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-2.4346,x:16.35,y:92.3,regX:-1}},{t:this.instance_9,p:{regY:-53.2,scaleX:0.9978,scaleY:0.9978,skewX:-14.393,skewY:165.607,x:18.8,y:189.45,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:1.5163,skewY:-178.4837,x:-48.25,y:180.7,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-84.5608,x:-22.35,y:42.25,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:118.5589,skewY:-61.4411,x:-28.7,y:126.9,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:83.9799,skewY:-96.0201,x:-31.7,y:134.5,regX:6.6,regY:-1.5}},{t:this.instance_2,p:{rotation:-117.8952,x:-57.4,y:-23,regX:35.4,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.4352,x:-5.65,y:-57.7,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-6.2831,skewY:173.7169,x:-0.9,y:-79.45}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:8.8648,x:-30.8,y:87.55,regX:1.8}},{t:this.instance_14,p:{rotation:79.8834,x:47.95,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:109.4751,x:60.15,y:42.75}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-71.9765,skewY:108.0235,x:29.35,y:120.75,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-68.8395,skewY:111.1605,x:29.25,y:131.75,regX:-4.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-1.3073,x:16.35,y:92.25,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:-13.2742,skewY:166.7258,x:16.85,y:189.4,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:0.402,skewY:-179.598,x:-46.2,y:181.15,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-82.7228,x:-23.45,y:42.85,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9984,scaleY:0.9984,skewX:120.3882,skewY:-59.6118,x:-32.5,y:127.2,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:85.8187,skewY:-94.1813,x:-35.75,y:134.8,regX:6.5,regY:-1.5}},{t:this.instance_2,p:{rotation:-116.9113,x:-57.35,y:-22.85,regX:35.3,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.401,x:-5.65,y:-57.7,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-6.07,skewY:173.93,x:-0.85,y:-79.45}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:7.7604,x:-30.45,y:87.65,regX:1.9}},{t:this.instance_14,p:{rotation:79.4639,x:47.9,regX:-31.2,y:-26.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.6,regY:-1.1,rotation:108.1639,x:60.65,y:42.75}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-73.3007,skewY:106.6993,x:31.7,y:121.3,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-70.1784,skewY:109.8216,x:31.8,y:132.3,regX:-4.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-0.1805,x:16.35,y:92.3,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9979,scaleY:0.9979,skewX:-12.1547,skewY:167.8453,x:14.95,y:189.4,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-0.7086,skewY:179.2914,x:-44.2,y:181.55,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-80.8853,x:-24.6,y:43.45,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9984,scaleY:0.9984,skewX:122.2168,skewY:-57.7832,x:-36.3,y:127.5,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,skewX:87.6574,skewY:-92.3426,x:-39.85,y:134.85,regX:6.6,regY:-1.5}},{t:this.instance_2,p:{rotation:-115.9267,x:-57.4,y:-23,regX:35.4,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.3669,x:-5.65,y:-57.7,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-5.8563,skewY:174.1437,x:-0.85,y:-79.5}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:6.6551,x:-30.4,y:87.75,regX:1.8}},{t:this.instance_14,p:{rotation:79.0433,x:47.85,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:106.8527,x:61.15,y:42.5}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9984,scaleY:0.9984,skewX:-74.6252,skewY:105.3748,x:34.1,y:121.85,regX:-6}},{t:this.instance_11,p:{regY:3.3,scaleX:0.9984,scaleY:0.9984,skewX:-71.516,skewY:108.484,x:34.45,y:132.9,regX:-4.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:0.941,x:16.3,y:92.35,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:-11.036,skewY:168.964,x:12.85,y:189.4,regX:3.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-1.8238,skewY:178.1762,x:-42.15,y:181.95,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.0461,x:-25.8,y:43.95,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:124.0466,skewY:-55.9534,x:-40.2,y:127.6,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,skewX:89.4955,skewY:-90.5045,x:-43.95,y:134.9,regX:6.6,regY:-1.5}},{t:this.instance_2,p:{rotation:-114.9435,x:-57.4,y:-23,regX:35.4,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.3328,x:-5.7,y:-57.7,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-5.6424,skewY:174.3575,x:-0.8,y:-79.45}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:5.5514,x:-30.1,y:87.95,regX:1.9}},{t:this.instance_14,p:{rotation:78.6221,x:47.9,regX:-31.3,y:-26.3,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1,rotation:105.5405,x:61.55,y:42.35}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9984,scaleY:0.9984,skewX:-75.9497,skewY:104.0503,x:36.5,y:122.4,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-72.8525,skewY:107.1475,x:36.95,y:133.35,regX:-4.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:2.068,x:16.3,y:92.35,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:-9.9176,skewY:170.0824,x:11.1,y:189.3,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-2.9398,skewY:177.0602,x:-40.2,y:182.25,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-77.2082,x:-26.9,y:44.5,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:125.8763,skewY:-54.1237,x:-44.1,y:127.6,regY:-9}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,skewX:91.3296,skewY:-88.6704,x:-47.95,y:134.75,regX:6.6,regY:-1.5}},{t:this.instance_2,p:{rotation:-113.9602,x:-57.45,y:-23,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.2985,x:-5.7,y:-57.7,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-5.4298,skewY:174.5702,x:-0.8,y:-79.45}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:4.4463,x:-30,y:88.05,regX:1.8}},{t:this.instance_14,p:{rotation:78.2011,x:47.9,regX:-31.3,y:-26.25,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:104.2293,x:62.2,y:42.35}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-77.274,skewY:102.726,x:38.7,y:122.8,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-74.1903,skewY:105.8097,x:39.5,y:133.8,regX:-4.8}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:3.1942,x:16.2,y:92.35,regX:-1}},{t:this.instance_9,p:{regY:-53.2,scaleX:0.9978,scaleY:0.9978,skewX:-8.798,skewY:171.202,x:9.2,y:189.3,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-4.0542,skewY:175.9458,x:-38.1,y:182.8,regX:1.8,regY:-55.4}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-75.3693,x:-28.1,y:45,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9984,scaleY:0.9984,skewX:127.7045,skewY:-52.2955,x:-47.85,y:127.5,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,skewX:93.1686,skewY:-86.8314,x:-52.05,y:134.6,regX:6.6,regY:-1.5}},{t:this.instance_2,p:{rotation:-112.9766,x:-57.4,y:-23.05,regX:35.4,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.2644,x:-5.7,y:-57.7,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-5.2179,skewY:174.7821,x:-0.85,y:-79.4}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:3.3429,x:-29.8,y:88.15,regX:1.8}},{t:this.instance_14,p:{rotation:77.7802,x:47.85,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1,rotation:102.9186,x:62.5,y:42.15}},{t:this.instance_12,p:{regY:8.4,scaleX:0.9984,scaleY:0.9984,skewX:-78.5966,skewY:101.4034,x:40.9,y:123.3,regX:-5.9}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-75.5277,skewY:104.4723,x:42.15,y:134.15,regX:-4.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:4.3206,x:16.2,y:92.35,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:-7.6789,skewY:172.3211,x:7.2,y:189.05,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-5.1684,skewY:174.8316,x:-36.2,y:182.85,regX:1.9,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-73.5304,x:-29.3,y:45.5,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:129.5339,skewY:-50.4661,x:-51.65,y:127.35,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:95.0073,skewY:-84.9927,x:-56,y:134.35,regX:6.5,regY:-1.6}},{t:this.instance_2,p:{rotation:-111.993,x:-57.4,y:-22.95,regX:35.4,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.2294,x:-5.7,y:-57.7,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-5.0043,skewY:174.9957,x:-0.85,y:-79.4}},{t:this.instance_15,p:{regY:-46,scaleX:0.9983,scaleY:0.9983,rotation:2.2373,x:-29.6,y:88.15,regX:1.8}},{t:this.instance_14,p:{rotation:77.3599,x:47.95,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.8,regY:-1.1,rotation:101.6057,x:63.2,y:42.05}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-79.9237,skewY:100.0763,x:43.4,y:123.65,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-76.863,skewY:103.137,x:44.75,y:134.65,regX:-4.8}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:5.4481,x:16.15,y:92.4,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:-6.5602,skewY:173.4398,x:5.25,y:188.8,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-6.2836,skewY:173.7163,x:-34.05,y:183.1,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-71.6924,x:-30.4,y:46,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:131.3639,skewY:-48.6361,x:-55.45,y:127.15,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,skewX:96.845,skewY:-83.155,x:-59.95,y:133.85,regX:6.6,regY:-1.6}},{t:this.instance_2,p:{rotation:-111.0093,x:-57.4,y:-23,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.1961,x:-5.7,y:-57.75,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-4.7909,skewY:175.209,x:-0.85,y:-79.5}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:1.1333,x:-29.4,y:88.4,regX:1.8}},{t:this.instance_14,p:{rotation:76.9393,x:47.85,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:100.2946,x:63.75,y:42}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-81.2472,skewY:98.7528,x:45.75,y:124,regX:-5.9}},{t:this.instance_11,p:{regY:3.3,scaleX:0.9984,scaleY:0.9984,skewX:-78.2022,skewY:101.7978,x:47.5,y:134.75,regX:-4.9}},{t:this.instance_10,p:{regY:1.6,scaleX:0.9979,scaleY:0.9979,rotation:6.574,x:16.15,y:92.55,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:-5.4413,skewY:174.5587,x:3.2,y:188.6,regX:3.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-7.3995,skewY:172.6003,x:-32.15,y:183.35,regX:1.9,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-69.8543,x:-31.6,y:46.45,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:133.1928,skewY:-46.8072,x:-59.3,y:126.65,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:98.6845,skewY:-81.3155,x:-63.95,y:133.4,regX:6.5,regY:-1.6}},{t:this.instance_2,p:{rotation:-110.0258,x:-57.4,y:-23,regX:35.4,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.1619,x:-5.65,y:-57.75,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-4.5766,skewY:175.4234,x:-0.75,y:-79.45}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:0.028,x:-29.25,y:88.5,regX:1.8}},{t:this.instance_14,p:{rotation:76.5181,x:47.85,regX:-31.3,y:-26.3,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:98.9835,x:64.25,y:41.9}},{t:this.instance_12,p:{regY:8.4,scaleX:0.9984,scaleY:0.9984,skewX:-82.5712,skewY:97.4288,x:48.05,y:124.15,regX:-6}},{t:this.instance_11,p:{regY:3.3,scaleX:0.9984,scaleY:0.9984,skewX:-79.5398,skewY:100.4602,x:50.15,y:135.05,regX:-4.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:7.6998,x:16.15,y:92.45,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:-4.3218,skewY:175.6782,x:1.4,y:188.4,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-8.5131,skewY:171.4869,x:-30.1,y:183.45,regX:1.9,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-68.0166,x:-32.8,y:46.85,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:135.0217,skewY:-44.9783,x:-63,y:126.2,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:100.5234,skewY:-79.4766,x:-68.2,y:132.5,regX:6.7,regY:-1.4}},{t:this.instance_2,p:{rotation:-109.042,x:-57.4,y:-23,regX:35.4,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.1278,x:-5.65,y:-57.75,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-4.3651,skewY:175.6349,x:-0.75,y:-79.4}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-1.0702,x:-29.05,y:88.6,regX:1.8}},{t:this.instance_14,p:{rotation:76.0973,x:47.9,regX:-31.3,y:-26.35,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:97.6702,x:64.75,y:41.75}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9984,scaleY:0.9984,skewX:-83.8958,skewY:96.1042,x:50.65,y:124.4,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-80.8764,skewY:99.1236,x:52.7,y:135.1,regX:-4.9}},{t:this.instance_10,p:{regY:1.6,scaleX:0.9979,scaleY:0.9979,rotation:8.8268,x:15.95,y:92.55,regX:-1.1}},{t:this.instance_9,p:{regY:-53.2,scaleX:0.9979,scaleY:0.9979,skewX:-3.2031,skewY:176.7968,x:-0.5,y:188.2,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-9.6291,skewY:170.3709,x:-27.95,y:183.65,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-66.1781,x:-34,y:47.3,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:136.8512,skewY:-43.1488,x:-66.75,y:125.6,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:102.3615,skewY:-77.6385,x:-72.05,y:131.7,regX:6.7,regY:-1.4}},{t:this.instance_2,p:{rotation:-108.0586,x:-57.4,y:-23,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.0937,x:-5.65,y:-57.75,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-4.1519,skewY:175.8481,x:-0.8,y:-79.45}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-2.1742,x:-28.85,y:88.75,regX:1.8}},{t:this.instance_14,p:{rotation:75.6768,x:47.95,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.8,regY:-1.1,rotation:96.3582,x:65.25,y:41.5}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-85.2213,skewY:94.7787,x:52.95,y:124.55,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-82.2132,skewY:97.7868,x:55.3,y:135.35,regX:-4.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:9.9528,x:16.05,y:92.45,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9979,scaleY:0.9979,skewX:-2.0831,skewY:177.9169,x:-2.55,y:187.75,regX:3.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-10.7439,skewY:169.2561,x:-25.95,y:183.65,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-64.3384,x:-35.3,y:47.65,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:138.6795,skewY:-41.3205,x:-70.5,y:124.8,regY:-9}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:104.2,skewY:-75.8,x:-75.8,y:130.9,regX:6.7,regY:-1.5}},{t:this.instance_2,p:{rotation:-107.0754,x:-57.45,y:-23,regX:35.4,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.0595,x:-5.65,y:-57.75,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-3.9378,skewY:176.0622,x:-0.8,y:-79.5}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-3.2798,x:-28.45,y:88.85,regX:1.9}},{t:this.instance_14,p:{rotation:75.255,x:47.85,regX:-31.2,y:-26.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:95.0469,x:65.7,y:41.5}},{t:this.instance_12,p:{regY:8.4,scaleX:0.9984,scaleY:0.9984,skewX:-86.5453,skewY:93.4547,x:55.25,y:124.65,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-83.5511,skewY:96.4489,x:57.95,y:135.4,regX:-4.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:11.0809,x:15.9,y:92.45,regX:-1.1}},{t:this.instance_9,p:{regY:-53.4,scaleX:0.9978,scaleY:0.9978,skewX:-0.9647,skewY:179.0353,x:-4.15,y:187.3,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-11.8603,skewY:168.1395,x:-23.9,y:183.75,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-62.5013,x:-36.45,y:48.05,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:140.509,skewY:-39.491,x:-74.1,y:124.05,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:106.0383,skewY:-73.9617,x:-79.7,y:129.85,regX:6.7,regY:-1.5}},{t:this.instance_2,p:{rotation:-106.0915,x:-57.45,y:-22.95,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.0245,x:-5.7,y:-57.75,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-3.7255,skewY:176.2745,x:-0.75,y:-79.45}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-4.3831,x:-28.45,y:88.9,regX:1.8}},{t:this.instance_14,p:{rotation:74.8344,x:47.9,regX:-31.2,y:-26.1,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:93.7347,x:66.2,y:41.35}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9985,scaleY:0.9985,skewX:-87.87,skewY:92.13,x:57.8,y:124.75,regX:-6}},{t:this.instance_11,p:{regY:3.3,scaleX:0.9984,scaleY:0.9984,skewX:-84.889,skewY:95.111,x:60.75,y:135.5,regX:-4.8}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:12.2062,x:16,y:92.45,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:0.1498,skewY:-179.8502,x:-6.1,y:187,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-12.9745,skewY:167.0255,x:-21.9,y:183.7,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-60.6628,x:-37.7,y:48.4,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:142.3393,skewY:-37.6607,x:-77.75,y:123.2,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:107.8769,skewY:-72.1231,x:-83.6,y:128.9,regX:6.6,regY:-1.5}},{t:this.instance_2,p:{rotation:-105.108,x:-57.4,y:-22.95,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-1.9894,x:-5.7,y:-57.75,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-3.5133,skewY:176.4867,x:-0.7,y:-79.45}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-5.4879,x:-28.2,y:89.1,regX:1.8}},{t:this.instance_14,p:{rotation:74.414,x:47.85,regX:-31.3,y:-26.3,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:92.4228,x:66.7,y:41.25}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9984,scaleY:0.9984,skewX:-89.1944,skewY:90.8056,x:60.35,y:124.75,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-86.2249,skewY:93.7751,x:63.25,y:135.35,regX:-4.9}},{t:this.instance_10,p:{regY:1.4,scaleX:0.9979,scaleY:0.9979,rotation:13.3327,x:16.05,y:92.35,regX:-1}},{t:this.instance_9,p:{regY:-53.2,scaleX:0.9978,scaleY:0.9978,skewX:1.2679,skewY:-178.7321,x:-7.95,y:186.7,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-14.0896,skewY:165.9102,x:-19.85,y:183.65,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-58.8245,x:-38.95,y:48.7,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9984,scaleY:0.9984,skewX:144.1682,skewY:-35.8318,x:-81.35,y:122.2,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:109.7152,skewY:-70.2848,x:-87.5,y:127.7,regX:6.6,regY:-1.4}},{t:this.instance_2,p:{rotation:-104.1233,x:-57.45,y:-22.9,regX:35.3,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-1.9562,x:-5.7,y:-57.75,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-3.3003,skewY:176.6997,x:-0.7,y:-79.45}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-6.5923,x:-28.05,y:89.2,regX:1.8}},{t:this.instance_14,p:{rotation:73.9933,x:47.9,regX:-31.2,y:-26.25,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.8,regY:-1.1,rotation:91.1113,x:67.15,y:41}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9985,scaleY:0.9985,skewX:-90.514,skewY:89.486,x:62.65,y:124.75,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-87.5641,skewY:92.4359,x:65.95,y:135.3,regX:-4.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:14.4593,x:16,y:92.55,regX:-1}},{t:this.instance_9,p:{regY:-53.4,scaleX:0.9979,scaleY:0.9979,skewX:2.3873,skewY:-177.6127,x:-10,y:185.95,regX:3.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-15.2049,skewY:164.7951,x:-17.8,y:183.6,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-56.9863,x:-40.15,y:49,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:145.9973,skewY:-34.0027,x:-84.9,y:121.2,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:111.5526,skewY:-68.4474,x:-91.15,y:126.4,regX:6.6,regY:-1.5}},{t:this.instance_2,p:{rotation:-103.1403,x:-57.4,y:-22.8,regX:35.3,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-1.922,x:-5.7,y:-57.75,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-3.0864,skewY:176.9136,x:-0.7,y:-79.45}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-7.6976,x:-27.85,y:89.25,regX:1.8}},{t:this.instance_14,p:{rotation:73.5714,x:47.95,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:89.8047,x:67.65,y:40.95}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9985,scaleY:0.9985,skewX:-91.8382,skewY:88.1618,x:65.05,y:124.75,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-88.8992,skewY:91.1008,x:68.6,y:135.1,regX:-4.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:15.5859,x:15.95,y:92.55,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9979,skewX:3.5059,skewY:-176.4941,x:-11.75,y:185.5,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-16.319,skewY:163.681,x:-15.85,y:183.55,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-55.1477,x:-41.35,y:49.3,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:147.8259,skewY:-32.1741,x:-88.45,y:120,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:113.392,skewY:-66.608,x:-94.9,y:125,regX:6.6,regY:-1.4}},{t:this.instance_2,p:{rotation:-102.1565,x:-57.45,y:-22.9,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-1.8878,x:-5.7,y:-57.65,regY:9.2}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-2.8735,skewY:177.1265,x:-0.75,y:-79.45}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-8.8019,x:-27.5,y:89.35,regX:1.9}},{t:this.instance_14,p:{rotation:73.1517,x:47.9,regX:-31.2,y:-26.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:88.4919,x:68.2,y:40.85}},{t:this.instance_12,p:{regY:8.4,scaleX:0.9985,scaleY:0.9985,skewX:-93.1626,skewY:86.8374,x:67.3,y:124.7,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-90.2338,skewY:89.7662,x:71.25,y:134.9,regX:-4.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:16.7125,x:15.9,y:92.55,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:4.6259,skewY:-175.3741,x:-13.6,y:185.05,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-17.4337,skewY:162.5663,x:-13.8,y:183.4,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-53.3096,x:-42.65,y:49.5,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:149.6553,skewY:-30.3447,x:-91.9,y:118.65,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:115.2309,skewY:-64.7691,x:-98.5,y:123.6,regX:6.6,regY:-1.5}},{t:this.instance_2,p:{rotation:-101.1739,x:-57.45,y:-22.8,regX:35.3,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-1.8537,x:-5.7,y:-57.65,regY:9.2}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-2.6614,skewY:177.3386,x:-0.75,y:-79.45}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-9.9061,x:-27.5,y:89.45,regX:1.8}},{t:this.instance_14,p:{rotation:72.7312,x:47.95,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:87.1818,x:68.65,y:40.65}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-94.487,skewY:85.513,x:69.85,y:124.6,regX:-5.9}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-91.5703,skewY:88.4297,x:73.85,y:134.65,regX:-4.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:17.839,x:15.9,y:92.55,regX:-1}},{t:this.instance_9,p:{regY:-53.2,scaleX:0.9978,scaleY:0.9978,skewX:5.7459,skewY:-174.2541,x:-15.55,y:184.5,regX:3.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-18.5491,skewY:161.4509,x:-11.75,y:183.2,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-51.4701,x:-43.9,y:49.85,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:151.4854,skewY:-28.5146,x:-95.4,y:117.3,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:117.0699,skewY:-62.9301,x:-102,y:122.05,regX:6.6,regY:-1.6}},{t:this.instance_2,p:{rotation:-100.1891,x:-57.4,y:-22.95,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-1.8196,x:-5.7,y:-57.65,regY:9.2}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-2.4476,skewY:177.5524,x:-0.75,y:-79.45}},{t:this.instance_15,p:{regY:-46,scaleX:0.9983,scaleY:0.9983,rotation:-11.0113,x:-27.25,y:89.5,regX:1.8}},{t:this.instance_14,p:{rotation:72.3091,x:48,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.8,regY:-1.1,rotation:85.8694,x:69.2,y:40.4}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9985,scaleY:0.9985,skewX:-95.8111,skewY:84.1889,x:72.3,y:124.3,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-92.9085,skewY:87.0915,x:76.55,y:134.4,regX:-4.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:18.9655,x:15.9,y:92.6,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:6.8645,skewY:-173.1355,x:-17.25,y:183.85,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-19.6643,skewY:160.3357,x:-9.9,y:183.05,regX:1.9,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-49.6329,x:-45.15,y:50.05,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:153.3143,skewY:-26.6857,x:-98.75,y:115.8,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:118.9079,skewY:-61.0921,x:-105.6,y:120.3,regX:6.6,regY:-1.5}},{t:this.instance_2,p:{rotation:-99.2056,x:-57.45,y:-22.95,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-1.7854,x:-5.7,y:-57.65,regY:9.2}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-2.2339,skewY:177.7661,x:-0.7,y:-79.45}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-12.1145,x:-27.05,y:89.65,regX:1.8}},{t:this.instance_14,p:{rotation:71.8877,x:47.9,regX:-31.2,y:-26.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:84.5574,x:69.7,y:40.4}},{t:this.instance_12,p:{regY:8.4,scaleX:0.9984,scaleY:0.9984,skewX:-97.1366,skewY:82.8634,x:74.55,y:124,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-94.2447,skewY:85.7553,x:79.25,y:134.05,regX:-4.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:20.0914,x:15.85,y:92.6,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:7.9831,skewY:-172.0169,x:-19.05,y:183.15,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-20.7796,skewY:159.2204,x:-7.85,y:182.75,regX:1.9,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-47.7937,x:-46.4,y:50.2,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9984,scaleY:0.9984,skewX:155.1435,skewY:-24.8565,x:-102.1,y:114.25,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:120.7464,skewY:-59.2536,x:-109.1,y:118.55,regX:6.6,regY:-1.5}},{t:this.instance_2,p:{rotation:-98.223,x:-57.45,y:-23,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-1.7504,x:-5.7,y:-57.65,regY:9.2}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-2.0211,skewY:177.9789,x:-0.65,y:-79.5}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-13.2193,x:-26.8,y:89.8,regX:1.8}},{t:this.instance_14,p:{rotation:71.4679,x:48,regX:-31.2,y:-26.25,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.6,regY:-1.1,rotation:83.2452,x:70.15,y:40.3}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9984,scaleY:0.9984,skewX:-98.4605,skewY:81.5395,x:77.15,y:123.7,regX:-6}},{t:this.instance_11,p:{regY:3.3,scaleX:0.9984,scaleY:0.9984,skewX:-95.5833,skewY:84.4167,x:82,y:133.75,regX:-4.8}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:21.2188,x:15.8,y:92.6,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:9.1032,skewY:-170.8968,x:-20.85,y:182.45,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-21.8948,skewY:158.1052,x:-5.75,y:182.45,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-45.9555,x:-47.65,y:50.4,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9984,scaleY:0.9984,skewX:156.972,skewY:-23.028,x:-105.4,y:112.6,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:122.5853,skewY:-57.4147,x:-112.5,y:116.65,regX:6.6,regY:-1.5}},{t:this.instance_2,p:{rotation:-97.2386,x:-57.4,y:-22.9,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-1.7163,x:-5.7,y:-57.65,regY:9.2}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-1.8083,skewY:178.1917,x:-0.65,y:-79.45}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-14.323,x:-26.6,y:89.9,regX:1.8}},{t:this.instance_14,p:{rotation:71.0486,x:47.9,regX:-31.2,y:-26.25,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:81.9339,x:70.7,y:40.05}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-99.7846,skewY:80.2154,x:79.55,y:123.35,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-96.9189,skewY:83.0811,x:84.45,y:133.1,regX:-4.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:22.3445,x:15.85,y:92.65,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:10.2212,skewY:-169.7788,x:-22.65,y:181.75,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-23.0093,skewY:156.9907,x:-3.7,y:182.2,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-44.1164,x:-48.95,y:50.55,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9984,scaleY:0.9984,skewX:158.8022,skewY:-21.1978,x:-108.7,y:110.8,regY:-9}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:124.4237,skewY:-55.5763,x:-115.85,y:114.7,regX:6.6,regY:-1.5}},{t:this.instance_2,p:{rotation:-96.2554,x:-57.5,y:-22.95,regX:35.4,scaleX:0.9983,scaleY:0.9983}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-141.1,-365.2,255.7,669.8);


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
	this.instance = new lib.CachedBmp_2202();
	this.instance.setTransform(-83.05,-348,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(50));

	// flash0_ai
	this.instance_1 = new lib.CachedBmp_2203();
	this.instance_1.setTransform(-127.05,-370.85,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(50));

	// Armature_1
	this.instance_2 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_2.setTransform(-57.25,-22.95,0.9989,0.9989,-110.0609,0,0,35.8,0.6);

	this.instance_3 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_3.setTransform(-52.95,138.2,0.9987,0.9987,0,99.828,-80.172,6.9,-1);

	this.instance_4 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_4.setTransform(-54.9,129.75,0.9989,0.9989,0,87.6012,-92.3988,5.8,-8.3);

	this.instance_5 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_5.setTransform(-31.8,47.25,0.9988,0.9988,-74.011,0,0,44.2,0.1);

	this.instance_6 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_6.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_7 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_7.setTransform(-45.95,184.5,0.9986,0.9986,0,12.4089,-167.5911,3.4,-54.8);

	this.instance_8 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_8.setTransform(-5.6,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_9 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_9.setTransform(27.8,188.85,0.9982,0.9982,0,-11.6011,168.3989,2.5,-54.4);

	this.instance_10 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_10.setTransform(17.05,92.2,0.9982,0.9982,-6.9871,0,0,-0.5,1.4);

	this.instance_11 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_11.setTransform(22.95,130.65,0.9989,0.9989,0,-62.822,117.178,-5.2,3.2);

	this.instance_12 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_12.setTransform(26.15,119.8,0.9989,0.9989,0,-55.4302,124.5698,-6.5,8);

	this.instance_13 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_13.setTransform(61.5,47.15,0.9989,0.9989,116.1188,0,0,-40.1,-0.1);

	this.instance_14 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_14.setTransform(47.55,-26.2,0.9989,0.9989,80.0654,0,0,-31.9,-1);

	this.instance_15 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_15.setTransform(-23.15,91.2,0.9987,0.9987,11.8968,0,0,1.9,-45.8);

	this.instance_16 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_16.setTransform(4.3,-78.6,0.9993,0.9993,0,-1.7395,178.2605,0.4,53.6);

	this.instance_17 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_17.setTransform(-4.75,-57.9,0.9994,0.9994,-1.6878,0,0,-0.3,9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_17,p:{regX:-0.3,scaleX:0.9994,scaleY:0.9994,rotation:-1.6878,x:-4.75,y:-57.9}},{t:this.instance_16,p:{skewX:-1.7395,skewY:178.2605,x:4.3,y:-78.6,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.8,scaleX:0.9987,scaleY:0.9987,rotation:11.8968,y:91.2,x:-23.15}},{t:this.instance_14,p:{scaleX:0.9989,scaleY:0.9989,rotation:80.0654,x:47.55,y:-26.2,regY:-1}},{t:this.instance_13,p:{regX:-40.1,scaleX:0.9989,scaleY:0.9989,rotation:116.1188,x:61.5,y:47.15}},{t:this.instance_12,p:{scaleX:0.9989,scaleY:0.9989,skewX:-55.4302,skewY:124.5698,x:26.15,y:119.8,regY:8}},{t:this.instance_11,p:{regX:-5.2,regY:3.2,scaleX:0.9989,scaleY:0.9989,skewX:-62.822,skewY:117.178,x:22.95,y:130.65}},{t:this.instance_10,p:{rotation:-6.9871,x:17.05,y:92.2,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,skewX:-11.6011,skewY:168.3989,x:27.8,y:188.85,regY:-54.4,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.4,scaleX:0.9986,scaleY:0.9986,skewX:12.4089,skewY:-167.5911,x:-45.95,y:184.5,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-74.011,x:-31.8,y:47.25,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:87.6012,skewY:-92.3988,x:-54.9,y:129.75,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.9,regY:-1,skewX:99.828,skewY:-80.172,x:-52.95,y:138.2,scaleX:0.9987,scaleY:0.9987}},{t:this.instance_2,p:{regX:35.8,regY:0.6,scaleX:0.9989,scaleY:0.9989,rotation:-110.0609,x:-57.25,y:-22.95}}]}).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-1.7229,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-2.0381,skewY:177.9619,x:4.25,y:-78.65,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:11.198,y:91.25,x:-23.15}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:79.45,x:47.5,y:-26.25,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9988,scaleY:0.9988,rotation:115.0727,x:62.25,y:46.95}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-56.4748,skewY:123.5252,x:28.2,y:120.3,regY:8}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-63.8683,skewY:116.1317,x:25.3,y:131.25}},{t:this.instance_10,p:{rotation:-5.678,x:17.1,y:92.1,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-10.8233,skewY:169.1767,x:25.55,y:189.05,regY:-54.4,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:11.03,skewY:-168.97,x:-44.95,y:184.8,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-72.8825,x:-32.95,y:47.65,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:88.7308,skewY:-91.2692,x:-57.65,y:129.6,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1.1,skewX:100.9573,skewY:-79.0427,x:-55.8,y:138.35,scaleX:0.9987,scaleY:0.9987}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-109.1175,x:-57.3,y:-23.05}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-1.7588,x:-4.75,y:-57.85}},{t:this.instance_16,p:{skewX:-2.3367,skewY:177.6633,x:4.2,y:-78.75,regY:53.5,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.6,scaleX:0.9986,scaleY:0.9986,rotation:10.4983,y:91.3,x:-23.2}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:78.8351,x:47.5,y:-26.3,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:114.0266,x:62.95,y:46.8}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-57.521,skewY:122.479,x:30.25,y:120.65,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-64.9133,skewY:115.0867,x:27.65,y:131.8}},{t:this.instance_10,p:{rotation:-4.3687,x:17.1,y:92.1,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-10.0457,skewY:169.9543,x:23.35,y:189.45,regY:-54.2,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:9.6487,skewY:-170.3513,x:-43.85,y:185,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-71.7519,x:-34.1,y:48,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:89.8617,skewY:-90.1383,x:-60.4,y:129.55,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:102.0886,skewY:-77.9114,x:-58.9,y:138.2,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-108.1748,x:-57.3,y:-23.05}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-1.7947,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-2.6353,skewY:177.3647,x:4.15,y:-78.65,regY:53.6,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:9.7983,y:91.2,x:-23.3}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:78.2197,x:47.5,y:-26.3,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9988,scaleY:0.9988,rotation:112.9807,x:63.75,y:46.65}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-58.5668,skewY:121.4332,x:32.45,y:121.05,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-65.9595,skewY:114.0405,x:30,y:132.2}},{t:this.instance_10,p:{rotation:-3.06,x:17.1,y:92.1,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-9.2682,skewY:170.7318,x:21.1,y:189.45,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:8.2687,skewY:-171.7313,x:-42.7,y:185.25,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-70.6211,x:-35.3,y:48.35,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:90.9864,skewY:-89.0136,x:-63.15,y:129.3,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:103.2173,skewY:-76.7827,x:-61.85,y:138.1,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.6,scaleX:0.9988,scaleY:0.9988,rotation:-107.2319,x:-57.15,y:-23.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-1.8306,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-2.9331,skewY:177.0668,x:4.15,y:-78.65,regY:53.6,scaleX:0.9992,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:9.0986,y:91.2,x:-23.3}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:77.6056,x:47.5,y:-26.2,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:111.9348,x:64.5,y:46.45}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-59.6131,skewY:120.3869,x:34.6,y:121.5,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-67.0058,skewY:112.9942,x:32.4,y:132.6}},{t:this.instance_10,p:{rotation:-1.7503,x:17.1,y:92.05,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-8.4907,skewY:171.5093,x:18.95,y:189.5,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:6.8879,skewY:-173.1121,x:-41.55,y:185.55,regY:-54.7}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-69.4905,x:-36.5,y:48.7,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:92.1177,skewY:-87.8823,x:-66,y:129.15,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:104.3486,skewY:-75.6514,x:-64.8,y:137.85,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-106.2904,x:-57.25,y:-23.05}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-1.8665,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-3.2328,skewY:176.7672,x:4.15,y:-78.75,regY:53.5,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:8.399,y:91.15,x:-23.35}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:76.99,x:47.45,y:-26.3,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:110.8886,x:65.3,y:46.3}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-60.6597,skewY:119.3403,x:36.8,y:121.85,regY:8}},{t:this.instance_11,p:{regX:-5,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-68.0529,skewY:111.9471,x:34.65,y:133.1}},{t:this.instance_10,p:{rotation:-0.4414,x:17.15,y:92.05,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-7.7129,skewY:172.287,x:16.9,y:189.55,regY:-54.2,regX:2.4}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9986,scaleY:0.9986,skewX:5.5086,skewY:-174.4914,x:-40.5,y:185.65,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-68.3607,x:-37.6,y:49,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:93.2472,skewY:-86.7528,x:-68.55,y:128.85,regY:-8.4,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:105.4789,skewY:-74.5211,x:-67.75,y:137.6,scaleX:0.9987,scaleY:0.9987}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-105.346,x:-57.2,y:-23.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-1.9024,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-3.5317,skewY:176.4683,x:4.1,y:-78.8,regY:53.5,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:7.7005,y:91.1,x:-23.3}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:76.375,x:47.35,y:-26.25,regY:-0.9}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:109.8425,x:66.15,y:46.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-61.7056,skewY:118.2944,x:39,y:122.2,regY:8}},{t:this.instance_11,p:{regX:-5,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-69.0985,skewY:110.9015,x:37.1,y:133.5}},{t:this.instance_10,p:{rotation:0.8645,x:17.2,y:92.05,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-6.9359,skewY:173.0641,x:14.5,y:189.45,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9986,scaleY:0.9986,skewX:4.1292,skewY:-175.8708,x:-39.35,y:185.85,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-67.2306,x:-38.8,y:49.4,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:94.3779,skewY:-85.6221,x:-71.45,y:128.55,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:106.6088,skewY:-73.3912,x:-70.65,y:137.35,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-104.4031,x:-57.2,y:-23}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-1.9382,x:-4.75,y:-57.85}},{t:this.instance_16,p:{skewX:-3.8289,skewY:176.1711,x:4.1,y:-78.65,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:7.0013,y:91.1,x:-23.4}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:75.7589,x:47.45,y:-26.35,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:108.7975,x:66.85,y:45.9}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-62.7515,skewY:117.2485,x:41,y:122.4,regY:7.9}},{t:this.instance_11,p:{regX:-5.2,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-70.1446,skewY:109.8554,x:39.5,y:133.55}},{t:this.instance_10,p:{rotation:2.1727,x:17.2,y:92,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-6.159,skewY:173.841,x:12.35,y:189.2,regY:-54.4,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:2.7477,skewY:-177.2523,x:-38.25,y:186.05,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-66.1006,x:-40,y:49.65,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:95.5085,skewY:-84.4915,x:-74.2,y:128.15,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:107.7403,skewY:-72.2597,x:-73.65,y:137,scaleX:0.9987,scaleY:0.9987}},{t:this.instance_2,p:{regX:35.8,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-103.4594,x:-57.15,y:-22.95}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-1.9741,x:-4.75,y:-57.85}},{t:this.instance_16,p:{skewX:-4.1288,skewY:175.8712,x:4.05,y:-78.7,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:6.3015,y:91.1,x:-23.45}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:75.1441,x:47.45,y:-26.3,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:107.7504,x:67.65,y:45.65}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-63.7986,skewY:116.2014,x:43.15,y:122.75,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-71.1911,skewY:108.8089,x:41.75,y:133.95}},{t:this.instance_10,p:{rotation:3.482,x:17.2,y:91.95,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-5.3807,skewY:174.6192,x:10.1,y:189.3,regY:-54.2,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9986,scaleY:0.9986,skewX:1.3668,skewY:-178.6332,x:-37.1,y:186.15,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-64.9705,x:-41.15,y:49.95,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:96.6389,skewY:-83.3611,x:-76.95,y:127.8,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.9,regY:-1,skewX:108.8702,skewY:-71.1298,x:-76.45,y:136.5,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-102.5173,x:-57.15,y:-23.05}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-2.0109,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-4.4272,skewY:175.5728,x:4.1,y:-78.65,regY:53.6,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.6,scaleX:0.9986,scaleY:0.9986,rotation:5.6017,y:91.15,x:-23.45}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:74.53,x:47.45,y:-26.25,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:106.7045,x:68.35,y:45.5}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-64.8447,skewY:115.1553,x:45.4,y:122.85,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-72.236,skewY:107.764,x:44.15,y:134.15}},{t:this.instance_10,p:{rotation:4.7914,x:17.25,y:91.95,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-4.6035,skewY:175.3965,x:7.95,y:189.05,regY:-54.2,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:-0.0079,skewY:179.9921,x:-35.95,y:186.35,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-63.8397,x:-42.4,y:50.3,regX:44.1,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:97.7689,skewY:-82.2311,x:-79.65,y:127.25,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:109.9999,skewY:-70.0001,x:-79.45,y:136.1,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-101.5758,x:-57.2,y:-23.05}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-2.0468,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-4.7264,skewY:175.2736,x:4.1,y:-78.65,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:4.9017,y:91,x:-23.45}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:73.9141,x:47.3,y:-26.3,regY:-0.9}},{t:this.instance_13,p:{regX:-40,scaleX:0.9988,scaleY:0.9988,rotation:105.6577,x:69.15,y:45.25}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-65.8897,skewY:114.1103,x:47.5,y:123.05,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.2,scaleX:0.9988,scaleY:0.9988,skewX:-73.2826,skewY:106.7174,x:46.45,y:134.3}},{t:this.instance_10,p:{rotation:6.0997,x:17.2,y:91.95,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-3.8263,skewY:176.1737,x:5.7,y:188.6,regY:-54.4,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9986,scaleY:0.9986,skewX:-1.387,skewY:178.613,x:-34.8,y:186.45,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-62.7103,x:-43.6,y:50.35,regX:44.2,scaleX:0.9987,scaleY:0.9987}},{t:this.instance_4,p:{skewX:98.8995,skewY:-81.1005,x:-82.35,y:126.95,regY:-8.4,regX:5.7,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_3,p:{regX:6.9,regY:-1,skewX:111.1297,skewY:-68.8703,x:-82.25,y:135.45,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-100.632,x:-57.2,y:-23.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-2.0827,x:-4.75,y:-57.85}},{t:this.instance_16,p:{skewX:-5.0241,skewY:174.9759,x:4.15,y:-78.7,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:4.2027,y:91,x:-23.5}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:73.2994,x:47.45,y:-26.3,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:104.6128,x:69.9,y:45.05}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-66.9355,skewY:113.0645,x:49.7,y:123.25,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-74.3295,skewY:105.6705,x:48.95,y:134.5}},{t:this.instance_10,p:{rotation:7.4088,x:17.25,y:91.95,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-3.0487,skewY:176.9513,x:3.55,y:188.6,regY:-54.2,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:-2.7678,skewY:177.2322,x:-33.75,y:186.6,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-61.5787,x:-44.8,y:50.65,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:100.03,skewY:-79.97,x:-85.1,y:126.25,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:112.2602,skewY:-67.7398,x:-85.2,y:135.05,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-99.6894,x:-57.25,y:-23.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-2.1186,x:-4.75,y:-57.85}},{t:this.instance_16,p:{skewX:-5.3228,skewY:174.6772,x:4.1,y:-78.65,regY:53.6,scaleX:0.9992,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:3.5033,y:91,x:-23.55}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:72.6842,x:47.45,y:-26.3,regY:-1}},{t:this.instance_13,p:{regX:-40.1,scaleX:0.9989,scaleY:0.9989,rotation:103.5662,x:70.65,y:44.6}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-67.9829,skewY:112.0171,x:51.9,y:123.35,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-75.3755,skewY:104.6245,x:51.4,y:134.6}},{t:this.instance_10,p:{rotation:8.7197,x:17.3,y:91.9,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-2.2718,skewY:177.7282,x:1.3,y:188.1,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9986,skewX:-4.1476,skewY:175.8524,x:-32.6,y:186.65,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-60.4483,x:-46,y:50.8,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:101.1601,skewY:-78.8399,x:-87.85,y:125.55,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:113.3909,skewY:-66.6091,x:-88.05,y:134.4,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-98.746,x:-57.15,y:-23.05}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-2.1545,x:-4.7,y:-57.85}},{t:this.instance_16,p:{skewX:-5.6226,skewY:174.3774,x:4.1,y:-78.65,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:2.8036,y:90.95,x:-23.55}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:72.0688,x:47.45,y:-26.25,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:102.5195,x:71.4,y:44.4}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-69.0282,skewY:110.9718,x:54.1,y:123.35,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-76.4213,skewY:103.5787,x:53.8,y:134.7}},{t:this.instance_10,p:{rotation:10.0275,x:17.3,y:91.9,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,skewX:-1.4936,skewY:178.5064,x:-0.8,y:187.55,regY:-54.4,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:-5.529,skewY:174.471,x:-31.4,y:186.85,regY:-54.7}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-59.3186,x:-47.15,y:50.95,regX:44.2,scaleX:0.9987,scaleY:0.9987}},{t:this.instance_4,p:{skewX:102.2901,skewY:-77.7099,x:-90.5,y:125,regY:-8.3,regX:5.7,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:114.5213,skewY:-65.4787,x:-90.95,y:133.7,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-97.8031,x:-57.2,y:-23}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-2.1904,x:-4.7,y:-57.85}},{t:this.instance_16,p:{skewX:-5.9206,skewY:174.0794,x:4.1,y:-78.7,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:2.1034,y:90.9,x:-23.65}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:71.4549,x:47.45,y:-26.3,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:101.4732,x:72.15,y:44.15}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-70.0743,skewY:109.9257,x:56.25,y:123.45,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-77.4682,skewY:102.5318,x:56.15,y:134.75}},{t:this.instance_10,p:{rotation:11.336,x:17.35,y:91.9,scaleX:0.9981,scaleY:0.9981,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9982,skewX:-0.7165,skewY:179.2835,x:-3,y:187.25,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:-6.91,skewY:173.09,x:-30.3,y:186.8,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-58.1882,x:-48.45,y:51.1,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:103.4212,skewY:-76.5788,x:-93.2,y:124.2,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1.1,skewX:115.6512,skewY:-64.3488,x:-93.7,y:133.1,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-96.8604,x:-57.2,y:-23}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-2.2263,x:-4.8,y:-57.8}},{t:this.instance_16,p:{skewX:-6.2189,skewY:173.7811,x:4.05,y:-78.65,regY:53.6,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.6,scaleX:0.9986,scaleY:0.9986,rotation:1.4044,y:91.05,x:-23.7}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:70.8385,x:47.45,y:-26.35,regY:-1}},{t:this.instance_13,p:{regX:-40.1,scaleX:0.9989,scaleY:0.9989,rotation:100.4276,x:72.95,y:43.85}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-71.1199,skewY:108.8801,x:58.5,y:123.45,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-78.5134,skewY:101.4866,x:58.6,y:134.75}},{t:this.instance_10,p:{rotation:12.6461,x:17.3,y:91.9,scaleX:0.9981,scaleY:0.9981,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:0.0561,skewY:-179.9439,x:-5.05,y:186.75,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:-8.2882,skewY:171.7118,x:-29.2,y:186.9,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-57.0577,x:-49.65,y:51.3,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:104.5504,skewY:-75.4496,x:-95.8,y:123.45,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:116.782,skewY:-63.218,x:-96.6,y:132.2,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-95.918,x:-57.15,y:-23.05}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-2.2622,x:-4.8,y:-57.8}},{t:this.instance_16,p:{skewX:-6.5183,skewY:173.4817,x:4.1,y:-78.65,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.8,scaleX:0.9986,scaleY:0.9986,rotation:0.7048,y:90.8,x:-23.7}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:70.2244,x:47.45,y:-26.4,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:99.381,x:73.7,y:43.65}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-72.166,skewY:107.834,x:60.75,y:123.35,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-79.5592,skewY:100.4408,x:61,y:134.75}},{t:this.instance_10,p:{rotation:13.9545,x:17.35,y:91.85,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:0.8339,skewY:-179.1661,x:-7.15,y:186.1,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:-9.6682,skewY:170.3318,x:-28,y:186.9,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-55.9273,x:-50.8,y:51.35,regX:44.2,scaleX:0.9987,scaleY:0.9987}},{t:this.instance_4,p:{skewX:105.6802,skewY:-74.3198,x:-98.45,y:122.6,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.9,regY:-1.1,skewX:117.912,skewY:-62.088,x:-99.25,y:131.3,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-94.9745,x:-57.2,y:-23.05}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-2.2981,x:-4.8,y:-57.8}},{t:this.instance_16,p:{skewX:-6.8169,skewY:173.1831,x:4.05,y:-78.6,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:0.0044,y:90.85,x:-23.75}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:69.6097,x:47.5,y:-26.35,regY:-1}},{t:this.instance_13,p:{regX:-40.1,scaleX:0.9989,scaleY:0.9989,rotation:98.3357,x:74.45,y:43.25}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-73.2122,skewY:106.7878,x:63.05,y:123.35,regY:8}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-80.606,skewY:99.394,x:63.45,y:134.65}},{t:this.instance_10,p:{rotation:15.2653,x:17.4,y:91.75,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,skewX:1.611,skewY:-178.389,x:-9.3,y:185.55,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:-11.0498,skewY:168.9502,x:-26.95,y:186.95,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-54.797,x:-52.05,y:51.5,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:106.8106,skewY:-73.1894,x:-101.05,y:121.8,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:119.043,skewY:-60.957,x:-102.2,y:130.5,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-94.0315,x:-57.15,y:-23}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-2.3331,x:-4.8,y:-57.8}},{t:this.instance_16,p:{skewX:-7.1156,skewY:172.8844,x:4.1,y:-78.65,regY:53.6,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:-0.6899,y:90.85,x:-23.8}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:68.9944,x:47.5,y:-26.3,regY:-1}},{t:this.instance_13,p:{regX:-40.1,scaleX:0.9989,scaleY:0.9989,rotation:97.2887,x:75.25,y:42.9}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-74.2588,skewY:105.7412,x:65.1,y:123.2,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-81.6525,skewY:98.3475,x:65.85,y:134.55}},{t:this.instance_10,p:{rotation:16.5742,x:17.4,y:91.75,scaleX:0.9981,scaleY:0.9981,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:2.3893,skewY:-177.6107,x:-11.45,y:184.95,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.4,scaleX:0.9985,scaleY:0.9985,skewX:-12.4287,skewY:167.5713,x:-25.65,y:186.95,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-53.6663,x:-53.3,y:51.5,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:107.9414,skewY:-72.0586,x:-103.65,y:120.85,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:120.1729,skewY:-59.8271,x:-105.05,y:129.5,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-93.0896,x:-57.15,y:-23.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-2.369,x:-4.75,y:-57.8}},{t:this.instance_16,p:{skewX:-7.4148,skewY:172.5852,x:4,y:-78.65,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:-1.3895,y:90.85,x:-23.8}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:68.3792,x:47.5,y:-26.3,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:96.2441,x:75.9,y:42.75}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-75.3039,skewY:104.6961,x:67.35,y:123.05,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-82.6986,skewY:97.3014,x:68.25,y:134.35}},{t:this.instance_10,p:{rotation:17.884,x:17.45,y:91.75,scaleX:0.9981,scaleY:0.9981,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:3.1663,skewY:-176.8337,x:-13.55,y:184.2,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:-13.8086,skewY:166.1914,x:-24.6,y:186.95,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-52.5359,x:-54.55,y:51.55,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:109.0716,skewY:-70.9284,x:-106.1,y:119.95,regY:-8.4,regX:5.8,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:121.3035,skewY:-58.6965,x:-107.7,y:128.5,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-92.1468,x:-57.15,y:-23.05}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-2.4049,x:-4.7,y:-57.8}},{t:this.instance_16,p:{skewX:-7.7122,skewY:172.2878,x:4,y:-78.65,regY:53.6,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:-2.0885,y:90.85,x:-23.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:67.7622,x:47.4,y:-26.4,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:95.1966,x:76.65,y:42.4}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-76.3503,skewY:103.6497,x:69.6,y:122.9,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-83.7439,skewY:96.2561,x:70.7,y:134.2}},{t:this.instance_10,p:{rotation:19.1931,x:17.5,y:91.75,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:3.9439,skewY:-176.0561,x:-15.6,y:183.6,regY:-54.2,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.4,scaleX:0.9985,scaleY:0.9985,skewX:-15.1896,skewY:164.8104,x:-23.45,y:186.85,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-51.4068,x:-55.75,y:51.6,regX:44.2,scaleX:0.9987,scaleY:0.9987}},{t:this.instance_4,p:{skewX:110.2022,skewY:-69.7978,x:-108.7,y:118.95,regY:-8.4,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:122.4332,skewY:-57.5668,x:-110.45,y:127.5,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-91.2028,x:-57.2,y:-23.05}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-2.4408,x:-4.7,y:-57.8}},{t:this.instance_16,p:{skewX:-8.0107,skewY:171.9893,x:3.95,y:-78.7,regY:53.6,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.8,scaleX:0.9986,scaleY:0.9986,rotation:-2.7887,y:90.65,x:-23.95}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:67.1497,x:47.45,y:-26.35,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:94.1507,x:77.35,y:42.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-77.3975,skewY:102.6025,x:71.8,y:122.7,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-84.7891,skewY:95.2109,x:73.1,y:134}},{t:this.instance_10,p:{rotation:20.5019,x:17.45,y:91.7,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:4.7213,skewY:-175.2787,x:-17.7,y:182.7,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:-16.5698,skewY:163.4299,x:-22.3,y:186.9,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-50.2756,x:-57,y:51.6,regX:44.2,scaleX:0.9987,scaleY:0.9987}},{t:this.instance_4,p:{skewX:111.3325,skewY:-68.6675,x:-111.4,y:117.85,regY:-8.3,regX:5.8,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:123.5636,skewY:-56.4364,x:-113.15,y:126.4,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-90.26,x:-57.1,y:-23.05}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-2.4767,x:-4.75,y:-57.8}},{t:this.instance_16,p:{skewX:-8.3103,skewY:171.6897,x:4.05,y:-78.7,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:-3.4875,y:90.8,x:-24}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:66.5336,x:47.45,y:-26.4,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:93.1052,x:78.1,y:41.8}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-78.4422,skewY:101.5578,x:73.95,y:122.55,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-85.836,skewY:94.164,x:75.45,y:133.7}},{t:this.instance_10,p:{rotation:21.8108,x:17.65,y:91.75,scaleX:0.9981,scaleY:0.9981,regX:-0.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:5.4987,skewY:-174.5013,x:-19.7,y:181.85,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:-17.9496,skewY:162.0504,x:-21.15,y:186.85,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-49.1452,x:-58.2,y:51.55,regX:44.2,scaleX:0.9987,scaleY:0.9987}},{t:this.instance_4,p:{skewX:112.4625,skewY:-67.5375,x:-113.85,y:116.75,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:124.6932,skewY:-55.3068,x:-115.9,y:125.2,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-89.3216,x:-57.15,y:-23.05}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-2.5126,x:-4.75,y:-57.8}},{t:this.instance_16,p:{skewX:-8.6092,skewY:171.3907,x:3.95,y:-78.7,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:-4.1877,y:90.75,x:-24}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:65.9179,x:47.4,y:-26.4,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:92.059,x:78.9,y:41.45}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-79.4892,skewY:100.5108,x:76.15,y:122.25,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.4,scaleX:0.9988,scaleY:0.9988,skewX:-86.8824,skewY:93.1176,x:78.05,y:133.4}},{t:this.instance_10,p:{rotation:23.1206,x:17.5,y:91.65,scaleX:0.9981,scaleY:0.9981,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:6.2755,skewY:-173.7245,x:-21.8,y:181.1,regY:-54.2,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:-19.3301,skewY:160.6699,x:-20.15,y:186.75,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-48.0151,x:-59.45,y:51.55,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:113.5935,skewY:-66.4065,x:-116.35,y:115.65,regY:-8.3,regX:5.8,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:125.8244,skewY:-54.1756,x:-118.6,y:124.15,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-88.3796,x:-57.15,y:-23.05}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-2.5494,x:-4.75,y:-57.8}},{t:this.instance_16,p:{skewX:-8.9059,skewY:171.0941,x:3.95,y:-78.7,regY:53.6,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.6,scaleX:0.9986,scaleY:0.9986,rotation:-4.8869,y:90.9,x:-24}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:65.3037,x:47.4,y:-26.3,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:91.0127,x:79.6,y:41.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-80.5352,skewY:99.4648,x:78.4,y:121.9,regY:7.9}},{t:this.instance_11,p:{regX:-5.2,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-87.9277,skewY:92.0723,x:80.3,y:132.9}},{t:this.instance_10,p:{rotation:24.4294,x:17.45,y:91.65,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:7.0541,skewY:-172.9458,x:-23.8,y:180,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:-20.7092,skewY:159.2908,x:-18.95,y:186.65,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-46.8851,x:-60.7,y:51.55,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:114.7234,skewY:-65.2766,x:-118.75,y:114.5,regY:-8.4,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.9,regY:-1,skewX:126.9538,skewY:-53.0462,x:-121.15,y:122.8,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-87.4363,x:-57.15,y:-23.05}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-2.5152,x:-4.75,y:-57.8}},{t:this.instance_16,p:{skewX:-8.6236,skewY:171.3764,x:3.95,y:-78.7,regY:53.6,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:-4.2106,y:90.8,x:-23.95}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:65.9006,x:47.4,y:-26.35,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:92.0249,x:78.85,y:41.5}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-79.5175,skewY:100.4825,x:76.25,y:122.2,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-86.9139,skewY:93.0861,x:77.95,y:133.4}},{t:this.instance_10,p:{rotation:23.1759,x:17.45,y:91.65,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:6.3089,skewY:-173.6911,x:-21.9,y:181,regY:-54.2,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:-19.3736,skewY:160.6264,x:-20.15,y:186.75,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-47.9656,x:-59.55,y:51.6,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:113.6449,skewY:-66.3551,x:-116.5,y:115.6,regY:-8.3,regX:5.8,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:125.8671,skewY:-54.1329,x:-118.65,y:124.05,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-88.3393,x:-57.1,y:-23.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-2.4819,x:-4.75,y:-57.8}},{t:this.instance_16,p:{skewX:-8.3386,skewY:171.6614,x:3.95,y:-78.7,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:-3.5331,y:90.8,x:-23.95}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:66.4975,x:47.4,y:-26.35,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:93.0368,x:78.15,y:41.75}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-78.4994,skewY:101.5006,x:74.1,y:122.45,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-85.8983,skewY:94.1017,x:75.65,y:133.7}},{t:this.instance_10,p:{rotation:21.9245,x:17.65,y:91.7,scaleX:0.9982,scaleY:0.9982,regX:-0.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:5.5648,skewY:-174.4352,x:-19.95,y:181.75,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:-18.0371,skewY:161.9629,x:-21.05,y:186.8,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-49.0471,x:-58.3,y:51.55,regX:44.2,scaleX:0.9987,scaleY:0.9987}},{t:this.instance_4,p:{skewX:112.5649,skewY:-67.4351,x:-114.15,y:116.7,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:124.7806,skewY:-55.2194,x:-116.2,y:125.15,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-89.242,x:-57.15,y:-23}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-2.4487,x:-4.7,y:-57.8}},{t:this.instance_16,p:{skewX:-8.0557,skewY:171.9443,x:3.95,y:-78.7,regY:53.6,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.8,scaleX:0.9986,scaleY:0.9986,rotation:-2.8562,y:90.65,x:-23.95}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:67.0928,x:47.35,y:-26.35,regY:-0.9}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:94.048,x:77.4,y:42.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-77.4825,skewY:102.5175,x:72,y:122.65,regY:7.9}},{t:this.instance_11,p:{regX:-5,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-84.8832,skewY:95.1168,x:73.35,y:134.05}},{t:this.instance_10,p:{rotation:20.6727,x:17.5,y:91.65,scaleX:0.9981,scaleY:0.9981,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:4.8207,skewY:-175.1793,x:-18,y:182.6,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:-16.7008,skewY:163.2992,x:-22.2,y:186.85,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-50.1289,x:-57.15,y:51.55,regX:44.2,scaleX:0.9987,scaleY:0.9987}},{t:this.instance_4,p:{skewX:111.4874,skewY:-68.5126,x:-111.7,y:117.75,regY:-8.3,regX:5.8,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:123.6935,skewY:-56.3065,x:-113.5,y:126.25,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-90.14,x:-57.15,y:-23.05}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-2.4154,x:-4.7,y:-57.8}},{t:this.instance_16,p:{skewX:-7.7705,skewY:172.2295,x:4,y:-78.7,regY:53.6,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:-2.1797,y:90.8,x:-23.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:67.69,x:47.4,y:-26.4,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:95.0604,x:76.75,y:42.4}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-76.4648,skewY:103.5352,x:69.8,y:122.9,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.4,scaleX:0.9988,scaleY:0.9988,skewX:-83.8681,skewY:96.1319,x:71.1,y:134.2}},{t:this.instance_10,p:{rotation:19.4205,x:17.55,y:91.75,scaleX:0.9982,scaleY:0.9982,regX:-0.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:4.0764,skewY:-175.9236,x:-16,y:183.45,regY:-54.2,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:-15.3638,skewY:164.6362,x:-23.3,y:186.9,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-51.2106,x:-55.9,y:51.6,regX:44.2,scaleX:0.9987,scaleY:0.9987}},{t:this.instance_4,p:{skewX:110.4074,skewY:-69.5926,x:-109.3,y:118.75,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:122.6076,skewY:-57.3924,x:-110.95,y:127.3,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-91.0434,x:-57.15,y:-23.05}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-2.3821,x:-4.8,y:-57.8}},{t:this.instance_16,p:{skewX:-7.488,skewY:172.512,x:4.05,y:-78.7,regY:53.6,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:-1.5025,y:90.85,x:-23.85}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:68.286,x:47.45,y:-26.3,regY:-1}},{t:this.instance_13,p:{regX:-40.1,scaleX:0.9989,scaleY:0.9989,rotation:96.0725,x:76.05,y:42.6}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-75.447,skewY:104.553,x:67.8,y:123.05,regY:8}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-82.8521,skewY:97.1479,x:68.6,y:134.35}},{t:this.instance_10,p:{rotation:18.1677,x:17.45,y:91.75,scaleX:0.9981,scaleY:0.9981,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:3.3321,skewY:-176.6679,x:-13.95,y:184,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:-14.028,skewY:165.972,x:-24.4,y:186.9,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-52.2913,x:-54.75,y:51.6,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:109.3287,skewY:-70.6713,x:-106.8,y:119.7,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.9,regY:-1,skewX:121.52,skewY:-58.48,x:-108.25,y:128.25,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-91.947,x:-57.15,y:-23}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-2.3489,x:-4.8,y:-57.8}},{t:this.instance_16,p:{skewX:-7.2047,skewY:172.7953,x:4.05,y:-78.65,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.8,scaleX:0.9986,scaleY:0.9986,rotation:-0.8247,y:90.75,x:-23.85}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:68.8819,x:47.45,y:-26.25,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9988,scaleY:0.9988,rotation:97.0832,x:75.3,y:43}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-74.4297,skewY:105.5703,x:65.55,y:123.25,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.2,scaleX:0.9988,scaleY:0.9988,skewX:-81.8362,skewY:98.1638,x:66.2,y:134.5}},{t:this.instance_10,p:{rotation:16.9153,x:17.4,y:91.8,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:2.5874,skewY:-177.4126,x:-12,y:184.75,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.4,scaleX:0.9985,scaleY:0.9985,skewX:-12.6913,skewY:167.3087,x:-25.4,y:186.85,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-53.3715,x:-53.6,y:51.5,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:108.2501,skewY:-71.7499,x:-104.35,y:120.65,regY:-8.3,regX:5.8,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:120.4327,skewY:-59.5673,x:-105.7,y:129.3,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.8,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-92.8503,x:-57.15,y:-22.95}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-2.3165,x:-4.75,y:-57.8}},{t:this.instance_16,p:{skewX:-6.9191,skewY:173.0809,x:4.1,y:-78.7,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:-0.1488,y:90.85,x:-23.8}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:69.4787,x:47.45,y:-26.35,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:98.0961,x:74.6,y:43.25}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-73.4124,skewY:106.5876,x:63.45,y:123.35,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-80.8197,skewY:99.1803,x:63.95,y:134.65}},{t:this.instance_10,p:{rotation:15.6635,x:17.35,y:91.75,scaleX:0.9981,scaleY:0.9981,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:1.8441,skewY:-178.1559,x:-9.95,y:185.35,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:-11.3558,skewY:168.6442,x:-26.6,y:186.95,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-54.4523,x:-52.45,y:51.45,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:107.1711,skewY:-72.8289,x:-101.85,y:121.5,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:119.3479,skewY:-60.6521,x:-103.05,y:130.2,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-93.7533,x:-57.2,y:-23.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-2.2832,x:-4.75,y:-57.8}},{t:this.instance_16,p:{skewX:-6.6355,skewY:173.3645,x:4.05,y:-78.65,regY:53.6,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.8,scaleX:0.9986,scaleY:0.9986,rotation:0.5244,y:90.8,x:-23.75}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:70.0746,x:47.45,y:-26.35,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:99.1079,x:73.8,y:43.6}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-72.3941,skewY:107.6059,x:61.25,y:123.35,regY:7.9}},{t:this.instance_11,p:{regX:-5,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-79.8058,skewY:100.1942,x:61.65,y:134.85}},{t:this.instance_10,p:{rotation:14.4108,x:17.3,y:91.85,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:1.0993,skewY:-178.9007,x:-7.95,y:185.95,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9986,scaleY:0.9986,skewX:-10.0182,skewY:169.9818,x:-27.75,y:186.9,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-55.534,x:-51.2,y:51.35,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:106.0933,skewY:-73.9067,x:-99.35,y:122.35,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.9,regY:-1,skewX:118.2598,skewY:-61.7402,x:-100.35,y:131,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-94.6556,x:-57.15,y:-23.05}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-2.2499,x:-4.8,y:-57.8}},{t:this.instance_16,p:{skewX:-6.3518,skewY:173.6481,x:4.1,y:-78.65,regY:53.6,scaleX:0.9992,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:1.2013,y:90.9,x:-23.7}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:70.6729,x:47.45,y:-26.35,regY:-1}},{t:this.instance_13,p:{regX:-40.1,scaleX:0.9989,scaleY:0.9989,rotation:100.1198,x:73.15,y:43.75}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-71.3771,skewY:108.6229,x:59.15,y:123.4,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.4,scaleX:0.9988,scaleY:0.9988,skewX:-78.7895,skewY:101.2105,x:59.45,y:134.75}},{t:this.instance_10,p:{rotation:13.1591,x:17.4,y:91.85,scaleX:0.9981,scaleY:0.9981,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:0.3547,skewY:-179.6453,x:-5.85,y:186.55,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:-8.6811,skewY:171.3189,x:-28.85,y:186.9,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-56.6151,x:-50.1,y:51.3,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:105.013,skewY:-74.987,x:-96.8,y:123.15,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:117.1727,skewY:-62.8273,x:-97.65,y:131.85,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-95.559,x:-57.2,y:-23.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-2.2166,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-6.0683,skewY:173.9316,x:4.05,y:-78.65,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:1.8774,y:90.95,x:-23.65}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:71.2683,x:47.4,y:-26.3,regY:-0.9}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:101.1316,x:72.35,y:44.15}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-70.359,skewY:109.641,x:57.15,y:123.45,regY:8}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-77.7745,skewY:102.2255,x:56.95,y:134.75}},{t:this.instance_10,p:{rotation:11.9055,x:17.35,y:91.85,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-0.3854,skewY:179.6146,x:-3.85,y:187,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:-7.3459,skewY:172.6541,x:-29.95,y:186.95,regY:-54.7}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-57.6966,x:-48.95,y:51.2,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:103.9337,skewY:-76.0663,x:-94.15,y:123.9,regY:-8.4,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:116.0862,skewY:-63.9138,x:-94.95,y:132.65,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-96.4621,x:-57.2,y:-23.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-2.1834,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-5.7843,skewY:174.2157,x:4.1,y:-78.65,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:2.5547,y:90.95,x:-23.6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:71.8645,x:47.45,y:-26.35,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:102.144,x:71.7,y:44.4}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-69.3418,skewY:110.6582,x:55,y:123.4,regY:8}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-76.7597,skewY:103.2403,x:54.6,y:134.75}},{t:this.instance_10,p:{rotation:10.6543,x:17.35,y:91.85,scaleX:0.9981,scaleY:0.9981,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,skewX:-1.1291,skewY:178.8709,x:-1.8,y:187.4,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:-6.0103,skewY:173.9897,x:-31.05,y:186.75,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-58.7773,x:-47.8,y:51,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:102.8559,skewY:-77.1441,x:-91.6,y:124.55,regY:-8.4,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:115.0003,skewY:-64.9997,x:-92.3,y:133.35,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.8,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-97.365,x:-57.2,y:-22.95}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-2.1501,x:-4.7,y:-57.85}},{t:this.instance_16,p:{skewX:-5.4995,skewY:174.5005,x:4.1,y:-78.7,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:3.2306,y:90.95,x:-23.6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:72.4613,x:47.45,y:-26.35,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9988,scaleY:0.9988,rotation:103.1544,x:70.95,y:44.65}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-68.3242,skewY:111.6758,x:52.8,y:123.35,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-75.7449,skewY:104.2551,x:52.3,y:134.65}},{t:this.instance_10,p:{rotation:9.401,x:17.3,y:91.9,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-1.8739,skewY:178.1261,x:0.2,y:188,regY:-54.2,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:-4.6736,skewY:175.3264,x:-32.15,y:186.7,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-59.8597,x:-46.65,y:50.9,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:101.7763,skewY:-78.2237,x:-89.25,y:125.35,regY:-8.3,regX:5.7,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:113.9132,skewY:-66.0868,x:-89.55,y:134.05,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-98.268,x:-57.2,y:-23}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-2.1168,x:-4.75,y:-57.85}},{t:this.instance_16,p:{skewX:-5.2157,skewY:174.7843,x:4.1,y:-78.65,regY:53.6,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:3.9078,y:91.05,x:-23.6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:73.058,x:47.45,y:-26.3,regY:-1}},{t:this.instance_13,p:{regX:-40.1,scaleX:0.9989,scaleY:0.9989,rotation:104.1666,x:70.2,y:44.7}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-67.3067,skewY:112.6933,x:50.65,y:123.25,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.4,scaleX:0.9988,scaleY:0.9988,skewX:-74.7283,skewY:105.2717,x:50.1,y:134.65}},{t:this.instance_10,p:{rotation:8.1495,x:17.25,y:91.95,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-2.6182,skewY:177.3818,x:2.3,y:188.2,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:-3.336,skewY:176.664,x:-33.25,y:186.55,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-60.9401,x:-45.45,y:50.75,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:100.6973,skewY:-79.3027,x:-86.65,y:125.85,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:112.8266,skewY:-67.1734,x:-86.85,y:134.7,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-99.1712,x:-57.15,y:-23.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-2.0836,x:-4.75,y:-57.85}},{t:this.instance_16,p:{skewX:-4.9327,skewY:175.0672,x:4.15,y:-78.7,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:4.5846,y:91,x:-23.55}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:73.6542,x:47.45,y:-26.25,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:105.1799,x:69.5,y:45.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-66.2882,skewY:113.7118,x:48.45,y:123.1,regY:7.9}},{t:this.instance_11,p:{regX:-5.2,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-73.7135,skewY:106.2865,x:47.65,y:134.3}},{t:this.instance_10,p:{rotation:6.8967,x:17.3,y:91.95,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-3.3619,skewY:176.6381,x:4.4,y:188.5,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9986,skewX:-1.9993,skewY:178.0007,x:-34.35,y:186.45,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-62.0212,x:-44.35,y:50.5,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:99.6186,skewY:-80.3814,x:-84.05,y:126.45,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:111.7398,skewY:-68.2602,x:-84.1,y:135.2,scaleX:0.9987,scaleY:0.9987}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-100.0732,x:-57.15,y:-23.05}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-2.0503,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-4.6482,skewY:175.3517,x:4.05,y:-78.65,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.8,scaleX:0.9986,scaleY:0.9986,rotation:5.2622,y:90.95,x:-23.5}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:74.2501,x:47.45,y:-26.3,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:106.1919,x:68.75,y:45.4}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-65.2704,skewY:114.7296,x:46.35,y:123,regY:7.9}},{t:this.instance_11,p:{regX:-5,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-72.6983,skewY:107.3017,x:45.25,y:134.4}},{t:this.instance_10,p:{rotation:5.6446,x:17.25,y:92,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-4.1063,skewY:175.8937,x:6.5,y:188.9,regY:-54.2,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:-0.6637,skewY:179.3363,x:-35.4,y:186.5,regY:-54.7}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-63.1022,x:-43.2,y:50.35,regX:44.1,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:98.5392,skewY:-81.4608,x:-81.45,y:126.95,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:110.6533,skewY:-69.3467,x:-81.25,y:135.8,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.6,scaleX:0.9988,scaleY:0.9988,rotation:-100.9769,x:-57.1,y:-23.05}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-2.017,x:-4.75,y:-57.85}},{t:this.instance_16,p:{skewX:-4.3639,skewY:175.6361,x:4.1,y:-78.65,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:5.9386,y:91.05,x:-23.45}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:74.8485,x:47.3,y:-26.3,regY:-0.9}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:107.2032,x:67.95,y:45.6}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-64.2535,skewY:115.7465,x:44.3,y:122.8,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-71.683,skewY:108.317,x:43,y:134.05}},{t:this.instance_10,p:{rotation:4.3925,x:17.25,y:91.95,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-4.8505,skewY:175.1495,x:8.6,y:189,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9986,scaleY:0.9986,skewX:0.6672,skewY:-179.3328,x:-36.5,y:186.25,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-64.1842,x:-42.05,y:50.1,regX:44.2,scaleX:0.9987,scaleY:0.9987}},{t:this.instance_4,p:{skewX:97.4599,skewY:-82.5401,x:-78.85,y:127.45,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:109.5657,skewY:-70.4343,x:-78.5,y:136.25,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.6,scaleX:0.9988,scaleY:0.9988,rotation:-101.8797,x:-57.1,y:-23}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-1.9838,x:-4.75,y:-57.85}},{t:this.instance_16,p:{skewX:-4.0798,skewY:175.9202,x:4.1,y:-78.8,regY:53.5,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.8,scaleX:0.9986,scaleY:0.9986,rotation:6.6159,y:90.95,x:-23.45}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:75.4445,x:47.45,y:-26.3,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9988,scaleY:0.9988,rotation:108.2152,x:67.3,y:45.75}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-63.2361,skewY:116.7639,x:42.15,y:122.6,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-70.6662,skewY:109.3338,x:40.65,y:133.85}},{t:this.instance_10,p:{rotation:3.1398,x:17.2,y:91.95,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-5.5955,skewY:174.4045,x:10.7,y:189.25,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9986,skewX:2.0036,skewY:-177.9963,x:-37.6,y:186.1,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-65.2646,x:-40.9,y:49.9,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:96.3816,skewY:-83.6184,x:-76.15,y:127.95,regY:-8.4,regX:5.7,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:108.4784,skewY:-71.5216,x:-75.75,y:136.6,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.8,regY:0.6,scaleX:0.9988,scaleY:0.9988,rotation:-102.7821,x:-57.1,y:-23}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-1.9496,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-3.7947,skewY:176.2053,x:4.15,y:-78.65,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:7.2926,y:91.15,x:-23.35}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:76.0398,x:47.35,y:-26.25,regY:-0.9}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:109.2271,x:66.5,y:45.95}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-62.219,skewY:117.781,x:40.15,y:122.3,regY:8}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-69.6514,skewY:110.3486,x:38.35,y:133.5}},{t:this.instance_10,p:{rotation:1.8869,x:17.2,y:92,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-6.3387,skewY:173.6612,x:12.8,y:189.35,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9986,scaleY:0.9986,skewX:3.3412,skewY:-176.6588,x:-38.7,y:185.95,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-66.3464,x:-39.75,y:49.55,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:95.3028,skewY:-84.6972,x:-73.6,y:128.3,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:107.3917,skewY:-72.6083,x:-72.9,y:137.05,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.6,scaleX:0.9988,scaleY:0.9988,rotation:-103.6857,x:-57.1,y:-23.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-1.9164,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-3.5124,skewY:176.4876,x:4.1,y:-78.8,regY:53.5,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.8,scaleX:0.9986,scaleY:0.9986,rotation:7.9693,y:91,x:-23.25}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:76.6367,x:47.45,y:-26.3,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:110.2388,x:65.75,y:46.15}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-61.2008,skewY:118.7992,x:37.95,y:122,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.2,scaleX:0.9988,scaleY:0.9988,skewX:-68.6363,skewY:111.3637,x:36.05,y:133.2}},{t:this.instance_10,p:{rotation:0.6342,x:17.2,y:92.1,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-7.0833,skewY:172.9167,x:14.85,y:189.45,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:4.678,skewY:-175.322,x:-39.75,y:185.75,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-67.4261,x:-38.55,y:49.35,regX:44.2,scaleX:0.9987,scaleY:0.9987}},{t:this.instance_4,p:{skewX:94.2235,skewY:-85.7765,x:-70.95,y:128.6,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:106.3058,skewY:-73.6942,x:-70.15,y:137.4,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.6,scaleX:0.9988,scaleY:0.9988,rotation:-104.5884,x:-57.1,y:-23.05}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-1.8831,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-3.2285,skewY:176.7715,x:4.1,y:-78.8,regY:53.5,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.6,scaleX:0.9986,scaleY:0.9986,rotation:8.6461,y:91.25,x:-23.3}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:77.2334,x:47.45,y:-26.25,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:111.2515,x:65.05,y:46.3}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-60.1838,skewY:119.8162,x:35.9,y:121.7,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-67.6206,skewY:112.3794,x:33.85,y:132.9}},{t:this.instance_10,p:{rotation:-0.6122,x:17.15,y:92.05,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-7.8279,skewY:172.1721,x:17.05,y:189.5,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9986,scaleY:0.9986,skewX:6.0146,skewY:-173.9854,x:-40.9,y:185.75,regY:-54.7}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-68.5076,x:-37.45,y:49.05,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:93.1455,skewY:-86.8545,x:-68.3,y:128.9,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:105.218,skewY:-74.782,x:-67.35,y:137.65,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.6,scaleX:0.9988,scaleY:0.9988,rotation:-105.493,x:-57.2,y:-23.05}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-1.8498,x:-4.75,y:-57.85}},{t:this.instance_16,p:{skewX:-2.9436,skewY:177.0564,x:4.15,y:-78.65,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:9.3231,y:91.15,x:-23.3}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:77.8295,x:47.5,y:-26.3,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:112.2627,x:64.25,y:46.55}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-59.1646,skewY:120.8354,x:33.9,y:121.5,regY:8}},{t:this.instance_11,p:{regX:-5.2,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-66.6053,skewY:113.3947,x:31.6,y:132.4}},{t:this.instance_10,p:{rotation:-1.8651,x:17.15,y:92.05,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-8.5721,skewY:171.4279,x:19.1,y:189.45,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:7.3511,skewY:-172.6489,x:-41.95,y:185.4,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-69.5885,x:-36.4,y:48.75,regX:44.1,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:92.066,skewY:-87.934,x:-65.7,y:129.15,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:104.1326,skewY:-75.8674,x:-64.55,y:137.85,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.6,scaleX:0.9988,scaleY:0.9988,rotation:-106.3959,x:-57.15,y:-23}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-1.8157,x:-4.75,y:-57.85}},{t:this.instance_16,p:{skewX:-2.6598,skewY:177.3402,x:4.15,y:-78.65,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:10.0008,y:91.25,x:-23.2}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:78.4254,x:47.5,y:-26.2,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9988,scaleY:0.9988,rotation:113.274,x:63.55,y:46.75}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-58.1484,skewY:121.8516,x:31.8,y:121.05,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-65.5897,skewY:114.4103,x:29.25,y:132.05}},{t:this.instance_10,p:{rotation:-3.1171,x:17.15,y:92.1,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-9.3153,skewY:170.6847,x:21.35,y:189.4,regY:-54.3,regX:2.4}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:8.6855,skewY:-171.3145,x:-43.05,y:185.15,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-70.6701,x:-35.2,y:48.35,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:90.9864,skewY:-89.0136,x:-63.05,y:129.3,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:103.0446,skewY:-76.9554,x:-61.7,y:138.15,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-107.2978,x:-57.25,y:-23.05}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-1.7824,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-2.3761,skewY:177.6239,x:4.15,y:-78.75,regY:53.5,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:10.6772,y:91.2,x:-23.25}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:79.0215,x:47.5,y:-26.25,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9988,scaleY:0.9988,rotation:114.2867,x:62.75,y:46.9}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-57.13,skewY:122.87,x:29.65,y:120.65,regY:7.9}},{t:this.instance_11,p:{regX:-5.2,regY:3.4,scaleX:0.9988,scaleY:0.9988,skewX:-64.5753,skewY:115.4247,x:27.1,y:131.55}},{t:this.instance_10,p:{rotation:-4.3696,x:17.1,y:92.1,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-10.0606,skewY:169.9394,x:23.35,y:189.45,regY:-54.2,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9986,skewX:10.0227,skewY:-169.9772,x:-44.1,y:184.95,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-71.7519,x:-34.05,y:48,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:89.9125,skewY:-90.0875,x:-60.35,y:129.5,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:101.9579,skewY:-78.0421,x:-58.85,y:138.15,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-108.2002,x:-57.25,y:-23}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-1.7492,x:-4.85,y:-57.85}},{t:this.instance_16,p:{skewX:-2.0924,skewY:177.9076,x:4.15,y:-78.75,regY:53.5,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.8,scaleX:0.9986,scaleY:0.9986,rotation:11.3542,y:91.1,x:-23.15}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:79.62,x:47.5,y:-26.3,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:115.2971,x:61.95,y:47.05}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-56.1121,skewY:123.8879,x:27.55,y:120.1,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-63.5602,skewY:116.4398,x:24.7,y:131.2}},{t:this.instance_10,p:{rotation:-5.6217,x:17.1,y:92.1,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-10.8054,skewY:169.1946,x:25.45,y:189.15,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:11.3584,skewY:-168.6416,x:-45.15,y:184.7,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-72.8318,x:-32.9,y:47.65,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:88.8341,skewY:-91.1659,x:-57.6,y:129.65,regY:-8.4,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1.1,skewX:100.8709,skewY:-79.1291,x:-55.9,y:138.35,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-109.1037,x:-57.3,y:-23.05}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-1.7159,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-1.8079,skewY:178.1921,x:4.2,y:-78.55,regY:53.6,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:12.0302,y:91.2,x:-23.2}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:80.2149,x:47.55,y:-26.2,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9988,scaleY:0.9988,rotation:116.3094,x:61.2,y:47.2}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-55.0963,skewY:124.9037,x:25.5,y:119.7,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-62.5459,skewY:117.4541,x:22.5,y:130.65}},{t:this.instance_10,p:{rotation:-6.8738,x:17.05,y:92.1,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-11.5492,skewY:168.4508,x:27.6,y:188.95,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:12.6942,skewY:-167.3058,x:-46.3,y:184.45,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-73.9136,x:-31.9,y:47.4,regX:44.1,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:87.7544,skewY:-92.2456,x:-55.15,y:129.7,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.9,regY:-1,skewX:99.7851,skewY:-80.2149,x:-53.2,y:138.2,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-110.0076,x:-57.35,y:-23}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-146.2,-370.8,254.7,676.8);


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
	this.instance = new lib.CharacterGood_04();
	this.instance.setTransform(-25.4,40.6,0.504,0.504,0,0,180,37.6,49.4);

	this.instance_1 = new lib.CharacterGood_01();
	this.instance_1.setTransform(124.3,37.7,0.504,0.504,0,0,180,12.2,41.9);

	this.instance_2 = new lib.CharacterGood_02();
	this.instance_2.setTransform(-126.3,37.05,0.504,0.504,0,0,180,-40.2,46.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-204.3,-170.3,398.8,340.70000000000005);


// stage content:
(lib.LessonChapter2_06 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,222];
	this.streamSoundSymbolsList[0] = [{id:"DuringWar206wav",startFrame:0,endFrame:223,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("DuringWar206wav",0);
		this.InsertIntoSoundStreamData(soundInstance,0,223,1);
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
			document.location.replace("https://ninzato.github.io/history-of-badr-war/LessonChapter2_07.html");
			}, 500);
			
		}
		
		this.prevBtn.addEventListener("click", fl_ClickToGoToWebPage_2);
		
		function fl_ClickToGoToWebPage_2() {
			createjs.Sound.play("popsound");
			
			setTimeout(function(){
			document.location.replace("https://ninzato.github.io/history-of-badr-war/LessonChapter2_05.html");
			}, 500);
			
		}
		
		this.replaybtn.addEventListener("click", fl_ClickToGoToAndPlayFromFrame.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame()
		{
			this.gotoAndPlay(1);
		}
	}
	this.frame_222 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(222).call(this.frame_222).wait(1));

	// Subtitle
	this.instance = new lib.CachedBmp_2166();
	this.instance.setTransform(195.55,594,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2165();
	this.instance_1.setTransform(165.6,564.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(223));

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.homeBtn},{t:this.prevBtn},{t:this.nextBtn},{t:this.replaybtn}]}).wait(223));

	// muslims
	this.instance_2 = new lib.Tween2("synched",0);
	this.instance_2.setTransform(156.3,409.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({scaleX:0.8,scaleY:0.7999,x:399.45,y:341.1},222).wait(1));

	// Layer_1
	this.instance_3 = new lib.CachedBmp_2172();
	this.instance_3.setTransform(797.15,126.85,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_2171();
	this.instance_4.setTransform(793.3,119.4,0.5,0.5);

	this.instance_5 = new lib.ch1_uArm_rcopy_1("synched",0);
	this.instance_5.setTransform(852.85,242.6,0.3501,0.3501,0,90.7442,-89.2558,35.3,0.1);

	this.instance_6 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_6.setTransform(829,290.85,0.3499,0.3499,0,148.1543,-31.8457,6.1,-1.8);

	this.instance_7 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_7.setTransform(830.25,288,0.35,0.35,0,124.8001,-55.1999,5.3,-8.7);

	this.instance_8 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_8.setTransform(852.05,270.25,0.35,0.35,0,141.5766,-38.4234,40.4,0.1);

	this.instance_9 = new lib.ch1_headcopy_1("synched",0);
	this.instance_9.setTransform(832.8,222.95,0.3503,0.3503,0,3.6316,-176.3684,-0.2,52.9);

	this.instance_10 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_10.setTransform(835.45,243.5,0.3506,0.3506,0,0,180,-1.2,-23.7);

	this.instance_11 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_11.setTransform(841.25,317.05,0.3499,0.3499,0,-16.7851,163.2149,1.8,-54);

	this.instance_12 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_12.setTransform(834.55,230.3,0.3502,0.3502,0,-12.0967,167.9033,-1.7,9.1);

	this.instance_13 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_13.setTransform(834.85,267.5,0.3506,0.3506,0,0,180,-1.3,-22.9);

	this.instance_14 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_14.setTransform(822.75,317.05,0.3498,0.3498,0,11.5824,-168.4176,2.2,-53.6);

	this.instance_15 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_15.setTransform(829.5,284.1,0.3498,0.3498,0,14.7067,-165.2933,-1.2,2);

	this.instance_16 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_16.setTransform(816.35,292.2,0.35,0.35,0,-58.7196,121.2804,-5,3.3);

	this.instance_17 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_17.setTransform(814.7,288.75,0.3501,0.3501,0,-96.3738,83.6262,-6,8);

	this.instance_18 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_18.setTransform(829.8,264.9,0.35,0.35,0,-58.047,121.953,-40.5,-0.4);

	this.instance_19 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_19.setTransform(817.1,241.45,0.35,0.35,0,-119.3021,60.6979,-33.4,-0.2);

	this.instance_20 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_20.setTransform(838.85,283.2,0.35,0.35,0,-1.831,178.169,1.1,-45.8);

	this.instance_21 = new lib.CachedBmp_2170();
	this.instance_21.setTransform(901.3,133.05,0.5,0.5);

	this.instance_22 = new lib.CachedBmp_2169();
	this.instance_22.setTransform(897.35,119.45,0.5,0.5);

	this.instance_23 = new lib.ch1_uArm_rcopy2_3("synched",0);
	this.instance_23.setTransform(959.75,243.25,0.35,0.35,0,88.8984,-91.1016,35.4,-0.7);

	this.instance_24 = new lib.ch1_hand_rcopy2_3("synched",0);
	this.instance_24.setTransform(936.85,292.05,0.3499,0.3499,0,155.477,-24.523,6.1,-2.1);

	this.instance_25 = new lib.ch1_thumb_rcopy2_3("synched",0);
	this.instance_25.setTransform(938.1,289.25,0.3499,0.3499,0,122.984,-57.016,5,-9.2);

	this.instance_26 = new lib.ch1_lArm_rcopy2_3("synched",0);
	this.instance_26.setTransform(959.85,271.1,0.35,0.35,0,140.7686,-39.2314,40.5,0.1);

	this.instance_27 = new lib.ch1_headcopy2_3("synched",0);
	this.instance_27.setTransform(939.5,223.7,0.3502,0.3502,0,3.6273,-176.3727,0.1,52.8);

	this.instance_28 = new lib.ch1_uBodycopy2_3("synched",0);
	this.instance_28.setTransform(942.2,244.25,0.3506,0.3506,0,0,180,-1.2,-23.8);

	this.instance_29 = new lib.ch1_lLeg_rcopy2_3("synched",0);
	this.instance_29.setTransform(951.2,317.35,0.3499,0.3499,0,-12.7109,167.2891,2.1,-53.1);

	this.instance_30 = new lib.ch1_neckcopy2_3("synched",0);
	this.instance_30.setTransform(941.4,231.05,0.3502,0.3502,0,-12.0953,167.9047,-1.9,9.2);

	this.instance_31 = new lib.ch1_lBodycopy2_3("synched",0);
	this.instance_31.setTransform(941.6,268.3,0.3506,0.3506,0,0,180,-1.3,-22.4);

	this.instance_32 = new lib.ch1_lLeg_lcopy2_3("synched",0);
	this.instance_32.setTransform(927.2,317.05,0.3498,0.3498,0,6.8848,-173.1152,3.2,-53.3);

	this.instance_33 = new lib.ch1_uLeg_lcopy2_3("synched",0);
	this.instance_33.setTransform(934.65,284.35,0.3498,0.3498,0,15.3864,-164.6136,-1.2,2.2);

	this.instance_34 = new lib.ch1_hand_lcopy2_3("synched",0);
	this.instance_34.setTransform(932.75,300.25,0.3499,0.3499,0,-61.6033,118.3967,-4.5,3.6);

	this.instance_35 = new lib.ch1_thumb_lcopy2_3("synched",0);
	this.instance_35.setTransform(931.55,296.4,0.35,0.35,0,-87.9361,92.0639,-5.8,8.2);

	this.instance_36 = new lib.ch1_lArm_lcopy2_3("synched",0);
	this.instance_36.setTransform(928.1,268.65,0.35,0.35,0,-97.0798,82.9202,-39.1,-0.8);

	this.instance_37 = new lib.ch1_uArm_lcopy2_3("synched",0);
	this.instance_37.setTransform(923.85,242.25,0.35,0.35,0,-100.114,79.886,-32.9,-0.2);

	this.instance_38 = new lib.ch1_uLeg_rcopy2_3("synched",0);
	this.instance_38.setTransform(946.75,283.5,0.35,0.35,0,-5.2331,174.7669,1.4,-45.6);

	this.instance_39 = new lib.CachedBmp_2168();
	this.instance_39.setTransform(1002.15,132.7,0.5,0.5);

	this.instance_40 = new lib.CachedBmp_2167();
	this.instance_40.setTransform(998.3,119.1,0.5,0.5);

	this.instance_41 = new lib.ch1_uArm_rcopy2_2("synched",0);
	this.instance_41.setTransform(1061.9,246.3,0.35,0.35,0,67.6856,-112.3144,34.7,0.6);

	this.instance_42 = new lib.ch1_hand_rcopy2_2("synched",0);
	this.instance_42.setTransform(1062.55,301.75,0.35,0.35,0,110.4862,-69.5138,5.6,-1.9);

	this.instance_43 = new lib.ch1_thumb_rcopy2_2("synched",0);
	this.instance_43.setTransform(1063.85,298.85,0.35,0.35,0,120.7423,-59.2577,4.9,-9.4);

	this.instance_44 = new lib.ch1_lArm_rcopy2_2("synched",0);
	this.instance_44.setTransform(1072.35,271.8,0.3501,0.3501,0,107.3932,-72.6068,39.4,-0.7);

	this.instance_45 = new lib.ch1_headcopy2_2("synched",0);
	this.instance_45.setTransform(1042,226.5,0.3503,0.3503,0,2.0172,-177.9828,0.4,53.6);

	this.instance_46 = new lib.ch1_uBodycopy2_2("synched",0);
	this.instance_46.setTransform(1044.3,247.2,0.3506,0.3506,0,0,180,-0.1,-22.8);

	this.instance_47 = new lib.ch1_lLeg_rcopy2_2("synched",0);
	this.instance_47.setTransform(1048.95,320.35,0.3499,0.3499,0,-9.0486,170.9514,2.5,-52.9);

	this.instance_48 = new lib.ch1_neckcopy2_2("synched",0);
	this.instance_48.setTransform(1043.5,233.95,0.3503,0.3503,0,-10.1874,169.8126,-0.8,9.8);

	this.instance_49 = new lib.ch1_lBodycopy2_2("synched",0);
	this.instance_49.setTransform(1043.75,271.15,0.3506,0.3506,0,0,180,-0.5,-22.2);

	this.instance_50 = new lib.ch1_lLeg_lcopy2_2("synched",0);
	this.instance_50.setTransform(1035.45,320.6,0.3497,0.3497,0,-0.52,179.48,3.4,-52.2);

	this.instance_51 = new lib.ch1_uLeg_lcopy2_2("synched",0);
	this.instance_51.setTransform(1036.75,286.85,0.3498,0.3498,0,5.1385,-174.8615,-0.7,2.8);

	this.instance_52 = new lib.ch1_hand_lcopy2_2("synched",0);
	this.instance_52.setTransform(1006.9,297.05,0.35,0.35,0,-34.1023,145.8977,-5.1,4);

	this.instance_53 = new lib.ch1_thumb_lcopy2_2("synched",0);
	this.instance_53.setTransform(1007.6,293.05,0.35,0.35,0,-58.4005,121.5995,-5.5,8.5);

	this.instance_54 = new lib.ch1_lArm_lcopy2_2("synched",0);
	this.instance_54.setTransform(1026,271.9,0.35,0.35,0,-49.3014,130.6986,-39.6,-0.1);

	this.instance_55 = new lib.ch1_uArm_lcopy2_2("synched",0);
	this.instance_55.setTransform(1025.85,245.2,0.35,0.35,0,-91.3239,88.6761,-32.5,0.2);

	this.instance_56 = new lib.ch1_uLeg_rcopy2_2("synched",0);
	this.instance_56.setTransform(1050.65,286.55,0.3499,0.3499,0,5.6561,-174.3439,1.9,-44.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_56},{t:this.instance_55},{t:this.instance_54},{t:this.instance_53},{t:this.instance_52},{t:this.instance_51},{t:this.instance_50},{t:this.instance_49},{t:this.instance_48},{t:this.instance_47},{t:this.instance_46},{t:this.instance_45},{t:this.instance_44},{t:this.instance_43},{t:this.instance_42},{t:this.instance_41},{t:this.instance_40},{t:this.instance_39},{t:this.instance_38},{t:this.instance_37},{t:this.instance_36},{t:this.instance_35},{t:this.instance_34},{t:this.instance_33},{t:this.instance_32},{t:this.instance_31},{t:this.instance_30},{t:this.instance_29},{t:this.instance_28},{t:this.instance_27},{t:this.instance_26},{t:this.instance_25},{t:this.instance_24},{t:this.instance_23},{t:this.instance_22},{t:this.instance_21},{t:this.instance_20},{t:this.instance_19},{t:this.instance_18},{t:this.instance_17},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3}]}).wait(223));

	// Background
	this.instance_57 = new lib.Chap2Scene4();
	this.instance_57.setTransform(-230,-129,0.7864,0.7864);

	this.timeline.addTween(cjs.Tween.get(this.instance_57).wait(223));

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
		{src:"images/LessonChapter2_06_atlas_1.png", id:"LessonChapter2_06_atlas_1"},
		{src:"images/LessonChapter2_06_atlas_2.png", id:"LessonChapter2_06_atlas_2"},
		{src:"sounds/DuringWar206wav.mp3", id:"DuringWar206wav"},
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