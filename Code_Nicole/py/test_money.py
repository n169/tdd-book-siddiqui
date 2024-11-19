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
# todo 5 USD + 10 USD = 15 USD (adding Money's)
# todo 5 USD + 10 EUR = 17 USE (if exchanging 1 EUR gets us 1.2 USD)
# todo 1 USD + 1100 KRW = 2200 KRW (if exchanging 1 USD gets us 1100 KRW)
# todo Remove redundant Money multiplication tests


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
    def add(self, *moneys):
        pass

    def evaluate(self, currency):
        return Money(15, "USD")


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
