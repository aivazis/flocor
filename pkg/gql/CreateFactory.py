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
# labels
from .Label import Label
# the class that holds the new node metadata that is input to the mutation
from .NewNodeInput import NewNodeInput


# a mutation that adds a new node to the flow
class CreateFactory(graphene.Mutation):
    """
    A mutation that adds a new node to the flow
    """


    # inputs
    class Arguments:
        nodeinfo = NewNodeInput(required=True)


    # fields
    flow = graphene.ID()
    factory = graphene.Field(Factory, required=True)
    slots = graphene.List(graphene.NonNull(Slot), required=True)
    labels = graphene.List(graphene.NonNull(Label), required=True)
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
        op = flocor.flow.producer.pyre_resolveSpecification(spec=family)
        # add it to the diagram and get the reps of the new entities
        factory, labels, slots, connectors = diagram.addFactory(factory=op, position=(x,y))

        # build the payload and return it
        return CreateFactory(flow=owner,
            factory=factory, slots=slots, labels=labels, connectors=connectors)


# end of file
