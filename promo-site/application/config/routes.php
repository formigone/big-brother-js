<?php  if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

$route['live-demo'] = '/home/demo';
$route['community'] = '/home/community';
$route['download'] = '/home/download';

$route['default_controller'] = 'home';
$route['404_override'] = 'error';
