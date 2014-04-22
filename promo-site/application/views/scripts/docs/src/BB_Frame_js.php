<div><p><br/></p></div><div class="container">

	
	
	


	<div class="row">
		<div id="index" class="col-md-3">
			
			<div >
	<div class="panel panel-default">
		<div class="panel-heading">Classes</div>
		
			<div class="panel-body"><a href="/docs/api/BB_Frame"><span class="indent" style="padding-left:14px;"><i class="icon-jsdoc icon-jsdoc-class"></i><span class="jsdoc-class-index">Frame</span></span></a></div>
		
			<div class="panel-body"><a href="/docs/api/BB_RecPlayer"><span class="indent" style="padding-left:14px;"><i class="icon-jsdoc icon-jsdoc-class"></i><span class="jsdoc-class-index">RecPlayer</span></span></a></div>
		
			<div class="panel-body"><a href="/docs/api/BB_Recording"><span class="indent" style="padding-left:14px;"><i class="icon-jsdoc icon-jsdoc-class"></i><span class="jsdoc-class-index">Recording</span></span></a></div>
		
			<div class="panel-body"><a href="/docs/api/BB_Session"><span class="indent" style="padding-left:14px;"><i class="icon-jsdoc icon-jsdoc-class"></i><span class="jsdoc-class-index">Session</span></span></a></div>
		
			<div class="panel-body"><a href="/docs/api/_global_"><span class="indent" style="padding-left:0px;"><i class="icon-jsdoc icon-jsdoc-namespace"></i><span class="jsdoc-class-index">_global_</span></span></a></div>
		
	</div>
</div>

			
		</div>

		<div id="content" class="col-md-9">


			<pre  class="prettyprint linenums">goog.provide('BB.Frame');

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
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
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

		</div>
	</div>


	
</div>
<script type="text/javascript">
	prettyPrint();
	var i = 1;
	$('#source-code li').each(function() {
		$(this).attr({ id: 'line' + (i++) });
	});
</script>
</div></div>