const btCalc = document.querySelector("#bt-fib") || null;
const btClear = document.querySelector("#bt-clear") || null;
const input = document.querySelector("#input-fib") || null;
const divResult = document.querySelector("#fib-sequence") || null;


// SETUP ------------------------------------------------------------------------------

/**
 * If true, WebAssembly is successfully loaded
 */
let wasmLoaded = false;

/**
 * Contains the C-Function: calc_fib_sequence()
 * @param {number} limit
 * @param {number} ptr, to save the sequence in
 */
let calcFib = null;

Module.onRuntimeInitialized = () => {
    wasmLoaded = true;
    calcFib = Module.cwrap("calc_fib_sequence", "number", ["number", "number"]);
    console.log("WASM loaded ...");
}


// FUNCTIONS --------------------------------------------------------------------------

/**
 * Casting given string into decimal number.
 * @param {string} str 
 * @returns casted str or null
 */
function toNumb(str = "") {
    if (str.length > 0) {
        return Number.parseInt(str);
    }
    return null;
}

/**
 * Resets the input field from HTML
 */
function resetInput() {
    input.value = "";
}

/**
 * Writes an empty array of a given size into the
 * WebAssembly memory in uint8 format.
 * @param {number} size 
 * @returns {number} ptr, which points to the array address
 */
function writeToMem(size = 0) {
    if (size > 0 && typeof size == "number") {
        const length = size, offset = 1;
        const uint8Arr = new Uint8Array(length);

        const ptr = Module._malloc(length * offset);
        Module.HEAPU8.set(uint8Arr, ptr);
        return ptr;
    }
}

/**
 * Reads an array from the WebAssembly memory, using
 * the given pointer and length.
 * @param {*} ptr, to the array address 
 * @param {*} length, of the array to restrict memory 
 * access to the arrays length
 * @returns {Array} array
 */
function readFromMem(ptr=null, length=0) {
    const resultArr = [];
    if (ptr && length > 0) {
        const uint8Arr = new Uint8Array(Module.HEAPU8.buffer, ptr, length);
        uint8Arr.map(value => resultArr.push(value));
    }
    return resultArr;
}

/**
 * Writes the given array into a HTML div element.
 * @param {Array} resArr 
 */
function displayResult(resArr=[]) {
    divResult.innerText = resArr.toString();
}

// EVENT-LISTENER ---------------------------------------------------------------------

if (btCalc == null || input == null || btClear == null || divResult == null) {
    console.error("Error occured: \nCould not fetch button and input field from DOM");
} else {

    btCalc.addEventListener("click", ev => {

        if (!wasmLoaded || calcFib == null) {
            console.warn("Can't run calculation - WebAssembly not loaded");
            return;
        }

        if (calcFib) {
            const limitStr = input.value;
            const limit = toNumb(limitStr);

            // Write empty array into memory, for the C-Code to access
            // and create pointer to reference it
            const ptr = writeToMem(limit);

            // Call function from C-Code
            calcFib(limit, ptr);

            // Retrieve values from memory
            const resArr = readFromMem(ptr, limit);

            displayResult(resArr);
            
            // Important to free the reserved address space form memory
            Module._free(ptr);
            resetInput();
        }
    });

    btClear.addEventListener("click", ev => {
        resetInput();
        displayResult();
    });
}


