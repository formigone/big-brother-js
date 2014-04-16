goog.require('BB.Session');

var main = function(){
    var sess = new BB.Session('/save.php', 3, 'Test Page');
    var btns = {
        start: document.createElement('button'),
        stop: document.createElement('button'),
        upload: document.createElement('button')
    };

    var confBtn = function(btn, label, action) {
        btn.textContent = label;
        btn.addEventListener('click', action.bind(sess), false);
    };

    confBtn(btns.start, 'Start', sess.start);
    confBtn(btns.stop, 'Stop', sess.stop);
    confBtn(btns.upload, 'Upload', sess.upload);

    document.body.appendChild((btns.start));
    document.body.appendChild((btns.stop));
    document.body.appendChild((btns.upload));
};
