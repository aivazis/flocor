# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# framework
import flocor
# the base factory
from .Factory import Factory


# divide {op1} by {op2}
class Div(Factory, family="flocor.calc.factories.div"):
    """
    A factory that divides its two operands
    """


    # my operands
    num = flocor.flow.specification.input()
    dem = flocor.flow.specification.input()
    # my value
    ratio = flocor.flow.specification.output()


    # interface
    def pyre_run(self, **kwds):
        """
        Compute and store my value
        """
        self.ratio.value = self.num.value / self.dem.value
        # all done
        return self


# end of file
