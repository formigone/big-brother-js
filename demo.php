<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Big Brother JS: Demo</title>
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link href="/css/bootstrap.min.css" rel="stylesheet">
    <link href="/css/strapped.css" rel="stylesheet">
    <link rel="stylesheet" href="/css/bb.css">
    <style>
        body {
            position: relative;
        }
        
        .player {
            position: absolute;
            top: 10px;
            left: 10px;
            z-index: 9999999;
        }
    </style>
</head>
<body>

<nav class="navbar navbar-default navbar-inverse navbar-fixed-top" role="navigation">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand nav-link" href="#top">#BigBrotherJs</a>
        </div>

        <div class="collapse navbar-collapse navbar-ex1-collapse">
            <ul class="nav navbar-nav navbar-right">
                <li><a href="#benefits" class="nav-link">Benefits</a></li>
                <li><a href="#tour" class="nav-link">Tour</a></li>
                <li><a href="#about" class="nav-link">About</a></li>
                <li><a href="#contact">Contact Us</a></li>
                <li><button class="btn btn-warning btn-sm navbar-btn">Sign Up</button></li>
            </ul>
        </div>
    </div>
</nav>

<div id="top" class="jumbotron">
    <div class="container">
        <img src="/img/big-brother-js-logo.png"/>
        <h1>Big Brother JS</h1>
    </div>
</div>

<div class="container">
    <h3 id="benefits" class="subhead">Live Demo</h3>
    <div class="row">
        <div class="col-xs-12 benefit" id="demoToolbar"></div>
    </div>
</div>

<footer>
    <div class="container clearfix">
        <p class="pull-left">
            Copyright &copy; 2014 <a href="http://www.rodrigo-silveira.com">Rodrigo Silveira</a>. All rights reserved.
        </p>
        <p class="pull-right">#BigBrotherJS</p>
    </div>
</footer>

<script src="js/jquery.js"></script>
<script src="js/bootstrap.min.js"></script>
<script>
    $(".nav-link").click(function(e) {
        e.preventDefault();
        var link = $(this);
        var href = link.attr("href");
        $("html,body").animate({scrollTop: $(href).offset().top - 80}, 500);
        link.closest(".navbar").find(".navbar-toggle:not(.collapsed)").click();
    });
</script>

<?php if (getenv('APPLICATION_ENV') === 'development'): ?>
    <script src="/lib/closure/goog/base.js"></script>
    <script src="deps.js"></script>
    <script src="app.js"></script>
<?php else: ?>
    <!--   <script src="app.comp.js"></script>-->
<?php endif; ?>
<!--<script src="bb.min.js"></script>-->
<!--<script src="app.js"></script>-->
<script>main(document.getElementById('demoToolbar'), document.body);</script>
</body>
</html>

</body>
</html>