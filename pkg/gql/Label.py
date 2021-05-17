# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import graphene

# field types
from .Position import Position


# a flow node that represents a typed+named variable
class Label(graphene.ObjectType):
    """
    Representation of text at a specific location in the diagram
    """

    # the fields
    id = graphene.ID()
    value = graphene.List(graphene.String, required=False)
    category = graphene.String(required=False)
    position = graphene.Field(Position, required=True)


    # the resolvers
    def resolve_id(label, *_):
        return label.relay

    def resolve_value(label, *_):
        return label.text

    def resolve_category(label, *_):
        return label.category

    def resolve_position(label, *_):
        # unpack the position
        x, y = label.position
        # build a position rep and return it
        return Position(x=x, y=y)


# end of file
