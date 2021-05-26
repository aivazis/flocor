# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# the framework
import flocor
# the base product
from .Product import Product


# input streams
class IStream(Product, family="flocor.calc.products.istream"):
    """
    A product that holds an input stream
    """


    # my value
    value = flocor.properties.istream()


# end of file
