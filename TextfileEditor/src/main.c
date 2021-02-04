#include <stdio.h>

int test();
int append_to_file(char *file_name, char *content);

int main(int argc, char **argv)
{
    int result = test();
    return result;
}

/**
 * append_to_file
 * ---------------
 * Function appends the given content to the specified file.
 * @param file_name
 * @param content
 * @return 0 if successful, output > 0 otherwise
 */
int append_to_file(char *file_name, char *content)
{
    FILE *file = fopen(file_name, "w");

    if (file == NULL) {
        fprintf(stderr, "File could not be opened ...");
        return 1;
    }

    //fprintf(file, "%s", content);
    fputs(content, file);
    fputs("\n", file); // make a new line

    fclose(file);
    return 0;
}

/**
 * test
 * ----
 * Function testing the append_to_file function by providing a file, filename
 * and content.
 * @return
 */
int test()
{
    int result;
    char *name = "test.txt";
    char *content = "Hello World!\0";

    result = append_to_file(name, content);
    printf("%s", content);
    return result;
}