const btSubmit = document.getElementById("submit");
const resultBox = document.querySelector(".result-container");
const inputBox = document.getElementsByTagName("input")[0];
const resultSpan = document.getElementsByClassName("result")[0];


// SETUP ------------------------------------------------------------------------------

/**
 * Variable for saving c-function reference.
 * @param value = ptr to the string in memory
 * @param len = length of the string to check
 * @returns true if palindrom, false otherwise
 */
let isPalindrom = null;
let wasmReady = false;

Module.onRuntimeInitialized = () => {
    wasmReady = true;
    isPalindrom = Module.cwrap("isPalindrom", "number", ["number", "number"]);
    console.log("WASM loaded ...");
}


// FUNCTIONS --------------------------------------------------------------------------

/**
 * Interpretes and writes the result to HTML
 * @param {number} res 
 */
function displayResult(res) {
    resultBox.style = "display: block";
    let text = (res == 1 ? "is" : "is not");
    resultSpan.innerText = text;
}

/**
 * Writes a string into the WebAssembly memory, using
 * the Int8 typed array (Int8Array)
 * @param {string} str to store
 * @returns pointer to the memory address of the string
 */
function writeToMem(str = "") {
    let ptr = 0;
    if (str.length > 0) {
        const len = str.length;

        // convert string into memory suitable format
        // intArrayFromString is utility function by emscripten
        const convertedStr = new Int8Array(intArrayFromString(str));
        ptr = Module._malloc(len * convertedStr.BYTES_PER_ELEMENT);

        // write to memory
        Module.HEAP8.set(convertedStr, ptr);
    }
    return ptr;
}

/**
 * Reads from the WebAssembly memory within the specified parameters.
 * @param {number} ptr 
 * @param {number} len 
 * @returns the string stored in the memory
 */
function readFromMem(ptr, len) {
    const typedArr = new Int8Array(Module.HEAP8.buffer, ptr, len);
    const castedStr = intArrayToString(typedArr);
    return castedStr;
}


// EVENT-LISTENER ---------------------------------------------------------------------

btSubmit.addEventListener("click", ev => {
    if (wasmReady && isPalindrom != null) {

        // retrieve input value
        const str = inputBox.value;
        const ptr = writeToMem(str);

        const result = isPalindrom(ptr, str.length);

        Module._free(ptr);

        displayResult(result);
    }

    inputBox.value = "";
});