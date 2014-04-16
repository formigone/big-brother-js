<?php

$data = array(
   'response' => 'only post please'
);

if (isset($_POST)) {
   $session = $_POST['session'];
   $data['response'] = json_encode($session);
}

echo json_encode($data);
