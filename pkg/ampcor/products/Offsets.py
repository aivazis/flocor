# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# framework
import flocor
# superclass
from .Product import Product as product


# protocol for describing sequences of pixels
class Offsets(product,
            family="flocor.ampcor.products.arenas.offsets",
            implements=flocor.ampcor.protocols.arena):
    """
    An offset map from a reference to a secondary dataset
    """


# end of file
