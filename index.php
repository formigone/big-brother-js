<!doctype html>
<html lang="eng">
<head>
   <title>BigBrother.JS</title>
   <link rel="stylesheet" href="/css/bb.css">
   <style>
      html, body {
         width: 100%;
         height: 100%;
      }

      body {
         margin: 10px;
         background: #<?= rand(1, 9); ?><?= rand(1, 9); ?><?= rand(1, 9); ?> url('/img/Hopstarter-Malware-Spy.ico') center center no-repeat;
      }
   </style>
</head>
<body>

<?php if (getenv('APPLICATION_ENV') === 'development'): ?>
   <script src="/lib/closure/goog/base.js"></script>
   <script src="deps.js"></script>
   <script src="app.js"></script>
<?php else: ?>
   <!--   <script src="app.comp.js"></script>-->
<?php endif; ?>
<!--<script src="bb.min.js"></script>-->
<!--<script src="app.js"></script>-->
<script>main();</script>

</body>
</html>