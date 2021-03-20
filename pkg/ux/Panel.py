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


# end of file
