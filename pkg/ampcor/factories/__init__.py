# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# the framework
import flocor
# the local protocols
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


@flocor.foundry(implements=protocols.detect, tip="compute the correlation of two datasets")
def correlate():
    """
    Compute the correlation of two signals
    """
    # pull the spec
    from .Correlate import Correlate
    # and publish it
    return Correlate


@flocor.foundry(implements=protocols.detect, tip="deramp a complex signal")
def deramp():
    """
    Deramp an input signal
    """
    # pull the spec
    from .Deramp import Deramp
    # and publish it
    return Deramp


@flocor.foundry(implements=protocols.detect, tip="compute the amplitude of signal tiles")
def detect():
    """
    Generate an arena of amplitude tiles given signal tiles
    """
    # pull the spec
    from .Detect import Detect
    # and publish it
    return Detect


@flocor.foundry(implements=protocols.analyze, tip="compute an offset map")
def max():
    """
    Generate an offset map given a correlation surface
    """
    # pull the spec
    from .Max import Max
    # and publish it
    return Max


@flocor.foundry(implements=protocols.packer,
                tip="a generator of a correlation plan")
def packer():
    """
    A generator of tile arenas
    """
    # pull the spec
    from .Packer import Packer
    # and publish it
    return Packer


@flocor.foundry(implements=protocols.planner,
                tip="a generator of a correlation plan")
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


@flocor.foundry(implements=protocols.cover, tip="extend the input shape using FFT interpolation")
def zoom():
    """
    Use FFT interpolation to expand the shape of an input arena of signal tiles
    """
    # pull the spec
    from .Zoom import Zoom
    # and publish it
    return Zoom


# end of file
