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
      $view = $this->getApiView('index');
      $this->dispatch($view);
   }

   /**
    *
    */
   public function api() {
      $this->load->library('uri');

      $api = $this->uri->segment(3, 'index');
      $view = $this->getApiView($api);

      if (empty($view)) {
         show_404();
      }

      $this->dispatch($view);
   }

   protected function dispatch($view) {
      $data = array(
         'page' => array(
            'title' => 'Documentation | #BigBrotherJS',
            'active' => 'home'
         ),
         'view' => $view
      );

      $this->load->view('layouts/bootstrap', $data);
   }

   protected function getApiView($api) {
      $view = false;
      $path = 'scripts/docs/';

      if (preg_match('/^src_/', $api)) {
         $api = preg_replace('/^src_/', 'src/', $api);
      }

      if (file_exists(FCPATH . "application/views/{$path}{$api}.php")) {
         $view = $this->load->view($path . $api, array(), true);
      }

      return $view;
   }
}
