/*
Saleem Siddiqui: Learning Test-Driven Development, O'Reilly, 2021

Node.js v14 ("Fermium") or v16
*/


// done 5 USD x 2 = 10 USD
// todo 10 EUR x 2 = 20 EUR
// todo 4002 KRW / 4 = 1000.5 KRW
// todo 5 USD + 10 EUR = 17 USE (if exchanging 1 EUR gets us 1.2 USD)
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
}

let fiver = new Money(5, "USD");
let tenner = fiver.times(2);
assert.strictEqual(10, tenner.amount);

let tenEuros = new Money(10, "EUR");
let twentyEuros = tenEuros.times(2);
assert.strictEqual(20, twentyEuros.amount);
assert.strictEqual("EUR", twentyEuros.currency);
