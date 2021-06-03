# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# framework
import flocor
# superclass
from .Factory import Factory as factory


# generate a correlation plan
class Planner(factory,
              family="flocor.ampcor.factories.planners.plan",
              implements=flocor.ampcor.protocols.planner):
    """
    Create a correlation plan given the reference and secondary raster shapes and a map
    from pixels in the reference raster to pixels in the secondary raster
    """


    # inputs
    refMeta = flocor.isce.protocols.slcMetadata.input()
    refMeta.doc = "the metadata of the reference SLC product"

    secMeta = flocor.isce.protocols.slcMetadata.input()
    secMeta.doc = "the metadata of the secondary SLC product"

    domain = flocor.isce.protocols.pixels.input()
    domain.doc = "the input pixels"

    range = flocor.isce.protocols.pixels.input()
    range.doc = "the sequence of output pixels"

    # output
    plan = flocor.ampcor.protocols.correlationPlan.output()
    plan.doc = "the correlation plan"


# end of file
