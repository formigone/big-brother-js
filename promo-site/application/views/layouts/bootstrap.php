<!doctype html>
<html lang="en">
<head>
   <meta charset="utf-8">
   <title><?= $page['title']; ?></title>

   <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
   <link rel="icon" href="/favicon.ico" type="image/x-icon">

   <meta name="viewport" content="width=device-width,initial-scale=1.0">
   <link href="/assets/css/bootstrap.min.css" rel="stylesheet">
   <link href="/assets/css/strapped.css" rel="stylesheet">
   <link rel="stylesheet" href="/assets/css/bb.css">
   <link href="/assets/css/docs-style.css" rel="stylesheet">

   <link rel="apple-touch-icon-precomposed" sizes="57x57"
         href="/assets/img/big-brother-js-icon-57.png"/>
   <link rel="apple-touch-icon-precomposed" sizes="72x72"
         href="/assets/img/big-brother-js-icon-72.png"/>
   <link rel="apple-touch-icon-precomposed" sizes="114x114"
         href="/assets/img/big-brother-js-icon-114.png"/>

   <style>
      .nav a.navbar-btn {
         margin: 0.7em 0 0 1em !important;
         padding: 0 !important;
      }
   </style>

   <script src="/assets/js/bundle.js"></script>
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
         <a class="navbar-brand nav-link" href="/"><span>&lt;</span>BigBrother.js<span>&gt;</span></a>
      </div>

      <div class="collapse navbar-collapse navbar-ex1-collapse">
         <ul class="nav navbar-nav navbar-right">
            <li class="<?= $page['active'] === 'what' ? 'active' : ''; ?>">
               <a href="/" class="nav-link">What it is</a>
            </li>
            <li class="<?= $page['active'] === 'demo' ? 'active' : ''; ?>">
               <a href="/live-demo" class="nav-link">Live demo</a>
            </li>
            <li class="<?= $page['active'] === 'docs' ? 'active' : ''; ?>">
               <a href="/docs" class="nav-link">API Docs</a>
            </li>
            <li class="<?= $page['active'] === 'community' ? 'active' : ''; ?>">
               <a href="/community">Community</a>
            </li>
            <li>
               <a href="/download" class="navbar-btn">
                  <span class="btn btn-warning btn-sm">Download</span>
               </a>
            </li>
         </ul>
      </div>
   </div>
</nav>

<?= $view; ?>

<footer>
   <div class="container clearfix">
      <p class="pull-left">
         Copyright &copy; 2014 <a href="http://www.formigone.com">Formigone Software</a>. All rights reserved.
      </p>

      <p class="pull-right">&nbsp; &nbsp;<span>&lt;/</span>BigBrother.js<span>&gt;</span></p>

      <p class="pull-right">&nbsp;
         <a href="https://github.com/formigone/big-brother-js">
            <span class="glyphicon glyphicon-share"></span>GitHub
         </a>
      </p>

      <p class="pull-right">&nbsp;
         <a href="https://plus.google.com/u/0/b/102289667188884214558/102289667188884214558/about">
            <span class="glyphicon glyphicon-share"></span>Google+
         </a>
      </p>

      <p class="pull-right">&nbsp;
         <a href="https://twitter.com/bigbrotherjs">
            <span class="glyphicon glyphicon-share"></span>Twitter
         </a>
      </p>
   </div>
</footer>

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-20148108-5', 'bigbrotherjs.com');
  ga('send', 'pageview');

</script>


</body>
</html>
