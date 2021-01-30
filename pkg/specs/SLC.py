# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# support
import flocor
# my superclasses
from .SLCMetadata import SLCMetadata
from .SLCDataset import SLCDataset


# a 2d raster of complex floats
class SLC(SLCMetadata, SLCDataset, family="flocor.products.slc"):
    """
    The base class for building SLC data products

    An SLC is a 2d raster of complex floats along with metadata that describe how the data were
    acquired. This class is the basis for requiring instances to provide metadata and a
    payload.

    Other packages, e.g. isce3 and nisar, may (should?) constrain the required metadata
    further, and therefore may specify more traits here. For the purposes of {flocor}, the only
    remaining piece is to supply a default implementation for those entities that do not
    explicitly specify one.

    SLCs interpret the {shape} of the raster as (lines, samples)
    """


    # framework hooks
    @classmethod
    def pyre_default(cls, **kwds):
        """
        Provide access to the reference implementation
        """
        # the default implementation is one of mine; publish
        return flocor.products.slc


# end of file
