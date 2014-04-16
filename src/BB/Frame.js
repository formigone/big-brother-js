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

BB.Frame.getCurrentWin = function() {
    return {
        width: 0,
        height: 0
    };
};

BB.Frame.getCurrentScroll = function() {
    return {
        offsetX: 0,
        offsetY: 0
    };
};

BB.Frame.getCurrentMouse = function() {
    return {
        x: 0,
        y: 0
    };
};
