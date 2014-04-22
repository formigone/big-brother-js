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


$ROOT_PATH = realpath(__DIR__) . '/';

/**
 * @param $filename
 *
 * @return string
 */
function getNewFilename($filename) {
   $filename = preg_replace('/\.htm.?$/', '', $filename);
   $filename = str_replace('.', '_', $filename);

   return $filename . '.php';
}

/**
 * @param $in
 *
 * @return string
 * @throws Exception
 */
function transform($in) {
   $const = '<div><p><br/></p></div>';
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
   $out = preg_replace('/src="..\//', 'src="/assets/', $out);

   $out = preg_replace_callback('/<ul class="nav nav\-list">(.*?)<\/ul>/s', function ($matches) {
         $str = $matches[0];
         $str = str_replace('<li>', '<li class="panel-body">', $str);
         $str = str_replace('<li', '<div', $str);
         $str = str_replace('</li>', '</div>', $str);
         $str = str_replace('<ul', '<div', $str);
         $str = str_replace('</ul>', '</div>', $str);

         return $str;
      }, $out
   );
   $out = preg_replace('/"nav nav\-list"/', '"panel panel-default"', $out);
   $out = preg_replace('/"nav\-header"/', '"panel-heading"', $out);
   $out = preg_replace('/class="well" id="class-list"/', '', $out);

   $out = preg_replace_callback('/href="symbols\/(.*?).html"/', function ($matches) {
//         var_dump($matches);
         $str = $matches[1];
         $str = str_replace('.html', '', $str);
         $str = 'href="/docs/api/' . str_replace('.', '_', $str) . '"';

         return $str;
      }, $out
   );

   $out = preg_replace_callback('/id="source\-code"(.*?)<\/pre>/s', function ($matches) {
         $str = $matches[1];
         $str = str_replace('<', '&lt;', $str);

         return $str;
      }, $out
   );

   $out = preg_replace('/src\/src/', 'src', $out);
//   $out = preg_replace('/\n/', "", $out);

   $out = $const . $out . '</div></div>';

   return $out;
}

/**
 * @param $filename
 * @param $data
 * @param $path
 */
function save($filename, $data, $path) {
   $fh = fopen($path . $filename, 'w');
   if ($fh) {
      fwrite($fh, $data);
      fclose($fh);
      echo "  saved {$path}{$filename}\n";
   }
//   return file_put_contents($path.$filename, $data);
}

/**
 * @param array $files
 * @param $dir
 */
function extractDir(array $files, $dir) {
   foreach ($files as $f) {
      if (preg_match('/\.html$/', $f)) {
         echo "processing {$dir}{$f}\n";
         $in = file_get_contents('out/' . $dir . $f);


         $out = array(
            'name' => getNewFilename($f),
            'data' => transform($in)
         );

         $src = '';

         if (preg_match('/\/src\/$/', $dir)) {
            $src = 'src/';
            $out['name'] = str_replace('src_', '', $out['name']);
         }

         save($out['name'], $out['data'], 'promo-site/application/views/scripts/docs/' . $src);
      }

//   echo $out['data'], "\n\n- - - - - - - \n\n";
//   echo "[{$out['name']}] \n\n- - - - - - - \n\n";
//   echo "[$filename] \n\n";

   }
}

/**
 * @param array $in
 * @param $out
 * @param $path
 *
 * @return int
 */
function compactFiles(array $in, $out, $path) {
   $data = '.panel-default {border-color: #ddd; padding: 0; list-style: none; border: 0; } .panel-body {padding: 5px 0}';
   $data .= 'pre .linenums{margin-left:0 !important}';

   foreach ($in as $_in) {
      $data .= file_get_contents($_in);
   }

   return file_put_contents($path . $out, $data);
}

extractDir(scandir('./out'), '');
extractDir(scandir('./out/symbols'), 'symbols/');
extractDir(scandir('./out/symbols/src'), 'symbols/src/');

compactFiles(array(
      $ROOT_PATH . 'out/css/common.css',
      $ROOT_PATH . 'out/css/prettify.css',
   ),
   'docs-style.css',
   $ROOT_PATH . 'promo-site/assets/css/'
);
