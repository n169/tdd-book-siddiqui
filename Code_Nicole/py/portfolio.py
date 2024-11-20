import functools
import operator

from money import Money


class Portfolio:
    def __init__(self):
        self.moneys = []

    def add(self, *moneys):
        self.moneys.extend(moneys)

    def evaluate(self, currency):
        # - using a lambda expression, we map the self.moneys array to a mpa of only the amounts in each Money object
        # - we then reduce this map to a single scalar value, using the operator.add operation
        # - we assign this scalar value to the variable named total
        # - we finally create a new Money object using this total and the currency passed in
        #   the first (and only) parameter to the evaluate method
        # - the last parameter to reduce (0 in our case) is the initial value of the accumulated result
        total = functools.reduce(operator.add, map(lambda m: m.amount, self.moneys), 0)
        return Money(total, currency)
