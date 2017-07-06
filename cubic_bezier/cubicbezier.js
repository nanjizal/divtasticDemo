$estr = function() { return js.Boot.__string_rec(this,''); }
if(typeof divtastic=='undefined') divtastic = {}
if(!divtastic.js) divtastic.js = {}
divtastic.js.Drawing = function() { }
divtastic.js.Drawing.__name__ = ["divtastic","js","Drawing"];
divtastic.js.Drawing.curveFromTo = function(ddiv,p1x,p1y,p2x,p2y,p3x,p3y,_lineWidth,_lineHeight,c0) {
	if(c0 == null) c0 = "#ff0000";
	var p12x;
	var p12y;
	var p23x;
	var p23y;
	var p123x;
	var p123y;
	var ratio = 0;
	var _points = new List();
	var _grads = new List();
	var __curve;
	var __point;
	var __style;
	var steps = 2 * Math.ceil(Math.pow(Math.pow(p1x - p3x,2) + Math.pow(p1y - p3y,2),0.5));
	var inter = new IntIter(0,steps);
	var i;
	while( inter.hasNext() ) {
		var i1 = inter.next();
		__point = new List();
		ratio = i1 / steps;
		p12x = p1x + (p2x - p1x) * ratio;
		p23x = p2x + (p3x - p2x) * ratio;
		p123x = Std["int"](p12x + (p23x - p12x) * ratio);
		p12y = p1y + (p2y - p1y) * ratio;
		p23y = p2y + (p3y - p2y) * ratio;
		p123y = Std["int"](p12y + (p23y - p12y) * ratio);
		__curve = js.Lib.document.createElement("div");
		_grads.push(__curve);
		__point.add(p123x);
		__point.add(p123y);
		_points.add(__point);
		__style = __curve.style;
		__style.paddingTop = _lineHeight + "px";
		__style.paddingLeft = _lineWidth + "px";
		__style.top = p123y + "px";
		__style.left = p123x + "px";
		__style.backgroundColor = c0;
		__style.position = "absolute";
		ddiv._dom.appendChild(__curve);
	}
	var _points2 = new List();
	var old = 10000;
	var $it0 = _points.iterator();
	while( $it0.hasNext() ) {
		var i1 = $it0.next();
		if(i1.last() != old) _points2.add(i1);
		old = i1.last();
	}
	return _grads;
}
divtastic.js.Drawing.drawElipse = function(ddiv,cx,cy,rx,ry,_lineWidth,_lineHeight) {
	var px;
	var py;
	var theta = 2 * Math.PI / 8;
	var points = new Array();
	var iterPoints = new IntIter(0,9);
	while( iterPoints.hasNext() ) {
		var i = iterPoints.next();
		var point = new List();
		point.add(cx + rx * Math.sin(theta * i));
		point.add(cy + ry * Math.cos(theta * i));
		points[i] = point;
	}
	var j = 0;
	while(j < 8) {
		divtastic.js.Drawing.curveThru(ddiv,points[j].first(),points[j].last(),points[j + 1].first(),points[j + 1].last(),points[j + 2].first(),points[j + 2].last(),_lineWidth,_lineHeight);
		j += 2;
	}
	return points;
}
divtastic.js.Drawing.drawGradient = function(ddiv,x0,y0,w0,h0,c1_,c0_,_minPixel,direction) {
	if(_minPixel == null) _minPixel = 1;
	var _tot;
	var _grads = new List();
	var __grad;
	var __style;
	if(direction == zpartanlite.Orientation.Horizontal) {
		_tot = Std["int"](Math.floor(w0 / _minPixel));
		var iter = new IntIter(0,_tot);
		while( iter.hasNext() ) {
			var i = iter.next();
			__grad = js.Lib.document.createElement("div");
			_grads.add(__grad);
			__style = __grad.style;
			__style.height = h0 + "px";
			__style.width = _minPixel + "px";
			__style.top = y0 + "px";
			__style.left = x0 + _minPixel * i + "px";
			__style.position = "absolute";
			ddiv._dom.appendChild(__grad);
		}
	} else {
		_tot = Std["int"](Math.floor(h0 / _minPixel));
		var iter = new IntIter(0,_tot);
		while( iter.hasNext() ) {
			var i = iter.next();
			__grad = js.Lib.document.createElement("div");
			_grads.add(__grad);
			__style = __grad.style;
			__style.height = _minPixel + "px";
			__style.width = w0 + "px";
			__style.top = y0 + _minPixel * i + "px";
			__style.left = x0 + "px";
			__style.position = "absolute";
			ddiv._dom.appendChild(__grad);
		}
	}
	var gradfill = new divtastic.js.GradientFiller(_grads);
	gradfill.fill(c0_,c1_);
	return _grads;
}
divtastic.js.Drawing.drawGradElipse = function(ddiv,x0,y0,w0,h0,c1_,c0_,_minPixel,direction) {
	if(_minPixel == null) _minPixel = 1;
	var _tot;
	var _grads = new List();
	var __grad;
	var __style;
	var rx0 = w0 / 2;
	var ry0 = h0 / 2;
	var cx0 = x0 + rx0;
	var cy0 = y0 + ry0;
	var delta;
	if(direction == zpartanlite.Orientation.Horizontal) {
		_tot = Std["int"](Math.floor(w0 / _minPixel));
		var iter = new IntIter(0,_tot);
		while( iter.hasNext() ) {
			var i = iter.next();
			__grad = js.Lib.document.createElement("div");
			_grads.add(__grad);
			__style = __grad.style;
			__style.width = _minPixel + "px";
			delta = Math.pow(Math.pow(ry0,2) * (1 - Math.pow(i - rx0,2) / Math.pow(rx0,2)),0.5);
			__style.top = Std.string(cy0 - delta) + "px";
			__style.height = Std.string(2 * delta) + "px";
			__style.left = x0 + _minPixel * i + "px";
			__style.position = "absolute";
			ddiv._dom.appendChild(__grad);
		}
	} else {
		_tot = Std["int"](Math.floor(h0 / _minPixel));
		var iter = new IntIter(0,_tot);
		while( iter.hasNext() ) {
			var i = iter.next();
			__grad = js.Lib.document.createElement("div");
			_grads.add(__grad);
			__style = __grad.style;
			__style.height = _minPixel + "px";
			delta = Math.pow(Math.pow(rx0,2) * (1 - Math.pow(i - ry0,2) / Math.pow(ry0,2)),0.5);
			__style.left = Std.string(cx0 - delta) + "px";
			__style.width = Std.string(2 * delta) + "px";
			__style.top = y0 + _minPixel * i + "px";
			__style.position = "absolute";
			ddiv._dom.appendChild(__grad);
		}
	}
	var gradfill = new divtastic.js.GradientFiller(_grads);
	gradfill.fill(c0_,c1_);
	return _grads;
}
divtastic.js.Drawing.drawGradHexagon = function(ddiv,x0,y0,w0,h0,c1_,c0_,_minPixel,direction) {
	if(_minPixel == null) _minPixel = 1;
	var _tot;
	var _grads = new List();
	var __grad;
	var __style;
	if(direction == zpartanlite.Orientation.Horizontal) {
		_tot = Std["int"](Math.floor(w0 / _minPixel));
		var iter = new IntIter(0,_tot);
		var deg30 = Math.PI / 6;
		var smallTriBase = h0 / 2;
		var smallHypot = smallTriBase / Math.cos(deg30);
		var leftDist = smallHypot * Math.sin(deg30);
		var rightDist = _tot - leftDist;
		while( iter.hasNext() ) {
			var i = iter.next();
			__grad = js.Lib.document.createElement("div");
			_grads.add(__grad);
			__style = __grad.style;
			__style.width = _minPixel + "px";
			if(i < leftDist) {
				__style.height = Math.floor(h0 / leftDist * i) + "px";
				__style.top = y0 + h0 / 2 - Math.floor(h0 / leftDist * i / 2) + "px";
			} else if(i > rightDist) {
				__style.height = Math.floor(h0 / leftDist * (leftDist + rightDist - i)) + "px";
				__style.top = y0 - Math.floor(h0 / leftDist * (rightDist - i) / 2) + "px";
			} else {
				__style.height = h0;
				__style.top = y0;
			}
			__style.left = x0 + _minPixel * i + "px";
			__style.position = "absolute";
			ddiv._dom.appendChild(__grad);
		}
	} else {
		_tot = Std["int"](Math.floor(h0 / _minPixel));
		var iter = new IntIter(0,_tot);
		while( iter.hasNext() ) {
			var i = iter.next();
			__grad = js.Lib.document.createElement("div");
			_grads.add(__grad);
			__style = __grad.style;
			__style.height = _minPixel + "px";
			__style.top = y0 + _minPixel * i + "px";
			if(i > _tot / 2) {
				__style.width = Math.floor(w0 / _tot * (_tot - i + _tot / 2)) + "px";
				__style.left = x0 + w0 / 2 - Math.floor(w0 / _tot * (_tot - i + _tot / 2) / 2) + "px";
			} else {
				__style.width = Math.floor(w0 / _tot * (i + _tot / 2)) + "px";
				__style.left = x0 + w0 / 2 - Math.floor(w0 / _tot * (i + _tot / 2) / 2) + "px";
			}
			__style.position = "absolute";
			ddiv._dom.appendChild(__grad);
		}
	}
	var gradfill = new divtastic.js.GradientFiller(_grads);
	gradfill.fill(c0_,c1_);
	return _grads;
}
divtastic.js.Drawing.drawGradTriangle = function(ddiv,x0,y0,w0,h0,c1_,c0_,_compass,_minPixel,direction) {
	if(_minPixel == null) _minPixel = 1;
	var _tot;
	var _grads = new List();
	var __grad;
	var __style;
	if(direction == zpartanlite.Orientation.Horizontal) {
		_tot = Std["int"](Math.floor(w0 / _minPixel));
		var iter = new IntIter(0,_tot);
		while( iter.hasNext() ) {
			var i = iter.next();
			__grad = js.Lib.document.createElement("div");
			_grads.add(__grad);
			__style = __grad.style;
			__style.width = _minPixel + "px";
			if(_compass == zpartanlite.Compass.West) {
				__style.height = Math.floor(h0 / _tot * (_tot - i)) + "px";
				__style.top = y0 + h0 / 2 - Math.floor(h0 / _tot * (_tot - i)) / 2 + "px";
			} else {
				__style.height = Math.floor(h0 / _tot * i) + "px";
				__style.top = y0 + h0 / 2 - Math.floor(h0 / _tot * i) / 2 + "px";
			}
			__style.left = x0 + _minPixel * i + "px";
			__style.position = "absolute";
			ddiv._dom.appendChild(__grad);
		}
	} else {
		_tot = Std["int"](Math.floor(h0 / _minPixel));
		var iter = new IntIter(0,_tot);
		while( iter.hasNext() ) {
			var i = iter.next();
			__grad = js.Lib.document.createElement("div");
			_grads.add(__grad);
			__style = __grad.style;
			__style.height = _minPixel + "px";
			__style.top = y0 + _minPixel * i + "px";
			if(_compass == zpartanlite.Compass.South) {
				__style.width = Math.floor(w0 / _tot * (_tot - i)) + "px";
				__style.left = x0 + w0 / 2 - Math.floor(w0 / _tot * (_tot - i)) / 2 + "px";
			} else {
				__style.width = Math.floor(w0 / _tot * i) + "px";
				__style.left = x0 + w0 / 2 - Math.floor(w0 / _tot * i) / 2 + "px";
			}
			__style.position = "absolute";
			ddiv._dom.appendChild(__grad);
		}
	}
	var gradfill = new divtastic.js.GradientFiller(_grads);
	gradfill.fill(c0_,c1_);
	return _grads;
}
divtastic.js.Drawing.lineFromTo = function(ddiv,p1x,p1y,p2x,p2y,_lineWidth,_lineHeight,c0) {
	if(c0 == null) c0 = "#ff0000";
	var _grads = new List();
	var __grad;
	var __style;
	var ratio;
	if(p1x - p2x == 0) {
		var steps = 2 * Math.ceil(Math.abs(p1y - p2y));
	} else if(p1y - p2y == 0) {
		var steps = 2 * Math.ceil(Math.abs(p1x - p2x));
	}
	var steps = Math.ceil(Math.pow(Math.pow(p1x - p2x,2) + Math.pow(p1y - p2y,2),0.5));
	var px;
	var py;
	var inter = new IntIter(0,steps);
	while( inter.hasNext() ) {
		var i = inter.next();
		ratio = i / steps;
		px = Std["int"](p1x + (p2x - p1x) * ratio);
		py = Std["int"](p1y + (p2y - p1y) * ratio);
		__grad = js.Lib.document.createElement("div");
		_grads.add(__grad);
		__style = __grad.style;
		__style.paddingTop = _lineHeight + "px";
		__style.paddingLeft = _lineWidth + "px";
		__style.top = py + "px";
		__style.left = px + "px";
		__style.backgroundColor = c0;
		__style.position = "absolute";
		ddiv._dom.appendChild(__grad);
	}
	return _grads;
}
divtastic.js.Drawing.curveThru = function(ddiv,p1x,p1y,p2x,p2y,p3x,p3y,_lineWidth,_lineHeight,c0) {
	var newx = 2 * p2x - .5 * (p1x + p3x);
	var newy = 2 * p2y - .5 * (p1y + p3y);
	return divtastic.js.Drawing.curveFromTo(ddiv,p1x,p1y,newx,newy,p3x,p3y,_lineWidth,_lineHeight,c0);
}
divtastic.js.Drawing.prototype.__class__ = divtastic.js.Drawing;
if(typeof zpartanlite=='undefined') zpartanlite = {}
zpartanlite.Compass = { __ename__ : ["zpartanlite","Compass"], __constructs__ : ["North","South","East","West"] }
zpartanlite.Compass.North = ["North",0];
zpartanlite.Compass.North.toString = $estr;
zpartanlite.Compass.North.__enum__ = zpartanlite.Compass;
zpartanlite.Compass.South = ["South",1];
zpartanlite.Compass.South.toString = $estr;
zpartanlite.Compass.South.__enum__ = zpartanlite.Compass;
zpartanlite.Compass.East = ["East",2];
zpartanlite.Compass.East.toString = $estr;
zpartanlite.Compass.East.__enum__ = zpartanlite.Compass;
zpartanlite.Compass.West = ["West",3];
zpartanlite.Compass.West.toString = $estr;
zpartanlite.Compass.West.__enum__ = zpartanlite.Compass;
zpartanlite.Orientation = { __ename__ : ["zpartanlite","Orientation"], __constructs__ : ["Horizontal","Vertical"] }
zpartanlite.Orientation.Horizontal = ["Horizontal",0];
zpartanlite.Orientation.Horizontal.toString = $estr;
zpartanlite.Orientation.Horizontal.__enum__ = zpartanlite.Orientation;
zpartanlite.Orientation.Vertical = ["Vertical",1];
zpartanlite.Orientation.Vertical.toString = $estr;
zpartanlite.Orientation.Vertical.__enum__ = zpartanlite.Orientation;
zpartanlite.Travel = { __ename__ : ["zpartanlite","Travel"], __constructs__ : ["Forward","Back"] }
zpartanlite.Travel.Forward = ["Forward",0];
zpartanlite.Travel.Forward.toString = $estr;
zpartanlite.Travel.Forward.__enum__ = zpartanlite.Travel;
zpartanlite.Travel.Back = ["Back",1];
zpartanlite.Travel.Back.toString = $estr;
zpartanlite.Travel.Back.__enum__ = zpartanlite.Travel;
zpartanlite.Enumerables = function() { }
zpartanlite.Enumerables.__name__ = ["zpartanlite","Enumerables"];
zpartanlite.Enumerables.prototype.__class__ = zpartanlite.Enumerables;
if(typeof haxe=='undefined') haxe = {}
haxe.FastList = function(p) {
}
haxe.FastList.__name__ = ["haxe","FastList"];
haxe.FastList.prototype.head = null;
haxe.FastList.prototype.add = function(item) {
	this.head = new haxe.FastCell(item,this.head);
}
haxe.FastList.prototype.first = function() {
	return this.head == null?null:this.head.elt;
}
haxe.FastList.prototype.pop = function() {
	var k = this.head;
	if(k == null) return null; else {
		this.head = k.next;
		return k.elt;
	}
}
haxe.FastList.prototype.isEmpty = function() {
	return this.head == null;
}
haxe.FastList.prototype.remove = function(v) {
	var prev = null;
	var l = this.head;
	while(l != null) {
		if(l.elt == v) {
			if(prev == null) this.head = l.next; else prev.next = l.next;
			break;
		}
		prev = l;
		l = l.next;
	}
	return l != null;
}
haxe.FastList.prototype.iterator = function() {
	var l = this.head;
	return { hasNext : function() {
		return l != null;
	}, next : function() {
		var k = l;
		l = k.next;
		return k.elt;
	}};
}
haxe.FastList.prototype.toString = function() {
	var a = new Array();
	var l = this.head;
	while(l != null) {
		a.push(l.elt);
		l = l.next;
	}
	return "{" + a.join(",") + "}";
}
haxe.FastList.prototype.__class__ = haxe.FastList;
if(typeof feffects=='undefined') feffects = {}
feffects.Tween = function(init,end,dur,_obj,_prop,easing) {
	if( init === $_ ) return;
	this._initVal = init;
	this._endVal = end;
	this.duration = dur;
	this._offsetTime = 0;
	this._obj = _obj;
	this._prop = _prop;
	if(easing != null) this._easingF = easing; else if(Reflect.isFunction(_obj)) this._easingF = _obj; else this._easingF = $closure(this,"easingEquation");
	this.isPlaying = false;
}
feffects.Tween.__name__ = ["feffects","Tween"];
feffects.Tween._timer = null;
feffects.Tween.AddTween = function(tween) {
	feffects.Tween._aTweens.add(tween);
	feffects.Tween._timer.run = feffects.Tween.DispatchTweens;
}
feffects.Tween.RemoveTween = function(tween) {
	if(tween == null || feffects.Tween._timer == null) return;
	feffects.Tween._aTweens.remove(tween);
	if(feffects.Tween._aTweens.head == null && feffects.Tween._aPaused.head == null) {
		feffects.Tween._timer.stop();
		feffects.Tween._timer = null;
	}
}
feffects.Tween.getActiveTweens = function() {
	return feffects.Tween._aTweens;
}
feffects.Tween.getPausedTweens = function() {
	return feffects.Tween._aPaused;
}
feffects.Tween.setTweenPaused = function(tween) {
	if(tween == null || feffects.Tween._timer == null) return;
	feffects.Tween._aPaused.add(tween);
	feffects.Tween._aTweens.remove(tween);
}
feffects.Tween.setTweenActive = function(tween) {
	if(tween == null || feffects.Tween._timer == null) return;
	feffects.Tween._aTweens.add(tween);
	feffects.Tween._aPaused.remove(tween);
}
feffects.Tween.DispatchTweens = function() {
	var $it0 = feffects.Tween._aTweens.iterator();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		i.doInterval();
	}
}
feffects.Tween.prototype.duration = null;
feffects.Tween.prototype.position = null;
feffects.Tween.prototype.reversed = null;
feffects.Tween.prototype.isPlaying = null;
feffects.Tween.prototype._initVal = null;
feffects.Tween.prototype._endVal = null;
feffects.Tween.prototype._startTime = null;
feffects.Tween.prototype._pauseTime = null;
feffects.Tween.prototype._offsetTime = null;
feffects.Tween.prototype._reverseTime = null;
feffects.Tween.prototype._easingF = null;
feffects.Tween.prototype._obj = null;
feffects.Tween.prototype._prop = null;
feffects.Tween.prototype.start = function() {
	if(feffects.Tween._timer != null) feffects.Tween._timer.stop();
	feffects.Tween._timer = new haxe.Timer(10);
	this._startTime = Date.now().getTime();
	if(this.duration == 0) this.endTween(); else feffects.Tween.AddTween(this);
	this.isPlaying = true;
	this.position = 0;
	this._reverseTime = this._startTime;
	this.reversed = false;
}
feffects.Tween.prototype.pause = function() {
	this._pauseTime = Date.now().getTime();
	feffects.Tween.setTweenPaused(this);
	this.isPlaying = false;
}
feffects.Tween.prototype.resume = function() {
	this._startTime += Date.now().getTime() - this._pauseTime;
	this._reverseTime += Date.now().getTime() - this._pauseTime;
	feffects.Tween.setTweenActive(this);
	this.isPlaying = true;
}
feffects.Tween.prototype.seek = function(ms) {
	this._offsetTime = ms;
}
feffects.Tween.prototype.reverse = function() {
	this.reversed = !this.reversed;
	if(!this.reversed) this._startTime += (Date.now().getTime() - this._reverseTime) * 2;
	this._reverseTime = Date.now().getTime();
}
feffects.Tween.prototype.stop = function() {
	feffects.Tween.RemoveTween(this);
	this.isPlaying = false;
}
feffects.Tween.prototype.setTweenHandlers = function(update,end) {
	this.updateFunc = update;
	this.endFunc = end;
}
feffects.Tween.prototype.setEasing = function(easingFunc) {
	if(easingFunc != null) this._easingF = easingFunc;
}
feffects.Tween.prototype.updateFunc = function(e) {
}
feffects.Tween.prototype.endFunc = function(e) {
}
feffects.Tween.prototype.doInterval = function() {
	var stamp = Date.now().getTime();
	var curTime = 0;
	if(this.reversed) curTime = this._reverseTime * 2 - stamp - this._startTime + this._offsetTime; else curTime = stamp - this._startTime + this._offsetTime;
	var curVal = this._easingF(curTime,this._initVal,this._endVal - this._initVal,this.duration);
	if(curTime >= this.duration || curTime <= 0) this.endTween(); else {
		if($closure(this,"updateFunc") != null) this.updateFunc(curVal);
		if(this._prop != null) this._obj[this._prop] = curVal;
	}
	this.position = curTime;
}
feffects.Tween.prototype.getCurVal = function(curTime) {
	return this._easingF(curTime,this._initVal,this._endVal - this._initVal,this.duration);
}
feffects.Tween.prototype.getStamp = function() {
	return Date.now().getTime();
}
feffects.Tween.prototype.endTween = function() {
	feffects.Tween.RemoveTween(this);
	var val = 0.0;
	if(this.reversed) val = this._initVal; else val = this._endVal;
	if($closure(this,"updateFunc") != null) this.updateFunc(val);
	if($closure(this,"endFunc") != null) this.endFunc(val);
	if(this._prop != null) this._obj[this._prop] = val;
}
feffects.Tween.prototype.easingEquation = function(t,b,c,d) {
	return c / 2 * (Math.sin(Math.PI * (t / d - 0.5)) + 1) + b;
}
feffects.Tween.prototype.__class__ = feffects.Tween;
divtastic.js.GradientFiller = function(grads_) {
	if( grads_ === $_ ) return;
	if(grads_ != null) {
		this._grads = grads_;
		this._tot = this._grads.length;
	}
}
divtastic.js.GradientFiller.__name__ = ["divtastic","js","GradientFiller"];
divtastic.js.GradientFiller.prototype._grads = null;
divtastic.js.GradientFiller.prototype._tot = null;
divtastic.js.GradientFiller.prototype._c0 = null;
divtastic.js.GradientFiller.prototype._c1 = null;
divtastic.js.GradientFiller.prototype._c0r = null;
divtastic.js.GradientFiller.prototype._c0g = null;
divtastic.js.GradientFiller.prototype._c0b = null;
divtastic.js.GradientFiller.prototype._c1r = null;
divtastic.js.GradientFiller.prototype._c1g = null;
divtastic.js.GradientFiller.prototype._c1b = null;
divtastic.js.GradientFiller.prototype.setGrads = function(grads_) {
	this._grads = grads_;
	this._tot = this._grads.length;
}
divtastic.js.GradientFiller.prototype.fill = function(c0_,c1_) {
	if(c1_ != null && c0_ != c1_) {
		this._c0 = c0_;
		this._c1 = c1_;
		this._c0r = this._c0 >> 16;
		this._c0g = this._c0 >> 8 & 255;
		this._c0b = this._c0 & 255;
		this._c1r = this._c1 >> 16;
		this._c1g = this._c1 >> 8 & 255;
		this._c1b = this._c1 & 255;
		var newInt = Lambda.mapi(this._grads,$closure(this,"colorMap"));
	} else Lambda.map(this._grads,function(div) {
		div.style.backgroundColor = "#" + StringTools.lpad(StringTools.hex(c0_ >> 16 << 16 | (c0_ >> 8 & 255) << 8 | c0_ & 255),"0",6);
	});
}
divtastic.js.GradientFiller.prototype.colorMap = function(i,grad) {
	var t = i / this._tot;
	var __style = grad.style;
	__style.backgroundColor = "#" + StringTools.lpad(StringTools.hex(this._c0r + (this._c1r - this._c0r) * t << 16 | this._c0g + (this._c1g - this._c0g) * t << 8 | this._c0b + (this._c1b - this._c0b) * t),"0",6);
	return grad;
}
divtastic.js.GradientFiller.prototype.__class__ = divtastic.js.GradientFiller;
if(typeof samples=='undefined') samples = {}
if(!samples.examples) samples.examples = {}
if(!samples.examples.cubic_bezier) samples.examples.cubic_bezier = {}
if(!samples.examples.cubic_bezier.application) samples.examples.cubic_bezier.application = {}
samples.examples.cubic_bezier.application.Controller = function(holder_) {
	if( holder_ === $_ ) return;
	this._holder = holder_;
	this.circleRed = this.createCircle(20,200,16711680);
	this.circleRed.setupDrag();
	this._holder.addChild(this.circleRed);
	this.circleGreen = this.createCircle(200,30,65280);
	this.circleGreen.setupDrag();
	this._holder.addChild(this.circleGreen);
	this.circleMauve = this.createCircle(350,350,16711935);
	this.circleMauve.setupDrag();
	this._holder.addChild(this.circleMauve);
	this.circleBlue = this.createCircle(450,250,255);
	this.circleBlue.setupDrag();
	this._holder.addChild(this.circleBlue);
	this.circleYellow = this.createCircle(20,200,16776960);
	this.circleYellow.set_visible(false);
	this._holder.addChild(this.circleYellow);
	this.createRightArrow(this._holder);
}
samples.examples.cubic_bezier.application.Controller.__name__ = ["samples","examples","cubic_bezier","application","Controller"];
samples.examples.cubic_bezier.application.Controller.prototype._holder = null;
samples.examples.cubic_bezier.application.Controller.prototype.circleRed = null;
samples.examples.cubic_bezier.application.Controller.prototype.circleGreen = null;
samples.examples.cubic_bezier.application.Controller.prototype.circleBlue = null;
samples.examples.cubic_bezier.application.Controller.prototype.circleMauve = null;
samples.examples.cubic_bezier.application.Controller.prototype.circleYellow = null;
samples.examples.cubic_bezier.application.Controller.prototype.createCircle = function(x,y,col) {
	var circle = new divtastic.js.DisplayDiv();
	circle.set_x(x);
	circle.set_y(y);
	var divs = divtastic.js.Drawing.drawGradElipse(circle,0,0,18,20,col,col);
	return circle;
}
samples.examples.cubic_bezier.application.Controller.prototype.createRightArrow = function(aTab) {
	var right = new divtastic.js.DisplayDiv();
	right.set_x(5);
	right.set_y(0);
	aTab.addChild(right);
	var grey6 = 6710886;
	var grey36 = 3552822;
	divtastic.js.Drawing.drawGradTriangle(right,4,4,24,30,grey36,grey6,zpartanlite.Compass.West,1,zpartanlite.Orientation.Horizontal);
	right.getStyle().cursor = "pointer";
	right.press.add($closure(this,"move"));
	return right.getInstance();
}
samples.examples.cubic_bezier.application.Controller.prototype.move = function() {
	var me = this;
	this.circleYellow.set_x(this.circleRed.get_x());
	this.circleYellow.set_y(this.circleRed.get_y());
	this.circleYellow.set_visible(true);
	var t = new feffects.Tween(0,1,2500);
	t.setTweenHandlers(function(e) {
		me.circleYellow.set_x(divtastic.Movement.cubicBezier(e,me.circleRed.get_x(),me.circleGreen.get_x(),me.circleMauve.get_x(),me.circleBlue.get_x()));
		me.circleYellow.set_y(divtastic.Movement.cubicBezier(e,me.circleRed.get_y(),me.circleGreen.get_y(),me.circleMauve.get_y(),me.circleBlue.get_y()));
	},function(e) {
		me.circleYellow.set_visible(false);
	});
	t.start();
}
samples.examples.cubic_bezier.application.Controller.prototype.__class__ = samples.examples.cubic_bezier.application.Controller;
StringTools = function() { }
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
}
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
}
StringTools.htmlEscape = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
StringTools.htmlUnescape = function(s) {
	return s.split("&gt;").join(">").split("&lt;").join("<").split("&amp;").join("&");
}
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && s.substr(0,start.length) == start;
}
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && s.substr(slen - elen,elen) == end;
}
StringTools.isSpace = function(s,pos) {
	var c = s.charCodeAt(pos);
	return c >= 9 && c <= 13 || c == 32;
}
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return s.substr(r,l - r); else return s;
}
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return s.substr(0,l - r); else return s;
}
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
}
StringTools.rpad = function(s,c,l) {
	var sl = s.length;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		s += c.substr(0,l - sl);
		sl = l;
	} else {
		s += c;
		sl += cl;
	}
	return s;
}
StringTools.lpad = function(s,c,l) {
	var ns = "";
	var sl = s.length;
	if(sl >= l) return s;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		ns += c.substr(0,l - sl);
		sl = l;
	} else {
		ns += c;
		sl += cl;
	}
	return ns + s;
}
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
}
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
}
StringTools.fastCodeAt = function(s,index) {
	return s.cca(index);
}
StringTools.isEOF = function(c) {
	return c != c;
}
StringTools.prototype.__class__ = StringTools;
Reflect = function() { }
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	if(o.hasOwnProperty != null) return o.hasOwnProperty(field);
	var arr = Reflect.fields(o);
	var $it0 = arr.iterator();
	while( $it0.hasNext() ) {
		var t = $it0.next();
		if(t == field) return true;
	}
	return false;
}
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
	}
	return v;
}
Reflect.setField = function(o,field,value) {
	o[field] = value;
}
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
}
Reflect.fields = function(o) {
	if(o == null) return new Array();
	var a = new Array();
	if(o.hasOwnProperty) {
		for(var i in o) if( o.hasOwnProperty(i) ) a.push(i);
	} else {
		var t;
		try {
			t = o.__proto__;
		} catch( e ) {
			t = null;
		}
		if(t != null) o.__proto__ = null;
		for(var i in o) if( i != "__proto__" ) a.push(i);
		if(t != null) o.__proto__ = t;
	}
	return a;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && f.__name__ == null;
}
Reflect.compare = function(a,b) {
	return a == b?0:a > b?1:-1;
}
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
}
Reflect.isObject = function(v) {
	if(v == null) return false;
	var t = typeof(v);
	return t == "string" || t == "object" && !v.__enum__ || t == "function" && v.__name__ != null;
}
Reflect.deleteField = function(o,f) {
	if(!Reflect.hasField(o,f)) return false;
	delete(o[f]);
	return true;
}
Reflect.copy = function(o) {
	var o2 = { };
	var _g = 0, _g1 = Reflect.fields(o);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		o2[f] = Reflect.field(o,f);
	}
	return o2;
}
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = new Array();
		var _g1 = 0, _g = arguments.length;
		while(_g1 < _g) {
			var i = _g1++;
			a.push(arguments[i]);
		}
		return f(a);
	};
}
Reflect.prototype.__class__ = Reflect;
haxe.Log = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Log.clear = function() {
	js.Boot.__clear_trace();
}
haxe.Log.prototype.__class__ = haxe.Log;
divtastic.js.DisplayDiv = function(img) {
	if( img === $_ ) return;
	if(this.isVideo(img)) {
		this._vid = divtastic.js.GlobalDiv.ROOT(this).createElement("video");
		this._dom = this._vid;
	} else if(img == "canvas") this._dom = divtastic.js.GlobalDiv.ROOT(this).createElement("canvas"); else this._dom = divtastic.js.GlobalDiv.ROOT(this).createElement("div");
	this._style = this._dom.style;
	this.isIE = browserhx.Browser.get_BrowserType() == browserhx.BrowserType.IE;
	this.out = new zpartanlite.DispatchTo();
	this.out.tellEnabled = $closure(this,"outEnabled");
	this.out.tellDisabled = $closure(this,"outDisabled");
	this.over = new zpartanlite.DispatchTo();
	this.over.tellEnabled = $closure(this,"overEnabled");
	this.over.tellDisabled = $closure(this,"overDisabled");
	this.release = new zpartanlite.DispatchTo();
	this.release.tellEnabled = $closure(this,"releaseEnabled");
	this.release.tellDisabled = $closure(this,"releaseDisabled");
	this.press = new zpartanlite.DispatchTo();
	this.press.tellEnabled = $closure(this,"pressEnabled");
	this.press.tellDisabled = $closure(this,"pressDisabled");
	this.dragging = new zpartanlite.DispatchTo();
	this.dragInform = false;
	this.draggingParent = new zpartanlite.DispatchTo();
	this.setTile(false);
	if(img != null) this.setImage(img);
	this._style.position = "absolute";
	this._d = 0;
}
divtastic.js.DisplayDiv.__name__ = ["divtastic","js","DisplayDiv"];
divtastic.js.DisplayDiv.prototype.isIE = null;
divtastic.js.DisplayDiv.prototype.fixedTextWidth = null;
divtastic.js.DisplayDiv.prototype.fixedTextHeight = null;
divtastic.js.DisplayDiv.prototype._d = null;
divtastic.js.DisplayDiv.prototype._dom = null;
divtastic.js.DisplayDiv.prototype._y = null;
divtastic.js.DisplayDiv.prototype._x = null;
divtastic.js.DisplayDiv.prototype._width = null;
divtastic.js.DisplayDiv.prototype._height = null;
divtastic.js.DisplayDiv.prototype._style = null;
divtastic.js.DisplayDiv.prototype._bgColor = null;
divtastic.js.DisplayDiv.prototype._img = null;
divtastic.js.DisplayDiv.prototype._tile = null;
divtastic.js.DisplayDiv.prototype.offSetX = null;
divtastic.js.DisplayDiv.prototype.offSetY = null;
divtastic.js.DisplayDiv.prototype.imageDiv = null;
divtastic.js.DisplayDiv.prototype.viz = null;
divtastic.js.DisplayDiv.prototype._scale = null;
divtastic.js.DisplayDiv.prototype._scaleY = null;
divtastic.js.DisplayDiv.prototype._scaleX = null;
divtastic.js.DisplayDiv.prototype._alpha = null;
divtastic.js.DisplayDiv.prototype._rotation = null;
divtastic.js.DisplayDiv.prototype._angle = null;
divtastic.js.DisplayDiv.prototype._clientX = null;
divtastic.js.DisplayDiv.prototype._clientY = null;
divtastic.js.DisplayDiv.prototype.afflines = null;
divtastic.js.DisplayDiv.prototype.press = null;
divtastic.js.DisplayDiv.prototype.release = null;
divtastic.js.DisplayDiv.prototype.out = null;
divtastic.js.DisplayDiv.prototype.over = null;
divtastic.js.DisplayDiv.prototype.dragging = null;
divtastic.js.DisplayDiv.prototype.draggingParent = null;
divtastic.js.DisplayDiv.prototype._vid = null;
divtastic.js.DisplayDiv.prototype._src = null;
divtastic.js.DisplayDiv.prototype.dragInform = null;
divtastic.js.DisplayDiv.prototype.getGlobalXY = function() {
	var p = this;
	var gX = p.get_x();
	var gY = p.get_y();
	while(p.get_parent() != null) {
		p = p.get_parent();
		gX += p.get_x();
		gY += p.get_y();
	}
	var pos = new List();
	pos.add(gX);
	pos.add(gY);
	return pos;
}
divtastic.js.DisplayDiv.prototype.pressEnabled = function() {
	var me = this;
	this._dom.onmousedown = function(e) {
		me._clientX = e.clientX;
		me._clientY = e.clientY;
		me.press.dispatch();
	};
}
divtastic.js.DisplayDiv.prototype.pressDisabled = function() {
	this._dom.onmousedown = null;
}
divtastic.js.DisplayDiv.prototype.releaseEnabled = function() {
	var me = this;
	this._dom.onmouseup = function(e) {
		me._clientX = e.clientX;
		me._clientY = e.clientY;
		me.release.dispatch();
	};
}
divtastic.js.DisplayDiv.prototype.releaseDisabled = function() {
	this._dom.onmouseup = null;
}
divtastic.js.DisplayDiv.prototype.overEnabled = function() {
	var me = this;
	this._dom.onmouseover = function(e) {
		me.over.dispatch();
	};
}
divtastic.js.DisplayDiv.prototype.overDisabled = function() {
	this._dom.onmouseover = null;
}
divtastic.js.DisplayDiv.prototype.outEnabled = function() {
	var me = this;
	this._dom.onmouseout = function(e) {
		me.out.dispatch();
	};
}
divtastic.js.DisplayDiv.prototype.outDisabled = function() {
	this._dom.onmouseout = null;
}
divtastic.js.DisplayDiv.prototype.setupDrag = function() {
	this._style.cursor = "pointer";
	this.press.add($closure(this,"startDrag"));
	this.release.add($closure(this,"stopDrag"));
}
divtastic.js.DisplayDiv.prototype.startDrag = function() {
	this.offSetX = Std["int"](this._clientX - this.get_x());
	this.offSetY = Std["int"](this._clientY - this.get_y());
	divtastic.js.GlobalDiv.ROOT(this).onmousemove = $closure(this,"drag");
}
divtastic.js.DisplayDiv.prototype.stopDrag = function() {
	divtastic.js.GlobalDiv.ROOT(this).onmousemove = null;
}
divtastic.js.DisplayDiv.prototype.drag = function(e) {
	if(this.dragInform) this.dragging.dispatch();
	this.set_x(e.clientX - this.offSetX);
	this.set_y(e.clientY - this.offSetY);
}
divtastic.js.DisplayDiv.prototype.setupParentDrag = function() {
	var me = this;
	this._style.cursor = "pointer";
	this.press.add($closure(this,"parentStartDrag"));
	this.release.add($closure(this,"parentStopDrag"));
}
divtastic.js.DisplayDiv.prototype.parentStartDrag = function() {
	this.offSetX = Std["int"](this._clientX - this.get_parent().get_x());
	this.offSetY = Std["int"](this._clientY - this.get_parent().get_y());
	divtastic.js.GlobalDiv.ROOT(this).onmousemove = $closure(this,"parentDrag");
}
divtastic.js.DisplayDiv.prototype.parentStopDrag = function() {
	divtastic.js.GlobalDiv.ROOT(this).onmousemove = null;
}
divtastic.js.DisplayDiv.prototype.parentDrag = function(e) {
	if(this.dragInform) this.draggingParent.dispatch();
	this.get_parent().set_x(e.clientX - this.offSetX);
	this.get_parent().set_y(e.clientY - this.offSetY);
}
divtastic.js.DisplayDiv.prototype.play = function() {
	if(this._vid != null) this._vid.play();
}
divtastic.js.DisplayDiv.prototype.isVideo = function(img) {
	if(img == null) return false;
	var arr = img.split(".");
	if(arr.length == null) return false;
	var str = arr[1];
	switch(str) {
	case "ogv":case "mpeg":case "mov":case "mp4":case "webm":
		this.videoType = "video/" + str;
		return true;
	}
	return false;
}
divtastic.js.DisplayDiv.prototype.videoType = null;
divtastic.js.DisplayDiv.prototype.setImage = function(img) {
	this._img = img;
	if(this.isIE) this.createImageDivIfNot();
	if(img.split(".").length > 1) {
		if(this.isIE) this.imageDiv.setImage(img); else if(this._vid == null) this._style.backgroundImage = "url(" + img + ")"; else {
			this._dom.setAttribute("src",img);
			this._dom.setAttribute("type",this.videoType);
		}
	} else if(this.isIE) this.imageDiv.setImage(img); else this._dom.className = img;
}
divtastic.js.DisplayDiv.prototype.setClip = function() {
	this._style.overflow = "Hidden";
}
divtastic.js.DisplayDiv.prototype.tile = null;
divtastic.js.DisplayDiv.prototype.getTile = function() {
	if(this._tile == null) this.setTile(false);
	return this._tile;
}
divtastic.js.DisplayDiv.prototype.setTile = function(tile_) {
	this._tile = tile_;
	if(this.isIE) this.createImageDivIfNot();
	if(this._tile) {
		if(this.isIE) this.imageDiv.setTile(true); else this._style.backgroundRepeat = "repeat";
	} else if(this.isIE) this.imageDiv.setTile(false); else this._style.backgroundRepeat = "no-repeat";
	return tile_;
}
divtastic.js.DisplayDiv.prototype.createImageDivIfNot = function() {
	if(this.imageDiv == null) {
		this.imageDiv = new divtastic.js.ImageDiv();
		this.imageDiv.set_x(0);
		this.imageDiv.set_y(0);
		this.addChild2(this.imageDiv);
	}
	this.imageDiv.set_width(this.get_width());
	this.imageDiv.set_height(this.get_height());
	return this.imageDiv;
}
divtastic.js.DisplayDiv.prototype.getInstance = function() {
	return this._dom;
}
divtastic.js.DisplayDiv.prototype.getStyle = function() {
	return this._style;
}
divtastic.js.DisplayDiv.prototype.text = null;
divtastic.js.DisplayDiv.prototype.set_text = function(txt) {
	this._dom.innerHTML = "";
	this.set_width(0);
	this.set_height(0);
	if(this.get_parent() != null) this.get_parent().updateSizeBasedOnChild(this);
	this._dom.innerHTML = txt;
	switch( (browserhx.Browser.get_BrowserType())[1] ) {
	case 3:
		this._style.MozUserSelect = "none";
		break;
	case 2:
	case 1:
	case 0:
		this._style.webkitUserSelect = "none";
		break;
	case 5:
	case 4:
		this._style.unselectable = "on";
		break;
	}
	this.set_width(this._width);
	this.set_height(this._height);
	if(this.get_parent() != null) this.get_parent().updateSizeBasedOnChild(this);
	return txt;
}
divtastic.js.DisplayDiv.prototype.updateText = function(txt) {
	this._dom.innerHTML = "";
	this.set_width(0);
	this.set_height(0);
	this._dom.innerHTML = txt;
	this._style.width = Std.string(this.fixedTextWidth);
	if(this.fixedTextHeight != null) this._style.height = Std.string(this.fixedTextHeight);
	this._style.overflow = "Hidden";
}
divtastic.js.DisplayDiv.prototype.get_text = function() {
	return this._dom.innerHTML;
}
divtastic.js.DisplayDiv.prototype.visible = null;
divtastic.js.DisplayDiv.prototype.set_visible = function(val) {
	if(val) this._style.visibility = "visible"; else this._style.visibility = "hidden";
	this.viz = val;
	return this.viz;
}
divtastic.js.DisplayDiv.prototype.get_visible = function() {
	if(this.viz == null) this.viz = true;
	return this.viz;
}
divtastic.js.DisplayDiv.prototype.fill = null;
divtastic.js.DisplayDiv.prototype.set_fill = function(c) {
	if(this.isIE) {
		this.createImageDivIfNot();
		this.imageDiv.set_fill(c);
	} else this._style.backgroundColor = c;
	this._bgColor = c;
	return c;
}
divtastic.js.DisplayDiv.prototype.get_fill = function() {
	return this._bgColor;
}
divtastic.js.DisplayDiv.prototype.height = null;
divtastic.js.DisplayDiv.prototype.set_height = function(val) {
	this._height = val;
	this._style.paddingTop = val + "px";
	return val;
}
divtastic.js.DisplayDiv.prototype.get_height = function() {
	if(this._height == null || this._height < this._dom.clientHeight) this._height = this._dom.clientHeight;
	return this._height;
}
divtastic.js.DisplayDiv.prototype.width = null;
divtastic.js.DisplayDiv.prototype.set_width = function(val) {
	this._width = val;
	this._style.paddingLeft = val + "px";
	return val;
}
divtastic.js.DisplayDiv.prototype.get_width = function() {
	if(this._width == null || this._width < this._dom.clientWidth) this._width = this._dom.clientWidth;
	return this._width;
}
divtastic.js.DisplayDiv.prototype.y = null;
divtastic.js.DisplayDiv.prototype.set_y = function(val) {
	this._y = val;
	this._style.top = val + "px";
	return val;
}
divtastic.js.DisplayDiv.prototype.get_y = function() {
	return this._y;
}
divtastic.js.DisplayDiv.prototype.x = null;
divtastic.js.DisplayDiv.prototype.set_x = function(val) {
	this._x = val;
	this._style.left = val + "px";
	return val;
}
divtastic.js.DisplayDiv.prototype.get_x = function() {
	return this._x;
}
divtastic.js.DisplayDiv.prototype.addChild = function(mc) {
	this._dom.appendChild(mc.getInstance());
	mc.set_parent(this);
	this.updateSizeBasedOnChild(mc);
	mc.appended();
	return mc;
}
divtastic.js.DisplayDiv.prototype.addChild2 = function(mc) {
	this._dom.appendChild(mc.getInstance());
	mc.set_parent(this);
	this.updateSizeBasedOnChild2(mc);
	mc.appended();
	return mc;
}
divtastic.js.DisplayDiv.prototype.appended = function() {
}
divtastic.js.DisplayDiv.prototype._parent = null;
divtastic.js.DisplayDiv.prototype.parent = null;
divtastic.js.DisplayDiv.prototype.set_parent = function(mc) {
	this._parent = mc;
	return mc;
}
divtastic.js.DisplayDiv.prototype.get_parent = function() {
	return this._parent;
}
divtastic.js.DisplayDiv.prototype.updateSizeBasedOnChild2 = function(mc) {
	if(this.get_width() < mc.get_width() + mc.get_x()) this.set_width(mc.get_width() + mc.get_x());
	if(this.get_height() < mc.get_height() + mc.get_y()) this.set_height(mc.get_height() + mc.get_y());
}
divtastic.js.DisplayDiv.prototype.updateSizeBasedOnChild = function(mc) {
	if(this.get_width() < mc.get_width() + mc.get_x()) this.set_width(mc.get_width() + mc.get_x());
	if(this.get_height() < mc.get_height() + mc.get_y()) this.set_height(mc.get_height() + mc.get_y());
}
divtastic.js.DisplayDiv.prototype.__class__ = divtastic.js.DisplayDiv;
divtastic.js.ImageDiv = function(img) {
	if( img === $_ ) return;
	this._dom = divtastic.js.GlobalDiv.ROOT(this).createElement("div");
	this._style = this._dom.style;
	this.setTile(false);
	if(img != null) this.setImage(img);
	this._style.position = "absolute";
	this._d = 0;
}
divtastic.js.ImageDiv.__name__ = ["divtastic","js","ImageDiv"];
divtastic.js.ImageDiv.prototype.fixedTextWidth = null;
divtastic.js.ImageDiv.prototype.fixedTextHeight = null;
divtastic.js.ImageDiv.prototype._d = null;
divtastic.js.ImageDiv.prototype._dom = null;
divtastic.js.ImageDiv.prototype._y = null;
divtastic.js.ImageDiv.prototype._x = null;
divtastic.js.ImageDiv.prototype._width = null;
divtastic.js.ImageDiv.prototype._height = null;
divtastic.js.ImageDiv.prototype._style = null;
divtastic.js.ImageDiv.prototype._bgColor = null;
divtastic.js.ImageDiv.prototype._img = null;
divtastic.js.ImageDiv.prototype._tile = null;
divtastic.js.ImageDiv.prototype.offSetX = null;
divtastic.js.ImageDiv.prototype.offSetY = null;
divtastic.js.ImageDiv.prototype.viz = null;
divtastic.js.ImageDiv.prototype._scale = null;
divtastic.js.ImageDiv.prototype._scaleY = null;
divtastic.js.ImageDiv.prototype._scaleX = null;
divtastic.js.ImageDiv.prototype._alpha = null;
divtastic.js.ImageDiv.prototype._rotation = null;
divtastic.js.ImageDiv.prototype._angle = null;
divtastic.js.ImageDiv.prototype.afflines = null;
divtastic.js.ImageDiv.prototype.setImage = function(img) {
	this._img = img;
	if(img.split(".").length > 1) this._style.backgroundImage = "url(" + img + ")"; else this._dom.className = img;
}
divtastic.js.ImageDiv.prototype.appended = function() {
}
divtastic.js.ImageDiv.prototype.setClip = function() {
	this._style.overflow = "Hidden";
}
divtastic.js.ImageDiv.prototype.tile = null;
divtastic.js.ImageDiv.prototype.getTile = function() {
	if(this._tile == null) this.setTile(false);
	return this._tile;
}
divtastic.js.ImageDiv.prototype.setTile = function(tile_) {
	this._tile = tile_;
	if(this._tile) this._style.backgroundRepeat = "repeat"; else this._style.backgroundRepeat = "no-repeat";
	return tile_;
}
divtastic.js.ImageDiv.prototype.getInstance = function() {
	return this._dom;
}
divtastic.js.ImageDiv.prototype.getStyle = function() {
	return this._style;
}
divtastic.js.ImageDiv.prototype.visible = null;
divtastic.js.ImageDiv.prototype.set_visible = function(val) {
	if(val) this._style.visibility = "visible"; else this._style.visibility = "hidden";
	this.viz = val;
	return this.viz;
}
divtastic.js.ImageDiv.prototype.get_visible = function() {
	if(this.viz == null) this.viz = true;
	return this.viz;
}
divtastic.js.ImageDiv.prototype.fill = null;
divtastic.js.ImageDiv.prototype.set_fill = function(c) {
	this._bgColor = c;
	this._style.backgroundColor = c;
	return c;
}
divtastic.js.ImageDiv.prototype.get_fill = function() {
	return this._bgColor;
}
divtastic.js.ImageDiv.prototype.height = null;
divtastic.js.ImageDiv.prototype.set_height = function(val) {
	this._height = val;
	this._style.paddingTop = val + "px";
	return val;
}
divtastic.js.ImageDiv.prototype.get_height = function() {
	if(this._height == null || this._height < this._dom.clientHeight) this._height = this._dom.clientHeight;
	return this._height;
}
divtastic.js.ImageDiv.prototype.width = null;
divtastic.js.ImageDiv.prototype.set_width = function(val) {
	this._width = val;
	this._style.paddingLeft = val + "px";
	return val;
}
divtastic.js.ImageDiv.prototype.get_width = function() {
	if(this._width == null || this._width < this._dom.clientWidth) this._width = this._dom.clientWidth;
	return this._width;
}
divtastic.js.ImageDiv.prototype.y = null;
divtastic.js.ImageDiv.prototype.set_y = function(val) {
	this._y = val;
	this._style.top = val + "px";
	return val;
}
divtastic.js.ImageDiv.prototype.get_y = function() {
	return this._y;
}
divtastic.js.ImageDiv.prototype.x = null;
divtastic.js.ImageDiv.prototype.set_x = function(val) {
	this._x = val;
	this._style.left = val + "px";
	return val;
}
divtastic.js.ImageDiv.prototype.get_x = function() {
	return this._x;
}
divtastic.js.ImageDiv.prototype._parent = null;
divtastic.js.ImageDiv.prototype.parent = null;
divtastic.js.ImageDiv.prototype.set_parent = function(mc) {
	this._parent = mc;
	return mc;
}
divtastic.js.ImageDiv.prototype.get_parent = function() {
	return this._parent;
}
divtastic.js.ImageDiv.prototype.__class__ = divtastic.js.ImageDiv;
StringBuf = function(p) {
	if( p === $_ ) return;
	this.b = new Array();
}
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype.add = function(x) {
	this.b[this.b.length] = x == null?"null":x;
}
StringBuf.prototype.addSub = function(s,pos,len) {
	this.b[this.b.length] = s.substr(pos,len);
}
StringBuf.prototype.addChar = function(c) {
	this.b[this.b.length] = String.fromCharCode(c);
}
StringBuf.prototype.toString = function() {
	return this.b.join("");
}
StringBuf.prototype.b = null;
StringBuf.prototype.__class__ = StringBuf;
if(typeof browserhx=='undefined') browserhx = {}
browserhx.BrowserType = { __ename__ : ["browserhx","BrowserType"], __constructs__ : ["Chrome","Safari","WebKitOther","FireFox","Opera","IE"] }
browserhx.BrowserType.Chrome = ["Chrome",0];
browserhx.BrowserType.Chrome.toString = $estr;
browserhx.BrowserType.Chrome.__enum__ = browserhx.BrowserType;
browserhx.BrowserType.Safari = ["Safari",1];
browserhx.BrowserType.Safari.toString = $estr;
browserhx.BrowserType.Safari.__enum__ = browserhx.BrowserType;
browserhx.BrowserType.WebKitOther = ["WebKitOther",2];
browserhx.BrowserType.WebKitOther.toString = $estr;
browserhx.BrowserType.WebKitOther.__enum__ = browserhx.BrowserType;
browserhx.BrowserType.FireFox = ["FireFox",3];
browserhx.BrowserType.FireFox.toString = $estr;
browserhx.BrowserType.FireFox.__enum__ = browserhx.BrowserType;
browserhx.BrowserType.Opera = ["Opera",4];
browserhx.BrowserType.Opera.toString = $estr;
browserhx.BrowserType.Opera.__enum__ = browserhx.BrowserType;
browserhx.BrowserType.IE = ["IE",5];
browserhx.BrowserType.IE.toString = $estr;
browserhx.BrowserType.IE.__enum__ = browserhx.BrowserType;
browserhx.Browser = function() { }
browserhx.Browser.__name__ = ["browserhx","Browser"];
browserhx.Browser._browserType = null;
browserhx.Browser._userAgent = null;
browserhx.Browser.browserType = null;
browserhx.Browser.get_BrowserType = function() {
	if(browserhx.Browser._browserType == null) browserhx.Browser.setBrowserType(js.Lib.window.navigator.userAgent);
	return browserhx.Browser._browserType;
}
browserhx.Browser.traceAgent = function() {
	browserhx.Browser.get_BrowserType();
	haxe.Log.trace(browserhx.Browser._userAgent,{ fileName : "Browser.hx", lineNumber : 41, className : "browserhx.Browser", methodName : "traceAgent"});
}
browserhx.Browser.setBrowserType = function(agent) {
	browserhx.Browser._userAgent = agent;
	if(new EReg("WebKit","").match(agent)) {
		if(new EReg("Chrome","").match(agent)) browserhx.Browser._browserType = browserhx.BrowserType.Chrome; else if(new EReg("Safari","").match(agent)) browserhx.Browser._browserType = browserhx.BrowserType.Safari; else browserhx.Browser._browserType = browserhx.BrowserType.WebKitOther;
	} else if(new EReg("Opera","").match(agent)) browserhx.Browser._browserType = browserhx.BrowserType.Opera; else if(new EReg("Mozilla","").match(agent)) {
		if(js.Lib.isIE) browserhx.Browser._browserType = browserhx.BrowserType.IE; else browserhx.Browser._browserType = browserhx.BrowserType.FireFox;
	} else browserhx.Browser._browserType = browserhx.BrowserType.IE;
	return browserhx.Browser._browserType;
}
browserhx.Browser.prototype.__class__ = browserhx.Browser;
IntIter = function(min,max) {
	if( min === $_ ) return;
	this.min = min;
	this.max = max;
}
IntIter.__name__ = ["IntIter"];
IntIter.prototype.min = null;
IntIter.prototype.max = null;
IntIter.prototype.hasNext = function() {
	return this.min < this.max;
}
IntIter.prototype.next = function() {
	return this.min++;
}
IntIter.prototype.__class__ = IntIter;
haxe.Timer = function(time_ms) {
	if( time_ms === $_ ) return;
	var arr = haxe_timers;
	this.id = arr.length;
	arr[this.id] = this;
	this.timerId = window.setInterval("haxe_timers[" + this.id + "].run();",time_ms);
}
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.delay = function(f,time_ms) {
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
}
haxe.Timer.measure = function(f,pos) {
	var t0 = haxe.Timer.stamp();
	var r = f();
	haxe.Log.trace(haxe.Timer.stamp() - t0 + "s",pos);
	return r;
}
haxe.Timer.stamp = function() {
	return Date.now().getTime() / 1000;
}
haxe.Timer.prototype.id = null;
haxe.Timer.prototype.timerId = null;
haxe.Timer.prototype.stop = function() {
	if(this.id == null) return;
	window.clearInterval(this.timerId);
	var arr = haxe_timers;
	arr[this.id] = null;
	if(this.id > 100 && this.id == arr.length - 1) {
		var p = this.id - 1;
		while(p >= 0 && arr[p] == null) p--;
		arr = arr.slice(0,p + 1);
	}
	this.id = null;
}
haxe.Timer.prototype.run = function() {
}
haxe.Timer.prototype.__class__ = haxe.Timer;
samples.examples.cubic_bezier.CubicBezier = function(p) {
	if( p === $_ ) return;
	var _holder = new divtastic.js.DisplayDiv();
	_holder.set_x(300);
	_holder.set_y(100);
	_holder.set_width(800);
	_holder.set_height(600);
	divtastic.js.GlobalDiv.addChild(this,_holder);
	new samples.examples.cubic_bezier.application.Controller(_holder);
}
samples.examples.cubic_bezier.CubicBezier.__name__ = ["samples","examples","cubic_bezier","CubicBezier"];
samples.examples.cubic_bezier.CubicBezier.main = function() {
	new samples.examples.cubic_bezier.CubicBezier();
}
samples.examples.cubic_bezier.CubicBezier.prototype.__class__ = samples.examples.cubic_bezier.CubicBezier;
Std = function() { }
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
}
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std["int"] = function(x) {
	if(x < 0) return Math.ceil(x);
	return Math.floor(x);
}
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && x.charCodeAt(1) == 120) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
Std.random = function(x) {
	return Math.floor(Math.random() * x);
}
Std.prototype.__class__ = Std;
Lambda = function() { }
Lambda.__name__ = ["Lambda"];
Lambda.array = function(it) {
	var a = new Array();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		a.push(i);
	}
	return a;
}
Lambda.list = function(it) {
	var l = new List();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		l.add(i);
	}
	return l;
}
Lambda.map = function(it,f) {
	var l = new List();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(x));
	}
	return l;
}
Lambda.mapi = function(it,f) {
	var l = new List();
	var i = 0;
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(i++,x));
	}
	return l;
}
Lambda.has = function(it,elt,cmp) {
	if(cmp == null) {
		var $it0 = it.iterator();
		while( $it0.hasNext() ) {
			var x = $it0.next();
			if(x == elt) return true;
		}
	} else {
		var $it1 = it.iterator();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(cmp(x,elt)) return true;
		}
	}
	return false;
}
Lambda.exists = function(it,f) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
}
Lambda.foreach = function(it,f) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(!f(x)) return false;
	}
	return true;
}
Lambda.iter = function(it,f) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		f(x);
	}
}
Lambda.filter = function(it,f) {
	var l = new List();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) l.add(x);
	}
	return l;
}
Lambda.fold = function(it,f,first) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		first = f(x,first);
	}
	return first;
}
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		var $it0 = it.iterator();
		while( $it0.hasNext() ) {
			var _ = $it0.next();
			n++;
		}
	} else {
		var $it1 = it.iterator();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(pred(x)) n++;
		}
	}
	return n;
}
Lambda.empty = function(it) {
	return !it.iterator().hasNext();
}
Lambda.indexOf = function(it,v) {
	var i = 0;
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var v2 = $it0.next();
		if(v == v2) return i;
		i++;
	}
	return -1;
}
Lambda.concat = function(a,b) {
	var l = new List();
	var $it0 = a.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(x);
	}
	var $it1 = b.iterator();
	while( $it1.hasNext() ) {
		var x = $it1.next();
		l.add(x);
	}
	return l;
}
Lambda.prototype.__class__ = Lambda;
zpartanlite.DispatchTo = function(p) {
	if( p === $_ ) return;
	this.disableKill();
}
zpartanlite.DispatchTo.__name__ = ["zpartanlite","DispatchTo"];
zpartanlite.DispatchTo.prototype.func0 = null;
zpartanlite.DispatchTo.prototype.times0 = null;
zpartanlite.DispatchTo.prototype.func = null;
zpartanlite.DispatchTo.prototype.times = null;
zpartanlite.DispatchTo.prototype.length = null;
zpartanlite.DispatchTo.prototype.tellEnabled = null;
zpartanlite.DispatchTo.prototype.tellDisabled = null;
zpartanlite.DispatchTo.prototype.kill = null;
zpartanlite.DispatchTo.prototype.enableKill = function() {
	this.kill = $closure(this,"killAll");
}
zpartanlite.DispatchTo.prototype.disableKill = function() {
	this.kill = function() {
		haxe.Log.trace("Can't kill other listeners unless enableKill",{ fileName : "DispatchTo.hx", lineNumber : 32, className : "zpartanlite.DispatchTo", methodName : "disableKill"});
	};
}
zpartanlite.DispatchTo.prototype.get_length = function() {
	if(this.func == null) {
		if(this.func0 != null) return 1; else return null;
	}
	return this.func.length;
}
zpartanlite.DispatchTo.prototype.add = function(f_,once,amount) {
	if(this.get_length() == null) {
		this.func0 = f_;
		if(this.tellEnabled != null) this.tellEnabled();
		if(once != null) {
			if(once == true) this.times0 = 1; else this.times0 = -1;
		} else if(amount != null) this.times0 = amount; else this.times0 = -1;
		return;
	} else if(this.func == null) {
		this.func = new Array();
		this.times = new Array();
		this.func.push(this.func0);
		this.times.push(this.times0);
		this.func0 = null;
		this.times0 = null;
	}
	this.func.push(f_);
	if(once != null) {
		if(once == true) this.times.push(1); else this.times.push(-1);
	} else if(amount != null) this.times.push(amount); else this.times.push(-1);
}
zpartanlite.DispatchTo.prototype.swap = function(current_,new_) {
	this.remove(current_);
	this.add(new_);
}
zpartanlite.DispatchTo.prototype.remove = function(f_) {
	if(this.get_length() == null) return;
	if(this.get_length() == 1) {
		if(Reflect.compareMethods(f_,this.func0)) {
			this.func0 = null;
			this.times0 = null;
			if(this.tellDisabled != null) this.tellDisabled();
		}
		return;
	}
	var _g1 = 0, _g = this.func.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(Reflect.compareMethods(this.func[i],f_)) {
			this.func.splice(i,1);
			this.times.splice(i,1);
		}
	}
	if(this.get_length() == 1) {
		this.func0 = this.func[0];
		this.times0 = this.times[0];
		this.func = null;
		this.times0 = null;
	}
}
zpartanlite.DispatchTo.prototype.killAll = function() {
	if(this.get_length() == 1) {
		this.func0 = null;
		this.times0 = null;
		return;
	}
	var _g1 = 0, _g = this.func.length;
	while(_g1 < _g) {
		var i = _g1++;
		this.func.splice(i,1);
		this.times.splice(i,1);
	}
	this.func = new Array();
	this.times = new Array();
}
zpartanlite.DispatchTo.prototype.dispatch = function() {
	if(this.get_length() == null) return;
	var count;
	if(this.get_length() == 1) {
		this.func0();
		if(this.times0 == -1) {
		} else {
			this.times0--;
			if(this.times0 == 0) this.remove(this.func0);
		}
		return;
	}
	var _g1 = 0, _g = this.func.length;
	while(_g1 < _g) {
		var i = _g1++;
		this.func[i]();
		count = this.times[i];
		if(count == -1) {
		} else {
			count--;
			this.times[i] = count;
			if(count == 0) this.remove(this.func[i]);
		}
	}
}
zpartanlite.DispatchTo.prototype.__class__ = zpartanlite.DispatchTo;
List = function(p) {
	if( p === $_ ) return;
	this.length = 0;
}
List.__name__ = ["List"];
List.prototype.h = null;
List.prototype.q = null;
List.prototype.length = null;
List.prototype.add = function(item) {
	var x = [item];
	if(this.h == null) this.h = x; else this.q[1] = x;
	this.q = x;
	this.length++;
}
List.prototype.push = function(item) {
	var x = [item,this.h];
	this.h = x;
	if(this.q == null) this.q = x;
	this.length++;
}
List.prototype.first = function() {
	return this.h == null?null:this.h[0];
}
List.prototype.last = function() {
	return this.q == null?null:this.q[0];
}
List.prototype.pop = function() {
	if(this.h == null) return null;
	var x = this.h[0];
	this.h = this.h[1];
	if(this.h == null) this.q = null;
	this.length--;
	return x;
}
List.prototype.isEmpty = function() {
	return this.h == null;
}
List.prototype.clear = function() {
	this.h = null;
	this.q = null;
	this.length = 0;
}
List.prototype.remove = function(v) {
	var prev = null;
	var l = this.h;
	while(l != null) {
		if(l[0] == v) {
			if(prev == null) this.h = l[1]; else prev[1] = l[1];
			if(this.q == l) this.q = prev;
			this.length--;
			return true;
		}
		prev = l;
		l = l[1];
	}
	return false;
}
List.prototype.iterator = function() {
	return { h : this.h, hasNext : function() {
		return this.h != null;
	}, next : function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		return x;
	}};
}
List.prototype.toString = function() {
	var s = new StringBuf();
	var first = true;
	var l = this.h;
	s.b[s.b.length] = "{" == null?"null":"{";
	while(l != null) {
		if(first) first = false; else s.b[s.b.length] = ", " == null?"null":", ";
		s.add(Std.string(l[0]));
		l = l[1];
	}
	s.b[s.b.length] = "}" == null?"null":"}";
	return s.b.join("");
}
List.prototype.join = function(sep) {
	var s = new StringBuf();
	var first = true;
	var l = this.h;
	while(l != null) {
		if(first) first = false; else s.b[s.b.length] = sep == null?"null":sep;
		s.add(l[0]);
		l = l[1];
	}
	return s.b.join("");
}
List.prototype.filter = function(f) {
	var l2 = new List();
	var l = this.h;
	while(l != null) {
		var v = l[0];
		l = l[1];
		if(f(v)) l2.add(v);
	}
	return l2;
}
List.prototype.map = function(f) {
	var b = new List();
	var l = this.h;
	while(l != null) {
		var v = l[0];
		l = l[1];
		b.add(f(v));
	}
	return b;
}
List.prototype.__class__ = List;
divtastic.js.Divtastic = function(img) {
	if( img === $_ ) return;
	divtastic.js.DisplayDiv.call(this,img);
}
divtastic.js.Divtastic.__name__ = ["divtastic","js","Divtastic"];
divtastic.js.Divtastic.__super__ = divtastic.js.DisplayDiv;
for(var k in divtastic.js.DisplayDiv.prototype ) divtastic.js.Divtastic.prototype[k] = divtastic.js.DisplayDiv.prototype[k];
divtastic.js.Divtastic.prototype._canvas = null;
divtastic.js.Divtastic.prototype._twoD = null;
divtastic.js.Divtastic.prototype.twoD = null;
divtastic.js.Divtastic.prototype.getTwoD = function() {
	if(this._canvas == null) this._canvas = this._dom;
	if(this._twoD == null) this._twoD = this._canvas.getContext("2d");
	return this._twoD;
}
divtastic.js.Divtastic.prototype.scale = null;
divtastic.js.Divtastic.prototype.get_scale = function() {
	if(this._scale == null) {
		this._scale = 1;
		this._scaleX = 1;
		this._scaleY = 1;
	}
	return this._scale;
}
divtastic.js.Divtastic.prototype.set_scale = function(scale_) {
	var scaleStr = Std.string(scale_);
	var str = "scale(" + scaleStr + ", " + scaleStr + ")";
	switch( (browserhx.Browser.get_BrowserType())[1] ) {
	case 2:
	case 1:
	case 0:
		this._style.WebkitTransform = str;
		break;
	case 4:
		this._style.OTransform = str;
		break;
	case 3:
		this._style.MozTransform = str;
		break;
	case 5:
		this.affineTrans(scale_,0,0,scale_,0,0);
		break;
	}
	this._scale = scale_;
	this._scaleX = scale_;
	this._scaleY = scale_;
	return this._scale;
}
divtastic.js.Divtastic.prototype.scaleY = null;
divtastic.js.Divtastic.prototype.get_scaleY = function() {
	if(this._scaleY == null) this._scaleY = 1;
	return this._scaleY;
}
divtastic.js.Divtastic.prototype.set_scaleY = function(scaleY_) {
	switch( (browserhx.Browser.get_BrowserType())[1] ) {
	case 2:
	case 0:
	case 1:
		this._style.WebkitTransform = "scaleY(" + Std.string(scaleY_) + ")";
		break;
	case 4:
		this._style.OTransform = "scaleY(" + Std.string(scaleY_) + ")";
		break;
	case 3:
		this._style.MozTransform = "scaleY(" + Std.string(scaleY_) + ")";
		break;
	case 5:
		this.affineTrans(this.get_scaleX(),0,0,scaleY_,0,0);
		break;
	}
	this._scaleY = scaleY_;
	return this._scaleY;
}
divtastic.js.Divtastic.prototype.scaleX = null;
divtastic.js.Divtastic.prototype.get_scaleX = function() {
	if(this._scaleX == null) this._scaleX = 1;
	return this._scaleX;
}
divtastic.js.Divtastic.prototype.set_scaleX = function(scaleX_) {
	switch( (browserhx.Browser.get_BrowserType())[1] ) {
	case 2:
	case 1:
	case 0:
		this._style.WebkitTransform = "scaleX(" + Std.string(scaleX_) + ")";
		break;
	case 4:
		this._style.OTransform = "scaleX(" + Std.string(scaleX_) + ")";
		break;
	case 3:
		this._style.MozTransform = "scaleX(" + Std.string(scaleX_) + ")";
		break;
	case 5:
		this.affineTrans(scaleX_,0,0,this.get_scaleY(),0,0);
		break;
	}
	this._scaleX = scaleX_;
	return this._scaleX;
}
divtastic.js.Divtastic.prototype.affineTrans = function(a,b,c,d,e,f) {
	this.afflines = [a,b,c,d,e,f];
	var mat0 = "matrix( " + Std.string(a) + ", " + Std.string(b) + ", " + Std.string(c) + ", " + Std.string(d) + ", ";
	var matrixFirefox = mat0 + Std.string(e) + "px, " + Std.string(e) + "px ) ";
	var matrixGeneral = mat0 + Std.string(e) + Std.string(e) + " ) ";
	switch( (browserhx.Browser.get_BrowserType())[1] ) {
	case 2:
	case 0:
	case 1:
		this._style.WebkitTransform = matrixGeneral;
		break;
	case 4:
		this._style.OTransform = matrixGeneral;
		break;
	case 3:
		this._style.MozTransform = matrixFirefox;
		break;
	case 5:
		this.affineTransIE(a,b,c,d,e,f);
		break;
	}
}
divtastic.js.Divtastic.prototype.affineTransIE = function(a,b,c,d,e,f) {
	this._style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11=" + a + ", M21=" + b + ", M12=" + c + ", M22=" + d + ", SizingMethod=\"auto expand\")";
	var w2 = this.get_width() / 2;
	var h2 = this.get_height() / 2;
	this.set_x(Math.round(this.get_x() + e - (Math.abs(a) - 1) * w2 + Math.abs(c) * h2));
	this.set_y(Math.round(this.get_y() + f - Math.abs(b) * w2 + (Math.abs(d) - 1) * h2));
}
divtastic.js.Divtastic.prototype.rotation = null;
divtastic.js.Divtastic.prototype.set_rotation = function(angle) {
	this._rotation = angle;
	this._angle = Std["int"](angle);
	var rad = this._rotation * (Math.PI / 180);
	var cos = Math.cos(rad);
	var sin = Math.sin(rad);
	switch( (browserhx.Browser.get_BrowserType())[1] ) {
	case 2:
	case 1:
	case 0:
		this._style.WebkitTransform = "rotate(" + Std.string(this._angle) + "deg)";
		break;
	case 4:
		this._style.OTransform = "rotate(" + Std.string(this._angle) + "deg)";
		break;
	case 3:
		this._style.MozTransform = "rotate(" + Std.string(this._angle) + "deg)";
		break;
	case 5:
		this.affineTrans(cos,-sin,sin,cos,0,0);
		break;
	}
	return angle;
}
divtastic.js.Divtastic.prototype.get_rotation = function() {
	if(this._rotation == null) {
		this._rotation = 0;
		this._angle = 0;
	}
	return this._rotation;
}
divtastic.js.Divtastic.prototype.alpha = null;
divtastic.js.Divtastic.prototype.get_alpha = function() {
	if(this._alpha == null) this._alpha = 1;
	return this._alpha;
}
divtastic.js.Divtastic.prototype.set_alpha = function(alpha_) {
	switch( (browserhx.Browser.get_BrowserType())[1] ) {
	case 3:
	case 4:
	case 2:
	case 0:
	case 1:
		this._style.opacity = alpha_;
		break;
	case 5:
		this._style.filter = "alpha(opacity=" + Std.String(Math.round(alpha_ * 10)) + ")";
		break;
	}
	this._alpha = alpha_;
	return this._alpha;
}
divtastic.js.Divtastic.prototype.__class__ = divtastic.js.Divtastic;
if(!divtastic.js.application) divtastic.js.application = {}
if(!divtastic.js.application.views) divtastic.js.application.views = {}
divtastic.js.application.views.WindowView = function(holder_,title_,x_,y_,width_,height_,fill_) {
	if( holder_ === $_ ) return;
	this.onMinimized = new zpartanlite.DispatchTo();
	this.onMaximized = new zpartanlite.DispatchTo();
	this._holder = holder_;
	this._holder.set_x(x_);
	this._holder.set_y(y_);
	this._holder.set_width(width_);
	this._holder.set_height(height_);
	this.heightMax = height_;
	this.widthMax = width_;
	this.headerBarBg = new divtastic.js.DisplayDiv();
	this.headerBarBg.setTile(true);
	this.headerBarBg.set_x(0);
	this.headerBarBg.set_y(0);
	this.headerBarBg.set_height(20);
	this.headerBarBg.set_width(width_);
	this.headerBarBg.setImage("../divtasticAssets/fillColor.png");
	this._holder.addChild(this.headerBarBg);
	this.headerBarBg.setupParentDrag();
	this.headerBarTitle = new divtastic.js.DisplayDiv();
	this.headerBarTitle.set_x(9);
	this.headerBarTitle.set_y(4);
	this.headerBarTitle.getStyle().cursor = "pointer";
	this.headerBarBg.addChild(this.headerBarTitle);
	var txStyle = this.headerBarTitle.getStyle();
	txStyle.fontFamily = "Arial";
	txStyle.color = "#aaaaaa";
	txStyle.lineHeight = "1.3";
	txStyle.letterSpacing = "1px";
	txStyle.fontSize = "10";
	this.set_title(title_);
	this.widthMin = Std["int"](this.headerBarTitle.get_width() + this.headerBarTitle.get_x() + 30);
	this.bodyBg = new divtastic.js.DisplayDiv();
	this.bodyBg.set_x(0);
	this.bodyBg.set_fill(fill_);
	this.bodyBg.set_y(20);
	this.bodyBg.set_height(height_ - 20);
	this.bodyBg.set_width(width_);
	this._holder.addChild(this.bodyBg);
	this.minimizeButton = new divtastic.js.DisplayDiv();
	this.minimizeButton.set_x(width_ - 18 - 4 + 1);
	this.minimizeButton.set_y(7);
	this.minimizeButton.set_width(15);
	this.minimizeButton.set_height(10);
	var closeDivs = divtastic.js.Drawing.drawGradHexagon(this.minimizeButton,0,0,11,6,14054039,14054039,1,zpartanlite.Orientation.Horizontal);
	this.headerBarBg.addChild(this.minimizeButton);
	if(browserhx.Browser.get_BrowserType() != browserhx.BrowserType.IE) this._holder.getStyle().overflow = "Hidden";
	this.gradFill = new divtastic.js.GradientFiller(closeDivs);
	this.minPressSetup(null);
}
divtastic.js.application.views.WindowView.__name__ = ["divtastic","js","application","views","WindowView"];
divtastic.js.application.views.WindowView.prototype.headerBarBg = null;
divtastic.js.application.views.WindowView.prototype.bodyBg = null;
divtastic.js.application.views.WindowView.prototype.headerBarTitle = null;
divtastic.js.application.views.WindowView.prototype.minimizeButton = null;
divtastic.js.application.views.WindowView.prototype.minimizeButtonBg = null;
divtastic.js.application.views.WindowView.prototype.heightMax = null;
divtastic.js.application.views.WindowView.prototype.widthMax = null;
divtastic.js.application.views.WindowView.prototype.widthMin = null;
divtastic.js.application.views.WindowView.prototype._holder = null;
divtastic.js.application.views.WindowView.prototype.gradFill = null;
divtastic.js.application.views.WindowView.prototype.onMinimized = null;
divtastic.js.application.views.WindowView.prototype.onMaximized = null;
divtastic.js.application.views.WindowView.prototype._title = null;
divtastic.js.application.views.WindowView.prototype.title = null;
divtastic.js.application.views.WindowView.prototype.get_title = function() {
	return this._title;
}
divtastic.js.application.views.WindowView.prototype.set_title = function(title_) {
	this.headerBarTitle.set_text(title_);
	this._title = title_;
	this.widthMin = Std["int"](this.headerBarTitle.get_width() + this.headerBarTitle.get_x() + 30);
	return title_;
}
divtastic.js.application.views.WindowView.prototype.set_fill = function(fill) {
	this.bodyBg.set_fill("#" + StringTools.lpad(StringTools.hex(fill >> 16 << 16 | (fill >> 8 & 255) << 8 | fill & 255),"0",6));
	return fill;
}
divtastic.js.application.views.WindowView.prototype.minPressSetup = function(e) {
	this.minimizeButton.press.swap($closure(this,"maximize"),$closure(this,"minimize"));
	this.onMinimized.dispatch();
}
divtastic.js.application.views.WindowView.prototype.minimize = function() {
	this.gradFill.fill(10329706,10329706);
	var me = this;
	var holda = this._holder;
	var minButton = this.minimizeButton;
	var t = new feffects.Tween(1,0,500);
	t.setTweenHandlers(function(e) {
		holda.set_height(e * (me.heightMax - 20) + 20);
		holda.set_width(e * (me.widthMax - me.widthMin) + me.widthMin);
		minButton.set_x(holda.get_width() - 18 - 4 + 1);
	},$closure(this,"maxPressSetup"));
	t.start();
}
divtastic.js.application.views.WindowView.prototype.maxPressSetup = function(e) {
	this.minimizeButton.press.swap($closure(this,"minimize"),$closure(this,"maximize"));
	this.onMaximized.dispatch();
}
divtastic.js.application.views.WindowView.prototype.maximize = function() {
	this.gradFill.fill(14054039,14054039);
	var me = this;
	var holda = this._holder;
	var minButton = this.minimizeButton;
	var t = new feffects.Tween(0,1,500);
	t.setTweenHandlers(function(e) {
		holda.set_height(e * (me.heightMax - 20) + 20);
		holda.set_width(e * (me.widthMax - me.widthMin) + me.widthMin);
		minButton.set_x(holda.get_width() - 18 - 4 + 1);
	},$closure(this,"minPressSetup"));
	t.start();
}
divtastic.js.application.views.WindowView.prototype.__class__ = divtastic.js.application.views.WindowView;
if(typeof js=='undefined') js = {}
js.Lib = function() { }
js.Lib.__name__ = ["js","Lib"];
js.Lib.isIE = null;
js.Lib.isOpera = null;
js.Lib.document = null;
js.Lib.window = null;
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
}
js.Lib.eval = function(code) {
	return eval(code);
}
js.Lib.setErrorHandler = function(f) {
	js.Lib.onerror = f;
}
js.Lib.prototype.__class__ = js.Lib;
js.Boot = function() { }
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	var msg = i != null?i.fileName + ":" + i.lineNumber + ": ":"";
	msg += js.Boot.__unhtml(js.Boot.__string_rec(v,"")) + "<br/>";
	var d = document.getElementById("haxe:trace");
	if(d == null) alert("No haxe:trace element defined\n" + msg); else d.innerHTML += msg;
}
js.Boot.__clear_trace = function() {
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
}
js.Boot.__closure = function(o,f) {
	var m = o[f];
	if(m == null) return null;
	var f1 = function() {
		return m.apply(o,arguments);
	};
	f1.scope = o;
	f1.method = m;
	return f1;
}
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ != null || o.__ename__ != null)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__ != null) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	try {
		if(o instanceof cl) {
			if(cl == Array) return o.__enum__ == null;
			return true;
		}
		if(js.Boot.__interfLoop(o.__class__,cl)) return true;
	} catch( e ) {
		if(cl == null) return false;
	}
	switch(cl) {
	case Int:
		return Math.ceil(o%2147483648.0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return o === true || o === false;
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o == null) return false;
		return o.__enum__ == cl || cl == Class && o.__name__ != null || cl == Enum && o.__ename__ != null;
	}
}
js.Boot.__init = function() {
	js.Lib.isIE = typeof document!='undefined' && document.all != null && typeof window!='undefined' && window.opera == null;
	js.Lib.isOpera = typeof window!='undefined' && window.opera != null;
	Array.prototype.copy = Array.prototype.slice;
	Array.prototype.insert = function(i,x) {
		this.splice(i,0,x);
	};
	Array.prototype.remove = Array.prototype.indexOf?function(obj) {
		var idx = this.indexOf(obj);
		if(idx == -1) return false;
		this.splice(idx,1);
		return true;
	}:function(obj) {
		var i = 0;
		var l = this.length;
		while(i < l) {
			if(this[i] == obj) {
				this.splice(i,1);
				return true;
			}
			i++;
		}
		return false;
	};
	Array.prototype.iterator = function() {
		return { cur : 0, arr : this, hasNext : function() {
			return this.cur < this.arr.length;
		}, next : function() {
			return this.arr[this.cur++];
		}};
	};
	if(String.prototype.cca == null) String.prototype.cca = String.prototype.charCodeAt;
	String.prototype.charCodeAt = function(i) {
		var x = this.cca(i);
		if(x != x) return null;
		return x;
	};
	var oldsub = String.prototype.substr;
	String.prototype.substr = function(pos,len) {
		if(pos != null && pos != 0 && len != null && len < 0) return "";
		if(len == null) len = this.length;
		if(pos < 0) {
			pos = this.length + pos;
			if(pos < 0) pos = 0;
		} else if(len < 0) len = this.length + len - pos;
		return oldsub.apply(this,[pos,len]);
	};
	$closure = js.Boot.__closure;
}
js.Boot.prototype.__class__ = js.Boot;
haxe.FastCell = function(elt,next) {
	if( elt === $_ ) return;
	this.elt = elt;
	this.next = next;
}
haxe.FastCell.__name__ = ["haxe","FastCell"];
haxe.FastCell.prototype.elt = null;
haxe.FastCell.prototype.next = null;
haxe.FastCell.prototype.__class__ = haxe.FastCell;
EReg = function(r,opt) {
	if( r === $_ ) return;
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
}
EReg.__name__ = ["EReg"];
EReg.prototype.r = null;
EReg.prototype.match = function(s) {
	this.r.m = this.r.exec(s);
	this.r.s = s;
	this.r.l = RegExp.leftContext;
	this.r.r = RegExp.rightContext;
	return this.r.m != null;
}
EReg.prototype.matched = function(n) {
	return this.r.m != null && n >= 0 && n < this.r.m.length?this.r.m[n]:(function($this) {
		var $r;
		throw "EReg::matched";
		return $r;
	}(this));
}
EReg.prototype.matchedLeft = function() {
	if(this.r.m == null) throw "No string matched";
	if(this.r.l == null) return this.r.s.substr(0,this.r.m.index);
	return this.r.l;
}
EReg.prototype.matchedRight = function() {
	if(this.r.m == null) throw "No string matched";
	if(this.r.r == null) {
		var sz = this.r.m.index + this.r.m[0].length;
		return this.r.s.substr(sz,this.r.s.length - sz);
	}
	return this.r.r;
}
EReg.prototype.matchedPos = function() {
	if(this.r.m == null) throw "No string matched";
	return { pos : this.r.m.index, len : this.r.m[0].length};
}
EReg.prototype.split = function(s) {
	var d = "#__delim__#";
	return s.replace(this.r,d).split(d);
}
EReg.prototype.replace = function(s,by) {
	return s.replace(this.r,by);
}
EReg.prototype.customReplace = function(s,f) {
	var buf = new StringBuf();
	while(true) {
		if(!this.match(s)) break;
		buf.add(this.matchedLeft());
		buf.add(f(this));
		s = this.matchedRight();
	}
	buf.b[buf.b.length] = s == null?"null":s;
	return buf.b.join("");
}
EReg.prototype.__class__ = EReg;
divtastic.Movement = function() { }
divtastic.Movement.__name__ = ["divtastic","Movement"];
divtastic.Movement.quadraticBezierThru = function(t,startPoint,controlPoint,endPoint) {
	var newControlPoint = 2 * controlPoint - .5 * (startPoint + endPoint);
	var u = 1 - t;
	return Math.pow(u,2) * startPoint + 2 * u * t * newControlPoint + Math.pow(t,2) * endPoint;
}
divtastic.Movement.quadraticBezier = function(t,startPoint,controlPoint,endPoint) {
	var u = 1 - t;
	return Math.pow(u,2) * startPoint + 2 * u * t * controlPoint + Math.pow(t,2) * endPoint;
}
divtastic.Movement.cubicBezier = function(t,startPoint,controlPoint1,controlPoint2,endPoint) {
	var u = 1 - t;
	return Math.pow(u,3) * startPoint + 3 * Math.pow(u,2) * t * controlPoint1 + 3 * u * Math.pow(t,2) * controlPoint2 + Math.pow(t,3) * endPoint;
}
divtastic.Movement.prototype.__class__ = divtastic.Movement;
divtastic.js.GlobalDiv = function() { }
divtastic.js.GlobalDiv.__name__ = ["divtastic","js","GlobalDiv"];
divtastic.js.GlobalDiv.ROOT = function(d) {
	return divtastic.js.GlobalDiv._root;
}
divtastic.js.GlobalDiv.addChild = function(d,mc) {
	divtastic.js.GlobalDiv._root.body.appendChild(mc.getInstance());
}
divtastic.js.GlobalDiv.prototype.__class__ = divtastic.js.GlobalDiv;
$_ = {}
js.Boot.__res = {}
js.Boot.__init();
{
	var d = Date;
	d.now = function() {
		return new Date();
	};
	d.fromTime = function(t) {
		var d1 = new Date();
		d1["setTime"](t);
		return d1;
	};
	d.fromString = function(s) {
		switch(s.length) {
		case 8:
			var k = s.split(":");
			var d1 = new Date();
			d1["setTime"](0);
			d1["setUTCHours"](k[0]);
			d1["setUTCMinutes"](k[1]);
			d1["setUTCSeconds"](k[2]);
			return d1;
		case 10:
			var k = s.split("-");
			return new Date(k[0],k[1] - 1,k[2],0,0,0);
		case 19:
			var k = s.split(" ");
			var y = k[0].split("-");
			var t = k[1].split(":");
			return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
		default:
			throw "Invalid date format : " + s;
		}
	};
	d.prototype["toString"] = function() {
		var date = this;
		var m = date.getMonth() + 1;
		var d1 = date.getDate();
		var h = date.getHours();
		var mi = date.getMinutes();
		var s = date.getSeconds();
		return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d1 < 10?"0" + d1:"" + d1) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
	};
	d.prototype.__class__ = d;
	d.__name__ = ["Date"];
}
if(typeof(haxe_timers) == "undefined") haxe_timers = [];
{
	String.prototype.__class__ = String;
	String.__name__ = ["String"];
	Array.prototype.__class__ = Array;
	Array.__name__ = ["Array"];
	Int = { __name__ : ["Int"]};
	Dynamic = { __name__ : ["Dynamic"]};
	Float = Number;
	Float.__name__ = ["Float"];
	Bool = { __ename__ : ["Bool"]};
	Class = { __name__ : ["Class"]};
	Enum = { };
	Void = { __ename__ : ["Void"]};
}
{
	Math.__name__ = ["Math"];
	Math.NaN = Number["NaN"];
	Math.NEGATIVE_INFINITY = Number["NEGATIVE_INFINITY"];
	Math.POSITIVE_INFINITY = Number["POSITIVE_INFINITY"];
	Math.isFinite = function(i) {
		return isFinite(i);
	};
	Math.isNaN = function(i) {
		return isNaN(i);
	};
}
{
	js.Lib.document = document;
	js.Lib.window = window;
	onerror = function(msg,url,line) {
		var f = js.Lib.onerror;
		if( f == null )
			return false;
		return f(msg,[url+":"+line]);
	}
}
feffects.Tween._aTweens = new haxe.FastList();
feffects.Tween._aPaused = new haxe.FastList();
feffects.Tween.INTERVAL = 10;
samples.examples.cubic_bezier.application.Controller.red = 16711680;
samples.examples.cubic_bezier.application.Controller.green = 65280;
samples.examples.cubic_bezier.application.Controller.blue = 255;
samples.examples.cubic_bezier.application.Controller.yellow = 16776960;
samples.examples.cubic_bezier.application.Controller.mauve = 16711935;
samples.examples.cubic_bezier.application.Controller.diaX = 18;
samples.examples.cubic_bezier.application.Controller.diaY = 20;
samples.examples.cubic_bezier.application.Controller.velocity = 2500;
divtastic.js.application.views.WindowView.headerHeight = 20;
js.Lib.onerror = null;
divtastic.js.GlobalDiv._root = js.Lib.document;
samples.examples.cubic_bezier.CubicBezier.main()