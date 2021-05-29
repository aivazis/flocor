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


# the specification for an SLC factory
class SLCFactory(Producer, family="flocor.isce.factories.slc"):
    """
    The specification for SLC factories
    """


    # outputs
    slc = SLC.output()
    slc.doc = "the SLC data product"


# end of file
