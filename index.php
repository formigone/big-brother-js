<?php
$path = explode('/', $_SERVER['REQUEST_URI']);
$route = array(
   'ctrl' => null,
   'action' => null,
   'params' => array()
);

$c = 0;
foreach ($path as $i => $_path) {
   $_path = trim($_path);

   if (!empty($_path)) {
      if ($c == 0) {
         $route['ctrl'] = $_path;
      } else if ($c == 1) {
         $route['action'] = $_path;
      } else {
         if ($c % 2 == 0) {
            $route['params'][$_path] = null;
         } else {
            $route['params'][$path[$i - 1]] = $_path;
         }
      }
      $c++;
   }
}

$route['ctrl'] = $route['ctrl'] ?: 'index';
$route['action'] = $route['action'] ?: 'index';

require_once ('app/App.php');

$app = new Th\App('#BigBrotherJS', 'home', 'home');
$app->setLayout('bootstrap');
$app->render();
