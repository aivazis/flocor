# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import graphene

# field types
from .Position import Position


# a representation of a binding that links a slot to a factory
class Connector(graphene.ObjectType):
    """
    A connector from a product to a factory
    """

    # the fields
    id = graphene.ID()
    inp = graphene.Boolean(required=True)
    factoryAt = graphene.Field(Position, required=True)
    slotAt = graphene.Field(Position, required=True)


    # the resolvers
    def resolve_id(connector, *_):
        return connector.relay

    def resolve_inp(connector, *_):
        return connector.typename == "Input"

    def resolve_factoryAt(connector, *_):
        # unpack
        x, y = connector.factory.position
        # build a position and return it
        return Position(x=x, y=y)

    def resolve_slotAt(connector, *_):
        # unpack
        x, y = connector.slot.position
        # build a position and return it
        return Position(x=x, y=y)


# end of file
