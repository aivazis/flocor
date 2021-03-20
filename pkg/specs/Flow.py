# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# get the package
import flocor


# a workflow protocol that anchors the family name so flocor flows are discoverable
class Flow(flocor.flow.flow, family="flocor.flows"):
    """
    The workflow protocol
    """


    # framework hooks
    @classmethod
    def pyre_default(cls, **kwds):
        """
        Provide a default implementation
        """
        # use the base undifferentiated flow when we don't know any better
        return flocor.flows.flow()


# end of file
