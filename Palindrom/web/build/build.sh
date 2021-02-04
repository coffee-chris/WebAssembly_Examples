#!/bin/bash
emcc \
../../src/palindrom.c \
-o palindrom.js \
-s WASM=1 \
-s EXPORTED_FUNCTIONS='["_isPalindrom", "_malloc", "_free"]' \
-s EXTRA_EXPORTED_RUNTIME_METHODS='["cwrap", "getValue", "setValue"]'