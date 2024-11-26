"""
Saleem Siddiqui: Learning Test-Driven Development, O'Reilly, 2021

Python version 3.10 recommended,
but using Python 3.12.3 in Conda basic installation
"""

import unittest

from bank import Bank
from money import Money
from portfolio import Portfolio


# done 5 USD x 2 = 10 USD
# done 10 EUR x 2 = 20 EUR
# done 4002 KRW / 4 = 1000.5 KRW
# done 5 USD + 10 USD = 15 USD (adding Money's in same currency)
# done Separate test code from production code
# done Remove redundant tests
# done 5 USD + 10 EUR = 17 USD (if exchanging 1 EUR gets us 1.2 USD)
# done 1 USD + 1100 KRW = 2200 KRW (if exchanging 1 USD gets us 1100 KRW)
# done Determine exchange rate based on the currencies involved (from -> to)
# done Improve error handling when exchange rates are unspecified
# done Improve the implementation of exchange rates
# done Allow exchange rates to be modified


class TestMoney(unittest.TestCase):

    def setUp(self):
        self.bank = Bank()
        self.bank.addExchangeRate("EUR", "USD", 1.2)
        self.bank.addExchangeRate("USD", "KRW", 1100)

    def testMultiplication(self):
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
        self.assertEqual(fifteen_dollars, portfolio.evaluate(self.bank, "USD"))

    def testAdditionOfDollarsAndEuros(self):
        five_dollars = Money(5, "USD")
        ten_euros = Money(10, "EUR")
        portfolio = Portfolio()
        portfolio.add(five_dollars, ten_euros)
        expected_value = Money(17, "USD")  # if we get 1.2 dollars for 1.0 euro
        actual_value = portfolio.evaluate(self.bank, "USD")
        self.assertEqual(expected_value, actual_value, "%s != %s" % (expected_value, actual_value))

    def testAdditionOfDollarsAndWons(self):
        one_dollar = Money(1, "USD")
        eleven_hundred_won = Money(1100, "KRW")
        portfolio = Portfolio()
        portfolio.add(one_dollar, eleven_hundred_won)
        expected_value = Money(2200, "KRW")  # if we get 1100 wons for 1 dollar
        actual_value = portfolio.evaluate(self.bank, "KRW")
        self.assertEqual(expected_value, actual_value, "%s != %s" % (expected_value, actual_value))

    def testAdditionWithMultipleMissingExchangeRates(self):
        one_dollar = Money(1, "USD")
        one_euro = Money(1, "EUR")
        one_won = Money(1, "KRW")
        portfolio = Portfolio()
        portfolio.add(one_dollar, one_euro, one_won)
        with self.assertRaisesRegex(
                Exception,
                "Missing exchange rate\\(s\\):\\[USD\\->Kalganid,EUR->Kalganid,KRW->Kalganid\\]"
        ):
            portfolio.evaluate(self.bank, "Kalganid")

    def testConversionWithDifferentRatesBetweenTwoCurrencies(self):
        ten_euros = Money(10, "EUR")
        self.assertEqual(Money(12, "USD"), self.bank.convert(ten_euros, "USD"))

        self.bank.addExchangeRate("EUR", "USD", 1.3)
        self.assertEqual(Money(13, "USD"), self.bank.convert(ten_euros, "USD"))

    def testWhatIsTheConversionRateFromEURToUSDBySetUp(self):
        # Ensure, that there a no side effects from one test to another,
        # because the setUp method is run before each test.
        ten_euros = Money(10, "EUR")
        self.assertEqual(Money(12, "USD"), self.bank.convert(ten_euros, "USD"))

    def testConversionWithMissingExchangeRate(self):
        ten_euros = Money(10, "EUR")
        with self.assertRaisesRegex(Exception, "EUR->Kalganid"):
            self.bank.convert(ten_euros, "Kalganid")


if __name__ == '__main__':
    unittest.main()
