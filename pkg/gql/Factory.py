# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import graphene

# my interface
from .Node import Node
# field types
from .Position import Position


# operators from {pyre.calc}
class Factory(graphene.ObjectType):
    """
    An operator from {pyre.calc}
    """

    # {graphene} metadata
    class Meta:
        # register my interface
        interfaces = Node,

    # the fields
    id = graphene.ID()
    # products
    inputs = graphene.Int(required=True)
    outputs = graphene.Int(required=True)
    # location
    position = graphene.Field(Position, required=True)


    # the resolvers
    def resolve_id(factory, *_):
        return factory.relay

    def resolve_inputs(factory, *_):
        return factory.inputs

    def resolve_outputs(factory, *_):
        return factory.outputs

    def resolve_position(factory, *_):
        # unpack
        x, y = factory.position
        # build a position and return it
        return Position(x=x, y=y)


# end of file
