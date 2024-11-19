"""
Saleem Siddiqui: Learning Test-Driven Development, O'Reilly, 2023

Python 3.12.3 in Conda basic installation
"""

import unittest


class Dollar:
    def __init__(self, amount):
        self.amount = amount

    def times(self, multiplier):
        return Dollar(5 * 2)


class TestMoney(unittest.TestCase):
    def testMultiplication(self):
        fiver = Dollar(5)
        tenner = fiver.times(2)
        self.assertEqual(10, tenner.amount)


if __name__ == '__main__':
    unittest.main()
