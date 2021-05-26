# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# the framework
import flocor
# the base product
from .Product import Product


# strings
class String(Product, family="flocor.calc.products.str"):
    """
    A product that holds a single string
    """


    # my value
    value = flocor.properties.str()


# end of file
