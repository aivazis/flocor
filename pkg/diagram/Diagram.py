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
        # record its location
        self.layout[rep.position] = rep

        # go through the slots
        for slot in rep.slots.values():
            # add each one to my pile
            self.slots.add(slot)
            # and to the node index
            self.nodes[slot.pyre_id] = slot
            # place it in the diagram
            self.layout[slot.position] = slot

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
        self.products.add(rep)
        # and the index
        self.nodes[rep.pyre_id] = rep
        # record its location
        self.layout[rep.position] = rep

        # check and resolve collisions
        # compute and return the connectivity of the new node
        # all done
        return rep


    # event handlers
    def mayMove(self, node, position):
        """
        Predicate that checks whether {position} is allowable for {node}
        """
        # attempt to
        try:
            # get the node at that position
            target = self.layout[position]
        # if there isn't one
        except KeyError:
            # the position is good
            self.lastpos = position
            # and the move is allowed
            return True

        # we have a collision; if either node is a factory
        if isinstance(node, Factory) or isinstance(target, Factory):
            # the move is disallowed
            return False

        # if both are products
        if node.product is not None and  target.product is not None:
            # the move is disallowed
            return False

        # otherwise, we are ok; mark the new location as accessible
        self.lastpost = position
        # and let the caller know
        return True


    def move(self, node, position):
        """
        Place {node} at {position}, carrying out any allowable side effects
        """
        # check whether
        try:
            # there is a node occupying {position}
            target = self.layout[position]
        # if there isn't
        except KeyError:
            # perfect; nothing to do
            target = None
            connections = ()
        # if there is
        else:
            # we have cleaning up to do; remove the target from my {nodes}
            del self.nodes[target.pyre_id]

            # if {target} is a product
            if target.product is not None:
                # remove it from the pile of products
                self.products.discard(target)
                # go through all the factory traits that are resting on {node}
                for factory, trait in node.connectors:
                    # bind them to the {target} product
                    setattr(factory, trait.name, target.product)
            # if target is a slot
            else:
                # remove it from the pile of slots
                self.slots.discard(target)

            # if node is a product
            if node.product is not None:
                # go through all the factory traits that are resting on {target}
                for factory, trait in target.connectors:
                    # bind them to the {node} product
                    setattr(factory.factory, trait.name, node.product)

            # save the {target} connections
            connections = tuple(target.connections)
            # merge the two nodes; this clears the connectivity info in {other}, so do it late
            node.merge(target)

        # in any case, update the layout
        del self.layout[node.position]
        self.layout[position] = node
        # move the {node} there
        node.position = position
        # clear the last known good position
        self.lastpos = None
        # and done
        return target, connections


    # metamethods
    def __init__(self, flow=None, **kwds):
        # chain up
        super().__init__(**kwds)
        # my flow
        self.flow = flow if flow is not None else flocor.flow.dynamic()

        # the entries
        self.factories = set()
        self.products = set()
        self.slots = set()

        # a map from ids to nodes
        self.nodes = {}
        # a map from diagram coordinates to nodes
        self.layout = {}

        # a tracker of the last position we have verified as collision free
        self.lastpos = None

        # all done
        return


# end of file
