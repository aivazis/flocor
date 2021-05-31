# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# framework
import flocor
# superclass
from .Producer import Producer as producer


# protocol for describing sequences of pixels
class Cover(producer, family="flocor.ampcor.factories.covers"):
    """
    A cover is a generator of a collection of pixels
    """


    # inputs
    meta = flocor.isce.protocols.slcMetadata.input()
    meta.doc = "the metadata of the SLC product"

    # outputs
    pixels = flocor.isce.protocols.pixels.output()
    pixels.doc = "the bag of generated pixel coordinates"


    # framework hooks
    @classmethod
    def pyre_default(cls, **kwds):
        """
        Provide access to the reference implementation
        """
        # the default is a uniform grid
        return flocor.ampcor.factories.uniformGrid


# end of file
