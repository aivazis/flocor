# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# framework
import flocor
# the base factory
from .Factory import Factory


# subtract {op2} from {op1}
class Sub(Factory, family="flocor.calc.factories.sub"):
    """
    A factory that subtracts its two operands
    """


    # my operands
    min = flocor.flow.specification.input()
    sub = flocor.flow.specification.input()
    # my value
    diff = flocor.flow.specification.output()


    # interface
    def pyre_run(self, **kwds):
        """
        Compute and store my value
        """
        self.diff.value = self.min.value - self.sub.value
        # all done
        return self


# end of file
