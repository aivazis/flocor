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
        # the flow
        flow = panel.flow
        # its {layout}
        layout = panel.layout
        # and the connectivity matrix
        connectivity = panel.connectivity

        # extract the type of the node and its {pyre_id}
        typename, nodeid = id.split(":")
        # convert the string into a {uuid}
        guid = uuid.UUID(hex=nodeid)

        # collision check: go through all the known nodes
        for nid, loc in layout.items():
            # look for one that occupies my cell
            if nid != guid and loc["x"] == x and loc["y"] == y:
                # look up the moving node
                moving = flow.index[guid]
                # and the stationary target
                target = flow.index[nid]
                # the only supported combination is when one is a product and the other a slot
                # so if {moving} is a factory
                if isinstance(moving, flocor.flows.factory):
                    # bail
                    return MoveNode(flow=owner)
                # if {target} is a factory
                if isinstance(target, flocor.flows.factory):
                    # bail
                    return MoveNode(flow=owner)
                # if {moving} is a product
                if isinstance(moving, flocor.flows.product):
                    # and {target} is also a product
                    if isinstance(target, flocor.flows.product):
                        # bail
                        return MoveNode(flow=owner)
                    # move on
                    break
                # if {moving} is a slot
                if isinstance(moving, flocor.flows.slot):
                    # and {target} is also a slot
                    if isinstance(target, flocor.flows.slot):
                        # bail
                        return MoveNode(flow=owner)
                    # move on
                    break
        # if the search yielded no collisions
        else:
            # this must be a safe spot for this node
            panel.lastpos = (x, y)

        # use it to update the position of the moving node
        layout[guid] = {"x": x, "y": y}
        # and build the new position rep to return to the client
        position = Position(x=x, y=y)

        # make a pile of connectors
        connectors = []

        # deduce the correct return type; for products
        if typename == "Product":
            # build a product
            node = Product(id=id, position=position)
            # go through the factories i'm connected to
            for fuid, direction in connectivity[guid].items():
                # look up the factory position
                fpos = layout[fuid]
                # build a rep for it
                frep = Position(x=fpos["x"], y=fpos["y"])
                # assemble the connector id
                buid = f"Connector:{fuid}|{guid}"
                # build a rep for the connector
                brep = Connector(id=buid, inp=direction, factoryAt=fpos, productAt=position)
                # and add it to the pile
                connectors.append(brep)
        # for factories
        elif typename == "Factory":
            # build a factory
            node = Factory(id=id, position=position)
            # go through the products and slots i'm connected to
            for nuid, direction in connectivity[guid].items():
                # look up the node position
                npos = layout[nuid]
                # build a rep for it
                nrep = Position(x=npos["x"], y=npos["y"])
                # assemble the connector id
                buid = f"Connector:{guid}|{nuid}"
                # build a rep for the connector
                brep = Connector(id=buid, inp=direction, factoryAt=position, productAt=npos)
                # and add it to the pile
                connectors.append(brep)
        # for slots
        elif typename == "Slot":
            # build a slot
            node = Slot(id=id, position=position)
            # go through the factories i'm connected to
            for fuid, direction in connectivity[guid].items():
                # look up the factory position
                fpos = layout[fuid]
                # build a rep for it
                frep = Position(x=fpos["x"], y=fpos["y"])
                # assemble the connector id
                buid = f"Connector:{fuid}|{guid}"
                # build a rep for the connector
                brep = Connector(id=buid, inp=direction, factoryAt=fpos, productAt=position)
                # and add it to the pile
                connectors.append(brep)
        # anything else
        else:
            # get the journal
            import journal
            # make a channel
            channel = journal.firewall("flocor.gql.schema")
            # and complain
            channel.log(f"while moving node '{id}': unknown type '{typename}")
            # and, just in case firewalls are not fatal, send an empty result back
            return MoveNodeEnd(flow=owner)

        # return the node info
        return MoveNode(flow=owner, node=node, connectors=connectors)


# end of file
