"""
Saleem Siddiqui: Learning Test-Driven Development, O'Reilly, 2021

Python version 3.10 recommended,
but using Python 3.12.3 in Conda basic installation
"""

import unittest


# done 5 USD x 2 = 10 USD
# done 10 EUR x 2 = 20 EUR
# todo 4002 KRW / 4 = 1000.5 KRW
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


class TestMoney(unittest.TestCase):
    def testMultiplication(self):
        fiver = Money(5, "USD")
        tenner = fiver.times(2)
        self.assertEqual(10, tenner.amount)  # first the target, then the calculated value

    def testMultiplicationInEuros(self):
        ten_euros = Money(10, "EUR")
        twenty_euros = ten_euros.times(2)
        self.assertEqual(20, twenty_euros.amount)
        self.assertEqual("EUR", twenty_euros.currency)

    def testDivision(self):
        original_money = Money(4002, "KRW")
        actual_money_after_division = original_money.divide(4)
        expected_money_after_division = Money(1000.5, "KRW")
        self.assertEqual(expected_money_after_division.amount,
                         actual_money_after_division.amount)
        self.assertEqual(expected_money_after_division.currency,
                         actual_money_after_division.currency)


if __name__ == '__main__':
    unittest.main()
