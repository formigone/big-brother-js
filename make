#!/bin/bash

echo "Combining source files"
echo ""

mkdir tmp
echo "goog.provide('BB.go');" > tmp/lib.js

cat src/BB/*.js | grep goog.provide >> tmp/lib.js
cat src/BB/*.js | grep -v 'goog.provide\|goog.require' >> tmp/lib.js
#cat exports >> tmp/lib.js

echo "----------------------------------------------------------"
echo "Compiling JavaScript project using Google Closure compiler"
echo "*By default, script uses WHITESPACE_ONLY."
echo " To change compilation level, enter it as param into script."
echo "----------------------------------------------------------"
echo ""

./lib/closure/bin/build/closurebuilder.py \
     --root=/usr/local/google-closure/closure-library/ \
     --root=./tmp \
     --namespace=BB.go \
     --output_mode=compiled \
     --compiler_jar=/usr/local/google-closure/compiler.jar \
     --compiler_flags="--compilation_level=SIMPLE_OPTIMIZATIONS" \
     --compiler_flags="--create_source_map=bb.js.map" \
     --compiler_flags="--warning_level=VERBOSE" \
     --compiler_flags="--language_in=ECMASCRIPT5" \
 > bb.min.js

echo ""

./lib/closure/bin/build/closurebuilder.py \
 --root=/usr/local/google-closure/closure-library/ \
 --root=./tmp \
 --namespace=BB.go \
 --output_mode="compiled" \
 --compiler_jar=/usr/local/google-closure/compiler.jar \
 --compiler_flags="--compilation_level=WHITESPACE_ONLY" \
 --compiler_flags="--create_source_map=bb.js.map" \
 --compiler_flags="--warning_level=VERBOSE" \
 --compiler_flags="--language_in=ECMASCRIPT5" \
 --compiler_flags="--formatting=PRETTY_PRINT" \
 > bb.js

echo "//# sourceMappingURL=bb.js.map" >> bb.min.js

rm -fr tmp

echo ""
echo "Generating documentation"
echo "..."
echo ""
jsdoc -d=out -t=/home/rsilveira/design/jsdoc-tmpl/JSDoc-Bootstrap-Theme/ src/BB/*.js
