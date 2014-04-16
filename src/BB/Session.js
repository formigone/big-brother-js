goog.provide('BB.Session');

goog.require('BB.Frame');
goog.require('BB.Recording');

/**
 *
 * @param {string} backendUrl
 * @param {number=} fps
 * @param {string=} title
 * @param {string=} url
 *
 * @constructor
 */
BB.Session = function(backendUrl, fps, title, url) {
    /** @type {string} */
    this.backendUrl = backendUrl;

    /** @type {number} */
    this.fps = fps || 3;

    /** @type {number} */
    this.TICK_MILLI = 1000 / this.fps;

    /** @type {string} */
    this.title = title || BB.Session.getPageTitle();

    /** @type {string} */
    this.url = url || BB.Session.getPageUrl();

    /** @type {Array.<BB.Frame>} */
    this.frames = [];

    /** @type {boolean} */
    this.active = false;

    /** @type {number} Pointer to setTimeout */
    this.timer;

    /** @type {boolean} */
    this.clicked = false;

    this.init();
};

BB.Session.prototype.init = function(){
    var self = this;

    document.addEventListener('mousemove', function(e) {
        BB.Session.mouse.x = e.clientX || e.pageX;
        BB.Session.mouse.y = e.clientY || e.pageY;
    }, false);

    document.addEventListener('click', function(e) {
        self.clicked = true;
    }, false);
};

/**
 * Start recording a session
 */
BB.Session.prototype.start = function(){
    if (!this.active) {
        this.active = true;
        this.tick();
    }
};

/**
 * Stop recording a session
 */
BB.Session.prototype.stop = function(){
    clearTimeout(this.timer);
    this.active = false;
};

/**
 * Captures the current frame
 *
 * @private
 */
BB.Session.prototype.tick = function(){
    if (this.active) {
        var frame = new BB.Frame(
            BB.Frame.getCurrentWin(),
            BB.Frame.getCurrentScroll(),
            BB.Frame.getCurrentMouse(),
            this.clicked
        );

        this.frames.push(frame);
        this.timer = setTimeout(this.tick.bind(this), this.TICK_MILLI);
        this.clicked = false;
    }
};

/**
 * Send recording to backend server
 */
BB.Session.prototype.upload = function(){
    var xhr = new XMLHttpRequest();

    xhr.open('POST', '/save.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send('recording=' + this.toString());
};

/**
 *
 * @returns {string}
 */
BB.Session.getPageTitle = function() {
    var el = document.getElementsByTagName('title');
    var title = 'Untitled document';

    if (el.length > 0) {
        title = el[0].textContent;
    }

    return title;
};

/**
 *
 * @returns {string}
 */
BB.Session.getPageUrl = function(){
    return window.location.href;
};

/**
 *
 * @returns {string}
 */
BB.Session.prototype.toString = function(){
    return JSON.stringify(
        new BB.Recording(this.title, this.url, BB.Frame.getClientRes(), this.fps, this.frames)
    );
};

/**
 *
 * @type {BB.mouse}
 */
BB.Session.mouse = {
    x: 0,
    y: 0
};
