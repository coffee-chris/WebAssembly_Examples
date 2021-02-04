#include <stdio.h>
#include <stdlib.h>

int isPalindrom(char *str_ptr, int str_length)
{
    int index1 = 0;
    int index2 = str_length - 1;
    while (index1 < str_length / 2) {
        if (str_ptr[index1] != str_ptr[index2])
            return 0;
        else {
            index1++;
            index2--;
        }
    }
    return 1;
}

int lengthOfString(char *str_ptr) {
    int i = 0;
    while (str_ptr[i] != '\0') {
        i++;
    }
    return i;
}