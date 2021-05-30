# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# the framework
import flocor
# pull the {isce} protocols
from .. import protocols


# publish the base factory so users can extend the package
from .Factory import Factory as factory


@flocor.foundry(implements=protocols.slcFactory, tip="a reader for SLC data products")
def slcReader():
    """
    An SLC reader
    """
    # pull the spec
    from .SLCReader import SLCReader
    # and publish it
    return SLCReader


# end of file