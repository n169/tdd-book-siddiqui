"""
Saleem Siddiqui: Learning Test-Driven Development, O'Reilly, 2023
"""

import unittest


class TestMoney(unittest.TestCase):
    def testMultiplication(self):
        fiver = Dollar(5)
        tenner = fiver.times(2)
        self.assertEqual(10, tenner.amout)


if __name__ == '__main__':
    unittest.main()
