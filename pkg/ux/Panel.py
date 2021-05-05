# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import re
# support
import flocor


# application engine
class Panel(flocor.shells.command, family="flocor.cli.ux"):
    """
    Select application behavior that is specialized to the capabilities of the web client
    """


    # user configurable state
    flow = flocor.specs.flow()
    flow.doc = "the workflow to interact with"


    # metamethods
    def __init__(self, **kwds):
        # chain up
        super().__init__(**kwds)
        # wrap a diagram on my {flow}
        self.diagram = flocor.diagram.diagram(flow=self.flow)
        # initialize the graph layout
        self.layout = {}
        # and the connectors
        self.connectivity = flocor.patterns.vivify(levels=2, atom=bool)
        # we also provide a place to park the last known good position of whatever node is moving
        self.lastpos = None
        # all done
        return


# end of file
