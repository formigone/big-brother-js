goog.provide('BB.RecPlayer');

/**
 *
 * @param {BB.Recording=} recording
 *
 * @constructor
 */
BB.RecPlayer = function(recording) {
    /** @type {BB.Recording} */
    this.recording = recording || {};

    /** @type {Node} */
    this.win = document.createElement('div');

    /** @type {Node} */
    this.viewport = document.createElement('div');

    /** @type {Node} */
    this.doc = document.createElement('iframe');

    /** @type {Element} */
    this.mouse = document.createElement('img');

    /**
     * @type {Element}
     * @private
     */
    this._mouseOn = new Image();

    /**
     * @type {Element}
     * @private
     */
    this._mouseOff = new Image();

    this.init();
};

/**
 *
 */
BB.RecPlayer.prototype.init = function(){
    // Preload and cache icons
    this._mouseOn.src = '/img/mouse-on.png';
    this._mouseOff.src = '/img/mouse-off.png';

    this.win.className = 'bb-win';
    this.viewport.className = 'bb-vp';
    this.doc.className = 'bb-doc';
    this.mouse.className = 'bb-mouse';

    this.mouse._width = 32;
    this.mouse._height = 32;
    this.mouse._centerX = parseInt(this.mouse._width * 0.5);
    this.mouse._centerY = parseInt(this.mouse._height * 0.5);
    this.mouse.style.left = '-100px';
    this.mouse.style.top = '-100px';
    this.mouse.src = this._mouseOff.src;

    this.win.appendChild(this.mouse);
    this.win.appendChild(this.viewport);
    this.viewport.appendChild(this.doc);
};

/**
 *
 * @param {BB.Recording} recording
 */
BB.RecPlayer.prototype.setRecording = function(recording) {
    this.recording = recording;
};

/**
 *
 * @param {number} x
 * @param {number} y
 */
BB.RecPlayer.prototype.centerMouse = function(x, y) {
    this.mouse.style.left = (this.recording.frames[0].mouse.x + this.mouse._centerX) + 'px';
    this.mouse.style.top = (this.recording.frames[0].mouse.x + this.mouse._centerY) + 'px';
};


/**
 *
 * @param {Node} panel
 */
BB.RecPlayer.prototype.go = function(panel) {
    if (this.recording !== {}) {
        var clone;

        while (panel.firstChild) {
            clone = panel.firstChild.cloneNode(true);
            panel.replaceChild(clone);
        }

        this.win.style.width = this.recording.res.width + 'px';
        this.win.style.height = this.recording.res.height + 'px';

        this.viewport.style.width = this.recording.frames[0].win.width + 'px';
        this.viewport.style.height = this.recording.frames[0].win.height + 'px';

        this.doc.style.width = this.recording.res.width + 'px';
        this.doc.style.height = this.recording.res.height + 'px';
        this.doc.src = this.recording.url;

        this.centerMouse(this.recording.frames[0].mouse.x, this.recording.frames[0].mouse.y);

        panel.appendChild(this.win);
    }
};
