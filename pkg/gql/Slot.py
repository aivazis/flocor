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
    {Slot} captures the relationship between a {product} and its named slot in a {factory}
    """

    # {graphene} metadata
    class Meta:
        # register my interface
        interfaces = Node,

    # the fields
    id = graphene.ID()
    # representation
    position = graphene.Field(Position, required=True)


# end of file
