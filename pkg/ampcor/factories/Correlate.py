# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# framework
import flocor
# superclass
from .Factory import Factory as factory


# the correlation surface
class Correlate(factory,
                family="flocor.ampcor.factories.correlators.correlate",
                implements=flocor.ampcor.protocols.correlate):
    """
    Generate the correlation surface {gamma} between a {reference} and a {secondary} arena
    """


    # inputs
    reference = flocor.ampcor.protocols.arena.input()
    reference.doc = "the metadata of the reference SLC product"

    secondary = flocor.ampcor.protocols.arena.input()
    secondary.doc = "the metadata of the reference SLC product"

    # output
    gamma = flocor.ampcor.protocols.arena.output()
    gamma.doc = "the correlation plan"


# end of file
