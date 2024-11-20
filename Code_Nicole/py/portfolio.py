from money import Money


class Portfolio:
    def __init__(self):
        self.moneys = []
        self._eur_to_usd = 1.2

    def add(self, *moneys):
        self.moneys.extend(moneys)

    def evaluate(self, currency):
        # - using a lambda expression, we map the self.moneys array to a mpa of only the amounts in each Money object
        # - we then reduce this map to a single scalar value, using the operator.add operation
        # - we assign this scalar value to the variable named total
        # - we finally create a new Money object using this total and the currency passed in
        #   the first (and only) parameter to the evaluate method
        # - the last parameter to reduce (0 in our case) is the initial value of the accumulated result
        total = 0.0
        failures = []
        for m in self.moneys:
            try:
                total += self.__convert(m, currency)
            except KeyError as ke:
                failures.append(ke)

        if len(failures) == 0:
            return Money(total, currency)

        failure_message = ",".join(f.args[0] for f in failures)  # str(f) has single-quote characters
        raise Exception("Missing exchange rate(s):[" + failure_message + "]")

    def __convert(self, a_money, a_currency):
        exchange_rates = {
            'EUR->USD': 1.2, 'USD->KRW': 1100.0
        }
        # other rates: 'USD->EUR': 1.0/1.2, 'KRW->USD': 1.0/1100.0, 'EUR->KRW': 1344.0, 'KRW->EUR': 1.0/1344.0

        if a_money.currency == a_currency:
            return a_money.amount
        else:
            key = a_money.currency + '->' + a_currency
            return a_money.amount * exchange_rates[key]
