# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# support
import flocor
# superclass
from .Product import Product as product
# protocols
from .. import protocols


#  a sequence of raster pixels
class Pixels(product, family="flocor.isce.products.pixels.pixels"):
    """
    A bag of pixel coordinates
    """


    # public data
    pixels = flocor.properties.object()
    pixels.doc = "a sequence of pixels"


# end of file
