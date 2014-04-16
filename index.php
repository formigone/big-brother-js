<!doctype html>
<html lang="eng">
<head>
   <title>BigBrother.JS</title>
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