# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# support
import flocor
# my superclass
from .Specification import Specification


# SLC metadata
class SLCMetadata(Specification, family="flocor.isce.products.slc.metadata"):
    """
    The SLC metadata
    """


    # public data
    # the least amount of information that we need is the shape of the payload
    shape = flocor.properties.tuple(schema=flocor.properties.int())
    shape.doc = "a pair of integers that describes the shape of the slc"


# end of file
