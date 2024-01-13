#include <stdio.h>
#include <time.h>

int main() {
    // Get the current date
    time_t t = time(NULL);
    struct tm *currentTime = localtime(&t);
    char currentDate[11];
    strftime(currentDate, sizeof(currentDate), "%d/%m/%Y", currentTime);
    printf("C says, Hello ASL!\n");
    printf("%s\n", currentDate);
    return 0;
}