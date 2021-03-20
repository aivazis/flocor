# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import uuid
# get the package
import flocor


# an undifferentiated flow
class Flow(flocor.flow.workflow, family="flocor.flows.flow", implements=flocor.specs.flow):
    """
    An undifferentiated container for flow nodes
    """


    # metamethods
    def __init__(self, **kwds):
        # chain up
        super().__init__(**kwds)
        # set the uuid
        self.pyre_id = uuid.uuid1()
        # all done
        return


# end of file
