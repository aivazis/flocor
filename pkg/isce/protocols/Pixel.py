# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# support
import flocor
# superclass
from .Specification import Specification


# a raster pixel
class Pixel(Specification, family="flocor.isce.products.pixel"):
    """
    A pair of numbers that identify a pixel in a raster
    """


    # public data
    pixel = flocor.properties.tuple(schema=flocor.properties.int())
    pixel.doc = "the coordinates of a pixel"


# end of file
