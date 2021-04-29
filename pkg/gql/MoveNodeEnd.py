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
class MoveNodeEnd(graphene.Mutation):
    """
    A mutation that adds a new node to the flow
    """


    # inputs
    class Arguments:
        nodeinfo = MoveNodeInput(required=True)


    # fields
    flow = graphene.ID()
    node = graphene.Field(type=Node, required=False, default_value=None)
    dead = graphene.Field(type=Slot, required=False, default_value=None)
    connectors = graphene.List(graphene.NonNull(Connector), required=True, default_value=[])
    new = graphene.List(graphene.NonNull(Connector), required=True, default_value=[])
    discard = graphene.List(graphene.NonNull(Connector), required=True, default_value=[])


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

        # collision check:
        # N.B.: all illegal collisions are rejected while the node is moving; our only
        #       job here is to detect collisions that result in topological changes to the
        #       diagram and handle them
        # go through all the known nodes
        for nid, loc in layout.items():
            # look for one that occupies my cell
            if nid != guid and loc["x"] == x and loc["y"] == y:
                # got it; stop looking
                break
        # if the search yielded no collisions
        else:
            # nothing further to do
            return MoveNodeEnd(flow=owner)

        # look up the moving node
        moving = flow.index[guid]
        # and the stationary target
        target = flow.index[nid]

        # if the merge is disallowed
        if False:
            # get the moving node's last known good location
            x, y = panel.lastpos
            # use it to update the layout
            layout[guid] = {"x" : x, "y" : y}
            # build a rep for it
            position = Position(x=x, y=y)
            # if the moving node is a product
            if isinstance(moving, flocor.flows.product):
                # build a product rep
                node = Product(id=id, position=position)
            # if it's a slot
            elif isinstance(moving, flocor.flows.slot):
                # build a slot rep
                node = Slot(id=id, position=position)
            # otherwise
            else:
                # get the journal
                import journal
                # make a channel
                channel = journal.firewall("flocor.gql.schema")
                # and complain
                channel.log(f"while moving node '{id}': unknown type '{typename}")
                # and, just in case firewalls are not fatal, send an empty result back
                return MoveNodeEnd(flow=owner)
            # adjust the connectors
            connectors = []
            # by going through all the factories the moving node is connected to
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
            # build the payload and return it
            return MoveNodeEnd(flow=owner, node=node, connectors=connectors)

        # time to bind...
        # binding means:
        # - one of the two nodes is removed from the diagram
        # - all of its connectors have to be removed as well
        # - the surviror gets the all the connectors of the dead node
        #  pick the surviror
        # if the target is a product
        if isinstance(target, flocor.flow.product):
            # it is the survivor
            survivor = target
            # and the moving node dies
            dead = moving
        # otherwise
        else:
            # the reverse
            survivor = moving
            dead = target

        # build a rep for the position of the survivor
        position = Position(x=x, y=y)
        # we need a node for the survivor; if it's a product
        if isinstance(survivor, flocor.flow.product):
            # make a product rep
            node = Product(id=f"Product:{survivor.pyre_id}", position=position)
        # otherwise
        else:
            print("what what?")
            # make a slot rep
            node = Slot(id=f"Slot:{survivor.pyre_id}", position=position)
        # the dead guy is always a slot, for now
        deadnode = Slot(id=f"Slot:{dead.pyre_id}", position=Position(**layout[dead.pyre_id]))

        # the survivor gets to keep his connectors
        connectors = []
        """
        # go through all the factories the survivor is connected to
        for fuid, direction in connectivity[survivor.pyre_id].items():
            # look up the factory position
            fpos = layout[fuid]
            # build a rep for it
            frep = Position(x=fpos["x"], y=fpos["y"])
            # assemble the connector id
            buid = f"Connector:{fuid}|{survivor.pyre_id}"
            # build a rep for the connector
            brep = Connector(id=buid, inp=direction, factoryAt=fpos, productAt=position)
            # and add it to the pile
            connectors.append(brep)
            """

        # make a pile for the new connectors of the survivor
        new = []
        # and a pile for the discarded connectors of the dead node
        discard = []
        # go through all the factories the dead is connected to
        for fuid, direction in connectivity[dead.pyre_id].items():
            # look up the factory position
            fpos = layout[fuid]
            # build a rep for it
            frep = Position(x=fpos["x"], y=fpos["y"])
            # make a connector id for the new connector
            nuid = f"Connector:{fuid}|{survivor.pyre_id}"
            # build a rep for the connector
            nrep = Connector(id=nuid, inp=direction, factoryAt=fpos, productAt=position)
            # and add it to the pile
            new.append(nrep)
            # make a connector id for the discarded connector
            duid = f"Connector:{fuid}|{dead.pyre_id}"
            # build a rep for the connector
            drep = Connector(id=duid, inp=direction, factoryAt=fpos, productAt=position)
            # and add it to the pile
            discard.append(drep)

        return MoveNodeEnd(flow=owner, node=node, connectors=connectors,
                           dead=deadnode, new=new, discard=discard)


# end of file
