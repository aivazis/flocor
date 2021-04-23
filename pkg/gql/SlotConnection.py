# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import graphene

# my node type
from .Slot import Slot


# a flow node that represents a typed+named variable
class SlotConnection(graphene.relay.Connection):
    """
    A connection to a list of slots
    """


    # {graphene} metadata
    class Meta:
        # register my node type
        node = Slot


# end of file
