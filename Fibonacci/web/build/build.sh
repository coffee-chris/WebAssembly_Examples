#!/bin/bash
# for debugging use additional source-map:
# -g4 --source-map-base http://127.0.0.1:5500/Fibonacci/web/build/

emcc ../../src/main.c \
-o fib.js \
-s WASM=1 \
-s EXPORTED_FUNCTIONS='["_calc_fib_sequence", "_malloc", "_free"]' \
-s EXTRA_EXPORTED_RUNTIME_METHODS='["cwrap"]'
