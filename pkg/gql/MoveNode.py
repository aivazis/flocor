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

        # extract the type of the node and its {pyre_id}
        typename, nodeid = id.split(":")
        # convert the string into a {uuid}
        guid = uuid.UUID(hex=nodeid)
        # use it to adjust the position of the node
        layout[guid] = {"x": x, "y": y}
        # and build the new position to return to the client
        position = Position(x=x, y=y)

        # deduce the correct return type; for products
        if typename == "Product":
            # build a product
            node = Product(id=id, position=position)
        # for factories
        elif typename == "Factory":
            # build a factory
            node = Factory(id=id, position=position)
        # for slots
        elif typename == "Slot":
            # build a slot
            node = Slot(id=id, position=position)
        # anything else
        else:
            # get the journal
            import journal
            # make a channel
            channel = journal.firewall("flocor.gql.schema")
            # and complain
            channel.log(f"while moving node '{id}': unknown type '{typename}")

        # return the node info
        return MoveNode(node=node)


# end of file
