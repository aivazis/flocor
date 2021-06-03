# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# framework
import flocor
# my base class
from .Product import Product as product


# base class for local products
class Plan(product,
           family="flocor.ampcor.products.plans.correlationPlan",
           implements=flocor.ampcor.protocols.correlationPlan):
    """
    The correlation plan is a pairing of reference to secondary tiles
    """


# end of file