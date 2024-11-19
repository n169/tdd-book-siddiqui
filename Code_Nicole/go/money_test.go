/*
Saleem Siddiqui: Learning Test-Driven Development, O'Reilly, 2021

Go version 1.17
*/


// done 5 USD x 2 = 10 USD
// todo 10 EUR x 2 = 20 EUR
// todo 4002 KRW / 4 = 1000.5 KRW
// todo 5 USD + 10 EUR = 17 USE (if exchanging 1 EUR gets us 1.2 USD)
// todo 1 USD + 1100 KRW = 2200 KRW (if exchanging 1 USD gets us 1100 KRW)


package main

import (
	"testing"
)


func TestMultiplication(t *testing.T){
	fiver := Dollar{amount: 5}
	tenner := fiver.Times(2)
	if tenner.amount != 10 {
		t.ErrorF("Expected 10, got [%d]", tenner.amount)
	}
}

type Dollar struct{
	amount int
}

func (d Dollar) Times(multiplier int) Dollar{
	return Dollar{amount: d.amount * multiplier}
}