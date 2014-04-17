/**
           _          _            _          _   _          _          _              _            _             _
         /\ \       /\ \         /\ \       /\_\/\_\ _     /\ \       /\ \           /\ \         /\ \     _    /\ \
        /  \ \     /  \ \       /  \ \     / / / / //\_\   \ \ \     /  \ \         /  \ \       /  \ \   /\_\ /  \ \
       / /\ \ \   / /\ \ \     / /\ \ \   /\ \/ \ \/ / /   /\ \_\   / /\ \_\       / /\ \ \     / /\ \ \_/ / // /\ \ \
      / / /\ \_\ / / /\ \ \   / / /\ \_\ /  \____\__/ /   / /\/_/  / / /\/_/      / / /\ \ \   / / /\ \___/ // / /\ \_\
     / /_/_ \/_// / /  \ \_\ / / /_/ / // /\/________/   / / /    / / / ______   / / /  \ \_\ / / /  \/____// /_/_ \/_/
    / /____/\  / / /   / / // / /__\/ // / /\/_// / /   / / /    / / / /\_____\ / / /   / / // / /    / / // /____/\
   / /\____\/ / / /   / / // / /_____// / /    / / /   / / /    / / /  \/____ // / /   / / // / /    / / // /\____\/
  / / /      / / /___/ / // / /\ \ \ / / /    / / /___/ / /__  / / /_____/ / // / /___/ / // / /    / / // / /______
 / / /      / / /____\/ // / /  \ \ \\/_/    / / //\__\/_/___\/ / /______\/ // / /____\/ // / /    / / // / /_______\
 \/_/       \/_________/ \/_/    \_\/        \/_/ \/_________/\/___________/ \/_________/ \/_/     \/_/ \/__________/

 #BigBrotherJS - http://www.bigbrotherjs.com

 Copyright (c) 2014 Formigone.
 @author Rodrigo Silveira. http://www.rodrigo-silveira.com
 */

BB.mouse;
BB.win;
BB.scroll;
BB.Frame = function(win, scroll, mouse, clicked) {
  this.win = win;
  this.scroll = scroll;
  this.mouse = mouse;
  this.clicked = clicked || false
};
BB.Frame.getClientRes = function() {
  return{width:window.innerWidth, height:window.innerHeight}
};
BB.Frame.getCurrentWin = function() {
  return{width:document.documentElement.clientWidth, height:document.documentElement.clientHeight}
};
BB.Frame.getCurrentScroll = function() {
  return{offsetX:document.body.scrollLeft, offsetY:document.body.scrollTop}
};
BB.Frame.getCurrentMouse = function() {
  return{x:BB.Session.mouse.x || 0, y:BB.Session.mouse.y || 0}
};
BB.Recording = function(title, url, res, fps, frames) {
  this.title = title;
  this.url = url;
  this.res = res;
  this.fps = fps;
  this.frames = frames
};
BB.RecPlayer = function(recording) {
  this.recording = recording || {};
  this.win = document.createElement("div");
  this.viewport = document.createElement("div");
  this.doc = document.createElement("iframe");
  this.mouse = document.createElement("img");
  this.ticks = {FRAME_DUR_MILLI:0, FRAME_DUR_SEC:0};
  this.frames = {TOTAL:0, CURRENT:0};
  this.active = false;
  this._mouseOn = new Image;
  this._mouseOff = new Image;
  this.init()
};
BB.RecPlayer.prototype.init = function() {
  this._mouseOn.src = "/img/mouse-on.png";
  this._mouseOff.src = "/img/mouse-off.png";
  this.win.className = "bb-win";
  this.viewport.className = "bb-vp";
  this.doc.className = "bb-doc";
  this.mouse.className = "bb-mouse";
  this.mouse._width = 32;
  this.mouse._height = 32;
  this.mouse._centerX = parseInt(this.mouse._width * 0.5);
  this.mouse._centerY = parseInt(this.mouse._height * 0.5);
  this.mouse.style.left = "-100px";
  this.mouse.style.top = "-100px";
  this.mouse.src = this._mouseOff.src;
  this.win.appendChild(this.mouse);
  this.win.appendChild(this.viewport);
  this.viewport.appendChild(this.doc)
};
BB.RecPlayer.prototype.setRecording = function(recording) {
  this.recording = recording;
  this.active = false
};
BB.RecPlayer.prototype.centerMouse = function(x, y) {
  this.mouse.style.left = x - this.mouse._centerX + "px";
  this.mouse.style.top = y - this.mouse._centerY + "px"
};
BB.RecPlayer.prototype.tick = function() {
  var frame = this.recording.frames[this.frames.CURRENT];
  this.centerMouse(frame.mouse.x, frame.mouse.y);
  if(frame.clicked) {
    this.mouse.src = this._mouseOn.src
  }else {
    this.mouse.src = this._mouseOff.src
  }
  this.frames.CURRENT++;
  if(this.frames.CURRENT < this.frames.TOTAL) {
    setTimeout(this.tick.bind(this), this.ticks.FRAME_DUR_MILLI)
  }
};
BB.RecPlayer.prototype.go = function(panel) {
  if(!this.active && this.recording !== {}) {
    var clone;
    while(panel.firstChild) {
      clone = panel.firstChild.cloneNode(true);
      panel.replaceChild(clone)
    }
    this.ticks.FRAME_DUR_MILLI = 1E3 / this.recording.fps;
    this.ticks.FRAME_DUR_SEC = this.recording.fps / 1E3;
    this.frames.TOTAL = this.recording.frames.length;
    this.frames.CURRENT = 0;
    this.win.style.width = this.recording.res.width + "px";
    this.win.style.height = this.recording.res.height + "px";
    this.viewport.style.width = this.recording.frames[0].win.width + "px";
    this.viewport.style.height = this.recording.frames[0].win.height + "px";
    this.doc.style.width = this.recording.frames[0].win.width + "px";
    this.doc.style.height = this.recording.frames[0].win.height + "px";
    this.doc.src = this.recording.url;
    this.mouse.style.transitionDuration = this.ticks.FRAME_DUR_SEC + "s";
    this.centerMouse(this.recording.frames[0].mouse.x, this.recording.frames[0].mouse.y);
    panel.appendChild(this.win);
    this.active = true;
    this.tick()
  }
};
BB.Session = function(backendUrl, fps, title, url) {
  this.backendUrl = backendUrl;
  this.fps = fps || 3;
  this.TICK_MILLI = 1E3 / this.fps;
  this.title = title || BB.Session.getPageTitle();
  this.url = url || BB.Session.getPageUrl();
  this.frames = [];
  this.active = false;
  this.timer;
  this.clicked = false;
  this.init()
};
BB.Session.prototype.init = function() {
  var self = this;
  document.addEventListener("mousemove", function(e) {
    BB.Session.mouse.x = e.clientX || e.pageX;
    BB.Session.mouse.y = e.clientY || e.pageY
  }, false);
  document.addEventListener("click", function(e) {
    self.clicked = true
  }, false)
};
BB.Session.prototype.start = function() {
  if(!this.active) {
    this.active = true;
    this.tick()
  }
};
BB.Session.prototype.stop = function() {
  clearTimeout(this.timer);
  this.active = false
};
BB.Session.prototype.tick = function() {
  if(this.active) {
    var frame = new BB.Frame(BB.Frame.getCurrentWin(), BB.Frame.getCurrentScroll(), BB.Frame.getCurrentMouse(), this.clicked);
    this.frames.push(frame);
    this.timer = setTimeout(this.tick.bind(this), this.TICK_MILLI);
    this.clicked = false
  }
};
BB.Session.prototype.upload = function() {
  var xhr = new XMLHttpRequest;
  xhr.open("POST", "/save.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("recording=" + this.toString())
};
BB.Session.getPageTitle = function() {
  var el = document.getElementsByTagName("title");
  var title = "Untitled document";
  if(el.length > 0) {
    title = el[0].textContent
  }
  return title
};
BB.Session.getPageUrl = function() {
  return window.location.href
};
BB.Session.prototype.toString = function() {
  return JSON.stringify(new BB.Recording(this.title, this.url, BB.Frame.getClientRes(), this.fps, this.frames))
};
BB.Session.mouse = {x:0, y:0};

