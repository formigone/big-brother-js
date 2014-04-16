goog.provide('BB.Frame');

/** @typedef {{x: number, y: number}} */
BB.mouse;

/** @typedef {{width: number, height: number}} */
BB.win;

/** @typedef {{offsetX: number, offsetY: number}} */
BB.scroll;

/**
 *
 * @param {BB.win} win
 * @param {BB.scroll} scroll
 * @param {BB.mouse} mouse
 * @param {boolean=} clicked
 *
 * @constructor
 */
BB.Frame = function(win, scroll, mouse, clicked) {
    /** @type {BB.win} */
    this.win = win;

    /** @type {BB.scroll} */
    this.scroll = scroll;

    /** @type {BB.mouse} */
    this.mouse = mouse;

    /** @type {boolean} */
    this.clicked = clicked || false;
};

/**
 *
 * @returns {BB.win}
 */
BB.Frame.getClientRes = function() {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    };
};

/**
 *
 * @returns {BB.win}
 */
BB.Frame.getCurrentWin = function() {
    return {
        width: document.body.clientWidth,
        height: document.body.clientHeight
    };
};

/**
 *
 * @returns {BB.scroll}
 */
BB.Frame.getCurrentScroll = function() {
    return {
        offsetX: document.body.scrollLeft,
        offsetY: document.body.scrollTop
    };
};

/**
 *
 * @returns {BB.mouse}
 */
BB.Frame.getCurrentMouse = function() {
    return {
        x: BB.Session.mouse.x || 0,
        y: BB.Session.mouse.y || 0
    };
};
