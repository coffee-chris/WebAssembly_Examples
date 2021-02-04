#!/usr/bin/env bash
# enable debugging with following option:
# -g4 --source-map-base http://localhost:5500/location/of/source-map

emcc \
../../src/main.c \
-o file.js \
-s WASM=1 \
-s EXPORTED_FUNCTIONS='["_main", "_append_to_file", "_malloc", "_free"]' \
-s EXTRA_EXPORTED_RUNTIME_METHODS='["cwrap", "getValue", "setValue"]' \
-s FORCE_FILESYSTEM=1 \
-s ALLOW_MEMORY_GROWTH=1
