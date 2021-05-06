# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# the nodes
from .Factory import Factory
from .Slot import Slot


# flow graph entities and their layout
class Diagram:
    """
    The server side representation of the flow diagram
    """


    # interface
    def addFactory(self, factory, position):
        """
        Add a product to the flow
        """
        # put it in the flow
        self.flow.factories.add(factory)
        # build a rep
        rep = Factory(factory=factory, position=position)
        # add it to the pile
        self.factories.add(rep)
        # and the index
        self.nodes[rep.pyre_id] = rep

        # go through the slots
        for slot in rep.slots.values():
            # add each one to my pile
            self.slots.add(slot)
            # and to the node index
            self.nodes[slot.pyre_id] = slot

        # check and resolve collisions
        # all done
        return rep


    def addProduct(self, product, position):
        """
        Add a product to the flow
        """
        # put it in the flow
        self.flow.products.add(product)
        # build a rep
        rep = Slot(product=product, position=position)
        # add it to the pile
        self.slots.add(rep)
        # and the index
        self.nodes[rep.pyre_id] = rep

        # check and resolve collisions
        # all done
        return rep


    # event handlers
    def mayMove(self, node, position):
        """
        Predicate that checks whether {position} is allowable for {node}
        """
        # go through all known nodes
        for target in self.nodes.values():
            # looking for potential collisions with other nodes
            if target.position == position and target is not node:
               # if there is one, just stop looking
               break
        # if there is no collision
        else:
            # record that this {position} is collision free
            self.contact = None, position
            # update the position of the node
            node.position = position
            # and mark the move as allowable
            return True

        # we have a collistion
        self.contact = target, position

        # if either node is a factory
        if isinstance(node, Factory) or isinstance(target, Factory):
            # the move is disallowed
            return False

        # if both are products
        if node.product is not None and target.product is not None:
            # the move is disallowed
            return False

        # update the position of the node
        node.position = position
        # otherwise, we are ok; let the caller know
        return True


    def move(self, node, position):
        """
        Place {node} at {position}, carrying out any allowable side effects
        """
        # check whether there is a recorded collision at {position}
        target, tpos = self.contact
        # clear it; it all gets handled here
        self.contact = None, ()
        # if there is no collision
        if target is None:
            # there's nothing to do
            return None, ()
        # verify that the collision check is fresh
        if tpos != position:
            # if not, {move} was called before {mayMove}
            import journal
            # let's treat this as a bug, for now
            channel = journal.firewall("flocor.gql.diagram")
            # complain
            channel.line(f"while moving {node} to {position}:")
            channel.line(f"collision with {target} at {tpos}")
            channel.log(f"but the positions do not match")
            # bail, just in case firewalls aren't fatal
            return

        # update my indices
        # clean up the node index
        del self.nodes[target.pyre_id]
        # remove it from the pile of slots
        self.slots.discard(target)

        # merge the nodes and hand the caller {target} and its old connections
        return node.merge(other=target)


    # metamethods
    def __init__(self, flow=None, **kwds):
        # chain up
        super().__init__(**kwds)
        # my flow
        self.flow = flow if flow is not None else flocor.flow.dynamic()

        # the entries
        self.factories = set()
        self.slots = set()

        # a map from ids to nodes
        self.nodes = {}

        # all done
        return


# end of file
