const btCalc = document.querySelector("#bt-fib") || null;
const btClear = document.querySelector("#bt-clear") || null;
const input = document.querySelector("#input-fib") || null;
const divResult = document.querySelector("#fib-sequence") || null;


// SETUP ------------------------------------------------------------------------------

let wasmLoaded = false;
let calcFib = null;
Module.onRuntimeInitialized = () => {
    wasmLoaded = true;
    calcFib = Module.cwrap("calc_fib_sequence", "number", ["number", "number"]);
    console.log("WASM loaded ...");
}


// FUNCTIONS --------------------------------------------------------------------------

function toNumb(str = "") {
    if (str.length > 0) {
        return Number.parseInt(str);
    }
    return null;
}

function resetInput() {
    input.value = "";
}

function writeToMem(size = 0) {
    if (size > 0 && typeof size == "number") {
        const length = size, offset = 1;
        const uint8Arr = new Uint8Array(length);

        const ptr = Module._malloc(length * offset);
        Module.HEAPU8.set(uint8Arr, ptr);
        return ptr;
    }
}

function readFromMem(ptr=null, length=0) {
    const resultArr = [];
    if (ptr && length > 0) {
        const uint8Arr = new Uint8Array(Module.HEAPU8.buffer, ptr, length);
        uint8Arr.map(value => resultArr.push(value));
    }
    return resultArr;
}

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

            const ptr = writeToMem(limit);

            calcFib(limit, ptr);

            const resArr = readFromMem(ptr, limit);
            displayResult(resArr);
            
            Module._free(ptr);
            resetInput();
        }
    });

    btClear.addEventListener("click", ev => {
        resetInput();
        displayResult();
    });
}


