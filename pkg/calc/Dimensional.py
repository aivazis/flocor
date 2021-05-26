# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# the framework
import flocor
# the base product
from .Product import Product


# quantities with units
class Dimensional(Product, family="flocor.calc.products.dimensional"):
    """
    A product that holds a value with units
    """


    # my value
    value = flocor.properties.dimensional()


# end of file
