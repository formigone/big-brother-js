<?php

$data = array(
   'response' => 'only post please'
);

if (!empty($_POST)) {
   $session = $_POST['recording'];
   $raw = json_decode($session, true);

   $title = strtolower($raw['title']);
   $title = str_replace(' ', '_', $title);
   $filename = $title.'_'.date('Y-m-d_h-i-s', time()).'.bb';

   $data['response'] = (bool)file_put_contents('./recordings/'.$filename, $session);
}

echo json_encode($data);
