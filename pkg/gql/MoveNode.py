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
from .Slot import Slot
# labels
from .Label import Label
# connectors
from .Connector import Connector
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
    flow = graphene.Field(type=Node, required=True)
    node = graphene.Field(type=Node, required=False, default_value=None)
    labels = graphene.List(graphene.NonNull(Label), required=True, default_value=[])
    connectors = graphene.List(graphene.NonNull(Connector), required=True, default_value=[])


    def mutate(root, info, nodeinfo):
        """
        Move a node to a new location
        """
        # unpack the node info
        owner = nodeinfo["flow"]
        id = nodeinfo["id"]
        x = nodeinfo["x"]
        y = nodeinfo["y"]

        # get the panel
        panel = info.context["panel"]
        # and the diagram
        diagram = panel.diagram
        # look up the moving node
        node = diagram.findNode(relay=id)
        # pack the new position
        position = x, y

        # if the node is already at this position
        if node.position == position:
            # nothing to do
            return MoveNode(flow=owner)

        # attempt to move the node; if the move is disallowed
        if not diagram.move(node=node, position=(x,y)):
            # bail without touching anything
            return MoveNode(flow=owner)

        # otherwise, make a pile of the node labels that require relocation
        labels = list(node.labels)

        # make a pile of the affected connectors
        connectors = list(node.connections())
        # go through them
        for connector in connectors:
            # and add their labels to the update pile
            labels.extend(connector.labels)

        # return the node info
        return MoveNode(flow=owner, node=node, labels=labels, connectors=connectors)


# end of file
