const buttonAdd = document.getElementById("bt_add");
const buttonSub = document.getElementById("bt_sub");
const buttonMulti = document.getElementById("bt_multi");
const buttonDivison = document.getElementById("bt_div");
const buttonClear = document.getElementById("clear");


// SETUP ------------------------------------------------------------------------------

/**
 * If true, WebAssembly is successfully loaded
 */
let wasmLoaded = false;
Module.onRuntimeInitialized = () => {
    wasmLoaded = true;
    console.log("WASM loaded ...");
}


// FUNCTIONS --------------------------------------------------------------------------

/**
 * Writes the result of the calculation inside a span element of HTML
 * @param {number} result 
 */
function displayResult(result) {
    document.getElementById("result").innerHTML = `<b>${result}</b>`;
}

/**
 * Retrieves the values from both input fields, cast the into numbers
 * and return them as an array.
 * @returns array of length 2
 */
function getInput() {
    let x = document.getElementById("numb1").value;
    let y = document.getElementById("numb2").value;

    if (x == "")
        x = 0;
    if (y == "")
        y = 0;

    return [Number.parseInt(x), Number.parseInt(y)];
}

/**
 * Calculates the result of two values using the given method.
 * Function calls the respective C-Code by using ccall.
 * @param {string} method 
 * @param {Array} numArr 
 * @returns calculations result
 */
function calc(method, numArr) {
    const result = Module.ccall(
        method,
        'number',
        ['number', 'number'],
        [numArr[0], numArr[1]]
    );
    return result;
}

/**
 * Function for managing the process of retrieving values, 
 * apply calculation method and display the result.
 * Can only be executed, if WebAssembly has loaded.
 * @param {string} calcMethod 
 */
function eventHandler(calcMethod) {
    if (wasmLoaded) {
        const numArr = getInput();
        const result = calc(calcMethod, numArr);
        displayResult(result);
    } else {
        console.warn(`Can not execute function ${calcMethod}, because WebAssembly is not loaded`);
    }
}


// EVENT-LISTENER ---------------------------------------------------------------------

buttonAdd.addEventListener('click', () => {
    eventHandler('addition');
});

buttonSub.addEventListener('click', () => {
    eventHandler('subtraction');
});

buttonMulti.addEventListener('click', () => {
    eventHandler('multiplication');
});

buttonDivison.addEventListener('click', () => {
    eventHandler('division');
});

buttonClear.addEventListener('click', () => {
    document.getElementById("numb1").value = null;
    document.getElementById("numb2").value = null;
    document.getElementById("result").innerHTML = "";
});