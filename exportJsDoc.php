<?php
/**
 * 1. Replace '\.html$' with '\.php' from end of file names in <out/> and <out/src/>
 * 2. Replace '\.' with '_' from file names.
 *    2.1 If file name starts with 'src_', replace 'src_' with 'src/' so it saves in right directory
 * 3. For each file:
 *    3.1. Extract everything between <body>(.*?)</body>
 *    3.2. Replace 'class="(.*?)-fluid"' with 'class="{$1}"'
 *    3.3. Replace 'class="span(\d?)"' with 'class="col-md-{$1}"'
 *    3.4. Replace links
 *    3.5. Replace image refs
 *    3.6. Prepend string '<div><p><hr/><br/></p></div>'
 *    3.7. Put file contents in /promo-site/application/views/scripts/docs/{filename}
 */

$filename = 'BB.Frame.html';
$in = file_get_contents('out/symbols/'.$filename);

function getNewFilename($filename) {
   $filename = preg_replace('/\.htm.$/', '', $filename);
   $filename = str_replace('.', '_', $filename);

   return $filename.'.php';
}

function transform($in) {
   $const = '<div><p><hr/><br/></p></div>';
   $out = '';
   $patterns = array(
      array('pattern' => '/<body[^>]*>(.*?)<\/body/s', 'errMsg' => 'Could not parse out file')
   );

   foreach ($patterns as $pt) {
      preg_match($pt['pattern'], $in, $out);

      if (count($out) !== 2) {
         throw new Exception($pt['errMsg']);
      }

      $out = $out[1];
   }

   $out = preg_replace('/\-fluid"/', '"', $out);
   $out = preg_replace('/<!\-\-.*?\-\->/', '', $out);
   $out = preg_replace('/<header class="header navbar navbar-fixed-top">.*?<\/header>/s', '', $out);
   $out = preg_replace('/span(\d+)/', 'col-md-$1', $out);
   $out = preg_replace('/\n/', "", $out);

   $out = $const. $out .'</div></div>';

   return $out;
}

function save($filename, $data, $path) {
   return file_put_contents($path.$filename, $data);
}

$out = array(
   'name' => getNewFilename($filename),
   'data' => transform($in)
);

echo $out['data'], "\n\n- - - - - - - \n\n";
echo "[{$out['name']}] \n\n- - - - - - - \n\n";
echo "[$filename] \n\n";

echo save($out['name'], $out['data'], 'promo-site/application/views/scripts/docs/');
