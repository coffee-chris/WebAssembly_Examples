#include <stdio.h>
#include <stdint.h>

void calc_fib_sequence(int limit, uint8_t *res_ptr) ;
void test(); 

int main (int argc, char **argv)
{
    test();
}

/**
 * calc_fib_sequence
 * ------------------
 * Calculates all values of the fibonacci sequence
 * up to the given parameter.
 * @param {int} numb - upper limit of the sequence
 * @param {int*} res_ptr - result array, containing
 * all sequence values
 */ 
void calc_fib_sequence(int limit, uint8_t *res_ptr) 
{   
    int pre = 0;
    int suc = 1;
    int value = 0;

    for (int i = 1; i <= limit; i++) {
        res_ptr[i-1] = pre;

        printf("%d", pre);
        if (i != limit)
            printf(", ");

        value = pre + suc;
        pre = suc;
        suc = value;
    }
}

/**
 * test
 * ----- 
 * Function for testing behavior of calc_fib_sequence
 */
void test() 
{
    int fib = 10;
    uint8_t arr[fib];
    calc_fib_sequence(fib, arr);

    printf("\nFirst value: %d", arr[0]);
    printf("\nLast value: %d", arr[fib-1]);
}