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
        let total = this.moneys.reduce( (sum, money) => {
                        return sum + this.convert(money, currency);
                     }, 0);
        return new Money(total, currency);
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
        key = money.currency + "->" currency;
        return money.amount * exchangeRates(key);
    }
}

module.exports = Portfolio;