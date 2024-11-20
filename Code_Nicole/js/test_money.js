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
// todo Allow exchange rates to be modified


const assert = require('assert');
cont Bank = require('./bank');
const Money = require('./money');
const Portfolio = require('./portfolio');

class MoneyTest{
    constructor(){ //setUp
        this.bank = new Bank();
        this.bank.addExchangeRate("EUR", "USD", 1.2);
        this.bank.addExchangeRate("USD", "KRW", 1100);
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
        let testMethods := this.getAllTestMethods();
        testMethods.forEach(m => {
            console.log("Running: %s()", m); //Print the name of the method before invoking it
            let method = Reflect.get(this, m); //Get the method object for each test method name via reflection
            try {
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

    testMultiplication(){
        let tenEuros = new Money(10, "EUR");
        let twentyEuros = new Money(20, "EUR");
        assert.deepStrictEqual(twentyEuros, tenEuros.times(2));
    }

    testDivision(){
        let originalMoney = Money(4002, "KRW");
        let actualMoneyAfterDivision = originalMoney.divide(4);
        let expectedMoneyAfterDivision = Money(1000.5, "KRW");
        assert.deepStrictEqual(expectedMoneyAfterDivision, actualMoneyAfterDivision);
    }

    testAddition(){
        let fiveDollars = new Money(5, "USD");
        let tenDollars = new Money(10, "USD");
        let fifteenDollars = new Money(15, "USD");
        let portfolio = new Portfolio();
        portfolio.add(fiveDollars, tenDollars);
        assert.strictEqual(fifteenDollars, portfolio.evaluate(this.bank, "USD"));
    }

    testAdditionOfDollarsAndEuros(){
        let fiveDollars = new Money(5, "USD");
        let tenEuros = new Money(10, "EUR");
        let portfolio = new Portfolio();
        portfolio.add(fiveDollars, tenEuros);
        let expectedValue = new Money(17, "USD") //if we get 1.2 dollars for 1.0 euro
        assert.strictEqual(expectedValue, portfolio.evaluate(this.bank, "USD"));
    }

    testAdditionOfDollarsAndWons(){
        let oneDollar = new Money(1, "USD");
        let elevenHundredWons = new Money(1100, "KRW");
        let portfolio = new Portfolio();
        portfolio.add(oneDollar, elevenHundredWons);
        let expectedValue = new Money(2200, "KRWD") //if we get 1100 wons for 1 dollar
        assert.strictEqual(expectedValue, portfolio.evaluate(this.bank, "KRW"));
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

    testConversion(){
        let bank = new Bank();
        bank.addExchangeRate("EUR", "USD", 1.2);
        let tenEuros = new Money(10, "EUR");
        assert.deepStrictEqual(new Money(12, "USD"), bank.convert(tenEuros, "USD"));
    }

    testConversionWithMissingExchangeRate(){
        let bank = new Bank();
        let tenEuros = new Money(10, "EUR");
        let expectedError = new Error("EUR->Kalganid");
        assert.throws(function() { bank.convert(tenEuros, "Kalganid")}, expectedError);
    }

}

new MoneyTest().runAllTests();