const input = document.querySelector("#in_file");
const contentHtml = document.querySelector(".file-content");
const btSave = document.querySelector(".bt-save");
const btClear = document.querySelector(".bt-clear");


// SETUP ------------------------------------------------------------------------------

/**
 * Function to append given content to a file, by calling the C-function append_to_file
 * @param {number} ptrFileName
 * @param {number} ptrContent
 */
let appendToFile = null;

let fileContent = "";
let wasmLoaded = false;
Module.onRuntimeInitialized = () => {
    wasmLoaded = true;
    appendToFile = Module.cwrap("append_to_file", "number", ["number", "number"])
    console.log("WASM ready ...");
}


// FUNCTIONS --------------------------------------------------------------------------

/**
 * Allocates memory, creates a new pointer and writes the content 
 * into the memory.
 * @param {string} content 
 */
const setStrToMem = (content) => {
    const length = content.length;
    const uint8Str = new Uint8Array(intArrayFromString(content));
    const ptr = Module._malloc(length * uint8Str.BYTES_PER_ELEMENT);
    Module.HEAPU8.set(uint8Str, ptr);
    return ptr;
}

/**
 * Creates a new file in the virtual wasm file system, 
 * using the emcc file system api.
 * @param {string} fileName 
 * @param {string} content 
 */
const FS_createFile = (fileName, content) => {
    // create file with read and write permissions ...
    try {
        FS.createDataFile("/", fileName, content, true, true);
    } catch (ex) {
        console.warn("Error occured, possible, that file already exists ...")
    }
    
}

/**
 * Deletes a file from the virtual file system.
 * @param {string} fileName 
 */
const FS_deleteFile = (fileName) => {
    FS.deleteFile("/" + fileName);
}

/**
 * Reads the content stored in the file, refered to by fileName,
 * and creates a new blob with url.
 * @param {string} fileName 
 */
const FS_getContent = (fileName) => {
    const content = FS.readFile(fileName, { encoding: "utf8" });

    const url = URL.createObjectURL(
        new Blob(
            [content],
            { type: " text/plain;charset=utf-8" }
        )
    );
    return url;
}

/**
 * Enables user to download the file located at url
 * to the computer.
 * @param {string} url 
 */
const download = (url) => {
    var element = document.createElement('a');
    element.setAttribute('href', url);
    element.setAttribute('download', "WASM_EDITED");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    window.URL.revokeObjectURL(url);
}

const resetInput = () => {
    input.value = null;
    contentHtml.setAttribute("contenteditable", "false");
}


// EVENT-LISTENER ---------------------------------------------------------------------

if (input == null || btSave == null || btClear == null) {
    console.error("Could not access DOM elements.\n  »Code execution stopped.")
} else {
    input.onchange = ev => {
        const file = input.files[0];
        fileName = file.name;
    
        const fileReader = new FileReader();
        fileReader.readAsText(file);
    
        fileReader.onload = () => {
            if (!wasmLoaded) {
                return;
            }
            const fileContent = fileReader.result;
            contentHtml.innerText = fileContent;
    
            FS_createFile(fileName, fileContent);
    
            // Enable to make own changes to the document ...
            contentHtml.setAttribute("contenteditable", "true");
        }
    }
    
    btSave.addEventListener("click", ev => {
        if (fileName.length > 1) {
            const fileNamePtr = setStrToMem(fileName);
            const editedContent = contentHtml.innerText;
            const contentPtr = setStrToMem(editedContent);
    
            appendToFile(fileNamePtr, contentPtr);
            const url = FS_getContent(fileName);
            download(url);
    
            Module._free(fileNamePtr);
            Module._free(contentPtr);
            // FS_deleteFile(fileName); => not supported
    
            fileName = "";
            contentHtml.innerHTML = "...";
            resetInput();
        } else {
            alert("You have to select a file first ...");
        }
    });
    
    btClear.addEventListener("click", ev => {
        if (fileName.length > 1) {
            // FS_deleteFile(fileName);
    
            fileName = "";
            contentHtml.innerHTML = "...";
            resetInput();
        } else {
            alert("You have to select a file first ...");
        }
    });
}