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
        # and its diagram
        diagram = panel.diagram

        # make a {factory}; we don't have a name for it yet
        op = flocor.flows.operator(family=family)
        # add it to the diagram and get its rep
        factory = diagram.addFactory(factory=op, position=(x,y))

        # get the guid
        guid = factory.guid
        # name
        name = factory.factory.pyre_name
        # family
        family = factory.factory.pyre_family()
        # arity
        inputs = factory.inputs
        outputs = factory.outputs
        # make a rep for the factory position
        position = Position(x=x, y=y)
        # and for the factory itself
        node = Factory(id=guid, name=name, family=family,
                       inputs=inputs, outputs=outputs,
                       position=position)

        # assemble the slots and their connectors
        # make a pile for slots
        slots = []
        # and one for connectors
        connectors = []

        # go through the slots, and for each one
        for slot in factory.slots.values():
            # build a position rep
            slotAt = Position(*slot.position)
            # and one for the slot itself
            rep = Slot(id=slot.guid, position=slotAt)
            # and add it to the pile
            slots.append(rep)

            # now, each slot has a pile of connections; this is a new factory, so it is
            # certain that each slot has only one connection to the factory we just added;
            # what we don't know is whether this is an input or an output slot; so do it right...
            # go through the connetors
            for client, trait in slot.connectors:
                # make an id
                cuid = f"Connector:{client.pyre_id}|{slot.pyre_id}"
                # and a rep for the factory position
                factoryAt = Position(*client.position)
                # deduce the direction
                direction = trait.input
                # build the connetor rep
                rep = Connector(id=cuid, inp=direction, factoryAt=factoryAt, productAt=slotAt)
                # and add it to the pile
                connectors.append(rep)

        # build the payload and return it
        return CreateCalcOperator(flow=owner, node=node, slots=slots, connectors=connectors)


# end of file
