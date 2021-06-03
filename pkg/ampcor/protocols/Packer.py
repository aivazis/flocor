# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# framework
import flocor
# superclass
from .Producer import Producer as producer
# protocols
from .Arena import Arena as arena
from .CorrelationPlan import CorrelationPlan as correlationPlan


# protocol for describing maps
class Packer(producer, family="flocor.ampcor.factories.packers"):
    """
    Produce a densely packed arena of tiles given a correlation plan and an SLC dataset
    """


    # inputs
    dataset = flocor.isce.protocols.slcDataset.input()
    dataset.doc = "the metadata of the reference SLC product"

    plan = correlationPlan.input()
    plan.doc = "the correlation plan"

    # output
    tiles = arena.output()
    tiles.doc = "the correlation plan"


    # framework hooks
    @classmethod
    def pyre_default(cls, **kwds):
        """
        Provide access to the reference implementation
        """
        # the default is a uniform grid
        return flocor.ampcor.factories.packer


# end of file
