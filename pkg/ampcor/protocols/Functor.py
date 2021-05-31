# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# framework
import flocor
# superclass
from .Producer import Producer as producer


# protocol for describing maps
class Functor(producer, family="flocor.ampcor.factories.functors"):
    """
    A functor maps a sequence of pixels to another sequence of pixels
    """


    # inputs
    domain = flocor.isce.protocols.pixels.input()
    domain.doc = "the input pixels"

    # outputs
    range = flocor.isce.protocols.pixels.output()
    range.doc = "the sequence of output pixels"


    # framework hooks
    @classmethod
    def pyre_default(cls, **kwds):
        """
        Provide access to the reference implementation
        """
        # the default is a uniform grid
        return flocor.ampcor.factories.constant


# end of file
