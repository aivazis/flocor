# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# framework
import flocor
# my protocol
from flocor.ampcor.protocols import specification


# base class for local products
class Product(flocor.flow.product, implements=specification, internal=True):
    """
    The base class for {flocor.ampcor} products
    """


# end of file