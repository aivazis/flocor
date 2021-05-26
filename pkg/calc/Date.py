# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# the framework
import flocor
# the base product
from .Product import Product


# date
class Date(Product, family="flocor.calc.products.date"):
    """
    A product that holds a date
    """


    # my value
    value = flocor.properties.date()


# end of file
