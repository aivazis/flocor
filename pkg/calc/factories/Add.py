# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# framework
import flocor
# the base factory
from .Factory import Factory


# add {op2} to {op1}
class Add(Factory, family="flocor.calc.factories.add"):
    """
    A factory that adds its two operands
    """


    # my operands
    op1 = flocor.flow.specification.input()
    op2 = flocor.flow.specification.input()
    # my value
    sum = flocor.flow.specification.output()


    # interface
    def pyre_run(self, **kwds):
        """
        Compute and store my value
        """
        self.sum.value = self.op1.value + self.op2.value
        # all done
        return self


# end of file
