# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# framework
import flocor
# superclass
from .Product import Product as product


# protocol for describing sequences of pixels
class FloatArena(product,
            family="flocor.ampcor.products.arenas.floatArena",
            implements=flocor.ampcor.protocols.arena):
    """
    An arena is a densely packed collection of dataset tiles of a specific shape
    """


# end of file
