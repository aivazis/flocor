# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# framework
import flocor
# my base class
from .Product import Product as product


# an SLC is a flow product that encapsulates a complex raster of a given shape
class SLCMetadata(product,
          family="flocor.isce.products.slcMetadata.slcMetadata",
          implements=flocor.isce.protocols.slcMetadata):
    """
    The metadata of an SLC data product

    An SLC is a 2d raster of complex floats along with metadata that describe how the data were
    acquired. This class is the basis for requiring instances to provide the necessary metadata

    Other packages, e.g. {nisar}, may (should?) constrain the required metadata further,
    and therefore may specify more traits here. For the purposes of {flocor.isce}, the only
    remaining piece is to supply a default implementation for those entities that do not
    explicitly specify one.

    SLCs interpret the {shape} of the raster as (lines, samples)
    """


    # public data
    # my metadata
    shape = flocor.properties.tuple(schema=flocor.properties.int())
    shape.doc = "a pair of integers that describes the shape of the raster"


# end of file
