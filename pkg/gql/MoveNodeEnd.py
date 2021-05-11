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
    delLabels = graphene.List(graphene.ID, required=False, default_value=[])
    newLabels = graphene.List(graphene.NonNull(Label), required=True, default_value=[])
    delConnectors = graphene.List(graphene.ID, required=False, default_value=[])
    newConnectors = graphene.List(graphene.NonNull(Connector), required=True, default_value=[])


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
        _, nodeid = id.split(":")
        # convert the string into a {uuid}
        guid = uuid.UUID(hex=nodeid)
        # look up the moving node
        node = diagram.nodes[guid]
        # pack the new position of the node
        here = (x, y)

        # do the move
        target, connections, targetLabels = diagram.move(node=node, position=here)

        # if there was no collision
        if target is None:
            # nothing further to do
            return MoveNodeEnd(flow=owner)

        # did the node just get bound
        bound = node.product is not None
        # build a rep for the current position
        here = Position(x=x, y=y)
        # build a rep with any updates to the slot
        slot = Slot(id=id, bound=bound, position=here)
        # the {target} is always the node that gets discarded
        deadnode = target.guid

        # make a pile for the new labels of the survivor
        newLabels = []
        # and a pile for the discarded labels of the dead node
        delLabels = []

        # if the dying node has a non trivial label
        for label in targetLabels:
            # get the label id
            lid = label["id"]
            # its id has to go to the discard pile
            delLabels.append(lid)
            # replace the target id with the survivor's id and attach it to the label
            label["id"] = lid.replace(str(target.pyre_id), str(node.pyre_id))
            # build a rep for its position
            label["position"] = Position(*label["position"])
            # and one for the new label
            newLabelRep = Label(**label)
            # add the rep to the pile
            newLabels.append(newLabelRep)

        # make a pile for the new connectors of the survivor
        newConnectors = []
        # and a pile for the discarded connectors of the dead node
        delConnectors = []

        # go through the {target} connections
        for factory, trait in connections:
            # look up the factory position
            fx, fy = factory.position
            # build a rep for it
            fpos = Position(x=fx, y=fy)
            # make an id for the new connector
            nuid = f"Connector:{factory.pyre_id}|{node.pyre_id}"
            # so we can build a rep for it
            nrep = Connector(id=nuid, inp=trait.input, factoryAt=fpos, slotAt=here)
            # and add it to the pile
            newConnectors.append(nrep)
            # now, make an id for the discarded connector
            duid = f"Connector:{factory.pyre_id}|{target.pyre_id}"
            # and add it to the pile
            delConnectors.append(duid)

        # all done
        return MoveNodeEnd(flow=owner, slot=slot, dead=deadnode,
            newLabels=newLabels, delLabels=delLabels,
            newConnectors=newConnectors, delConnectors=delConnectors)


# end of file
