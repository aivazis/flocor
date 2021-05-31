# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# support
import flocor
# my superclasses
from .Dataset import Dataset
from .SLCMetadata import SLCMetadata


# a 2d raster of complex floats
class SLCDataset(Dataset, family="flocor.isce.products.slcDatasets"):
    """
    The protocol for describing SLC data products

    An SLC is a 2d raster of complex floats along with metadata that describe how the data were
    acquired. This class is the basis for requiring instances to provide metadata and a
    payload.

    Other packages, e.g. {nisar}, may (should?) constrain the required metadata further,
    and therefore may specify more traits here. For the purposes of {flocor.isce}, the only
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
        return flocor.isce.products.slcDataset


# end of file
