# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# the framework
import flocor
# the base product
from .Product import Product


# timestamps
class Time(Product, family="flocor.calc.products.time"):
    """
    A product that holds a time
    """


    # my value
    value = flocor.properties.time()


# end of file
