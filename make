#!/bin/bash

echo "----------------------------------------------------------"
echo "Compiling JavaScript project using Google Closure compiler"
echo "*By default, script uses WHITESPACE_ONLY."
echo " To change compilation level, enter it as param into script."
echo "----------------------------------------------------------"
echo ""

if [ $# -eq 0 ]
then
    ./lib/closure/bin/build/closurebuilder.py \
     --root=/usr/local/google-closure/closure-library/ \
     --root=./ \
     --namespace=app.go \
     --output_mode=compiled \
     --compiler_jar=/usr/local/google-closure/compiler.jar \
     --compiler_flags="--compilation_level=WHITESPACE_ONLY" \
     --compiler_flags="--create_source_map=app.comp.js.map" \
     --compiler_flags="--warning_level=VERBOSE" \
     --compiler_flags="--language_in=ECMASCRIPT5" \
     > app.comp.js
else
    ./lib/closure/bin/build/closurebuilder.py \
     --root=/usr/local/google-closure/closure-library/ \
     --root=./ \
     --namespace=app.go \
     --output_mode=compiled \
     --compiler_jar=/usr/local/google-closure/compiler.jar \
     --compiler_flags="--compilation_level=$1" \
     --compiler_flags="--create_source_map=app.comp.js.map" \
     --compiler_flags="--warning_level=VERBOSE" \
     --compiler_flags="--language_in=ECMASCRIPT5" \
     > app.comp.js
fi


echo "//# sourceMappingURL=app.comp.js.map" >> app.comp.js
