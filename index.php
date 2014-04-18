<?php
require_once ('site/app.php');

$app = new Fmg\Site('#BigBrotherJS', 'home', 'home');
$app->setLayout('bootstrap');
$app->render();
