goog.provide('BB.Recording');

/**
 *
 * @param {string} title
 * @param {string} url
 * @param {number} fps
 * @param {Array.<BB.Frame>} frames
 *
 * @constructor
 */
BB.Recording = function(title, url, fps, frames) {
    /** @type {string} */
    this.title = title;

    /** @type {string} */
    this.url = url;

    /** @type {number} */
    this.fps = fps;

    /** @type {Array.<BB.Frame>} */
    this.frames = frames;
};
