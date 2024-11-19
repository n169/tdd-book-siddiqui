// Saleem Siddiqui: Learning Test-Driven Development, O'Reilly, 2023

// done 5 USD x 2 = 10 USD
// todo 10 EUR x 2 = 20 EUR
// todo 4002 KRW / 4 = 1000.5 KRW
// todo 5 USD + 10 EUR = 17 USE (if exchanging 1 EUR gets us 1.2 USD)
// todo 1 USD + 1100 KRW = 2200 KRW (if exchanging 1 USD gets us 1100 KRW)

const assert = require('assert');

class Dollar{
	constructor(amount){
		this.amount = amount;
	}
	
	times (multiplier){
		return new Dollar(this.amount * multiplier);
	}
}

let fiver = new Dollar(5);
let tenner = fiver.times(2);
assert.strictEqual(tenner.amount, 10);