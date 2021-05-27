# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved

# externals
import graphene
# package
import flocor

# local types
from .Slot import Slot
from .Label import Label
from .Position import Position
# the class that holds the new node metadata that is input to the mutation
from .NewNodeInput import NewNodeInput


# a mutation that adds a new node to the flow
class CreateProduct(graphene.Mutation):
    """
    A mutation that adds a new node to the flow
    """


    # inputs
    class Arguments:
        nodeinfo = NewNodeInput(required=True)


    # fields
    flow = graphene.ID()
    slot = graphene.Field(Slot, required=True)
    labels = graphene.List(graphene.NonNull(Label), required=True)


    def mutate(root, info, nodeinfo):
        # unpack the node info
        owner = nodeinfo["flow"]
        family = nodeinfo["family"]
        x = nodeinfo["x"]
        y = nodeinfo["y"]

        # get the panel
        panel = info.context["panel"]
        # and the diagram
        diagram = panel.diagram

        # make a {product}; we don't have a name for it yet
        product = flocor.flow.specification.pyre_resolveSpecification(spec=family)
        # add it to the diagram and get the new entities
        slot, labels = diagram.addProduct(product=product, position=(x,y))

        # build my payload and return it
        return CreateProduct(flow=owner, slot=slot, labels=labels)


# end of file
