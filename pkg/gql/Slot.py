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


# a factory slot
class Slot(graphene.ObjectType):
    """
    {Slot} captures the relationship between a {product} and a named slot in a {factory}
    """

    # {graphene} metadata
    class Meta:
        # register my interface
        interfaces = Node,

    # the fields
    id = graphene.ID()
    bound = graphene.Boolean(required=True)
    position = graphene.Field(Position, required=True)


    # the resolvers
    def resolve_id(slot, *_):
        return slot.relay

    def resolve_bound(slot, *_):
        return slot.product is not None

    def resolve_position(slot, *_):
        # unpack
        x, y = slot.position
        # build a position and return it
        return Position(x=x, y=y)


# end of file
