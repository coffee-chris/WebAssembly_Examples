# WebAssembly_Examples
Basic example programs on how you can use WebAssembly inside the Browser

## Requirements
This project uses the Emscripten compiler toolchain.
If you are interested in how to use and install the compiler, visit 
[emscripten.org](https://emscripten.org/docs/getting_started/downloads.html) for more detailed information.

Besides Emscripten, the project contains shell scripts in order to execute the build processes.

## Installation
Download or clone the repository. 

The respository consists of 5 seperate projects, which each can be build seperatly by executing the build.sh script:
```bash
./build.sh
```

Before you can execute the script, you first must add Emscripten to your PATH, if you haven't done so already:
```bash
cd emsdk
source emsdk_env.sh
```

After the build process finished, you can host the html file from a local http server, in order to start the application.

## Description
As already mentioned, the repository consists of 5 seperate projects. The following chapters give a quick overview on what to expect from the project and what it's main features are.

### HelloWorld
This is just a basic hello world application. It uses Emscripten to auto generate Javascript as well as HTML. The C code the app uses simple prints a hello world to the console.

### Calculator
The calculator project demonstrates how you can call functions written in C out of Javascript, using [ccall](https://emscripten.org/docs/api_reference/preamble.js.html?highlight=ccall#ccall). It also uses the [emscripten.h library](https://emscripten.org/docs/api_reference/emscripten.h.html?highlight=emscripten_keepalive#compiling), to keep functions alive during compilation.

### Fibonacci
The Fibonacci project shows, how you can deal with arrays in WebAssembly using Emscripten. Also again calling C functions, this time with [cwrap](https://emscripten.org/docs/api_reference/preamble.js.html?highlight=cwrap#cwrap).

### Palindrom
In Palindrom, strings must be passed directly to the [WebAssembly memory](https://emscripten.org/docs/porting/connecting_cpp_and_javascript/Interacting-with-code.html?highlight=memory#access-memory-from-javascript) in order to access them in C. Therefore malloc, free, pointers and other features are used in this project.

### TextfileEditor
With the TextfileEditor you can see how you can use the Emscripten [Filesystem API](https://emscripten.org/docs/api_reference/Filesystem-API.html) to load files into memory and working with them in WebAssembly.