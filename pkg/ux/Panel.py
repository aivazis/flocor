# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import re
# support
import flocor
# the local flow implementation
from .Flow import Flow


# application engine
class Panel(flocor.shells.command, family="flocor.cli.ux"):
    """
    Select application behavior that is specialized to the capabilities of the web client
    """


    # user configurable state
    flow = flocor.flow.flow(default=Flow)
    flow.doc = "the workflow to interact with"


    # metamethods
    def __init__(self, **kwds):
        # chain up
        super().__init__(**kwds)
        # wrap a diagram over my {flow}
        self.diagram = flocor.diagram.diagram(flow=self.flow)
        # all done
        return


# end of file
