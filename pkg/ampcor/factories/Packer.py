# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# framework
import flocor
# superclass
from .Factory import Factory as factory


# arena generator
class Packer(factory, family="flocor.ampcor.factories.packers.pack"):
    """
    Produce a densely packed arena of tiles given a correlation plan and an SLC dataset
    """


    # inputs
    dataset = flocor.isce.protocols.slcDataset.input()
    dataset.doc = "the metadata of the reference SLC product"

    plan = flocor.ampcor.protocols.correlationPlan.input()
    plan.doc = "the correlation plan"

    # output
    tiles = flocor.ampcor.protocols.arena.output()
    tiles.doc = "the correlation plan"


# end of file
