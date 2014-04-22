<?php if (!defined('BASEPATH')) {
   exit('No direct script access allowed');
}

class Home extends CI_Controller {

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
   public function demo() {
      $data = array(
         'page' => array(
            'title' => 'Live Demo | #BigBrotherJS',
            'active' => 'demo'
         ),
         'view' => $this->load->view('scripts/home/demo', array(), true)
      );

      $this->load->view('layouts/bootstrap', $data);
   }

//   /**
//    *
//    */
//   public function docs() {
//      $this->load->library('uri');
//      $api = $this->uri->segment(1, 'test');
//      var_dump($api);exit;
//      $data = array(
//         'page' => array(
//            'title' => 'Documentation | #BigBrotherJS',
//            'active' => 'home'
//         ),
//         'view' => $this->load->view('scripts/home/docs', array(), true)
//      );
//
//      $this->load->view('layouts/bootstrap', $data);
//   }

   /**
    *
    */
   public function community() {
      $data = array(
         'page' => array(
            'title' => 'Community | #BigBrotherJS',
            'active' => 'home'
         ),
         'view' => $this->load->view('scripts/home/community', array(), true)
      );

      $this->load->view('layouts/bootstrap', $data);
   }

   /**
    *
    */
   public function getStarted() {
      $data = array(
         'page' => array(
            'title' => 'Get Started | #BigBrotherJS',
            'active' => 'started'
         ),
         'view' => $this->load->view('scripts/home/started', array(), true)
      );

      $this->load->view('layouts/bootstrap', $data);
   }
}
