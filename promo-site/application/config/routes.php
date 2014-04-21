<?php  if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

$route['live-demo'] = '/home/demo';
$route['docs'] = '/home/docs';
$route['community'] = '/home/community';
$route['get-started'] = '/home/getStarted';

$route['default_controller'] = 'home';
$route['404_override'] = 'error';
