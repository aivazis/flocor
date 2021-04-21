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


    def addNode(self, node):
        """
        Add a new {node} to the set
        """
        # easy enough
        self.nodes[node.pyre_id] = node
        # all done
        return


    def nameNode(self, node):
        """
        Attach a name to {node}
        """
        # make an entry for {node} in my table
        self.nodes[node.pyre_name] = node
        # all done
        return


    def removeNode(self, node):
        """
        Remove {node} from the environment
        """
        # discard from the node pile
        del self.nodes[node]
        # and if it has a name
        if node.pyre_name in self.nodes:
            # remove it from there as well
            del self.nodes[node.pyre_name]
        # all done
        return


    # metamethods
    def __init__(self, **kwds):
        # chain up
        super().__init__(**kwds)
        # set my uuid
        self.pyre_id = uuid.uuid1()

        # initialize the set of nodes
        self.nodes = {}

        # all done
        return


# end of file
