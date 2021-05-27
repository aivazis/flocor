# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import graphene

# the mutations
# adding calc nodes to the flow
from .CreateFactory import CreateFactory
from .CreateProduct import CreateProduct
# node movement
from .MoveNode import MoveNode
from .MoveNodeEnd import MoveNodeEnd


# the mutation anchor
class Mutation(graphene.ObjectType):
    """
    The mutation registrar
    """

    # make new nodes
    # add a factory
    addFactory = CreateFactory.Field()
    # add a product
    addProduct = CreateProduct.Field()

    # move an existing node
    moveNode = MoveNode.Field()
    # stop the moving node
    moveNodeEnd = MoveNodeEnd.Field()


# end of file
