(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"LessonChapter3_00_atlas_1", frames: [[1282,0,406,520],[1362,1324,134,50],[1228,1324,132,102],[1228,1192,134,130],[0,957,1476,233],[0,722,1498,233],[1282,522,252,151],[1006,1192,220,131],[0,1192,1004,233],[1135,1325,91,87],[1006,1325,127,100],[0,0,1280,720]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.gotoAndPlay = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_2447 = function() {
	this.initialize(ss["LessonChapter3_00_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2446 = function() {
	this.initialize(ss["LessonChapter3_00_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2442 = function() {
	this.initialize(ss["LessonChapter3_00_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2445 = function() {
	this.initialize(ss["LessonChapter3_00_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2440 = function() {
	this.initialize(ss["LessonChapter3_00_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2439 = function() {
	this.initialize(ss["LessonChapter3_00_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2438 = function() {
	this.initialize(ss["LessonChapter3_00_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2437 = function() {
	this.initialize(ss["LessonChapter3_00_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2436 = function() {
	this.initialize(ss["LessonChapter3_00_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CompoundPath = function() {
	this.initialize(ss["LessonChapter3_00_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.Path_1 = function() {
	this.initialize(ss["LessonChapter3_00_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.Chap3GeneralScene = function() {
	this.initialize(ss["LessonChapter3_00_atlas_1"]);
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
	this.instance = new lib.CachedBmp_2445();
	this.instance.setTransform(-33.05,-28.1,0.4875,0.4875);

	this.instance_1 = new lib.CachedBmp_2446();
	this.instance_1.setTransform(-33,10.75,0.4875,0.4875);

	this.instance_2 = new lib.CachedBmp_2442();
	this.instance_2.setTransform(-33.1,-28.2,0.4875,0.4875);

	this.instance_3 = new lib.CompoundPath();
	this.instance_3.setTransform(-159.75,-154.3,3.5,3.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-159.7,-154.3,318.5,304.5);


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

	// Layer_3
	this.instance = new lib.CachedBmp_2439();
	this.instance.setTransform(-374.45,-58.25,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2440();
	this.instance_1.setTransform(-368.9,-58.25,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-374.4,-58.2,749,116.5);


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

	// Layer_3
	this.instance = new lib.CachedBmp_2437();
	this.instance.setTransform(-55,-32.75,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2438();
	this.instance_1.setTransform(-62.95,-37.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	// flash0.ai
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#5A4D3D").s().p("AkJCEQABAAAAAAQAAAAAAgBQABAAgBgBQAAgBAAgBQAAgBgBgBQAAgBAAAAQAAgBABAAQAAAAABAAQgBgBAAAAQAAAAAAgBQAAAAAAAAQAAAAABgBQAAAAAAAAQAAgBAAAAQAAAAAAgBQAAAAAAgBQgBAAAAAAQAAAAAAAAQAAgBAAAAQAAAAAAgBQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAAAAAAAQgBAAAAgBQgBAAAAAAQAAAAAAgBQAAAAAAAAIACgDQgBAAAAAAQgBAAAAAAQAAgBAAAAQAAAAAAAAIACgCQABgBgFgEQgDgDABgCIgBgBIACgBQACgDAAgDIACgFQgBgEADgGQACgFgCgCQgBgMACgGQAAAAABAAQAAgBAAAAQAAAAAAgBQAAAAAAgBQAAAAgBgBQAAAAAAAAQAAgBAAAAQABAAAAAAIAAgBQABAAAAgBQAAAAgBAAQAAAAAAAAQAAgBgBAAQADgJgBgEQAAAAAAgBQAAAAAAgBQAAAAgBgBQAAAAgBgBQAAAAAAAAQAAgBAAAAQAAAAAAgBQAAAAAAAAQAAAAABAAQAAgBAAAAQAAAAgBAAQAAAAAAgBIgCgBIAAgBQAAgDACgCQAEgCgBgEQAAAAgBAAQAAAAAAgBQAAAAAAAAQAAAAAAgBIABgBQgIgFAFgDQAFgFgHgKQgGgMAGgJQAFgEgEgEQgCgCADgBQACgCgCgDQAAAAAAgBQAAAAAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAAAAAAAQAAgBAAAAQAAAAAAAAIABgCQABgDgIgKQgHgJAHgFQAAgCADgBQAEgBAAgFIAAgFQAAgCgEgCQAAAAAAAAQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAAAAAgBQgBAAgBAAQAAgBAAAAQAAAAAAgBQABAAABAAQADgDgDgHQgDgHAGABQAkgCA6AEQAwgFA/ABIBtAEQBTALBMgPQACgCADADQAEADACAAQACgBAFACQAEACADgBIADAAIADABIABAAIAQAAQAIABABgBIAAAAQAAAAAAAAQAAABAAAAQAAAAAAABQAAAAAAAAQAAAAgBAAIgBAAIABACQgGAHAAATQABATgJAIQAPAPgJAIIgBACQABAAAAAAQAAAAgBABQAAAAAAAAQAAAAgBAAQAAABAAAAQAAAAAAABQAAAAAAABQAAAAAAABQAAAAAAABQAAAAAAAAQAAABAAAAQgBAAAAAAQAAAAAAABQgBAAAAAAQAAAAAAABQAAAAABAAIAAACQAAAKADAGQABAAAAABQAAAAAAAAQAAAAgBABQAAAAgBAAQAAABAAAAQgBAAAAAAQAAABABAAQAAAAAAAAIgBAEQAAAAAAABQAAAAAAABQAAAAgBAAQAAABAAAAQgBAAAAAAQgBAAAAAAQAAABAAAAQAAAAAAAAIACACQgBAAAAAAQgBABAAAAQAAABABAAQAAABABAAQAAAAAAAAQAAAAAAABQAAAAAAAAQAAABgBAAQAAAAgBAAQAAAAAAABQABAAAAAAQAAAAABAAQACADgEADQgGAEACADIAAAHIAFAFQAAAAABAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAABQAAAAAAABQAAAAAAABQAAAAABABIAAABIAAABQAAAAgBABQAAAAAAAAQAAAAAAAAQABABAAAAQAAAAABAAQAAAAAAAAQAAAAAAABQAAAAgBAAQAAAFgCACQgCABACAMQAAACAFAFQAFAEgCAGQAAAGgCAJIgCAPIgCAKQgCAHACAGIAAACIAAABQjMgJkfAIQgDgCgQADIgIABQgGAAAAgDg");
	this.shape.setTransform(-0.0126,0.0173,3.6552,3.6552);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#5A4D3D").s().p("AkJCEQABAAAAAAQAAAAAAgBQAAAAAAgBQAAgBAAgBQgBgBAAgBQAAgBAAAAQAAgBABAAQAAAAABAAQgBgBAAAAQAAAAAAgBQAAAAAAAAQAAAAABgBQAAAAAAAAQAAgBAAAAQAAAAAAgBQAAAAAAgBQgBAAAAAAQAAAAgBAAQAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAABAAQAAgBAAAAQgBAAAAAAQAAAAgBgBQAAAAgBAAQAAAAAAgBQAAAAAAAAIACgDQgBAAAAAAQgBAAAAAAQAAgBAAAAQAAAAAAAAIACgCQABgBgEgEQgEgDACgCIgBgBIACgBQACgDAAgDIABgFQgBgEADgGQACgFgCgCQgBgNACgFQAAAAABAAQAAgBAAAAQAAAAAAgBQAAAAAAgBQAAAAAAgBQgBAAAAAAQAAgBABAAQAAAAAAAAIABgBQAAAAAAgBQAAAAAAAAQAAAAgBAAQAAgBAAAAQADgJgCgEQAAAAAAgBQAAAAAAgBQAAAAAAgBQgBAAAAgBQgBAAAAAAQAAgBAAAAQAAAAAAgBQAAAAAAAAQABAAAAAAQAAgBAAAAQAAAAgBAAQAAAAAAgBIgCgBIAAgBQgBgDAEgCQADgCgBgEQAAAAAAAAQgBAAAAgBQAAAAAAAAQAAAAAAgBIABgBQgHgFAEgDQAGgFgIgKQgGgNAGgIQAFgEgEgEQAAAAgBgBQAAAAAAgBQAAAAABAAQAAgBABAAQACgCgBgDQgBAAAAgBQAAAAABAAQAAAAAAgBQABAAAAAAQABAAAAAAQAAAAAAAAQAAgBAAAAQAAAAAAAAIABgCQABgDgIgKQgHgJAGgFQABgBAEgCQADgBAAgFIAAgFQAAgCgDgCQgBAAAAAAQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAAAgBgBQAAAAgBAAQAAgBAAAAQAAAAABgBQAAAAABAAQADgDgDgHQgCgHAFABQAkgBA6ADQAwgFA/ABIBuAEQBTALBLgPQACgCADADQAEADACAAQACgBAFACQAEACACgBIAFAAIACABIABAAIAQAAIAJAAIAAAAIAAACIgBABIABABQgHAHAAATQABATgJAIQAPAPgIAIIgBACQAAAAAAAAQAAAAAAABQAAAAgBAAQAAAAAAAAQgBABAAAAQAAAAAAABQgBAAABABQAAAAAAABQAAAAAAABQAAAAAAAAQAAABAAAAQAAAAgBAAQAAAAAAABQAAAAAAAAQgBAAABABQAAAAAAAAIAAACQAAAKAEAGIgCACQAAABAAAAQgBAAABAAQAAABAAAAQAAAAABAAIgBAEQAAAAAAABQgBAAAAABQAAAAAAAAQgBABAAAAQgBAAAAAAQgBAAAAAAQAAABAAAAQAAAAAAAAIABACQAAAAgBAAQAAABAAAAQAAABAAAAQABABAAAAQABAAAAAAQAAAAAAABQAAAAAAAAQAAABgBAAQAAAAAAAAQAAAAAAABQAAAAAAAAQABAAAAAAQACADgEADQgFAEABADIABAHIAEAFQABAAAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAABQgBAAAAABQAAAAABABQAAAAAAABIABABIAAABQAAAAAAABQgBAAAAAAQAAAAABAAQAAABAAAAQABAAAAAAQAAAAAAAAQAAAAAAABQAAAAAAAAQAAAFgDACQgCABACAMQAAACAGAFQAEAEgCAGIgCAPIgBAPIgDAKQgCAHADAGIgBACIAAABQjNgJkdAIQgEgCgQADIgIABQgGAAAAgDg");
	this.shape_1.setTransform(-0.0927,-0.0107,3.6546,3.6546);

	this.instance_2 = new lib.Path_1();
	this.instance_2.setTransform(-231.85,-181.35,3.6546,3.6546);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.instance_2},{t:this.shape_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-231.8,-181.3,464.1,365.4);


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
	this.instance.setTransform(98.2,45.35,1.2829,1.2829,0,0,0,54.1,29.4);

	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["#FF8500","rgba(255,142,1,0.918)","rgba(255,181,3,0.588)","rgba(255,211,5,0.333)","rgba(255,233,6,0.145)","rgba(255,246,7,0.035)","rgba(255,250,7,0)"],[0,0.043,0.243,0.443,0.639,0.827,1],0,32.6,0,-32.5).s().p("AnpFGIkYqLIYDAAIkKKLg");
	this.shape.setTransform(98.7534,41.7715,1.2829,1.2829);

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
	this.instance.setTransform(-0.2,-10.75,1,0.2094,0,0,0,98.5,38.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:98.8,regY:41.8,scaleY:0.2489,x:0.1,y:-11.65},0).wait(1).to({scaleY:0.2883,y:-13.2},0).wait(1).to({scaleY:0.3277,y:-14.75},0).wait(1).to({scaleY:0.3671,y:-16.3},0).wait(1).to({scaleY:0.4065,y:-17.85},0).wait(1).to({scaleY:0.446,y:-19.4},0).wait(1).to({scaleY:0.4854,y:-20.95},0).wait(1).to({scaleY:0.5248,y:-22.5},0).wait(1).to({scaleY:0.5642,y:-24.1},0).wait(1).to({scaleY:0.6036,y:-25.65},0).wait(1).to({scaleY:0.643,y:-27.2},0).wait(1).to({scaleY:0.6825,y:-28.75},0).wait(1).to({scaleY:0.7219,y:-30.35},0).wait(1).to({scaleY:0.7613,y:-31.9},0).wait(1).to({scaleY:0.8007,y:-33.45},0).wait(1).to({scaleY:0.8401,y:-35},0).wait(1).to({scaleY:0.8796,y:-36.6},0).wait(1).to({scaleY:0.919,y:-38.15},0).wait(1).to({scaleY:0.9584,y:-39.7},0).wait(1).to({scaleY:0.9978,y:-41.25},0).wait(1).to({scaleY:1.0372,y:-42.8},0).wait(1).to({scaleY:1.0766,y:-44.35},0).wait(1).to({scaleY:1.1161,y:-45.9},0).wait(23).to({scaleY:1.0848,y:-44.65},0).wait(1).to({scaleY:1.0535,y:-43.45},0).wait(1).to({scaleY:1.0223,y:-42.2},0).wait(1).to({scaleY:0.991,y:-41},0).wait(1).to({scaleY:0.9597,y:-39.75},0).wait(1).to({scaleY:0.9285,y:-38.5},0).wait(1).to({scaleY:0.8972,y:-37.25},0).wait(1).to({scaleY:0.866,y:-36},0).wait(1).to({scaleY:0.8347,y:-34.8},0).wait(1).to({scaleY:0.8034,y:-33.55},0).wait(1).to({scaleY:0.7722,y:-32.3},0).wait(1).to({scaleY:0.7409,y:-31.1},0).wait(1).to({scaleY:0.7097,y:-29.85},0).wait(1).to({scaleY:0.6784,y:-28.6},0).wait(1).to({scaleY:0.6471,y:-27.35},0).wait(1).to({scaleY:0.6159,y:-26.15},0).wait(1).to({scaleY:0.5846,y:-24.9},0).wait(1).to({scaleY:0.5533,y:-23.65},0).wait(1).to({scaleY:0.5221,y:-22.45},0).wait(1).to({scaleY:0.4908,y:-21.2},0).wait(1).to({scaleY:0.4596,y:-19.95},0).wait(1).to({scaleY:0.4283,y:-18.7},0).wait(1).to({scaleY:0.397,y:-17.5},0).wait(1).to({scaleY:0.3658,y:-16.25},0).wait(1).to({scaleY:0.3345,y:-15},0).wait(1).to({scaleY:0.3032,y:-13.75},0).wait(1).to({scaleY:0.272,y:-12.55},0).wait(1).to({scaleY:0.2407,y:-11.3},0).wait(1).to({scaleY:0.2095,y:-10.1},0).wait(1));

	// flash0_ai
	this.instance_1 = new lib.CachedBmp_2447();
	this.instance_1.setTransform(-78.15,-99.6,0.3842,0.3842);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(75));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-98.7,-99.6,197.5,199.8);


// stage content:
(lib.LessonChapter3_00 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0];
	this.isSingleFrame = false;
	// timeline functions:
	this.frame_0 = function() {
		if(this.isSingleFrame) {
			return;
		}
		if(this.totalFrames == 1) {
			this.isSingleFrame = true;
		}
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
			document.location.replace("https://ninzato.github.io/history-of-badr-war/LessonChapter3_01.html");
			}, 500);
			
		}
		
		this.prevBtn.addEventListener("click", fl_ClickToGoToWebPage_2);
		
		function fl_ClickToGoToWebPage_2() {
			createjs.Sound.play("popsound");
			
			setTimeout(function(){
			document.location.replace("https://ninzato.github.io/history-of-badr-war/LessonMenu.html");
			}, 500);
			
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// Layer_1
	this.instance = new lib.warSpoils();
	this.instance.setTransform(640.1,276.95,1.3015,1.2705,0,0,0,0.1,0.1);

	this.instance_1 = new lib.CachedBmp_2436();
	this.instance_1.setTransform(389,375.75,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	// Buttons
	this.homeBtn = new lib.home_btn();
	this.homeBtn.name = "homeBtn";
	this.homeBtn.setTransform(74.95,66,1.0256,1.0256);
	new cjs.ButtonHelper(this.homeBtn, 0, 1, 1);

	this.prevBtn = new lib.btn_prev();
	this.prevBtn.name = "prevBtn";
	this.prevBtn.setTransform(640.15,652.6,0.4383,0.4383,0,0,0,0.4,0);
	new cjs.ButtonHelper(this.prevBtn, 0, 1, 1);

	this.nextBtn = new lib.btn_next();
	this.nextBtn.name = "nextBtn";
	this.nextBtn.setTransform(640.05,577.35);
	new cjs.ButtonHelper(this.nextBtn, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.nextBtn},{t:this.prevBtn},{t:this.homeBtn}]}).wait(1));

	// Layer_2
	this.instance_2 = new lib.Chap3GeneralScene();

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(551.2,267.8,728.8,493.7);
// library properties:
lib.properties = {
	id: 'A6F1A483617F544186FFC32FE4892FD2',
	width: 1280,
	height: 720,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/LessonChapter3_00_atlas_1.png", id:"LessonChapter3_00_atlas_1"},
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