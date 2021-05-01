# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# the framework
import flocor
# the base factory
from .Factory import Factory


# simple arithmetic
class Add(Factory, family="flocor.factories.add"):
    """
    A factory that adds its two operands
    """

    # my operands
    op1 = flocor.flow.specification.input()
    op2 = flocor.flow.specification.input()
    # my value
    value = flocor.flow.specification.output()

    # interface
    def pyre_run(self, **kwds):
        """
        Compute and store my value
        """
        self.value.value = self.op1.value + self.op2.value
        # all done
        return self


class Sub(Factory, family="flocor.factories.sub"):
    """
    A factory that subtracts its two operands
    """

    # my operands
    op1 = flocor.flow.specification.input()
    op2 = flocor.flow.specification.input()
    # my value
    value = flocor.flow.specification.output()

    # interface
    def pyre_run(self, **kwds):
        """
        Compute and store my value
        """
        self.value.value = self.op1.value - self.op2.value
        # all done
        return self


class Mul(Factory, family="flocor.factories.mul"):
    """
    A factory that multiplies its two operands
    """

    # my operands
    op1 = flocor.flow.specification.input()
    op2 = flocor.flow.specification.input()
    # my value
    value = flocor.flow.specification.output()

    # interface
    def pyre_run(self, **kwds):
        """
        Compute and store my value
        """
        self.value.value = self.op1.value * self.op2.value
        # all done
        return self


class Div(Factory, family="flocor.factories.div"):
    """
    A factory that divides its two operands
    """

    # my operands
    op1 = flocor.flow.specification.input()
    op2 = flocor.flow.specification.input()
    # my value
    value = flocor.flow.specification.output()

    # interface
    def pyre_run(self, **kwds):
        """
        Compute and store my value
        """
        self.value.value = self.op1.value / self.op2.value
        # all done
        return self


# put them all on a pile
operators = [
    Add, Sub, Mul, Div,
]
# and index them by the family name
index = { cls.pyre_family().split(".")[-1]: cls for cls in operators }


# end of file
