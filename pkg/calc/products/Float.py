# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# the framework
import flocor
# the base product
from .Product import Product


# floats
class Float(Product, family="flocor.calc.products.float"):
    """
    A product that holds a floating point number
    """


    # my value
    value = flocor.properties.float()


# end of file
