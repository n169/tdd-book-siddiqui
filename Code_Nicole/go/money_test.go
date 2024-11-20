/*
Saleem Siddiqui: Learning Test-Driven Development, O'Reilly, 2021

Go version 1.17
*/


// done 5 USD x 2 = 10 USD
// done 10 EUR x 2 = 20 EUR
// done 4002 KRW / 4 = 1000.5 KRW
// done 5 USD + 10 USD = 15 USD (adding Money's in same currency)
// done Separate test code from production code
// done Make amount and currency accessible only from within Money struct and not from outside
// done Create a public New function to initialize the Money struct
// done Remove redundant tests
// done 5 USD + 10 EUR = 17 USD (if exchanging 1 EUR gets us 1.2 USD)
// done 1 USD + 1100 KRW = 2200 KRW (if exchanging 1 USD gets us 1100 KRW)
// done Determine exchange rate based ont he currencies involved (from -> to)
// done Improve error handling when exchange rates are unspecified
// done Improve the implementation of exchange rates
// todo Allow exchange rates to be modified


package main

import (
	s "tdd/stocks" //give "tdd/stocks" packages the variable name "s"
	"testing"
	"reflect"
)

var bank s.Bank

func init() { //setUp method for tests
    bank = s.NewBank()
    bank.AddExchangeRate("EUR", "USD", 1.2)
    bank.AddExchangeRate("USD", "KRW", 1100)
}

func assertEqual(t *testing.T, expected interface{}, actual interface{}){
    if expected != actual && !reflect.ValueOf(actual).IsNil() {
        t.Errorf("Expected %+v, Got %+v", expected, actual)
    }
}

func assertNil(t *testing.T, actual interface{]}){
    if actual != nil {
        t.Errorf("Expected error to be nil, found: [%s]", actual)
    }
}

func TestMultiplication(t *testing.T){
    tenEuros := s.NewMoney{amount: 10, currency: "EUR"}
    twentyEuros := s.NewMoney{amount: 20, currency: "EUR"}
    assertEqual(t, twentyEuros, tenEuros.times(2))
}

func TestDivision(t *testing.T){
    originalMoney := s.NewMoney{amount: 4002, currency: "KRW"}
    actualResult := originalMoney.divide(4)
    expectedResult := s.NewMoney{amount: 1000.5, currency: "KRW"}
    assertEqual(t, expectedResult, actualResult)
}

func TestAddition(t *testing.T){
    var portfolio s.Portfolio
    var portfolioInDollars s.Money

	fiveDollars := s.NewMoney{amount: 5, "USD"}
	tenDollars := s.NewMoney{amount: 10, "USD"}
	fifteenDollars := s.NewMoney{amount: 15, "USD"}

	portfolio = s.Portfolio.add(fiveDollars)
	portfolio = s.Portfolio.add(tenDollars)
	portfolioInDollars, _ = portfolio.Evaluate(bank, "USD")

	assertEqual(t, fifteenDollars, *portfolioInDollars)
}

func TestAdditionOfDollarsAndEuros(t *testing.T){
    var portfolio s.Portfolio

    fiveDollars := s.NewMoney(5, "USD")
    tenEuros := s.NewMoney(10, "EUR")

    portfolio = portfolio.Add(fiveDollars)
    portfolio = portfolio.Add(tenEuros)

    expectedValue := s.NewMoney(17, "USD") //if we get 1.2 dollars for 1.0 euro
    actualValue, _ := portfolio.Evaluate(bank, "USD")

    assertEqual(t, expectedValue, *actualValue)
}

func TestAdditionOfDollarsAndWons(t *testing.T){
    var portfolio s.Portfolio

    fiveDollars := s.NewMoney(5, "USD")
    elevenHundredWons := s.NewMoney(1100, "KRW")

    portfolio = portfolio.Add(fiveDollars)
    portfolio = portfolio.Add(elevenHundredWons)

    expectedValue := s.NewMoney(2200, "KRW") //if we get 1100 wons for 1.0 dollar
    actualValue, _ := portfolio.Evaluate(bank, "KRW")

    assertEqual(t, expectedValue, *actualValue)
}

func TestAdditionWithMultipleMissingExchangeRates(t *testing.T){
    var portfolio s.Portfolio

    oneDollar := s.NewMoney(1, "USD")
    oneEuro := s.NewMoney(1, "EUR")
    oneWon := s.NewMoney(1, "KRW")

    portfolio = portfolio.Add(oneDollar)
    portfolio = portfolio.Add(oneEuro)
    portfolio = portfolio.Add(oneWon)

    expectedErrorMessage :=
        "Missing exchange rate(s):[USD->Kalganid,EUR->Kalganid,KRW->Kalganid]"

    value, actualError := portfolio.Evaluate(bank, "Kalganid")

    assertNil(t, value)
    assertEqual(t, expectedErrorMessage, actualError.Error())
}

func TestConversion(t *testing.T){
    bank := s.Bank()
    bank.AddExchangeRate("EUR", "USD", 1.2)
    tenEuros := s.NewMoney(10, "EUR")
    actualConvertedMoney, err := bank.Convert(tenEuros, "USD")
    assertNil(t, err)
    assertEqual(t, s.NewMoney(12, "USD"), *actualConvertedMoney)
}

func TestConversionWithMissingExchangeRate(t *testing.T){
    bank := s.NewBank()
    tenEuros := s.NewMoney(10, "EUR")
    actualConvertedMoney, err := bank.Convert(tenEuros, "Kalganid")
    assertEqual(t, actualConvertedMoney)
    assertEqual(t, "EUR->Kalganid", err.Error())
}
