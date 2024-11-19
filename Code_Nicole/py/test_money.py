"""
Saleem Siddiqui: Learning Test-Driven Development, O'Reilly, 2021

Python version 3.10 recommended,
but using Python 3.12.3 in Conda basic installation
"""

import unittest
import functools  # for reduce function
import operator  # for add function


# done 5 USD x 2 = 10 USD
# done 10 EUR x 2 = 20 EUR
# done 4002 KRW / 4 = 1000.5 KRW
# done 5 USD + 10 USD = 15 USD (adding Money's in same currency)
# todo Separate test code from production code
# todo Remove redundant tests
# todo 5 USD + 10 EUR = 17 USD (if exchanging 1 EUR gets us 1.2 USD)
# todo 1 USD + 1100 KRW = 2200 KRW (if exchanging 1 USD gets us 1100 KRW)


class Money:
    def __init__(self, amount, currency):
        self.amount = amount
        self.currency = currency

    def times(self, multiplier):
        return Money(self.amount * multiplier, self.currency)

    def divide(self, divisor):
        return Money(self.amount / divisor, self.currency)

    def __eq__(self, other):
        return self.amount == other.amount and self.currency == other.currency


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


class TestMoney(unittest.TestCase):
    def testMultiplicationInDollars(self):
        five_dollars = Money(5, "USD")
        ten_dollars = Money(10, "USD")
        self.assertEqual(ten_dollars, five_dollars.times(2))  # first the target, then the calculated value

    def testMultiplicationInEuros(self):
        ten_euros = Money(10, "EUR")
        twenty_euros = Money(20, "EUR")
        self.assertEqual(twenty_euros, ten_euros.times(2))

    def testDivision(self):
        original_money = Money(4002, "KRW")
        actual_money_after_division = original_money.divide(4)
        expected_money_after_division = Money(1000.5, "KRW")
        self.assertEqual(expected_money_after_division, actual_money_after_division)

    def testAddition(self):
        five_dollars = Money(5, "USD")
        ten_dollars = Money(10, "USD")
        fifteen_dollars = Money(15, "USD")
        portfolio = Portfolio()
        portfolio.add(five_dollars, ten_dollars)
        self.assertEqual(fifteen_dollars, portfolio.evaluate("USD"))


if __name__ == '__main__':
    unittest.main()
