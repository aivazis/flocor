# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# framework
import flocor
# pull the {isce} protocols
from .. import protocols


# publish the base product so users can extend the package
from .Product import Product as product


@flocor.foundry(implements=protocols.pixels, tip="a sequence of raster pixels")
def pixels():
    """
    A sequence of raster pixels
    """
    # pull the spec
    from .Pixels import Pixels
    # and publish it
    return Pixels


@flocor.foundry(implements=protocols.slc, tip="the SLC data product")
def slc():
    """
    An SLC raster
    """
    # pull the spec
    from .SLC import SLC
    # and publish it
    return SLC


@flocor.foundry(implements=protocols.slc, tip="the SLC data product")
def slcMetadata():
    """
    The metadata of an SLC
    """
    # pull the spec
    from .SLCMetadata import SLCMetadata
    # and publish it
    return SLCMetadata


# end of file
