#include <stdio.h>
#include "palindrom.h"

void readInput(char *str_ptr);

int main(void)
{
    char palindrom_str[256];
    char *palindrom_ptr = palindrom_str;

    readInput(palindrom_str);

    //printf("%s", palindrom_str);

    int length = lengthOfString(palindrom_ptr);
    int result = isPalindrom(palindrom_ptr, length);
    if (result == 0) {
        printf("Der String war kein Palindrom.");
    } else {
        printf("Der String war ein Palindrom.");
    }
}


/*
 * readInput
 * ---------
 * Reads all input arguments from the user and writes them into pointer.
 */
void readInput(char palindrom_str[])
{
    printf("Bitte gebe einen String ein: ");
    scanf(" %s", &palindrom_str[0]);
}