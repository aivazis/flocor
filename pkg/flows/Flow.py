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

    # factoriies
    def addFactory(self, node):
        """
        Add a new {node} to the set
        """
        # easy enough
        self.factories[node.pyre_id] = node
        # all done
        return


    def removeFactory(self, node):
        """
        Remove {node} from the environment
        """
        # discard from the node pile
        del self.factories[node]
        # and if it has a name
        if node.pyre_name in self.factories:
            # remove it from there as well
            del self.factories[node.pyre_name]
        # all done
        return


    # products
    def addProduct(self, node):
        """
        Add a new {node} to the set
        """
        # easy enough
        self.products[node.pyre_id] = node
        # all done
        return


    def removeProduct(self, node):
        """
        Remove {node} from the environment
        """
        # discard from the node pile
        del self.products[node]
        # and if it has a name
        if node.pyre_name in self.products:
            # remove it from there as well
            del self.products[node.pyre_name]
        # all done
        return


    # metamethods
    def __init__(self, **kwds):
        # chain up
        super().__init__(**kwds)
        # set my uuid
        self.pyre_id = uuid.uuid1()

        # initialize the sets of nodes
        self.factories = {}
        self.products = {}

        # all done
        return


# end of file
