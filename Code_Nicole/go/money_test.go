/*
Saleem Siddiqui: Learning Test-Driven Development, O'Reilly, 2021

Go version 1.17
*/


// done 5 USD x 2 = 10 USD
// done 10 EUR x 2 = 20 EUR
// done 4002 KRW / 4 = 1000.5 KRW
// todo 5 USD + 10 EUR = 17 USE (if exchanging 1 EUR gets us 1.2 USD)
// todo 1 USD + 1100 KRW = 2200 KRW (if exchanging 1 USD gets us 1100 KRW)
// todo Remove redundant Money multiplication tests


package main

import (
	"testing"
)

func assertEqual(t *testing.T, expected Money, actual Money){
    if expected != actual {
        t.Errorf("Expected %+v, Got %+v", expected, actual)
    }
}

func TestMultiplication(t *testing.T){
	fiveDollars := Money{amount: 5, "USD"}
	tenDollars := Money{amount: 10, "USD"}
	assertEqual(t, tenDollars, fiveDollars.times(2)
}

func TestMultiplicationInEuros(t *testing.T){
    tenEuros := Money{amount: 10, currency: "EUR"}
    twentyEuros := Money{amount: 20, currency: "EUR"}
    assertEqual(t, twentyEuros, tenEuros.times(2)
}

func TestDivision(t *testing.T){
    originalMoney := Money{amount: 4002, currency: "KRW"}
    actualResult := originalMoney.divide(4)
    expectedResult := Money{amount: 1000.5, currency: "KRW"}
    assertEqual(t, expectedResult, actualResult)
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