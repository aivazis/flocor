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
        # extract the type of the node and its {pyre_id}
        typename, nodeid = id.split(":")
        # convert the string into a {uuid}
        guid = uuid.UUID(hex=nodeid)
        # look up the moving node
        node = diagram.nodes[guid]

        # if the move is illegal
        if not diagram.mayMove(node=node, position=(x,y)):
            # bail without touching anything
            return MoveNode(flow=owner)

        # build the new position rep to return to the client
        here = Position(x=x, y=y)
        # deduce the correct return type; for factories
        if typename == "Factory":
            # build a factory
            rep = Factory(id=id, position=here)
        # for slots
        elif typename == "Slot":
            # build a slot
            rep = Slot(id=id, position=here)
        # anything else
        else:
            # is a problem
            import journal
            # that's almost certainly a bug
            channel = journal.firewall("flocor.gql.schema")
            # and complain
            channel.log(f"while moving node '{id}': unknown type '{typename}")
            # and, just in case firewalls are not fatal, send an empty result back
            return MoveNodeEnd(flow=owner)

        # make a pile of connectors
        connectors = []
        # go through the connections of the node
        for factory, trait, slot in node.connections:
            # deduce the direction of the connector
            direction = trait.input
            # if the factory is moving
            if factory is node:
                # then its position is here
                fpos = here
            # otherwise
            else:
                # unpack the factory position
                fx, fy = factory.position
                # and build a rep
                fpos = Position(x=fx, y=fy)
            # if the slot is moving
            if slot is node:
                # then its position is here
                spos = here
            # otherwise
            else:
                # unpack the slot position
                sx, sy = slot.position
                # and build a rep
                spos = Position(x=sx, y=sy)
            # assemble the connector id
            buid = f"Connector:{factory.pyre_id}|{slot.pyre_id}"
            # build a rep for the connector
            brep = Connector(id=buid, inp=direction, factoryAt=fpos, productAt=spos)
            # and add it to the pile
            connectors.append(brep)

        # return the node info
        return MoveNode(flow=owner, node=rep, connectors=connectors)


# end of file
