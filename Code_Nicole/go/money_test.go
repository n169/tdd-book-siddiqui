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
	fiver := Money{amount: 5, "USD"}
	tenner := fiver.Times(2)
	if tenner.amount != 10 {
		t.Errorf("Expected 10, got [%d]", tenner.amount)
	}
}

func TestMultiplicationInEuros(t *testing.T){
    tenEuros := Money{amount: 10, currency: "EUR"}
    twentyEuros := tenEuros.times(2)
    if twentyEuros.amount != 20 {
        t.Errorf("Expected 20, got [%d]", twentyEuros.amount)
    }
    if twentyEuros.currency != "EUR" {
        t.Errorf("Expected EUR, got [%s]", twentyEuros.currency)
    }
}

type Money struct{
    amount int
    currency string
}

type Dollar struct{
	amount int
}

func (m Money) Times(multiplier int) Money{
	return Money{amount: m.amount * multiplier, currency: m.currency}
}
