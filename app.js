goog.require('BB.Session');
goog.require('BB.RecPlayer');

var main = function() {
    var sess = new BB.Session('/save.php', 10, 'Test Page');
    var player = new BB.RecPlayer();
    var sel = document.createElement('select');
    var container = document.createElement('div');
    var btns = {
        start: document.createElement('button'),
        stop: document.createElement('button'),
        upload: document.createElement('button'),
        play: document.createElement('button')
    };

    var desc = {
        title: document.createElement('h1'),
        url: document.createElement('p'),
        win: document.createElement('p'),
        fps: document.createElement('p'),
        frames: document.createElement('p')
    };

    var confBtn = function(btn, label, action) {
        btn.textContent = label;
        btn.addEventListener('click', action.bind(sess), false);
    };

    var confSel = function(el) {
        var opt = document.createElement('option');
        var xhr = new XMLHttpRequest();

        var loadRec = function(event) {
            var _sel = event.target;
            var index = _sel.selectedIndex;
            var filename = _sel.options[index].getAttribute('filename');
            var xhr = new XMLHttpRequest();

            if (filename.length > 1) {
                xhr.open('GET', '/recordings/' + filename, true);
                xhr.onreadystatechange = function(res) {
                    var _xhr = res.target;
                    var data;

                    if (_xhr.status === 200 && _xhr.readyState === 4) {
                        data = JSON.parse(_xhr.response);

                        desc.title.textContent = data.title;
                        desc.url.textContent = data.url;
                        desc.win.textContent = 'Resolution: <' + data.res.width + ', ' + data.res.height + '>';
                        desc.fps.textContent = 'FPS: ' + data.fps;

                        var html = 'Frames: ' + data.frames.length + '<br/>';

                        for (var i = 0, len = data.frames.length; i < len; i++) {
                            var frame = data.frames[i];

                            html += 'viewport: &lt;' + frame.win.width + ', ' + frame.win.height + '>, ';
                            html += 'scroll: &lt;' + frame.scroll.offsetX + ', ' + frame.scroll.offsetY + '>, ';
                            html += 'mouse: ' + (frame.clicked ? '*' : '') + '&lt;' + frame.mouse.x + ', ' + frame.mouse.y + '><br/>';
                        }

                        desc.frames.innerHTML = html;
                        player.setRecording(/** @type {BB.Recording} */(data));
                    }
                };

                xhr.send();
            }
        };

        container.className = 'player';

        opt.setAttribute('filename', '');
        opt.textContent = 'Loading...';
        el.appendChild(opt);
        el.addEventListener('change', loadRec, false);

        xhr.open('GET', '/list.php', true);
        xhr.onreadystatechange = function(res) {
            var _xhr = res.target;
            var data;

            if (_xhr.status === 200 && _xhr.readyState === 4) {
                data = JSON.parse(_xhr.response);
                opt.textContent = 'Select file';

                for (var i = 0, len = data.length; i < len; i++) {
                    var _opt = document.createElement('option');
                    _opt.setAttribute('filename', data[i]);
                    _opt.textContent = data[i];
                    el.appendChild(_opt);
                }
            }
        };

        xhr.send();
    };

    confSel(sel);
    confBtn(btns.start, 'Start', sess.start);
    confBtn(btns.stop, 'Stop', sess.stop);
    confBtn(btns.upload, 'Upload', sess.upload);
    confBtn(btns.play, 'Play', function(){
        player.go(container);
    });

    document.body.appendChild(btns.start);
    document.body.appendChild(btns.stop);
    document.body.appendChild(btns.upload);
    document.body.appendChild(btns.play);
    document.body.appendChild(sel);

    document.body.appendChild(container);

    document.body.appendChild(desc.title);
    document.body.appendChild(desc.url);
    document.body.appendChild(desc.win);
    document.body.appendChild(desc.fps);
    document.body.appendChild(desc.frames);
};
