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

//$filename = 'BB.Frame.html';
//$dir = 'symbols/';

//$filename = 'index.html';
//$dir = '';

//$filename = 'src_BB_Session.js.html';
//$dir = 'symbols/src/';


function getNewFilename($filename) {
   $filename = preg_replace('/\.htm.?$/', '', $filename);
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
   $out = preg_replace('/<footer class="footer">.*?<\/footer>/s', '', $out);
   $out = preg_replace('/<header class="header navbar navbar-fixed-top">.*?<\/header>/s', '', $out);
   $out = preg_replace('/span(\d+)/', 'col-md-$1', $out);
   $out = preg_replace('/href="..\/..\//', 'href="', $out);
   $out = preg_replace('/href="..\//', 'href="', $out);

   $out = preg_replace_callback('/href="symbols\/(.*?).html"/', function($matches) {
//         var_dump($matches);
         $str = $matches[1];
         $str = str_replace('.html', '', $str);
         $str = 'href="/docs/api/'.str_replace('.', '_', $str).'"';

         return $str;
      }, $out);

   $out = preg_replace('/src\/src/', 'src', $out);
   $out = preg_replace('/\n/', "", $out);

   $out = $const. $out .'</div></div>';

   return $out;
}

function save($filename, $data, $path) {
   $fh = fopen($path.$filename, 'w');
   if ($fh) {
      fwrite($fh, $data);
      fclose($fh);
      echo "  saved {$path}{$filename}\n";
   }
//   return file_put_contents($path.$filename, $data);
}


function extractDir(array $files, $dir) {
   foreach ($files as $f) {
      if (preg_match('/\.html$/', $f)) {
         echo "processing {$dir}{$f}\n";
         $in = file_get_contents('out/'.$dir.$f);


         $out = array(
            'name' => getNewFilename($f),
            'data' => transform($in)
         );

         $src = '';

         if (preg_match('/\/src\/$/', $dir)) {
            $src = 'src/';
            $out['name'] = str_replace('src_', '', $out['name']);
         }

         save($out['name'], $out['data'], 'promo-site/application/views/scripts/docs/'.$src);
      }

//   echo $out['data'], "\n\n- - - - - - - \n\n";
//   echo "[{$out['name']}] \n\n- - - - - - - \n\n";
//   echo "[$filename] \n\n";

   }
}

extractDir(scandir('./out'), '');
extractDir(scandir('./out/symbols'), 'symbols/');
extractDir(scandir('./out/symbols/src'), 'symbols/src/');