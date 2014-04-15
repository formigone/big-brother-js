goog.provide('BB.Session');

goog.require('BB.Frame');

/**
 *
 * @param {number=} fps
 * @param {string=} title
 * @param {string=} url
 *
 * @constructor
 */
BB.Session = function(fps, title, url) {
    /** @type {number} */
    this.fps = fps || 3;

    /** @type {number} */
    this.tick = this.fps * 1000;

    /** @type {string} */
    this.title = title || BB.Session.getPageTitle();

    /** @type {string} */
    this.url = url || BB.Session.getPageUrl();

    /** @type {Array<BB.Frame>} */
    this.frames = [];

    /** @type {boolean} */
    this.active = false;
};

BB.Session.prototype.start = function(){
    if (!this.active) {
        this.active = true;
        this.tick();
    }
};

BB.Session.prototype.stop = function(){
    this.active = false;
};

BB.Session.prototype.tick = function(){
};

BB.Session.prototype.save = function(){
};

BB.Session.prototype.upload = function(){
};

/**
 *
 * @returns {string}
 */
BB.Session.getPageTitle = function() {
    // TODO: attempt to extract <title> value
    var title = '{{page title}}';

    return title;
};

/**
 *
 * @returns {string}
 */
BB.Session.getPageUrl = function(){
    return window.location.href;
};
