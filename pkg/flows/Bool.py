# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# the framework
import flocor
# the base product
from .Product import Product


# logical
class Bool(Product, family="flocor.calc.products.bool"):
    """
    A product that holds a boolean
    """


    # my value
    value = flocor.properties.bool()


# end of file
