# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# the framework
import flocor
# the base product
from .Product import Product


# output streams
class OStream(Product, family="flocor.calc.products.ostream"):
    """
    A product that holds an output stream
    """


    # my value
    value = flocor.properties.ostream()


# end of file
