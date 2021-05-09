# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import graphene

# field types
from .Position import Position


# a flow node that represents a typed+named variable
class Connector(graphene.ObjectType):
    """
    A connector from a product to a factory
    """

    # the fields
    id = graphene.ID()
    inp = graphene.Boolean(required=True)
    factoryAt = graphene.Field(Position, required=True)
    slotAt = graphene.Field(Position, required=True)


# end of file
