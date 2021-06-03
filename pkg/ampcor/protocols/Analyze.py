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
class Analyze(producer, family="flocor.ampcor.factories.correlators"):
    """
    Analyze the correlation surface of two datasets and produce an offset map
    """


    # input
    # output
    gamma = arena.output()
    gamma.doc = "the correlation surface"

    # output
    offsets = arena.output()
    offsets.doc = "the offset map"


    # framework hooks
    @classmethod
    def pyre_default(cls, **kwds):
        """
        Provide access to the reference implementation
        """
        # the default is a uniform grid
        return flocor.ampcor.factories.correlate


# end of file
