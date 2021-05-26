# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# the framework
import flocor
# the base product
from .Product import Product


# complex
class Complex(Product, family="flocor.calc.products.complex"):
    """
    A product that holds a complex number
    """


    # my value
    value = flocor.properties.complex()


# end of file
