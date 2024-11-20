const Money = require('./money');

class Portfolio{
    constructor(){
        this.moneys = [];
    }

    add(...moneys){
        //the rest parameter syntax "..." allows multiple Money's to be added simultaneously
        this.moneys = this.moneys.concat(moneys)
    }

    evaluate(currency){
        let failures = [];
        let total = this.moneys.reduce( (sum, money) => {
                        let convertedAmount = this.convert(money, currency);
                        if(convertedAmount == undefined){
                            failures.push(money.currency + "->" + currency);
                            return sum;
                        }
                        return sum + convertedAmount;
                     }, 0);
        if (!failures.length){
            return new Money(total, currency);
        }
        throw new Error("Missing exchange rate(s):[" + failures.join() + "]");
    }

    convert(money, currency){
        let exchangeRates = new Map();
        exchangeRates.set("EUR->USD", 1.2);
        exchangeRates.set("USD->KRW", 1100.0);
        // exchangeRates.set("USD->EUR", 1.0/1.2);
        // exchangeRates.set("KRW->USD", 1.0/1100.0);
        // exchangeRates.set("EUR->KRW", 1344.0);
        // exchangeRates.set("KRW->EUR", 1.0/1344.0);

        if (moneys.currency == currency){
            return money.amount;
        }
        let key = money.currency + "->" currency;
        let rate = exchangeRates.get(key);
        if (rate == undefined){
            return undefined;
        }
        return money.amount * rate;
    }
}

module.exports = Portfolio;