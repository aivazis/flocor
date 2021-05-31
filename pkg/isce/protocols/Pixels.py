# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# support
import flocor
# superclass
from .Specification import Specification
# contents
from .Pixel import Pixel as pixel


#  a sequence of raster pixels
class Pixels(Specification, family="flocor.isce.products.pixels"):
    """
    A bag of pixel coordinates
    """


    # public data
    pixels = flocor.properties.tuple(schema=pixel())
    pixels.doc = "a sequence of pixels"


# end of file
