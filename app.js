goog.require('BB.Session');

var main = function(){
    var sess = new BB.Session('/save.php', 3, 'Test Page');
    var sel = document.createElement('select');
    var btns = {
        start: document.createElement('button'),
        stop: document.createElement('button'),
        upload: document.createElement('button')
    };

    var desc = {
        title: document.createElement('h1'),
        url: document.createElement('p'),
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
                        desc.fps.textContent = 'FPS: ' + data.fps;

                        var html = 'Frames: ' + data.frames.length + '<br/>';

                        for (var i = 0, len = data.frames.length; i < len; i++) {
                            var frame = data.frames[i];

                            html += 'win: &lt;' + frame.win.width + ', ' + frame.win.height + '>, ';
                            html += 'scroll: &lt;' + frame.scroll.offsetX + ', ' + frame.scroll.offsetY + '>, ';
                            html += 'mouse: &lt;' + frame.mouse.x + ', ' + frame.mouse.y + '><br/>';
                        }

                        desc.frames.innerHTML = html;
                    }
                };

                xhr.send();
            }
        };

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

    confBtn(btns.start, 'Start', sess.start);
    confBtn(btns.stop, 'Stop', sess.stop);
    confBtn(btns.upload, 'Upload', sess.upload);
    confSel(sel);

    document.body.appendChild(btns.start);
    document.body.appendChild(btns.stop);
    document.body.appendChild(btns.upload);
    document.body.appendChild(sel);

    document.body.appendChild(desc.title);
    document.body.appendChild(desc.url);
    document.body.appendChild(desc.fps);
    document.body.appendChild(desc.frames);
};
