#!/bin/bash
emcc src/main.c \
-o index.html \
-s EXIT_RUNTIME=1 \