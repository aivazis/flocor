# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# framework
import flocor
# superclass
from .Factory import Factory as factory


# compute the amplitude of the input signal arena
class Max(factory,
          family="flocor.ampcor.factories.analyzers.max",
          implements=flocor.ampcor.protocols.analyze):
    """
    Examine the correlation surface of two datasets and compute an offset map
    """


    # input
    gamma = flocor.ampcor.protocols.arena.input()
    gamma.doc = "the correlation surface"

    # output
    offsets = flocor.ampcor.protocols.arena.output()
    offsets.doc = "the offset map"


# end of file
