<?php if (!defined('BASEPATH')) {
   exit('No direct script access allowed');
}

class Docs extends CI_Controller {

   public function __construct() {
      parent::__construct();
   }

   /**
    *
    */
   public function index() {
      $data = array(
         'page' => array(
            'title' => '#BigBrotherJS',
            'active' => 'what'
         ),
         'view' => $this->load->view('scripts/home/index', array(), true)
      );

      $this->load->view('layouts/bootstrap', $data);
   }

   /**
    *
    */
   public function api() {
      $this->load->library('uri');

      $path = 'scripts/docs/';
      $api = $this->uri->segment(3);

      if (preg_match('/^src_/', $api)) {
         $api = preg_replace('/^src_/', 'src/', $api);
      }

      if (file_exists(FCPATH."application/views/{$path}{$api}.php")) {
         $view = $this->load->view($path.$api, array(), true);
      } else {
         show_404();
      }

      $data = array(
         'page' => array(
            'title' => 'Documentation | #BigBrotherJS',
            'active' => 'home'
         ),
         'view' => $view
      );

      $this->load->view('layouts/bootstrap', $data);
   }
}
