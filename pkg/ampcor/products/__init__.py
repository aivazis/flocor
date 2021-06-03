# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# framework
import flocor
# the local protocols
from .. import protocols


# publish the base product so users can extend the package
from .Product import Product as product


# foundries
@flocor.foundry(implements=protocols.arena, tip="a collection of tiles")
def floatArena():
    """
    A densely packed collection of tiles of the same shape whose pixels are floats
    """
    # pull the spec
    from .FloatArena import FloatArena
    # and publish it
    return FloatArena


@flocor.foundry(implements=protocols.arena, tip="a collection of tiles")
def complexArena():
    """
    A densely packed collection of tiles of the same shape whose pixels are complex numbers
    """
    # pull the spec
    from .ComplexArena import ComplexArena
    # and publish it
    return ComplexArena


@flocor.foundry(implements=protocols.arena, tip="the offset map")
def offsets():
    """
    A map with pixels offsets from a reference to a secondary dataset
    """
    # pull the spec
    from .Offsets import Offsets
    # and publish it
    return Offsets


@flocor.foundry(implements=protocols.correlationPlan, tip="the correlation plan")
def plan():
    """
    The correlation plan
    """
    # pull the spec
    from .Plan import Plan
    # and publish it
    return Plan


# end of file
