# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import uuid


# the base entity
class Node:
    """
    The base class for diagram entities
    """

    # constants
    typename = "Node"


    # metamethods
    def __init__(self, position, **kwds):
        # chain up
        super().__init__(**kwds)
        # all nodes have their own ids
        self.pyre_id = uuid.uuid1()
        # save the position
        self.position = position
        # all done
        return


    def __str__(self):
        # render my {typename} and my {uuid}
        return f"{self.typename} '{self.pyre_id}'"


# end of file
