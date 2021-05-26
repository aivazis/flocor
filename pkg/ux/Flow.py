# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import weakref
# package
import flocor


# an undifferentiated flow
class Flow(flocor.flow.dynamic, family="flocor.flows.flow"):
    """
    An undifferentiated container for flow nodes
    """


    # metamethods
    def __init__(self, **kwds):
        # chain up
        super().__init__(**kwds)
        # build an index that maps a {pyre_id} to the corresponding {flow} node
        self.index = weakref.WeakValueDictionary()
        # all done
        return


# end of file
