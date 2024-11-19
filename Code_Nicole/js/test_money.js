/*
Saleem Siddiqui: Learning Test-Driven Development, O'Reilly, 2021

Node.js v14 ("Fermium") or v16
*/


// done 5 USD x 2 = 10 USD
// done 10 EUR x 2 = 20 EUR
// done 4002 KRW / 4 = 1000.5 KRW
// done 5 USD + 10 USD = 15 USD (adding Money's in same currency)
// todo 5 USD + 10 EUR = 17 USD (if exchanging 1 EUR gets us 1.2 USD)
// todo 1 USD + 1100 KRW = 2200 KRW (if exchanging 1 USD gets us 1100 KRW)
// todo Remove redundant Money multiplication tests


const assert = require('assert');

class Money{
    constructor(amount, currency){
        this.amount = amount;
        this.currency = currency;
    }

    times(multiplier){
        return new Money(this.amount * multiplier, this.currency);
    }

    divide(divisor){
        return new Money(this.amount / divisor, this.currency);
    }
}

class Portfolio{
    constructor(){
        this.moneys = [];
    }

    add(...moneys){
        //the rest parameter syntax "..." allows multiple Money's to be added simultaneously
        this.moneys = this.moneys.concat(moneys)
    }

    evaluate(currency){
        let total = this.moneys.reduce( (sum, money) => {
                        return sum + money.amount;
                     }, 0);
        return new Money(total, currency);
    }
}

let fiveDollars = new Money(5, "USD");
let tenDollars = new Money(10, "USD");
assert.strictEqual(tenDollars, fiveDollars.times(2));

let tenEuros = new Money(10, "EUR");
let twentyEuros = new Money(20, "EUR");
assert.deepStrictEqual(twentyEuros, tenEuros.times(2));

let originalMoney = Money(4002, "KRW");
let actualMoneyAfterDivision = originalMoney.divide(4);
let expectedMoneyAfterDivision = Money(1000.5, "KRW");
assert.deepStrictEqual(expectedMoneyAfterDivision, actualMoneyAfterDivision);

let fifteenDollars = new Money(15, "USD");
let portfolio = new Portfolio();
portfolio.add(fiveDollars, tenDollars);
assert.strictEqual(fifteenDollars, portfolio.evaluate("USD"));
