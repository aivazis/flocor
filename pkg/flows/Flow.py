# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import uuid
# get the package
import flocor


# an undifferentiated flow
class Flow(flocor.flow.dynamic, family="flocor.flows.flow", implements=flocor.specs.flow):
    """
    An undifferentiated container for flow nodes
    """


# end of file
