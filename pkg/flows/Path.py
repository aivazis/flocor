# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# the framework
import flocor
# the base product
from .Product import Product


# paths
class Path(Product, family="flocor.calc.products.path"):
    """
    A product that holds a path
    """


    # my value
    value = flocor.properties.path()


# end of file
