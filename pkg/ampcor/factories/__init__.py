# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# the framework
import flocor
# pull the {ampcor} protocols
from .. import protocols


# publish the base factory so users can extend the package
from .Factory import Factory as factory


# foundries
@flocor.foundry(implements=protocols.functor, tip="a uniform grid covering")
def constant():
    """
    A map that applies a constant shift to its input pixels
    """
    # pull the spec
    from .Constant import Constant
    # and publish it
    return Constant


@flocor.foundry(implements=protocols.planner, tip="a generator of a correlation plan")
def planner():
    """
    A generator of a correlation plan
    """
    # pull the spec
    from .Planner import Planner
    # and publish it
    return Planner


@flocor.foundry(implements=protocols.cover, tip="a uniform grid covering")
def uniformGrid():
    """
    A covering that generates a uniform grid
    """
    # pull the spec
    from .UniformGrid import UniformGrid
    # and publish it
    return UniformGrid


# end of file
