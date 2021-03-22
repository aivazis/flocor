# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import graphene
# local types
from .Position import Position
from .NodeInfoInput import NodeInfoInput


# a mutation that adds a new node to the flow
class CreateNode(graphene.Mutation):
    """
    A mutation that add a new node to the flow
    """

    # inputs
    class Arguments:
        nodeinfo = NodeInfoInput(required=True)

    # fields
    id = graphene.ID()
    position = graphene.Field(Position, required=True)


    def mutate(root, info, nodeinfo):
        # show me
        print(nodeinfo)
        # make a node and return it
        return CreateNode(id="foofoo", position=Position(x=0, y=0))


# end of file
