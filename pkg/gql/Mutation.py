# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import graphene

# the mutations
from .MoveNode import MoveNode
from .CreateCalcVariable import CreateCalcVariable


# the mutation anchor
class Mutation(graphene.ObjectType):
    """
    The mutation registrar
    """

    # mutations that add calc nodes to a flow
    addCalcVariable = CreateCalcVariable.Field()


    # move an existing node
    moveNode = MoveNode.Field()


# end of file
