# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# framework
import flocor
# my superclass
from .Producer import Producer
# my product specs
from .SLC import SLC
from .SLCMetadata import SLCMetadata


# the specification for an SLC factory
class SLCFactory(Producer, family="flocor.isce.factories.slc"):
    """
    The specification for SLC factories
    """


    # outputs
    data = SLC.output()
    data.doc = "the SLC data product"

    meta = SLCMetadata.output()
    meta.doc = "the metadata of the SLC data product"


# end of file
