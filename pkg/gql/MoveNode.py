# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved

# externals
import graphene
import uuid
# package
import flocor

# the node interface
from .Node import Node
# local types
# flow nodes
from .Factory import Factory
from .Product import Product
from .Slot import Slot
# basic types
from .Position import Position
# mutation payload
from .MoveNodeInput import MoveNodeInput


# a mutation that adds a new node to the flow
class MoveNode(graphene.Mutation):
    """
    A mutation that adds a new node to the flow
    """


    # inputs
    class Arguments:
        nodeinfo = MoveNodeInput(required=True)


    # fields
    node = graphene.Field(type=Node, required=True)


    def mutate(root, info, nodeinfo):
        import journal
        channel = journal.info("gql")

        # unpack the node info
        id = nodeinfo["id"]
        x = nodeinfo["x"]
        y = nodeinfo["y"]

        # get the panel
        panel = info.context["panel"]
        # and the flow {layout}
        layout = panel.layout
        # adjust the position of the node
        layout[id] = {"x": x, "y": y}

        # extract the type of the node
        type, _ = id.split(':')

        # buld the position
        position = Position(x=x, y=y)

        # build the correct return type; for products
        if type == "Product":
            # build a product
            node = Product(id=id, position=position)
        # for factories
        elif type == "Factory":
            # build a factory
            node = Factory(id=id, position=position)
        # for slots
        elif type == "Slot":
            # build a slot
            node = Slot(id=id, position=position)
        # anything else
        else:
            # get the journal
            import journal
            # make a channel
            channel = journal.firewall("flocor.gql.schema")
            # and complain
            channel.log(f"while moving node '{id}': unknown type '{type}")

        # return the node info
        return MoveNode(node=node)


# end of file
