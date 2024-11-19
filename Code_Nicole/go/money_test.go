/*
Saleem Siddiqui: Learning Test-Driven Development, O'Reilly, 2021

Go version 1.17
*/


// done 5 USD x 2 = 10 USD
// done 10 EUR x 2 = 20 EUR
// todo 4002 KRW / 4 = 1000.5 KRW
// todo 5 USD + 10 EUR = 17 USE (if exchanging 1 EUR gets us 1.2 USD)
// todo 1 USD + 1100 KRW = 2200 KRW (if exchanging 1 USD gets us 1100 KRW)
// todo Remove redundant Money multiplication tests


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
        t.Errorf("Expected 20, got [%+v]", twentyEuros.amount)
    }
    if twentyEuros.currency != "EUR" {
        t.Errorf("Expected EUR, got [%s]", twentyEuros.currency)
    }
}

func TestDivision(t *testing.T){
    originalMoney := Money{amount: 4002, currency: "KRW"}
    actualMoneyAfterDivisioin := originalMoney.divide(4)
    expectedMoneyAfterDivision = Money{amount: 1000.5, currency: "KRW"}
    if expectedMoneyAfterDivision != actualMoneyAfterDivisioin {
        t.Errorf("Expected [%+v], got [%+v]", expectedMoneyAfterDivision, actualMoneyAfterDivisioin)
    }
}

type Money struct{
    amount float64
    currency string
}

type Dollar struct{
	amount int
}

func (m Money) Times(multiplier int) Money{
	return Money{amount: m.amount * float64(multiplier), currency: m.currency}
}

func (m Money) Divide(divisor int) Money{
	return Money{amount: m.amount / float64(divisor), currency: m.currency}
}