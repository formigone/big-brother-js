var COMPILED = false;
var goog = goog || {};
goog.global = this;
goog.global.CLOSURE_DEFINES;
goog.exportPath_ = function(name, opt_object, opt_objectToExportTo) {
  var parts = name.split(".");
  var cur = opt_objectToExportTo || goog.global;
  if(!(parts[0] in cur) && cur.execScript) {
    cur.execScript("var " + parts[0])
  }
  for(var part;parts.length && (part = parts.shift());) {
    if(!parts.length && opt_object !== undefined) {
      cur[part] = opt_object
    }else {
      if(cur[part]) {
        cur = cur[part]
      }else {
        cur = cur[part] = {}
      }
    }
  }
};
goog.define = function(name, defaultValue) {
  var value = defaultValue;
  if(!COMPILED) {
    if(goog.global.CLOSURE_DEFINES && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_DEFINES, name)) {
      value = goog.global.CLOSURE_DEFINES[name]
    }
  }
  goog.exportPath_(name, value)
};
goog.DEBUG = true;
goog.define("goog.LOCALE", "en");
goog.define("goog.TRUSTED_SITE", true);
goog.provide = function(name) {
  if(!COMPILED) {
    if(goog.isProvided_(name)) {
      throw Error('Namespace "' + name + '" already declared.');
    }
    delete goog.implicitNamespaces_[name];
    var namespace = name;
    while(namespace = namespace.substring(0, namespace.lastIndexOf("."))) {
      if(goog.getObjectByName(namespace)) {
        break
      }
      goog.implicitNamespaces_[namespace] = true
    }
  }
  goog.exportPath_(name)
};
goog.setTestOnly = function(opt_message) {
  if(COMPILED && !goog.DEBUG) {
    opt_message = opt_message || "";
    throw Error("Importing app-only code into non-debug environment" + opt_message ? ": " + opt_message : ".");
  }
};
if(!COMPILED) {
  goog.isProvided_ = function(name) {
    return!goog.implicitNamespaces_[name] && !!goog.getObjectByName(name)
  };
  goog.implicitNamespaces_ = {}
}
goog.getObjectByName = function(name, opt_obj) {
  var parts = name.split(".");
  var cur = opt_obj || goog.global;
  for(var part;part = parts.shift();) {
    if(goog.isDefAndNotNull(cur[part])) {
      cur = cur[part]
    }else {
      return null
    }
  }
  return cur
};
goog.globalize = function(obj, opt_global) {
  var global = opt_global || goog.global;
  for(var x in obj) {
    global[x] = obj[x]
  }
};
goog.addDependency = function(relPath, provides, requires) {
  if(goog.DEPENDENCIES_ENABLED) {
    var provide, require;
    var path = relPath.replace(/\\/g, "/");
    var deps = goog.dependencies_;
    for(var i = 0;provide = provides[i];i++) {
      deps.nameToPath[provide] = path;
      if(!(path in deps.pathToNames)) {
        deps.pathToNames[path] = {}
      }
      deps.pathToNames[path][provide] = true
    }
    for(var j = 0;require = requires[j];j++) {
      if(!(path in deps.requires)) {
        deps.requires[path] = {}
      }
      deps.requires[path][require] = true
    }
  }
};
goog.define("goog.ENABLE_DEBUG_LOADER", true);
goog.require = function(name) {
  if(!COMPILED) {
    if(goog.isProvided_(name)) {
      return
    }
    if(goog.ENABLE_DEBUG_LOADER) {
      var path = goog.getPathFromDeps_(name);
      if(path) {
        goog.included_[path] = true;
        goog.writeScripts_();
        return
      }
    }
    var errorMessage = "goog.require could not find: " + name;
    if(goog.global.console) {
      goog.global.console["error"](errorMessage)
    }
    throw Error(errorMessage);
  }
};
goog.basePath = "";
goog.global.CLOSURE_BASE_PATH;
goog.global.CLOSURE_NO_DEPS;
goog.global.CLOSURE_IMPORT_SCRIPT;
goog.nullFunction = function() {
};
goog.identityFunction = function(opt_returnValue, var_args) {
  return opt_returnValue
};
goog.abstractMethod = function() {
  throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function(ctor) {
  ctor.getInstance = function() {
    if(ctor.instance_) {
      return ctor.instance_
    }
    if(goog.DEBUG) {
      goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = ctor
    }
    return ctor.instance_ = new ctor
  }
};
goog.instantiatedSingletons_ = [];
goog.DEPENDENCIES_ENABLED = !COMPILED && goog.ENABLE_DEBUG_LOADER;
if(goog.DEPENDENCIES_ENABLED) {
  goog.included_ = {};
  goog.dependencies_ = {pathToNames:{}, nameToPath:{}, requires:{}, visited:{}, written:{}};
  goog.inHtmlDocument_ = function() {
    var doc = goog.global.document;
    return typeof doc != "undefined" && "write" in doc
  };
  goog.findBasePath_ = function() {
    if(goog.global.CLOSURE_BASE_PATH) {
      goog.basePath = goog.global.CLOSURE_BASE_PATH;
      return
    }else {
      if(!goog.inHtmlDocument_()) {
        return
      }
    }
    var doc = goog.global.document;
    var scripts = doc.getElementsByTagName("script");
    for(var i = scripts.length - 1;i >= 0;--i) {
      var src = scripts[i].src;
      var qmark = src.lastIndexOf("?");
      var l = qmark == -1 ? src.length : qmark;
      if(src.substr(l - 7, 7) == "base.js") {
        goog.basePath = src.substr(0, l - 7);
        return
      }
    }
  };
  goog.importScript_ = function(src) {
    var importScript = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_;
    if(!goog.dependencies_.written[src] && importScript(src)) {
      goog.dependencies_.written[src] = true
    }
  };
  goog.writeScriptTag_ = function(src) {
    if(goog.inHtmlDocument_()) {
      var doc = goog.global.document;
      if(doc.readyState == "complete") {
        var isDeps = /\bdeps.js$/.test(src);
        if(isDeps) {
          return false
        }else {
          throw Error('Cannot write "' + src + '" after document load');
        }
      }
      doc.write('<script type="text/javascript" src="' + src + '"></' + "script>");
      return true
    }else {
      return false
    }
  };
  goog.writeScripts_ = function() {
    var scripts = [];
    var seenScript = {};
    var deps = goog.dependencies_;
    function visitNode(path) {
      if(path in deps.written) {
        return
      }
      if(path in deps.visited) {
        if(!(path in seenScript)) {
          seenScript[path] = true;
          scripts.push(path)
        }
        return
      }
      deps.visited[path] = true;
      if(path in deps.requires) {
        for(var requireName in deps.requires[path]) {
          if(!goog.isProvided_(requireName)) {
            if(requireName in deps.nameToPath) {
              visitNode(deps.nameToPath[requireName])
            }else {
              throw Error("Undefined nameToPath for " + requireName);
            }
          }
        }
      }
      if(!(path in seenScript)) {
        seenScript[path] = true;
        scripts.push(path)
      }
    }
    for(var path in goog.included_) {
      if(!deps.written[path]) {
        visitNode(path)
      }
    }
    for(var i = 0;i < scripts.length;i++) {
      if(scripts[i]) {
        goog.importScript_(goog.basePath + scripts[i])
      }else {
        throw Error("Undefined script input");
      }
    }
  };
  goog.getPathFromDeps_ = function(rule) {
    if(rule in goog.dependencies_.nameToPath) {
      return goog.dependencies_.nameToPath[rule]
    }else {
      return null
    }
  };
  goog.findBasePath_();
  if(!goog.global.CLOSURE_NO_DEPS) {
    goog.importScript_(goog.basePath + "deps.js")
  }
}
goog.typeOf = function(value) {
  var s = typeof value;
  if(s == "object") {
    if(value) {
      if(value instanceof Array) {
        return"array"
      }else {
        if(value instanceof Object) {
          return s
        }
      }
      var className = Object.prototype.toString.call((value));
      if(className == "[object Window]") {
        return"object"
      }
      if(className == "[object Array]" || typeof value.length == "number" && typeof value.splice != "undefined" && typeof value.propertyIsEnumerable != "undefined" && !value.propertyIsEnumerable("splice")) {
        return"array"
      }
      if(className == "[object Function]" || typeof value.call != "undefined" && typeof value.propertyIsEnumerable != "undefined" && !value.propertyIsEnumerable("call")) {
        return"function"
      }
    }else {
      return"null"
    }
  }else {
    if(s == "function" && typeof value.call == "undefined") {
      return"object"
    }
  }
  return s
};
goog.isDef = function(val) {
  return val !== undefined
};
goog.isNull = function(val) {
  return val === null
};
goog.isDefAndNotNull = function(val) {
  return val != null
};
goog.isArray = function(val) {
  return goog.typeOf(val) == "array"
};
goog.isArrayLike = function(val) {
  var type = goog.typeOf(val);
  return type == "array" || type == "object" && typeof val.length == "number"
};
goog.isDateLike = function(val) {
  return goog.isObject(val) && typeof val.getFullYear == "function"
};
goog.isString = function(val) {
  return typeof val == "string"
};
goog.isBoolean = function(val) {
  return typeof val == "boolean"
};
goog.isNumber = function(val) {
  return typeof val == "number"
};
goog.isFunction = function(val) {
  return goog.typeOf(val) == "function"
};
goog.isObject = function(val) {
  var type = typeof val;
  return type == "object" && val != null || type == "function"
};
goog.getUid = function(obj) {
  return obj[goog.UID_PROPERTY_] || (obj[goog.UID_PROPERTY_] = ++goog.uidCounter_)
};
goog.hasUid = function(obj) {
  return!!obj[goog.UID_PROPERTY_]
};
goog.removeUid = function(obj) {
  if("removeAttribute" in obj) {
    obj.removeAttribute(goog.UID_PROPERTY_)
  }
  try {
    delete obj[goog.UID_PROPERTY_]
  }catch(ex) {
  }
};
goog.UID_PROPERTY_ = "closure_uid_" + (Math.random() * 1E9 >>> 0);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function(obj) {
  var type = goog.typeOf(obj);
  if(type == "object" || type == "array") {
    if(obj.clone) {
      return obj.clone()
    }
    var clone = type == "array" ? [] : {};
    for(var key in obj) {
      clone[key] = goog.cloneObject(obj[key])
    }
    return clone
  }
  return obj
};
goog.bindNative_ = function(fn, selfObj, var_args) {
  return(fn.call.apply(fn.bind, arguments))
};
goog.bindJs_ = function(fn, selfObj, var_args) {
  if(!fn) {
    throw new Error;
  }
  if(arguments.length > 2) {
    var boundArgs = Array.prototype.slice.call(arguments, 2);
    return function() {
      var newArgs = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(newArgs, boundArgs);
      return fn.apply(selfObj, newArgs)
    }
  }else {
    return function() {
      return fn.apply(selfObj, arguments)
    }
  }
};
goog.bind = function(fn, selfObj, var_args) {
  if(Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1) {
    goog.bind = goog.bindNative_
  }else {
    goog.bind = goog.bindJs_
  }
  return goog.bind.apply(null, arguments)
};
goog.partial = function(fn, var_args) {
  var args = Array.prototype.slice.call(arguments, 1);
  return function() {
    var newArgs = args.slice();
    newArgs.push.apply(newArgs, arguments);
    return fn.apply(this, newArgs)
  }
};
goog.mixin = function(target, source) {
  for(var x in source) {
    target[x] = source[x]
  }
};
goog.now = goog.TRUSTED_SITE && Date.now || function() {
  return+new Date
};
goog.globalEval = function(script) {
  if(goog.global.execScript) {
    goog.global.execScript(script, "JavaScript")
  }else {
    if(goog.global.eval) {
      if(goog.evalWorksForGlobals_ == null) {
        goog.global.eval("var _et_ = 1;");
        if(typeof goog.global["_et_"] != "undefined") {
          delete goog.global["_et_"];
          goog.evalWorksForGlobals_ = true
        }else {
          goog.evalWorksForGlobals_ = false
        }
      }
      if(goog.evalWorksForGlobals_) {
        goog.global.eval(script)
      }else {
        var doc = goog.global.document;
        var scriptElt = doc.createElement("script");
        scriptElt.type = "text/javascript";
        scriptElt.defer = false;
        scriptElt.appendChild(doc.createTextNode(script));
        doc.body.appendChild(scriptElt);
        doc.body.removeChild(scriptElt)
      }
    }else {
      throw Error("goog.globalEval not available");
    }
  }
};
goog.evalWorksForGlobals_ = null;
goog.cssNameMapping_;
goog.cssNameMappingStyle_;
goog.getCssName = function(className, opt_modifier) {
  var getMapping = function(cssName) {
    return goog.cssNameMapping_[cssName] || cssName
  };
  var renameByParts = function(cssName) {
    var parts = cssName.split("-");
    var mapped = [];
    for(var i = 0;i < parts.length;i++) {
      mapped.push(getMapping(parts[i]))
    }
    return mapped.join("-")
  };
  var rename;
  if(goog.cssNameMapping_) {
    rename = goog.cssNameMappingStyle_ == "BY_WHOLE" ? getMapping : renameByParts
  }else {
    rename = function(a) {
      return a
    }
  }
  if(opt_modifier) {
    return className + "-" + rename(opt_modifier)
  }else {
    return rename(className)
  }
};
goog.setCssNameMapping = function(mapping, opt_style) {
  goog.cssNameMapping_ = mapping;
  goog.cssNameMappingStyle_ = opt_style
};
goog.global.CLOSURE_CSS_NAME_MAPPING;
if(!COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING) {
  goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING
}
goog.getMsg = function(str, opt_values) {
  var values = opt_values || {};
  for(var key in values) {
    var value = ("" + values[key]).replace(/\$/g, "$$$$");
    str = str.replace(new RegExp("\\{\\$" + key + "\\}", "gi"), value)
  }
  return str
};
goog.getMsgWithFallback = function(a, b) {
  return a
};
goog.exportSymbol = function(publicPath, object, opt_objectToExportTo) {
  goog.exportPath_(publicPath, object, opt_objectToExportTo)
};
goog.exportProperty = function(object, publicName, symbol) {
  object[publicName] = symbol
};
goog.inherits = function(childCtor, parentCtor) {
  function tempCtor() {
  }
  tempCtor.prototype = parentCtor.prototype;
  childCtor.superClass_ = parentCtor.prototype;
  childCtor.prototype = new tempCtor;
  childCtor.prototype.constructor = childCtor
};
goog.base = function(me, opt_methodName, var_args) {
  var caller = arguments.callee.caller;
  if(goog.DEBUG) {
    if(!caller) {
      throw Error("arguments.caller not defined.  goog.base() expects not " + "to be running in strict mode. See " + "http://www.ecma-international.org/ecma-262/5.1/#sec-C");
    }
  }
  if(caller.superClass_) {
    return caller.superClass_.constructor.apply(me, Array.prototype.slice.call(arguments, 1))
  }
  var args = Array.prototype.slice.call(arguments, 2);
  var foundCaller = false;
  for(var ctor = me.constructor;ctor;ctor = ctor.superClass_ && ctor.superClass_.constructor) {
    if(ctor.prototype[opt_methodName] === caller) {
      foundCaller = true
    }else {
      if(foundCaller) {
        return ctor.prototype[opt_methodName].apply(me, args)
      }
    }
  }
  if(me[opt_methodName] === caller) {
    return me.constructor.prototype[opt_methodName].apply(me, args)
  }else {
    throw Error("goog.base called from a method of one name " + "to a method of a different name");
  }
};
goog.scope = function(fn) {
  fn.call(goog.global)
};
goog.provide("BB.go");
goog.provide("BB.Frame");
goog.provide("BB.Recording");
goog.provide("BB.RecPlayer");
goog.provide("BB.Session");
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
BB.RecPlayer = function(recording, mouseOn, mouseOff) {
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
  this.init(mouseOn, mouseOff)
};
BB.RecPlayer.prototype.init = function(mouseOn, mouseOff) {
  this._mouseOn.src = mouseOn || "/assets/img/mouse-on.png";
  this._mouseOff.src = mouseOff || "/assets/img/mouse-off.png";
  this.win.className = "bb-win";
  this.viewport.className = "bb-vp";
  this.doc.className = "bb-doc";
  this.mouse.className = "bb-mouse";
  this.mouse._width = 32;
  this.mouse._height = 32;
  this.mouse._centerX = parseInt(this.mouse._width * 0.5, 10);
  this.mouse._centerY = parseInt(this.mouse._height * 0.5, 10);
  this.mouse.style.left = "-100px";
  this.mouse.style.top = "-100px";
  this.mouse.src = this._mouseOff.src;
  this.win.appendChild(this.mouse);
  this.win.appendChild(this.viewport);
  this.viewport.appendChild(this.doc);
  this.timer
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
    this.timer = setTimeout(this.tick.bind(this), this.ticks.FRAME_DUR_MILLI)
  }
};
BB.RecPlayer.prototype.go = function(panel) {
  if(!this.active && this.recording !== {}) {
    var clone;
    while(panel.firstChild) {
      clone = panel.firstChild.cloneNode(false);
      panel.replaceChild(clone, panel.firstChild)
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
BB.RecPlayer.prototype.stop = function() {
  clearTimeout(this.timer)
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

