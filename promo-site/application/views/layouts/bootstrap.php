<!doctype html>
<html lang="en">
<head>
   <meta charset="utf-8">
   <title><?= $page['title']; ?></title>
   <meta name="viewport" content="width=device-width,initial-scale=1.0">
   <link href="/assets/css/bootstrap.min.css" rel="stylesheet">
   <link href="/assets/css/strapped.css" rel="stylesheet">
   <link rel="stylesheet" href="/assets/css/bb.css">
   <link href="/assets/css/docs-style.css" rel="stylesheet">

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
         <a class="navbar-brand nav-link" href="/"><span>&lt;</span>BigBrotherJs<span>&gt;</span></a>
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
               <a href="/get-started" class="navbar-btn">
                  <span class="btn btn-warning btn-sm">Get started</span>
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

      <p class="pull-right">&nbsp; &nbsp;<span>&lt;/</span>BigBrotherJS<span>&gt;</span></p>

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

</body>
</html>

</body>
</html>