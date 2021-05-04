# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved

# externals
import graphene
# package
import flocor

# the node interface
from .Node import Node
# local types
from .Factory import Factory
from .Position import Position
from .Slot import Slot
# connectors
from .Connector import Connector
# the class that holds the new node metadata that is input to the mutation
from .NewNodeInput import NewNodeInput


# a mutation that adds a new node to the flow
class CreateCalcOperator(graphene.Mutation):
    """
    A mutation that adds a new node to the flow
    """


    # inputs
    class Arguments:
        nodeinfo = NewNodeInput(required=True)


    # fields
    flow = graphene.ID()
    node = graphene.Field(Factory, required=True)
    slots = graphene.List(graphene.NonNull(Slot), required=True)
    connectors = graphene.List(graphene.NonNull(Connector), required=True)


    def mutate(root, info, nodeinfo):
        # unpack the node info
        owner = nodeinfo["flow"]
        family = nodeinfo["family"]
        x = nodeinfo["x"]
        y = nodeinfo["y"]

        # get the panel
        panel = info.context["panel"]
        # so we can grab the {flow}; we can use {owner} to do a consistency check that
        # the node is being added to the correct graph
        flow = panel.flow
        # grab the {layout}
        layout = panel.layout
        # and the connectivity matrix
        connectivity = panel.connectivity

        # make a {factory}; we don't have a name for it yet
        op = flocor.flows.operator(family=family)
        # get the inputs
        inputs = op.pyre_inputTraits
        # find out how many there are
        nInputs = len(inputs)
        # now, the outputs
        outputs = op.pyre_outputTraits
        # find out how many there are
        nOutputs = len(outputs)

        # add it to the flow
        flow.index[op.pyre_id] = op
        flow.factories.add(op)
        # and the layout
        layout[op.pyre_id] = {"x": x, "y": y}

        # build the representation of the factory
        # make a position
        position = Position(x=x, y=y)
        # make a factory node
        node = Factory(id=f"Factory:{op.pyre_id}", family=family,
                       inputs=nInputs, outputs=nOutputs,
                       position=position)

        # assemble the slots and their connectors
        # make a pile for slots
        slots = []
        # and one for connectors
        connectors = []

        # for each input
        for idx, trait in enumerate(inputs):
            # get the slot
            slot = op.pyre_inventory[trait]
            # get its id
            guid = slot.pyre_id
            # add it to the index
            flow.index[guid] = slot
            # if it's bound
            if slot._value is not None:
                # skip it
                continue
            # get its name
            name = trait.name
            # its family
            family = trait.typename
            # compute its coordinate
            sx = x -3
            sy = y + 2*idx + 1 - nInputs
            # add the node to the diagram layout
            layout[guid] = {"x": sx, "y": sy}
            # update the connectivity matrix
            connectivity[op.pyre_id][guid] = True
            connectivity[guid][op.pyre_id] = True
            # build its position rep
            slotPosition = Position(x=sx, y=sy)
            # build the rep
            slotRep = Slot(id=f"Slot:{guid}", name=name, family=family, position=slotPosition)
            # and add it to the pile
            slots.append(slotRep)
            # build the connector uid
            bid = f"Connector:{op.pyre_id}|{guid}"
            # build the connector rep
            connectorRep = Connector(id=bid, inp=True, factoryAt=position, productAt=slotPosition)
            # and add to its pile
            connectors.append(connectorRep)

        # for each output
        for idx, trait in enumerate(outputs):
            # get the slot
            slot = op.pyre_inventory[trait]
            # get its id
            guid = slot.pyre_id
            # add it to the index
            flow.index[guid] = slot
            # if it's bound
            if slot._value is not None:
                # skip it
                continue
            # get its name
            name = trait.name
            # its family
            family = trait.typename
            # form its coordinates
            sx = x + 3
            sy = y + 2*idx + 1 - nOutputs
            # add the slot to the diagram layout
            layout[guid] = {"x": sx, "y": sy}
            # update the connectivity matrix
            connectivity[op.pyre_id][guid] = False
            connectivity[guid][op.pyre_id] = False
            # build its position rep
            slotPosition = Position(x=sx, y=sy)
            # build the rep
            rep = Slot(id=f"Slot:{guid}", name=name, family=family, position=slotPosition)
            # and add it to the pile
            slots.append(rep)
            # build the connector uid
            bid = f"Connector:{op.pyre_id}|{guid}"
            # build the connector rep
            connectorRep = Connector(id=bid, inp=False, factoryAt=position, productAt=slotPosition)
            # and add to its pile
            connectors.append(connectorRep)

        # build the payload and return it
        return CreateCalcOperator(flow=owner, node=node, slots=slots, connectors=connectors)


# end of file
