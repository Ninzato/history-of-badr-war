(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"LessonChapter3_09_atlas_1", frames: [[1282,0,312,399],[1596,132,134,50],[1732,0,132,102],[1596,0,134,130],[0,957,1476,233],[0,722,1498,233],[1282,515,581,85],[0,1192,1047,153],[1282,401,481,112],[1732,104,91,87],[0,0,1280,720]]}
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



(lib.CachedBmp_2763 = function() {
	this.initialize(ss["LessonChapter3_09_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2762 = function() {
	this.initialize(ss["LessonChapter3_09_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2761 = function() {
	this.initialize(ss["LessonChapter3_09_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2760 = function() {
	this.initialize(ss["LessonChapter3_09_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2759 = function() {
	this.initialize(ss["LessonChapter3_09_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2758 = function() {
	this.initialize(ss["LessonChapter3_09_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2757 = function() {
	this.initialize(ss["LessonChapter3_09_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2756 = function() {
	this.initialize(ss["LessonChapter3_09_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2755 = function() {
	this.initialize(ss["LessonChapter3_09_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CompoundPath = function() {
	this.initialize(ss["LessonChapter3_09_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.Chap3GeneralScene = function() {
	this.initialize(ss["LessonChapter3_09_atlas_1"]);
	this.gotoAndStop(10);
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
	this.instance = new lib.CachedBmp_2760();
	this.instance.setTransform(-33.05,-28.1,0.4875,0.4875);

	this.instance_1 = new lib.CachedBmp_2762();
	this.instance_1.setTransform(-33,10.75,0.4875,0.4875);

	this.instance_2 = new lib.CachedBmp_2761();
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
	this.instance = new lib.CachedBmp_2758();
	this.instance.setTransform(-374.45,-58.25,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2759();
	this.instance_1.setTransform(-368.9,-58.25,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-374.4,-58.2,749,116.5);


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
	this.instance.setTransform(98.2,45.3,1.2829,1.2829,0,0,0,54.2,29.5);

	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["#FF8500","rgba(255,142,1,0.918)","rgba(255,181,3,0.588)","rgba(255,211,5,0.333)","rgba(255,233,6,0.145)","rgba(255,246,7,0.035)","rgba(255,250,7,0)"],[0,0.043,0.243,0.443,0.639,0.827,1],0,32.6,0,-32.5).s().p("AnpFGIkYqLIYDAAIkKKLg");
	this.shape.setTransform(98.744,41.7662,1.2828,1.2828);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol1, new cjs.Rectangle(0,0,197.5,83.5), null);


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
	this.instance.setTransform(-0.2,-10.75,1,0.2094,0,0,0,98.5,38.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:98.7,regY:41.8,scaleY:0.2489,x:0,y:-11.5},0).wait(1).to({scaleY:0.2883,y:-13.05},0).wait(1).to({scaleY:0.3277,y:-14.6},0).wait(1).to({scaleY:0.3671,y:-16.15},0).wait(1).to({scaleY:0.4065,y:-17.65},0).wait(1).to({scaleY:0.446,y:-19.2},0).wait(1).to({scaleY:0.4854,y:-20.75},0).wait(1).to({scaleY:0.5248,y:-22.3},0).wait(1).to({scaleY:0.5642,y:-23.8},0).wait(1).to({scaleY:0.6036,y:-25.35},0).wait(1).to({scaleY:0.643,y:-26.9},0).wait(1).to({scaleY:0.6825,y:-28.45},0).wait(1).to({scaleY:0.7219,y:-30},0).wait(1).to({scaleY:0.7613,y:-31.55},0).wait(1).to({scaleY:0.8007,y:-33.1},0).wait(1).to({scaleY:0.8401,y:-34.65},0).wait(1).to({scaleY:0.8796,y:-36.2},0).wait(1).to({scaleY:0.919,y:-37.7},0).wait(1).to({scaleY:0.9584,y:-39.25},0).wait(1).to({scaleY:0.9978,y:-40.8},0).wait(1).to({scaleY:1.0372,y:-42.35},0).wait(1).to({scaleY:1.0766,y:-43.85},0).wait(1).to({scaleY:1.1161,y:-45.4},0).wait(23).to({scaleY:1.0848,y:-44.2},0).wait(1).to({scaleY:1.0535,y:-42.95},0).wait(1).to({scaleY:1.0223,y:-41.7},0).wait(1).to({scaleY:0.991,y:-40.55},0).wait(1).to({scaleY:0.9597,y:-39.3},0).wait(1).to({scaleY:0.9285,y:-38.1},0).wait(1).to({scaleY:0.8972,y:-36.85},0).wait(1).to({scaleY:0.866,y:-35.65},0).wait(1).to({scaleY:0.8347,y:-34.4},0).wait(1).to({scaleY:0.8034,y:-33.15},0).wait(1).to({scaleY:0.7722,y:-31.95},0).wait(1).to({scaleY:0.7409,y:-30.75},0).wait(1).to({scaleY:0.7097,y:-29.55},0).wait(1).to({scaleY:0.6784,y:-28.3},0).wait(1).to({scaleY:0.6471,y:-27.1},0).wait(1).to({scaleY:0.6159,y:-25.85},0).wait(1).to({scaleY:0.5846,y:-24.6},0).wait(1).to({scaleY:0.5533,y:-23.4},0).wait(1).to({scaleY:0.5221,y:-22.2},0).wait(1).to({scaleY:0.4908,y:-21},0).wait(1).to({scaleY:0.4596,y:-19.75},0).wait(1).to({scaleY:0.4283,y:-18.55},0).wait(1).to({scaleY:0.397,y:-17.3},0).wait(1).to({scaleY:0.3658,y:-16.05},0).wait(1).to({scaleY:0.3345,y:-14.85},0).wait(1).to({scaleY:0.3032,y:-13.6},0).wait(1).to({scaleY:0.272,y:-12.45},0).wait(1).to({scaleY:0.2407,y:-11.2},0).wait(1).to({scaleY:0.2095,y:-10},0).wait(1));

	// flash0_ai
	this.instance_1 = new lib.CachedBmp_2763();
	this.instance_1.setTransform(-78.15,-99.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(75));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-98.7,-99.6,197.5,199.5);


// stage content:
(lib.LessonChapter3_09 = function(mode,startPosition,loop,reversed) {
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
			document.location.replace("/Home.html");
			}, 500);
		}
		
		this.prevBtn.addEventListener("click", fl_ClickToGoToWebPage_2);
		
		function fl_ClickToGoToWebPage_2() {
			createjs.Sound.play("popsound");
			
			setTimeout(function(){
			document.location.replace("/LessonMenu.html");
			}, 500);
			
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// Layer_1
	this.instance = new lib.warSpoils();
	this.instance.setTransform(640.05,410.45,0.6342,0.6191,0,0,0,0.1,0.1);

	this.instance_1 = new lib.CachedBmp_2757();
	this.instance_1.setTransform(494.7,278.65,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_2756();
	this.instance_2.setTransform(378.3,202.1,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_2755();
	this.instance_3.setTransform(519.75,462.1,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	// Buttons
	this.homeBtn = new lib.home_btn();
	this.homeBtn.name = "homeBtn";
	this.homeBtn.setTransform(74.95,66,1.0256,1.0256);
	new cjs.ButtonHelper(this.homeBtn, 0, 1, 1);

	this.prevBtn = new lib.btn_prev();
	this.prevBtn.name = "prevBtn";
	this.prevBtn.setTransform(640.15,652.6,0.4383,0.4383,0,0,0,0.4,0);
	new cjs.ButtonHelper(this.prevBtn, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.prevBtn},{t:this.homeBtn}]}).wait(1));

	// Layer_2
	this.instance_4 = new lib.Chap3GeneralScene();

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(551.2,267.8,728.8,452.2);
// library properties:
lib.properties = {
	id: 'A6F1A483617F544186FFC32FE4892FD2',
	width: 1280,
	height: 720,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/LessonChapter3_09_atlas_1.png", id:"LessonChapter3_09_atlas_1"},
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