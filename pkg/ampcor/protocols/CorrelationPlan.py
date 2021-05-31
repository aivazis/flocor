# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# framework
import flocor
# my base class
from .Specification import Specification as specification


# base class for local products
class CorrelationPlan(specification, family="flocor.ampcor.products.plans"):
    """
    The correlation plan
    """


# end of file