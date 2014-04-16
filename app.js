goog.require('BB.Session');

var main = function(){
    var sess = new BB.Session(1, 'Test Page');
    var sess2 = new BB.Session(2);

    console.log(sess, sess2);
};
