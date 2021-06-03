# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# framework
import flocor
# superclass
from .Producer import Producer as producer
# protools
from .Arena import Arena as arena

# protocol for describing maps
class Correlate(producer, family="flocor.ampcor.factories.correlators"):
    """
    Compute the correlation matrix of two amplitude arenas
    """


    # inputs
    reference = arena.input()
    reference.doc = "the reference SLC product"

    secondary = arena.input()
    secondary.doc = "the reference SLC product"

    # output
    gamma = arena.output()
    gamma.doc = "the correlation plan"


    # framework hooks
    @classmethod
    def pyre_default(cls, **kwds):
        """
        Provide access to the reference implementation
        """
        # the default is a uniform grid
        return flocor.ampcor.factories.correlate


# end of file
