# include <stdio.h>
# include <emscripten.h>

EMSCRIPTEN_KEEPALIVE
int main(void) {
    return 0;
}

EMSCRIPTEN_KEEPALIVE
float addition(float numb1, float numb2) {
    return numb1 + numb2;
}

EMSCRIPTEN_KEEPALIVE
float subtraction(float numb1, float numb2) {
    return numb1 - numb2;
}

EMSCRIPTEN_KEEPALIVE
float multiplication(float numb1, float numb2) {
    return numb1 * numb2;
}

EMSCRIPTEN_KEEPALIVE
float division(float numb1, float numb2) {
    return numb1 / numb2;
}