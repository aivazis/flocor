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
class Detect(producer, family="flocor.ampcor.factories.detectors"):
    """
    Generate an arena of the pixel amplitudes
    """


    # inputs
    signal = arena.input()
    signal.doc = "the metadata of the reference SLC product"

    # output
    amplitude = arena.output()
    amplitude.doc = "the correlation plan"


    # framework hooks
    @classmethod
    def pyre_default(cls, **kwds):
        """
        Provide access to the reference implementation
        """
        # the default is a uniform grid
        return flocor.ampcor.factories.detect


# end of file
