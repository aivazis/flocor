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
from .Product import Product
from .Position import Position
# the class that holds the new node metadata that is input to the mutation
from .NewNodeInput import NewNodeInput


# a mutation that adds a new node to the flow
class CreateCalcVariable(graphene.Mutation):
    """
    A mutation that adds a new node to the flow
    """


    # inputs
    class Arguments:
        nodeinfo = NewNodeInput(required=True)


    # fields
    flow = graphene.ID()
    node = graphene.Field(Node, required=True)


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
        var = flocor.flows.var(family=family)
        # add it to the diagram
        product = diagram.addProduct(product=var, position=(x,y))

        # build a product rep
        rep = Product(id=product.guid, family=family, position=Position(x=x, y=y))

        print(f"diagram:")
        for _ in diagram.nodes.values():
            print(f"  {_}")

        # attach it to my payload and return it
        return CreateCalcVariable(flow=owner, node=rep)


# end of file
