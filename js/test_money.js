/*
Saleem Siddiqui: Learning Test-Driven Development, O'Reilly, 2021

Node.js v14 ("Fermium") or v16
*/


// done 5 USD x 2 = 10 USD
// done 10 EUR x 2 = 20 EUR
// done 4002 KRW / 4 = 1000.5 KRW
// done 5 USD + 10 USD = 15 USD (adding Money's in same currency)
// done Separate test code from production code
// done Remove redundant tests
// done 5 USD + 10 EUR = 17 USD (if exchanging 1 EUR gets us 1.2 USD)
// todo 1 USD + 1100 KRW = 2200 KRW (if exchanging 1 USD gets us 1100 KRW)
// done Determine exchange rate based ont he currencies involved (from -> to)
// done Improve error handling when exchange rates are unspecified
// done Improve the implementation of exchange rates
// done Allow exchange rates to be modified


const assert = require('assert');
const Bank = require('./bank');
const Money = require('./money');
const Portfolio = require('./portfolio');

class MoneyTest{
  setUp(){ //setUp
    this.bank = new Bank();
    this.bank.addExchangeRate("EUR", "USD", 1.2);
    this.bank.addExchangeRate("USD", "KRW", 1100);
  }

  testMultiplication(){
    let tenEuros = new Money(10, "EUR");
    let twentyEuros = new Money(20, "EUR");
    assert.deepStrictEqual(twentyEuros, tenEuros.times(2));
  }

  testDivision(){
    let originalMoney = new Money(4002, "KRW");
    let actualMoneyAfterDivision = originalMoney.divide(4);
    let expectedMoneyAfterDivision = new Money(1000.5, "KRW");
    assert.deepStrictEqual(expectedMoneyAfterDivision, actualMoneyAfterDivision);
  }

  testAddition(){
    let fiveDollars = new Money(5, "USD");
    let tenDollars = new Money(10, "USD");
    let fifteenDollars = new Money(15, "USD");
    let portfolio = new Portfolio();
    portfolio.add(fiveDollars, tenDollars);
    assert.deepStrictEqual(fifteenDollars, portfolio.evaluate(this.bank, "USD"));
  }

  testAdditionOfDollarsAndEuros(){
    let fiveDollars = new Money(5, "USD");
    let tenEuros = new Money(10, "EUR");
    let portfolio = new Portfolio();
    portfolio.add(fiveDollars, tenEuros);
    let expectedValue = new Money(17, "USD") //if we get 1.2 dollars for 1.0 euro
    assert.deepStrictEqual(expectedValue, portfolio.evaluate(this.bank, "USD"));
  }

  testAdditionOfDollarsAndWons(){
    let oneDollar = new Money(1, "USD");
    let elevenHundredWons = new Money(1100, "KRW");
    let portfolio = new Portfolio();
    portfolio.add(oneDollar, elevenHundredWons);
    let expectedValue = new Money(2200, "KRWD") //if we get 1100 wons for 1 dollar
    assert.deepStrictEqual(expectedValue, portfolio.evaluate(this.bank, "KRW"));
  }

  testAdditionWithMultipleMissingExchangeRates(){
    let oneDollar = new Money(1, "USD");
    let oneEuro = new Money(1, "EUR");
    let oneWon = new Money(1, "KRW");
    let portfolio = new Portfolio();
    portfolio.add(oneDollar, oneEuro, oneWon);
    let expectedError = new Error("Missing exchange rate(s):[USD->Kalganid,EUR->Kalganid,KRW->Kalganid]");
    assert.throws(() => portfolio.evaluate(this.bank, "Kalganid"), expectedError);
  }

  testConversionConversionWithDifferentRatesBetweenTwoCurrencies(){
    let tenEuros = new Money(10, "EUR");
    assert.deepStrictEqual(new Money(12, "USD"), this.bank.convert(tenEuros, "USD"));

    this.bank.addExchangeRate("EUR", "USD", 1.3);
    assert.deepStrictEqual(new Money(13, "USD"), this.bank.convert(tenEuros, "USD"));
  }

  testWhatIsTheConversionRateFromEURToUSDBySetUp(){
    // Ensure, that there a no side effects from one test to another,
    // because the setUp method is run before each test.
    let tenEuros = new Money(10, "EUR");
    assert.deepStrictEqual(new Money(12, "USD"), this.bank.convert(tenEuros, "USD"));
  }

  testConversionWithMissingExchangeRate(){
    let tenEuros = new Money(10, "EUR");
    let expectedError = new Error("EUR->Kalganid");
    assert.throws(function() { this.bank.convert(tenEuros, "Kalganid")}, expectedError);
  }
  
  testAdditionWithTestDouble() {
    const moneyCount = 10;
    let moneys = []
    for (let i = 0; i < moneyCount; i++) {
      moneys.push(new Money(Math.random(Number.MAX_SAFE_INTEGER), "Does Not Matter"));
    }
    let bank = {
      convert: function () {
        return new Money(Math.PI, "Kalganid");
      }
    };
    let arbitraryResult = new Money(moneyCount * Math.PI, "Kalganid");
    let portfolio = new Portfolio();
    portfolio.add(...moneys);
    assert.deepStrictEqual(portfolio.evaluate(bank, "Kalganid"), arbitraryResult);
  }
  
  testAddTwoMoneysInSameCurrency() {
    let fiveKalganid = new Money(5, "Kalganid");
    let tenKalganid = new Money(10, "Kalganid");
    let fifteenKalganid = new Money(15, "Kalganid");
    assert.deepStrictEqual(fiveKalganid.add(tenKalganid), fifteenKalganid);
    assert.deepStrictEqual(tenKalganid.add(fiveKalganid), fifteenKalganid);
  }

  testAddTwoMoneysInDifferentCurrencies() {
    let euro = new Money(1, "EUR");
    let dollar = new Money(1, "USD");
    assert.throws(function () { euro.add(dollar); },
      new Error("Cannot add USD to EUR"));
    assert.throws(function () { dollar.add(euro); },
      new Error("Cannot add EUR to USD"));
  }
	
  getAllTestMethods(){
    let moneyPrototype = MoneyTest.prototype; //JavaScript is prototype-based, not class-based
    let allProps = Object.getOwnPropertyNames(moneyPrototype);
    let testMethods = allProps.filter( p => {
      return typeof moneyPrototype[p] === 'function' && p.startsWith("test");
    });

    return testMethods;
  }

  runAllTests(){
    let testMethods = this.getAllTestMethods();
    testMethods.forEach(m => {
      console.log("Running: %s()", m); //Print the name of the method before invoking it
      let method = Reflect.get(this, m); //Get the method object for each test method name via reflection
      try {
        this.setUp();
        Reflect.apply(method, this, []); //Invoke the test method with no arguments on this object
      } catch (e) {
        if (e instanceof assert.AssertionError) {
          console.log(e);
        } else {
          throw e;
        }
      }
    });
  }

}

new MoneyTest().runAllTests();