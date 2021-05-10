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


    # public data
    @property
    def guid(self):
        # build a {relay} node id
        return f"{self.typename}:{self.pyre_id}"


    # metamethods
    def __init__(self, name=None, position, **kwds):
        # chain up
        super().__init__(**kwds)
        # all nodes have their own ids
        self.pyre_id = uuid.uuid1()
        # record my name
        self.name = name
        # save the position
        self.position = position
        # all done
        return


    def __str__(self):
        # build my name
        name = f" {self.name}" if self.name is not None else ""
        # render my {typename} and my {uuid}
        return f"{self.typename}{name} '{self.pyre_id}'"


# end of file
