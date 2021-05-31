# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# framework
import flocor
# pull the {ampcor} protocols
from .. import protocols


# publish the base product so users can extend the package
from .Product import Product as product


# foundries
@flocor.foundry(implements=protocols.specification, tip="the correlation plan")
def plan():
    """
    The correlation plan
    """
    # pull the spec
    from .Plan import Plan
    # and publish it
    return Plan


# end of file
