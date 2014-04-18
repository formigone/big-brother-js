<?php
namespace Th;

class App {
   /** @var array */
   public $title;

   /** @var string */
   public $active;

   /** @var string */
   public $view;

   /** @var string */
   public $data;

   /** @var string */
   public $layout;

   /**
    * @param string $title
    * @param string $view
    * @param string (optional) $active
    */
   public function __construct($title, $view, $active = null) {
      $this->title = $title;
      $this->view = $this->layout = realpath(__DIR__). '/views/'. $view. '.phtml';;
      $this->data = array();
      $this->layout = null;
      $this->active = $active;
   }

   /**
    * @param string $key
    * @param string $val
    */
   public function addData($key, $val) {
      $this->data[$key] = $val;
   }

   /**
    * @param string $layout
    */
   public function setLayout($layout){
      $this->layout = realpath(__DIR__). '/layouts/'. $layout. '.phtml';
   }

   /**
    * @param array (optional) $data
    */
   public function render(array $data = array()){
      $this->data = $data;

      if (!empty($this->layout) && is_file($this->layout)) {
         require_once $this->layout;
      }
   }

   /**
    *
    */
   public function renderView(){
      if (!empty($this->layout) && is_file($this->layout)) {
         require_once $this->view;
      }
   }
}
