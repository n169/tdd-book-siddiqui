package stocks

type Portfolio []Money

func (p Portfolio) Add(money Money) Money {
    p = append(p, money)
    return p
}

func (p Portfolio) Evaluate(currency string) Money {
    total := 0.0
    for _, m := range p {
        total = total + convert(m, currency)
    }
    return Money{amount: total, currency: "USD"}
}

func convert(money Money, currency string) float64 {
    exchangeRates := map[string]float64{
        // "EUR->USD": 1.2,
        // "USD->KRW": 1100.0,
    }
    // other rates: "USD->EUR": 1.0/1.2, "KRW->USD": 1.0/1100.0, "EUR->KRW": 1344.0, "KRW->EUR": 1.0/1344.0
    if money.currency == currency{
        return money.amount
    }
    key := money.currency + "=>" + currency
    return money.amount * exchangeRates[key]
}