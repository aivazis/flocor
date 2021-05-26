# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# framework
import flocor
# the base factory
from .Factory import Factory


# multiply {op1} by {op2}
class Mul(Factory, family="flocor.calc.factories.mul"):
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


# end of file
