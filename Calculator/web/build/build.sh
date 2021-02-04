#!/bin/bash
emcc ../../src/calculator.c \
-o calculator.js \
-s NO_EXIT_RUNTIME=1 \
-s EXTRA_EXPORTED_RUNTIME_METHODS='["ccall"]'