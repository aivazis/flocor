# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import graphene

# my node type
from .Binding import Binding


# a connection of bindings
class BindingConnection(graphene.relay.Connection):
    """
    A connection to a list of products
    """


    # {graphene} metadata
    class Meta:
        # register my node type
        node = Binding


# end of file
