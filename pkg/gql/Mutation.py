# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import graphene

# the mutations
from .CreateNode import CreateNode
from .MoveNode import MoveNode


# the mutation anchor
class Mutation(graphene.ObjectType):
    """
    The mutation registrar
    """

    # add a new node to the flow
    createNode = CreateNode.Field()
    # move an existing node
    moveNode = MoveNode.Field()


# end of file
