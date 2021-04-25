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
    node = graphene.Field(Node, required=True)
    slots = graphene.List(graphene.NonNull(Node), required=True)


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
        # and its {layout}
        layout = panel.layout

        # make a {factory}; we don't have a name for it yet
        op = flocor.flows.operator(family=family)
        # add it to the flow
        flow.factories.add(op)
        # and the layout
        layout[op.pyre_id] = {"x": x, "y": y}

        # build the representation of the factory
        # make a position
        position = Position(x=x, y=y)
        # make a factory node
        node = Factory(id=f"Factory:{op.pyre_id}", family=family, position=position)

        # assemble the slots
        # make a pile
        slots = []
        # go through the inputs
        inputs = op.pyre_inputTraits
        # find out how many there are
        nInputs = len(inputs)
        # for each input
        for idx, trait in enumerate(inputs):
            # get the slot
            slot = op.pyre_inventory[trait]
            # if it's bound
            if slot._value is not None:
                # skip it
                continue
            # otherwise, get its id
            guid = slot.pyre_id
            # its name
            name = trait.name
            # its family
            family = trait.typename
            # compute its coordinate
            sx = x -3
            sy = y + 2*idx + 1 - nInputs
            # add the node to the diagram layout
            layout[guid] = {"x": sx, "y": sy}
            # build its position rep
            position = Position(x=sx, y=sy)
            # build the rep
            rep = Slot(id=f"Slot:{guid}", name=name, family=family, position=position)
            # and add it to the pile
            slots.append(rep)
        # now, the outputs
        outputs = op.pyre_outputTraits
        # find out how many there are
        nOutputs = len(outputs)
        # for each one
        for idx, trait in enumerate(outputs):
            # get the slot
            slot = op.pyre_inventory[trait]
            # if it's bound
            if slot._value is not None:
                # skip it
                continue
            # otherwise, get its id
            guid = slot.pyre_id
            # its name
            name = trait.name
            # its family
            family = trait.typename
            # form its coordinates
            sx = x + 3
            sy = y + 2*idx + 1 - nOutputs
            # add the slot to the diagram layout
            layout[guid] = {"x": sx, "y": sy}
            # build its position rep
            position = Position(x=sx, y=sy)
            # build the rep
            rep = Slot(id=f"Slot:{guid}", name=name, family=family, position=position)
            # and add it to the pile
            slots.append(rep)

        # build the payload an return it
        return CreateCalcOperator(flow=owner, node=node, slots=slots)


# end of file
