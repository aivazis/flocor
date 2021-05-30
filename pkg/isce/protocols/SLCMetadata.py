# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# support
import flocor
# my superclass
from .Specification import Specification


# SLC metadata
class SLCMetadata(Specification, family="flocor.isce.products.slcMetadata"):
    """
    The protocol for describing the necessary SLC metadata

    An SLC is a 2d raster of complex floats along with metadata that describe how the data were
    acquired. This class is the basis for requiring instances to provide metadata and a
    payload.

    Other packages, e.g. {nisar}, may (should?) constrain the required metadata further,
    and therefore may specify more traits here. For the purposes of {flocor.isce}, the only
    remaining piece is to supply a default implementation for those entities that do not
    explicitly specify one.

    SLCs interpret the {shape} of the raster as (lines, samples)
    """


    # public data
    # the least amount of information that we need is the shape of the payload
    shape = flocor.properties.tuple(schema=flocor.properties.int())
    shape.doc = "a pair of integers that describes the shape of the slc"


    # framework hooks
    @classmethod
    def pyre_default(cls, **kwds):
        """
        Provide access to the reference implementation
        """
        # the default implementation is one of mine; publish
        return flocor.isce.products.slcMetadata


# end of file
