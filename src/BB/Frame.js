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
 *
 * @constructor
 */
BB.Frame = function(win, scroll, mouse) {
    /** @type {BB.win} */
    this.win = win;

    /** @type {BB.scroll} */
    this.scroll = scroll;

    /** @type {BB.mouse} */
    this.mouse = mouse;
};
