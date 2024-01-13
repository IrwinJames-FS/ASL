package main

import (
	"fmt"
	"time"
)

func main() {
	currentTime := time.Now()
	formattedTime := currentTime.Format("02/01/2006")
	fmt.Println("Go says, Hello ASL!")
	fmt.Println(formattedTime)
}
