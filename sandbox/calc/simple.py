#! /usr/bin/env python3
# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import itertools
import uuid
# framework
import flocor


class Position:

    # public data
    x = 0
    y = 0

    # metamethods
    def __init__(self, x, y, **kwds):
        # chain up
        super().__init__(**kwds)
        # store the coordinates
        self.x = x
        self.y = y
        # all done
        return

class Node:
    """
    The base class for diagram entities
    """

    # metamethods
    def __init__(self, position, **kwds):
        # chain up
        super().__init__(**kwds)
        # save the position
        self.position = position
        # all done
        return


class Factory(Node):
    """
    The representation of a factory
    """

    # metamethods
    def __init__(self, factory, **kwds):
        # chain up
        super().__init__(**kwds)
        # save my product
        self.factory = factory
        # all done
        return

class Product(Node):
    """
    The representation of a product
    """

    # metamethods
    def __init__(self, product, **kwds):
        # chain up
        super().__init__(**kwds)
        # save my product
        self.product = product
        # all done
        return


class Slot(Node):
    """
    The representation of a factory slot
    """

    # metamethods
    def __init__(self, name, factory, input=True, product=None, **kwds):
        # chain up
        super().__init__(**kwds)
        # slots need ids because they don't naturally pick one up from the framework
        self.pyre_id = uuid.uuid1()
        # save my factory
        self.factory = factory
        # and my name
        self.name = name
        # my direction
        self.input = input
        # attach the product i'm bound to; {None} if the slot is free
        self.product = product
        # all done
        return


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
        self.nodes[factory.pyre_id] = rep

        # make slots; i need to remember them...
        # self.addSlots(factory=rep, traits=factory.pyre_inputTraits, input=True)
        # self.addSlots(factory=rep, traits=factory.pyre_outputTraits, input=False)

        # check and resolve collisions; should they be treated as accidental for something
        # as complicated as a factory?
        # compute and return the connectivity of the new node
        # all done
        return

    def addProduct(self, product, position):
        """
        Add a product to the flow
        """
        # put it in the flow
        self.flow.products.add(product)
        # build a rep
        rep = Product(product=product, position=position)
        # add it to the pile
        self.products.add(rep)
        # and the index
        self.nodes[product.pyre_id] = rep

        # check and resolve collisions
        # compute and return the connectivity of the new node
        # all done
        return


    # event handlers
    def mayMove(self, node, position):
        """
        Predicate that checks whether {position} is allowable for {node}
        """

    def move(self, node, position):
        """
        Place {node} at {position}
        """

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

        # all done
        return


# the driver
def simple():
    """
    Build a simple flow
    """
    # make a dynamic workflow
    flow = flocor.flow.dynamic(name="simple")
    # make a diagram with the flow
    diagram = Diagram(flow=flow)

    # build a couple of inputs
    a = flocor.flows.var(family="int")
    b = flocor.flows.var(family="int")
    # and a place to store the answer
    r = flocor.flows.var(family="int")
    # add them all to the diagram
    diagram.addProduct(product=a, position=Position(x=0, y=0))
    diagram.addProduct(product=b, position=Position(x=0, y=0))
    diagram.addProduct(product=r, position=Position(x=1, y=8))

    # build a factory
    plus = flocor.flows.operator(family="add")
    # add it to the diagram
    diagram.addFactory(factory=plus, position=Position(x=1, y=4))

    # bind
    # setattr(slot.factory, slot.name, product)
    setattr(plus, "op1", a)
    setattr(plus, "op2", b)
    setattr(plus, "value", r)
    # plus.op1 = a
    # plus.op2 = b
    # plus.value = r

    # show me
    # set some values
    a.value = 1
    b.value = 2
    print(f"{a.value} + {b.value} = {r.pyre_make().value}")
    # and again
    a.value = 2
    print(f"{a.value} + {b.value} = {r.pyre_make().value}")

    return 0


# bootstrap
if __name__ == "__main__":
    # invoke the driver
    status = simple()
    # and share the status with the shell
    raise SystemExit(status)


# end of file
