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
class MoveNodeEnd(graphene.Mutation):
    """
    A mutation that adds a new node to the flow
    """


    # inputs
    class Arguments:
        nodeinfo = MoveNodeInput(required=True)


    # fields
    flow = graphene.ID()
    slot = graphene.Field(Slot, required=False)
    dead = graphene.ID()
    newLabels = graphene.List(graphene.NonNull(Label), default_value=[])
    delLabels = graphene.List(graphene.ID, default_value=[])
    updatedLabels = graphene.List(graphene.NonNull(Label), default_value=[])
    delConnectors = graphene.List(graphene.ID, default_value=[])
    newConnectors = graphene.List(graphene.NonNull(Connector), default_value=[])
    updatedConnectors = graphene.List(graphene.NonNull(Connector), default_value=[])


    def mutate(root, info, nodeinfo):
        """
        Move a node to a new location
        """
        # unpack the node info
        owner = nodeinfo["flow"]
        id = nodeinfo["id"]

        # get the panel
        panel = info.context["panel"]
        # and the diagram
        diagram = panel.diagram
        # look up the moving node
        node = diagram.findNode(relay=id)

        # resolve the move
        dead, deltaLabels, deltaConnectors = diagram.resolve(node=node)

        # if there was no collision
        if dead is None:
            # nothing further to do
            return MoveNodeEnd(flow=owner)

        # unpack the label deltas
        newLabels, delLabels, updatedLabels = deltaLabels
        # unpack the connector deltas
        newConnectors, delConnectors, updatedConnectors = deltaConnectors

        # the delete piles just need ids
        delLabelIds = [ label.relay for label in delLabels]
        delConnectorIds = [ connector.relay for connector in delConnectors]

        # all done
        return MoveNodeEnd(flow=owner, slot=node, dead=dead.relay,
            newLabels=newLabels, delLabels=delLabelIds, updatedLabels=updatedLabels,
            newConnectors=newConnectors, delConnectors=delConnectorIds,
            updatedConnectors=updatedConnectors)


    # debugging support
    def debug(self, node, dead, deltaLabels, deltaConnectors):
        """
        Show me the deltas that are about to be shipped to the client
        """
        # unpack the label deltas
        newLabels, delLabels, updatedLabels = deltaLabels
        # unpack the connector deltas
        newConnectors, delConnectors, updatedConnectors = deltaConnectors

        # the delete piles just need ids
        delLabelIds = [ label.relay for label in delLabels]
        delConnectorIds = [ connector.relay for connector in delConnectors]

        # debug
        print(f"MoveNodeEnd.mutate:")
        print(f"  slot: {node}")
        print(f"    product: {node.product}")
        print(f"  dead: {dead}")
        print(f"  labels:")
        print(f"    new: {[label.relay for label in newLabels]}")
        print(f"    deleted: {delLabelIds}")
        print(f"    updated: {[label.relay for label in updatedLabels]}")
        print(f"  connectors:")
        print(f"    new: {[connector.relay for connector in newConnectors]}")
        print(f"    deleted: {delConnectorIds}")
        print(f"    updated: {[connector.relay for connector in updatedConnectors]}")

        # all done
        return


# end of file
