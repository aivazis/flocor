# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# framework
import flocor
# superclass
from .Factory import Factory as factory


# arena generator
class Refine(factory, family="flocor.ampcor.factories.packers.refine"):
    """
    Produce a densely packed arena of tiles given a dataset and an offset map
    """


    # user configurable state
    factor = flocor.properties.int()
    factor.doc = "the refinement factor"

    margin = flocor.properties.int()
    margin.doc = "the refinement margin"

    # inputs
    dataset = flocor.isce.protocols.slcDataset.input()
    dataset.doc = "the metadata of the reference SLC product"

    offsets = flocor.ampcor.protocols.arena.input()
    offsets.doc = "the correlation plan"

    # output
    tiles = flocor.ampcor.protocols.arena.output()
    tiles.doc = "the correlation plan"


# end of file
