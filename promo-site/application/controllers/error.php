<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Error extends CI_Controller {

   public function __construct(){
      parent::__construct();
   }

   /**
    *
    */
   public function index() {
      $this->load->view('home');
   }

   public function e_500(){
      exit("error 500!");
   }
}
