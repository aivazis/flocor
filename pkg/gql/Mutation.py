# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import graphene

# the mutations
# adding calc nodes to the flow
from .CreateCalcOperator import CreateCalcOperator
from .CreateCalcVariable import CreateCalcVariable
# node movement
from .MoveNode import MoveNode


# the mutation anchor
class Mutation(graphene.ObjectType):
    """
    The mutation registrar
    """

    # calc
    # add a variable
    addCalcVariable = CreateCalcVariable.Field()
    # add an operator
    addCalcOperator = CreateCalcOperator.Field()

    # move an existing node
    moveNode = MoveNode.Field()


# end of file
