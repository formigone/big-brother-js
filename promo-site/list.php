<?php

$dir = scandir('./assets/recordings');
$data = array();

foreach ($dir as $filename) {
   if (preg_match('/\.bb$/', $filename)) {
      array_push($data, $filename);
   }
}

echo json_encode($data);
