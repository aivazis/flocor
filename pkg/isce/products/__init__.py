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


@flocor.foundry(implements=protocols.slcDataset, tip="the SLC data product")
def slcDataset():
    """
    An SLC dataset
    """
    # pull the spec
    from .SLCDataset import SLCDataset
    # and publish it
    return SLCDataset


@flocor.foundry(implements=protocols.slcMetadata, tip="the SLC data product")
def slcMetadata():
    """
    The metadata of an SLC
    """
    # pull the spec
    from .SLCMetadata import SLCMetadata
    # and publish it
    return SLCMetadata


# end of file
